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

// Custom debounce hook
function useDebouncedCallback<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
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

export default function SettingsPage() {
  const { user, updateProfile } = useWallet();
  const router = useRouter();

  // Local state for form
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
    } else {
        // Redirect if not logged in - but only on client side logic, can be strict
    }
  }, [user, router]);

  // 驗證用戶名
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
        setUsernameError(data.error || "用戶名不可用");
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
      alert("用戶名設定成功！");
      router.refresh();
    } catch (error) {
      alert("儲存失敗，請稍後再試");
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
          // Force refresh or ensure context is updated
          router.refresh();
          alert("設定已儲存！");
      }
  };

  if (!user) return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
          <Navbar />
          <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                  <p className="text-gray-500 mb-4">請先登入以管理設定</p>
                  <Link href="/login">
                      <Button>前往登入</Button>
                  </Link>
              </div>
          </div>
      </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 flex-1 max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">帳戶設定</h1>

        <div className="space-y-6">
            {/* Profile Section */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5 text-blue-600" /> 個人資料
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">顯示名稱</label>
                        <Input 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            placeholder="輸入您的暱稱"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <Input value={user.email} disabled className="bg-gray-50 text-gray-500" />
                        <p className="text-xs text-gray-500 mt-1">Email 無法更改</p>
                    </div>
                    
                    {/* Username */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                          <AtSign className="h-4 w-4" />
                          用戶名
                        </label>
                        {username ? (
                          <div>
                            <Input value={`@${username}`} disabled className="bg-gray-50 text-gray-500" />
                            <p className="text-xs text-gray-500 mt-1">用戶名已設定，無法更改</p>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <div className="relative">
                              <Input
                                placeholder="輸入用戶名（3-20個英文字母、數字或底線）"
                                value={usernameInput}
                                onChange={(e) => handleUsernameInputChange(e.target.value)}
                                className={`pr-10 ${
                                  usernameStatus === "available" ? "border-green-500 focus-visible:ring-green-500" :
                                  usernameStatus === "taken" || usernameStatus === "invalid" ? "border-red-500 focus-visible:ring-red-500" : ""
                                }`}
                              />
                              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                {usernameStatus === "checking" && <Loader2 className="h-5 w-5 text-gray-400 animate-spin" />}
                                {usernameStatus === "available" && <Check className="h-5 w-5 text-green-500" />}
                                {(usernameStatus === "taken" || usernameStatus === "invalid") && <X className="h-5 w-5 text-red-500" />}
                              </div>
                            </div>
                            {usernameError && (
                              <p className="text-sm text-red-500">{usernameError}</p>
                            )}
                            {usernameStatus === "available" && (
                              <div className="flex items-center gap-2">
                                <p className="text-sm text-green-600">✓ 此用戶名可以使用</p>
                                <Button 
                                  size="sm" 
                                  onClick={handleSaveUsername}
                                  disabled={isSavingUsername}
                                >
                                  {isSavingUsername ? <Loader2 className="h-4 w-4 animate-spin" /> : "確認設定"}
                                </Button>
                              </div>
                            )}
                            <p className="text-xs text-gray-500">用戶名將用於留言等公開場合，設定後無法更改。</p>
                          </div>
                        )}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">性別</label>
                            <Input value={user.gender === 'male' ? '男士' : user.gender === 'female' ? '女士' : '其他'} disabled className="bg-gray-50 text-gray-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">居住地區</label>
                            <Input value={user.district} disabled className="bg-gray-50 text-gray-500" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">出生年月</label>
                        <Input value={user.birthYear ? `${user.birthYear}年 ${user.birthMonth}月` : '未設定'} disabled className="bg-gray-50 text-gray-500" />
                        <p className="text-xs text-gray-500 mt-1">基本資料無法更改，如需協助請聯絡客服。</p>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Wallet className="h-5 w-5 text-green-600" /> 回贈偏好
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">首選顯示單位</label>
                        <div className="grid grid-cols-2 gap-4">
                            <button 
                                className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${preference === "cash" ? "border-amber-500 bg-amber-50 text-amber-700" : "border-gray-200 hover:border-gray-300 bg-white"}`}
                                onClick={() => setPreference("cash")}
                            >
                                <span className="text-2xl">💰</span>
                                <span className="font-bold">現金回贈</span>
                                <span className="text-xs text-gray-500">顯示 % 或 $</span>
                            </button>
                            <button 
                                className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${preference === "miles" ? "border-sky-500 bg-sky-50 text-sky-700" : "border-gray-200 hover:border-gray-300 bg-white"}`}
                                onClick={() => setPreference("miles")}
                            >
                                <span className="text-2xl">✈️</span>
                                <span className="font-bold">飛行里數</span>
                                <span className="text-xs text-gray-500">顯示 $/里 (低至)</span>
                            </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">系統將根據此設定優先排序並顯示計算結果。</p>
                    </div>
                </CardContent>
            </Card>

            {/* Notifications Section */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Bell className="h-5 w-5 text-orange-600" /> 通知設定
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between py-2">
                        <div>
                            <div className="font-medium">最新優惠通知</div>
                            <div className="text-sm text-gray-500">當有新的限時優惠時通知我</div>
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
                            <div className="font-medium">年費到期提醒</div>
                            <div className="text-sm text-gray-500">在卡片年費到期前 30 天通知我</div>
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
                    <Save className="h-4 w-4" /> 儲存設定
                </Button>
            </div>
        </div>
      </main>
    </div>
  );
}
