"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ensureProfile } from "@/app/actions/ensure-profile";
import { Loader2 } from "lucide-react";

export default function AuthSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    const init = async () => {
      // 1. Ensure profile exists in DB (fix missing member issue)
      await ensureProfile();

      // 2. Hard redirect to home to clear Next.js router cache and force fresh state
      // Using window.location.href instead of router.push to ensure full reload
      window.location.href = "/";
    };

    init();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center gap-4">
        <div className="p-4 bg-white dark:bg-gray-800 rounded-full shadow-lg animate-bounce">
            <span className="text-4xl">👋</span>
        </div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">登入成功！</h1>
        <p className="text-gray-500 flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          正在準備您的錢包...
        </p>
      </div>
    </div>
  );
}



