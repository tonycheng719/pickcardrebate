// 大額簽賬信用卡攻略
// 用於 /discover/large-purchase-guide 頁面

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  ChevronRight, ChevronDown, CreditCard, Home, Building2,
  Calculator, Trophy, DollarSign, CheckCircle, AlertTriangle,
  Star, FileText, Info, Zap, Percent, Gift, Heart, Plane
} from "lucide-react";
import { CardPreviewSection } from "@/app/discover/components/card-preview-section";

// FAQ 數據
export const largePurchaseFaqData = [
  {
    question: "大額簽賬用邊張信用卡最抵？",
    answer: "大額簽賬首選用迎新要求最高嘅信用卡，例如 HSBC Visa Signature（首 2 個月簽 $8,000 有 $1,000 獎賞錢）、Citi Cash Back（簽 $10,000 有 $1,000 回贈）等。利用迎新優惠可獲得最高回贈。"
  },
  {
    question: "結婚擺酒可以用信用卡嗎？",
    answer: "可以！大部分酒樓/酒店都接受信用卡付款。建議用迎新優惠最高嘅卡，例如簽 $50,000-$100,000 嘅擺酒費用可以食到幾張卡嘅迎新，賺幾千蚊回贈。"
  },
  {
    question: "裝修可以用信用卡嗎？",
    answer: "部分裝修公司接受信用卡付款，但可能收 1-2% 手續費。建議同裝修公司傾好先，如果可以免手續費就值得用信用卡賺迎新。"
  },
  {
    question: "私家醫院可以用信用卡嗎？",
    answer: "可以！私家醫院大部分都接受信用卡付款。大額醫療費用（手術、分娩等）可以用嚟食迎新優惠，記住要提前申請好信用卡。"
  },
  {
    question: "信用卡迎新優惠點樣計？",
    answer: "迎新優惠通常要喺批卡後指定時間內（如 60-90 日）簽滿指定金額。例如「首 2 個月簽 $8,000 有 $800 回贈」，大額簽賬一次過就達成要求。"
  },
  {
    question: "大額簽賬可以拆單嗎？",
    answer: "可以！如果一次簽賬金額好大（如 $100,000），可以分開幾張卡簽，每張卡食一次迎新。但要同商戶溝通好，確保佢哋接受拆單付款。"
  },
  {
    question: "信用卡免息分期值唔值得用？",
    answer: "視乎情況。如果商戶提供真正免息分期（唔係信用卡公司收手續費），可以考慮。但如果要俾手續費，通常唔值得。大額簽賬建議全額找清，唔好只還最低還款額。"
  },
  {
    question: "大額簽賬信用卡額度唔夠點算？",
    answer: "可以提前致電銀行申請臨時提升信用額度。提供簽賬原因（如結婚、裝修）同埋相關文件，銀行通常會配合。"
  }
];

// 大額簽賬場景
const largePurchaseScenarios = [
  {
    scenario: "結婚擺酒",
    icon: "💒",
    amount: "$50,000 - $200,000",
    acceptCard: "大部分酒樓/酒店",
    tips: "提前問清楚有冇手續費，可以拆單俾幾張卡",
    bestStrategy: "每張卡簽到迎新要求，最多可食 3-4 張卡迎新",
  },
  {
    scenario: "新居裝修",
    icon: "🏠",
    amount: "$100,000 - $500,000",
    acceptCard: "部分裝修公司",
    tips: "部分收 1-2% 手續費，要計清楚先",
    bestStrategy: "揀免手續費嘅裝修公司，一次過食迎新",
  },
  {
    scenario: "私家醫院/手術",
    icon: "🏥",
    amount: "$30,000 - $200,000",
    acceptCard: "大部分私家醫院",
    tips: "分娩、手術等大額費用最適合",
    bestStrategy: "提前申請信用卡，入院前準備好",
  },
  {
    scenario: "買傢俬電器",
    icon: "🛋️",
    amount: "$20,000 - $100,000",
    acceptCard: "百老匯、豐澤、IKEA 等",
    tips: "新居入伙必備，金額夠大",
    bestStrategy: "配合店舖 promotion + 信用卡迎新",
  },
  {
    scenario: "買車/車稅",
    icon: "🚗",
    amount: "$100,000+",
    acceptCard: "部分車行",
    tips: "部分車行接受信用卡付訂金",
    bestStrategy: "問清楚車行付款安排",
  },
  {
    scenario: "海外旅遊",
    icon: "✈️",
    amount: "$20,000 - $50,000",
    acceptCard: "機票、酒店、當地消費",
    tips: "用免 CBF 嘅信用卡",
    bestStrategy: "新卡食迎新 + 旅遊消費賺里數",
  },
];

// 迎新優惠比較
const welcomeOffers = [
  {
    card: "HSBC Visa Signature",
    id: "hsbc-vs",
    requirement: "首 2 個月簽 $8,000",
    reward: "$1,000 獎賞錢",
    effectiveRate: "12.5%",
    highlight: "易達成",
  },
  {
    card: "Citi Cash Back Card",
    id: "citi-cashback",
    requirement: "首 3 個月簽 $10,000",
    reward: "$1,000 回贈",
    effectiveRate: "10%",
    highlight: "現金回贈",
  },
  {
    card: "SC Simply Cash",
    id: "sc-simply-cash",
    requirement: "首 2 個月簽 $4,000",
    reward: "$1,000 回贈",
    effectiveRate: "25%",
    highlight: "低門檻",
  },
  {
    card: "恒生 MMPOWER",
    id: "hangseng-mmpower",
    requirement: "首 60 日簽 $5,000",
    reward: "$700 回贈",
    effectiveRate: "14%",
    highlight: "網購額外",
  },
  {
    card: "DBS Black World",
    id: "dbs-black",
    requirement: "首 3 個月簽 $5,000",
    reward: "40,000 里",
    effectiveRate: "$8/里",
    highlight: "里數迎新",
  },
  {
    card: "HSBC EveryMile",
    id: "hsbc-everymile",
    requirement: "首 60 日簽 $8,000",
    reward: "20,000 里",
    effectiveRate: "$4/里",
    highlight: "里數迎新",
  },
];

// 拆單攻略
const splitPaymentStrategy = [
  { step: "1", title: "計算總金額", desc: "確認大額消費嘅總金額" },
  { step: "2", title: "睇清迎新要求", desc: "每張卡嘅迎新簽賬要求同埋獎賞" },
  { step: "3", title: "申請多張信用卡", desc: "提前申請，確保批核後先消費" },
  { step: "4", title: "分配簽賬金額", desc: "每張卡簽到迎新要求為止" },
  { step: "5", title: "同商戶溝通", desc: "確保商戶接受多張卡付款" },
];

export function LargePurchaseGuide() {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      {/* 引言 */}
      <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-6">
        結婚擺酒、新居裝修、私家醫院⋯⋯大額簽賬點樣賺盡信用卡優惠？
        本文教你 <strong>{currentYear} 大額簽賬信用卡攻略</strong>，
        利用<strong>迎新優惠</strong>同<strong>拆單大法</strong>，
        輕鬆賺幾千蚊回贈！
      </p>

      {/* 目錄 */}
      <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-10">
        <h2 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          📑 本文目錄
        </h2>
        <ul className="space-y-2 text-sm">
          <li><a href="#overview" className="text-blue-600 dark:text-blue-400 hover:underline">1. 大額簽賬點樣賺最多？</a></li>
          <li><a href="#scenarios" className="text-blue-600 dark:text-blue-400 hover:underline">2. 大額簽賬場景分析</a></li>
          <li><a href="#welcome-offers" className="text-blue-600 dark:text-blue-400 hover:underline">3. 信用卡迎新優惠比較</a></li>
          <li><a href="#split-payment" className="text-blue-600 dark:text-blue-400 hover:underline">4. 拆單大法攻略</a></li>
          <li><a href="#wedding" className="text-blue-600 dark:text-blue-400 hover:underline">5. 結婚簽賬攻略</a></li>
          <li><a href="#renovation" className="text-blue-600 dark:text-blue-400 hover:underline">6. 裝修簽賬攻略</a></li>
          <li><a href="#medical" className="text-blue-600 dark:text-blue-400 hover:underline">7. 醫療簽賬攻略</a></li>
          <li><a href="#credit-limit" className="text-blue-600 dark:text-blue-400 hover:underline">8. 提升信用額度攻略</a></li>
          <li><a href="#tips" className="text-blue-600 dark:text-blue-400 hover:underline">9. 大額簽賬貼士</a></li>
          <li><a href="#faq" className="text-blue-600 dark:text-blue-400 hover:underline">10. 常見問題 FAQ</a></li>
        </ul>
      </div>

      {/* Section 1: 總覽 */}
      <section id="overview" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <DollarSign className="h-6 w-6 text-green-500" />
          1. 大額簽賬點樣賺最多？
        </h2>
        
        <p>
          大額簽賬最聰明嘅做法係<strong>利用信用卡迎新優惠</strong>：
        </p>

        <div className="not-prose bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-5 border border-green-200 dark:border-green-800 my-6">
          <h4 className="font-bold text-green-800 dark:text-green-200 mb-3">💡 大額簽賬策略</h4>
          <div className="grid md:grid-cols-3 gap-3">
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 text-center">
              <p className="text-3xl mb-1">🎯</p>
              <p className="font-medium text-gray-900 dark:text-white">食迎新優惠</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">新卡迎新回贈最高</p>
            </div>
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 text-center">
              <p className="text-3xl mb-1">✂️</p>
              <p className="font-medium text-gray-900 dark:text-white">拆單簽賬</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">分開幾張卡食多次迎新</p>
            </div>
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 text-center">
              <p className="text-3xl mb-1">⏰</p>
              <p className="font-medium text-gray-900 dark:text-white">提前準備</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">大額簽賬前申請定新卡</p>
            </div>
          </div>
        </div>

        <div className="not-prose bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
          <h4 className="font-bold text-amber-800 dark:text-amber-200 mb-2">📊 回贈計算例子</h4>
          <p className="text-amber-700 dark:text-amber-300 text-sm">
            假設結婚擺酒 <strong>$80,000</strong>，拆成 3 張卡：<br/>
            • 卡A：簽 $30,000 → 迎新 $1,000<br/>
            • 卡B：簽 $30,000 → 迎新 $1,000<br/>
            • 卡C：簽 $20,000 → 迎新 $800<br/>
            <strong>總回贈：$2,800（3.5%）</strong> 💰
          </p>
        </div>
      </section>

      {/* Section 2: 場景 */}
      <section id="scenarios" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Building2 className="h-6 w-6 text-blue-500" />
          2. 大額簽賬場景分析
        </h2>

        <div className="not-prose space-y-4 my-6">
          {largePurchaseScenarios.map((scenario, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-4">
              <div className="flex items-start gap-3">
                <span className="text-3xl">{scenario.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-gray-900 dark:text-white">{scenario.scenario}</h4>
                    <span className="text-sm font-bold text-green-600 dark:text-green-400">{scenario.amount}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <strong>接受信用卡：</strong>{scenario.acceptCard}
                  </p>
                  <p className="text-xs text-gray-500 mb-1">💡 {scenario.tips}</p>
                  <p className="text-xs text-blue-600 dark:text-blue-400">🎯 {scenario.bestStrategy}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: 迎新比較 */}
      <section id="welcome-offers" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Gift className="h-6 w-6 text-purple-500" />
          3. 信用卡迎新優惠比較
        </h2>

        <p>
          以下係<strong>大額簽賬最適合嘅信用卡迎新</strong>：
        </p>

        <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden my-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-purple-50 dark:bg-purple-900/20">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-purple-600 dark:text-purple-400">信用卡</th>
                  <th className="px-4 py-3 text-center font-medium text-purple-600 dark:text-purple-400">迎新要求</th>
                  <th className="px-4 py-3 text-center font-medium text-purple-600 dark:text-purple-400">獎賞</th>
                  <th className="px-4 py-3 text-center font-medium text-purple-600 dark:text-purple-400">有效回贈</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {welcomeOffers.map((offer, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3">
                      <Link href={`/cards/${offer.id}`} className="font-medium text-blue-600 hover:underline dark:text-blue-400">
                        {offer.card}
                      </Link>
                      <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                        {offer.highlight}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center text-gray-600 dark:text-gray-400">{offer.requirement}</td>
                    <td className="px-4 py-3 text-center font-bold text-green-600 dark:text-green-400">{offer.reward}</td>
                    <td className="px-4 py-3 text-center text-amber-600 dark:text-amber-400 font-bold">{offer.effectiveRate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Card Preview Section */}
      <CardPreviewSection 
        title="📌 大額簽賬推薦信用卡"
        subtitle="點擊查看詳細迎新條款及申請連結"
        cards={[
          { id: "hsbc-vs", highlight: "迎新 $1,000" },
          { id: "citi-cashback", highlight: "迎新 $1,000" },
          { id: "sc-simply-cash", highlight: "迎新 $1,000" },
          { id: "hangseng-mmpower", highlight: "迎新 $700" },
        ]}
      />

      {/* Section 4: 拆單攻略 */}
      <section id="split-payment" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Zap className="h-6 w-6 text-yellow-500" />
          4. 拆單大法攻略
        </h2>

        <p>
          <strong>拆單大法</strong>係大額簽賬賺最多回贈嘅關鍵：
        </p>

        <div className="not-prose space-y-3 my-6">
          {splitPaymentStrategy.map((item, index) => (
            <div key={index} className="flex items-start gap-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-yellow-500 text-white flex items-center justify-center font-bold">{item.step}</span>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{item.title}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="not-prose bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
          <h4 className="font-bold text-blue-800 dark:text-blue-200 mb-2">💡 拆單例子</h4>
          <p className="text-blue-700 dark:text-blue-300 text-sm">
            裝修費 <strong>$150,000</strong>：<br/>
            • <Link href="/cards/hsbc-vs" className="underline">HSBC Visa Signature</Link>：簽 $50,000 → 迎新 $1,000<br/>
            • <Link href="/cards/citi-cashback" className="underline">Citi Cash Back</Link>：簽 $50,000 → 迎新 $1,000<br/>
            • <Link href="/cards/sc-simply-cash" className="underline">SC Simply Cash</Link>：簽 $50,000 → 迎新 $1,000 + 1.5% = $1,750<br/>
            <strong>總回贈：$3,750（2.5%）</strong> 比單張卡 1% 回贈多 $2,250！
          </p>
        </div>
      </section>

      {/* Section 5: 結婚攻略 */}
      <section id="wedding" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Heart className="h-6 w-6 text-pink-500" />
          5. 結婚簽賬攻略
        </h2>

        <div className="not-prose space-y-4 my-6">
          <div className="bg-pink-50 dark:bg-pink-900/20 rounded-xl p-4 border border-pink-200 dark:border-pink-800">
            <h4 className="font-bold text-pink-800 dark:text-pink-200 mb-2">💒 結婚常見消費</h4>
            <div className="grid md:grid-cols-2 gap-2 text-sm text-pink-700 dark:text-pink-300">
              <div>• 擺酒：$50,000 - $150,000</div>
              <div>• 婚紗攝影：$10,000 - $30,000</div>
              <div>• 蜜月旅行：$20,000 - $50,000</div>
              <div>• 婚戒：$20,000 - $100,000</div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4">
            <h4 className="font-bold text-gray-900 dark:text-white mb-2">🎯 結婚簽賬策略</h4>
            <ul className="text-gray-600 dark:text-gray-400 text-sm space-y-1">
              <li>1️⃣ 提前 3 個月申請信用卡（等批核同埋迎新期開始）</li>
              <li>2️⃣ 問清楚酒樓/酒店有冇信用卡手續費</li>
              <li>3️⃣ 分開幾張卡簽賬，每張卡食到迎新</li>
              <li>4️⃣ 蜜月旅行用海外消費高回贈卡</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 6: 裝修攻略 */}
      <section id="renovation" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Home className="h-6 w-6 text-orange-500" />
          6. 裝修簽賬攻略
        </h2>

        <div className="not-prose space-y-4 my-6">
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-4 border border-orange-200 dark:border-orange-800">
            <h4 className="font-bold text-orange-800 dark:text-orange-200 mb-2">🏠 裝修常見消費</h4>
            <div className="grid md:grid-cols-2 gap-2 text-sm text-orange-700 dark:text-orange-300">
              <div>• 裝修工程：$100,000 - $500,000</div>
              <div>• 傢俬：$30,000 - $100,000</div>
              <div>• 電器：$20,000 - $50,000</div>
              <div>• 冷氣：$10,000 - $30,000</div>
            </div>
          </div>
          
          <div className="not-prose bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-amber-700 dark:text-amber-300 text-sm">
                  <strong>注意：</strong>部分裝修公司收 1-2% 信用卡手續費！
                  要計清楚：如果手續費 2%，但信用卡迎新回贈有 10%，仍然值得用。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: 醫療攻略 */}
      <section id="medical" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Building2 className="h-6 w-6 text-teal-500" />
          7. 醫療簽賬攻略
        </h2>

        <div className="not-prose space-y-4 my-6">
          <div className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-4 border border-teal-200 dark:border-teal-800">
            <h4 className="font-bold text-teal-800 dark:text-teal-200 mb-2">🏥 私家醫院消費</h4>
            <div className="grid md:grid-cols-2 gap-2 text-sm text-teal-700 dark:text-teal-300">
              <div>• 分娩：$50,000 - $150,000</div>
              <div>• 手術：$30,000 - $200,000</div>
              <div>• 住院：$5,000 - $20,000/日</div>
              <div>• 體檢：$5,000 - $20,000</div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4">
            <h4 className="font-bold text-gray-900 dark:text-white mb-2">🎯 醫療簽賬策略</h4>
            <ul className="text-gray-600 dark:text-gray-400 text-sm space-y-1">
              <li>1️⃣ 入院前申請好信用卡</li>
              <li>2️⃣ 大部分私家醫院接受信用卡付款</li>
              <li>3️⃣ 可以分開幾張卡簽賬</li>
              <li>4️⃣ 有保險嘅話，先墊付後索償</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 8: 提升額度 */}
      <section id="credit-limit" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Percent className="h-6 w-6 text-indigo-500" />
          8. 提升信用額度攻略
        </h2>

        <p>
          大額簽賬前，信用額度唔夠點算？
        </p>

        <div className="not-prose space-y-3 my-6">
          {[
            { icon: "📞", title: "致電銀行申請", desc: "致電客服要求臨時提升信用額度，說明簽賬原因" },
            { icon: "📄", title: "提供證明文件", desc: "如有需要，提供結婚/裝修/醫療相關文件" },
            { icon: "⏰", title: "提前申請", desc: "建議簽賬前 1-2 星期申請，預留審批時間" },
            { icon: "💳", title: "分開幾張卡", desc: "每張卡額度有限，可以分開簽賬" },
          ].map((tip, index) => (
            <div key={index} className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-4 flex items-start gap-4">
              <span className="text-2xl">{tip.icon}</span>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-1">{tip.title}</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{tip.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 9: 貼士 */}
      <section id="tips" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Star className="h-6 w-6 text-yellow-500" />
          9. 大額簽賬貼士
        </h2>

        <div className="not-prose space-y-3">
          {[
            { icon: "🎯", title: "食盡迎新優惠", desc: "大額簽賬前申請新卡，利用迎新優惠獲得最高回贈" },
            { icon: "✂️", title: "善用拆單大法", desc: "分開幾張卡簽賬，每張卡食一次迎新" },
            { icon: "⏰", title: "提前準備", desc: "提前 2-3 個月申請信用卡，確保批核後先消費" },
            { icon: "📊", title: "計清楚手續費", desc: "如商戶收手續費，要計清楚係咪仲值得" },
            { icon: "💳", title: "準時還款", desc: "大額簽賬後記住準時還款，唔好只還最低還款額" },
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
          {largePurchaseFaqData.map((faq, index) => (
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
      <div className="not-prose bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 text-white mb-10">
        <h3 className="text-xl font-bold mb-2">💳 想知邊張卡迎新優惠最適合你？</h3>
        <p className="mb-4 opacity-90">用我哋嘅計算機，即刻搵到最高回贈嘅信用卡！</p>
        <Link href="/">
          <Button className="bg-white text-green-600 hover:bg-gray-100">
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

