// iHerb 信用卡攻略
// 用於 /discover/iherb-guide 頁面

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  ChevronRight, ChevronDown, CreditCard, Heart, Pill,
  Calculator, Trophy, DollarSign, CheckCircle, AlertTriangle,
  Star, Info, Zap, Percent, Gift, Truck, Globe
} from "lucide-react";
import { CardPreviewSection } from "@/app/discover/components/card-preview-section";

// FAQ 數據
export const iherbFaqData = [
  {
    question: "iHerb 用邊張信用卡最抵？",
    answer: "iHerb 最抵信用卡：渣打國泰卡（免 CBF + $4/里）、SC Simply Cash（免 CBF + 2%）。iHerb 係美元計價，用免 CBF 卡最抵。"
  },
  {
    question: "iHerb 有信用卡手續費嗎？",
    answer: "iHerb 以美元計價，大部分信用卡有約 1.95% CBF 手續費。建議用免 CBF 信用卡（如渣打國泰卡、Simply Cash）避免手續費。"
  },
  {
    question: "iHerb 運費幾錢？",
    answer: "iHerb 運費視乎訂單金額。滿 US$40（約 HK$312）通常免運費。未滿金額運費約 US$4-8。建議湊單免運。"
  },
  {
    question: "iHerb 有關稅嗎？",
    answer: "iHerb 直郵香港通常無關稅（個人使用）。但如果訂單金額太大或商品數量太多，有機會被抽查。建議分單購買。"
  },
  {
    question: "iHerb 優惠碼點用？",
    answer: "iHerb 優惠碼喺結帳頁面輸入。新用戶通常有首單優惠，留意網站首頁 Banner 或用推薦碼。"
  },
  {
    question: "iHerb 退款點處理？",
    answer: "iHerb 退款會退回原支付方式。信用卡退款通常 5-10 個工作天。如商品有問題可聯絡客服處理。"
  },
  {
    question: "iHerb 邊啲產品值得買？",
    answer: "iHerb 熱門產品：維他命、魚油、益生菌、蛋白粉、有機食品、護膚品。價格通常比本地代購平 30-50%。"
  },
  {
    question: "iHerb 送貨要幾耐？",
    answer: "iHerb 直郵香港通常 7-14 個工作天。可選擇 DHL 快遞（較貴但較快）或標準郵寄。"
  }
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
    method: "PayPal",
    icon: "🅿️",
    fee: "視乎設定",
    rebate: "信用卡回贈",
    highlight: "方便",
    note: "可綁定信用卡",
    bestCards: ["sc-simply-cash", "earnmore"],
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
    scenario: "小額訂單 HK$300",
    cards: [
      { card: "SC Simply Cash", cbf: 0, rebate: 6, net: 6 },
      { card: "渣打國泰卡", cbf: 0, rebate: 7.5, net: 7.5 },
      { card: "HSBC Red Card", cbf: 5.85, rebate: 12, net: 6.15 },
      { card: "普通卡 0.4%", cbf: 5.85, rebate: 1.2, net: -4.65 },
    ],
  },
  {
    scenario: "大額訂單 HK$800",
    cards: [
      { card: "SC Simply Cash", cbf: 0, rebate: 16, net: 16 },
      { card: "渣打國泰卡", cbf: 0, rebate: 20, net: 20 },
      { card: "HSBC Red Card", cbf: 15.6, rebate: 32, net: 16.4 },
      { card: "普通卡 0.4%", cbf: 15.6, rebate: 3.2, net: -12.4 },
    ],
  },
];

// 熱門產品類別
const popularCategories = [
  {
    category: "維他命補充品",
    icon: "💊",
    examples: "維他命 C、D3、B 群、綜合維他命",
    savings: "比本地平 30-50%",
  },
  {
    category: "魚油 Omega-3",
    icon: "🐟",
    examples: "Nordic Naturals、Now Foods",
    savings: "比本地平 40%",
  },
  {
    category: "益生菌",
    icon: "🦠",
    examples: "Culturelle、Garden of Life",
    savings: "比本地平 35%",
  },
  {
    category: "蛋白粉",
    icon: "💪",
    examples: "Optimum Nutrition、Muscletech",
    savings: "比本地平 25%",
  },
  {
    category: "有機食品",
    icon: "🌿",
    examples: "有機堅果、椰子油、蜂蜜",
    savings: "比本地平 30%",
  },
  {
    category: "護膚品",
    icon: "✨",
    examples: "CeraVe、The Ordinary",
    savings: "比本地平 20-40%",
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
    tip: "湊單免運費",
    icon: "📦",
    description: "滿 US$40 免運費",
  },
  {
    tip: "善用優惠碼",
    icon: "🎫",
    description: "新用戶優惠、推薦碼",
  },
  {
    tip: "留意特價活動",
    icon: "🏷️",
    description: "iHerb 經常有折扣",
  },
  {
    tip: "訂閱自動購買",
    icon: "🔄",
    description: "訂閱產品有額外折扣",
  },
  {
    tip: "分單避關稅",
    icon: "✂️",
    description: "大額訂單分開購買",
  },
];

export function IherbGuide() {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      {/* 引言 */}
      <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-6">
        iHerb 買保健品用邊張信用卡最抵？有 CBF 手續費嗎？
        本文教你 <strong>{currentYear} iHerb 信用卡攻略</strong>，
        扣埋手續費仲淨賺 <strong>2% 回贈</strong>！
      </p>

      {/* 目錄 */}
      <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-10">
        <h2 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          📑 本文目錄
        </h2>
        <ul className="space-y-2 text-sm">
          <li><a href="#overview" className="text-blue-600 dark:text-blue-400 hover:underline">1. iHerb 信用卡回贈點計？</a></li>
          <li><a href="#cbf-trap" className="text-blue-600 dark:text-blue-400 hover:underline">2. CBF 手續費陷阱</a></li>
          <li><a href="#card-comparison" className="text-blue-600 dark:text-blue-400 hover:underline">3. 信用卡回贈比較</a></li>
          <li><a href="#rebate-calc" className="text-blue-600 dark:text-blue-400 hover:underline">4. 回贈計算例子</a></li>
          <li><a href="#popular-products" className="text-blue-600 dark:text-blue-400 hover:underline">5. iHerb 熱門產品</a></li>
          <li><a href="#shipping" className="text-blue-600 dark:text-blue-400 hover:underline">6. 運費及關稅</a></li>
          <li><a href="#tips" className="text-blue-600 dark:text-blue-400 hover:underline">7. iHerb 慳錢攻略</a></li>
          <li><a href="#faq" className="text-blue-600 dark:text-blue-400 hover:underline">8. 常見問題 FAQ</a></li>
        </ul>
      </div>

      {/* Section 1: 總覽 */}
      <section id="overview" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Heart className="h-6 w-6 text-green-500" />
          1. iHerb 信用卡回贈點計？
        </h2>
        
        <p>
          iHerb 以<strong>美元</strong>計價，大部分信用卡會收取約 <strong>1.95% CBF 手續費</strong>。
          所以買 iHerb 最緊要揀<strong>免 CBF 信用卡</strong>！
        </p>

        <div className="not-prose bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-5 border border-green-200 dark:border-green-800 my-6">
          <h4 className="font-bold text-green-800 dark:text-green-200 mb-3">💊 iHerb 回贈計算</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-green-100 dark:border-green-700">
              <p className="text-sm text-green-600 font-bold mb-1">✅ 免 CBF 信用卡</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">無手續費，淨賺回贈</p>
              <p className="text-xs text-gray-500">SC Simply Cash 2% / 國泰卡 $4/里</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-green-100 dark:border-green-700">
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
          iHerb 係美國公司，所有交易以<strong>美元</strong>結算，
          所以大部分信用卡會收取 <strong>CBF 手續費（約 1.95%）</strong>：
        </p>

        <div className="not-prose bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 my-6">
          <h4 className="font-bold text-amber-800 dark:text-amber-200 mb-2">⚠️ CBF 計算例子</h4>
          <p className="text-amber-700 dark:text-amber-300 text-sm">
            訂單 HK$500：<br/>
            • <strong>有 CBF 卡</strong>：$500 × 1.95% = $9.75 手續費<br/>
            • 如果用 <Link href="/cards/hsbc-red" className="underline">HSBC Red Card</Link> 4% 回贈：$20 - $9.75 = <strong>淨回贈 $10.25</strong><br/>
            • 如果用 <Link href="/cards/sc-simply-cash" className="underline">SC Simply Cash</Link> 2% 免 CBF：<strong>淨回贈 $10</strong>
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

      {/* Section 3: 信用卡比較 */}
      <section id="card-comparison" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Percent className="h-6 w-6 text-blue-500" />
          3. 信用卡回贈比較
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
        title="📌 iHerb 推薦信用卡"
        subtitle="免 CBF 信用卡最抵！點擊查看詳細條款"
        cards={[
          { id: "sc-cathay", highlight: "免 CBF" },
          { id: "sc-simply-cash", highlight: "免 CBF 2%" },
          { id: "citi-premiermiles", highlight: "$3/里海外" },
          { id: "earnmore", highlight: "2% 無上限" },
        ]}
      />

      {/* Section 4: 回贈計算 */}
      <section id="rebate-calc" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Calculator className="h-6 w-6 text-teal-500" />
          4. 回贈計算例子
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
      </section>

      {/* Section 5: 熱門產品 */}
      <section id="popular-products" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Pill className="h-6 w-6 text-purple-500" />
          5. iHerb 熱門產品
        </h2>

        <p>
          iHerb 產品價格通常比本地代購平 <strong>20-50%</strong>！以下係熱門類別：
        </p>

        <div className="not-prose grid md:grid-cols-2 gap-4 my-6">
          {popularCategories.map((category, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{category.icon}</span>
                <h4 className="font-bold text-gray-900 dark:text-white">{category.category}</h4>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{category.examples}</p>
              <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-2 py-0.5 rounded">
                {category.savings}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Section 6: 運費及關稅 */}
      <section id="shipping" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Truck className="h-6 w-6 text-indigo-500" />
          6. 運費及關稅
        </h2>

        <div className="not-prose grid md:grid-cols-2 gap-4 my-6">
          <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-4 border border-indigo-200 dark:border-indigo-800">
            <h4 className="font-bold text-indigo-800 dark:text-indigo-200 mb-2">📦 運費</h4>
            <ul className="text-indigo-700 dark:text-indigo-300 text-sm space-y-1">
              <li>• 滿 <strong>US$40（約 HK$312）免運費</strong></li>
              <li>• 未滿運費約 US$4-8</li>
              <li>• DHL 快遞較貴但較快</li>
              <li>• 標準郵寄 7-14 天</li>
            </ul>
          </div>
          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 border border-amber-200 dark:border-amber-800">
            <h4 className="font-bold text-amber-800 dark:text-amber-200 mb-2">🛃 關稅</h4>
            <ul className="text-amber-700 dark:text-amber-300 text-sm space-y-1">
              <li>• 個人使用<strong>通常無關稅</strong></li>
              <li>• 大額訂單有機會被抽查</li>
              <li>• 建議單次訂單 &lt; HK$1,000</li>
              <li>• 可分單購買避免問題</li>
            </ul>
          </div>
        </div>

        <div className="not-prose bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <p className="text-blue-700 dark:text-blue-300 text-sm">
              <strong>建議：</strong>每次訂單控制喺 US$40-80（約 HK$312-624）左右，
              免運費之餘又唔會太大額引起關稅問題。
            </p>
          </div>
        </div>
      </section>

      {/* Section 7: 慳錢攻略 */}
      <section id="tips" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Zap className="h-6 w-6 text-yellow-500" />
          7. iHerb 慳錢攻略
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

        <div className="not-prose bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4 border border-green-200 dark:border-green-800">
          <h4 className="font-bold text-green-800 dark:text-green-200 mb-2">🎫 iHerb 優惠碼</h4>
          <p className="text-green-700 dark:text-green-300 text-sm">
            • 新用戶首單優惠（通常 10-20% off）<br/>
            • 推薦碼：朋友推薦可獲額外折扣<br/>
            • 網站首頁 Banner 經常有限時優惠
          </p>
        </div>
      </section>

      {/* Section 8: FAQ */}
      <section id="faq" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          ❓ 8. 常見問題 FAQ
        </h2>
        
        <div className="not-prose space-y-4">
          {iherbFaqData.map((faq, index) => (
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
      <div className="not-prose bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 text-white mb-10">
        <h3 className="text-xl font-bold mb-2">💊 想知邊張信用卡買 iHerb 最抵？</h3>
        <p className="mb-4 opacity-90">用我哋嘅計算機，即刻搵到最適合你嘅信用卡！</p>
        <Link href="/">
          <Button className="bg-white text-green-600 hover:bg-gray-100">
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
            <Globe className="h-5 w-5 text-emerald-600" />
            <span>海外簽賬手續費攻略</span>
            <ChevronRight className="h-4 w-4 ml-auto text-gray-400" />
          </Link>
          <Link href="/discover/online-shopping-guide" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
            <CreditCard className="h-5 w-5 text-emerald-600" />
            <span>網購信用卡攻略</span>
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

