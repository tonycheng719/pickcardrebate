"use client";

import { useState, useEffect, useCallback, useContext, createContext } from "react";
import { CreditCard, Merchant, Promo, Category } from "../types";
import { HK_CARDS } from "../data/cards";
import { POPULAR_MERCHANTS } from "../data/merchants";
import { CATEGORIES } from "../data/categories";
// PROMOS 現在會自動合併：資料庫 + 本地文件（本地新增的會自動顯示）
import { PROMOS } from "../data/promos";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

// --- Data Mapping Helpers (Snake Case DB <-> Camel Case App) ---

function mapCardFromDB(dbCard: any): CreditCard {
    // Find matching local card to get note, rewardConfig, rules, and other fields
    // LOCAL data takes priority for rules (most up-to-date calculations)
    const localCard = HK_CARDS.find(c => c.id === dbCard.id);
    
    // Use DB image if available, otherwise fallback to local
    // This allows both uploaded images (Supabase) and manually entered URLs to work
    const imageUrl = dbCard.image_url || localCard?.imageUrl;
    
    return {
        ...dbCard,
        // IMPORTANT: LOCAL name and bank take priority (most up-to-date)
        name: localCard?.name || dbCard.name,
        bank: localCard?.bank || dbCard.bank,
        imageUrl,
        foreignCurrencyFee: localCard?.foreignCurrencyFee ?? dbCard.foreign_currency_fee, // Prefer local (most up-to-date)
        welcomeOfferText: localCard?.welcomeOfferText || dbCard.welcome_offer_text, // Prefer local (most up-to-date bank welcome offer)
        welcomeOfferReward: dbCard.welcome_offer_reward,
        welcomeOfferDeadline: dbCard.welcome_offer_deadline,
        applyUrl: dbCard.apply_url || localCard?.applyUrl,
        officialApplyUrl: localCard?.officialApplyUrl, // Official bank URL from local static data
        sellingPoints: localCard?.sellingPoints || dbCard.selling_points, // Prefer local for up-to-date selling points
        feeWaiverCondition: localCard?.feeWaiverCondition || dbCard.fee_waiver_condition, // Prefer local
        waiverMethod: dbCard.waiver_method,
        rewardTimeline: localCard?.rewardTimeline || dbCard.reward_timeline, // Prefer local
        style: dbCard.style || localCard?.style || { bgColor: "bg-gray-800", textColor: "text-white" },
        // IMPORTANT: LOCAL rules take priority (most up-to-date calculations)
        rules: localCard?.rules || dbCard.rules || [],
        tags: localCard?.tags || dbCard.tags || [],
        // Fields only in local static data - MUST preserve these from local
        note: localCard?.note,
        rewardConfig: localCard?.rewardConfig,
        // DB hidden takes priority over local (allows admin to toggle visibility)
        hidden: dbCard.hidden ?? localCard?.hidden,
        minIncome: localCard?.minIncome, // Preserve minIncome from local
        incomeNote: localCard?.incomeNote, // Preserve incomeNote from local
        annualFee: localCard?.annualFee ?? dbCard.annual_fee, // Prefer local annualFee
        promoEndDate: localCard?.promoEndDate, // Preserve promoEndDate from local
        promoName: localCard?.promoName, // Preserve promoName from local
        partnerOffer: dbCard.partner_offer || localCard?.partnerOffer, // Partner offer from DB or local
        // 優惠商戶和不計回贈 - 從本地靜態數據取得
        featuredMerchants: localCard?.featuredMerchants,
        exclusions: localCard?.exclusions,
    };
}

function mapCardToDB(card: CreditCard): any {
    // IMPORTANT: Only include image_url if it's explicitly set (not from local static data)
    // This prevents overwriting user-uploaded images when updating other fields
    const payload: any = {
        id: card.id,
        name: card.name,
        bank: card.bank,
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
    };
    
    // Only include image_url if it's a real URL (Supabase storage or external URL)
    // Avoid overwriting with undefined/null
    if (card.imageUrl) {
        payload.image_url = card.imageUrl;
    }
    
    return payload;
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
    const payload: any = {
        id: merchant.id,
        name: merchant.name,
        category_ids: merchant.categoryIds,
        accent_color: merchant.accentColor,
        is_general: merchant.isGeneral,
        aliases: merchant.aliases
    };
    
    // Only include logo if it's a valid URL, avoid overwriting with emoji or undefined
    if (merchant.logo && typeof merchant.logo === 'string' && 
        (merchant.logo.startsWith('http') || merchant.logo.startsWith('/'))) {
        payload.logo = merchant.logo;
    }
    
    return payload;
}

function mapPromoFromDB(dbPromo: any): Promo {
    return {
        ...dbPromo,
        imageUrl: dbPromo.image_url,
        expiryDate: dbPromo.expiry_date,
        relatedCardIds: dbPromo.related_card_ids || [],
        content: dbPromo.content,
        // 新欄位：用於區分 guide 和 promo
        contentType: dbPromo.content_type || 'promo',
        isNew: dbPromo.is_new || false,
        isPinned: dbPromo.is_pinned || false,
        seoTitle: dbPromo.seo_title,
        seoDescription: dbPromo.seo_description,
        faqs: dbPromo.faqs || [],
        updatedAt: dbPromo.updated_at,
    };
}

function mapPromoToDB(promo: Promo): any {
    return {
        id: promo.id,
        title: promo.title,
        description: promo.description,
        content: promo.content,
        merchant: promo.merchant,
        tags: promo.tags,
        image_url: promo.imageUrl,
        url: promo.url,
        expiry_date: promo.expiryDate,
        related_card_ids: promo.relatedCardIds,
        // 新欄位
        content_type: (promo as any).contentType || 'promo',
        is_new: (promo as any).isNew || false,
        is_pinned: promo.isPinned || false,
        seo_title: promo.seoTitle,
        seo_description: promo.seoDescription,
        faqs: promo.faqs,
        updated_at: promo.updatedAt || new Date().toISOString(),
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
// IMPORTANT: DB/cached logos take priority (user uploaded)
function getCachedMerchants(): Merchant[] {
  if (typeof window === 'undefined') return POPULAR_MERCHANTS;
  try {
    const cached = localStorage.getItem('cached_merchants');
    if (cached) {
      const parsed = JSON.parse(cached);
      if (parsed && parsed.length > 0) {
        // Merge cached with local, cached logo takes priority if valid URL
        const cachedMap = new Map<string, Merchant>(parsed.map((m: Merchant) => [m.id, m]));
        return POPULAR_MERCHANTS.map(localMerchant => {
          const cachedMerchant = cachedMap.get(localMerchant.id);
          if (cachedMerchant) {
            // Use cached logo if it's a valid URL (user uploaded)
            const useCachedLogo = cachedMerchant.logo && 
              typeof cachedMerchant.logo === 'string' && 
              (cachedMerchant.logo.startsWith('http') || cachedMerchant.logo.startsWith('/'));
            return {
              ...localMerchant,
              ...cachedMerchant,
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
  // Promos 自動合併：資料庫 + 本地文件（本地新增的會即時顯示）
  const [promos, setPromos] = useState<Promo[]>(PROMOS.map(p => ({ ...p, contentType: 'promo' as const })));
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
        // Use AbortController for fetch requests with 8s timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000);

        try {
            // 1. Cards - USE API ROUTE with abort signal
            const cardsRes = await fetch('/api/admin/cards', { signal: controller.signal });
            if (cardsRes.ok) {
                const { cards: cardsData } = await cardsRes.json();
                if (cardsData && cardsData.length > 0) {
                    // Create a map of DB cards by ID for quick lookup
                    const dbCardMap = new Map<string, any>(cardsData.map((c: any) => [c.id, c]));
                    
                    // Merge: Start with LOCAL cards, override with DB data where available
                    const mergedCards = HK_CARDS.map(localCard => {
                        const dbCard = dbCardMap.get(localCard.id);
                        if (dbCard) {
                            // DB card exists - merge with local, prioritizing DB image
                            return mapCardFromDB(dbCard);
                        }
                        // No DB record - use local card as-is
                        return localCard;
                    });
                    
                    setCards(mergedCards);
                }
            }
        } catch (e: any) {
            if (e.name !== 'AbortError') {
                console.warn("Cards fetch failed:", e.message);
            }
        }

        // 2. Merchants - USE API ROUTE to bypass RLS
        // IMPORTANT: Prioritize LOCAL static data for logos (most up-to-date)
        // DB data is only used for merchants not in local data
        try {
            const merchantsRes = await fetch('/api/admin/merchants', { signal: controller.signal });
            if (merchantsRes.ok) {
                const { merchants: merchantsData } = await merchantsRes.json();
                
                if (merchantsData && merchantsData.length > 0) {
                    const dbMerchants: Merchant[] = merchantsData.map(mapMerchantFromDB);
                    // Create a map of DB merchants by ID for quick lookup
                    const dbMerchantMap = new Map<string, Merchant>(dbMerchants.map((m) => [m.id, m]));
                    
                    // Merge: DB logo takes priority if available (user uploaded)
                    const mergedMerchants: Merchant[] = POPULAR_MERCHANTS.map(localMerchant => {
                        const dbMerchant = dbMerchantMap.get(localMerchant.id);
                        if (dbMerchant) {
                            // DB logo takes priority if it exists and is a valid URL
                            // This ensures user-uploaded logos are always used
                            const useDbLogo = dbMerchant.logo && 
                                typeof dbMerchant.logo === 'string' && 
                                (dbMerchant.logo.startsWith('http') || dbMerchant.logo.startsWith('/'));
                            return {
                                ...localMerchant, // Start with local data
                                ...dbMerchant,    // Override with DB data
                                logo: useDbLogo ? dbMerchant.logo : localMerchant.logo, // DB logo takes priority
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
            }
        } catch (e: any) {
            if (e.name !== 'AbortError') {
                console.warn("Merchants fetch failed:", e.message);
            }
        }

        // 3. Promos - 自動合併：資料庫 + 本地文件
        // 這樣新增到 promos.ts 的文章會自動顯示，無需手動同步
        try {
            const promosRes = await fetch('/api/admin/promos', { signal: controller.signal });
            if (promosRes.ok) {
                const { promos: promosData } = await promosRes.json();
                
                // 建立資料庫 promos 的 ID Set
                const dbPromoIds = new Set((promosData || []).map((p: any) => p.id));
                const dbPromos = (promosData || []).map(mapPromoFromDB);
                
                // 找出本地有但資料庫沒有的 promos（新增的文章）
                const localOnlyPromos = PROMOS
                    .filter(p => !dbPromoIds.has(p.id))
                    .map(p => ({
                        ...p,
                        // 確保有 contentType 欄位
                        contentType: 'promo' as const,
                    }));
                
                if (localOnlyPromos.length > 0) {
                    console.log(`[DataStore] 發現 ${localOnlyPromos.length} 篇本地新文章，自動合併顯示`);
                }
                
                // 合併：資料庫優先 + 本地新增
                const mergedPromos = [...dbPromos, ...localOnlyPromos];
                
                // 排序：isPinned (未過期) > updatedAt
                const now = new Date();
                const isEffectivelyPinned = (p: any) => {
                    if (!p.isPinned) return false;
                    // 如果設定了 pinnedUntil，檢查是否已過期
                    if (p.pinnedUntil) {
                        const pinExpiry = new Date(p.pinnedUntil);
                        pinExpiry.setHours(23, 59, 59, 999); // 當日結束
                        return now <= pinExpiry;
                    }
                    return true; // 無設定到期時間 = 永久置頂
                };
                
                mergedPromos.sort((a, b) => {
                    // 1. Pinned first (檢查是否有效置頂)
                    const aIsPinned = isEffectivelyPinned(a);
                    const bIsPinned = isEffectivelyPinned(b);
                    if (aIsPinned && !bIsPinned) return -1;
                    if (!aIsPinned && bIsPinned) return 1;
                    // 2. updatedAt (newest first)
                    const aUpdated = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
                    const bUpdated = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
                    return bUpdated - aUpdated;
                });
                
                setPromos(mergedPromos);
            } else {
                // 如果資料庫請求失敗，直接使用本地 PROMOS
                console.log('[DataStore] 資料庫請求失敗，使用本地 PROMOS');
                setPromos(PROMOS.map(p => ({ ...p, contentType: 'promo' as const })));
            }
        } catch (e: any) {
            if (e.name !== 'AbortError') {
                console.warn("Promos fetch failed:", e.message);
                // Fallback to local PROMOS
                setPromos(PROMOS.map(p => ({ ...p, contentType: 'promo' as const })));
            }
        }
        
        clearTimeout(timeoutId); // Clean up timeout
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

  // Special function to seed DB if empty (Cards & Merchants only)
  // Promos 現在使用專用的同步腳本：scripts/sync-to-db.ts
  const uploadInitialData = async () => {
    setIsLoading(true);
    try {
        // Fetch existing cards to preserve uploaded images
        const { data: existingCards } = await supabase.from('cards').select('id, image_url');
        const existingImagesMap = new Map();
        if (existingCards) {
            existingCards.forEach((c: any) => {
                // Preserve ANY valid HTTP/HTTPS URL as uploaded image
                if (c.image_url && (c.image_url.startsWith("http://") || c.image_url.startsWith("https://"))) {
                    existingImagesMap.set(c.id, c.image_url);
                }
            });
        }
        
        // Upload Cards (preserving existing images)
        for (const card of HK_CARDS) {
            const payload = mapCardToDB(card);
            // Preserve existing uploaded image
            if (existingImagesMap.has(card.id)) {
                payload.image_url = existingImagesMap.get(card.id);
            }
            await supabase.from('cards').upsert(payload);
        }
        // Upload Merchants
        for (const merchant of POPULAR_MERCHANTS) {
            await supabase.from('merchants').upsert(mapMerchantToDB(merchant));
        }
        // 注意：Promos 不再從這裡上傳，請使用 scripts/sync-to-db.ts
        toast.success("Cards & Merchants 已上傳！Promos 請用同步腳本。");
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
