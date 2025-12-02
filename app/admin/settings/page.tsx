"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAdminDataStore } from "@/lib/admin/data-store";
import { Database, MessageCircle, Save, Key, Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DEFAULT_SYSTEM_SETTINGS, SystemSetting } from "@/lib/admin/mock-data";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SystemSetting[]>(DEFAULT_SYSTEM_SETTINGS);
  const [saved, setSaved] = useState(false);
  const { uploadInitialData, isLoading } = useAdminDataStore();
  
  const [whatsappUrl, setWhatsappUrl] = useState("");
  const [isSettingsLoading, setIsSettingsLoading] = useState(true);
  
  // Password change states
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch("/api/admin/settings");
        if (res.ok) {
          const data = await res.json();
          if (data.settings?.whatsapp_group_url) {
            setWhatsappUrl(data.settings.whatsapp_group_url);
          }
        }
      } catch (error) {
        console.error("Failed to fetch settings", error);
      } finally {
        setIsSettingsLoading(false);
      }
    }
    fetchSettings();
  }, []);

  const handleSaveWhatsapp = async () => {
    try {
        const res = await fetch("/api/admin/settings", {
            method: "POST",
            body: JSON.stringify({
                key: "whatsapp_group_url",
                value: whatsappUrl
            })
        });
        
        if (res.ok) {
            toast.success("WhatsApp 連結已更新");
        } else {
            toast.error("更新失敗");
        }
    } catch (e) {
        toast.error("發生錯誤");
    }
  };

  const handleChangePassword = async () => {
    // Validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("請填寫所有密碼欄位");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("新密碼與確認密碼不符");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("新密碼至少需要 6 個字元");
      return;
    }

    setIsChangingPassword(true);

    try {
      const supabase = createClient();
      
      // First, verify current password by trying to sign in
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user?.email) {
        toast.error("無法取得用戶資料");
        return;
      }

      // Try to sign in with current password to verify
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: currentPassword
      });

      if (signInError) {
        toast.error("目前密碼不正確");
        return;
      }

      // Update password
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (updateError) {
        toast.error("更新密碼失敗：" + updateError.message);
        return;
      }

      toast.success("密碼已成功更新！");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      console.error("Password change error:", error);
      toast.error("發生錯誤：" + error.message);
    } finally {
      setIsChangingPassword(false);
    }
  };
  
  // Local state for Analytics - GA4 is hardcoded in layout.tsx
  const [analytics, setAnalytics] = useState({
    ga4Id: "G-E0ST5J83F7",
    metaPixelId: ""
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
            <MessageCircle className="h-5 w-5" /> 社群設定
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid gap-2">
                <Label>WhatsApp 討論群連結</Label>
                <div className="flex gap-2">
                    <Input 
                        placeholder="https://chat.whatsapp.com/..." 
                        value={whatsappUrl}
                        onChange={(e) => setWhatsappUrl(e.target.value)}
                    />
                    <Button onClick={handleSaveWhatsapp} disabled={isSettingsLoading}>
                        <Save className="h-4 w-4 mr-2" /> 儲存
                    </Button>
                </div>
                <p className="text-xs text-gray-500">更新後，前台的 Navbar、Footer 和優惠詳情頁將自動更新連結。</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Password Change Section */}
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg dark:text-white flex items-center gap-2">
            <Key className="h-5 w-5" /> 更改密碼
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label>目前密碼</Label>
            <div className="relative">
              <Input 
                type={showCurrentPassword ? "text" : "password"}
                placeholder="輸入目前密碼" 
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          
          <div className="grid gap-2">
            <Label>新密碼</Label>
            <div className="relative">
              <Input 
                type={showNewPassword ? "text" : "password"}
                placeholder="輸入新密碼（至少 6 個字元）" 
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          
          <div className="grid gap-2">
            <Label>確認新密碼</Label>
            <Input 
              type="password"
              placeholder="再次輸入新密碼" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {confirmPassword && newPassword !== confirmPassword && (
              <p className="text-xs text-red-500">密碼不符</p>
            )}
          </div>
          
          <Button 
            onClick={handleChangePassword} 
            disabled={isChangingPassword || !currentPassword || !newPassword || !confirmPassword || newPassword !== confirmPassword}
            className="w-full sm:w-auto"
          >
            {isChangingPassword ? "更新中..." : "更新密碼"}
          </Button>
        </CardContent>
      </Card>

      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg dark:text-white flex items-center gap-2">
            <Database className="h-5 w-5" /> 資料庫管理
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">重置並更新卡片資料 (Re-seed)</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                將最新的代碼庫卡片資料 (包括新規則說明) 強制更新至 Supabase。這將覆蓋現有的卡片設定。
              </p>
            </div>
            <Button 
                variant="outline" 
                onClick={async () => {
                    if (confirm("確定要強制更新所有卡片資料嗎？這將會覆蓋現有資料庫中的卡片描述。")) {
                        try {
                            const res = await fetch("/api/admin/seed-cards");
                            const data = await res.json();
                            if (res.ok) {
                                toast.success(`成功更新 ${data.count} 張卡片`);
                            } else {
                                toast.error(`更新失敗: ${data.error}`);
                            }
                        } catch (e) {
                            toast.error("請求失敗");
                        }
                    }
                }}
            >
              更新卡片資料
            </Button>
          </div>
          
          <div className="flex items-center justify-between border-t dark:border-gray-700 pt-6">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">重置並更新商戶資料</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                將最新的代碼庫商戶資料 (包括 icon、分類) 強制更新至 Supabase。
              </p>
            </div>
            <Button 
                variant="outline" 
                onClick={async () => {
                    if (confirm("確定要強制更新所有商戶資料嗎？")) {
                        try {
                            const res = await fetch("/api/admin/seed-merchants");
                            const data = await res.json();
                            if (res.ok) {
                                toast.success(data.message || `成功更新商戶資料`);
                            } else {
                                toast.error(`更新失敗: ${data.error}`);
                            }
                        } catch (e) {
                            toast.error("請求失敗");
                        }
                    }
                }}
            >
              更新商戶資料
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
                <div className="flex items-center gap-2">
                  <Input 
                      value={analytics.ga4Id}
                      readOnly
                      className="bg-gray-100 dark:bg-gray-700"
                  />
                  <span className="text-xs px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full whitespace-nowrap">
                    已啟用
                  </span>
                </div>
                <p className="text-xs text-gray-500">GA4 追蹤碼已在全站啟用。如需更改，請聯繫開發人員。</p>
            </div>
            <div className="grid gap-2">
                <Label>Meta (Facebook) Pixel ID</Label>
                <Input 
                    placeholder="XXXXXXXXXXXXXXX" 
                    value={analytics.metaPixelId}
                    onChange={(e) => setAnalytics({...analytics, metaPixelId: e.target.value})}
                    disabled
                />
                <p className="text-xs text-gray-500">Meta Pixel 尚未設定。如需啟用，請聯繫開發人員。</p>
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

