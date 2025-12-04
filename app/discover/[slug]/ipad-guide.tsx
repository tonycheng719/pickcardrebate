// iPad 出機攻略
// 用於 /discover/ipad-guide 頁面

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  ChevronRight, ChevronDown, CreditCard, Tablet, Store,
  Calculator, Trophy, DollarSign, CheckCircle, AlertTriangle,
  Star, Info, Zap, Percent, Gift, Scissors, ShoppingBag, Pencil
} from "lucide-react";
import { CardPreviewSection } from "@/app/discover/components/card-preview-section";

// FAQ 數據
export const ipadFaqData = [
  {
    question: "買 iPad 用邊張信用卡最抵？",
    answer: "買 iPad 最抵策略：(1) 用高迎新信用卡食迎新；(2) Apple Store 網購用 Red Card 4% / MMPOWER 5%；(3) 實體店用 EarnMORE 2%。"
  },
  {
    question: "Apple Store 買 iPad 當網購定實體店？",
    answer: "Apple Store 官網購買當「網上簽賬」，可用 Red Card 4% / MMPOWER 5%。實體店購買當「本地簽賬」，建議用 EarnMORE 2%。"
  },
  {
    question: "買 iPad 可以食迎新嗎？",
    answer: "可以！iPad 價格 $2,599-$13,499，適合食迎新。建議買 iPad Pro / iPad Air 等較高價款，更容易達成迎新要求。"
  },
  {
    question: "百老匯 / 豐澤買 iPad 有優惠嗎？",
    answer: "百老匯、豐澤經常有信用卡優惠，例如 HSBC 有現金回贈、免息分期。建議比較官網同連鎖店價格及優惠。"
  },
  {
    question: "iPad 分期付款抵唔抵？",
    answer: "視乎分期條款。Apple 官網有 24 期免息分期（用指定卡）。銀行分期可能有手續費。建議計算總成本再決定。"
  },
  {
    question: "iPad Pro M4 值唔值得買？",
    answer: "iPad Pro M4 係最強大 iPad，適合專業用戶（設計、影片剪輯）。普通用戶可考慮 iPad Air M2 或 iPad 第 10 代，性價比更高。"
  },
  {
    question: "學生買 iPad 有優惠嗎？",
    answer: "有！Apple 教育優惠適用於大學生及教職員，可享學生價（通常平 $200-$800）+ 免費 AirPods（返學季）。"
  },
  {
    question: "iPad 配件（Apple Pencil / 鍵盤）點買最抵？",
    answer: "Apple Pencil / Magic Keyboard 建議一齊喺官網買，當網購享 4-5% 回贈。或者用 Apple Gift Card 付款賺雙重回贈。"
  }
];

// iPad 價格
const ipadPrices = [
  { model: "iPad 第 10 代", storage: "64GB", price: 2599, note: "入門首選" },
  { model: "iPad 第 10 代", storage: "256GB", price: 3499, note: "" },
  { model: "iPad mini 7", storage: "128GB", price: 3999, note: "細屏幕" },
  { model: "iPad mini 7", storage: "256GB", price: 4999, note: "" },
  { model: "iPad Air M2", storage: "128GB", price: 4599, note: "性價比之選" },
  { model: "iPad Air M2", storage: "256GB", price: 5499, note: "" },
  { model: "iPad Air M2 13\"", storage: "128GB", price: 5999, note: "大屏幕" },
  { model: "iPad Pro M4 11\"", storage: "256GB", price: 7999, note: "專業級" },
  { model: "iPad Pro M4 11\"", storage: "512GB", price: 9499, note: "" },
  { model: "iPad Pro M4 13\"", storage: "256GB", price: 10499, note: "最頂級" },
  { model: "iPad Pro M4 13\"", storage: "512GB", price: 11999, note: "" },
  { model: "iPad Pro M4 13\"", storage: "1TB", price: 13499, note: "" },
];

// 配件價格
const accessoryPrices = [
  { name: "Apple Pencil Pro", price: 999, compatible: "iPad Pro M4 / Air M2" },
  { name: "Apple Pencil USB-C", price: 649, compatible: "所有 USB-C iPad" },
  { name: "Magic Keyboard 11\"", price: 2349, compatible: "iPad Pro 11\" / Air" },
  { name: "Magic Keyboard 13\"", price: 2699, compatible: "iPad Pro 13\" / Air 13\"" },
  { name: "Smart Folio", price: 649, compatible: "iPad Pro / Air" },
];

// 購買渠道比較
const purchaseChannels = [
  {
    channel: "Apple Store 官網",
    icon: "🍎",
    paymentType: "網上簽賬",
    pros: ["官方保證", "免息分期", "教育優惠", "可用 Gift Card"],
    cons: ["價格最貴（除教育優惠）"],
    bestCards: ["hsbc-red", "hangseng-mmpower"],
  },
  {
    channel: "Apple Store 實體店",
    icon: "🏪",
    paymentType: "本地簽賬",
    pros: ["即買即取", "專人服務", "教育優惠"],
    cons: ["唔當網購"],
    bestCards: ["earnmore", "sc-simply-cash"],
  },
  {
    channel: "百老匯 / 豐澤",
    icon: "🛒",
    paymentType: "本地簽賬",
    pros: ["經常有優惠", "可用積分", "可能有贈品"],
    cons: ["唔當網購", "無教育優惠"],
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

// 用途推薦
const usageRecommendation = [
  {
    usage: "學生做功課 / 睇 Notes",
    icon: "📚",
    recommended: "iPad 第 10 代",
    price: "$2,599 起",
    reason: "性價比高，夠用",
  },
  {
    usage: "睇片 / 打機 / 社交媒體",
    icon: "🎮",
    recommended: "iPad Air M2",
    price: "$4,599 起",
    reason: "效能好，屏幕大",
  },
  {
    usage: "畫畫 / 做設計",
    icon: "🎨",
    recommended: "iPad Pro M4",
    price: "$7,999 起",
    reason: "Apple Pencil Pro + 頂級屏幕",
  },
  {
    usage: "影片剪輯 / 專業工作",
    icon: "🎬",
    recommended: "iPad Pro M4 13\"",
    price: "$10,499 起",
    reason: "M4 晶片 + 大屏幕",
  },
  {
    usage: "出街帶住睇",
    icon: "🚶",
    recommended: "iPad mini 7",
    price: "$3,999 起",
    reason: "輕便易攜",
  },
];

// 省錢攻略
const savingTips = [
  {
    tip: "用教育優惠",
    icon: "🎓",
    description: "大學生可享學生價，平 $200-$800",
    savings: "最多慳 $800",
  },
  {
    tip: "食信用卡迎新",
    icon: "🎁",
    description: "申請新卡食迎新，回贈可達 10%+",
    savings: "最多慳 $1,500",
  },
  {
    tip: "官網網購回贈",
    icon: "💳",
    description: "Apple 官網用 Red Card 4% / MMPOWER 5%",
    savings: "4-5% 回贈",
  },
  {
    tip: "Apple Gift Card",
    icon: "🎫",
    description: "7-11 買 Gift Card 再買 iPad，雙重回贈",
    savings: "額外 1-2%",
  },
  {
    tip: "等返學季優惠",
    icon: "📅",
    description: "每年 7-9 月買 iPad 送 AirPods",
    savings: "免費 AirPods",
  },
];

export function IpadGuide() {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      {/* 引言 */}
      <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-6">
        買 iPad 用邊張信用卡最抵？邊款 iPad 最適合你？
        本文教你 <strong>{currentYear} iPad 出機攻略</strong>，
        食迎新買 iPad 慳 <strong>$2,000</strong>！連 M4 iPad Pro 價錢！
      </p>

      {/* 目錄 */}
      <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-10">
        <h2 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          📑 本文目錄
        </h2>
        <ul className="space-y-2 text-sm">
          <li><a href="#overview" className="text-blue-600 dark:text-blue-400 hover:underline">1. iPad 信用卡回贈點計？</a></li>
          <li><a href="#prices" className="text-blue-600 dark:text-blue-400 hover:underline">2. iPad 全系列價格</a></li>
          <li><a href="#usage" className="text-blue-600 dark:text-blue-400 hover:underline">3. 邊款 iPad 適合你？</a></li>
          <li><a href="#channels" className="text-blue-600 dark:text-blue-400 hover:underline">4. 購買渠道比較</a></li>
          <li><a href="#card-comparison" className="text-blue-600 dark:text-blue-400 hover:underline">5. 信用卡回贈比較</a></li>
          <li><a href="#accessories" className="text-blue-600 dark:text-blue-400 hover:underline">6. 配件價格及攻略</a></li>
          <li><a href="#tips" className="text-blue-600 dark:text-blue-400 hover:underline">7. 慳錢攻略</a></li>
          <li><a href="#faq" className="text-blue-600 dark:text-blue-400 hover:underline">8. 常見問題 FAQ</a></li>
        </ul>
      </div>

      {/* Section 1: 總覽 */}
      <section id="overview" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Tablet className="h-6 w-6 text-gray-800 dark:text-gray-200" />
          1. iPad 信用卡回贈點計？
        </h2>
        
        <p>
          買 iPad 同 iPhone 一樣，唔同渠道有唔同回贈。最緊要識揀信用卡！
        </p>

        <div className="not-prose bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-900/50 dark:to-slate-900/50 rounded-2xl p-5 border border-gray-200 dark:border-gray-700 my-6">
          <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-3">📱 iPad 回贈策略</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-100 dark:border-gray-700">
              <p className="text-sm text-blue-600 font-bold mb-1">🌐 Apple 官網</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">當「網上簽賬」</p>
              <p className="text-xs text-gray-500"><Link href="/cards/hangseng-mmpower" className="underline">MMPOWER</Link> 5% / <Link href="/cards/hsbc-red" className="underline">Red Card</Link> 4%</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-100 dark:border-gray-700">
              <p className="text-sm text-green-600 font-bold mb-1">🏪 實體店 / 電器舖</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">當「本地簽賬」</p>
              <p className="text-xs text-gray-500"><Link href="/cards/earnmore" className="underline">EarnMORE</Link> 2% / <Link href="/cards/sc-simply-cash" className="underline">Simply Cash</Link> 1.5%</p>
            </div>
          </div>
        </div>

        <div className="not-prose bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Star className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-amber-700 dark:text-amber-300 text-sm">
              <strong>最強策略：</strong>買 iPad Pro / Air，用新信用卡食迎新！
              迎新獎賞通常值 $500-$1,500，相當於額外 5-15% 回贈！
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: 價格 */}
      <section id="prices" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <DollarSign className="h-6 w-6 text-green-500" />
          2. iPad 全系列價格
        </h2>

        <p>
          {currentYear} 年 iPad 全系列價格一覽：
        </p>

        <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden my-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">型號</th>
                  <th className="px-4 py-3 text-center font-medium">容量</th>
                  <th className="px-4 py-3 text-center font-medium">價格</th>
                  <th className="px-4 py-3 text-left font-medium">備註</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {ipadPrices.map((item, index) => (
                  <tr key={index} className={item.note ? "bg-blue-50/50 dark:bg-blue-900/10" : ""}>
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
      </section>

      {/* Section 3: 用途推薦 */}
      <section id="usage" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Pencil className="h-6 w-6 text-purple-500" />
          3. 邊款 iPad 適合你？
        </h2>

        <div className="not-prose space-y-3 my-6">
          {usageRecommendation.map((item, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{item.icon}</span>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 dark:text-white">{item.usage}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{item.reason}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-blue-600 dark:text-blue-400">{item.recommended}</p>
                  <p className="text-sm text-green-600">{item.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: 購買渠道 */}
      <section id="channels" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Store className="h-6 w-6 text-indigo-500" />
          4. 購買渠道比較
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

      {/* Section 5: 信用卡比較 */}
      <section id="card-comparison" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Percent className="h-6 w-6 text-green-500" />
          5. 信用卡回贈比較
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
        title="📌 買 iPad 推薦信用卡"
        subtitle="點擊查看詳細回贈條款及申請連結"
        cards={[
          { id: "hangseng-mmpower", highlight: "網購 5%" },
          { id: "hsbc-red", highlight: "網購 4%" },
          { id: "earnmore", highlight: "2% 無上限" },
          { id: "sc-simply-cash", highlight: "1.5% 無上限" },
        ]}
      />

      {/* Section 6: 配件 */}
      <section id="accessories" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Pencil className="h-6 w-6 text-orange-500" />
          6. 配件價格及攻略
        </h2>

        <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden my-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">配件</th>
                  <th className="px-4 py-3 text-center font-medium">價格</th>
                  <th className="px-4 py-3 text-left font-medium">適用型號</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {accessoryPrices.map((item, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3 font-medium">{item.name}</td>
                    <td className="px-4 py-3 text-center font-bold text-green-600">HK${item.price.toLocaleString()}</td>
                    <td className="px-4 py-3 text-xs text-gray-500">{item.compatible}</td>
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
              <strong>配件攻略：</strong>iPad + 配件一齊喺官網買，全部當網購享 4-5% 回贈。
              或者用 Apple Gift Card 付款賺雙重回贈！
            </p>
          </div>
        </div>
      </section>

      {/* Section 7: 慳錢攻略 */}
      <section id="tips" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Zap className="h-6 w-6 text-yellow-500" />
          7. 慳錢攻略
        </h2>

        <div className="not-prose grid md:grid-cols-2 gap-3 my-6">
          {savingTips.map((tip, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">{tip.icon}</span>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-1">{tip.tip}</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{tip.description}</p>
                  <span className="inline-block mt-1 px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs rounded">
                    {tip.savings}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="not-prose bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-4 border border-purple-200 dark:border-purple-800">
          <h4 className="font-bold text-purple-800 dark:text-purple-200 mb-2">🎓 Apple 教育優惠</h4>
          <p className="text-purple-700 dark:text-purple-300 text-sm">
            大學生及教職員可享學生價！<br/>
            • iPad Air M2 學生價約平 $200-$300<br/>
            • iPad Pro M4 學生價約平 $400-$800<br/>
            • 返學季（7-9月）買 iPad 仲送 AirPods！
          </p>
        </div>
      </section>

      {/* Section 8: FAQ */}
      <section id="faq" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          ❓ 8. 常見問題 FAQ
        </h2>
        
        <div className="not-prose space-y-4">
          {ipadFaqData.map((faq, index) => (
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
        <h3 className="text-xl font-bold mb-2">📱 想知邊張信用卡買 iPad 最抵？</h3>
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
          <Link href="/discover/iphone-guide" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
            <Tablet className="h-5 w-5 text-emerald-600" />
            <span>iPhone 17 出機攻略</span>
            <ChevronRight className="h-4 w-4 ml-auto text-gray-400" />
          </Link>
          <Link href="/discover/large-purchase-guide" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
            <ShoppingBag className="h-5 w-5 text-emerald-600" />
            <span>大額簽賬攻略</span>
            <ChevronRight className="h-4 w-4 ml-auto text-gray-400" />
          </Link>
          <Link href="/discover/student-card-guide" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
            <CreditCard className="h-5 w-5 text-emerald-600" />
            <span>學生信用卡攻略</span>
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

