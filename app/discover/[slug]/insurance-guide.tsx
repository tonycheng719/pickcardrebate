// 信用卡保費攻略
// 用於 /discover/insurance-guide 頁面

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  ChevronRight, ChevronDown, CreditCard, Shield, Heart,
  Calculator, Trophy, DollarSign, CheckCircle, AlertTriangle,
  Star, Info, Zap, Percent, Gift, Building, FileText
} from "lucide-react";
import { CardPreviewSection } from "@/app/discover/components/card-preview-section";

// FAQ 數據
export const insuranceFaqData = [
  {
    question: "信用卡交保費有回贈嗎？",
    answer: "部分信用卡交保費有回贈，但大多數銀行將保費列為「不合資格簽賬」，只有基本 0.4% 回贈或無回贈。建議用 EarnMORE（2%）或 Simply Cash（1.5%）交保費。"
  },
  {
    question: "邊張信用卡交保費最抵？",
    answer: "交保費推薦：安信 EarnMORE（2% 無上限）、渣打 Simply Cash（1.5%）。大部分銀行卡交保費只有基本回贈，EarnMORE 係少數有 2% 保費回贈嘅卡。"
  },
  {
    question: "AIA 保費可以用信用卡交嗎？",
    answer: "AIA 可以用信用卡交保費，但首年保費通常只接受自動轉賬。續保可以用信用卡，但部分信用卡可能無回贈。"
  },
  {
    question: "保誠保費可以用信用卡交嗎？",
    answer: "保誠可以用信用卡交保費，但有機會收取 1-2% 手續費。建議先向保險公司查詢，計算淨回贈是否值得。"
  },
  {
    question: "宏利保費可以用信用卡交嗎？",
    answer: "宏利可以用信用卡交保費，部分計劃可能收取手續費。建議用高回贈卡（如 EarnMORE 2%）抵銷手續費。"
  },
  {
    question: "保費分期用邊張卡？",
    answer: "如果保費較大，可以考慮用高迎新信用卡食迎新。例如新申請信用卡，用保費達成迎新簽賬要求，可以賺額外回贈。"
  },
  {
    question: "網上交保費有額外回贈嗎？",
    answer: "大部分銀行唔將保費計入「網上簽賬」類別。即使喺網上交保費，通常都只有基本回贈（0.4%）。EarnMORE 係例外，2% 無分類別。"
  },
  {
    question: "交保費有咩慳錢方法？",
    answer: "慳錢方法：(1) 用高回贈卡如 EarnMORE；(2) 用保費食信用卡迎新；(3) 留意保險公司信用卡優惠；(4) 年繳通常比月繳平；(5) 善用自動轉賬折扣。"
  }
];

// 保險公司信用卡政策
const insurerPolicies = [
  {
    name: "AIA 友邦",
    icon: "🔴",
    creditCard: "接受",
    fee: "部分計劃有手續費",
    notes: ["首年通常要自動轉賬", "續保可用信用卡", "建議先查詢手續費"],
  },
  {
    name: "保誠",
    icon: "🔵",
    creditCard: "接受",
    fee: "1-2% 手續費",
    notes: ["收取行政費", "計算淨回贈是否值得"],
  },
  {
    name: "宏利",
    icon: "🟢",
    creditCard: "接受",
    fee: "部分計劃有手續費",
    notes: ["部分計劃免手續費", "建議先查詢"],
  },
  {
    name: "安盛 AXA",
    icon: "🟠",
    creditCard: "接受",
    fee: "視乎計劃",
    notes: ["一般醫療保險可用", "大額保單建議查詢"],
  },
  {
    name: "富衛 FWD",
    icon: "🟣",
    creditCard: "接受",
    fee: "通常免手續費",
    notes: ["網上投保方便", "信用卡付款友善"],
  },
  {
    name: "藍十字",
    icon: "🔷",
    creditCard: "接受",
    fee: "免手續費",
    notes: ["旅遊保險", "醫療保險"],
  },
];

// 信用卡回贈比較
const cardComparison = [
  {
    card: "安信 EarnMORE",
    id: "earnmore",
    rate: "2%",
    cap: "無上限",
    insuranceRate: "2%",
    highlight: "保費最佳",
    note: "少數保費有 2% 回贈嘅卡",
  },
  {
    card: "渣打 Simply Cash",
    id: "sc-simply-cash",
    rate: "1.5%",
    cap: "無上限",
    insuranceRate: "1.5%",
    highlight: "永久免年費",
    note: "保費都有 1.5%",
  },
  {
    card: "Citi Cash Back",
    id: "citi-cashback",
    rate: "1%",
    cap: "無上限",
    insuranceRate: "1%",
    highlight: "基本回贈",
    note: "保費當本地簽賬 1%",
  },
  {
    card: "HSBC 信用卡",
    id: "hsbc-vs",
    rate: "0.4%",
    cap: "-",
    insuranceRate: "0.4%",
    highlight: "基本回贈",
    note: "保費不計入獎賞錢類別",
  },
  {
    card: "恒生信用卡",
    id: "hangseng-mmpower",
    rate: "0.4%",
    cap: "-",
    insuranceRate: "0.4%",
    highlight: "基本回贈",
    note: "保費不計入 Cash Dollars 類別",
  },
];

// 保費類型
const insuranceTypes = [
  {
    type: "人壽保險",
    icon: "❤️",
    avgPremium: "$10,000 - $50,000/年",
    bestStrategy: "用保費食迎新",
    note: "大額保費適合申請新卡",
  },
  {
    type: "醫療保險",
    icon: "🏥",
    avgPremium: "$3,000 - $20,000/年",
    bestStrategy: "EarnMORE 2%",
    note: "自願醫保可扣稅",
  },
  {
    type: "危疾保險",
    icon: "🛡️",
    avgPremium: "$5,000 - $30,000/年",
    bestStrategy: "EarnMORE 2%",
    note: "長期保障",
  },
  {
    type: "旅遊保險",
    icon: "✈️",
    avgPremium: "$100 - $500/次",
    bestStrategy: "網購卡 4%",
    note: "網上投保可能當網購",
  },
  {
    type: "家居保險",
    icon: "🏠",
    avgPremium: "$500 - $2,000/年",
    bestStrategy: "EarnMORE 2%",
    note: "業主/租客保險",
  },
  {
    type: "汽車保險",
    icon: "🚗",
    avgPremium: "$5,000 - $15,000/年",
    bestStrategy: "EarnMORE 2%",
    note: "第三者責任 + 全保",
  },
];

export function InsuranceGuide() {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      {/* 引言 */}
      <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-6">
        交保費都可以賺信用卡回贈？邊張卡交保費最抵？
        本文教你 <strong>{currentYear} 信用卡交保費攻略</strong>，
        保費回贈高達 <strong>2%</strong>！
      </p>

      {/* 目錄 */}
      <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-10">
        <h2 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          📑 本文目錄
        </h2>
        <ul className="space-y-2 text-sm">
          <li><a href="#overview" className="text-blue-600 dark:text-blue-400 hover:underline">1. 信用卡交保費回贈點計？</a></li>
          <li><a href="#card-comparison" className="text-blue-600 dark:text-blue-400 hover:underline">2. 交保費信用卡比較</a></li>
          <li><a href="#insurer-policy" className="text-blue-600 dark:text-blue-400 hover:underline">3. 保險公司信用卡政策</a></li>
          <li><a href="#insurance-types" className="text-blue-600 dark:text-blue-400 hover:underline">4. 各類保費攻略</a></li>
          <li><a href="#welcome-offer" className="text-blue-600 dark:text-blue-400 hover:underline">5. 用保費食迎新</a></li>
          <li><a href="#rebate-calc" className="text-blue-600 dark:text-blue-400 hover:underline">6. 回贈計算例子</a></li>
          <li><a href="#tips" className="text-blue-600 dark:text-blue-400 hover:underline">7. 交保費慳錢貼士</a></li>
          <li><a href="#faq" className="text-blue-600 dark:text-blue-400 hover:underline">8. 常見問題 FAQ</a></li>
        </ul>
      </div>

      {/* Section 1: 總覽 */}
      <section id="overview" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Shield className="h-6 w-6 text-blue-500" />
          1. 信用卡交保費回贈點計？
        </h2>
        
        <p>
          大部分銀行將保費列為<strong>「不合資格簽賬」</strong>或<strong>「保險類別」</strong>，
          只有基本 0.4% 回贈。但有少數信用卡例外：
        </p>

        <div className="not-prose bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-5 border border-blue-200 dark:border-blue-800 my-6">
          <h4 className="font-bold text-blue-800 dark:text-blue-200 mb-3">🛡️ 保費回贈真相</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
              <p className="text-sm text-red-600 font-bold mb-1">❌ 大部分信用卡</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">保費只有 0.4% 基本回贈</p>
              <p className="text-xs text-gray-500">HSBC、恒生、DBS 等</p>
            </div>
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
              <p className="text-sm text-green-600 font-bold mb-1">✅ 推薦信用卡</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">保費有 1.5% - 2% 回贈</p>
              <p className="text-xs text-gray-500">EarnMORE、Simply Cash</p>
            </div>
          </div>
        </div>

        <div className="not-prose bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-amber-700 dark:text-amber-300 text-sm">
              <strong>注意：</strong>部分保險公司收取 1-2% 信用卡手續費，
              請先向保險公司查詢，計算淨回贈是否值得。
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: 信用卡比較 */}
      <section id="card-comparison" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Percent className="h-6 w-6 text-green-500" />
          2. 交保費信用卡比較
        </h2>

        <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden my-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-green-50 dark:bg-green-900/20">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-green-600 dark:text-green-400">信用卡</th>
                  <th className="px-4 py-3 text-center font-medium text-green-600 dark:text-green-400">保費回贈</th>
                  <th className="px-4 py-3 text-center font-medium text-green-600 dark:text-green-400">上限</th>
                  <th className="px-4 py-3 text-left font-medium text-green-600 dark:text-green-400">備註</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {cardComparison.map((card, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3">
                      <Link href={`/cards/${card.id}`} className="font-medium text-blue-600 hover:underline dark:text-blue-400">
                        {card.card}
                      </Link>
                      <span className={`ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-bold ${
                        card.highlight === "保費最佳" 
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
                      }`}>
                        {card.highlight}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center font-bold text-green-600 dark:text-green-400">{card.insuranceRate}</td>
                    <td className="px-4 py-3 text-center text-gray-600 dark:text-gray-400">{card.cap}</td>
                    <td className="px-4 py-3 text-xs text-gray-500">{card.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Card Preview Section */}
      <CardPreviewSection 
        title="📌 交保費推薦信用卡"
        subtitle="點擊查看詳細回贈條款及申請連結"
        cards={[
          { id: "earnmore", highlight: "保費 2%" },
          { id: "sc-simply-cash", highlight: "保費 1.5%" },
          { id: "citi-cashback", highlight: "保費 1%" },
        ]}
      />

      {/* Section 3: 保險公司政策 */}
      <section id="insurer-policy" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Building className="h-6 w-6 text-purple-500" />
          3. 保險公司信用卡政策
        </h2>

        <p>
          各保險公司對信用卡繳費政策唔同，部分會收取手續費：
        </p>

        <div className="not-prose grid md:grid-cols-2 gap-4 my-6">
          {insurerPolicies.map((insurer, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{insurer.icon}</span>
                <h4 className="font-bold text-gray-900 dark:text-white">{insurer.name}</h4>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded text-green-600 dark:text-green-400">
                  {insurer.creditCard}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded ${
                  insurer.fee.includes("免") 
                    ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                    : "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400"
                }`}>
                  {insurer.fee}
                </span>
              </div>
              <ul className="text-gray-600 dark:text-gray-400 text-xs space-y-0.5">
                {insurer.notes.map((note, i) => (
                  <li key={i}>• {note}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="not-prose bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <p className="text-blue-700 dark:text-blue-300 text-sm">
              <strong>建議：</strong>交保費前先向保險公司查詢是否收取信用卡手續費，
              如有 1-2% 手續費，用 <Link href="/cards/earnmore" className="underline">EarnMORE</Link> 2% 回贈可抵銷部分手續費。
            </p>
          </div>
        </div>
      </section>

      {/* Section 4: 保費類型 */}
      <section id="insurance-types" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <FileText className="h-6 w-6 text-indigo-500" />
          4. 各類保費攻略
        </h2>

        <div className="not-prose space-y-4 my-6">
          {insuranceTypes.map((insurance, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{insurance.icon}</span>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">{insurance.type}</h4>
                    <p className="text-xs text-gray-500">年均保費：{insurance.avgPremium}</p>
                  </div>
                </div>
                <span className="text-xs bg-blue-100 dark:bg-blue-900/30 px-2 py-0.5 rounded text-blue-600 dark:text-blue-400">
                  {insurance.bestStrategy}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">{insurance.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 5: 用保費食迎新 */}
      <section id="welcome-offer" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Gift className="h-6 w-6 text-pink-500" />
          5. 用保費食迎新
        </h2>

        <p>
          如果你有大額保費（$10,000+），可以考慮申請新信用卡，用保費達成迎新簽賬要求：
        </p>

        <div className="not-prose bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 rounded-2xl p-5 border border-pink-200 dark:border-pink-800 my-6">
          <h4 className="font-bold text-pink-800 dark:text-pink-200 mb-3">🎁 保費食迎新策略</h4>
          <div className="space-y-3">
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
              <p className="text-sm font-bold text-pink-800 dark:text-pink-200">Step 1：選擇迎新卡</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">選擇迎新簽賬要求與你保費金額相近嘅信用卡</p>
            </div>
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
              <p className="text-sm font-bold text-pink-800 dark:text-pink-200">Step 2：確認保費計入迎新</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">睇清楚迎新條款，確認保費屬於「合資格簽賬」</p>
            </div>
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
              <p className="text-sm font-bold text-pink-800 dark:text-pink-200">Step 3：申請並繳費</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">批卡後用新卡交保費，達成迎新要求</p>
            </div>
          </div>
        </div>

        <div className="not-prose bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-amber-700 dark:text-amber-300 text-sm">
              <strong>注意：</strong>部分信用卡迎新條款排除「保險繳費」，
              申請前請仔細閱讀條款，確認保費計入迎新簽賬。
            </p>
          </div>
        </div>
      </section>

      {/* Section 6: 回贈計算 */}
      <section id="rebate-calc" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Calculator className="h-6 w-6 text-teal-500" />
          6. 回贈計算例子
        </h2>

        <div className="not-prose bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 my-6">
          <h4 className="font-bold text-gray-900 dark:text-white mb-3">📊 年繳保費 $20,000 回贈對比</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-3 py-2 text-left">信用卡</th>
                  <th className="px-3 py-2 text-center">回贈率</th>
                  <th className="px-3 py-2 text-center">年回贈</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                <tr>
                  <td className="px-3 py-2"><Link href="/cards/earnmore" className="text-blue-600 hover:underline">EarnMORE</Link></td>
                  <td className="px-3 py-2 text-center">2%</td>
                  <td className="px-3 py-2 text-center font-bold text-green-600">$400</td>
                </tr>
                <tr>
                  <td className="px-3 py-2"><Link href="/cards/sc-simply-cash" className="text-blue-600 hover:underline">Simply Cash</Link></td>
                  <td className="px-3 py-2 text-center">1.5%</td>
                  <td className="px-3 py-2 text-center font-bold text-green-600">$300</td>
                </tr>
                <tr>
                  <td className="px-3 py-2"><Link href="/cards/citi-cashback" className="text-blue-600 hover:underline">Citi Cash Back</Link></td>
                  <td className="px-3 py-2 text-center">1%</td>
                  <td className="px-3 py-2 text-center font-bold text-green-600">$200</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">HSBC / 恒生</td>
                  <td className="px-3 py-2 text-center">0.4%</td>
                  <td className="px-3 py-2 text-center text-gray-500">$80</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            *用 <Link href="/cards/earnmore" className="text-blue-600 hover:underline">EarnMORE</Link> 比普通卡每年可多賺 <strong>$320</strong>！
          </p>
        </div>

        <div className="not-prose bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
          <h4 className="font-bold text-green-800 dark:text-green-200 mb-2">💡 如有手續費計算</h4>
          <p className="text-green-700 dark:text-green-300 text-sm">
            假設保險公司收取 1% 手續費：<br/>
            • <strong>EarnMORE 2%</strong>：$400 回贈 - $200 手續費 = <strong>淨賺 $200</strong><br/>
            • <strong>Simply Cash 1.5%</strong>：$300 回贈 - $200 手續費 = <strong>淨賺 $100</strong><br/>
            • <strong>0.4% 卡</strong>：$80 回贈 - $200 手續費 = <strong>蝕 $120</strong>
          </p>
        </div>
      </section>

      {/* Section 7: 慳錢貼士 */}
      <section id="tips" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Zap className="h-6 w-6 text-yellow-500" />
          7. 交保費慳錢貼士
        </h2>

        <div className="not-prose grid md:grid-cols-2 gap-4 my-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">💳</span>
              <h4 className="font-bold text-gray-900 dark:text-white">用高回贈卡</h4>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              <Link href="/cards/earnmore" className="text-blue-600 hover:underline">EarnMORE</Link> 2% 或 <Link href="/cards/sc-simply-cash" className="text-blue-600 hover:underline">Simply Cash</Link> 1.5%
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">🎁</span>
              <h4 className="font-bold text-gray-900 dark:text-white">食信用卡迎新</h4>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              大額保費適合申請新卡食迎新
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">📅</span>
              <h4 className="font-bold text-gray-900 dark:text-white">年繳比月繳平</h4>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              年繳通常有折扣，再用信用卡賺回贈
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">🔍</span>
              <h4 className="font-bold text-gray-900 dark:text-white">查詢手續費</h4>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              交保費前確認有無信用卡手續費
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">🏦</span>
              <h4 className="font-bold text-gray-900 dark:text-white">留意銀行優惠</h4>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              銀行有時推出保費分期優惠
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">💰</span>
              <h4 className="font-bold text-gray-900 dark:text-white">自動轉賬折扣</h4>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              部分保險公司自動轉賬有額外折扣
            </p>
          </div>
        </div>
      </section>

      {/* Section 8: FAQ */}
      <section id="faq" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          ❓ 8. 常見問題 FAQ
        </h2>
        
        <div className="not-prose space-y-4">
          {insuranceFaqData.map((faq, index) => (
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
        <h3 className="text-xl font-bold mb-2">🛡️ 想知邊張信用卡交保費最抵？</h3>
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
          <Link href="/discover/utility-bill-guide" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
            <FileText className="h-5 w-5 text-emerald-600" />
            <span>信用卡繳費攻略</span>
            <ChevronRight className="h-4 w-4 ml-auto text-gray-400" />
          </Link>
          <Link href="/discover/large-purchase-guide" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
            <DollarSign className="h-5 w-5 text-emerald-600" />
            <span>大額簽賬攻略</span>
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

