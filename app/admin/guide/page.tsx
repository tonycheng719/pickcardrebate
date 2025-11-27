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
          <TabsTrigger value="online" className="py-3 gap-2">
            <ShieldAlert className="w-4 h-4" /> 網上商戶設定
          </TabsTrigger>
          <TabsTrigger value="miles" className="py-3 gap-2">
            <Tag className="w-4 h-4" /> 里數設定
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

        {/* Online Merchant Logic Tab */}
        <TabsContent value="online" className="mt-6 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-600">
                <ShieldAlert className="w-5 h-5" /> 網上商戶 (Online Merchants)
              </CardTitle>
              <CardDescription>
                如何處理純網上商戶（如 Klook, Deliveroo）的場景判斷。
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              <p>
                為了避免用戶混淆，系統支援將特定商戶標記為「純網上 (Online Only)」。
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-bold mb-2 text-gray-900 dark:text-white">設定方法</h4>
                  <p>前往 <a href="/admin/merchants" className="text-blue-500 hover:underline">商戶管理</a>，編輯商戶時選擇「商戶性質：純網上」。</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-bold mb-2 text-gray-900 dark:text-white">前端效果</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>當用戶選擇此商戶時，計算機自動將場景鎖定為「網上/App 內付款」。</li>
                    <li>隱藏「門市 vs 網上」的切換開關，減少用戶操作步驟。</li>
                    <li>確保如 Chill Card (網購 5%) 等網購專用卡能被正確觸發。</li>
                  </ul>
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
                    PickCardRebate 支援現金與里數雙模式。若要讓信用卡支援里數顯示，需在後台設定 <code>rewardConfig</code>。
                </p>
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg font-mono text-xs overflow-x-auto">
                    <p className="text-gray-500 mb-2">// 範例：HSBC Visa Signature (1 RC = 10 Miles)</p>
                    <pre>{`{
  "source": "RC",
  "ratio": 10
}`}</pre>
                    <p className="text-gray-500 mt-4 mb-2">// 範例：Citi Prestige (12 Points = 1 Mile -> Ratio = 1/12 = 0.0833)</p>
                    <pre>{`{
  "source": "Points",
  "ratio": 0.0833
}`}</pre>
                </div>
                <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300">
                    <li><strong>source</strong>: 積分單位名稱，如 RC, Points, DBS$。</li>
                    <li><strong>ratio</strong>: 兌換率。即 1 單位積分可換多少里數。</li>
                </ul>
            </CardContent>
           </Card>
        </TabsContent>

      </Tabs>
    </div>
  );
}

