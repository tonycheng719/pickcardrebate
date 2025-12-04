// 八達通增值信用卡攻略
// 用於 /discover/octopus-guide 頁面

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  ChevronRight, ChevronDown, CreditCard, Train, Smartphone,
  Calculator, Trophy, DollarSign, CheckCircle, AlertTriangle,
  Star, Info, Zap, Percent, Gift, RefreshCw, Wallet
} from "lucide-react";
import { CardPreviewSection } from "@/app/discover/components/card-preview-section";

// FAQ 數據
export const octopusFaqData = [
  {
    question: "八達通自動增值有回贈嗎？",
    answer: "有！部分信用卡八達通自動增值有回贈，例如渣打 Simply Cash（1.5%）、安信 EarnMORE（2%）、恒生 MMPOWER（1%）等。但大部分銀行信用卡八達通自動增值係無回贈。"
  },
  {
    question: "八達通自動增值信用卡邊張最好？",
    answer: "最高回贈嘅八達通自動增值信用卡係安信 EarnMORE（2%），其次係渣打 Simply Cash（1.5%）。HSBC、Citi 等大銀行通常八達通自動增值無回贈。"
  },
  {
    question: "八達通 App 增值信用卡有回贈嗎？",
    answer: "部分信用卡透過八達通 App（O!ePay）增值有回贈，通常當作「網上簽賬」處理。HSBC Red Card 網上簽賬 4% 回贈，恒生 MMPOWER 網上簽賬 5% 回贈（每月有上限）。"
  },
  {
    question: "八達通自動增值同手動增值有咩分別？",
    answer: "自動增值係當八達通餘額不足時自動從信用卡增值（通常 $250/$500）。手動增值係透過八達通 App 主動增值。兩者回贈率可能唔同，要睇清楚信用卡條款。"
  },
  {
    question: "八達通自動增值上限係幾多？",
    answer: "八達通自動增值每次金額可選 $150、$250 或 $500。每日上限通常係 $3,000。部分信用卡對八達通自動增值有每月回贈上限。"
  },
  {
    question: "八達通銀包（O!ePay）係咩？",
    answer: "八達通銀包係八達通 App 內嘅電子錢包功能，可以用信用卡增值，再轉賬到銀行戶口或用嚟付款。部分信用卡增值八達通銀包有回贈。"
  },
  {
    question: "八達通自動增值信用卡到期點算？",
    answer: "信用卡到期後，八達通自動增值會失效。需要用新卡重新登記自動增值服務。建議收到新卡後盡快更新。"
  },
  {
    question: "八達通自動增值可以賺迎新嗎？",
    answer: "視乎信用卡條款。部分銀行將八達通自動增值計入迎新簽賬要求，但部分銀行唔計。建議申請前睇清楚迎新條款。"
  }
];

// 自動增值回贈比較
const autoTopUpCards = [
  {
    card: "安信 EarnMORE",
    id: "earnmore",
    rate: "2%",
    cap: "無上限",
    highlight: "最高回贈",
    notes: "Mobile Pay 2%，八達通自動增值計入",
  },
  {
    card: "渣打 Simply Cash",
    id: "sc-simply-cash",
    rate: "1.5%",
    cap: "無上限",
    highlight: "無上限",
    notes: "本地簽賬 1.5%，包括八達通",
  },
  {
    card: "恒生 MMPOWER",
    id: "hangseng-mmpower",
    rate: "1%",
    cap: "$200/月",
    highlight: "有上限",
    notes: "八達通增值計入本地簽賬 5%，有月上限",
  },
  {
    card: "HSBC Visa Signature",
    id: "hsbc-vs",
    rate: "0%",
    cap: "-",
    highlight: "無回贈",
    notes: "八達通自動增值無回贈",
  },
  {
    card: "Citi Cash Back",
    id: "citi-cashback",
    rate: "0%",
    cap: "-",
    highlight: "無回贈",
    notes: "八達通自動增值無回贈",
  },
];

// App 增值回贈比較
const appTopUpCards = [
  {
    card: "HSBC Red Card",
    id: "hsbc-red",
    rate: "4%",
    cap: "$10,000/月",
    highlight: "網購計算",
    notes: "八達通 App 增值當網上簽賬 4%",
  },
  {
    card: "恒生 MMPOWER",
    id: "hangseng-mmpower",
    rate: "5%",
    cap: "$200/月",
    highlight: "最高但有上限",
    notes: "八達通 App 增值當網上簽賬 5%",
  },
  {
    card: "渣打 Simply Cash",
    id: "sc-simply-cash",
    rate: "1.5%",
    cap: "無上限",
    highlight: "無上限",
    notes: "八達通 App 增值 1.5%",
  },
  {
    card: "安信 EarnMORE",
    id: "earnmore",
    rate: "2%",
    cap: "無上限",
    highlight: "高回贈",
    notes: "八達通 App 增值 2%",
  },
];

// O!ePay 攻略
const oepayStrategies = [
  {
    title: "Chok 回贈基本步驟",
    steps: [
      "1️⃣ 用信用卡增值八達通銀包",
      "2️⃣ 八達通銀包轉賬到銀行戶口",
      "3️⃣ 賺取信用卡回贈",
    ],
  },
  {
    title: "注意事項",
    steps: [
      "⚠️ 部分信用卡唔計八達通銀包增值回贈",
      "⚠️ 每月增值上限 $3,000",
      "⚠️ 轉賬到銀行可能有手續費",
    ],
  },
];

export function OctopusGuide() {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      {/* 引言 */}
      <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-6">
        八達通增值都有信用卡回贈？本文教你 <strong>{currentYear} 八達通增值信用卡攻略</strong>，
        比較<strong>自動增值</strong>同<strong>手動增值（O!ePay）</strong>回贈，
        教你點樣用八達通 Chok 回贈！
      </p>

      {/* 目錄 */}
      <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-10">
        <h2 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          📑 本文目錄
        </h2>
        <ul className="space-y-2 text-sm">
          <li><a href="#overview" className="text-blue-600 dark:text-blue-400 hover:underline">1. 八達通增值回贈點計？</a></li>
          <li><a href="#auto-topup" className="text-blue-600 dark:text-blue-400 hover:underline">2. 八達通自動增值信用卡比較</a></li>
          <li><a href="#app-topup" className="text-blue-600 dark:text-blue-400 hover:underline">3. 八達通 App 增值信用卡比較</a></li>
          <li><a href="#difference" className="text-blue-600 dark:text-blue-400 hover:underline">4. 自動增值 vs 手動增值</a></li>
          <li><a href="#oepay" className="text-blue-600 dark:text-blue-400 hover:underline">5. 八達通銀包（O!ePay）攻略</a></li>
          <li><a href="#chok" className="text-blue-600 dark:text-blue-400 hover:underline">6. Chok 回贈攻略</a></li>
          <li><a href="#best-cards" className="text-blue-600 dark:text-blue-400 hover:underline">7. 八達通增值最佳信用卡</a></li>
          <li><a href="#setup" className="text-blue-600 dark:text-blue-400 hover:underline">8. 設定自動增值教學</a></li>
          <li><a href="#tips" className="text-blue-600 dark:text-blue-400 hover:underline">9. 慳錢貼士</a></li>
          <li><a href="#faq" className="text-blue-600 dark:text-blue-400 hover:underline">10. 常見問題 FAQ</a></li>
        </ul>
      </div>

      {/* Section 1: 總覽 */}
      <section id="overview" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Train className="h-6 w-6 text-orange-500" />
          1. 八達通增值回贈點計？
        </h2>
        
        <p>
          八達通增值分為<strong>自動增值</strong>同<strong>手動增值</strong>兩種，
          回贈率會因應信用卡同增值方式而唔同：
        </p>

        <div className="not-prose bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-2xl p-5 border border-orange-200 dark:border-orange-800 my-6">
          <h4 className="font-bold text-orange-800 dark:text-orange-200 mb-3">🚇 八達通增值方式</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <RefreshCw className="h-5 w-5 text-orange-500" />
                <p className="font-medium text-gray-900 dark:text-white">自動增值 (AAVS)</p>
              </div>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• 餘額不足時自動從信用卡增值</li>
                <li>• 每次增值 $150/$250/$500</li>
                <li>• 大部分銀行<strong>無回贈</strong></li>
              </ul>
            </div>
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Smartphone className="h-5 w-5 text-blue-500" />
                <p className="font-medium text-gray-900 dark:text-white">手動增值 (O!ePay)</p>
              </div>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• 透過八達通 App 主動增值</li>
                <li>• 當「網上簽賬」處理</li>
                <li>• 部分信用卡有<strong>高回贈</strong></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: 自動增值 */}
      <section id="auto-topup" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <RefreshCw className="h-6 w-6 text-green-500" />
          2. 八達通自動增值信用卡比較
        </h2>

        <p>
          以下係<strong>八達通自動增值信用卡回贈比較</strong>：
        </p>

        <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden my-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-green-50 dark:bg-green-900/20">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-green-600 dark:text-green-400">信用卡</th>
                  <th className="px-4 py-3 text-center font-medium text-green-600 dark:text-green-400">回贈率</th>
                  <th className="px-4 py-3 text-center font-medium text-green-600 dark:text-green-400">上限</th>
                  <th className="px-4 py-3 text-center font-medium text-green-600 dark:text-green-400">備註</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {autoTopUpCards.map((card, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3">
                      <Link href={`/cards/${card.id}`} className="font-medium text-blue-600 hover:underline dark:text-blue-400">
                        {card.card}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`font-bold ${card.rate === "0%" ? "text-gray-400" : "text-green-600 dark:text-green-400"}`}>
                        {card.rate}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center text-gray-600 dark:text-gray-400">{card.cap}</td>
                    <td className="px-4 py-3 text-xs text-gray-500">{card.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="not-prose bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-amber-700 dark:text-amber-300 text-sm">
              <strong>注意：</strong>大部分銀行（HSBC、Citi、DBS 等）八達通自動增值<strong>無回贈</strong>！
              只有 <Link href="/cards/earnmore" className="underline">EarnMORE</Link>、
              <Link href="/cards/sc-simply-cash" className="underline">Simply Cash</Link> 等少數卡有回贈。
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: App 增值 */}
      <section id="app-topup" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Smartphone className="h-6 w-6 text-blue-500" />
          3. 八達通 App 增值信用卡比較
        </h2>

        <p>
          透過<strong>八達通 App（O!ePay）</strong>增值，部分信用卡當「網上簽賬」有高回贈：
        </p>

        <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden my-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-blue-50 dark:bg-blue-900/20">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-blue-600 dark:text-blue-400">信用卡</th>
                  <th className="px-4 py-3 text-center font-medium text-blue-600 dark:text-blue-400">回贈率</th>
                  <th className="px-4 py-3 text-center font-medium text-blue-600 dark:text-blue-400">上限</th>
                  <th className="px-4 py-3 text-center font-medium text-blue-600 dark:text-blue-400">備註</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {appTopUpCards.map((card, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3">
                      <Link href={`/cards/${card.id}`} className="font-medium text-blue-600 hover:underline dark:text-blue-400">
                        {card.card}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="font-bold text-green-600 dark:text-green-400">
                        {card.rate}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center text-gray-600 dark:text-gray-400">{card.cap}</td>
                    <td className="px-4 py-3 text-xs text-gray-500">{card.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Card Preview Section */}
      <CardPreviewSection 
        title="📌 八達通增值推薦信用卡"
        subtitle="點擊查看詳細回贈條款及申請連結"
        cards={[
          { id: "earnmore", highlight: "自動增值 2%" },
          { id: "sc-simply-cash", highlight: "1.5% 無上限" },
          { id: "hsbc-red", highlight: "App 增值 4%" },
          { id: "hangseng-mmpower", highlight: "App 增值 5%" },
        ]}
      />

      {/* Section 4: 分別 */}
      <section id="difference" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Percent className="h-6 w-6 text-purple-500" />
          4. 自動增值 vs 手動增值
        </h2>

        <div className="not-prose grid md:grid-cols-2 gap-4 my-6">
          <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 border border-green-200 dark:border-green-800">
            <h4 className="font-bold text-green-800 dark:text-green-200 mb-3 flex items-center gap-2">
              <RefreshCw className="h-5 w-5" />
              自動增值
            </h4>
            <ul className="text-green-700 dark:text-green-300 text-sm space-y-1">
              <li>✅ 方便，唔使手動操作</li>
              <li>✅ 餘額不足時自動增值</li>
              <li>❌ 大部分銀行無回贈</li>
              <li>❌ 只有少數卡有回贈</li>
            </ul>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
            <h4 className="font-bold text-blue-800 dark:text-blue-200 mb-3 flex items-center gap-2">
              <Smartphone className="h-5 w-5" />
              手動增值（O!ePay）
            </h4>
            <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1">
              <li>✅ 部分卡當網上簽賬有高回贈</li>
              <li>✅ 可以 Chok 回贈</li>
              <li>❌ 需要手動操作</li>
              <li>❌ 部分銀行有月上限</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 5: O!ePay */}
      <section id="oepay" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Wallet className="h-6 w-6 text-teal-500" />
          5. 八達通銀包（O!ePay）攻略
        </h2>

        <p>
          <strong>八達通銀包</strong>（O!ePay）係八達通 App 內嘅電子錢包，
          可以用信用卡增值，再轉賬或付款：
        </p>

        <div className="not-prose space-y-4 my-6">
          {oepayStrategies.map((strategy, index) => (
            <div key={index} className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-4 border border-teal-200 dark:border-teal-800">
              <h4 className="font-bold text-teal-800 dark:text-teal-200 mb-2">{strategy.title}</h4>
              <ul className="text-teal-700 dark:text-teal-300 text-sm space-y-1">
                {strategy.steps.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Section 6: Chok 回贈 */}
      <section id="chok" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Zap className="h-6 w-6 text-yellow-500" />
          6. Chok 回贈攻略
        </h2>

        <p>
          <strong>Chok 回贈</strong>即係利用八達通銀包增值賺取信用卡回贈：
        </p>

        <div className="not-prose space-y-3 my-6">
          {[
            { step: "1", title: "開設八達通銀包", desc: "下載八達通 App，完成身份驗證開設銀包" },
            { step: "2", title: "綁定高回贈信用卡", desc: "綁定 HSBC Red Card（4%）或 MMPOWER（5%）" },
            { step: "3", title: "增值八達通銀包", desc: "用信用卡增值銀包，每月上限約 $3,000" },
            { step: "4", title: "轉賬到銀行", desc: "將銀包餘額轉賬到銀行戶口" },
            { step: "5", title: "賺取回贈", desc: "零成本賺取信用卡回贈！" },
          ].map((item, index) => (
            <div key={index} className="flex items-start gap-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-yellow-500 text-white flex items-center justify-center font-bold">{item.step}</span>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{item.title}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="not-prose bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
          <h4 className="font-bold text-green-800 dark:text-green-200 mb-2">💰 Chok 回贈計算例子</h4>
          <p className="text-green-700 dark:text-green-300 text-sm">
            每月增值 $3,000 × <Link href="/cards/hsbc-red" className="underline">HSBC Red Card</Link> 4% = <strong>$120/月回贈</strong><br/>
            一年 = <strong>$1,440 回贈</strong>（零成本！）
          </p>
        </div>
      </section>

      {/* Section 7: 最佳卡 */}
      <section id="best-cards" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Trophy className="h-6 w-6 text-amber-500" />
          7. 八達通增值最佳信用卡
        </h2>

        <div className="not-prose space-y-4 my-6">
          {[
            { rank: "🥇", card: "安信 EarnMORE", id: "earnmore", rate: "2%", type: "自動增值", reason: "自動增值最高回贈，無上限" },
            { rank: "🥈", card: "HSBC Red Card", id: "hsbc-red", rate: "4%", type: "App 增值", reason: "八達通 App 增值當網購 4%" },
            { rank: "🥉", card: "恒生 MMPOWER", id: "hangseng-mmpower", rate: "5%", type: "App 增值", reason: "App 增值 5%（有上限）" },
            { rank: "4️⃣", card: "渣打 Simply Cash", id: "sc-simply-cash", rate: "1.5%", type: "兩者皆可", reason: "自動/手動增值都有 1.5%" },
          ].map((card, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 flex items-center gap-4">
              <span className="text-2xl">{card.rank}</span>
              <div className="flex-1">
                <Link href={`/cards/${card.id}`} className="font-bold text-blue-600 hover:underline dark:text-blue-400">{card.card}</Link>
                <p className="text-xs text-gray-500">{card.type}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{card.reason}</p>
              </div>
              <span className="font-bold text-green-600 dark:text-green-400 text-lg">{card.rate}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Section 8: 設定教學 */}
      <section id="setup" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <CreditCard className="h-6 w-6 text-indigo-500" />
          8. 設定自動增值教學
        </h2>

        <div className="not-prose space-y-3 my-6">
          {[
            { icon: "📱", title: "下載八達通 App", desc: "App Store / Google Play 下載" },
            { icon: "👤", title: "登記帳戶", desc: "完成身份驗證" },
            { icon: "💳", title: "綁定信用卡", desc: "輸入信用卡資料" },
            { icon: "⚙️", title: "設定自動增值", desc: "選擇增值金額（$150/$250/$500）" },
            { icon: "✅", title: "完成", desc: "開始享用自動增值服務" },
          ].map((step, index) => (
            <div key={index} className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-4 flex items-start gap-4">
              <span className="text-2xl">{step.icon}</span>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-1">{step.title}</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 9: 貼士 */}
      <section id="tips" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Star className="h-6 w-6 text-yellow-500" />
          9. 慳錢貼士
        </h2>

        <div className="not-prose space-y-3">
          {[
            { icon: "💳", title: "揀啱信用卡", desc: "自動增值用 EarnMORE，App 增值用 Red Card" },
            { icon: "📊", title: "留意上限", desc: "部分銀行有每月回贈上限，要計清楚" },
            { icon: "🔄", title: "善用 Chok 回贈", desc: "八達通銀包增值轉賬，零成本賺回贈" },
            { icon: "⏰", title: "更新到期卡", desc: "信用卡到期後記住更新自動增值" },
            { icon: "📱", title: "用八達通 App", desc: "App 增值通常比自動增值回贈更高" },
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
          {octopusFaqData.map((faq, index) => (
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
      <div className="not-prose bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl p-6 text-white mb-10">
        <h3 className="text-xl font-bold mb-2">🚇 想知邊張信用卡八達通增值回贈最高？</h3>
        <p className="mb-4 opacity-90">用我哋嘅計算機，即刻搵到最適合你嘅信用卡！</p>
        <Link href="/">
          <Button className="bg-white text-orange-600 hover:bg-gray-100">
            <Calculator className="h-4 w-4 mr-2" />
            立即計算回贈
          </Button>
        </Link>
      </div>

      {/* Related Links */}
      <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">🔗 相關文章</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <Link href="/discover/best-cashback-cards" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
            <DollarSign className="h-5 w-5 text-emerald-600" />
            <span>最高回贈信用卡比較</span>
            <ChevronRight className="h-4 w-4 ml-auto text-gray-400" />
          </Link>
          <Link href="/discover/no-annual-fee-guide" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
            <Gift className="h-5 w-5 text-emerald-600" />
            <span>免年費信用卡推薦</span>
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

