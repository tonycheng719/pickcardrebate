"use client";

// Context for managing user wallet and global state
import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";
import { Transaction } from "../types";
import { createClient } from "@/lib/supabase/client";
import type { AuthChangeEvent, Session, User } from "@supabase/supabase-js";
// import { logUserIp } from "@/app/actions/log-ip"; // Temporarily disabled to fix Server Action error
import { useRouter, usePathname } from "next/navigation";
import { fetchUserWallet } from "@/lib/wallet-sync"; // Only keep fetchUserWallet
import { toast } from "sonner"; // Import toast for error feedback

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
  id?: string; // Added ID
  name: string;
  email?: string;
  avatar?: string;
  gender?: "male" | "female" | "other";
  district?: string;
  birthYear?: number;
  birthMonth?: number;
  lastIp?: string;
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
  updateCardSetting: (cardId: string, settings: Partial<CardSettings>) => void;
  addAllCards: (cardIds: string[]) => void;
  
  user: UserProfile | null;
  loginWithOAuth: (provider: "google" | "apple") => Promise<void>;
  requestSmsOtp: (phone: string) => Promise<void>;
  verifySmsOtp: (phone: string, token: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (profile: Partial<UserProfile>) => Promise<void>;
  
  // Transactions
  transactions: Transaction[];
  addTransaction: (tx: Omit<Transaction, "id">) => void;
  removeTransaction: (id: string) => void;

  // Promos
  followPromo: (promoId: string) => void;
  unfollowPromo: (promoId: string) => void;
  isPromoFollowed: (promoId: string) => boolean;
  rewardPreference: "cash" | "miles";
  toggleRewardPreference: () => void;
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
  const [isWalletSynced, setIsWalletSynced] = useState(false); // New state to track if cloud sync is done
  const [localRewardPreference, setLocalRewardPreference] = useState<"cash" | "miles">("cash");
  const supabase = useMemo(() => createClient(), []);
  const router = useRouter();
  const pathname = usePathname();

  // API Helper for Wallet Sync
  const apiSyncWallet = async (action: string, payload: any) => {
    try {
        const response = await fetch("/api/wallet/sync", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action, ...payload })
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Wallet sync failed");
        }
    } catch (error: any) {
        console.error(`API Sync Error (${action}):`, error);
        // Show error to user to indicate persistence failure
        toast.error("雲端同步失敗", { description: "請檢查網絡或稍後再試 (Error: " + error.message + ")" });
    }
  };

  // Load initial data from local storage
  useEffect(() => {
    const savedCards = localStorage.getItem("pickcardrebate_wallet_cards");
    const savedSettings = localStorage.getItem("pickcardrebate_wallet_settings");
    const savedUser = localStorage.getItem("pickcardrebate_user");
    const savedTransactions = localStorage.getItem("pickcardrebate_transactions");
    const savedPreference = localStorage.getItem("pickcardrebate_reward_preference");
    
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

    if (savedPreference) {
        setLocalRewardPreference(savedPreference as "cash" | "miles");
    }
    
    setIsLoaded(true);
  }, []);

  // Persist data to local storage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("pickcardrebate_wallet_cards", JSON.stringify(myCardIds));
      localStorage.setItem("pickcardrebate_wallet_settings", JSON.stringify(cardSettings));
      localStorage.setItem("pickcardrebate_reward_preference", localRewardPreference);
      if (user) {
        localStorage.setItem("pickcardrebate_user", JSON.stringify(user));
      } else {
        localStorage.removeItem("pickcardrebate_user");
      }
      localStorage.setItem("pickcardrebate_transactions", JSON.stringify(transactions));
    }
  }, [myCardIds, cardSettings, user, transactions, isLoaded, localRewardPreference]);


  const initializeWalletSync = useCallback(async (userId: string) => {
    try {
        // 1. Fetch cloud data (Reading is usually fine with public policies)
        const cloudData = await fetchUserWallet(supabase, userId);
        
        // 2. Merge logic
        if (cloudData.myCardIds.length === 0 && Object.keys(cloudData.cardSettings).length === 0) {
             // Cloud empty, upload local
             const localCardsStr = localStorage.getItem("pickcardrebate_wallet_cards");
             const localSettingsStr = localStorage.getItem("pickcardrebate_wallet_settings");
             
             const localCards = localCardsStr ? JSON.parse(localCardsStr) : [];
             // We skip uploading settings in batch for now to keep API simple, or iterate
             // Ideally api/wallet/sync should support full batch.
             // For now, let's just upload cards in batch.

             if (localCards.length > 0) {
                 await apiSyncWallet("batch_add", { userId, cardIds: localCards });
             }
        } else {
             // Cloud has data, merge
             const localCardsStr = localStorage.getItem("pickcardrebate_wallet_cards");
             const localSettingsStr = localStorage.getItem("pickcardrebate_wallet_settings");
             const localCards = localCardsStr ? JSON.parse(localCardsStr) : [];
             const localSettings = localSettingsStr ? JSON.parse(localSettingsStr) : {};

             const mergedIds = Array.from(new Set([...cloudData.myCardIds, ...localCards]));
             const mergedSettings = { ...localSettings, ...cloudData.cardSettings };

             setMyCardIds(mergedIds);
             setCardSettings(mergedSettings);

             // Sync missing to cloud
             const missingInCloud = mergedIds.filter(id => !cloudData.myCardIds.includes(id));
             if (missingInCloud.length > 0) {
                 await apiSyncWallet("batch_add", { userId, cardIds: missingInCloud });
             }
        }
        
        setIsWalletSynced(true);
    } catch (e) {
        console.error("Wallet Sync Failed", e);
    }
  }, [supabase]);

  const buildUserFromSession = useCallback(
    (sessionUser: User, profileData?: any): UserProfile => {
      const fullName =
        profileData?.name ||
        sessionUser.user_metadata?.full_name ||
        sessionUser.user_metadata?.name ||
        sessionUser.email?.split("@")[0] ||
        "PickCardRebate 會員";

      return {
        id: sessionUser.id,
        name: fullName,
        email: sessionUser.email ?? undefined,
        avatar: profileData?.avatar_url || sessionUser.user_metadata?.avatar_url,
        gender: profileData?.gender,
        district: profileData?.district,
        lastIp: profileData?.last_ip,
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
        setIsWalletSynced(false);
        return;
      }

      // logUserIp().catch(console.error); // Disabled to prevent "Failed to find Server Action" error

      try {
        const { data } = await supabase
          .from("profiles")
          .select("name, avatar_url, gender, district, last_ip, reward_preference, notifications, followed_promo_ids")
          .eq("id", sessionUser.id)
          .maybeSingle();

        const profile = buildUserFromSession(sessionUser, data);
        setUser(profile);
        
        // Start Wallet Sync
        initializeWalletSync(sessionUser.id);

      } catch (error) {
        console.error("Failed to load Supabase profile", error);
        setUser(buildUserFromSession(sessionUser));
      }
    },
    [buildUserFromSession, supabase, initializeWalletSync]
  );

  // Onboarding Redirect Logic
  useEffect(() => {
    if (isLoaded && user) {
        if ((!user.gender || !user.district) && pathname !== "/onboarding") {
            console.log("User missing onboarding info", user);
        }
    }
  }, [user, isLoaded, pathname, router]);

  useEffect(() => {
    const syncSession = async () => {
      const { data } = await supabase.auth.getSession();
      await hydrateSupabaseUser(data.session?.user ?? null);
    };

    syncSession();
    const { data: listener } = supabase.auth.onAuthStateChange(async (_event: AuthChangeEvent, session: Session | null) => {
      await hydrateSupabaseUser(session?.user ?? null);
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, [supabase, hydrateSupabaseUser]);


  const addCard = async (cardId: string) => {
    if (!myCardIds.includes(cardId)) {
      setMyCardIds(prev => [...prev, cardId]);
      
      // Sync to cloud via API
      if (user?.id) {
          await apiSyncWallet("add", { userId: user.id, cardId });
      }
    }
  };

  const addAllCards = async (cardIds: string[]) => {
    setMyCardIds(prev => {
      const newIds = [...prev];
      const idsToAdd: string[] = [];
      cardIds.forEach(id => {
        if (!newIds.includes(id)) {
          newIds.push(id);
          idsToAdd.push(id);
        }
      });
      
      // Sync to cloud via API
      if (user?.id && idsToAdd.length > 0) {
          apiSyncWallet("batch_add", { userId: user.id, cardIds: idsToAdd });
      }

      return newIds;
    });
  };

  const removeCard = async (cardId: string) => {
    setMyCardIds(prev => prev.filter((id) => id !== cardId));
    
    // Sync to cloud via API
    if (user?.id) {
        await apiSyncWallet("remove", { userId: user.id, cardId });
    }
  };

  const loginWithOAuth = async (provider: "google" | "apple") => {
    const redirectUrl = "https://pickcardrebate-web.zeabur.app/auth/callback";
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: redirectUrl,
        queryParams: {
          prompt: 'consent',
        }
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
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      setMyCardIds([]); // Clear sensitive data on logout
      setCardSettings({});
      setIsWalletSynced(false);
      localStorage.removeItem("pickcardrebate_user");
      localStorage.removeItem("pickcardrebate_wallet_cards");
      localStorage.removeItem("pickcardrebate_wallet_settings");
      localStorage.removeItem("pickcardrebate_transactions");
    }
  };

  const updateProfile = async (profile: Partial<UserProfile>) => {
    if (user && user.id) {
      const newUser = { ...user, ...profile };
      setUser(newUser);

      const updates: any = {};
      if (profile.name) updates.name = profile.name;
      if (profile.avatar) updates.avatar_url = profile.avatar;
      if (profile.gender) updates.gender = profile.gender;
      if (profile.district) updates.district = profile.district;
      if (profile.birthYear) updates.birth_year = profile.birthYear;
      if (profile.birthMonth) updates.birth_month = profile.birthMonth;
      if (profile.lastIp) updates.last_ip = profile.lastIp;
      if (profile.rewardPreference) updates.reward_preference = profile.rewardPreference;
      if (profile.notifications) updates.notifications = profile.notifications;
      if (profile.followedPromoIds) updates.followed_promo_ids = profile.followedPromoIds;

      const { error } = await supabase
        .from("profiles")
        .update(updates)
        .eq("id", user.id);

      if (error) {
        console.error("Error updating profile:", error);
      }
    }
  };

  const hasCard = (cardId: string) => {
    return myCardIds.includes(cardId);
  };

  const updateCardSetting = async (cardId: string, settings: Partial<CardSettings>) => {
    setCardSettings(prev => {
        const newSettings = {
            ...prev,
            [cardId]: {
                ...prev[cardId],
                ...settings
            }
        };
        
        // Sync to cloud via API
        if (user?.id) {
             const updatedSetting = newSettings[cardId];
             apiSyncWallet("settings", { userId: user.id, cardId, settings: updatedSetting });
        }
        
        return newSettings;
    });
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

  const followPromo = (promoId: string) => {
      if (user) {
          const newFollowed = [...(user.followedPromoIds || []), promoId];
          const uniqueFollowed = [...new Set(newFollowed)];
          setUser({ ...user, followedPromoIds: uniqueFollowed });
          // Ideally we should sync this too, but it's part of updateProfile technically
          // Let's call updateProfile for consistency
          updateProfile({ followedPromoIds: uniqueFollowed });
      }
  };

  const unfollowPromo = (promoId: string) => {
      if (user && user.followedPromoIds) {
          const newFollowed = user.followedPromoIds.filter(id => id !== promoId);
          setUser({ ...user, followedPromoIds: newFollowed });
          updateProfile({ followedPromoIds: newFollowed });
      }
  };

  const isPromoFollowed = (promoId: string) => {
      return user?.followedPromoIds?.includes(promoId) || false;
   };

  const toggleRewardPreference = async () => {
    const newPreference = (user?.rewardPreference || localRewardPreference) === "cash" ? "miles" : "cash";
    
    if (user) {
        await updateProfile({ rewardPreference: newPreference });
    }
    
    setLocalRewardPreference(newPreference);
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
    isPromoFollowed,
    rewardPreference: user?.rewardPreference || localRewardPreference,
    toggleRewardPreference
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
