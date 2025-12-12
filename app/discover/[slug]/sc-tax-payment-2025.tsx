// 渣打信用卡交稅優惠攻略 2025
// 用於 /discover/sc-tax-payment-2025 頁面

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  ChevronRight, ChevronDown, CreditCard, FileText, Building,
  Calculator, Trophy, DollarSign, CheckCircle, AlertTriangle,
  Star, Smartphone, Info, XCircle, Zap, Clock, Shield, Landmark,
  Gift, Plane, BadgeCheck, CalendarClock
} from "lucide-react";
import { CardPreviewSection } from "@/app/discover/components/card-preview-section";

// FAQ 數據
export const scTaxPayment2025FaqData = [
  {
    question: "渣打交稅優惠有咩獎賞？",
    answer: "渣打交稅優惠分三部分：1) 優惠1：交稅金額獎賞（$50-$1,500 或 500-15,000里）；2) 優惠2：分期額外獎賞（$200-$500 或 2,000-5,000里）；3) 早鳥優惠：12月31日前完成可額外獲得 $100-$300 或 1,000-3,000里。特選客戶獎賞更高！"
  },
  {
    question: "渣打交稅優惠點樣登記？",
    answer: "需要喺交稅前透過 SC Mobile App 登記此推廣計劃，登記後才合資格。登記後可喺 App 內睇到你係特選客戶定其他客戶，以及最高可獲獎賞金額。"
  },
  {
    question: "邊張渣打信用卡可以參加交稅優惠？",
    answer: "渣打信用卡（包括 Simply Cash、Smart Card）及 MANHATTAN 信用卡都可以參加。但不包括渣打商務卡、渣打公司卡及渣打銀聯雙幣白金信用卡（人民幣賬戶）。"
  },
  {
    question: "渣打國泰卡交稅係賺現金定里數？",
    answer: "以渣打國泰 Mastercard 交稅會獲得里數獎賞，其他渣打/MANHATTAN 信用卡則獲得現金回贈。獎賞類型取決於第一筆合資格繳稅金額所用嘅卡種。"
  },
  {
    question: "交稅分期有咩要求？",
    answer: "需透過 SC Mobile App 或網上申請「月結單分期」，累積分期金額至少 $20,000，還款期至少 12 個月。分期申請需即時獲批，不可透過人工熱線申請。分期金額不可大於累積繳稅金額。"
  },
  {
    question: "早鳥優惠點樣先有？",
    answer: "需要喺 2025年12月31日或之前成功申請並獲批分期計劃，才可享早鳥優惠。分期申請越早越好！"
  },
  {
    question: "渣打交稅優惠幾時入賬？",
    answer: "現金回贈會喺 2026年4月30日或之前顯示於「360°全面賞」平台，需手動換領（最低 $50）。里數會喺同日或之前存入國泰會員賬戶。"
  },
  {
    question: "可以用多張渣打卡交稅嗎？",
    answer: "可以，但只有第一筆合資格繳稅金額所用嘅卡種決定你獲得現金定里數。分期計劃必須用同一張卡申請。主卡及附屬卡嘅簽賬會合併計算。"
  }
];

// 優惠1: 交稅金額獎賞
const taxPaymentRewards = [
  {
    tier: "$20,000 - $49,999",
    selected: { cash: "$150", miles: "1,500里" },
    others: { cash: "$50", miles: "500里" },
  },
  {
    tier: "$50,000 - $99,999",
    selected: { cash: "$300", miles: "3,000里" },
    others: { cash: "$100", miles: "1,000里" },
  },
  {
    tier: "$100,000 - $249,999",
    selected: { cash: "$500", miles: "5,000里" },
    others: { cash: "$150", miles: "1,500里" },
  },
  {
    tier: "$250,000 或以上",
    selected: { cash: "$1,500", miles: "15,000里" },
    others: { cash: "$500", miles: "5,000里" },
  },
];

// 優惠2: 分期額外獎賞
const installmentRewards = [
  {
    tier: "$20,000 - $49,999",
    reward2: { cash: "$200", miles: "2,000里" },
    earlyBird: { cash: "$100", miles: "1,000里" },
  },
  {
    tier: "$50,000 - $99,999",
    reward2: { cash: "$300", miles: "3,000里" },
    earlyBird: { cash: "$200", miles: "2,000里" },
  },
  {
    tier: "$100,000 - $249,999",
    reward2: { cash: "$500", miles: "5,000里" },
    earlyBird: { cash: "$300", miles: "3,000里" },
  },
  {
    tier: "$250,000 或以上",
    reward2: { cash: "$500", miles: "5,000里" },
    earlyBird: { cash: "$300", miles: "3,000里" },
  },
];

// 推薦信用卡
const recommendedCards = [
  {
    card: "SC Simply Cash Visa",
    id: "sc-simply-cash",
    maxReward: "$2,300",
    type: "現金回贈",
    highlight: "最易用",
    reason: "日常 1.5% 回贈，交稅優惠額外賺",
  },
  {
    card: "SC Cathay Mastercard",
    id: "sc-cathay",
    maxReward: "23,000里",
    type: "里數",
    highlight: "儲里數首選",
    reason: "交稅賺里數，配合迎新可達 60,000+ 里",
  },
  {
    card: "SC Smart Card",
    id: "sc-smart",
    maxReward: "$2,300",
    type: "現金回贈",
    highlight: "永久免年費",
    reason: "永久免年費，特約商戶 5%",
  },
];

export function ScTaxPayment2025Guide() {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      {/* 引言 */}
      <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-6">
        🔥 渣打信用卡推出<strong>交稅及分期優惠</strong>！透過渣打網上理財或 SC Mobile App 交稅，
        特選客戶可賺高達 <strong>$2,300 現金回贈</strong> 或 <strong>23,000 Asia Miles</strong>！
        早鳥喺 <strong>12月31日前</strong>完成分期仲有額外獎賞！
      </p>

      {/* 重點提示 */}
      <div className="not-prose bg-gradient-to-r from-blue-500 to-teal-500 rounded-2xl p-6 text-white mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Gift className="h-8 w-8" />
          <div>
            <h3 className="text-xl font-bold m-0">渣打交稅優惠 2025</h3>
            <p className="text-blue-100 m-0">推廣期：2025年11月18日 - 2026年2月2日</p>
          </div>
        </div>
        <div className="grid sm:grid-cols-3 gap-4 mt-4">
          <div className="bg-white/20 rounded-xl p-4 text-center">
            <p className="text-3xl font-bold">$2,300</p>
            <p className="text-sm opacity-90">最高現金回贈</p>
          </div>
          <div className="bg-white/20 rounded-xl p-4 text-center">
            <p className="text-3xl font-bold">23,000</p>
            <p className="text-sm opacity-90">最高 Asia Miles</p>
          </div>
          <div className="bg-white/20 rounded-xl p-4 text-center">
            <p className="text-3xl font-bold">12月31日</p>
            <p className="text-sm opacity-90">早鳥優惠截止</p>
          </div>
        </div>
      </div>

      {/* 目錄 */}
      <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-10">
        <h2 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          📑 本文目錄
        </h2>
        <ul className="space-y-2 text-sm">
          <li><a href="#overview" className="text-blue-600 dark:text-blue-400 hover:underline">1. 優惠總覽</a></li>
          <li><a href="#eligible-cards" className="text-blue-600 dark:text-blue-400 hover:underline">2. 合資格信用卡</a></li>
          <li><a href="#reward1" className="text-blue-600 dark:text-blue-400 hover:underline">3. 優惠1：交稅金額獎賞</a></li>
          <li><a href="#reward2" className="text-blue-600 dark:text-blue-400 hover:underline">4. 優惠2：分期額外獎賞 + 早鳥優惠</a></li>
          <li><a href="#examples" className="text-blue-600 dark:text-blue-400 hover:underline">5. 獎賞計算例子</a></li>
          <li><a href="#how-to" className="text-blue-600 dark:text-blue-400 hover:underline">6. 點樣參加？</a></li>
          <li><a href="#best-cards" className="text-blue-600 dark:text-blue-400 hover:underline">7. 推薦信用卡</a></li>
          <li><a href="#tips" className="text-blue-600 dark:text-blue-400 hover:underline">8. 注意事項 & 貼士</a></li>
          <li><a href="#faq" className="text-blue-600 dark:text-blue-400 hover:underline">9. 常見問題 FAQ</a></li>
        </ul>
      </div>

      {/* Section 1: 優惠總覽 */}
      <section id="overview" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <FileText className="h-6 w-6 text-blue-500" />
          1. 優惠總覽
        </h2>
        
        <p>
          渣打信用卡推出<strong>交稅及分期優惠計劃</strong>，透過渣打網上理財、SC Mobile App 或電話理財繳交稅款，
          即可賺取<strong>現金回贈</strong>或<strong>Asia Miles</strong>！
        </p>

        <div className="not-prose grid md:grid-cols-3 gap-4 my-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-5 border border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-2 mb-3">
              <DollarSign className="h-6 w-6 text-blue-500" />
              <h4 className="font-bold text-blue-800 dark:text-blue-200 m-0">優惠1</h4>
            </div>
            <p className="text-blue-700 dark:text-blue-300 text-sm m-0">
              交稅金額獎賞<br/>
              <strong>$50 - $1,500</strong><br/>
              或 <strong>500 - 15,000里</strong>
            </p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-5 border border-green-200 dark:border-green-800">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="h-6 w-6 text-green-500" />
              <h4 className="font-bold text-green-800 dark:text-green-200 m-0">優惠2</h4>
            </div>
            <p className="text-green-700 dark:text-green-300 text-sm m-0">
              分期額外獎賞<br/>
              <strong>$200 - $500</strong><br/>
              或 <strong>2,000 - 5,000里</strong>
            </p>
          </div>
          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-5 border border-amber-200 dark:border-amber-800">
            <div className="flex items-center gap-2 mb-3">
              <CalendarClock className="h-6 w-6 text-amber-500" />
              <h4 className="font-bold text-amber-800 dark:text-amber-200 m-0">早鳥優惠</h4>
            </div>
            <p className="text-amber-700 dark:text-amber-300 text-sm m-0">
              12/31前完成分期<br/>
              <strong>額外 $100 - $300</strong><br/>
              或 <strong>1,000 - 3,000里</strong>
            </p>
          </div>
        </div>

        <div className="not-prose bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-5 border border-green-200 dark:border-green-800">
          <h4 className="font-bold text-green-800 dark:text-green-200 mb-3">💰 特選客戶 vs 其他客戶</h4>
          <p className="text-green-700 dark:text-green-300 text-sm mb-2">
            渣打會喺 SC Mobile App 顯示你係<strong>特選客戶</strong>定<strong>其他客戶</strong>，特選客戶獎賞更高！
          </p>
          <ul className="text-green-700 dark:text-green-300 text-sm space-y-1">
            <li>• 特選客戶：交 $25萬稅可賺 <strong>$1,500</strong> 或 <strong>15,000里</strong></li>
            <li>• 其他客戶：交 $25萬稅可賺 <strong>$500</strong> 或 <strong>5,000里</strong></li>
          </ul>
        </div>
      </section>

      {/* Section 2: 合資格信用卡 */}
      <section id="eligible-cards" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <CreditCard className="h-6 w-6 text-purple-500" />
          2. 合資格信用卡
        </h2>

        <div className="not-prose grid md:grid-cols-2 gap-4 my-6">
          <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 border border-green-200 dark:border-green-800">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <h4 className="font-bold text-green-800 dark:text-green-200 m-0">✅ 合資格</h4>
            </div>
            <ul className="text-green-700 dark:text-green-300 text-sm space-y-1 m-0">
              <li>• 渣打信用卡（Simply Cash、Smart Card 等）</li>
              <li>• 渣打聯營卡（國泰 Mastercard 等）</li>
              <li>• MANHATTAN 信用卡及聯營卡</li>
            </ul>
          </div>
          <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4 border border-red-200 dark:border-red-800">
            <div className="flex items-center gap-2 mb-3">
              <XCircle className="h-5 w-5 text-red-500" />
              <h4 className="font-bold text-red-800 dark:text-red-200 m-0">❌ 不適用</h4>
            </div>
            <ul className="text-red-700 dark:text-red-300 text-sm space-y-1 m-0">
              <li>• 渣打商務卡</li>
              <li>• 渣打公司卡</li>
              <li>• 渣打銀聯雙幣白金信用卡（人民幣賬戶）</li>
            </ul>
          </div>
        </div>

        <div className="not-prose bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Plane className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <p className="text-blue-700 dark:text-blue-300 text-sm m-0">
              <strong>里數 vs 現金：</strong>用<strong>渣打國泰 Mastercard</strong>交稅可賺 <strong>Asia Miles</strong>，
              其他渣打/MANHATTAN 卡則賺<strong>現金回贈</strong>。獎賞類型取決於第一筆繳稅所用嘅卡。
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: 優惠1 交稅金額獎賞 */}
      <section id="reward1" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <DollarSign className="h-6 w-6 text-blue-500" />
          3. 優惠1：交稅金額獎賞
        </h2>

        <p>
          累積繳稅金額達到指定金額，即可獲得相應獎賞：
        </p>

        <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden my-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-blue-50 dark:bg-blue-900/20">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-blue-600 dark:text-blue-400">累積繳稅金額</th>
                  <th className="px-4 py-3 text-center font-medium text-blue-600 dark:text-blue-400">特選客戶</th>
                  <th className="px-4 py-3 text-center font-medium text-blue-600 dark:text-blue-400">其他客戶</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {taxPaymentRewards.map((row, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3 font-bold text-gray-900 dark:text-white">{row.tier}</td>
                    <td className="px-4 py-3 text-center">
                      <span className="font-bold text-green-600">{row.selected.cash}</span>
                      <span className="text-gray-400 mx-1">/</span>
                      <span className="text-blue-600">{row.selected.miles}</span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="font-bold text-green-600">{row.others.cash}</span>
                      <span className="text-gray-400 mx-1">/</span>
                      <span className="text-blue-600">{row.others.miles}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section 4: 優惠2 分期獎賞 */}
      <section id="reward2" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Clock className="h-6 w-6 text-green-500" />
          4. 優惠2：分期額外獎賞 + 早鳥優惠
        </h2>

        <p>
          申請<strong>月結單分期</strong>（至少 12 個月）可獲額外獎賞，<strong>12月31日前</strong>完成更有早鳥優惠：
        </p>

        <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden my-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-green-50 dark:bg-green-900/20">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-green-600 dark:text-green-400">累積分期金額</th>
                  <th className="px-4 py-3 text-center font-medium text-green-600 dark:text-green-400">優惠2</th>
                  <th className="px-4 py-3 text-center font-medium text-amber-600 dark:text-amber-400">🔥 早鳥優惠</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {installmentRewards.map((row, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3 font-bold text-gray-900 dark:text-white">{row.tier}</td>
                    <td className="px-4 py-3 text-center">
                      <span className="font-bold text-green-600">{row.reward2.cash}</span>
                      <span className="text-gray-400 mx-1">/</span>
                      <span className="text-blue-600">{row.reward2.miles}</span>
                    </td>
                    <td className="px-4 py-3 text-center bg-amber-50 dark:bg-amber-900/10">
                      <span className="font-bold text-amber-600">+{row.earlyBird.cash}</span>
                      <span className="text-gray-400 mx-1">/</span>
                      <span className="text-amber-600">+{row.earlyBird.miles}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="not-prose bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-amber-800 dark:text-amber-200 mb-1">⚠️ 分期要求</h4>
              <ul className="text-amber-700 dark:text-amber-300 text-sm space-y-1 m-0">
                <li>• 累積分期金額至少 <strong>$20,000</strong></li>
                <li>• 每項分期計劃還款期至少 <strong>12 個月</strong></li>
                <li>• 分期金額不可大於繳稅金額</li>
                <li>• 必須透過 <strong>SC Mobile App 或網上</strong>申請（不可打電話人工申請）</li>
                <li>• 必須用<strong>同一張卡</strong>交稅及申請分期</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: 例子 */}
      <section id="examples" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Calculator className="h-6 w-6 text-purple-500" />
          5. 獎賞計算例子
        </h2>

        <div className="not-prose space-y-4 my-6">
          {/* 例子 A */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-5 border border-green-200 dark:border-green-800">
            <div className="flex items-center gap-2 mb-3">
              <BadgeCheck className="h-6 w-6 text-green-500" />
              <h4 className="font-bold text-green-800 dark:text-green-200 m-0">例子 A：特選客戶交 $25萬稅 + 分期（早鳥）</h4>
            </div>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
                <p className="text-sm text-gray-500 m-0">繳稅金額</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white m-0">$250,000</p>
              </div>
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
                <p className="text-sm text-gray-500 m-0">分期金額（12月完成）</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white m-0">$250,000</p>
              </div>
            </div>
            <div className="bg-white/70 dark:bg-gray-800/70 rounded-lg p-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 m-0 mb-2">獎賞計算：</p>
              <ul className="text-green-700 dark:text-green-300 text-sm space-y-1 m-0">
                <li>• 優惠1（交稅）：<strong>$1,500</strong></li>
                <li>• 優惠2（分期）：<strong>$500</strong></li>
                <li>• 早鳥優惠：<strong>$300</strong></li>
              </ul>
              <div className="mt-3 pt-3 border-t border-green-200 dark:border-green-700">
                <p className="text-lg font-bold text-green-600 dark:text-green-400 m-0">
                  合共：$2,300 現金回贈 🎉
                </p>
              </div>
            </div>
          </div>

          {/* 例子 B */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-5 border border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-2 mb-3">
              <Plane className="h-6 w-6 text-blue-500" />
              <h4 className="font-bold text-blue-800 dark:text-blue-200 m-0">例子 B：用國泰卡交 $10萬稅 + 分期（早鳥）</h4>
            </div>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
                <p className="text-sm text-gray-500 m-0">繳稅金額（國泰卡）</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white m-0">$100,000</p>
              </div>
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
                <p className="text-sm text-gray-500 m-0">分期金額（11月完成）</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white m-0">$100,000</p>
              </div>
            </div>
            <div className="bg-white/70 dark:bg-gray-800/70 rounded-lg p-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 m-0 mb-2">獎賞計算（特選客戶）：</p>
              <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1 m-0">
                <li>• 優惠1（交稅）：<strong>5,000里</strong></li>
                <li>• 優惠2（分期）：<strong>5,000里</strong></li>
                <li>• 早鳥優惠：<strong>3,000里</strong></li>
              </ul>
              <div className="mt-3 pt-3 border-t border-blue-200 dark:border-blue-700">
                <p className="text-lg font-bold text-blue-600 dark:text-blue-400 m-0">
                  合共：13,000 Asia Miles ✈️
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: 點樣參加 */}
      <section id="how-to" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Smartphone className="h-6 w-6 text-teal-500" />
          6. 點樣參加？
        </h2>

        <div className="not-prose space-y-3 my-6">
          <div className="flex items-start gap-3 bg-teal-50 dark:bg-teal-900/20 rounded-xl p-4">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold">1</span>
            <div>
              <p className="font-medium text-gray-900 dark:text-white m-0">透過 SC Mobile App 登記</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 m-0">喺交稅前必須先登記，App 內會顯示你嘅客戶類別及最高獎賞</p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-teal-50 dark:bg-teal-900/20 rounded-xl p-4">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold">2</span>
            <div>
              <p className="font-medium text-gray-900 dark:text-white m-0">透過渣打網上理財/App/電話理財交稅</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 m-0">不可透過 AlipayHK、雲閃付等第三方平台</p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-teal-50 dark:bg-teal-900/20 rounded-xl p-4">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold">3</span>
            <div>
              <p className="font-medium text-gray-900 dark:text-white m-0">透過 SC Mobile App 或網上申請分期</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 m-0">用同一張卡申請「月結單分期」，還款期至少 12 個月</p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold">4</span>
            <div>
              <p className="font-medium text-gray-900 dark:text-white m-0">🔥 12月31日前完成分期享早鳥優惠</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 m-0">越早申請越好！</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: 推薦信用卡 */}
      <section id="best-cards" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Trophy className="h-6 w-6 text-amber-500" />
          7. 推薦信用卡
        </h2>

        <div className="not-prose space-y-4 my-6">
          {recommendedCards.map((card, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xl mr-2">{["🥇", "🥈", "🥉"][index]}</span>
                  <Link href={`/cards/${card.id}`} className="font-bold text-blue-600 hover:underline dark:text-blue-400">{card.card}</Link>
                  <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                    {card.highlight}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-green-600 dark:text-green-400 m-0">{card.maxReward}</p>
                  <p className="text-xs text-gray-500 m-0">{card.type}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 m-0">{card.reason}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Card Preview Section */}
      <CardPreviewSection 
        title="📌 渣打交稅推薦信用卡一覽"
        subtitle="點擊查看詳細回贈條款及申請連結"
        cards={[
          { id: "sc-simply-cash", highlight: "現金回贈" },
          { id: "sc-cathay", highlight: "儲里數" },
          { id: "sc-smart", highlight: "免年費" },
        ]}
      />

      {/* Section 8: 注意事項 */}
      <section id="tips" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <AlertTriangle className="h-6 w-6 text-amber-500" />
          8. 注意事項 & 貼士
        </h2>

        <div className="not-prose space-y-3">
          {[
            { icon: "📱", title: "必須事先登記", desc: "交稅前必須透過 SC Mobile App 登記此推廣計劃" },
            { icon: "💳", title: "用同一張卡", desc: "交稅及分期必須用同一張渣打信用卡" },
            { icon: "🏦", title: "透過渣打繳費", desc: "必須透過渣打網上理財/App/電話理財交稅，第三方平台不適用" },
            { icon: "⏰", title: "早鳥優惠截止", desc: "2025年12月31日前完成分期可享額外獎賞" },
            { icon: "💰", title: "獎賞入賬", desc: "2026年4月30日或之前入賬，現金回贈需手動換領（最低$50）" },
            { icon: "🔄", title: "每人限一次", desc: "每位客戶於推廣期內只可享一次獎賞" },
          ].map((tip, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 flex items-start gap-4">
              <span className="text-2xl">{tip.icon}</span>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-1 m-0">{tip.title}</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm m-0">{tip.desc}</p>
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
          {scTaxPayment2025FaqData.map((faq, index) => (
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
      <div className="not-prose bg-gradient-to-r from-teal-500 to-blue-500 rounded-2xl p-6 text-white mb-10">
        <h3 className="text-xl font-bold mb-2 m-0">💳 想知邊張信用卡最適合你？</h3>
        <p className="mb-4 opacity-90 m-0">用我哋嘅計算機，輸入你嘅消費習慣，即刻搵到最高回贈嘅信用卡！</p>
        <Link href="/">
          <Button className="bg-white text-teal-600 hover:bg-gray-100">
            <Calculator className="h-4 w-4 mr-2" />
            立即計算回贈
          </Button>
        </Link>
      </div>

      {/* Related Links */}
      <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 m-0">🔗 相關文章</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <Link href="/discover/tax-payment-guide" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
            <FileText className="h-5 w-5 text-blue-600" />
            <span>信用卡交稅攻略總覽</span>
            <ChevronRight className="h-4 w-4 ml-auto text-gray-400" />
          </Link>
          <Link href="/cards/sc-simply-cash" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
            <CreditCard className="h-5 w-5 text-blue-600" />
            <span>SC Simply Cash 詳情</span>
            <ChevronRight className="h-4 w-4 ml-auto text-gray-400" />
          </Link>
          <Link href="/cards/sc-cathay" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
            <Plane className="h-5 w-5 text-teal-600" />
            <span>SC 國泰 Mastercard 詳情</span>
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

