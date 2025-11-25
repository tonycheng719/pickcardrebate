"use client";

import { useMemo, use } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MOCK_ADMIN_USERS } from "@/lib/admin/mock-data";
import { useDataset } from "@/lib/admin/data-store";
import { ArrowLeft, Shield, Ban, CheckCircle2, Search, CreditCard, Calendar } from "lucide-react";
import { HK_CARDS } from "@/lib/data/cards";

// Mock wallet data for demonstration since admin panel doesn't have real access to all users' local storage
const MOCK_USER_WALLETS: Record<string, { cardId: string, feeDate?: string }[]> = {
  "1": [
    { cardId: "hsbc-red", feeDate: "2024-12-31" },
    { cardId: "sc-smart" },
    { cardId: "citi-rewards", feeDate: "2024-10-15" },
  ],
  "2": [
    { cardId: "boc-chill", feeDate: "2024-09-30" },
    { cardId: "earnmore" },
  ]
};

export default function AdminUserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const { cards } = useDataset();
  const user = useMemo(() => MOCK_ADMIN_USERS.find((u) => u.id === id), [id]);
  
  // Get user's wallet data
  const userWallet = MOCK_USER_WALLETS[id] || [];
  const allCards = cards.length > 0 ? cards : HK_CARDS;

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
      <div className="flex items-center justify-between">
        <div>
          <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" /> 返回會員列表
          </button>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{user.name}</h1>
          <p className="text-gray-500 dark:text-gray-400">{user.email}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2" onClick={() => alert("已發送重設密碼 Email")}>
            <Shield className="h-4 w-4" /> 重設密碼
          </Button>
          <Button
            variant={user.status === "active" ? "destructive" : "default"}
            className="gap-2"
            onClick={() => alert("狀態切換僅示範用途")}
          >
            {user.status === "active" ? (
              <>
                <Ban className="h-4 w-4" /> 封鎖帳號
              </>
            ) : (
              <>
                <CheckCircle2 className="h-4 w-4" /> 解除封鎖
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="dark:bg-gray-800 dark:border-gray-700 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg dark:text-white">帳號資訊</CardTitle>
          </CardHeader>
          <CardContent className="grid sm:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">角色</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {user.role === "admin" ? "管理員" : "一般會員"}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">狀態</p>
              <p className={`font-medium ${user.status === "active" ? "text-green-600" : "text-red-600"}`}>
                {user.status === "active" ? "正常" : "已封鎖"}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">註冊日期</p>
              <p className="font-medium text-gray-900 dark:text-white">{user.joinDate}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">最後登入</p>
              <p className="font-medium text-gray-900 dark:text-white">{user.lastLogin ?? "—"}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg dark:text-white">使用統計</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
              <Search className="h-4 w-4 text-blue-500" />
              <span>總搜尋次數：</span>
              <span className="font-semibold text-gray-900 dark:text-white">{user.totalSearches ?? 0}</span>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">常用商戶</p>
              <div className="flex flex-wrap gap-2">
                {(user.favoriteMerchants ?? []).map((merchant) => (
                  <span key={merchant} className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                    {merchant}
                  </span>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="dark:bg-gray-800 dark:border-gray-700 lg:col-span-2">
            <CardHeader>
                <CardTitle className="text-lg dark:text-white flex items-center gap-2">
                    <CreditCard className="h-5 w-5" /> 錢包概況
                </CardTitle>
            </CardHeader>
            <CardContent>
                {userWallet.length > 0 ? (
                    <div className="space-y-3">
                        {userWallet.map((walletItem, index) => {
                            const card = allCards.find(c => c.id === walletItem.cardId);
                            return (
                                <div key={index} className="flex items-center justify-between p-3 border rounded-lg dark:border-gray-700">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-6 rounded ${card?.style?.bgColor || 'bg-gray-500'} shadow-sm`}></div>
                                        <div>
                                            <p className="font-medium text-sm text-gray-900 dark:text-white">{card?.name || walletItem.cardId}</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">{card?.bank || 'Unknown Bank'}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-300 mb-1">
                                            <Calendar className="h-3.5 w-3.5 text-gray-400" />
                                            <span className="text-xs text-gray-500">年費到期日</span>
                                        </div>
                                        <p className={`text-sm font-medium ${walletItem.feeDate ? 'text-gray-900 dark:text-white' : 'text-gray-400 italic'}`}>
                                            {walletItem.feeDate || "未設定"}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400 text-sm">
                        此會員錢包內沒有信用卡。
                    </div>
                )}
            </CardContent>
        </Card>

        <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
            <CardTitle className="text-lg dark:text-white">近期活動</CardTitle>
            </CardHeader>
            <CardContent>
            <div className="space-y-4">
                {[
                { time: "10 分鐘前", action: "搜尋「壽司郎 500」" },
                { time: "2 小時前", action: "訂閱了 HSBC Red 優惠通知" },
                { time: "昨天", action: "新增信用卡：SC Smart" },
                ].map((item, i) => (
                <div key={i} className="flex gap-4 text-sm text-gray-600 dark:text-gray-300">
                    <div className="w-24 text-gray-400">{item.time}</div>
                    <div className="flex-1">{item.action}</div>
                </div>
                ))}
            </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
