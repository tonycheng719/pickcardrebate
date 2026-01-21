'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Smartphone, 
  RefreshCw, 
  TrendingUp, 
  Users, 
  Search, 
  CreditCard,
  Calculator,
  Receipt,
  Apple,
  Bot,
} from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface EventStats {
  event_name: string;
  count: number;
}

interface PlatformStats {
  platform: string;
  count: number;
}

export default function AppAnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [eventStats, setEventStats] = useState<EventStats[]>([]);
  const [platformStats, setPlatformStats] = useState<PlatformStats[]>([]);
  const [totalEvents, setTotalEvents] = useState(0);
  const [uniqueUsers, setUniqueUsers] = useState(0);
  const [todayEvents, setTodayEvents] = useState(0);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    setLoading(true);
    try {
      // 總事件數
      const { count: total } = await supabase
        .from('app_events')
        .select('*', { count: 'exact', head: true });
      setTotalEvents(total || 0);

      // 今日事件
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const { count: todayCount } = await supabase
        .from('app_events')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', today.toISOString());
      setTodayEvents(todayCount || 0);

      // 唯一用戶數
      const { data: usersData } = await supabase
        .from('app_events')
        .select('user_id')
        .not('user_id', 'is', null);
      const uniqueUserIds = new Set(usersData?.map(d => d.user_id) || []);
      setUniqueUsers(uniqueUserIds.size);

      // 事件類型統計
      const { data: events } = await supabase
        .from('app_events')
        .select('event_name');
      
      if (events) {
        const counts: Record<string, number> = {};
        events.forEach(e => {
          counts[e.event_name] = (counts[e.event_name] || 0) + 1;
        });
        const stats = Object.entries(counts)
          .map(([event_name, count]) => ({ event_name, count }))
          .sort((a, b) => b.count - a.count);
        setEventStats(stats);
      }

      // 平台統計
      const { data: platforms } = await supabase
        .from('app_events')
        .select('platform');
      
      if (platforms) {
        const counts: Record<string, number> = {};
        platforms.forEach(p => {
          counts[p.platform] = (counts[p.platform] || 0) + 1;
        });
        const stats = Object.entries(counts)
          .map(([platform, count]) => ({ platform, count }))
          .sort((a, b) => b.count - a.count);
        setPlatformStats(stats);
      }

    } catch (e) {
      console.error('Load stats error:', e);
    }
    setLoading(false);
  };

  const getEventIcon = (event: string) => {
    const icons: Record<string, any> = {
      'screen_view': Smartphone,
      'search': Search,
      'calculate_rebate': Calculator,
      'view_card': CreditCard,
      'add_to_wallet': CreditCard,
      'add_transaction': Receipt,
      'login': Users,
      'sign_up': Users,
    };
    return icons[event] || TrendingUp;
  };

  const getPlatformIcon = (platform: string) => {
    if (platform === 'ios') return Apple;
    if (platform === 'android') return Bot;
    return Smartphone;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Smartphone className="h-6 w-6" />
            App Analytics
          </h1>
          <p className="text-gray-500">App 使用數據統計（Fallback 數據）</p>
        </div>
        <Button variant="outline" onClick={loadStats} disabled={loading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          刷新
        </Button>
      </div>

      {/* Firebase 設定提示 */}
      <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
        <CardContent className="pt-6">
          <h3 className="font-bold text-blue-900 dark:text-blue-200 mb-2">
            📊 Firebase Analytics 設定指南
          </h3>
          <p className="text-sm text-blue-800 dark:text-blue-300 mb-3">
            完整的 App Analytics 需要設定 Firebase：
          </p>
          <ol className="text-sm text-blue-700 dark:text-blue-300 space-y-1 list-decimal list-inside">
            <li>在 <a href="https://console.firebase.google.com/" target="_blank" className="underline">Firebase Console</a> 創建項目</li>
            <li>添加 iOS 和 Android App</li>
            <li>下載並放置 <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">google-services.json</code> 和 <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">GoogleService-Info.plist</code></li>
            <li>安裝 <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">@react-native-firebase/analytics</code></li>
            <li>在 <a href="https://analytics.google.com/" target="_blank" className="underline">GA4</a> 中連結 Firebase 項目</li>
          </ol>
          <p className="text-xs text-blue-600 dark:text-blue-400 mt-3">
            💡 GA4 Measurement ID: <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">G-E0ST5J83F7</code>
          </p>
        </CardContent>
      </Card>

      {/* 統計卡片 */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500">總事件數</p>
                <p className="text-2xl font-bold">{totalEvents.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                <Smartphone className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500">今日事件</p>
                <p className="text-2xl font-bold">{todayEvents.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500">活躍用戶</p>
                <p className="text-2xl font-bold">{uniqueUsers}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              {platformStats.map((p, i) => {
                const Icon = getPlatformIcon(p.platform);
                return (
                  <Badge key={i} variant="secondary" className="flex items-center gap-1">
                    <Icon className="h-3 w-3" />
                    {p.platform}: {p.count}
                  </Badge>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 事件統計 */}
      <Card>
        <CardHeader>
          <CardTitle>事件統計</CardTitle>
          <CardDescription>各類事件觸發次數</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8 text-gray-500">載入中...</div>
          ) : eventStats.length === 0 ? (
            <div className="text-center py-8 text-gray-500">尚無事件數據</div>
          ) : (
            <div className="space-y-3">
              {eventStats.map((stat) => {
                const Icon = getEventIcon(stat.event_name);
                const percentage = totalEvents > 0 ? (stat.count / totalEvents * 100).toFixed(1) : 0;
                
                return (
                  <div key={stat.event_name} className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                      <Icon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium">{stat.event_name}</span>
                        <span className="text-sm text-gray-500">{stat.count} ({percentage}%)</span>
                      </div>
                      <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500 rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

