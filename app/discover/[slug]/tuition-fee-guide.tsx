// 交學費信用卡攻略
// 用於 /discover/tuition-fee-guide 頁面

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  ChevronRight, ChevronDown, CreditCard, GraduationCap, Smartphone,
  Calculator, Trophy, DollarSign, CheckCircle, AlertTriangle,
  Star, Info, Zap, Percent, Gift, Building, Wallet, BookOpen
} from "lucide-react";
import { CardPreviewSection } from "@/app/discover/components/card-preview-section";

// FAQ 數據
export const tuitionFeeFaqData = [
  {
    question: "交學費可以用信用卡嗎？",
    answer: "可以！大部分香港大學及大專院校都接受信用卡繳交學費，包括八大院校（港大、中大、科大、理大、城大、浸大、嶺大、教大）及各大專院校。部分學校透過 Flywire、Western Union 等平台收費。"
  },
  {
    question: "交學費信用卡有回贈嗎？",
    answer: "視乎信用卡及繳費方式。直接用信用卡繳學費，大部分銀行當「教育」類別無回贈。但透過 AlipayHK、雲閃付、BoC Pay 繳費，部分卡有回贈（如中銀淘寶卡最高4%）。"
  },
  {
    question: "交學費信用卡邊張最好？",
    answer: "推薦：(1) 中銀淘寶卡：AlipayHK繳費4%回贈；(2) Livi Debit Card：繳費1%回贈；(3) 東亞銀聯鑽石卡：雲閃付繳費有回贈。另外可考慮用新卡食迎新優惠。"
  },
  {
    question: "交學費可以賺迎新嗎？",
    answer: "可以！學費金額大，非常適合用嚟食迎新。但要留意部分銀行將「教育」類別簽賬排除在迎新之外，申請前要睇清楚條款。"
  },
  {
    question: "Flywire 交學費有手續費嗎？",
    answer: "Flywire 通常會收取 2-3% 手續費。建議計算埋手續費後睇下用信用卡抵唔抵。如果信用卡回贈低過手續費，可能直接用銀行轉賬更划算。"
  },
  {
    question: "海外學費用咩信用卡交？",
    answer: "海外學費通常以外幣計算，建議用低外幣手續費嘅卡（如 HSBC EveryMile 外幣 1.95%）。另外可考慮 Wise 或 Remitly 等匯款平台，匯率可能更好。"
  },
  {
    question: "交學費可以分期嗎？",
    answer: "可以！部分銀行提供學費分期計劃（如 HSBC、Citi），可將學費分 6-24 個月還款。但要留意分期手續費，計算實際成本。"
  },
  {
    question: "學生自己交學費定父母交？",
    answer: "從賺回贈角度，建議用回贈率高嘅卡交。如果學生有高回贈卡可以自己交；如果父母有更好嘅卡或想食迎新，可以父母交。"
  }
];

// 學費繳費方式比較
const paymentMethods = [
  {
    method: "學校網站直接繳費",
    pros: ["方便快捷", "即時確認"],
    cons: ["大部分銀行無回贈", "當「教育」類別"],
    tip: "可用新卡食迎新",
  },
  {
    method: "AlipayHK 繳費",
    pros: ["中銀淘寶卡 4% 回贈", "即時到賬"],
    cons: ["需學校支援", "部分院校未接受"],
    tip: "推薦中銀淘寶卡",
  },
  {
    method: "雲閃付 App 繳費",
    pros: ["東亞銀聯卡有回贈", "支援多間院校"],
    cons: ["需綁定銀聯卡", "手續費視乎院校"],
    tip: "推薦東亞銀聯鑽石卡",
  },
  {
    method: "Flywire 平台",
    pros: ["支援海外院校", "多種貨幣"],
    cons: ["2-3% 手續費", "匯率不一定最好"],
    tip: "計算手續費後決定",
  },
];

// 推薦信用卡
const recommendedCards = [
  {
    card: "中銀淘寶 Visa 卡",
    id: "boc-taobao",
    rate: "4%",
    method: "AlipayHK 繳費",
    highlight: "最高回贈",
    notes: "AlipayHK 繳費當網上簽賬 4%",
  },
  {
    card: "Livi Debit Card",
    id: "livi-debit",
    rate: "1%",
    method: "直接繳費",
    highlight: "扣賬卡都有回贈",
    notes: "所有消費 1%，包括學費",
  },
  {
    card: "東亞銀聯鑽石卡",
    id: "bea-unionpay-diamond",
    rate: "1.2%",
    method: "雲閃付繳費",
    highlight: "銀聯卡",
    notes: "雲閃付繳費有回贈",
  },
  {
    card: "HSBC Red Card",
    id: "hsbc-red",
    rate: "0%",
    method: "直接繳費",
    highlight: "食迎新",
    notes: "學費無回贈，但可食迎新簽賬要求",
  },
];

// 大學繳費方式
const universities = [
  { name: "香港大學 HKU", methods: ["信用卡", "銀行轉賬", "支票"], notes: "CEDARS 網上繳費系統" },
  { name: "香港中文大學 CUHK", methods: ["信用卡", "銀行轉賬", "PPS"], notes: "Student Finance 系統" },
  { name: "香港科技大學 HKUST", methods: ["信用卡", "銀行轉賬"], notes: "ARRO 繳費系統" },
  { name: "香港理工大學 PolyU", methods: ["信用卡", "銀行轉賬", "PPS"], notes: "ePayment 系統" },
  { name: "香港城市大學 CityU", methods: ["信用卡", "銀行轉賬"], notes: "Student Finance 系統" },
  { name: "香港浸會大學 HKBU", methods: ["信用卡", "銀行轉賬"], notes: "Student Finance 系統" },
];

export function TuitionFeeGuide() {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      {/* 引言 */}
      <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-6">
        學費動輒幾萬至幾十萬，識揀信用卡交學費可以賺返唔少回贈！本文教你 <strong>{currentYear} 交學費信用卡攻略</strong>，
        比較各種<strong>繳費方式</strong>、<strong>信用卡回贈</strong>，
        教你點樣用學費食迎新同賺回贈！
      </p>

      {/* 目錄 */}
      <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-10">
        <h2 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          📑 本文目錄
        </h2>
        <ul className="space-y-2 text-sm">
          <li><a href="#overview" className="text-blue-600 dark:text-blue-400 hover:underline">1. 交學費信用卡回贈點計？</a></li>
          <li><a href="#methods" className="text-blue-600 dark:text-blue-400 hover:underline">2. 學費繳費方式比較</a></li>
          <li><a href="#cards" className="text-blue-600 dark:text-blue-400 hover:underline">3. 交學費信用卡推薦</a></li>
          <li><a href="#welcome" className="text-blue-600 dark:text-blue-400 hover:underline">4. 用學費食迎新攻略</a></li>
          <li><a href="#alipay" className="text-blue-600 dark:text-blue-400 hover:underline">5. AlipayHK 繳學費攻略</a></li>
          <li><a href="#universities" className="text-blue-600 dark:text-blue-400 hover:underline">6. 各大學繳費方式</a></li>
          <li><a href="#overseas" className="text-blue-600 dark:text-blue-400 hover:underline">7. 海外學費攻略</a></li>
          <li><a href="#tips" className="text-blue-600 dark:text-blue-400 hover:underline">8. 慳錢貼士</a></li>
          <li><a href="#faq" className="text-blue-600 dark:text-blue-400 hover:underline">9. 常見問題 FAQ</a></li>
        </ul>
      </div>

      {/* Section 1: 總覽 */}
      <section id="overview" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <GraduationCap className="h-6 w-6 text-blue-500" />
          1. 交學費信用卡回贈點計？
        </h2>
        
        <p>
          用信用卡交學費，回贈率會因應<strong>繳費方式</strong>同<strong>信用卡類別</strong>而唔同：
        </p>

        <div className="not-prose bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-5 border border-blue-200 dark:border-blue-800 my-6">
          <h4 className="font-bold text-blue-800 dark:text-blue-200 mb-3">🎓 學費回贈關鍵</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                <p className="font-medium text-gray-900 dark:text-white">直接繳費</p>
              </div>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• 當「教育」類別</li>
                <li>• 大部分銀行<strong>無回贈</strong></li>
                <li>• 但可計入迎新簽賬</li>
              </ul>
            </div>
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <p className="font-medium text-gray-900 dark:text-white">AlipayHK/雲閃付繳費</p>
              </div>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• 當「網上簽賬」處理</li>
                <li>• 中銀淘寶卡<strong>4%回贈</strong></li>
                <li>• 需學校支援此繳費方式</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="not-prose bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-amber-700 dark:text-amber-300 text-sm">
              <strong>重要：</strong>學費金額大，即使只有 1% 回贈，一年學費 $50,000 都可以賺 $500！
              仲未計食迎新優惠！
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: 繳費方式比較 */}
      <section id="methods" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Wallet className="h-6 w-6 text-purple-500" />
          2. 學費繳費方式比較
        </h2>

        <p>以下係各種<strong>學費繳費方式比較</strong>：</p>

        <div className="not-prose space-y-4 my-6">
          {paymentMethods.map((method, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4">
              <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                {index === 0 && <CreditCard className="h-5 w-5 text-blue-500" />}
                {index === 1 && <Smartphone className="h-5 w-5 text-blue-500" />}
                {index === 2 && <Smartphone className="h-5 w-5 text-red-500" />}
                {index === 3 && <Building className="h-5 w-5 text-purple-500" />}
                {method.method}
              </h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">✅ 優點</p>
                  <ul className="text-sm text-green-600 dark:text-green-400 space-y-1">
                    {method.pros.map((pro, i) => <li key={i}>• {pro}</li>)}
                  </ul>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">❌ 缺點</p>
                  <ul className="text-sm text-red-600 dark:text-red-400 space-y-1">
                    {method.cons.map((con, i) => <li key={i}>• {con}</li>)}
                  </ul>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">💡 建議</p>
                  <p className="text-sm text-blue-600 dark:text-blue-400">{method.tip}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: 推薦信用卡 */}
      <section id="cards" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Trophy className="h-6 w-6 text-amber-500" />
          3. 交學費信用卡推薦
        </h2>

        <p>以下係<strong>交學費信用卡回贈比較</strong>：</p>

        <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden my-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-amber-50 dark:bg-amber-900/20">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-amber-600 dark:text-amber-400">信用卡</th>
                  <th className="px-4 py-3 text-center font-medium text-amber-600 dark:text-amber-400">回贈率</th>
                  <th className="px-4 py-3 text-center font-medium text-amber-600 dark:text-amber-400">繳費方式</th>
                  <th className="px-4 py-3 text-center font-medium text-amber-600 dark:text-amber-400">備註</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {recommendedCards.map((card, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3">
                      <Link href={`/cards/${card.id}`} className="font-medium text-blue-600 hover:underline dark:text-blue-400">
                        {card.card}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`font-bold ${card.rate === "0%" ? "text-gray-400" : "text-green-600 dark:text-green-400"}`}>
                        {card.rate}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center text-gray-600 dark:text-gray-400">{card.method}</td>
                    <td className="px-4 py-3 text-xs text-gray-500">{card.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Card Preview Section */}
      <CardPreviewSection 
        title="📌 交學費推薦信用卡"
        subtitle="點擊查看詳細回贈條款及申請連結"
        cards={[
          { id: "boc-taobao", highlight: "AlipayHK 繳費 4%" },
          { id: "bea-unionpay-diamond", highlight: "雲閃付繳費有回贈" },
          { id: "hsbc-red", highlight: "可食迎新" },
          { id: "sc-smart", highlight: "新卡食迎新" },
        ]}
      />

      {/* Section 4: 食迎新攻略 */}
      <section id="welcome" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Gift className="h-6 w-6 text-pink-500" />
          4. 用學費食迎新攻略
        </h2>

        <p>
          學費金額大，非常適合用嚟<strong>食迎新優惠</strong>！
          以下係攻略步驟：
        </p>

        <div className="not-prose space-y-3 my-6">
          {[
            { step: "1", title: "計算學費金額", desc: "睇清楚每學期學費幾多，計劃用咩卡交" },
            { step: "2", title: "揀迎新門檻岩嘅卡", desc: "學費 $50,000 → 揀迎新簽 $50,000 有獎賞嘅卡" },
            { step: "3", title: "確認學費計入迎新", desc: "⚠️ 部分銀行「教育」類別唔計迎新，要睇清楚條款" },
            { step: "4", title: "開學前申請新卡", desc: "留意批卡時間，確保喺繳費期限前收到卡" },
            { step: "5", title: "交學費賺迎新", desc: "喺迎新期內用新卡繳交學費" },
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

        <div className="not-prose bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
          <h4 className="font-bold text-green-800 dark:text-green-200 mb-2">💰 食迎新計算例子</h4>
          <p className="text-green-700 dark:text-green-300 text-sm">
            學費 $50,000 × 申請 HSBC Red Card → 迎新簽 $8,000 送 $800<br/>
            再加日常消費湊夠門檻 = <strong>輕鬆賺 $800 迎新獎賞</strong>！
          </p>
        </div>
      </section>

      {/* Section 5: AlipayHK */}
      <section id="alipay" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Smartphone className="h-6 w-6 text-blue-500" />
          5. AlipayHK 繳學費攻略
        </h2>

        <p>
          如果學校支援<strong>AlipayHK 繳費</strong>，可以用中銀淘寶卡賺取 4% 回贈！
        </p>

        <div className="not-prose space-y-3 my-6">
          {[
            { icon: "📱", title: "下載 AlipayHK App", desc: "並完成實名認證" },
            { icon: "💳", title: "綁定中銀淘寶卡", desc: "或其他高回贈信用卡" },
            { icon: "🏫", title: "搜尋學校繳費", desc: "喺 AlipayHK「生活繳費」搵學校" },
            { icon: "💰", title: "輸入學生編號及金額", desc: "確認繳費資料無誤" },
            { icon: "✅", title: "完成繳費", desc: "保留繳費記錄作為證明" },
          ].map((step, index) => (
            <div key={index} className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 flex items-start gap-4">
              <span className="text-2xl">{step.icon}</span>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-1">{step.title}</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="not-prose bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
          <h4 className="font-bold text-green-800 dark:text-green-200 mb-2">💰 AlipayHK 繳學費回贈計算</h4>
          <p className="text-green-700 dark:text-green-300 text-sm">
            學費 $50,000 × <Link href="/cards/boc-taobao" className="underline">中銀淘寶卡</Link> 4% = <strong>$2,000 回贈</strong>！
          </p>
        </div>
      </section>

      {/* Section 6: 各大學繳費方式 */}
      <section id="universities" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Building className="h-6 w-6 text-indigo-500" />
          6. 各大學繳費方式
        </h2>

        <p>以下係<strong>香港各大學繳費方式</strong>一覽：</p>

        <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden my-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-indigo-50 dark:bg-indigo-900/20">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-indigo-600 dark:text-indigo-400">大學</th>
                  <th className="px-4 py-3 text-left font-medium text-indigo-600 dark:text-indigo-400">繳費方式</th>
                  <th className="px-4 py-3 text-left font-medium text-indigo-600 dark:text-indigo-400">備註</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {universities.map((uni, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{uni.name}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{uni.methods.join(", ")}</td>
                    <td className="px-4 py-3 text-xs text-gray-500">{uni.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="not-prose bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-amber-700 dark:text-amber-300 text-sm">
              <strong>注意：</strong>各大學繳費系統可能有更新，建議繳費前先查閱學校官網確認最新繳費方式。
            </p>
          </div>
        </div>
      </section>

      {/* Section 7: 海外學費 */}
      <section id="overseas" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-teal-500" />
          7. 海外學費攻略
        </h2>

        <p>
          如果要繳交<strong>海外學費</strong>（如英國、美國、澳洲院校），要注意以下事項：
        </p>

        <div className="not-prose space-y-3 my-6">
          {[
            { icon: "💱", title: "外幣手續費", desc: "大部分信用卡外幣簽賬有 1.5-2% 手續費，要計入成本" },
            { icon: "🏦", title: "Flywire 平台", desc: "不少海外院校用 Flywire 收費，有 2-3% 手續費" },
            { icon: "💸", title: "匯款平台", desc: "Wise、Remitly 等匯款平台匯率可能更好，但無回贈" },
            { icon: "💳", title: "低手續費卡", desc: "推薦 HSBC EveryMile、Citi PremierMiles 等外幣手續費較低嘅卡" },
          ].map((item, index) => (
            <div key={index} className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-4 flex items-start gap-4">
              <span className="text-2xl">{item.icon}</span>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-1">{item.title}</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 8: 貼士 */}
      <section id="tips" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Star className="h-6 w-6 text-yellow-500" />
          8. 慳錢貼士
        </h2>

        <div className="not-prose space-y-3">
          {[
            { icon: "🎯", title: "揀啱繳費方式", desc: "AlipayHK 繳費用中銀淘寶卡最高 4% 回贈" },
            { icon: "🆕", title: "善用迎新優惠", desc: "學費金額大，適合用新卡食迎新" },
            { icon: "📅", title: "留意繳費期限", desc: "申請新卡需時，預早申請確保收到卡" },
            { icon: "📝", title: "睇清楚條款", desc: "部分銀行教育類別唔計迎新/回贈" },
            { icon: "💰", title: "計算實際成本", desc: "Flywire 等平台有手續費，要計算埋先決定" },
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
          {tuitionFeeFaqData.map((faq, index) => (
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
        <h3 className="text-xl font-bold mb-2">🎓 想知邊張信用卡交學費回贈最高？</h3>
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
          <Link href="/discover/student-card-guide" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
            <GraduationCap className="h-5 w-5 text-emerald-600" />
            <span>學生信用卡攻略</span>
            <ChevronRight className="h-4 w-4 ml-auto text-gray-400" />
          </Link>
          <Link href="/discover/best-cashback-cards" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
            <DollarSign className="h-5 w-5 text-emerald-600" />
            <span>最高回贈信用卡比較</span>
            <ChevronRight className="h-4 w-4 ml-auto text-gray-400" />
          </Link>
          <Link href="/discover/octopus-guide" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
            <CreditCard className="h-5 w-5 text-emerald-600" />
            <span>八達通增值攻略</span>
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

