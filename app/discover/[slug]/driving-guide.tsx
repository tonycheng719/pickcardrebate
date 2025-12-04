// 揸車必備信用卡攻略
// 用於 /discover/driving-guide 頁面

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  ChevronRight, ChevronDown, CreditCard, Car, Fuel,
  Calculator, Trophy, DollarSign, CheckCircle, AlertTriangle,
  Star, Info, Zap, Percent, Gift, MapPin, Timer
} from "lucide-react";
import { CardPreviewSection } from "@/app/discover/components/card-preview-section";

// FAQ 數據
export const drivingFaqData = [
  {
    question: "入油用邊張信用卡最抵？",
    answer: "入油推薦 HSBC EveryMile（入油 $2/里）或 DBS Eminent（入油/停車場 5%）。普通回贈卡如 EarnMORE 2% 或 Simply Cash 1.5% 都可以。"
  },
  {
    question: "易通行用邊張信用卡最抵？",
    answer: "易通行屬於自動轉賬，大部分信用卡只有 0.4% 基本回贈。建議用 EarnMORE（2%）或 Simply Cash（1.5%）。留意部分銀行易通行有額外優惠。"
  },
  {
    question: "停車場用邊張信用卡最抵？",
    answer: "停車場推薦 DBS Eminent（停車場 5%）或恒生 MMPOWER（手機支付 5%，需用 Apple Pay/Google Pay 拍卡）。"
  },
  {
    question: "咪錶用邊張信用卡最抵？",
    answer: "咪錶用 Octopus 或信用卡，推薦 EarnMORE（2%）八達通自動增值。或者用入油卡如 DBS Eminent（非入油消費 0.4%）。"
  },
  {
    question: "牌費用邊張信用卡最抵？",
    answer: "牌費可用 AlipayHK 或 BoC Pay 繳費，再用高回贈信用卡增值。直接用信用卡交牌費通常無回贈。"
  },
  {
    question: "洗車用邊張信用卡最抵？",
    answer: "洗車屬於一般消費，用 EarnMORE（2%）或 Simply Cash（1.5%）。連鎖洗車店如 Autoglym 可能有信用卡優惠。"
  },
  {
    question: "揸車信用卡點揀？",
    answer: "揸車必備信用卡組合：(1) 入油卡：HSBC EveryMile 或 DBS Eminent；(2) 自動轉賬卡：EarnMORE 或 Simply Cash；(3) 停車場卡：DBS Eminent 或 MMPOWER。"
  },
  {
    question: "大新 myauto 車主信用卡好唔好？",
    answer: "大新 myauto 車主卡入油 8%（上限 $300/月），適合每月入油 $3,750 以內的車主。超出上限後回贈只有 0.4%，建議配合其他卡使用。"
  }
];

// 入油信用卡比較
const fuelCardComparison = [
  {
    card: "大新 myauto 車主卡",
    id: "dahsing-myauto",
    fuelRate: "8%",
    cap: "$300/月",
    otherRate: "0.4%",
    highlight: "入油最高",
    note: "適合月入油 $3,750 以內",
  },
  {
    card: "HSBC EveryMile",
    id: "hsbc-everymile",
    fuelRate: "$2/里",
    cap: "無上限",
    otherRate: "$5/里",
    highlight: "儲里數之選",
    note: "入油 $2/里 = 約 2.5% 回贈",
  },
  {
    card: "DBS Eminent",
    id: "dbs-eminent",
    fuelRate: "5%",
    cap: "$200/月",
    otherRate: "1%",
    highlight: "停車場同享",
    note: "入油 + 停車場都有 5%",
  },
  {
    card: "安信 EarnMORE",
    id: "earnmore",
    fuelRate: "2%",
    cap: "無上限",
    otherRate: "2%",
    highlight: "無上限",
    note: "所有消費 2% 無上限",
  },
  {
    card: "渣打 Simply Cash",
    id: "sc-simply-cash",
    fuelRate: "1.5%",
    cap: "無上限",
    otherRate: "1.5%",
    highlight: "永久免年費",
    note: "所有消費 1.5%",
  },
];

// 停車場信用卡比較
const parkingCardComparison = [
  {
    card: "DBS Eminent",
    id: "dbs-eminent",
    parkingRate: "5%",
    cap: "$200/月",
    note: "入油 + 停車場",
  },
  {
    card: "恒生 MMPOWER",
    id: "hangseng-mmpower",
    parkingRate: "5%",
    cap: "$400/月",
    note: "需用 Apple Pay/Google Pay",
  },
  {
    card: "安信 EarnMORE",
    id: "earnmore",
    parkingRate: "2%",
    cap: "無上限",
    note: "所有消費 2%",
  },
];

// 易通行/自動轉賬比較
const autoPayComparison = [
  {
    card: "安信 EarnMORE",
    id: "earnmore",
    autoPayRate: "2%",
    cap: "無上限",
    note: "自動轉賬都有 2%",
  },
  {
    card: "渣打 Simply Cash",
    id: "sc-simply-cash",
    autoPayRate: "1.5%",
    cap: "無上限",
    note: "自動轉賬都有 1.5%",
  },
  {
    card: "Citi Cash Back",
    id: "citi-cashback",
    autoPayRate: "1%",
    cap: "無上限",
    note: "自動轉賬 1%",
  },
];

// 油站優惠
const fuelStationDeals = [
  {
    station: "Shell",
    icon: "🐚",
    deals: [
      "HSBC 信用卡：$0.7/L 回贈",
      "恒生信用卡：$0.6/L 回贈",
      "Shell Bonus Card 積分",
    ],
  },
  {
    station: "Caltex",
    icon: "⭐",
    deals: [
      "Citi 信用卡：$0.8/L 回贈",
      "渣打信用卡：$0.6/L 回贈",
      "StarCash 積分",
    ],
  },
  {
    station: "Esso",
    icon: "🔵",
    deals: [
      "HSBC 信用卡：$0.6/L 回贈",
      "Smile 積分計劃",
      "易賞錢積分",
    ],
  },
  {
    station: "Sinopec",
    icon: "🔴",
    deals: [
      "指定信用卡優惠",
      "會員積分計劃",
    ],
  },
];

// 車主消費場景
const drivingScenarios = [
  {
    scenario: "入油",
    icon: "⛽",
    bestCards: ["dahsing-myauto", "hsbc-everymile", "dbs-eminent"],
    tips: "留意油站 + 信用卡疊加優惠",
  },
  {
    scenario: "易通行",
    icon: "🛣️",
    bestCards: ["earnmore", "sc-simply-cash"],
    tips: "自動轉賬類別，部分卡無回贈",
  },
  {
    scenario: "停車場",
    icon: "🅿️",
    bestCards: ["dbs-eminent", "hangseng-mmpower"],
    tips: "八達通停車場用 EarnMORE 自動增值",
  },
  {
    scenario: "咪錶",
    icon: "⏱️",
    bestCards: ["earnmore"],
    tips: "用八達通自動增值賺回贈",
  },
  {
    scenario: "洗車",
    icon: "🚿",
    bestCards: ["earnmore", "sc-simply-cash"],
    tips: "一般消費類別",
  },
  {
    scenario: "牌費/保險",
    icon: "📋",
    bestCards: ["earnmore", "sc-simply-cash"],
    tips: "用 AlipayHK/BoC Pay 繳費",
  },
];

export function DrivingGuide() {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      {/* 引言 */}
      <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-6">
        揸車日常開支：入油、易通行、停車場、牌費⋯⋯點先可以賺到最多回贈？
        本文教你 <strong>{currentYear} 揸車必備信用卡攻略</strong>，
        入油最高 <strong>8% 回贈</strong>！
      </p>

      {/* 目錄 */}
      <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-10">
        <h2 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          📑 本文目錄
        </h2>
        <ul className="space-y-2 text-sm">
          <li><a href="#overview" className="text-blue-600 dark:text-blue-400 hover:underline">1. 揸車消費類別總覽</a></li>
          <li><a href="#fuel" className="text-blue-600 dark:text-blue-400 hover:underline">2. 入油信用卡比較</a></li>
          <li><a href="#autotoll" className="text-blue-600 dark:text-blue-400 hover:underline">3. 易通行信用卡攻略</a></li>
          <li><a href="#parking" className="text-blue-600 dark:text-blue-400 hover:underline">4. 停車場信用卡攻略</a></li>
          <li><a href="#fuel-station" className="text-blue-600 dark:text-blue-400 hover:underline">5. 油站優惠一覽</a></li>
          <li><a href="#combo" className="text-blue-600 dark:text-blue-400 hover:underline">6. 揸車信用卡組合推薦</a></li>
          <li><a href="#rebate-calc" className="text-blue-600 dark:text-blue-400 hover:underline">7. 回贈計算例子</a></li>
          <li><a href="#tips" className="text-blue-600 dark:text-blue-400 hover:underline">8. 揸車慳錢貼士</a></li>
          <li><a href="#faq" className="text-blue-600 dark:text-blue-400 hover:underline">9. 常見問題 FAQ</a></li>
        </ul>
      </div>

      {/* Section 1: 總覽 */}
      <section id="overview" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Car className="h-6 w-6 text-blue-500" />
          1. 揸車消費類別總覽
        </h2>
        
        <p>
          揸車涉及多種消費類別，每種類別適合唔同嘅信用卡：
        </p>

        <div className="not-prose grid md:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
          {drivingScenarios.map((scenario, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{scenario.icon}</span>
                <h4 className="font-bold text-gray-900 dark:text-white">{scenario.scenario}</h4>
              </div>
              <p className="text-xs text-gray-500 mb-2">{scenario.tips}</p>
              <div className="flex flex-wrap gap-1">
                {scenario.bestCards.slice(0, 2).map((cardId, i) => (
                  <Link key={i} href={`/cards/${cardId}`} className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded hover:underline">
                    {fuelCardComparison.find(c => c.id === cardId)?.card.replace(" 車主卡", "").replace(" Visa", "").replace(" Mastercard", "") || 
                     parkingCardComparison.find(c => c.id === cardId)?.card.replace(" Visa", "").replace(" Mastercard", "") ||
                     autoPayComparison.find(c => c.id === cardId)?.card.replace(" Visa", "").replace(" Mastercard", "") ||
                     cardId}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: 入油 */}
      <section id="fuel" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Fuel className="h-6 w-6 text-orange-500" />
          2. 入油信用卡比較
        </h2>

        <div className="not-prose bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl p-5 border border-orange-200 dark:border-orange-800 mb-6">
          <h4 className="font-bold text-orange-800 dark:text-orange-200 mb-3">⛽ 入油信用卡比較表</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-white/50 dark:bg-gray-800/50">
                <tr>
                  <th className="px-3 py-2 text-left font-medium">信用卡</th>
                  <th className="px-3 py-2 text-center font-medium">入油回贈</th>
                  <th className="px-3 py-2 text-center font-medium">上限</th>
                  <th className="px-3 py-2 text-center font-medium">其他消費</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-orange-100 dark:divide-gray-700">
                {fuelCardComparison.map((card, index) => (
                  <tr key={index}>
                    <td className="px-3 py-2">
                      <Link href={`/cards/${card.id}`} className="text-blue-600 hover:underline dark:text-blue-400 font-medium">{card.card}</Link>
                    </td>
                    <td className="px-3 py-2 text-center font-bold text-orange-600">{card.fuelRate}</td>
                    <td className="px-3 py-2 text-center text-gray-600 dark:text-gray-400">{card.cap}</td>
                    <td className="px-3 py-2 text-center text-gray-600 dark:text-gray-400">{card.otherRate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="not-prose space-y-4">
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
            <h4 className="font-bold text-amber-800 dark:text-amber-200 mb-2">⚠️ 入油信用卡注意事項</h4>
            <ul className="text-amber-700 dark:text-amber-300 text-sm space-y-1">
              <li>• <strong>大新 myauto</strong> 入油 8% 超高，但上限 $300/月，適合月入油 $3,750 以內</li>
              <li>• <strong>HSBC EveryMile</strong> 入油 $2/里 無上限，適合儲里數</li>
              <li>• <strong>DBS Eminent</strong> 入油 + 停車場都有 5%，但上限只有 $200/月</li>
              <li>• 超出上限後，建議轉用 <Link href="/cards/earnmore" className="underline">EarnMORE</Link> 或 <Link href="/cards/sc-simply-cash" className="underline">Simply Cash</Link></li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 3: 易通行 */}
      <section id="autotoll" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          🛣️ 3. 易通行信用卡攻略
        </h2>

        <p>
          易通行屬於<strong>自動轉賬</strong>類別，大部分信用卡只有 0.4% 基本回贈。
          但部分信用卡可以賺到更高回贈：
        </p>

        <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden my-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-blue-50 dark:bg-blue-900/20">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-blue-600 dark:text-blue-400">信用卡</th>
                  <th className="px-4 py-3 text-center font-medium text-blue-600 dark:text-blue-400">易通行回贈</th>
                  <th className="px-4 py-3 text-center font-medium text-blue-600 dark:text-blue-400">上限</th>
                  <th className="px-4 py-3 text-left font-medium text-blue-600 dark:text-blue-400">備註</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {autoPayComparison.map((card, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3">
                      <Link href={`/cards/${card.id}`} className="text-blue-600 hover:underline dark:text-blue-400 font-medium">{card.card}</Link>
                    </td>
                    <td className="px-4 py-3 text-center font-bold text-green-600">{card.autoPayRate}</td>
                    <td className="px-4 py-3 text-center text-gray-600 dark:text-gray-400">{card.cap}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400 text-xs">{card.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="not-prose bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
          <h4 className="font-bold text-green-800 dark:text-green-200 mb-2">✅ 易通行最佳策略</h4>
          <ul className="text-green-700 dark:text-green-300 text-sm space-y-1">
            <li>• 用 <Link href="/cards/earnmore" className="underline">EarnMORE</Link> 綁定易通行，賺 <strong>2% 無上限</strong></li>
            <li>• 或用 <Link href="/cards/sc-simply-cash" className="underline">SC Simply Cash</Link> 賺 <strong>1.5%</strong></li>
            <li>• 留意部分銀行有易通行限時優惠</li>
          </ul>
        </div>
      </section>

      {/* Section 4: 停車場 */}
      <section id="parking" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          🅿️ 4. 停車場信用卡攻略
        </h2>

        <p>
          停車場有兩種付款方式：<strong>信用卡拍卡</strong>或<strong>八達通</strong>。
          唔同方式適合唔同信用卡：
        </p>

        <div className="not-prose grid md:grid-cols-2 gap-4 my-6">
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 border border-purple-200 dark:border-purple-800">
            <h4 className="font-bold text-purple-800 dark:text-purple-200 mb-2">💳 信用卡拍卡</h4>
            <ul className="text-purple-700 dark:text-purple-300 text-sm space-y-1">
              <li>• <Link href="/cards/dbs-eminent" className="underline">DBS Eminent</Link>：<strong>5%</strong>（上限 $200/月）</li>
              <li>• <Link href="/cards/hangseng-mmpower" className="underline">恒生 MMPOWER</Link>：<strong>5%</strong>（需用 Apple Pay）</li>
              <li>• <Link href="/cards/earnmore" className="underline">EarnMORE</Link>：<strong>2%</strong> 無上限</li>
            </ul>
          </div>
          <div className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-4 border border-teal-200 dark:border-teal-800">
            <h4 className="font-bold text-teal-800 dark:text-teal-200 mb-2">🎫 八達通</h4>
            <ul className="text-teal-700 dark:text-teal-300 text-sm space-y-1">
              <li>• <Link href="/cards/earnmore" className="underline">EarnMORE</Link> 自動增值：<strong>2%</strong></li>
              <li>• <Link href="/cards/sc-simply-cash" className="underline">Simply Cash</Link> 自動增值：<strong>1.5%</strong></li>
              <li>• 適合八達通停車場（領展、Link 等）</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Card Preview Section */}
      <CardPreviewSection 
        title="📌 揸車推薦信用卡"
        subtitle="點擊查看詳細回贈條款及申請連結"
        cards={[
          { id: "hsbc-everymile", highlight: "入油 $2/里" },
          { id: "dbs-eminent", highlight: "入油 5%" },
          { id: "earnmore", highlight: "2% 無上限" },
          { id: "hangseng-mmpower", highlight: "手機支付 5%" },
        ]}
      />

      {/* Section 5: 油站優惠 */}
      <section id="fuel-station" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          ⛽ 5. 油站優惠一覽
        </h2>

        <p>
          唔同油站有唔同信用卡優惠，<strong>信用卡回贈 + 油站優惠可以疊加</strong>！
        </p>

        <div className="not-prose grid md:grid-cols-2 gap-4 my-6">
          {fuelStationDeals.map((station, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{station.icon}</span>
                <h4 className="font-bold text-gray-900 dark:text-white">{station.station}</h4>
              </div>
              <ul className="text-gray-600 dark:text-gray-400 text-sm space-y-1">
                {station.deals.map((deal, i) => (
                  <li key={i}>• {deal}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="not-prose bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
          <h4 className="font-bold text-blue-800 dark:text-blue-200 mb-2">💡 油站優惠疊加攻略</h4>
          <p className="text-blue-700 dark:text-blue-300 text-sm">
            例如：Shell + HSBC 信用卡 $0.7/L 回贈 + HSBC EveryMile 入油 $2/里<br/>
            <strong>雙重優惠疊加</strong>，入油更抵！
          </p>
        </div>
      </section>

      {/* Section 6: 組合推薦 */}
      <section id="combo" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Trophy className="h-6 w-6 text-yellow-500" />
          6. 揸車信用卡組合推薦
        </h2>

        <div className="not-prose space-y-4 my-6">
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl p-5 border border-yellow-200 dark:border-yellow-800">
            <h4 className="font-bold text-yellow-800 dark:text-yellow-200 mb-3">🏆 最強揸車組合</h4>
            <div className="grid md:grid-cols-3 gap-3">
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
                <p className="text-xs text-yellow-600 font-bold mb-1">入油專用</p>
                <Link href="/cards/hsbc-everymile" className="text-sm font-medium text-blue-600 hover:underline">HSBC EveryMile</Link>
                <p className="text-xs text-gray-500">$2/里 無上限</p>
              </div>
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
                <p className="text-xs text-yellow-600 font-bold mb-1">自動轉賬</p>
                <Link href="/cards/earnmore" className="text-sm font-medium text-blue-600 hover:underline">安信 EarnMORE</Link>
                <p className="text-xs text-gray-500">易通行 2% 無上限</p>
              </div>
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
                <p className="text-xs text-yellow-600 font-bold mb-1">停車場</p>
                <Link href="/cards/dbs-eminent" className="text-sm font-medium text-blue-600 hover:underline">DBS Eminent</Link>
                <p className="text-xs text-gray-500">停車場 5%</p>
              </div>
            </div>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-5 border border-green-200 dark:border-green-800">
            <h4 className="font-bold text-green-800 dark:text-green-200 mb-3">💰 簡單一卡流</h4>
            <p className="text-green-700 dark:text-green-300 text-sm mb-2">
              如果唔想揸咁多卡，用 <Link href="/cards/earnmore" className="underline font-bold">EarnMORE</Link> 就夠：
            </p>
            <ul className="text-green-700 dark:text-green-300 text-sm space-y-1">
              <li>• 入油 <strong>2%</strong></li>
              <li>• 易通行 <strong>2%</strong></li>
              <li>• 停車場 <strong>2%</strong></li>
              <li>• 八達通自動增值 <strong>2%</strong></li>
              <li>• <strong>所有消費 2% 無上限</strong></li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 7: 回贈計算 */}
      <section id="rebate-calc" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Calculator className="h-6 w-6 text-indigo-500" />
          7. 回贈計算例子
        </h2>

        <div className="not-prose bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 my-6">
          <h4 className="font-bold text-gray-900 dark:text-white mb-3">📊 每月揸車開支回贈計算</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            假設每月：入油 $3,000 + 易通行 $500 + 停車場 $1,000
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-3 py-2 text-left">方案</th>
                  <th className="px-3 py-2 text-center">入油</th>
                  <th className="px-3 py-2 text-center">易通行</th>
                  <th className="px-3 py-2 text-center">停車場</th>
                  <th className="px-3 py-2 text-center">月回贈</th>
                  <th className="px-3 py-2 text-center">年回贈</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                <tr>
                  <td className="px-3 py-2 font-medium">最強組合</td>
                  <td className="px-3 py-2 text-center">$75<br/><span className="text-xs text-gray-500">EveryMile</span></td>
                  <td className="px-3 py-2 text-center">$10<br/><span className="text-xs text-gray-500">EarnMORE</span></td>
                  <td className="px-3 py-2 text-center">$50<br/><span className="text-xs text-gray-500">DBS</span></td>
                  <td className="px-3 py-2 text-center font-bold text-green-600">$135</td>
                  <td className="px-3 py-2 text-center font-bold text-green-600">$1,620</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-medium">一卡流</td>
                  <td className="px-3 py-2 text-center">$60<br/><span className="text-xs text-gray-500">EarnMORE</span></td>
                  <td className="px-3 py-2 text-center">$10<br/><span className="text-xs text-gray-500">EarnMORE</span></td>
                  <td className="px-3 py-2 text-center">$20<br/><span className="text-xs text-gray-500">EarnMORE</span></td>
                  <td className="px-3 py-2 text-center font-bold text-green-600">$90</td>
                  <td className="px-3 py-2 text-center font-bold text-green-600">$1,080</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-medium">普通卡</td>
                  <td className="px-3 py-2 text-center">$12<br/><span className="text-xs text-gray-500">0.4%</span></td>
                  <td className="px-3 py-2 text-center">$2<br/><span className="text-xs text-gray-500">0.4%</span></td>
                  <td className="px-3 py-2 text-center">$4<br/><span className="text-xs text-gray-500">0.4%</span></td>
                  <td className="px-3 py-2 text-center text-gray-500">$18</td>
                  <td className="px-3 py-2 text-center text-gray-500">$216</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            *最強組合 vs 普通卡，每年可多賺 <strong>$1,400+</strong>！
          </p>
        </div>
      </section>

      {/* Section 8: 慳錢貼士 */}
      <section id="tips" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Zap className="h-6 w-6 text-purple-500" />
          8. 揸車慳錢貼士
        </h2>

        <div className="not-prose grid md:grid-cols-2 gap-4 my-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4">
            <h4 className="font-bold text-gray-900 dark:text-white mb-2">⛽ 入油貼士</h4>
            <ul className="text-gray-600 dark:text-gray-400 text-sm space-y-1">
              <li>• 留意油站 + 信用卡疊加優惠</li>
              <li>• 加入油站會員積分計劃</li>
              <li>• 趁油價低位入滿缸</li>
              <li>• 用指定卡賺額外回贈</li>
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4">
            <h4 className="font-bold text-gray-900 dark:text-white mb-2">🅿️ 停車貼士</h4>
            <ul className="text-gray-600 dark:text-gray-400 text-sm space-y-1">
              <li>• 商場停車場有消費免泊優惠</li>
              <li>• 用 Wilson / 領展 App 預約慳錢</li>
              <li>• 八達通停車場用自動增值賺回贈</li>
              <li>• 留意早鳥 / 夜泊優惠</li>
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4">
            <h4 className="font-bold text-gray-900 dark:text-white mb-2">🛣️ 易通行貼士</h4>
            <ul className="text-gray-600 dark:text-gray-400 text-sm space-y-1">
              <li>• 綁定高回贈信用卡</li>
              <li>• 避免用無回贈嘅卡</li>
              <li>• 留意銀行限時優惠</li>
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4">
            <h4 className="font-bold text-gray-900 dark:text-white mb-2">📋 其他貼士</h4>
            <ul className="text-gray-600 dark:text-gray-400 text-sm space-y-1">
              <li>• 牌費用 AlipayHK 繳費賺回贈</li>
              <li>• 保險分期用高迎新信用卡</li>
              <li>• 洗車留意信用卡優惠</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 9: FAQ */}
      <section id="faq" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          ❓ 9. 常見問題 FAQ
        </h2>
        
        <div className="not-prose space-y-4">
          {drivingFaqData.map((faq, index) => (
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
      <div className="not-prose bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl p-6 text-white mb-10">
        <h3 className="text-xl font-bold mb-2">🚗 想知邊張信用卡揸車最抵？</h3>
        <p className="mb-4 opacity-90">用我哋嘅計算機，即刻搵到最適合你嘅信用卡！</p>
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
          <Link href="/discover/octopus-guide" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
            <CreditCard className="h-5 w-5 text-emerald-600" />
            <span>八達通增值信用卡攻略</span>
            <ChevronRight className="h-4 w-4 ml-auto text-gray-400" />
          </Link>
          <Link href="/discover/best-cashback-cards" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
            <Trophy className="h-5 w-5 text-emerald-600" />
            <span>最高回贈信用卡比較</span>
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

