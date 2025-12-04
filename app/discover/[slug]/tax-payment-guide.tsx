// 信用卡交稅攻略
// 用於 /discover/tax-payment-guide 頁面

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  ChevronRight, ChevronDown, CreditCard, FileText, Building, Home,
  Calculator, Trophy, DollarSign, CheckCircle, AlertTriangle,
  Star, Smartphone, Info, XCircle, Zap, Clock, Shield, Landmark
} from "lucide-react";
import { CardPreviewSection } from "@/app/discover/components/card-preview-section";

// FAQ 數據
export const taxPaymentFaqData = [
  {
    question: "信用卡交稅有回贈嗎？",
    answer: "有！透過 AlipayHK、雲閃付、BoC Pay 等平台用信用卡交稅，可以賺取信用卡回贈。部分銀行亦有交稅優惠活動，如 HSBC、恒生、中銀等。不過要留意平台手續費及回贈上限。"
  },
  {
    question: "交稅用邊張信用卡最抵？",
    answer: "視乎你用咩方法交稅：用 AlipayHK 可用渣打 Simply Cash（1.5%）；用雲閃付可用銀聯信用卡；用 BoC Pay 可用中銀卡。部分銀行有交稅分期優惠，可以免息分期還款。"
  },
  {
    question: "HSBC 信用卡交稅有回贈嗎？",
    answer: "HSBC 信用卡透過 AlipayHK 或政府繳費網站交稅，一般可獲基本獎賞錢回贈。部分卡種（如 Red Card）網上交稅可享額外回贈。建議留意 HSBC 每年嘅交稅優惠活動。"
  },
  {
    question: "恒生信用卡交稅有優惠嗎？",
    answer: "恒生信用卡每年都有交稅優惠，如簽賬額外積分或回贈。透過恒生銀行網上繳費交稅，可享積分或現金回贈。建議留意恒生每年 1-4 月嘅交稅推廣活動。"
  },
  {
    question: "中銀信用卡交稅有回贈嗎？",
    answer: "中銀信用卡透過 BoC Pay 交稅可享積分回贈。中銀亦有交稅分期計劃，可以免息分期還款。部分中銀卡種有交稅額外積分優惠。"
  },
  {
    question: "渣打信用卡交稅有優惠嗎？",
    answer: "渣打信用卡透過 AlipayHK 交稅，可享 Simply Cash 1.5% 回贈。渣打亦有交稅分期計劃，部分計劃免手續費。建議留意渣打每年嘅交稅推廣。"
  },
  {
    question: "用 AlipayHK 交稅有回贈嗎？",
    answer: "有！用 AlipayHK 綁定信用卡交稅，信用卡會計入簽賬。渣打 Simply Cash 有 1.5% 回贈、Citi Cash Back 有 1% 回贈。但要留意 AlipayHK 交稅可能有金額上限。"
  },
  {
    question: "交稅可以分期嗎？",
    answer: "可以！多間銀行提供交稅分期計劃，如 HSBC、恒生、中銀、渣打、Citi 等。部分銀行提供免息免手續費分期（12-24 個月），可減輕交稅壓力。"
  }
];

// 交稅方法比較
const taxPaymentMethods = [
  {
    method: "AlipayHK",
    fee: "免手續費",
    limit: "有上限",
    creditCardSupport: true,
    bestCards: [
      { card: "渣打 Simply Cash", id: "sc-simply-cash", rate: "1.5%" },
      { card: "Citi Cash Back", id: "citi-cashback", rate: "1%" },
    ],
    pros: ["免手續費", "即時到賬"],
    cons: ["有金額上限", "需綁定信用卡"],
  },
  {
    method: "雲閃付",
    fee: "免手續費",
    limit: "有上限",
    creditCardSupport: true,
    bestCards: [
      { card: "銀聯信用卡", id: null, rate: "視乎卡種" },
      { card: "安信 EarnMORE", id: "earnmore", rate: "2%" },
    ],
    pros: ["免手續費", "支援銀聯"],
    cons: ["只限銀聯卡", "有金額上限"],
  },
  {
    method: "BoC Pay",
    fee: "免手續費",
    limit: "視乎卡種",
    creditCardSupport: true,
    bestCards: [
      { card: "中銀信用卡", id: "boc-cheers", rate: "0.4%+" },
    ],
    pros: ["免手續費", "中銀有額外優惠"],
    cons: ["只限中銀卡"],
  },
  {
    method: "政府繳費網站（PPS）",
    fee: "免手續費",
    limit: "無上限",
    creditCardSupport: false,
    bestCards: [],
    pros: ["無上限", "直接繳費"],
    cons: ["只接受銀行戶口", "無信用卡回贈"],
  },
  {
    method: "八達通 App",
    fee: "免手續費",
    limit: "有上限",
    creditCardSupport: true,
    bestCards: [
      { card: "支援八達通自動增值嘅卡", id: null, rate: "視乎卡種" },
    ],
    pros: ["免手續費", "方便"],
    cons: ["需先增值", "回贈較低"],
  },
];

// 銀行交稅優惠
const bankTaxOffers = [
  {
    bank: "HSBC",
    offer: "交稅分期免息免手續費",
    period: "最長 24 個月",
    requirement: "指定卡種",
    note: "需申請，名額有限",
  },
  {
    bank: "恒生銀行",
    offer: "交稅簽賬額外積分",
    period: "每年 1-4 月",
    requirement: "恒生信用卡",
    note: "留意每年推廣詳情",
  },
  {
    bank: "中銀香港",
    offer: "BoC Pay 交稅額外積分",
    period: "每年交稅季",
    requirement: "中銀信用卡",
    note: "透過 BoC Pay 繳費",
  },
  {
    bank: "渣打銀行",
    offer: "交稅分期免息",
    period: "最長 12 個月",
    requirement: "指定卡種",
    note: "需申請",
  },
  {
    bank: "Citi",
    offer: "交稅分期低息",
    period: "最長 24 個月",
    requirement: "Citi 信用卡",
    note: "手續費視乎分期期數",
  },
];

// 推薦信用卡
const recommendedCards = [
  {
    card: "渣打 Simply Cash Visa",
    id: "sc-simply-cash",
    rate: "1.5%",
    highlight: "AlipayHK 首選",
    reason: "透過 AlipayHK 交稅可賺 1.5% 無上限回贈",
    method: "AlipayHK",
  },
  {
    card: "安信 EarnMORE 銀聯卡",
    id: "earnmore",
    rate: "2%",
    highlight: "雲閃付首選",
    reason: "透過雲閃付交稅可賺 2% 無上限回贈（Apple Pay）",
    method: "雲閃付",
  },
  {
    card: "Citi Cash Back Card",
    id: "citi-cashback",
    rate: "1%",
    highlight: "分期選擇",
    reason: "可申請交稅分期，AlipayHK 交稅有 1% 回贈",
    method: "AlipayHK / 分期",
  },
  {
    card: "中銀 Cheers Visa",
    id: "boc-cheers",
    rate: "0.4%+",
    highlight: "BoC Pay",
    reason: "透過 BoC Pay 交稅，中銀有額外積分優惠",
    method: "BoC Pay",
  },
  {
    card: "HSBC Red Card",
    id: "hsbc-red",
    rate: "4%（網上）",
    highlight: "分期免息",
    reason: "可申請免息免手續費分期，網上交稅可享回贈",
    method: "網上繳費 / 分期",
  },
];

export function TaxPaymentGuide() {
  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;
  
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      {/* 引言 */}
      <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-6">
        每年交稅都要俾一大筆錢，點解唔用<strong>信用卡交稅</strong>賺回贈？
        本文教你 <strong>{currentYear}/{nextYear} 信用卡交稅攻略</strong>，
        透過 <strong>AlipayHK</strong>、<strong>雲閃付</strong>、<strong>BoC Pay</strong> 交稅，
        最高可賺 <strong>2% 回贈</strong>！仲有<strong>免息分期</strong>選擇！
      </p>

      {/* 目錄 */}
      <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-10">
        <h2 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          📑 本文目錄
        </h2>
        <ul className="space-y-2 text-sm">
          <li><a href="#overview" className="text-blue-600 dark:text-blue-400 hover:underline">1. 信用卡交稅可以賺回贈？</a></li>
          <li><a href="#methods" className="text-blue-600 dark:text-blue-400 hover:underline">2. 交稅方法比較：AlipayHK vs 雲閃付 vs BoC Pay</a></li>
          <li><a href="#alipay" className="text-blue-600 dark:text-blue-400 hover:underline">3. AlipayHK 交稅攻略</a></li>
          <li><a href="#unionpay" className="text-blue-600 dark:text-blue-400 hover:underline">4. 雲閃付交稅攻略</a></li>
          <li><a href="#bocpay" className="text-blue-600 dark:text-blue-400 hover:underline">5. BoC Pay 交稅攻略</a></li>
          <li><a href="#bank-offers" className="text-blue-600 dark:text-blue-400 hover:underline">6. 各銀行交稅優惠</a></li>
          <li><a href="#installment" className="text-blue-600 dark:text-blue-400 hover:underline">7. 交稅分期計劃比較</a></li>
          <li><a href="#best-cards" className="text-blue-600 dark:text-blue-400 hover:underline">8. 交稅信用卡推薦</a></li>
          <li><a href="#tips" className="text-blue-600 dark:text-blue-400 hover:underline">9. 交稅慳錢貼士</a></li>
          <li><a href="#faq" className="text-blue-600 dark:text-blue-400 hover:underline">10. 常見問題 FAQ</a></li>
        </ul>
      </div>

      {/* Section 1: 總覽 */}
      <section id="overview" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <FileText className="h-6 w-6 text-blue-500" />
          1. 信用卡交稅可以賺回贈？
        </h2>
        
        <p>
          傳統上，交稅只能用<strong>銀行轉賬</strong>或<strong>支票</strong>，完全無回贈。
          但而家可以透過 <strong>AlipayHK</strong>、<strong>雲閃付</strong>、<strong>BoC Pay</strong> 等平台，
          用<strong>信用卡交稅</strong>賺回贈！
        </p>

        <div className="not-prose bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-5 border border-green-200 dark:border-green-800 my-6">
          <h4 className="font-bold text-green-800 dark:text-green-200 mb-3">💰 交稅回贈例子</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-4">
              <p className="text-sm text-gray-500 mb-1">稅款金額</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">$50,000</p>
            </div>
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-4">
              <p className="text-sm text-gray-500 mb-1">以 1.5% 回贈計</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">賺 $750</p>
            </div>
          </div>
          <p className="text-green-700 dark:text-green-300 text-sm mt-3">
            如果稅款 $100,000，以 1.5% 回贈計可賺 <strong>$1,500</strong>！
          </p>
        </div>

        <div className="not-prose bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-amber-800 dark:text-amber-200 mb-1">⚠️ 注意事項</h4>
              <ul className="text-amber-700 dark:text-amber-300 text-sm space-y-1">
                <li>• AlipayHK、雲閃付等平台可能有<strong>交稅金額上限</strong></li>
                <li>• 部分方法需要<strong>預先綁定信用卡</strong></li>
                <li>• 銀行優惠可能有<strong>名額限制</strong>，先到先得</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: 方法比較 */}
      <section id="methods" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Smartphone className="h-6 w-6 text-purple-500" />
          2. 交稅方法比較
        </h2>

        <p>
          以下係主要<strong>信用卡交稅方法</strong>比較：
        </p>

        <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden my-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-purple-50 dark:bg-purple-900/20">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-purple-600 dark:text-purple-400">方法</th>
                  <th className="px-4 py-3 text-center font-medium text-purple-600 dark:text-purple-400">手續費</th>
                  <th className="px-4 py-3 text-center font-medium text-purple-600 dark:text-purple-400">信用卡</th>
                  <th className="px-4 py-3 text-center font-medium text-purple-600 dark:text-purple-400">推薦信用卡</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {taxPaymentMethods.map((method, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3 font-bold text-gray-900 dark:text-white">{method.method}</td>
                    <td className="px-4 py-3 text-center">
                      <span className="font-bold text-green-600">{method.fee}</span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      {method.creditCardSupport ? (
                        <span className="text-green-600">✓ 支援</span>
                      ) : (
                        <span className="text-red-600">✗ 不支援</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {method.bestCards.length > 0 && method.bestCards[0].id ? (
                        <Link href={`/cards/${method.bestCards[0].id}`} className="text-blue-600 hover:underline text-xs">
                          {method.bestCards[0].card}
                        </Link>
                      ) : method.bestCards.length > 0 ? (
                        <span className="text-gray-600 text-xs">{method.bestCards[0].card}</span>
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

      {/* Section 3: AlipayHK */}
      <section id="alipay" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Smartphone className="h-6 w-6 text-blue-500" />
          3. AlipayHK 交稅攻略
        </h2>

        <p>
          <strong>AlipayHK 交稅</strong>係最多人用嘅方法，可以綁定信用卡賺回贈：
        </p>

        <div className="not-prose space-y-3 my-6">
          <div className="flex items-start gap-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">1</span>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">打開 AlipayHK App</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">選擇「繳費」→「政府及公共服務」</p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">2</span>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">選擇「稅務局」</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">輸入稅單號碼及金額</p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">3</span>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">選擇信用卡付款</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">揀已綁定嘅信用卡（如 <Link href="/cards/sc-simply-cash" className="text-blue-600 hover:underline">Simply Cash</Link>）</p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">4</span>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">完成付款</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">即時到賬，信用卡會計入簽賬</p>
            </div>
          </div>
        </div>

        <div className="not-prose bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
          <h4 className="font-bold text-green-800 dark:text-green-200 mb-2">💡 AlipayHK 交稅推薦信用卡</h4>
          <ul className="text-green-700 dark:text-green-300 text-sm space-y-1">
            <li>• <Link href="/cards/sc-simply-cash" className="text-blue-600 hover:underline font-medium">渣打 Simply Cash</Link>：<strong>1.5% 無上限</strong></li>
            <li>• <Link href="/cards/citi-cashback" className="text-blue-600 hover:underline font-medium">Citi Cash Back</Link>：<strong>1% 無上限</strong></li>
            <li>• <Link href="/cards/hsbc-red" className="text-blue-600 hover:underline font-medium">HSBC Red Card</Link>：<strong>4%（網上）</strong></li>
          </ul>
        </div>
      </section>

      {/* Section 4: 雲閃付 */}
      <section id="unionpay" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <CreditCard className="h-6 w-6 text-red-500" />
          4. 雲閃付交稅攻略
        </h2>

        <p>
          <strong>雲閃付交稅</strong>適合用<strong>銀聯信用卡</strong>嘅用戶，可以賺取回贈：
        </p>

        <div className="not-prose bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 my-6">
          <h4 className="font-bold text-red-800 dark:text-red-200 mb-2">🔥 雲閃付交稅推薦信用卡</h4>
          <ul className="text-red-700 dark:text-red-300 text-sm space-y-1">
            <li>• <Link href="/cards/earnmore" className="text-blue-600 hover:underline font-medium">安信 EarnMORE 銀聯卡</Link>：<strong>2% 無上限</strong>（Apple Pay）</li>
            <li>• 其他銀聯信用卡：視乎卡種回贈</li>
          </ul>
        </div>

        <div className="not-prose bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-amber-700 dark:text-amber-300 text-sm">
              <strong>注意：</strong>雲閃付交稅只接受<strong>銀聯信用卡</strong>，
              Visa / Mastercard 唔可以用。
            </p>
          </div>
        </div>
      </section>

      {/* Section 5: BoC Pay */}
      <section id="bocpay" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Building className="h-6 w-6 text-orange-500" />
          5. BoC Pay 交稅攻略
        </h2>

        <p>
          <strong>BoC Pay 交稅</strong>適合<strong>中銀信用卡</strong>用戶，中銀有額外積分優惠：
        </p>

        <div className="not-prose bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-xl p-4 my-6">
          <h4 className="font-bold text-orange-800 dark:text-orange-200 mb-2">🏦 BoC Pay 交稅推薦信用卡</h4>
          <ul className="text-orange-700 dark:text-orange-300 text-sm space-y-1">
            <li>• <Link href="/cards/boc-cheers" className="text-blue-600 hover:underline font-medium">中銀 Cheers Visa</Link>：基本積分 + 交稅額外優惠</li>
            <li>• 中銀其他信用卡：視乎每年推廣活動</li>
          </ul>
        </div>
      </section>

      {/* Section 6: 銀行優惠 */}
      <section id="bank-offers" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Landmark className="h-6 w-6 text-indigo-500" />
          6. 各銀行交稅優惠
        </h2>

        <p>
          各大銀行每年都會推出<strong>交稅優惠</strong>，包括額外積分、免息分期等：
        </p>

        <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden my-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-indigo-50 dark:bg-indigo-900/20">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-indigo-600 dark:text-indigo-400">銀行</th>
                  <th className="px-4 py-3 text-left font-medium text-indigo-600 dark:text-indigo-400">優惠</th>
                  <th className="px-4 py-3 text-center font-medium text-indigo-600 dark:text-indigo-400">期限</th>
                  <th className="px-4 py-3 text-left font-medium text-indigo-600 dark:text-indigo-400">備註</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {bankTaxOffers.map((offer, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3 font-bold text-gray-900 dark:text-white">{offer.bank}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{offer.offer}</td>
                    <td className="px-4 py-3 text-center text-gray-600 dark:text-gray-400">{offer.period}</td>
                    <td className="px-4 py-3 text-gray-500 dark:text-gray-500 text-xs">{offer.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="not-prose bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <p className="text-blue-700 dark:text-blue-300 text-sm">
              <strong>提示：</strong>各銀行交稅優惠每年可能有變動，
              建議喺交稅季節（1-4 月）留意銀行最新推廣。
            </p>
          </div>
        </div>
      </section>

      {/* Section 7: 分期 */}
      <section id="installment" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Clock className="h-6 w-6 text-teal-500" />
          7. 交稅分期計劃比較
        </h2>

        <p>
          如果稅款金額大，可以申請<strong>交稅分期</strong>，部分銀行提供<strong>免息免手續費</strong>分期：
        </p>

        <div className="not-prose grid md:grid-cols-2 gap-4 my-6">
          <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 border border-green-200 dark:border-green-800">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <h4 className="font-bold text-green-800 dark:text-green-200">免息分期優點</h4>
            </div>
            <ul className="text-green-700 dark:text-green-300 text-sm space-y-1">
              <li>• 減輕即時現金壓力</li>
              <li>• 唔使一次過俾晒</li>
              <li>• 可以將資金用喺其他投資</li>
            </ul>
          </div>
          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 border border-amber-200 dark:border-amber-800">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              <h4 className="font-bold text-amber-800 dark:text-amber-200">注意事項</h4>
            </div>
            <ul className="text-amber-700 dark:text-amber-300 text-sm space-y-1">
              <li>• 名額有限，先到先得</li>
              <li>• 需要申請，唔係自動</li>
              <li>• 部分銀行有最低金額要求</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 8: 推薦信用卡 */}
      <section id="best-cards" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Trophy className="h-6 w-6 text-amber-500" />
          8. 交稅信用卡推薦
        </h2>

        <p>
          以下係<strong>交稅信用卡 {currentYear}/{nextYear}</strong> 推薦：
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
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{card.reason}</p>
              <p className="text-xs text-gray-500 mt-1">透過：{card.method}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Card Preview Section */}
      <CardPreviewSection 
        title="📌 交稅推薦信用卡一覽"
        subtitle="點擊查看詳細回贈條款及申請連結"
        cards={[
          { id: "sc-simply-cash", highlight: "AlipayHK" },
          { id: "earnmore", highlight: "雲閃付" },
          { id: "citi-cashback", highlight: "分期" },
          { id: "hsbc-red", highlight: "網上繳費" },
        ]}
      />

      {/* Section 9: 貼士 */}
      <section id="tips" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Zap className="h-6 w-6 text-yellow-500" />
          9. 交稅慳錢貼士
        </h2>

        <div className="not-prose space-y-3">
          {[
            { icon: "📱", title: "用 AlipayHK / 雲閃付交稅", desc: "綁定高回贈信用卡，賺取最高 2% 回贈" },
            { icon: "💳", title: "揀高回贈信用卡", desc: "Simply Cash 1.5%、EarnMORE 2% 無上限" },
            { icon: "📅", title: "留意銀行優惠", desc: "每年 1-4 月係交稅季，銀行有額外優惠" },
            { icon: "🔄", title: "考慮免息分期", desc: "大額稅款可申請免息分期，減輕壓力" },
            { icon: "🎯", title: "配合迎新", desc: "用新信用卡交稅達成迎新簽賬要求" },
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
          {taxPaymentFaqData.map((faq, index) => (
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
          <Link href="/discover/rent-payment-guide" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
            <Home className="h-5 w-5 text-emerald-600" />
            <span>信用卡交租攻略</span>
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

