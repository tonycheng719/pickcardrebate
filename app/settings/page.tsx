"use client";

import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useWallet } from "@/lib/store/wallet-context";
import { User, Bell, Wallet, Save } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const { user, updateProfile } = useWallet();
  const router = useRouter();

  // Local state for form
  const [name, setName] = useState("");
  const [preference, setPreference] = useState<"cash" | "miles">("cash");
  const [notifPromos, setNotifPromos] = useState(true);
  const [notifBills, setNotifBills] = useState(true);
  
  useEffect(() => {
    if (user) {
        setName(user.name);
        setPreference(user.rewardPreference);
        setNotifPromos(user.notifications.promos);
        setNotifBills(user.notifications.bills);
    } else {
        // Redirect if not logged in - but only on client side logic, can be strict
    }
  }, [user, router]);

  const handleSave = () => {
      if (user) {
          updateProfile({
              name,
              rewardPreference: preference,
              notifications: {
                  ...user.notifications,
                  promos: notifPromos,
                  bills: notifBills
              }
          });
          alert("設定已儲存！");
      }
  };

  if (!user) return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
          <Navbar />
          <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                  <p className="text-gray-500 mb-4">請先登入以管理設定</p>
                  <Button onClick={() => router.push("/login")}>前往登入</Button>
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
                        <Input value={user.email} disabled className="bg-gray-50" />
                        <p className="text-xs text-gray-500 mt-1">Email 無法更改</p>
                    </div>
                </CardContent>
            </Card>

            {/* Preferences Section - Hidden as per request
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Wallet className="h-5 w-5 text-green-600" /> 消費偏好
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">首選回饋類型</label>
                        <div className="grid grid-cols-2 gap-4">
                            <button 
                                className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${preference === "cash" ? "border-blue-600 bg-blue-50 text-blue-700" : "border-gray-200 hover:border-gray-300"}`}
                                onClick={() => setPreference("cash")}
                            >
                                <span className="text-2xl">💰</span>
                                <span className="font-bold">現金回贈</span>
                            </button>
                            <button 
                                className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${preference === "miles" ? "border-blue-600 bg-blue-50 text-blue-700" : "border-gray-200 hover:border-gray-300"}`}
                                onClick={() => setPreference("miles")}
                            >
                                <span className="text-2xl">✈️</span>
                                <span className="font-bold">飛行里數</span>
                            </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">這將影響系統推薦信用卡的排序權重。</p>
                    </div>
                </CardContent>
            </Card>
            */}

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
