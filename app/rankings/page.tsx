"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Trophy, ChevronRight, Info, AlertTriangle, 
  CreditCard, ExternalLink, Scale, Filter,
  Utensils, ShoppingCart, Plane, Globe, Smartphone, Wallet,
  ChevronDown, ChevronUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  getRankingsByCategory, 
  RANKING_CATEGORIES, 
  RankingCategory,
  RankingResult,
  formatCapAsSpendingLimit 
} from "@/lib/logic/rankings";
import { Navbar } from "@/components/navbar";
import { BottomNav } from "@/components/bottom-nav";
import { ShareButton } from "@/components/share-button";
import { useDataset } from "@/lib/admin/data-store";

// Helper to get base rate from card rules
function getBaseRate(card: { rules: Array<{ matchType: string; isForeignCurrency?: boolean; description: string; percentage: number }> }): number {
  const baseRule = card.rules.find(
    (r) => r.matchType === "base" && !r.isForeignCurrency && r.description.includes("基本")
  );
  return baseRule?.percentage || 0.4;
}

// Helper to extract extra rate source from rule description
function getExtraSource(description: string): string {
  let cleaned = description
    .replace(/\s*\d+(\.\d+)?%/g, "")
    .replace(/\s*\(\d+X\)/g, "")
    .replace(/\s*\(每月首\$[\d,]+\)/g, "")
    .replace(/\s*\(首\$[\d,]+\)/g, "")
    .trim();
  return cleaned || description;
}

const categoryIcons: Record<RankingCategory, React.ReactNode> = {
  dining: <Utensils className="h-5 w-5" />,
  online: <ShoppingCart className="h-5 w-5" />,
  hkd_online: <ShoppingCart className="h-5 w-5" />,
  foreign_online: <Globe className="h-5 w-5" />,
  supermarket: <ShoppingCart className="h-5 w-5" />,
  travel: <Plane className="h-5 w-5" />,
  overseas: <Plane className="h-5 w-5" />,
  mobile_payment: <Smartphone className="h-5 w-5" />,
  miles: <Plane className="h-5 w-5" />,
  all_round: <Wallet className="h-5 w-5" />,
};

function RankBadge({ rank }: { rank: number }) {
  const colors = {
    1: "bg-gradient-to-br from-amber-400 to-amber-600 text-white shadow-amber-200",
    2: "bg-gradient-to-br from-gray-300 to-gray-500 text-white shadow-gray-200",
    3: "bg-gradient-to-br from-orange-400 to-orange-600 text-white shadow-orange-200",
  };
  const baseClass = "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-md";
  
  if (rank <= 3) {
    return <span className={`${baseClass} ${colors[rank as 1 | 2 | 3]}`}>{rank}</span>;
  }
  return <span className={`${baseClass} bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300`}>{rank}</span>;
}

function CardRow({ result, rank, showFxFee = false, showMiles = false }: { result: RankingResult; rank: number; showFxFee?: boolean; showMiles?: boolean }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
      <RankBadge rank={rank} />
      
      {/* Card Image */}
      <div className={`w-10 h-7 rounded-md flex items-center justify-center overflow-hidden flex-shrink-0 ${!result.card.imageUrl ? (result.card.style?.bgColor || 'bg-gray-600') : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'}`}>
        {result.card.imageUrl ? (
          <img 
            src={result.card.imageUrl} 
            alt={result.card.name}
            className="max-h-full max-w-full object-contain"
          />
        ) : (
          <span className={`text-[8px] font-bold ${result.card.style?.textColor || 'text-white'}`}>
            {result.card.bank.slice(0, 3)}
          </span>
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-900 dark:text-white truncate">
            {result.card.name}
          </span>
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 flex flex-wrap gap-x-2 gap-y-0.5">
          {/* Show miles program if applicable */}
          {showMiles && result.milesProgram && (
            <span className="text-purple-600 dark:text-purple-400">{result.milesProgram}</span>
          )}
          {/* Show merchant restriction if applicable */}
          {result.rule.matchType === "merchant" && (
            <span className="text-orange-600 dark:text-orange-400">指定商戶</span>
          )}
          {/* Show country restriction if applicable */}
          {result.rule.description?.includes("指定國家") && (
            <span className="text-blue-600 dark:text-blue-400">指定國家</span>
          )}
          {result.capAsSpending && (
            <span>上限 ${result.capAsSpending.toLocaleString()}</span>
          )}
          {result.minSpend && (
            <span>單筆滿${result.minSpend}</span>
          )}
          {result.monthlyMinSpend && (
            <span>月簽${result.monthlyMinSpend.toLocaleString()}</span>
          )}
          {!showMiles && result.rule.matchType !== "merchant" && !result.rule.description?.includes("指定國家") && !result.capAsSpending && !result.minSpend && !result.monthlyMinSpend && (
            <span className="text-green-600 dark:text-green-400">無限制</span>
          )}
        </div>
      </div>
      
      <div className="text-right">
        {showMiles && result.dollarsPerMile ? (
          <>
            <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
              ${result.dollarsPerMile}/里
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              ≈ {result.percentage.toFixed(2)}% 回贈
            </div>
          </>
        ) : showFxFee && result.netPercentage !== undefined ? (
          <>
            <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
              {result.netPercentage.toFixed(2)}%
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {result.percentage}% - {result.foreignCurrencyFee === 0 ? '0%' : `${result.foreignCurrencyFee}%`}費
            </div>
          </>
        ) : (
          <>
            <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
              {result.percentage}%
            </div>
            {/* 顯示回贈組成 */}
            {(() => {
              const baseRate = getBaseRate(result.card);
              const extraRate = result.percentage - baseRate;
              if (extraRate > 0.01) {
                return (
                  <div className="text-[10px] text-gray-500 dark:text-gray-400">
                    {baseRate.toFixed(2)}% 基本 + <span className="text-blue-500">{extraRate.toFixed(2)}%</span> 額外
                  </div>
                );
              }
              return (
                <div className="text-xs text-gray-500 dark:text-gray-400">回贈</div>
              );
            })()}
          </>
        )}
      </div>
      
      <Link href={`/cards/${result.card.id}`}>
        <ChevronRight className="h-5 w-5 text-gray-400" />
      </Link>
    </div>
  );
}

function CategorySection({ categoryId, cards }: { categoryId: RankingCategory; cards: any[] }) {
  const category = RANKING_CATEGORIES.find(c => c.id === categoryId);
  if (!category) return null;
  
  const rankings = getRankingsByCategory(categoryId, 5, cards);
  const currentYear = 2025; // Fixed for SSR to avoid hydration mismatch
  
  if (rankings.length === 0) return null;
  
  // Generate share text
  const shareText = rankings.slice(0, 5).map((r, i) => 
    `${i + 1}. ${r.card.name} ${r.netPercentage !== undefined ? r.netPercentage.toFixed(2) : r.percentage}%`
  ).join('\n');
  
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
      <div className="p-4 border-b border-gray-100 dark:border-gray-800 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white">
              {categoryIcons[categoryId]}
            </div>
            <div>
              <h2 className="font-bold text-gray-900 dark:text-white">
                {category.icon} {category.name} Top 5
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {category.description}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <ShareButton
              title={`${currentYear} 最抵${category.name}信用卡 Top 5`}
              text={`${category.icon} ${category.name}信用卡排行榜\n\n${shareText}\n\n👉 完整排名：`}
              size="icon"
              variant="ghost"
            />
            <Link href={category.discoverUrl || `/blog/${category.slug}`}>
              <Button variant="ghost" size="sm" className="text-emerald-600 hover:text-emerald-700">
                詳情 <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <div className="divide-y divide-gray-100 dark:divide-gray-800">
        {rankings.map((result, index) => (
          <CardRow key={result.card.id} result={result} rank={index + 1} showFxFee={category.isForeignCurrency} showMiles={category.isMilesCard} />
        ))}
      </div>
    </div>
  );
}

export default function RankingsPage() {
  const [activeCategory, setActiveCategory] = useState<RankingCategory | "all">("all");
  const { cards } = useDataset();
  
  const filteredCategories = activeCategory === "all" 
    ? RANKING_CATEGORIES 
    : RANKING_CATEGORIES.filter(c => c.id === activeCategory);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <Navbar />
      
      <main className="container mx-auto px-4 py-6 pb-24 md:pb-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-sm font-medium mb-4">
            <Trophy className="h-4 w-4" />
            2025 年 12 月更新
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            🏆 信用卡回贈排行榜
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-4">
            根據官方條款自動計算，每日更新。
            <br className="hidden md:block" />
            助你快速搵到每個消費類別最抵嘅信用卡！
          </p>
          <ShareButton
            title="🏆 2025 信用卡回贈排行榜"
            text="信用卡回贈排行榜 - 食飯、網購、超市、旅遊、海外簽賬各類別最抵卡\n\n👉 即睇完整排名："
            variant="prominent"
            size="sm"
          />
        </div>
        
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <Button
            variant={activeCategory === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory("all")}
            className="rounded-full"
          >
            全部
          </Button>
          {RANKING_CATEGORIES.map(category => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(category.id)}
              className="rounded-full"
            >
              {category.icon} {category.name}
            </Button>
          ))}
        </div>
        
        {/* Info Banner */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 mb-6 flex items-start gap-3">
          <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-800 dark:text-blue-300">
            <strong>排名說明：</strong>排名以回贈百分比為準，未扣除外幣手續費。
            實際回贈可能因簽賬上限、最低消費等條件而異。
            <Link href="/terms" className="underline ml-1">詳細條款</Link>
          </div>
        </div>
        
        {/* Rankings Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredCategories.map(category => (
            <CategorySection key={category.id} categoryId={category.id} cards={cards} />
          ))}
        </div>
        
        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-2">想知道邊張卡最啱你？</h2>
            <p className="opacity-90 mb-4">用我哋嘅計算機，輸入消費金額即時計算回贈</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/">
                <Button variant="secondary" size="lg">
                  <CreditCard className="h-5 w-5 mr-2" />
                  回贈計算機
                </Button>
              </Link>
              <Link href="/cards/compare">
                <Button variant="outline" size="lg" className="bg-white/10 border-white/30 hover:bg-white/20">
                  <Scale className="h-5 w-5 mr-2" />
                  信用卡比較
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <BottomNav />
    </div>
  );
}

