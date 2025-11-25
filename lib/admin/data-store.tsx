"use client";

import { useState, useEffect, useCallback, useContext, createContext } from "react";
import { CreditCard, Merchant, Promo, Category } from "../types";
import { HK_CARDS } from "../data/cards";
import { POPULAR_MERCHANTS } from "../data/merchants";
import { CATEGORIES } from "../data/categories";
import { PROMOS } from "../data/promos";

// Define storage keys
const STORAGE_KEYS = {
  cards: "pickcardrebate_cards",
  merchants: "pickcardrebate_merchants",
  promos: "pickcardrebate_promos",
  version: "pickcardrebate_data_version",
};

const CURRENT_DATA_VERSION = "1.8"; // Increment this to force data reset

// Generic hook for persistent array state with version check
function usePersistentArray<T extends { id: string }>(
  key: string,
  initialData: T[],
  version: string
): [T[], (updater: (prev: T[]) => T[]) => void] {
  const [data, setData] = useState<T[]>(initialData); // Start with initialData to avoid hydration mismatch
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedVersion = localStorage.getItem(STORAGE_KEYS.version);
    const savedData = localStorage.getItem(key);

    if (savedVersion !== version) {
      // Version mismatch, reset to initial data
      console.log(`Data version mismatch (stored: ${savedVersion}, current: ${version}). Resetting ${key}.`);
      setData(initialData);
      localStorage.setItem(key, JSON.stringify(initialData));
      // Only set version once per app load cycle usually, but here we do it per hook call which is fine
      if (key === STORAGE_KEYS.cards) { // Use one key as master to set version
          localStorage.setItem(STORAGE_KEYS.version, version);
      }
    } else if (savedData) {
      try {
        setData(JSON.parse(savedData));
      } catch (e) {
        console.error(`Failed to parse ${key} from localStorage`, e);
        setData(initialData);
      }
    } else {
        // First time load or no data
        setData(initialData);
    }
    setIsLoaded(true);
  }, [key, initialData, version]);

  const updateData = useCallback((updater: (prev: T[]) => T[]) => {
    setData((prev) => {
      const next = updater(prev);
      if (typeof window !== "undefined") {
        localStorage.setItem(key, JSON.stringify(next));
      }
      return next;
    });
  }, [key]);

  return [data, updateData];
}

// Admin Data Store Context
interface AdminDataStoreContextType {
  cards: CreditCard[];
  addOrUpdateCard: (card: CreditCard) => void;
  removeCard: (id: string) => void;
  merchants: Merchant[];
  addOrUpdateMerchant: (merchant: Merchant) => void;
  removeMerchant: (id: string) => void;
  promos: Promo[];
  addOrUpdatePromo: (promo: Promo) => void;
  removePromo: (id: string) => void;
  categories: Category[]; // Categories are static for now
}

const AdminDataStoreContext = createContext<AdminDataStoreContextType | undefined>(undefined);

export function DataStoreProvider({ children }: { children: React.ReactNode }) {
  const [cards, updateCards] = usePersistentArray<CreditCard>(STORAGE_KEYS.cards, HK_CARDS, CURRENT_DATA_VERSION);
  const [merchants, updateMerchants] = usePersistentArray<Merchant>(STORAGE_KEYS.merchants, POPULAR_MERCHANTS, CURRENT_DATA_VERSION);
  const [promos, updatePromos] = usePersistentArray<Promo>(STORAGE_KEYS.promos, PROMOS, CURRENT_DATA_VERSION);
  const categories = CATEGORIES; // Categories remain static

  const addOrUpdateCard = useCallback(
    (card: CreditCard) => {
      updateCards((prev) => {
        const index = prev.findIndex((c) => c.id === card.id);
        if (index === -1) return [...prev, card];
        const next = [...prev];
        next[index] = card;
        return next;
      });
    },
    [updateCards]
  );

  const removeCard = useCallback(
    (id: string) => {
      updateCards((prev) => prev.filter((c) => c.id !== id));
    },
    [updateCards]
  );

  const addOrUpdateMerchant = useCallback(
    (merchant: Merchant) => {
      updateMerchants((prev) => {
        const index = prev.findIndex((m) => m.id === merchant.id);
        if (index === -1) return [...prev, merchant];
        const next = [...prev];
        next[index] = merchant;
        return next;
      });
    },
    [updateMerchants]
  );

  const removeMerchant = useCallback(
    (id: string) => {
      updateMerchants((prev) => prev.filter((m) => m.id !== id));
    },
    [updateMerchants]
  );

  const addOrUpdatePromo = useCallback(
    (promo: Promo) => {
      updatePromos((prev) => {
        const index = prev.findIndex((p) => p.id === promo.id);
        if (index === -1) return [...prev, promo];
        const next = [...prev];
        next[index] = promo;
        return next;
      });
    },
    [updatePromos]
  );

  const removePromo = useCallback(
    (id: string) => {
      updatePromos((prev) => prev.filter((p) => p.id !== id));
    },
    [updatePromos]
  );

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
  };

  return <AdminDataStoreContext.Provider value={value}>{children}</AdminDataStoreContext.Provider>;
}

// Hook for admin pages (read/write)
export function useAdminDataStore() {
  const context = useContext(AdminDataStoreContext);
  if (context === undefined) {
    throw new Error("useAdminDataStore must be used within a DataStoreProvider");
  }
  return context;
}

// Hook for frontend pages (read-only)
export function useDataset() {
  const context = useContext(AdminDataStoreContext);
  if (context === undefined) {
    throw new Error("useDataset must be used within a DataStoreProvider");
  }
  // Return only read-only parts for frontend
  return {
    cards: context.cards,
    merchants: context.merchants,
    promos: context.promos,
    categories: context.categories,
  };
}
