"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useWallet } from "@/lib/store/wallet-context";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import type { Session } from "@supabase/supabase-js";

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

      // First, always check for existing session
      const supabase = createClient();
      const { data: { session: existingSession } } = await supabase.auth.getSession();
      
      if (existingSession) {
        console.log("Session already exists for:", existingSession.user.email);
        setStatus("success");
        toast.success("歡迎回來！");
        setTimeout(() => {
          window.location.href = "/";
        }, 500);
        return;
      }

      if (code) {
        setStatus("exchanging");
        console.log("Auth Success: Exchanging code for session...");
        
        // Retry logic for code exchange
        let retryCount = 0;
        const maxRetries = 2;
        
        while (retryCount <= maxRetries) {
          try {
            const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
            
            if (exchangeError) {
              // Check if it's a "code already used" error
              if (exchangeError.message?.includes("already") || exchangeError.message?.includes("expired") || exchangeError.message?.includes("invalid")) {
                console.warn("Code may have been used/expired, checking for session...");
                const { data: { session: retrySession } } = await supabase.auth.getSession();
                if (retrySession) {
                  console.log("Session found after code error, user is logged in");
                  setStatus("success");
                  toast.success("登入成功！");
                  setTimeout(() => {
                    window.location.href = "/";
                  }, 500);
                  return;
                }
              }
              throw exchangeError;
            }
            
            if (data.session) {
              console.log("Session established successfully for:", data.session.user.email);
              setStatus("success");
              
              // Ensure profile exists and update last_login
              try {
                const profileParams = new URLSearchParams({
                  userId: data.session.user.id,
                  email: data.session.user.email || '',
                  name: data.session.user.user_metadata?.full_name || data.session.user.user_metadata?.name || '',
                  avatar: data.session.user.user_metadata?.avatar_url || ''
                });
                await fetch(`/api/auth/ensure-profile?${profileParams.toString()}`);
              } catch (e) {
                console.warn("Ensure profile failed, but continuing...", e);
              }
              
              toast.success("登入成功！歡迎回來");
              
              // Force full page reload to ensure all contexts pick up the new session
              setTimeout(() => {
                window.location.href = "/";
              }, 800);
              return;
            }
            break; // Success, exit retry loop
          } catch (e: any) {
            console.error(`Session exchange attempt ${retryCount + 1} failed:`, e);
            retryCount++;
            
            if (retryCount <= maxRetries) {
              // Wait a bit before retrying
              await new Promise(resolve => setTimeout(resolve, 500));
            } else {
              // All retries failed, check for existing session one more time
              const { data: { session: finalSession } } = await supabase.auth.getSession();
              if (finalSession) {
                console.log("Session found after retries, user is logged in");
                setStatus("success");
                toast.success("登入成功！");
                setTimeout(() => {
                  window.location.href = "/";
                }, 500);
                return;
              }
              
              setStatus("error");
              // Provide more helpful error message
              let errorMsg = "驗證失敗";
              if (e.message?.includes("network") || e.message?.includes("fetch")) {
                errorMsg = "網絡連接問題，請檢查網絡後重試";
              } else if (e.message?.includes("expired") || e.message?.includes("invalid")) {
                errorMsg = "登入連結已過期，請重新登入";
              }
              setErrorMessage(errorMsg);
              toast.error("登入驗證失敗", { description: errorMsg });
              setTimeout(() => router.push("/login"), 2000);
              return;
            }
          }
        }
      }
      
      // No code in URL - check session one more time before showing error
      if (!user) {
        // Wait a moment for session to propagate, then check again
        await new Promise(resolve => setTimeout(resolve, 500));
        const { data: { session: finalCheck } } = await supabase.auth.getSession();
        
        if (finalCheck) {
          console.log("Session found on final check:", finalCheck.user.email);
          setStatus("success");
          toast.success("登入成功！");
          setTimeout(() => {
            window.location.href = "/";
          }, 500);
          return;
        }
        
        setStatus("error");
        setErrorMessage("未偵測到登入狀態");
        setTimeout(() => router.push("/login"), 2000);
      }
    };

    handleCodeExchange();
  }, [router, user]); // user is still a dependency but won't cause re-runs due to ref guard

  // Timeout fallback - increased to 15 seconds for slower networks
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (status === "verifying" || status === "exchanging") {
        console.warn("Auth timeout, checking session before redirect...");
        // Before forcing redirect, check if session actually exists
        const supabase = createClient();
        supabase.auth.getSession().then(({ data: { session } }: { data: { session: Session | null } }) => {
          if (session) {
            console.log("Session found during timeout, redirecting as success");
            setStatus("success");
            toast.success("登入成功！");
            setTimeout(() => {
              window.location.href = "/";
            }, 500);
          } else {
            console.warn("No session found, redirecting to login");
            setStatus("error");
            setErrorMessage("登入超時，請重試");
            toast.error("登入超時", { description: "請重新嘗試登入" });
            setTimeout(() => router.push("/login"), 1500);
          }
        });
      }
    }, 15000); // 15 second timeout

    return () => clearTimeout(timeout);
  }, [status, router]);

  // Minimal UI - just show a subtle loading indicator
  // Error state gets a more visible display
  if (status === "error") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center gap-4 max-w-sm px-4">
          <div className="p-4 bg-red-100 dark:bg-red-900/30 rounded-full">
            <span className="text-4xl">😕</span>
          </div>
          <h1 className="text-xl font-bold text-red-700 dark:text-red-400">登入失敗</h1>
          {errorMessage && (
            <p className="text-red-500 text-sm text-center">{errorMessage}</p>
          )}
          <div className="flex gap-3 mt-4">
            <button 
              onClick={() => window.location.href = "/login"}
              className="px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              重新登入
            </button>
            <button 
              onClick={() => window.location.href = "/"}
              className="px-5 py-2.5 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              返回首頁
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-4 text-center">
            如持續無法登入，請嘗試清除瀏覽器 Cookie 或使用無痕模式
          </p>
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
          {status === "success" && "跳轉中..."}
          {status === "exchanging" && "正在驗證登入..."}
          {status === "verifying" && "檢查登入狀態..."}
        </p>
      </div>
    </div>
  );
}
