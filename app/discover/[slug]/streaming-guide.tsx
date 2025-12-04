// 串流平台信用卡攻略
// 用於 /discover/streaming-guide 頁面

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  ChevronRight, ChevronDown, CreditCard, Tv, Music,
  Calculator, Trophy, DollarSign, CheckCircle, AlertTriangle,
  Star, Info, Zap, Percent, Gift, Play, Globe
} from "lucide-react";
import { CardPreviewSection } from "@/app/discover/components/card-preview-section";

// FAQ 數據
export const streamingFaqData = [
  {
    question: "Netflix 用邊張信用卡最抵？",
    answer: "Netflix 係外幣簽賬（美元），最抵用免 CBF 嘅信用卡：渣打國泰卡（免 CBF + $4/里）、SC Simply Cash（免 CBF + 2% 海外）。HSBC Red Card 網購 4% 但有 CBF 手續費，計返實際回贈約 2%。"
  },
  {
    question: "Spotify 用邊張信用卡最抵？",
    answer: "Spotify 係外幣簽賬（美元/歐元），最抵用免 CBF 嘅信用卡：渣打國泰卡（免 CBF + $4/里）、SC Simply Cash（免 CBF + 2% 海外）。"
  },
  {
    question: "Disney+ 用邊張信用卡最抵？",
    answer: "Disney+ 香港係港幣簽賬，當「網上簽賬」處理。最抵用網購卡：恒生 MMPOWER 5%、HSBC Red Card 4%（無 CBF）。"
  },
  {
    question: "YouTube Premium 用邊張信用卡最抵？",
    answer: "YouTube Premium 香港版係港幣簽賬，當「網上簽賬」處理。最抵用網購卡：恒生 MMPOWER 5%、HSBC Red Card 4%。"
  },
  {
    question: "串流平台有 CBF 手續費嗎？",
    answer: "視乎平台。Netflix、Spotify 係美元計價，有 CBF（約 1.95%）。Disney+、YouTube Premium 香港版係港幣計價，無 CBF。建議用免 CBF 卡訂閱外幣平台。"
  },
  {
    question: "串流平台當網購定海外簽賬？",
    answer: "港幣計價平台（Disney+、YouTube Premium HK）當「網上簽賬」。外幣計價平台（Netflix、Spotify）當「海外網上簽賬」，有 CBF 手續費。"
  },
  {
    question: "點樣慳串流平台月費？",
    answer: "慳錢方法：(1) 用高回贈信用卡；(2) 訂閱家庭計劃分攤；(3) 用學生優惠（Spotify）；(4) 留意年費優惠；(5) 用免 CBF 卡訂外幣平台。"
  },
  {
    question: "Apple Music / Apple TV+ 用邊張卡？",
    answer: "Apple 訂閱服務係外幣簽賬（美元），有 CBF。最抵用免 CBF 卡：渣打國泰卡、SC Simply Cash。或者用 Apple Gift Card 充值避免 CBF。"
  }
];

// 串流平台比較
const streamingPlatforms = [
  {
    name: "Netflix",
    icon: "🎬",
    currency: "美元",
    hasCBF: true,
    monthlyFee: "$63 - $93",
    paymentType: "海外網上簽賬",
    bestCards: ["sc-cathay", "sc-simply-cash"],
    note: "有 CBF 約 1.95%，用免 CBF 卡最抵",
  },
  {
    name: "Spotify",
    icon: "🎵",
    currency: "美元/歐元",
    hasCBF: true,
    monthlyFee: "$58 / $48（學生）",
    paymentType: "海外網上簽賬",
    bestCards: ["sc-cathay", "sc-simply-cash"],
    note: "有 CBF，學生有優惠價",
  },
  {
    name: "Disney+",
    icon: "🏰",
    currency: "港幣",
    hasCBF: false,
    monthlyFee: "$73",
    paymentType: "網上簽賬",
    bestCards: ["hangseng-mmpower", "hsbc-red"],
    note: "港幣計價，無 CBF，網購卡最抵",
  },
  {
    name: "YouTube Premium",
    icon: "▶️",
    currency: "港幣",
    hasCBF: false,
    monthlyFee: "$68 / $98（家庭）",
    paymentType: "網上簽賬",
    bestCards: ["hangseng-mmpower", "hsbc-red"],
    note: "港幣計價，無 CBF，網購卡最抵",
  },
  {
    name: "Apple TV+",
    icon: "🍎",
    currency: "美元",
    hasCBF: true,
    monthlyFee: "$49",
    paymentType: "海外網上簽賬",
    bestCards: ["sc-cathay", "sc-simply-cash"],
    note: "有 CBF，可用 Gift Card 避免",
  },
  {
    name: "Amazon Prime Video",
    icon: "📦",
    currency: "美元",
    hasCBF: true,
    monthlyFee: "$36",
    paymentType: "海外網上簽賬",
    bestCards: ["sc-cathay", "sc-simply-cash"],
    note: "有 CBF",
  },
];

// 信用卡回贈比較
const cardComparison = [
  {
    card: "渣打國泰 Mastercard",
    id: "sc-cathay",
    localRate: "$6/里",
    overseasRate: "$4/里",
    cbfFree: true,
    highlight: "免 CBF 最強",
    note: "Netflix/Spotify 免 CBF + 儲里數",
  },
  {
    card: "渣打 Simply Cash",
    id: "sc-simply-cash",
    localRate: "1.5%",
    overseasRate: "2%",
    cbfFree: true,
    highlight: "免 CBF 現金",
    note: "Netflix/Spotify 免 CBF + 2% 回贈",
  },
  {
    card: "恒生 MMPOWER",
    id: "hangseng-mmpower",
    localRate: "5%",
    overseasRate: "2.4%",
    cbfFree: false,
    highlight: "網購最高",
    note: "Disney+/YouTube 5%（有上限）",
  },
  {
    card: "HSBC Red Card",
    id: "hsbc-red",
    localRate: "4%",
    overseasRate: "4%",
    cbfFree: false,
    highlight: "網購高回贈",
    note: "Disney+/YouTube 4%",
  },
  {
    card: "安信 EarnMORE",
    id: "earnmore",
    localRate: "2%",
    overseasRate: "2%",
    cbfFree: true,
    highlight: "免 CBF 無上限",
    note: "所有串流平台 2%",
  },
];

// 回贈計算例子
const rebateExamples = [
  {
    platform: "Netflix 標準版",
    monthlyFee: 78,
    currency: "HKD（美元結算）",
    cards: [
      { card: "SC Simply Cash", rebate: "2%（免 CBF）", monthly: 1.56, annual: 18.72 },
      { card: "HSBC Red Card", rebate: "4% - 1.95% CBF = 2.05%", monthly: 1.60, annual: 19.20 },
      { card: "EarnMORE", rebate: "2%（免 CBF）", monthly: 1.56, annual: 18.72 },
    ],
  },
  {
    platform: "Disney+ 年費",
    monthlyFee: 738,
    currency: "HKD",
    cards: [
      { card: "MMPOWER", rebate: "5%", monthly: "-", annual: 36.90 },
      { card: "HSBC Red Card", rebate: "4%", monthly: "-", annual: 29.52 },
      { card: "Simply Cash", rebate: "1.5%", monthly: "-", annual: 11.07 },
    ],
  },
];

export function StreamingGuide() {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      {/* 引言 */}
      <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-6">
        Netflix、Spotify、Disney+ 用邊張信用卡最抵？
        本文教你 <strong>{currentYear} 串流平台信用卡攻略</strong>，
        拆解 <strong>CBF 手續費陷阱</strong>，教你慳到盡！
      </p>

      {/* 目錄 */}
      <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-10">
        <h2 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          📑 本文目錄
        </h2>
        <ul className="space-y-2 text-sm">
          <li><a href="#overview" className="text-blue-600 dark:text-blue-400 hover:underline">1. 串流平台信用卡回贈點計？</a></li>
          <li><a href="#cbf-trap" className="text-blue-600 dark:text-blue-400 hover:underline">2. CBF 手續費陷阱</a></li>
          <li><a href="#platforms" className="text-blue-600 dark:text-blue-400 hover:underline">3. 串流平台比較</a></li>
          <li><a href="#card-comparison" className="text-blue-600 dark:text-blue-400 hover:underline">4. 信用卡回贈比較</a></li>
          <li><a href="#netflix" className="text-blue-600 dark:text-blue-400 hover:underline">5. Netflix 攻略</a></li>
          <li><a href="#spotify" className="text-blue-600 dark:text-blue-400 hover:underline">6. Spotify 攻略</a></li>
          <li><a href="#disney" className="text-blue-600 dark:text-blue-400 hover:underline">7. Disney+ 攻略</a></li>
          <li><a href="#youtube" className="text-blue-600 dark:text-blue-400 hover:underline">8. YouTube Premium 攻略</a></li>
          <li><a href="#rebate-calc" className="text-blue-600 dark:text-blue-400 hover:underline">9. 回贈計算例子</a></li>
          <li><a href="#faq" className="text-blue-600 dark:text-blue-400 hover:underline">10. 常見問題 FAQ</a></li>
        </ul>
      </div>

      {/* Section 1: 總覽 */}
      <section id="overview" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Tv className="h-6 w-6 text-red-500" />
          1. 串流平台信用卡回贈點計？
        </h2>
        
        <p>
          串流平台訂閱費分為<strong>港幣</strong>同<strong>外幣</strong>兩種，
          回贈計算方法唔同：
        </p>

        <div className="not-prose bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-2xl p-5 border border-red-200 dark:border-red-800 my-6">
          <h4 className="font-bold text-red-800 dark:text-red-200 mb-3">📺 串流平台分類</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
              <p className="text-sm font-bold text-green-600 mb-1">✅ 港幣計價（無 CBF）</p>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-0.5">
                <li>• Disney+</li>
                <li>• YouTube Premium（香港版）</li>
                <li>• KKBOX</li>
                <li>• myTV SUPER</li>
              </ul>
            </div>
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
              <p className="text-sm font-bold text-red-600 mb-1">⚠️ 外幣計價（有 CBF）</p>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-0.5">
                <li>• Netflix</li>
                <li>• Spotify</li>
                <li>• Apple TV+ / Apple Music</li>
                <li>• Amazon Prime Video</li>
              </ul>
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
          Netflix、Spotify 等外幣計價平台會收取 <strong>CBF 手續費（約 1.95%）</strong>：
        </p>

        <div className="not-prose bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 my-6">
          <h4 className="font-bold text-amber-800 dark:text-amber-200 mb-2">⚠️ CBF 計算例子</h4>
          <p className="text-amber-700 dark:text-amber-300 text-sm">
            Netflix 標準版 $78/月：<br/>
            • <strong>有 CBF 卡</strong>：$78 × 1.95% = $1.52 手續費<br/>
            • 如果用 <Link href="/cards/hsbc-red" className="underline">HSBC Red Card</Link> 4% 回贈：$78 × 4% = $3.12 - $1.52 = <strong>淨回贈 $1.60</strong><br/>
            • 如果用 <Link href="/cards/sc-simply-cash" className="underline">SC Simply Cash</Link> 2% 免 CBF：$78 × 2% = <strong>淨回贈 $1.56</strong>
          </p>
        </div>

        <div className="not-prose bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
          <h4 className="font-bold text-green-800 dark:text-green-200 mb-2">✅ 免 CBF 信用卡</h4>
          <ul className="text-green-700 dark:text-green-300 text-sm space-y-1">
            <li>• <Link href="/cards/sc-cathay" className="underline">渣打國泰 Mastercard</Link>（$4/里）</li>
            <li>• <Link href="/cards/sc-simply-cash" className="underline">渣打 Simply Cash</Link>（2% 海外）</li>
            <li>• <Link href="/cards/earnmore" className="underline">安信 EarnMORE</Link>（2% 無上限）</li>
            <li>• <Link href="/cards/citi-premiermiles" className="underline">Citi PremierMiles</Link>（$3/里海外）</li>
          </ul>
        </div>
      </section>

      {/* Section 3: 平台比較 */}
      <section id="platforms" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Play className="h-6 w-6 text-purple-500" />
          3. 串流平台比較
        </h2>

        <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden my-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-purple-50 dark:bg-purple-900/20">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-purple-600 dark:text-purple-400">平台</th>
                  <th className="px-4 py-3 text-center font-medium text-purple-600 dark:text-purple-400">月費</th>
                  <th className="px-4 py-3 text-center font-medium text-purple-600 dark:text-purple-400">貨幣</th>
                  <th className="px-4 py-3 text-center font-medium text-purple-600 dark:text-purple-400">CBF</th>
                  <th className="px-4 py-3 text-center font-medium text-purple-600 dark:text-purple-400">推薦卡</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {streamingPlatforms.map((platform, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3 font-medium">
                      <span className="mr-2">{platform.icon}</span>
                      {platform.name}
                    </td>
                    <td className="px-4 py-3 text-center text-gray-600 dark:text-gray-400">{platform.monthlyFee}</td>
                    <td className="px-4 py-3 text-center text-gray-600 dark:text-gray-400">{platform.currency}</td>
                    <td className="px-4 py-3 text-center">
                      {platform.hasCBF ? (
                        <span className="text-red-500 font-bold">有</span>
                      ) : (
                        <span className="text-green-500 font-bold">無</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center text-xs">
                      {platform.bestCards.map((cardId, i) => (
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
                  <span className={`ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-bold ${
                    card.cbfFree ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                  }`}>
                    {card.cbfFree ? "免 CBF" : "有 CBF"}
                  </span>
                </div>
                <span className="font-bold text-green-600 dark:text-green-400">{card.highlight}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                <p className="text-gray-600 dark:text-gray-400">本地網購：<strong>{card.localRate}</strong></p>
                <p className="text-gray-600 dark:text-gray-400">海外網購：<strong>{card.overseasRate}</strong></p>
              </div>
              <p className="text-xs text-gray-500 mt-1">{card.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Card Preview Section */}
      <CardPreviewSection 
        title="📌 串流平台推薦信用卡"
        subtitle="點擊查看詳細回贈條款及申請連結"
        cards={[
          { id: "sc-cathay", highlight: "免 CBF" },
          { id: "sc-simply-cash", highlight: "2% 免 CBF" },
          { id: "hangseng-mmpower", highlight: "網購 5%" },
          { id: "hsbc-red", highlight: "網購 4%" },
        ]}
      />

      {/* Section 5: Netflix */}
      <section id="netflix" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          🎬 5. Netflix 攻略
        </h2>

        <div className="not-prose space-y-4 my-6">
          <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4 border border-red-200 dark:border-red-800">
            <h4 className="font-bold text-red-800 dark:text-red-200 mb-2">🎯 Netflix 最佳信用卡</h4>
            <ul className="text-red-700 dark:text-red-300 text-sm space-y-1">
              <li>1️⃣ <Link href="/cards/sc-cathay" className="underline">渣打國泰卡</Link> — 免 CBF + $4/里</li>
              <li>2️⃣ <Link href="/cards/sc-simply-cash" className="underline">SC Simply Cash</Link> — 免 CBF + 2%</li>
              <li>3️⃣ <Link href="/cards/earnmore" className="underline">安信 EarnMORE</Link> — 免 CBF + 2%</li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4">
            <h4 className="font-bold text-gray-900 dark:text-white mb-2">💡 Netflix 慳錢貼士</h4>
            <ul className="text-gray-600 dark:text-gray-400 text-sm space-y-1">
              <li>• 用<strong>免 CBF 卡</strong>慳 1.95% 手續費</li>
              <li>• 考慮訂閱<strong>基本版</strong>（如果唔需要 4K）</li>
              <li>• <strong>家庭共享</strong>分攤費用</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 6: Spotify */}
      <section id="spotify" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          🎵 6. Spotify 攻略
        </h2>

        <div className="not-prose space-y-4 my-6">
          <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 border border-green-200 dark:border-green-800">
            <h4 className="font-bold text-green-800 dark:text-green-200 mb-2">🎯 Spotify 最佳信用卡</h4>
            <ul className="text-green-700 dark:text-green-300 text-sm space-y-1">
              <li>1️⃣ <Link href="/cards/sc-cathay" className="underline">渣打國泰卡</Link> — 免 CBF + $4/里</li>
              <li>2️⃣ <Link href="/cards/sc-simply-cash" className="underline">SC Simply Cash</Link> — 免 CBF + 2%</li>
              <li>3️⃣ <Link href="/cards/earnmore" className="underline">安信 EarnMORE</Link> — 免 CBF + 2%</li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4">
            <h4 className="font-bold text-gray-900 dark:text-white mb-2">💡 Spotify 慳錢貼士</h4>
            <ul className="text-gray-600 dark:text-gray-400 text-sm space-y-1">
              <li>• <strong>學生優惠</strong>只需 $48/月</li>
              <li>• <strong>Family Plan</strong> 最多 6 人共用</li>
              <li>• 用<strong>免 CBF 卡</strong>慳手續費</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 7: Disney+ */}
      <section id="disney" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          🏰 7. Disney+ 攻略
        </h2>

        <div className="not-prose space-y-4 my-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
            <h4 className="font-bold text-blue-800 dark:text-blue-200 mb-2">🎯 Disney+ 最佳信用卡</h4>
            <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1">
              <li>1️⃣ <Link href="/cards/hangseng-mmpower" className="underline">恒生 MMPOWER</Link> — 網購 5%</li>
              <li>2️⃣ <Link href="/cards/hsbc-red" className="underline">HSBC Red Card</Link> — 網購 4%</li>
              <li>3️⃣ <Link href="/cards/earnmore" className="underline">安信 EarnMORE</Link> — 2% 無上限</li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4">
            <h4 className="font-bold text-gray-900 dark:text-white mb-2">💡 Disney+ 慳錢貼士</h4>
            <ul className="text-gray-600 dark:text-gray-400 text-sm space-y-1">
              <li>• 港幣計價，<strong>無 CBF</strong></li>
              <li>• 訂<strong>年費</strong>比月費平 17%</li>
              <li>• 用<strong>網購高回贈卡</strong>最抵</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 8: YouTube Premium */}
      <section id="youtube" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          ▶️ 8. YouTube Premium 攻略
        </h2>

        <div className="not-prose space-y-4 my-6">
          <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4 border border-red-200 dark:border-red-800">
            <h4 className="font-bold text-red-800 dark:text-red-200 mb-2">🎯 YouTube Premium 最佳信用卡</h4>
            <ul className="text-red-700 dark:text-red-300 text-sm space-y-1">
              <li>1️⃣ <Link href="/cards/hangseng-mmpower" className="underline">恒生 MMPOWER</Link> — 網購 5%</li>
              <li>2️⃣ <Link href="/cards/hsbc-red" className="underline">HSBC Red Card</Link> — 網購 4%</li>
              <li>3️⃣ <Link href="/cards/earnmore" className="underline">安信 EarnMORE</Link> — 2% 無上限</li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4">
            <h4 className="font-bold text-gray-900 dark:text-white mb-2">💡 YouTube Premium 慳錢貼士</h4>
            <ul className="text-gray-600 dark:text-gray-400 text-sm space-y-1">
              <li>• 港幣計價，<strong>無 CBF</strong></li>
              <li>• <strong>家庭計劃</strong> $98 最多 6 人</li>
              <li>• 包括 <strong>YouTube Music</strong></li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 9: 回贈計算 */}
      <section id="rebate-calc" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Calculator className="h-6 w-6 text-indigo-500" />
          9. 回贈計算例子
        </h2>

        <div className="not-prose space-y-4 my-6">
          {rebateExamples.map((example, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4">
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">{example.platform}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                月費：${example.monthlyFee}（{example.currency}）
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 dark:bg-gray-900">
                    <tr>
                      <th className="px-3 py-2 text-left">信用卡</th>
                      <th className="px-3 py-2 text-center">回贈率</th>
                      <th className="px-3 py-2 text-center">年回贈</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    {example.cards.map((card, i) => (
                      <tr key={i}>
                        <td className="px-3 py-2">{card.card}</td>
                        <td className="px-3 py-2 text-center text-xs">{card.rebate}</td>
                        <td className="px-3 py-2 text-center font-bold text-green-600">${card.annual}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
          {streamingFaqData.map((faq, index) => (
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
      <div className="not-prose bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white mb-10">
        <h3 className="text-xl font-bold mb-2">📺 想知邊張信用卡串流平台回贈最高？</h3>
        <p className="mb-4 opacity-90">用我哋嘅計算機，即刻搵到最適合你嘅信用卡！</p>
        <Link href="/">
          <Button className="bg-white text-purple-600 hover:bg-gray-100">
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

