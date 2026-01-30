"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { DbCard, DbCardRule, DbCardNote } from "@/lib/types/db-cards";
import { HK_CARDS } from "@/lib/data/cards";
import { CreditCard, RewardRule } from "@/lib/types";

interface UseDBCardsOptions {
  fallbackToLocal?: boolean;
  onlyActive?: boolean;
}

interface UseDBCardsResult {
  cards: CreditCard[];
  loading: boolean;
  error: string | null;
  source: "database" | "local" | "fallback";
  refetch: () => Promise<void>;
}

/**
 * Hook to fetch credit cards from Supabase database with local fallback
 * 
 * Usage:
 * const { cards, loading, error, source } = useDBCards();
 */
export function useDBCards(options: UseDBCardsOptions = {}): UseDBCardsResult {
  const { fallbackToLocal = true, onlyActive = true } = options;
  
  const [cards, setCards] = useState<CreditCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState<"database" | "local" | "fallback">("database");

  const fetchFromDatabase = useCallback(async () => {
    try {
      const supabase = createClient();
      
      // Fetch cards
      let cardsQuery = supabase
        .from("db_cards")
        .select("*")
        .order("bank", { ascending: true })
        .order("name", { ascending: true });
      
      if (onlyActive) {
        cardsQuery = cardsQuery.eq("is_active", true);
      }
      
      const { data: dbCards, error: cardsError } = await cardsQuery;
      
      if (cardsError) throw cardsError;
      if (!dbCards || dbCards.length === 0) {
        throw new Error("No cards found in database");
      }

      // Fetch all rules
      let rulesQuery = supabase
        .from("db_card_rules")
        .select("*")
        .order("priority", { ascending: false });
      
      if (onlyActive) {
        rulesQuery = rulesQuery.eq("is_active", true);
      }
      
      const { data: dbRules, error: rulesError } = await rulesQuery;
      
      if (rulesError) throw rulesError;

      // Fetch all notes
      let notesQuery = supabase
        .from("db_card_notes")
        .select("*")
        .order("priority", { ascending: false });
      
      if (onlyActive) {
        notesQuery = notesQuery.eq("is_active", true);
      }
      
      const { data: dbNotes, error: notesError } = await notesQuery;
      
      if (notesError) throw notesError;

      // Group rules and notes by card_id
      const rulesByCard: Record<string, DbCardRule[]> = {};
      const notesByCard: Record<string, DbCardNote[]> = {};
      
      (dbRules || []).forEach(rule => {
        if (!rulesByCard[rule.card_id]) {
          rulesByCard[rule.card_id] = [];
        }
        rulesByCard[rule.card_id].push(rule);
      });
      
      (dbNotes || []).forEach(note => {
        if (!notesByCard[note.card_id]) {
          notesByCard[note.card_id] = [];
        }
        notesByCard[note.card_id].push(note);
      });

      // Transform to CreditCard format
      const transformedCards: CreditCard[] = dbCards.map(dbCard => {
        const cardRules = rulesByCard[dbCard.id] || [];
        const cardNotes = notesByCard[dbCard.id] || [];
        
        // Transform rules
        const rules: RewardRule[] = cardRules
          .filter(r => {
            // Filter out expired rules
            if (r.valid_until && new Date(r.valid_until) < new Date()) {
              return false;
            }
            return true;
          })
          .map(r => {
            // Determine matchType and matchValue
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
                'quarterly': 'monthly',
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

        // Combine notes
        const note = cardNotes
          .filter(n => {
            // Filter out expired notes
            if (n.valid_until && new Date(n.valid_until) < new Date()) {
              return false;
            }
            return true;
          })
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
          rewardConfig: dbCard.reward_config ? {
          method: (['conversion', 'direct', 'direct_rate'].includes(dbCard.reward_config.method) 
            ? dbCard.reward_config.method 
            : 'direct') as 'conversion' | 'direct' | 'direct_rate',
          ratio: dbCard.reward_config.ratio,
          currency: dbCard.reward_config.currency,
        } : { method: 'direct' as const, ratio: 1, currency: 'HKD' },
          style: dbCard.style || {},
        };

        if (note) card.note = note;

        return card;
      });

      setCards(transformedCards);
      setSource("database");
      setError(null);
      
    } catch (err) {
      console.error("Failed to fetch from database:", err);
      throw err;
    }
  }, [onlyActive]);

  const fetchCards = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      await fetchFromDatabase();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      console.warn("Database fetch failed, using fallback:", errorMessage);
      
      if (fallbackToLocal) {
        // Use local data as fallback
        setCards(HK_CARDS);
        setSource("fallback");
        setError(`Database unavailable: ${errorMessage}. Using local data.`);
      } else {
        setError(errorMessage);
        setSource("local");
      }
    } finally {
      setLoading(false);
    }
  }, [fetchFromDatabase, fallbackToLocal]);

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  return {
    cards,
    loading,
    error,
    source,
    refetch: fetchCards,
  };
}

/**
 * Hook to get a single card by ID from database with local fallback
 */
export function useDBCard(cardId: string): {
  card: CreditCard | null;
  loading: boolean;
  error: string | null;
  source: "database" | "local" | "fallback";
} {
  const { cards, loading, error, source } = useDBCards();
  
  const card = cards.find(c => c.id === cardId) || null;
  
  return { card, loading, error, source };
}

/**
 * Server-side function to fetch cards from database
 * For use in Server Components or API routes
 */
export async function getDBCards(): Promise<CreditCard[]> {
  try {
    const { adminAuthClient } = await import("@/lib/supabase/admin-client");
    
    // Fetch cards
    const { data: dbCards, error: cardsError } = await adminAuthClient
      .from("db_cards")
      .select("*")
      .eq("is_active", true)
      .order("bank", { ascending: true })
      .order("name", { ascending: true });
    
    if (cardsError || !dbCards || dbCards.length === 0) {
      console.warn("Failed to fetch cards from DB, using local:", cardsError?.message);
      return HK_CARDS;
    }

    // Fetch rules
    const { data: dbRules } = await adminAuthClient
      .from("db_card_rules")
      .select("*")
      .eq("is_active", true)
      .order("priority", { ascending: false });

    // Fetch notes
    const { data: dbNotes } = await adminAuthClient
      .from("db_card_notes")
      .select("*")
      .eq("is_active", true)
      .order("priority", { ascending: false });

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

    // Transform
    return dbCards.map((dbCard: DbCard) => {
      const cardRules = rulesByCard[dbCard.id] || [];
      const cardNotes = notesByCard[dbCard.id] || [];
      
      const rules: RewardRule[] = cardRules
        .filter(r => !r.valid_until || new Date(r.valid_until) >= new Date())
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
            const periodMap: Record<string, 'monthly' | 'yearly' | 'semiannual' | 'promo'> = {
              'monthly': 'monthly',
              'quarterly': 'monthly',
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

      const note = cardNotes
        .filter(n => !n.valid_until || new Date(n.valid_until) >= new Date())
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
        rewardConfig: dbCard.reward_config ? {
          method: (['conversion', 'direct', 'direct_rate'].includes(dbCard.reward_config.method) 
            ? dbCard.reward_config.method 
            : 'direct') as 'conversion' | 'direct' | 'direct_rate',
          ratio: dbCard.reward_config.ratio,
          currency: dbCard.reward_config.currency,
        } : { method: 'direct' as const, ratio: 1, currency: 'HKD' },
        style: dbCard.style || {},
      };

      if (note) card.note = note;

      return card;
    });
  } catch (error) {
    console.error("getDBCards error:", error);
    return HK_CARDS;
  }
}

