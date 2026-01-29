"use client";

/**
 * 適用信用卡列表組件
 * 
 * 用於在攻略文章中顯示適用的信用卡，會自動從資料庫獲取信用卡封面圖。
 * 
 * 使用方式:
 * ```tsx
 * import { ApplicableCardList } from "@/components/applicable-card-list";
 * 
 * const cards = [
 *   { cardId: "amex-platinum", cardName: "美國運通白金卡" },
 *   { cardId: "amex-blue-cash", cardName: "Amex Blue Cash 信用卡" },
 * ];
 * 
 * <ApplicableCardList cards={cards} />
 * ```
 */

import Link from "next/link";
import Image from "next/image";
import { useDataset } from "@/lib/admin/data-store";
import { HK_CARDS } from "@/lib/data/cards";
import { CreditCard as CreditCardIcon } from "lucide-react";

export interface ApplicableCard {
  cardId: string;
  cardName: string;
  note?: string; // 額外說明
}

interface ApplicableCardListProps {
  cards: ApplicableCard[];
  title?: string;
  description?: string;
  warning?: string;
  columns?: 1 | 2 | 3;
}

// 單張卡片顯示組件
function CardItem({ card }: { card: ApplicableCard }) {
  const { cards: dbCards } = useDataset();
  
  // 優先從資料庫獲取（包含後台上傳的 imageUrl）
  const dbCard = dbCards.find(c => c.id === card.cardId);
  const cardData = dbCard || HK_CARDS.find(c => c.id === card.cardId);
  
  return (
    <Link 
      href={`/cards/${card.cardId}`} 
      className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
    >
      <div className={`relative w-12 h-8 rounded overflow-hidden shadow-sm flex-shrink-0 ${cardData?.style?.bgColor || 'bg-gradient-to-br from-gray-300 to-gray-400'}`}>
        {cardData?.imageUrl ? (
          <Image
            src={cardData.imageUrl}
            alt={card.cardName}
            fill
            className="object-cover group-hover:scale-105 transition-transform"
            sizes="48px"
            unoptimized
          />
        ) : (
          <div className={`w-full h-full flex items-center justify-center ${cardData?.style?.textColor || 'text-white'}`}>
            <span className="text-[10px] font-bold">{cardData?.bank?.slice(0, 2) || '卡'}</span>
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <span className="font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors block truncate">
          {card.cardName}
        </span>
        {card.note && (
          <span className="text-xs text-gray-500 dark:text-gray-400 block truncate">
            {card.note}
          </span>
        )}
      </div>
    </Link>
  );
}

export function ApplicableCardList({ 
  cards, 
  title = "適用信用卡",
  description,
  warning,
  columns = 2,
}: ApplicableCardListProps) {
  const gridClass = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  }[columns];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
        <CreditCardIcon className="h-5 w-5 text-blue-600" />
        {title}
      </h2>
      
      <div className="space-y-3">
        {description && (
          <p className="text-gray-600 dark:text-gray-400">
            {description}
          </p>
        )}
        
        <div className={`grid gap-3 ${gridClass}`}>
          {cards.map((card) => (
            <CardItem key={card.cardId} card={card} />
          ))}
        </div>
        
        {warning && (
          <p className="text-sm text-amber-600 dark:text-amber-400 mt-2">
            ⚠️ {warning}
          </p>
        )}
      </div>
    </div>
  );
}

// 導出單張卡片組件供其他頁面使用
export { CardItem as ApplicableCardItem };

