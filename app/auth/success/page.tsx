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
            setStatus("success");
            
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
            }, 800);
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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center gap-4">
        <div className="p-4 bg-white dark:bg-gray-800 rounded-full shadow-lg animate-bounce">
            <span className="text-4xl">
              {status === "error" ? "😕" : status === "success" ? "🎉" : "👋"}
            </span>
        </div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            {status === "verifying" && "正在驗證..."}
            {status === "exchanging" && "正在建立連線..."}
            {status === "success" && "登入成功！"}
            {status === "error" && "登入失敗"}
        </h1>
        
        {status !== "error" && status !== "success" && (
          <p className="text-gray-500 flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            正在準備您的錢包...
          </p>
        )}
        
        {status === "error" && errorMessage && (
          <p className="text-red-500 text-sm max-w-xs text-center">
            {errorMessage}
          </p>
        )}
        
        {status === "success" && (
          <p className="text-green-600 text-sm">
            即將跳轉至首頁...
          </p>
        )}
        
        {/* Manual Override Button after delay */}
        <div className="mt-8 opacity-0 animate-in fade-in slide-in-from-bottom-4 fill-mode-forwards" style={{ animationDelay: '4s' }}>
            <button 
                onClick={() => window.location.href = "/"}
                className="text-sm text-gray-400 hover:text-gray-600 underline"
            >
                如果太久沒有回應，請點此直接進入
            </button>
        </div>
      </div>
    </div>
  );
}
