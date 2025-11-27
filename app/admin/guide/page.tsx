"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BadgeCheck, Calculator, Tag, Database, ShieldAlert, Server, HardDrive, GitCommit } from "lucide-react";

export default function AdminGuidePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">系統說明書</h1>
        <p className="text-gray-500 dark:text-gray-400">
          在此查閱 PickCardRebate 的核心運作機制與管理員指南。
        </p>
      </div>

      <Tabs defaultValue="architecture" className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 h-auto">
          <TabsTrigger value="architecture" className="py-3 gap-2">
            <Server className="w-4 h-4" /> 系統架構
          </TabsTrigger>
          <TabsTrigger value="calculator" className="py-3 gap-2">
            <Calculator className="w-4 h-4" /> 回贈邏輯
          </TabsTrigger>
          <TabsTrigger value="verification" className="py-3 gap-2">
            <BadgeCheck className="w-4 h-4" /> 社群驗證
          </TabsTrigger>
          <TabsTrigger value="miles" className="py-3 gap-2">
            <Tag className="w-4 h-4" /> 里數設定
          </TabsTrigger>
          <TabsTrigger value="changelog" className="py-3 gap-2">
            <GitCommit className="w-4 h-4" /> 更新日誌
          </TabsTrigger>
        </TabsList>

        {/* System Architecture Tab */}
        <TabsContent value="architecture" className="mt-6 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-indigo-600">
                <Server className="w-5 h-5" /> 系統架構與權限 (API & RLS)
              </CardTitle>
              <CardDescription>
                了解最新的後端運作模式，確保管理後台穩定性。
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              <div className="border-l-4 border-indigo-500 pl-4 py-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-r">
                <p className="font-bold text-indigo-900 dark:text-indigo-200">
                  核心變更：API Route 接管模式
                </p>
                <p className="mt-1">
                  為了徹底解決客戶端權限 (RLS) 導致的「無限載入」問題，管理後台已全面升級為 <strong>Server-Side API</strong> 模式。
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mt-4">
                <div className="p-4 border rounded-lg dark:border-gray-700">
                  <h4 className="font-bold mb-2 flex items-center gap-2">
                    <HardDrive className="w-4 h-4" /> 數據存取
                  </h4>
                  <p>
                    前端頁面 (Dashboard, Moderation, Logs) 不再直接連接 Supabase，而是呼叫 Next.js API Routes (<code>/api/admin/*</code>)。
                    後端 API 使用 Service Role 權限直接讀寫資料庫，繞過瀏覽器端的限制。
                  </p>
                </div>
                <div className="p-4 border rounded-lg dark:border-gray-700">
                  <h4 className="font-bold mb-2 flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4" /> 圖片儲存
                  </h4>
                  <p>
                    系統已啟用 <strong>Supabase Storage</strong>。在「信用卡管理」和「商戶管理」中，您可以直接上傳圖片。
                    圖片會自動存入 <code>images</code> bucket 並生成公開連結。建議信用卡尺寸為 300x190px。
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Calculator Logic Tab */}
        <TabsContent value="calculator" className="mt-6 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-600">
                <Calculator className="w-5 h-5" /> 回贈計算邏輯 (The Algorithm)
              </CardTitle>
              <CardDescription>
                系統如何決定哪張卡最抵。
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              <div className="border-l-4 border-blue-500 pl-4 py-1 bg-blue-50 dark:bg-blue-900/20">
                <p className="font-medium text-blue-900 dark:text-blue-200">
                  計算核心：匹配優先級 (Match Priority)
                </p>
              </div>
              <p>
                為了確保準確性，系統會按照以下順序嘗試匹配信用卡的優惠規則。
              </p>
              
              <div className="space-y-2">
                <div className="flex items-start gap-3 p-3 border rounded-lg">
                  <BadgeCheck className="w-5 h-5 text-purple-500 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">Level 1: 指定商戶 (Merchant Match)</h4>
                    <p>最高優先級。例如：DBS Eminent 在「健身中心」有 5%。</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 border rounded-lg">
                  <Tag className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">Level 2: 指定類別 (Category Match)</h4>
                    <p>如果沒有指定商戶優惠，系統會檢查商戶的「類別」（如餐飲、網購）。</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 border rounded-lg">
                  <ShieldAlert className="w-5 h-5 text-orange-500 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">Level 3: 支付方式 (Payment Method)</h4>
                    <p>檢查用戶選擇的支付方式。例如：中信 Motion 卡在「網上/手機支付」有 6%。</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 border rounded-lg">
                  <Database className="w-5 h-5 text-gray-500 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">Level 4: 基本回贈 (Base Rate)</h4>
                    <p>如果以上都沒匹配，則使用卡片的基本回贈率（通常是 0.4% 或 1.5%）。</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <h4 className="font-bold mb-2">特殊設定：網上商戶 (Online Only)</h4>
                <p>
                  前往 <a href="/admin/merchants" className="text-blue-500 hover:underline">商戶管理</a>，將商戶標記為「純網上」，
                  系統會自動鎖定場景為「網上付款」，確保網購卡被正確觸發。
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Community Verification Tab */}
        <TabsContent value="verification" className="mt-6 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-600">
                <BadgeCheck className="w-5 h-5" /> 社群驗證機制
              </CardTitle>
              <CardDescription>
                如何透過用戶回報來建立數據的可信度。
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">1. 用戶提交</h4>
                  <p>用戶在前端點擊「回報錯誤」並選擇「回報成功」，提交驗證情報。</p>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">2. 管理員審核</h4>
                  <p>在 <a href="/admin/moderation" className="text-blue-500 hover:underline">回報審核</a> 頁面通過後，該卡片會獲得「✅ 社群已驗證」徽章。</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Miles Logic Tab */}
        <TabsContent value="miles" className="mt-6 space-y-4">
           <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-600">
                <Tag className="w-5 h-5" /> 里數設定 (Miles Configuration)
              </CardTitle>
              <CardDescription>
                如何設定信用卡的回贈兌換比率。
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm space-y-4">
                <p className="text-gray-600 dark:text-gray-300">
                    若要讓信用卡支援里數顯示，需在後台設定 <code>rewardConfig</code>。
                </p>
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg font-mono text-xs overflow-x-auto">
                    <p className="text-gray-500 mb-2">// 範例：HSBC Visa Signature (1 RC = 10 Miles)</p>
                    <pre>{`{
  "source": "RC",
  "ratio": 10
}`}</pre>
                    <p className="text-gray-500 mt-4 mb-2">// 範例：Citi Prestige (12 Points = 1 Mile -&gt; Ratio = 1/12 = 0.0833)</p>
                    <pre>{`{
  "source": "Points",
  "ratio": 0.0833
}`}</pre>
                </div>
            </CardContent>
           </Card>
        </TabsContent>

        {/* Changelog Tab */}
        <TabsContent value="changelog" className="mt-6 space-y-4">
           <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <GitCommit className="w-5 h-5" /> 更新日誌管理
              </CardTitle>
              <CardDescription>
                記錄網站的成長歷程。
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm space-y-4">
                <p>
                    前往 <a href="/admin/changelog" className="text-blue-500 hover:underline font-bold">更新日誌頁面</a> 來發佈新的版本記錄。
                </p>
                <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300">
                    <li><strong>Feature</strong>: 新增功能 (綠色)</li>
                    <li><strong>Fix</strong>: 錯誤修復 (紅色)</li>
                    <li><strong>Improvement</strong>: 效能或體驗優化 (藍色)</li>
                </ul>
            </CardContent>
           </Card>
        </TabsContent>

      </Tabs>
    </div>
  );
}
