// 學生信用卡攻略
// 用於 /discover/student-card-guide 頁面

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  ChevronRight, ChevronDown, CreditCard, GraduationCap, BookOpen,
  Calculator, Trophy, DollarSign, CheckCircle, AlertTriangle,
  Star, FileText, Info, Zap, Percent, Gift, Users
} from "lucide-react";
import { CardPreviewSection } from "@/app/discover/components/card-preview-section";

// FAQ 數據
export const studentCardFaqData = [
  {
    question: "大學生可以申請信用卡嗎？",
    answer: "可以！香港多間銀行提供學生信用卡，只要係全日制大專或大學學生就可以申請。學生卡通常唔需要入息證明，但信用額度較低（通常 $5,000-$10,000）。"
  },
  {
    question: "學生信用卡邊張最好？",
    answer: "推薦學生申請嘅信用卡包括：HSBC Red Card（永久免年費、網購 4%）、恒生 MMPOWER（網購 5%）、渣打 Simply Cash（1.5% 無上限）。呢啲卡都唔需要入息證明。"
  },
  {
    question: "學生信用卡有年費嗎？",
    answer: "大部分學生信用卡都免年費！HSBC Red Card、Mox Card 永久免年費；部分銀行學生卡首年免年費，之後可以打電話 waive。"
  },
  {
    question: "學生信用卡信用額度幾多？",
    answer: "學生信用卡信用額度通常較低，約 $5,000-$10,000。因為學生無穩定收入，銀行會設較低額度。隨住你嘅信用記錄建立，額度可以逐漸增加。"
  },
  {
    question: "學生申請信用卡需要咩文件？",
    answer: "學生申請信用卡需要：(1) 香港身份證；(2) 學生證或在學證明；(3) 住址證明。唔需要入息證明或糧單。部分銀行可以網上申請。"
  },
  {
    question: "學生信用卡可以儲里數嗎？",
    answer: "可以！但學生較難申請高端里數卡。建議先申請 HSBC Red Card 或 Simply Cash 儲現金回贈，畢業後再轉里數卡。"
  },
  {
    question: "信用卡對學生有咩好處？",
    answer: "學生用信用卡嘅好處：(1) 建立信用記錄；(2) 賺取回贈/積分；(3) 網購更方便；(4) 有消費保障。但要記住準時還款，唔好只還最低還款額。"
  },
  {
    question: "學生信用卡可以交學費嗎？",
    answer: "可以！用信用卡交學費可以賺回贈或達成迎新要求。但部分大學可能收手續費，建議先查詢。用 AlipayHK 或 BoC Pay 交學費可能有額外優惠。"
  }
];

// 學生信用卡推薦
const studentCards = [
  {
    card: "HSBC Red Card",
    id: "hsbc-red",
    rate: "網購 4%",
    highlight: "學生首選",
    minIncome: "無需入息",
    annualFee: "永久免年費",
    creditLimit: "$5,000-$10,000",
    features: ["永久免年費", "網購 4%", "超市 2%", "無需入息證明"],
    whyGood: "最適合學生嘅全能卡，網購回贈高",
  },
  {
    card: "恒生 MMPOWER World",
    id: "hangseng-mmpower",
    rate: "網購 5%",
    highlight: "網購最強",
    minIncome: "$150,000",
    annualFee: "$300（可 waive）",
    creditLimit: "視乎審批",
    features: ["網購 5%", "Mobile Pay 5%", "年費可 waive"],
    whyGood: "網購回贈最高，但需入息證明",
  },
  {
    card: "渣打 Simply Cash Visa",
    id: "sc-simply-cash",
    rate: "1.5% 無上限",
    highlight: "無上限",
    minIncome: "$96,000",
    annualFee: "永久免年費",
    creditLimit: "視乎審批",
    features: ["永久免年費", "1.5% 無上限", "2% 海外"],
    whyGood: "畢業前申請，長期持有",
  },
  {
    card: "Mox Card",
    id: "mox",
    rate: "1% CashBack",
    highlight: "無需入息",
    minIncome: "無需入息",
    annualFee: "永久免年費",
    creditLimit: "視乎審批",
    features: ["永久免年費", "1% CashBack", "免外幣手續費", "無需入息證明"],
    whyGood: "虛擬銀行最易申請",
  },
  {
    card: "ZA Card",
    id: "za",
    rate: "高達 11%",
    highlight: "高回贈",
    minIncome: "無需入息",
    annualFee: "永久免年費",
    creditLimit: "視乎審批",
    features: ["永久免年費", "指定商戶高回贈", "無需入息證明"],
    whyGood: "虛擬銀行，App 體驗好",
  },
];

// 申請要求比較
const requirementComparison = [
  { card: "HSBC Red Card", id: "hsbc-red", income: "無需", studentProof: "需要", approval: "容易" },
  { card: "Mox Card", id: "mox", income: "無需", studentProof: "無需", approval: "最容易" },
  { card: "ZA Card", id: "za", income: "無需", studentProof: "無需", approval: "最容易" },
  { card: "恒生 MMPOWER", id: "hangseng-mmpower", income: "$150,000", studentProof: "-", approval: "較難" },
  { card: "Simply Cash", id: "sc-simply-cash", income: "$96,000", studentProof: "-", approval: "中等" },
];

// 學生用卡場景
const useCases = [
  {
    scenario: "網購教科書",
    bestCards: [
      { card: "恒生 MMPOWER", id: "hangseng-mmpower", rate: "5%" },
      { card: "HSBC Red Card", id: "hsbc-red", rate: "4%" },
    ],
    tips: "開學前網購教科書可賺回贈",
  },
  {
    scenario: "交學費",
    bestCards: [
      { card: "Simply Cash", id: "sc-simply-cash", rate: "1.5%" },
      { card: "HSBC Red Card", id: "hsbc-red", rate: "1%" },
    ],
    tips: "用 AlipayHK 交學費可能有額外優惠",
  },
  {
    scenario: "食飯/聚餐",
    bestCards: [
      { card: "Citi Cash Back", id: "citi-cashback", rate: "2%" },
      { card: "HSBC Red Card", id: "hsbc-red", rate: "1%" },
    ],
    tips: "同學聚餐用餐飲卡賺回贈",
  },
  {
    scenario: "交通（八達通）",
    bestCards: [
      { card: "支援自動增值卡", id: null, rate: "0.4-1%" },
    ],
    tips: "八達通自動增值可賺小量回贈",
  },
  {
    scenario: "海外交流",
    bestCards: [
      { card: "Mox Card", id: "mox", rate: "免手續費" },
      { card: "Simply Cash", id: "sc-simply-cash", rate: "2% 海外" },
    ],
    tips: "海外消費用免手續費卡",
  },
];

export function StudentCardGuide() {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      {/* 引言 */}
      <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-6">
        大學生都可以有信用卡！本文教你 <strong>{currentYear} 學生信用卡攻略</strong>，
        邊張卡最易申請、點樣建立信用記錄、網購/交學費賺回贈，
        仲有<strong>免入息證明</strong>嘅學生卡推薦！
      </p>

      {/* 目錄 */}
      <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-10">
        <h2 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          📑 本文目錄
        </h2>
        <ul className="space-y-2 text-sm">
          <li><a href="#overview" className="text-blue-600 dark:text-blue-400 hover:underline">1. 學生可以申請信用卡嗎？</a></li>
          <li><a href="#benefits" className="text-blue-600 dark:text-blue-400 hover:underline">2. 學生用信用卡嘅好處</a></li>
          <li><a href="#requirements" className="text-blue-600 dark:text-blue-400 hover:underline">3. 學生申請信用卡要咩文件？</a></li>
          <li><a href="#comparison" className="text-blue-600 dark:text-blue-400 hover:underline">4. 學生信用卡申請要求比較</a></li>
          <li><a href="#best-cards" className="text-blue-600 dark:text-blue-400 hover:underline">5. 學生信用卡推薦</a></li>
          <li><a href="#use-cases" className="text-blue-600 dark:text-blue-400 hover:underline">6. 學生用卡場景攻略</a></li>
          <li><a href="#tuition" className="text-blue-600 dark:text-blue-400 hover:underline">7. 信用卡交學費攻略</a></li>
          <li><a href="#credit-building" className="text-blue-600 dark:text-blue-400 hover:underline">8. 建立信用記錄攻略</a></li>
          <li><a href="#tips" className="text-blue-600 dark:text-blue-400 hover:underline">9. 學生用卡貼士</a></li>
          <li><a href="#faq" className="text-blue-600 dark:text-blue-400 hover:underline">10. 常見問題 FAQ</a></li>
        </ul>
      </div>

      {/* Section 1: 總覽 */}
      <section id="overview" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <GraduationCap className="h-6 w-6 text-blue-500" />
          1. 學生可以申請信用卡嗎？
        </h2>
        
        <p>
          <strong>可以！</strong>香港多間銀行都接受學生申請信用卡：
        </p>

        <div className="not-prose bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-5 border border-blue-200 dark:border-blue-800 my-6">
          <h4 className="font-bold text-blue-800 dark:text-blue-200 mb-3">📚 學生申請信用卡條件</h4>
          <div className="grid md:grid-cols-2 gap-3">
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
              <p className="font-medium text-gray-900 dark:text-white">✅ 基本要求</p>
              <ul className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                <li>• 年滿 18 歲</li>
                <li>• 全日制大專/大學學生</li>
                <li>• 香港永久居民</li>
              </ul>
            </div>
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
              <p className="font-medium text-gray-900 dark:text-white">📄 所需文件</p>
              <ul className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                <li>• 香港身份證</li>
                <li>• 學生證/在學證明</li>
                <li>• 住址證明</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="not-prose bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
          <h4 className="font-bold text-green-800 dark:text-green-200 mb-2">💡 學生卡特點</h4>
          <ul className="text-green-700 dark:text-green-300 text-sm space-y-1">
            <li>• <strong>無需入息證明</strong>（部分卡）</li>
            <li>• 信用額度較低（$5,000-$10,000）</li>
            <li>• 大部分免年費</li>
          </ul>
        </div>
      </section>

      {/* Section 2: 好處 */}
      <section id="benefits" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Star className="h-6 w-6 text-yellow-500" />
          2. 學生用信用卡嘅好處
        </h2>

        <div className="not-prose grid md:grid-cols-2 gap-4 my-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">📈</span>
              <h4 className="font-bold text-gray-900 dark:text-white">建立信用記錄</h4>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              及早建立良好信用記錄，畢業後申請按揭、貸款更容易
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">💰</span>
              <h4 className="font-bold text-gray-900 dark:text-white">賺取回贈</h4>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              網購教科書、交學費都可以賺回贈，慳返唔少
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">🛒</span>
              <h4 className="font-bold text-gray-900 dark:text-white">網購更方便</h4>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              淘寶、Amazon、訂閱服務都需要信用卡
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">🛡️</span>
              <h4 className="font-bold text-gray-900 dark:text-white">消費保障</h4>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              信用卡有購物保障，遇到問題可以 chargeback
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: 要求 */}
      <section id="requirements" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <FileText className="h-6 w-6 text-purple-500" />
          3. 學生申請信用卡要咩文件？
        </h2>

        <div className="not-prose space-y-3 my-6">
          <div className="flex items-start gap-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4">
            <CheckCircle className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">香港身份證</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                需年滿 18 歲，香港永久居民
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4">
            <CheckCircle className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">學生證 / 在學證明</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                全日制大專或大學學生證，或學校發出嘅在學證明信
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4">
            <CheckCircle className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">住址證明</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                水電煤單、銀行月結單（3 個月內）
              </p>
            </div>
          </div>
        </div>

        <div className="not-prose bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-amber-700 dark:text-amber-300 text-sm">
              <strong>提示：</strong>虛擬銀行（Mox、ZA）通常只需身份證就可以開戶及申請信用卡，
              唔需要學生證或住址證明，最方便！
            </p>
          </div>
        </div>
      </section>

      {/* Section 4: 比較表 */}
      <section id="comparison" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Percent className="h-6 w-6 text-indigo-500" />
          4. 學生信用卡申請要求比較
        </h2>

        <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden my-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-indigo-50 dark:bg-indigo-900/20">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-indigo-600 dark:text-indigo-400">信用卡</th>
                  <th className="px-4 py-3 text-center font-medium text-indigo-600 dark:text-indigo-400">入息要求</th>
                  <th className="px-4 py-3 text-center font-medium text-indigo-600 dark:text-indigo-400">學生證明</th>
                  <th className="px-4 py-3 text-center font-medium text-indigo-600 dark:text-indigo-400">審批難度</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {requirementComparison.map((card, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3">
                      <Link href={`/cards/${card.id}`} className="font-medium text-blue-600 hover:underline dark:text-blue-400">
                        {card.card}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={card.income === "無需" ? "text-green-600 font-bold" : "text-gray-600"}>
                        {card.income}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center text-gray-600 dark:text-gray-400">{card.studentProof}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${
                        card.approval === "最容易" ? "bg-green-100 text-green-700" :
                        card.approval === "容易" ? "bg-blue-100 text-blue-700" :
                        card.approval === "中等" ? "bg-yellow-100 text-yellow-700" :
                        "bg-orange-100 text-orange-700"
                      }`}>
                        {card.approval}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section 5: 推薦信用卡 */}
      <section id="best-cards" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Trophy className="h-6 w-6 text-amber-500" />
          5. 學生信用卡推薦
        </h2>

        <p>
          以下係<strong>學生信用卡 {currentYear}</strong> 推薦：
        </p>

        <div className="not-prose space-y-4 my-6">
          {studentCards.map((card, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xl mr-2">{["🥇", "🥈", "🥉", "4️⃣", "5️⃣"][index]}</span>
                  <Link href={`/cards/${card.id}`} className="font-bold text-blue-600 hover:underline dark:text-blue-400">{card.card}</Link>
                  <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                    {card.highlight}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-600 dark:text-green-400">{card.rate}</p>
                  <p className="text-xs text-gray-500">年費：{card.annualFee}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{card.whyGood}</p>
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
        title="📌 學生推薦信用卡一覽"
        subtitle="點擊查看詳細回贈條款及申請連結"
        cards={[
          { id: "hsbc-red", highlight: "學生首選" },
          { id: "mox", highlight: "無需入息" },
          { id: "sc-simply-cash", highlight: "1.5% 無上限" },
          { id: "hangseng-mmpower", highlight: "網購 5%" },
        ]}
      />

      {/* Section 6: 場景 */}
      <section id="use-cases" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-teal-500" />
          6. 學生用卡場景攻略
        </h2>

        <div className="not-prose space-y-4 my-6">
          {useCases.map((useCase, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-bold text-gray-900 dark:text-white">{useCase.scenario}</h4>
              </div>
              <div className="flex flex-wrap gap-2 mb-2">
                {useCase.bestCards.map((card, i) => (
                  card.id ? (
                    <Link 
                      key={i} 
                      href={`/cards/${card.id}`}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-teal-50 dark:bg-teal-900/20 rounded-full text-xs text-teal-600 dark:text-teal-400 hover:bg-teal-100 dark:hover:bg-teal-900/40 transition-colors"
                    >
                      <CreditCard className="h-3 w-3" />
                      {card.card}
                      <span className="font-bold">{card.rate}</span>
                    </Link>
                  ) : (
                    <span 
                      key={i} 
                      className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs text-gray-600 dark:text-gray-400"
                    >
                      <CreditCard className="h-3 w-3" />
                      {card.card}
                    </span>
                  )
                ))}
              </div>
              <p className="text-xs text-gray-500">💡 {useCase.tips}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 7: 交學費 */}
      <section id="tuition" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <DollarSign className="h-6 w-6 text-green-500" />
          7. 信用卡交學費攻略
        </h2>

        <p>
          用信用卡交學費可以賺回贈或達成迎新要求：
        </p>

        <div className="not-prose space-y-3 my-6">
          <div className="flex items-start gap-3 bg-green-50 dark:bg-green-900/20 rounded-xl p-4">
            <span className="text-2xl">🎓</span>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">直接信用卡付款</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                部分大學接受信用卡交學費，<Link href="/cards/sc-simply-cash" className="text-blue-600 hover:underline">Simply Cash</Link> 1.5% 回贈
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
            <span className="text-2xl">📱</span>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">透過 AlipayHK / BoC Pay</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                用 AlipayHK 綁定信用卡交學費，免手續費賺回贈
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4">
            <span className="text-2xl">⚠️</span>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">注意手續費</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                部分大學收 1-2% 信用卡手續費，要計清楚先決定用咩方法
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 8: 建立信用 */}
      <section id="credit-building" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Users className="h-6 w-6 text-indigo-500" />
          8. 建立信用記錄攻略
        </h2>

        <div className="not-prose space-y-3 my-6">
          {[
            { step: "1", title: "準時還款", desc: "每月準時全額還款，建立良好還款記錄" },
            { step: "2", title: "唔好只還最低還款額", desc: "最低還款額會產生利息，影響信用評分" },
            { step: "3", title: "保持低使用率", desc: "信用額度使用率保持喺 30% 以下" },
            { step: "4", title: "長期持有", desc: "信用卡歷史越長，信用評分越高" },
          ].map((item, index) => (
            <div key={index} className="flex items-start gap-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold">{item.step}</span>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{item.title}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 9: 貼士 */}
      <section id="tips" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Zap className="h-6 w-6 text-yellow-500" />
          9. 學生用卡貼士
        </h2>

        <div className="not-prose space-y-3">
          {[
            { icon: "💳", title: "由簡單開始", desc: "先申請 HSBC Red Card 或 Mox Card，最易批核" },
            { icon: "📊", title: "控制消費", desc: "唔好因為有信用卡就亂使，量入為出" },
            { icon: "⏰", title: "準時還款", desc: "設定自動轉賬，確保唔會遲還款" },
            { icon: "📱", title: "用 App 管理", desc: "銀行 App 可以即時查睇消費記錄同還款日期" },
            { icon: "🎓", title: "畢業前申請", desc: "畢業後要有入息證明先批到好卡，趁學生身份申請" },
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
          {studentCardFaqData.map((faq, index) => (
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
        <h3 className="text-xl font-bold mb-2">💳 想知邊張學生信用卡最適合你？</h3>
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
          <Link href="/discover/no-annual-fee-guide" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
            <Gift className="h-5 w-5 text-emerald-600" />
            <span>免年費信用卡推薦</span>
            <ChevronRight className="h-4 w-4 ml-auto text-gray-400" />
          </Link>
          <Link href="/discover/online-shopping-guide" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
            <CreditCard className="h-5 w-5 text-emerald-600" />
            <span>網購信用卡攻略</span>
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
        </div>
      </div>
    </div>
  );
}

