"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DEFAULT_SYSTEM_SETTINGS, SystemSetting } from "@/lib/admin/mock-data";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SystemSetting[]>(DEFAULT_SYSTEM_SETTINGS);
  const [saved, setSaved] = useState(false);

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

