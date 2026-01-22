"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/lib/store/wallet-context";
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  DollarSign,
  CreditCard,
  Store,
  Loader2,
  AlertCircle,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { formatCurrency, cn } from "@/lib/utils";
import Link from "next/link";

interface Transaction {
  id: string;
  category: string;
  amount: number;
  rebate_amount: number;
  card_id: string;
  merchant_name: string;
  transaction_date: string;
}

interface CategoryStats {
  category: string;
  amount: number;
  rebate: number;
  count: number;
  percentage: number;
}

interface CardStats {
  cardId: string;
  cardName: string;
  amount: number;
  rebate: number;
  count: number;
}

export default function SpendingReportsPage() {
  const { user, loading: authLoading } = useWallet();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'monthly' | 'yearly'>('monthly');
  const [currentDate, setCurrentDate] = useState(new Date());

  // 計算統計
  const [categoryStats, setCategoryStats] = useState<CategoryStats[]>([]);
  const [cardStats, setCardStats] = useState<CardStats[]>([]);
  const [totalSpending, setTotalSpending] = useState(0);
  const [totalRebate, setTotalRebate] = useState(0);

  useEffect(() => {
    if (user) {
      fetchTransactions();
    } else if (!authLoading) {
      setIsLoading(false);
    }
  }, [user, authLoading, currentDate, viewMode]);

  const fetchTransactions = async () => {
    setIsLoading(true);
    try {
      // 計算日期範圍
      let startDate: Date, endDate: Date;
      
      if (viewMode === 'monthly') {
        startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
      } else {
        startDate = new Date(currentDate.getFullYear(), 0, 1);
        endDate = new Date(currentDate.getFullYear(), 11, 31);
      }

      const res = await fetch(
        `/api/user/transactions?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`
      );
      
      if (res.ok) {
        const data = await res.json();
        const txns = data.transactions || [];
        setTransactions(txns);
        calculateStats(txns);
      }
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateStats = (txns: Transaction[]) => {
    // 總計
    const spending = txns.reduce((sum, t) => sum + (t.amount || 0), 0);
    const rebate = txns.reduce((sum, t) => sum + (t.rebate_amount || 0), 0);
    setTotalSpending(spending);
    setTotalRebate(rebate);

    // 按類別統計
    const categoryMap: Record<string, { amount: number; rebate: number; count: number }> = {};
    txns.forEach(t => {
      const cat = t.category || '其他';
      if (!categoryMap[cat]) {
        categoryMap[cat] = { amount: 0, rebate: 0, count: 0 };
      }
      categoryMap[cat].amount += t.amount || 0;
      categoryMap[cat].rebate += t.rebate_amount || 0;
      categoryMap[cat].count++;
    });

    const catStats = Object.entries(categoryMap)
      .map(([category, stats]) => ({
        category,
        ...stats,
        percentage: spending > 0 ? (stats.amount / spending) * 100 : 0
      }))
      .sort((a, b) => b.amount - a.amount);
    setCategoryStats(catStats);

    // 按卡片統計
    const cardMap: Record<string, { cardName: string; amount: number; rebate: number; count: number }> = {};
    txns.forEach(t => {
      const cardId = t.card_id || 'unknown';
      if (!cardMap[cardId]) {
        cardMap[cardId] = { cardName: cardId, amount: 0, rebate: 0, count: 0 };
      }
      cardMap[cardId].amount += t.amount || 0;
      cardMap[cardId].rebate += t.rebate_amount || 0;
      cardMap[cardId].count++;
    });

    const cStats = Object.entries(cardMap)
      .map(([cardId, stats]) => ({
        cardId,
        ...stats
      }))
      .sort((a, b) => b.amount - a.amount);
    setCardStats(cStats);
  };

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (viewMode === 'monthly') {
      newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
    } else {
      newDate.setFullYear(newDate.getFullYear() + (direction === 'next' ? 1 : -1));
    }
    setCurrentDate(newDate);
  };

  const formatPeriod = () => {
    if (viewMode === 'monthly') {
      return currentDate.toLocaleDateString('zh-HK', { year: 'numeric', month: 'long' });
    }
    return `${currentDate.getFullYear()} 年`;
  };

  // 類別顏色
  const categoryColors: Record<string, string> = {
    '餐飲': 'bg-orange-500',
    '購物': 'bg-pink-500',
    '交通': 'bg-blue-500',
    '超市': 'bg-green-500',
    '娛樂': 'bg-purple-500',
    '旅遊': 'bg-cyan-500',
    '繳費': 'bg-gray-500',
    '其他': 'bg-slate-500',
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
            <p className="text-gray-500 mb-4">登入後即可查看您的消費分析報告</p>
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
            <BarChart3 className="h-6 w-6" />
            消費分析報告
          </h1>
          <p className="text-gray-500">了解您的消費習慣和回贈情況</p>
        </div>
      </div>

      {/* 時間選擇器 */}
      <Card className="mb-6">
        <CardContent className="py-4">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'monthly' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('monthly')}
              >
                月度報告
              </Button>
              <Button
                variant={viewMode === 'yearly' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('yearly')}
              >
                年度報告
              </Button>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => navigateDate('prev')}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="font-medium min-w-[120px] text-center">
                {formatPeriod()}
              </span>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigateDate('next')}
                disabled={
                  (viewMode === 'monthly' && currentDate >= new Date()) ||
                  (viewMode === 'yearly' && currentDate.getFullYear() >= new Date().getFullYear())
                }
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 總覽統計 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                <TrendingDown className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{formatCurrency(totalSpending)}</p>
                <p className="text-sm text-gray-500">總支出</p>
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
                <p className="text-2xl font-bold">{formatCurrency(totalRebate)}</p>
                <p className="text-sm text-gray-500">總回贈</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{transactions.length}</p>
                <p className="text-sm text-gray-500">交易筆數</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <DollarSign className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {totalSpending > 0 ? ((totalRebate / totalSpending) * 100).toFixed(2) : 0}%
                </p>
                <p className="text-sm text-gray-500">平均回贈率</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* 類別分析 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              消費類別分析
            </CardTitle>
          </CardHeader>
          <CardContent>
            {categoryStats.length === 0 ? (
              <p className="text-center text-gray-500 py-8">暫無數據</p>
            ) : (
              <div className="space-y-4">
                {categoryStats.map((cat) => (
                  <div key={cat.category}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">{cat.category}</span>
                      <span className="text-sm text-gray-500">
                        {formatCurrency(cat.amount)} ({cat.percentage.toFixed(1)}%)
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={cn(
                          "h-full rounded-full transition-all",
                          categoryColors[cat.category] || 'bg-gray-500'
                        )}
                        style={{ width: `${cat.percentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      {cat.count} 筆交易 • 回贈 {formatCurrency(cat.rebate)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* 卡片使用分析 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              信用卡使用分析
            </CardTitle>
          </CardHeader>
          <CardContent>
            {cardStats.length === 0 ? (
              <p className="text-center text-gray-500 py-8">暫無數據</p>
            ) : (
              <div className="space-y-4">
                {cardStats.slice(0, 5).map((card, index) => (
                  <div key={card.cardId} className="flex items-center gap-3">
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm",
                      index === 0 ? 'bg-yellow-500' : 
                      index === 1 ? 'bg-gray-400' : 
                      index === 2 ? 'bg-amber-600' : 'bg-gray-300'
                    )}>
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <Link 
                        href={`/cards/${card.cardId}`}
                        className="font-medium hover:text-blue-600 transition-colors"
                      >
                        {card.cardName}
                      </Link>
                      <p className="text-sm text-gray-500">
                        {card.count} 筆 • 消費 {formatCurrency(card.amount)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-green-600">
                        +{formatCurrency(card.rebate)}
                      </p>
                      <p className="text-xs text-gray-400">回贈</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* 回贈效率提示 */}
      {totalRebate > 0 && (
        <Card className="mt-6">
          <CardContent className="py-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">回贈效率分析</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  本{viewMode === 'monthly' ? '月' : '年'}您共獲得 {formatCurrency(totalRebate)} 回贈，
                  平均回贈率為 {totalSpending > 0 ? ((totalRebate / totalSpending) * 100).toFixed(2) : 0}%。
                  {totalSpending > 0 && (totalRebate / totalSpending) < 0.01 && (
                    <span className="text-amber-600 ml-1">
                      考慮使用更高回贈的信用卡可以提升您的回贈效率！
                    </span>
                  )}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

