"use client";

import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Bell, AlertTriangle, Calendar, CreditCard, ChevronDown, ChevronUp,
  Clock, Target, X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { HK_CARDS } from "@/lib/data/cards";
import { PROMOS } from "@/lib/data/promos";

interface Reminder {
  id: string;
  type: 'monthly_min' | 'promo_deadline' | 'registration';
  title: string;
  description: string;
  cardId?: string;
  cardName?: string;
  deadline?: string;
  targetAmount?: number;
  urgency: 'high' | 'medium' | 'low';
}

export function SpendingReminders({ userCards }: { userCards: string[] }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [dismissedIds, setDismissedIds] = useState<string[]>([]);

  // Load dismissed reminders
  useEffect(() => {
    const saved = localStorage.getItem("pickcardrebate-dismissed-reminders");
    if (saved) {
      setDismissedIds(JSON.parse(saved));
    }
  }, []);

  // Save dismissed reminders
  const dismissReminder = (id: string) => {
    const newDismissed = [...dismissedIds, id];
    setDismissedIds(newDismissed);
    localStorage.setItem("pickcardrebate-dismissed-reminders", JSON.stringify(newDismissed));
  };

  // Generate reminders based on user's cards
  const reminders = useMemo(() => {
    const result: Reminder[] = [];
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const daysRemaining = daysInMonth - today.getDate();

    // Check each card for monthly minimum spend requirements
    userCards.forEach(cardId => {
      const card = HK_CARDS.find(c => c.id === cardId);
      if (!card) return;

      // Check for monthlyMinSpend in rules
      card.rules.forEach(rule => {
        if (rule.monthlyMinSpend && rule.monthlyMinSpend > 0) {
          const urgency = daysRemaining <= 7 ? 'high' : daysRemaining <= 14 ? 'medium' : 'low';
          result.push({
            id: `monthly-${cardId}-${rule.description}`,
            type: 'monthly_min',
            title: `${card.name} 月簽提醒`,
            description: `${rule.description} 需月簽滿 $${rule.monthlyMinSpend.toLocaleString()} 才享有 ${rule.percentage}% 回贈`,
            cardId,
            cardName: card.name,
            targetAmount: rule.monthlyMinSpend,
            urgency,
          });
        }
      });

      // Check for registration requirements
      if (card.tags?.some(t => t.includes('需登記'))) {
        result.push({
          id: `register-${cardId}`,
          type: 'registration',
          title: `${card.name} 需要登記`,
          description: `此卡部分優惠需要每月登記才能享有，請確保已完成登記`,
          cardId,
          cardName: card.name,
          urgency: 'medium',
        });
      }
    });

    // Check for expiring promos related to user's cards
    PROMOS.forEach(promo => {
      const hasRelatedCard = promo.relatedCardIds.some(id => userCards.includes(id));
      if (!hasRelatedCard) return;

      const expiryDate = new Date(promo.expiryDate);
      const daysToExpiry = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

      if (daysToExpiry > 0 && daysToExpiry <= 30) {
        const urgency = daysToExpiry <= 7 ? 'high' : daysToExpiry <= 14 ? 'medium' : 'low';
        result.push({
          id: `promo-${promo.id}`,
          type: 'promo_deadline',
          title: promo.title,
          description: `優惠將於 ${daysToExpiry} 天後截止 (${promo.expiryDate})`,
          deadline: promo.expiryDate,
          urgency,
        });
      }
    });

    // Sort by urgency
    const urgencyOrder = { high: 0, medium: 1, low: 2 };
    return result
      .filter(r => !dismissedIds.includes(r.id))
      .sort((a, b) => urgencyOrder[a.urgency] - urgencyOrder[b.urgency]);
  }, [userCards, dismissedIds]);

  if (userCards.length === 0 || reminders.length === 0) {
    return null;
  }

  const highUrgencyCount = reminders.filter(r => r.urgency === 'high').length;

  return (
    <Card className={`border-0 shadow-lg ${
      highUrgencyCount > 0 
        ? 'bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/30 dark:border dark:border-red-800/30'
        : 'bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30 dark:border dark:border-amber-800/30'
    }`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className={`flex items-center gap-2 ${
            highUrgencyCount > 0 ? 'text-red-900 dark:text-red-100' : 'text-amber-900 dark:text-amber-100'
          }`}>
            <Bell className={`h-5 w-5 ${highUrgencyCount > 0 ? 'text-red-500' : 'text-amber-500'}`} />
            消費提醒
            {highUrgencyCount > 0 && (
              <span className="ml-2 px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                {highUrgencyCount} 緊急
              </span>
            )}
          </CardTitle>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setIsExpanded(!isExpanded)}
            className="h-8 w-8 p-0"
          >
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>
      </CardHeader>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <CardContent className="pt-2">
              <div className="space-y-3">
                {reminders.map((reminder) => (
                  <motion.div
                    key={reminder.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className={`p-3 rounded-xl border flex items-start gap-3 ${
                      reminder.urgency === 'high'
                        ? 'bg-red-100 border-red-200 dark:bg-red-900/30 dark:border-red-800'
                        : reminder.urgency === 'medium'
                        ? 'bg-amber-100 border-amber-200 dark:bg-amber-900/30 dark:border-amber-800'
                        : 'bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${
                      reminder.urgency === 'high'
                        ? 'bg-red-200 dark:bg-red-800'
                        : reminder.urgency === 'medium'
                        ? 'bg-amber-200 dark:bg-amber-800'
                        : 'bg-gray-100 dark:bg-gray-700'
                    }`}>
                      {reminder.type === 'monthly_min' ? (
                        <Target className={`h-4 w-4 ${
                          reminder.urgency === 'high' ? 'text-red-700 dark:text-red-200' : 'text-amber-700 dark:text-amber-200'
                        }`} />
                      ) : reminder.type === 'promo_deadline' ? (
                        <Clock className={`h-4 w-4 ${
                          reminder.urgency === 'high' ? 'text-red-700 dark:text-red-200' : 'text-amber-700 dark:text-amber-200'
                        }`} />
                      ) : (
                        <AlertTriangle className={`h-4 w-4 ${
                          reminder.urgency === 'high' ? 'text-red-700 dark:text-red-200' : 'text-amber-700 dark:text-amber-200'
                        }`} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className={`font-medium text-sm ${
                        reminder.urgency === 'high' ? 'text-red-900 dark:text-red-100' : 'text-gray-900 dark:text-white'
                      }`}>
                        {reminder.title}
                      </h4>
                      <p className={`text-xs mt-0.5 ${
                        reminder.urgency === 'high' ? 'text-red-700 dark:text-red-300' : 'text-gray-600 dark:text-gray-400'
                      }`}>
                        {reminder.description}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
                      onClick={() => dismissReminder(reminder.id)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </motion.div>
                ))}
              </div>
              
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 text-center">
                提醒會根據你錢包中的信用卡自動生成
              </p>
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}

