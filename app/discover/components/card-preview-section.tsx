"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronRight, CreditCard, Star, TrendingUp } from "lucide-react";
import { HK_CARDS } from "@/lib/data/cards";

// 卡片預覽組件
interface CardPreviewProps {
  id: string;
  highlight?: string;
}

export function CardPreview({ id, highlight }: CardPreviewProps) {
  const card = HK_CARDS.find(c => c.id === id);
  
  if (!card) return null;
  
  // 計算最高回贈率
  const maxRate = card.rules.reduce((max, rule) => {
    if (rule.percentage && rule.percentage > max) return rule.percentage;
    return max;
  }, 0);
  
  return (
    <Link 
      href={`/cards/${id}`}
      className="group block bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600 transition-all"
    >
      <div className="flex items-start gap-3">
        {/* Card Image */}
        <div className="relative w-16 h-10 flex-shrink-0 rounded-md overflow-hidden bg-gray-100 dark:bg-gray-700">
          {card.imageUrl ? (
            <Image
              src={card.imageUrl}
              alt={card.name}
              fill
              className="object-cover"
              sizes="64px"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <CreditCard className="h-6 w-6 text-gray-400" />
            </div>
          )}
        </div>
        
        {/* Card Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="font-bold text-gray-900 dark:text-white text-sm truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {card.name}
            </h4>
            {highlight && (
              <span className="flex-shrink-0 inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                {highlight}
              </span>
            )}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{card.bank}</p>
          <div className="flex items-center gap-3 mt-1.5">
            {maxRate > 0 && (
              <span className="inline-flex items-center text-xs font-bold text-green-600 dark:text-green-400">
                <TrendingUp className="h-3 w-3 mr-0.5" />
                最高 {maxRate}%
              </span>
            )}
            <span className="text-xs text-gray-500">
              {card.annualFee === 0 || card.annualFee === undefined ? "免年費" : `年費 $${card.annualFee.toLocaleString()}`}
            </span>
          </div>
        </div>
        
        {/* Arrow */}
        <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
      </div>
    </Link>
  );
}

// 推薦卡片區塊組件
interface CardPreviewSectionProps {
  title?: string;
  subtitle?: string;
  cards: Array<{
    id: string;
    highlight?: string;
  }>;
  columns?: 2 | 3;
}

export function CardPreviewSection({ 
  title = "📌 相關信用卡推薦", 
  subtitle,
  cards,
  columns = 2 
}: CardPreviewSectionProps) {
  // Filter out cards that don't exist
  if (!cards || cards.length === 0) return null;
  const validCards = cards.filter(card => HK_CARDS.find(c => c.id === card.id));
  
  if (validCards.length === 0) return null;
  
  return (
    <div className="not-prose my-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-5 border border-blue-100 dark:border-blue-800">
      <div className="flex items-center gap-2 mb-2">
        <Star className="h-5 w-5 text-amber-500" />
        <h3 className="font-bold text-gray-900 dark:text-white">{title}</h3>
      </div>
      {subtitle && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{subtitle}</p>
      )}
      <div className={`grid gap-3 ${columns === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
        {validCards.map((card) => (
          <CardPreview key={card.id} id={card.id} highlight={card.highlight} />
        ))}
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center">
        點擊查看詳細資訊及最新優惠
      </p>
    </div>
  );
}

// 預設推薦卡片配置
export const RECOMMENDED_CARDS = {
  overseas: [
    { id: "sc-cathay", highlight: "儲里數" },
    { id: "citi-premiermiles", highlight: "海外簽賬" },
    { id: "sc-simply-cash", highlight: "2% 海外" },
    { id: "hangseng-travel-plus", highlight: "旅遊回贈" },
  ],
  cashback: [
    { id: "sc-simply-cash", highlight: "1.5% 無上限" },
    { id: "earnmore", highlight: "2% 無上限" },
    { id: "hangseng-mmpower", highlight: "網購 5%" },
    { id: "hsbc-red", highlight: "網購 4%" },
  ],
  dining: [
    { id: "citi-cashback", highlight: "餐飲 2%" },
    { id: "hsbc-vs", highlight: "餐飲 3.6%" },
    { id: "sc-simply-cash", highlight: "1.5% 無上限" },
  ],
  supermarket: [
    { id: "dbs-compass", highlight: "超市 8%" },
    { id: "hangseng-enjoy", highlight: "惠康 92 折" },
    { id: "hsbc-red", highlight: "超市 2%" },
  ],
  online: [
    { id: "hangseng-mmpower", highlight: "網購 5%" },
    { id: "hsbc-red", highlight: "網購 4%" },
    { id: "sc-simply-cash", highlight: "1.5% 無上限" },
  ],
  miles: [
    { id: "sc-cathay", highlight: "$4/里" },
    { id: "citi-premiermiles", highlight: "$3/里海外" },
    { id: "hsbc-everymile", highlight: "$5/里" },
    { id: "dbs-black", highlight: "$6/里" },
  ],
  bills: [
    { id: "sc-simply-cash", highlight: "繳費首選" },
    { id: "hsbc-red", highlight: "網上繳費 4%" },
    { id: "hangseng-mmpower", highlight: "網上繳費 5%" },
    { id: "earnmore", highlight: "Apple Pay 2%" },
  ],
  noFee: [
    { id: "sc-simply-cash", highlight: "永久免年費" },
    { id: "earnmore", highlight: "永久免年費" },
    { id: "hsbc-red", highlight: "免年費" },
    { id: "hangseng-enjoy", highlight: "免年費" },
  ],
  debitCard: [
    { id: "sc-simply-cash", highlight: "信用卡替代" },
    { id: "earnmore", highlight: "免年費" },
  ],
};

