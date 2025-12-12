"use client";

import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useWallet } from "@/lib/store/wallet-context";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { trackLogin, trackSignUp } from "@/lib/analytics";

import Link from "next/link";

export default function LoginPage() {
  const { loginWithOAuth, requestSmsOtp, verifySmsOtp, user } = useWallet();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [smsCode, setSmsCode] = useState("");
  const [smsStep, setSmsStep] = useState<"input" | "verify">("input");
  const [isSmsLoading, setIsSmsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true); // Default to remember

  useEffect(() => {
    if (user) {
      router.replace("/");
    }
  }, [user, router]);

  const handleOAuthLogin = async (provider: "google" | "apple") => {
    try {
      setIsLoading(true);
      // Save remember me preference before redirect
      localStorage.setItem('rememberMe', rememberMe ? 'true' : 'false');
      await loginWithOAuth(provider);
      // Track login event (will be tracked after redirect back)
      trackLogin(provider);
    } catch (error: any) {
      toast.error(error.message || "登入失敗，請重試");
      setIsLoading(false);
    }
  };

  const handleSendSms = async () => {
    const sanitized = phoneNumber.trim();
    if (!sanitized) {
      toast.error("請輸入手機號碼");
      return;
    }
    try {
      setIsSmsLoading(true);
      await requestSmsOtp(sanitized);
      toast.success("驗證碼已發送，請查收短信");
      setSmsStep("verify");
    } catch (error: any) {
      toast.error(error.message || "無法傳送驗證碼，請稍後再試");
    } finally {
      setIsSmsLoading(false);
    }
  };

  const handleVerifySms = async () => {
    const sanitized = phoneNumber.trim();
    try {
      setIsSmsLoading(true);
      await verifySmsOtp(sanitized, smsCode.trim());
      // Track login event
      trackLogin("sms");
      toast.success("驗證成功，正在為您登入");
      router.replace("/");
    } catch (error: any) {
      toast.error(error.message || "驗證失敗，請檢查驗證碼是否正確");
    } finally {
      setIsSmsLoading(false);
    }
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
              onClick={() => handleOAuthLogin("google")}
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

            {/* Apple Login Placeholder */}
            <div className="w-full flex h-12 items-center justify-center rounded-xl border border-dashed border-gray-300 dark:border-gray-700 text-sm text-gray-400 dark:text-gray-500">
              Apple 登入即將推出
            </div>

            {/* Remember Me */}
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 dark:border-gray-600 dark:bg-gray-700"
              />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                記住我 30 天 <span className="text-xs text-gray-400">(不勾選則 12 小時後需重新登入)</span>
              </span>
            </label>

            <div className="relative py-2 hidden">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t dark:border-gray-700" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-gray-800 px-2 text-gray-500 dark:text-gray-400">或透過手機號碼</span>
              </div>
            </div>

            {/* SMS Login - Hidden temporarily */}
            <div className="space-y-2 hidden">
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
              {smsStep === "input" ? (
                <Button 
                  className="w-full h-11 font-medium"
                  onClick={handleSendSms}
                  disabled={!phoneNumber || isSmsLoading}
                >
                  {isSmsLoading ? "傳送中..." : "發送驗證碼"}
                </Button>
              ) : (
                <div className="space-y-2">
                  <Input 
                    type="text"
                    maxLength={6}
                    placeholder="輸入6位數驗證碼"
                    className="h-11 text-lg tracking-widest text-center dark:bg-gray-900/50 dark:border-gray-700 dark:text-white"
                    value={smsCode}
                    onChange={(e) => setSmsCode(e.target.value)}
                  />
                  <Button 
                    className="w-full h-11 font-medium"
                    onClick={handleVerifySms}
                    disabled={smsCode.length < 6 || isSmsLoading}
                  >
                    {isSmsLoading ? "驗證中..." : "確認登入"}
                  </Button>
                  <button
                    className="text-xs text-gray-500 underline"
                    onClick={() => {
                      setSmsStep("input");
                      setSmsCode("");
                    }}
                  >
                    重新輸入手機號碼
                  </button>
                </div>
              )}
            </div>
          </div>

          <p className="text-center text-xs text-gray-500 dark:text-gray-400">
            點擊繼續即代表您同意我們的
            <Link href="/terms" className="underline hover:text-gray-900 dark:hover:text-gray-200 mx-1">服務條款</Link>
            與
            <Link href="/privacy" className="underline hover:text-gray-900 dark:hover:text-gray-200 mx-1">隱私權政策</Link>
          </p>
        </div>
      </main>
    </div>
  );
}

