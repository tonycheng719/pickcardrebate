"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  Home, Search, ArrowLeft, CreditCard, Trophy, 
  Calculator, ShoppingCart, Utensils, Plane, ChevronRight 
} from "lucide-react";

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

// Popular pages to suggest
const popularPages = [
  { 
    href: "/", 
    icon: Calculator, 
    title: "回贈計算機", 
    desc: "計算最高回贈信用卡",
    color: "text-emerald-500"
  },
  { 
    href: "/cards", 
    icon: CreditCard, 
    title: "所有信用卡", 
    desc: "瀏覽全港信用卡",
    color: "text-blue-500"
  },
  { 
    href: "/rankings", 
    icon: Trophy, 
    title: "回贈排行榜", 
    desc: "各類別最高回贈卡",
    color: "text-amber-500"
  },
];

// Popular ranking categories
const popularRankings = [
  { href: "/blog/best-supermarket-cards", icon: ShoppingCart, title: "超市", color: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400" },
  { href: "/blog/best-dining-cards", icon: Utensils, title: "餐飲", color: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400" },
  { href: "/blog/best-travel-cards", icon: Plane, title: "旅遊", color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" },
];

export default function NotFound() {
  useEffect(() => {
    // Track 404 error in GA4 with the attempted URL
    if (typeof window !== "undefined" && window.gtag) {
      const attemptedUrl = window.location.href;
      const attemptedPath = window.location.pathname;
      
      // Send 404 event to GA4
      window.gtag("event", "page_not_found", {
        page_location: attemptedUrl,
        page_path: attemptedPath,
        page_title: "404 - Page Not Found",
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 flex flex-col items-center justify-center px-4 py-12">
      <div className="text-center max-w-2xl w-full">
        {/* 404 Illustration with Animation */}
        <div className="mb-8 relative">
          <div className="text-[10rem] font-black text-transparent bg-clip-text bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700 leading-none select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl animate-bounce">🔍</div>
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          找不到此頁面
        </h1>

        {/* Message */}
        <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
          抱歉，您嘗試訪問的頁面不存在或已被移除。
          不如試下以下熱門頁面？
        </p>

        {/* Primary Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
          <Link href="/">
            <Button size="lg" className="gap-2 w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600">
              <Home className="h-4 w-4" />
              返回首頁
            </Button>
          </Link>
          <Button 
            variant="outline" 
            size="lg"
            className="gap-2 w-full sm:w-auto"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="h-4 w-4" />
            返回上一頁
          </Button>
        </div>

        {/* Popular Pages Section */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 text-left">
            🔥 熱門頁面
          </h2>
          <div className="grid sm:grid-cols-3 gap-3">
            {popularPages.map((page) => (
              <Link key={page.href} href={page.href}>
                <div className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-emerald-200 dark:hover:border-emerald-800 transition-all group">
                  <div className={`p-2 rounded-lg bg-gray-100 dark:bg-gray-800 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/30 transition-colors`}>
                    <page.icon className={`h-5 w-5 ${page.color}`} />
                  </div>
                  <div className="text-left flex-1">
                    <p className="font-medium text-gray-900 dark:text-white text-sm group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {page.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{page.desc}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-emerald-500 transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Rankings */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 text-left">
            🏆 熱門排行榜
          </h2>
          <div className="flex flex-wrap gap-2">
            {popularRankings.map((ranking) => (
              <Link key={ranking.href} href={ranking.href}>
                <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${ranking.color} hover:opacity-80 transition-opacity`}>
                  <ranking.icon className="h-4 w-4" />
                  <span className="font-medium text-sm">{ranking.title}</span>
                </div>
              </Link>
            ))}
            <Link href="/rankings">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                <span className="font-medium text-sm">查看全部 →</span>
              </div>
            </Link>
          </div>
        </div>

        {/* Footer Note */}
        <p className="mt-8 text-xs text-gray-400 dark:text-gray-500">
          如果你認為這是一個錯誤，請
          <a href="mailto:support@pickcardrebate.com" className="text-emerald-600 dark:text-emerald-400 hover:underline ml-1">
            聯絡我們
          </a>
        </p>
      </div>
    </div>
  );
}

