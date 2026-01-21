'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Bell, Plus, Trash2, Calendar, CreditCard, RefreshCw, Send } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface OfferReminder {
  id: string;
  card_id: string;
  card_name: string;
  offer_type: string;
  offer_description: string;
  expiry_date: string;
  reminder_days: number[];
  is_active: boolean;
  created_at: string;
}

const OFFER_TYPES = [
  { value: 'welcome_offer', label: '迎新優惠' },
  { value: 'promotion', label: '限時優惠' },
  { value: 'annual_fee', label: '年費到期' },
  { value: 'points_expiry', label: '積分到期' },
];

export default function OfferRemindersPage() {
  const [reminders, setReminders] = useState<OfferReminder[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [sending, setSending] = useState(false);

  // 新增表單
  const [cardId, setCardId] = useState('');
  const [cardName, setCardName] = useState('');
  const [offerType, setOfferType] = useState('promotion');
  const [offerDescription, setOfferDescription] = useState('');
  const [expiryDate, setExpiryDate] = useState('');

  useEffect(() => {
    loadReminders();
  }, []);

  const loadReminders = async () => {
    try {
      const res = await fetch('/api/admin/offer-reminders');
      if (res.ok) {
        const data = await res.json();
        setReminders(data);
      }
    } catch (e) {
      console.error('Load reminders failed:', e);
    }
    setLoading(false);
  };

  const handleCreate = async () => {
    if (!cardId || !cardName || !expiryDate) {
      toast.error('請填寫必填欄位');
      return;
    }

    try {
      const res = await fetch('/api/admin/offer-reminders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cardId,
          cardName,
          offerType,
          offerDescription,
          expiryDate,
        }),
      });

      if (res.ok) {
        toast.success('優惠提醒已創建');
        setDialogOpen(false);
        resetForm();
        loadReminders();
      } else {
        const data = await res.json();
        toast.error(data.error || '創建失敗');
      }
    } catch (e) {
      toast.error('創建失敗');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('確定要刪除此提醒嗎？')) return;

    try {
      const res = await fetch(`/api/admin/offer-reminders?id=${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        toast.success('已刪除');
        loadReminders();
      }
    } catch (e) {
      toast.error('刪除失敗');
    }
  };

  const handleSendNow = async () => {
    setSending(true);
    try {
      const res = await fetch('/api/cron/send-offer-reminders');
      const data = await res.json();

      if (res.ok) {
        toast.success(`已處理 ${data.processed} 個提醒`);
      } else {
        toast.error(data.error || '發送失敗');
      }
    } catch (e) {
      toast.error('發送失敗');
    }
    setSending(false);
  };

  const resetForm = () => {
    setCardId('');
    setCardName('');
    setOfferType('promotion');
    setOfferDescription('');
    setExpiryDate('');
  };

  const getDaysUntilExpiry = (date: string) => {
    const expiry = new Date(date);
    const today = new Date();
    const diff = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  const getOfferTypeLabel = (type: string) => {
    return OFFER_TYPES.find(t => t.value === type)?.label || type;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Bell className="h-6 w-6" />
            優惠到期提醒
          </h1>
          <p className="text-gray-500">管理信用卡優惠到期提醒，自動推送給用戶</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleSendNow} disabled={sending}>
            {sending ? <RefreshCw className="h-4 w-4 animate-spin mr-2" /> : <Send className="h-4 w-4 mr-2" />}
            立即發送提醒
          </Button>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                新增提醒
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>新增優惠到期提醒</DialogTitle>
                <DialogDescription>
                  設定優惠到期時間，系統會自動在到期前提醒持有此卡的用戶
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>卡片 ID *</Label>
                    <Input
                      placeholder="例如: hsbc-red"
                      value={cardId}
                      onChange={(e) => setCardId(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>卡片名稱 *</Label>
                    <Input
                      placeholder="例如: HSBC Red Card"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>優惠類型</Label>
                  <Select value={offerType} onValueChange={setOfferType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {OFFER_TYPES.map(type => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>優惠說明</Label>
                  <Input
                    placeholder="例如: 迎新禮遇 $500 回贈"
                    value={offerDescription}
                    onChange={(e) => setOfferDescription(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>到期日期 *</Label>
                  <Input
                    type="date"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                  />
                </div>
                <p className="text-sm text-gray-500">
                  系統會在到期前 7 天、3 天、1 天自動發送推送通知
                </p>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  取消
                </Button>
                <Button onClick={handleCreate}>
                  創建提醒
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <RefreshCw className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      ) : reminders.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Bell className="h-12 w-12 text-gray-300 mb-4" />
            <p className="text-gray-500">尚未設定任何優惠到期提醒</p>
            <Button className="mt-4" onClick={() => setDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              新增第一個提醒
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {reminders.map((reminder) => {
            const daysLeft = getDaysUntilExpiry(reminder.expiry_date);
            const isExpired = daysLeft < 0;
            const isUrgent = daysLeft <= 3 && daysLeft >= 0;

            return (
              <Card key={reminder.id} className={isExpired ? 'opacity-50' : ''}>
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg ${
                      isExpired ? 'bg-gray-100' :
                      isUrgent ? 'bg-red-100' : 'bg-blue-100'
                    }`}>
                      <CreditCard className={`h-6 w-6 ${
                        isExpired ? 'text-gray-400' :
                        isUrgent ? 'text-red-600' : 'text-blue-600'
                      }`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold">{reminder.card_name}</span>
                        <Badge variant={
                          reminder.offer_type === 'welcome_offer' ? 'default' :
                          reminder.offer_type === 'annual_fee' ? 'destructive' : 'secondary'
                        }>
                          {getOfferTypeLabel(reminder.offer_type)}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500">
                        {reminder.offer_description || '無說明'}
                      </p>
                      <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                        <Calendar className="h-3 w-3" />
                        <span>到期日: {reminder.expiry_date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      {isExpired ? (
                        <Badge variant="outline" className="text-gray-500">已過期</Badge>
                      ) : (
                        <Badge variant={isUrgent ? 'destructive' : 'outline'}>
                          {daysLeft === 0 ? '今天到期' : `${daysLeft} 天後到期`}
                        </Badge>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(reminder.id)}
                    >
                      <Trash2 className="h-4 w-4 text-gray-400 hover:text-red-500" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* 說明卡片 */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900 text-base">💡 使用說明</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-blue-800 space-y-2">
          <p>• 系統會自動在優惠到期前 <strong>7 天、3 天、1 天</strong> 發送推送通知</p>
          <p>• 只有<strong>持有該信用卡</strong>的用戶會收到通知</p>
          <p>• 用戶需要在 App 中開啟通知權限才能收到提醒</p>
          <p>• 可以點擊「立即發送提醒」手動觸發檢查</p>
          <p>• 建議設定 Vercel Cron Job 每日自動執行 <code>/api/cron/send-offer-reminders</code></p>
        </CardContent>
      </Card>
    </div>
  );
}

