"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, Calculator, PieChart, Wallet, Smartphone, Loader2, AlertTriangle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

interface AnalyticsSummary {
  total_searches: number;
  avg_amount: number;
  top_merchants: { merchant_name: string; count: number }[];
  category_stats: { category_id: string; count: number }[];
  payment_stats: { payment_method: string; count: number }[];
}

export default function AdminAnalyticsPage() {
  const [data, setData] = useState<AnalyticsSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  // Move createClient outside render loop usually, but safe here if env vars stable
  const supabase = createClient();

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      setErrorMsg(null);

      // Check Env Vars explicitly for debugging
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
          setErrorMsg("環境變數未設定 (NEXT_PUBLIC_SUPABASE_URL)");
          setLoading(false);
          return;
      }

      try {
        const { data: rpcData, error } = await supabase.rpc("get_analytics_summary");
        
        if (error) {
          console.error("Failed to fetch analytics:", error);
          setErrorMsg(error.message);
          return;
        }

        if (rpcData) {
             setData(rpcData as AnalyticsSummary);
        }
      } catch (e: any) {
        console.error("Error fetching analytics:", e);
        setErrorMsg(e.message || "未知錯誤");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []); // Empty dependency array is safer for single fetch

  if (loading) {
      return (
          <div className="flex flex-col items-center justify-center h-96 gap-4">
              <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
              <p className="text-gray-500">正在載入分析數據...</p>
              {/* Debug Info */}
              <p className="text-xs text-gray-400">Supabase URL: {process.env.NEXT_PUBLIC_SUPABASE_URL ? "Set" : "Missing"}</p>
          </div>
      );
  }

  if (errorMsg) {
      return (
          <div className="flex flex-col items-center justify-center h-96 gap-4">
              <AlertTriangle className="h-12 w-12 text-red-500" />
              <h3 className="text-lg font-medium">載入失敗</h3>
              <p className="text-gray-500">{errorMsg}</p>
              <Button onClick={() => window.location.reload()}>重試</Button>
          </div>
      );
  }

  if (!data) {
      return <div className="p-8 text-center text-gray-500">暫無數據</div>;
  }

  // Helper for colors
  const getRankColor = (i: number) => {
      if (i === 0) return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
      if (i === 1) return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
      if (i === 2) return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400";
      return "bg-gray-50 text-gray-500 dark:bg-gray-800/50 dark:text-gray-400";
  };

  const getCategoryName = (id: string) => {
      const map: Record<string, string> = {
          dining: "餐飲美食",
          online: "網上購物",
          supermarket: "超市百貨",
          travel: "旅遊外幣",
          general: "一般簽賬",
          mobile: "手機支付",
          apple_pay: "Apple Pay",
          google_pay: "Google Pay"
      };
      return map[id] || id;
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">數據分析儀表板</h1>
        <p className="text-gray-500 dark:text-gray-400">基於真實搜尋紀錄 ({data.total_searches} 筆) 的用戶行為分析。</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="p-6">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">總搜尋次數</p>
                <div className="flex items-baseline gap-2 mt-1">
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{data.total_searches.toLocaleString()}</h3>
                    <span className="text-xs font-medium text-green-600 flex items-center gap-0.5">
                        <TrendingUp className="h-3 w-3" /> Live
                    </span>
                </div>
            </CardContent>
        </Card>
        <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="p-6">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">平均搜尋金額</p>
                <div className="flex items-baseline gap-2 mt-1">
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white">${data.avg_amount.toLocaleString()}</h3>
                    <span className="text-xs font-medium text-gray-500">HKD</span>
                </div>
            </CardContent>
        </Card>
        <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="p-6">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">熱門類別數</p>
                <div className="flex items-baseline gap-2 mt-1">
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{data.category_stats.length}</h3>
                    <span className="text-xs font-medium text-blue-600 flex items-center gap-0.5">
                        Active
                    </span>
                </div>
            </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Top Merchants */}
        <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
                <CardTitle className="text-lg dark:text-white flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-blue-600" /> 熱門商戶 Top 5
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-5">
                    {data.top_merchants.length === 0 ? (
                        <p className="text-center text-gray-500 py-4">暫無數據</p>
                    ) : (
                        data.top_merchants.map((item, i) => (
                            <div key={i} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${getRankColor(i)}`}>
                                        {i + 1}
                                    </div>
                                    <span className="font-medium text-gray-900 dark:text-white truncate max-w-[180px]">{item.merchant_name}</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-sm text-gray-500 dark:text-gray-400 font-mono">{item.count} 次</span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </CardContent>
        </Card>

        <div className="space-y-8">
             {/* Category Distribution */}
             <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                    <CardTitle className="text-lg dark:text-white flex items-center gap-2">
                        <PieChart className="h-5 w-5 text-purple-600" /> 類別分佈
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {data.category_stats.slice(0, 6).map((item, i) => {
                            const percentage = Math.round((item.count / data.total_searches) * 100);
                            return (
                                <div key={i} className="space-y-1">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-700 dark:text-gray-300">{getCategoryName(item.category_id)}</span>
                                        <span className="font-medium text-gray-900 dark:text-white">{percentage}% ({item.count})</span>
                                    </div>
                                    <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                        <div className="h-full bg-purple-500 rounded-full" style={{ width: `${percentage}%` }}></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                    <CardTitle className="text-lg dark:text-white flex items-center gap-2">
                        <Smartphone className="h-5 w-5 text-indigo-600" /> 支付方式偏好
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {data.payment_stats.slice(0, 5).map((item, i) => (
                             <div key={i} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg border border-transparent hover:border-gray-200 dark:hover:border-gray-600 transition-colors">
                                <span className="font-medium text-gray-900 dark:text-white text-sm">{item.payment_method || "未指定"}</span>
                                <div className="text-right">
                                    <div className="text-sm font-bold text-gray-900 dark:text-white">{item.count}</div>
                                </div>
                             </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
