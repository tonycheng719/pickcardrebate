"use client";

import Link from "next/link";
import Image from "next/image";
import { CreditCard } from "lucide-react";
import { HK_CARDS } from "@/lib/data/cards";
import { useDataset } from "@/lib/admin/data-store";

// 帶圖片嘅卡片連結組件（用於文章內嘅比較表、推薦列表等）
interface CardLinkWithImageProps {
  id: string;
  name?: string; // 可選，如果唔提供會用 DB/HK_CARDS 嘅名稱
  rate?: string; // 可選，顯示回贈率
  className?: string;
  showRate?: boolean;
  size?: "sm" | "md" | "lg";
}

export function CardLinkWithImage({ 
  id, 
  name, 
  rate, 
  className = "",
  showRate = true,
  size = "sm"
}: CardLinkWithImageProps) {
  const { cards: dbCards } = useDataset();
  const card = dbCards.find(c => c.id === id) || HK_CARDS.find(c => c.id === id);
  
  if (!card) return null;
  
  const displayName = name || card.name;
  
  const sizeClasses = {
    sm: "w-8 h-5",
    md: "w-12 h-8",
    lg: "w-16 h-10"
  };
  
  return (
    <Link 
      href={`/cards/${id}`}
      className={`inline-flex items-center gap-2 hover:opacity-80 transition-opacity ${className}`}
    >
      <div className={`${sizeClasses[size]} flex-shrink-0 rounded overflow-hidden ${card.imageUrl ? 'bg-white' : (card.style?.bgColor || 'bg-gray-200')}`}>
        {card.imageUrl ? (
          <Image
            src={card.imageUrl}
            alt={displayName}
            width={size === "lg" ? 64 : size === "md" ? 48 : 32}
            height={size === "lg" ? 40 : size === "md" ? 32 : 20}
            className="w-full h-full object-contain"
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <CreditCard className={`${size === "sm" ? "h-3 w-3" : "h-4 w-4"} ${card.style?.textColor || 'text-gray-400'}`} />
          </div>
        )}
      </div>
      <span className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
        {displayName}
      </span>
      {showRate && rate && (
        <span className="font-bold text-green-600 dark:text-green-400">{rate}</span>
      )}
    </Link>
  );
}

// 用於比較表格的簡化版本（只顯示圖片+名稱）
interface CardTableCellProps {
  id: string;
  className?: string;
}

export function CardTableCell({ id, className = "" }: CardTableCellProps) {
  const { cards: dbCards } = useDataset();
  const card = dbCards.find(c => c.id === id) || HK_CARDS.find(c => c.id === id);
  
  if (!card) return null;
  
  return (
    <Link 
      href={`/cards/${id}`}
      className={`flex items-center gap-2 hover:opacity-80 transition-opacity ${className}`}
    >
      <div className={`w-10 h-6 flex-shrink-0 rounded overflow-hidden ${card.imageUrl ? 'bg-white border border-gray-200' : (card.style?.bgColor || 'bg-gray-200')}`}>
        {card.imageUrl ? (
          <Image
            src={card.imageUrl}
            alt={card.name}
            width={40}
            height={24}
            className="w-full h-full object-contain"
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className={`text-[8px] font-bold ${card.style?.textColor || 'text-gray-400'}`}>
              {card.bank.slice(0, 3)}
            </span>
          </div>
        )}
      </div>
      <span className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium truncate">
        {card.name}
      </span>
    </Link>
  );
}

// 用於列表的帶圖片卡片標籤（帶背景色）
interface CardBadgeWithImageProps {
  id: string;
  rate?: string;
  className?: string;
}

export function CardBadgeWithImage({ id, rate, className = "" }: CardBadgeWithImageProps) {
  const { cards: dbCards } = useDataset();
  const card = dbCards.find(c => c.id === id) || HK_CARDS.find(c => c.id === id);
  
  if (!card) return null;
  
  return (
    <Link 
      href={`/cards/${id}`}
      className={`inline-flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-sm transition-all ${className}`}
    >
      <div className={`w-8 h-5 flex-shrink-0 rounded overflow-hidden ${card.imageUrl ? 'bg-white' : (card.style?.bgColor || 'bg-gray-200')}`}>
        {card.imageUrl ? (
          <Image
            src={card.imageUrl}
            alt={card.name}
            width={32}
            height={20}
            className="w-full h-full object-contain"
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <CreditCard className="h-3 w-3 text-gray-400" />
          </div>
        )}
      </div>
      <span className="text-sm text-gray-900 dark:text-white font-medium">
        {card.name.replace(/信用卡|Card/g, '').trim()}
      </span>
      {rate && (
        <span className="text-sm font-bold text-green-600 dark:text-green-400">{rate}</span>
      )}
    </Link>
  );
}

