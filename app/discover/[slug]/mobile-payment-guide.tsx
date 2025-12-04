// 手機支付信用卡攻略
// 用於 /discover/mobile-payment-guide 頁面

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  ChevronRight, ChevronDown, CreditCard, Smartphone, Wallet,
  Calculator, Trophy, DollarSign, CheckCircle, AlertTriangle,
  Star, Info, Zap, Percent, Gift, Apple, Store
} from "lucide-react";
import { CardPreviewSection } from "@/app/discover/components/card-preview-section";

// FAQ 數據
export const mobilePaymentFaqData = [
  {
    question: "Apple Pay 信用卡回贈點計？",
    answer: "Apple Pay 回贈視乎信用卡條款。部分銀行將 Apple Pay 當「手機支付」有額外回贈（如恒生 MMPOWER 5%），部分銀行當「實體簽賬」計（如 HSBC、Citi）。要睇清楚信用卡條款。"
  },
  {
    question: "Google Pay 同 Apple Pay 回贈一樣嗎？",
    answer: "大部分銀行 Google Pay 同 Apple Pay 回贈一樣，都當「手機支付」或「感應式支付」處理。但部分銀行可能只支援其中一種，建議查詢銀行客服。"
  },
  {
    question: "手機支付比實體卡安全嗎？",
    answer: "手機支付更安全！因為：(1) 使用 Token 代替真實卡號；(2) 需要 Face ID / 指紋驗證；(3) 唔會曝露實體卡號俾商戶。即使手機遺失，都可以遠端鎖定。"
  },
  {
    question: "邊張信用卡 Apple Pay 回贈最高？",
    answer: "Apple Pay 回贈最高嘅信用卡係安信 EarnMORE（2% 無上限）、恒生 MMPOWER（5% 有上限）。部分銀行 Apple Pay 當一般簽賬，回贈較低。"
  },
  {
    question: "Samsung Pay 同 Apple Pay 有咩分別？",
    answer: "Samsung Pay 除咗支援 NFC 感應支付，仲支援 MST（磁條模擬）技術，可以喺唔支援感應式付款嘅舊式刷卡機使用。Apple Pay 只支援 NFC。"
  },
  {
    question: "手機支付有簽賬上限嗎？",
    answer: "手機支付單筆限額視乎信用卡同商戶。香港一般 $1,000 以下唔使簽名，$1,000 以上可能需要輸入密碼。部分商戶有單筆上限。"
  },
  {
    question: "AlipayHK 同 WeChat Pay HK 點計回贈？",
    answer: "AlipayHK 同 WeChat Pay HK 綁定信用卡後，回贈視乎信用卡條款。部分銀行當「電子錢包」有回贈，部分銀行無回贈。建議查詢銀行條款。"
  },
  {
    question: "點樣設定 Apple Pay？",
    answer: "設定 Apple Pay：(1) 打開銀包 App；(2) 點擊 +；(3) 選擇「信用卡或扣賬卡」；(4) 掃描信用卡或手動輸入；(5) 完成銀行驗證。"
  }
];

// 手機支付回贈比較
const mobilePaymentCards = [
  {
    card: "安信 EarnMORE",
    id: "earnmore",
    applePay: "2%",
    googlePay: "2%",
    cap: "無上限",
    highlight: "最高回贈",
    notes: "Mobile Pay 2% 無上限",
  },
  {
    card: "恒生 MMPOWER",
    id: "hangseng-mmpower",
    applePay: "5%",
    googlePay: "5%",
    cap: "$200/月",
    highlight: "最高但有上限",
    notes: "Mobile Pay 5%（每月上限 $200 回贈）",
  },
  {
    card: "渣打 Simply Cash",
    id: "sc-simply-cash",
    applePay: "1.5%",
    googlePay: "1.5%",
    cap: "無上限",
    highlight: "無上限",
    notes: "本地簽賬 1.5%，包括手機支付",
  },
  {
    card: "HSBC Visa Signature",
    id: "hsbc-vs",
    applePay: "1.6%",
    googlePay: "1.6%",
    cap: "有上限",
    highlight: "大銀行",
    notes: "當本地簽賬計，最紅自主 5X",
  },
  {
    card: "Citi Cash Back",
    id: "citi-cashback",
    applePay: "1%",
    googlePay: "1%",
    cap: "無上限",
    highlight: "本地簽賬",
    notes: "當本地簽賬 1%",
  },
  {
    card: "HSBC Red Card",
    id: "hsbc-red",
    applePay: "1%",
    googlePay: "1%",
    cap: "無上限",
    highlight: "基本回贈",
    notes: "當本地簽賬 1%",
  },
];

// 手機支付平台比較
const paymentPlatforms = [
  {
    name: "Apple Pay",
    icon: "🍎",
    devices: "iPhone、Apple Watch、iPad、Mac",
    supported: "大部分香港銀行",
    pros: ["最多商戶接受", "安全度高", "Face ID / Touch ID"],
    cons: ["只限 Apple 裝置"],
  },
  {
    name: "Google Pay",
    icon: "🤖",
    devices: "Android 手機、Wear OS 手錶",
    supported: "大部分香港銀行",
    pros: ["Android 用戶首選", "支援多種裝置", "Google 整合"],
    cons: ["商戶支援較 Apple Pay 少"],
  },
  {
    name: "Samsung Pay",
    icon: "📱",
    devices: "Samsung 手機、Galaxy Watch",
    supported: "部分香港銀行",
    pros: ["支援 MST 磁條模擬", "可用於舊式刷卡機"],
    cons: ["只限 Samsung 裝置", "銀行支援較少"],
  },
  {
    name: "Huawei Pay",
    icon: "📲",
    devices: "Huawei 手機、智能手錶",
    supported: "少數香港銀行",
    pros: ["Huawei 用戶選擇"],
    cons: ["銀行支援最少"],
  },
];

// 電子錢包比較
const eWallets = [
  {
    name: "AlipayHK",
    icon: "💙",
    creditCardRebate: "視乎銀行",
    pros: ["淘寶付款", "P2P 轉賬", "商戶優惠多"],
    notes: "部分銀行信用卡增值有回贈",
  },
  {
    name: "WeChat Pay HK",
    icon: "💚",
    creditCardRebate: "視乎銀行",
    pros: ["微信整合", "P2P 轉賬", "內地通用"],
    notes: "部分銀行信用卡增值有回贈",
  },
  {
    name: "PayMe",
    icon: "🔴",
    creditCardRebate: "無（只限增值）",
    pros: ["HSBC 整合", "P2P 轉賬"],
    notes: "信用卡增值無回贈",
  },
  {
    name: "八達通 App",
    icon: "🟠",
    creditCardRebate: "視乎銀行",
    pros: ["交通必備", "廣泛接受"],
    notes: "部分銀行 App 增值當網購計",
  },
];

export function MobilePaymentGuide() {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      {/* 引言 */}
      <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-6">
        Apple Pay、Google Pay 回贈點計？本文教你 <strong>{currentYear} 手機支付信用卡攻略</strong>，
        比較各銀行<strong>手機支付回贈</strong>，教你點樣用 Mobile Pay 賺盡回贈！
      </p>

      {/* 目錄 */}
      <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-10">
        <h2 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          📑 本文目錄
        </h2>
        <ul className="space-y-2 text-sm">
          <li><a href="#overview" className="text-blue-600 dark:text-blue-400 hover:underline">1. 手機支付係咩？</a></li>
          <li><a href="#rebate-comparison" className="text-blue-600 dark:text-blue-400 hover:underline">2. 手機支付信用卡回贈比較</a></li>
          <li><a href="#platforms" className="text-blue-600 dark:text-blue-400 hover:underline">3. 手機支付平台比較</a></li>
          <li><a href="#apple-pay" className="text-blue-600 dark:text-blue-400 hover:underline">4. Apple Pay 攻略</a></li>
          <li><a href="#google-pay" className="text-blue-600 dark:text-blue-400 hover:underline">5. Google Pay 攻略</a></li>
          <li><a href="#e-wallets" className="text-blue-600 dark:text-blue-400 hover:underline">6. 電子錢包比較</a></li>
          <li><a href="#best-cards" className="text-blue-600 dark:text-blue-400 hover:underline">7. 手機支付最佳信用卡</a></li>
          <li><a href="#security" className="text-blue-600 dark:text-blue-400 hover:underline">8. 手機支付安全性</a></li>
          <li><a href="#tips" className="text-blue-600 dark:text-blue-400 hover:underline">9. 慳錢貼士</a></li>
          <li><a href="#faq" className="text-blue-600 dark:text-blue-400 hover:underline">10. 常見問題 FAQ</a></li>
        </ul>
      </div>

      {/* Section 1: 總覽 */}
      <section id="overview" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Smartphone className="h-6 w-6 text-blue-500" />
          1. 手機支付係咩？
        </h2>
        
        <p>
          <strong>手機支付（Mobile Pay）</strong>即係用手機代替實體信用卡付款，
          包括 Apple Pay、Google Pay、Samsung Pay 等：
        </p>

        <div className="not-prose bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-5 border border-blue-200 dark:border-blue-800 my-6">
          <h4 className="font-bold text-blue-800 dark:text-blue-200 mb-3">📱 手機支付原理</h4>
          <div className="grid md:grid-cols-3 gap-3">
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 text-center">
              <p className="text-3xl mb-1">1️⃣</p>
              <p className="font-medium text-gray-900 dark:text-white">綁定信用卡</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">將信用卡加入手機錢包</p>
            </div>
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 text-center">
              <p className="text-3xl mb-1">2️⃣</p>
              <p className="font-medium text-gray-900 dark:text-white">NFC 感應付款</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">手機靠近感應式讀卡機</p>
            </div>
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 text-center">
              <p className="text-3xl mb-1">3️⃣</p>
              <p className="font-medium text-gray-900 dark:text-white">驗證付款</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Face ID / 指紋 / 密碼</p>
            </div>
          </div>
        </div>

        <div className="not-prose bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
          <h4 className="font-bold text-green-800 dark:text-green-200 mb-2">✅ 手機支付優點</h4>
          <ul className="text-green-700 dark:text-green-300 text-sm space-y-1">
            <li>• 唔使帶實體卡，方便快捷</li>
            <li>• 更安全（Token 代替真實卡號）</li>
            <li>• 部分信用卡有額外回贈</li>
            <li>• 支援 Apple Watch 等穿戴裝置</li>
          </ul>
        </div>
      </section>

      {/* Section 2: 回贈比較 */}
      <section id="rebate-comparison" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Percent className="h-6 w-6 text-green-500" />
          2. 手機支付信用卡回贈比較
        </h2>

        <p>
          以下係<strong>手機支付信用卡回贈比較</strong>：
        </p>

        <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden my-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-green-50 dark:bg-green-900/20">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-green-600 dark:text-green-400">信用卡</th>
                  <th className="px-4 py-3 text-center font-medium text-green-600 dark:text-green-400">Apple Pay</th>
                  <th className="px-4 py-3 text-center font-medium text-green-600 dark:text-green-400">Google Pay</th>
                  <th className="px-4 py-3 text-center font-medium text-green-600 dark:text-green-400">上限</th>
                  <th className="px-4 py-3 text-center font-medium text-green-600 dark:text-green-400">備註</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {mobilePaymentCards.map((card, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3">
                      <Link href={`/cards/${card.id}`} className="font-medium text-blue-600 hover:underline dark:text-blue-400">
                        {card.card}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-center font-bold text-green-600 dark:text-green-400">{card.applePay}</td>
                    <td className="px-4 py-3 text-center font-bold text-green-600 dark:text-green-400">{card.googlePay}</td>
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
        title="📌 手機支付推薦信用卡"
        subtitle="點擊查看詳細回贈條款及申請連結"
        cards={[
          { id: "earnmore", highlight: "Mobile Pay 2%" },
          { id: "hangseng-mmpower", highlight: "Mobile Pay 5%" },
          { id: "sc-simply-cash", highlight: "1.5% 無上限" },
          { id: "hsbc-vs", highlight: "本地 1.6%" },
        ]}
      />

      {/* Section 3: 平台比較 */}
      <section id="platforms" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Wallet className="h-6 w-6 text-purple-500" />
          3. 手機支付平台比較
        </h2>

        <div className="not-prose space-y-4 my-6">
          {paymentPlatforms.map((platform, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{platform.icon}</span>
                <h4 className="font-bold text-gray-900 dark:text-white">{platform.name}</h4>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                <strong>支援裝置：</strong>{platform.devices}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                <strong>銀行支援：</strong>{platform.supported}
              </p>
              <div className="grid md:grid-cols-2 gap-2">
                <div>
                  <p className="text-xs text-green-600 font-medium mb-1">✅ 優點</p>
                  <ul className="text-xs text-gray-500 space-y-0.5">
                    {platform.pros.map((pro, i) => (
                      <li key={i}>• {pro}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs text-red-600 font-medium mb-1">❌ 缺點</p>
                  <ul className="text-xs text-gray-500 space-y-0.5">
                    {platform.cons.map((con, i) => (
                      <li key={i}>• {con}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: Apple Pay */}
      <section id="apple-pay" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Apple className="h-6 w-6 text-gray-800 dark:text-gray-200" />
          4. Apple Pay 攻略
        </h2>

        <div className="not-prose space-y-3 my-6">
          {[
            { step: "1", title: "打開銀包 App", desc: "iPhone 內置銀包 App" },
            { step: "2", title: "點擊 + 號", desc: "右上角新增卡片" },
            { step: "3", title: "選擇「信用卡或扣賬卡」", desc: "可以掃描或手動輸入" },
            { step: "4", title: "完成銀行驗證", desc: "SMS 或 App 驗證" },
            { step: "5", title: "開始使用", desc: "雙擊側邊按鈕 → Face ID → 感應付款" },
          ].map((item, index) => (
            <div key={index} className="flex items-start gap-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center font-bold">{item.step}</span>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{item.title}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="not-prose bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <p className="text-blue-700 dark:text-blue-300 text-sm">
              <strong>提示：</strong>Apple Watch 都可以用 Apple Pay！
              雙擊側邊按鈕即可付款，唔使拎手機出嚟。
            </p>
          </div>
        </div>
      </section>

      {/* Section 5: Google Pay */}
      <section id="google-pay" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Smartphone className="h-6 w-6 text-green-500" />
          5. Google Pay 攻略
        </h2>

        <div className="not-prose space-y-3 my-6">
          {[
            { step: "1", title: "下載 Google Pay App", desc: "Google Play 下載" },
            { step: "2", title: "登入 Google 帳戶", desc: "用你嘅 Google 帳戶登入" },
            { step: "3", title: "新增信用卡", desc: "掃描或手動輸入卡號" },
            { step: "4", title: "完成銀行驗證", desc: "SMS 或 App 驗證" },
            { step: "5", title: "開始使用", desc: "解鎖手機 → NFC 感應付款" },
          ].map((item, index) => (
            <div key={index} className="flex items-start gap-3 bg-green-50 dark:bg-green-900/20 rounded-xl p-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold">{item.step}</span>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{item.title}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 6: 電子錢包 */}
      <section id="e-wallets" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Wallet className="h-6 w-6 text-teal-500" />
          6. 電子錢包比較
        </h2>

        <p>
          除咗 Apple Pay / Google Pay，仲有其他<strong>電子錢包</strong>可以綁定信用卡：
        </p>

        <div className="not-prose grid md:grid-cols-2 gap-4 my-6">
          {eWallets.map((wallet, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{wallet.icon}</span>
                <h4 className="font-bold text-gray-900 dark:text-white">{wallet.name}</h4>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                <strong>信用卡回贈：</strong>{wallet.creditCardRebate}
              </p>
              <p className="text-xs text-gray-500 mb-2">{wallet.notes}</p>
              <div className="flex flex-wrap gap-1">
                {wallet.pros.map((pro, i) => (
                  <span key={i} className="inline-flex items-center px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs text-gray-600 dark:text-gray-400">
                    {pro}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 7: 最佳卡 */}
      <section id="best-cards" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Trophy className="h-6 w-6 text-amber-500" />
          7. 手機支付最佳信用卡
        </h2>

        <div className="not-prose space-y-4 my-6">
          {[
            { rank: "🥇", card: "安信 EarnMORE", id: "earnmore", rate: "2%", reason: "Mobile Pay 2% 無上限，最強打底卡" },
            { rank: "🥈", card: "恒生 MMPOWER", id: "hangseng-mmpower", rate: "5%", reason: "Mobile Pay 5%（有月上限 $200 回贈）" },
            { rank: "🥉", card: "渣打 Simply Cash", id: "sc-simply-cash", rate: "1.5%", reason: "本地簽賬 1.5% 無上限" },
            { rank: "4️⃣", card: "HSBC Visa Signature", id: "hsbc-vs", rate: "1.6%", reason: "本地簽賬最紅自主 1.6%" },
          ].map((card, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 flex items-center gap-4">
              <span className="text-2xl">{card.rank}</span>
              <div className="flex-1">
                <Link href={`/cards/${card.id}`} className="font-bold text-blue-600 hover:underline dark:text-blue-400">{card.card}</Link>
                <p className="text-sm text-gray-600 dark:text-gray-400">{card.reason}</p>
              </div>
              <span className="font-bold text-green-600 dark:text-green-400 text-lg">{card.rate}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Section 8: 安全性 */}
      <section id="security" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <CheckCircle className="h-6 w-6 text-green-500" />
          8. 手機支付安全性
        </h2>

        <div className="not-prose grid md:grid-cols-2 gap-4 my-6">
          <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 border border-green-200 dark:border-green-800">
            <h4 className="font-bold text-green-800 dark:text-green-200 mb-3">🔒 安全特點</h4>
            <ul className="text-green-700 dark:text-green-300 text-sm space-y-1">
              <li>• <strong>Token 技術</strong>：唔會曝露真實卡號</li>
              <li>• <strong>生物驗證</strong>：Face ID / 指紋驗證</li>
              <li>• <strong>一次性代碼</strong>：每次交易都唔同</li>
              <li>• <strong>遠端鎖定</strong>：手機遺失可即時鎖定</li>
            </ul>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
            <h4 className="font-bold text-blue-800 dark:text-blue-200 mb-3">💡 安全貼士</h4>
            <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1">
              <li>• 設定強密碼 / 生物驗證</li>
              <li>• 開啟交易通知</li>
              <li>• 定期檢查交易記錄</li>
              <li>• 唔好喺公共 Wi-Fi 綁定卡</li>
            </ul>
          </div>
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
            { icon: "💳", title: "揀啱信用卡", desc: "用 EarnMORE 或 MMPOWER 賺 Mobile Pay 額外回贈" },
            { icon: "📊", title: "留意上限", desc: "MMPOWER 每月回贈上限 $200，超過後用 EarnMORE" },
            { icon: "⌚", title: "用 Apple Watch", desc: "方便快捷，唔使拎手機出嚟" },
            { icon: "🔔", title: "開啟交易通知", desc: "即時知道每筆交易，更安全" },
            { icon: "📱", title: "唔同卡唔同用途", desc: "可以綁定多張卡，視乎商戶用唔同卡" },
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
          {mobilePaymentFaqData.map((faq, index) => (
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
        <h3 className="text-xl font-bold mb-2">📱 想知邊張信用卡手機支付回贈最高？</h3>
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
            <DollarSign className="h-5 w-5 text-emerald-600" />
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

