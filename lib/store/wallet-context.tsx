"use client";

// Context for managing user wallet and global state
import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";
import { Transaction } from "../types";
import { createClient } from "@/lib/supabase/client";
import type { AuthChangeEvent, Session, User } from "@supabase/supabase-js";
import { logUserIp } from "@/app/actions/log-ip";
import { useRouter, usePathname } from "next/navigation";
import { fetchUserWallet, syncCardToAdd, syncCardToRemove, syncCardSettings, uploadLocalWallet } from "@/lib/wallet-sync";

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
  const supabase = useMemo(() => createClient(), []);
  const router = useRouter();
  const pathname = usePathname();

  // Load initial data from local storage
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

  // Persist data to local storage whenever it changes
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


  const initializeWalletSync = useCallback(async (userId: string) => {
    try {
        // 1. Fetch cloud data
        const cloudData = await fetchUserWallet(supabase, userId);
        
        // 2. Merge logic
        // If cloud is empty, upload local (if any)
        if (cloudData.myCardIds.length === 0 && Object.keys(cloudData.cardSettings).length === 0) {
             // We access current state from refs or assume state is up to date if called after mount
             // But here we are inside a callback. 
             // Ideally, we should upload whatever is currently in 'myCardIds' and 'cardSettings' state
             // However, state might be closure-captured. 
             // Let's rely on the state passed/captured, or read from localStorage for truth during init.
             const localCardsStr = localStorage.getItem("pickcardrebate_wallet_cards");
             const localSettingsStr = localStorage.getItem("pickcardrebate_wallet_settings");
             
             const localCards = localCardsStr ? JSON.parse(localCardsStr) : [];
             const localSettings = localSettingsStr ? JSON.parse(localSettingsStr) : {};

             if (localCards.length > 0) {
                 await uploadLocalWallet(supabase, userId, localCards, localSettings);
                 // State is already localCards, so no need to set
             }
        } else {
             // Cloud has data.
             // Merge strategy: Cloud wins for existence, but we can merge local-only cards too?
             // For simplicity: Union of IDs, merge settings.
             // Actually, commonly: Cloud overrides local on login, OR merges.
             // Let's do: Union of IDs.
             
             const localCardsStr = localStorage.getItem("pickcardrebate_wallet_cards");
             const localSettingsStr = localStorage.getItem("pickcardrebate_wallet_settings");
             const localCards = localCardsStr ? JSON.parse(localCardsStr) : [];
             const localSettings = localSettingsStr ? JSON.parse(localSettingsStr) : {};

             const mergedIds = Array.from(new Set([...cloudData.myCardIds, ...localCards]));
             const mergedSettings = { ...localSettings, ...cloudData.cardSettings }; // Cloud settings overwrite local for same keys? or vice versa. Let's say Cloud wins.

             setMyCardIds(mergedIds);
             setCardSettings(mergedSettings);

             // If there were local items not in cloud, sync them up
             // Find items in merged but not in cloud (which means they were local)
             const missingInCloud = mergedIds.filter(id => !cloudData.myCardIds.includes(id));
             if (missingInCloud.length > 0) {
                 await uploadLocalWallet(supabase, userId, missingInCloud, localSettings);
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

      // Log IP in background
      logUserIp().catch(console.error);

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
      
      // Sync to cloud if logged in
      if (user?.id) {
          try {
            await syncCardToAdd(supabase, user.id, cardId);
          } catch (e) {
              console.error("Cloud sync failed for addCard", e);
          }
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
      
      // Sync to cloud if logged in
      if (user?.id && idsToAdd.length > 0) {
           // Initial simple loop, can be optimized with bulk insert if needed, 
           // but addAllCards is rare (usually init).
           // Actually uploadLocalWallet can handle bulk upsert.
           // But we don't have settings here. 
           // Just iterate for now or use a bulk add helper (not implemented yet for cards only).
           // Let's use syncCardToAdd in loop for simplicity or uploadLocalWallet logic.
           uploadLocalWallet(supabase, user.id, idsToAdd, {}).catch(console.error);
      }

      return newIds;
    });
  };

  const removeCard = async (cardId: string) => {
    setMyCardIds(prev => prev.filter((id) => id !== cardId));
    
    // Sync to cloud if logged in
    if (user?.id) {
        try {
            await syncCardToRemove(supabase, user.id, cardId);
        } catch (e) {
            console.error("Cloud sync failed for removeCard", e);
        }
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
        
        // Sync to cloud if logged in
        if (user?.id) {
             const updatedSetting = newSettings[cardId];
             syncCardSettings(supabase, user.id, cardId, updatedSetting).catch(e => console.error("Cloud sync failed for settings", e));
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
