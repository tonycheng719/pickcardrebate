// 信用卡交稅攻略
// 用於 /discover/tax-payment-guide 頁面

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  ChevronRight, ChevronDown, CreditCard, FileText, Building, Home,
  Calculator, Trophy, DollarSign, CheckCircle, AlertTriangle,
  Star, Smartphone, Info, XCircle, Zap, Clock, Shield, Landmark
} from "lucide-react";
import { CardPreviewSection } from "@/app/discover/components/card-preview-section";

// FAQ 數據（2025/2026 更新版）
// 參考：https://www.mrmiles.hk/tax/
export const taxPaymentFaqData = [
  {
    question: "信用卡交稅有回贈嗎？",
    answer: "有！2025/2026交稅季各大銀行都有優惠：渣打高達$2,300/23,000里、滙豐高達$1,100、恒生高達$700、中銀高達$3,888、工銀高達2%。需透過銀行網上理財交稅並登記。"
  },
  {
    question: "交稅用邊張信用卡最抵？",
    answer: "2025/2026年推薦：現金回贈首選渣打 Simply Cash（$2,300）；儲里數首選渣打國泰 Mastercard（23,000里）；滙豐客戶用滙豐卡（$1,100）；恒生客戶用恒生卡（$700）。需登記！"
  },
  {
    question: "HSBC 信用卡交稅有回贈嗎？",
    answer: "有！2025/11/17-2026/2/28期間，滙豐信用卡交稅滿$30,000+累積簽賬$10,000，可賺最高$1,100獎賞錢。需透過滙豐 App/網上理財登記及交稅。"
  },
  {
    question: "恒生信用卡交稅有優惠嗎？",
    answer: "有！2025/11/25-2026/3/31期間，恒生信用卡交稅滿$10,000+累積簽賬$5,000，可賺最高$700 +FUN Dollars 或 yuu 積分。需透過恒生網上理財登記及交稅。"
  },
  {
    question: "中銀信用卡交稅有回贈嗎？",
    answer: "有！2025/11/1-12/30期間，中銀信用卡透過 BoC Pay/網上理財交稅，高達$3,888現金回贈。金額愈高回贈愈多！"
  },
  {
    question: "渣打信用卡交稅有優惠嗎？",
    answer: "有！2025/11/18-2026/2/2期間，渣打/MANHATTAN信用卡透過SC Mobile App登記後網上交稅，高達$2,300回贈或23,000里。早鳥喺12/31前完成分期仲有額外獎賞！"
  },
  {
    question: "透過 AlipayHK/WeChat Pay 仲可以交稅嗎？",
    answer: "⚠️ 2020年2月起，AlipayHK/WeChat Pay 已停止支援信用卡交稅功能。現時要用信用卡交稅，需透過各銀行網上理財直接繳費。"
  },
  {
    question: "交稅可以分期嗎？",
    answer: "可以！多間銀行提供交稅分期計劃，如渣打、HSBC、恒生、Citi等。渣打早鳥分期有額外獎賞，部分銀行提供免息分期（6-24個月），可減輕交稅壓力。"
  }
];

// 交稅方法比較（2025/2026 更新版）
// 參考：https://www.mrmiles.hk/tax/
// ⚠️ AlipayHK/WeChat Pay 已於 2020年2月停止支援信用卡交稅
const taxPaymentMethods = [
  {
    method: "🔥 渣打網上理財",
    fee: "免手續費",
    limit: "無上限",
    creditCardSupport: true,
    bestCards: [
      { card: "渣打 Simply Cash", id: "sc-simply-cash", rate: "高達$2,300" },
      { card: "SC 國泰 Mastercard", id: "sc-cathay", rate: "高達23,000里" },
    ],
    pros: ["高達$2,300回贈", "分期有早鳥優惠"],
    cons: ["需SC Mobile App登記"],
  },
  {
    method: "🔥 滙豐網上理財",
    fee: "免手續費",
    limit: "無上限",
    creditCardSupport: true,
    bestCards: [
      { card: "滙豐信用卡", id: "hsbc-vs", rate: "高達$1,100" },
    ],
    pros: ["高達$1,100獎賞錢", "可申請分期"],
    cons: ["需登記+累積簽$10,000"],
  },
  {
    method: "🔥 恒生網上理財",
    fee: "免手續費",
    limit: "無上限",
    creditCardSupport: true,
    bestCards: [
      { card: "恒生信用卡", id: "hangseng-mmpower", rate: "高達$700" },
    ],
    pros: ["高達$700 +FUN", "enJoy 可儲 yuu"],
    cons: ["需登記+累積簽$5,000"],
  },
  {
    method: "中銀 BoC Pay/網上理財",
    fee: "免手續費",
    limit: "無上限",
    creditCardSupport: true,
    bestCards: [
      { card: "中銀信用卡", id: "boc-cheers", rate: "高達$3,888" },
    ],
    pros: ["高達$3,888回贈", "免手續費"],
    cons: ["只限中銀卡"],
  },
  {
    method: "工銀網上理財",
    fee: "免手續費",
    limit: "無上限",
    creditCardSupport: true,
    bestCards: [
      { card: "工銀 Visa 卡", id: null, rate: "高達2%" },
    ],
    pros: ["回贈率最高達2%", "新卡額外$50"],
    cons: ["只限工銀卡"],
  },
  {
    method: "雲閃付 App 繳稅",
    fee: "0.6% 服務費",
    limit: "視乎信用卡額度",
    creditCardSupport: true,
    bestCards: [
      { card: "東亞 銀聯卡", id: "bea-unionpay-diamond", rate: "有回贈" },
    ],
    pros: ["可用銀聯卡", "接受多種銀聯卡"],
    cons: ["0.6% 服務費", "需扣除服務費計算淨回贈"],
  },
  {
    method: "政府繳費網站（PPS）",
    fee: "免手續費",
    limit: "無上限",
    creditCardSupport: false,
    bestCards: [],
    pros: ["無上限", "直接繳費"],
    cons: ["只接受銀行戶口", "無信用卡回贈"],
  },
];

// 銀行交稅優惠（2025/2026 更新版）
// 參考：https://www.mrmiles.hk/tax/
const bankTaxOffers = [
  {
    bank: "🔥 渣打銀行",
    offer: "交稅高達$2,300回贈/23,000里",
    period: "2025/11/18 - 2026/2/2",
    requirement: "渣打/MANHATTAN信用卡",
    note: "需SC Mobile App登記，分期有早鳥優惠，回贈率最高0.75%",
    link: "/discover/sc-tax-payment-2025",
  },
  {
    bank: "🔥 HSBC 滙豐",
    offer: "交稅滿$30,000享高達$1,100獎賞錢",
    period: "2025/11/17 - 2026/2/28",
    requirement: "指定滙豐信用卡",
    note: "需登記+累積簽賬$10,000，最高0.8%回贈",
  },
  {
    bank: "🔥 恒生銀行",
    offer: "交稅滿$10,000享高達$700+FUN",
    period: "2025/11/25 - 2026/3/31",
    requirement: "恒生信用卡",
    note: "需登記+累積簽賬$5,000，最高0.8%回贈",
  },
  {
    bank: "🔥 中銀香港",
    offer: "交稅高達$3,888回贈",
    period: "2025/11/1 - 12/30",
    requirement: "中銀信用卡",
    note: "需透過 BoC Pay / 網上理財交稅",
  },
  {
    bank: "東亞銀行",
    offer: "交稅高達40,000里",
    period: "2025/11/1 - 12/31",
    requirement: "東亞 Visa 卡",
    note: "首4,000名登記客戶，網上交稅",
  },
  {
    bank: "工銀亞洲",
    offer: "交稅高達2%回贈",
    period: "2025/10/1 - 2026/3/31",
    requirement: "ICBC Visa 信用卡",
    note: "交$5,000+享$100回贈，新卡額外$50",
  },
  {
    bank: "Citi 花旗",
    offer: "Citi PayAll 交稅賺$4.8/里",
    period: "全年適用",
    requirement: "Citi 信用卡",
    note: "1.8%繳費回贈，可賺高達$15,200獎賞",
  },
];

// 推薦信用卡（2025/2026 更新版）
// 參考：https://www.mrmiles.hk/tax/
const recommendedCards = [
  {
    card: "渣打 Simply Cash Visa",
    id: "sc-simply-cash",
    rate: "高達$2,300",
    highlight: "🔥 現金回贈首選",
    reason: "透過渣打網上理財交稅，高達$2,300回贈（0.75%），分期早鳥額外$300",
    method: "渣打網上理財",
  },
  {
    card: "SC 國泰 Mastercard",
    id: "sc-cathay",
    rate: "高達23,000里",
    highlight: "🔥 儲里數首選",
    reason: "透過渣打網上理財交稅，高達23,000 Asia Miles",
    method: "渣打網上理財",
  },
  {
    card: "HSBC 信用卡",
    id: "hsbc-vs",
    rate: "高達$1,100",
    highlight: "🔥 滙豐限時",
    reason: "交稅滿$30,000+累積簽$10,000，可賺$1,100獎賞錢",
    method: "滙豐網上理財",
  },
  {
    card: "恒生信用卡",
    id: "hangseng-mmpower",
    rate: "高達$700",
    highlight: "恒生限時",
    reason: "交稅滿$10,000+累積簽$5,000，可賺$700 +FUN Dollars",
    method: "恒生網上理財",
  },
  {
    card: "中銀信用卡",
    id: "boc-cheers",
    rate: "高達$3,888",
    highlight: "中銀限時",
    reason: "透過 BoC Pay / 網上理財交稅，高達$3,888回贈",
    method: "BoC Pay / 網上理財",
  },
  {
    card: "工銀 Visa 信用卡",
    id: null,
    rate: "高達2%",
    highlight: "回贈率最高",
    reason: "交$5,000+享$100回贈，回贈率最高2%，新卡額外$50",
    method: "網上理財",
  },
];

export function TaxPaymentGuide() {
  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;
  
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      {/* 引言 */}
      <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-6">
        每年交稅都要俾一大筆錢，點解唔用<strong>信用卡交稅</strong>賺回贈？
        本文教你 <strong>{currentYear}/{nextYear} 信用卡交稅攻略</strong>！
        🔥 各大銀行限時優惠：渣打高達 <strong>$2,300 / 23,000里</strong>、滙豐 <strong>$1,100</strong>、
        恒生 <strong>$700</strong>、中銀 <strong>$3,888</strong>！
      </p>

      {/* 渣打限時優惠提示 */}
      <div className="not-prose bg-gradient-to-r from-teal-500 to-blue-500 rounded-2xl p-5 text-white mb-8">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-2xl">🔥</div>
          <div>
            <h3 className="text-lg font-bold m-0 mb-1">渣打信用卡交稅優惠（2025/11/18 - 2026/2/2）</h3>
            <p className="text-teal-100 text-sm m-0 mb-2">
              透過渣打網上理財交稅，特選客戶可賺高達 <strong>$2,300 現金回贈</strong> 或 <strong>23,000 Asia Miles</strong>！
              早鳥喺 <strong>12月31日前</strong>完成分期仲有額外獎賞！
            </p>
            <Link href="/discover/sc-tax-payment-2025">
              <Button size="sm" className="bg-white text-teal-600 hover:bg-gray-100">
                查看渣打交稅攻略 →
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* 目錄 */}
      <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-10">
        <h2 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          📑 本文目錄
        </h2>
        <ul className="space-y-2 text-sm">
          <li><a href="#overview" className="text-blue-600 dark:text-blue-400 hover:underline">1. 信用卡交稅可以賺回贈？</a></li>
          <li><a href="#methods" className="text-blue-600 dark:text-blue-400 hover:underline">2. 交稅方法比較（2025/2026 更新）</a></li>
          <li><a href="#alipay" className="text-blue-600 dark:text-blue-400 hover:underline">3. 銀行網上理財交稅攻略</a></li>
          <li><a href="#unionpay" className="text-blue-600 dark:text-blue-400 hover:underline">4. 渣打交稅攻略（最高回贈）</a></li>
          <li><a href="#bocpay" className="text-blue-600 dark:text-blue-400 hover:underline">5. 滙豐 / 恒生 / 中銀交稅攻略</a></li>
          <li><a href="#bank-offers" className="text-blue-600 dark:text-blue-400 hover:underline">6. 各銀行交稅優惠總覽</a></li>
          <li><a href="#installment" className="text-blue-600 dark:text-blue-400 hover:underline">7. 交稅分期計劃比較</a></li>
          <li><a href="#best-cards" className="text-blue-600 dark:text-blue-400 hover:underline">8. 交稅信用卡推薦</a></li>
          <li><a href="#tips" className="text-blue-600 dark:text-blue-400 hover:underline">9. 交稅慳錢貼士</a></li>
          <li><a href="#faq" className="text-blue-600 dark:text-blue-400 hover:underline">10. 常見問題 FAQ</a></li>
        </ul>
      </div>

      {/* Section 1: 總覽 */}
      <section id="overview" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <FileText className="h-6 w-6 text-blue-500" />
          1. 信用卡交稅可以賺回贈？
        </h2>
        
        <p>
          傳統上，交稅只能用<strong>銀行轉賬</strong>或<strong>支票</strong>，完全無回贈。
          但而家可以透過 <strong>AlipayHK</strong>、<strong>雲閃付</strong>、<strong>BoC Pay</strong> 等平台，
          用<strong>信用卡交稅</strong>賺回贈！
        </p>

        <div className="not-prose bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-5 border border-green-200 dark:border-green-800 my-6">
          <h4 className="font-bold text-green-800 dark:text-green-200 mb-3">💰 交稅回贈例子</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-4">
              <p className="text-sm text-gray-500 mb-1">稅款金額</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">$50,000</p>
            </div>
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-4">
              <p className="text-sm text-gray-500 mb-1">以 1.5% 回贈計</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">賺 $750</p>
            </div>
          </div>
          <p className="text-green-700 dark:text-green-300 text-sm mt-3">
            如果稅款 $100,000，以 1.5% 回贈計可賺 <strong>$1,500</strong>！
          </p>
        </div>

        <div className="not-prose bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-amber-800 dark:text-amber-200 mb-1">⚠️ 注意事項</h4>
              <ul className="text-amber-700 dark:text-amber-300 text-sm space-y-1">
                <li>• <strong>雲閃付交稅收取 0.6% 服務費</strong>，需計算淨回贈</li>
                <li>• AlipayHK/WeChat Pay 已<strong>不支援信用卡交稅</strong></li>
                <li>• 部分方法需要<strong>預先綁定信用卡</strong></li>
                <li>• 銀行優惠可能有<strong>名額限制</strong>，先到先得</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: 方法比較 */}
      <section id="methods" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Smartphone className="h-6 w-6 text-purple-500" />
          2. 交稅方法比較
        </h2>

        <p>
          以下係主要<strong>信用卡交稅方法</strong>比較：
        </p>

        <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden my-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-purple-50 dark:bg-purple-900/20">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-purple-600 dark:text-purple-400">方法</th>
                  <th className="px-4 py-3 text-center font-medium text-purple-600 dark:text-purple-400">手續費</th>
                  <th className="px-4 py-3 text-center font-medium text-purple-600 dark:text-purple-400">信用卡</th>
                  <th className="px-4 py-3 text-center font-medium text-purple-600 dark:text-purple-400">推薦信用卡</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {taxPaymentMethods.map((method, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3 font-bold text-gray-900 dark:text-white">{method.method}</td>
                    <td className="px-4 py-3 text-center">
                      <span className="font-bold text-green-600">{method.fee}</span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      {method.creditCardSupport ? (
                        <span className="text-green-600">✓ 支援</span>
                      ) : (
                        <span className="text-red-600">✗ 不支援</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {method.bestCards.length > 0 && method.bestCards[0].id ? (
                        <Link href={`/cards/${method.bestCards[0].id}`} className="text-blue-600 hover:underline text-xs">
                          {method.bestCards[0].card}
                        </Link>
                      ) : method.bestCards.length > 0 ? (
                        <span className="text-gray-600 text-xs">{method.bestCards[0].card}</span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section 3: 銀行網上理財交稅 */}
      <section id="alipay" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Smartphone className="h-6 w-6 text-blue-500" />
          3. 銀行網上理財交稅攻略
        </h2>

        <div className="not-prose bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-red-700 dark:text-red-300 text-sm">
              <strong>⚠️ 注意：</strong>AlipayHK / WeChat Pay 已於 <strong>2020年2月</strong>停止支援信用卡交稅。
              現時要用信用卡交稅賺回贈，必須透過<strong>各銀行網上理財</strong>繳費！
            </p>
          </div>
        </div>

        <p>
          透過<strong>銀行網上理財交稅</strong>，配合銀行嘅限時優惠，可以賺取豐厚回贈：
        </p>

        <div className="not-prose space-y-3 my-6">
          <div className="flex items-start gap-3 bg-teal-50 dark:bg-teal-900/20 rounded-xl p-4">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold">1</span>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">登記銀行交稅優惠</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">透過銀行 App（如 SC Mobile / 滙豐 App）登記交稅推廣</p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-teal-50 dark:bg-teal-900/20 rounded-xl p-4">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold">2</span>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">登入網上理財</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">選擇「繳費」→「政府 / 稅務局」</p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-teal-50 dark:bg-teal-900/20 rounded-xl p-4">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold">3</span>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">輸入稅單資料</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">輸入稅單號碼及金額，選擇信用卡付款</p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-teal-50 dark:bg-teal-900/20 rounded-xl p-4">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold">4</span>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">完成繳費 + 累積簽賬（如適用）</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">部分優惠需累積額外簽賬才可獲獎賞</p>
            </div>
          </div>
        </div>

        <div className="not-prose bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
          <h4 className="font-bold text-green-800 dark:text-green-200 mb-2">💡 銀行網上理財交稅推薦</h4>
          <ul className="text-green-700 dark:text-green-300 text-sm space-y-1">
            <li>• <Link href="/discover/sc-tax-payment-2025" className="text-blue-600 hover:underline font-medium">渣打交稅優惠</Link>：高達 <strong>$2,300 / 23,000 里</strong></li>
            <li>• <Link href="/cards/hsbc-vs" className="text-blue-600 hover:underline font-medium">滙豐交稅優惠</Link>：高達 <strong>$1,100 獎賞錢</strong></li>
            <li>• <Link href="/cards/hangseng-mmpower" className="text-blue-600 hover:underline font-medium">恒生交稅優惠</Link>：高達 <strong>$700 +FUN</strong></li>
          </ul>
        </div>
      </section>

      {/* Section 4: 渣打交稅 */}
      <section id="unionpay" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <CreditCard className="h-6 w-6 text-teal-500" />
          4. 渣打交稅攻略（最高回贈）
        </h2>

        <p>
          <strong>2025/2026 交稅季</strong>，渣打銀行提供最高回贈優惠：
        </p>

        <div className="not-prose bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800 rounded-xl p-4 my-6">
          <h4 className="font-bold text-teal-800 dark:text-teal-200 mb-2">🔥 渣打交稅優惠（2025/11/18 - 2026/2/2）</h4>
          <ul className="text-teal-700 dark:text-teal-300 text-sm space-y-2">
            <li>• 交稅 $2萬-$5萬：<strong>$50-$150</strong> 回贈</li>
            <li>• 交稅 $5萬-$10萬：<strong>$100-$300</strong> 回贈</li>
            <li>• 交稅 $10萬-$25萬：<strong>$150-$500</strong> 回贈</li>
            <li>• 交稅 $25萬+：<strong>$500-$1,500</strong> 回贈</li>
            <li>• 分期額外獎賞：<strong>$200-$500</strong></li>
            <li>• 早鳥（12/31前）再加：<strong>$100-$300</strong></li>
          </ul>
          <Link href="/discover/sc-tax-payment-2025" className="inline-flex items-center mt-3 text-teal-600 hover:underline font-medium">
            查看渣打交稅詳情 <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Section 5: 滙豐/恒生交稅 */}
      <section id="bocpay" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Building className="h-6 w-6 text-red-500" />
          5. 滙豐 / 恒生 / 中銀交稅攻略
        </h2>

        <p>
          如果你係<strong>滙豐、恒生或中銀客戶</strong>，透過網上理財交稅都有唔錯嘅優惠：
        </p>

        <div className="not-prose grid md:grid-cols-3 gap-4 my-6">
          <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4 border border-red-200 dark:border-red-800">
            <h4 className="font-bold text-red-800 dark:text-red-200 mb-2">🔴 滙豐銀行</h4>
            <p className="text-2xl font-bold text-red-600 mb-1">高達 $1,100</p>
            <p className="text-red-700 dark:text-red-300 text-sm">
              交稅 $30,000+<br/>
              累積簽賬 $10,000<br/>
              期限：2025/11/17 - 2026/2/28
            </p>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
            <h4 className="font-bold text-blue-800 dark:text-blue-200 mb-2">🔵 恒生銀行</h4>
            <p className="text-2xl font-bold text-blue-600 mb-1">高達 $700</p>
            <p className="text-blue-700 dark:text-blue-300 text-sm">
              交稅 $10,000+<br/>
              累積簽賬 $5,000<br/>
              期限：2025/11/25 - 2026/3/31
            </p>
          </div>
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-4 border border-orange-200 dark:border-orange-800">
            <h4 className="font-bold text-orange-800 dark:text-orange-200 mb-2">🟠 中銀香港</h4>
            <p className="text-2xl font-bold text-orange-600 mb-1">高達 $3,888</p>
            <p className="text-orange-700 dark:text-orange-300 text-sm">
              透過 BoC Pay / 網上理財<br/>
              交稅金額愈高愈多<br/>
              期限：2025/11/1 - 12/30
            </p>
          </div>
        </div>
      </section>

      {/* Section 6: 銀行優惠 */}
      <section id="bank-offers" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Landmark className="h-6 w-6 text-indigo-500" />
          6. 各銀行交稅優惠
        </h2>

        <p>
          各大銀行每年都會推出<strong>交稅優惠</strong>，包括額外積分、免息分期等：
        </p>

        <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden my-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-indigo-50 dark:bg-indigo-900/20">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-indigo-600 dark:text-indigo-400">銀行</th>
                  <th className="px-4 py-3 text-left font-medium text-indigo-600 dark:text-indigo-400">優惠</th>
                  <th className="px-4 py-3 text-center font-medium text-indigo-600 dark:text-indigo-400">期限</th>
                  <th className="px-4 py-3 text-left font-medium text-indigo-600 dark:text-indigo-400">備註</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {bankTaxOffers.map((offer, index) => (
                  <tr key={index} className={offer.link ? "bg-teal-50/50 dark:bg-teal-900/10" : ""}>
                    <td className="px-4 py-3 font-bold text-gray-900 dark:text-white">{offer.bank}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                      {offer.link ? (
                        <Link href={offer.link} className="text-teal-600 hover:underline font-medium">{offer.offer}</Link>
                      ) : (
                        offer.offer
                      )}
                    </td>
                    <td className="px-4 py-3 text-center text-gray-600 dark:text-gray-400">{offer.period}</td>
                    <td className="px-4 py-3 text-gray-500 dark:text-gray-500 text-xs">{offer.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="not-prose bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <p className="text-blue-700 dark:text-blue-300 text-sm">
              <strong>提示：</strong>各銀行交稅優惠每年可能有變動，
              建議喺交稅季節（1-4 月）留意銀行最新推廣。
            </p>
          </div>
        </div>
      </section>

      {/* Section 7: 分期 */}
      <section id="installment" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Clock className="h-6 w-6 text-teal-500" />
          7. 交稅分期計劃比較
        </h2>

        <p>
          如果稅款金額大，可以申請<strong>交稅分期</strong>，部分銀行提供<strong>免息免手續費</strong>分期：
        </p>

        <div className="not-prose grid md:grid-cols-2 gap-4 my-6">
          <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 border border-green-200 dark:border-green-800">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <h4 className="font-bold text-green-800 dark:text-green-200">免息分期優點</h4>
            </div>
            <ul className="text-green-700 dark:text-green-300 text-sm space-y-1">
              <li>• 減輕即時現金壓力</li>
              <li>• 唔使一次過俾晒</li>
              <li>• 可以將資金用喺其他投資</li>
            </ul>
          </div>
          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 border border-amber-200 dark:border-amber-800">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              <h4 className="font-bold text-amber-800 dark:text-amber-200">注意事項</h4>
            </div>
            <ul className="text-amber-700 dark:text-amber-300 text-sm space-y-1">
              <li>• 名額有限，先到先得</li>
              <li>• 需要申請，唔係自動</li>
              <li>• 部分銀行有最低金額要求</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 8: 推薦信用卡 */}
      <section id="best-cards" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Trophy className="h-6 w-6 text-amber-500" />
          8. 交稅信用卡推薦
        </h2>

        <p>
          以下係<strong>交稅信用卡 {currentYear}/{nextYear}</strong> 推薦：
        </p>

        <div className="not-prose space-y-4 my-6">
          {recommendedCards.map((card, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xl mr-2">{["🥇", "🥈", "🥉", "4️⃣", "5️⃣"][index]}</span>
                  <Link href={`/cards/${card.id}`} className="font-bold text-blue-600 hover:underline dark:text-blue-400">{card.card}</Link>
                  <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                    {card.highlight}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-green-600 dark:text-green-400">{card.rate}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{card.reason}</p>
              <p className="text-xs text-gray-500 mt-1">透過：{card.method}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Card Preview Section */}
      <CardPreviewSection 
        title="📌 交稅推薦信用卡一覽"
        subtitle="點擊查看詳細回贈條款及申請連結"
        cards={[
          { id: "sc-simply-cash", highlight: "🔥渣打$2,300" },
          { id: "sc-cathay", highlight: "🔥23,000里" },
          { id: "hsbc-vs", highlight: "🔥滙豐$1,100" },
          { id: "hangseng-mmpower", highlight: "恒生$700" },
        ]}
      />

      {/* Section 9: 貼士 */}
      <section id="tips" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Zap className="h-6 w-6 text-yellow-500" />
          9. 交稅慳錢貼士
        </h2>

        <div className="not-prose space-y-3">
          {[
            { icon: "📝", title: "記得登記！", desc: "各銀行交稅優惠都需要預先登記，唔登記就無回贈" },
            { icon: "💳", title: "揀最高回贈銀行", desc: "渣打 $2,300 / 滙豐 $1,100 / 恒生 $700 / 中銀 $3,888" },
            { icon: "📅", title: "留意推廣期限", desc: "各銀行推廣期限唔同，渣打 2/2 截止、滙豐 2/28 截止" },
            { icon: "🔄", title: "考慮分期 + 早鳥", desc: "渣打分期有額外獎賞，早鳥（12/31前）再加 $100-$300" },
            { icon: "🎯", title: "配合累積簽賬", desc: "滙豐/恒生需額外累積簽賬才可獲獎賞，記得留意條款" },
          ].map((tip, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 flex items-start gap-4">
              <span className="text-2xl">{tip.icon}</span>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-1">{tip.title}</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{tip.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 10: FAQ */}
      <section id="faq" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          ❓ 10. 常見問題 FAQ
        </h2>
        
        <div className="not-prose space-y-4">
          {taxPaymentFaqData.map((faq, index) => (
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
      <div className="not-prose bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl p-6 text-white mb-10">
        <h3 className="text-xl font-bold mb-2">💳 想知邊張信用卡最適合你？</h3>
        <p className="mb-4 opacity-90">用我哋嘅計算機，輸入你嘅消費習慣，即刻搵到最高回贈嘅信用卡！</p>
        <Link href="/">
          <Button className="bg-white text-blue-600 hover:bg-gray-100">
            <Calculator className="h-4 w-4 mr-2" />
            立即計算回贈
          </Button>
        </Link>
      </div>

      {/* Related Links */}
      <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">🔗 相關文章</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <Link href="/discover/utility-bill-guide" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
            <Zap className="h-5 w-5 text-emerald-600" />
            <span>信用卡繳費攻略</span>
            <ChevronRight className="h-4 w-4 ml-auto text-gray-400" />
          </Link>
          <Link href="/discover/rent-payment-guide" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
            <Home className="h-5 w-5 text-emerald-600" />
            <span>信用卡交租攻略</span>
            <ChevronRight className="h-4 w-4 ml-auto text-gray-400" />
          </Link>
          <Link href="/discover/best-cashback-cards" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
            <DollarSign className="h-5 w-5 text-emerald-600" />
            <span>最高回贈信用卡比較</span>
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

