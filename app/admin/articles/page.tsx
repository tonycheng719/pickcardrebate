"use client";

import { useState, useEffect, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, BookOpen, Eye, ExternalLink, Tag, Image as ImageIcon,
  TrendingUp, Sparkles
} from "lucide-react";
import Link from "next/link";
import { GUIDES } from "@/lib/data/guides";

interface ViewStat {
  page_id: string;
  view_count: number;
}

export default function AdminArticlesPage() {
  const [keyword, setKeyword] = useState("");
  const [viewStats, setViewStats] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(true);

  // Fetch view stats
  useEffect(() => {
    async function fetchViewStats() {
      try {
        const res = await fetch('/api/stats/pageview?pageType=article');
        if (res.ok) {
          const data = await res.json();
          const stats: Record<string, number> = {};
          (data.stats || []).forEach((s: ViewStat) => {
            stats[s.page_id] = s.view_count;
          });
          setViewStats(stats);
        }
      } catch (e) {
        console.error("Failed to fetch view stats:", e);
      } finally {
        setIsLoading(false);
      }
    }
    fetchViewStats();
  }, []);

  const filteredGuides = useMemo(() => {
    return GUIDES.filter(guide => 
      guide.title.toLowerCase().includes(keyword.toLowerCase()) ||
      guide.description.toLowerCase().includes(keyword.toLowerCase()) ||
      guide.tags.some(tag => tag.toLowerCase().includes(keyword.toLowerCase()))
    );
  }, [keyword]);

  // Sort by view count
  const sortedGuides = useMemo(() => {
    return [...filteredGuides].sort((a, b) => {
      const viewA = viewStats[a.id] || 0;
      const viewB = viewStats[b.id] || 0;
      return viewB - viewA;
    });
  }, [filteredGuides, viewStats]);

  const totalViews = Object.values(viewStats).reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <BookOpen className="h-8 w-8" /> 攻略文章管理
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            管理 {GUIDES.length} 篇攻略文章，總瀏覽次數 {totalViews.toLocaleString()} 次
          </p>
        </div>
        <Link href="/discover" target="_blank">
          <Button variant="outline" className="gap-2">
            <ExternalLink className="h-4 w-4" />
            前往探索頁
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{GUIDES.length}</p>
              <p className="text-sm text-gray-500">攻略文章數</p>
            </div>
          </CardContent>
        </Card>
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <Eye className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalViews.toLocaleString()}</p>
              <p className="text-sm text-gray-500">總瀏覽次數</p>
            </div>
          </CardContent>
        </Card>
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <Sparkles className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{GUIDES.filter(g => g.isNew).length}</p>
              <p className="text-sm text-gray-500">標記為新文章</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border dark:border-gray-700 flex gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="搜尋攻略標題或標籤..."
            className="pl-9 dark:bg-gray-700 dark:border-gray-600"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
      </div>

      {/* Articles Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700 overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 dark:bg-gray-900/50 text-gray-500 dark:text-gray-400 border-b dark:border-gray-700">
            <tr>
              <th className="px-6 py-4 font-medium">圖片</th>
              <th className="px-6 py-4 font-medium">標題</th>
              <th className="px-6 py-4 font-medium">標籤</th>
              <th className="px-6 py-4 font-medium">
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  瀏覽次數
                </div>
              </th>
              <th className="px-6 py-4 font-medium">狀態</th>
              <th className="px-6 py-4 font-medium">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y dark:divide-gray-700">
            {sortedGuides.map((guide, index) => {
              const views = viewStats[guide.id] || 0;
              const isTop3 = index < 3 && views > 0;
              
              return (
                <tr key={guide.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="px-6 py-4">
                    {guide.imageUrl ? (
                      <div className="w-16 h-10 rounded overflow-hidden bg-gray-100">
                        <img src={guide.imageUrl} alt="" className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-16 h-10 rounded bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-400">
                        <ImageIcon className="h-4 w-4" />
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900 dark:text-white line-clamp-1">{guide.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">{guide.description}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1 flex-wrap">
                      {guide.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded-full text-xs text-gray-600 dark:text-gray-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {isTop3 && (
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      )}
                      <span className={`font-medium ${isTop3 ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-300'}`}>
                        {views.toLocaleString()}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {guide.isNew ? (
                      <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium">
                        NEW
                      </span>
                    ) : (
                      <span className="text-gray-400 text-xs">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <Link href={`/discover/${guide.id}`} target="_blank">
                      <Button variant="ghost" size="sm" className="gap-1">
                        <ExternalLink className="h-3 w-3" />
                        查看
                      </Button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
