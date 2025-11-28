"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useWallet } from "@/lib/store/wallet-context";
import { toast } from "sonner";

export default function AuthSuccessPage() {
  const router = useRouter();
  const { user } = useWallet();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    const handleAuthSuccess = async () => {
      if (isRedirecting) return;
      setIsRedirecting(true);

      // 1. Ensure profile exists in DB (fix missing member issue) via API
      try {
        await fetch("/api/auth/ensure-profile");
      } catch (e) {
        console.error("Failed to ensure profile", e);
      }

      // 2. Hard redirect to home to clear Next.js router cache and force fresh state
      // Using window.location.href instead of router.push to ensure full reload
      toast.success("歡迎回來！");
      setTimeout(() => {
        window.location.href = "/";
      }, 500); 
    };

    if (user) {
        handleAuthSuccess();
    } else {
        // Fallback: If user state doesn't update within 5 seconds, force redirect or login
        const timeout = setTimeout(() => {
            if (!user && !isRedirecting) {
                // Check URL for error
                const params = new URLSearchParams(window.location.search);
                if (params.get('error')) {
                    toast.error("登入失敗", { description: params.get('error_description') || "請重試" });
                    router.push("/login");
                } else {
                    // Maybe session is there but context slow? Or cookie lost?
                    // Try redirecting home, maybe home will pick it up or show non-logged in state
                    console.warn("Auth success timeout, redirecting to home...");
                    window.location.href = "/";
                }
            }
        }, 3000);
        return () => clearTimeout(timeout);
    }
  }, [user, isRedirecting, router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center gap-4">
        <div className="p-4 bg-white dark:bg-gray-800 rounded-full shadow-lg animate-bounce">
            <span className="text-4xl">👋</span>
        </div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            {user ? "登入成功！" : "正在驗證..."}
        </h1>
        <p className="text-gray-500 flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          正在準備您的錢包...
        </p>
        
        {/* Manual Override Button after delay */}
        <div className="mt-8 opacity-0 animate-in fade-in slide-in-from-bottom-4 fill-mode-forwards" style={{ animationDelay: '3s' }}>
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
