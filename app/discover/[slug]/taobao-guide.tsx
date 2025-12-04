// 淘寶信用卡攻略
// 用於 /discover/taobao-guide 頁面

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  ChevronRight, ChevronDown, CreditCard, ShoppingBag, Globe,
  Calculator, Trophy, DollarSign, CheckCircle, AlertTriangle,
  Star, Smartphone, Info, Zap, Percent, Wallet, Shield
} from "lucide-react";
import { CardPreviewSection } from "@/app/discover/components/card-preview-section";

// FAQ 數據
export const taobaoFaqData = [
  {
    question: "淘寶用邊張信用卡最抵？",
    answer: "淘寶可用 AlipayHK 付款，渣打 Simply Cash 有 1.5% 無上限回贈。如果直接用信用卡付款（人民幣），要留意外幣手續費約 1.95%。中銀淘寶卡有淘寶專屬優惠。"
  },
  {
    question: "淘寶信用卡付款有手續費嗎？",
    answer: "有！淘寶係人民幣簽賬，直接用信用卡付款會收約 1.95% 外幣手續費。建議用 AlipayHK 付款（免手續費）或用免外幣手續費信用卡。"
  },
  {
    question: "淘寶用 AlipayHK 付款安全嗎？",
    answer: "安全！AlipayHK 係香港支付寶，受香港金管局監管。用 AlipayHK 綁定信用卡付款，唔使喺淘寶輸入信用卡資料，更安全。"
  },
  {
    question: "淘寶用 AlipayHK 有回贈嗎？",
    answer: "有！AlipayHK 付款會計入信用卡簽賬。渣打 Simply Cash 有 1.5%、Citi Cash Back 有 1%。AlipayHK 付款免外幣手續費，回贈係淨賺。"
  },
  {
    question: "淘寶付款方法有邊幾種？",
    answer: "淘寶付款方法有：(1) AlipayHK（推薦）；(2) 支付寶餘額；(3) 信用卡直接付款（有手續費）；(4) 八達通 App；(5) PayMe。建議用 AlipayHK 最抵。"
  },
  {
    question: "天貓用邊張信用卡最抵？",
    answer: "天貓同淘寶一樣，建議用 AlipayHK 付款。渣打 Simply Cash 有 1.5% 無上限回贈。天貓雙 11、618 有額外優惠，配合信用卡回贈更抵。"
  },
  {
    question: "淘寶信用卡付款失敗點算？",
    answer: "淘寶信用卡付款失敗可能係：(1) 信用卡唔支援跨境付款；(2) 額度不足；(3) 銀行攔截可疑交易。建議用 AlipayHK 付款避免問題。"
  },
  {
    question: "淘寶集運用邊張信用卡？",
    answer: "淘寶官方集運用人民幣付款，建議用 AlipayHK。第三方集運（如順豐、菜鳥）可能用港幣付款，可用高回贈本地卡。"
  }
];

// 付款方法比較
const paymentMethods = [
  {
    method: "AlipayHK",
    fee: "免手續費",
    rate: "即時匯率",
    creditCardSupport: true,
    bestCards: [
      { card: "渣打 Simply Cash", id: "sc-simply-cash", rate: "1.5%" },
      { card: "Citi Cash Back", id: "citi-cashback", rate: "1%" },
    ],
    pros: ["免手續費", "即時到賬", "安全"],
    cons: ["需安裝 App", "有金額上限"],
    recommended: true,
  },
  {
    method: "信用卡直接付款",
    fee: "~1.95% 外幣手續費",
    rate: "Visa/MC 匯率",
    creditCardSupport: true,
    bestCards: [
      { card: "中銀淘寶卡", id: "boc-taobao", rate: "專屬優惠" },
      { card: "SC Smart Card", id: "sc-smart", rate: "免手續費" },
    ],
    pros: ["直接付款", "無需 App"],
    cons: ["有手續費", "可能被拒"],
    recommended: false,
  },
  {
    method: "八達通 App",
    fee: "免手續費",
    rate: "八達通匯率",
    creditCardSupport: true,
    bestCards: [
      { card: "支援八達通增值嘅卡", id: null, rate: "視乎卡種" },
    ],
    pros: ["免手續費", "方便"],
    cons: ["需先增值", "回贈較低"],
    recommended: false,
  },
  {
    method: "PayMe",
    fee: "免手續費",
    rate: "PayMe 匯率",
    creditCardSupport: false,
    bestCards: [],
    pros: ["免手續費"],
    cons: ["唔可以用信用卡", "只能用銀行戶口"],
    recommended: false,
  },
];

// 推薦信用卡
const recommendedCards = [
  {
    card: "渣打 Simply Cash Visa",
    id: "sc-simply-cash",
    rate: "1.5%",
    fee: "免（AlipayHK）",
    highlight: "淘寶首選",
    reason: "透過 AlipayHK 付款，1.5% 無上限回贈，免外幣手續費。",
    best: "所有淘寶消費",
  },
  {
    card: "中銀淘寶卡",
    id: "boc-taobao",
    rate: "專屬優惠",
    fee: "1.95%",
    highlight: "淘寶專屬",
    reason: "淘寶專屬優惠、積分獎賞。中銀免 CBF。",
    best: "淘寶重度用戶",
  },
  {
    card: "Citi Cash Back Card",
    id: "citi-cashback",
    rate: "1%",
    fee: "免（AlipayHK）",
    highlight: "本地簽賬",
    reason: "透過 AlipayHK 付款有 1% 回贈，無上限。",
    best: "配合其他消費",
  },
  {
    card: "SC Smart Card",
    id: "sc-smart",
    rate: "0.55%",
    fee: "免外幣手續費",
    highlight: "免手續費",
    reason: "直接用信用卡付款都免外幣手續費。",
    best: "唔想用 AlipayHK",
  },
  {
    card: "安信 EarnMORE 銀聯卡",
    id: "earnmore",
    rate: "2%",
    fee: "1.95%",
    highlight: "高回贈",
    reason: "雖然有手續費，但 2% 回贈扣除後仍有微賺。",
    best: "大額淘寶消費",
  },
];

// 回贈計算
const cashbackCalculation = [
  { card: "Simply Cash (AlipayHK)", rate: "1.5%", fee: "0%", net: "1.5%", example: "$15/千" },
  { card: "Citi Cash Back (AlipayHK)", rate: "1%", fee: "0%", net: "1%", example: "$10/千" },
  { card: "EarnMORE (直接付款)", rate: "2%", fee: "1.95%", net: "0.05%", example: "$0.5/千" },
  { card: "SC Smart Card (直接)", rate: "0.55%", fee: "0%", net: "0.55%", example: "$5.5/千" },
  { card: "普通卡 (直接付款)", rate: "0%", fee: "1.95%", net: "-1.95%", example: "-$19.5/千" },
];

export function TaobaoGuide() {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      {/* 引言 */}
      <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-6">
        淘寶買嘢已經成為日常，點解唔用<strong>淘寶信用卡</strong>賺回贈？
        本文教你 <strong>{currentYear} 淘寶信用卡攻略</strong>，
        扣埋手續費仲可以淨賺 <strong>1.5% 回贈</strong>！
      </p>

      {/* 目錄 */}
      <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-10">
        <h2 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          📑 本文目錄
        </h2>
        <ul className="space-y-2 text-sm">
          <li><a href="#overview" className="text-blue-600 dark:text-blue-400 hover:underline">1. 淘寶用信用卡有回贈嗎？</a></li>
          <li><a href="#fees" className="text-blue-600 dark:text-blue-400 hover:underline">2. 淘寶信用卡手續費陷阱</a></li>
          <li><a href="#payment-methods" className="text-blue-600 dark:text-blue-400 hover:underline">3. 淘寶付款方法比較</a></li>
          <li><a href="#alipay" className="text-blue-600 dark:text-blue-400 hover:underline">4. AlipayHK 淘寶付款攻略</a></li>
          <li><a href="#calculation" className="text-blue-600 dark:text-blue-400 hover:underline">5. 淘寶回贈計算</a></li>
          <li><a href="#best-cards" className="text-blue-600 dark:text-blue-400 hover:underline">6. 淘寶信用卡推薦</a></li>
          <li><a href="#tmall" className="text-blue-600 dark:text-blue-400 hover:underline">7. 天貓信用卡攻略</a></li>
          <li><a href="#shipping" className="text-blue-600 dark:text-blue-400 hover:underline">8. 淘寶集運付款攻略</a></li>
          <li><a href="#tips" className="text-blue-600 dark:text-blue-400 hover:underline">9. 淘寶慳錢貼士</a></li>
          <li><a href="#faq" className="text-blue-600 dark:text-blue-400 hover:underline">10. 常見問題 FAQ</a></li>
        </ul>
      </div>

      {/* Section 1: 總覽 */}
      <section id="overview" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <ShoppingBag className="h-6 w-6 text-orange-500" />
          1. 淘寶用信用卡有回贈嗎？
        </h2>
        
        <p>
          <strong>淘寶信用卡回贈</strong>要識計先知抵唔抵！
          直接用信用卡付款有手續費，但用 <strong>AlipayHK</strong> 就可以免手續費賺回贈：
        </p>

        <div className="not-prose bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl p-5 border border-orange-200 dark:border-orange-800 my-6">
          <h4 className="font-bold text-orange-800 dark:text-orange-200 mb-3">💰 淘寶回贈例子（消費 $1,000）</h4>
          <div className="grid md:grid-cols-3 gap-3">
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 text-center">
              <p className="text-sm text-gray-500">Simply Cash + AlipayHK</p>
              <p className="text-xl font-bold text-green-600">+$15</p>
              <p className="text-xs text-gray-400">1.5% 淨賺</p>
            </div>
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 text-center">
              <p className="text-sm text-gray-500">EarnMORE 直接付款</p>
              <p className="text-xl font-bold text-green-600">+$0.5</p>
              <p className="text-xs text-gray-400">2% - 1.95% 手續費</p>
            </div>
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 text-center">
              <p className="text-sm text-gray-500">普通卡直接付款</p>
              <p className="text-xl font-bold text-red-600">-$19.5</p>
              <p className="text-xs text-gray-400">蝕 1.95% 手續費</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: 手續費 */}
      <section id="fees" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <AlertTriangle className="h-6 w-6 text-red-500" />
          2. 淘寶信用卡手續費陷阱
        </h2>

        <p>
          淘寶係<strong>人民幣（CNY）簽賬</strong>，直接用信用卡付款會有手續費：
        </p>

        <div className="not-prose bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 my-6">
          <h4 className="font-bold text-red-800 dark:text-red-200 mb-2">⚠️ 直接用信用卡付款</h4>
          <ul className="text-red-700 dark:text-red-300 text-sm space-y-1">
            <li>• <strong>外幣手續費 (FX Fee)</strong>：約 1.95%</li>
            <li>• 如果回贈唔夠 1.95%，你會<strong>蝕錢</strong>！</li>
            <li>• 例：回贈 1%，蝕 0.95%</li>
          </ul>
        </div>

        <div className="not-prose bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
          <h4 className="font-bold text-green-800 dark:text-green-200 mb-2">✅ 用 AlipayHK 付款</h4>
          <ul className="text-green-700 dark:text-green-300 text-sm space-y-1">
            <li>• <strong>免外幣手續費</strong></li>
            <li>• 信用卡回贈係<strong>淨賺</strong></li>
            <li>• 例：<Link href="/cards/sc-simply-cash" className="text-blue-600 hover:underline">Simply Cash</Link> 1.5%，淨賺 1.5%</li>
          </ul>
        </div>
      </section>

      {/* Section 3: 付款方法比較 */}
      <section id="payment-methods" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Wallet className="h-6 w-6 text-purple-500" />
          3. 淘寶付款方法比較
        </h2>

        <div className="not-prose space-y-4 my-6">
          {paymentMethods.map((method, index) => (
            <div key={index} className={`rounded-xl border p-4 ${method.recommended ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700'}`}>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    {method.method}
                    {method.recommended && (
                      <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">推薦</span>
                    )}
                  </h4>
                  <p className="text-xs text-gray-500">手續費：{method.fee}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">信用卡：{method.creditCardSupport ? '✓ 支援' : '✗ 不支援'}</p>
                </div>
              </div>
              {method.bestCards.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-2">
                  {method.bestCards.map((card, i) => (
                    card.id ? (
                      <Link 
                        key={i} 
                        href={`/cards/${card.id}`}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-orange-50 dark:bg-orange-900/20 rounded-full text-xs text-orange-600 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-900/40 transition-colors"
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
              )}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <p className="text-green-600 font-medium">優點：</p>
                  <ul className="text-gray-600 dark:text-gray-400">
                    {method.pros.map((pro, i) => <li key={i}>• {pro}</li>)}
                  </ul>
                </div>
                <div>
                  <p className="text-red-600 font-medium">缺點：</p>
                  <ul className="text-gray-600 dark:text-gray-400">
                    {method.cons.map((con, i) => <li key={i}>• {con}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: AlipayHK */}
      <section id="alipay" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Smartphone className="h-6 w-6 text-blue-500" />
          4. AlipayHK 淘寶付款攻略
        </h2>

        <p>
          <strong>AlipayHK</strong> 係淘寶付款最抵方法：
        </p>

        <div className="not-prose space-y-3 my-6">
          <div className="flex items-start gap-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">1</span>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">下載 AlipayHK App</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">App Store / Google Play 下載，完成實名認證</p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">2</span>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">綁定信用卡</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">加入 <Link href="/cards/sc-simply-cash" className="text-blue-600 hover:underline">Simply Cash</Link> 或其他高回贈卡</p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">3</span>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">淘寶結賬選擇 AlipayHK</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">付款時選擇「支付寶(香港)」，跳轉 AlipayHK 確認</p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">4</span>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">完成付款</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">免手續費，信用卡計入簽賬賺回贈！</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: 回贈計算 */}
      <section id="calculation" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Calculator className="h-6 w-6 text-green-500" />
          5. 淘寶回贈計算
        </h2>

        <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden my-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-orange-50 dark:bg-orange-900/20">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-orange-600 dark:text-orange-400">付款方式</th>
                  <th className="px-4 py-3 text-center font-medium text-orange-600 dark:text-orange-400">回贈</th>
                  <th className="px-4 py-3 text-center font-medium text-orange-600 dark:text-orange-400">手續費</th>
                  <th className="px-4 py-3 text-center font-medium text-orange-600 dark:text-orange-400">淨回贈</th>
                  <th className="px-4 py-3 text-center font-medium text-orange-600 dark:text-orange-400">每 $1,000</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {cashbackCalculation.map((item, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{item.card}</td>
                    <td className="px-4 py-3 text-center text-gray-600 dark:text-gray-400">{item.rate}</td>
                    <td className="px-4 py-3 text-center text-gray-600 dark:text-gray-400">{item.fee}</td>
                    <td className="px-4 py-3 text-center font-bold">
                      <span className={item.net.startsWith('-') ? 'text-red-600' : 'text-green-600'}>
                        {item.net}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center font-bold">
                      <span className={item.example.startsWith('-') ? 'text-red-600' : 'text-green-600'}>
                        {item.example}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section 6: 推薦信用卡 */}
      <section id="best-cards" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Trophy className="h-6 w-6 text-amber-500" />
          6. 淘寶信用卡推薦
        </h2>

        <p>
          以下係<strong>淘寶信用卡 {currentYear}</strong> 推薦：
        </p>

        <div className="not-prose space-y-4 my-6">
          {recommendedCards.map((card, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xl mr-2">{["🥇", "🥈", "🥉", "4️⃣", "5️⃣"][index]}</span>
                  <Link href={`/cards/${card.id}`} className="font-bold text-blue-600 hover:underline dark:text-blue-400">{card.card}</Link>
                  <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400">
                    {card.highlight}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-green-600 dark:text-green-400">{card.rate}</p>
                  <p className="text-xs text-gray-500">手續費：{card.fee}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{card.reason}</p>
              <p className="text-xs text-gray-500 mt-1">最適合：{card.best}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Card Preview Section */}
      <CardPreviewSection 
        title="📌 淘寶推薦信用卡一覽"
        subtitle="點擊查看詳細回贈條款及申請連結"
        cards={[
          { id: "sc-simply-cash", highlight: "AlipayHK 首選" },
          { id: "boc-taobao", highlight: "淘寶專屬" },
          { id: "citi-cashback", highlight: "1% 無上限" },
          { id: "sc-smart", highlight: "免手續費" },
        ]}
      />

      {/* Section 7: 天貓 */}
      <section id="tmall" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Star className="h-6 w-6 text-red-500" />
          7. 天貓信用卡攻略
        </h2>

        <p>
          <strong>天貓</strong>同淘寶一樣，建議用 AlipayHK 付款：
        </p>

        <div className="not-prose bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-xl p-4 border border-red-200 dark:border-red-800 my-6">
          <h4 className="font-bold text-red-800 dark:text-red-200 mb-3">🎉 天貓大促攻略</h4>
          <div className="grid md:grid-cols-2 gap-3">
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
              <p className="font-medium text-gray-900 dark:text-white">雙 11（11月11日）</p>
              <p className="text-xs text-gray-500">全年最大優惠，配合信用卡回贈更抵</p>
            </div>
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
              <p className="font-medium text-gray-900 dark:text-white">618（6月18日）</p>
              <p className="text-xs text-gray-500">年中大促，優惠力度僅次雙 11</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 8: 集運 */}
      <section id="shipping" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Globe className="h-6 w-6 text-teal-500" />
          8. 淘寶集運付款攻略
        </h2>

        <div className="not-prose space-y-3 my-6">
          <div className="flex items-start gap-3 bg-teal-50 dark:bg-teal-900/20 rounded-xl p-4">
            <span className="text-2xl">📦</span>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">官方集運（菜鳥）</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                人民幣付款，建議用 <strong>AlipayHK</strong>，免手續費賺回贈
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
            <span className="text-2xl">🚚</span>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">第三方集運（順豐等）</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                可能用港幣付款，可用 <Link href="/cards/hsbc-red" className="text-blue-600 hover:underline">Red Card</Link> 或其他本地卡賺回贈
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 9: 貼士 */}
      <section id="tips" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Zap className="h-6 w-6 text-yellow-500" />
          9. 淘寶慳錢貼士
        </h2>

        <div className="not-prose space-y-3">
          {[
            { icon: "💳", title: "用 AlipayHK 付款", desc: "免手續費，Simply Cash 1.5% 淨賺" },
            { icon: "🎁", title: "留意淘寶優惠券", desc: "淘寶優惠 + 信用卡回贈可以疊加" },
            { icon: "📅", title: "趁大促購物", desc: "雙 11、618 配合信用卡回贈更抵" },
            { icon: "📦", title: "集運比較", desc: "官方集運用 AlipayHK，第三方集運比較價錢" },
            { icon: "🔒", title: "安全付款", desc: "用 AlipayHK 唔使喺淘寶輸入卡號" },
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
          {taobaoFaqData.map((faq, index) => (
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
      <div className="not-prose bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 text-white mb-10">
        <h3 className="text-xl font-bold mb-2">💳 想知邊張信用卡最適合你嘅淘寶消費？</h3>
        <p className="mb-4 opacity-90">用我哋嘅計算機，輸入你嘅消費類別，即刻搵到最高回贈嘅信用卡！</p>
        <Link href="/">
          <Button className="bg-white text-orange-600 hover:bg-gray-100">
            <Calculator className="h-4 w-4 mr-2" />
            立即計算回贈
          </Button>
        </Link>
      </div>

      {/* Related Links */}
      <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">🔗 相關文章</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <Link href="/discover/online-shopping-guide" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
            <ShoppingBag className="h-5 w-5 text-emerald-600" />
            <span>網購信用卡攻略</span>
            <ChevronRight className="h-4 w-4 ml-auto text-gray-400" />
          </Link>
          <Link href="/discover/overseas-fee" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
            <Globe className="h-5 w-5 text-emerald-600" />
            <span>海外簽賬手續費攻略</span>
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

