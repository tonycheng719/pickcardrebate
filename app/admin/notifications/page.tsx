'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Bell, Send, Users, Clock, RefreshCw } from 'lucide-react';

interface NotificationRecord {
  id: string;
  title: string;
  message: string;
  target_type: string;
  sent_count: number;
  created_at: string;
}

export default function NotificationsPage() {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [targetType, setTargetType] = useState<'all' | 'specific'>('all');
  const [sending, setSending] = useState(false);
  const [history, setHistory] = useState<NotificationRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const res = await fetch('/api/admin/notifications');
      if (res.ok) {
        const data = await res.json();
        setHistory(data);
      }
    } catch (e) {
      console.error('Load history failed:', e);
    }
    setLoading(false);
  };

  const handleSend = async () => {
    if (!title.trim() || !message.trim()) {
      toast.error('請填寫標題和內容');
      return;
    }

    setSending(true);
    try {
      const res = await fetch('/api/admin/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          message: message.trim(),
          targetType,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(`成功發送 ${data.sentCount} 條通知`);
        setTitle('');
        setMessage('');
        loadHistory();
      } else {
        toast.error(data.error || '發送失敗');
      }
    } catch (e) {
      toast.error('發送失敗');
    }
    setSending(false);
  };

  // 快捷模板
  const templates = [
    { title: '新優惠上架', message: '🎉 新的信用卡優惠已上架，快來查看！' },
    { title: '限時優惠提醒', message: '⏰ 限時優惠即將結束，把握最後機會！' },
    { title: '排行榜更新', message: '📊 信用卡排行榜已更新，看看哪張卡最抵！' },
    { title: '新文章發布', message: '📖 新的信用卡攻略文章已發布，立即閱讀！' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Bell className="h-6 w-6" />
          推送通知管理
        </h1>
        <p className="text-gray-500">向 App 用戶發送推送通知</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* 發送通知 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Send className="h-5 w-5" />
              發送通知
            </CardTitle>
            <CardDescription>填寫內容並發送推送通知</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>目標用戶</Label>
              <div className="flex gap-2 mt-1">
                <Button
                  variant={targetType === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTargetType('all')}
                >
                  <Users className="h-4 w-4 mr-1" />
                  所有用戶
                </Button>
              </div>
            </div>

            <div>
              <Label htmlFor="title">標題</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="通知標題"
                maxLength={50}
              />
            </div>

            <div>
              <Label htmlFor="message">內容</Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="通知內容..."
                rows={3}
                maxLength={200}
              />
              <p className="text-xs text-gray-500 mt-1">{message.length}/200</p>
            </div>

            <Button 
              onClick={handleSend} 
              disabled={sending || !title.trim() || !message.trim()}
              className="w-full"
            >
              {sending ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  發送中...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  發送通知
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* 快捷模板 */}
        <Card>
          <CardHeader>
            <CardTitle>快捷模板</CardTitle>
            <CardDescription>點擊使用預設模板</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {templates.map((t, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setTitle(t.title);
                    setMessage(t.message);
                  }}
                  className="w-full text-left p-3 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <p className="font-medium">{t.title}</p>
                  <p className="text-sm text-gray-500 truncate">{t.message}</p>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 發送歷史 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            發送歷史
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8 text-gray-500">載入中...</div>
          ) : history.length === 0 ? (
            <div className="text-center py-8 text-gray-500">尚無發送記錄</div>
          ) : (
            <div className="space-y-3">
              {history.map((n) => (
                <div key={n.id} className="p-3 rounded-lg border">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium">{n.title}</h4>
                    <Badge variant="secondary">{n.sent_count} 人</Badge>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{n.message}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(n.created_at).toLocaleString('zh-HK')}
                  </p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}


