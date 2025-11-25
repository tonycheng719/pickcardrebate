"use client";

import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DynamicIcon } from "@/components/dynamic-icon";
import { useWallet } from "@/lib/store/wallet-context";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const { login } = useWallet();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleLogin = (provider: string) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      login(provider);
      setIsLoading(false);
      router.push("/");
    }, 800);
  };

    return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 transition-colors">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 space-y-8 border dark:border-gray-700">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">歡迎回到 PickCardRebate</h1>
            <p className="text-gray-500 dark:text-gray-400">登入以同步您的錢包與設定</p>
          </div>

          <div className="space-y-4">
            {/* Google Login */}
            <Button 
              variant="outline" 
              className="w-full h-12 text-base font-medium relative hover:bg-gray-50 dark:hover:bg-gray-700 dark:bg-transparent dark:text-gray-200 dark:border-gray-600"
              onClick={() => handleLogin("google")}
              disabled={isLoading}
            >
              <svg className="w-5 h-5 absolute left-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.26.81-.58z" />
                <path fill="#EA4335" d="M12 4.66c1.61 0 3.06.56 4.21 1.64l3.15-3.15C17.45 1.19 14.97 0 12 0 7.7 0 3.99 2.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              使用 Google 繼續
            </Button>

            {/* Apple Login */}
            <Button 
              className="w-full h-12 text-base font-medium bg-black hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 text-white relative"
              onClick={() => handleLogin("apple")}
              disabled={isLoading}
            >
              <svg className="w-5 h-5 absolute left-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74 1.18 0 2.48-1.23 3.93-1.14 1.31.08 2.51.69 3.29 1.49-3.02 1.86-2.46 5.92.72 7.37-.53 1.43-1.25 2.75-2.02 4.51M13 5.25a5.21 5.21 0 0 1 1.53-4.13c-1.5.06-3.05.88-3.9 1.87-.93 1.03-1.6 2.66-1.33 4.03 1.43.1 2.92-.68 3.7-1.77"/>
              </svg>
              使用 Apple 繼續
            </Button>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t dark:border-gray-700" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-gray-800 px-2 text-gray-500 dark:text-gray-400">或透過手機號碼</span>
              </div>
            </div>

            {/* SMS Login */}
            <div className="space-y-2">
              <div className="flex gap-2">
                <div className="flex h-11 w-20 items-center justify-center rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-sm text-gray-500 dark:text-gray-400">
                  +852
                </div>
                <Input 
                  type="tel" 
                  placeholder="手機號碼" 
                  className="h-11 text-lg dark:bg-gray-900/50 dark:border-gray-700 dark:text-white"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <Button 
                className="w-full h-11 font-medium"
                onClick={() => handleLogin("sms")}
                disabled={!phoneNumber || isLoading}
              >
                發送驗證碼
              </Button>
            </div>
          </div>

          <p className="text-center text-xs text-gray-500 dark:text-gray-400">
            點擊繼續即代表您同意我們的
            <a href="#" className="underline hover:text-gray-900 dark:hover:text-gray-200 mx-1">服務條款</a>
            與
            <a href="#" className="underline hover:text-gray-900 dark:hover:text-gray-200 mx-1">隱私權政策</a>
          </p>
        </div>
      </main>
    </div>
  );
}

