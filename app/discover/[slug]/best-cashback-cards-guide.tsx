// 2025 最高回贈信用卡比較攻略
// 用於 /discover/best-cashback-cards 頁面

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  ChevronRight, ChevronDown, CreditCard, ShoppingCart, Utensils,
  Plane, Globe, Smartphone, Car, Zap, Target, Trophy,
  CheckCircle, Star, Calculator, DollarSign, TrendingUp
} from "lucide-react";
import { CardPreviewSection, RECOMMENDED_CARDS } from "@/app/discover/components/card-preview-section";

// FAQ 數據
export const bestCashbackCardsFaqData = [
  {
    question: "2025年邊張現金回贈信用卡最抵？",
    answer: "視乎你嘅消費類別：網購首選 HSBC Red Card（4%）或恒生 MMPOWER（5%）；餐飲首選 Citi Cash Back（2%）；無上限現金回贈首選渣打 Simply Cash（1.5%）或安信 EarnMORE（2%）。建議按消費習慣組合使用多張卡。"
  },
  {
    question: "無上限現金回贈信用卡有邊幾張？",
    answer: "主要有：渣打 Simply Cash Visa（1.5% 無上限）、安信 EarnMORE 銀聯卡（2% 無上限，需 Mobile Pay）、Citi Cash Back Card（本地 1%、海外 2% 無上限）。呢幾張卡唔使計上限，簽幾多賺幾多。"
  },
  {
    question: "信用卡現金回贈比較，邊類回贈最高？",
    answer: "網購回贈最高可達 5%（恒生 MMPOWER）、超市回贈最高 8%（DBS COMPASS 星期三）、餐飲回贈最高 4%（Citi Cash Back 指定商戶）。但高回贈通常有上限，要留意每月 cap 位。"
  },
  {
    question: "本地消費信用卡回贈邊張最好？",
    answer: "本地日常消費建議：渣打 Simply Cash（1.5% 無上限）做底牌；網購用 HSBC Red（4%）或恒生 MMPOWER（5%）；食飯用 Citi Cash Back（2%）；超市用 DBS COMPASS（星期三 8%）。"
  },
  {
    question: "信用卡回贈 2025 有咩新優惠？",
    answer: "2025年各銀行持續推出優惠：HSBC Red Card 指定商戶 8%、恒生 MMPOWER 網購 5%、渣打 Simply Cash 保持 1.5% 無上限、Citi 推出更多商戶優惠。建議定期留意銀行最新推廣。"
  },
  {
    question: "邊張信用卡好？新手應該點揀？",
    answer: "新手建議由「無上限回贈卡」開始，例如渣打 Simply Cash（1.5%）或安信 EarnMORE（2%），唔使計上限最簡單。之後再按消費習慣加配專用卡（網購卡、餐飲卡等）。"
  },
  {
    question: "信用卡回贈點計？幾時會到帳？",
    answer: "現金回贈通常每月結算，自動存入信用卡戶口用作扣減簽賬。部分銀行（如渣打）會直接回贈到戶口；部分（如 HSBC）以獎賞錢形式發放，$1 獎賞錢 = $1。"
  },
  {
    question: "信用卡回贈有冇上限？",
    answer: "大部分高回贈信用卡都有月 cap：HSBC Red 網購回贈上限約 $400/月、恒生 MMPOWER 網購上限約 $200/月、Citi Cash Back 餐飲上限約 $300/月。無上限嘅有渣打 Simply Cash、安信 EarnMORE。"
  }
];

// 信用卡推薦數據
export const recommendedCards = {
  unlimited: [
    { 
      card: "渣打 Simply Cash Visa", 
      id: "sc-simply-cash",
      rate: "1.5%", 
      cap: "無上限",
      annual: "永久免年費",
      highlight: "最穩陣之選",
      pros: ["1.5% 無上限", "永久免年費", "海外 2%"],
      cons: ["回贈率唔算最高"],
      best: "日常消費打底"
    },
    { 
      card: "安信 EarnMORE 銀聯卡", 
      id: "earnmore",
      rate: "2%", 
      cap: "無上限",
      annual: "永久免年費",
      highlight: "最高無上限回贈",
      pros: ["2% 無上限", "永久免年費", "Mobile Pay 簽賬"],
      cons: ["需用 Mobile Pay", "部分商戶唔收銀聯"],
      best: "Apple Pay / Google Pay"
    },
  ],
  online: [
    { 
      card: "恒生 MMPOWER World", 
      id: "hangseng-mmpower",
      rate: "5%", 
      cap: "$200/月",
      annual: "$300",
      highlight: "網購最強",
      pros: ["網購 5%", "Mobile Pay 5%", "年費易 waive"],
      cons: ["每月上限 $200"],
      best: "網購、Apple Pay"
    },
    { 
      card: "HSBC Red Card", 
      id: "hsbc-red",
      rate: "4%", 
      cap: "$400/月",
      annual: "免年費",
      highlight: "網購高回贈",
      pros: ["網購 4%", "超市 2%", "免年費"],
      cons: ["需登記優惠"],
      best: "網購、超市"
    },
  ],
  dining: [
    { 
      card: "Citi Cash Back Card", 
      id: "citi-cashback",
      rate: "2%", 
      cap: "$300/月",
      annual: "$1,200",
      highlight: "餐飲專用",
      pros: ["本地餐飲 2%", "酒店 2%", "海外 2%"],
      cons: ["有年費"],
      best: "食飯、酒店"
    },
    { 
      card: "HSBC Visa Signature", 
      id: "hsbc-vs",
      rate: "3.6%", 
      cap: "有上限",
      annual: "$2,000",
      highlight: "高端餐飲",
      pros: ["餐飲 3.6%", "最紅自主獎賞"],
      cons: ["年薪要求高"],
      best: "高消費餐飲"
    },
  ],
  supermarket: [
    { 
      card: "DBS COMPASS Visa", 
      id: "dbs-compass",
      rate: "8%", 
      cap: "$2,000簽賬/月",
      annual: "首年免",
      highlight: "星期三超市",
      pros: ["星期三超市 8%", "高回贈"],
      cons: ["限星期三", "需登記"],
      best: "超市購物"
    },
    { 
      card: "恒生 enJoy 卡", 
      id: "hangseng-enjoy",
      rate: "92折", 
      cap: "無",
      annual: "免年費",
      highlight: "惠康專用",
      pros: ["惠康 92 折", "yuu 積分", "免年費"],
      cons: ["限惠康系商戶"],
      best: "惠康、萬寧"
    },
  ],
  overseas: [
    { 
      card: "Citi PremierMiles", 
      id: "citi-premiermiles",
      rate: "$3/里", 
      cap: "無",
      annual: "$1,800",
      highlight: "海外里數王",
      pros: ["海外 $3/里", "里數永不過期"],
      cons: ["有年費"],
      best: "海外簽賬儲里數"
    },
    { 
      card: "渣打國泰 Mastercard", 
      id: "sc-cathay",
      rate: "$4/里", 
      cap: "無",
      annual: "$2,000",
      highlight: "Asia Miles 專用",
      pros: ["穩定 $4/里", "高迎新里數"],
      cons: ["有年費"],
      best: "儲 Asia Miles"
    },
  ],
};

// 消費組合推薦
export const comboRecommendations = [
  {
    name: "💼 打工仔日常組合",
    description: "適合一般上班族，簡單易用",
    cards: [
      { card: "渣打 Simply Cash", id: "sc-simply-cash", role: "日常消費打底", rate: "1.5% 無上限" },
      { card: "HSBC Red Card", id: "hsbc-red", role: "網購、超市", rate: "網購 4%" },
      { card: "Citi Cash Back", id: "citi-cashback", role: "食飯", rate: "餐飲 2%" },
    ],
    monthlySpend: "$15,000",
    estimatedRebate: "$300+"
  },
  {
    name: "🛒 網購狂人組合",
    description: "適合經常網購、淘寶用戶",
    cards: [
      { card: "恒生 MMPOWER", id: "hangseng-mmpower", role: "網購主力", rate: "5%" },
      { card: "HSBC Red Card", id: "hsbc-red", role: "網購副手", rate: "4%" },
      { card: "渣打 Simply Cash", id: "sc-simply-cash", role: "打底", rate: "1.5%" },
    ],
    monthlySpend: "$10,000",
    estimatedRebate: "$400+"
  },
  {
    name: "✈️ 旅遊達人組合",
    description: "適合經常飛、海外消費",
    cards: [
      { card: "渣打國泰 Mastercard", id: "sc-cathay", role: "儲里數", rate: "$4/里" },
      { card: "Citi PremierMiles", id: "citi-premiermiles", role: "海外簽賬", rate: "$3/里海外" },
      { card: "Citi Cash Back", id: "citi-cashback", role: "本地消費", rate: "2%" },
    ],
    monthlySpend: "$20,000",
    estimatedRebate: "8,000 里/月"
  },
  {
    name: "🍽️ 食家組合",
    description: "適合經常外出用餐",
    cards: [
      { card: "Citi Cash Back", id: "citi-cashback", role: "餐飲主力", rate: "2%" },
      { card: "HSBC Visa Signature", id: "hsbc-vs", role: "高級餐飲", rate: "3.6%" },
      { card: "渣打 Simply Cash", id: "sc-simply-cash", role: "打底", rate: "1.5%" },
    ],
    monthlySpend: "$12,000",
    estimatedRebate: "$280+"
  },
];

export function BestCashbackCardsGuide() {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      {/* 引言 */}
      <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-6">
        {currentYear}年<strong>現金回贈信用卡</strong>邊張最抵？<strong>無上限現金回贈信用卡</strong>有邊幾張？
        <strong>本地消費信用卡回贈</strong>點樣賺到盡？本文為你完整比較<strong>信用卡現金回贈</strong>，
        教你揀最啱自己嘅<strong>信用卡回贈 {currentYear}</strong> 組合！
      </p>

      {/* 目錄 */}
      <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-10">
        <h2 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          📑 本文目錄
        </h2>
        <ul className="space-y-2 text-sm">
          <li><a href="#overview" className="text-blue-600 dark:text-blue-400 hover:underline">1. {currentYear} 信用卡回贈總覽</a></li>
          <li><a href="#unlimited" className="text-blue-600 dark:text-blue-400 hover:underline">2. 無上限現金回贈信用卡推薦</a></li>
          <li><a href="#online" className="text-blue-600 dark:text-blue-400 hover:underline">3. 網購信用卡回贈比較</a></li>
          <li><a href="#dining" className="text-blue-600 dark:text-blue-400 hover:underline">4. 餐飲食肆信用卡推薦</a></li>
          <li><a href="#supermarket" className="text-blue-600 dark:text-blue-400 hover:underline">5. 超市信用卡回贈比較</a></li>
          <li><a href="#overseas" className="text-blue-600 dark:text-blue-400 hover:underline">6. 海外簽賬信用卡推薦</a></li>
          <li><a href="#combo" className="text-blue-600 dark:text-blue-400 hover:underline">7. 最強信用卡組合推薦</a></li>
          <li><a href="#how-to-choose" className="text-blue-600 dark:text-blue-400 hover:underline">8. 邊張信用卡好？選卡攻略</a></li>
          <li><a href="#faq" className="text-blue-600 dark:text-blue-400 hover:underline">9. 常見問題 FAQ</a></li>
        </ul>
      </div>

      {/* Section 1: 總覽 */}
      <section id="overview" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-blue-500" />
          1. {currentYear} 信用卡回贈總覽
        </h2>
        
        <p>
          香港<strong>現金回贈信用卡</strong>選擇眾多，回贈率由 0.4% 至 8% 不等。
          想賺到盡，就要按自己嘅<strong>消費習慣</strong>揀卡，唔好淨係睇最高回贈率！
        </p>

        <div className="not-prose grid md:grid-cols-3 gap-4 my-6">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4 border border-green-200 dark:border-green-800 text-center">
            <div className="text-3xl mb-2">💰</div>
            <h4 className="font-bold text-green-800 dark:text-green-200">無上限回贈</h4>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">1.5-2%</p>
            <p className="text-xs text-green-700 dark:text-green-300">Simply Cash / EarnMORE</p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800 text-center">
            <div className="text-3xl mb-2">🛒</div>
            <h4 className="font-bold text-blue-800 dark:text-blue-200">網購回贈</h4>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">4-5%</p>
            <p className="text-xs text-blue-700 dark:text-blue-300">HSBC Red / MMPOWER</p>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-xl p-4 border border-orange-200 dark:border-orange-800 text-center">
            <div className="text-3xl mb-2">🍽️</div>
            <h4 className="font-bold text-orange-800 dark:text-orange-200">餐飲回贈</h4>
            <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">2-4%</p>
            <p className="text-xs text-orange-700 dark:text-orange-300">Citi Cash Back / VS</p>
          </div>
        </div>

        <div className="not-prose bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
          <h4 className="font-bold text-amber-800 dark:text-amber-200 mb-2">💡 重要提示</h4>
          <p className="text-amber-700 dark:text-amber-300 text-sm">
            高回贈信用卡通常有<strong>月 cap（上限）</strong>，例如 HSBC Red 網購每月最多回贈約 $400。
            建議組合使用多張卡，「主力卡 + 打底卡」策略最有效！
          </p>
        </div>
      </section>

      {/* Section 2: 無上限回贈 */}
      <section id="unlimited" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Zap className="h-6 w-6 text-green-500" />
          2. 無上限現金回贈信用卡推薦
        </h2>

        <p>
          <strong>無上限現金回贈信用卡</strong>係每個人必備嘅「打底卡」，
          唔使計上限，簽幾多賺幾多，最適合做日常消費主力。
        </p>

        <div className="not-prose space-y-4 my-6">
          {recommendedCards.unlimited.map((card, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <span className="text-2xl mr-2">{index === 0 ? "🥇" : "🥈"}</span>
                  <Link href={`/cards/${card.id}`} className="inline font-bold text-blue-600 hover:underline dark:text-blue-400">{card.card}</Link>
                  <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                    {card.highlight}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">{card.rate}</p>
                  <p className="text-xs text-gray-500">{card.cap}</p>
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-3 text-sm">
                <div>
                  <p className="font-medium text-gray-700 dark:text-gray-300 mb-1">✅ 優點</p>
                  <ul className="text-gray-600 dark:text-gray-400 space-y-1">
                    {card.pros.map((pro, i) => <li key={i}>• {pro}</li>)}
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-gray-700 dark:text-gray-300 mb-1">⚠️ 注意</p>
                  <ul className="text-gray-600 dark:text-gray-400 space-y-1">
                    {card.cons.map((con, i) => <li key={i}>• {con}</li>)}
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-gray-700 dark:text-gray-300 mb-1">🎯 最適合</p>
                  <p className="text-gray-600 dark:text-gray-400">{card.best}</p>
                  <p className="text-xs text-gray-500 mt-1">年費：{card.annual}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: 網購回贈 */}
      <section id="online" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <ShoppingCart className="h-6 w-6 text-blue-500" />
          3. 網購信用卡回贈比較
        </h2>

        <p>
          網購係現代人主要消費方式，揀張<strong>網上簽賬高回贈</strong>嘅信用卡非常重要。
          以下係 {currentYear} 年最抵嘅<strong>網購信用卡</strong>：
        </p>

        <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden my-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-blue-50 dark:bg-blue-900/20">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-blue-600 dark:text-blue-400">信用卡</th>
                  <th className="px-4 py-3 text-center font-medium text-blue-600 dark:text-blue-400">網購回贈</th>
                  <th className="px-4 py-3 text-center font-medium text-blue-600 dark:text-blue-400">每月上限</th>
                  <th className="px-4 py-3 text-center font-medium text-blue-600 dark:text-blue-400">年費</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {recommendedCards.online.map((card, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3">
                      <Link href={`/cards/${card.id}`} className="font-medium text-blue-600 hover:underline dark:text-blue-400">{card.card}</Link>
                      <span className="ml-2 text-xs text-green-600">★ {card.highlight}</span>
                    </td>
                    <td className="px-4 py-3 text-center font-bold text-blue-600 dark:text-blue-400">{card.rate}</td>
                    <td className="px-4 py-3 text-center text-gray-600 dark:text-gray-400">{card.cap}</td>
                    <td className="px-4 py-3 text-center text-gray-600 dark:text-gray-400">{card.annual}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section 4: 餐飲回贈 */}
      <section id="dining" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Utensils className="h-6 w-6 text-orange-500" />
          4. 餐飲食肆信用卡推薦
        </h2>

        <p>
          <strong>食飯信用卡 {currentYear}</strong> 邊張最抵？經常外出用餐嘅你，
          一定要有張<strong>餐飲信用卡回贈</strong>高嘅卡：
        </p>

        <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden my-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-orange-50 dark:bg-orange-900/20">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-orange-600 dark:text-orange-400">信用卡</th>
                  <th className="px-4 py-3 text-center font-medium text-orange-600 dark:text-orange-400">餐飲回贈</th>
                  <th className="px-4 py-3 text-center font-medium text-orange-600 dark:text-orange-400">每月上限</th>
                  <th className="px-4 py-3 text-center font-medium text-orange-600 dark:text-orange-400">年費</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {recommendedCards.dining.map((card, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3">
                      <Link href={`/cards/${card.id}`} className="font-medium text-orange-600 hover:underline dark:text-orange-400">{card.card}</Link>
                      <span className="ml-2 text-xs text-orange-600">★ {card.highlight}</span>
                    </td>
                    <td className="px-4 py-3 text-center font-bold text-orange-600 dark:text-orange-400">{card.rate}</td>
                    <td className="px-4 py-3 text-center text-gray-600 dark:text-gray-400">{card.cap}</td>
                    <td className="px-4 py-3 text-center text-gray-600 dark:text-gray-400">{card.annual}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section 5: 超市回贈 */}
      <section id="supermarket" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <ShoppingCart className="h-6 w-6 text-purple-500" />
          5. 超市信用卡回贈比較
        </h2>

        <p>
          超市購物每月必須，揀張<strong>超市信用卡回贈</strong>高嘅卡慳得更多：
        </p>

        <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden my-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-purple-50 dark:bg-purple-900/20">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-purple-600 dark:text-purple-400">信用卡</th>
                  <th className="px-4 py-3 text-center font-medium text-purple-600 dark:text-purple-400">超市回贈</th>
                  <th className="px-4 py-3 text-center font-medium text-purple-600 dark:text-purple-400">每月上限</th>
                  <th className="px-4 py-3 text-center font-medium text-purple-600 dark:text-purple-400">年費</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {recommendedCards.supermarket.map((card, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3">
                      <Link href={`/cards/${card.id}`} className="font-medium text-purple-600 hover:underline dark:text-purple-400">{card.card}</Link>
                      <span className="ml-2 text-xs text-purple-600">★ {card.highlight}</span>
                    </td>
                    <td className="px-4 py-3 text-center font-bold text-purple-600 dark:text-purple-400">{card.rate}</td>
                    <td className="px-4 py-3 text-center text-gray-600 dark:text-gray-400">{card.cap}</td>
                    <td className="px-4 py-3 text-center text-gray-600 dark:text-gray-400">{card.annual}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section 6: 海外簽賬 */}
      <section id="overseas" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Globe className="h-6 w-6 text-teal-500" />
          6. 海外簽賬信用卡推薦
        </h2>

        <p>
          去旅行或海外網購，<strong>海外簽賬信用卡</strong>回贈同手續費都要留意：
        </p>

        <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden my-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-teal-50 dark:bg-teal-900/20">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-teal-600 dark:text-teal-400">信用卡</th>
                  <th className="px-4 py-3 text-center font-medium text-teal-600 dark:text-teal-400">海外回贈</th>
                  <th className="px-4 py-3 text-center font-medium text-teal-600 dark:text-teal-400">上限</th>
                  <th className="px-4 py-3 text-center font-medium text-teal-600 dark:text-teal-400">年費</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {recommendedCards.overseas.map((card, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3">
                      <Link href={`/cards/${card.id}`} className="font-medium text-teal-600 hover:underline dark:text-teal-400">{card.card}</Link>
                      <span className="ml-2 text-xs text-teal-600">★ {card.highlight}</span>
                    </td>
                    <td className="px-4 py-3 text-center font-bold text-teal-600 dark:text-teal-400">{card.rate}</td>
                    <td className="px-4 py-3 text-center text-gray-600 dark:text-gray-400">{card.cap}</td>
                    <td className="px-4 py-3 text-center text-gray-600 dark:text-gray-400">{card.annual}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section 7: 組合推薦 */}
      <section id="combo" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Target className="h-6 w-6 text-red-500" />
          7. 最強信用卡組合推薦
        </h2>

        <p>
          單張卡唔夠用！<strong>信用卡回贈 {currentYear}</strong> 最強策略係組合使用多張卡，
          按消費類別揀最高回贈嘅卡簽賬：
        </p>

        <div className="not-prose space-y-6 my-6">
          {comboRecommendations.map((combo, index) => (
            <div key={index} className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-5">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white">{combo.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{combo.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">預計每月回贈</p>
                  <p className="text-xl font-bold text-green-600 dark:text-green-400">{combo.estimatedRebate}</p>
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-3">
                {combo.cards.map((card, i) => (
                  <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-3 border border-gray-100 dark:border-gray-700">
                    <Link href={`/cards/${card.id}`} className="font-medium text-blue-600 hover:underline dark:text-blue-400 text-sm">{card.card}</Link>
                    <p className="text-xs text-gray-500">{card.role}</p>
                    <p className="text-sm font-bold text-blue-600 dark:text-blue-400 mt-1">{card.rate}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-3">*以每月簽賬 {combo.monthlySpend} 估算</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 8: 選卡攻略 */}
      <section id="how-to-choose" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Star className="h-6 w-6 text-yellow-500" />
          8. 邊張信用卡好？選卡攻略
        </h2>

        <p>
          <strong>邊張信用卡好</strong>？揀卡唔好淨係睇回贈率，要考慮以下因素：
        </p>

        <div className="not-prose grid md:grid-cols-2 gap-4 my-6">
          {[
            { icon: "📊", title: "分析消費習慣", desc: "網購多用網購卡、食飯多用餐飲卡、唔想諗用無上限卡" },
            { icon: "🎯", title: "留意月 cap", desc: "高回贈通常有上限，計清楚每月最多可以賺幾多" },
            { icon: "💳", title: "組合策略", desc: "唔好只用一張卡，按消費類別組合使用效果最好" },
            { icon: "📝", title: "年費考量", desc: "計埋年費成本，免年費或可 waive 嘅卡更著數" },
            { icon: "🎁", title: "迎新獎賞", desc: "新開卡可以賺迎新，但唔好為迎新亂開唔適合嘅卡" },
            { icon: "⚡", title: "簡單為主", desc: "唔想煩就揀無上限卡，簡單直接最實際" },
          ].map((tip, index) => (
            <div key={index} className="flex items-start gap-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4">
              <span className="text-2xl">{tip.icon}</span>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white text-sm">{tip.title}</h4>
                <p className="text-gray-600 dark:text-gray-400 text-xs">{tip.desc}</p>
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
          {bestCashbackCardsFaqData.map((faq, index) => (
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

      {/* 總結 */}
      <div className="not-prose bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-6 text-white mb-10">
        <h3 className="text-xl font-bold mb-4">🏆 {currentYear} 最強信用卡回贈總結</h3>
        <div className="grid md:grid-cols-3 gap-4 text-center">
          <div className="bg-white/20 rounded-xl p-4">
            <p className="text-sm opacity-80">無上限首選</p>
            <p className="font-bold">渣打 Simply Cash</p>
            <p className="text-lg">1.5% 無 Cap</p>
          </div>
          <div className="bg-white/20 rounded-xl p-4">
            <p className="text-sm opacity-80">網購首選</p>
            <p className="font-bold">恒生 MMPOWER</p>
            <p className="text-lg">5% 網購</p>
          </div>
          <div className="bg-white/20 rounded-xl p-4">
            <p className="text-sm opacity-80">餐飲首選</p>
            <p className="font-bold">Citi Cash Back</p>
            <p className="text-lg">2% 餐飲</p>
          </div>
        </div>
      </div>

      {/* Card Preview Section */}
      <CardPreviewSection 
        title="📌 一Click 查看推薦信用卡詳情"
        subtitle="點擊以下信用卡查看詳細回贈條款及申請連結"
        cards={[
          { id: "sc-simply-cash", highlight: "1.5% 無上限" },
          { id: "earnmore", highlight: "2% 無上限" },
          { id: "hangseng-mmpower", highlight: "網購 5%" },
          { id: "hsbc-red", highlight: "網購 4%" },
          { id: "citi-cashback", highlight: "餐飲 2%" },
          { id: "hsbc-vs", highlight: "餐飲 3.6%" },
        ]}
        columns={3}
      />

      {/* CTA Section */}
      <div className="not-prose bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl p-6 text-white mb-10">
        <h3 className="text-xl font-bold mb-2">💳 即刻計算你嘅最佳信用卡組合！</h3>
        <p className="mb-4 opacity-90">輸入你嘅消費金額同類別，我哋幫你搵出最高回贈嘅信用卡！</p>
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
          <Link href="/discover/miles-vs-cashback" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
            <Plane className="h-5 w-5 text-emerald-600" />
            <span>里數 vs 現金回贈比較</span>
            <ChevronRight className="h-4 w-4 ml-auto text-gray-400" />
          </Link>
          <Link href="/discover/overseas-fee" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
            <Globe className="h-5 w-5 text-emerald-600" />
            <span>海外簽賬手續費攻略</span>
            <ChevronRight className="h-4 w-4 ml-auto text-gray-400" />
          </Link>
          <Link href="/" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
            <Calculator className="h-5 w-5 text-emerald-600" />
            <span>回贈計算機</span>
            <ChevronRight className="h-4 w-4 ml-auto text-gray-400" />
          </Link>
          <Link href="/rankings" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
            <Trophy className="h-5 w-5 text-emerald-600" />
            <span>信用卡排行榜</span>
            <ChevronRight className="h-4 w-4 ml-auto text-gray-400" />
          </Link>
        </div>
      </div>
    </div>
  );
}

