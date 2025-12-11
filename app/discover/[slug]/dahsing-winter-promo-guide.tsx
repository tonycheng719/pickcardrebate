"use client";

import { Card } from "@/components/ui/card";
import { 
  AlertTriangle, CheckCircle, XCircle, Calendar, 
  CreditCard, Utensils, Globe, Plane, ExternalLink,
  Clock, Users, Info
} from "lucide-react";
import Link from "next/link";

export function DahsingWinterPromoGuide() {
  return (
    <div className="space-y-8">
      {/* 重點摘要 */}
      <section>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <span className="text-3xl">🎯</span> 優惠重點一覽
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-4 bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20 border-rose-200 dark:border-rose-800">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-rose-500 rounded-full">
                <Utensils className="h-5 w-5 text-white" />
              </div>
              <h3 className="font-bold text-rose-700 dark:text-rose-300">本地食肆</h3>
            </div>
            <div className="text-3xl font-bold text-rose-600 dark:text-rose-400 mb-1">
              額外 5% 回贈
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              簽 $6,000 即爆上限 $300
            </p>
          </Card>
          
          <Card className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-500 rounded-full">
                <Globe className="h-5 w-5 text-white" />
              </div>
              <h3 className="font-bold text-blue-700 dark:text-blue-300">網上/旅遊/海外</h3>
            </div>
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
              額外 3% 回贈
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              簽 $10,000 即爆上限 $300
            </p>
          </Card>
        </div>
        
        {/* 總結卡片 */}
        <Card className="mt-4 p-4 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 border-amber-200 dark:border-amber-800">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">💰</span>
            <h3 className="font-bold text-amber-700 dark:text-amber-300">整個推廣期最高可獲</h3>
          </div>
          <div className="text-3xl font-bold text-amber-600 dark:text-amber-400">
            $900 現金回贈
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            3 個階段 × 每階段上限 $300 = $900
          </p>
        </Card>
      </section>

      {/* 推廣期及階段 */}
      <section>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Calendar className="h-6 w-6 text-emerald-500" />
          推廣期及階段
        </h2>
        <Card className="p-4">
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
              <div className="w-20 text-center">
                <div className="text-xs text-gray-500">階段 1</div>
                <div className="font-bold text-emerald-600">12月</div>
              </div>
              <div className="flex-1">
                <div className="font-medium">2025年12月8日 - 12月31日</div>
                <div className="text-sm text-gray-500">累積簽$6,000享回贈</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="w-20 text-center">
                <div className="text-xs text-gray-500">階段 2</div>
                <div className="font-bold text-blue-600">1月</div>
              </div>
              <div className="flex-1">
                <div className="font-medium">2026年1月1日 - 1月31日</div>
                <div className="text-sm text-gray-500">累積簽$6,000享回贈</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <div className="w-20 text-center">
                <div className="text-xs text-gray-500">階段 3</div>
                <div className="font-bold text-purple-600">2月</div>
              </div>
              <div className="flex-1">
                <div className="font-medium">2026年2月1日 - 2月28日</div>
                <div className="text-sm text-gray-500">累積簽$6,000享回贈</div>
              </div>
            </div>
          </div>
        </Card>
        
        {/* 登記提醒 */}
        <Card className="mt-4 p-4 border-amber-300 dark:border-amber-700 bg-amber-50/50 dark:bg-amber-900/10">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-amber-700 dark:text-amber-300 mb-1">登記要點</h4>
              <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
                <li>• <strong>名額有限</strong>：只限首 8,000 名成功登記客戶，先到先得</li>
                <li>• <strong>登記時機影響回贈</strong>：階段1登記可享全部3個階段；階段2登記只享階段2-3；階段3登記只享階段3</li>
                <li>• 建議儘早登記，以免額滿！</li>
              </ul>
            </div>
          </div>
        </Card>
      </section>

      {/* 登記入口 */}
      <section>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <span className="text-3xl">📝</span> 立即登記
        </h2>
        <Card className="p-6 bg-gradient-to-r from-rose-500 to-pink-500 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold mb-2">大新信用卡冬日狂賞登記</h3>
              <p className="text-rose-100">名額有限，先到先得！</p>
            </div>
            <a 
              href="https://www.dahsing.com/pws/promo-reg-ccard/?lang=zh-HK&camp_code=PDM25629"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-rose-600 font-bold rounded-full hover:bg-rose-50 transition-colors"
            >
              立即登記
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </Card>
      </section>

      {/* 參與條件 */}
      <section>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <CheckCircle className="h-6 w-6 text-emerald-500" />
          參與條件
        </h2>
        <Card className="p-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-emerald-600 dark:text-emerald-400 text-sm font-bold">1</span>
              </div>
              <div>
                <div className="font-medium">每階段累積簽賬滿 $6,000</div>
                <div className="text-sm text-gray-500">（只計算單一簽賬滿 $300 的交易）</div>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-emerald-600 dark:text-emerald-400 text-sm font-bold">2</span>
              </div>
              <div>
                <div className="font-medium">需事先透過 App 或網頁登記</div>
                <div className="text-sm text-gray-500">登記後才開始計算，未登記的簽賬不計！</div>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-emerald-600 dark:text-emerald-400 text-sm font-bold">3</span>
              </div>
              <div>
                <div className="font-medium">主卡及附屬卡簽賬合併計算</div>
                <div className="text-sm text-gray-500">方便一家人儲夠門檻</div>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* 合資格簽賬類別 */}
      <section>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <CreditCard className="h-6 w-6 text-blue-500" />
          合資格簽賬類別
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th className="p-3 text-left font-bold">簽賬類別</th>
                <th className="p-3 text-center font-bold">回贈率</th>
                <th className="p-3 text-center font-bold">每階段上限</th>
                <th className="p-3 text-center font-bold">爆Cap金額</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b dark:border-gray-700">
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <Utensils className="h-4 w-4 text-rose-500" />
                    <span className="font-medium">本地食肆</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">不包括網上訂餐、電子錢包</div>
                </td>
                <td className="p-3 text-center">
                  <span className="text-xl font-bold text-rose-600">5%</span>
                </td>
                <td className="p-3 text-center font-medium">$300</td>
                <td className="p-3 text-center text-emerald-600 font-medium">$6,000</td>
              </tr>
              <tr className="border-b dark:border-gray-700">
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-blue-500" />
                    <span className="font-medium">網上簽賬</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">不包括 AlipayHK、WeChat Pay、PayMe</div>
                </td>
                <td className="p-3 text-center">
                  <span className="text-xl font-bold text-blue-600">3%</span>
                </td>
                <td className="p-3 text-center font-medium">$300</td>
                <td className="p-3 text-center text-emerald-600 font-medium">$10,000</td>
              </tr>
              <tr className="border-b dark:border-gray-700">
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <Plane className="h-4 w-4 text-purple-500" />
                    <span className="font-medium">旅遊簽賬</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">航空公司、酒店、旅行社</div>
                </td>
                <td className="p-3 text-center">
                  <span className="text-xl font-bold text-purple-600">3%</span>
                </td>
                <td className="p-3 text-center font-medium">$300</td>
                <td className="p-3 text-center text-emerald-600 font-medium">$10,000</td>
              </tr>
              <tr>
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-indigo-500" />
                    <span className="font-medium">海外/跨境簽賬</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">以非港幣結算的交易</div>
                </td>
                <td className="p-3 text-center">
                  <span className="text-xl font-bold text-indigo-600">3%</span>
                </td>
                <td className="p-3 text-center font-medium">$300</td>
                <td className="p-3 text-center text-emerald-600 font-medium">$10,000</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <Card className="mt-4 p-4 border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-900/10">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
            <div className="text-sm text-gray-700 dark:text-gray-300">
              <strong>注意：</strong>如同一簽賬同時符合多個類別（如網上食肆），只會以較低回贈率（3%）計算一次。
            </div>
          </div>
        </Card>
      </section>

      {/* 不合資格簽賬 */}
      <section>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <XCircle className="h-6 w-6 text-red-500" />
          不合資格簽賬
        </h2>
        <Card className="p-4 border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-900/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-bold text-red-700 dark:text-red-300 mb-2">電子錢包</h4>
              <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
                <li>❌ AlipayHK</li>
                <li>❌ WeChat Pay HK</li>
                <li>❌ PayMe</li>
                <li>❌ 拍住賞 / TNG</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-red-700 dark:text-red-300 mb-2">其他不合資格</h4>
              <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
                <li>❌ 八達通自動增值</li>
                <li>❌ 網上繳費 / 交稅</li>
                <li>❌ 分期付款</li>
                <li>❌ 單一簽賬低於 $300</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-red-700 dark:text-red-300 mb-2">食肆例外</h4>
              <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
                <li>❌ 酒席宴會 / 私人宴會</li>
                <li>❌ 美食廣場 / 超市內食肆</li>
                <li>❌ 百貨公司 / 俱樂部內食肆</li>
                <li>❌ 私房菜</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-red-700 dark:text-red-300 mb-2">不適用卡種</h4>
              <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
                <li>❌ 大新 Visa Infinite 卡</li>
                <li>❌ 大新 VIP 銀行服務 Visa Infinite</li>
                <li>❌ 大新 Private Banking Visa Infinite</li>
              </ul>
            </div>
          </div>
        </Card>
      </section>

      {/* 夾卡建議 */}
      <section>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <span className="text-3xl">💡</span> 夾卡建議
        </h2>
        <Card className="p-4">
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-lg">
              <h4 className="font-bold text-emerald-700 dark:text-emerald-300 mb-2">配搭大新 ONE+ 卡效果最佳</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-gray-500">本地食肆</div>
                  <div className="text-xl font-bold text-emerald-600">
                    5% + 1% = <span className="text-2xl">6%</span>
                  </div>
                </div>
                <div>
                  <div className="text-gray-500">網上/旅遊/海外</div>
                  <div className="text-xl font-bold text-blue-600">
                    3% + 1% = <span className="text-2xl">4%</span>
                  </div>
                </div>
              </div>
            </div>
            
            <p className="text-sm text-gray-600 dark:text-gray-400">
              大新 ONE+ 卡本身有無上限 1% 現金回贈，配合冬日狂賞額外回贈，合計可享高達 6% 回贈！
            </p>
          </div>
        </Card>
      </section>

      {/* 回贈計算例子 */}
      <section>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <span className="text-3xl">🧮</span> 回贈計算例子
        </h2>
        <Card className="p-4">
          <h4 className="font-bold mb-3">假設你於階段1成功登記並簽賬：</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <th className="p-2 text-left">簽賬類別</th>
                  <th className="p-2 text-right">金額</th>
                  <th className="p-2 text-right">回贈</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b dark:border-gray-700">
                  <td className="p-2">本地食肆</td>
                  <td className="p-2 text-right">$3,000</td>
                  <td className="p-2 text-right text-emerald-600">$150 (5%)</td>
                </tr>
                <tr className="border-b dark:border-gray-700">
                  <td className="p-2">海外簽賬</td>
                  <td className="p-2 text-right">$2,000</td>
                  <td className="p-2 text-right text-blue-600">$60 (3%)</td>
                </tr>
                <tr className="border-b dark:border-gray-700">
                  <td className="p-2">網上餐飲</td>
                  <td className="p-2 text-right">$3,000</td>
                  <td className="p-2 text-right text-blue-600">$90 (3%)</td>
                </tr>
                <tr className="border-b dark:border-gray-700">
                  <td className="p-2">其他零售</td>
                  <td className="p-2 text-right">$1,000</td>
                  <td className="p-2 text-right text-gray-400">$0</td>
                </tr>
                <tr className="bg-emerald-50 dark:bg-emerald-900/20 font-bold">
                  <td className="p-2">合計</td>
                  <td className="p-2 text-right">$9,000</td>
                  <td className="p-2 text-right text-emerald-600">$300 (上限)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mt-3">
            ⚠️ 網上餐飲雖然是食肆，但因為是網上簽賬，所以只計 3% 而非 5%
          </p>
        </Card>
      </section>

      {/* 回贈發放 */}
      <section>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Clock className="h-6 w-6 text-amber-500" />
          回贈發放時間
        </h2>
        <Card className="p-4">
          <div className="flex items-center gap-4">
            <div className="text-4xl">📅</div>
            <div>
              <div className="font-bold text-lg">2026年6月30日或之前</div>
              <div className="text-sm text-gray-500">
                以免找數簽賬額形式存入主卡賬戶
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* 總評 */}
      <section>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <span className="text-3xl">📊</span> 總評
        </h2>
        <Card className="p-4">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <strong className="text-emerald-600">優點：</strong>
                <span className="text-gray-700 dark:text-gray-300">本地食肆 5% 回贈相當不錯，配合 ONE+ 本身 1% 可達 6%</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <XCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
              <div>
                <strong className="text-red-600">缺點：</strong>
                <span className="text-gray-700 dark:text-gray-300">名額只有 8,000 個、需要登記、單一簽賬需滿 $300、每階段回贈上限 $300</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
              <div>
                <strong className="text-blue-600">建議：</strong>
                <span className="text-gray-700 dark:text-gray-300">如果你有大新信用卡，又經常外出食飯或網購，可以登記試下。但同期其他銀行如恒生、滙豐都有更吸引的優惠，可以比較一下。</span>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* 相關文章 */}
      <section>
        <h2 className="text-2xl font-bold mb-4">📚 相關文章</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/discover/hangseng-winter-2025" className="group">
            <Card className="p-4 hover:shadow-md transition-shadow">
              <div className="font-medium group-hover:text-emerald-600 transition-colors">
                恒生冬日簽賬賞 2025
              </div>
              <div className="text-sm text-gray-500">累積簽賬享額外 +FUN Dollars</div>
            </Card>
          </Link>
          <Link href="/discover/dining-guide" className="group">
            <Card className="p-4 hover:shadow-md transition-shadow">
              <div className="font-medium group-hover:text-emerald-600 transition-colors">
                餐飲信用卡回贈攻略
              </div>
              <div className="text-sm text-gray-500">邊張卡食飯最抵？</div>
            </Card>
          </Link>
        </div>
      </section>
    </div>
  );
}

// FAQ 資料
export const dahsingWinterPromoFaqData = [
  {
    question: "大新冬日狂賞需要登記嗎？",
    answer: "需要。必須透過大新手機 App 或指定網頁登記，名額只限首 8,000 名，先到先得。登記後才開始計算簽賬，未登記的簽賬不計入回贈！"
  },
  {
    question: "冬日狂賞的推廣期是什麼時候？",
    answer: "推廣期由 2025年12月8日 至 2026年2月28日，分為三個階段：階段1 (12月8-31日)、階段2 (1月1-31日)、階段3 (2月1-28日)。每個階段獨立計算回贈。"
  },
  {
    question: "每階段需要簽多少才有回贈？",
    answer: "每階段需累積簽賬滿 $6,000（只計算單一簽賬滿 $300 的交易），才可享有本地食肆 5% 或網上/旅遊/海外 3% 的額外回贈。"
  },
  {
    question: "網上訂餐如 foodpanda 算本地食肆嗎？",
    answer: "不算。網上訂餐只計入「網上簽賬」類別（3%回贈），而非本地食肆（5%回贈）。要享 5% 回贈必須實體到店消費。"
  },
  {
    question: "用 AlipayHK 或 WeChat Pay 簽賬可以嗎？",
    answer: "不可以。透過 AlipayHK、WeChat Pay HK、PayMe 的簽賬均不符合資格，即使是在餐廳消費也不計！"
  },
  {
    question: "大新 Visa Infinite 卡可以參加嗎？",
    answer: "不可以。大新 VIP 銀行服務 Visa Infinite、Private Banking Visa Infinite、Visa Infinite 卡均不適用於此推廣。"
  },
  {
    question: "回贈什麼時候發放？",
    answer: "所有回贈將於 2026年6月30日或之前，以免找數簽賬額形式存入主卡賬戶，並顯示於隨後的月結單上。"
  },
  {
    question: "冬日狂賞值得參加嗎？",
    answer: "如果你有大新信用卡並經常外出食飯，5% 食肆回贈配合 ONE+ 本身 1% 可達 6%，算是不錯。但名額有限、回贈上限較低，建議同時比較其他銀行優惠。"
  }
];

