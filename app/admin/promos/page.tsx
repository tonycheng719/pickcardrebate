"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useDataset } from "@/lib/admin/data-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, CalendarIcon, Image as ImageIcon } from "lucide-react";

export default function AdminPromosPage() {
  const { promos } = useDataset();
  const [keyword, setKeyword] = useState("");
  const filteredPromos = useMemo(
    () =>
      promos.filter(
        (promo) =>
          promo.title.toLowerCase().includes(keyword.toLowerCase()) ||
          promo.merchant.toLowerCase().includes(keyword.toLowerCase())
      ),
    [keyword, promos]
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">優惠管理</h1>
          <p className="text-gray-500 dark:text-gray-400">管理 {promos.length} 個已發佈的優惠活動。</p>
        </div>
        <Link href="/admin/promos/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" /> 發佈新優惠
          </Button>
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border dark:border-gray-700 flex gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="搜尋優惠標題或商戶..."
            className="pl-9 dark:bg-gray-700 dark:border-gray-600"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700 overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 dark:bg-gray-900/50 text-gray-500 dark:text-gray-400 border-b dark:border-gray-700">
            <tr>
              <th className="px-6 py-4 font-medium">圖片</th>
              <th className="px-6 py-4 font-medium">標題</th>
              <th className="px-6 py-4 font-medium">商戶</th>
              <th className="px-6 py-4 font-medium">標籤</th>
              <th className="px-6 py-4 font-medium">到期日</th>
            </tr>
          </thead>
          <tbody className="divide-y dark:divide-gray-700">
            {filteredPromos.map((promo) => (
              <tr key={promo.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <td className="px-6 py-4">
                  {promo.imageUrl ? (
                    <div className="w-12 h-8 rounded overflow-hidden bg-gray-100">
                      <img src={promo.imageUrl} alt="" className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="w-12 h-8 rounded bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-400">
                      <ImageIcon className="h-4 w-4" />
                    </div>
                  )}
                </td>
                <td className="px-6 py-4">
                  <p className="font-medium text-gray-900 dark:text-white">{promo.title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">{promo.description}</p>
                </td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{promo.merchant}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2 flex-wrap">
                    {promo.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded-full text-xs text-gray-600 dark:text-gray-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-500 dark:text-gray-300 flex items-center gap-1">
                  <CalendarIcon className="h-4 w-4" />
                  {promo.expiryDate}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
