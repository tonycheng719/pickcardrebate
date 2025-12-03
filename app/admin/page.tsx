"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Search, CreditCard, AlertCircle, Loader2, Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { HK_CARDS } from "@/lib/data/cards";
import { createClient } from "@/lib/supabase/client";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    todaySearches: 0,
    cards: 0,
    pendingReports: 0,
    recentReviews: [] as any[],
    topSearches: [] as any[],
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
          pendingReports: data.reviews || 0,
          recentReviews: data.recentReviews || [],
          topSearches: data.topSearches || [],
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

      {/* Promo Expiry Alert */}
      {(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const expiredCount = HK_CARDS.filter(c => {
          if (!c.promoEndDate) return false;
          const endDate = new Date(c.promoEndDate);
          return endDate < today;
        }).length;
        const expiringSoonCount = HK_CARDS.filter(c => {
          if (!c.promoEndDate) return false;
          const endDate = new Date(c.promoEndDate);
          const diffDays = Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
          return diffDays >= 0 && diffDays <= 30;
        }).length;
        
        if (expiredCount > 0 || expiringSoonCount > 0) {
          return (
            <Link href="/admin/expiring-promos">
              <Card className={`cursor-pointer transition-all hover:shadow-lg ${expiredCount > 0 ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800' : 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800'}`}>
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${expiredCount > 0 ? 'bg-red-100 dark:bg-red-900/30' : 'bg-yellow-100 dark:bg-yellow-900/30'}`}>
                      {expiredCount > 0 ? <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" /> : <Clock className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />}
                    </div>
                    <div>
                      <p className={`font-medium ${expiredCount > 0 ? 'text-red-700 dark:text-red-400' : 'text-yellow-700 dark:text-yellow-400'}`}>
                        📅 推廣到期提示
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {expiredCount > 0 && <span className="text-red-600 dark:text-red-400 font-medium">{expiredCount} 個已過期</span>}
                        {expiredCount > 0 && expiringSoonCount > 0 && " · "}
                        {expiringSoonCount > 0 && <span className="text-yellow-600 dark:text-yellow-400">{expiringSoonCount} 個 30 天內到期</span>}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-400">點擊查看 →</span>
                </CardContent>
              </Card>
            </Link>
          );
        }
        return null;
      })()}

      {/* Recent Activity Section */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Popular Searches Table */}
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg dark:text-white">熱門搜尋關鍵字 (24h)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.topSearches.length === 0 ? (
                <p className="text-center text-gray-500 py-4">暫無數據</p>
              ) : (
                stats.topSearches.map((item, i) => (
                <div key={i} className="flex items-center justify-between border-b dark:border-gray-700 pb-2 last:border-0">
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-400 w-4">{i + 1}</span>
                    <span className="font-medium text-gray-900 dark:text-gray-200">{item.term}</span>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{item.count} 次</div>
                </div>
              ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Reports */}
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg dark:text-white">最新用戶回報</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.recentReviews.length === 0 ? (
                <p className="text-center text-gray-500 py-4">暫無數據</p>
              ) : (
                stats.recentReviews.map((item, i) => (
                <div key={i} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        item.report_type === "error" ? "bg-red-100 text-red-700" : 
                        item.report_type === "discovery" ? "bg-blue-100 text-blue-700" :
                        item.report_type === "verification" ? "bg-green-100 text-green-700" :
                        "bg-yellow-100 text-yellow-700"
                      }`}>
                        {item.report_type === "error" ? "錯誤回報" : 
                         item.report_type === "discovery" ? "新發現" : 
                         item.report_type === "verification" ? "成功驗證" : 
                         item.report_type || "回報"}
                      </span>
                      <span className="text-xs text-gray-500">{new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <p className="font-medium text-sm text-gray-900 dark:text-gray-200 truncate max-w-[200px]">{item.merchant_name || "未指定商戶"}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">By {item.user_name}</p>
                  </div>
                </div>
              ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

