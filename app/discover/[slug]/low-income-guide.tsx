// 免入息證明低門檻信用卡攻略
// 用於 /discover/low-income-guide 頁面

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  ChevronRight, ChevronDown, CreditCard, Users, FileText,
  Calculator, Trophy, DollarSign, CheckCircle, AlertTriangle,
  Star, Info, Zap, Percent, Gift, Clock, Home
} from "lucide-react";
import { CardPreviewSection } from "@/app/discover/components/card-preview-section";

// FAQ 數據
export const lowIncomeFaqData = [
  {
    question: "無入息證明可以申請信用卡嗎？",
    answer: "可以！虛擬銀行（Mox、ZA、WeLab）唔需要入息證明就可以申請信用卡。部分銀行亦接受以資產證明代替入息證明，例如存款證明、物業證明等。"
  },
  {
    question: "家庭主婦可以申請信用卡嗎？",
    answer: "可以！家庭主婦可以申請虛擬銀行信用卡（Mox、ZA），或者用配偶嘅入息證明申請附屬卡。部分銀行亦接受以資產證明申請。"
  },
  {
    question: "自僱人士點申請信用卡？",
    answer: "自僱人士可以提供商業登記證、稅單、銀行月結單等作為入息證明。如果冇正式文件，可以考慮虛擬銀行信用卡。"
  },
  {
    question: "現金出糧可以申請信用卡嗎？",
    answer: "現金出糧較難提供入息證明，但可以考慮：(1) 虛擬銀行信用卡；(2) 提供銀行存款記錄；(3) 提供稅單；(4) 申請附屬卡。"
  },
  {
    question: "信用卡年薪要求最低幾多？",
    answer: "傳統銀行最低年薪要求約 $60,000-$150,000。虛擬銀行（Mox、ZA）無年薪要求，只需香港居民身份證即可申請。"
  },
  {
    question: "無工作可以申請信用卡嗎？",
    answer: "可以！虛擬銀行（Mox、ZA）唔需要工作證明。另外亦可以用資產證明（如存款、物業）代替入息證明申請部分銀行信用卡。"
  },
  {
    question: "即時批核信用卡有邊張？",
    answer: "虛擬銀行（Mox、ZA、WeLab）通常可以即時批核。Mox Card 可以即開即用，唔使等實體卡。部分傳統銀行亦提供網上即時批核。"
  },
  {
    question: "信用卡額度唔夠點算？",
    answer: "可以：(1) 提供更多入息/資產證明申請提升額度；(2) 申請多張信用卡分散使用；(3) 建立良好還款記錄後銀行會主動加額。"
  }
];

// 免入息證明信用卡
const noIncomeCards = [
  {
    card: "Mox Card",
    id: "mox",
    incomeReq: "無需入息證明",
    approval: "即時批核",
    rate: "1% CashBack",
    highlight: "最易申請",
    features: ["永久免年費", "即開即用", "免外幣手續費"],
    suitable: ["學生", "家庭主婦", "自僱人士", "無業人士"],
  },
  {
    card: "ZA Card",
    id: "za",
    incomeReq: "無需入息證明",
    approval: "即時批核",
    rate: "高達 11%",
    highlight: "高回贈",
    features: ["永久免年費", "指定商戶高回贈", "ZA Bank 整合"],
    suitable: ["學生", "家庭主婦", "自僱人士"],
  },
  {
    card: "WeLab Debit Card",
    id: "welab",
    incomeReq: "無需入息證明",
    approval: "即時批核",
    rate: "高達 10%",
    highlight: "Debit Card",
    features: ["永久免年費", "指定商戶高回贈"],
    suitable: ["學生", "家庭主婦", "自僱人士"],
  },
  {
    card: "HSBC Red Card",
    id: "hsbc-red",
    incomeReq: "無需入息證明",
    approval: "較快",
    rate: "網購 4%",
    highlight: "傳統銀行",
    features: ["永久免年費", "網購 4%", "超市 2%"],
    suitable: ["學生", "HSBC 客戶"],
  },
];

// 低門檻信用卡（有入息要求但較低）
const lowRequirementCards = [
  {
    card: "渣打 Simply Cash",
    id: "sc-simply-cash",
    incomeReq: "$96,000/年",
    rate: "1.5% 無上限",
    highlight: "低門檻",
    features: ["永久免年費", "1.5% 無上限"],
  },
  {
    card: "Citi Cash Back",
    id: "citi-cashback",
    incomeReq: "$120,000/年",
    rate: "餐飲 2%",
    highlight: "中等門檻",
    features: ["餐飲 2%", "本地 1%"],
  },
  {
    card: "安信 EarnMORE",
    id: "earnmore",
    incomeReq: "$150,000/年",
    rate: "2% 無上限",
    highlight: "最高回贈",
    features: ["永久免年費", "Mobile Pay 2%"],
  },
  {
    card: "恒生 MMPOWER",
    id: "hangseng-mmpower",
    incomeReq: "$150,000/年",
    rate: "網購 5%",
    highlight: "網購最強",
    features: ["網購 5%", "Mobile Pay 5%"],
  },
];

// 申請人士類型
const applicantTypes = [
  {
    type: "家庭主婦",
    icon: "🏠",
    options: [
      "虛擬銀行卡（Mox、ZA）",
      "配偶附屬卡",
      "以資產證明申請"
    ],
    recommended: ["mox", "za"],
  },
  {
    type: "自僱人士",
    icon: "💼",
    options: [
      "虛擬銀行卡",
      "商業登記證 + 稅單",
      "銀行月結單"
    ],
    recommended: ["mox", "sc-simply-cash"],
  },
  {
    type: "現金出糧",
    icon: "💵",
    options: [
      "虛擬銀行卡",
      "銀行存款記錄",
      "稅單"
    ],
    recommended: ["mox", "za"],
  },
  {
    type: "學生",
    icon: "🎓",
    options: [
      "虛擬銀行卡",
      "HSBC Red Card",
      "學生證申請"
    ],
    recommended: ["hsbc-red", "mox"],
  },
  {
    type: "無業/待業",
    icon: "🔍",
    options: [
      "虛擬銀行卡",
      "以資產證明申請",
      "附屬卡"
    ],
    recommended: ["mox", "za"],
  },
];

export function LowIncomeGuide() {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      {/* 引言 */}
      <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-6">
        無入息證明都可以申請信用卡？本文教你 <strong>{currentYear} 免入息證明信用卡攻略</strong>，
        家庭主婦、自僱人士、現金出糧、學生都適用，
        <strong>即時批核</strong>信用卡推薦！
      </p>

      {/* 目錄 */}
      <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-10">
        <h2 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          📑 本文目錄
        </h2>
        <ul className="space-y-2 text-sm">
          <li><a href="#overview" className="text-blue-600 dark:text-blue-400 hover:underline">1. 無入息證明可以申請信用卡嗎？</a></li>
          <li><a href="#no-income-cards" className="text-blue-600 dark:text-blue-400 hover:underline">2. 免入息證明信用卡推薦</a></li>
          <li><a href="#low-requirement" className="text-blue-600 dark:text-blue-400 hover:underline">3. 低門檻信用卡比較</a></li>
          <li><a href="#applicant-types" className="text-blue-600 dark:text-blue-400 hover:underline">4. 不同申請人士攻略</a></li>
          <li><a href="#housewife" className="text-blue-600 dark:text-blue-400 hover:underline">5. 家庭主婦申請攻略</a></li>
          <li><a href="#self-employed" className="text-blue-600 dark:text-blue-400 hover:underline">6. 自僱人士申請攻略</a></li>
          <li><a href="#alternative-proof" className="text-blue-600 dark:text-blue-400 hover:underline">7. 以資產證明代替入息證明</a></li>
          <li><a href="#instant-approval" className="text-blue-600 dark:text-blue-400 hover:underline">8. 即時批核信用卡</a></li>
          <li><a href="#tips" className="text-blue-600 dark:text-blue-400 hover:underline">9. 申請貼士</a></li>
          <li><a href="#faq" className="text-blue-600 dark:text-blue-400 hover:underline">10. 常見問題 FAQ</a></li>
        </ul>
      </div>

      {/* Section 1: 總覽 */}
      <section id="overview" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <FileText className="h-6 w-6 text-blue-500" />
          1. 無入息證明可以申請信用卡嗎？
        </h2>
        
        <p>
          <strong>可以！</strong>虛擬銀行信用卡唔需要入息證明，
          只需香港居民身份證即可申請：
        </p>

        <div className="not-prose bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-5 border border-green-200 dark:border-green-800 my-6">
          <h4 className="font-bold text-green-800 dark:text-green-200 mb-3">✅ 免入息證明申請方法</h4>
          <div className="grid md:grid-cols-3 gap-3">
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 text-center">
              <p className="text-3xl mb-1">🏦</p>
              <p className="font-medium text-gray-900 dark:text-white">虛擬銀行</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Mox、ZA、WeLab</p>
            </div>
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 text-center">
              <p className="text-3xl mb-1">💰</p>
              <p className="font-medium text-gray-900 dark:text-white">資產證明</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">存款、物業、股票</p>
            </div>
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 text-center">
              <p className="text-3xl mb-1">👨‍👩‍👧</p>
              <p className="font-medium text-gray-900 dark:text-white">附屬卡</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">用配偶/家人主卡</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: 免入息證明卡 */}
      <section id="no-income-cards" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <CreditCard className="h-6 w-6 text-green-500" />
          2. 免入息證明信用卡推薦
        </h2>

        <p>
          以下信用卡<strong>唔需要入息證明</strong>即可申請：
        </p>

        <div className="not-prose space-y-4 my-6">
          {noIncomeCards.map((card, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xl mr-2">{["🥇", "🥈", "🥉", "4️⃣"][index]}</span>
                  <Link href={`/cards/${card.id}`} className="font-bold text-blue-600 hover:underline dark:text-blue-400">{card.card}</Link>
                  <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                    {card.highlight}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-600 dark:text-green-400">{card.rate}</p>
                  <p className="text-xs text-gray-500">{card.approval}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                <strong>入息要求：</strong>{card.incomeReq}
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {card.features.map((feature, i) => (
                  <span key={i} className="inline-flex items-center px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs text-gray-600 dark:text-gray-400">
                    {feature}
                  </span>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                適合：{card.suitable.join("、")}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Card Preview Section */}
      <CardPreviewSection 
        title="📌 免入息證明信用卡一覽"
        subtitle="點擊查看詳細條款及申請連結"
        cards={[
          { id: "mox", highlight: "即時批核" },
          { id: "hsbc-red", highlight: "網購 4%" },
          { id: "sc-simply-cash", highlight: "低門檻" },
          { id: "earnmore", highlight: "2% 無上限" },
        ]}
      />

      {/* Section 3: 低門檻卡 */}
      <section id="low-requirement" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Percent className="h-6 w-6 text-purple-500" />
          3. 低門檻信用卡比較
        </h2>

        <p>
          如果有入息證明，以下係<strong>年薪要求較低</strong>嘅信用卡：
        </p>

        <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden my-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-purple-50 dark:bg-purple-900/20">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-purple-600 dark:text-purple-400">信用卡</th>
                  <th className="px-4 py-3 text-center font-medium text-purple-600 dark:text-purple-400">年薪要求</th>
                  <th className="px-4 py-3 text-center font-medium text-purple-600 dark:text-purple-400">回贈</th>
                  <th className="px-4 py-3 text-center font-medium text-purple-600 dark:text-purple-400">特色</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {lowRequirementCards.map((card, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3">
                      <Link href={`/cards/${card.id}`} className="font-medium text-blue-600 hover:underline dark:text-blue-400">
                        {card.card}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-center text-gray-600 dark:text-gray-400">{card.incomeReq}</td>
                    <td className="px-4 py-3 text-center font-bold text-green-600 dark:text-green-400">{card.rate}</td>
                    <td className="px-4 py-3 text-center text-xs text-gray-500">{card.features.join("、")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section 4: 不同申請人士 */}
      <section id="applicant-types" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Users className="h-6 w-6 text-teal-500" />
          4. 不同申請人士攻略
        </h2>

        <div className="not-prose space-y-4 my-6">
          {applicantTypes.map((type, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{type.icon}</span>
                <h4 className="font-bold text-gray-900 dark:text-white">{type.type}</h4>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                <strong>申請方法：</strong>
              </p>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 mb-3">
                {type.options.map((option, i) => (
                  <li key={i}>• {option}</li>
                ))}
              </ul>
              <p className="text-xs text-gray-500">
                <strong>推薦：</strong>
                {type.recommended.map((cardId, i) => (
                  <span key={i}>
                    {i > 0 && "、"}
                    <Link href={`/cards/${cardId}`} className="text-blue-600 hover:underline">
                      {noIncomeCards.find(c => c.id === cardId)?.card || lowRequirementCards.find(c => c.id === cardId)?.card || cardId}
                    </Link>
                  </span>
                ))}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 5: 家庭主婦 */}
      <section id="housewife" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Home className="h-6 w-6 text-pink-500" />
          5. 家庭主婦申請攻略
        </h2>

        <div className="not-prose space-y-3 my-6">
          {[
            { step: "1", title: "虛擬銀行卡（首選）", desc: "Mox、ZA 唔需要入息證明，即開即用" },
            { step: "2", title: "配偶附屬卡", desc: "用配偶嘅信用卡申請附屬卡，共享額度" },
            { step: "3", title: "以資產證明申請", desc: "如有存款、物業，可以代替入息證明" },
            { step: "4", title: "聯名物業", desc: "聯名物業可作為資產證明申請信用卡" },
          ].map((item, index) => (
            <div key={index} className="flex items-start gap-3 bg-pink-50 dark:bg-pink-900/20 rounded-xl p-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-pink-500 text-white flex items-center justify-center font-bold">{item.step}</span>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{item.title}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 6: 自僱人士 */}
      <section id="self-employed" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <FileText className="h-6 w-6 text-orange-500" />
          6. 自僱人士申請攻略
        </h2>

        <div className="not-prose space-y-3 my-6">
          {[
            { step: "1", title: "商業登記證", desc: "提供有效嘅商業登記證" },
            { step: "2", title: "稅單 / 報稅表", desc: "個人稅單或公司報稅表" },
            { step: "3", title: "銀行月結單", desc: "最近 3-6 個月銀行月結單顯示收入" },
            { step: "4", title: "虛擬銀行卡", desc: "如冇以上文件，可考慮 Mox、ZA 等虛擬銀行卡" },
          ].map((item, index) => (
            <div key={index} className="flex items-start gap-3 bg-orange-50 dark:bg-orange-900/20 rounded-xl p-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">{item.step}</span>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{item.title}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 7: 資產證明 */}
      <section id="alternative-proof" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <DollarSign className="h-6 w-6 text-green-500" />
          7. 以資產證明代替入息證明
        </h2>

        <p>
          部分銀行接受以<strong>資產證明</strong>代替入息證明：
        </p>

        <div className="not-prose grid md:grid-cols-2 gap-4 my-6">
          <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 border border-green-200 dark:border-green-800">
            <h4 className="font-bold text-green-800 dark:text-green-200 mb-3">💰 可接受嘅資產證明</h4>
            <ul className="text-green-700 dark:text-green-300 text-sm space-y-1">
              <li>• 銀行存款證明（通常要求 $100,000+）</li>
              <li>• 物業證明（業主/聯名）</li>
              <li>• 股票/基金投資證明</li>
              <li>• 定期存款證明</li>
            </ul>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
            <h4 className="font-bold text-blue-800 dark:text-blue-200 mb-3">🏦 接受資產證明嘅銀行</h4>
            <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1">
              <li>• HSBC</li>
              <li>• 恒生銀行</li>
              <li>• 渣打銀行</li>
              <li>• 中銀香港</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 8: 即時批核 */}
      <section id="instant-approval" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Clock className="h-6 w-6 text-yellow-500" />
          8. 即時批核信用卡
        </h2>

        <p>
          以下信用卡可以<strong>即時批核</strong>，最快即日使用：
        </p>

        <div className="not-prose space-y-4 my-6">
          {[
            { card: "Mox Card", id: "mox", time: "即時批核、即開即用", note: "虛擬卡即時可用，實體卡約 1 週送到" },
            { card: "ZA Card", id: "za", time: "即時批核", note: "虛擬卡即時可用" },
            { card: "WeLab Bank", id: "welab", time: "即時批核", note: "Debit Card 即時可用" },
            { card: "HSBC Red Card", id: "hsbc-red", time: "最快 1-2 工作天", note: "網上申請較快" },
          ].map((card, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 flex items-center gap-4">
              <span className="text-2xl">⚡</span>
              <div className="flex-1">
                <Link href={`/cards/${card.id}`} className="font-bold text-blue-600 hover:underline dark:text-blue-400">{card.card}</Link>
                <p className="text-sm text-gray-600 dark:text-gray-400">{card.note}</p>
              </div>
              <span className="text-sm font-bold text-yellow-600 dark:text-yellow-400">{card.time}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Section 9: 貼士 */}
      <section id="tips" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Star className="h-6 w-6 text-yellow-500" />
          9. 申請貼士
        </h2>

        <div className="not-prose space-y-3">
          {[
            { icon: "🏦", title: "由虛擬銀行開始", desc: "Mox、ZA 最易批核，無入息要求" },
            { icon: "📄", title: "準備資產證明", desc: "存款、物業證明可代替入息證明" },
            { icon: "👨‍👩‍👧", title: "考慮附屬卡", desc: "用家人主卡申請附屬卡，共享額度" },
            { icon: "📊", title: "建立信用記錄", desc: "先用虛擬銀行卡建立良好記錄，再申請傳統銀行卡" },
            { icon: "⏰", title: "準時還款", desc: "良好還款記錄有助日後申請更高額度" },
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
          {lowIncomeFaqData.map((faq, index) => (
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
        <h3 className="text-xl font-bold mb-2">💳 想知邊張免入息信用卡最適合你？</h3>
        <p className="mb-4 opacity-90">用我哋嘅計算機，即刻搵到最適合你嘅信用卡！</p>
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
          <Link href="/discover/student-card-guide" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
            <Users className="h-5 w-5 text-emerald-600" />
            <span>學生信用卡攻略</span>
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

