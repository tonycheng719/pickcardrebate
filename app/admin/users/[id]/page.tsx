import { adminAuthClient } from "@/lib/supabase/admin-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Ban, CheckCircle2, CreditCard, Calendar, AlertCircle, DollarSign, ShoppingBag } from "lucide-react";
import { HK_CARDS } from "@/lib/data/cards";
import Link from "next/link";

export const dynamic = "force-dynamic";

// Fetch data on the server
async function getUserData(id: string) {
  const supabase = adminAuthClient; // Use Admin Client (Service Role)

  // 1. Fetch User Profile
  const { data: user, error: userError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();

  if (userError || !user) {
    throw new Error(userError?.message || "User not found");
  }

  // 2. Fetch User Cards & Settings
  const { data: cardsData } = await supabase
    .from("user_cards")
    .select("card_id")
    .eq("user_id", id);

  const { data: settingsData } = await supabase
    .from("user_card_settings")
    .select("card_id, settings")
    .eq("user_id", id);

  // 3. Fetch User Transactions
  const { data: transactions } = await supabase
    .from("user_transactions")
    .select("*")
    .eq("user_id", id)
    .order("transaction_date", { ascending: false })
    .limit(50);

  const settingsMap = new Map();
  settingsData?.forEach((s: any) => {
    settingsMap.set(s.card_id, s.settings);
  });

  const walletCards = (cardsData || []).map((uc: any) => {
    const cardInfo = HK_CARDS.find(c => c.id === uc.card_id);
    const settings = settingsMap.get(uc.card_id) || {};
    return {
        id: uc.card_id,
        name: cardInfo?.name || uc.card_id,
        bank: cardInfo?.bank || "Unknown",
        settings
    };
  });

  return { user, walletCards, transactions: transactions || [] };
}

export default async function AdminUserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    const { user, walletCards, transactions } = await getUserData(id);

    return (
      <div className="space-y-6">
        <Link href="/admin/users">
            <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" /> 返回會員列表
            </Button>
        </Link>

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
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">出生年月</label>
                    <div className="mt-1 text-sm dark:text-gray-200">
                      {user.birth_year ? `${user.birth_year}年 ${user.birth_month}月` : "未設定"}
                    </div>
                  </div>
                  <div>
                     <label className="text-sm font-medium text-gray-500 dark:text-gray-400">最後登入 IP</label>
                     <div className="mt-1 font-mono text-sm dark:text-gray-200">{user.last_ip || "-"}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Transactions Section */}
            <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                    <CardTitle className="text-lg dark:text-white flex items-center gap-2">
                        <ShoppingBag className="h-5 w-5" /> 消費記錄 ({transactions.length})
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {transactions.length === 0 ? (
                        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                            暫無記賬資料
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b dark:border-gray-700 text-left">
                                        <th className="pb-2 font-medium text-gray-500">日期</th>
                                        <th className="pb-2 font-medium text-gray-500">商戶</th>
                                        <th className="pb-2 font-medium text-gray-500">卡片</th>
                                        <th className="pb-2 font-medium text-gray-500 text-right">金額</th>
                                        <th className="pb-2 font-medium text-gray-500 text-right">回贈</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y dark:divide-gray-700">
                                    {transactions.map((tx: any) => {
                                        const cardName = HK_CARDS.find(c => c.id === tx.card_id)?.name || tx.card_id;
                                        return (
                                            <tr key={tx.id}>
                                                <td className="py-3 text-gray-500">{tx.transaction_date}</td>
                                                <td className="py-3 font-medium">{tx.merchant_name}</td>
                                                <td className="py-3 text-gray-500 truncate max-w-[150px]" title={cardName}>{cardName}</td>
                                                <td className="py-3 text-right font-mono">${tx.amount}</td>
                                                <td className="py-3 text-right font-mono text-emerald-600">
                                                    {tx.reward_amount > 0 ? `+$${tx.reward_amount}` : '-'}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Wallet Section */}
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
                      此會員尚未將任何卡片加入錢包，或權限不足以查看。
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
  } catch (error: any) {
    return (
        <div className="flex flex-col items-center justify-center h-[50vh] text-red-500 gap-4">
            <AlertCircle className="h-12 w-12" />
            <h2 className="text-xl font-bold">載入會員資料失敗</h2>
            <p className="text-sm bg-red-50 p-4 rounded font-mono max-w-md overflow-auto">
                {error.message || String(error)}
            </p>
            <Link href="/admin/users">
                <Button variant="outline">返回列表</Button>
            </Link>
        </div>
    );
  }
}
