// Debit Card 攻略文章內容組件
// 用於 /discover/debit-card-guide 頁面

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  AlertTriangle, CheckCircle, XCircle, ChevronRight, ChevronDown,
  CreditCard, Globe, Smartphone, ShoppingCart, Plane,
  Info, Calculator, Trophy, Building, Wallet, Shield,
  DollarSign, Clock, Zap
} from "lucide-react";
import { CardPreviewSection } from "@/app/discover/components/card-preview-section";

// FAQ 數據
export const debitCardFaqData = [
  {
    question: "Debit Card 中文是什麼意思？",
    answer: "Debit Card 中文叫「扣賬卡」或「借記卡」，是一種與銀行戶口直接連結的支付卡。每次簽賬時，金額會即時從你的銀行戶口扣除，與信用卡的「先使後還」模式不同。"
  },
  {
    question: "Debit Card 和 Credit Card 有什麼分別？",
    answer: "主要分別：1) Debit Card 即時扣款，Credit Card 月結還款；2) Debit Card 無需信貸審批，Credit Card 需要；3) Debit Card 無利息支出風險，Credit Card 逾期還款會產生利息；4) Credit Card 通常有較高回贈，Debit Card 回贈較少。"
  },
  {
    question: "香港邊間銀行有 Debit Card？",
    answer: "香港主要銀行都有提供 Debit Card，包括：HSBC（滙豐）、Hang Seng（恒生）、中銀香港、渣打銀行，以及虛擬銀行如 Mox Bank、ZA Bank、WeLab Bank、livi Bank、Airstar Bank、Ant Bank 等。虛擬銀行的 Debit Card 通常回贈較高，而且免外幣手續費。"
  },
  {
    question: "Debit Card 可以在日本或海外使用嗎？",
    answer: "可以！只要你的 Debit Card 有 Visa 或 Mastercard 標誌，就可以在全球接受該網絡的商戶使用。現時大部分虛擬銀行（如 Mox、ZA Bank、WeLab、livi 等）的 Debit Card 都免外幣手續費，非常適合海外消費。傳統銀行如果持有外幣戶口，使用多貨幣 Debit Card 也可免手續費。"
  },
  {
    question: "Debit Card 有什麼好處？",
    answer: "Debit Card 好處包括：1) 無需信貸審批，容易申請；2) 控制消費，不會過度借貸；3) 即時扣款，方便理財；4) 部分銀行提供回贈；5) 可用於網購、Apple Pay、Google Pay 等。適合學生、無穩定收入人士、或想控制消費的用戶。"
  },
  {
    question: "如何申請 Debit Card？",
    answer: "申請 Debit Card 非常簡單：1) 選擇銀行並開立戶口（虛擬銀行可全程網上完成）；2) 銀行會自動發出 Debit Card；3) 啟動卡片即可使用。大部分銀行無需年薪要求，甚至學生都可以申請。"
  },
  {
    question: "Debit Card 和 EPS 有什麼分別？",
    answer: "EPS 只能在香港商戶使用，而 Debit Card（Visa/Mastercard）可以在全球使用。此外，Debit Card 可用於網購、綁定電子錢包，功能更廣泛。但 EPS 交易通常免手續費，部分商戶可能偏好 EPS。"
  },
  {
    question: "Debit Card 有回贈嗎？",
    answer: "有！雖然 Debit Card 回贈通常比 Credit Card 低，但虛擬銀行仍提供不錯的回贈。例如：Mox Card 全部簽賬 0.5%、ZA Card 指定商戶高達 11%、WeLab Debit Card 高達 6%、livi Debit Card 高達 1%、Ant Bank 高達 2% 回贈。而且所有虛擬銀行 Debit Card 都免外幣手續費！"
  }
];

// 銀行 Debit Card 比較數據
export const bankDebitCards = [
  { 
    bank: "Mox Bank", 
    card: "Mox Card", 
    localRebate: "0.5%", 
    foreignRebate: "0.5%", 
    foreignFee: "0%", 
    note: "免外幣手續費，適合海外消費",
    highlight: true 
  },
  { 
    bank: "ZA Bank", 
    card: "ZA Card", 
    localRebate: "最高 11%", 
    foreignRebate: "1%", 
    foreignFee: "0%", 
    note: "指定商戶高回贈，免外幣手續費",
    highlight: true 
  },
  { 
    bank: "WeLab Bank", 
    card: "Debit Card", 
    localRebate: "最高 6%", 
    foreignRebate: "1%", 
    foreignFee: "0%", 
    note: "GoSave 儲蓄計劃回贈",
    highlight: true 
  },
  { 
    bank: "livi Bank", 
    card: "livi Debit Card", 
    localRebate: "最高 1%", 
    foreignRebate: "1%", 
    foreignFee: "0%", 
    note: "免外幣手續費，liviSave 高息儲蓄",
    highlight: true 
  },
  { 
    bank: "Airstar Bank 天星", 
    card: "Debit Card", 
    localRebate: "0.5%", 
    foreignRebate: "0.5%", 
    foreignFee: "0%", 
    note: "免外幣手續費",
    highlight: false 
  },
  { 
    bank: "Ant Bank 螞蟻銀行", 
    card: "Debit Card", 
    localRebate: "最高 2%", 
    foreignRebate: "1%", 
    foreignFee: "0%", 
    note: "免外幣手續費，高息儲蓄",
    highlight: false 
  },
  { 
    bank: "HSBC 滙豐", 
    card: "多貨幣 Debit Card", 
    localRebate: "0%", 
    foreignRebate: "0%", 
    foreignFee: "0%*", 
    note: "*需持有外幣戶口；否則收 1.95%",
    highlight: false 
  },
  { 
    bank: "恒生銀行", 
    card: "Debit Card", 
    localRebate: "0%", 
    foreignRebate: "0%", 
    foreignFee: "0%*", 
    note: "*需持有外幣戶口；否則收手續費",
    highlight: false 
  },
  { 
    bank: "中銀香港", 
    card: "Debit Card", 
    localRebate: "0%", 
    foreignRebate: "0%", 
    foreignFee: "0%*", 
    note: "*需持有外幣戶口；北上消費方便",
    highlight: false 
  },
];

// Debit Card vs Credit Card 比較
export const comparisonData = [
  { feature: "扣款方式", debit: "即時從戶口扣款", credit: "月結還款" },
  { feature: "信貸審批", debit: "無需", credit: "需要" },
  { feature: "年薪要求", debit: "無", credit: "通常需要" },
  { feature: "簽賬回贈", debit: "較低（0-6%）", credit: "較高（1-8%）" },
  { feature: "迎新獎賞", debit: "較少", credit: "豐富" },
  { feature: "利息風險", debit: "無", credit: "有（逾期還款）" },
  { feature: "消費額度", debit: "戶口結餘", credit: "信用額" },
  { feature: "海外使用", debit: "可以", credit: "可以" },
  { feature: "適合人群", debit: "學生、控制消費", credit: "穩定收入、賺回贈" },
];

export function DebitCardGuide() {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      {/* 引言 */}
      <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-6">
        近年香港虛擬銀行興起，令 <strong>Debit Card（扣賬卡）</strong>再次受到關注。
        究竟 Debit Card 中文係咩意思？同信用卡有咩分別？去日本或海外簽賬得唔得？
        本文為你詳細解答 Debit Card 的所有疑問，仲會比較香港各大銀行 Debit Card 邊張最抵！
      </p>

      {/* 目錄 */}
      <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-10">
        <h2 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          📑 本文目錄
        </h2>
        <ul className="space-y-2 text-sm">
          <li><a href="#what-is-debit-card" className="text-blue-600 dark:text-blue-400 hover:underline">1. 什麼是 Debit Card？（中文解釋）</a></li>
          <li><a href="#debit-vs-credit" className="text-blue-600 dark:text-blue-400 hover:underline">2. Debit Card vs Credit Card 完整比較</a></li>
          <li><a href="#debit-vs-eps" className="text-blue-600 dark:text-blue-400 hover:underline">3. Debit Card vs EPS vs Prepaid Card 分別</a></li>
          <li><a href="#how-to-use" className="text-blue-600 dark:text-blue-400 hover:underline">4. Debit Card 用法與使用場景</a></li>
          <li><a href="#overseas-use" className="text-blue-600 dark:text-blue-400 hover:underline">5. Debit Card 海外簽賬攻略（日本、歐洲、北上）</a></li>
          <li><a href="#bank-comparison" className="text-blue-600 dark:text-blue-400 hover:underline">6. 香港 Debit Card 比較（HSBC、恒生、中銀、虛擬銀行）</a></li>
          <li><a href="#pros-and-cons" className="text-blue-600 dark:text-blue-400 hover:underline">7. Debit Card 好處與缺點</a></li>
          <li><a href="#how-to-apply" className="text-blue-600 dark:text-blue-400 hover:underline">8. Debit Card 申請方法</a></li>
          <li><a href="#recommendation" className="text-blue-600 dark:text-blue-400 hover:underline">9. Debit Card 推薦</a></li>
          <li><a href="#faq" className="text-blue-600 dark:text-blue-400 hover:underline">10. 常見問題 FAQ</a></li>
        </ul>
      </div>

      {/* Section 1: 什麼是 Debit Card */}
      <section id="what-is-debit-card" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <CreditCard className="h-6 w-6 text-blue-500" />
          1. 什麼是 Debit Card？（Debit Card 中文解釋）
        </h2>
        
        <p>
          <strong>Debit Card</strong>，中文叫做「<strong>扣賬卡</strong>」或「<strong>借記卡</strong>」（debit card meaning），
          是一種與銀行戶口直接連結的支付卡。當你用 Debit Card 簽賬時，金額會<strong>即時</strong>從你的銀行戶口扣除。
        </p>
        
        <div className="not-prose bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 my-6">
          <h4 className="font-bold text-blue-800 dark:text-blue-200 mb-2">💡 簡單理解</h4>
          <p className="text-blue-700 dark:text-blue-300 text-sm">
            <strong>Credit Card（信用卡）</strong>= 先使未來錢，之後還<br />
            <strong>Debit Card（扣賬卡）</strong>= 即時用自己錢，戶口有幾多簽幾多
          </p>
        </div>

        <p>
          香港常見的 Debit Card 包括 <strong>HSBC Debit Card</strong>、<strong>恒生 Debit Card（Hang Seng Debit Card）</strong>、
          <strong>中銀 Debit Card</strong>，以及近年興起的虛擬銀行 Debit Card 如 Mox Card、ZA Card 等。
        </p>
      </section>

      {/* Section 2: Debit Card vs Credit Card */}
      <section id="debit-vs-credit" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Zap className="h-6 w-6 text-purple-500" />
          2. Debit Card vs Credit Card 完整比較
        </h2>

        <p>
          好多人都會問：Debit Card 同 Credit Card 有咩分別？邊個比較好？
          其實兩者各有優缺點，睇你嘅需要同消費習慣。
        </p>

        <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden my-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400">比較項目</th>
                  <th className="px-4 py-3 text-left font-medium text-blue-600 dark:text-blue-400">Debit Card 扣賬卡</th>
                  <th className="px-4 py-3 text-left font-medium text-purple-600 dark:text-purple-400">Credit Card 信用卡</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {comparisonData.map((row, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{row.feature}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{row.debit}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{row.credit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="not-prose bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 my-6">
          <h4 className="font-bold text-amber-800 dark:text-amber-200 mb-2">⚡ 重點總結</h4>
          <p className="text-amber-700 dark:text-amber-300 text-sm">
            如果你想<strong>賺取最高回贈</strong>、有穩定收入，建議使用 <strong>Credit Card</strong>。<br />
            如果你係<strong>學生</strong>、想<strong>控制消費</strong>、或無穩定收入，<strong>Debit Card</strong> 係更好選擇。
          </p>
        </div>
      </section>

      {/* Section 3: Debit Card vs EPS vs Prepaid Card */}
      <section id="debit-vs-eps" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Wallet className="h-6 w-6 text-green-500" />
          3. Debit Card vs EPS vs Prepaid Card 分別
        </h2>

        <p>
          除咗 Credit Card，香港仲有其他支付方式，包括 EPS 同 Prepaid Card。佢哋同 Debit Card 有咩分別？
        </p>

        <div className="not-prose space-y-4 my-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4">
            <h4 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
              <span className="text-xl">💳</span> Debit Card（扣賬卡）
            </h4>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• 與銀行戶口連結，即時扣款</li>
              <li>• 有 Visa/Mastercard 標誌，<strong>全球通用</strong></li>
              <li>• 可用於<strong>網購、Apple Pay、Google Pay</strong></li>
              <li>• 可在日本、歐洲等海外使用</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4">
            <h4 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
              <span className="text-xl">🏧</span> EPS
            </h4>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• <strong>只限香港</strong>商戶使用</li>
              <li>• 通常<strong>免手續費</strong></li>
              <li>• 無法用於網購</li>
              <li>• 需要實體 EPS 機</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4">
            <h4 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
              <span className="text-xl">💰</span> Prepaid Card（預付卡）
            </h4>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• 需要<strong>先增值</strong>才能使用</li>
              <li>• 與銀行戶口<strong>不連結</strong></li>
              <li>• 例如：八達通、Tap & Go</li>
              <li>• 適合預算管理、送禮</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 4: Debit Card 用法 */}
      <section id="how-to-use" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Smartphone className="h-6 w-6 text-cyan-500" />
          4. Debit Card 用法與使用場景
        </h2>

        <p>
          Debit Card 嘅<strong>用法</strong>其實同 Credit Card 一樣，只要係接受 Visa/Mastercard 嘅地方都可以用：
        </p>

        <div className="not-prose grid sm:grid-cols-2 gap-4 my-6">
          {[
            { icon: "🏪", title: "實體店簽賬", desc: "拍卡/插卡付款，同用 Credit Card 一樣" },
            { icon: "🛒", title: "網上購物", desc: "輸入卡號、到期日、CVV 即可" },
            { icon: "📱", title: "Apple Pay / Google Pay", desc: "綁定手機錢包，拍手機付款" },
            { icon: "🎮", title: "App Store / Google Play", desc: "課金、訂閱服務都可以用" },
            { icon: "✈️", title: "海外消費", desc: "日本、歐洲、美國等地都可用" },
            { icon: "🚖", title: "Uber / 外賣平台", desc: "綁定 Debit Card 即可付款" },
          ].map((item, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 flex items-start gap-3">
              <span className="text-2xl">{item.icon}</span>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white text-sm">{item.title}</h4>
                <p className="text-gray-600 dark:text-gray-400 text-xs">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 5: 海外簽賬 */}
      <section id="overseas-use" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Globe className="h-6 w-6 text-teal-500" />
          5. Debit Card 海外簽賬攻略
        </h2>

        <p>
          去<strong>日本</strong>旅行、到<strong>歐洲</strong>購物、或者<strong>北上</strong>消費，Debit Card 都可以用！
          但要留意<strong>外幣手續費</strong>，揀錯卡可能蝕錢。
        </p>

        <div className="not-prose bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 my-6">
          <div className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-green-800 dark:text-green-200 mb-1">✅ 好消息：大部分 Debit Card 免外幣手續費！</h4>
              <p className="text-green-700 dark:text-green-300 text-sm">
                香港虛擬銀行（Mox、ZA Bank、WeLab、livi、Airstar、Ant Bank）的 Debit Card 全部<strong>免外幣手續費</strong>！
                傳統銀行（HSBC、恒生、中銀）如持有外幣戶口，使用多貨幣 Debit Card 也可免手續費。
              </p>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-bold mt-6 mb-3">🇯🇵 Debit Card 日本使用貼士</h3>
        <ul className="not-prose space-y-2">
          <li className="flex items-start gap-2">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
            <span>日本大部分商戶接受 Visa/Mastercard，便利店、餐廳、藥妝店都可用</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
            <span>選擇免外幣手續費的 Debit Card（如 Mox Card）</span>
          </li>
          <li className="flex items-start gap-2">
            <XCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
            <span>避免選擇日圓 DCC（動態貨幣轉換），堅持用當地貨幣結算</span>
          </li>
        </ul>
      </section>

      {/* Section 6: 銀行比較 */}
      <section id="bank-comparison" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Building className="h-6 w-6 text-indigo-500" />
          6. 香港 Debit Card 比較
        </h2>

        <p>
          香港有好多銀行提供 Debit Card，包括傳統銀行同虛擬銀行。
          以下係各大銀行 Debit Card 嘅比較：
        </p>

        <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden my-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400">銀行</th>
                  <th className="px-4 py-3 text-center font-medium text-gray-500 dark:text-gray-400">本地回贈</th>
                  <th className="px-4 py-3 text-center font-medium text-gray-500 dark:text-gray-400">海外回贈</th>
                  <th className="px-4 py-3 text-center font-medium text-gray-500 dark:text-gray-400">外幣手續費</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400">備註</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {bankDebitCards.map((card, index) => (
                  <tr key={index} className={card.highlight ? "bg-green-50/50 dark:bg-green-900/10" : ""}>
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900 dark:text-white">{card.bank}</div>
                      <div className="text-xs text-gray-500">{card.card}</div>
                    </td>
                    <td className="px-4 py-3 text-center font-medium text-gray-900 dark:text-white">{card.localRebate}</td>
                    <td className="px-4 py-3 text-center font-medium text-gray-900 dark:text-white">{card.foreignRebate}</td>
                    <td className="px-4 py-3 text-center">
                      {card.foreignFee === "0%" ? (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                          免手續費 ✓
                        </span>
                      ) : (
                        <span className="text-orange-600 dark:text-orange-400 font-medium">{card.foreignFee}</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400 text-xs">{card.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section 7: 好處與缺點 */}
      <section id="pros-and-cons" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Shield className="h-6 w-6 text-emerald-500" />
          7. Debit Card 好處與缺點
        </h2>

        <div className="not-prose grid md:grid-cols-2 gap-4 my-6">
          <div className="bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800 p-5">
            <h4 className="font-bold text-green-800 dark:text-green-200 mb-3 flex items-center gap-2">
              <CheckCircle className="h-5 w-5" /> Debit Card 好處
            </h4>
            <ul className="space-y-2 text-sm text-green-700 dark:text-green-300">
              <li>✓ <strong>無需信貸審批</strong>，學生都申請到</li>
              <li>✓ <strong>控制消費</strong>，不會過度借貸</li>
              <li>✓ <strong>無利息風險</strong>，唔怕忘記還款</li>
              <li>✓ <strong>即時扣款</strong>，方便理財</li>
              <li>✓ 可用於<strong>網購、Apple Pay</strong>等</li>
              <li>✓ 虛擬銀行 Debit Card <strong>免外幣手續費</strong></li>
            </ul>
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800 p-5">
            <h4 className="font-bold text-red-800 dark:text-red-200 mb-3 flex items-center gap-2">
              <XCircle className="h-5 w-5" /> Debit Card 缺點
            </h4>
            <ul className="space-y-2 text-sm text-red-700 dark:text-red-300">
              <li>✗ 回贈比 Credit Card <strong>低</strong></li>
              <li>✗ <strong>無迎新獎賞</strong>（或較少）</li>
              <li>✗ 無法「先使未來錢」</li>
              <li>✗ 部分商戶<strong>不接受</strong>（如酒店押金）</li>
              <li>✗ 消費<strong>無法儲積分換里數</strong></li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 8: 申請方法 */}
      <section id="how-to-apply" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Clock className="h-6 w-6 text-orange-500" />
          8. Debit Card 申請方法
        </h2>

        <p>
          <strong>Debit Card 申請</strong>比 Credit Card 簡單得多，唔需要入息證明，
          學生、無固定收入人士都可以申請。
        </p>

        <div className="not-prose space-y-4 my-6">
          {[
            { step: 1, title: "選擇銀行", desc: "建議選擇虛擬銀行（Mox、ZA Bank）或有回贈的銀行" },
            { step: 2, title: "開立戶口", desc: "虛擬銀行可全程網上開戶，只需身份證即可" },
            { step: 3, title: "收取 Debit Card", desc: "實體卡會郵寄到府，虛擬卡即時可用" },
            { step: 4, title: "啟動卡片", desc: "按銀行指示啟動卡片即可開始使用" },
          ].map((item) => (
            <div key={item.step} className="flex items-start gap-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4">
              <div className="bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">
                {item.step}
              </div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white">{item.title}</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 9: 推薦 */}
      <section id="recommendation" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Trophy className="h-6 w-6 text-amber-500" />
          9. {currentYear} 年 Debit Card 推薦
        </h2>

        <p>
          根據回贈率、外幣手續費、使用方便度，以下係我哋嘅 <strong>Debit Card 推薦</strong>：
        </p>

        <div className="not-prose grid md:grid-cols-3 gap-4 my-6">
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-5 border border-purple-200 dark:border-purple-800">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">🥇</span>
              <h4 className="font-bold text-purple-800 dark:text-purple-200">ZA Card</h4>
            </div>
            <ul className="space-y-1 text-sm text-purple-700 dark:text-purple-300">
              <li>• 指定商戶<strong>高達 11% 回贈</strong></li>
              <li>• <strong>免外幣手續費</strong></li>
              <li>• 適合追求高回贈用戶</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 rounded-2xl p-5 border border-teal-200 dark:border-teal-800">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">🥈</span>
              <h4 className="font-bold text-teal-800 dark:text-teal-200">Mox Card</h4>
            </div>
            <ul className="space-y-1 text-sm text-teal-700 dark:text-teal-300">
              <li>• 本地/海外簽賬 <strong>0.5% 回贈</strong></li>
              <li>• <strong>免外幣手續費</strong></li>
              <li>• 適合經常海外消費用戶</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-2xl p-5 border border-orange-200 dark:border-orange-800">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">🥉</span>
              <h4 className="font-bold text-orange-800 dark:text-orange-200">livi Debit Card</h4>
            </div>
            <ul className="space-y-1 text-sm text-orange-700 dark:text-orange-300">
              <li>• liviSave <strong>高息儲蓄</strong></li>
              <li>• <strong>免外幣手續費</strong></li>
              <li>• 適合想儲蓄又想消費用戶</li>
            </ul>
          </div>
        </div>

        <div className="not-prose bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-4">
          <h4 className="font-bold text-emerald-800 dark:text-emerald-200 mb-2">💡 小編建議</h4>
          <p className="text-emerald-700 dark:text-emerald-300 text-sm">
            如果你想賺取<strong>更高回贈</strong>，建議同時申請<strong>信用卡</strong>搭配使用。
            Debit Card 適合日常小額消費、控制預算，大額消費則用信用卡賺回贈。
          </p>
        </div>
      </section>

      {/* Section 10: FAQ */}
      <section id="faq" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          ❓ 10. 常見問題 FAQ
        </h2>
        
        <div className="not-prose space-y-4">
          {debitCardFaqData.map((faq, index) => (
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

      {/* Credit Card Recommendation */}
      <CardPreviewSection 
        title="📌 想賺更高回贈？推薦信用卡"
        subtitle="如果你有穩定收入，使用信用卡可以賺取比 Debit Card 更高的回贈"
        cards={[
          { id: "sc-simply-cash", highlight: "1.5% 無上限" },
          { id: "earnmore", highlight: "2% 無上限" },
          { id: "hsbc-red", highlight: "網購 4%" },
          { id: "hangseng-mmpower", highlight: "網購 5%" },
        ]}
      />

      {/* CTA Section */}
      <div className="not-prose bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl p-6 text-white mb-10">
        <h3 className="text-xl font-bold mb-2">💳 想知邊張信用卡回贈最高？</h3>
        <p className="mb-4 opacity-90">如果你有穩定收入，使用信用卡可以賺取更高回贈！用我哋嘅計算機即刻搵到最適合你嘅信用卡。</p>
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
          <Link href="/discover/overseas-fee" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
            <Globe className="h-5 w-5 text-emerald-600" />
            <span>海外簽賬手續費攻略</span>
            <ChevronRight className="h-4 w-4 ml-auto text-gray-400" />
          </Link>
          <Link href="/blog/best-travel-cards" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
            <Plane className="h-5 w-5 text-emerald-600" />
            <span>旅遊信用卡排行榜</span>
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

