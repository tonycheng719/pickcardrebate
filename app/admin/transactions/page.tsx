'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { toast } from 'sonner';
import { Receipt, Search, RefreshCw, TrendingUp, DollarSign, Users } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface Transaction {
  id: string;
  user_id: string;
  merchant_name: string;
  category_id: string;
  amount: number;
  payment_method: string;
  card_id: string;
  reward_amount: number;
  reward_currency: string;
  transaction_date: string;
  created_at: string;
  profiles?: {
    email: string;
    display_name: string;
  };
}

interface Stats {
  totalTransactions: number;
  totalAmount: number;
  totalRewards: number;
  uniqueUsers: number;
}

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [stats, setStats] = useState<Stats>({
    totalTransactions: 0,
    totalAmount: 0,
    totalRewards: 0,
    uniqueUsers: 0,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      // 獲取消費記錄（包含用戶資料）
      const { data: txData, error: txError } = await supabase
        .from('user_transactions')
        .select(`
          *,
          profiles:user_id (email, display_name)
        `)
        .order('created_at', { ascending: false })
        .limit(100);

      if (txError) {
        console.error('Load transactions error:', txError);
        // 如果 join 失敗，嘗試只獲取交易記錄
        const { data: fallbackData } = await supabase
          .from('user_transactions')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(100);
        setTransactions(fallbackData || []);
      } else {
        setTransactions(txData || []);
      }

      // 計算統計
      const { data: allTx } = await supabase
        .from('user_transactions')
        .select('amount, reward_amount, user_id');

      if (allTx) {
        const uniqueUsers = new Set(allTx.map(t => t.user_id)).size;
        const totalAmount = allTx.reduce((sum, t) => sum + (t.amount || 0), 0);
        const totalRewards = allTx.reduce((sum, t) => sum + (t.reward_amount || 0), 0);
        
        setStats({
          totalTransactions: allTx.length,
          totalAmount,
          totalRewards,
          uniqueUsers,
        });
      }
    } catch (e) {
      console.error('Load data error:', e);
      toast.error('載入失敗');
    }
    setLoading(false);
  };

  // 過濾交易
  const filteredTransactions = transactions.filter(tx => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      tx.merchant_name?.toLowerCase().includes(term) ||
      tx.profiles?.email?.toLowerCase().includes(term) ||
      tx.profiles?.display_name?.toLowerCase().includes(term) ||
      tx.card_id?.toLowerCase().includes(term)
    );
  });

  // 格式化支付方式
  const formatPaymentMethod = (method: string) => {
    const methods: Record<string, string> = {
      'physical': '實體卡',
      'online': '網上',
      'apple_pay': 'Apple Pay',
      'google_pay': 'Google Pay',
      'octopus': '八達通',
    };
    return methods[method] || method;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Receipt className="h-6 w-6" />
          用戶消費記錄
        </h1>
        <p className="text-gray-500">查看所有用戶的消費記錄和統計</p>
      </div>

      {/* 統計卡片 */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Receipt className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">總記錄數</p>
                <p className="text-2xl font-bold">{stats.totalTransactions}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">總消費金額</p>
                <p className="text-2xl font-bold">${stats.totalAmount.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 rounded-lg">
                <TrendingUp className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">總回贈</p>
                <p className="text-2xl font-bold">${stats.totalRewards.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">活躍用戶</p>
                <p className="text-2xl font-bold">{stats.uniqueUsers}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 搜索和刷新 */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>消費記錄列表</CardTitle>
              <CardDescription>最近 100 筆消費記錄</CardDescription>
            </div>
            <Button variant="outline" onClick={loadData} disabled={loading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              刷新
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* 搜索框 */}
          <div className="flex items-center gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="搜索商戶、用戶、卡片..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* 表格 */}
          {loading ? (
            <div className="text-center py-8 text-gray-500">載入中...</div>
          ) : filteredTransactions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">尚無消費記錄</div>
          ) : (
            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>日期</TableHead>
                    <TableHead>用戶</TableHead>
                    <TableHead>商戶</TableHead>
                    <TableHead>金額</TableHead>
                    <TableHead>支付方式</TableHead>
                    <TableHead>回贈</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.map((tx) => (
                    <TableRow key={tx.id}>
                      <TableCell className="whitespace-nowrap">
                        {tx.transaction_date || new Date(tx.created_at).toLocaleDateString('zh-HK')}
                      </TableCell>
                      <TableCell>
                        <div className="max-w-[150px] truncate">
                          {tx.profiles?.display_name || tx.profiles?.email || tx.user_id.slice(0, 8)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">{tx.merchant_name}</span>
                      </TableCell>
                      <TableCell className="font-mono">
                        ${tx.amount?.toLocaleString() || 0}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {formatPaymentMethod(tx.payment_method)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-emerald-600 font-medium">
                        +${tx.reward_amount?.toFixed(2) || '0.00'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

