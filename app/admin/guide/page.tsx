"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BadgeCheck, Calculator, Tag, Database, ShieldAlert } from "lucide-react";

export default function AdminGuidePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">系統說明書</h1>
        <p className="text-gray-500 dark:text-gray-400">
          在此查閱 PickCardRebate 的核心運作機制與管理員指南。
        </p>
      </div>

      <Tabs defaultValue="verification" className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto">
          <TabsTrigger value="verification" className="py-3 gap-2">
            <BadgeCheck className="w-4 h-4" /> 社群驗證機制
          </TabsTrigger>
          <TabsTrigger value="calculator" className="py-3 gap-2">
            <Calculator className="w-4 h-4" /> 回贈計算邏輯
          </TabsTrigger>
          <TabsTrigger value="tags" className="py-3 gap-2">
            <Tag className="w-4 h-4" /> 眾包標籤系統
          </TabsTrigger>
          <TabsTrigger value="data" className="py-3 gap-2">
            <Database className="w-4 h-4" /> 數據架構
          </TabsTrigger>
        </TabsList>

        {/* Community Verification Tab */}
        <TabsContent value="verification" className="mt-6 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-600">
                <BadgeCheck className="w-5 h-5" /> 社群已驗證 (Community Verified)
              </CardTitle>
              <CardDescription>
                如何透過用戶回報來建立數據的可信度。
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-800">
                <h3 className="font-bold text-green-800 dark:text-green-300 mb-2">核心概念</h3>
                <p>當用戶在前端點擊「回報錯誤」並選擇「回報成功 (Verification)」時，系統會記錄這筆「驗證情報」。經過管理員審核通過後，該信用卡在該商戶的計算結果中就會顯示「✅ 社群已驗證」徽章。</p>
              </div>

              <div className="grid gap-4 md:grid-cols-2 mt-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">1. 用戶提交</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>用戶在計算機結果頁點擊旗幟圖標。</li>
                    <li>選擇「回報類型：回報成功」。</li>
                    <li>填寫備註（例如：剛收到月結單確認）。</li>
                    <li>提交後，數據存入 <code>merchant_reviews</code> 表，狀態為 <code>pending</code>。</li>
                  </ul>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">2. 管理員審核</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>前往 <a href="/admin/moderation" className="text-blue-500 hover:underline">回報審核</a> 頁面。</li>
                    <li>查看帶有綠色標籤的回報。</li>
                    <li>點擊「驗證並通過」。</li>
                    <li>系統將狀態更新為 <code>verified</code>。</li>
                  </ul>
                </div>
              </div>

              <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
                <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">3. 前端顯示邏輯</h4>
                <p>
                  當用戶搜尋某商戶時，系統會即時查詢該商戶是否有狀態為 <code>verified</code> 的回報記錄。
                  如果有，則對應的信用卡卡片上會顯示綠色勾勾徽章。這能給予其他用戶極大的信心。
                </p>
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
                為了確保準確性，系統會按照以下順序嘗試匹配信用卡的優惠規則。一旦匹配成功，就會採用該規則的回贈率，不再繼續往下匹配（除非有特殊疊加規則）。
              </p>
              
              <div className="space-y-2">
                <div className="flex items-start gap-3 p-3 border rounded-lg">
                  <BadgeCheck className="w-5 h-5 text-purple-500 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">Level 1: 指定商戶 (Merchant Match)</h4>
                    <p>最高優先級。例如：DBS Eminent 在「健身中心」有 5%。如果規則明確指定了商戶 ID 或名稱，系統優先採用。</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 border rounded-lg">
                  <Tag className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">Level 2: 指定類別 (Category Match)</h4>
                    <p>如果沒有指定商戶優惠，系統會檢查商戶的「類別」（如餐飲、網購）。例如：HSBC Visa Signature 在「最紅自主獎賞-餐飲」有 3.6%。</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 border rounded-lg">
                  <ShieldAlert className="w-5 h-5 text-orange-500 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">Level 3: 支付方式 (Payment Method)</h4>
                    <p>檢查用戶選擇的支付方式。例如：中信 Motion 卡在「網上/手機支付」有 6%。這通常會作為備選或與類別並列。</p>
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
                <h4 className="font-bold mb-2">特殊限制處理</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>簽賬上限 (Cap)</strong>：如果計算出的回贈超過上限，系統會顯示「已達上限」並只計算有效部分的回贈。</li>
                  <li><strong>最低簽賬 (Min Spend)</strong>：如果輸入金額低於最低要求，該規則將被忽略。</li>
                  <li><strong>排除條件 (Exclusions)</strong>：例如有些卡的基本回贈排除「電子錢包」或「繳費」。</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tags System Tab */}
        <TabsContent value="tags" className="mt-6 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-600">
                <Tag className="w-5 h-5" /> 眾包標籤系統 (Crowdsourced Tags)
              </CardTitle>
              <CardDescription>
                利用群眾智慧為商戶貼標籤。
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              <p>
                有些商戶的類別模糊（例如：HKTVMall 是超市還是網購？），這會影響回贈計算。我們允許用戶為商戶添加標籤。
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg text-center">
                  <div className="text-2xl font-bold text-orange-500 mb-2">收集</div>
                  <p className="text-xs">用戶在回報時選擇標籤（如 #需登記 #網購）。</p>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <div className="text-2xl font-bold text-orange-500 mb-2">聚合</div>
                  <p className="text-xs">系統統計每個商戶下各標籤的出現次數。</p>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <div className="text-2xl font-bold text-orange-500 mb-2">展示</div>
                  <p className="text-xs">在計算機輸入框上方顯示最熱門的 3 個標籤，輔助用戶判斷。</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Data Structure Tab */}
        <TabsContent value="data" className="mt-6 space-y-4">
           <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-600">
                <Database className="w-5 h-5" /> 數據架構 (Database)
              </CardTitle>
              <CardDescription>
                了解系統後台的資料關聯。
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b dark:border-gray-700">
                                <th className="py-2 px-4 font-semibold">資料表 (Table)</th>
                                <th className="py-2 px-4 font-semibold">用途</th>
                                <th className="py-2 px-4 font-semibold">關鍵欄位</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y dark:divide-gray-700">
                            <tr>
                                <td className="py-2 px-4 font-mono text-blue-600">cards</td>
                                <td className="py-2 px-4">儲存所有信用卡的基本資料與規則。</td>
                                <td className="py-2 px-4 font-mono text-xs">id, name, rules (jsonb)</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 font-mono text-blue-600">merchants</td>
                                <td className="py-2 px-4">商戶資料庫，包含類別與 Logo。</td>
                                <td className="py-2 px-4 font-mono text-xs">id, name, categoryIds</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 font-mono text-blue-600">merchant_reviews</td>
                                <td className="py-2 px-4">用戶提交的回報與驗證情報。</td>
                                <td className="py-2 px-4 font-mono text-xs">status, actual_rate, conditions</td>
                            </tr>
                             <tr>
                                <td className="py-2 px-4 font-mono text-blue-600">merchant_tags</td>
                                <td className="py-2 px-4">商戶的眾包標籤統計。</td>
                                <td className="py-2 px-4 font-mono text-xs">tag_name, count</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </CardContent>
           </Card>
        </TabsContent>

      </Tabs>
    </div>
  );
}

