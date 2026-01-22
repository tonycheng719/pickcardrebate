"use client";

import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useWallet } from "@/lib/store/wallet-context";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { toast } from "sonner";
import { trackLogin } from "@/lib/analytics";
import Link from "next/link";
import { Locale, localePathMap } from "@/lib/i18n/config";
import { getTranslation } from "@/lib/i18n/translations";

interface LoginClientProps {
  locale: Locale;
}

function LoginContent({ locale }: { locale: Locale }) {
  const t = getTranslation(locale);
  const prefix = localePathMap[locale] ? `/${localePathMap[locale]}` : '';
  const { loginWithOAuth, requestSmsOtp, verifySmsOtp, user } = useWallet();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [smsCode, setSmsCode] = useState("");
  const [smsStep, setSmsStep] = useState<"input" | "verify">("input");
  const [isSmsLoading, setIsSmsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  
  const isFromApp = searchParams.get("from") === "app";
  const appCallback = searchParams.get("callback");

  useEffect(() => {
    if (isFromApp) {
      localStorage.setItem('loginFromApp', 'true');
      if (appCallback) {
        localStorage.setItem('appCallback', appCallback);
      }
    }
  }, [isFromApp, appCallback]);

  useEffect(() => {
    if (user) {
      router.replace(`${prefix}/`);
    }
  }, [user, router, prefix]);

  const handleOAuthLogin = async (provider: "google" | "apple") => {
    try {
      setIsLoading(true);
      localStorage.setItem('rememberMe', rememberMe ? 'true' : 'false');
      await loginWithOAuth(provider);
      trackLogin(provider);
    } catch (error: any) {
      toast.error(error.message || t.common.error);
      setIsLoading(false);
    }
  };

  const handleSendSms = async () => {
    const sanitized = phoneNumber.trim();
    if (!sanitized) {
      toast.error(t.common.error);
      return;
    }
    try {
      setIsSmsLoading(true);
      await requestSmsOtp(sanitized);
      toast.success(t.common.confirm);
      setSmsStep("verify");
    } catch (error: any) {
      toast.error(error.message || t.common.error);
    } finally {
      setIsSmsLoading(false);
    }
  };

  const handleVerifySms = async () => {
    const sanitized = phoneNumber.trim();
    try {
      setIsSmsLoading(true);
      await verifySmsOtp(sanitized, smsCode.trim());
      trackLogin("sms");
      toast.success(t.common.confirm);
      router.replace(`${prefix}/`);
    } catch (error: any) {
      toast.error(error.message || t.common.error);
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
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t.auth.login}</h1>
            <p className="text-gray-500 dark:text-gray-400">{t.seo.homeDescription.substring(0, 50)}...</p>
          </div>

          <div className="space-y-4">
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
              {t.auth.loginWithGoogle}
            </Button>

            <div className="w-full flex h-12 items-center justify-center rounded-xl border border-dashed border-gray-300 dark:border-gray-700 text-sm text-gray-400 dark:text-gray-500">
              Apple Login Coming Soon
            </div>

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 dark:border-gray-600 dark:bg-gray-700"
              />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Remember me for 30 days
              </span>
            </label>
          </div>

          <p className="text-center text-xs text-gray-500 dark:text-gray-400">
            {t.auth.noAccount}
            <Link href={`${prefix}/terms`} className="underline hover:text-gray-900 dark:hover:text-gray-200 mx-1">{t.settings.terms}</Link>
            &
            <Link href={`${prefix}/privacy`} className="underline hover:text-gray-900 dark:hover:text-gray-200 mx-1">{t.settings.privacy}</Link>
          </p>
        </div>
      </main>
    </div>
  );
}

export default function LoginClient({ locale }: LoginClientProps) {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent" />
      </div>
    }>
      <LoginContent locale={locale} />
    </Suspense>
  );
}


