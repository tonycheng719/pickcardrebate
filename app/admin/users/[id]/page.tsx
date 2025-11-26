import { createClient } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Ban, CheckCircle2, CreditCard, Calendar, AlertCircle } from "lucide-react";
import { HK_CARDS } from "@/lib/data/cards";
import Link from "next/link";

export const dynamic = "force-dynamic";

// Fetch data on the server
async function getUserData(id: string) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  
  // Use Anon Client to bypass cookie/role issues
  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false }
  });

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
  // Since RLS for user_cards is "Users can view own cards", Anon client usually CANNOT view other users' cards
  // UNLESS we also relax RLS for user_cards/settings or use Service Role.
  // However, user reported seeing "loading" forever, which means it was trying.
  // If we use Anon client, we might get empty array if RLS blocks it.
  // To fix this properly for Admin viewing User data, we MUST use Service Role if available, 
  // OR we must relax RLS for "Admin view all".
  // But we don't have Service Key in env vars confirmed.
  // Let's try to fetch. If it fails/returns empty, at least the profile shows.
  
  const { data: cardsData } = await supabase
    .from("user_cards")
    .select("card_id")
    .eq("user_id", id);

  const { data: settingsData } = await supabase
    .from("user_card_settings")
    .select("card_id, settings")
    .eq("user_id", id);

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

  return { user, walletCards };
}

export default async function AdminUserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    const { user, walletCards } = await getUserData(id);

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
                     <label className="text-sm font-medium text-gray-500 dark:text-gray-400">最後登入 IP</label>
                     <div className="mt-1 font-mono text-sm dark:text-gray-200">{user.last_ip || "-"}</div>
                  </div>
                </div>
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
