"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Edit, ExternalLink, Image, Info, Star, ArrowUp, ArrowDown, GripVertical, Eye, TrendingUp, EyeOff } from "lucide-react";
import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { HK_CARDS } from "@/lib/data/cards";
import { createClient } from "@/lib/supabase/client";
import type { CreditCard } from "@/lib/types";
import { toast } from "sonner";

interface CardWithPriority extends CreditCard {
  priority: number;
  featured: boolean;
  dbHidden?: boolean; // 數據庫中的隱藏狀態
}

interface ViewStat {
  page_id: string;
  view_count: number;
}

export default function AdminCardsPage() {
  // 使用 cards.ts 作為唯一來源
  const [dbData, setDbData] = useState<Record<string, { image_url?: string; priority?: number; featured?: boolean; hidden?: boolean }>>({});
  const [viewStats, setViewStats] = useState<Record<string, number>>({});
  const [search, setSearch] = useState("");
  const [bankFilter, setBankFilter] = useState("所有銀行");
  const [sortMode, setSortMode] = useState<"default" | "priority" | "views">("default");
  const [showHidden, setShowHidden] = useState<"all" | "visible" | "hidden">("all");

  // 從數據庫獲取圖片 URL 和優先級
  useEffect(() => {
    async function fetchData() {
      const supabase = createClient();
      const { data } = await supabase.from("cards").select("id, image_url, priority, featured, hidden");
      if (data) {
        const dataMap: Record<string, { image_url?: string; priority?: number; featured?: boolean; hidden?: boolean }> = {};
        data.forEach((card: any) => {
          dataMap[card.id] = {
            image_url: card.image_url,
            priority: card.priority ?? 100,
            featured: card.featured ?? false,
            hidden: card.hidden ?? false
          };
        });
        setDbData(dataMap);
      }
    }
    fetchData();
  }, []);

  // 獲取瀏覽次數
  useEffect(() => {
    async function fetchViewStats() {
      try {
        const res = await fetch('/api/stats/pageview?pageType=card');
        if (res.ok) {
          const data = await res.json();
          const stats: Record<string, number> = {};
          (data.stats || []).forEach((s: ViewStat) => {
            stats[s.page_id] = s.view_count;
          });
          setViewStats(stats);
        }
      } catch (e) {
        console.error("Failed to fetch view stats:", e);
      }
    }
    fetchViewStats();
  }, []);

  // 合併 cards.ts 同數據庫圖片/優先級/隱藏狀態
  const cards: CardWithPriority[] = useMemo(() => {
    return HK_CARDS.map(card => ({
      ...card,
      imageUrl: dbData[card.id]?.image_url || card.imageUrl,
      priority: dbData[card.id]?.priority ?? 100,
      featured: dbData[card.id]?.featured ?? false,
      // 數據庫 hidden 覆蓋 cards.ts 的 hidden
      hidden: dbData[card.id]?.hidden ?? card.hidden ?? false,
      dbHidden: dbData[card.id]?.hidden
    }));
  }, [dbData]);

  const bankOptions = useMemo(() => ["所有銀行", ...Array.from(new Set(cards.map((card) => card.bank)))], [cards]);

  const filteredCards = useMemo(() => {
    let result = cards.filter((card) => {
      const matchesBank = bankFilter === "所有銀行" || card.bank === bankFilter;
      const matchesKeyword =
        card.name.toLowerCase().includes(search.toLowerCase()) ||
        card.bank.toLowerCase().includes(search.toLowerCase());
      
      // 隱藏狀態篩選
      const matchesVisibility = 
        showHidden === "all" ? true :
        showHidden === "visible" ? !card.hidden :
        card.hidden;
      
      return matchesBank && matchesKeyword && matchesVisibility;
    });

    // Sort by priority if in priority mode
    if (sortMode === "priority") {
      result = [...result].sort((a, b) => {
        // Featured cards first
        if (a.featured !== b.featured) return a.featured ? -1 : 1;
        // Then by priority (lower = higher priority)
        return a.priority - b.priority;
      });
    } else if (sortMode === "views") {
      // Sort by view count (highest first)
      result = [...result].sort((a, b) => {
        const viewsA = viewStats[a.id] || 0;
        const viewsB = viewStats[b.id] || 0;
        return viewsB - viewsA;
      });
    }

    return result;
  }, [cards, search, bankFilter, sortMode, viewStats, showHidden]);

  // 統計隱藏卡片數量
  const hiddenCount = cards.filter(c => c.hidden).length;
  const visibleCount = cards.length - hiddenCount;

  const totalViews = Object.values(viewStats).reduce((a, b) => a + b, 0);

  // Update card priority
  const updatePriority = async (cardId: string, newPriority: number) => {
    const supabase = createClient();
    const { error } = await supabase
      .from("cards")
      .update({ priority: newPriority })
      .eq("id", cardId);

    if (error) {
      // If card doesn't exist in DB, insert it
      if (error.code === "PGRST116") {
        const card = HK_CARDS.find(c => c.id === cardId);
        if (card) {
          await supabase.from("cards").insert({
            id: cardId,
            name: card.name,
            bank: card.bank,
            priority: newPriority
          });
        }
      } else {
        toast.error("更新失敗");
        return;
      }
    }

    setDbData(prev => ({
      ...prev,
      [cardId]: { ...prev[cardId], priority: newPriority }
    }));
    toast.success("優先級已更新");
  };

  // Toggle featured status
  const toggleFeatured = async (cardId: string, currentFeatured: boolean) => {
    const supabase = createClient();
    const { error } = await supabase
      .from("cards")
      .update({ featured: !currentFeatured })
      .eq("id", cardId);

    if (error) {
      // If card doesn't exist in DB, insert it
      const card = HK_CARDS.find(c => c.id === cardId);
      if (card) {
        await supabase.from("cards").insert({
          id: cardId,
          name: card.name,
          bank: card.bank,
          featured: !currentFeatured
        });
      }
    }

    setDbData(prev => ({
      ...prev,
      [cardId]: { ...prev[cardId], featured: !currentFeatured }
    }));
    toast.success(currentFeatured ? "已取消推薦" : "已設為推薦");
  };

  // Toggle hidden status
  const toggleHidden = async (cardId: string, currentHidden: boolean) => {
    const supabase = createClient();
    const { error } = await supabase
      .from("cards")
      .update({ hidden: !currentHidden })
      .eq("id", cardId);

    if (error) {
      // If card doesn't exist in DB, insert it
      const card = HK_CARDS.find(c => c.id === cardId);
      if (card) {
        await supabase.from("cards").insert({
          id: cardId,
          name: card.name,
          bank: card.bank,
          hidden: !currentHidden
        });
      }
    }

    setDbData(prev => ({
      ...prev,
      [cardId]: { ...prev[cardId], hidden: !currentHidden }
    }));
    toast.success(currentHidden ? "卡片已顯示" : "卡片已隱藏");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">信用卡管理</h1>
          <p className="text-gray-500 dark:text-gray-400">
            共 {cards.length} 張信用卡（顯示 {visibleCount} / 隱藏 {hiddenCount}），總瀏覽 {totalViews.toLocaleString()} 次
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-3 py-2 rounded-lg">
          <Info className="h-4 w-4" />
          <span>卡片規則由 cards.ts 管理，此處可編輯圖片及顯示/隱藏</span>
        </div>
      </div>

      <div className="flex gap-4 bg-white dark:bg-gray-800 p-4 rounded-xl border dark:border-gray-700">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="搜尋信用卡名稱或銀行..." 
            className="pl-9 dark:bg-gray-700 dark:border-gray-600"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className="h-10 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 text-sm"
          value={bankFilter}
          onChange={(e) => setBankFilter(e.target.value)}
        >
          {bankOptions.map((bank) => (
            <option key={bank} value={bank}>
              {bank}
            </option>
          ))}
        </select>
        <Button
          variant={sortMode === "priority" ? "default" : "outline"}
          onClick={() => setSortMode(sortMode === "priority" ? "default" : "priority")}
          className="whitespace-nowrap"
        >
          <GripVertical className="h-4 w-4 mr-2" />
          {sortMode === "priority" ? "優先級排序中" : "按優先級排序"}
        </Button>
        <Button
          variant={sortMode === "views" ? "default" : "outline"}
          onClick={() => setSortMode(sortMode === "views" ? "default" : "views")}
          className="whitespace-nowrap"
        >
          <Eye className="h-4 w-4 mr-2" />
          {sortMode === "views" ? "瀏覽排序中" : "按瀏覽排序"}
        </Button>
        <select
          className="h-10 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 text-sm"
          value={showHidden}
          onChange={(e) => setShowHidden(e.target.value as "all" | "visible" | "hidden")}
        >
          <option value="all">全部卡片 ({cards.length})</option>
          <option value="visible">顯示中 ({visibleCount})</option>
          <option value="hidden">已隱藏 ({hiddenCount})</option>
        </select>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700 overflow-hidden shadow-sm">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 dark:bg-gray-900/50 text-gray-500 dark:text-gray-400 border-b dark:border-gray-700">
            <tr>
              <th className="px-6 py-4 font-medium">卡片名稱</th>
              <th className="px-6 py-4 font-medium">銀行</th>
              <th className="px-6 py-4 font-medium">狀態</th>
              <th className="px-6 py-4 font-medium">標籤</th>
              <th className="px-6 py-4 font-medium">
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  瀏覽
                </div>
              </th>
              <th className="px-6 py-4 font-medium">優先級</th>
              <th className="px-6 py-4 font-medium">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y dark:divide-gray-700">
            {filteredCards.map((card, index) => (
              <tr key={card.id} className={`hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${card.featured ? 'bg-amber-50 dark:bg-amber-900/10' : ''} ${card.hidden ? 'opacity-60' : ''}`}>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {card.featured && (
                      <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                    )}
                    {card.hidden && (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    )}
                    {card.imageUrl ? (
                        <div className="w-8 h-5 rounded overflow-hidden border border-gray-100 dark:border-gray-600 bg-white">
                            <img src={card.imageUrl} alt={card.name} className="w-full h-full object-contain" />
                        </div>
                    ) : (
                        <div className={`w-8 h-5 rounded ${card.style.bgColor}`}></div>
                    )}
                    <span className={`font-medium ${card.hidden ? 'text-gray-400 dark:text-gray-500' : 'text-gray-900 dark:text-white'}`}>{card.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{card.bank}</td>
                <td className="px-6 py-4">
                  {card.hidden ? (
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-full text-xs">
                      已隱藏
                    </span>
                  ) : (
                    <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-xs">
                      顯示中
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {card.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded-full text-xs text-gray-600 dark:text-gray-300">
                        {tag}
                      </span>
                    ))}
                    {card.tags.length > 2 && <span className="text-xs text-gray-400">+{card.tags.length - 2}</span>}
                  </div>
                </td>
                <td className="px-6 py-4">
                  {(() => {
                    const views = viewStats[card.id] || 0;
                    const isTop = views > 0 && Object.values(viewStats).filter(v => v > views).length < 3;
                    return (
                      <div className="flex items-center gap-1">
                        {isTop && <TrendingUp className="h-3 w-3 text-green-500" />}
                        <span className={isTop ? 'text-green-600 dark:text-green-400 font-medium' : 'text-gray-500'}>
                          {views.toLocaleString()}
                        </span>
                      </div>
                    );
                  })()}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={card.priority}
                      onChange={(e) => updatePriority(card.id, parseInt(e.target.value) || 100)}
                      className="w-20 h-8 text-center text-sm"
                      min={1}
                      max={999}
                    />
                    <div className="flex flex-col">
                      <button
                        onClick={() => updatePriority(card.id, Math.max(1, card.priority - 10))}
                        className="p-0.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                        title="提高優先級"
                      >
                        <ArrowUp className="h-3 w-3 text-gray-400" />
                      </button>
                      <button
                        onClick={() => updatePriority(card.id, Math.min(999, card.priority + 10))}
                        className="p-0.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                        title="降低優先級"
                      >
                        <ArrowDown className="h-3 w-3 text-gray-400" />
                      </button>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleHidden(card.id, card.hidden || false)}
                      className={`p-2 rounded transition-colors ${
                        card.hidden 
                          ? 'bg-gray-200 text-gray-600 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-400' 
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400'
                      }`}
                      title={card.hidden ? "顯示卡片" : "隱藏卡片"}
                    >
                      {card.hidden ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                    </button>
                    <button
                      onClick={() => toggleFeatured(card.id, card.featured)}
                      className={`p-2 rounded transition-colors ${
                        card.featured 
                          ? 'bg-amber-100 text-amber-600 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-400' 
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400'
                      }`}
                      title={card.featured ? "取消推薦" : "設為推薦"}
                    >
                      <Star className={`h-4 w-4 ${card.featured ? 'fill-current' : ''}`} />
                    </button>
                    <Link
                      href={`/admin/cards/edit?id=${card.id}`}
                      className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 rounded transition-colors"
                      title="編輯圖片"
                    >
                      <Image className="h-4 w-4" />
                    </Link>
                    {card.applyUrl && (
                      <a href={card.applyUrl} target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 rounded transition-colors" title="查看連結">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
        <p className="font-medium mb-2">💡 功能說明：</p>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>隱藏卡片</strong>：點擊 👁️ 可隱藏/顯示卡片，隱藏後前台不會顯示該卡片</li>
          <li><strong>優先級</strong>：數字越小，排序越前（1 = 最高優先），預設值為 100</li>
          <li><strong>推薦</strong>：點擊 ⭐ 可將卡片設為「推薦」，推薦卡片會優先顯示</li>
          <li>優先級和隱藏狀態會影響前台 /cards 頁面的排序和顯示</li>
          <li>⚠️ 注意：<code className="px-1 bg-gray-200 dark:bg-gray-700 rounded">cards.ts</code> 中的 <code className="px-1 bg-gray-200 dark:bg-gray-700 rounded">hidden: true</code> 會被數據庫設定覆蓋</li>
        </ul>
      </div>
    </div>
  );
}

