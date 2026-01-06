// 網購信用卡攻略
// 用於 /discover/online-shopping-guide 頁面

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  ChevronRight, ChevronDown, CreditCard, ShoppingCart, Globe,
  Calculator, Trophy, DollarSign, CheckCircle, AlertTriangle,
  Star, Smartphone, Info, Zap, Package, Store, Percent
} from "lucide-react";
import { CardPreviewSection } from "@/app/discover/components/card-preview-section";

// FAQ 數據
export const onlineShoppingFaqData = [
  {
    question: "網上簽賬信用卡邊張回贈最高？",
    answer: "恒生 MMPOWER 網購有 5% 回贈（每月上限 $200）、HSBC Red Card 網購有 4% 回贈（有上限）。如果想無上限回贈，渣打 Simply Cash 有 1.5%、安信 EarnMORE 有 2%（需 Mobile Pay）。"
  },
  {
    question: "網上簽賬定義係咩？",
    answer: "網上簽賬一般指透過網站或 App 輸入信用卡資料付款。Apple Pay、Google Pay 網上付款通常都計入網上簽賬。但部分銀行對「網上簽賬」有特定定義，如需在指定商戶類別才計入。"
  },
  {
    question: "外幣網購有額外手續費嗎？",
    answer: "有！外幣網購通常有 1.95% 外幣手續費 + 1% CBF 跨境手續費（視乎銀行）。建議用免外幣手續費嘅信用卡，或用港幣結算（但可能有 DCC 陷阱）。"
  },
  {
    question: "網購用 Apple Pay 有回贈嗎？",
    answer: "有！Apple Pay 網上付款通常計入「網上簽賬」類別。恒生 MMPOWER 有 5%、HSBC Red Card 有 4%。部分信用卡有 Mobile Pay 額外回贈，如安信 EarnMORE 用 Apple Pay 有 2%。"
  },
  {
    question: "淘寶/天貓用邊張信用卡最抵？",
    answer: "淘寶/天貓可用 AlipayHK 付款，渣打 Simply Cash 有 1.5% 回贈。或直接用信用卡付款，但可能有外幣手續費。中銀淘寶卡有淘寶專屬優惠。"
  },
  {
    question: "HKTVmall 用邊張信用卡最抵？",
    answer: "HKTVmall 可用恒生 MMPOWER 賺 5% 網購回贈、HSBC Red Card 賺 4%。部分銀行有 HKTVmall 專屬優惠，如額外積分或折扣。"
  },
  {
    question: "Amazon 用邊張信用卡最抵？",
    answer: "Amazon 係外幣網購，要留意外幣手續費。建議用免外幣手續費嘅信用卡（如 SC Smart Card），或高回贈卡（如 Simply Cash 海外 2%）扣除手續費後計算。"
  },
  {
    question: "網購信用卡回贈有上限嗎？",
    answer: "大部分網購高回贈信用卡都有上限：HSBC Red Card 每月 $10,000 簽賬（即 $400 回贈）、恒生 MMPOWER 每月 $200 回贈。渣打 Simply Cash 1.5% 無上限、安信 EarnMORE 2% 無上限。"
  }
];

// 網購平台比較
const onlinePlatforms = [
  {
    platform: "HKTVmall",
    category: "本地網購",
    currency: "HKD",
    bestCards: [
      { card: "恒生 MMPOWER", id: "hangseng-mmpower", rate: "5%" },
      { card: "HSBC Red Card", id: "hsbc-red", rate: "4%" },
    ],
    note: "計入網上簽賬",
  },
  {
    platform: "淘寶 / 天貓",
    category: "跨境網購",
    currency: "CNY",
    bestCards: [
      { card: "中銀淘寶卡", id: "boc-taobao", rate: "專屬優惠" },
      { card: "渣打 Simply Cash", id: "sc-simply-cash", rate: "1.5%" },
    ],
    note: "可用 AlipayHK 付款",
  },
  {
    platform: "Amazon",
    category: "外幣網購",
    currency: "USD",
    bestCards: [
      { card: "渣打 Simply Cash", id: "sc-simply-cash", rate: "2% 海外" },
      { card: "SC Smart Card", id: "sc-smart", rate: "免手續費" },
    ],
    note: "有外幣手續費",
  },
  {
    platform: "Apple Store",
    category: "本地/跨境",
    currency: "HKD",
    bestCards: [
      { card: "恒生 MMPOWER", id: "hangseng-mmpower", rate: "5%" },
      { card: "HSBC Red Card", id: "hsbc-red", rate: "4%" },
    ],
    note: "港幣計價但可能有 CBF",
  },
  {
    platform: "Netflix / Spotify",
    category: "訂閱服務",
    currency: "HKD（跨境）",
    bestCards: [
      { card: "中銀卡", id: "boc-cheers", rate: "免 CBF" },
      { card: "東亞卡", id: "bea-world-mastercard", rate: "免 CBF" },
    ],
    note: "部分銀行收 CBF",
  },
];

// 推薦信用卡
const recommendedCards = [
  {
    card: "恒生 MMPOWER World",
    id: "hangseng-mmpower",
    rate: "5%",
    cap: "$200/月",
    highlight: "網購最強",
    reason: "網購及 Mobile Pay 簽賬 5% 回贈，年費易 waive",
    best: "HKTVmall、網上購物",
  },
  {
    card: "HSBC Red Card",
    id: "hsbc-red",
    rate: "4%",
    cap: "$400/月",
    highlight: "免年費",
    reason: "網購 4% 回贈，超市 2%，免年費",
    best: "日常網購、超市",
  },
  {
    card: "渣打 Simply Cash Visa",
    id: "sc-simply-cash",
    rate: "1.5%",
    cap: "無上限",
    highlight: "無上限",
    reason: "1.5% 無上限回贈，海外 2%，永久免年費",
    best: "大額網購、海外網購",
  },
  {
    card: "安信 EarnMORE 銀聯卡",
    id: "earnmore",
    rate: "2%",
    cap: "無上限",
    highlight: "Mobile Pay",
    reason: "Apple Pay / Google Pay 網上付款 2% 無上限",
    best: "Apple Pay 網購",
  },
  {
    card: "Citi Cash Back Card",
    id: "citi-cashback",
    rate: "1%",
    cap: "無上限",
    highlight: "本地簽賬",
    reason: "本地簽賬 1% 無上限，海外 2%",
    best: "本地網購打底",
  },
];

// 網購回贈比較
const cashbackComparison = [
  { card: "恒生 MMPOWER", id: "hangseng-mmpower", online: "5%", mobilePay: "5%", cap: "$200/月", annual: "$300" },
  { card: "HSBC Red Card", id: "hsbc-red", online: "4%", mobilePay: "4%", cap: "$400/月", annual: "免" },
  { card: "Simply Cash", id: "sc-simply-cash", online: "1.5%", mobilePay: "1.5%", cap: "無上限", annual: "免" },
  { card: "EarnMORE", id: "earnmore", online: "2%", mobilePay: "2%", cap: "無上限", annual: "免" },
  { card: "Citi Cash Back", id: "citi-cashback", online: "1%", mobilePay: "1%", cap: "無上限", annual: "$1,200" },
];

export function OnlineShoppingGuide() {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      {/* 引言 */}
      <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-6">
        網購已經成為生活一部分，點解唔用<strong>網購信用卡</strong>賺回贈？
        本文教你 <strong>{currentYear} 網上簽賬信用卡攻略</strong>，
        <strong>HKTVmall</strong>、<strong>淘寶</strong>、<strong>Amazon</strong> 都可以賺高達 <strong>5% 回贈</strong>！
      </p>

      {/* 目錄 */}
      <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-10">
        <h2 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          📑 本文目錄
        </h2>
        <ul className="space-y-2 text-sm">
          <li><a href="#overview" className="text-blue-600 dark:text-blue-400 hover:underline">1. 網購信用卡回贈點計？</a></li>
          <li><a href="#definition" className="text-blue-600 dark:text-blue-400 hover:underline">2. 網上簽賬定義</a></li>
          <li><a href="#comparison" className="text-blue-600 dark:text-blue-400 hover:underline">3. 網購信用卡回贈比較表</a></li>
          <li><a href="#platforms" className="text-blue-600 dark:text-blue-400 hover:underline">4. 各大網購平台最佳信用卡</a></li>
          <li><a href="#foreign" className="text-blue-600 dark:text-blue-400 hover:underline">5. 外幣網購注意事項</a></li>
          <li><a href="#mobile-pay" className="text-blue-600 dark:text-blue-400 hover:underline">6. Apple Pay / Google Pay 網購</a></li>
          <li><a href="#best-cards" className="text-blue-600 dark:text-blue-400 hover:underline">7. 網購信用卡推薦</a></li>
          <li><a href="#combo" className="text-blue-600 dark:text-blue-400 hover:underline">8. 網購信用卡組合建議</a></li>
          <li><a href="#tips" className="text-blue-600 dark:text-blue-400 hover:underline">9. 網購慳錢貼士</a></li>
          <li><a href="#faq" className="text-blue-600 dark:text-blue-400 hover:underline">10. 常見問題 FAQ</a></li>
        </ul>
      </div>

      {/* Section 1: 總覽 */}
      <section id="overview" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <ShoppingCart className="h-6 w-6 text-blue-500" />
          1. 網購信用卡回贈點計？
        </h2>
        
        <p>
          <strong>網購信用卡回贈</strong>通常比一般簽賬更高，
          最高可達 <strong>5%</strong>！以每月網購 $5,000 為例：
        </p>

        <div className="not-prose bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-5 border border-green-200 dark:border-green-800 my-6">
          <h4 className="font-bold text-green-800 dark:text-green-200 mb-3">💰 網購回贈例子（每月 $5,000）</h4>
          <div className="grid md:grid-cols-3 gap-3">
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 text-center">
              <p className="text-sm text-gray-500">MMPOWER 5%</p>
              <p className="text-xl font-bold text-green-600">$200/月*</p>
              <p className="text-xs text-gray-400">*有上限</p>
            </div>
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 text-center">
              <p className="text-sm text-gray-500">Red Card 4%</p>
              <p className="text-xl font-bold text-green-600">$200/月</p>
              <p className="text-xs text-gray-400">有上限</p>
            </div>
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 text-center">
              <p className="text-sm text-gray-500">Simply Cash 1.5%</p>
              <p className="text-xl font-bold text-green-600">$75/月</p>
              <p className="text-xs text-gray-400">無上限</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: 定義 */}
      <section id="definition" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Info className="h-6 w-6 text-purple-500" />
          2. 網上簽賬定義
        </h2>

        <p>
          唔同銀行對<strong>網上簽賬定義</strong>可能有分別：
        </p>

        <div className="not-prose space-y-3 my-6">
          <div className="flex items-start gap-3 bg-green-50 dark:bg-green-900/20 rounded-xl p-4">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">一般計入網上簽賬</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                網站輸入卡號付款、App 內購買、Apple Pay / Google Pay 網上付款
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4">
            <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">可能唔計網上簽賬</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                繳費（水電煤）、保險、政府服務、禮品卡購買
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-red-50 dark:bg-red-900/20 rounded-xl p-4">
            <Info className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">需留意銀行條款</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                部分銀行只計指定商戶類別（MCC），建議查閱信用卡條款
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: 比較表 */}
      <section id="comparison" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Percent className="h-6 w-6 text-indigo-500" />
          3. 網購信用卡回贈比較表
        </h2>

        <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden my-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-indigo-50 dark:bg-indigo-900/20">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-indigo-600 dark:text-indigo-400">信用卡</th>
                  <th className="px-4 py-3 text-center font-medium text-indigo-600 dark:text-indigo-400">網購回贈</th>
                  <th className="px-4 py-3 text-center font-medium text-indigo-600 dark:text-indigo-400">Mobile Pay</th>
                  <th className="px-4 py-3 text-center font-medium text-indigo-600 dark:text-indigo-400">每月上限</th>
                  <th className="px-4 py-3 text-center font-medium text-indigo-600 dark:text-indigo-400">年費</th>
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
                    <td className="px-4 py-3 text-center font-bold text-green-600 dark:text-green-400">{card.online}</td>
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

      {/* Section 4: 各平台 */}
      <section id="platforms" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Store className="h-6 w-6 text-orange-500" />
          4. 各大網購平台最佳信用卡
        </h2>

        <p>
          唔同網購平台有唔同特性，以下係各平台<strong>最佳信用卡</strong>推薦：
        </p>

        <div className="not-prose space-y-4 my-6">
          {onlinePlatforms.map((platform, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">{platform.platform}</h4>
                  <p className="text-xs text-gray-500">{platform.category} • {platform.currency}</p>
                </div>
                <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-gray-600 dark:text-gray-400">
                  {platform.note}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {platform.bestCards.map((card, i) => (
                  <Link 
                    key={i} 
                    href={`/cards/${card.id}`}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 dark:bg-blue-900/20 rounded-full text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
                  >
                    <CreditCard className="h-3 w-3" />
                    {card.card}
                    <span className="font-bold">{card.rate}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 5: 外幣網購 */}
      <section id="foreign" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Globe className="h-6 w-6 text-teal-500" />
          5. 外幣網購注意事項
        </h2>

        <p>
          <strong>外幣網購</strong>（如 Amazon、eBay）要留意額外手續費：
        </p>

        <div className="not-prose bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 my-6">
          <h4 className="font-bold text-red-800 dark:text-red-200 mb-2">⚠️ 外幣網購手續費</h4>
          <ul className="text-red-700 dark:text-red-300 text-sm space-y-1">
            <li>• <strong>外幣手續費 (FX Fee)</strong>：約 1.95%</li>
            <li>• <strong>跨境手續費 (CBF)</strong>：約 1%（部分銀行）</li>
            <li>• <strong>合共可達 2.95%</strong>，會蝕過回贈！</li>
          </ul>
        </div>

        <div className="not-prose bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
          <h4 className="font-bold text-green-800 dark:text-green-200 mb-2">✅ 外幣網購推薦信用卡</h4>
          <ul className="text-green-700 dark:text-green-300 text-sm space-y-1">
            <li>• <Link href="/cards/sc-smart" className="text-blue-600 hover:underline font-medium">SC Smart Card</Link>：<strong>免外幣手續費</strong></li>
            <li>• <Link href="/cards/sc-simply-cash" className="text-blue-600 hover:underline font-medium">渣打 Simply Cash</Link>：海外 <strong>2% 回贈</strong>（扣除手續費後微賺）</li>
            <li>• <Link href="/cards/boc-cheers" className="text-blue-600 hover:underline font-medium">中銀卡</Link>：<strong>免 CBF</strong></li>
          </ul>
        </div>
      </section>

      {/* Section 6: Mobile Pay */}
      <section id="mobile-pay" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Smartphone className="h-6 w-6 text-pink-500" />
          6. Apple Pay / Google Pay 網購
        </h2>

        <p>
          <strong>Apple Pay</strong>、<strong>Google Pay</strong> 網上付款通常計入網上簽賬，
          部分信用卡有額外 Mobile Pay 回贈：
        </p>

        <div className="not-prose grid md:grid-cols-2 gap-4 my-6">
          <div className="bg-gray-900 dark:bg-gray-800 rounded-xl p-4 text-white">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-black text-lg"></span>
              </div>
              <h4 className="font-bold">Apple Pay 網購</h4>
            </div>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• <Link href="/cards/earnmore" className="text-blue-400 hover:underline">EarnMORE</Link>：2% 無上限</li>
              <li>• <Link href="/cards/hangseng-mmpower" className="text-blue-400 hover:underline">MMPOWER</Link>：5% 有上限</li>
              <li>• 適合 Safari、App Store</li>
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 via-green-500 to-yellow-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg font-bold">G</span>
              </div>
              <h4 className="font-bold text-gray-900 dark:text-white">Google Pay 網購</h4>
            </div>
            <ul className="text-gray-600 dark:text-gray-300 text-sm space-y-1">
              <li>• <Link href="/cards/earnmore" className="text-blue-600 hover:underline">EarnMORE</Link>：2% 無上限</li>
              <li>• <Link href="/cards/hangseng-mmpower" className="text-blue-600 hover:underline">MMPOWER</Link>：5% 有上限</li>
              <li>• 適合 Chrome、Play Store</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 7: 推薦信用卡 */}
      <section id="best-cards" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Trophy className="h-6 w-6 text-amber-500" />
          7. 網購信用卡推薦
        </h2>

        <p>
          以下係<strong>網購信用卡 {currentYear}</strong> 推薦：
        </p>

        <div className="not-prose space-y-4 my-6">
          {recommendedCards.map((card, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xl mr-2">{["🥇", "🥈", "🥉", "4️⃣", "5️⃣"][index]}</span>
                  <Link href={`/cards/${card.id}`} className="font-bold text-blue-600 hover:underline dark:text-blue-400">{card.card}</Link>
                  <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
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
        title="📌 網購推薦信用卡一覽"
        subtitle="點擊查看詳細回贈條款及申請連結"
        cards={[
          { id: "hangseng-mmpower", highlight: "網購 5%" },
          { id: "hsbc-red", highlight: "網購 4%" },
          { id: "sc-simply-cash", highlight: "無上限" },
          { id: "earnmore", highlight: "Mobile Pay" },
        ]}
      />

      {/* Section 8: 組合建議 */}
      <section id="combo" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Package className="h-6 w-6 text-violet-500" />
          8. 網購信用卡組合建議
        </h2>

        <div className="not-prose space-y-4 my-6">
          <div className="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 rounded-xl p-4 border border-violet-200 dark:border-violet-800">
            <h4 className="font-bold text-violet-800 dark:text-violet-200 mb-3">🎯 網購狂人組合</h4>
            <div className="grid md:grid-cols-3 gap-3">
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
                <Link href="/cards/hangseng-mmpower" className="font-medium text-blue-600 hover:underline text-sm">恒生 MMPOWER</Link>
                <p className="text-xs text-gray-500">網購 5%（每月首 $200 回贈）</p>
              </div>
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
                <Link href="/cards/hsbc-red" className="font-medium text-blue-600 hover:underline text-sm">HSBC Red Card</Link>
                <p className="text-xs text-gray-500">網購 4%（爆 Cap 後用）</p>
              </div>
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
                <Link href="/cards/sc-simply-cash" className="font-medium text-blue-600 hover:underline text-sm">渣打 Simply Cash</Link>
                <p className="text-xs text-gray-500">1.5% 無上限打底</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
            <h4 className="font-bold text-blue-800 dark:text-blue-200 mb-3">🌍 跨境網購組合</h4>
            <div className="grid md:grid-cols-2 gap-3">
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
                <Link href="/cards/sc-smart" className="font-medium text-blue-600 hover:underline text-sm">SC Smart Card</Link>
                <p className="text-xs text-gray-500">免外幣手續費</p>
              </div>
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
                <Link href="/cards/boc-taobao" className="font-medium text-blue-600 hover:underline text-sm">中銀淘寶卡</Link>
                <p className="text-xs text-gray-500">淘寶專屬優惠</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 9: 貼士 */}
      <section id="tips" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Zap className="h-6 w-6 text-yellow-500" />
          9. 網購慳錢貼士
        </h2>

        <div className="not-prose space-y-3">
          {[
            { icon: "💳", title: "用高回贈卡網購", desc: "MMPOWER 5%、Red Card 4%，唔好浪費" },
            { icon: "📊", title: "留意回贈上限", desc: "爆 Cap 後轉用 Simply Cash 1.5% 無上限" },
            { icon: "🌍", title: "外幣網購要計數", desc: "手續費 2.95% 可能蝕過回贈" },
            { icon: "📱", title: "善用 Apple Pay", desc: "EarnMORE 用 Apple Pay 有 2% 無上限" },
            { icon: "🎁", title: "留意限時優惠", desc: "銀行不時有網購額外回贈推廣" },
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
          {onlineShoppingFaqData.map((faq, index) => (
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
        <h3 className="text-xl font-bold mb-2">💳 想知邊張信用卡最適合你嘅網購習慣？</h3>
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
          <Link href="/discover/best-cashback-cards" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
            <DollarSign className="h-5 w-5 text-emerald-600" />
            <span>最高回贈信用卡比較</span>
            <ChevronRight className="h-4 w-4 ml-auto text-gray-400" />
          </Link>
          <Link href="/blog/best-online-shopping-cards" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
            <Trophy className="h-5 w-5 text-emerald-600" />
            <span>網購信用卡排行榜</span>
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

