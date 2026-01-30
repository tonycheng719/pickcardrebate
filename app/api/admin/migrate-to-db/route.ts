import { NextResponse } from "next/server";
import { adminAuthClient } from "@/lib/supabase/admin-client";
import { HK_CARDS } from "@/lib/data/cards";
import { PROMOS } from "@/lib/data/promos";
import { DbCardInsert, DbCardRuleInsert, DbCardNoteInsert, DbPromoInsert, DbPromoFaqInsert } from "@/lib/types/db-cards";

export const dynamic = 'force-dynamic';

/**
 * POST /api/admin/migrate-to-db
 * 將本地數據遷移到資料庫
 * 
 * Body: { mode: "cards" | "promos" | "all", clearExisting?: boolean }
 */
export async function POST(request: Request) {
  try {
    // Check for Service Role Key
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY && !process.env.SERVICE_ROLE_KEY) {
      console.error("CRITICAL: Service Role Key missing in API Route");
      return NextResponse.json({ error: "Server Misconfiguration: Missing Service Role Key" }, { status: 500 });
    }
    
    const supabase = adminAuthClient;
    
    const body = await request.json();
    const mode = body.mode || "all";
    const clearExisting = body.clearExisting || false;
    
    const results = {
      cards: { inserted: 0, errors: [] as string[] },
      rules: { inserted: 0, errors: [] as string[] },
      notes: { inserted: 0, errors: [] as string[] },
      promos: { inserted: 0, errors: [] as string[] },
      faqs: { inserted: 0, errors: [] as string[] },
      promoCards: { inserted: 0, errors: [] as string[] },
    };
    
    // ========================================================================
    // Migrate Cards
    // ========================================================================
    if (mode === "cards" || mode === "all") {
      // Clear existing if requested
      if (clearExisting) {
        await supabase.from("db_card_notes").delete().neq("id", "00000000-0000-0000-0000-000000000000");
        await supabase.from("db_card_rules").delete().neq("id", "00000000-0000-0000-0000-000000000000");
        await supabase.from("db_cards").delete().neq("id", "placeholder");
      }
      
      for (const card of HK_CARDS) {
        // Insert card
        const cardData: DbCardInsert = {
          id: card.id,
          name: card.name,
          bank: card.bank,
          image_url: card.imageUrl || null,
          card_type: "credit",
          network: detectNetwork(card.id, card.name),
          annual_fee: card.annualFee || 0,
          fee_waiver_condition: card.feeWaiverCondition || null,
          min_income: card.minIncome || null,
          apply_url: card.officialApplyUrl || null,
          partner_apply_url: card.applyUrl || null,
          style: card.style || {},
          reward_config: card.rewardConfig || {},
          is_active: true,
          sort_order: 0,
        };
        
        const { error: cardError } = await supabase
          .from("db_cards")
          .upsert(cardData, { onConflict: "id" });
        
        if (cardError) {
          results.cards.errors.push(`${card.id}: ${cardError.message}`);
        } else {
          results.cards.inserted++;
        }
        
        // Insert rules
        if (card.rules && card.rules.length > 0) {
          for (let i = 0; i < card.rules.length; i++) {
            const rule = card.rules[i];
            // Parse matchValue into appropriate arrays based on matchType
            const matchValue = rule.matchValue;
            const categories: string[] = [];
            const merchants: string[] = [];
            const paymentMethods: string[] = [];
            
            if (matchValue) {
              const values = Array.isArray(matchValue) ? matchValue : [matchValue];
              if (rule.matchType === "category") {
                categories.push(...values);
              } else if (rule.matchType === "merchant") {
                merchants.push(...values);
              } else if (rule.matchType === "paymentMethod") {
                paymentMethods.push(...values);
              }
            }
            
            // Map matchType to database format
            const matchTypeMap: Record<string, "base" | "category" | "merchant" | "payment"> = {
              "base": "base",
              "category": "category", 
              "merchant": "merchant",
              "paymentMethod": "payment",
            };
            
            const ruleData: DbCardRuleInsert = {
              card_id: card.id,
              description: rule.description,
              match_type: matchTypeMap[rule.matchType] || "base",
              categories,
              merchants,
              payment_methods: paymentMethods,
              percentage: rule.percentage,
              cap: rule.cap || null,
              cap_type: (rule.capType as "reward" | "spending") || "spending",
              cap_period: (rule.capPeriod as "monthly" | "quarterly" | "annual" | "transaction") || "monthly",
              min_spend: rule.minSpend || rule.monthlyMinSpend || null,
              min_spend_period: rule.monthlyMinSpend ? "monthly" : null,
              exclude_categories: rule.excludeCategories || [],
              valid_from: rule.validDateRange?.start || null,
              valid_until: rule.validDateRange?.end || null,
              priority: card.rules.length - i, // Higher index = lower priority
              requires_registration: false,
              notes: null,
              is_active: true,
            };
            
            const { error: ruleError } = await supabase
              .from("db_card_rules")
              .insert(ruleData);
            
            if (ruleError) {
              results.rules.errors.push(`${card.id} rule ${i}: ${ruleError.message}`);
            } else {
              results.rules.inserted++;
            }
          }
        }
        
        // Insert note (from card.note field)
        if (card.note) {
          // Split note by \n\n to create separate notes for each promo
          const noteSegments = card.note.split(/\n\n/).filter(s => s.trim());
          
          for (let i = 0; i < noteSegments.length; i++) {
            const segment = noteSegments[i];
            // Try to extract date from note
            const dateMatch = segment.match(/（至(\d{4}\/\d{1,2}\/\d{1,2})）/);
            const validUntil = dateMatch ? dateMatch[1].replace(/\//g, "-") : null;
            
            const noteData: DbCardNoteInsert = {
              card_id: card.id,
              content: segment.trim(),
              note_type: segment.includes("⚠️") ? "warning" : "promo",
              valid_until: validUntil,
              priority: noteSegments.length - i,
              is_active: true,
            };
            
            const { error: noteError } = await supabase
              .from("db_card_notes")
              .insert(noteData);
            
            if (noteError) {
              results.notes.errors.push(`${card.id} note ${i}: ${noteError.message}`);
            } else {
              results.notes.inserted++;
            }
          }
        }
      }
    }
    
    // ========================================================================
    // Migrate Promos
    // ========================================================================
    if (mode === "promos" || mode === "all") {
      // Clear existing if requested
      if (clearExisting) {
        await supabase.from("db_promo_cards").delete().neq("promo_id", "placeholder");
        await supabase.from("db_promo_faqs").delete().neq("id", "00000000-0000-0000-0000-000000000000");
        await supabase.from("db_promos").delete().neq("id", "placeholder");
      }
      
      for (const promo of PROMOS) {
        // Insert promo
        const promoData: DbPromoInsert = {
          id: promo.id,
          slug: promo.id,
          title: promo.title,
          merchant: promo.merchant || null,
          description: promo.description || null,
          content: promo.content || null,
          image_url: promo.imageUrl || null,
          expiry_date: promo.expiryDate || null,
          is_pinned: promo.isPinned || false,
          pinned_until: promo.pinnedUntil || null,
          sort_order: promo.sortOrder || 0,
          tags: promo.tags || [],
          url: promo.url || null,
          seo_title: promo.seoTitle || null,
          seo_description: promo.seoDescription || null,
          is_active: true,
          is_guide: false,
          guide_component: null,
        };
        
        const { error: promoError } = await supabase
          .from("db_promos")
          .upsert(promoData, { onConflict: "id" });
        
        if (promoError) {
          results.promos.errors.push(`${promo.id}: ${promoError.message}`);
        } else {
          results.promos.inserted++;
        }
        
        // Insert FAQs
        if (promo.faqs && promo.faqs.length > 0) {
          for (let i = 0; i < promo.faqs.length; i++) {
            const faq = promo.faqs[i];
            const faqData: DbPromoFaqInsert = {
              promo_id: promo.id,
              question: faq.question,
              answer: faq.answer,
              sort_order: i,
            };
            
            const { error: faqError } = await supabase
              .from("db_promo_faqs")
              .insert(faqData);
            
            if (faqError) {
              results.faqs.errors.push(`${promo.id} faq ${i}: ${faqError.message}`);
            } else {
              results.faqs.inserted++;
            }
          }
        }
        
        // Insert promo-card relationships
        if (promo.relatedCardIds && promo.relatedCardIds.length > 0) {
          for (const cardId of promo.relatedCardIds) {
            const { error: relError } = await supabase
              .from("db_promo_cards")
              .upsert({ promo_id: promo.id, card_id: cardId }, { onConflict: "promo_id,card_id" });
            
            if (relError) {
              results.promoCards.errors.push(`${promo.id}-${cardId}: ${relError.message}`);
            } else {
              results.promoCards.inserted++;
            }
          }
        }
      }
    }
    
    return NextResponse.json({
      success: true,
      message: "Migration completed",
      results,
    });
    
  } catch (error) {
    console.error("Migration error:", error);
    return NextResponse.json(
      { error: "Migration failed", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

// Helper function to detect card network from ID/name
function detectNetwork(id: string, name: string): "visa" | "mastercard" | "unionpay" | "amex" | "jcb" | null {
  const combined = `${id} ${name}`.toLowerCase();
  
  if (combined.includes("amex") || combined.includes("american express")) return "amex";
  if (combined.includes("unionpay") || combined.includes("銀聯")) return "unionpay";
  if (combined.includes("jcb")) return "jcb";
  if (combined.includes("mastercard") || combined.includes("mc") || combined.includes("萬事達")) return "mastercard";
  if (combined.includes("visa")) return "visa";
  
  return null;
}

/**
 * GET /api/admin/migrate-to-db
 * 獲取遷移狀態
 */
export async function GET() {
  try {
    // Check for Service Role Key
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY && !process.env.SERVICE_ROLE_KEY) {
      console.error("CRITICAL: Service Role Key missing in API Route");
      return NextResponse.json({ error: "Server Misconfiguration: Missing Service Role Key" }, { status: 500 });
    }
    
    const supabase = adminAuthClient;
    
    // Get counts from database
    const [cardsResult, rulesResult, notesResult, promosResult, faqsResult] = await Promise.all([
      supabase.from("db_cards").select("id", { count: "exact", head: true }),
      supabase.from("db_card_rules").select("id", { count: "exact", head: true }),
      supabase.from("db_card_notes").select("id", { count: "exact", head: true }),
      supabase.from("db_promos").select("id", { count: "exact", head: true }),
      supabase.from("db_promo_faqs").select("id", { count: "exact", head: true }),
    ]);
    
    // Get counts from local data
    const localCounts = {
      cards: HK_CARDS.length,
      rules: HK_CARDS.reduce((sum, card) => sum + (card.rules?.length || 0), 0),
      promos: PROMOS.length,
      faqs: PROMOS.reduce((sum, promo) => sum + (promo.faqs?.length || 0), 0),
    };
    
    return NextResponse.json({
      database: {
        cards: cardsResult.count || 0,
        rules: rulesResult.count || 0,
        notes: notesResult.count || 0,
        promos: promosResult.count || 0,
        faqs: faqsResult.count || 0,
      },
      local: localCounts,
      synced: {
        cards: (cardsResult.count || 0) >= localCounts.cards,
        promos: (promosResult.count || 0) >= localCounts.promos,
      },
    });
    
  } catch (error) {
    console.error("Status check error:", error);
    return NextResponse.json(
      { error: "Failed to check status" },
      { status: 500 }
    );
  }
}

