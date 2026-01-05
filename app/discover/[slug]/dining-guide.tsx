// 餐飲信用卡攻略
// 用於 /discover/dining-guide 頁面

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  ChevronRight, ChevronDown, CreditCard, UtensilsCrossed, Store,
  Calculator, Trophy, DollarSign, CheckCircle, AlertTriangle,
  Star, Smartphone, Info, Zap, MapPin, Percent, Coffee
} from "lucide-react";
import { CardPreviewSection } from "@/app/discover/components/card-preview-section";
import { CardTableCell, CardBadgeWithImage, CardLinkWithImage } from "@/app/discover/components/card-link-with-image";

// FAQ 數據
export const diningFaqData = [
  {
    question: "食飯信用卡邊張回贈最高？",
    answer: "建行 eye 卡加碼賞最高 9%+2%=11%（需登記、月簽 $5,000、單筆 $300）。AEON Card Purple 有 6%（手機支付）。信銀 Motion 有 6%（月簽 $3,800）。無門檻的話，Citi Cash Back 有 2% 無上限。"
  },
  {
    question: "AEON Card Purple 係咩卡？",
    answer: "AEON Card Purple 係 AEON Visa、Mastercard、JCB、銀聯嘅統稱。透過「紫賞生活優惠」，用 Apple Pay/Google Pay 於本地食肆簽賬可享 6% 回贈（每月上限 $1,786 簽賬），需於 AEON App 登記。"
  },
  {
    question: "餐飲簽賬定義係咩？",
    answer: "餐飲簽賬一般指 MCC 代碼為餐廳類別嘅簽賬，包括酒樓、餐廳、快餐店、咖啡店等。外賣平台（Foodpanda、Keeta）通常計入「網上簽賬」而非餐飲。7-11、OK 便利店唔計入餐飲。"
  },
  {
    question: "用 Apple Pay 食飯有額外回贈嗎？",
    answer: "有！AEON Card Purple 用 Apple Pay/Google Pay 食飯有 6%（需登記）、安信 EarnMORE 有 2% 無上限、恒生 MMPOWER 有 5%（有上限）。建議用手機支付食飯，可以賺額外回贈。"
  },
  {
    question: "建行 eye 卡加碼賞點玩？",
    answer: "需每月於 CCB App 登記（首2,500名）。月簽滿 $5,000 + 單筆滿 $300 可享 +9% 額外回贈。拍卡支付再加 2%。推廣期至 2026/3/31。爆 Cap 上限：$4,445/月。"
  },
  {
    question: "信銀 Motion 點解「下限高過上限」？",
    answer: "信銀 Motion 需月簽 $3,800 先有 6%，但額外回贈上限 $200（即 $3,636 簽賬已爆 cap）。所以簽 $3,800 時，最後 $164 只有 0.55% 基本回贈。"
  },
  {
    question: "Foodpanda / Keeta 用邊張信用卡最抵？",
    answer: "外賣平台通常計入「網上簽賬」，恒生 MMPOWER 有 5%、HSBC Red Card 有 4%。AEON Card Purple 嘅 6% 餐飲回贈唔計外賣 App。建議查閱銀行條款。"
  },
  {
    question: "餐飲信用卡回贈有上限嗎？",
    answer: "大部分高回贈餐飲卡都有上限：建行 eye 加碼賞每月 $400 回贈、AEON Purple 每月 $107 回贈、信銀 Motion 每月 $200 回贈。Citi Cash Back 2%、安信 EarnMORE 2% 無上限。"
  }
];

// 餐飲類別比較
const diningCategories = [
  {
    category: "酒樓/茶餐廳",
    mcc: "5812",
    bestCards: [
      { card: "建行 eye 卡", id: "ccb-eye", rate: "9%+" },
      { card: "AEON Purple", id: "aeon-visa", rate: "6%" },
      { card: "DBS Eminent", id: "dbs-eminent", rate: "5%" },
    ],
    note: "計入餐飲",
  },
  {
    category: "快餐店",
    mcc: "5814",
    bestCards: [
      { card: "建行 eye 卡", id: "ccb-eye", rate: "9%+" },
      { card: "AEON Purple", id: "aeon-visa", rate: "6%" },
      { card: "信銀 Motion", id: "cncbi-motion", rate: "6%" },
    ],
    note: "麥當勞/KFC 等",
  },
  {
    category: "咖啡店",
    mcc: "5814",
    bestCards: [
      { card: "AEON Purple", id: "aeon-visa", rate: "6%" },
      { card: "Citi Cash Back", id: "citi-cashback", rate: "2%" },
    ],
    note: "Starbucks/Pacific Coffee",
  },
  {
    category: "外賣平台",
    mcc: "網上簽賬",
    bestCards: [
      { card: "恒生 MMPOWER", id: "hangseng-mmpower", rate: "5%" },
      { card: "HSBC Red Card", id: "hsbc-red", rate: "4%" },
    ],
    note: "Foodpanda/Keeta（唔計餐飲）",
  },
  {
    category: "酒吧",
    mcc: "5813",
    bestCards: [
      { card: "建行 eye 卡", id: "ccb-eye", rate: "9%+" },
      { card: "HSBC Visa Signature", id: "hsbc-vs", rate: "3.6%" },
    ],
    note: "計入餐飲",
  },
];

// 推薦信用卡
const recommendedCards = [
  {
    card: "建行(亞洲) eye 信用卡",
    id: "ccb-eye",
    rate: "11%",
    cap: "$400/月",
    highlight: "🔥 最高回贈",
    reason: "加碼賞 9% + 拍卡 2%，需每月登記，月簽 $5,000 + 單筆 $300",
    best: "每月餐飲 $3,000-$5,000",
  },
  {
    card: "AEON Card Purple",
    id: "aeon-visa",
    rate: "6%",
    cap: "$107/月",
    highlight: "手機支付",
    reason: "Apple Pay/Google Pay 於食肆簽賬 6%，需 App 登記",
    best: "每月餐飲 < $2,000",
  },
  {
    card: "信銀國際 Motion",
    id: "cncbi-motion",
    rate: "6%",
    cap: "$200/月",
    highlight: "餐飲+網購",
    reason: "食肆及網上簽賬 6%，需月簽 $3,800",
    best: "餐飲 + 網購用戶",
  },
  {
    card: "DBS Eminent Card",
    id: "dbs-eminent",
    rate: "5%",
    cap: "$8,000/月",
    highlight: "上限高",
    reason: "餐飲/運動服飾/健身/醫療 5%，需登記，單筆 $300",
    best: "大額餐飲簽賬",
  },
  {
    card: "Citi Cash Back Card",
    id: "citi-cashback",
    rate: "2%",
    cap: "無上限",
    highlight: "無上限",
    reason: "餐飲 2% 無上限回贈，適合經常食飯",
    best: "爆 Cap 後打底",
  },
];

// 餐飲回贈比較
const cashbackComparison = [
  { card: "建行 eye 卡", id: "ccb-eye", dining: "9%+2%", mobilePay: "需拍卡", cap: "$400/月", annual: "免" },
  { card: "AEON Card Purple", id: "aeon-visa", dining: "6%", mobilePay: "6%", cap: "$107/月", annual: "免" },
  { card: "信銀 Motion", id: "cncbi-motion", dining: "6%", mobilePay: "-", cap: "$200/月", annual: "免" },
  { card: "DBS Eminent", id: "dbs-eminent", dining: "5%", mobilePay: "-", cap: "$400/月", annual: "$1,800" },
  { card: "恒生 Travel+", id: "hangseng-travel-plus", dining: "5%", mobilePay: "-", cap: "$500/月", annual: "$1,800" },
  { card: "HSBC Visa Signature", id: "hsbc-vs", dining: "3.6%", mobilePay: "-", cap: "$360/季", annual: "$2,000" },
  { card: "Citi Cash Back", id: "citi-cashback", dining: "2%", mobilePay: "1%", cap: "無上限", annual: "$1,200" },
  { card: "安信 EarnMORE", id: "earnmore", dining: "2%", mobilePay: "2%", cap: "無上限", annual: "免" },
];

export function DiningGuide() {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      {/* 引言 */}
      <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-6">
        香港人鍾意出街食飯，點解唔用<strong>餐飲信用卡</strong>賺回贈？
        本文教你 <strong>{currentYear} 食飯信用卡攻略</strong>，
        飲茶、食 lunch、飲咖啡都可以賺高達 <strong>9%+ 回贈</strong>！
      </p>

      {/* 目錄 */}
      <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-10">
        <h2 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          📑 本文目錄
        </h2>
        <ul className="space-y-2 text-sm">
          <li><a href="#overview" className="text-blue-600 dark:text-blue-400 hover:underline">1. 餐飲信用卡回贈點計？</a></li>
          <li><a href="#definition" className="text-blue-600 dark:text-blue-400 hover:underline">2. 餐飲簽賬定義（MCC）</a></li>
          <li><a href="#comparison" className="text-blue-600 dark:text-blue-400 hover:underline">3. 餐飲信用卡回贈比較表</a></li>
          <li><a href="#categories" className="text-blue-600 dark:text-blue-400 hover:underline">4. 各類餐飲最佳信用卡</a></li>
          <li><a href="#mobile-pay" className="text-blue-600 dark:text-blue-400 hover:underline">5. Apple Pay 食飯攻略</a></li>
          <li><a href="#delivery" className="text-blue-600 dark:text-blue-400 hover:underline">6. 外賣平台信用卡攻略</a></li>
          <li><a href="#best-cards" className="text-blue-600 dark:text-blue-400 hover:underline">7. 餐飲信用卡推薦</a></li>
          <li><a href="#combo" className="text-blue-600 dark:text-blue-400 hover:underline">8. 餐飲信用卡組合建議</a></li>
          <li><a href="#tips" className="text-blue-600 dark:text-blue-400 hover:underline">9. 食飯慳錢貼士</a></li>
          <li><a href="#faq" className="text-blue-600 dark:text-blue-400 hover:underline">10. 常見問題 FAQ</a></li>
        </ul>
      </div>

      {/* Section 1: 總覽 */}
      <section id="overview" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <UtensilsCrossed className="h-6 w-6 text-orange-500" />
          1. 餐飲信用卡回贈點計？
        </h2>
        
        <p>
          <strong>餐飲信用卡回贈</strong>通常比一般簽賬更高，
          最高可達 <strong>9%+</strong>！以每月食飯 $3,000 為例：
        </p>

        <div className="not-prose bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-2xl p-5 border border-orange-200 dark:border-orange-800 my-6">
          <h4 className="font-bold text-orange-800 dark:text-orange-200 mb-3">💰 餐飲回贈例子（每月 $3,000）</h4>
          <div className="grid md:grid-cols-4 gap-3">
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 text-center">
              <p className="text-sm text-gray-500">建行eye 9%+</p>
              <p className="text-xl font-bold text-orange-600">$270+/月</p>
              <p className="text-xs text-gray-400">需登記</p>
            </div>
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 text-center">
              <p className="text-sm text-gray-500">AEON Purple 6%</p>
              <p className="text-xl font-bold text-orange-600">$107/月</p>
              <p className="text-xs text-gray-400">上限$107</p>
            </div>
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 text-center">
              <p className="text-sm text-gray-500">信銀Motion 6%</p>
              <p className="text-xl font-bold text-orange-600">$180/月</p>
              <p className="text-xs text-gray-400">月簽$3,800</p>
            </div>
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 text-center">
              <p className="text-sm text-gray-500">Citi Cash Back 2%</p>
              <p className="text-xl font-bold text-orange-600">$60/月</p>
              <p className="text-xs text-gray-400">無上限</p>
            </div>
          </div>
          <p className="text-orange-700 dark:text-orange-300 text-sm mt-3">
            一年食飯 $36,000，用 9% 回贈可賺 <strong>$3,240</strong>！
          </p>
        </div>
      </section>

      {/* Section 2: 定義 */}
      <section id="definition" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Info className="h-6 w-6 text-purple-500" />
          2. 餐飲簽賬定義（MCC）
        </h2>

        <p>
          銀行用 <strong>MCC（商戶類別代碼）</strong>判斷簽賬類別：
        </p>

        <div className="not-prose space-y-3 my-6">
          <div className="flex items-start gap-3 bg-green-50 dark:bg-green-900/20 rounded-xl p-4">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">✅ 計入餐飲（MCC 5812/5813/5814）</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                酒樓、茶餐廳、餐廳、快餐店（麥當勞、KFC）、咖啡店（Starbucks）、酒吧
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4">
            <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">⚠️ 可能唔計入餐飲</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                便利店（7-11、OK）、超市熟食部、酒店餐廳（可能計入酒店類）
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
            <Info className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">📱 外賣平台分類</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Foodpanda、Keeta 通常計入「網上簽賬」而非餐飲，但部分銀行例外
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: 比較表 */}
      <section id="comparison" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Percent className="h-6 w-6 text-indigo-500" />
          3. 餐飲信用卡回贈比較表
        </h2>

        <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden my-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-orange-50 dark:bg-orange-900/20">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-orange-600 dark:text-orange-400">信用卡</th>
                  <th className="px-4 py-3 text-center font-medium text-orange-600 dark:text-orange-400">餐飲回贈</th>
                  <th className="px-4 py-3 text-center font-medium text-orange-600 dark:text-orange-400">手機支付</th>
                  <th className="px-4 py-3 text-center font-medium text-orange-600 dark:text-orange-400">每月上限</th>
                  <th className="px-4 py-3 text-center font-medium text-orange-600 dark:text-orange-400">年費</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {cashbackComparison.map((card, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3">
                      <CardTableCell id={card.id} />
                    </td>
                    <td className="px-4 py-3 text-center font-bold text-orange-600 dark:text-orange-400">{card.dining}</td>
                    <td className="px-4 py-3 text-center text-gray-600 dark:text-gray-400">{card.mobilePay}</td>
                    <td className="px-4 py-3 text-center text-gray-600 dark:text-gray-400">{card.cap}</td>
                    <td className="px-4 py-3 text-center text-gray-600 dark:text-gray-400">{card.annual}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section 4: 各類餐飲 */}
      <section id="categories" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Store className="h-6 w-6 text-teal-500" />
          4. 各類餐飲最佳信用卡
        </h2>

        <p>
          唔同餐飲類別可能有唔同 MCC，以下係各類餐飲<strong>最佳信用卡</strong>：
        </p>

        <div className="not-prose space-y-4 my-6">
          {diningCategories.map((cat, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">{cat.category}</h4>
                  <p className="text-xs text-gray-500">MCC: {cat.mcc}</p>
                </div>
                <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-gray-600 dark:text-gray-400">
                  {cat.note}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.bestCards.map((card, i) => (
                  <CardBadgeWithImage key={i} id={card.id} rate={card.rate} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 5: Apple Pay */}
      <section id="mobile-pay" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Smartphone className="h-6 w-6 text-pink-500" />
          5. Apple Pay 食飯攻略
        </h2>

        <p>
          用 <strong>Apple Pay</strong> 或 <strong>Google Pay</strong> 食飯，
          部分信用卡有額外回贈：
        </p>

        <div className="not-prose grid md:grid-cols-2 gap-4 my-6">
          <div className="bg-gray-900 dark:bg-gray-800 rounded-xl p-4 text-white">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-black text-lg"></span>
              </div>
              <h4 className="font-bold">Apple Pay 餐飲回贈</h4>
            </div>
            <ul className="text-gray-300 text-sm space-y-2">
              <li className="flex justify-between">
                <Link href="/cards/earnmore" className="text-blue-400 hover:underline">安信 EarnMORE</Link>
                <span className="font-bold text-green-400">2% 無上限</span>
              </li>
              <li className="flex justify-between">
                <Link href="/cards/hangseng-mmpower" className="text-blue-400 hover:underline">恒生 MMPOWER</Link>
                <span className="font-bold text-green-400">5% 有上限</span>
              </li>
              <li className="flex justify-between">
                <Link href="/cards/sc-simply-cash" className="text-blue-400 hover:underline">Simply Cash</Link>
                <span>1.5% 無上限</span>
              </li>
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-3">
              <UtensilsCrossed className="h-6 w-6 text-orange-500" />
              <h4 className="font-bold text-gray-900 dark:text-white">建議策略</h4>
            </div>
            <ul className="text-gray-600 dark:text-gray-300 text-sm space-y-2">
              <li>• 餐廳有感應式付款就用 Apple Pay</li>
              <li>• <Link href="/cards/earnmore" className="text-blue-600 hover:underline">EarnMORE</Link> 2% 無上限最穩陣</li>
              <li>• <Link href="/cards/hangseng-mmpower" className="text-blue-600 hover:underline">MMPOWER</Link> 5% 用完再轉卡</li>
              <li>• 唔接受手機支付就用 <Link href="/cards/citi-cashback" className="text-blue-600 hover:underline">Citi Cash Back</Link></li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 6: 外賣 */}
      <section id="delivery" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <MapPin className="h-6 w-6 text-red-500" />
          6. 外賣平台信用卡攻略
        </h2>

        <p>
          <strong>Foodpanda</strong>、<strong>Keeta</strong> 等外賣平台通常計入「網上簽賬」：
        </p>

        <div className="not-prose grid md:grid-cols-2 gap-4 my-6">
          <div className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 rounded-xl p-4 border border-pink-200 dark:border-pink-800">
            <h4 className="font-bold text-pink-800 dark:text-pink-200 mb-3 flex items-center gap-2">
              <span className="text-2xl">🐼</span> Foodpanda
            </h4>
            <ul className="text-pink-700 dark:text-pink-300 text-sm space-y-1">
              <li>• <Link href="/cards/hangseng-mmpower" className="text-blue-600 hover:underline">MMPOWER</Link>：<strong>5%</strong> 網購回贈</li>
              <li>• <Link href="/cards/hsbc-red" className="text-blue-600 hover:underline">Red Card</Link>：<strong>4%</strong> 網購回贈</li>
              <li>• 可用信用卡直接付款</li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-xl p-4 border border-orange-200 dark:border-orange-800">
            <h4 className="font-bold text-orange-800 dark:text-orange-200 mb-3 flex items-center gap-2">
              <span className="text-2xl">🛵</span> Keeta
            </h4>
            <ul className="text-orange-700 dark:text-orange-300 text-sm space-y-1">
              <li>• <Link href="/cards/hangseng-mmpower" className="text-blue-600 hover:underline">MMPOWER</Link>：<strong>5%</strong> 網購回贈</li>
              <li>• <Link href="/cards/hsbc-red" className="text-blue-600 hover:underline">Red Card</Link>：<strong>4%</strong> 網購回贈</li>
              <li>• 經常有平台優惠券</li>
            </ul>
          </div>
        </div>

        <div className="not-prose bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <p className="text-blue-700 dark:text-blue-300 text-sm">
              <strong>提示：</strong>外賣平台通常計入「網上簽賬」而非「餐飲」，
              所以用 <Link href="/cards/hangseng-mmpower" className="text-blue-600 hover:underline">MMPOWER</Link> 或 <Link href="/cards/hsbc-red" className="text-blue-600 hover:underline">Red Card</Link> 會比 <Link href="/cards/hsbc-vs" className="text-blue-600 hover:underline">Visa Signature</Link> 更著數！
            </p>
          </div>
        </div>
      </section>

      {/* Section 7: 推薦信用卡 */}
      <section id="best-cards" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Trophy className="h-6 w-6 text-amber-500" />
          7. 餐飲信用卡推薦
        </h2>

        <p>
          以下係<strong>食飯信用卡 {currentYear}</strong> 推薦：
        </p>

        <div className="not-prose space-y-4 my-6">
          {recommendedCards.map((card, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-4">
              <div className="flex items-start gap-4">
                {/* 排名 + 卡面圖片 */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-xl">{["🥇", "🥈", "🥉", "4️⃣", "5️⃣"][index]}</span>
                  <CardLinkWithImage id={card.id} showRate={false} size="md" />
                </div>
                {/* 卡資訊 */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400">
                      {card.highlight}
                    </span>
                    <span className="text-lg font-bold text-orange-600 dark:text-orange-400">{card.rate}</span>
                    <span className="text-xs text-gray-500">{card.cap}</span>
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
        title="📌 餐飲推薦信用卡一覽"
        subtitle="點擊查看詳細回贈條款及申請連結"
        cards={[
          { id: "ccb-eye", highlight: "餐飲 9%+" },
          { id: "aeon-visa", highlight: "餐飲 6% (手機支付)" },
          { id: "cncbi-motion", highlight: "餐飲 6%" },
          { id: "dbs-eminent", highlight: "餐飲 5%" },
          { id: "citi-cashback", highlight: "餐飲 2% 無上限" },
        ]}
      />

      {/* Section 8: 組合建議 */}
      <section id="combo" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Coffee className="h-6 w-6 text-brown-500" />
          8. 餐飲信用卡組合建議
        </h2>

        <div className="not-prose space-y-4 my-6">
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-xl p-4 border border-orange-200 dark:border-orange-800">
            <h4 className="font-bold text-orange-800 dark:text-orange-200 mb-3">🔥 最高回贈組合（需登記）</h4>
            <div className="grid md:grid-cols-3 gap-3">
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
                <Link href="/cards/ccb-eye" className="font-medium text-blue-600 hover:underline text-sm">建行 eye 卡</Link>
                <p className="text-xs text-gray-500">餐飲 9%+（首 $4,445 爆 cap）</p>
              </div>
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
                <Link href="/cards/aeon-visa" className="font-medium text-blue-600 hover:underline text-sm">AEON Purple</Link>
                <p className="text-xs text-gray-500">餐飲 6%（首 $1,786 爆 cap）</p>
              </div>
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
                <Link href="/cards/citi-cashback" className="font-medium text-blue-600 hover:underline text-sm">Citi Cash Back</Link>
                <p className="text-xs text-gray-500">餐飲 2% 無上限打底</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4 border border-green-200 dark:border-green-800">
            <h4 className="font-bold text-green-800 dark:text-green-200 mb-3">💡 簡單無腦組合</h4>
            <div className="grid md:grid-cols-2 gap-3">
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
                <Link href="/cards/citi-cashback" className="font-medium text-blue-600 hover:underline text-sm">Citi Cash Back</Link>
                <p className="text-xs text-gray-500">餐飲 2% 無上限，無門檻</p>
              </div>
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
                <Link href="/cards/earnmore" className="font-medium text-blue-600 hover:underline text-sm">安信 EarnMORE</Link>
                <p className="text-xs text-gray-500">全方位 2% 無上限</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 rounded-xl p-4 border border-pink-200 dark:border-pink-800">
            <h4 className="font-bold text-pink-800 dark:text-pink-200 mb-3">🛵 外賣控組合</h4>
            <div className="grid md:grid-cols-2 gap-3">
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
                <Link href="/cards/hangseng-mmpower" className="font-medium text-blue-600 hover:underline text-sm">恒生 MMPOWER</Link>
                <p className="text-xs text-gray-500">網購/外賣 5%（有上限）</p>
              </div>
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
                <Link href="/cards/hsbc-red" className="font-medium text-blue-600 hover:underline text-sm">HSBC Red Card</Link>
                <p className="text-xs text-gray-500">網購 4%（爆 Cap 後用）</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 9: 貼士 */}
      <section id="tips" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Zap className="h-6 w-6 text-yellow-500" />
          9. 食飯慳錢貼士
        </h2>

        <div className="not-prose space-y-3">
          {[
            { icon: "💳", title: "識揀卡食飯", desc: "餐廳用 HSBC VS 3.6%、手機支付用 EarnMORE 2%" },
            { icon: "📱", title: "善用 Apple Pay", desc: "大部分餐廳都支援感應式付款，可賺額外回贈" },
            { icon: "🛵", title: "外賣用網購卡", desc: "Foodpanda、Keeta 計入網上簽賬，用 MMPOWER 5%" },
            { icon: "📊", title: "留意回贈上限", desc: "爆 Cap 後轉用無上限卡（Citi、EarnMORE）" },
            { icon: "🎁", title: "配合餐廳優惠", desc: "信用卡回贈 + 餐廳會員優惠可以疊加" },
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
          {diningFaqData.map((faq, index) => (
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
        <h3 className="text-xl font-bold mb-2">💳 想知邊張信用卡最適合你嘅飲食習慣？</h3>
        <p className="mb-4 opacity-90">用我哋嘅計算機，輸入你嘅消費類別，即刻搵到最高回贈嘅信用卡！</p>
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
          <Link href="/blog/best-dining-cards" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
            <Trophy className="h-5 w-5 text-emerald-600" />
            <span>餐飲信用卡排行榜</span>
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

