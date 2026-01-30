"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { 
  Database, 
  RefreshCw, 
  Upload, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle,
  CreditCard,
  FileText,
  Settings,
  ArrowRight,
  Trash2,
  Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Link from "next/link";

interface MigrationStatus {
  database: {
    cards: number;
    rules: number;
    notes: number;
    promos: number;
    faqs: number;
  };
  local: {
    cards: number;
    rules: number;
    promos: number;
    faqs: number;
  };
  synced: {
    cards: boolean;
    promos: boolean;
  };
}

export default function DatabaseAdminPage() {
  const [status, setStatus] = useState<MigrationStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [migrating, setMigrating] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
    if (user) {
      fetchStatus();
    } else {
      setLoading(false);
    }
  };

  const fetchStatus = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/migrate-to-db");
      if (response.ok) {
        const data = await response.json();
        setStatus(data);
      }
    } catch (error) {
      console.error("Failed to fetch status:", error);
      toast.error("無法獲取狀態");
    } finally {
      setLoading(false);
    }
  };

  const runMigration = async (mode: "cards" | "promos" | "all", clearExisting: boolean = false) => {
    if (!confirm(clearExisting 
      ? `確定要清除現有數據並重新匯入${mode === "all" ? "所有" : mode === "cards" ? "卡片" : "文章"}數據嗎？`
      : `確定要匯入${mode === "all" ? "所有" : mode === "cards" ? "卡片" : "文章"}數據嗎？`
    )) {
      return;
    }

    setMigrating(true);
    try {
      const response = await fetch("/api/admin/migrate-to-db", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode, clearExisting }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("遷移完成！");
        console.log("Migration results:", data.results);
        
        // Show detailed results
        const results = data.results;
        const summary = [
          `卡片: ${results.cards.inserted} 張`,
          `規則: ${results.rules.inserted} 條`,
          `備註: ${results.notes.inserted} 條`,
          `文章: ${results.promos.inserted} 篇`,
          `FAQ: ${results.faqs.inserted} 條`,
        ].join(" | ");
        
        toast.info(summary);
        
        // Show errors if any
        const allErrors = [
          ...results.cards.errors,
          ...results.rules.errors,
          ...results.notes.errors,
          ...results.promos.errors,
          ...results.faqs.errors,
        ];
        
        if (allErrors.length > 0) {
          console.error("Migration errors:", allErrors);
          toast.warning(`有 ${allErrors.length} 個錯誤，請查看 console`);
        }
        
        fetchStatus();
      } else {
        toast.error(data.error || "遷移失敗");
      }
    } catch (error) {
      console.error("Migration error:", error);
      toast.error("遷移過程發生錯誤");
    } finally {
      setMigrating(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <Database className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">需要登入</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">請先登入以訪問數據庫管理</p>
          <Link href="/login">
            <Button>登入</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Database className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">數據庫管理</h1>
              <p className="text-sm text-gray-500">管理信用卡、計算規則、優惠文章數據</p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={fetchStatus}
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            刷新狀態
          </Button>
        </div>

        {/* Status Cards */}
        {status && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatusCard
              title="信用卡"
              icon={CreditCard}
              dbCount={status.database.cards}
              localCount={status.local.cards}
              synced={status.synced.cards}
            />
            <StatusCard
              title="計算規則"
              icon={Settings}
              dbCount={status.database.rules}
              localCount={status.local.rules}
              synced={status.database.rules >= status.local.rules}
            />
            <StatusCard
              title="優惠文章"
              icon={FileText}
              dbCount={status.database.promos}
              localCount={status.local.promos}
              synced={status.synced.promos}
            />
            <StatusCard
              title="FAQ"
              icon={FileText}
              dbCount={status.database.faqs}
              localCount={status.local.faqs}
              synced={status.database.faqs >= status.local.faqs}
            />
          </div>
        )}

        {/* Migration Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Upload className="h-5 w-5" />
            數據遷移
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Migrate Cards */}
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
              <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-2">匯入卡片數據</h3>
              <p className="text-sm text-blue-700 dark:text-blue-300 mb-4">
                從 cards.ts 匯入卡片、計算規則、備註
              </p>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => runMigration("cards", false)}
                  disabled={migrating}
                >
                  {migrating ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4 mr-1" />}
                  匯入
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => runMigration("cards", true)}
                  disabled={migrating}
                  className="text-red-600 border-red-200 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  清除並重新匯入
                </Button>
              </div>
            </div>

            {/* Migrate Promos */}
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-800">
              <h3 className="font-medium text-green-900 dark:text-green-100 mb-2">匯入文章數據</h3>
              <p className="text-sm text-green-700 dark:text-green-300 mb-4">
                從 promos.ts 匯入優惠文章、FAQ
              </p>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => runMigration("promos", false)}
                  disabled={migrating}
                >
                  {migrating ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4 mr-1" />}
                  匯入
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => runMigration("promos", true)}
                  disabled={migrating}
                  className="text-red-600 border-red-200 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  清除並重新匯入
                </Button>
              </div>
            </div>

            {/* Migrate All */}
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-100 dark:border-purple-800">
              <h3 className="font-medium text-purple-900 dark:text-purple-100 mb-2">匯入全部數據</h3>
              <p className="text-sm text-purple-700 dark:text-purple-300 mb-4">
                一次過匯入所有卡片和文章數據
              </p>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => runMigration("all", false)}
                  disabled={migrating}
                >
                  {migrating ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4 mr-1" />}
                  匯入全部
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => runMigration("all", true)}
                  disabled={migrating}
                  className="text-red-600 border-red-200 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  清除並重建
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">數據管理</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/admin/database/cards" className="block p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-5 w-5 text-blue-600" />
                  <span className="font-medium text-gray-900 dark:text-white">信用卡管理</span>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-400" />
              </div>
              <p className="text-sm text-gray-500 mt-1">新增、編輯、刪除信用卡</p>
            </Link>

            <Link href="/admin/database/rules" className="block p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Settings className="h-5 w-5 text-green-600" />
                  <span className="font-medium text-gray-900 dark:text-white">計算規則管理</span>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-400" />
              </div>
              <p className="text-sm text-gray-500 mt-1">管理回贈計算規則</p>
            </Link>

            <Link href="/admin/database/promos" className="block p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-purple-600" />
                  <span className="font-medium text-gray-900 dark:text-white">優惠文章管理</span>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-400" />
              </div>
              <p className="text-sm text-gray-500 mt-1">管理優惠文章和 FAQ</p>
            </Link>

            <Link href="/admin/card-terms" className="block p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-orange-600" />
                  <span className="font-medium text-gray-900 dark:text-white">條款管理 (舊)</span>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-400" />
              </div>
              <p className="text-sm text-gray-500 mt-1">card-terms.ts 管理</p>
            </Link>
          </div>
        </div>

        {/* Notes */}
        <div className="mt-8 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
          <h3 className="font-medium text-amber-900 dark:text-amber-100 mb-2 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            注意事項
          </h3>
          <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1">
            <li>• 首次使用需要先執行 SQL Migration（在 Supabase Dashboard 運行 migration 檔案）</li>
            <li>• 「清除並重新匯入」會刪除資料庫中的現有數據</li>
            <li>• 匯入過程中會自動跳過已存在的記錄（使用 upsert）</li>
            <li>• card-terms.ts 暫時保留作為備份，待確認數據庫正常後可刪除</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// Status Card Component
function StatusCard({ 
  title, 
  icon: Icon, 
  dbCount, 
  localCount, 
  synced 
}: { 
  title: string;
  icon: any;
  dbCount: number;
  localCount: number;
  synced: boolean;
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Icon className="h-5 w-5 text-gray-400" />
          <span className="font-medium text-gray-900 dark:text-white">{title}</span>
        </div>
        {synced ? (
          <CheckCircle2 className="h-5 w-5 text-green-500" />
        ) : (
          <XCircle className="h-5 w-5 text-red-500" />
        )}
      </div>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded">
          <p className="text-gray-500 dark:text-gray-400">資料庫</p>
          <p className="text-lg font-bold text-gray-900 dark:text-white">{dbCount}</p>
        </div>
        <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded">
          <p className="text-gray-500 dark:text-gray-400">本地檔案</p>
          <p className="text-lg font-bold text-gray-900 dark:text-white">{localCount}</p>
        </div>
      </div>
    </div>
  );
}

