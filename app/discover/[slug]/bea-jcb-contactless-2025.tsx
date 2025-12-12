// BEA JCB 白金卡 Apple Pay/Google Pay 15% 現金回贈攻略
// 用於 /discover/bea-jcb-contactless-2025 頁面

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  ChevronRight, ChevronDown, CreditCard, FileText,
  Calculator, Trophy, DollarSign, CheckCircle, AlertTriangle,
  Smartphone, Info, XCircle, Zap, Clock, Calendar,
  Gift, Plane, Store, Coffee
} from "lucide-react";
import { CardPreviewSection } from "@/app/discover/components/card-preview-section";

// FAQ 數據
export const beaJcbContactless2025FaqData = [
  {
    question: "BEA JCB 白金卡非接觸式簽賬優惠點樣登記？",
    answer: "需要透過 BEA Mall App 登記，首 5,000 名額滿即止。登記後東亞銀行會發送確認電郵。成功登記後，你名下所有主卡及附屬卡嘅合資格簽賬都會獨立計算獎賞。"
  },
  {
    question: "非接觸式付款包括咩？",
    answer: "主要係指 Apple Pay 同 Google Pay！喺本地（港元）及澳門（澳門元）實體店用手機支付即可享優惠。實體卡「拍卡」付款亦計算在內。但必須係實體店消費，網上簽賬不適用！"
  },
  {
    question: "每月回贈上限係幾多？",
    answer: "每月最高回贈 $100，以 15% 計算即每月簽賬約 $667 就封頂。整個推廣期（階段1+階段2）最高回贈 $600。"
  },
  {
    question: "優惠分幾個階段？",
    answer: "分兩個階段：階段1係 2025年10月15日至12月31日（最高 $300 回贈），階段2係 2026年1月1日至3月31日（最高 $300 回贈）。如果階段1已登記，階段2無須再次登記。"
  },
  {
    question: "附屬卡可以參加嗎？",
    answer: "附屬卡不可以登記，但主卡登記後，其名下嘅附屬卡簽賬會作為獨立賬戶計算，即附屬卡都可以獨立賺取最高 $600 回贈！"
  },
  {
    question: "邊啲簽賬不合資格？",
    answer: "網上簽賬、電子錢包增值（Alipay/PayMe/WeChat Pay）、八達通增值、稅務繳款、循環付款、儲值卡充值、免息分期、指定售票網絡（Cityline/快達票/HotdogTIX）等都不合資格。"
  },
  {
    question: "回贈幾時入賬？",
    answer: "階段1嘅回贈會喺 2026年3月31日或之前入賬，階段2嘅回贈會喺 2026年6月30日或之前入賬，會自動存入你嘅信用卡賬戶並顯示於月結單。"
  },
  {
    question: "BEA JCB 白金卡有年費嗎？",
    answer: "年費 $1,800，但首年免年費。卡片仲有其他優惠包括日本機場貴賓室、大灣區航空日本機票8折、香港松本清3%折扣等。"
  }
];

// 優惠階段
const promoStages = [
  {
    stage: "階段 1",
    period: "2025/10/15 - 2025/12/31",
    months: "10月、11月、12月",
    monthlyMax: "$100",
    stageMax: "$300",
  },
  {
    stage: "階段 2",
    period: "2026/1/1 - 2026/3/31",
    months: "1月、2月、3月",
    monthlyMax: "$100",
    stageMax: "$300",
  },
];

// 不合資格簽賬
const excludedTransactions = [
  "商戶免息分期簽賬",
  "現金透支",
  "網上/自動櫃員機繳款",
  "稅務繳款",
  "循環付款",
  "自動轉賬交易",
  "八達通增值（包括自動增值、網上或手機）",
  "電子錢包（Alipay、AlipayHK、PayMe、WeChat Pay 等）",
  "轉賬金額",
  "購買及/或充值儲值卡",
  "保險交易",
  "指定售票網絡（Cityline、快達票、HotdogTIX）",
  "政府部門簽賬（任何地區）",
  "郵購、傳真及電話訂購",
];

// 其他 JCB 優惠
const otherJcbOffers = [
  {
    title: "大灣區航空日本機票 8 折",
    description: "官網預訂日本來回機票，優惠碼「25JCBHKGPRO」",
    validUntil: "2026/1/31",
    icon: "✈️",
  },
  {
    title: "香港機場星巴克滿 $90 減 $45",
    description: "需含中杯或以上手調飲品，需出示登機證",
    validUntil: "2026/1/31",
    icon: "☕",
  },
  {
    title: "香港松本清 3% 折扣",
    description: "結賬前聲明使用 JCB 卡",
    validUntil: "2026/12/31",
    icon: "🛒",
  },
  {
    title: "日本/夏威夷機場貴賓室",
    description: "免費使用指定機場貴賓室",
    validUntil: "2026/3/31",
    icon: "🛋️",
  },
];

export function BeaJcbContactless2025Guide() {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      {/* 引言 */}
      <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-6">
        🔥 東亞銀行 BEA JCB 白金卡推出 <strong>Apple Pay / Google Pay 非接觸式付款 15% 現金回贈</strong>優惠！
        本地及澳門實體店用<strong>手機支付</strong>消費，每月簽滿 <strong>$500</strong> 即享 <strong>15% 回贈</strong>，
        整個推廣期最高可賺 <strong>$600</strong>！
      </p>

      {/* 重點提示 */}
      <div className="not-prose bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 text-white mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Gift className="h-8 w-8" />
          <div>
            <h3 className="text-xl font-bold m-0">BEA JCB Apple Pay/Google Pay 15% 回贈</h3>
            <p className="text-blue-100 m-0">推廣期：2025年10月15日 - 2026年3月31日</p>
          </div>
        </div>
        <div className="grid sm:grid-cols-4 gap-4 mt-4">
          <div className="bg-white/20 rounded-xl p-4 text-center">
            <p className="text-3xl font-bold">15%</p>
            <p className="text-sm opacity-90">現金回贈</p>
          </div>
          <div className="bg-white/20 rounded-xl p-4 text-center">
            <p className="text-3xl font-bold">$500</p>
            <p className="text-sm opacity-90">每月最低簽賬</p>
          </div>
          <div className="bg-white/20 rounded-xl p-4 text-center">
            <p className="text-3xl font-bold">$100</p>
            <p className="text-sm opacity-90">每月回贈上限</p>
          </div>
          <div className="bg-white/20 rounded-xl p-4 text-center">
            <p className="text-3xl font-bold">$600</p>
            <p className="text-sm opacity-90">全期最高回贈</p>
          </div>
        </div>
      </div>

      {/* 目錄 */}
      <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-10">
        <h2 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          📑 本文目錄
        </h2>
        <ul className="space-y-2 text-sm">
          <li><a href="#overview" className="text-blue-600 dark:text-blue-400 hover:underline">1. 優惠總覽</a></li>
          <li><a href="#how-to-register" className="text-blue-600 dark:text-blue-400 hover:underline">2. 點樣登記？</a></li>
          <li><a href="#reward-details" className="text-blue-600 dark:text-blue-400 hover:underline">3. 回贈詳情</a></li>
          <li><a href="#eligible" className="text-blue-600 dark:text-blue-400 hover:underline">4. 合資格簽賬</a></li>
          <li><a href="#excluded" className="text-blue-600 dark:text-blue-400 hover:underline">5. 不合資格簽賬</a></li>
          <li><a href="#examples" className="text-blue-600 dark:text-blue-400 hover:underline">6. 回贈計算例子</a></li>
          <li><a href="#other-offers" className="text-blue-600 dark:text-blue-400 hover:underline">7. 其他 JCB 優惠</a></li>
          <li><a href="#tips" className="text-blue-600 dark:text-blue-400 hover:underline">8. 注意事項</a></li>
          <li><a href="#faq" className="text-blue-600 dark:text-blue-400 hover:underline">9. 常見問題 FAQ</a></li>
        </ul>
      </div>

      {/* Section 1: 優惠總覽 */}
      <section id="overview" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <FileText className="h-6 w-6 text-blue-500" />
          1. 優惠總覽
        </h2>
        
        <p>
          東亞銀行 <strong>JCB 白金卡</strong>推出限時優惠，
          喺本地及澳門實體店以 <strong>Apple Pay / Google Pay</strong>（非接觸式付款）消費，
          即可享 <strong>15% 現金回贈</strong>！
        </p>

        <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden my-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-blue-50 dark:bg-blue-900/20">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-blue-600 dark:text-blue-400">項目</th>
                  <th className="px-4 py-3 text-left font-medium text-blue-600 dark:text-blue-400">詳情</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                <tr>
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">推廣期</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">2025年10月15日 - 2026年3月31日</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">回贈率</td>
                  <td className="px-4 py-3"><span className="font-bold text-green-600">15%</span> 現金回贈</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">每月最低簽賬</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">$500</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">每月回贈上限</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">$100（即每月 $667 簽賬封頂）</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">全期回贈上限</td>
                  <td className="px-4 py-3"><span className="font-bold text-green-600">$600</span>（階段1: $300 + 階段2: $300）</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">名額</td>
                  <td className="px-4 py-3 text-amber-600 dark:text-amber-400">首 5,000 名，先到先得</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">登記方式</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">透過 BEA Mall App 登記</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section 2: 點樣登記 */}
      <section id="how-to-register" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Smartphone className="h-6 w-6 text-purple-500" />
          2. 點樣登記？
        </h2>

        <div className="not-prose space-y-3 my-6">
          <div className="flex items-start gap-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold">1</span>
            <div>
              <p className="font-medium text-gray-900 dark:text-white m-0">下載 BEA Mall App</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 m-0">於 App Store / Google Play 下載</p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold">2</span>
            <div>
              <p className="font-medium text-gray-900 dark:text-white m-0">登入並登記優惠</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 m-0">憑 BEA JCB 白金卡主卡成功登記</p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold">3</span>
            <div>
              <p className="font-medium text-gray-900 dark:text-white m-0">收到確認電郵</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 m-0">成功登記後東亞銀行會發送確認電郵</p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-green-50 dark:bg-green-900/20 rounded-xl p-4">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold">4</span>
            <div>
              <p className="font-medium text-gray-900 dark:text-white m-0">開始簽賬賺回贈！</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 m-0">每月簽滿 $500 即享 15% 回贈</p>
            </div>
          </div>
        </div>

        <div className="not-prose bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-amber-800 dark:text-amber-200 mb-1 m-0">⚠️ 注意</h4>
              <ul className="text-amber-700 dark:text-amber-300 text-sm space-y-1 m-0">
                <li>• 只限<strong>主卡</strong>登記，附屬卡不可登記</li>
                <li>• 首 <strong>5,000 名</strong>，額滿即止</li>
                <li>• 階段1已登記者，階段2無須再次登記</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: 回贈詳情 */}
      <section id="reward-details" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <DollarSign className="h-6 w-6 text-green-500" />
          3. 回贈詳情
        </h2>

        <p>
          優惠分<strong>兩個階段</strong>，每階段最高可獲 <strong>$300 回贈</strong>：
        </p>

        <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden my-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-green-50 dark:bg-green-900/20">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-green-600 dark:text-green-400">階段</th>
                  <th className="px-4 py-3 text-left font-medium text-green-600 dark:text-green-400">推廣期</th>
                  <th className="px-4 py-3 text-center font-medium text-green-600 dark:text-green-400">每月上限</th>
                  <th className="px-4 py-3 text-center font-medium text-green-600 dark:text-green-400">階段上限</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {promoStages.map((stage, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3 font-bold text-gray-900 dark:text-white">{stage.stage}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                      {stage.period}
                      <br/>
                      <span className="text-xs text-gray-500">（{stage.months}）</span>
                    </td>
                    <td className="px-4 py-3 text-center font-bold text-green-600">{stage.monthlyMax}</td>
                    <td className="px-4 py-3 text-center font-bold text-green-600">{stage.stageMax}</td>
                  </tr>
                ))}
                <tr className="bg-green-50 dark:bg-green-900/10">
                  <td className="px-4 py-3 font-bold text-gray-900 dark:text-white" colSpan={3}>整個推廣期最高回贈</td>
                  <td className="px-4 py-3 text-center font-bold text-green-600 text-lg">$600</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section 4: 合資格簽賬 */}
      <section id="eligible" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <CheckCircle className="h-6 w-6 text-green-500" />
          4. 合資格簽賬
        </h2>

        <div className="not-prose grid md:grid-cols-2 gap-4 my-6">
          <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-5 border border-green-200 dark:border-green-800">
            <div className="flex items-center gap-2 mb-3">
              <Store className="h-6 w-6 text-green-500" />
              <h4 className="font-bold text-green-800 dark:text-green-200 m-0">本地簽賬</h4>
            </div>
            <ul className="text-green-700 dark:text-green-300 text-sm space-y-1 m-0">
              <li>✓ 香港實體店</li>
              <li>✓ 港元（HKD）交易</li>
              <li>✓ <strong>Apple Pay</strong></li>
              <li>✓ <strong>Google Pay</strong></li>
              <li>✓ 實體卡非接觸式付款（拍卡）</li>
            </ul>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-5 border border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-2 mb-3">
              <Plane className="h-6 w-6 text-blue-500" />
              <h4 className="font-bold text-blue-800 dark:text-blue-200 m-0">澳門簽賬</h4>
            </div>
            <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1 m-0">
              <li>✓ 澳門實體店</li>
              <li>✓ 澳門元（MOP）交易</li>
              <li>✓ <strong>Apple Pay</strong></li>
              <li>✓ <strong>Google Pay</strong></li>
              <li>✓ 實體卡非接觸式付款（拍卡）</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 5: 不合資格簽賬 */}
      <section id="excluded" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <XCircle className="h-6 w-6 text-red-500" />
          5. 不合資格簽賬
        </h2>

        <div className="not-prose bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 my-6">
          <h4 className="font-bold text-red-800 dark:text-red-200 mb-3 m-0">❌ 以下簽賬不計算回贈：</h4>
          <div className="grid sm:grid-cols-2 gap-2">
            {excludedTransactions.map((item, index) => (
              <div key={index} className="flex items-center gap-2 text-red-700 dark:text-red-300 text-sm">
                <XCircle className="h-4 w-4 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6: 回贈計算例子 */}
      <section id="examples" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Calculator className="h-6 w-6 text-purple-500" />
          6. 回贈計算例子
        </h2>

        <div className="not-prose space-y-4 my-6">
          {/* 例子 1 */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-5 border border-green-200 dark:border-green-800">
            <h4 className="font-bold text-green-800 dark:text-green-200 mb-3 m-0">例子 1：每月簽 $667（剛好封頂）</h4>
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-4">
              <ul className="text-green-700 dark:text-green-300 text-sm space-y-1 m-0">
                <li>• 每月非接觸式簽賬：$667</li>
                <li>• 每月回贈：$667 × 15% = <strong>$100</strong>（達每月上限）</li>
                <li>• 6個月合共：$100 × 6 = <strong>$600</strong></li>
              </ul>
              <div className="mt-3 pt-3 border-t border-green-200 dark:border-green-700">
                <p className="text-lg font-bold text-green-600 dark:text-green-400 m-0">
                  最高回贈：$600 🎉
                </p>
              </div>
            </div>
          </div>

          {/* 例子 2 */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-5 border border-blue-200 dark:border-blue-800">
            <h4 className="font-bold text-blue-800 dark:text-blue-200 mb-3 m-0">例子 2：每月簽 $500（最低要求）</h4>
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-4">
              <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1 m-0">
                <li>• 每月非接觸式簽賬：$500</li>
                <li>• 每月回贈：$500 × 15% = <strong>$75</strong></li>
                <li>• 6個月合共：$75 × 6 = <strong>$450</strong></li>
              </ul>
              <div className="mt-3 pt-3 border-t border-blue-200 dark:border-blue-700">
                <p className="text-lg font-bold text-blue-600 dark:text-blue-400 m-0">
                  總回贈：$450
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: 其他 JCB 優惠 */}
      <section id="other-offers" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Gift className="h-6 w-6 text-amber-500" />
          7. 其他 JCB 優惠
        </h2>

        <p>
          BEA JCB 白金卡仲有其他優惠：
        </p>

        <div className="not-prose grid sm:grid-cols-2 gap-4 my-6">
          {otherJcbOffers.map((offer, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">{offer.icon}</span>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-1 m-0">{offer.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 m-0">{offer.description}</p>
                  <p className="text-xs text-amber-600 dark:text-amber-400 mt-1 m-0">至 {offer.validUntil}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Card Preview Section */}
      <CardPreviewSection 
        title="📌 BEA JCB 白金卡"
        subtitle="點擊查看詳細回贈條款及申請連結"
        cards={[
          { id: "bea-jcb-platinum", highlight: "非接觸式15%" },
        ]}
      />

      {/* Section 8: 注意事項 */}
      <section id="tips" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <AlertTriangle className="h-6 w-6 text-amber-500" />
          8. 注意事項
        </h2>

        <div className="not-prose space-y-3">
          {[
            { icon: "📱", title: "必須登記", desc: "透過 BEA Mall App 登記，首 5,000 名額滿即止" },
            { icon: "📱", title: "Apple Pay / Google Pay", desc: "用手機支付（Apple Pay/Google Pay）或實體卡拍卡，插卡不計" },
            { icon: "🏪", title: "僅限實體店", desc: "網上簽賬不適用，必須係實體店消費" },
            { icon: "💰", title: "每月最低 $500", desc: "每月累積簽賬需滿 $500 才可享回贈" },
            { icon: "📊", title: "主卡附屬卡獨立計算", desc: "主卡登記後，附屬卡簽賬會獨立計算獎賞" },
            { icon: "⏰", title: "回贈入賬時間", desc: "階段1於2026/3/31前入賬，階段2於2026/6/30前入賬" },
          ].map((tip, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 flex items-start gap-4">
              <span className="text-2xl">{tip.icon}</span>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-1 m-0">{tip.title}</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm m-0">{tip.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 9: FAQ */}
      <section id="faq" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          ❓ 9. 常見問題 FAQ
        </h2>
        
        <div className="not-prose space-y-4">
          {beaJcbContactless2025FaqData.map((faq, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
              <details className="group">
                <summary className="flex items-center justify-between p-4 cursor-pointer font-medium text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-900">
                  <span>Q: {faq.question}</span>
                  <ChevronDown className="h-5 w-5 text-gray-400 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-4 pb-4 text-gray-600 dark:text-gray-400 text-sm">
                  A: {faq.answer}
                </div>
              </details>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <div className="not-prose bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white mb-10">
        <h3 className="text-xl font-bold mb-2 m-0">💳 想知邊張信用卡最適合你？</h3>
        <p className="mb-4 opacity-90 m-0">用我哋嘅計算機，輸入你嘅消費習慣，即刻搵到最高回贈嘅信用卡！</p>
        <Link href="/">
          <Button className="bg-white text-blue-600 hover:bg-gray-100">
            <Calculator className="h-4 w-4 mr-2" />
            立即計算回贈
          </Button>
        </Link>
      </div>

      {/* Related Links */}
      <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 m-0">🔗 相關文章</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <Link href="/cards/bea-jcb-platinum" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
            <CreditCard className="h-5 w-5 text-blue-600" />
            <span>BEA JCB 白金卡詳情</span>
            <ChevronRight className="h-4 w-4 ml-auto text-gray-400" />
          </Link>
          <Link href="/discover/mobile-payment-guide" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
            <Smartphone className="h-5 w-5 text-purple-600" />
            <span>手機支付攻略</span>
            <ChevronRight className="h-4 w-4 ml-auto text-gray-400" />
          </Link>
          <Link href="/discover/overseas-spending-guide" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
            <Plane className="h-5 w-5 text-teal-600" />
            <span>海外簽賬攻略</span>
            <ChevronRight className="h-4 w-4 ml-auto text-gray-400" />
          </Link>
          <Link href="/" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
            <Calculator className="h-5 w-5 text-emerald-600" />
            <span>回贈計算機</span>
            <ChevronRight className="h-4 w-4 ml-auto text-gray-400" />
          </Link>
        </div>
      </div>
    </div>
  );
}

