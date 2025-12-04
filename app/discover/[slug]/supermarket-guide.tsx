// 超市信用卡攻略
// 用於 /discover/supermarket-guide 頁面

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  ChevronRight, ChevronDown, CreditCard, ShoppingBasket, Store,
  Calculator, Trophy, DollarSign, CheckCircle, AlertTriangle,
  Star, Smartphone, Info, Zap, Percent, Tag
} from "lucide-react";
import { CardPreviewSection } from "@/app/discover/components/card-preview-section";

// FAQ 數據
export const supermarketFaqData = [
  {
    question: "超市信用卡邊張回贈最高？",
    answer: "HSBC Red Card 超市有 2% 回贈、恒生 MMPOWER 用 Apple Pay 有 5%。百佳/惠康有指定信用卡優惠日可享額外折扣。HKTVmall 網購可用 MMPOWER 5% 或 Red Card 4%。"
  },
  {
    question: "百佳有咩信用卡優惠？",
    answer: "百佳逢星期二、十二、廿二有 92 折優惠日（需用指定信用卡）。滙豐信用卡通常有百佳優惠，可享額外折扣或積分。建議留意百佳 App 及銀行最新優惠。"
  },
  {
    question: "惠康有咩信用卡優惠？",
    answer: "惠康同樣有 92 折優惠日（日期每月不同）。部分銀行信用卡有惠康專屬優惠。用 yuu 積分可換惠康現金券，配合信用卡雙重賺。"
  },
  {
    question: "HKTVmall 用邊張信用卡最抵？",
    answer: "HKTVmall 計入網上簽賬，恒生 MMPOWER 有 5% 回贈、HSBC Red Card 有 4%。VIP 會員有額外折扣，配合信用卡回贈可以慳更多。"
  },
  {
    question: "AEON 超市有咩信用卡優惠？",
    answer: "AEON 信用卡喺 AEON 超市有專屬優惠，如會員日額外折扣、積分優惠等。非 AEON 卡用 HSBC Red Card 或 Simply Cash 都有回贈。"
  },
  {
    question: "超市簽賬計入咩類別？",
    answer: "超市一般計入「零售」類別（MCC 5411），唔係「餐飲」。HSBC Red Card 超市有 2%、Visa Signature 本地 1.6%。外賣超市（HKTVmall）計入網上簽賬。"
  },
  {
    question: "用 Apple Pay 買超市有回贈嗎？",
    answer: "有！恒生 MMPOWER Apple Pay 有 5%（有上限）、安信 EarnMORE 有 2% 無上限。大部分超市都接受 Apple Pay / Google Pay。"
  },
  {
    question: "超市現金券用信用卡買有回贈嗎？",
    answer: "視乎銀行政策。部分銀行將現金券購買視為「類現金交易」，唔計回贈。建議直接喺超市簽賬賺回贈，或查閱銀行條款。"
  }
];

// 超市比較
const supermarkets = [
  {
    name: "百佳 PARKnSHOP",
    type: "實體超市",
    bestCards: [
      { card: "HSBC Red Card", id: "hsbc-red", rate: "2%" },
      { card: "滙豐卡", id: "hsbc-vs", rate: "優惠日" },
    ],
    promotion: "逢 2/12/22 日 92 折",
    tips: "用 MoneyBack App 儲積分",
  },
  {
    name: "惠康 Wellcome",
    type: "實體超市",
    bestCards: [
      { card: "HSBC Red Card", id: "hsbc-red", rate: "2%" },
      { card: "安信 EarnMORE", id: "earnmore", rate: "2%" },
    ],
    promotion: "yuu 積分可換現金券",
    tips: "留意每月 92 折優惠日",
  },
  {
    name: "HKTVmall",
    type: "網上超市",
    bestCards: [
      { card: "恒生 MMPOWER", id: "hangseng-mmpower", rate: "5%" },
      { card: "HSBC Red Card", id: "hsbc-red", rate: "4%" },
    ],
    promotion: "VIP 會員額外折扣",
    tips: "網購計入網上簽賬",
  },
  {
    name: "AEON",
    type: "實體超市",
    bestCards: [
      { card: "AEON 信用卡", id: null, rate: "會員優惠" },
      { card: "HSBC Red Card", id: "hsbc-red", rate: "2%" },
    ],
    promotion: "AEON 會員日優惠",
    tips: "AEON 卡有專屬折扣",
  },
  {
    name: "759 阿信屋",
    type: "實體超市",
    bestCards: [
      { card: "安信 EarnMORE", id: "earnmore", rate: "2%" },
      { card: "Simply Cash", id: "sc-simply-cash", rate: "1.5%" },
    ],
    promotion: "會員卡積分優惠",
    tips: "部分分店接受 Apple Pay",
  },
  {
    name: "city'super",
    type: "高級超市",
    bestCards: [
      { card: "HSBC Red Card", id: "hsbc-red", rate: "2%" },
      { card: "恒生 MMPOWER", id: "hangseng-mmpower", rate: "5% (Apple Pay)" },
    ],
    promotion: "會員積分優惠",
    tips: "接受 Apple Pay",
  },
];

// 推薦信用卡
const recommendedCards = [
  {
    card: "HSBC Red Card",
    id: "hsbc-red",
    rate: "2%",
    cap: "有上限",
    highlight: "超市首選",
    reason: "超市 2% 回贈，網購 4%，免年費。最適合日常超市消費。",
    best: "百佳、惠康、AEON",
  },
  {
    card: "恒生 MMPOWER World",
    id: "hangseng-mmpower",
    rate: "5%",
    cap: "$200/月",
    highlight: "Apple Pay",
    reason: "Apple Pay 超市簽賬 5% 回贈，HKTVmall 網購 5%。",
    best: "HKTVmall、Apple Pay 超市",
  },
  {
    card: "安信 EarnMORE 銀聯卡",
    id: "earnmore",
    rate: "2%",
    cap: "無上限",
    highlight: "無上限",
    reason: "Apple Pay / Google Pay 2% 無上限，任何超市都適用。",
    best: "大額超市消費",
  },
  {
    card: "渣打 Simply Cash Visa",
    id: "sc-simply-cash",
    rate: "1.5%",
    cap: "無上限",
    highlight: "打底神卡",
    reason: "1.5% 無上限回贈，永久免年費。爆 Cap 後用。",
    best: "打底之選",
  },
  {
    card: "Citi Cash Back Card",
    id: "citi-cashback",
    rate: "1%",
    cap: "無上限",
    highlight: "本地簽賬",
    reason: "本地簽賬 1% 無上限，餐飲 2%。",
    best: "配合餐飲消費",
  },
];

// 回贈比較
const cashbackComparison = [
  { card: "HSBC Red Card", id: "hsbc-red", supermarket: "2%", online: "4%", cap: "有上限", annual: "免" },
  { card: "恒生 MMPOWER", id: "hangseng-mmpower", supermarket: "0.4%", online: "5%", cap: "$200/月", annual: "$300" },
  { card: "EarnMORE", id: "earnmore", supermarket: "2%", online: "2%", cap: "無上限", annual: "免" },
  { card: "Simply Cash", id: "sc-simply-cash", supermarket: "1.5%", online: "1.5%", cap: "無上限", annual: "免" },
  { card: "Citi Cash Back", id: "citi-cashback", supermarket: "1%", online: "1%", cap: "無上限", annual: "$1,200" },
];

export function SupermarketGuide() {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      {/* 引言 */}
      <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-6">
        每個月都要去超市買嘢，點解唔用<strong>超市信用卡</strong>賺回贈？
        本文教你 <strong>{currentYear} 超市信用卡攻略</strong>，
        百佳、惠康、HKTVmall、AEON 都可以賺高達 <strong>5% 回贈</strong>！
      </p>

      {/* 目錄 */}
      <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-10">
        <h2 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          📑 本文目錄
        </h2>
        <ul className="space-y-2 text-sm">
          <li><a href="#overview" className="text-blue-600 dark:text-blue-400 hover:underline">1. 超市信用卡回贈點計？</a></li>
          <li><a href="#comparison" className="text-blue-600 dark:text-blue-400 hover:underline">2. 超市信用卡回贈比較表</a></li>
          <li><a href="#supermarkets" className="text-blue-600 dark:text-blue-400 hover:underline">3. 各大超市最佳信用卡</a></li>
          <li><a href="#parknshop" className="text-blue-600 dark:text-blue-400 hover:underline">4. 百佳信用卡攻略</a></li>
          <li><a href="#wellcome" className="text-blue-600 dark:text-blue-400 hover:underline">5. 惠康信用卡攻略</a></li>
          <li><a href="#hktvmall" className="text-blue-600 dark:text-blue-400 hover:underline">6. HKTVmall 信用卡攻略</a></li>
          <li><a href="#best-cards" className="text-blue-600 dark:text-blue-400 hover:underline">7. 超市信用卡推薦</a></li>
          <li><a href="#combo" className="text-blue-600 dark:text-blue-400 hover:underline">8. 超市信用卡組合建議</a></li>
          <li><a href="#tips" className="text-blue-600 dark:text-blue-400 hover:underline">9. 超市慳錢貼士</a></li>
          <li><a href="#faq" className="text-blue-600 dark:text-blue-400 hover:underline">10. 常見問題 FAQ</a></li>
        </ul>
      </div>

      {/* Section 1: 總覽 */}
      <section id="overview" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <ShoppingBasket className="h-6 w-6 text-green-500" />
          1. 超市信用卡回贈點計？
        </h2>
        
        <p>
          <strong>超市信用卡回贈</strong>可以幫你慳返唔少！
          以每月超市消費 $3,000 為例：
        </p>

        <div className="not-prose bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-5 border border-green-200 dark:border-green-800 my-6">
          <h4 className="font-bold text-green-800 dark:text-green-200 mb-3">💰 超市回贈例子（每月 $3,000）</h4>
          <div className="grid md:grid-cols-3 gap-3">
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 text-center">
              <p className="text-sm text-gray-500">MMPOWER 5%</p>
              <p className="text-xl font-bold text-green-600">$150/月*</p>
              <p className="text-xs text-gray-400">*Apple Pay、有上限</p>
            </div>
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 text-center">
              <p className="text-sm text-gray-500">Red Card 2%</p>
              <p className="text-xl font-bold text-green-600">$60/月</p>
              <p className="text-xs text-gray-400">超市專屬回贈</p>
            </div>
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 text-center">
              <p className="text-sm text-gray-500">EarnMORE 2%</p>
              <p className="text-xl font-bold text-green-600">$60/月</p>
              <p className="text-xs text-gray-400">無上限</p>
            </div>
          </div>
          <p className="text-green-700 dark:text-green-300 text-sm mt-3">
            一年超市消費 $36,000，用 5% 回贈可賺 <strong>$1,800</strong>！
          </p>
        </div>
      </section>

      {/* Section 2: 比較表 */}
      <section id="comparison" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Percent className="h-6 w-6 text-indigo-500" />
          2. 超市信用卡回贈比較表
        </h2>

        <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden my-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-green-50 dark:bg-green-900/20">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-green-600 dark:text-green-400">信用卡</th>
                  <th className="px-4 py-3 text-center font-medium text-green-600 dark:text-green-400">超市回贈</th>
                  <th className="px-4 py-3 text-center font-medium text-green-600 dark:text-green-400">網購回贈</th>
                  <th className="px-4 py-3 text-center font-medium text-green-600 dark:text-green-400">每月上限</th>
                  <th className="px-4 py-3 text-center font-medium text-green-600 dark:text-green-400">年費</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {cashbackComparison.map((card, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3">
                      <Link href={`/cards/${card.id}`} className="font-medium text-blue-600 hover:underline dark:text-blue-400">
                        {card.card}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-center font-bold text-green-600 dark:text-green-400">{card.supermarket}</td>
                    <td className="px-4 py-3 text-center text-gray-600 dark:text-gray-400">{card.online}</td>
                    <td className="px-4 py-3 text-center text-gray-600 dark:text-gray-400">{card.cap}</td>
                    <td className="px-4 py-3 text-center text-gray-600 dark:text-gray-400">{card.annual}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section 3: 各超市 */}
      <section id="supermarkets" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Store className="h-6 w-6 text-orange-500" />
          3. 各大超市最佳信用卡
        </h2>

        <p>
          唔同超市有唔同優惠，以下係各超市<strong>最佳信用卡</strong>推薦：
        </p>

        <div className="not-prose grid md:grid-cols-2 gap-4 my-6">
          {supermarkets.map((market, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">{market.name}</h4>
                  <p className="text-xs text-gray-500">{market.type}</p>
                </div>
                <span className="text-xs bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded text-green-600 dark:text-green-400">
                  {market.promotion}
                </span>
              </div>
              <div className="flex flex-wrap gap-2 mb-2">
                {market.bestCards.map((card, i) => (
                  card.id ? (
                    <Link 
                      key={i} 
                      href={`/cards/${card.id}`}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-green-50 dark:bg-green-900/20 rounded-full text-xs text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/40 transition-colors"
                    >
                      <CreditCard className="h-3 w-3" />
                      {card.card}
                      <span className="font-bold">{card.rate}</span>
                    </Link>
                  ) : (
                    <span 
                      key={i} 
                      className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs text-gray-600 dark:text-gray-400"
                    >
                      <CreditCard className="h-3 w-3" />
                      {card.card}
                      <span className="font-bold">{card.rate}</span>
                    </span>
                  )
                ))}
              </div>
              <p className="text-xs text-gray-500">💡 {market.tips}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: 百佳 */}
      <section id="parknshop" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Tag className="h-6 w-6 text-red-500" />
          4. 百佳信用卡攻略
        </h2>

        <p>
          <strong>百佳 PARKnSHOP</strong> 有多個信用卡優惠：
        </p>

        <div className="not-prose space-y-3 my-6">
          <div className="flex items-start gap-3 bg-red-50 dark:bg-red-900/20 rounded-xl p-4">
            <span className="text-2xl">🏷️</span>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">92 折優惠日</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                逢 2 號、12 號、22 號，用指定信用卡可享 92 折。留意銀行推廣。
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
            <span className="text-2xl">💳</span>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">滙豐信用卡優惠</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                HSBC 經常有百佳優惠，如額外折扣、積分優惠等。<Link href="/cards/hsbc-red" className="text-blue-600 hover:underline">Red Card</Link> 超市有 2% 回贈。
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-green-50 dark:bg-green-900/20 rounded-xl p-4">
            <span className="text-2xl">📱</span>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">MoneyBack App</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                用 MoneyBack App 儲積分，可換現金券或禮品。配合信用卡雙重賺！
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: 惠康 */}
      <section id="wellcome" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Tag className="h-6 w-6 text-orange-500" />
          5. 惠康信用卡攻略
        </h2>

        <p>
          <strong>惠康 Wellcome</strong> 同樣有多個優惠：
        </p>

        <div className="not-prose space-y-3 my-6">
          <div className="flex items-start gap-3 bg-orange-50 dark:bg-orange-900/20 rounded-xl p-4">
            <span className="text-2xl">🏷️</span>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">92 折優惠日</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                惠康都有 92 折優惠日，日期每月不同。留意惠康 App 及銀行推廣。
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4">
            <span className="text-2xl">🎁</span>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">yuu 積分</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                用 yuu App 儲積分，可換惠康現金券。每 1,000 yuu 積分 = $1。
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
            <span className="text-2xl">💳</span>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">信用卡回贈</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <Link href="/cards/hsbc-red" className="text-blue-600 hover:underline">Red Card</Link> 超市 2%、<Link href="/cards/earnmore" className="text-blue-600 hover:underline">EarnMORE</Link> 手機支付 2% 無上限。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: HKTVmall */}
      <section id="hktvmall" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <ShoppingBasket className="h-6 w-6 text-pink-500" />
          6. HKTVmall 信用卡攻略
        </h2>

        <p>
          <strong>HKTVmall</strong> 係網上超市，計入「網上簽賬」類別：
        </p>

        <div className="not-prose bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 rounded-xl p-4 border border-pink-200 dark:border-pink-800 my-6">
          <h4 className="font-bold text-pink-800 dark:text-pink-200 mb-3">🛒 HKTVmall 最佳信用卡</h4>
          <div className="grid md:grid-cols-2 gap-3">
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
              <Link href="/cards/hangseng-mmpower" className="font-medium text-blue-600 hover:underline text-sm">恒生 MMPOWER</Link>
              <p className="text-xs text-gray-500">網購 5% 回贈（有上限）</p>
            </div>
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
              <Link href="/cards/hsbc-red" className="font-medium text-blue-600 hover:underline text-sm">HSBC Red Card</Link>
              <p className="text-xs text-gray-500">網購 4% 回贈（有上限）</p>
            </div>
          </div>
        </div>

        <div className="not-prose bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <p className="text-blue-700 dark:text-blue-300 text-sm">
              <strong>提示：</strong>HKTVmall VIP 會員有額外折扣，配合高回贈信用卡可以慳更多！
              用 <Link href="/cards/hangseng-mmpower" className="text-blue-600 hover:underline">MMPOWER</Link> 5% + VIP 95 折 = 超級優惠！
            </p>
          </div>
        </div>
      </section>

      {/* Section 7: 推薦信用卡 */}
      <section id="best-cards" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Trophy className="h-6 w-6 text-amber-500" />
          7. 超市信用卡推薦
        </h2>

        <p>
          以下係<strong>超市信用卡 {currentYear}</strong> 推薦：
        </p>

        <div className="not-prose space-y-4 my-6">
          {recommendedCards.map((card, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xl mr-2">{["🥇", "🥈", "🥉", "4️⃣", "5️⃣"][index]}</span>
                  <Link href={`/cards/${card.id}`} className="font-bold text-blue-600 hover:underline dark:text-blue-400">{card.card}</Link>
                  <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                    {card.highlight}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-green-600 dark:text-green-400">{card.rate}</p>
                  <p className="text-xs text-gray-500">{card.cap}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{card.reason}</p>
              <p className="text-xs text-gray-500 mt-1">最適合：{card.best}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Card Preview Section */}
      <CardPreviewSection 
        title="📌 超市推薦信用卡一覽"
        subtitle="點擊查看詳細回贈條款及申請連結"
        cards={[
          { id: "hsbc-red", highlight: "超市 2%" },
          { id: "hangseng-mmpower", highlight: "HKTVmall 5%" },
          { id: "earnmore", highlight: "2% 無上限" },
          { id: "sc-simply-cash", highlight: "1.5% 打底" },
        ]}
      />

      {/* Section 8: 組合建議 */}
      <section id="combo" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <CreditCard className="h-6 w-6 text-violet-500" />
          8. 超市信用卡組合建議
        </h2>

        <div className="not-prose space-y-4 my-6">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4 border border-green-200 dark:border-green-800">
            <h4 className="font-bold text-green-800 dark:text-green-200 mb-3">🛒 超市達人組合</h4>
            <div className="grid md:grid-cols-3 gap-3">
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
                <Link href="/cards/hsbc-red" className="font-medium text-blue-600 hover:underline text-sm">HSBC Red Card</Link>
                <p className="text-xs text-gray-500">實體超市 2%</p>
              </div>
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
                <Link href="/cards/hangseng-mmpower" className="font-medium text-blue-600 hover:underline text-sm">恒生 MMPOWER</Link>
                <p className="text-xs text-gray-500">HKTVmall 5%</p>
              </div>
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
                <Link href="/cards/earnmore" className="font-medium text-blue-600 hover:underline text-sm">安信 EarnMORE</Link>
                <p className="text-xs text-gray-500">Apple Pay 2% 無上限</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
            <h4 className="font-bold text-blue-800 dark:text-blue-200 mb-3">💡 簡單組合</h4>
            <div className="grid md:grid-cols-2 gap-3">
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
                <Link href="/cards/hsbc-red" className="font-medium text-blue-600 hover:underline text-sm">HSBC Red Card</Link>
                <p className="text-xs text-gray-500">超市 2%、網購 4%</p>
              </div>
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
                <Link href="/cards/sc-simply-cash" className="font-medium text-blue-600 hover:underline text-sm">渣打 Simply Cash</Link>
                <p className="text-xs text-gray-500">1.5% 無上限打底</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 9: 貼士 */}
      <section id="tips" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Zap className="h-6 w-6 text-yellow-500" />
          9. 超市慳錢貼士
        </h2>

        <div className="not-prose space-y-3">
          {[
            { icon: "🏷️", title: "留意 92 折優惠日", desc: "百佳逢 2/12/22 日、惠康每月有優惠日" },
            { icon: "📱", title: "善用積分 App", desc: "MoneyBack、yuu 積分可換現金券" },
            { icon: "💳", title: "用高回贈卡", desc: "Red Card 超市 2%、MMPOWER HKTVmall 5%" },
            { icon: "🛒", title: "網上超市更抵", desc: "HKTVmall 用網購卡可享更高回贈" },
            { icon: "🎁", title: "VIP 會員優惠", desc: "HKTVmall VIP 有額外折扣" },
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
          {supermarketFaqData.map((faq, index) => (
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
        <h3 className="text-xl font-bold mb-2">💳 想知邊張信用卡最適合你嘅超市消費？</h3>
        <p className="mb-4 opacity-90">用我哋嘅計算機，輸入你嘅消費類別，即刻搵到最高回贈嘅信用卡！</p>
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
          <Link href="/discover/online-shopping-guide" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
            <Store className="h-5 w-5 text-emerald-600" />
            <span>網購信用卡攻略</span>
            <ChevronRight className="h-4 w-4 ml-auto text-gray-400" />
          </Link>
          <Link href="/discover/best-cashback-cards" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
            <DollarSign className="h-5 w-5 text-emerald-600" />
            <span>最高回贈信用卡比較</span>
            <ChevronRight className="h-4 w-4 ml-auto text-gray-400" />
          </Link>
          <Link href="/blog/best-supermarket-cards" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
            <Trophy className="h-5 w-5 text-emerald-600" />
            <span>超市信用卡排行榜</span>
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

