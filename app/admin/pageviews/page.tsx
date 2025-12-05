"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Eye, CreditCard, BookOpen, RefreshCw, TrendingUp,
  ArrowUpRight, Calendar, BarChart3
} from "lucide-react";
import Link from "next/link";

interface PageViewStat {
  id: string;
  page_type: "card" | "article";
  page_id: string;
  page_name: string;
  view_count: number;
  created_at: string;
  last_viewed_at: string;
}

export default function AdminPageViewsPage() {
  const [stats, setStats] = useState<PageViewStat[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "card" | "article">("all");
  const [sortBy, setSortBy] = useState<"view_count" | "last_viewed_at">("view_count");

  useEffect(() => {
    fetchStats();
  }, [filter, sortBy]);

  const fetchStats = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (filter !== "all") params.set("pageType", filter);
      params.set("sortBy", sortBy);

      const res = await fetch(`/api/stats/pageview?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setStats(data.stats || []);
      }
    } catch (e) {
      console.error("Failed to fetch stats:", e);
    } finally {
      setIsLoading(false);
    }
  };

  const totalViews = stats.reduce((sum, s) => sum + s.view_count, 0);
  const cardViews = stats.filter(s => s.page_type === "card").reduce((sum, s) => sum + s.view_count, 0);
  const articleViews = stats.filter(s => s.page_type === "article").reduce((sum, s) => sum + s.view_count, 0);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleDateString("zh-HK", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <BarChart3 className="h-6 w-6" />
            頁面瀏覽統計
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            追蹤信用卡和文章頁面的瀏覽次數
          </p>
        </div>
        <Button onClick={fetchStats} variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          刷新
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <Eye className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="text-3xl font-bold">{totalViews.toLocaleString()}</div>
                <div className="text-sm text-gray-500">總瀏覽次數</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="text-3xl font-bold">{cardViews.toLocaleString()}</div>
                <div className="text-sm text-gray-500">信用卡頁面</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="text-3xl font-bold">{articleViews.toLocaleString()}</div>
                <div className="text-sm text-gray-500">攻略文章</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="flex gap-2">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("all")}
          >
            全部
          </Button>
          <Button
            variant={filter === "card" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("card")}
          >
            <CreditCard className="h-4 w-4 mr-1" />
            信用卡
          </Button>
          <Button
            variant={filter === "article" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("article")}
          >
            <BookOpen className="h-4 w-4 mr-1" />
            文章
          </Button>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant={sortBy === "view_count" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortBy("view_count")}
          >
            <TrendingUp className="h-4 w-4 mr-1" />
            最多瀏覽
          </Button>
          <Button
            variant={sortBy === "last_viewed_at" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortBy("last_viewed_at")}
          >
            <Calendar className="h-4 w-4 mr-1" />
            最近瀏覽
          </Button>
        </div>
      </div>

      {/* Stats Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            瀏覽排行
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8 text-gray-500">載入中...</div>
          ) : stats.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Eye className="h-10 w-10 mx-auto mb-2 opacity-50" />
              <p>暫無瀏覽數據</p>
              <p className="text-sm mt-1">需要先在 Supabase 創建 page_views 表</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b dark:border-gray-700">
                    <th className="text-left py-3 px-4 font-medium text-gray-500">#</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">類型</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">頁面</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-500">瀏覽次數</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-500">最後瀏覽</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-500">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.map((stat, index) => (
                    <tr 
                      key={stat.id} 
                      className="border-b dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                    >
                      <td className="py-3 px-4">
                        <span className={`
                          inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold
                          ${index === 0 ? 'bg-yellow-100 text-yellow-700' : ''}
                          ${index === 1 ? 'bg-gray-100 text-gray-700' : ''}
                          ${index === 2 ? 'bg-orange-100 text-orange-700' : ''}
                          ${index > 2 ? 'text-gray-500' : ''}
                        `}>
                          {index + 1}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {stat.page_type === "card" ? (
                          <span className="inline-flex items-center gap-1 text-emerald-600 text-sm">
                            <CreditCard className="h-4 w-4" />
                            信用卡
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-purple-600 text-sm">
                            <BookOpen className="h-4 w-4" />
                            文章
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-medium text-gray-900 dark:text-white truncate max-w-xs">
                          {stat.page_name}
                        </div>
                        <div className="text-xs text-gray-400">{stat.page_id}</div>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className="font-bold text-lg">{stat.view_count.toLocaleString()}</span>
                      </td>
                      <td className="py-3 px-4 text-right text-sm text-gray-500">
                        {formatDate(stat.last_viewed_at)}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Link 
                          href={stat.page_type === "card" ? `/cards/${stat.page_id}` : `/discover/${stat.page_id}`}
                          target="_blank"
                        >
                          <Button variant="ghost" size="sm">
                            <ArrowUpRight className="h-4 w-4" />
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

