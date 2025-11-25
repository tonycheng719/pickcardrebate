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
        relatedCardIds: dbPromo.related_card_ids || []
    };
}

function mapPromoToDB(promo: Promo): any {
    return {
        id: promo.id,
        title: promo.title,
        description: promo.description,
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

export function DataStoreProvider({ children }: { children: React.ReactNode }) {
  const [cards, setCards] = useState<CreditCard[]>(HK_CARDS); // Default to local first for instant load
  const [merchants, setMerchants] = useState<Merchant[]>(POPULAR_MERCHANTS);
  const [promos, setPromos] = useState<Promo[]>(PROMOS);
  const [isLoading, setIsLoading] = useState(true);
  
  const supabase = createClient();
  const categories = CATEGORIES;

  const refreshData = useCallback(async () => {
    setIsLoading(true);
    try {
        // 1. Cards
        const { data: cardsData, error: cardsError } = await supabase.from('cards').select('*');
        if (cardsError) throw cardsError;
        if (cardsData && cardsData.length > 0) {
            setCards(cardsData.map(mapCardFromDB));
        }

        // 2. Merchants
        const { data: merchantsData, error: merchantsError } = await supabase.from('merchants').select('*');
        if (merchantsError) throw merchantsError;
        if (merchantsData && merchantsData.length > 0) {
            setMerchants(merchantsData.map(mapMerchantFromDB));
        }

        // 3. Promos
        const { data: promosData, error: promosError } = await supabase.from('promos').select('*');
        if (promosError) throw promosError;
        if (promosData && promosData.length > 0) {
            setPromos(promosData.map(mapPromoFromDB));
        }
    } catch (error) {
        console.error("Error fetching data from Supabase:", error);
        toast.error("無法從雲端加載數據，已切換至本地模式");
    } finally {
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
        const { error } = await supabase.from('cards').upsert(mapCardToDB(card));
        if (error) throw error;
        toast.success("卡片已儲存至雲端");
    } catch (e) {
        console.error(e);
        toast.error("儲存失敗");
        // Revert logic could go here
    }
  };

  const removeCard = async (id: string) => {
    setCards(prev => prev.filter(c => c.id !== id));
    try {
        const { error } = await supabase.from('cards').delete().eq('id', id);
        if (error) throw error;
        toast.success("卡片已刪除");
    } catch (e) {
        console.error(e);
        toast.error("刪除失敗");
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
        const { error } = await supabase.from('merchants').upsert(mapMerchantToDB(merchant));
        if (error) throw error;
        toast.success("商戶已儲存");
    } catch (e) {
        console.error(e);
        toast.error("儲存失敗");
    }
  };

  const removeMerchant = async (id: string) => {
    setMerchants(prev => prev.filter(m => m.id !== id));
    try {
        const { error } = await supabase.from('merchants').delete().eq('id', id);
        if (error) throw error;
        toast.success("商戶已刪除");
    } catch (e) {
        console.error(e);
        toast.error("刪除失敗");
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
        const { error } = await supabase.from('promos').upsert(mapPromoToDB(promo));
        if (error) throw error;
        toast.success("優惠已儲存");
    } catch (e) {
        console.error(e);
        toast.error("儲存失敗");
    }
  };

  const removePromo = async (id: string) => {
    setPromos(prev => prev.filter(p => p.id !== id));
    try {
        const { error } = await supabase.from('promos').delete().eq('id', id);
        if (error) throw error;
        toast.success("優惠已刪除");
    } catch (e) {
        console.error(e);
        toast.error("刪除失敗");
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
  };
}
