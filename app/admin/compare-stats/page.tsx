"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HK_CARDS } from "@/lib/data/cards";
import { 
  Scale, TrendingUp, Users, Calendar, RefreshCw,
  CreditCard, ArrowRight, Clock
} from "lucide-react";

interface CompareStats {
  totalComparisons: number;
  uniqueUsers: number;
  topCards: { cardId: string; count: number }[];
  topCardPairs: { pair: string; count: number }[];
  dailyStats: { date: string; count: number }[];
  recentLogs: { id: string; cardIds: string[]; userId: string | null; userEmail: string | null; createdAt: string }[];
}

export default function CompareStatsPage() {
  const [stats, setStats] = useState<CompareStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [days, setDays] = useState(30);

  const fetchStats = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/admin/compare-stats?days=${days}`);
      const data = await res.json();
      setStats(data);
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [days]);

  const getCardName = (cardId: string) => {
    const card = HK_CARDS.find(c => c.id === cardId);
    return card ? card.name : cardId;
  };

  const getCardBank = (cardId: string) => {
    const card = HK_CARDS.find(c => c.id === cardId);
    return card?.bank || '';
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('zh-HK', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">比較功能統計</h1>
          <p className="text-gray-500 dark:text-gray-400">追蹤會員使用信用卡比較功能嘅行為</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={days}
            onChange={(e) => setDays(parseInt(e.target.value))}
            className="h-10 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 text-sm"
          >
            <option value={7}>最近 7 日</option>
            <option value={30}>最近 30 日</option>
            <option value={90}>最近 90 日</option>
          </select>
          <Button variant="outline" onClick={fetchStats} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            刷新
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">總比較次數</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {stats?.totalComparisons.toLocaleString() || 0}
                </p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                <Scale className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">不重複用戶</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {stats?.uniqueUsers.toLocaleString() || 0}
                </p>
              </div>
              <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-full">
                <Users className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">每日平均</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {stats && stats.dailyStats.length > 0 
                    ? Math.round(stats.totalComparisons / stats.dailyStats.length)
                    : 0}
                </p>
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                <TrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top Compared Cards */}
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg dark:text-white flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              最多人比較嘅卡片
            </CardTitle>
          </CardHeader>
          <CardContent>
            {stats?.topCards && stats.topCards.length > 0 ? (
              <div className="space-y-3">
                {stats.topCards.map((item, index) => (
                  <div key={item.cardId} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        index === 0 ? 'bg-yellow-100 text-yellow-700' :
                        index === 1 ? 'bg-gray-200 text-gray-700' :
                        index === 2 ? 'bg-orange-100 text-orange-700' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {index + 1}
                      </span>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white text-sm">
                          {getCardName(item.cardId)}
                        </p>
                        <p className="text-xs text-gray-500">{getCardBank(item.cardId)}</p>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                      {item.count} 次
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-8">暫無數據</p>
            )}
          </CardContent>
        </Card>

        {/* Top Card Pairs */}
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg dark:text-white flex items-center gap-2">
              <Scale className="h-5 w-5" />
              最熱門比較組合
            </CardTitle>
          </CardHeader>
          <CardContent>
            {stats?.topCardPairs && stats.topCardPairs.length > 0 ? (
              <div className="space-y-3">
                {stats.topCardPairs.map((item, index) => {
                  const [card1, card2] = item.pair.split(' vs ');
                  return (
                    <div key={item.pair} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                          index === 0 ? 'bg-yellow-100 text-yellow-700' :
                          index === 1 ? 'bg-gray-200 text-gray-700' :
                          index === 2 ? 'bg-orange-100 text-orange-700' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {index + 1}
                        </span>
                        <div className="flex items-center gap-1 min-w-0 flex-1">
                          <span className="text-xs font-medium text-gray-900 dark:text-white truncate">
                            {getCardName(card1)}
                          </span>
                          <ArrowRight className="h-3 w-3 text-gray-400 shrink-0" />
                          <span className="text-xs font-medium text-gray-900 dark:text-white truncate">
                            {getCardName(card2)}
                          </span>
                        </div>
                      </div>
                      <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 shrink-0 ml-2">
                        {item.count} 次
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-8">暫無數據</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Comparisons */}
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg dark:text-white flex items-center gap-2">
            <Clock className="h-5 w-5" />
            最近比較記錄
          </CardTitle>
        </CardHeader>
        <CardContent>
          {stats?.recentLogs && stats.recentLogs.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b dark:border-gray-700">
                    <th className="text-left py-3 px-4 font-medium text-gray-500">時間</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">比較卡片</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">用戶</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentLogs.map((log) => (
                    <tr key={log.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-300 whitespace-nowrap">
                        {formatDate(log.createdAt)}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex flex-wrap gap-1">
                          {log.cardIds.map((cardId, idx) => (
                            <span key={cardId} className="inline-flex items-center">
                              <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-xs">
                                {getCardName(cardId)}
                              </span>
                              {idx < log.cardIds.length - 1 && (
                                <span className="mx-1 text-gray-400">vs</span>
                              )}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-500 dark:text-gray-400">
                        {log.userId ? (
                          <a 
                            href={`/admin/users/${log.userId}`}
                            className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                            title={`點擊查看會員詳情: ${log.userId}`}
                          >
                            {log.userEmail || log.userId.substring(0, 8) + '...'}
                          </a>
                        ) : (
                          <span className="text-xs text-gray-400">訪客</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-gray-500 py-8">暫無比較記錄</p>
          )}
        </CardContent>
      </Card>

      {/* Daily Chart */}
      {stats?.dailyStats && stats.dailyStats.length > 0 && (
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg dark:text-white flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              每日比較次數
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-40 flex items-end gap-1">
              {stats.dailyStats.map((day) => {
                const maxCount = Math.max(...stats.dailyStats.map(d => d.count));
                const height = maxCount > 0 ? (day.count / maxCount) * 100 : 0;
                return (
                  <div key={day.date} className="flex-1 flex flex-col items-center gap-1">
                    <div 
                      className="w-full bg-blue-500 dark:bg-blue-600 rounded-t transition-all hover:bg-blue-600 dark:hover:bg-blue-500"
                      style={{ height: `${Math.max(height, 4)}%` }}
                      title={`${day.date}: ${day.count} 次`}
                    />
                    <span className="text-[10px] text-gray-400 -rotate-45 origin-left whitespace-nowrap">
                      {day.date.substring(5)}
                    </span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

