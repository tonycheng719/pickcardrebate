// iPhone 信用卡攻略
// 用於 /discover/iphone-guide 頁面

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  ChevronRight, ChevronDown, CreditCard, Smartphone, Store,
  Calculator, Trophy, DollarSign, CheckCircle, AlertTriangle,
  Star, Info, Zap, Percent, Gift, Scissors, ShoppingBag
} from "lucide-react";
import { CardPreviewSection } from "@/app/discover/components/card-preview-section";

// FAQ 數據
export const iphoneFaqData = [
  {
    question: "買 iPhone 用邊張信用卡最抵？",
    answer: "買 iPhone 最抵策略：(1) 用高迎新信用卡食迎新；(2) Apple Store 網購用 Red Card 4% / MMPOWER 5%；(3) 實體店用 EarnMORE 2%。"
  },
  {
    question: "Apple Store 當網購定實體店？",
    answer: "Apple Store 官網購買當「網上簽賬」，可用 Red Card 4% / MMPOWER 5%。實體店購買當「本地簽賬」，建議用 EarnMORE 2%。"
  },
  {
    question: "買 iPhone 可以食迎新嗎？",
    answer: "可以！iPhone 價格 $6,000-$15,000，剛好達到大部分信用卡迎新簽賬要求。建議申請新卡，用 iPhone 消費食迎新，可賺額外 $500-$1,000！"
  },
  {
    question: "百老匯 / 豐澤買 iPhone 有優惠嗎？",
    answer: "百老匯、豐澤經常有信用卡優惠，例如 HSBC 有現金回贈、免息分期。建議比較官網同連鎖店價格及優惠。"
  },
  {
    question: "iPhone 分期付款抵唔抵？",
    answer: "視乎分期條款。Apple 官網有 24 期免息分期（用指定卡）。銀行分期可能有手續費。建議計算總成本再決定。"
  },
  {
    question: "買 iPhone 拆單有咩好處？",
    answer: "拆單可以分開用唔同信用卡，例如：(1) 新卡食迎新；(2) 網購卡賺高回贈。配合 Apple Gift Card 更慳！"
  },
  {
    question: "Apple Gift Card 可以賺回贈嗎？",
    answer: "可以！喺 7-11 用信用卡買 Apple Gift Card，再用 Gift Card 買 iPhone。7-11 消費可賺回贈，但留意部分卡唔計便利店。"
  },
  {
    question: "iPhone 17 幾時出？價錢幾多？",
    answer: "iPhone 17 預計 2025 年 9 月發佈。參考 iPhone 16 價格，預計 iPhone 17 售價 HK$6,899 起，Pro 版 HK$8,599 起。"
  }
];

// iPhone 價格預測
const iphonePrices = [
  { model: "iPhone 17", storage: "128GB", price: 6899, note: "入門款" },
  { model: "iPhone 17", storage: "256GB", price: 7699, note: "" },
  { model: "iPhone 17 Plus", storage: "128GB", price: 7999, note: "大屏幕" },
  { model: "iPhone 17 Plus", storage: "256GB", price: 8799, note: "" },
  { model: "iPhone 17 Pro", storage: "256GB", price: 8999, note: "Pro 功能" },
  { model: "iPhone 17 Pro", storage: "512GB", price: 10499, note: "" },
  { model: "iPhone 17 Pro Max", storage: "256GB", price: 9999, note: "最頂級" },
  { model: "iPhone 17 Pro Max", storage: "512GB", price: 11499, note: "" },
];

// 購買渠道比較
const purchaseChannels = [
  {
    channel: "Apple Store 官網",
    icon: "🍎",
    paymentType: "網上簽賬",
    pros: ["官方保證", "免息分期", "可用 Gift Card"],
    cons: ["價格最貴"],
    bestCards: ["hsbc-red", "hangseng-mmpower"],
  },
  {
    channel: "Apple Store 實體店",
    icon: "🏪",
    paymentType: "本地簽賬",
    pros: ["即買即取", "專人服務"],
    cons: ["價格最貴", "唔當網購"],
    bestCards: ["earnmore", "sc-simply-cash"],
  },
  {
    channel: "百老匯 / 豐澤",
    icon: "🛒",
    paymentType: "本地簽賬",
    pros: ["經常有優惠", "可用積分"],
    cons: ["唔當網購"],
    bestCards: ["earnmore", "sc-simply-cash"],
  },
  {
    channel: "電訊商",
    icon: "📱",
    paymentType: "本地簽賬",
    pros: ["配合上台優惠", "分期付款"],
    cons: ["通常要簽約"],
    bestCards: ["earnmore", "sc-simply-cash"],
  },
];

// 信用卡回贈比較
const cardComparison = [
  {
    card: "恒生 MMPOWER",
    id: "hangseng-mmpower",
    rate: "5%",
    cap: "$200/月",
    channel: "Apple 官網",
    highlight: "網購最高",
    note: "Apple 官網當網購 5%",
  },
  {
    card: "HSBC Red Card",
    id: "hsbc-red",
    rate: "4%",
    cap: "$10,000/月",
    channel: "Apple 官網",
    highlight: "高上限",
    note: "Apple 官網 4%，上限高",
  },
  {
    card: "安信 EarnMORE",
    id: "earnmore",
    rate: "2%",
    cap: "無上限",
    channel: "所有渠道",
    highlight: "實體店首選",
    note: "所有消費 2% 無上限",
  },
  {
    card: "渣打 Simply Cash",
    id: "sc-simply-cash",
    rate: "1.5%",
    cap: "無上限",
    channel: "所有渠道",
    highlight: "永久免年費",
    note: "所有消費 1.5%",
  },
];

// 迎新策略
const welcomeOfferStrategy = [
  {
    step: "1",
    title: "選擇高迎新信用卡",
    description: "選擇迎新簽賬要求與 iPhone 價格相近嘅卡（通常 $5,000-$10,000）",
  },
  {
    step: "2",
    title: "申請並等批卡",
    description: "建議喺 iPhone 發售前 2-3 星期申請，確保批卡後有時間消費",
  },
  {
    step: "3",
    title: "用新卡買 iPhone",
    description: "批卡後用新卡購買 iPhone，達成迎新簽賬要求",
  },
  {
    step: "4",
    title: "賺取迎新獎賞",
    description: "迎新獎賞通常 $500-$1,500，相當於額外 5-10% 回贈！",
  },
];

// 拆單攻略
const splitPaymentStrategy = [
  {
    method: "Apple Gift Card + 信用卡",
    description: "用信用卡買 Apple Gift Card（7-11 / 官網），再用 Gift Card 買 iPhone，雙重回贈",
    example: "iPhone $8,000 = $5,000 Gift Card（2%）+ $3,000 信用卡（4%）",
  },
  {
    method: "新卡迎新 + 舊卡回贈",
    description: "部分金額用新卡食迎新，其餘用高回贈舊卡",
    example: "iPhone $8,000 = $5,000 新卡迎新（10%）+ $3,000 舊卡 Red Card（4%）",
  },
];

export function IphoneGuide() {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      {/* 引言 */}
      <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-6">
        買 iPhone 17 用邊張信用卡最抵？食迎新可以慳幾多？
        本文教你 <strong>{currentYear} iPhone 信用卡攻略</strong>，
        食迎新買 iPhone 慳 <strong>$2,000</strong>！
      </p>

      {/* 目錄 */}
      <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-10">
        <h2 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          📑 本文目錄
        </h2>
        <ul className="space-y-2 text-sm">
          <li><a href="#overview" className="text-blue-600 dark:text-blue-400 hover:underline">1. iPhone 信用卡回贈點計？</a></li>
          <li><a href="#prices" className="text-blue-600 dark:text-blue-400 hover:underline">2. iPhone 17 價格預測</a></li>
          <li><a href="#channels" className="text-blue-600 dark:text-blue-400 hover:underline">3. 購買渠道比較</a></li>
          <li><a href="#card-comparison" className="text-blue-600 dark:text-blue-400 hover:underline">4. 信用卡回贈比較</a></li>
          <li><a href="#welcome-offer" className="text-blue-600 dark:text-blue-400 hover:underline">5. 食迎新攻略</a></li>
          <li><a href="#split-payment" className="text-blue-600 dark:text-blue-400 hover:underline">6. 拆單大法</a></li>
          <li><a href="#rebate-calc" className="text-blue-600 dark:text-blue-400 hover:underline">7. 回贈計算例子</a></li>
          <li><a href="#faq" className="text-blue-600 dark:text-blue-400 hover:underline">8. 常見問題 FAQ</a></li>
        </ul>
      </div>

      {/* Section 1: 總覽 */}
      <section id="overview" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Smartphone className="h-6 w-6 text-gray-800 dark:text-gray-200" />
          1. iPhone 信用卡回贈點計？
        </h2>
        
        <p>
          買 iPhone 最緊要識揀信用卡！唔同渠道有唔同回贈：
        </p>

        <div className="not-prose bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-900/50 dark:to-slate-900/50 rounded-2xl p-5 border border-gray-200 dark:border-gray-700 my-6">
          <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-3">📱 iPhone 回贈策略</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-100 dark:border-gray-700">
              <p className="text-sm text-blue-600 font-bold mb-1">🌐 Apple 官網</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">當「網上簽賬」</p>
              <p className="text-xs text-gray-500">MMPOWER 5% / Red Card 4%</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-100 dark:border-gray-700">
              <p className="text-sm text-green-600 font-bold mb-1">🏪 實體店 / 電器舖</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">當「本地簽賬」</p>
              <p className="text-xs text-gray-500">EarnMORE 2% / Simply Cash 1.5%</p>
            </div>
          </div>
        </div>

        <div className="not-prose bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Star className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-amber-700 dark:text-amber-300 text-sm">
              <strong>最強策略：</strong>申請新信用卡，用 iPhone 消費食迎新！
              迎新獎賞通常值 $500-$1,500，相當於額外 5-15% 回贈！
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: 價格預測 */}
      <section id="prices" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <DollarSign className="h-6 w-6 text-green-500" />
          2. iPhone 17 價格預測
        </h2>

        <p>
          根據 iPhone 16 定價，預測 iPhone 17 系列價格：
        </p>

        <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden my-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">型號</th>
                  <th className="px-4 py-3 text-center font-medium">容量</th>
                  <th className="px-4 py-3 text-center font-medium">預計價格</th>
                  <th className="px-4 py-3 text-left font-medium">備註</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {iphonePrices.map((item, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3 font-medium">{item.model}</td>
                    <td className="px-4 py-3 text-center">{item.storage}</td>
                    <td className="px-4 py-3 text-center font-bold text-green-600">HK${item.price.toLocaleString()}</td>
                    <td className="px-4 py-3 text-xs text-gray-500">{item.note}</td>
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
              <strong>提示：</strong>iPhone 17 預計 2025 年 9 月發佈。
              建議提早申請信用卡，準備食迎新！
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: 購買渠道 */}
      <section id="channels" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Store className="h-6 w-6 text-purple-500" />
          3. 購買渠道比較
        </h2>

        <div className="not-prose space-y-4 my-6">
          {purchaseChannels.map((channel, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{channel.icon}</span>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">{channel.channel}</h4>
                  <span className="text-xs bg-blue-100 dark:bg-blue-900/30 px-2 py-0.5 rounded text-blue-600 dark:text-blue-400">
                    {channel.paymentType}
                  </span>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-2 mb-2">
                <div>
                  <p className="text-xs text-green-600 font-bold mb-1">✅ 優點</p>
                  <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-0.5">
                    {channel.pros.map((pro, i) => (
                      <li key={i}>• {pro}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs text-red-600 font-bold mb-1">❌ 缺點</p>
                  <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-0.5">
                    {channel.cons.map((con, i) => (
                      <li key={i}>• {con}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <p className="text-xs text-gray-500">
                <strong>推薦信用卡：</strong>
                {channel.bestCards.map((cardId, i) => (
                  <span key={i}>
                    {i > 0 && "、"}
                    <Link href={`/cards/${cardId}`} className="text-blue-600 hover:underline">
                      {cardComparison.find(c => c.id === cardId)?.card || cardId}
                    </Link>
                  </span>
                ))}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: 信用卡比較 */}
      <section id="card-comparison" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Percent className="h-6 w-6 text-green-500" />
          4. 信用卡回贈比較
        </h2>

        <div className="not-prose space-y-4 my-6">
          {cardComparison.map((card, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4">
              <div className="flex items-start justify-between">
                <div>
                  <Link href={`/cards/${card.id}`} className="font-bold text-blue-600 hover:underline dark:text-blue-400">{card.card}</Link>
                  <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                    {card.highlight}
                  </span>
                </div>
                <span className="font-bold text-green-600 dark:text-green-400">{card.rate}</span>
              </div>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                <span>適用渠道：{card.channel}</span>
                <span>上限：{card.cap}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">{card.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Card Preview Section */}
      <CardPreviewSection 
        title="📌 買 iPhone 推薦信用卡"
        subtitle="點擊查看詳細回贈條款及申請連結"
        cards={[
          { id: "hangseng-mmpower", highlight: "網購 5%" },
          { id: "hsbc-red", highlight: "網購 4%" },
          { id: "earnmore", highlight: "2% 無上限" },
          { id: "sc-simply-cash", highlight: "1.5% 無上限" },
        ]}
      />

      {/* Section 5: 食迎新攻略 */}
      <section id="welcome-offer" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Gift className="h-6 w-6 text-pink-500" />
          5. 食迎新攻略
        </h2>

        <p>
          買 iPhone 最強策略係<strong>食信用卡迎新</strong>！iPhone 價格剛好達到大部分迎新要求：
        </p>

        <div className="not-prose bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 rounded-2xl p-5 border border-pink-200 dark:border-pink-800 my-6">
          <h4 className="font-bold text-pink-800 dark:text-pink-200 mb-3">🎁 食迎新 4 步曲</h4>
          <div className="space-y-3">
            {welcomeOfferStrategy.map((step, index) => (
              <div key={index} className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 flex items-start gap-3">
                <span className="font-bold text-pink-600 text-lg">{step.step}</span>
                <div>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{step.title}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="not-prose bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
          <h4 className="font-bold text-green-800 dark:text-green-200 mb-2">💰 迎新獎賞例子</h4>
          <p className="text-green-700 dark:text-green-300 text-sm">
            • iPhone 17 Pro $8,999 + 高迎新卡 $1,000 迎新 = <strong>相當於 11% 回贈！</strong><br/>
            • 比較：普通回贈卡 2% = $180，相差 <strong>$820</strong>！
          </p>
        </div>
      </section>

      {/* Section 6: 拆單大法 */}
      <section id="split-payment" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Scissors className="h-6 w-6 text-orange-500" />
          6. 拆單大法
        </h2>

        <p>
          想賺更多回贈？可以用<strong>拆單大法</strong>：
        </p>

        <div className="not-prose space-y-4 my-6">
          {splitPaymentStrategy.map((strategy, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4">
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">{strategy.method}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{strategy.description}</p>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-2">
                <p className="text-xs text-gray-500">
                  <strong>例子：</strong>{strategy.example}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="not-prose bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-amber-700 dark:text-amber-300 text-sm">
              <strong>注意：</strong>拆單前確認商戶接受多張卡付款，
              同埋留意每張卡嘅簽賬上限。
            </p>
          </div>
        </div>
      </section>

      {/* Section 7: 回贈計算 */}
      <section id="rebate-calc" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Calculator className="h-6 w-6 text-teal-500" />
          7. 回贈計算例子
        </h2>

        <div className="not-prose bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 my-6">
          <h4 className="font-bold text-gray-900 dark:text-white mb-3">📊 iPhone 17 Pro $8,999 回贈對比</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-3 py-2 text-left">策略</th>
                  <th className="px-3 py-2 text-center">回贈</th>
                  <th className="px-3 py-2 text-center">金額</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                <tr>
                  <td className="px-3 py-2">🥇 新卡迎新</td>
                  <td className="px-3 py-2 text-center">~10%</td>
                  <td className="px-3 py-2 text-center font-bold text-green-600">$900+</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">🥈 Apple 官網 + MMPOWER 5%</td>
                  <td className="px-3 py-2 text-center">5%</td>
                  <td className="px-3 py-2 text-center font-bold text-green-600">$200*</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">🥉 Apple 官網 + Red Card 4%</td>
                  <td className="px-3 py-2 text-center">4%</td>
                  <td className="px-3 py-2 text-center font-bold text-green-600">$360</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">實體店 + EarnMORE 2%</td>
                  <td className="px-3 py-2 text-center">2%</td>
                  <td className="px-3 py-2 text-center font-bold text-green-600">$180</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">普通卡 0.4%</td>
                  <td className="px-3 py-2 text-center">0.4%</td>
                  <td className="px-3 py-2 text-center text-gray-500">$36</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            *MMPOWER 網購上限 $200/月，超出部分回贈較低
          </p>
        </div>
      </section>

      {/* Section 8: FAQ */}
      <section id="faq" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          ❓ 8. 常見問題 FAQ
        </h2>
        
        <div className="not-prose space-y-4">
          {iphoneFaqData.map((faq, index) => (
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
      <div className="not-prose bg-gradient-to-r from-gray-800 to-black rounded-2xl p-6 text-white mb-10">
        <h3 className="text-xl font-bold mb-2">📱 想知邊張信用卡買 iPhone 最抵？</h3>
        <p className="mb-4 opacity-90">用我哋嘅計算機，即刻搵到最適合你嘅信用卡！</p>
        <Link href="/">
          <Button className="bg-white text-gray-800 hover:bg-gray-100">
            <Calculator className="h-4 w-4 mr-2" />
            立即計算回贈
          </Button>
        </Link>
      </div>

      {/* Related Links */}
      <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">🔗 相關文章</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <Link href="/discover/large-purchase-guide" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
            <ShoppingBag className="h-5 w-5 text-emerald-600" />
            <span>大額簽賬攻略</span>
            <ChevronRight className="h-4 w-4 ml-auto text-gray-400" />
          </Link>
          <Link href="/discover/online-shopping-guide" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
            <CreditCard className="h-5 w-5 text-emerald-600" />
            <span>網購信用卡攻略</span>
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

