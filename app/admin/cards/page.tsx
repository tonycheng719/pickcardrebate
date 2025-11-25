"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Edit, ExternalLink, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import Link from "next/link";
import { useAdminDataStore } from "@/lib/admin/data-store";

export default function AdminCardsPage() {
  const { cards, removeCard } = useAdminDataStore();
  const [search, setSearch] = useState("");
  const [bankFilter, setBankFilter] = useState("所有銀行");

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
          <p className="text-gray-500 dark:text-gray-400">管理全站 {cards.length} 張信用卡資料與回贈規則。</p>
        </div>
        <Link href="/admin/cards/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" /> 新增信用卡
          </Button>
        </Link>
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
                    <div className={`w-8 h-5 rounded ${card.style.bgColor}`}></div>
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
                      href={`/admin/cards/new?id=${card.id}`}
                      className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 rounded transition-colors"
                      title="編輯"
                    >
                      <Edit className="h-4 w-4" />
                    </Link>
                    {card.applyUrl && (
                      <a href={card.applyUrl} target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 rounded transition-colors" title="查看連結">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                    <button
                      className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                      title="刪除"
                      onClick={() => {
                        if (confirm(`確定刪除 ${card.name}？`)) {
                          removeCard(card.id);
                        }
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
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

