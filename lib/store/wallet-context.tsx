"use client";

// Context for managing user wallet and global state
import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";
import { Transaction } from "../types";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

export interface CardSettings {
  note?: string;
  annualFeeDate?: string; // YYYY-MM-DD
  welcomeOffer?: {
    enabled: boolean;
    targetAmount: number;
    currentAmount: number;
    deadline: string; // YYYY-MM-DD
  };
}

export interface UserProfile {
  name: string;
  email?: string;
  avatar?: string;
  rewardPreference: "cash" | "miles";
  notifications: {
    promos: boolean;
    bills: boolean;
    community: boolean;
  };
  followedPromoIds?: string[];
}

interface WalletContextType {
  myCardIds: string[];
  cardSettings: Record<string, CardSettings>;
  addCard: (cardId: string) => void;
  removeCard: (cardId: string) => void;
  hasCard: (cardId: string) => boolean;
  updateCardSetting: (cardId: string, settings: Partial<CardSettings>) => void; // Renamed from updateCardSetting
  addAllCards: (cardIds: string[]) => void;
  user: UserProfile | null;
  loginWithOAuth: (provider: "google" | "apple") => Promise<void>;
  requestSmsOtp: (phone: string) => Promise<void>;
  verifySmsOtp: (phone: string, token: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (profile: Partial<UserProfile>) => void;
  
  // Transactions
  transactions: Transaction[];
  addTransaction: (tx: Omit<Transaction, "id">) => void;
  removeTransaction: (id: string) => void;

  // Promos
  followPromo: (promoId: string) => void;
  unfollowPromo: (promoId: string) => void;
  isPromoFollowed: (promoId: string) => boolean;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);
const DEFAULT_NOTIFICATIONS = {
  promos: true,
  bills: true,
  community: true,
};

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [myCardIds, setMyCardIds] = useState<string[]>([]);
  const [cardSettings, setCardSettings] = useState<Record<string, CardSettings>>({});
  const [user, setUser] = useState<UserProfile | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const supabase = useMemo(() => createClient(), []);

  const buildUserFromSession = useCallback(
    (sessionUser: User, profileData?: any): UserProfile => {
      const fullName =
        profileData?.name ||
        sessionUser.user_metadata?.full_name ||
        sessionUser.user_metadata?.name ||
        sessionUser.email?.split("@")[0] ||
        "PickCardRebate 會員";

      return {
        name: fullName,
        email: sessionUser.email ?? undefined,
        avatar: profileData?.avatar_url || sessionUser.user_metadata?.avatar_url,
        rewardPreference: (profileData?.reward_preference as "cash" | "miles") || "cash",
        notifications: profileData?.notifications || DEFAULT_NOTIFICATIONS,
        followedPromoIds: profileData?.followed_promo_ids || [],
      };
    },
    []
  );

  const hydrateSupabaseUser = useCallback(
    async (sessionUser: User | null) => {
      if (!sessionUser) {
        setUser(null);
        return;
      }

      try {
        const { data } = await supabase
          .from("profiles")
          .select("name, avatar_url, reward_preference, notifications, followed_promo_ids")
          .eq("id", sessionUser.id)
          .maybeSingle();

        const profile = buildUserFromSession(sessionUser, data);
        setUser(profile);
      } catch (error) {
        console.error("Failed to load Supabase profile", error);
        setUser(buildUserFromSession(sessionUser));
      }
    },
    [buildUserFromSession, supabase]
  );

  useEffect(() => {
    const savedCards = localStorage.getItem("pickcardrebate_wallet_cards");
    const savedSettings = localStorage.getItem("pickcardrebate_wallet_settings");
    const savedUser = localStorage.getItem("pickcardrebate_user");
    const savedTransactions = localStorage.getItem("pickcardrebate_transactions");
    
    if (savedCards) {
      try {
        setMyCardIds(JSON.parse(savedCards));
      } catch (e) {
        console.error("Failed to parse wallet data", e);
      }
    }

    if (savedSettings) {
      try {
        setCardSettings(JSON.parse(savedSettings));
      } catch (e) {
        console.error("Failed to parse settings data", e);
      }
    }

    if (savedUser) {
        try {
            const parsedUser = JSON.parse(savedUser);
            const migratedUser: UserProfile = {
                ...parsedUser,
                rewardPreference: parsedUser.rewardPreference || "cash",
                notifications: parsedUser.notifications || {
                    promos: true,
                    bills: true,
                    community: true
                },
                followedPromoIds: parsedUser.followedPromoIds || []
            };
            setUser(migratedUser);
        } catch (e) {
            console.error("Failed to parse user data", e);
        }
    }

    if (savedTransactions) {
        try {
            setTransactions(JSON.parse(savedTransactions));
        } catch (e) {
            console.error("Failed to parse transactions", e);
        }
    }
    
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const syncSession = async () => {
      const { data } = await supabase.auth.getSession();
      await hydrateSupabaseUser(data.session?.user ?? null);
    };

    syncSession();
    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      await hydrateSupabaseUser(session?.user ?? null);
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, [supabase, hydrateSupabaseUser]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("pickcardrebate_wallet_cards", JSON.stringify(myCardIds));
      localStorage.setItem("pickcardrebate_wallet_settings", JSON.stringify(cardSettings));
      if (user) {
        localStorage.setItem("pickcardrebate_user", JSON.stringify(user));
      } else {
        localStorage.removeItem("pickcardrebate_user");
      }
      localStorage.setItem("pickcardrebate_transactions", JSON.stringify(transactions));
    }
  }, [myCardIds, cardSettings, user, transactions, isLoaded]);

  const addCard = (cardId: string) => {
    if (!myCardIds.includes(cardId)) {
      setMyCardIds([...myCardIds, cardId]);
    }
  };

  const addAllCards = (cardIds: string[]) => {
    setMyCardIds(prev => {
      const newIds = [...prev];
      cardIds.forEach(id => {
        if (!newIds.includes(id)) {
          newIds.push(id);
        }
      });
      return newIds;
    });
  };

  const removeCard = (cardId: string) => {
    setMyCardIds(myCardIds.filter((id) => id !== cardId));
  };

  const loginWithOAuth = async (provider: "google" | "apple") => {
    const redirectUrl =
      typeof window !== "undefined" ? `${window.location.origin}/auth/callback` : undefined;
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: redirectUrl,
      },
    });

    if (error) {
      throw error;
    }
  };

  const requestSmsOtp = async (phone: string) => {
    const formatted = phone.startsWith("+") ? phone : `+852${phone}`;
    const { error } = await supabase.auth.signInWithOtp({
      phone: formatted,
      options: {
        channel: "sms",
        shouldCreateUser: true,
      },
    });

    if (error) {
      throw error;
    }
  };

  const verifySmsOtp = async (phone: string, token: string) => {
    const formatted = phone.startsWith("+") ? phone : `+852${phone}`;
    const { error } = await supabase.auth.verifyOtp({
      phone: formatted,
      token,
      type: "sms",
    });

    if (error) {
      throw error;
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const updateProfile = (profile: Partial<UserProfile>) => {
    if (user) {
      setUser({ ...user, ...profile });
    }
  };

  const hasCard = (cardId: string) => {
    return myCardIds.includes(cardId);
  };

  const updateCardSetting = (cardId: string, settings: Partial<CardSettings>) => {
    setCardSettings(prev => ({
      ...prev,
      [cardId]: {
        ...prev[cardId],
        ...settings
      }
    }));
  };

  // Transactions Logic
  const addTransaction = (tx: Omit<Transaction, "id">) => {
      const newTx: Transaction = {
          ...tx,
          id: Date.now().toString()
      };
      setTransactions(prev => [newTx, ...prev]);
  };

  const removeTransaction = (id: string) => {
      setTransactions(prev => prev.filter(tx => tx.id !== id));
  };

  // Promo Logic
  const followPromo = (promoId: string) => {
      if (user) {
          const newFollowed = [...(user.followedPromoIds || []), promoId];
          // Deduplicate
          const uniqueFollowed = [...new Set(newFollowed)];
          setUser({ ...user, followedPromoIds: uniqueFollowed });
      }
  };

  const unfollowPromo = (promoId: string) => {
      if (user && user.followedPromoIds) {
          setUser({ ...user, followedPromoIds: user.followedPromoIds.filter(id => id !== promoId) });
      }
  };

  const isPromoFollowed = (promoId: string) => {
      return user?.followedPromoIds?.includes(promoId) || false;
  };

  const value = {
    myCardIds,
    cardSettings,
    addCard,
    removeCard,
    hasCard,
    updateCardSetting,
    addAllCards,
    user,
    loginWithOAuth,
    requestSmsOtp,
    verifySmsOtp,
    logout,
    updateProfile,
    transactions,
    addTransaction,
    removeTransaction,
    followPromo,
    unfollowPromo,
    isPromoFollowed
  };

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
}

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};
