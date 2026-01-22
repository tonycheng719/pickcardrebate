"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/lib/store/wallet-context";
import { 
  History, 
  Trash2, 
  Calculator, 
  CreditCard, 
  Store, 
  TrendingUp,
  Loader2,
  AlertCircle 
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";

interface CalculationRecord {
  id: string;
  merchant_id: string;
  merchant_name: string;
  merchant_category: string | null;
  amount: number;
  card_id: string;
  card_name: string;
  percentage: number;
  reward_amount: number;
  payment_method: string | null;
  reward_preference: string;
  created_at: string;
}

interface HistoryStats {
  totalCalculations: number;
  totalReward: number;
  favoriteCard: { id: string; name: string; count: number } | null;
  favoriteMerchant: { id: string; name: string; count: number } | null;
}

export default function CalculationHistoryPage() {
  const { user } = useWallet();
  const [history, setHistory] = useState<CalculationRecord[]>([]);
  const [stats, setStats] = useState<HistoryStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    if (user) {
      fetchHistory();
    } else {
      setIsLoading(false);
    }
  }, [user, mounted]);

  const fetchHistory = async () => {
    try {
      const res = await fetch("/api/user/calculation-history");
      if (res.ok) {
        const data = await res.json();
        setHistory(data.history);
        setStats(data.stats);
      }
    } catch (error) {
      console.error("Failed to fetch history:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("確定要刪除這筆記錄嗎？")) return;
    
    setIsDeleting(id);
    try {
      const res = await fetch(`/api/user/calculation-history?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setHistory(history.filter(h => h.id !== id));
        fetchHistory(); // Refresh stats
      }
    } catch (error) {
      console.error("Failed to delete:", error);
    } finally {
      setIsDeleting(null);
    }
  };

  const handleClearAll = async () => {
    if (!confirm("確定要清除所有計算記錄嗎？此操作無法復原。")) return;
    
    try {
      const res = await fetch("/api/user/calculation-history?clearAll=true", {
        method: "DELETE",
      });
      if (res.ok) {
        setHistory([]);
        setStats({
          totalCalculations: 0,
          totalReward: 0,
          favoriteCard: null,
          favoriteMerchant: null
        });
      }
    } catch (error) {
      console.error("Failed to clear all:", error);
    }
  };

  if (authLoading || isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="py-12 text-center">
            <AlertCircle className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold mb-2">請先登入</h2>
            <p className="text-gray-500 mb-4">登入後即可查看您的計算歷史記錄</p>
            <Link href="/auth/login">
              <Button>立即登入</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <History className="h-6 w-6" />
            計算歷史
          </h1>
          <p className="text-gray-500">您的回贈計算記錄</p>
        </div>
        {history.length > 0 && (
          <Button variant="outline" onClick={handleClearAll} className="text-red-500 hover:text-red-600">
            <Trash2 className="h-4 w-4 mr-2" />
            清除全部
          </Button>
        )}
      </div>

      {/* 統計卡片 */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Calculator className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.totalCalculations}</p>
                  <p className="text-sm text-gray-500">總計算次數</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{formatCurrency(stats.totalReward)}</p>
                  <p className="text-sm text-gray-500">預計總回贈</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <CreditCard className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-lg font-bold truncate max-w-[150px]">
                    {stats.favoriteCard?.name || "-"}
                  </p>
                  <p className="text-sm text-gray-500">常用卡片</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                  <Store className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <p className="text-lg font-bold truncate max-w-[150px]">
                    {stats.favoriteMerchant?.name || "-"}
                  </p>
                  <p className="text-sm text-gray-500">常去商戶</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* 歷史記錄列表 */}
      {history.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <History className="h-12 w-12 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">暫無計算記錄</p>
            <p className="text-sm text-gray-400 mt-2">使用計算機後，記錄將自動保存在此</p>
            <Link href="/">
              <Button className="mt-4">開始計算</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">計算記錄</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {history.map((record) => (
                <div
                  key={record.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{record.merchant_name}</span>
                      {record.merchant_category && (
                        <span className="text-xs px-2 py-0.5 bg-gray-200 dark:bg-gray-700 rounded-full">
                          {record.merchant_category}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>消費 {formatCurrency(record.amount)}</span>
                      <span>→</span>
                      <Link 
                        href={`/cards/${record.card_id}`}
                        className="text-blue-600 hover:underline"
                      >
                        {record.card_name}
                      </Link>
                      <span className="text-green-600 font-medium">
                        {record.percentage}% 回贈
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-bold text-green-600">
                        +{formatCurrency(record.reward_amount)}
                      </p>
                      <p className="text-xs text-gray-400">
                        {new Date(record.created_at).toLocaleDateString('zh-HK')}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(record.id)}
                      disabled={isDeleting === record.id}
                      className="text-gray-400 hover:text-red-500"
                    >
                      {isDeleting === record.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

