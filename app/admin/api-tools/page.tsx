"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  Database, 
  CreditCard, 
  Store, 
  Image, 
  RefreshCw, 
  Trash2, 
  Download,
  ExternalLink,
  Copy,
  Check,
  Play,
  EyeOff,
  Smartphone,
  Calculator,
  Trophy,
  BookOpen
} from "lucide-react";
import { toast } from "sonner";

interface ApiTool {
  id: string;
  name: string;
  description: string;
  endpoint: string;
  method: "GET" | "POST";
  icon: React.ReactNode;
  category: string;
  params?: string;
  body?: string;
  dangerous?: boolean;
}

const API_TOOLS: ApiTool[] = [
  // 數據同步
  {
    id: "seed-cards",
    name: "同步信用卡數據",
    description: "將所有本地信用卡數據同步到 DB，保留已上傳的封面圖",
    endpoint: "/api/admin/seed-cards",
    method: "GET",
    icon: <CreditCard className="w-5 h-5" />,
    category: "數據同步",
  },
  {
    id: "seed-merchants",
    name: "同步商戶數據",
    description: "將所有本地商戶數據同步到 DB，保留已上傳的 logo，並檢測孤兒記錄",
    endpoint: "/api/admin/seed-merchants",
    method: "GET",
    icon: <Store className="w-5 h-5" />,
    category: "數據同步",
  },
  {
    id: "delete-orphan-merchants",
    name: "刪除孤兒商戶",
    description: "刪除 DB 中存在但本地數據沒有的商戶記錄",
    endpoint: "/api/admin/seed-merchants",
    method: "POST",
    icon: <Trash2 className="w-5 h-5" />,
    category: "數據同步",
    body: JSON.stringify({ action: "delete-orphans" }),
    dangerous: true,
  },
  
  // 圖片工具
  {
    id: "check-card-images",
    name: "檢查信用卡圖片狀態",
    description: "檢查所有信用卡的圖片狀態（DB圖片/靜態圖片/無圖片）",
    endpoint: "/api/admin/check-card-images",
    method: "GET",
    icon: <CreditCard className="w-5 h-5" />,
    category: "圖片工具",
  },
  {
    id: "sync-card-images-preview",
    name: "預覽同步信用卡圖片",
    description: "預覽哪些卡需要從 cards.ts 同步圖片到 DB",
    endpoint: "/api/admin/sync-card-images",
    method: "GET",
    icon: <RefreshCw className="w-5 h-5" />,
    category: "圖片工具",
  },
  {
    id: "sync-card-images",
    name: "執行同步信用卡圖片",
    description: "將 cards.ts 中的圖片 URL 同步到 DB（只更新 DB 沒有圖片的卡）",
    endpoint: "/api/admin/sync-card-images",
    method: "POST",
    icon: <RefreshCw className="w-5 h-5" />,
    category: "圖片工具",
  },
  {
    id: "sync-hidden-preview",
    name: "預覽同步隱藏狀態",
    description: "預覽哪些卡的 hidden 狀態需要從 cards.ts 同步到 DB",
    endpoint: "/api/admin/sync-hidden-status",
    method: "GET",
    icon: <EyeOff className="w-5 h-5" />,
    category: "數據同步",
  },
  {
    id: "sync-hidden",
    name: "執行同步隱藏狀態",
    description: "將 cards.ts 中的 hidden 狀態同步到 DB",
    endpoint: "/api/admin/sync-hidden-status",
    method: "POST",
    icon: <EyeOff className="w-5 h-5" />,
    category: "數據同步",
  },
  {
    id: "check-merchant-logos",
    name: "檢查商戶圖片狀態",
    description: "檢查 DB 中所有商戶的 logo 類型（已上傳/Clearbit/Emoji）",
    endpoint: "/api/admin/check-merchant-logos",
    method: "GET",
    icon: <Image className="w-5 h-5" />,
    category: "圖片工具",
  },
  {
    id: "recover-card-images",
    name: "恢復信用卡圖片",
    description: "掃描 Storage 中的信用卡圖片，嘗試恢復到 DB",
    endpoint: "/api/admin/recover-card-images",
    method: "GET",
    icon: <Image className="w-5 h-5" />,
    category: "圖片工具",
  },
  {
    id: "fix-card-images-preview",
    name: "預覽修復卡片圖片 URL",
    description: "檢查使用舊 URL (api.pickcardrebate.com) 的卡片",
    endpoint: "/api/admin/fix-card-images",
    method: "GET",
    icon: <Image className="w-5 h-5" />,
    category: "圖片工具",
  },
  {
    id: "fix-card-images",
    name: "執行修復卡片圖片 URL",
    description: "將舊 URL 更新為新的 Zeabur Supabase URL",
    endpoint: "/api/admin/fix-card-images",
    method: "POST",
    icon: <RefreshCw className="w-5 h-5" />,
    category: "圖片工具",
  },
  {
    id: "download-merchant-logos",
    name: "列出 Clearbit Logo",
    description: "列出所有使用 Clearbit logo 的商戶（伺服器端下載已被 Clearbit 封鎖，請使用 /tools/download-logos）",
    endpoint: "/api/admin/download-merchant-logos?action=list",
    method: "GET",
    icon: <Download className="w-5 h-5" />,
    category: "圖片工具",
  },
  
  // 數據查詢
  {
    id: "get-cards",
    name: "獲取所有信用卡",
    description: "從 DB 獲取所有信用卡數據",
    endpoint: "/api/admin/cards",
    method: "GET",
    icon: <Database className="w-5 h-5" />,
    category: "數據查詢",
  },
  {
    id: "get-merchants",
    name: "獲取所有商戶",
    description: "從 DB 獲取所有商戶數據",
    endpoint: "/api/admin/merchants",
    method: "GET",
    icon: <Database className="w-5 h-5" />,
    category: "數據查詢",
  },
  {
    id: "get-promos",
    name: "獲取所有優惠",
    description: "從 DB 獲取所有優惠數據",
    endpoint: "/api/admin/promos",
    method: "GET",
    icon: <Database className="w-5 h-5" />,
    category: "數據查詢",
  },
  
  // Mobile App API
  {
    id: "mobile-cards",
    name: "Mobile - 獲取信用卡",
    description: "供 Mobile App 使用的信用卡 API，包含圖片和排行數據",
    endpoint: "/api/mobile/cards",
    method: "GET",
    icon: <Smartphone className="w-5 h-5" />,
    category: "Mobile App API",
  },
  {
    id: "mobile-merchants",
    name: "Mobile - 獲取商戶",
    description: "供 Mobile App 使用的商戶 API，包含後台上傳的 logo",
    endpoint: "/api/mobile/merchants",
    method: "GET",
    icon: <Store className="w-5 h-5" />,
    category: "Mobile App API",
  },
  {
    id: "mobile-calculate",
    name: "Mobile - 計算回贈",
    description: "核心計算 API，輸入商戶和金額計算最佳信用卡回贈",
    endpoint: "/api/mobile/calculate",
    method: "POST",
    icon: <Calculator className="w-5 h-5" />,
    category: "Mobile App API",
    body: JSON.stringify({ query: "惠康", amount: 500, paymentMethod: "physical_card", limit: 5 }),
  },
  {
    id: "mobile-rankings",
    name: "Mobile - 獲取排行榜",
    description: "按類別獲取信用卡回贈排行榜",
    endpoint: "/api/mobile/rankings?category=supermarket&limit=5",
    method: "GET",
    icon: <Trophy className="w-5 h-5" />,
    category: "Mobile App API",
  },
  {
    id: "mobile-promos",
    name: "Mobile - 獲取優惠文章",
    description: "獲取優惠和攻略文章列表",
    endpoint: "/api/mobile/promos?limit=10",
    method: "GET",
    icon: <BookOpen className="w-5 h-5" />,
    category: "Mobile App API",
  },
];

const TOOL_PAGES = [
  {
    name: "下載商戶 Logo",
    description: "從 Clearbit 下載商戶 logo 並上傳到 Storage（瀏覽器端）",
    path: "/tools/download-logos",
    icon: <Download className="w-5 h-5" />,
  },
  {
    name: "恢復信用卡圖片",
    description: "掃描 Storage 中的圖片並恢復到 DB",
    path: "/admin/recover-images",
    icon: <Image className="w-5 h-5" />,
  },
];

export default function ApiToolsPage() {
  const [loading, setLoading] = useState<string | null>(null);
  const [results, setResults] = useState<Record<string, any>>({});
  const [copied, setCopied] = useState<string | null>(null);

  const runApi = async (tool: ApiTool) => {
    if (tool.dangerous && !confirm(`確定要執行「${tool.name}」？此操作可能會刪除數據！`)) {
      return;
    }

    setLoading(tool.id);
    try {
      const options: RequestInit = {
        method: tool.method,
      };

      if (tool.method === "POST" && tool.body) {
        options.headers = { "Content-Type": "application/json" };
        options.body = tool.body;
      }

      const res = await fetch(tool.endpoint, options);
      const data = await res.json();
      
      setResults(prev => ({ ...prev, [tool.id]: data }));
      
      if (data.error) {
        toast.error(`錯誤: ${data.error}`);
      } else {
        toast.success(`${tool.name} 執行成功`);
      }
    } catch (err: any) {
      toast.error(`執行失敗: ${err.message}`);
      setResults(prev => ({ ...prev, [tool.id]: { error: err.message } }));
    } finally {
      setLoading(null);
    }
  };

  const copyEndpoint = (endpoint: string, id: string) => {
    navigator.clipboard.writeText(`${window.location.origin}${endpoint}`);
    setCopied(id);
    toast.success("已複製到剪貼板");
    setTimeout(() => setCopied(null), 2000);
  };

  const categories = [...new Set(API_TOOLS.map(t => t.category))];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">API 工具</h1>
        <p className="text-gray-500 dark:text-gray-400">
          常用的管理 API 端點，方便快速執行數據同步和維護操作
        </p>
      </div>

      {/* Tool Pages */}
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg dark:text-white flex items-center gap-2">
            <ExternalLink className="w-5 h-5" />
            工具頁面
          </CardTitle>
          <CardDescription>需要在瀏覽器中操作的工具頁面</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2">
            {TOOL_PAGES.map(page => (
              <a
                key={page.path}
                href={page.path}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors dark:border-gray-700"
              >
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                  {page.icon}
                </div>
                <div className="flex-1">
                  <div className="font-medium dark:text-white">{page.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{page.description}</div>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400" />
              </a>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* API Tools by Category */}
      {categories.map(category => (
        <Card key={category} className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg dark:text-white">{category}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {API_TOOLS.filter(t => t.category === category).map(tool => (
              <div 
                key={tool.id} 
                className={`p-4 border rounded-lg dark:border-gray-700 ${
                  tool.dangerous ? 'border-red-200 bg-red-50/50 dark:border-red-900 dark:bg-red-900/10' : ''
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${
                      tool.dangerous 
                        ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                    }`}>
                      {tool.icon}
                    </div>
                    <div>
                      <div className="font-medium dark:text-white flex items-center gap-2">
                        {tool.name}
                        {tool.dangerous && (
                          <span className="text-xs px-2 py-0.5 bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300 rounded">
                            危險操作
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {tool.description}
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <code className="text-xs bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-gray-600 dark:text-gray-400">
                          {tool.method} {tool.endpoint}
                        </code>
                        <button
                          onClick={() => copyEndpoint(tool.endpoint, tool.id)}
                          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                          {copied === tool.id ? (
                            <Check className="w-4 h-4 text-green-500" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant={tool.dangerous ? "destructive" : "default"}
                    onClick={() => runApi(tool)}
                    disabled={loading === tool.id}
                  >
                    {loading === tool.id ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <Play className="w-4 h-4" />
                    )}
                    <span className="ml-2">執行</span>
                  </Button>
                </div>

                {/* Result */}
                {results[tool.id] && (
                  <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">執行結果：</div>
                    <pre className="text-xs text-gray-700 dark:text-gray-300 overflow-auto max-h-48">
                      {JSON.stringify(results[tool.id], null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      ))}

      {/* SQL Commands Reference */}
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg dark:text-white">常用 SQL 命令</CardTitle>
          <CardDescription>在 Supabase SQL Editor 中執行</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div>
              <div className="text-sm font-medium dark:text-white mb-1">查看所有信用卡圖片狀態</div>
              <code className="block text-xs bg-gray-100 dark:bg-gray-900 p-3 rounded text-gray-600 dark:text-gray-400">
                SELECT id, name, image_url FROM cards ORDER BY name;
              </code>
            </div>
            <div>
              <div className="text-sm font-medium dark:text-white mb-1">查看所有商戶</div>
              <code className="block text-xs bg-gray-100 dark:bg-gray-900 p-3 rounded text-gray-600 dark:text-gray-400">
                SELECT id, name, logo FROM merchants ORDER BY name;
              </code>
            </div>
            <div>
              <div className="text-sm font-medium dark:text-white mb-1">刪除重複商戶</div>
              <code className="block text-xs bg-gray-100 dark:bg-gray-900 p-3 rounded text-gray-600 dark:text-gray-400">
                DELETE FROM merchants WHERE id = &apos;舊的ID&apos;;
              </code>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

