// 八達通自動增值&手動增值攻略
// 用於 /discover/octopus-guide 頁面

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  ChevronRight, ChevronDown, CreditCard, Train, Smartphone,
  Calculator, Trophy, DollarSign, CheckCircle, AlertTriangle,
  Star, Info, Zap, Percent, Gift, RefreshCw, Wallet, XCircle
} from "lucide-react";
import { CardPreviewSection } from "@/app/discover/components/card-preview-section";

// FAQ 數據（2025年更新版）
export const octopusFaqData = [
  {
    question: "八達通自動增值有回贈嗎？",
    answer: "有，但選擇有限！推薦：渣打 Simply Cash（1.5%）、Mox Credit（1%）、恒生 enJoy（0.5%）、恒生 MMPOWER（0.4%）、HSBC EveryMile（0.4%）。⚠️ 注意：安信 EarnMORE 官方 T&C 明確排除八達通自動增值，無法獲得 2% 回贈！"
  },
  {
    question: "八達通自動增值信用卡邊張最好？",
    answer: "2025年推薦：(1) 渣打 Simply Cash 1.5% 無上限；(2) Mox Credit 1% 無上限；(3) 恒生 enJoy 0.5% + yuu積分；(4) 恒生 MMPOWER/HSBC EveryMile 0.4%。⚠️ 安信 EarnMORE 八達通自動增值無回贈！"
  },
  {
    question: "八達通 App 增值信用卡有回贈嗎？",
    answer: "⚠️ 2025年更新：大部分銀行已將八達通 App/O!ePay 增值排除在「網上簽賬」高回贈之外！例如恒生 MMPOWER 的 5% 網上簽賬不包括八達通 App 增值，只有 0.4% 基本回贈。建議使用渣打 Simply Cash（1.5%）或 Mox Credit（1%）。"
  },
  {
    question: "八達通自動增值同手動增值有咩分別？",
    answer: "自動增值：餘額不足時自動從信用卡增值（$150/$250/$500），方便但大部分銀行無回贈。手動增值：透過八達通 App 主動增值，以前可當「網上簽賬」獲高回贈，但現在大部分銀行已排除。回贈差異已不大，建議使用簡單方便的自動增值。"
  },
  {
    question: "八達通自動增值上限係幾多？",
    answer: "每次自動增值金額可選 $150、$250 或 $500。每日增值上限為 $3,000。八達通銀包（O!ePay）信用卡增值上限：基本用戶 $3,000/月，升級用戶 $5,000/月。"
  },
  {
    question: "八達通銀包（O!ePay）係咩？",
    answer: "八達通銀包係八達通 App 內嘅電子錢包功能，可以：(1) 用信用卡增值（部分卡有回贈）；(2) 轉賬到銀行戶口（免手續費）；(3) P2P 轉賬畀朋友；(4) 線下消費付款。係 Chok 回贈嘅好工具！"
  },
  {
    question: "八達通自動增值信用卡到期點算？",
    answer: "信用卡到期後，八達通自動增值會失效。需要用新卡重新登記自動增值服務。建議收到新卡後即刻去港鐵站服務中心或透過八達通 App 更新。"
  },
  {
    question: "八達通自動增值可以賺迎新嗎？",
    answer: "視乎信用卡條款。大部分銀行會將八達通自動增值計入迎新簽賬要求（如 HSBC、渣打）。但部分銀行唔計（如 Citi 部分卡）。申請前務必睇清楚迎新條款！"
  },
  {
    question: "邊張信用卡八達通 App 增值回贈最高？",
    answer: "⚠️ 2025年更新：恒生 MMPOWER 的 5% 網上簽賬已排除八達通 App 增值！HSBC Red 的 4% 網上簽賬亦可能排除。目前推薦：渣打 Simply Cash（1.5%）、Mox Credit（1%）無上限。八達通 App 增值的高回贈玩法已經過時！"
  },
  {
    question: "八達通增值會唔會有手續費？",
    answer: "八達通自動增值無手續費。八達通 App/銀包增值亦無手續費。八達通銀包轉賬到銀行亦無手續費。所以 Chok 回贈係零成本！"
  }
];

// 自動增值回贈比較（2025年更新版）
// 參考：https://www.mrmiles.hk/octopus-credit-card/
const autoTopUpCards = [
  {
    card: "渣打 Simply Cash",
    id: "sc-simply-cash",
    rate: "1.5%",
    cap: "無上限",
    highlight: "🥇 最高回贈",
    notes: "本地簽賬 1.5%，八達通自動增值計入（需確認官方T&C）",
    color: "text-yellow-600",
  },
  {
    card: "Mox Credit",
    id: "mox-credit",
    rate: "1%",
    cap: "無上限",
    highlight: "🥈 高回贈",
    notes: "基本回贈 1%，八達通增值計入",
    color: "text-gray-400",
  },
  {
    card: "恒生 enJoy Card",
    id: "hangseng-enjoy",
    rate: "0.5%",
    cap: "無上限",
    highlight: "有回贈",
    notes: "1X yuu積分 (0.5%)，八達通自動增值計入",
    color: "text-green-600",
  },
  {
    card: "恒生 MMPOWER",
    id: "hangseng-mmpower",
    rate: "0.4%",
    cap: "無上限",
    highlight: "有回贈",
    notes: "基本回贈 0.4%，八達通自動增值計入",
    color: "text-green-600",
  },
  {
    card: "HSBC EveryMile",
    id: "hsbc-everymile",
    rate: "0.4%",
    cap: "無上限",
    highlight: "有回贈",
    notes: "基本回贈 0.4% ($12.5/里)，八達通自動增值計入",
    color: "text-green-600",
  },
  {
    card: "安信 EarnMORE",
    id: "earnmore",
    rate: "0%",
    cap: "-",
    highlight: "❌ 無回贈",
    notes: "官方T&C明確排除八達通自動增值",
    color: "text-gray-400",
  },
  {
    card: "HSBC Visa Signature",
    id: "hsbc-vs",
    rate: "0%",
    cap: "-",
    highlight: "❌ 無回贈",
    notes: "八達通自動增值無回贈（需確認）",
    color: "text-gray-400",
  },
  {
    card: "Citi Cash Back",
    id: "citi-cashback",
    rate: "0%",
    cap: "-",
    highlight: "❌ 無回贈",
    notes: "八達通自動增值無回贈（需確認）",
    color: "text-gray-400",
  },
];

// App 增值回贈比較（2025年更新版）
// ⚠️ 注意：大部分銀行已將八達通 App/O!ePay 增值排除在「網上簽賬」之外
// 以下回贈率需確認官方最新 T&C
const appTopUpCards = [
  {
    card: "渣打 Simply Cash",
    id: "sc-simply-cash",
    rate: "1.5%",
    cap: "無上限",
    highlight: "🥇 推薦",
    notes: "本地簽賬 1.5%，無上限（需確認是否計入）",
    color: "text-yellow-600",
  },
  {
    card: "Mox Credit",
    id: "mox-credit",
    rate: "1%",
    cap: "無上限",
    highlight: "推薦",
    notes: "基本回贈 1%，無上限",
    color: "text-green-600",
  },
  {
    card: "恒生 enJoy Card",
    id: "hangseng-enjoy",
    rate: "0.5%",
    cap: "無上限",
    highlight: "有回贈",
    notes: "1X yuu積分 (0.5%)，App 增值計入",
    color: "text-green-600",
  },
  {
    card: "恒生 MMPOWER",
    id: "hangseng-mmpower",
    rate: "0.4%",
    cap: "無上限",
    highlight: "基本回贈",
    notes: "⚠️ App 增值被排除在「網上簽賬 5%」之外，只有 0.4%",
    color: "text-gray-400",
  },
  {
    card: "HSBC Red Card",
    id: "hsbc-red",
    rate: "0.4%",
    cap: "-",
    highlight: "⚠️ 待確認",
    notes: "⚠️ 八達通 App 增值可能被排除在「網上簽賬 4%」之外（需確認）",
    color: "text-gray-400",
  },
  {
    card: "安信 EarnMORE",
    id: "earnmore",
    rate: "0%",
    cap: "-",
    highlight: "❌ 無回贈",
    notes: "官方T&C排除電子錢包/八達通增值",
    color: "text-gray-400",
  },
];

// O!ePay 攻略
const oepayStrategies = [
  {
    title: "💰 Chok 回贈基本步驟",
    steps: [
      "1️⃣ 下載八達通 App，開設八達通銀包",
      "2️⃣ 綁定高回贈信用卡（如 HSBC Red 4%）",
      "3️⃣ 用信用卡增值八達通銀包",
      "4️⃣ 八達通銀包轉賬到銀行戶口（免手續費）",
      "5️⃣ 賺取信用卡回贈！",
    ],
  },
  {
    title: "⚠️ 注意事項",
    steps: [
      "• 部分信用卡唔計八達通銀包增值回贈（如 Citi 部分卡）",
      "• 基本用戶每月增值上限 $3,000",
      "• 升級用戶每月增值上限 $5,000",
      "• 轉賬到銀行戶口免手續費",
      "• 建議每月定期增值，賺取穩定回贈",
    ],
  },
];

// 回贈計算例子（2025年更新版）
// ⚠️ 八達通 App 增值高回贈玩法已過時，大部分銀行已排除
const chokExamples = [
  {
    card: "渣打 Simply Cash",
    rate: "1.5%",
    monthly: "$5,000",
    rebate: "$75/月",
    yearly: "$900/年",
    color: "from-blue-500 to-blue-600",
  },
  {
    card: "Mox Credit",
    rate: "1%",
    monthly: "$5,000",
    rebate: "$50/月",
    yearly: "$600/年",
    color: "from-purple-500 to-purple-600",
  },
  {
    card: "恒生 enJoy",
    rate: "0.5%",
    monthly: "$5,000",
    rebate: "$25/月",
    yearly: "$300/年",
    color: "from-red-500 to-red-600",
  },
];

export function OctopusGuide() {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      {/* 引言 */}
      <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-6">
        八達通增值都有信用卡回贈？本文教你 <strong>{currentYear} 八達通自動增值&手動增值攻略</strong>，
        詳細比較<strong>自動增值</strong>同<strong>手動增值（O!ePay）</strong>回贈，
        教你點樣用八達通 Chok 回贈，每年輕鬆賺 <strong>$1,000+</strong>！
      </p>

      {/* 重點提示 */}
      <div className="not-prose bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl p-5 text-white mb-8">
        <h3 className="font-bold text-lg mb-3">🔥 {currentYear} 八達通增值回贈重點</h3>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="bg-white/20 rounded-lg p-3">
            <p className="font-bold">自動增值最高</p>
            <p>渣打 Simply Cash <span className="text-yellow-200">1.5%</span></p>
          </div>
          <div className="bg-white/20 rounded-lg p-3">
            <p className="font-bold">⚠️ App 增值注意</p>
            <p>大部分銀行已<span className="text-yellow-200">排除高回贈</span></p>
          </div>
          <div className="bg-white/20 rounded-lg p-3">
            <p className="font-bold">Chok 回贈潛力</p>
            <p>每年可賺 <span className="text-yellow-200">$600-$900</span></p>
          </div>
        </div>
      </div>

      {/* 目錄 */}
      <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-10">
        <h2 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          📑 本文目錄
        </h2>
        <ul className="space-y-2 text-sm">
          <li><a href="#overview" className="text-blue-600 dark:text-blue-400 hover:underline">1. 八達通增值回贈點計？</a></li>
          <li><a href="#auto-topup" className="text-blue-600 dark:text-blue-400 hover:underline">2. 八達通自動增值信用卡比較 (2025)</a></li>
          <li><a href="#app-topup" className="text-blue-600 dark:text-blue-400 hover:underline">3. 八達通 App 手動增值信用卡比較</a></li>
          <li><a href="#difference" className="text-blue-600 dark:text-blue-400 hover:underline">4. 自動增值 vs 手動增值</a></li>
          <li><a href="#oepay" className="text-blue-600 dark:text-blue-400 hover:underline">5. 八達通銀包（O!ePay）攻略</a></li>
          <li><a href="#chok" className="text-blue-600 dark:text-blue-400 hover:underline">6. Chok 回贈攻略 & 計算</a></li>
          <li><a href="#best-cards" className="text-blue-600 dark:text-blue-400 hover:underline">7. 八達通增值最佳信用卡推薦</a></li>
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
          八達通增值分為<strong>自動增值（AAVS）</strong>同<strong>手動增值（透過八達通 App）</strong>兩種，
          回贈率會因應信用卡同增值方式而有很大分別：
        </p>

        <div className="not-prose bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-2xl p-5 border border-orange-200 dark:border-orange-800 my-6">
          <h4 className="font-bold text-orange-800 dark:text-orange-200 mb-3">🚇 八達通增值方式比較</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <RefreshCw className="h-5 w-5 text-orange-500" />
                <p className="font-medium text-gray-900 dark:text-white">自動增值 (AAVS)</p>
              </div>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• 餘額不足時自動從信用卡增值</li>
                <li>• 每次增值 $150/$250/$500</li>
                <li>• 簡單方便，部分卡有回贈</li>
                <li>• 最高回贈：<strong className="text-green-500">渣打 Simply Cash 1.5%</strong></li>
              </ul>
            </div>
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Smartphone className="h-5 w-5 text-blue-500" />
                <p className="font-medium text-gray-900 dark:text-white">手動增值（八達通 App）</p>
              </div>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• 透過八達通 App 主動增值</li>
                <li>• <strong className="text-amber-500">⚠️ 大部分銀行已排除高回贈</strong></li>
                <li>• 恒生 MMPOWER 5% 網上簽賬<strong className="text-red-500">不包括</strong>八達通 App</li>
                <li>• 回贈與自動增值相近（約 1-1.5%）</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="not-prose bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-amber-700 dark:text-amber-300 text-sm">
              <strong>⚠️ 2025年重要更新：</strong>大部分銀行已將八達通 App 增值排除在「網上簽賬」高回贈之外！
              建議使用<strong>渣打 Simply Cash（1.5%）</strong>或<strong>Mox Credit（1%）</strong>做自動增值，簡單直接。
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: 自動增值 */}
      <section id="auto-topup" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <RefreshCw className="h-6 w-6 text-green-500" />
          2. 八達通自動增值信用卡比較 ({currentYear})
        </h2>

        <p>
          以下係 <strong>{currentYear} 八達通自動增值信用卡回贈比較</strong>，大部分銀行都無回贈：
        </p>

        <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden my-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-green-50 dark:bg-green-900/20">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-green-600 dark:text-green-400">信用卡</th>
                  <th className="px-4 py-3 text-center font-medium text-green-600 dark:text-green-400">回贈率</th>
                  <th className="px-4 py-3 text-center font-medium text-green-600 dark:text-green-400">上限</th>
                  <th className="px-4 py-3 text-left font-medium text-green-600 dark:text-green-400">備註</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {autoTopUpCards.map((card, index) => (
                  <tr key={index} className={card.rate !== "0%" ? "bg-green-50/50 dark:bg-green-900/10" : ""}>
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
                    <td className="px-4 py-3 text-xs text-gray-500">
                      <span className={card.color}>{card.highlight}</span> - {card.notes}
                    </td>
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
              <strong>注意：</strong>HSBC、Citi、恒生、DBS、中銀等大銀行八達通自動增值<strong>全部無回贈</strong>！
              只有 <Link href="/cards/earnmore" className="underline">安信 EarnMORE</Link>、
              <Link href="/cards/sc-simply-cash" className="underline">渣打 Simply Cash</Link>、
              <Link href="/cards/wewa-unionpay" className="underline">WeWa 銀聯卡</Link> 等少數卡有回贈。
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: App 增值 */}
      <section id="app-topup" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Smartphone className="h-6 w-6 text-blue-500" />
          3. 八達通 App 手動增值信用卡比較
        </h2>

        <p>
          透過<strong>八達通 App</strong>增值（包括八達通銀包 O!ePay），部分信用卡當「網上簽賬」有高回贈：
        </p>

        <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden my-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-blue-50 dark:bg-blue-900/20">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-blue-600 dark:text-blue-400">信用卡</th>
                  <th className="px-4 py-3 text-center font-medium text-blue-600 dark:text-blue-400">回贈率</th>
                  <th className="px-4 py-3 text-center font-medium text-blue-600 dark:text-blue-400">上限</th>
                  <th className="px-4 py-3 text-left font-medium text-blue-600 dark:text-blue-400">備註</th>
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
                    <td className="px-4 py-3 text-xs text-gray-500">
                      <span className={card.color}>{card.highlight}</span> - {card.notes}
                    </td>
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
              <strong>⚠️ 重要提醒：</strong>大部分銀行已將八達通 App 增值排除在「網上簽賬」高回贈之外！
              例如恒生 MMPOWER 5% 網上簽賬<strong>不包括</strong>八達通 App 增值。建議直接用自動增值。
            </p>
          </div>
        </div>
      </section>

      {/* Card Preview Section */}
      <CardPreviewSection 
        title="📌 八達通增值推薦信用卡"
        subtitle="點擊查看詳細回贈條款及申請連結"
        cards={[
          { id: "sc-simply-cash", highlight: "自動增值 1.5% 最高" },
          { id: "mox-credit", highlight: "自動增值 1% 無上限" },
          { id: "hangseng-enjoy", highlight: "0.5% + yuu積分" },
          { id: "hangseng-mmpower", highlight: "自動增值 0.4%" },
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
              自動增值 (AAVS) ✅ 推薦
            </h4>
            <ul className="text-green-700 dark:text-green-300 text-sm space-y-1">
              <li>✅ 方便，唔使手動操作</li>
              <li>✅ 餘額不足時自動增值</li>
              <li>✅ 部分卡計入迎新簽賬</li>
              <li>✅ 簡單直接，無需研究條款</li>
              <li>✅ 最高 1.5%（Simply Cash）</li>
            </ul>
            <p className="mt-3 text-xs text-green-600 dark:text-green-400 font-medium">
              👉 推薦卡：渣打 Simply Cash、Mox Credit
            </p>
          </div>
          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 border border-amber-200 dark:border-amber-800">
            <h4 className="font-bold text-amber-800 dark:text-amber-200 mb-3 flex items-center gap-2">
              <Smartphone className="h-5 w-5" />
              手動增值（八達通 App）⚠️
            </h4>
            <ul className="text-amber-700 dark:text-amber-300 text-sm space-y-1">
              <li>⚠️ 大部分銀行已排除「網上簽賬」高回贈</li>
              <li>❌ MMPOWER 5% 不包括八達通 App</li>
              <li>❌ HSBC Red 4% 可能不包括（需確認）</li>
              <li>✅ 可以 Chok 回贈轉賬到銀行</li>
              <li>⚠️ 回贈與自動增值相近</li>
            </ul>
            <p className="mt-3 text-xs text-amber-600 dark:text-amber-400 font-medium">
              👉 高回贈玩法已過時，建議用自動增值
            </p>
          </div>
        </div>

        <div className="not-prose bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-4">
          <h4 className="font-bold text-purple-800 dark:text-purple-200 mb-2">💡 2025年最佳策略：簡單直接</h4>
          <p className="text-purple-700 dark:text-purple-300 text-sm">
            ⚠️ 八達通 App 增值高回贈玩法已過時（大部分銀行已排除）<br/>
            建議直接用<strong>渣打 Simply Cash（1.5%）</strong>或<strong>Mox Credit（1%）</strong>做自動增值，簡單方便！
          </p>
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
          係 Chok 回贈嘅最佳工具：
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

        <div className="not-prose bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
          <h4 className="font-bold text-gray-900 dark:text-white mb-3">📊 八達通銀包增值上限</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3">
              <p className="text-gray-500">基本用戶</p>
              <p className="font-bold text-gray-900 dark:text-white">$3,000/月</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3">
              <p className="text-gray-500">升級用戶</p>
              <p className="font-bold text-gray-900 dark:text-white">$5,000/月</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Chok 回贈 */}
      <section id="chok" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Zap className="h-6 w-6 text-yellow-500" />
          6. Chok 回贈攻略 & 計算
        </h2>

        <p>
          <strong>Chok 回贈</strong>即係利用八達通銀包增值賺取信用卡回贈，
          再轉賬到銀行，<strong>零成本賺回贈</strong>！
        </p>

        <div className="not-prose space-y-3 my-6">
          {[
            { step: "1", title: "開設八達通銀包", desc: "下載八達通 App，完成身份驗證開設銀包" },
            { step: "2", title: "綁定信用卡", desc: "推薦：渣打 Simply Cash（1.5%）、Mox Credit（1%）" },
            { step: "3", title: "增值八達通銀包", desc: "用信用卡增值銀包，每月增值 $3,000-$5,000" },
            { step: "4", title: "轉賬到銀行", desc: "將銀包餘額轉賬到銀行戶口（免手續費）" },
            { step: "5", title: "賺取回贈", desc: "零成本賺取信用卡回贈！每年可賺 $600-$900" },
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

        {/* Chok 回贈計算例子 */}
        <div className="not-prose grid md:grid-cols-3 gap-4 my-6">
          {chokExamples.map((example, index) => (
            <div key={index} className={`bg-gradient-to-br ${example.color} rounded-xl p-4 text-white`}>
              <p className="text-sm opacity-80">{example.card}</p>
              <p className="text-3xl font-bold my-2">{example.rate}</p>
              <div className="text-sm space-y-1">
                <p>每月增值 {example.monthly}</p>
                <p>每月回贈 <strong>{example.rebate}</strong></p>
                <p className="pt-2 border-t border-white/20">每年回贈 <strong>{example.yearly}</strong></p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 7: 最佳卡 */}
      <section id="best-cards" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Trophy className="h-6 w-6 text-amber-500" />
          7. 八達通增值最佳信用卡推薦
        </h2>

        <div className="not-prose space-y-4 my-6">
          {[
            { rank: "🥇", card: "渣打 Simply Cash", id: "sc-simply-cash", rate: "1.5%", type: "最高回贈", reason: "自動/手動增值都有 1.5%，無上限，申請門檻低" },
            { rank: "🥈", card: "Mox Credit", id: "mox-credit", rate: "1%", type: "無門檻", reason: "基本回贈 1%，無上限，無年薪要求，虛擬銀行" },
            { rank: "🥉", card: "恒生 enJoy Card", id: "hangseng-enjoy", rate: "0.5%", type: "yuu積分", reason: "0.5% yuu積分，可於惠康/萬寧等使用" },
            { rank: "4️⃣", card: "恒生 MMPOWER", id: "hangseng-mmpower", rate: "0.4%", type: "基本回贈", reason: "自動增值 0.4%，⚠️ App 增值不計 5% 網上簽賬" },
            { rank: "5️⃣", card: "HSBC EveryMile", id: "hsbc-everymile", rate: "0.4%", type: "儲里數", reason: "自動增值 0.4% ($12.5/里)，適合儲里數用戶" },
          ].map((card, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 flex items-center gap-4">
              <span className="text-2xl">{card.rank}</span>
              <div className="flex-1">
                <Link href={`/cards/${card.id}`} className="font-bold text-blue-600 hover:underline dark:text-blue-400">{card.card}</Link>
                <p className="text-xs text-amber-600 dark:text-amber-400 font-medium">{card.type}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{card.reason}</p>
              </div>
              <span className="font-bold text-green-600 dark:text-green-400 text-xl">{card.rate}</span>
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
            { icon: "📱", title: "下載八達通 App", desc: "App Store / Google Play 下載「八達通」App" },
            { icon: "👤", title: "登記帳戶", desc: "使用手機號碼登記，完成身份驗證" },
            { icon: "💳", title: "綁定信用卡", desc: "輸入信用卡資料（Visa/Mastercard/銀聯）" },
            { icon: "⚙️", title: "設定自動增值", desc: "選擇增值金額（$150/$250/$500）及八達通卡號" },
            { icon: "🏪", title: "實體啟用", desc: "首次需到港鐵站/便利店拍卡啟用自動增值" },
            { icon: "✅", title: "完成", desc: "開始享用自動增值服務，餘額不足時自動增值" },
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
            { icon: "💳", title: "揀啱信用卡", desc: "推薦渣打 Simply Cash（1.5%）或 Mox Credit（1%），無上限無門檻" },
            { icon: "⚠️", title: "留意條款更新", desc: "大部分銀行已排除八達通 App 增值的高回贈，使用前請確認最新 T&C" },
            { icon: "🔄", title: "自動增值較簡單", desc: "2025年起 App 增值高回贈玩法已過時，建議用簡單的自動增值" },
            { icon: "⏰", title: "更新到期卡", desc: "信用卡到期後記住即刻更新自動增值，避免失效" },
            { icon: "🏪", title: "配合商戶優惠", desc: "恒生 enJoy 八達通增值可儲 yuu 積分，配合惠康/萬寧消費" },
            { icon: "🎁", title: "留意迎新優惠", desc: "部分信用卡將八達通增值計入迎新簽賬，可以賺迎新" },
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
          <Link href="/discover/mobile-payment-guide" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
            <Smartphone className="h-5 w-5 text-emerald-600" />
            <span>手機支付信用卡攻略</span>
            <ChevronRight className="h-4 w-4 ml-auto text-gray-400" />
          </Link>
          <Link href="/discover/no-annual-fee-guide" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
            <Gift className="h-5 w-5 text-emerald-600" />
            <span>免年費信用卡推薦</span>
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
