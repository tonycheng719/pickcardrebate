// 信用卡繳費攻略
// 用於 /discover/utility-bill-guide 頁面

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  ChevronRight, ChevronDown, CreditCard, Zap, Droplets, Flame,
  Home, Phone, Receipt, Calculator, Trophy, DollarSign,
  CheckCircle, AlertTriangle, Star, Smartphone, Building
} from "lucide-react";
import { CardPreviewSection, RECOMMENDED_CARDS } from "@/app/discover/components/card-preview-section";

// FAQ 數據
export const utilityBillFaqData = [
  {
    question: "交水電煤用邊張信用卡最抵？",
    answer: "網上繳費信用卡回贈最高有：渣打 Simply Cash（1.5% 無上限）、安信 EarnMORE（2% 需 Apple Pay）、中銀雙幣卡（繳費 0.4%）。如果用 AlipayHK 或雲閃付繳費，可以用 Citi Cash Back 或 HSBC Red Card 賺更高回贈。"
  },
  {
    question: "信用卡交差餉有回贈嗎？",
    answer: "有！透過 AlipayHK 或 BoC Pay 交差餉，可以用信用卡付款賺回贈。渣打 Simply Cash 有 1.5%、部分銀行有額外優惠。注意：直接用信用卡交差餉（政府 PPS）可能無回贈或需要手續費。"
  },
  {
    question: "交管理費用信用卡有回贈嗎？",
    answer: "視乎管理公司接受咩付款方式。如果接受信用卡直接付款，可賺回贈；如果只接受 EPS/銀行轉賬，可考慮用 PayMe 或 AlipayHK 繳費（如有此選項）再用信用卡增值。"
  },
  {
    question: "網上繳費信用卡回贈點計？",
    answer: "網上繳費通常計入「網上簽賬」類別。HSBC Red Card 網上繳費有 4% 回贈（限本地商戶）；恒生 MMPOWER 網上繳費 5%（有上限）；渣打 Simply Cash 1.5% 無上限。"
  },
  {
    question: "交電話費用信用卡有回贈嗎？",
    answer: "有！電話費月費可透過信用卡自動轉賬繳付，算「網上繳費」類別。HSBC Red 有 4%、恒生 MMPOWER 有 5%。注意：儲值卡增值可能唔計回贈。"
  },
  {
    question: "用 AlipayHK 交水電煤有回贈嗎？",
    answer: "有！用 AlipayHK 綁定信用卡交水電煤，信用卡會計入「網上簽賬」。Citi Cash Back 有 1%、HSBC Red 有 4%（如 AlipayHK 計入網購）。留意部分銀行可能唔計回贈。"
  },
  {
    question: "交煤氣費用信用卡最抵？",
    answer: "煤氣公司接受信用卡繳費，算「繳費」類別。渣打 Simply Cash 1.5%、安信 EarnMORE 2%（Apple Pay）較抵。或透過 BoC Pay 繳費賺中銀回贈。"
  },
  {
    question: "信用卡交水費有優惠嗎？",
    answer: "水費可透過信用卡自動轉賬或網上繳費。渣打 Simply Cash 1.5% 無上限最穩陣。如用 BoC Pay 或 AlipayHK 繳費，可用對應優惠信用卡賺更高回贈。"
  }
];

// 繳費類別數據
export const billCategories = [
  { 
    icon: <Zap className="h-6 w-6 text-yellow-500" />,
    name: "電費",
    provider: "中電 / 港燈",
    methods: ["網上繳費", "自動轉賬", "AlipayHK", "BoC Pay"],
    bestCards: [
      { card: "渣打 Simply Cash", id: "sc-simply-cash", rate: "1.5%" },
      { card: "HSBC Red Card", id: "hsbc-red", rate: "4%（網上）" },
    ]
  },
  { 
    icon: <Droplets className="h-6 w-6 text-blue-500" />,
    name: "水費",
    provider: "水務署",
    methods: ["網上繳費", "自動轉賬", "AlipayHK", "BoC Pay"],
    bestCards: [
      { card: "渣打 Simply Cash", id: "sc-simply-cash", rate: "1.5%" },
      { card: "中銀 Cheers", id: "boc-cheers", rate: "0.4%" },
    ]
  },
  { 
    icon: <Flame className="h-6 w-6 text-orange-500" />,
    name: "煤氣費",
    provider: "煤氣公司",
    methods: ["網上繳費", "信用卡直接", "AlipayHK"],
    bestCards: [
      { card: "渣打 Simply Cash", id: "sc-simply-cash", rate: "1.5%" },
      { card: "安信 EarnMORE", id: "earnmore", rate: "2%（Apple Pay）" },
    ]
  },
  { 
    icon: <Receipt className="h-6 w-6 text-purple-500" />,
    name: "差餉 / 地租",
    provider: "差餉物業估價署",
    methods: ["AlipayHK", "BoC Pay", "雲閃付", "PPS"],
    bestCards: [
      { card: "渣打 Simply Cash", id: "sc-simply-cash", rate: "1.5%（AlipayHK）" },
      { card: "中銀卡", id: "boc-cheers", rate: "0.4%（BoC Pay）" },
    ]
  },
  { 
    icon: <Phone className="h-6 w-6 text-green-500" />,
    name: "電話費 / 寬頻",
    provider: "各電訊商",
    methods: ["信用卡自動轉賬", "網上繳費"],
    bestCards: [
      { card: "HSBC Red Card", id: "hsbc-red", rate: "4%（網上）" },
      { card: "恒生 MMPOWER", id: "hangseng-mmpower", rate: "5%（網上）" },
    ]
  },
  { 
    icon: <Building className="h-6 w-6 text-gray-500" />,
    name: "管理費",
    provider: "各管理公司",
    methods: ["信用卡（視乎接受）", "EPS", "銀行轉賬"],
    bestCards: [
      { card: "渣打 Simply Cash", id: "sc-simply-cash", rate: "1.5%（如接受）" },
      { card: "Citi Cash Back", id: "citi-cashback", rate: "1%（如接受）" },
    ]
  },
];

// 繳費平台比較
export const paymentPlatforms = [
  {
    platform: "AlipayHK",
    bills: ["水費", "電費", "煤氣", "差餉", "電話費"],
    creditCardSupport: true,
    bestCards: [
      { card: "渣打 Simply Cash", id: "sc-simply-cash", rate: "1.5%" },
      { card: "Citi Cash Back", id: "citi-cashback", rate: "1%" },
    ],
    note: "部分信用卡計「網上簽賬」"
  },
  {
    platform: "BoC Pay",
    bills: ["水費", "差餉", "煤氣", "電費"],
    creditCardSupport: true,
    bestCards: [
      { card: "中銀卡", id: "boc-cheers", rate: "0.4%" },
    ],
    note: "限中銀信用卡"
  },
  {
    platform: "雲閃付",
    bills: ["差餉", "水費", "電費"],
    creditCardSupport: true,
    bestCards: [
      { card: "銀聯信用卡", id: null, rate: "視乎卡種" },
    ],
    note: "限銀聯卡"
  },
  {
    platform: "PPS 繳費靈",
    bills: ["所有公用事業"],
    creditCardSupport: false,
    bestCards: [],
    note: "只接受銀行戶口，無信用卡回贈"
  },
];

// 推薦信用卡
export const recommendedBillCards = [
  {
    card: "渣打 Simply Cash Visa",
    id: "sc-simply-cash",
    rate: "1.5%",
    cap: "無上限",
    highlight: "繳費首選",
    reason: "1.5% 無上限回贈，繳費穩陣之選",
    annual: "永久免年費"
  },
  {
    card: "HSBC Red Card",
    id: "hsbc-red",
    rate: "4%（網上）",
    cap: "有上限",
    highlight: "網上繳費",
    reason: "網上繳費 4% 回贈，電話費最抵",
    annual: "免年費"
  },
  {
    card: "恒生 MMPOWER",
    id: "hangseng-mmpower",
    rate: "5%（網上）",
    cap: "有上限",
    highlight: "網上繳費",
    reason: "網上繳費 5% 回贈",
    annual: "$300"
  },
  {
    card: "安信 EarnMORE",
    id: "earnmore",
    rate: "2%",
    cap: "無上限",
    highlight: "Mobile Pay",
    reason: "Apple Pay 繳費 2% 無上限",
    annual: "永久免年費"
  },
  {
    card: "Citi Cash Back",
    id: "citi-cashback",
    rate: "1%",
    cap: "無上限",
    highlight: "AlipayHK",
    reason: "AlipayHK 繳費穩定 1% 回贈",
    annual: "$1,200"
  },
];

export function UtilityBillGuide() {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      {/* 引言 */}
      <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-6">
        每個月都要交<strong>水電煤</strong>、<strong>電話費</strong>、<strong>差餉</strong>、<strong>管理費</strong>...
        點解唔趁機用<strong>信用卡繳費</strong>賺回贈？本文教你<strong>信用卡繳費攻略</strong>，
        用最抵嘅方法交所有賬單，每年輕鬆賺返幾百蚊！
      </p>

      {/* 目錄 */}
      <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-10">
        <h2 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          📑 本文目錄
        </h2>
        <ul className="space-y-2 text-sm">
          <li><a href="#overview" className="text-blue-600 dark:text-blue-400 hover:underline">1. 信用卡繳費回贈總覽</a></li>
          <li><a href="#electricity" className="text-blue-600 dark:text-blue-400 hover:underline">2. 交電費信用卡優惠</a></li>
          <li><a href="#water" className="text-blue-600 dark:text-blue-400 hover:underline">3. 交水費信用卡優惠</a></li>
          <li><a href="#gas" className="text-blue-600 dark:text-blue-400 hover:underline">4. 交煤氣費信用卡優惠</a></li>
          <li><a href="#rates" className="text-blue-600 dark:text-blue-400 hover:underline">5. 信用卡交差餉攻略</a></li>
          <li><a href="#phone" className="text-blue-600 dark:text-blue-400 hover:underline">6. 電話費信用卡回贈</a></li>
          <li><a href="#management" className="text-blue-600 dark:text-blue-400 hover:underline">7. 管理費信用卡回贈</a></li>
          <li><a href="#platforms" className="text-blue-600 dark:text-blue-400 hover:underline">8. AlipayHK / BoC Pay / 雲閃付繳費攻略</a></li>
          <li><a href="#best-cards" className="text-blue-600 dark:text-blue-400 hover:underline">9. 最佳繳費信用卡推薦</a></li>
          <li><a href="#faq" className="text-blue-600 dark:text-blue-400 hover:underline">10. 常見問題 FAQ</a></li>
        </ul>
      </div>

      {/* Section 1: 總覽 */}
      <section id="overview" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Receipt className="h-6 w-6 text-blue-500" />
          1. 信用卡繳費回贈總覽
        </h2>
        
        <p>
          <strong>信用卡繳費優惠</strong>可以幫你每年慳返唔少錢！以一個普通家庭為例：
        </p>

        <div className="not-prose bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-5 border border-green-200 dark:border-green-800 my-6">
          <h4 className="font-bold text-green-800 dark:text-green-200 mb-3">💰 每月繳費金額估算</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
              <p className="text-gray-500">電費</p>
              <p className="font-bold text-gray-900 dark:text-white">$400/月</p>
            </div>
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
              <p className="text-gray-500">水費</p>
              <p className="font-bold text-gray-900 dark:text-white">$100/月</p>
            </div>
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
              <p className="text-gray-500">煤氣費</p>
              <p className="font-bold text-gray-900 dark:text-white">$200/月</p>
            </div>
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
              <p className="text-gray-500">電話/寬頻</p>
              <p className="font-bold text-gray-900 dark:text-white">$300/月</p>
            </div>
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
              <p className="text-gray-500">差餉（平均）</p>
              <p className="font-bold text-gray-900 dark:text-white">$500/月</p>
            </div>
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
              <p className="text-gray-500">管理費</p>
              <p className="font-bold text-gray-900 dark:text-white">$1,500/月</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-green-200 dark:border-green-700">
            <div className="flex justify-between items-center">
              <span className="text-green-700 dark:text-green-300">每月繳費總額</span>
              <span className="text-2xl font-bold text-green-600 dark:text-green-400">$3,000</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-green-700 dark:text-green-300">以 1.5% 回贈計</span>
              <span className="text-lg font-bold text-green-600 dark:text-green-400">每月賺 $45 / 每年賺 $540</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: 電費 */}
      <section id="electricity" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Zap className="h-6 w-6 text-yellow-500" />
          2. 交電費信用卡優惠
        </h2>

        <p>
          香港電力供應商（<strong>中電</strong>、<strong>港燈</strong>）都接受<strong>信用卡交電費</strong>，
          可透過網上繳費或設定自動轉賬。
        </p>

        <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-5 my-6">
          <h4 className="font-bold text-gray-900 dark:text-white mb-3">⚡ 中電繳費信用卡推薦</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <div>
                <Link href="/cards/sc-simply-cash" className="font-medium text-blue-600 hover:underline dark:text-blue-400">渣打 Simply Cash</Link>
                <p className="text-xs text-gray-500">網上繳費 / 自動轉賬</p>
              </div>
              <span className="font-bold text-yellow-600 dark:text-yellow-400">1.5% 無上限</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <div>
                <Link href="/cards/hsbc-red" className="font-medium text-blue-600 hover:underline dark:text-blue-400">HSBC Red Card</Link>
                <p className="text-xs text-gray-500">網上繳費</p>
              </div>
              <span className="font-bold text-yellow-600 dark:text-yellow-400">4%（有上限）</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: 水費 */}
      <section id="water" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Droplets className="h-6 w-6 text-blue-500" />
          3. 交水費信用卡優惠
        </h2>

        <p>
          <strong>水費</strong>由水務署收取，可透過多種方式繳付。<strong>交水費信用卡</strong>最抵方法：
        </p>

        <div className="not-prose space-y-3 my-6">
          <div className="flex items-start gap-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">AlipayHK 繳費</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                用 <Link href="/cards/sc-simply-cash" className="text-blue-600 hover:underline">渣打 Simply Cash</Link> 綁定 AlipayHK，繳水費賺 1.5% 回贈
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">BoC Pay 繳費</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                用中銀信用卡透過 BoC Pay 交水費，享中銀回贈優惠
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">自動轉賬</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                設定信用卡自動轉賬，每期自動繳付
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: 煤氣費 */}
      <section id="gas" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Flame className="h-6 w-6 text-orange-500" />
          4. 交煤氣費信用卡優惠
        </h2>

        <p>
          <strong>煤氣繳費信用卡</strong>可透過煤氣公司網站或 App 直接繳付：
        </p>

        <div className="not-prose bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-xl p-4 my-6">
          <h4 className="font-bold text-orange-800 dark:text-orange-200 mb-2">🔥 交煤氣費信用卡推薦</h4>
          <ul className="text-orange-700 dark:text-orange-300 text-sm space-y-2">
            <li>• <Link href="/cards/earnmore" className="text-blue-600 hover:underline font-medium">安信 EarnMORE</Link>：用 Apple Pay 繳費可賺 <strong>2% 無上限</strong></li>
            <li>• <Link href="/cards/sc-simply-cash" className="text-blue-600 hover:underline font-medium">渣打 Simply Cash</Link>：網上繳費 <strong>1.5% 無上限</strong></li>
            <li>• 透過 AlipayHK 繳費亦可賺信用卡回贈</li>
          </ul>
        </div>
      </section>

      {/* Section 5: 差餉 */}
      <section id="rates" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Receipt className="h-6 w-6 text-purple-500" />
          5. 信用卡交差餉攻略
        </h2>

        <p>
          <strong>信用卡交差餉 {currentYear}</strong> 可透過 AlipayHK、BoC Pay 或雲閃付繳付。
          直接用 PPS 繳費靈交差餉就無信用卡回贈。
        </p>

        <div className="not-prose bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-4 my-6">
          <h4 className="font-bold text-purple-800 dark:text-purple-200 mb-2">💡 交差餉最抵方法</h4>
          <div className="text-purple-700 dark:text-purple-300 text-sm space-y-3">
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
              <p className="font-bold mb-1">方法 1：AlipayHK</p>
              <p>用 <Link href="/cards/sc-simply-cash" className="text-blue-600 hover:underline">渣打 Simply Cash</Link> 綁定 AlipayHK 交差餉，賺 1.5% 回贈</p>
            </div>
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
              <p className="font-bold mb-1">方法 2：BoC Pay</p>
              <p>用中銀信用卡透過 BoC Pay 交差餉，享中銀回贈</p>
            </div>
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
              <p className="font-bold mb-1">方法 3：雲閃付</p>
              <p>用銀聯信用卡透過雲閃付繳費</p>
            </div>
          </div>
        </div>

        <div className="not-prose bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-red-800 dark:text-red-200 mb-1">⚠️ 注意</h4>
              <p className="text-red-700 dark:text-red-300 text-sm">
                直接用 PPS 繳費靈（銀行戶口）交差餉<strong>無信用卡回贈</strong>！
                要用信用卡賺回贈，必須透過 AlipayHK、BoC Pay 或雲閃付。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: 電話費 */}
      <section id="phone" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Phone className="h-6 w-6 text-green-500" />
          6. 電話費信用卡回贈
        </h2>

        <p>
          <strong>電話費信用卡 {currentYear}</strong> 可設定自動轉賬，每月自動繳付月費。
          呢類簽賬通常計入「<strong>網上繳費</strong>」或「<strong>自動轉賬</strong>」類別。
        </p>

        <div className="not-prose bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 my-6">
          <h4 className="font-bold text-green-800 dark:text-green-200 mb-2">📱 電話費信用卡回贈推薦</h4>
          <ul className="text-green-700 dark:text-green-300 text-sm space-y-2">
            <li>• <Link href="/cards/hsbc-red" className="text-blue-600 hover:underline font-medium">HSBC Red Card</Link>：網上繳費 <strong>4%</strong> 回贈</li>
            <li>• <Link href="/cards/hangseng-mmpower" className="text-blue-600 hover:underline font-medium">恒生 MMPOWER</Link>：網上繳費 <strong>5%</strong> 回贈</li>
            <li>• <Link href="/cards/sc-simply-cash" className="text-blue-600 hover:underline font-medium">渣打 Simply Cash</Link>：<strong>1.5%</strong> 無上限</li>
          </ul>
        </div>
      </section>

      {/* Section 7: 管理費 */}
      <section id="management" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Building className="h-6 w-6 text-gray-500" />
          7. 管理費信用卡回贈
        </h2>

        <p>
          <strong>管理費信用卡 {currentYear}</strong> 回贈視乎管理公司接受咩付款方式：
        </p>

        <div className="not-prose space-y-3 my-6">
          <div className="flex items-start gap-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">接受信用卡</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                直接用 <Link href="/cards/sc-simply-cash" className="text-blue-600 hover:underline">渣打 Simply Cash</Link> 繳付，賺 1.5% 回贈
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
            <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">只接受 EPS / 銀行轉賬</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                無直接信用卡回贈，可考慮用 PayMe 等方式間接獲取回贈（如有此選項）
              </p>
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-500">
          <strong>港鐵管理費</strong>、<strong>啟勝管理費</strong>等較大管理公司通常接受信用卡，
          建議向你嘅管理公司查詢接受嘅付款方式。
        </p>
      </section>

      {/* Section 8: 繳費平台 */}
      <section id="platforms" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Smartphone className="h-6 w-6 text-cyan-500" />
          8. AlipayHK / BoC Pay / 雲閃付繳費攻略
        </h2>

        <p>
          透過電子錢包繳費，可以用<strong>信用卡繳費</strong>賺回贈！以下係各平台比較：
        </p>

        <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden my-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-cyan-50 dark:bg-cyan-900/20">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-cyan-600 dark:text-cyan-400">平台</th>
                  <th className="px-4 py-3 text-center font-medium text-cyan-600 dark:text-cyan-400">可繳費用</th>
                  <th className="px-4 py-3 text-center font-medium text-cyan-600 dark:text-cyan-400">信用卡支援</th>
                  <th className="px-4 py-3 text-center font-medium text-cyan-600 dark:text-cyan-400">推薦信用卡</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {paymentPlatforms.map((platform, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{platform.platform}</td>
                    <td className="px-4 py-3 text-center text-gray-600 dark:text-gray-400 text-xs">{platform.bills.join("、")}</td>
                    <td className="px-4 py-3 text-center">
                      {platform.creditCardSupport ? (
                        <span className="text-green-600 dark:text-green-400">✓ 支援</span>
                      ) : (
                        <span className="text-red-600 dark:text-red-400">✗ 不支援</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {platform.bestCards.length > 0 ? (
                        platform.bestCards[0].id ? (
                          <Link href={`/cards/${platform.bestCards[0].id}`} className="text-blue-600 hover:underline dark:text-blue-400 text-xs">
                            {platform.bestCards[0].card}
                          </Link>
                        ) : (
                          <span className="text-gray-600 dark:text-gray-400 text-xs">{platform.bestCards[0].card}</span>
                        )
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section 9: 推薦信用卡 */}
      <section id="best-cards" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Trophy className="h-6 w-6 text-amber-500" />
          9. 最佳繳費信用卡推薦
        </h2>

        <p>
          綜合以上分析，以下係<strong>網上繳費信用卡</strong>最佳推薦：
        </p>

        <div className="not-prose space-y-4 my-6">
          {recommendedBillCards.map((card, index) => (
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
              <p className="text-xs text-gray-500 mt-1">年費：{card.annual}</p>
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
          {utilityBillFaqData.map((faq, index) => (
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

      {/* Card Preview Section */}
      <CardPreviewSection 
        title="📌 繳費推薦信用卡一覽"
        subtitle="以下信用卡最適合繳付水電煤、差餉、電話費等賬單"
        cards={RECOMMENDED_CARDS.bills}
      />

      {/* CTA Section */}
      <div className="not-prose bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-6 text-white mb-10">
        <h3 className="text-xl font-bold mb-2">💳 想知更多信用卡回贈攻略？</h3>
        <p className="mb-4 opacity-90">用我哋嘅計算機，即刻計出你嘅消費可以賺幾多回贈！</p>
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
          <Link href="/discover/best-cashback-cards" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
            <CreditCard className="h-5 w-5 text-emerald-600" />
            <span>最高回贈信用卡比較</span>
            <ChevronRight className="h-4 w-4 ml-auto text-gray-400" />
          </Link>
          <Link href="/discover/overseas-fee" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
            <DollarSign className="h-5 w-5 text-emerald-600" />
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

