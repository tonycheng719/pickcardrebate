"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useWallet } from "@/lib/store/wallet-context";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

export default function AuthSuccessPage() {
  const router = useRouter();
  const { user } = useWallet();
  const [status, setStatus] = useState<"verifying" | "exchanging" | "success" | "error">("verifying");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const hasAttemptedExchange = useRef(false); // Prevent double execution

  useEffect(() => {
    // Prevent running twice (React Strict Mode or other reasons)
    if (hasAttemptedExchange.current) {
      console.log("Auth Success: Already attempted exchange, skipping...");
      return;
    }
    hasAttemptedExchange.current = true;

    const handleCodeExchange = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");
      const error = params.get("error");
      const errorDescription = params.get("error_description");

      // Immediately clean up URL to prevent re-use of code
      if (code || error) {
        window.history.replaceState({}, document.title, window.location.pathname);
      }

      if (error) {
        setStatus("error");
        setErrorMessage(errorDescription || error);
        toast.error("登入失敗", { description: errorDescription || "請重試" });
        setTimeout(() => router.push("/login"), 2000);
        return;
      }

      if (code) {
        setStatus("exchanging");
        console.log("Auth Success: Exchanging code for session...");
        
        try {
          const supabase = createClient();
          const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
          
          if (exchangeError) {
            console.error("Code exchange error:", exchangeError);
            throw exchangeError;
          }
          
          if (data.session) {
            console.log("Session established successfully for:", data.session.user.email);
            console.log("Access token (first 20 chars):", data.session.access_token.substring(0, 20) + "...");
            console.log("Cookies after exchange:", document.cookie);
            
            setStatus("success");
            
            // Manually store tokens in localStorage as backup (Supabase SSR should handle this)
            // This is a fallback for cases where cookies don't work
            try {
              const storageKey = `sb-${new URL(process.env.NEXT_PUBLIC_SUPABASE_URL || '').hostname.split('.')[0]}-auth-token`;
              localStorage.setItem(storageKey, JSON.stringify({
                access_token: data.session.access_token,
                refresh_token: data.session.refresh_token,
                expires_at: Math.floor(Date.now() / 1000) + (data.session.expires_in || 3600),
                user: data.session.user
              }));
              console.log("Session stored in localStorage as backup:", storageKey);
            } catch (storageError) {
              console.warn("Failed to store session in localStorage:", storageError);
            }
            
            // Ensure profile exists
            try {
              await fetch("/api/auth/ensure-profile");
            } catch (e) {
              console.warn("Ensure profile failed, but continuing...", e);
            }
            
            toast.success("登入成功！歡迎回來");
            
            // Force full page reload to ensure all contexts pick up the new session
            setTimeout(() => {
              window.location.href = "/";
            }, 1000);
            return;
          }
        } catch (e: any) {
          console.error("Session exchange failed:", e);
          // If code was already used, the user might already be logged in
          // Check for existing session
          const supabase = createClient();
          const { data: { session } } = await supabase.auth.getSession();
          if (session) {
            console.log("Session already exists, redirecting...");
            setStatus("success");
            toast.success("登入成功！");
            setTimeout(() => {
              window.location.href = "/";
            }, 500);
            return;
          }
          
          setStatus("error");
          setErrorMessage(e.message || "驗證失敗");
          toast.error("登入驗證失敗", { description: "請重新嘗試登入" });
          setTimeout(() => router.push("/login"), 2000);
          return;
        }
      }
      
      // No code in URL, check if already logged in via cookies
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      if (session || user) {
        setStatus("success");
        toast.success("歡迎回來！");
        setTimeout(() => {
          window.location.href = "/";
        }, 500);
      } else {
        // No session, no code - redirect to login
        setStatus("error");
        setErrorMessage("未偵測到登入狀態");
        setTimeout(() => router.push("/login"), 2000);
      }
    };

    handleCodeExchange();
  }, [router, user]); // user is still a dependency but won't cause re-runs due to ref guard

  // Timeout fallback
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (status === "verifying" || status === "exchanging") {
        console.warn("Auth timeout, forcing redirect...");
        window.location.href = "/";
      }
    }, 8000); // 8 second timeout

    return () => clearTimeout(timeout);
  }, [status]);

  // Minimal UI - just show a subtle loading indicator
  // Error state gets a more visible display
  if (status === "error") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center gap-4">
          <div className="p-4 bg-red-100 dark:bg-red-900/30 rounded-full">
            <span className="text-4xl">😕</span>
          </div>
          <h1 className="text-xl font-bold text-red-700 dark:text-red-400">登入失敗</h1>
          {errorMessage && (
            <p className="text-red-500 text-sm max-w-xs text-center">{errorMessage}</p>
          )}
          <button 
            onClick={() => router.push("/login")}
            className="mt-4 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            重新登入
          </button>
        </div>
      </div>
    );
  }

  // For non-error states, show a minimal full-page loader that doesn't look like a "popup"
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600 dark:text-blue-400" />
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {status === "success" ? "跳轉中..." : ""}
        </p>
      </div>
    </div>
  );
}
