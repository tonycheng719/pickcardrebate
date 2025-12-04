// Uber 信用卡攻略
// 用於 /discover/uber-guide 頁面

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  ChevronRight, ChevronDown, CreditCard, Car, MapPin,
  Calculator, Trophy, DollarSign, CheckCircle, AlertTriangle,
  Star, Info, Zap, Percent, Gift, Clock, Smartphone
} from "lucide-react";
import { CardPreviewSection } from "@/app/discover/components/card-preview-section";

// FAQ 數據
export const uberFaqData = [
  {
    question: "Uber 用邊張信用卡最抵？",
    answer: "Uber 最抵信用卡：渣打國泰卡（免 CBF + $4/里）、SC Simply Cash（免 CBF + 2%）。Uber 係外幣簽賬（美元），用免 CBF 卡最抵。"
  },
  {
    question: "Uber 有信用卡手續費嗎？",
    answer: "Uber 以美元計價，大部分信用卡有約 1.95% CBF 手續費。建議用免 CBF 信用卡（如渣打國泰卡、Simply Cash）避免手續費。"
  },
  {
    question: "Uber 當網購定交通？",
    answer: "Uber 通常當「海外網上簽賬」處理，唔係「交通」類別。用網購高回贈卡（如 Red Card 4%）會有 CBF 手續費，淨回贈約 2%。"
  },
  {
    question: "Uber Eats 用邊張卡？",
    answer: "Uber Eats 同 Uber 一樣係美元計價，有 CBF 手續費。建議用免 CBF 卡（如 SC Simply Cash 2%）。或者用 AlipayHK 付款免手續費。"
  },
  {
    question: "Uber 可以用 AlipayHK 付款嗎？",
    answer: "Uber 支援 AlipayHK 付款，可以免 CBF 手續費。喺 Uber App 加入 AlipayHK 作為付款方式即可。"
  },
  {
    question: "Uber 優惠碼點用？",
    answer: "Uber 優惠碼喺 App「錢包」>「優惠」輸入。新用戶通常有首程優惠，留意銀行信用卡優惠碼。"
  },
  {
    question: "Uber 同的士邊個抵？",
    answer: "視乎時段同距離。Uber 喺非繁忙時段通常較平，但「動態定價」時可能較貴。建議用 App 比較價格。"
  },
  {
    question: "Uber 機場接送用邊張卡？",
    answer: "機場接送用免 CBF 卡最抵：渣打國泰卡（$4/里）、SC Simply Cash（2%）。機場接送費用較高，回贈更明顯。"
  }
];

// Uber 服務類型
const uberServices = [
  {
    service: "UberX",
    icon: "🚗",
    description: "標準私家車",
    pricing: "最經濟",
    bestFor: "日常出行",
  },
  {
    service: "Uber Comfort",
    icon: "🚙",
    description: "較新車款、更多空間",
    pricing: "中等",
    bestFor: "商務出行",
  },
  {
    service: "Uber Black",
    icon: "🖤",
    description: "高級轎車",
    pricing: "較貴",
    bestFor: "重要場合",
  },
  {
    service: "Uber Eats",
    icon: "🍔",
    description: "外賣送餐",
    pricing: "視乎餐廳",
    bestFor: "外賣",
  },
];

// 付款方式比較
const paymentMethods = [
  {
    method: "免 CBF 信用卡",
    icon: "💳",
    fee: "0%",
    rebate: "1.5% - 2%",
    highlight: "推薦",
    note: "渣打國泰卡 / Simply Cash",
    bestCards: ["sc-cathay", "sc-simply-cash"],
  },
  {
    method: "一般信用卡",
    icon: "💳",
    fee: "約 1.95%",
    rebate: "0.4% - 4%",
    highlight: "有手續費",
    note: "淨回贈較低",
    bestCards: ["hsbc-red", "hangseng-mmpower"],
  },
  {
    method: "AlipayHK",
    icon: "💙",
    fee: "0%",
    rebate: "信用卡增值回贈",
    highlight: "免手續費",
    note: "可免 CBF",
    bestCards: ["hangseng-mmpower", "hsbc-red"],
  },
];

// 信用卡回贈比較
const cardComparison = [
  {
    card: "渣打國泰 Mastercard",
    id: "sc-cathay",
    rate: "$4/里",
    cbfFree: true,
    netRate: "$4/里（約 2.5%）",
    highlight: "免 CBF 最強",
    note: "免 CBF + 儲里數",
  },
  {
    card: "渣打 Simply Cash",
    id: "sc-simply-cash",
    rate: "2%",
    cbfFree: true,
    netRate: "2%",
    highlight: "免 CBF 現金",
    note: "免 CBF + 2% 無上限",
  },
  {
    card: "安信 EarnMORE",
    id: "earnmore",
    rate: "2%",
    cbfFree: true,
    netRate: "2%",
    highlight: "免 CBF",
    note: "免 CBF + 2% 無上限",
  },
  {
    card: "Citi PremierMiles",
    id: "citi-premiermiles",
    rate: "$3/里",
    cbfFree: true,
    netRate: "$3/里（約 3.3%）",
    highlight: "海外最強",
    note: "免 CBF + $3/里海外",
  },
  {
    card: "HSBC Red Card",
    id: "hsbc-red",
    rate: "4%",
    cbfFree: false,
    netRate: "約 2%（扣 CBF）",
    highlight: "有 CBF",
    note: "4% - 1.95% CBF = 2.05%",
  },
];

// 回贈計算例子
const rebateExamples = [
  {
    scenario: "市區車程 $100",
    cards: [
      { card: "SC Simply Cash", cbf: 0, rebate: 2, net: 2 },
      { card: "渣打國泰卡", cbf: 0, rebate: 2.5, net: 2.5 },
      { card: "HSBC Red Card", cbf: 1.95, rebate: 4, net: 2.05 },
      { card: "普通卡 0.4%", cbf: 1.95, rebate: 0.4, net: -1.55 },
    ],
  },
  {
    scenario: "機場接送 $300",
    cards: [
      { card: "SC Simply Cash", cbf: 0, rebate: 6, net: 6 },
      { card: "渣打國泰卡", cbf: 0, rebate: 7.5, net: 7.5 },
      { card: "HSBC Red Card", cbf: 5.85, rebate: 12, net: 6.15 },
      { card: "普通卡 0.4%", cbf: 5.85, rebate: 1.2, net: -4.65 },
    ],
  },
];

// 省錢攻略
const savingTips = [
  {
    tip: "用免 CBF 信用卡",
    icon: "💳",
    description: "避免 1.95% 手續費",
  },
  {
    tip: "避開繁忙時段",
    icon: "⏰",
    description: "動態定價時車費較貴",
  },
  {
    tip: "善用優惠碼",
    icon: "🎫",
    description: "新用戶優惠、銀行優惠碼",
  },
  {
    tip: "比較 Uber vs 的士",
    icon: "🚕",
    description: "視乎時段選擇較平方案",
  },
  {
    tip: "用 Uber Pass",
    icon: "👑",
    description: "經常搭 Uber 可考慮月費計劃",
  },
  {
    tip: "AlipayHK 付款",
    icon: "💙",
    description: "可免 CBF 手續費",
  },
];

export function UberGuide() {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      {/* 引言 */}
      <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-6">
        Uber 用邊張信用卡最抵？有 CBF 手續費嗎？
        本文教你 <strong>{currentYear} Uber 信用卡攻略</strong>，
        扣埋手續費仲淨賺 <strong>2% 回贈</strong>！
      </p>

      {/* 目錄 */}
      <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-10">
        <h2 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          📑 本文目錄
        </h2>
        <ul className="space-y-2 text-sm">
          <li><a href="#overview" className="text-blue-600 dark:text-blue-400 hover:underline">1. Uber 信用卡回贈點計？</a></li>
          <li><a href="#cbf-trap" className="text-blue-600 dark:text-blue-400 hover:underline">2. CBF 手續費陷阱</a></li>
          <li><a href="#payment-methods" className="text-blue-600 dark:text-blue-400 hover:underline">3. 付款方式比較</a></li>
          <li><a href="#card-comparison" className="text-blue-600 dark:text-blue-400 hover:underline">4. 信用卡回贈比較</a></li>
          <li><a href="#rebate-calc" className="text-blue-600 dark:text-blue-400 hover:underline">5. 回贈計算例子</a></li>
          <li><a href="#uber-eats" className="text-blue-600 dark:text-blue-400 hover:underline">6. Uber Eats 攻略</a></li>
          <li><a href="#tips" className="text-blue-600 dark:text-blue-400 hover:underline">7. Uber 慳錢攻略</a></li>
          <li><a href="#faq" className="text-blue-600 dark:text-blue-400 hover:underline">8. 常見問題 FAQ</a></li>
        </ul>
      </div>

      {/* Section 1: 總覽 */}
      <section id="overview" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Car className="h-6 w-6 text-black" />
          1. Uber 信用卡回贈點計？
        </h2>
        
        <p>
          Uber 以<strong>美元</strong>計價，大部分信用卡會收取約 <strong>1.95% CBF 手續費</strong>。
          所以用 Uber 最緊要揀<strong>免 CBF 信用卡</strong>！
        </p>

        <div className="not-prose bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-900/50 dark:to-slate-900/50 rounded-2xl p-5 border border-gray-200 dark:border-gray-700 my-6">
          <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-3">🚗 Uber 回贈計算</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-100 dark:border-gray-700">
              <p className="text-sm text-green-600 font-bold mb-1">✅ 免 CBF 信用卡</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">無手續費，淨賺回贈</p>
              <p className="text-xs text-gray-500">SC Simply Cash 2% / 國泰卡 $4/里</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-100 dark:border-gray-700">
              <p className="text-sm text-red-600 font-bold mb-1">❌ 一般信用卡</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">有 1.95% CBF，食回贈</p>
              <p className="text-xs text-gray-500">Red Card 4% - 1.95% = 2.05%</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: CBF 陷阱 */}
      <section id="cbf-trap" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <AlertTriangle className="h-6 w-6 text-amber-500" />
          2. CBF 手續費陷阱
        </h2>

        <p>
          Uber 係美國公司，所有交易以<strong>美元</strong>結算，
          所以大部分信用卡會收取 <strong>CBF 手續費（約 1.95%）</strong>：
        </p>

        <div className="not-prose bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 my-6">
          <h4 className="font-bold text-amber-800 dark:text-amber-200 mb-2">⚠️ CBF 計算例子</h4>
          <p className="text-amber-700 dark:text-amber-300 text-sm">
            車費 $100：<br/>
            • <strong>有 CBF 卡</strong>：$100 × 1.95% = $1.95 手續費<br/>
            • 如果用 <Link href="/cards/hsbc-red" className="underline">HSBC Red Card</Link> 4% 回贈：$4 - $1.95 = <strong>淨回贈 $2.05</strong><br/>
            • 如果用 <Link href="/cards/sc-simply-cash" className="underline">SC Simply Cash</Link> 2% 免 CBF：<strong>淨回贈 $2</strong>
          </p>
        </div>

        <div className="not-prose bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
          <h4 className="font-bold text-green-800 dark:text-green-200 mb-2">✅ 免 CBF 信用卡推薦</h4>
          <ul className="text-green-700 dark:text-green-300 text-sm space-y-1">
            <li>• <Link href="/cards/sc-cathay" className="underline">渣打國泰 Mastercard</Link>（$4/里 ≈ 2.5%）</li>
            <li>• <Link href="/cards/sc-simply-cash" className="underline">渣打 Simply Cash</Link>（2%）</li>
            <li>• <Link href="/cards/earnmore" className="underline">安信 EarnMORE</Link>（2%）</li>
            <li>• <Link href="/cards/citi-premiermiles" className="underline">Citi PremierMiles</Link>（$3/里海外）</li>
          </ul>
        </div>
      </section>

      {/* Section 3: 付款方式比較 */}
      <section id="payment-methods" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Smartphone className="h-6 w-6 text-blue-500" />
          3. 付款方式比較
        </h2>

        <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden my-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-blue-50 dark:bg-blue-900/20">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-blue-600 dark:text-blue-400">付款方式</th>
                  <th className="px-4 py-3 text-center font-medium text-blue-600 dark:text-blue-400">手續費</th>
                  <th className="px-4 py-3 text-center font-medium text-blue-600 dark:text-blue-400">回贈</th>
                  <th className="px-4 py-3 text-left font-medium text-blue-600 dark:text-blue-400">推薦信用卡</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {paymentMethods.map((method, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{method.icon}</span>
                        <div>
                          <p className="font-medium">{method.method}</p>
                          <span className={`text-xs px-2 py-0.5 rounded ${
                            method.highlight === "推薦" || method.highlight === "免手續費"
                              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                          }`}>
                            {method.highlight}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`font-bold ${method.fee === "0%" ? "text-green-600" : "text-red-600"}`}>
                        {method.fee}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center text-gray-600 dark:text-gray-400">{method.rebate}</td>
                    <td className="px-4 py-3 text-xs">
                      {method.bestCards.map((cardId, i) => (
                        <span key={i}>
                          {i > 0 && "、"}
                          <Link href={`/cards/${cardId}`} className="text-blue-600 hover:underline">
                            {cardComparison.find(c => c.id === cardId)?.card.replace(" Mastercard", "").replace(" Visa", "") || cardId}
                          </Link>
                        </span>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section 4: 信用卡比較 */}
      <section id="card-comparison" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Percent className="h-6 w-6 text-green-500" />
          4. 信用卡回贈比較
        </h2>

        <div className="not-prose space-y-4 my-6">
          {cardComparison.map((card, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4">
              <div className="flex items-start justify-between">
                <div>
                  <Link href={`/cards/${card.id}`} className="font-bold text-blue-600 hover:underline dark:text-blue-400">{card.card}</Link>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold ${
                      card.cbfFree 
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                    }`}>
                      {card.cbfFree ? "免 CBF" : "有 CBF"}
                    </span>
                    <span className="text-xs text-gray-500">{card.highlight}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-bold text-green-600 dark:text-green-400">{card.rate}</span>
                  <p className="text-xs text-gray-500">淨回贈：{card.netRate}</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">{card.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Card Preview Section */}
      <CardPreviewSection 
        title="📌 Uber 推薦信用卡"
        subtitle="免 CBF 信用卡最抵！點擊查看詳細條款"
        cards={[
          { id: "sc-cathay", highlight: "免 CBF" },
          { id: "sc-simply-cash", highlight: "免 CBF 2%" },
          { id: "citi-premiermiles", highlight: "$3/里海外" },
          { id: "earnmore", highlight: "2% 無上限" },
        ]}
      />

      {/* Section 5: 回贈計算 */}
      <section id="rebate-calc" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Calculator className="h-6 w-6 text-teal-500" />
          5. 回贈計算例子
        </h2>

        <div className="not-prose space-y-6 my-6">
          {rebateExamples.map((example, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4">
              <h4 className="font-bold text-gray-900 dark:text-white mb-3">📊 {example.scenario}</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 dark:bg-gray-900">
                    <tr>
                      <th className="px-3 py-2 text-left">信用卡</th>
                      <th className="px-3 py-2 text-center">CBF</th>
                      <th className="px-3 py-2 text-center">回贈</th>
                      <th className="px-3 py-2 text-center">淨回贈</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    {example.cards.map((card, i) => (
                      <tr key={i}>
                        <td className="px-3 py-2">{card.card}</td>
                        <td className="px-3 py-2 text-center text-red-600">{card.cbf > 0 ? `-$${card.cbf}` : "-"}</td>
                        <td className="px-3 py-2 text-center text-green-600">+${card.rebate}</td>
                        <td className={`px-3 py-2 text-center font-bold ${card.net >= 0 ? "text-green-600" : "text-red-600"}`}>
                          {card.net >= 0 ? `+$${card.net}` : `-$${Math.abs(card.net)}`}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>

        <div className="not-prose bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <p className="text-blue-700 dark:text-blue-300 text-sm">
              <strong>結論：</strong>用 <Link href="/cards/sc-simply-cash" className="underline">SC Simply Cash</Link> 或 <Link href="/cards/sc-cathay" className="underline">渣打國泰卡</Link>，
              淨回贈最高，無需擔心 CBF 手續費！
            </p>
          </div>
        </div>
      </section>

      {/* Section 6: Uber Eats */}
      <section id="uber-eats" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          🍔 6. Uber Eats 攻略
        </h2>

        <p>
          Uber Eats 同 Uber 一樣係美元計價，有 CBF 手續費。最佳策略：
        </p>

        <div className="not-prose grid md:grid-cols-2 gap-4 my-6">
          <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 border border-green-200 dark:border-green-800">
            <h4 className="font-bold text-green-800 dark:text-green-200 mb-2">✅ 方法一：免 CBF 卡</h4>
            <ul className="text-green-700 dark:text-green-300 text-sm space-y-1">
              <li>• <Link href="/cards/sc-simply-cash" className="underline">SC Simply Cash</Link>（2%）</li>
              <li>• <Link href="/cards/earnmore" className="underline">安信 EarnMORE</Link>（2%）</li>
              <li>• 無手續費，直接賺回贈</li>
            </ul>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
            <h4 className="font-bold text-blue-800 dark:text-blue-200 mb-2">✅ 方法二：AlipayHK</h4>
            <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1">
              <li>• AlipayHK 付款免 CBF</li>
              <li>• 用 <Link href="/cards/hangseng-mmpower" className="underline">MMPOWER</Link> 增值（5%）</li>
              <li>• 免手續費 + 高回贈</li>
            </ul>
          </div>
        </div>

        <div className="not-prose bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-amber-700 dark:text-amber-300 text-sm">
              <strong>提醒：</strong>Uber Eats 唔同本地外賣平台（Foodpanda、KeeTa），
              係外幣簽賬！用一般信用卡會有 CBF 手續費。
            </p>
          </div>
        </div>
      </section>

      {/* Section 7: 慳錢攻略 */}
      <section id="tips" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Zap className="h-6 w-6 text-yellow-500" />
          7. Uber 慳錢攻略
        </h2>

        <div className="not-prose grid md:grid-cols-2 gap-3 my-6">
          {savingTips.map((tip, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 flex items-start gap-3">
              <span className="text-2xl">{tip.icon}</span>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-1">{tip.tip}</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{tip.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="not-prose bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-900/50 dark:to-slate-900/50 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2">🎫 Uber 優惠碼</h4>
          <p className="text-gray-700 dark:text-gray-300 text-sm">
            • 新用戶首程優惠<br/>
            • 銀行信用卡優惠碼（留意銀行 App）<br/>
            • Uber Pass 會員月費計劃
          </p>
        </div>
      </section>

      {/* Section 8: FAQ */}
      <section id="faq" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          ❓ 8. 常見問題 FAQ
        </h2>
        
        <div className="not-prose space-y-4">
          {uberFaqData.map((faq, index) => (
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
      <div className="not-prose bg-gradient-to-r from-gray-800 to-black rounded-2xl p-6 text-white mb-10">
        <h3 className="text-xl font-bold mb-2">🚗 想知邊張信用卡搭 Uber 最抵？</h3>
        <p className="mb-4 opacity-90">用我哋嘅計算機，即刻搵到最適合你嘅信用卡！</p>
        <Link href="/">
          <Button className="bg-white text-gray-800 hover:bg-gray-100">
            <Calculator className="h-4 w-4 mr-2" />
            立即計算回贈
          </Button>
        </Link>
      </div>

      {/* Related Links */}
      <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">🔗 相關文章</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <Link href="/discover/overseas-fee" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
            <DollarSign className="h-5 w-5 text-emerald-600" />
            <span>海外簽賬手續費攻略</span>
            <ChevronRight className="h-4 w-4 ml-auto text-gray-400" />
          </Link>
          <Link href="/discover/food-delivery-guide" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
            <Gift className="h-5 w-5 text-emerald-600" />
            <span>外賣平台信用卡攻略</span>
            <ChevronRight className="h-4 w-4 ml-auto text-gray-400" />
          </Link>
          <Link href="/cards" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
            <CreditCard className="h-5 w-5 text-emerald-600" />
            <span>所有信用卡比較</span>
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

