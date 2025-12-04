// 信用卡交租攻略
// 用於 /discover/rent-payment-guide 頁面

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  ChevronRight, ChevronDown, CreditCard, Home, Building2,
  Calculator, Trophy, DollarSign, CheckCircle, AlertTriangle,
  Star, Smartphone, Info, XCircle, Zap, Clock, Shield
} from "lucide-react";
import { CardPreviewSection } from "@/app/discover/components/card-preview-section";

// FAQ 數據
export const rentPaymentFaqData = [
  {
    question: "信用卡交租有回贈嗎？",
    answer: "有！透過 RentSmart、KeyChain Pay 等平台用信用卡交租，可以賺取信用卡回贈。不過平台會收取手續費（約 1.5-2.5%），所以要揀回贈率高過手續費嘅信用卡先有著數。"
  },
  {
    question: "公屋可以用信用卡交租嗎？",
    answer: "可以！公屋租戶可透過 RentSmart 或 KeyChain Pay 用信用卡繳付租金。平台會代你繳款到房屋署，你只需要提供租戶資料。注意平台手續費會影響實際回贈。"
  },
  {
    question: "RentSmart 交租信用卡回贈點計？",
    answer: "RentSmart 手續費約 1.8-2.5%。如果你用 2% 回贈嘅信用卡（如 EarnMORE），扣除手續費後可能打和或蝕少少。建議用迎新簽賬需求嘅信用卡，將交租當作達成迎新目標。"
  },
  {
    question: "私樓交租用邊張信用卡最抵？",
    answer: "私樓交租建議用高回贈或迎新優惠好嘅信用卡。如果業主接受信用卡直接付款最好；如果唔接受，可透過 RentSmart 等平台。迎新期間用新卡交租可賺額外回贈。"
  },
  {
    question: "HSBC 信用卡交租有回贈嗎？",
    answer: "透過 RentSmart 等平台用 HSBC 信用卡交租，一般會計入「網上簽賬」類別。HSBC Red Card 網購有 4% 回贈（有上限），但要留意平台手續費。"
  },
  {
    question: "交租可以食信用卡迎新嗎？",
    answer: "可以！透過 RentSmart 等平台交租，簽賬會計入信用卡迎新簽賬額。如果你有大額迎新需求（如 $8,000 簽賬送 $800），用交租來達成係好方法。"
  },
  {
    question: "RentSmart 同 KeyChain Pay 邊個好？",
    answer: "兩個平台功能類似，主要分別在手續費同支援嘅物業類型。RentSmart 支援公屋、居屋、私樓；KeyChain Pay 主要針對私樓。建議比較兩者手續費再決定。"
  },
  {
    question: "交租平台手續費幾多？",
    answer: "RentSmart 手續費約 1.8-2.5%，KeyChain Pay 約 2-2.5%。以 $15,000 租金計，手續費約 $270-375。如果信用卡回贈低過手續費，就唔抵用信用卡交租。"
  }
];

// 交租平台比較
const rentPlatforms = [
  {
    name: "RentSmart",
    fee: "1.8% - 2.5%",
    supports: ["公屋", "居屋", "私樓", "學生宿舍"],
    paymentMethods: ["Visa", "Mastercard", "銀聯"],
    pros: ["支援物業類型廣", "流程清晰"],
    cons: ["手續費較高"],
  },
  {
    name: "KeyChain Pay",
    fee: "2% - 2.5%",
    supports: ["私樓", "村屋"],
    paymentMethods: ["Visa", "Mastercard"],
    pros: ["界面簡單"],
    cons: ["唔支援公屋", "手續費高"],
  },
  {
    name: "PayMe",
    fee: "0%（P2P）",
    supports: ["業主接受先用到"],
    paymentMethods: ["信用卡增值"],
    pros: ["免手續費", "即時到賬"],
    cons: ["業主要有 PayMe", "信用卡增值無回贈"],
  },
];

// 推薦信用卡
const recommendedCards = [
  {
    card: "安信 EarnMORE 銀聯卡",
    id: "earnmore",
    rate: "2%",
    highlight: "最高回贈",
    reason: "2% 無上限回贈，扣除手續費後可能打和或微賺",
    note: "需用 Apple Pay / Google Pay",
  },
  {
    card: "渣打 Simply Cash Visa",
    id: "sc-simply-cash",
    rate: "1.5%",
    highlight: "穩定回贈",
    reason: "1.5% 無上限，扣除手續費後會蝕少少，但可用作迎新",
    note: "永久免年費",
  },
  {
    card: "Citi Cash Back Card",
    id: "citi-cashback",
    rate: "1%",
    highlight: "迎新抵",
    reason: "迎新簽 $10,000 送 $1,000，交租達標超容易",
    note: "迎新期間特別抵",
  },
  {
    card: "HSBC Red Card",
    id: "hsbc-red",
    rate: "4%（網購）",
    highlight: "網購類別",
    reason: "如 RentSmart 計入網購，可享 4% 回贈（有上限）",
    note: "免年費",
  },
];

// 迎新推薦
const welcomeOfferCards = [
  {
    card: "Citi Cash Back Card",
    id: "citi-cashback",
    requirement: "簽賬 $10,000",
    reward: "$1,000 回贈",
    months: "首 3 個月",
  },
  {
    card: "渣打 Simply Cash",
    id: "sc-simply-cash",
    requirement: "簽賬 $4,000",
    reward: "$1,000 回贈",
    months: "首 2 個月",
  },
  {
    card: "HSBC Visa Signature",
    id: "hsbc-vs",
    requirement: "簽賬 $8,000",
    reward: "$800 獎賞錢",
    months: "首 60 日",
  },
  {
    card: "恒生 MMPOWER",
    id: "hangseng-mmpower",
    requirement: "簽賬 $5,000",
    reward: "$700 回贈",
    months: "首 2 個月",
  },
];

export function RentPaymentGuide() {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      {/* 引言 */}
      <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-6">
        每個月交租萬幾蚊，點解唔用<strong>信用卡交租</strong>賺回贈？
        本文教你<strong>交租信用卡攻略</strong>，透過 RentSmart、KeyChain Pay 等平台，
        <strong>公屋、私樓</strong>都可以用信用卡交租，仲可以<strong>食迎新</strong>！
      </p>

      {/* 目錄 */}
      <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-10">
        <h2 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          📑 本文目錄
        </h2>
        <ul className="space-y-2 text-sm">
          <li><a href="#overview" className="text-blue-600 dark:text-blue-400 hover:underline">1. 信用卡交租可以賺回贈？</a></li>
          <li><a href="#platforms" className="text-blue-600 dark:text-blue-400 hover:underline">2. 交租平台比較：RentSmart vs KeyChain Pay</a></li>
          <li><a href="#public-housing" className="text-blue-600 dark:text-blue-400 hover:underline">3. 公屋交租信用卡攻略</a></li>
          <li><a href="#private-housing" className="text-blue-600 dark:text-blue-400 hover:underline">4. 私樓交租信用卡攻略</a></li>
          <li><a href="#welcome-offer" className="text-blue-600 dark:text-blue-400 hover:underline">5. 用交租食信用卡迎新</a></li>
          <li><a href="#calculation" className="text-blue-600 dark:text-blue-400 hover:underline">6. 交租回贈計算：抵唔抵？</a></li>
          <li><a href="#best-cards" className="text-blue-600 dark:text-blue-400 hover:underline">7. 交租信用卡推薦</a></li>
          <li><a href="#tips" className="text-blue-600 dark:text-blue-400 hover:underline">8. 交租慳錢貼士</a></li>
          <li><a href="#faq" className="text-blue-600 dark:text-blue-400 hover:underline">9. 常見問題 FAQ</a></li>
        </ul>
      </div>

      {/* Section 1: 總覽 */}
      <section id="overview" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Home className="h-6 w-6 text-blue-500" />
          1. 信用卡交租可以賺回贈？
        </h2>
        
        <p>
          傳統上，交租只能用<strong>銀行轉賬</strong>或<strong>支票</strong>，完全無回贈。
          但而家有 <strong>RentSmart</strong>、<strong>KeyChain Pay</strong> 等平台，
          可以用<strong>信用卡交租</strong>！
        </p>

        <div className="not-prose bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-5 border border-green-200 dark:border-green-800 my-6">
          <h4 className="font-bold text-green-800 dark:text-green-200 mb-3">💰 交租回贈例子</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-4">
              <p className="text-sm text-gray-500 mb-1">每月租金</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">$15,000</p>
            </div>
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-4">
              <p className="text-sm text-gray-500 mb-1">一年租金</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">$180,000</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-green-200 dark:border-green-700">
            <p className="text-green-700 dark:text-green-300 text-sm">
              以 2% 回贈計（如 EarnMORE）：<br />
              <strong className="text-lg">每年可賺 $3,600 回贈</strong>（未扣手續費）
            </p>
          </div>
        </div>

        <div className="not-prose bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-amber-800 dark:text-amber-200 mb-1">⚠️ 重要提醒</h4>
              <p className="text-amber-700 dark:text-amber-300 text-sm">
                交租平台會收取<strong>手續費（約 1.8-2.5%）</strong>，
                所以信用卡回贈要<strong>高過手續費</strong>先有著數！
                或者用嚟<strong>達成迎新要求</strong>。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: 平台比較 */}
      <section id="platforms" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Smartphone className="h-6 w-6 text-purple-500" />
          2. 交租平台比較：RentSmart vs KeyChain Pay
        </h2>

        <p>
          香港主要有兩個<strong>信用卡交租平台</strong>：<strong>RentSmart</strong> 同 <strong>KeyChain Pay</strong>。
          以下係詳細比較：
        </p>

        <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden my-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-purple-50 dark:bg-purple-900/20">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-purple-600 dark:text-purple-400">平台</th>
                  <th className="px-4 py-3 text-center font-medium text-purple-600 dark:text-purple-400">手續費</th>
                  <th className="px-4 py-3 text-center font-medium text-purple-600 dark:text-purple-400">支援物業</th>
                  <th className="px-4 py-3 text-center font-medium text-purple-600 dark:text-purple-400">付款方式</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {rentPlatforms.map((platform, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3 font-bold text-gray-900 dark:text-white">{platform.name}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`font-bold ${platform.fee === "0%（P2P）" ? "text-green-600" : "text-orange-600"}`}>
                        {platform.fee}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center text-gray-600 dark:text-gray-400 text-xs">
                      {platform.supports.join("、")}
                    </td>
                    <td className="px-4 py-3 text-center text-gray-600 dark:text-gray-400 text-xs">
                      {platform.paymentMethods.join("、")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="not-prose grid md:grid-cols-2 gap-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
            <h4 className="font-bold text-blue-800 dark:text-blue-200 mb-2">✅ RentSmart 優點</h4>
            <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1">
              <li>• 支援公屋、居屋、私樓</li>
              <li>• 流程清晰，容易使用</li>
              <li>• 支援多種信用卡</li>
            </ul>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 border border-purple-200 dark:border-purple-800">
            <h4 className="font-bold text-purple-800 dark:text-purple-200 mb-2">✅ KeyChain Pay 優點</h4>
            <ul className="text-purple-700 dark:text-purple-300 text-sm space-y-1">
              <li>• 界面簡單直接</li>
              <li>• 適合私樓租戶</li>
              <li>• 處理速度快</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 3: 公屋 */}
      <section id="public-housing" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Building2 className="h-6 w-6 text-teal-500" />
          3. 公屋交租信用卡攻略
        </h2>

        <p>
          <strong>公屋交租信用卡 {currentYear}</strong> 可透過 <strong>RentSmart</strong> 繳付。
          平台會代你繳款到房屋署，流程如下：
        </p>

        <div className="not-prose space-y-3 my-6">
          <div className="flex items-start gap-3 bg-teal-50 dark:bg-teal-900/20 rounded-xl p-4">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold">1</span>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">註冊 RentSmart 賬戶</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">填寫個人資料及租戶資料</p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-teal-50 dark:bg-teal-900/20 rounded-xl p-4">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold">2</span>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">輸入租金資料</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">物業地址、租金金額、繳費日期</p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-teal-50 dark:bg-teal-900/20 rounded-xl p-4">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold">3</span>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">用信用卡付款</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">選擇信用卡，完成付款（包括手續費）</p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-teal-50 dark:bg-teal-900/20 rounded-xl p-4">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold">4</span>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">RentSmart 代繳</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">平台會代你繳款到房屋署</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: 私樓 */}
      <section id="private-housing" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Home className="h-6 w-6 text-indigo-500" />
          4. 私樓交租信用卡攻略
        </h2>

        <p>
          <strong>私樓交租信用卡</strong> 有兩個方法：
        </p>

        <div className="not-prose grid md:grid-cols-2 gap-4 my-6">
          <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 border border-green-200 dark:border-green-800">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <h4 className="font-bold text-green-800 dark:text-green-200">方法 1：業主接受信用卡</h4>
            </div>
            <p className="text-green-700 dark:text-green-300 text-sm">
              如果業主有商業戶口或 PayMe Business，可直接用信用卡付款，<strong>無手續費</strong>！
              但呢種業主比較少見。
            </p>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-2 mb-2">
              <Smartphone className="h-5 w-5 text-blue-500" />
              <h4 className="font-bold text-blue-800 dark:text-blue-200">方法 2：透過平台</h4>
            </div>
            <p className="text-blue-700 dark:text-blue-300 text-sm">
              用 RentSmart 或 KeyChain Pay，平台會代你繳款到業主銀行戶口。
              <strong>手續費約 2%</strong>。
            </p>
          </div>
        </div>
      </section>

      {/* Section 5: 迎新 */}
      <section id="welcome-offer" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Star className="h-6 w-6 text-amber-500" />
          5. 用交租食信用卡迎新
        </h2>

        <p>
          <strong>信用卡迎新</strong>通常要求喺首 2-3 個月內簽賬指定金額。
          租金動輒萬幾蚊，<strong>用交租達成迎新</strong>超級容易！
        </p>

        <div className="not-prose bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-2xl p-5 border border-amber-200 dark:border-amber-800 my-6">
          <h4 className="font-bold text-amber-800 dark:text-amber-200 mb-3">🎁 適合用交租達成迎新嘅信用卡</h4>
          <div className="space-y-3">
            {welcomeOfferCards.map((card, index) => (
              <div key={index} className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 flex items-center justify-between">
                <div>
                  <Link href={`/cards/${card.id}`} className="font-medium text-blue-600 hover:underline dark:text-blue-400">{card.card}</Link>
                  <p className="text-xs text-gray-500">{card.months}內簽賬 {card.requirement}</p>
                </div>
                <span className="font-bold text-amber-600 dark:text-amber-400">{card.reward}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="not-prose bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
          <h4 className="font-bold text-green-800 dark:text-green-200 mb-2">💡 例子：用交租食 Citi Cash Back 迎新</h4>
          <p className="text-green-700 dark:text-green-300 text-sm">
            迎新要求：首 3 個月簽賬 $10,000 送 $1,000<br />
            租金：$15,000/月<br />
            <strong>一個月交租就達標！</strong>淨賺 $1,000 - 手續費 $300 = <strong>$700</strong>
          </p>
        </div>
      </section>

      {/* Section 6: 計算 */}
      <section id="calculation" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Calculator className="h-6 w-6 text-blue-500" />
          6. 交租回贈計算：抵唔抵？
        </h2>

        <p>
          信用卡交租抵唔抵，要計<strong>回贈 - 手續費</strong>：
        </p>

        <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-5 my-6">
          <h4 className="font-bold text-gray-900 dark:text-white mb-3">📊 以 $15,000 租金計算</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-3 py-2 text-left">信用卡</th>
                  <th className="px-3 py-2 text-center">回贈率</th>
                  <th className="px-3 py-2 text-center">回贈金額</th>
                  <th className="px-3 py-2 text-center">手續費 (2%)</th>
                  <th className="px-3 py-2 text-center">淨回贈</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                <tr>
                  <td className="px-3 py-2"><Link href="/cards/earnmore" className="text-blue-600 hover:underline">EarnMORE</Link></td>
                  <td className="px-3 py-2 text-center">2%</td>
                  <td className="px-3 py-2 text-center text-green-600">$300</td>
                  <td className="px-3 py-2 text-center text-red-600">-$300</td>
                  <td className="px-3 py-2 text-center font-bold text-gray-600">$0</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-900">
                  <td className="px-3 py-2"><Link href="/cards/sc-simply-cash" className="text-blue-600 hover:underline">Simply Cash</Link></td>
                  <td className="px-3 py-2 text-center">1.5%</td>
                  <td className="px-3 py-2 text-center text-green-600">$225</td>
                  <td className="px-3 py-2 text-center text-red-600">-$300</td>
                  <td className="px-3 py-2 text-center font-bold text-red-600">-$75</td>
                </tr>
                <tr>
                  <td className="px-3 py-2"><Link href="/cards/citi-cashback" className="text-blue-600 hover:underline">Citi Cash Back</Link></td>
                  <td className="px-3 py-2 text-center">1%</td>
                  <td className="px-3 py-2 text-center text-green-600">$150</td>
                  <td className="px-3 py-2 text-center text-red-600">-$300</td>
                  <td className="px-3 py-2 text-center font-bold text-red-600">-$150</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-3">*以上為估算，實際手續費視乎平台而定</p>
        </div>

        <div className="not-prose bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-blue-800 dark:text-blue-200 mb-1">💡 結論</h4>
              <p className="text-blue-700 dark:text-blue-300 text-sm">
                單計回贈，信用卡交租<strong>通常唔抵</strong>（手續費 ≈ 回贈）。<br />
                但如果用嚟<strong>達成迎新要求</strong>，就非常抵！
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: 推薦信用卡 */}
      <section id="best-cards" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Trophy className="h-6 w-6 text-amber-500" />
          7. 交租信用卡推薦
        </h2>

        <p>
          以下係<strong>交租信用卡 {currentYear}</strong> 推薦：
        </p>

        <div className="not-prose space-y-4 my-6">
          {recommendedCards.map((card, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xl mr-2">{["🥇", "🥈", "🥉", "4️⃣"][index]}</span>
                  <Link href={`/cards/${card.id}`} className="font-bold text-blue-600 hover:underline dark:text-blue-400">{card.card}</Link>
                  <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                    {card.highlight}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-green-600 dark:text-green-400">{card.rate}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{card.reason}</p>
              <p className="text-xs text-gray-500 mt-1">{card.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Card Preview Section */}
      <CardPreviewSection 
        title="📌 交租推薦信用卡一覽"
        subtitle="點擊查看詳細回贈條款及迎新優惠"
        cards={[
          { id: "earnmore", highlight: "2% 無上限" },
          { id: "sc-simply-cash", highlight: "1.5% 無上限" },
          { id: "citi-cashback", highlight: "迎新抵" },
          { id: "hsbc-red", highlight: "網購 4%" },
        ]}
      />

      {/* Section 8: 貼士 */}
      <section id="tips" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Zap className="h-6 w-6 text-yellow-500" />
          8. 交租慳錢貼士
        </h2>

        <div className="not-prose space-y-3">
          {[
            { icon: "🎯", title: "用迎新卡交租", desc: "將交租當作達成迎新目標，賺取額外回贈" },
            { icon: "💳", title: "揀高回贈卡", desc: "用 2% 或以上回贈嘅信用卡（如 EarnMORE）" },
            { icon: "📅", title: "留意手續費變動", desc: "平台手續費可能調整，記得定期比較" },
            { icon: "🔄", title: "配合其他優惠", desc: "部分銀行有交租優惠活動，留意最新資訊" },
            { icon: "💰", title: "計清楚先碌卡", desc: "如果回贈低過手續費，可能直接轉賬更抵" },
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

      {/* Section 9: FAQ */}
      <section id="faq" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          ❓ 9. 常見問題 FAQ
        </h2>
        
        <div className="not-prose space-y-4">
          {rentPaymentFaqData.map((faq, index) => (
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
        <h3 className="text-xl font-bold mb-2">💳 想知邊張信用卡最適合你？</h3>
        <p className="mb-4 opacity-90">用我哋嘅計算機，輸入你嘅消費習慣，即刻搵到最高回贈嘅信用卡！</p>
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
          <Link href="/discover/utility-bill-guide" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
            <Zap className="h-5 w-5 text-emerald-600" />
            <span>信用卡繳費攻略</span>
            <ChevronRight className="h-4 w-4 ml-auto text-gray-400" />
          </Link>
          <Link href="/discover/best-cashback-cards" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
            <DollarSign className="h-5 w-5 text-emerald-600" />
            <span>最高回贈信用卡比較</span>
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

