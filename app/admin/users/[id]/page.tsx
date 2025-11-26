"use client";

import { useMemo, use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDataset } from "@/lib/admin/data-store";
import { ArrowLeft, Shield, Ban, CheckCircle2, Search, CreditCard, Calendar, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

// We don't have real wallet data in DB yet, so we can't show user's cards.
// We will only show profile info for now.

export default function AdminUserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchUser = async () => {
        setIsLoading(true);
        const { data, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", id)
            .single();
        
        if (error) {
            console.error("Error fetching user:", error);
        } else {
            setUser(data);
        }
        setIsLoading(false);
    };
    fetchUser();
  }, [id]);

  if (isLoading) {
      return (
          <div className="flex justify-center items-center min-h-[200px]">
              <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
          </div>
      );
  }

  if (!user) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" className="gap-2" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" /> 返回
        </Button>
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="p-6 text-center text-gray-500 dark:text-gray-300">
            找不到此會員資料。
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Button variant="ghost" className="gap-2" onClick={() => router.back()}>
        <ArrowLeft className="h-4 w-4" /> 返回會員列表
      </Button>

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            {user.name}
            <span className="text-sm font-normal px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-600 dark:text-gray-300">
              一般會員
            </span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">ID: {user.id}</p>
        </div>
        
        <div className="flex gap-3">
           {/* Status toggle placeholder */}
           <Button variant="outline" className="text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20">
             <Ban className="h-4 w-4 mr-2" /> 封鎖會員
           </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Left Column: Profile Info */}
        <div className="md:col-span-2 space-y-6">
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg dark:text-white">基本資料</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">電子郵件</label>
                  <div className="mt-1 font-mono text-sm dark:text-gray-200">{user.email}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">註冊來源</label>
                  <div className="mt-1 text-sm dark:text-gray-200">Google / SMS</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">居住地區</label>
                  <div className="mt-1 text-sm dark:text-gray-200">{user.district || "未設定"}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">性別</label>
                  <div className="mt-1 text-sm dark:text-gray-200">
                    {user.gender === "male" ? "男性" : user.gender === "female" ? "女性" : user.gender === "other" ? "其他" : "未設定"}
                  </div>
                </div>
                <div>
                   <label className="text-sm font-medium text-gray-500 dark:text-gray-400">最後登入 IP</label>
                   <div className="mt-1 font-mono text-sm dark:text-gray-200">{user.last_ip || "-"}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Wallet Section - Placeholder for now */}
          <Card className="dark:bg-gray-800 dark:border-gray-700 opacity-60">
            <CardHeader>
              <CardTitle className="text-lg dark:text-white flex items-center justify-between">
                <span>持有信用卡</span>
                <span className="text-xs font-normal px-2 py-1 bg-yellow-100 text-yellow-800 rounded">
                    尚未同步至雲端
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-8">
                會員錢包資料目前僅儲存於用戶裝置，後台暫無法查看。
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Activity & Notes */}
        <div className="space-y-6">
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg dark:text-white">帳號狀態</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-900/30">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <span className="font-medium text-green-700 dark:text-green-300">帳號正常</span>
                </div>
                <span className="text-xs text-green-600 dark:text-green-400">無違規紀錄</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
