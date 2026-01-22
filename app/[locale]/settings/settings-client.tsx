"use client";

import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useWallet } from "@/lib/store/wallet-context";
import { User, Bell, Wallet, Save, Check, X, Loader2, AtSign } from "lucide-react";
import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Locale, localePathMap } from "@/lib/i18n/config";
import { getTranslation } from "@/lib/i18n/translations";

interface SettingsClientProps {
  locale: Locale;
}

function useDebouncedCallback<T extends (...args: any[]) => any>(callback: T, delay: number): T {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  return useCallback(
    ((...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    }) as T,
    [callback, delay]
  );
}

export default function SettingsClient({ locale }: SettingsClientProps) {
  const t = getTranslation(locale);
  const prefix = localePathMap[locale] ? `/${localePathMap[locale]}` : '';
  const { user, updateProfile } = useWallet();
  const router = useRouter();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [usernameInput, setUsernameInput] = useState("");
  const [usernameStatus, setUsernameStatus] = useState<"idle" | "checking" | "available" | "taken" | "invalid">("idle");
  const [usernameError, setUsernameError] = useState("");
  const [isSavingUsername, setIsSavingUsername] = useState(false);
  const [preference, setPreference] = useState<"cash" | "miles">("cash");
  const [notifPromos, setNotifPromos] = useState(true);
  const [notifBills, setNotifBills] = useState(true);
  
  useEffect(() => {
    if (user) {
        setName(user.name);
        setUsername(user.username || "");
        setPreference(user.rewardPreference);
        setNotifPromos(user.notifications.promos);
        setNotifBills(user.notifications.bills);
    }
  }, [user, router]);

  const checkUsername = useDebouncedCallback(async (value: string) => {
    if (!value || value.length < 3) {
      setUsernameStatus("idle");
      return;
    }

    setUsernameStatus("checking");
    try {
      const res = await fetch(`/api/user/check-username?username=${encodeURIComponent(value)}`);
      const data = await res.json();
      
      if (data.available) {
        setUsernameStatus("available");
        setUsernameError("");
      } else {
        setUsernameStatus(data.error?.includes("格式") || data.error?.includes("字符") ? "invalid" : "taken");
        setUsernameError(data.error || "Username not available");
      }
    } catch {
      setUsernameStatus("idle");
    }
  }, 500);

  const handleUsernameInputChange = (value: string) => {
    const sanitized = value.replace(/[^a-zA-Z0-9_]/g, "").slice(0, 20);
    setUsernameInput(sanitized);
    setUsernameStatus("idle");
    setUsernameError("");
    
    if (sanitized.length >= 3) {
      checkUsername(sanitized);
    }
  };

  const handleSaveUsername = async () => {
    if (!user || usernameStatus !== "available" || !usernameInput) return;
    
    setIsSavingUsername(true);
    try {
      await updateProfile({ username: usernameInput });
      setUsername(usernameInput);
      setUsernameInput("");
      setUsernameStatus("idle");
      alert(t.common.save);
      router.refresh();
    } catch (error) {
      alert(t.common.error);
    } finally {
      setIsSavingUsername(false);
    }
  };

  const handleSave = async () => {
      if (user) {
          await updateProfile({
              name,
              rewardPreference: preference,
              notifications: {
                  ...user.notifications,
                  promos: notifPromos,
                  bills: notifBills
              }
          });
          router.refresh();
          alert(t.common.save);
      }
  };

  if (!user) return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
          <Navbar />
          <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                  <p className="text-gray-500 mb-4">{t.auth.loginRequired}</p>
                  <Link href={`${prefix}/login`}>
                      <Button>{t.auth.login}</Button>
                  </Link>
              </div>
          </div>
      </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 flex-1 max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">{t.settings.title}</h1>

        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5 text-blue-600" /> Profile
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Display Name</label>
                        <Input value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{t.auth.email}</label>
                        <Input value={user.email} disabled className="bg-gray-50 text-gray-500" />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                          <AtSign className="h-4 w-4" />
                          Username
                        </label>
                        {username ? (
                          <div>
                            <Input value={`@${username}`} disabled className="bg-gray-50 text-gray-500" />
                            <p className="text-xs text-gray-500 mt-1">Username cannot be changed</p>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <div className="relative">
                              <Input
                                placeholder="Enter username (3-20 characters)"
                                value={usernameInput}
                                onChange={(e) => handleUsernameInputChange(e.target.value)}
                                className={`pr-10 ${
                                  usernameStatus === "available" ? "border-green-500" :
                                  usernameStatus === "taken" || usernameStatus === "invalid" ? "border-red-500" : ""
                                }`}
                              />
                              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                {usernameStatus === "checking" && <Loader2 className="h-5 w-5 text-gray-400 animate-spin" />}
                                {usernameStatus === "available" && <Check className="h-5 w-5 text-green-500" />}
                                {(usernameStatus === "taken" || usernameStatus === "invalid") && <X className="h-5 w-5 text-red-500" />}
                              </div>
                            </div>
                            {usernameError && <p className="text-sm text-red-500">{usernameError}</p>}
                            {usernameStatus === "available" && (
                              <div className="flex items-center gap-2">
                                <p className="text-sm text-green-600">✓ Available</p>
                                <Button size="sm" onClick={handleSaveUsername} disabled={isSavingUsername}>
                                  {isSavingUsername ? <Loader2 className="h-4 w-4 animate-spin" /> : t.common.confirm}
                                </Button>
                              </div>
                            )}
                          </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Wallet className="h-5 w-5 text-green-600" /> Preferences
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Reward Type</label>
                        <div className="grid grid-cols-2 gap-4">
                            <button 
                                className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${preference === "cash" ? "border-amber-500 bg-amber-50 text-amber-700" : "border-gray-200 hover:border-gray-300 bg-white"}`}
                                onClick={() => setPreference("cash")}
                            >
                                <span className="text-2xl">💰</span>
                                <span className="font-bold">{t.calculator.cashRebate}</span>
                            </button>
                            <button 
                                className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${preference === "miles" ? "border-sky-500 bg-sky-50 text-sky-700" : "border-gray-200 hover:border-gray-300 bg-white"}`}
                                onClick={() => setPreference("miles")}
                            >
                                <span className="text-2xl">✈️</span>
                                <span className="font-bold">{t.calculator.milesRebate}</span>
                            </button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Bell className="h-5 w-5 text-orange-600" /> {t.settings.notifications}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between py-2">
                        <div>
                            <div className="font-medium">Promo Notifications</div>
                            <div className="text-sm text-gray-500">Get notified about new offers</div>
                        </div>
                        <button 
                            onClick={() => setNotifPromos(!notifPromos)}
                            className={`w-12 h-6 rounded-full transition-colors relative ${notifPromos ? "bg-blue-600" : "bg-gray-300"}`}
                        >
                            <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${notifPromos ? "left-7" : "left-1"}`} />
                        </button>
                    </div>
                    <div className="flex items-center justify-between py-2 border-t">
                        <div>
                            <div className="font-medium">Annual Fee Reminders</div>
                            <div className="text-sm text-gray-500">Remind 30 days before</div>
                        </div>
                        <button 
                            onClick={() => setNotifBills(!notifBills)}
                            className={`w-12 h-6 rounded-full transition-colors relative ${notifBills ? "bg-blue-600" : "bg-gray-300"}`}
                        >
                            <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${notifBills ? "left-7" : "left-1"}`} />
                        </button>
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-end pb-8">
                <Button size="lg" className="gap-2 px-8" onClick={handleSave}>
                    <Save className="h-4 w-4" /> {t.common.save}
                </Button>
            </div>
        </div>
      </main>
    </div>
  );
}


