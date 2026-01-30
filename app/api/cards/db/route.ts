import { NextResponse } from "next/server";
import { adminAuthClient } from "@/lib/supabase/admin-client";
import { HK_CARDS } from "@/lib/data/cards";
import { DbCard, DbCardRule, DbCardNote } from "@/lib/types/db-cards";
import { CreditCard, RewardRule } from "@/lib/types";

export const dynamic = 'force-dynamic';
export const revalidate = 60; // Cache for 60 seconds

/**
 * GET /api/cards/db
 * 從新數據庫表讀取信用卡數據（包含規則和備註）
 * 
 * Query params:
 * - fallback: "true" | "false" - 是否在DB失敗時使用本地數據（預設 true）
 * - active: "true" | "false" - 是否只返回啟用的卡片（預設 true）
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const useFallback = searchParams.get("fallback") !== "false";
  const onlyActive = searchParams.get("active") !== "false";

  try {
    // Fetch cards
    let cardsQuery = adminAuthClient
      .from("db_cards")
      .select("*")
      .order("bank", { ascending: true })
      .order("name", { ascending: true });
    
    if (onlyActive) {
      cardsQuery = cardsQuery.eq("is_active", true);
    }
    
    const { data: dbCards, error: cardsError } = await cardsQuery;
    
    if (cardsError) {
      console.error("Cards fetch error:", cardsError);
      throw cardsError;
    }
    
    if (!dbCards || dbCards.length === 0) {
      if (useFallback) {
        console.log("No DB cards found, using local fallback");
        return NextResponse.json({ 
          cards: HK_CARDS, 
          source: "local",
          message: "Using local data (no DB cards found)"
        });
      }
      return NextResponse.json({ cards: [], source: "database", message: "No cards found" });
    }

    // Fetch rules
    let rulesQuery = adminAuthClient
      .from("db_card_rules")
      .select("*")
      .order("priority", { ascending: false });
    
    if (onlyActive) {
      rulesQuery = rulesQuery.eq("is_active", true);
    }
    
    const { data: dbRules, error: rulesError } = await rulesQuery;
    
    if (rulesError) {
      console.error("Rules fetch error:", rulesError);
    }

    // Fetch notes
    let notesQuery = adminAuthClient
      .from("db_card_notes")
      .select("*")
      .order("priority", { ascending: false });
    
    if (onlyActive) {
      notesQuery = notesQuery.eq("is_active", true);
    }
    
    const { data: dbNotes, error: notesError } = await notesQuery;
    
    if (notesError) {
      console.error("Notes fetch error:", notesError);
    }

    // Group by card_id
    const rulesByCard: Record<string, DbCardRule[]> = {};
    const notesByCard: Record<string, DbCardNote[]> = {};
    
    (dbRules || []).forEach((rule: DbCardRule) => {
      if (!rulesByCard[rule.card_id]) rulesByCard[rule.card_id] = [];
      rulesByCard[rule.card_id].push(rule);
    });
    
    (dbNotes || []).forEach((note: DbCardNote) => {
      if (!notesByCard[note.card_id]) notesByCard[note.card_id] = [];
      notesByCard[note.card_id].push(note);
    });

    // Transform to CreditCard format
    const cards: CreditCard[] = dbCards.map((dbCard: DbCard) => {
      const cardRules = rulesByCard[dbCard.id] || [];
      const cardNotes = notesByCard[dbCard.id] || [];
      const now = new Date();
      
      // Transform rules (filter out expired)
      const rules: RewardRule[] = cardRules
        .filter(r => !r.valid_until || new Date(r.valid_until) >= now)
        .map(r => {
          let matchType: "base" | "category" | "merchant" | "paymentMethod" = "base";
          let matchValue: string | string[] | undefined;
          
          if (r.match_type === "category" && r.categories?.length > 0) {
            matchType = "category";
            matchValue = r.categories.length === 1 ? r.categories[0] : r.categories;
          } else if (r.match_type === "merchant" && r.merchants?.length > 0) {
            matchType = "merchant";
            matchValue = r.merchants.length === 1 ? r.merchants[0] : r.merchants;
          } else if (r.match_type === "payment" && r.payment_methods?.length > 0) {
            matchType = "paymentMethod";
            matchValue = r.payment_methods.length === 1 ? r.payment_methods[0] : r.payment_methods;
          }

          const rule: RewardRule = {
            matchType,
            description: r.description,
            percentage: r.percentage,
          };

          if (matchValue) rule.matchValue = matchValue;
          if (r.cap) rule.cap = r.cap;
          if (r.cap_type) rule.capType = r.cap_type;
          if (r.cap_period) {
            // Map DB cap_period to RewardRule capPeriod
            const periodMap: Record<string, 'monthly' | 'yearly' | 'semiannual' | 'promo'> = {
              'monthly': 'monthly',
              'quarterly': 'monthly', // approximate
              'annual': 'yearly',
              'yearly': 'yearly',
              'transaction': 'promo',
              'promo': 'promo',
              'semiannual': 'semiannual',
            };
            rule.capPeriod = periodMap[r.cap_period] || 'monthly';
          }
          if (r.min_spend) rule.minSpend = r.min_spend;
          if (r.exclude_categories?.length > 0) rule.excludeCategories = r.exclude_categories;
          if (r.valid_from && r.valid_until) {
            rule.validDateRange = { start: r.valid_from, end: r.valid_until };
          } else if (r.valid_from || r.valid_until) {
            // @ts-ignore - partial date range
            rule.validDateRange = { start: r.valid_from || '', end: r.valid_until || '' };
          }

          return rule;
        });

      // Combine notes (filter out expired)
      const note = cardNotes
        .filter(n => !n.valid_until || new Date(n.valid_until) >= now)
        .map(n => n.content)
        .join("\n\n");

      const card: CreditCard = {
        id: dbCard.id,
        name: dbCard.name,
        bank: dbCard.bank,
        imageUrl: dbCard.image_url || undefined,
        annualFee: dbCard.annual_fee || 0,
        feeWaiverCondition: dbCard.fee_waiver_condition || undefined,
        applyUrl: dbCard.partner_apply_url || undefined,
        officialApplyUrl: dbCard.apply_url || undefined,
        minIncome: dbCard.min_income || undefined,
        rules,
        tags: [],
        rewardConfig: dbCard.reward_config ? {
          method: (dbCard.reward_config.method && ['conversion', 'direct', 'direct_rate'].includes(dbCard.reward_config.method) 
            ? dbCard.reward_config.method 
            : 'direct') as 'conversion' | 'direct' | 'direct_rate',
          ratio: dbCard.reward_config.ratio,
          currency: dbCard.reward_config.currency,
        } : { method: 'direct' as const, ratio: 1, currency: 'HKD' },
        style: {
          bgColor: dbCard.style?.bgColor || 'bg-gray-800',
          textColor: dbCard.style?.textColor || 'text-white',
        },
      };

      if (note) card.note = note;

      return card;
    });

    return NextResponse.json({ 
      cards, 
      source: "database",
      stats: {
        cards: cards.length,
        rules: dbRules?.length || 0,
        notes: dbNotes?.length || 0,
      }
    }, {
      headers: {
        'Cache-Control': 's-maxage=60, stale-while-revalidate=300',
      }
    });

  } catch (error) {
    console.error("API error:", error);
    
    if (useFallback) {
      console.log("DB error, using local fallback");
      return NextResponse.json({ 
        cards: HK_CARDS, 
        source: "fallback",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
    
    return NextResponse.json(
      { error: "Failed to fetch cards", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

