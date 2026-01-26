"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { HK_CARDS } from "@/lib/data/cards";
import { useDataset } from "@/lib/admin/data-store";
import { CreditCard } from "@/lib/types";

export interface CardRecommendation {
  id: string; // 必須對應 cards.ts 中的卡片 ID
  rate: string;
  cap?: string;
  conditions?: string[];
  pros: string[];
  cons: string[];
  bestFor: string;
}

interface CardRecommendationBlockProps {
  cards: CardRecommendation[];
  title?: string;
  showRanking?: boolean;
}

// 根據 ID 獲取卡片資料（優先從資料庫，fallback 到靜態檔案）
function useCardData(cardId: string): CreditCard | undefined {
  const { cards: dbCards } = useDataset();
  // 優先從資料庫獲取（包含後台上傳的 imageUrl）
  const dbCard = dbCards.find(c => c.id === cardId);
  if (dbCard) return dbCard;
  // Fallback 到靜態資料
  return HK_CARDS.find(c => c.id === cardId);
}

// 單張卡片推薦組件
function CardRecommendationItem({ 
  card, 
  index, 
  showRanking = true 
}: { 
  card: CardRecommendation; 
  index: number;
  showRanking?: boolean;
}) {
  const cardData = useCardData(card.id);
  
  if (!cardData) {
    console.warn(`Card not found: ${card.id}`);
    return null;
  }

  const isTop = index === 0;
  
  return (
    <Card className={`overflow-hidden ${isTop ? "border-2 border-amber-400 ring-2 ring-amber-100" : ""}`}>
      <CardContent className="p-0">
        {/* 卡片封面區域 */}
        <div className="flex gap-4 p-4">
          {/* 信用卡圖片 */}
          <Link href={`/cards/${card.id}`} className="shrink-0 group">
            <div className={`relative w-24 h-16 md:w-32 md:h-20 rounded-lg overflow-hidden shadow-md transition-transform group-hover:scale-105 ${cardData.style?.bgColor || 'bg-gray-200'}`}>
              {cardData.imageUrl ? (
                <Image
                  src={cardData.imageUrl}
                  alt={cardData.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 96px, 128px"
                />
              ) : (
                <div className={`w-full h-full flex items-center justify-center ${cardData.style?.textColor || 'text-white'}`}>
                  <span className="text-xs font-bold text-center px-1">{cardData.bank}</span>
                </div>
              )}
              {/* 排名徽章 */}
              {showRanking && (
                <div className={`absolute -top-1 -left-1 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold shadow ${
                  index === 0 ? 'bg-amber-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-amber-700' : 'bg-gray-500'
                }`}>
                  {index + 1}
                </div>
              )}
            </div>
          </Link>
          
          {/* 卡片資訊 */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  {isTop && <Badge className="bg-amber-500 text-white shrink-0">🏆 推薦</Badge>}
                  <Link href={`/cards/${card.id}`} className="hover:text-blue-600 transition-colors">
                    <h3 className="font-bold text-base md:text-lg truncate">{cardData.name}</h3>
                  </Link>
                </div>
                <p className="text-sm text-gray-500">{cardData.bank}</p>
              </div>
              <div className="text-right shrink-0">
                <div className="text-xl md:text-2xl font-bold text-emerald-600">{card.rate}</div>
                {card.cap && <div className="text-xs text-gray-500">{card.cap}</div>}
              </div>
            </div>
            
            {/* 適合用戶 */}
            <div className="mt-2">
              <Badge variant="outline" className="text-xs">{card.bestFor}</Badge>
            </div>
          </div>
        </div>
        
        {/* 優缺點 */}
        <div className="grid md:grid-cols-2 gap-4 px-4 pb-4">
          <div>
            <h4 className="font-semibold text-sm text-green-600 mb-2 flex items-center gap-1">
              <CheckCircle2 className="h-4 w-4" /> 優點
            </h4>
            <ul className="space-y-1 text-sm">
              {card.pros.map((pro, i) => (
                <li key={i} className="text-gray-600 dark:text-gray-400">• {pro}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm text-red-600 mb-2 flex items-center gap-1">
              <XCircle className="h-4 w-4" /> 缺點
            </h4>
            <ul className="space-y-1 text-sm">
              {card.cons.map((con, i) => (
                <li key={i} className="text-gray-600 dark:text-gray-400">• {con}</li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* 操作按鈕 */}
        <div className="border-t bg-gray-50 dark:bg-gray-800/50 px-4 py-3 flex items-center justify-between">
          <Link href={`/cards/${card.id}`}>
            <Button variant="outline" size="sm" className="gap-1">
              查看詳情 <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          {cardData.applyUrl && (
            <a href={cardData.applyUrl} target="_blank" rel="noopener noreferrer">
              <Button size="sm" className="gap-1 bg-emerald-600 hover:bg-emerald-700">
                立即申請 <ExternalLink className="h-3 w-3" />
              </Button>
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// 快速比較表格 - 單行組件
function QuickComparisonRow({ card, index }: { card: CardRecommendation; index: number }) {
  const cardData = useCardData(card.id);
  if (!cardData) return null;
  
  return (
    <tr className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50">
      <td className="py-3 px-1">
        <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-white text-xs font-bold ${
          index === 0 ? 'bg-amber-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-amber-700' : 'bg-gray-500'
        }`}>
          {index + 1}
        </span>
      </td>
      <td className="py-3 px-1">
        <Link href={`/cards/${card.id}`} className="flex items-center gap-2 hover:text-blue-600 transition-colors group">
          {/* 小卡片圖 */}
          <div className={`relative w-10 h-6 rounded overflow-hidden shadow-sm ${cardData.style?.bgColor || 'bg-gray-200'}`}>
            {cardData.imageUrl ? (
              <Image
                src={cardData.imageUrl}
                alt={cardData.name}
                fill
                className="object-cover"
                sizes="40px"
              />
            ) : (
              <div className={`w-full h-full ${cardData.style?.textColor || 'text-white'}`} />
            )}
          </div>
          <span className="font-medium group-hover:underline">{cardData.name}</span>
        </Link>
      </td>
      <td className="py-3 px-1 text-emerald-600 font-bold">{card.rate}</td>
      <td className="py-3 px-1 text-gray-500 hidden sm:table-cell">{card.cap || '無上限'}</td>
      <td className="py-3 px-1 text-gray-500 hidden md:table-cell">{card.bestFor}</td>
    </tr>
  );
}

// 快速比較表格
export function QuickComparisonTable({ cards }: { cards: CardRecommendation[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b dark:border-gray-700">
            <th className="text-left py-2 px-1">排名</th>
            <th className="text-left py-2 px-1">信用卡</th>
            <th className="text-left py-2 px-1">回贈</th>
            <th className="text-left py-2 px-1 hidden sm:table-cell">上限</th>
            <th className="text-left py-2 px-1 hidden md:table-cell">適合</th>
          </tr>
        </thead>
        <tbody>
          {cards.slice(0, 5).map((card, i) => (
            <QuickComparisonRow key={card.id} card={card} index={i} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

// 主組件：信用卡推薦區塊
export function CardRecommendationBlock({ 
  cards, 
  title = "信用卡詳細比較",
  showRanking = true 
}: CardRecommendationBlockProps) {
  return (
    <div className="space-y-4">
      {title && (
        <h2 className="text-xl font-bold flex items-center gap-2">
          <span className="text-2xl">💳</span>
          {title}
        </h2>
      )}
      
      {cards.map((card, index) => (
        <CardRecommendationItem 
          key={card.id} 
          card={card} 
          index={index}
          showRanking={showRanking}
        />
      ))}
    </div>
  );
}

export default CardRecommendationBlock;

