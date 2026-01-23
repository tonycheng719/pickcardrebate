'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Bell, Send, History, Users, RefreshCw } from "lucide-react";

interface NotificationHistory {
  id: string;
  title: string;
  body: string;
  sent_count: number;
  target_type: string;
  trigger_type: string | null;
  created_at: string;
}

export default function NotificationsPage() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{ success: boolean; sent?: number; error?: string } | null>(null);
  const [history, setHistory] = useState<NotificationHistory[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [tokenCount, setTokenCount] = useState<number>(0);

  useEffect(() => {
    fetchHistory();
    fetchTokenCount();
  }, []);

  const fetchHistory = async () => {
    setLoadingHistory(true);
    try {
      const res = await fetch('/api/admin/notification-history');
      if (res.ok) {
        const data = await res.json();
        setHistory(data.history || []);
      }
    } catch (e) {
      console.error('Failed to fetch history:', e);
    }
    setLoadingHistory(false);
  };

  const fetchTokenCount = async () => {
    try {
      const res = await fetch('/api/admin/push-token-count');
      if (res.ok) {
        const data = await res.json();
        setTokenCount(data.count || 0);
      }
    } catch (e) {
      console.error('Failed to fetch token count:', e);
    }
  };

  const handleSend = async () => {
    if (!title.trim() || !body.trim()) {
      setResult({ success: false, error: '請填寫標題和內容' });
      return;
    }

    setSending(true);
    setResult(null);

    try {
      const res = await fetch('/api/admin/send-notification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          body: body.trim(),
          targetAll: true,
        }),
      });

      const data = await res.json();
      
      if (res.ok) {
        setResult({ success: true, sent: data.sent });
        setTitle('');
        setBody('');
        fetchHistory();
      } else {
        setResult({ success: false, error: data.error || '發送失敗' });
      }
    } catch (e: any) {
      setResult({ success: false, error: e.message });
    }

    setSending(false);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString('zh-HK', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getTriggerTypeBadge = (type: string | null) => {
    switch (type) {
      case 'cron_new_article':
        return <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">新文章</span>;
      case 'cron_offer_expiry':
        return <span className="px-2 py-1 text-xs bg-orange-100 text-orange-700 rounded">優惠到期</span>;
      case 'manual':
      default:
        return <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">手動</span>;
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="flex items-center gap-3 mb-6">
        <Bell className="h-8 w-8 text-primary" />
        <h1 className="text-2xl font-bold">推送通知管理</h1>
      </div>

      {/* 統計 */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-blue-500" />
              <div>
                <div className="text-2xl font-bold">{tokenCount}</div>
                <div className="text-sm text-muted-foreground">已註冊設備</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Send className="h-8 w-8 text-green-500" />
              <div>
                <div className="text-2xl font-bold">{history.length}</div>
                <div className="text-sm text-muted-foreground">已發送通知</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 發送通知 */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Send className="h-5 w-5" />
            發送推送通知
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">標題</label>
            <Input
              placeholder="輸入通知標題..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={50}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">內容</label>
            <Textarea
              placeholder="輸入通知內容..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
              maxLength={200}
              rows={3}
            />
          </div>
          
          {result && (
            <div className={`p-3 rounded ${result.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
              {result.success 
                ? `✅ 成功發送 ${result.sent} 條通知` 
                : `❌ ${result.error}`
              }
            </div>
          )}

          <Button 
            onClick={handleSend} 
            disabled={sending || !title.trim() || !body.trim()}
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
                發送給所有用戶 ({tokenCount} 設備)
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* 發送歷史 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            發送歷史
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loadingHistory ? (
            <div className="text-center py-8 text-muted-foreground">載入中...</div>
          ) : history.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">暫無發送記錄</div>
          ) : (
            <div className="space-y-3">
              {history.map((item) => (
                <div 
                  key={item.id} 
                  className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="font-medium">{item.title}</div>
                    {getTriggerTypeBadge(item.trigger_type)}
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">{item.body}</div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>發送: {item.sent_count} 設備</span>
                    <span>{formatDate(item.created_at)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
