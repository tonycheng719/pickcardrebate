import { adminAuthClient } from "@/lib/supabase/admin-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CheckCircle2, CreditCard, Calendar, AlertCircle, ShoppingBag } from "lucide-react";
import { HK_CARDS } from "@/lib/data/cards";
import Link from "next/link";
import { UserActionButtons } from "@/components/admin/user-action-buttons";

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

  // 4. Fetch Card Details from DB (for uploaded images)
  const { data: dbCards } = await supabase
    .from("cards")
    .select("id, name, bank, image_url, style");

  const dbCardsMap = new Map();
  dbCards?.forEach((c: any) => {
    dbCardsMap.set(c.id, c);
  });

  const settingsMap = new Map();
  settingsData?.forEach((s: any) => {
    settingsMap.set(s.card_id, s.settings);
  });

  const walletCards = (cardsData || []).map((uc: any) => {
    // Prioritize DB data (uploaded images), fallback to static HK_CARDS
    const dbCardInfo = dbCardsMap.get(uc.card_id);
    const staticCardInfo = HK_CARDS.find(c => c.id === uc.card_id);
    const settings = settingsMap.get(uc.card_id) || {};
    const isUnknownCard = !dbCardInfo && !staticCardInfo;
    
    return {
        id: uc.card_id,
        name: dbCardInfo?.name || staticCardInfo?.name || uc.card_id,
        bank: dbCardInfo?.bank || staticCardInfo?.bank || (isUnknownCard ? "⚠️ 卡片已刪除" : "Unknown"),
        imageUrl: dbCardInfo?.image_url || staticCardInfo?.imageUrl, // DB first, then static
        style: dbCardInfo?.style || staticCardInfo?.style,
        isUnknown: isUnknownCard,
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
          
          <UserActionButtons 
            userId={user.id} 
            isBanned={user.is_banned || false} 
            isBannedComment={user.is_banned_comment || false} 
          />
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
                    <div className="mt-1 text-sm dark:text-gray-200">
                      {user.signup_source === 'ios' ? '🍎 iOS App' :
                       user.signup_source === 'android' ? '🤖 Android App' :
                       user.signup_source === 'web' ? '🌐 Web' : '未知'}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">最後登入平台</label>
                    <div className="mt-1 text-sm dark:text-gray-200">
                      {user.last_login_source === 'ios' ? '🍎 iOS App' :
                       user.last_login_source === 'android' ? '🤖 Android App' :
                       user.last_login_source === 'web' ? '🌐 Web' : '-'}
                    </div>
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
                     <label className="text-sm font-medium text-gray-500 dark:text-gray-400">註冊日期</label>
                     <div className="mt-1 text-sm dark:text-gray-200">
                       {user.created_at ? new Date(user.created_at).toLocaleString('zh-HK', { 
                         year: 'numeric', month: '2-digit', day: '2-digit',
                         hour: '2-digit', minute: '2-digit',
                         timeZone: 'Asia/Hong_Kong'
                       }) : "-"}
                     </div>
                  </div>
                  <div>
                     <label className="text-sm font-medium text-gray-500 dark:text-gray-400">最後登入</label>
                     <div className="mt-1 text-sm dark:text-gray-200">
                       {user.last_login ? new Date(user.last_login).toLocaleString('zh-HK', { 
                         year: 'numeric', month: '2-digit', day: '2-digit',
                         hour: '2-digit', minute: '2-digit',
                         timeZone: 'Asia/Hong_Kong'
                       }) : "-"}
                     </div>
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
                            <div key={card.id} className={`flex items-center justify-between p-3 rounded-lg ${card.isUnknown ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800' : 'bg-gray-50 dark:bg-gray-900/50'}`}>
                                <div className="flex items-center gap-3">
                                    {card.imageUrl ? (
                                        <img 
                                            src={card.imageUrl} 
                                            alt={card.name} 
                                            className="w-16 h-10 object-contain rounded bg-white dark:bg-gray-800 p-1 border dark:border-gray-700"
                                        />
                                    ) : (
                                        <div className={`w-16 h-10 rounded flex items-center justify-center ${card.isUnknown ? 'bg-red-200 dark:bg-red-800' : (card.style?.bgColor || 'bg-gray-200 dark:bg-gray-700')}`}>
                                            <CreditCard className={`h-5 w-5 ${card.isUnknown ? 'text-red-600' : (card.style?.textColor || 'text-gray-500')}`} />
                                        </div>
                                    )}
                                    <div>
                                        <div className={`font-medium text-sm ${card.isUnknown ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-white'}`}>
                                          {card.name}
                                        </div>
                                        <div className={`text-xs ${card.isUnknown ? 'text-red-500' : 'text-gray-500'}`}>
                                          {card.bank}
                                          {card.isUnknown && <span className="ml-1">(ID: {card.id})</span>}
                                        </div>
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
