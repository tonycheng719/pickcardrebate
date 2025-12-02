"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Edit, ExternalLink, Image, Info } from "lucide-react";
import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { HK_CARDS } from "@/lib/data/cards";
import { createClient } from "@/lib/supabase/client";
import type { CreditCard } from "@/lib/types";

export default function AdminCardsPage() {
  // 使用 cards.ts 作為唯一來源
  const [dbImages, setDbImages] = useState<Record<string, string>>({});
  const [search, setSearch] = useState("");
  const [bankFilter, setBankFilter] = useState("所有銀行");

  // 從數據庫獲取圖片 URL
  useEffect(() => {
    async function fetchImages() {
      const supabase = createClient();
      const { data } = await supabase.from("cards").select("id, image_url");
      if (data) {
        const imageMap: Record<string, string> = {};
        data.forEach((card: any) => {
          if (card.image_url) {
            imageMap[card.id] = card.image_url;
          }
        });
        setDbImages(imageMap);
      }
    }
    fetchImages();
  }, []);

  // 合併 cards.ts 同數據庫圖片
  const cards: CreditCard[] = useMemo(() => {
    return HK_CARDS.map(card => ({
      ...card,
      imageUrl: dbImages[card.id] || card.imageUrl
    }));
  }, [dbImages]);

  const bankOptions = useMemo(() => ["所有銀行", ...Array.from(new Set(cards.map((card) => card.bank)))], [cards]);

  const filteredCards = useMemo(() => {
    return cards.filter((card) => {
      const matchesBank = bankFilter === "所有銀行" || card.bank === bankFilter;
      const matchesKeyword =
        card.name.toLowerCase().includes(search.toLowerCase()) ||
        card.bank.toLowerCase().includes(search.toLowerCase());
      return matchesBank && matchesKeyword;
    });
  }, [cards, search, bankFilter]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">信用卡管理</h1>
          <p className="text-gray-500 dark:text-gray-400">
            共 {cards.length} 張信用卡（資料來源：cards.ts）
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-3 py-2 rounded-lg">
          <Info className="h-4 w-4" />
          <span>卡片規則由 cards.ts 管理，此處只能編輯圖片</span>
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
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700 overflow-hidden shadow-sm">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 dark:bg-gray-900/50 text-gray-500 dark:text-gray-400 border-b dark:border-gray-700">
            <tr>
              <th className="px-6 py-4 font-medium">卡片名稱</th>
              <th className="px-6 py-4 font-medium">銀行</th>
              <th className="px-6 py-4 font-medium">標籤</th>
              <th className="px-6 py-4 font-medium">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y dark:divide-gray-700">
            {filteredCards.map((card) => (
              <tr key={card.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {card.imageUrl ? (
                        <div className="w-8 h-5 rounded overflow-hidden border border-gray-100 dark:border-gray-600 bg-white">
                            <img src={card.imageUrl} alt={card.name} className="w-full h-full object-contain" />
                        </div>
                    ) : (
                        <div className={`w-8 h-5 rounded ${card.style.bgColor}`}></div>
                    )}
                    <span className="font-medium text-gray-900 dark:text-white">{card.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{card.bank}</td>
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
                  <div className="flex gap-2">
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
    </div>
  );
}

