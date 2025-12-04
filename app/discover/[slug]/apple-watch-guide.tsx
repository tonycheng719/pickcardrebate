// Apple Watch 出機攻略
// 用於 /discover/apple-watch-guide 頁面

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  ChevronRight, ChevronDown, CreditCard, Watch, Store,
  Calculator, Trophy, DollarSign, CheckCircle, AlertTriangle,
  Star, Info, Zap, Percent, Gift, Heart, Activity
} from "lucide-react";
import { CardPreviewSection } from "@/app/discover/components/card-preview-section";

// FAQ 數據
export const appleWatchFaqData = [
  {
    question: "買 Apple Watch 用邊張信用卡最抵？",
    answer: "買 Apple Watch 最抵策略：(1) Apple Store 網購用 Red Card 4% / MMPOWER 5%；(2) 實體店用 EarnMORE 2%；(3) 配合其他 Apple 產品一齊買食迎新。"
  },
  {
    question: "Apple Store 買 Apple Watch 當網購定實體店？",
    answer: "Apple Store 官網購買當「網上簽賬」，可用 Red Card 4% / MMPOWER 5%。實體店購買當「本地簽賬」，建議用 EarnMORE 2%。"
  },
  {
    question: "Apple Watch 可以食迎新嗎？",
    answer: "可以，但 Apple Watch 價格較低（$2,199-$6,299），未必達到迎新要求。建議配合 iPhone / iPad / MacBook 一齊買，更易食迎新！"
  },
  {
    question: "Apple Watch Series 10 定 Ultra 2？",
    answer: "Series 10 適合日常使用（輕薄、夠用）。Ultra 2 適合運動愛好者、潛水、行山（更耐用、電量更長）。SE 則係入門之選。"
  },
  {
    question: "Apple Watch 需要配合 iPhone 使用嗎？",
    answer: "需要！Apple Watch 必須配合 iPhone 使用（iPhone 8 或以上，iOS 17+）。Android 用戶無法使用 Apple Watch。"
  },
  {
    question: "Apple Watch GPS 定 GPS + Cellular？",
    answer: "GPS 版本需要靠近 iPhone 或 Wi-Fi 才能上網。GPS + Cellular 版本可獨立使用流動數據（需另外申請 eSIM），適合跑步、游水時唔想帶手機。"
  },
  {
    question: "CSL / 3HK / CMHK 買 Apple Watch 有優惠嗎？",
    answer: "電訊商有時會有「買一送一」或「半價」優惠（需配合指定計劃）。但要簽約，建議比較後再決定。"
  },
  {
    question: "Apple Watch 錢包可以用嚟付款嗎？",
    answer: "可以！Apple Watch 支援 Apple Pay，可以綁定信用卡用手錶碌卡付款。八達通也可以加入 Apple Watch。"
  }
];

// Apple Watch 價格
const appleWatchPrices = [
  { model: "Apple Watch SE (2nd Gen)", size: "40mm", variant: "GPS", price: 2199, note: "入門首選" },
  { model: "Apple Watch SE (2nd Gen)", size: "44mm", variant: "GPS", price: 2399, note: "" },
  { model: "Apple Watch SE (2nd Gen)", size: "44mm", variant: "GPS + Cellular", price: 2899, note: "" },
  { model: "Apple Watch Series 10", size: "42mm", variant: "GPS", price: 3199, note: "主流之選" },
  { model: "Apple Watch Series 10", size: "46mm", variant: "GPS", price: 3499, note: "" },
  { model: "Apple Watch Series 10", size: "42mm", variant: "GPS + Cellular", price: 3999, note: "" },
  { model: "Apple Watch Series 10", size: "46mm", variant: "GPS + Cellular", price: 4299, note: "" },
  { model: "Apple Watch Ultra 2", size: "49mm", variant: "GPS + Cellular", price: 6299, note: "極限運動" },
];

// 錶帶價格
const bandPrices = [
  { name: "運動錶帶", price: 379, note: "基本款" },
  { name: "運動環狀錶帶", price: 379, note: "輕便" },
  { name: "精織物錶帶", price: 799, note: "舒適" },
  { name: "米蘭式錶帶", price: 799, note: "商務" },
  { name: "皮革鏈帶", price: 1599, note: "高級" },
  { name: "不鏽鋼鏈帶", price: 2799, note: "最高級" },
];

// 購買渠道比較
const purchaseChannels = [
  {
    channel: "Apple Store 官網",
    icon: "🍎",
    paymentType: "網上簽賬",
    pros: ["官方保證", "可訂製錶帶", "可用 Gift Card"],
    cons: ["價格最貴"],
    bestCards: ["hsbc-red", "hangseng-mmpower"],
  },
  {
    channel: "Apple Store 實體店",
    icon: "🏪",
    paymentType: "本地簽賬",
    pros: ["即買即取", "可試戴", "專人服務"],
    cons: ["唔當網購"],
    bestCards: ["earnmore", "sc-simply-cash"],
  },
  {
    channel: "百老匯 / 豐澤",
    icon: "🛒",
    paymentType: "本地簽賬",
    pros: ["經常有優惠", "可用積分"],
    cons: ["唔當網購", "選擇較少"],
    bestCards: ["earnmore", "sc-simply-cash"],
  },
  {
    channel: "電訊商 (CSL/3HK)",
    icon: "📱",
    paymentType: "本地簽賬",
    pros: ["有時有「買一送一」", "送 eSIM 數據"],
    cons: ["通常要簽約", "唔當網購"],
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
    usage: "日常使用 / 睇時間 / 通知",
    icon: "⌚",
    recommended: "Apple Watch SE",
    price: "$2,199 起",
    reason: "性價比高，功能夠用",
  },
  {
    usage: "健康監測 / 運動追蹤",
    icon: "❤️",
    recommended: "Apple Watch Series 10",
    price: "$3,199 起",
    reason: "血氧、心電圖、睡眠追蹤",
  },
  {
    usage: "跑步 / 游水（唔想帶手機）",
    icon: "🏃",
    recommended: "Series 10 GPS + Cellular",
    price: "$3,999 起",
    reason: "獨立使用流動數據",
  },
  {
    usage: "極限運動 / 潛水 / 行山",
    icon: "🏔️",
    recommended: "Apple Watch Ultra 2",
    price: "$6,299",
    reason: "最耐用、電量最長",
  },
];

// 省錢攻略
const savingTips = [
  {
    tip: "配合其他 Apple 產品食迎新",
    icon: "🎁",
    description: "Apple Watch + iPhone / iPad 一齊買，更易達成迎新要求",
    savings: "額外 $500-$1,000",
  },
  {
    tip: "官網網購回贈",
    icon: "💳",
    description: "Apple 官網用 Red Card 4% / MMPOWER 5%",
    savings: "Series 10 $3,499 → $140-175 回贈",
  },
  {
    tip: "電訊商優惠",
    icon: "📱",
    description: "留意 CSL/3HK「買一送一」優惠",
    savings: "最多慳 50%",
  },
  {
    tip: "買 GPS 版本",
    icon: "📍",
    description: "如果經常帶住 iPhone，GPS 版已夠用",
    savings: "慳 $500-800",
  },
  {
    tip: "用基本錶帶",
    icon: "⌚",
    description: "官方高級錶帶好貴，可考慮第三方",
    savings: "慳 $400-2,000",
  },
];

export function AppleWatchGuide() {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      {/* 引言 */}
      <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-6">
        買 Apple Watch 用邊張信用卡最抵？Series 10 定 Ultra 2？
        本文教你 <strong>{currentYear} Apple Watch 出機攻略</strong>，
        食迎新買 Apple Watch 慳 <strong>$2,000</strong>！
      </p>

      {/* 目錄 */}
      <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-10">
        <h2 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          📑 本文目錄
        </h2>
        <ul className="space-y-2 text-sm">
          <li><a href="#overview" className="text-blue-600 dark:text-blue-400 hover:underline">1. Apple Watch 信用卡回贈點計？</a></li>
          <li><a href="#prices" className="text-blue-600 dark:text-blue-400 hover:underline">2. Apple Watch 全系列價格</a></li>
          <li><a href="#usage" className="text-blue-600 dark:text-blue-400 hover:underline">3. 邊款 Apple Watch 適合你？</a></li>
          <li><a href="#channels" className="text-blue-600 dark:text-blue-400 hover:underline">4. 購買渠道比較</a></li>
          <li><a href="#card-comparison" className="text-blue-600 dark:text-blue-400 hover:underline">5. 信用卡回贈比較</a></li>
          <li><a href="#bands" className="text-blue-600 dark:text-blue-400 hover:underline">6. 錶帶價格及攻略</a></li>
          <li><a href="#tips" className="text-blue-600 dark:text-blue-400 hover:underline">7. 慳錢攻略</a></li>
          <li><a href="#faq" className="text-blue-600 dark:text-blue-400 hover:underline">8. 常見問題 FAQ</a></li>
        </ul>
      </div>

      {/* Section 1: 總覽 */}
      <section id="overview" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Watch className="h-6 w-6 text-gray-800 dark:text-gray-200" />
          1. Apple Watch 信用卡回贈點計？
        </h2>
        
        <p>
          Apple Watch 價格由 $2,199 至 $6,299，識揀信用卡可以慳返幾百蚊！
        </p>

        <div className="not-prose bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-900/50 dark:to-slate-900/50 rounded-2xl p-5 border border-gray-200 dark:border-gray-700 my-6">
          <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-3">⌚ Apple Watch 回贈策略</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-100 dark:border-gray-700">
              <p className="text-sm text-blue-600 font-bold mb-1">🌐 Apple 官網</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">當「網上簽賬」</p>
              <p className="text-xs text-gray-500"><Link href="/cards/hangseng-mmpower" className="underline">MMPOWER</Link> 5% / <Link href="/cards/hsbc-red" className="underline">Red Card</Link> 4%</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-100 dark:border-gray-700">
              <p className="text-sm text-green-600 font-bold mb-1">🏪 實體店 / 電訊商</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">當「本地簽賬」</p>
              <p className="text-xs text-gray-500"><Link href="/cards/earnmore" className="underline">EarnMORE</Link> 2% / <Link href="/cards/sc-simply-cash" className="underline">Simply Cash</Link> 1.5%</p>
            </div>
          </div>
        </div>

        <div className="not-prose bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Star className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-amber-700 dark:text-amber-300 text-sm">
              <strong>最強策略：</strong>Apple Watch 價格較低，建議配合 iPhone / iPad / MacBook 一齊買，
              用新卡食迎新，可賺更多回贈！
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: 價格 */}
      <section id="prices" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <DollarSign className="h-6 w-6 text-green-500" />
          2. Apple Watch 全系列價格
        </h2>

        <p>
          {currentYear} 年 Apple Watch 全系列價格一覽：
        </p>

        <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden my-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">型號</th>
                  <th className="px-4 py-3 text-center font-medium">尺寸</th>
                  <th className="px-4 py-3 text-center font-medium">版本</th>
                  <th className="px-4 py-3 text-center font-medium">價格</th>
                  <th className="px-4 py-3 text-left font-medium">備註</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {appleWatchPrices.map((item, index) => (
                  <tr key={index} className={item.note ? "bg-blue-50/50 dark:bg-blue-900/10" : ""}>
                    <td className="px-4 py-3 font-medium">{item.model}</td>
                    <td className="px-4 py-3 text-center">{item.size}</td>
                    <td className="px-4 py-3 text-center text-xs">{item.variant}</td>
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
              <strong>GPS vs GPS + Cellular：</strong><br/>
              • <strong>GPS</strong>：需要靠近 iPhone 或 Wi-Fi 才能上網<br/>
              • <strong>GPS + Cellular</strong>：可獨立使用流動數據（需申請 eSIM，月費約 $38-58）
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: 用途推薦 */}
      <section id="usage" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Activity className="h-6 w-6 text-purple-500" />
          3. 邊款 Apple Watch 適合你？
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

        <div className="not-prose bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-xl p-4 border border-red-200 dark:border-red-800">
          <h4 className="font-bold text-red-800 dark:text-red-200 mb-2 flex items-center gap-2">
            <Heart className="h-5 w-5" />
            健康功能比較
          </h4>
          <div className="grid md:grid-cols-3 gap-3 text-sm">
            <div>
              <p className="font-bold text-orange-700 dark:text-orange-300 mb-1">Apple Watch SE</p>
              <ul className="text-orange-600 dark:text-orange-400 text-xs space-y-0.5">
                <li>✅ 心率監測</li>
                <li>✅ 跌倒偵測</li>
                <li>✅ 緊急求助 SOS</li>
                <li>❌ 血氧、心電圖</li>
              </ul>
            </div>
            <div>
              <p className="font-bold text-red-700 dark:text-red-300 mb-1">Series 10</p>
              <ul className="text-red-600 dark:text-red-400 text-xs space-y-0.5">
                <li>✅ 心率監測</li>
                <li>✅ 血氧偵測</li>
                <li>✅ 心電圖 ECG</li>
                <li>✅ 睡眠呼吸監測</li>
              </ul>
            </div>
            <div>
              <p className="font-bold text-purple-700 dark:text-purple-300 mb-1">Ultra 2</p>
              <ul className="text-purple-600 dark:text-purple-400 text-xs space-y-0.5">
                <li>✅ 所有健康功能</li>
                <li>✅ 水深計</li>
                <li>✅ 雙頻 GPS</li>
                <li>✅ 36 小時電量</li>
              </ul>
            </div>
          </div>
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
        title="📌 買 Apple Watch 推薦信用卡"
        subtitle="點擊查看詳細回贈條款及申請連結"
        cards={[
          { id: "hangseng-mmpower", highlight: "網購 5%" },
          { id: "hsbc-red", highlight: "網購 4%" },
          { id: "earnmore", highlight: "2% 無上限" },
          { id: "sc-simply-cash", highlight: "1.5% 無上限" },
        ]}
      />

      {/* Section 6: 錶帶 */}
      <section id="bands" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Watch className="h-6 w-6 text-orange-500" />
          6. 錶帶價格及攻略
        </h2>

        <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden my-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">錶帶</th>
                  <th className="px-4 py-3 text-center font-medium">價格</th>
                  <th className="px-4 py-3 text-left font-medium">備註</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {bandPrices.map((item, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3 font-medium">{item.name}</td>
                    <td className="px-4 py-3 text-center font-bold text-green-600">HK${item.price.toLocaleString()}</td>
                    <td className="px-4 py-3 text-xs text-gray-500">{item.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="not-prose bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-amber-700 dark:text-amber-300 text-sm">
              <strong>錶帶攻略：</strong>官方高級錶帶好貴！可考慮第三方錶帶（淘寶、Amazon），
              質素唔錯但價錢平好多。運動錶帶建議用原廠。
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
      </section>

      {/* Section 8: FAQ */}
      <section id="faq" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          ❓ 8. 常見問題 FAQ
        </h2>
        
        <div className="not-prose space-y-4">
          {appleWatchFaqData.map((faq, index) => (
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
        <h3 className="text-xl font-bold mb-2">⌚ 想知邊張信用卡買 Apple Watch 最抵？</h3>
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
            <Watch className="h-5 w-5 text-emerald-600" />
            <span>iPhone 出機攻略</span>
            <ChevronRight className="h-4 w-4 ml-auto text-gray-400" />
          </Link>
          <Link href="/discover/ipad-guide" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
            <Watch className="h-5 w-5 text-emerald-600" />
            <span>iPad 出機攻略</span>
            <ChevronRight className="h-4 w-4 ml-auto text-gray-400" />
          </Link>
          <Link href="/discover/macbook-guide" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
            <Watch className="h-5 w-5 text-emerald-600" />
            <span>MacBook 出機攻略</span>
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

