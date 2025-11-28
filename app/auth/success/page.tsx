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
      if (!user || isRedirecting) return;

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
      }, 500); // Small delay for toast to show
    };

    if (user) {
        handleAuthSuccess();
    } else {
        // Check for error in URL
        const params = new URLSearchParams(window.location.search);
        const error = params.get('error');
        if (error) {
            toast.error("登入失敗", { description: params.get('error_description') || "請重試" });
            setTimeout(() => {
                 router.push("/login");
            }, 2000);
        }
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
      </div>
    </div>
  );
}



