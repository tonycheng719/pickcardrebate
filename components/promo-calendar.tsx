"use client";

import { useState, useMemo, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { useDataset } from "@/lib/admin/data-store";
import { useWallet } from "@/lib/store/wallet-context";
import { useMediaQuery } from "@/hooks/use-media-query";
import { ChevronLeft, ChevronRight, Calendar, Bell, CreditCard } from "lucide-react";
import { CreditCard as CreditCardType } from "@/lib/types";
import { HK_CARDS } from "@/lib/data/cards";

const DAYS_OF_WEEK = ["日", "一", "二", "三", "四", "五", "六"];
const MONTHS = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];

// Color mapping for different promo types
const PROMO_COLORS: Record<string, string> = {
  supermarket: "bg-pink-500",
  dining: "bg-orange-500",
  travel: "bg-blue-500",
  online: "bg-purple-500",
  transport: "bg-green-500",
  general: "bg-gray-500",
};

interface DayPromo {
  card: CreditCardType;
  rule: any;
  description: string;
  percentage: number;
  category?: string;
}

interface PromoCalendarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PromoCalendar({ open, onOpenChange }: PromoCalendarProps) {
  const { cards: datasetCards } = useDataset();
  const { myCardIds } = useWallet();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  
  // Use HK_CARDS as primary source (always has latest validDays), merge with dataset cards
  const cards = useMemo(() => {
    // HK_CARDS has the latest static data with validDays
    // Dataset cards may have updated images/info from DB
    const cardMap = new Map<string, CreditCardType>();
    
    // Start with HK_CARDS (has all validDays)
    HK_CARDS.forEach(card => cardMap.set(card.id, card));
    
    // Overlay with dataset cards (for updated images, etc.)
    datasetCards.forEach(card => {
      const existing = cardMap.get(card.id);
      if (existing) {
        // Keep rules from HK_CARDS (has validDays), but update other fields
        cardMap.set(card.id, { ...card, rules: existing.rules });
      } else {
        cardMap.set(card.id, card);
      }
    });
    
    return Array.from(cardMap.values());
  }, [datasetCards]);
  
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<number | null>(new Date().getDate());

  // Reset to today when dialog opens
  useEffect(() => {
    if (open) {
      const today = new Date();
      setCurrentDate(today);
      setSelectedDay(today.getDate());
    }
  }, [open]);

  // Get current month info
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;

  // Extract promos with validDays (day of week) from all cards
  const dayOfWeekPromos = useMemo(() => {
    const promosByDay: Record<number, DayPromo[]> = {};
    
    // Initialize all days of week (0-6)
    for (let i = 0; i <= 6; i++) {
      promosByDay[i] = [];
    }

    cards.forEach(card => {
      if (!card.rules) return;
      
      card.rules.forEach(rule => {
        if (rule.validDays && rule.validDays.length > 0) {
          rule.validDays.forEach((dayOfWeek: number) => {
            if (!promosByDay[dayOfWeek]) promosByDay[dayOfWeek] = [];
            
            // Determine category from matchType/matchValue
            let category = "general";
            if (rule.matchType === "category") {
              const matchVal = rule.matchValue;
              category = Array.isArray(matchVal) ? (matchVal[0] || "general") : (matchVal || "general");
            } else if (rule.matchType === "merchant") {
              category = "merchant";
            }
            
            promosByDay[dayOfWeek].push({
              card,
              rule,
              description: rule.description || `${card.name} ${rule.percentage}%`,
              percentage: rule.percentage,
              category
            });
          });
        }
      });
    });

    return promosByDay;
  }, [cards]);

  // Extract promos with validDates (day of month) from all cards
  const dateOfMonthPromos = useMemo(() => {
    const promosByDate: Record<number, DayPromo[]> = {};

    cards.forEach(card => {
      if (!card.rules) return;
      
      card.rules.forEach(rule => {
        if (rule.validDates && rule.validDates.length > 0) {
          rule.validDates.forEach((dateOfMonth: number) => {
            if (!promosByDate[dateOfMonth]) promosByDate[dateOfMonth] = [];
            
            let category = "general";
            if (rule.matchType === "category") {
              const matchVal = rule.matchValue;
              category = Array.isArray(matchVal) ? (matchVal[0] || "general") : (matchVal || "general");
            } else if (rule.matchType === "merchant") {
              category = "merchant";
            }
            
            promosByDate[dateOfMonth].push({
              card,
              rule,
              description: rule.description || `${card.name} ${rule.percentage}%`,
              percentage: rule.percentage,
              category
            });
          });
        }
      });
    });

    return promosByDate;
  }, [cards]);

  // Get promos for a specific date (combines day of week and day of month promos)
  const getPromosForDate = (dayOfMonth: number): DayPromo[] => {
    const date = new Date(year, month, dayOfMonth);
    const dayOfWeek = date.getDay();
    
    // Combine promos from day of week (e.g. every Wednesday) and day of month (e.g. every 20th)
    const weekPromos = dayOfWeekPromos[dayOfWeek] || [];
    const monthPromos = dateOfMonthPromos[dayOfMonth] || [];
    
    // Deduplicate by card.id + rule.description
    const seen = new Set<string>();
    const combined: DayPromo[] = [];
    
    [...weekPromos, ...monthPromos].forEach(promo => {
      const key = `${promo.card.id}-${promo.rule.description}`;
      if (!seen.has(key)) {
        seen.add(key);
        combined.push(promo);
      }
    });
    
    return combined;
  };

  // Check if user owns the card
  const isCardOwned = (cardId: string) => myCardIds.includes(cardId);

  // Navigate months
  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
    setSelectedDay(null);
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
    setSelectedDay(null);
  };

  // Generate calendar grid
  const calendarDays = useMemo(() => {
    const days: (number | null)[] = [];
    
    // Add empty cells for days before the first day of month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    
    return days;
  }, [firstDayOfMonth, daysInMonth]);

  // Get unique promo dots for a day (max 3)
  const getPromoDots = (dayOfMonth: number) => {
    const promos = getPromosForDate(dayOfMonth);
    const uniqueCategories = [...new Set(promos.map(p => p.category))].slice(0, 3);
    return uniqueCategories.map(cat => PROMO_COLORS[cat as string] || PROMO_COLORS.general);
  };

  const selectedDayPromos = selectedDay ? getPromosForDate(selectedDay) : [];

  const CalendarContent = () => (
    <div className="space-y-4">
      {/* Month Navigation */}
      <div className="flex items-center justify-between px-2">
        <Button variant="ghost" size="icon" onClick={prevMonth}>
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h3 className="text-lg font-bold">
          {year}年 {MONTHS[month]}
        </h3>
        <Button variant="ghost" size="icon" onClick={nextMonth}>
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {/* Day Headers */}
      <div className="grid grid-cols-7 gap-1 text-center">
        {DAYS_OF_WEEK.map((day, i) => (
          <div key={day} className={`text-xs font-medium py-2 ${i === 0 ? 'text-red-500' : i === 6 ? 'text-blue-500' : 'text-gray-500'}`}>
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((day, index) => {
          if (day === null) {
            return <div key={`empty-${index}`} className="h-12" />;
          }
          
          const isToday = isCurrentMonth && day === today.getDate();
          const isSelected = selectedDay === day;
          const promoDots = getPromoDots(day);
          const hasPromos = promoDots.length > 0;
          
          return (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`
                h-12 rounded-lg flex flex-col items-center justify-center relative transition-all
                ${isToday ? 'ring-2 ring-blue-500 ring-offset-1' : ''}
                ${isSelected ? 'bg-emerald-100 ring-2 ring-emerald-500' : 'hover:bg-gray-100'}
                ${hasPromos ? 'font-bold' : 'text-gray-600'}
              `}
            >
              <span className={`text-sm ${isToday ? 'text-blue-600' : ''}`}>{day}</span>
              {hasPromos && (
                <div className="flex gap-0.5 mt-0.5">
                  {promoDots.map((color, i) => (
                    <div key={i} className={`w-1.5 h-1.5 rounded-full ${color}`} />
                  ))}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Selected Day Promos */}
      {selectedDay && (
        <div className="border-t pt-4 mt-4">
          <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
            <span className="border-b-2 border-emerald-500 pb-1">
              {selectedDay}號 優惠詳情：
            </span>
          </h4>
          
          {selectedDayPromos.length > 0 ? (
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {selectedDayPromos.map((promo, index) => (
                <div
                  key={`${promo.card.id}-${index}`}
                  className={`
                    flex items-center justify-between p-3 rounded-lg border
                    ${isCardOwned(promo.card.id) ? 'bg-emerald-50 border-emerald-200' : 'bg-white border-gray-200'}
                  `}
                >
                  <div className="flex items-center gap-3">
                    {promo.card.imageUrl ? (
                      <img 
                        src={promo.card.imageUrl} 
                        alt={promo.card.name} 
                        className="w-10 h-6 object-contain rounded"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className={`w-10 h-6 rounded ${promo.card.style?.bgColor || 'bg-gray-400'}`} />
                    )}
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {promo.card.name}
                        {promo.rule.isDiscount && (
                          <span className="ml-1.5 text-[10px] px-1.5 py-0.5 bg-orange-100 text-orange-600 rounded-full font-normal">
                            折扣
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-gray-500">
                        {promo.description}
                        {promo.rule.isDiscount && ' (購物時直接減價)'}
                      </p>
                      {isCardOwned(promo.card.id) && (
                        <span className="text-[10px] text-emerald-600 flex items-center gap-0.5">
                          <CreditCard className="w-3 h-3" /> 你已持有
                        </span>
                      )}
                    </div>
                  </div>
                  <button className="text-amber-500 hover:text-amber-600 transition-colors" title="設置提醒">
                    <Bell className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 text-center py-4">
              此日期暫無特別優惠
            </p>
          )}
        </div>
      )}

      {/* Close Button */}
      <Button 
        className="w-full bg-gray-800 hover:bg-gray-900"
        onClick={() => onOpenChange(false)}
      >
        關閉
      </Button>
    </div>
  );

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-emerald-600" /> 本月優惠日曆
            </DialogTitle>
          </DialogHeader>
          <CalendarContent />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="flex items-center gap-2 justify-center">
            <Calendar className="h-5 w-5 text-emerald-600" /> 本月優惠日曆
          </DrawerTitle>
        </DrawerHeader>
        <div className="px-4 pb-6">
          <CalendarContent />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

