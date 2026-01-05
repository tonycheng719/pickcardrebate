// 海外簽賬信用卡攻略
// 用於 /discover/overseas-spending-guide 頁面

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  ChevronRight, ChevronDown, CreditCard, Plane, Globe,
  Calculator, Trophy, DollarSign, CheckCircle, AlertTriangle,
  Star, Smartphone, Info, Zap, MapPin, Percent, Wallet
} from "lucide-react";
import { CardPreviewSection } from "@/app/discover/components/card-preview-section";
import { CardTableCell, CardBadgeWithImage, CardLinkWithImage } from "@/app/discover/components/card-link-with-image";

// FAQ 數據
export const overseasSpendingFaqData = [
  {
    question: "海外簽賬信用卡邊張最抵？",
    answer: "扣除手續費後：sim World MC 最高 6.05%、富邦白金卡台幣 6.05%、恒生 Travel+ 日韓泰新澳 5.05%、恒生 MMPOWER 4.05%。免手續費卡：SC Smart Card、中銀淘寶卡。"
  },
  {
    question: "信用卡海外簽賬手續費幾多？",
    answer: "一般有兩種手續費：(1) 外幣手續費 (FX Fee) 約 1.95%；(2) 跨境手續費 (CBF) 約 1%。部分銀行兩者都收。免 FX Fee 卡：SC Smart Card、中銀淘寶卡。銀聯卡一般收 1%。"
  },
  {
    question: "海外簽賬定義係咩？",
    answer: "海外簽賬指：(1) 喺外國實體店碌卡；(2) 外幣網購；(3) 非香港登記商戶簽賬。注意：港幣跨境簽賬可能收 CBF 但唔計入海外回贈。"
  },
  {
    question: "旅行用邊張信用卡最抵？",
    answer: "推薦組合：sim World MC（6.05% 淨回贈）+ SC Smart Card（免手續費打底）+ 恒生 Travel+（日韓泰新澳 5.05%）。根據簽賬金額同目的地靈活使用。"
  },
  {
    question: "日本旅行用邊張信用卡？",
    answer: "日本消費係日圓結算，推薦：恒生 Travel+（7% 有上限）、sim World MC（8% 有上限）、SC Smart Card（免手續費）。日本好多地方接受 Apple Pay。"
  },
  {
    question: "台灣旅行用邊張信用卡？",
    answer: "富邦 Visa 白金卡台幣簽賬 20X = 8%，扣手續費後 6.05%，係台灣旅行首選！上限每月 $5,333。"
  },
  {
    question: "海外網購計唔計海外簽賬？",
    answer: "視乎銀行定義。大部分銀行外幣網購計入海外簽賬。恒生 MMPOWER 海外簽賬 6% + 網購 5% 都計。中銀 Chill Card 網上/海外同享 5%。"
  },
  {
    question: "信用卡海外簽賬回贈有上限嗎？",
    answer: "大部分高回贈卡都有上限：sim World MC 每月 $2,500、恒生 Travel+ 每月 $7,576。免手續費卡 SC Smart Card、中銀淘寶卡無上限。"
  }
];

// 手續費比較
const feeComparison = [
  { bank: "渣打銀行", fxFee: "1.95%", cbf: "0%（免）", total: "1.95%", note: "Smart Card 免 FX Fee" },
  { bank: "中銀香港", fxFee: "1.95%", cbf: "0%（免）", total: "1.95%", note: "免跨境手續費" },
  { bank: "東亞銀行", fxFee: "1.95%", cbf: "0%（免）", total: "1.95%", note: "免跨境手續費" },
  { bank: "HSBC", fxFee: "1.95%", cbf: "1%", total: "2.95%", note: "收雙重手續費" },
  { bank: "Citi", fxFee: "1.95%", cbf: "1%", total: "2.95%", note: "收雙重手續費" },
  { bank: "恒生銀行", fxFee: "1.95%", cbf: "1%", total: "2.95%", note: "Travel+ 有額外回贈" },
];

// 熱門旅遊地點
const popularDestinations = [
  {
    destination: "日本 🇯🇵",
    currency: "JPY",
    bestCards: [
      { card: "恒生 Travel+", id: "hangseng-travel-plus", rate: "5.05%" },
      { card: "sim World MC", id: "sim-credit", rate: "6.05%" },
      { card: "SC Smart Card", id: "sc-smart", rate: "免手續費" },
    ],
    tips: "好多商戶接受 Apple Pay",
  },
  {
    destination: "韓國 🇰🇷",
    currency: "KRW",
    bestCards: [
      { card: "恒生 Travel+", id: "hangseng-travel-plus", rate: "5.05%" },
      { card: "sim World MC", id: "sim-credit", rate: "6.05%" },
    ],
    tips: "Samsung Pay 普及",
  },
  {
    destination: "台灣 🇹🇼",
    currency: "TWD",
    bestCards: [
      { card: "富邦白金卡", id: "fubon-platinum", rate: "6.05% 🔥" },
      { card: "sim World MC", id: "sim-credit", rate: "6.05%" },
    ],
    tips: "富邦台幣 8% 係台灣首選！夜市可能只收現金",
  },
  {
    destination: "泰國 🇹🇭",
    currency: "THB",
    bestCards: [
      { card: "恒生 Travel+", id: "hangseng-travel-plus", rate: "5.05%" },
      { card: "恒生 MMPOWER", id: "hangseng-mmpower", rate: "4.05%" },
    ],
    tips: "大型商場接受信用卡",
  },
  {
    destination: "歐洲 🇪🇺",
    currency: "EUR",
    bestCards: [
      { card: "sim World MC", id: "sim-credit", rate: "6.05%" },
      { card: "SC Smart Card", id: "sc-smart", rate: "免手續費" },
    ],
    tips: "小心 DCC 陷阱，東亞 World MC 不計歐洲",
  },
  {
    destination: "美國 🇺🇸",
    currency: "USD",
    bestCards: [
      { card: "sim World MC", id: "sim-credit", rate: "6.05%" },
      { card: "SC Smart Card", id: "sc-smart", rate: "免手續費" },
    ],
    tips: "信用卡非常普及",
  },
];

// 推薦信用卡
const recommendedCards = [
  {
    card: "sim World Mastercard",
    id: "sim-credit",
    rate: "8%",
    fee: "1.95%",
    netRate: "6.05%",
    highlight: "🔥 淨回贈最高",
    reason: "海外實體簽賬 8%，扣 1.95% 手續費仍有 6.05%！每月上限簽 $2,500。",
    best: "短途旅行",
  },
  {
    card: "富邦 Visa 白金卡",
    id: "fubon-platinum",
    rate: "8% 台幣",
    fee: "1.95%",
    netRate: "6.05%",
    highlight: "台灣旅行",
    reason: "台幣簽賬 20X = 8%，日韓 10X = 4%。台灣旅行首選！",
    best: "台灣日韓旅行",
  },
  {
    card: "恒生 Travel+ Visa Signature",
    id: "hangseng-travel-plus",
    rate: "7%",
    fee: "1.95%",
    netRate: "5.05%",
    highlight: "日韓泰新澳",
    reason: "日韓泰新澳 7%，其他外幣 5%。需月簽 $6,000。",
    best: "亞太區旅行",
  },
  {
    card: "恒生 MMPOWER World MC",
    id: "hangseng-mmpower",
    rate: "6%",
    fee: "1.95%",
    netRate: "4.05%",
    highlight: "海外+網購",
    reason: "海外 6% + 網購 5%，需月簽 $5,000。",
    best: "經常網購+旅行",
  },
  {
    card: "SC Smart Card",
    id: "sc-smart",
    rate: "0.55-1.2%",
    fee: "0%",
    netRate: "0.55-1.2%",
    highlight: "免手續費",
    reason: "極少數免外幣手續費 Visa 卡！月簽 $4,000 有 0.56%，$12,000 有 1.2%。",
    best: "穩陣之選",
  },
  {
    card: "中銀淘寶卡",
    id: "boc-taobao",
    rate: "0.4%",
    fee: "0%",
    netRate: "0.4%",
    highlight: "免手續費 MC",
    reason: "極少數免外幣手續費 Mastercard！保本唔蝕。",
    best: "備用打底",
  },
];

// 回贈比較
const cashbackComparison = [
  { card: "sim World MC", id: "sim-credit", overseas: "8%", fee: "1.95%", net: "6.05%", cap: "$2,500/月", annual: "免" },
  { card: "富邦 Visa 白金卡", id: "fubon-platinum", overseas: "8% 台幣", fee: "1.95%", net: "6.05%", cap: "$5,333/月", annual: "$1,200" },
  { card: "恒生 Travel+", id: "hangseng-travel-plus", overseas: "7%", fee: "1.95%", net: "5.05%", cap: "$7,576/月", annual: "免首年" },
  { card: "恒生 MMPOWER", id: "hangseng-mmpower", overseas: "6%", fee: "1.95%", net: "4.05%", cap: "$8,929/月", annual: "免" },
  { card: "東亞 World MC", id: "bea-world-master", overseas: "5%", fee: "1.95%", net: "3.05%", cap: "$10,000/月", annual: "免首年" },
  { card: "中銀 Chill Card", id: "boc-chill", overseas: "5%", fee: "1.95%", net: "3.05%", cap: "$3,260/月", annual: "免" },
  { card: "中銀 Cheers Card", id: "boc-cheers", overseas: "4%", fee: "1.95%", net: "2.05%", cap: "$25,000/月", annual: "免首年" },
  { card: "建行 TRAVO", id: "ccb-travo", overseas: "4%", fee: "1.95%", net: "2.05%", cap: "$25,000/半年", annual: "免" },
  { card: "安信 WeWa VS", id: "wewa-visa-signature", overseas: "4%", fee: "1.95%", net: "2.05%", cap: "$5,556/月", annual: "$250" },
  { card: "EarnMORE 銀聯", id: "earnmore", overseas: "2%", fee: "1%", net: "1%", cap: "無上限", annual: "免" },
  { card: "SC Smart Card", id: "sc-smart", overseas: "0.55-1.2%", fee: "0%", net: "0.55-1.2%", cap: "無上限", annual: "免" },
  { card: "中銀淘寶卡", id: "boc-taobao", overseas: "0.4%", fee: "0%", net: "0.4%", cap: "無上限", annual: "免" },
];

export function OverseasSpendingGuide() {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      {/* 引言 */}
      <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-6">
        去旅行用信用卡簽賬，識揀卡可以賺回贈，唔識揀分分鐘蝕手續費！
        本文教你 <strong>{currentYear} 海外簽賬信用卡攻略</strong>，
        日本、韓國、台灣、泰國、歐美旅行都適用，扣除手續費後最高賺 <strong>6%+ 回贈</strong>！
      </p>

      {/* 目錄 */}
      <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-10">
        <h2 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          📑 本文目錄
        </h2>
        <ul className="space-y-2 text-sm">
          <li><a href="#overview" className="text-blue-600 dark:text-blue-400 hover:underline">1. 海外簽賬要留意咩？</a></li>
          <li><a href="#fees" className="text-blue-600 dark:text-blue-400 hover:underline">2. 海外簽賬手續費比較</a></li>
          <li><a href="#definition" className="text-blue-600 dark:text-blue-400 hover:underline">3. 海外簽賬定義</a></li>
          <li><a href="#comparison" className="text-blue-600 dark:text-blue-400 hover:underline">4. 海外簽賬信用卡回贈比較</a></li>
          <li><a href="#destinations" className="text-blue-600 dark:text-blue-400 hover:underline">5. 熱門旅遊地點信用卡推薦</a></li>
          <li><a href="#best-cards" className="text-blue-600 dark:text-blue-400 hover:underline">6. 海外簽賬信用卡推薦</a></li>
          <li><a href="#combo" className="text-blue-600 dark:text-blue-400 hover:underline">7. 旅行信用卡組合建議</a></li>
          <li><a href="#dcc" className="text-blue-600 dark:text-blue-400 hover:underline">8. DCC 陷阱要點避？</a></li>
          <li><a href="#tips" className="text-blue-600 dark:text-blue-400 hover:underline">9. 旅行慳錢貼士</a></li>
          <li><a href="#faq" className="text-blue-600 dark:text-blue-400 hover:underline">10. 常見問題 FAQ</a></li>
        </ul>
      </div>

      {/* Section 1: 總覽 */}
      <section id="overview" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Plane className="h-6 w-6 text-blue-500" />
          1. 海外簽賬要留意咩？
        </h2>
        
        <p>
          去旅行用信用卡簽賬，唔係淨係睇回贈率咁簡單！
          你要計埋<strong>手續費</strong>先知真正賺定蝕：
        </p>

        <div className="not-prose bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-2xl p-5 border border-red-200 dark:border-red-800 my-6">
          <h4 className="font-bold text-red-800 dark:text-red-200 mb-3">⚠️ 海外簽賬手續費</h4>
          <div className="grid md:grid-cols-2 gap-3">
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
              <p className="text-sm text-gray-500">外幣手續費 (FX Fee)</p>
              <p className="text-2xl font-bold text-red-600">~1.95%</p>
              <p className="text-xs text-gray-400">大部分銀行都收</p>
            </div>
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
              <p className="text-sm text-gray-500">跨境手續費 (CBF)</p>
              <p className="text-2xl font-bold text-red-600">~1%</p>
              <p className="text-xs text-gray-400">部分銀行收（HSBC、Citi、恒生）</p>
            </div>
          </div>
          <p className="text-red-700 dark:text-red-300 text-sm mt-3">
            如果回贈 2% 但手續費 2.95%，實際係<strong>蝕 0.95%</strong>！
          </p>
        </div>

        <div className="not-prose bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
          <h4 className="font-bold text-green-800 dark:text-green-200 mb-2">💡 計算淨回贈</h4>
          <p className="text-green-700 dark:text-green-300 text-sm">
            <strong>淨回贈 = 回贈率 - 手續費</strong><br />
            例：Simply Cash 2% - 手續費 1.95% = 淨賺 0.05%
          </p>
        </div>
      </section>

      {/* Section 2: 手續費比較 */}
      <section id="fees" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Percent className="h-6 w-6 text-purple-500" />
          2. 海外簽賬手續費比較
        </h2>

        <p>
          唔同銀行嘅<strong>海外簽賬手續費</strong>差異好大：
        </p>

        <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden my-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-purple-50 dark:bg-purple-900/20">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-purple-600 dark:text-purple-400">銀行</th>
                  <th className="px-4 py-3 text-center font-medium text-purple-600 dark:text-purple-400">FX Fee</th>
                  <th className="px-4 py-3 text-center font-medium text-purple-600 dark:text-purple-400">CBF</th>
                  <th className="px-4 py-3 text-center font-medium text-purple-600 dark:text-purple-400">總手續費</th>
                  <th className="px-4 py-3 text-left font-medium text-purple-600 dark:text-purple-400">備註</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {feeComparison.map((bank, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{bank.bank}</td>
                    <td className="px-4 py-3 text-center text-gray-600 dark:text-gray-400">{bank.fxFee}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={bank.cbf === "0%（免）" ? "text-green-600 font-bold" : "text-red-600"}>
                        {bank.cbf}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center font-bold text-gray-900 dark:text-white">{bank.total}</td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{bank.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section 3: 定義 */}
      <section id="definition" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Info className="h-6 w-6 text-indigo-500" />
          3. 海外簽賬定義
        </h2>

        <p>
          銀行對<strong>海外簽賬</strong>有唔同定義：
        </p>

        <div className="not-prose space-y-3 my-6">
          <div className="flex items-start gap-3 bg-green-50 dark:bg-green-900/20 rounded-xl p-4">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">✅ 一般計入海外簽賬</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                外國實體店碌卡、外幣網購、非香港登記商戶簽賬
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4">
            <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">⚠️ 灰色地帶</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                港幣跨境簽賬（非香港商戶但用 HKD）：收 CBF 但可能唔計入海外回贈
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-red-50 dark:bg-red-900/20 rounded-xl p-4">
            <Info className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">❌ 唔計入海外簽賬</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                香港商戶外幣結算、DCC 交易（揀咗港幣結算）
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: 回贈比較 */}
      <section id="comparison" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <DollarSign className="h-6 w-6 text-green-500" />
          4. 海外簽賬信用卡回贈比較
        </h2>

        <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden my-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-green-50 dark:bg-green-900/20">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-green-600 dark:text-green-400">信用卡</th>
                  <th className="px-4 py-3 text-center font-medium text-green-600 dark:text-green-400">海外回贈</th>
                  <th className="px-4 py-3 text-center font-medium text-green-600 dark:text-green-400">手續費</th>
                  <th className="px-4 py-3 text-center font-medium text-green-600 dark:text-green-400">淨回贈</th>
                  <th className="px-4 py-3 text-center font-medium text-green-600 dark:text-green-400">上限</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {cashbackComparison.map((card, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3">
                      <CardTableCell id={card.id} />
                    </td>
                    <td className="px-4 py-3 text-center font-bold text-green-600 dark:text-green-400">{card.overseas}</td>
                    <td className="px-4 py-3 text-center text-red-600">{card.fee}</td>
                    <td className="px-4 py-3 text-center font-bold text-blue-600 dark:text-blue-400">{card.net}</td>
                    <td className="px-4 py-3 text-center text-gray-600 dark:text-gray-400">{card.cap}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section 5: 熱門旅遊地點 */}
      <section id="destinations" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <MapPin className="h-6 w-6 text-red-500" />
          5. 熱門旅遊地點信用卡推薦
        </h2>

        <p>
          唔同旅遊地點有唔同特性，以下係各地<strong>最佳信用卡</strong>推薦：
        </p>

        <div className="not-prose grid md:grid-cols-2 gap-4 my-6">
          {popularDestinations.map((dest, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">{dest.destination}</h4>
                  <p className="text-xs text-gray-500">貨幣：{dest.currency}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-2">
                {dest.bestCards.map((card, i) => (
                  <CardBadgeWithImage key={i} id={card.id} rate={card.rate} />
                ))}
              </div>
              <p className="text-xs text-gray-500">💡 {dest.tips}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 6: 推薦信用卡 */}
      <section id="best-cards" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Trophy className="h-6 w-6 text-amber-500" />
          6. 海外簽賬信用卡推薦
        </h2>

        <p>
          以下係<strong>旅行信用卡 {currentYear}</strong> 推薦：
        </p>

        <div className="not-prose space-y-4 my-6">
          {recommendedCards.map((card, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-4">
              <div className="flex items-start gap-4">
                {/* 排名 + 卡面圖片 */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-xl">{["🥇", "🥈", "🥉", "4️⃣", "5️⃣", "6️⃣"][index]}</span>
                  <CardLinkWithImage id={card.id} showRate={false} size="md" />
                </div>
                {/* 卡資訊 */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                      {card.highlight}
                    </span>
                    <span className="text-lg font-bold text-green-600 dark:text-green-400">{card.rate}</span>
                    <span className="text-xs text-gray-500">手續費 {card.fee}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{card.reason}</p>
                  <p className="text-xs text-gray-500 mt-1">最適合：{card.best}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Card Preview Section */}
      <CardPreviewSection 
        title="📌 海外簽賬推薦信用卡一覽"
        subtitle="點擊查看詳細回贈條款及申請連結"
        cards={[
          { id: "sim-credit", highlight: "海外 6.05% 淨回贈" },
          { id: "hangseng-travel-plus", highlight: "日韓泰 5.05%" },
          { id: "hangseng-mmpower", highlight: "海外 4.05%" },
          { id: "sc-smart", highlight: "免手續費" },
          { id: "boc-taobao", highlight: "免手續費 MC" },
        ]}
      />

      {/* Section 7: 組合建議 */}
      <section id="combo" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Wallet className="h-6 w-6 text-violet-500" />
          7. 旅行信用卡組合建議
        </h2>

        <div className="not-prose space-y-4 my-6">
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-xl p-4 border border-orange-200 dark:border-orange-800">
            <h4 className="font-bold text-orange-800 dark:text-orange-200 mb-3">🔥 最高回贈組合</h4>
            <div className="grid md:grid-cols-3 gap-3">
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
                <Link href="/cards/sim-credit" className="font-medium text-blue-600 hover:underline text-sm">sim World MC</Link>
                <p className="text-xs text-gray-500">海外 6.05%（首 $2,500）</p>
              </div>
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
                <Link href="/cards/hangseng-travel-plus" className="font-medium text-blue-600 hover:underline text-sm">恒生 Travel+</Link>
                <p className="text-xs text-gray-500">日韓泰新澳 5.05%</p>
              </div>
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
                <Link href="/cards/sc-smart" className="font-medium text-blue-600 hover:underline text-sm">SC Smart Card</Link>
                <p className="text-xs text-gray-500">免手續費打底</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
            <h4 className="font-bold text-blue-800 dark:text-blue-200 mb-3">🇹🇼 台灣旅行組合</h4>
            <div className="grid md:grid-cols-2 gap-3">
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
                <Link href="/cards/fubon-platinum" className="font-medium text-blue-600 hover:underline text-sm">富邦 Visa 白金卡</Link>
                <p className="text-xs text-gray-500">台幣 6.05%（首 $5,333）</p>
              </div>
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
                <Link href="/cards/sc-smart" className="font-medium text-blue-600 hover:underline text-sm">SC Smart Card</Link>
                <p className="text-xs text-gray-500">爆 Cap 後用（免手續費）</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4 border border-green-200 dark:border-green-800">
            <h4 className="font-bold text-green-800 dark:text-green-200 mb-3">💡 免手續費組合</h4>
            <div className="grid md:grid-cols-2 gap-3">
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
                <Link href="/cards/sc-smart" className="font-medium text-blue-600 hover:underline text-sm">SC Smart Card</Link>
                <p className="text-xs text-gray-500">免手續費 Visa（0.55-1.2%）</p>
              </div>
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
                <Link href="/cards/boc-taobao" className="font-medium text-blue-600 hover:underline text-sm">中銀淘寶卡</Link>
                <p className="text-xs text-gray-500">免手續費 MC（0.4%）</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 8: DCC */}
      <section id="dcc" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <AlertTriangle className="h-6 w-6 text-amber-500" />
          8. DCC 陷阱要點避？
        </h2>

        <p>
          <strong>DCC（Dynamic Currency Conversion）</strong>係海外簽賬最大陷阱！
        </p>

        <div className="not-prose bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 my-6">
          <h4 className="font-bold text-red-800 dark:text-red-200 mb-2">🚨 咩係 DCC？</h4>
          <ul className="text-red-700 dark:text-red-300 text-sm space-y-1">
            <li>• 商戶問你用<strong>港幣</strong>定<strong>當地貨幣</strong>結算</li>
            <li>• 揀港幣 = DCC，匯率極差，可能蝕 <strong>3-5%</strong>！</li>
            <li>• 一定要揀<strong>當地貨幣</strong>！</li>
          </ul>
        </div>

        <div className="not-prose bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
          <h4 className="font-bold text-green-800 dark:text-green-200 mb-2">✅ 正確做法</h4>
          <ul className="text-green-700 dark:text-green-300 text-sm space-y-1">
            <li>• 永遠揀<strong>當地貨幣</strong>結算（JPY、KRW、EUR 等）</li>
            <li>• 收銀員問 &quot;HKD or local currency?&quot; → 答 &quot;Local currency&quot;</li>
            <li>• 詳情請睇 <Link href="/discover/overseas-fee" className="text-blue-600 hover:underline">海外簽賬手續費攻略</Link></li>
          </ul>
        </div>
      </section>

      {/* Section 9: 貼士 */}
      <section id="tips" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Zap className="h-6 w-6 text-yellow-500" />
          9. 旅行慳錢貼士
        </h2>

        <div className="not-prose space-y-3">
          {[
            { icon: "💳", title: "計算淨回贈", desc: "回贈 - 手續費 = 淨回贈，唔好只睇回贈率" },
            { icon: "🛡️", title: "免手續費卡打底", desc: "SC Smart Card 免手續費，保本唔蝕" },
            { icon: "⚠️", title: "避開 DCC", desc: "永遠揀當地貨幣結算，唔好揀港幣" },
            { icon: "📱", title: "善用 Apple Pay", desc: "日本、韓國好多地方接受，可賺額外回贈" },
            { icon: "🔄", title: "多卡組合", desc: "Travel+ 用完上限後轉用 Simply Cash" },
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
          {overseasSpendingFaqData.map((faq, index) => (
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
      <div className="not-prose bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-6 text-white mb-10">
        <h3 className="text-xl font-bold mb-2">💳 想知邊張信用卡最適合你嘅旅行習慣？</h3>
        <p className="mb-4 opacity-90">用我哋嘅計算機，輸入你嘅消費類別，即刻搵到最高回贈嘅信用卡！</p>
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
          <Link href="/discover/miles-vs-cashback" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
            <Plane className="h-5 w-5 text-emerald-600" />
            <span>里數 vs 現金回贈</span>
            <ChevronRight className="h-4 w-4 ml-auto text-gray-400" />
          </Link>
          <Link href="/blog/best-travel-cards" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
            <Trophy className="h-5 w-5 text-emerald-600" />
            <span>旅行信用卡排行榜</span>
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

