"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Loader2, Calculator, TrendingUp, Calendar, Store, CreditCard, Globe, Building2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SearchLog {
  id: string;
  merchant_name: string;
  merchant_id: string;
  category_id: string;
  amount: number;
  payment_method: string;
  is_online: boolean;
  best_card_id: string;
  best_reward_amount: number;
  user_id: string | null;
  user_email: string | null;
  created_at: string;
}

interface Stats {
  total: number;
  today: number;
  yesterday: number;
  last7days: number;
  last14days: number;
  last30days: number;
}

export default function AdminSearchLogsPage() {
  const [logs, setLogs] = useState<SearchLog[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [dateFilter, setDateFilter] = useState("all");

  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/admin/search-logs");
        if (!response.ok) throw new Error("Failed to fetch logs");
        const data = await response.json();
        setLogs(data.logs || []);
        setStats(data.stats || null);
      } catch (error) {
        console.error("Search logs fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  // Filter logs by keyword and date
  const filteredLogs = logs.filter((log) => {
    const matchesKeyword = 
      (log.merchant_name?.toLowerCase() || "").includes(keyword.toLowerCase()) ||
      (log.best_card_id?.toLowerCase() || "").includes(keyword.toLowerCase()) ||
      (log.payment_method?.toLowerCase() || "").includes(keyword.toLowerCase());
    
    if (!matchesKeyword) return false;

    if (dateFilter === "all") return true;

    const logDate = new Date(log.created_at);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    switch (dateFilter) {
      case "today":
        return logDate >= today;
      case "yesterday":
        return logDate >= yesterday && logDate < today;
      case "7days":
        const sevenDaysAgo = new Date(today);
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        return logDate >= sevenDaysAgo;
      case "14days":
        const fourteenDaysAgo = new Date(today);
        fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);
        return logDate >= fourteenDaysAgo;
      case "30days":
        const thirtyDaysAgo = new Date(today);
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        return logDate >= thirtyDaysAgo;
      default:
        return true;
    }
  });

  const getPaymentMethodLabel = (method: string) => {
    const map: Record<string, string> = {
      physical_card: "門市使用實體卡",
      apple_pay: "Apple Pay",
      google_pay: "Google Pay",
      samsung_pay: "Samsung Pay",
      octopus: "八達通",
      payme: "PayMe",
      alipay: "支付寶",
      wechat: "微信支付",
    };
    return map[method] || method;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">計算機使用記錄</h1>
        <p className="text-gray-500 dark:text-gray-400">追蹤用戶使用計算機的詳細記錄與統計。</p>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-xs mb-1">
                <Calculator className="h-3 w-3" /> 總計
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total.toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card className="dark:bg-gray-800 dark:border-gray-700 bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 text-xs mb-1">
                <Calendar className="h-3 w-3" /> 今日
              </div>
              <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">{stats.today.toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-xs mb-1">
                <Calendar className="h-3 w-3" /> 昨日
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.yesterday.toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-xs mb-1">
                <TrendingUp className="h-3 w-3" /> 最近 7 天
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.last7days.toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-xs mb-1">
                <TrendingUp className="h-3 w-3" /> 最近 14 天
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.last14days.toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-xs mb-1">
                <TrendingUp className="h-3 w-3" /> 最近 30 天
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.last30days.toLocaleString()}</div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border dark:border-gray-700 flex flex-wrap gap-4">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="搜尋商戶、信用卡、支付方式..."
            className="pl-9 dark:bg-gray-700 dark:border-gray-600"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
        <Select value={dateFilter} onValueChange={setDateFilter}>
          <SelectTrigger className="w-[150px] dark:bg-gray-700 dark:border-gray-600">
            <SelectValue placeholder="時間範圍" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部時間</SelectItem>
            <SelectItem value="today">今日</SelectItem>
            <SelectItem value="yesterday">昨日</SelectItem>
            <SelectItem value="7days">最近 7 天</SelectItem>
            <SelectItem value="14days">最近 14 天</SelectItem>
            <SelectItem value="30days">最近 30 天</SelectItem>
          </SelectContent>
        </Select>
        <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
          顯示 {filteredLogs.length} 筆記錄
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 dark:bg-gray-900/50 text-gray-500 dark:text-gray-400 border-b dark:border-gray-700">
              <tr>
                <th className="px-4 py-3 font-medium">時間</th>
                <th className="px-4 py-3 font-medium">商戶</th>
                <th className="px-4 py-3 font-medium">金額</th>
                <th className="px-4 py-3 font-medium">支付方式</th>
                <th className="px-4 py-3 font-medium">門市/網上</th>
                <th className="px-4 py-3 font-medium">最佳信用卡</th>
                <th className="px-4 py-3 font-medium">回贈</th>
                <th className="px-4 py-3 font-medium">用戶</th>
              </tr>
            </thead>
            <tbody className="divide-y dark:divide-gray-700">
              {loading ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                    <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2" />
                    載入中...
                  </td>
                </tr>
              ) : filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                    暫無記錄
                  </td>
                </tr>
              ) : (
                filteredLogs.slice(0, 100).map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="px-4 py-3 text-gray-500 dark:text-gray-400 text-xs whitespace-nowrap">
                      {new Date(log.created_at).toLocaleString('zh-HK', { 
                        month: 'numeric', 
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Store className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-900 dark:text-white font-medium truncate max-w-[150px]">
                          {log.merchant_name || "-"}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-900 dark:text-white font-mono">
                      ${log.amount?.toLocaleString() || "-"}
                    </td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-300 text-xs">
                      {getPaymentMethodLabel(log.payment_method)}
                    </td>
                    <td className="px-4 py-3">
                      {log.is_online ? (
                        <span className="inline-flex items-center gap-1 text-xs bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 px-2 py-0.5 rounded-full">
                          <Globe className="h-3 w-3" /> 網上
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 px-2 py-0.5 rounded-full">
                          <Building2 className="h-3 w-3" /> 門市
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-900 dark:text-white text-xs truncate max-w-[120px]">
                          {log.best_card_id || "-"}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-emerald-600 dark:text-emerald-400 font-medium">
                      {log.best_reward_amount ? `+$${log.best_reward_amount.toFixed(1)}` : "-"}
                    </td>
                    <td className="px-4 py-3 text-gray-500 dark:text-gray-400 text-xs">
                      {log.user_id ? (
                        <a 
                          href={`/admin/users/${log.user_id}`}
                          className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-2 py-0.5 rounded text-xs hover:underline hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors"
                          title={`點擊查看會員詳情: ${log.user_id}`}
                        >
                          {log.user_email || '會員'}
                        </a>
                      ) : (
                        <span className="bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400 px-2 py-0.5 rounded text-xs">
                          訪客
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {filteredLogs.length > 100 && (
          <div className="p-4 text-center text-sm text-gray-500 border-t dark:border-gray-700">
            顯示最近 100 筆記錄（共 {filteredLogs.length} 筆）
          </div>
        )}
      </div>
    </div>
  );
}

