"use client";

import { useEffect, useState } from "react";
import { HK_CARDS } from "@/lib/data/cards";
import { CreditCard } from "@/lib/types";
import Link from "next/link";
import { AlertTriangle, Clock, CheckCircle, Calendar, ExternalLink, Bell, Send, RefreshCw, Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface PromoCard extends CreditCard {
  daysUntilExpiry: number;
  status: "expired" | "expiring_soon" | "active";
}

interface NotificationLog {
  source_id: string;
  reminder_type: string;
  sent_at: string;
}

export default function ExpiringPromosPage() {
  const [promoCards, setPromoCards] = useState<PromoCard[]>([]);
  const [filter, setFilter] = useState<"all" | "expired" | "expiring_soon" | "active">("all");
  const [cardImages, setCardImages] = useState<Record<string, string>>({});
  const [selectedCards, setSelectedCards] = useState<Set<string>>(new Set());
  const [notificationLogs, setNotificationLogs] = useState<NotificationLog[]>([]);
  const [sending, setSending] = useState(false);
  const [autoSending, setAutoSending] = useState(false);
  const [cleaning, setCleaning] = useState(false);

  // 載入已發送的通知記錄
  useEffect(() => {
    async function fetchNotificationLogs() {
      try {
        const res = await fetch('/api/admin/offer-notification-log');
        if (res.ok) {
          const data = await res.json();
          setNotificationLogs(data);
        }
      } catch (e) {
        console.error('Failed to fetch notification logs:', e);
      }
    }
    fetchNotificationLogs();
  }, []);

  // 檢查是否已發送過提醒
  const hasNotified = (cardId: string, reminderType: string) => {
    return notificationLogs.some(
      log => log.source_id === cardId && log.reminder_type === reminderType
    );
  };

  // 發送選定卡片的提醒
  const handleSendReminders = async () => {
    if (selectedCards.size === 0) {
      toast.error('請先選擇要發送提醒的卡片');
      return;
    }

    setSending(true);
    try {
      const res = await fetch('/api/admin/send-expiry-reminder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cardIds: Array.from(selectedCards) }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success(`已發送 ${data.sent} 個提醒給 ${data.recipients} 位用戶`);
        setSelectedCards(new Set());
        // 重新載入通知記錄
        const logsRes = await fetch('/api/admin/offer-notification-log');
        if (logsRes.ok) {
          setNotificationLogs(await logsRes.json());
        }
      } else {
        toast.error(data.error || '發送失敗');
      }
    } catch (e) {
      toast.error('發送失敗');
    }
    setSending(false);
  };

  // 自動發送所有即將到期的提醒
  const handleAutoSend = async () => {
    setAutoSending(true);
    try {
      const res = await fetch('/api/cron/auto-expiry-reminders');
      const data = await res.json();
      if (res.ok) {
        toast.success(`自動發送完成：${data.processed} 個優惠，${data.sent} 條通知`);
        // 重新載入通知記錄
        const logsRes = await fetch('/api/admin/offer-notification-log');
        if (logsRes.ok) {
          setNotificationLogs(await logsRes.json());
        }
      } else {
        toast.error(data.error || '自動發送失敗');
      }
    } catch (e) {
      toast.error('自動發送失敗');
    }
    setAutoSending(false);
  };

  // 清理過期超過 7 天的推廣
  const handleCleanup = async () => {
    if (!confirm('確定要清理所有過期超過 7 天的推廣嗎？此操作會：\n\n1. 清除信用卡的過期推廣日期\n2. 軟刪除過期的 Discover 文章\n\n建議先備份數據。')) {
      return;
    }
    
    setCleaning(true);
    try {
      const res = await fetch('/api/cron/cleanup-expired-promos', { method: 'POST' });
      const data = await res.json();
      if (res.ok) {
        toast.success(`清理完成：${data.cards?.cleaned || 0} 張卡片、${data.promos?.deleted || 0} 篇文章`);
        // 重新載入頁面以更新數據
        window.location.reload();
      } else {
        toast.error(data.error || '清理失敗');
      }
    } catch (e) {
      toast.error('清理失敗');
    }
    setCleaning(false);
  };

  // 切換選擇卡片
  const toggleCardSelection = (cardId: string) => {
    const newSelected = new Set(selectedCards);
    if (newSelected.has(cardId)) {
      newSelected.delete(cardId);
    } else {
      newSelected.add(cardId);
    }
    setSelectedCards(newSelected);
  };

  // 全選/取消全選
  const toggleSelectAll = () => {
    const eligibleCards = filteredCards.filter(c => c.status === 'expiring_soon' && c.daysUntilExpiry <= 7);
    if (selectedCards.size === eligibleCards.length) {
      setSelectedCards(new Set());
    } else {
      setSelectedCards(new Set(eligibleCards.map(c => c.id)));
    }
  };

  // 從 database 獲取卡片圖片
  useEffect(() => {
    async function fetchCardImages() {
      const supabase = createClient();
      if (!supabase) return;
      
      try {
        const { data } = await supabase
          .from('cards')
          .select('id, image_url');
        
        if (data) {
          const images: Record<string, string> = {};
          data.forEach((card: { id: string; image_url: string | null }) => {
            if (card.image_url) {
              images[card.id] = card.image_url;
            }
          });
          setCardImages(images);
        }
      } catch (e) {
        console.error('Failed to fetch card images:', e);
      }
    }
    fetchCardImages();
  }, []);

  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const cardsWithPromo = HK_CARDS
      .filter((card) => card.promoEndDate)
      .map((card) => {
        const endDate = new Date(card.promoEndDate!);
        endDate.setHours(0, 0, 0, 0);
        const diffTime = endDate.getTime() - today.getTime();
        const daysUntilExpiry = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        let status: "expired" | "expiring_soon" | "active";
        if (daysUntilExpiry < 0) {
          status = "expired";
        } else if (daysUntilExpiry <= 30) {
          status = "expiring_soon";
        } else {
          status = "active";
        }

        return {
          ...card,
          daysUntilExpiry,
          status,
        };
      })
      .sort((a, b) => a.daysUntilExpiry - b.daysUntilExpiry);

    setPromoCards(cardsWithPromo);
  }, []);
  
  // 獲取卡片圖片 (優先用 database，fallback 用本地)
  const getCardImage = (card: CreditCard) => {
    return cardImages[card.id] || card.imageUrl || null;
  };

  const filteredCards = promoCards.filter((card) => {
    if (filter === "all") return true;
    return card.status === filter;
  });

  const expiredCount = promoCards.filter((c) => c.status === "expired").length;
  const expiringSoonCount = promoCards.filter((c) => c.status === "expiring_soon").length;
  const activeCount = promoCards.filter((c) => c.status === "active").length;

  const getStatusBadge = (status: string, days: number) => {
    switch (status) {
      case "expired":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
            <AlertTriangle className="w-3 h-3" />
            已過期 {Math.abs(days)} 天
          </span>
        );
      case "expiring_soon":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
            <Clock className="w-3 h-3" />
            {days} 天後到期
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
            <CheckCircle className="w-3 h-3" />
            {days} 天後到期
          </span>
        );
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("zh-HK", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            📅 推廣到期提示
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            追蹤信用卡推廣優惠嘅到期日，自動發送到期提醒給用戶
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={handleCleanup} 
            disabled={cleaning}
            className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
          >
            {cleaning ? (
              <RefreshCw className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <Trash2 className="h-4 w-4 mr-2" />
            )}
            清理過期 7 天
          </Button>
          <Button 
            variant="outline" 
            onClick={handleAutoSend} 
            disabled={autoSending}
          >
            {autoSending ? (
              <RefreshCw className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <Bell className="h-4 w-4 mr-2" />
            )}
            自動發送提醒
          </Button>
          {selectedCards.size > 0 && (
            <Button onClick={handleSendReminders} disabled={sending}>
              {sending ? (
                <RefreshCw className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Send className="h-4 w-4 mr-2" />
              )}
              發送 {selectedCards.size} 個提醒
            </Button>
          )}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div
          className={`p-4 rounded-xl cursor-pointer transition-all ${
            filter === "all"
              ? "bg-blue-100 dark:bg-blue-900/30 ring-2 ring-blue-500"
              : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
          onClick={() => setFilter("all")}
        >
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            {promoCards.length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">全部推廣</div>
        </div>

        <div
          className={`p-4 rounded-xl cursor-pointer transition-all ${
            filter === "expired"
              ? "bg-red-100 dark:bg-red-900/30 ring-2 ring-red-500"
              : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
          onClick={() => setFilter("expired")}
        >
          <div className="text-3xl font-bold text-red-600 dark:text-red-400">
            {expiredCount}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">已過期 ⚠️</div>
        </div>

        <div
          className={`p-4 rounded-xl cursor-pointer transition-all ${
            filter === "expiring_soon"
              ? "bg-yellow-100 dark:bg-yellow-900/30 ring-2 ring-yellow-500"
              : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
          onClick={() => setFilter("expiring_soon")}
        >
          <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
            {expiringSoonCount}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">30天內到期 ⏰</div>
        </div>

        <div
          className={`p-4 rounded-xl cursor-pointer transition-all ${
            filter === "active"
              ? "bg-green-100 dark:bg-green-900/30 ring-2 ring-green-500"
              : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
          onClick={() => setFilter("active")}
        >
          <div className="text-3xl font-bold text-green-600 dark:text-green-400">
            {activeCount}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">正常進行 ✅</div>
        </div>
      </div>

      {/* Promo Cards List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  <input
                    type="checkbox"
                    onChange={toggleSelectAll}
                    checked={selectedCards.size > 0 && selectedCards.size === filteredCards.filter(c => c.status === 'expiring_soon' && c.daysUntilExpiry <= 7).length}
                    className="rounded border-gray-300"
                    title="選擇所有 7 天內到期"
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  狀態
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  信用卡
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  推廣名稱
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  到期日
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  通知狀態
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredCards.map((card) => {
                const canNotify = card.status === 'expiring_soon' && card.daysUntilExpiry <= 7 && card.daysUntilExpiry >= 0;
                const reminderType = card.daysUntilExpiry <= 1 ? '1d' : card.daysUntilExpiry <= 3 ? '3d' : '7d';
                const alreadySent = hasNotified(card.id, reminderType);
                
                return (
                <tr
                  key={card.id}
                  className={`hover:bg-gray-50 dark:hover:bg-gray-700/50 ${
                    card.status === "expired"
                      ? "bg-red-50/50 dark:bg-red-900/10"
                      : card.status === "expiring_soon"
                      ? "bg-yellow-50/50 dark:bg-yellow-900/10"
                      : ""
                  }`}
                >
                  <td className="px-4 py-4">
                    {canNotify && (
                      <input
                        type="checkbox"
                        checked={selectedCards.has(card.id)}
                        onChange={() => toggleCardSelection(card.id)}
                        className="rounded border-gray-300"
                        disabled={alreadySent}
                      />
                    )}
                  </td>
                  <td className="px-4 py-4">
                    {getStatusBadge(card.status, card.daysUntilExpiry)}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      {getCardImage(card) ? (
                        <img
                          src={getCardImage(card)!}
                          alt={card.name}
                          className="w-16 h-10 object-contain rounded"
                        />
                      ) : (
                        <div
                          className={`w-16 h-10 rounded ${card.style.bgColor} flex items-center justify-center`}
                        >
                          <span className={`text-[8px] font-bold ${card.style.textColor}`}>
                            {card.bank}
                          </span>
                        </div>
                      )}
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white text-sm">
                          {card.name}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {card.bank}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {card.promoName || "未命名推廣"}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Calendar className="w-4 h-4" />
                      {formatDate(card.promoEndDate!)}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1 flex-wrap">
                      {hasNotified(card.id, '7d') && (
                        <span className="px-1.5 py-0.5 text-xs bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded">
                          7天 ✓
                        </span>
                      )}
                      {hasNotified(card.id, '3d') && (
                        <span className="px-1.5 py-0.5 text-xs bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 rounded">
                          3天 ✓
                        </span>
                      )}
                      {hasNotified(card.id, '1d') && (
                        <span className="px-1.5 py-0.5 text-xs bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 rounded">
                          1天 ✓
                        </span>
                      )}
                      {!hasNotified(card.id, '7d') && !hasNotified(card.id, '3d') && !hasNotified(card.id, '1d') && (
                        <span className="text-xs text-gray-400">未發送</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/cards/${card.id}`}
                        className="text-blue-600 hover:text-blue-700 dark:text-blue-400 text-sm"
                        target="_blank"
                      >
                        查看卡片
                      </Link>
                      {card.applyUrl && (
                        <a
                          href={card.applyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                          title="官方網站"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </td>
                </tr>
              );
              })}
            </tbody>
          </table>
        </div>

        {filteredCards.length === 0 && (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            沒有符合條件嘅推廣
          </div>
        )}
      </div>

      {/* Tips Section */}
      <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
        <h3 className="font-medium text-blue-800 dark:text-blue-300 mb-2">
          💡 使用提示
        </h3>
        <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
          <li>• <strong>自動發送提醒</strong>：系統會自動在優惠到期前 7 天、3 天、1 天發送推送通知給持有該卡的用戶</li>
          <li>• <strong>手動發送</strong>：勾選卡片後點擊「發送提醒」可手動觸發</li>
          <li>• <strong>通知狀態</strong>：顯示已發送的提醒類型（7天/3天/1天），避免重複發送</li>
          <li>• <strong className="text-red-600 dark:text-red-400">清理過期 7 天</strong>：刪除過期超過 7 天的推廣（信用卡推廣日期會清空、Discover 文章會軟刪除）</li>
          <li>• 建議設定 Vercel Cron Job 每日執行 <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">/api/cron/auto-expiry-reminders</code> 和 <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">/api/cron/cleanup-expired-promos</code></li>
        </ul>
      </div>

      {/* Cards without promo date */}
      <div className="mt-8">
        <h3 className="font-medium text-gray-900 dark:text-white mb-4">
          📋 尚未設定推廣到期日嘅卡片 ({HK_CARDS.filter(c => !c.promoEndDate && !c.hidden).length})
        </h3>
        <div className="flex flex-wrap gap-2">
          {HK_CARDS.filter(c => !c.promoEndDate && !c.hidden).slice(0, 20).map((card) => (
            <Link
              key={card.id}
              href={`/cards/${card.id}`}
              className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-400"
            >
              {card.name}
            </Link>
          ))}
          {HK_CARDS.filter(c => !c.promoEndDate && !c.hidden).length > 20 && (
            <span className="text-xs px-2 py-1 text-gray-400">
              +{HK_CARDS.filter(c => !c.promoEndDate && !c.hidden).length - 20} 更多...
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

