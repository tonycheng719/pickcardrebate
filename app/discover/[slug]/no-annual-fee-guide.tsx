// 永久免年費信用卡攻略
// 用於 /discover/no-annual-fee-guide 頁面

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  ChevronRight, ChevronDown, CreditCard, DollarSign, Shield,
  Calculator, Trophy, CheckCircle, AlertTriangle,
  Star, Phone, Info, Zap, Percent, Gift, Ban
} from "lucide-react";
import { CardPreviewSection } from "@/app/discover/components/card-preview-section";

// FAQ 數據
export const noAnnualFeeFaqData = [
  {
    question: "邊張信用卡永久免年費？",
    answer: "真正永久免年費嘅信用卡包括：渣打 Simply Cash、安信 EarnMORE、HSBC Red Card、WeWa 銀聯卡等。呢啲卡唔使打電話 waive 年費，終身免年費。"
  },
  {
    question: "信用卡年費可以 waive 嗎？",
    answer: "可以！大部分銀行都可以透過打電話 waive 年費。通常喺收到年費通知後致電銀行客服，話想 waive 年費就得。成功率好高，尤其係有簽賬記錄嘅客戶。"
  },
  {
    question: "HSBC 信用卡年費點 waive？",
    answer: "HSBC 信用卡可以透過 App、網上理財或致電熱線申請豁免年費。HSBC Red Card 永久免年費唔使 waive。其他卡如 Visa Signature 首兩年免年費，之後可打電話申請豁免。"
  },
  {
    question: "Citi 信用卡年費點 waive？",
    answer: "Citi 信用卡可致電客服熱線申請豁免年費。通常有簽賬記錄嘅客戶成功率較高。Citi Cash Back 年費 $1,200，建議主動打電話要求 waive。"
  },
  {
    question: "信用卡年費幾時收？",
    answer: "信用卡年費通常喺批卡後一年收取（首年可能免費）。銀行會喺月結單顯示年費，收到後可即時致電要求豁免。部分卡首年免年費，第二年開始收取。"
  },
  {
    question: "免年費信用卡回贈高嗎？",
    answer: "免年費信用卡回贈唔一定低！Simply Cash 1.5% 無上限、EarnMORE 2% 無上限、HSBC Red Card 網購 4%。呢啲都係永久免年費嘅高回贈卡。"
  },
  {
    question: "年費信用卡值得申請嗎？",
    answer: "視乎你嘅消費習慣。如果簽賬金額大、可以賺回超過年費嘅回贈，年費卡可能更抵。例如 Visa Signature 年費 $2,000，但餐飲 3.6% 回贈，一年餐飲消費 $60,000 就可以賺回年費。"
  },
  {
    question: "信用卡年費可以退嗎？",
    answer: "如果已經扣咗年費，可以致電銀行要求退回。大部分銀行都會配合，尤其係長期客戶。如果銀行拒絕，可以考慮 cut 卡。"
  }
];

// 永久免年費信用卡
const permanentFreeCards = [
  {
    card: "渣打 Simply Cash Visa",
    id: "sc-simply-cash",
    rate: "1.5% 無上限",
    highlight: "最強打底卡",
    minIncome: "$96,000",
    features: ["永久免年費", "1.5% 本地無上限", "2% 海外無上限"],
  },
  {
    card: "安信 EarnMORE 銀聯卡",
    id: "earnmore",
    rate: "2% 無上限",
    highlight: "最高回贈",
    minIncome: "$150,000",
    features: ["永久免年費", "2% Mobile Pay 無上限", "免 CBF"],
  },
  {
    card: "HSBC Red Card",
    id: "hsbc-red",
    rate: "網購 4%",
    highlight: "網購首選",
    minIncome: "無",
    features: ["永久免年費", "網購 4%", "超市 2%"],
  },
  {
    card: "WeWa 銀聯卡",
    id: "wewa",
    rate: "4% 玩樂",
    highlight: "玩樂最強",
    minIncome: "$150,000",
    features: ["永久免年費", "玩樂類別 4%", "免 CBF"],
  },
  {
    card: "Mox Card",
    id: "mox",
    rate: "無限1%",
    highlight: "虛擬銀行",
    minIncome: "無",
    features: ["永久免年費", "1% CashBack", "免外幣手續費"],
  },
];

// 可 waive 年費信用卡
const waivableCards = [
  {
    card: "HSBC Visa Signature",
    id: "hsbc-vs",
    annualFee: "$2,000",
    freeYears: "首 2 年",
    waiveMethod: "App / 電話",
    waiveSuccess: "高",
    rate: "餐飲 3.6%",
  },
  {
    card: "Citi Cash Back Card",
    id: "citi-cashback",
    annualFee: "$1,200",
    freeYears: "-",
    waiveMethod: "電話",
    waiveSuccess: "高",
    rate: "餐飲 2%",
  },
  {
    card: "Citi PremierMiles",
    id: "citi-premiermiles",
    annualFee: "$1,800",
    freeYears: "-",
    waiveMethod: "電話",
    waiveSuccess: "中",
    rate: "海外 $3/里",
  },
  {
    card: "恒生 MMPOWER",
    id: "hangseng-mmpower",
    annualFee: "$300",
    freeYears: "首年",
    waiveMethod: "電話",
    waiveSuccess: "高",
    rate: "網購 5%",
  },
  {
    card: "SC 國泰 Mastercard",
    id: "sc-cathay",
    annualFee: "$1,800",
    freeYears: "首年",
    waiveMethod: "電話",
    waiveSuccess: "中高",
    rate: "海外 $4/里",
  },
];

// 年費 waive 攻略
const waiveTips = [
  {
    bank: "HSBC",
    method: "HSBC App → 服務 → 豁免年費",
    phone: "2233 3000",
    tips: "網上申請最方便，長期客戶成功率高",
  },
  {
    bank: "Citi",
    method: "致電客服熱線",
    phone: "2860 0333",
    tips: "有簽賬記錄成功率較高，可話考慮 cut 卡",
  },
  {
    bank: "恒生",
    method: "致電客服熱線",
    phone: "2998 8000",
    tips: "綜合理財客戶較易成功",
  },
  {
    bank: "渣打",
    method: "致電客服熱線",
    phone: "2886 8888",
    tips: "Simply Cash 永久免年費唔使 waive",
  },
  {
    bank: "DBS",
    method: "致電客服熱線",
    phone: "2290 8888",
    tips: "有簽賬記錄成功率較高",
  },
];

export function NoAnnualFeeGuide() {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      {/* 引言 */}
      <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-6">
        信用卡年費年年俾，點解唔揀張<strong>永久免年費信用卡</strong>？
        本文教你 <strong>{currentYear} 免年費信用卡推薦</strong>，
        仲有<strong>年費豁免攻略</strong>，教你點打電話 waive 年費！
      </p>

      {/* 目錄 */}
      <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-10">
        <h2 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          📑 本文目錄
        </h2>
        <ul className="space-y-2 text-sm">
          <li><a href="#overview" className="text-blue-600 dark:text-blue-400 hover:underline">1. 點解要揀免年費信用卡？</a></li>
          <li><a href="#permanent-free" className="text-blue-600 dark:text-blue-400 hover:underline">2. 永久免年費信用卡推薦</a></li>
          <li><a href="#waivable" className="text-blue-600 dark:text-blue-400 hover:underline">3. 可 waive 年費信用卡</a></li>
          <li><a href="#waive-guide" className="text-blue-600 dark:text-blue-400 hover:underline">4. 年費豁免攻略</a></li>
          <li><a href="#hsbc" className="text-blue-600 dark:text-blue-400 hover:underline">5. HSBC 年費 waive 方法</a></li>
          <li><a href="#citi" className="text-blue-600 dark:text-blue-400 hover:underline">6. Citi 年費 waive 方法</a></li>
          <li><a href="#comparison" className="text-blue-600 dark:text-blue-400 hover:underline">7. 免年費 vs 年費卡比較</a></li>
          <li><a href="#best-cards" className="text-blue-600 dark:text-blue-400 hover:underline">8. 免年費信用卡排行榜</a></li>
          <li><a href="#tips" className="text-blue-600 dark:text-blue-400 hover:underline">9. 慳年費貼士</a></li>
          <li><a href="#faq" className="text-blue-600 dark:text-blue-400 hover:underline">10. 常見問題 FAQ</a></li>
        </ul>
      </div>

      {/* Section 1: 總覽 */}
      <section id="overview" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <DollarSign className="h-6 w-6 text-green-500" />
          1. 點解要揀免年費信用卡？
        </h2>
        
        <p>
          信用卡年費可以由 <strong>$300 到 $3,800</strong> 不等，
          如果唔識揀，每年白白俾幾千蚊：
        </p>

        <div className="not-prose bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-2xl p-5 border border-red-200 dark:border-red-800 my-6">
          <h4 className="font-bold text-red-800 dark:text-red-200 mb-3">💸 年費成本例子</h4>
          <div className="grid md:grid-cols-3 gap-3">
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 text-center">
              <p className="text-sm text-gray-500">普通卡</p>
              <p className="text-xl font-bold text-red-600">$300-$600/年</p>
            </div>
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 text-center">
              <p className="text-sm text-gray-500">Signature 卡</p>
              <p className="text-xl font-bold text-red-600">$1,200-$2,000/年</p>
            </div>
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 text-center">
              <p className="text-sm text-gray-500">高級卡</p>
              <p className="text-xl font-bold text-red-600">$2,500-$3,800/年</p>
            </div>
          </div>
          <p className="text-red-700 dark:text-red-300 text-sm mt-3">
            5 張信用卡一年可能要俾 <strong>$5,000-$10,000</strong> 年費！
          </p>
        </div>

        <div className="not-prose bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
          <h4 className="font-bold text-green-800 dark:text-green-200 mb-2">✅ 免年費信用卡優點</h4>
          <ul className="text-green-700 dark:text-green-300 text-sm space-y-1">
            <li>• 唔使每年打電話 waive 年費</li>
            <li>• 回贈係淨賺，唔使扣年費成本</li>
            <li>• 可以放喺銀包備用，唔使擔心年費</li>
          </ul>
        </div>
      </section>

      {/* Section 2: 永久免年費 */}
      <section id="permanent-free" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Shield className="h-6 w-6 text-blue-500" />
          2. 永久免年費信用卡推薦
        </h2>

        <p>
          以下係<strong>真正永久免年費</strong>嘅信用卡，唔使 waive：
        </p>

        <div className="not-prose space-y-4 my-6">
          {permanentFreeCards.map((card, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xl mr-2">{["🥇", "🥈", "🥉", "4️⃣", "5️⃣"][index]}</span>
                  <Link href={`/cards/${card.id}`} className="font-bold text-blue-600 hover:underline dark:text-blue-400">{card.card}</Link>
                  <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                    {card.highlight}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-600 dark:text-green-400">{card.rate}</p>
                  <p className="text-xs text-gray-500">年薪要求：{card.minIncome}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {card.features.map((feature, i) => (
                  <span key={i} className="inline-flex items-center px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs text-gray-600 dark:text-gray-400">
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Card Preview Section */}
      <CardPreviewSection 
        title="📌 永久免年費信用卡一覽"
        subtitle="點擊查看詳細回贈條款及申請連結"
        cards={[
          { id: "sc-simply-cash", highlight: "永久免年費" },
          { id: "earnmore", highlight: "2% 無上限" },
          { id: "hsbc-red", highlight: "網購 4%" },
          { id: "wewa", highlight: "玩樂 4%" },
        ]}
      />

      {/* Section 3: 可 waive */}
      <section id="waivable" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Phone className="h-6 w-6 text-purple-500" />
          3. 可 waive 年費信用卡
        </h2>

        <p>
          以下信用卡雖然有年費，但可以透過打電話 waive：
        </p>

        <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden my-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-purple-50 dark:bg-purple-900/20">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-purple-600 dark:text-purple-400">信用卡</th>
                  <th className="px-4 py-3 text-center font-medium text-purple-600 dark:text-purple-400">年費</th>
                  <th className="px-4 py-3 text-center font-medium text-purple-600 dark:text-purple-400">免費期</th>
                  <th className="px-4 py-3 text-center font-medium text-purple-600 dark:text-purple-400">Waive 方法</th>
                  <th className="px-4 py-3 text-center font-medium text-purple-600 dark:text-purple-400">成功率</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {waivableCards.map((card, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3">
                      <Link href={`/cards/${card.id}`} className="font-medium text-blue-600 hover:underline dark:text-blue-400">
                        {card.card}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-center text-red-600 font-bold">{card.annualFee}</td>
                    <td className="px-4 py-3 text-center text-gray-600 dark:text-gray-400">{card.freeYears}</td>
                    <td className="px-4 py-3 text-center text-gray-600 dark:text-gray-400">{card.waiveMethod}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${
                        card.waiveSuccess === "高" ? "bg-green-100 text-green-700" :
                        card.waiveSuccess === "中高" ? "bg-yellow-100 text-yellow-700" :
                        "bg-orange-100 text-orange-700"
                      }`}>
                        {card.waiveSuccess}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section 4: Waive 攻略 */}
      <section id="waive-guide" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Zap className="h-6 w-6 text-yellow-500" />
          4. 年費豁免攻略
        </h2>

        <p>
          以下係各銀行<strong>waive 年費方法</strong>：
        </p>

        <div className="not-prose space-y-4 my-6">
          {waiveTips.map((bank, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-bold text-gray-900 dark:text-white">{bank.bank}</h4>
                <span className="text-xs bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded text-blue-600 dark:text-blue-400">
                  📞 {bank.phone}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                <strong>方法：</strong>{bank.method}
              </p>
              <p className="text-xs text-gray-500">
                💡 {bank.tips}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 5: HSBC */}
      <section id="hsbc" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <CreditCard className="h-6 w-6 text-red-500" />
          5. HSBC 年費 waive 方法
        </h2>

        <div className="not-prose space-y-3 my-6">
          <div className="flex items-start gap-3 bg-red-50 dark:bg-red-900/20 rounded-xl p-4">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center font-bold">1</span>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">HSBC App 申請</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">打開 HSBC HK App → 服務 → 信用卡 → 豁免年費</p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-red-50 dark:bg-red-900/20 rounded-xl p-4">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center font-bold">2</span>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">網上理財</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">登入網上理財 → 信用卡 → 申請豁免年費</p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-red-50 dark:bg-red-900/20 rounded-xl p-4">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center font-bold">3</span>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">致電熱線</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">📞 2233 3000 → 信用卡服務 → 要求豁免年費</p>
            </div>
          </div>
        </div>

        <div className="not-prose bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <p className="text-blue-700 dark:text-blue-300 text-sm">
              <strong>提示：</strong><Link href="/cards/hsbc-red" className="text-blue-600 hover:underline">HSBC Red Card</Link> 永久免年費，唔使 waive！
            </p>
          </div>
        </div>
      </section>

      {/* Section 6: Citi */}
      <section id="citi" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <CreditCard className="h-6 w-6 text-blue-500" />
          6. Citi 年費 waive 方法
        </h2>

        <div className="not-prose space-y-3 my-6">
          <div className="flex items-start gap-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">1</span>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">致電客服熱線</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">📞 2860 0333 → 信用卡服務 → 要求豁免年費</p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">2</span>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">表達意願</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">話「想豁免年費」，如被拒可話「考慮 cut 卡」</p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">3</span>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">確認結果</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">成功後會收到確認短訊，年費會喺下期月結單退回</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: 比較 */}
      <section id="comparison" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Percent className="h-6 w-6 text-indigo-500" />
          7. 免年費 vs 年費卡比較
        </h2>

        <div className="not-prose grid md:grid-cols-2 gap-4 my-6">
          <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 border border-green-200 dark:border-green-800">
            <h4 className="font-bold text-green-800 dark:text-green-200 mb-3 flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              免年費卡優點
            </h4>
            <ul className="text-green-700 dark:text-green-300 text-sm space-y-1">
              <li>• 唔使煩 waive 年費</li>
              <li>• 回贈係淨賺</li>
              <li>• 可以放喺銀包備用</li>
              <li>• 適合簽賬金額唔高嘅人</li>
            </ul>
          </div>
          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 border border-amber-200 dark:border-amber-800">
            <h4 className="font-bold text-amber-800 dark:text-amber-200 mb-3 flex items-center gap-2">
              <Star className="h-5 w-5" />
              年費卡優點
            </h4>
            <ul className="text-amber-700 dark:text-amber-300 text-sm space-y-1">
              <li>• 回贈率通常較高</li>
              <li>• 有額外權益（機場貴賓室等）</li>
              <li>• 大額簽賬可賺回年費</li>
              <li>• 大部分可以 waive</li>
            </ul>
          </div>
        </div>

        <div className="not-prose bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4">
          <h4 className="font-bold text-gray-900 dark:text-white mb-2">💡 選擇建議</h4>
          <ul className="text-gray-600 dark:text-gray-400 text-sm space-y-1">
            <li>• <strong>每月簽賬 $5,000 以下</strong>：揀免年費卡（Simply Cash、EarnMORE）</li>
            <li>• <strong>每月簽賬 $10,000 以上</strong>：可考慮年費卡（Visa Signature），回贈可賺回年費</li>
            <li>• <strong>怕麻煩</strong>：揀永久免年費卡，唔使每年 waive</li>
          </ul>
        </div>
      </section>

      {/* Section 8: 排行榜 */}
      <section id="best-cards" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Trophy className="h-6 w-6 text-amber-500" />
          8. 免年費信用卡排行榜
        </h2>

        <div className="not-prose space-y-4 my-6">
          {[
            { rank: "🥇", card: "渣打 Simply Cash", id: "sc-simply-cash", rate: "1.5% 無上限", reason: "最強打底卡，永久免年費" },
            { rank: "🥈", card: "安信 EarnMORE", id: "earnmore", rate: "2% 無上限", reason: "Mobile Pay 最高回贈" },
            { rank: "🥉", card: "HSBC Red Card", id: "hsbc-red", rate: "網購 4%", reason: "網購超市首選，永久免年費" },
            { rank: "4️⃣", card: "WeWa 銀聯卡", id: "wewa", rate: "玩樂 4%", reason: "玩樂類別最強" },
            { rank: "5️⃣", card: "Mox Card", id: "mox", rate: "1% CashBack", reason: "虛擬銀行免年費" },
          ].map((card, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 flex items-center gap-4">
              <span className="text-2xl">{card.rank}</span>
              <div className="flex-1">
                <Link href={`/cards/${card.id}`} className="font-bold text-blue-600 hover:underline dark:text-blue-400">{card.card}</Link>
                <p className="text-sm text-gray-600 dark:text-gray-400">{card.reason}</p>
              </div>
              <span className="font-bold text-green-600 dark:text-green-400">{card.rate}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Section 9: 貼士 */}
      <section id="tips" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Zap className="h-6 w-6 text-yellow-500" />
          9. 慳年費貼士
        </h2>

        <div className="not-prose space-y-3">
          {[
            { icon: "💳", title: "揀永久免年費卡", desc: "Simply Cash、EarnMORE、Red Card 終身免年費" },
            { icon: "📞", title: "主動 waive 年費", desc: "收到年費通知即刻打電話，成功率高" },
            { icon: "🗓️", title: "設定提醒", desc: "信用卡年費到期前一個月設提醒" },
            { icon: "💬", title: "表達 cut 卡意願", desc: "銀行通常會為留住客戶而 waive 年費" },
            { icon: "🔄", title: "定期檢視", desc: "每年檢視信用卡，cut 走唔用嘅年費卡" },
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
          {noAnnualFeeFaqData.map((faq, index) => (
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
        <h3 className="text-xl font-bold mb-2">💳 想知邊張免年費信用卡最適合你？</h3>
        <p className="mb-4 opacity-90">用我哋嘅計算機，輸入你嘅消費類別，即刻搵到最高回贈嘅信用卡！</p>
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
          <Link href="/cards" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
            <CreditCard className="h-5 w-5 text-emerald-600" />
            <span>所有信用卡比較</span>
            <ChevronRight className="h-4 w-4 ml-auto text-gray-400" />
          </Link>
          <Link href="/blog/best-cards" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
            <Trophy className="h-5 w-5 text-emerald-600" />
            <span>信用卡排行榜</span>
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

