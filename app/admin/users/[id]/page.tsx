"use client";

import { useMemo, use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Ban, CheckCircle2, Loader2, CreditCard, Calendar } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { HK_CARDS } from "@/lib/data/cards";

export default function AdminUserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const [user, setUser] = useState<any>(null);
  const [walletCards, setWalletCards] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
        setIsLoading(true);
        
        // 1. Fetch User Profile
        const { data: profileData, error: profileError } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", id)
            .single();
        
        if (profileError) {
            console.error("Error fetching user:", profileError);
        } else {
            setUser(profileData);
        }

        // 2. Fetch User Cards & Settings
        const { data: cardsData, error: cardsError } = await supabase
            .from("user_cards")
            .select("card_id")
            .eq("user_id", id);

        const { data: settingsData, error: settingsError } = await supabase
            .from("user_card_settings")
            .select("card_id, settings")
            .eq("user_id", id);
            
        if (!cardsError && cardsData) {
            const settingsMap = new Map();
            settingsData?.forEach((s: any) => {
                settingsMap.set(s.card_id, s.settings);
            });

            const userCardsWithDetails = cardsData.map((uc: any) => {
                const cardInfo = HK_CARDS.find(c => c.id === uc.card_id);
                const settings = settingsMap.get(uc.card_id) || {};
                return {
                    id: uc.card_id,
                    name: cardInfo?.name || uc.card_id,
                    bank: cardInfo?.bank || "Unknown",
                    settings
                };
            });
            setWalletCards(userCardsWithDetails);
        }

        setIsLoading(false);
    };
    fetchData();
  }, [id]);

  if (isLoading) {
      return (
          <div className="flex justify-center items-center min-h-[200px]">
              <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
          </div>
      );
  }

  if (!user) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" className="gap-2" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" /> 返回
        </Button>
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="p-6 text-center text-gray-500 dark:text-gray-300">
            找不到此會員資料。
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Button variant="ghost" className="gap-2" onClick={() => router.back()}>
        <ArrowLeft className="h-4 w-4" /> 返回會員列表
      </Button>

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            {user.name}
            <span className="text-sm font-normal px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-600 dark:text-gray-300">
              一般會員
            </span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">ID: {user.id}</p>
        </div>
        
        <div className="flex gap-3">
           <Button variant="outline" className="text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20">
             <Ban className="h-4 w-4 mr-2" /> 封鎖會員
           </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Left Column: Profile Info */}
        <div className="md:col-span-2 space-y-6">
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg dark:text-white">基本資料</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">電子郵件</label>
                  <div className="mt-1 font-mono text-sm dark:text-gray-200">{user.email}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">註冊來源</label>
                  <div className="mt-1 text-sm dark:text-gray-200">Google / SMS</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">居住地區</label>
                  <div className="mt-1 text-sm dark:text-gray-200">{user.district || "未設定"}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">性別</label>
                  <div className="mt-1 text-sm dark:text-gray-200">
                    {user.gender === "male" ? "男性" : user.gender === "female" ? "女性" : user.gender === "other" ? "其他" : "未設定"}
                  </div>
                </div>
                <div>
                   <label className="text-sm font-medium text-gray-500 dark:text-gray-400">最後登入 IP</label>
                   <div className="mt-1 font-mono text-sm dark:text-gray-200">{user.last_ip || "-"}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Wallet Section - Synced from Cloud */}
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg dark:text-white flex items-center justify-between">
                <span>持有信用卡 ({walletCards.length})</span>
                <span className="text-xs font-normal px-2 py-1 bg-green-100 text-green-800 rounded flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" /> 已同步至雲端
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {walletCards.length === 0 ? (
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-8">
                    此會員尚未將任何卡片加入錢包。
                  </p>
              ) : (
                  <div className="space-y-3">
                      {walletCards.map((card) => (
                          <div key={card.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                              <div className="flex items-center gap-3">
                                  <div className="w-10 h-6 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
                                      <CreditCard className="h-4 w-4 text-gray-500" />
                                  </div>
                                  <div>
                                      <div className="font-medium text-sm text-gray-900 dark:text-white">{card.name}</div>
                                      <div className="text-xs text-gray-500">{card.bank}</div>
                                  </div>
                              </div>
                              {card.settings.annualFeeDate && (
                                  <div className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded">
                                      <Calendar className="h-3 w-3" />
                                      年費: {card.settings.annualFeeDate}
                                  </div>
                              )}
                          </div>
                      ))}
                  </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Activity & Notes */}
        <div className="space-y-6">
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg dark:text-white">帳號狀態</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-900/30">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <span className="font-medium text-green-700 dark:text-green-300">帳號正常</span>
                </div>
                <span className="text-xs text-green-600 dark:text-green-400">無違規紀錄</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
