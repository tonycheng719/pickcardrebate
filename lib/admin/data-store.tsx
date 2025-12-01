"use client";

import { useState, useEffect, useCallback, useContext, createContext } from "react";
import { CreditCard, Merchant, Promo, Category } from "../types";
import { HK_CARDS } from "../data/cards";
import { POPULAR_MERCHANTS } from "../data/merchants";
import { CATEGORIES } from "../data/categories";
import { PROMOS } from "../data/promos";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

// --- Data Mapping Helpers (Snake Case DB <-> Camel Case App) ---

function mapCardFromDB(dbCard: any): CreditCard {
    return {
        ...dbCard,
        imageUrl: dbCard.image_url,
        foreignCurrencyFee: dbCard.foreign_currency_fee,
        welcomeOfferText: dbCard.welcome_offer_text,
        welcomeOfferReward: dbCard.welcome_offer_reward,
        welcomeOfferDeadline: dbCard.welcome_offer_deadline,
        applyUrl: dbCard.apply_url,
        sellingPoints: dbCard.selling_points,
        feeWaiverCondition: dbCard.fee_waiver_condition,
        waiverMethod: dbCard.waiver_method,
        rewardTimeline: dbCard.reward_timeline,
        style: dbCard.style || { bgColor: "bg-gray-800", textColor: "text-white" }, // Fallback
        rules: dbCard.rules || [],
        tags: dbCard.tags || []
    };
}

function mapCardToDB(card: CreditCard): any {
    return {
        id: card.id,
        name: card.name,
        bank: card.bank,
        image_url: card.imageUrl,
        style: card.style,
        tags: card.tags,
        foreign_currency_fee: card.foreignCurrencyFee,
        reward_timeline: card.rewardTimeline,
        welcome_offer_text: card.welcomeOfferText,
        welcome_offer_reward: card.welcomeOfferReward,
        welcome_offer_deadline: card.welcomeOfferDeadline,
        apply_url: card.applyUrl,
        selling_points: card.sellingPoints,
        fee_waiver_condition: card.feeWaiverCondition,
        waiver_method: card.waiverMethod,
        rules: card.rules,
        // updated_at: new Date().toISOString() // Supabase handles this usually, or we send it
    };
}

function mapMerchantFromDB(dbMerchant: any): Merchant {
    return {
        ...dbMerchant,
        categoryIds: dbMerchant.category_ids || [],
        accentColor: dbMerchant.accent_color,
        isGeneral: dbMerchant.is_general,
        aliases: dbMerchant.aliases || []
    };
}

function mapMerchantToDB(merchant: Merchant): any {
    return {
        id: merchant.id,
        name: merchant.name,
        category_ids: merchant.categoryIds,
        logo: merchant.logo,
        accent_color: merchant.accentColor,
        is_general: merchant.isGeneral,
        aliases: merchant.aliases
    };
}

function mapPromoFromDB(dbPromo: any): Promo {
    return {
        ...dbPromo,
        imageUrl: dbPromo.image_url,
        expiryDate: dbPromo.expiry_date,
        relatedCardIds: dbPromo.related_card_ids || [],
        content: dbPromo.content // Map content from DB
    };
}

function mapPromoToDB(promo: Promo): any {
    return {
        id: promo.id,
        title: promo.title,
        description: promo.description,
        content: promo.content, // Map content to DB
        merchant: promo.merchant,
        tags: promo.tags,
        image_url: promo.imageUrl,
        url: promo.url,
        expiry_date: promo.expiryDate,
        related_card_ids: promo.relatedCardIds
    };
}

// --- Context ---

interface AdminDataStoreContextType {
  cards: CreditCard[];
  addOrUpdateCard: (card: CreditCard) => Promise<void>;
  removeCard: (id: string) => Promise<void>;
  merchants: Merchant[];
  addOrUpdateMerchant: (merchant: Merchant) => Promise<void>;
  removeMerchant: (id: string) => Promise<void>;
  promos: Promo[];
  addOrUpdatePromo: (promo: Promo) => Promise<void>;
  removePromo: (id: string) => Promise<void>;
  categories: Category[];
  isLoading: boolean;
  refreshData: () => Promise<void>;
  uploadInitialData: () => Promise<void>; // Helper to seed DB
}

const AdminDataStoreContext = createContext<AdminDataStoreContextType | undefined>(undefined);

// Helper to get cached merchants from localStorage
// IMPORTANT: Always merge with local data to ensure logos are up-to-date
function getCachedMerchants(): Merchant[] {
  if (typeof window === 'undefined') return POPULAR_MERCHANTS;
  try {
    const cached = localStorage.getItem('cached_merchants');
    if (cached) {
      const parsed = JSON.parse(cached);
      if (parsed && parsed.length > 0) {
        // Merge cached with local to ensure logos are current
        const cachedMap = new Map<string, Merchant>(parsed.map((m: Merchant) => [m.id, m]));
        return POPULAR_MERCHANTS.map(localMerchant => {
          const cachedMerchant = cachedMap.get(localMerchant.id);
          if (cachedMerchant) {
            // Use local logo unless cached has a Supabase storage URL
            const useCachedLogo = cachedMerchant.logo && (
              cachedMerchant.logo.includes('supabase') || 
              cachedMerchant.logo.includes('storage')
            );
            return {
              ...localMerchant,
              logo: useCachedLogo ? cachedMerchant.logo : localMerchant.logo,
            };
          }
          return localMerchant;
        });
      }
    }
  } catch (e) {
    console.warn("Failed to load cached merchants");
  }
  return POPULAR_MERCHANTS;
}

// Helper to cache merchants to localStorage
function cacheMerchants(merchants: Merchant[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('cached_merchants', JSON.stringify(merchants));
  } catch (e) {
    console.warn("Failed to cache merchants");
  }
}

export function DataStoreProvider({ children }: { children: React.ReactNode }) {
  // Start with cached data or local data IMMEDIATELY to avoid white screen
  const [cards, setCards] = useState<CreditCard[]>(HK_CARDS); 
  const [merchants, setMerchants] = useState<Merchant[]>(getCachedMerchants);
  const [promos, setPromos] = useState<Promo[]>(PROMOS);
  const [isLoading, setIsLoading] = useState(true); // Still track loading for admin/background sync
  
  const supabase = createClient();
  const categories = CATEGORIES;

  const logAdminAction = async (action: string, targetType: string, targetId: string, details: any = {}) => {
    try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) return;

        await supabase.from('admin_audit_logs').insert({
            admin_email: session.user.email || 'unknown',
            action,
            target_type: targetType,
            target_id: targetId,
            details
        });
    } catch (e) {
        console.error("Failed to log admin action", e);
    }
  };

  const refreshData = useCallback(async () => {
    // Removed setIsLoading(true) here to prevent UI flickering if we already have data
    try {
        // Set a shorter timeout (8s) - if it fails, we use local data which is fine
        const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error("Timeout")), 8000)
        );

        // Use AbortController for fetch requests
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000);

        try {
            // 1. Cards - USE API ROUTE with abort signal
            const cardsRes = await fetch('/api/admin/cards', { signal: controller.signal });
            if (cardsRes.ok) {
                const { cards: cardsData } = await cardsRes.json();
                if (cardsData && cardsData.length > 0) {
                    setCards(cardsData.map(mapCardFromDB));
                }
            }
        } catch (e: any) {
            if (e.name !== 'AbortError') {
                console.warn("Cards fetch failed:", e.message);
            }
        }

        // 2. Merchants - with independent timeout
        // IMPORTANT: Prioritize LOCAL static data for logos (most up-to-date)
        // DB data is only used for merchants not in local data
        try {
            const merchantsPromise = supabase.from('merchants').select('*');
            const merchantsTimeout = new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), 5000));
            const { data: merchantsData } = await Promise.race([merchantsPromise, merchantsTimeout]) as any;
            
            if (merchantsData && merchantsData.length > 0) {
                const dbMerchants: Merchant[] = merchantsData.map(mapMerchantFromDB);
                // Create a map of DB merchants by ID for quick lookup
                const dbMerchantMap = new Map<string, Merchant>(dbMerchants.map((m) => [m.id, m]));
                
                // Merge: LOCAL data takes priority for logos, DB data used for extra fields
                const mergedMerchants: Merchant[] = POPULAR_MERCHANTS.map(localMerchant => {
                    const dbMerchant = dbMerchantMap.get(localMerchant.id);
                    if (dbMerchant) {
                        // LOCAL logo takes priority (most up-to-date in code)
                        // Only use DB logo if it's a Supabase storage URL (user uploaded)
                        const useDbLogo = dbMerchant.logo && (
                            dbMerchant.logo.includes('supabase') || 
                            dbMerchant.logo.includes('storage')
                        );
                        return {
                            ...localMerchant, // Start with local data
                            ...dbMerchant,    // Override with DB data
                            logo: useDbLogo ? dbMerchant.logo : localMerchant.logo, // Prefer local logo unless DB has uploaded one
                        };
                    }
                    return localMerchant;
                });
                
                // Also add any DB-only merchants not in local data
                dbMerchants.forEach((dbM) => {
                    if (!POPULAR_MERCHANTS.some(lm => lm.id === dbM.id)) {
                        mergedMerchants.push(dbM);
                    }
                });
                
                setMerchants(mergedMerchants);
                // Cache merchants for faster initial load next time
                cacheMerchants(mergedMerchants);
            }
        } catch (e: any) {
            console.warn("Merchants fetch failed:", e.message);
        }

        // 3. Promos - with independent timeout
        try {
            const promosPromise = supabase.from('promos').select('*');
            const promosTimeout = new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), 5000));
            const { data: promosData } = await Promise.race([promosPromise, promosTimeout]) as any;
            
            if (promosData && promosData.length > 0) {
                setPromos(promosData.map(mapPromoFromDB));
            }
        } catch (e: any) {
            console.warn("Promos fetch failed:", e.message);
        }
        
        setIsLoading(false); // Data sync complete
    } catch (error: any) {
        console.warn("Data sync error:", error.message);
        // Don't show error toast to user, just silently use local data
        setIsLoading(false);
    }
  }, []);

  // Initial Fetch
  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // --- Actions ---

  const addOrUpdateCard = async (card: CreditCard) => {
    // Optimistic update
    setCards(prev => {
        const idx = prev.findIndex(c => c.id === card.id);
        if (idx === -1) return [...prev, card];
        const next = [...prev];
        next[idx] = card;
        return next;
    });

    try {
        const dbPayload = mapCardToDB(card);
        // Use API route instead of direct client to bypass RLS restrictions for admin operations
        const res = await fetch('/api/admin/cards', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dbPayload)
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || 'Failed to save card');
        }

        toast.success("卡片已儲存至雲端");
        logAdminAction(
            cards.some(c => c.id === card.id) ? "update" : "create",
            "card",
            card.id,
            { name: card.name }
        );
        
        // Trigger refresh to ensure we have latest server state (e.g. IDs or timestamps)
        // But wait a bit to let DB settle
        setTimeout(refreshData, 500);
        
    } catch (e: any) {
        console.error(e);
        toast.error(`儲存失敗: ${e.message}`);
        // Could trigger a refresh here to revert optimistic update if needed
    }
  };

  const removeCard = async (id: string) => {
    setCards(prev => prev.filter(c => c.id !== id));
    try {
        // Use API route
        const res = await fetch(`/api/admin/cards?id=${id}`, {
            method: 'DELETE'
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || 'Failed to delete card');
        }

        toast.success("卡片已刪除");
        logAdminAction("delete", "card", id);
    } catch (e: any) {
        console.error(e);
        toast.error(`刪除失敗: ${e.message}`);
        refreshData(); // Revert if failed
    }
  };

  const addOrUpdateMerchant = async (merchant: Merchant) => {
    setMerchants(prev => {
        const idx = prev.findIndex(m => m.id === merchant.id);
        if (idx === -1) return [...prev, merchant];
        const next = [...prev];
        next[idx] = merchant;
        return next;
    });

    try {
        const dbPayload = mapMerchantToDB(merchant);
        const res = await fetch('/api/admin/merchants', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dbPayload)
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || 'Failed to save merchant');
        }

        toast.success("商戶已儲存");
        logAdminAction(
            merchants.some(m => m.id === merchant.id) ? "update" : "create",
            "merchant",
            merchant.id,
            { name: merchant.name }
        );
    } catch (e: any) {
        console.error(e);
        toast.error(`儲存失敗: ${e.message}`);
    }
  };

  const removeMerchant = async (id: string) => {
    setMerchants(prev => prev.filter(m => m.id !== id));
    try {
        const res = await fetch(`/api/admin/merchants?id=${id}`, {
            method: 'DELETE'
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || 'Failed to delete merchant');
        }

        toast.success("商戶已刪除");
        logAdminAction("delete", "merchant", id);
    } catch (e: any) {
        console.error(e);
        toast.error(`刪除失敗: ${e.message}`);
        refreshData();
    }
  };

  const addOrUpdatePromo = async (promo: Promo) => {
    setPromos(prev => {
        const idx = prev.findIndex(p => p.id === promo.id);
        if (idx === -1) return [...prev, promo];
        const next = [...prev];
        next[idx] = promo;
        return next;
    });

    try {
        const dbPayload = mapPromoToDB(promo);
        const res = await fetch('/api/admin/promos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dbPayload)
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || 'Failed to save promo');
        }

        toast.success("優惠已儲存");
        logAdminAction(
            promos.some(p => p.id === promo.id) ? "update" : "create",
            "promo",
            promo.id,
            { title: promo.title }
        );
    } catch (e: any) {
        console.error(e);
        toast.error(`儲存失敗: ${e.message}`);
    }
  };

  const removePromo = async (id: string) => {
    setPromos(prev => prev.filter(p => p.id !== id));
    try {
        const res = await fetch(`/api/admin/promos?id=${id}`, {
            method: 'DELETE'
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || 'Failed to delete promo');
        }

        toast.success("優惠已刪除");
        logAdminAction("delete", "promo", id);
    } catch (e: any) {
        console.error(e);
        toast.error(`刪除失敗: ${e.message}`);
        refreshData();
    }
  };

  // Special function to seed DB if empty
  const uploadInitialData = async () => {
    setIsLoading(true);
    try {
        // Upload Cards
        for (const card of HK_CARDS) {
            await supabase.from('cards').upsert(mapCardToDB(card));
        }
        // Upload Merchants
        for (const merchant of POPULAR_MERCHANTS) {
            await supabase.from('merchants').upsert(mapMerchantToDB(merchant));
        }
        // Upload Promos
        for (const promo of PROMOS) {
            await supabase.from('promos').upsert(mapPromoToDB(promo));
        }
        toast.success("初始化數據已上傳！");
        await refreshData();
    } catch (e) {
        console.error(e);
        toast.error("上傳失敗");
    } finally {
        setIsLoading(false);
    }
  };

  const value = {
    cards,
    addOrUpdateCard,
    removeCard,
    merchants,
    addOrUpdateMerchant,
    removeMerchant,
    promos,
    addOrUpdatePromo,
    removePromo,
    categories,
    isLoading,
    refreshData,
    uploadInitialData
  };

  return <AdminDataStoreContext.Provider value={value}>{children}</AdminDataStoreContext.Provider>;
}

export function useAdminDataStore() {
  const context = useContext(AdminDataStoreContext);
  if (context === undefined) {
    throw new Error("useAdminDataStore must be used within a DataStoreProvider");
  }
  return context;
}

export function useDataset() {
  const context = useContext(AdminDataStoreContext);
  if (context === undefined) {
    throw new Error("useDataset must be used within a DataStoreProvider");
  }
  return {
    cards: context.cards,
    merchants: context.merchants,
    promos: context.promos,
    categories: context.categories,
    isLoading: context.isLoading,
  };
}
