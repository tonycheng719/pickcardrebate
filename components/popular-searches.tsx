"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Search, Building2, CreditCard, Tag } from "lucide-react";
import { BANK_CATEGORIES, NETWORK_CATEGORIES, FEATURE_CATEGORIES } from "@/lib/data/card-categories";

interface PopularSearchesProps {
  variant?: "full" | "compact";
  showTitle?: boolean;
}

export function PopularSearches({ variant = "full", showTitle = true }: PopularSearchesProps) {
  // 熱門銀行（按優先順序）
  const popularBanks = ["hsbc", "sc", "boc", "hangseng", "citi", "dbs", "aeon", "amex"];
  const banks = BANK_CATEGORIES.filter(b => popularBanks.includes(b.id));
  
  // 熱門卡組織
  const popularNetworks = ["visa", "mastercard", "unionpay", "amex"];
  const networks = NETWORK_CATEGORIES.filter(n => popularNetworks.includes(n.id));
  
  // 熱門功能
  const popularFeatures = ["cashback", "miles", "dining", "overseas", "online", "no-annual-fee"];
  const features = FEATURE_CATEGORIES.filter(f => popularFeatures.includes(f.id));

  if (variant === "compact") {
    return (
      <div className="flex flex-wrap gap-2">
        {banks.slice(0, 4).map((bank) => (
          <Link key={bank.id} href={`/cards/bank/${bank.id}`}>
            <Badge variant="secondary" className="cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
              {bank.name}
            </Badge>
          </Link>
        ))}
        {features.slice(0, 3).map((feature) => (
          <Link key={feature.id} href={`/cards/category/${feature.id}`}>
            <Badge variant="secondary" className="cursor-pointer hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
              {feature.name}
            </Badge>
          </Link>
        ))}
      </div>
    );
  }

  return (
    <section className="py-8 bg-gray-50/50 dark:bg-gray-900/50 border-t border-b border-gray-200/50 dark:border-gray-800/50">
      <div className="container mx-auto px-4">
        {showTitle && (
          <div className="flex items-center gap-2 mb-6">
            <Search className="h-5 w-5 text-blue-500" />
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">熱門搜尋</h2>
          </div>
        )}
        
        <div className="space-y-4">
          {/* 按銀行 */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
              <Building2 className="h-4 w-4" />
              銀行
            </span>
            {banks.map((bank) => (
              <Link key={bank.id} href={`/cards/bank/${bank.id}`}>
                <Badge 
                  variant="outline" 
                  className="cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
                >
                  {bank.name}
                </Badge>
              </Link>
            ))}
          </div>

          {/* 按卡組織 */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
              <CreditCard className="h-4 w-4" />
              卡組織
            </span>
            {networks.map((network) => (
              <Link key={network.id} href={`/cards/network/${network.id}`}>
                <Badge 
                  variant="outline" 
                  className="cursor-pointer hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:border-purple-300 dark:hover:border-purple-700 transition-colors"
                >
                  {network.name}
                </Badge>
              </Link>
            ))}
          </div>

          {/* 按功能 */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
              <Tag className="h-4 w-4" />
              功能
            </span>
            {features.map((feature) => (
              <Link key={feature.id} href={`/cards/category/${feature.id}`}>
                <Badge 
                  variant="outline" 
                  className="cursor-pointer hover:bg-green-50 dark:hover:bg-green-900/20 hover:border-green-300 dark:hover:border-green-700 transition-colors"
                >
                  {feature.name}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Footer 版本的分類連結
export function FooterCategories() {
  const topBanks = BANK_CATEGORIES.slice(0, 6);
  const topFeatures = FEATURE_CATEGORIES.slice(0, 6);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {/* 熱門銀行 */}
      <div>
        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">熱門銀行</h4>
        <ul className="space-y-2">
          {topBanks.map((bank) => (
            <li key={bank.id}>
              <Link 
                href={`/cards/bank/${bank.id}`}
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {bank.name}信用卡
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* 卡組織 */}
      <div>
        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">卡組織</h4>
        <ul className="space-y-2">
          {NETWORK_CATEGORIES.map((network) => (
            <li key={network.id}>
              <Link 
                href={`/cards/network/${network.id}`}
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              >
                {network.name} 信用卡
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* 功能分類 */}
      <div>
        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">功能分類</h4>
        <ul className="space-y-2">
          {topFeatures.map((feature) => (
            <li key={feature.id}>
              <Link 
                href={`/cards/category/${feature.id}`}
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
              >
                {feature.name}信用卡
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* 更多分類 */}
      <div>
        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">更多分類</h4>
        <ul className="space-y-2">
          {FEATURE_CATEGORIES.slice(6).map((feature) => (
            <li key={feature.id}>
              <Link 
                href={`/cards/category/${feature.id}`}
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
              >
                {feature.name}信用卡
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

