"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Search, CreditCard, AlertCircle, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    todaySearches: 0,
    cards: 0,
    pendingReports: 0,
  });
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchStats() {
      try {
        setLoading(true);
        
        // Use Server-side API to bypass client-side RLS issues
        const res = await fetch('/api/admin/stats');
        if (!res.ok) throw new Error('Failed to fetch stats');
        
        const data = await res.json();

        setStats({
          users: data.users || 0,
          todaySearches: data.todaySearches || 0,
          cards: data.cards || 0,
          pendingReports: data.reviews || 0, // Assuming pending reviews count
        });
      } catch (error) {
        console.error("Error fetching admin stats:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []); // Removed [supabase] dependency

  const statItems = [
    { title: "總註冊會員", value: stats.users.toLocaleString(), icon: Users, change: "Total", color: "text-blue-600" },
    { title: "今日搜尋量", value: stats.todaySearches.toLocaleString(), icon: Search, change: "Today", color: "text-green-600" },
    { title: "收錄信用卡", value: stats.cards.toLocaleString(), icon: CreditCard, change: "Active", color: "text-purple-600" },
    { title: "待審核回報", value: stats.pendingReports.toLocaleString(), icon: AlertCircle, change: "Pending", color: "text-orange-600" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">管理後台總覽</h1>
        <p className="text-gray-500 dark:text-gray-400">
          {loading ? "正在載入數據..." : `歡迎回來，目前有 ${stats.pendingReports} 則新回報需要您的關注。`}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statItems.map((stat, index) => (
          <Card key={index} className="dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.title}</p>
                <div className="flex items-baseline gap-2 mt-1">
                  {loading ? (
                    <Loader2 className="h-6 w-6 animate-spin text-gray-300" />
                  ) : (
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</h3>
                  )}
                  <span className={`text-xs font-medium ${stat.change === "Pending" && stats.pendingReports > 0 ? "text-orange-600 font-bold" : "text-gray-500"}`}>
                    {stat.change}
                  </span>
                </div>
              </div>
              <div className={`p-3 rounded-full bg-gray-50 dark:bg-gray-700 ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg p-4">
          <h3 className="text-blue-800 dark:text-blue-200 font-medium flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              數據更新說明
          </h3>
          <p className="text-sm text-blue-600 dark:text-blue-300 mt-1">
              上方數據已連接真實資料庫。下方的「熱門搜尋」與「最新回報」詳情請分別前往「數據分析」與「回報審核」頁面查看完整報告。
          </p>
      </div>
    </div>
  );
}

