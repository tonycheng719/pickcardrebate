"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Search, ArrowLeft } from "lucide-react";

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

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

      // Also log to console for debugging
      console.log("[404 Tracked]", attemptedPath);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="text-9xl font-bold text-gray-200 dark:text-gray-800">404</div>
          <div className="text-xl font-semibold text-gray-600 dark:text-gray-400 -mt-4">
            找不到此頁面
          </div>
        </div>

        {/* Message */}
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          抱歉，您嘗試訪問的頁面不存在或已被移除。
          <br />
          請檢查網址是否正確，或返回首頁繼續瀏覽。
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/">
            <Button className="gap-2 w-full sm:w-auto">
              <Home className="h-4 w-4" />
              返回首頁
            </Button>
          </Link>
          <Link href="/cards">
            <Button variant="outline" className="gap-2 w-full sm:w-auto">
              <Search className="h-4 w-4" />
              瀏覽信用卡
            </Button>
          </Link>
        </div>

        {/* Back Button */}
        <button 
          onClick={() => window.history.back()}
          className="mt-6 text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 flex items-center gap-1 mx-auto transition-colors"
        >
          <ArrowLeft className="h-3 w-3" />
          返回上一頁
        </button>
      </div>
    </div>
  );
}

