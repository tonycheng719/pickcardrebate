"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAdminDataStore } from "@/lib/admin/data-store";
import { Database } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SystemSetting[]>(DEFAULT_SYSTEM_SETTINGS);
  const [saved, setSaved] = useState(false);
  const { uploadInitialData, isLoading } = useAdminDataStore();
  
  // Local state for Analytics (simulated backend fields)
  const [analytics, setAnalytics] = useState({
    ga4Id: "G-XXXXXXXXXX",
    metaPixelId: "XXXXXXXXXXXXXXX"
  });

  const toggleSetting = (id: string) => {
    setSettings((prev) =>
      prev.map((setting) => (setting.id === id ? { ...setting, enabled: !setting.enabled } : setting))
    );
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">系統設定</h1>
          <p className="text-gray-500 dark:text-gray-400">調整前台公告、推播與維護模式。</p>
        </div>
        <Button onClick={handleSave}>{saved ? "已儲存" : "儲存設定"}</Button>
      </div>

      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg dark:text-white flex items-center gap-2">
            <Database className="h-5 w-5" /> 資料庫管理
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">初始化雲端資料庫</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                將本地的卡片、商戶預設資料上傳至 Supabase (僅在資料庫為空時使用)。
              </p>
            </div>
            <Button 
                variant="outline" 
                onClick={() => {
                    if (confirm("確定要上傳初始資料嗎？這將會寫入大量數據。")) {
                        uploadInitialData();
                    }
                }}
                disabled={isLoading}
            >
              {isLoading ? "處理中..." : "上傳初始資料"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg dark:text-white">數據追蹤 (Analytics)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="grid gap-2">
                <Label>Google Analytics 4 (GA4) Measurement ID</Label>
                <Input 
                    placeholder="G-XXXXXXXXXX" 
                    value={analytics.ga4Id}
                    onChange={(e) => setAnalytics({...analytics, ga4Id: e.target.value})}
                />
                <p className="text-xs text-gray-500">輸入後將自動在全站頁面載入 GA4 追蹤碼。</p>
            </div>
            <div className="grid gap-2">
                <Label>Meta (Facebook) Pixel ID</Label>
                <Input 
                    placeholder="XXXXXXXXXXXXXXX" 
                    value={analytics.metaPixelId}
                    onChange={(e) => setAnalytics({...analytics, metaPixelId: e.target.value})}
                />
                <p className="text-xs text-gray-500">輸入後將自動在全站頁面載入 Pixel 追蹤碼。</p>
            </div>
        </CardContent>
      </Card>

      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg dark:text-white">全域控制</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {settings.map((setting) => (
            <div
              key={setting.id}
              className="flex items-center justify-between border-b dark:border-gray-700 pb-4 last:border-b-0"
            >
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{setting.label}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{setting.description}</p>
              </div>
              <button
                onClick={() => toggleSetting(setting.id)}
                className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors ${
                  setting.enabled ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-600"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    setting.enabled ? "translate-x-6" : "translate-x-2"
                  }`}
                />
              </button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

