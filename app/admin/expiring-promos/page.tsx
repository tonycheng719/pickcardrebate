"use client";

import { useEffect, useState } from "react";
import { HK_CARDS } from "@/lib/data/cards";
import { CreditCard } from "@/lib/types";
import Link from "next/link";
import { AlertTriangle, Clock, CheckCircle, Calendar, ExternalLink } from "lucide-react";

interface PromoCard extends CreditCard {
  daysUntilExpiry: number;
  status: "expired" | "expiring_soon" | "active";
}

export default function ExpiringPromosPage() {
  const [promoCards, setPromoCards] = useState<PromoCard[]>([]);
  const [filter, setFilter] = useState<"all" | "expired" | "expiring_soon" | "active">("all");

  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const cardsWithPromo = HK_CARDS
      .filter((card) => card.promoEndDate)
      .map((card) => {
        const endDate = new Date(card.promoEndDate!);
        endDate.setHours(0, 0, 0, 0);
        const diffTime = endDate.getTime() - today.getTime();
        const daysUntilExpiry = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        let status: "expired" | "expiring_soon" | "active";
        if (daysUntilExpiry < 0) {
          status = "expired";
        } else if (daysUntilExpiry <= 30) {
          status = "expiring_soon";
        } else {
          status = "active";
        }

        return {
          ...card,
          daysUntilExpiry,
          status,
        };
      })
      .sort((a, b) => a.daysUntilExpiry - b.daysUntilExpiry);

    setPromoCards(cardsWithPromo);
  }, []);

  const filteredCards = promoCards.filter((card) => {
    if (filter === "all") return true;
    return card.status === filter;
  });

  const expiredCount = promoCards.filter((c) => c.status === "expired").length;
  const expiringSoonCount = promoCards.filter((c) => c.status === "expiring_soon").length;
  const activeCount = promoCards.filter((c) => c.status === "active").length;

  const getStatusBadge = (status: string, days: number) => {
    switch (status) {
      case "expired":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
            <AlertTriangle className="w-3 h-3" />
            已過期 {Math.abs(days)} 天
          </span>
        );
      case "expiring_soon":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
            <Clock className="w-3 h-3" />
            {days} 天後到期
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
            <CheckCircle className="w-3 h-3" />
            {days} 天後到期
          </span>
        );
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("zh-HK", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          📅 推廣到期提示
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          追蹤信用卡推廣優惠嘅到期日，方便更新 T&C
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div
          className={`p-4 rounded-xl cursor-pointer transition-all ${
            filter === "all"
              ? "bg-blue-100 dark:bg-blue-900/30 ring-2 ring-blue-500"
              : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
          onClick={() => setFilter("all")}
        >
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            {promoCards.length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">全部推廣</div>
        </div>

        <div
          className={`p-4 rounded-xl cursor-pointer transition-all ${
            filter === "expired"
              ? "bg-red-100 dark:bg-red-900/30 ring-2 ring-red-500"
              : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
          onClick={() => setFilter("expired")}
        >
          <div className="text-3xl font-bold text-red-600 dark:text-red-400">
            {expiredCount}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">已過期 ⚠️</div>
        </div>

        <div
          className={`p-4 rounded-xl cursor-pointer transition-all ${
            filter === "expiring_soon"
              ? "bg-yellow-100 dark:bg-yellow-900/30 ring-2 ring-yellow-500"
              : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
          onClick={() => setFilter("expiring_soon")}
        >
          <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
            {expiringSoonCount}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">30天內到期 ⏰</div>
        </div>

        <div
          className={`p-4 rounded-xl cursor-pointer transition-all ${
            filter === "active"
              ? "bg-green-100 dark:bg-green-900/30 ring-2 ring-green-500"
              : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
          onClick={() => setFilter("active")}
        >
          <div className="text-3xl font-bold text-green-600 dark:text-green-400">
            {activeCount}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">正常進行 ✅</div>
        </div>
      </div>

      {/* Promo Cards List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  狀態
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  信用卡
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  推廣名稱
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  到期日
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredCards.map((card) => (
                <tr
                  key={card.id}
                  className={`hover:bg-gray-50 dark:hover:bg-gray-700/50 ${
                    card.status === "expired"
                      ? "bg-red-50/50 dark:bg-red-900/10"
                      : card.status === "expiring_soon"
                      ? "bg-yellow-50/50 dark:bg-yellow-900/10"
                      : ""
                  }`}
                >
                  <td className="px-4 py-4">
                    {getStatusBadge(card.status, card.daysUntilExpiry)}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-6 rounded ${card.style.bgColor} flex items-center justify-center`}
                      >
                        <span className={`text-[8px] font-bold ${card.style.textColor}`}>
                          {card.bank}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white text-sm">
                          {card.name}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {card.bank}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {card.promoName || "未命名推廣"}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Calendar className="w-4 h-4" />
                      {formatDate(card.promoEndDate!)}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/cards/${card.id}`}
                        className="text-blue-600 hover:text-blue-700 dark:text-blue-400 text-sm"
                        target="_blank"
                      >
                        查看卡片
                      </Link>
                      {card.applyUrl && (
                        <a
                          href={card.applyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                          title="官方網站"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredCards.length === 0 && (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            沒有符合條件嘅推廣
          </div>
        )}
      </div>

      {/* Tips Section */}
      <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
        <h3 className="font-medium text-blue-800 dark:text-blue-300 mb-2">
          💡 使用提示
        </h3>
        <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
          <li>• 已過期嘅推廣需要搵返最新 T&C 更新</li>
          <li>• 30 天內到期嘅推廣建議提前準備</li>
          <li>• 點擊官方網站連結可以直接查閱最新條款</li>
          <li>• 更新後記得修改 <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">promoEndDate</code> 同 <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">promoName</code></li>
        </ul>
      </div>

      {/* Cards without promo date */}
      <div className="mt-8">
        <h3 className="font-medium text-gray-900 dark:text-white mb-4">
          📋 尚未設定推廣到期日嘅卡片 ({HK_CARDS.filter(c => !c.promoEndDate && !c.hidden).length})
        </h3>
        <div className="flex flex-wrap gap-2">
          {HK_CARDS.filter(c => !c.promoEndDate && !c.hidden).slice(0, 20).map((card) => (
            <Link
              key={card.id}
              href={`/cards/${card.id}`}
              className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-400"
            >
              {card.name}
            </Link>
          ))}
          {HK_CARDS.filter(c => !c.promoEndDate && !c.hidden).length > 20 && (
            <span className="text-xs px-2 py-1 text-gray-400">
              +{HK_CARDS.filter(c => !c.promoEndDate && !c.hidden).length - 20} 更多...
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

