// MacBook 出機攻略
// 用於 /discover/macbook-guide 頁面

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  ChevronRight, ChevronDown, CreditCard, Laptop, Store,
  Calculator, Trophy, DollarSign, CheckCircle, AlertTriangle,
  Star, Info, Zap, Percent, Gift, Scissors, ShoppingBag, Cpu
} from "lucide-react";
import { CardPreviewSection } from "@/app/discover/components/card-preview-section";

// FAQ 數據
export const macbookFaqData = [
  {
    question: "買 MacBook 用邊張信用卡最抵？",
    answer: "買 MacBook 最抵策略：(1) 用高迎新信用卡食迎新；(2) Apple Store 網購用 Red Card 4% / MMPOWER 5%；(3) 實體店用 EarnMORE 2%。"
  },
  {
    question: "Apple Store 買 MacBook 當網購定實體店？",
    answer: "Apple Store 官網購買當「網上簽賬」，可用 Red Card 4% / MMPOWER 5%。實體店購買當「本地簽賬」，建議用 EarnMORE 2%。"
  },
  {
    question: "買 MacBook 可以食迎新嗎？",
    answer: "絕對可以！MacBook 價格 $7,999-$27,999，非常適合食迎新。高價款更容易達成大額迎新要求，可賺額外 $1,000-$2,000！"
  },
  {
    question: "MacBook Air 定 MacBook Pro？",
    answer: "日常使用、文書工作選 MacBook Air（輕薄、夠用）。專業工作（影片剪輯、3D 設計、開發）選 MacBook Pro（強勁效能、更佳散熱）。"
  },
  {
    question: "M3 定 M4 晶片？",
    answer: "M4 晶片效能比 M3 提升約 25%，適合專業用戶。普通用戶 M3 已經夠用，價格更實惠。"
  },
  {
    question: "MacBook 分期付款抵唔抵？",
    answer: "視乎分期條款。Apple 官網有 24 期免息分期（用指定卡）。銀行分期可能有手續費。建議計算總成本再決定。"
  },
  {
    question: "學生買 MacBook 有優惠嗎？",
    answer: "有！Apple 教育優惠適用於大學生及教職員，可享學生價（通常平 $600-$1,200）+ 免費 AirPods（返學季）。"
  },
  {
    question: "邊度買 MacBook 最平？",
    answer: "價格排序：Apple 教育優惠 < Apple Trade In < 百老匯/豐澤優惠 < Apple 官網原價。建議比較後再決定。"
  }
];

// MacBook 價格
const macbookPrices = [
  { model: "MacBook Air 13\" M3", storage: "256GB", ram: "8GB", price: 8499, note: "入門首選" },
  { model: "MacBook Air 13\" M3", storage: "512GB", ram: "16GB", price: 10999, note: "" },
  { model: "MacBook Air 15\" M3", storage: "256GB", ram: "8GB", price: 10499, note: "大屏幕" },
  { model: "MacBook Air 15\" M3", storage: "512GB", ram: "16GB", price: 12999, note: "" },
  { model: "MacBook Pro 14\" M4", storage: "512GB", ram: "16GB", price: 12999, note: "專業入門" },
  { model: "MacBook Pro 14\" M4", storage: "1TB", ram: "24GB", price: 16499, note: "" },
  { model: "MacBook Pro 14\" M4 Pro", storage: "512GB", ram: "24GB", price: 16499, note: "專業級" },
  { model: "MacBook Pro 16\" M4 Pro", storage: "512GB", ram: "24GB", price: 20499, note: "大屏幕專業" },
  { model: "MacBook Pro 14\" M4 Max", storage: "1TB", ram: "36GB", price: 27999, note: "最頂級" },
  { model: "MacBook Pro 16\" M4 Max", storage: "1TB", ram: "48GB", price: 31999, note: "工作站級" },
];

// 購買渠道比較
const purchaseChannels = [
  {
    channel: "Apple Store 官網",
    icon: "🍎",
    paymentType: "網上簽賬",
    pros: ["官方保證", "免息分期", "教育優惠", "可用 Gift Card", "可訂製規格"],
    cons: ["價格最貴（除教育優惠）"],
    bestCards: ["hsbc-red", "hangseng-mmpower"],
  },
  {
    channel: "Apple Store 實體店",
    icon: "🏪",
    paymentType: "本地簽賬",
    pros: ["即買即取", "專人服務", "教育優惠"],
    cons: ["唔當網購", "選擇較少"],
    bestCards: ["earnmore", "sc-simply-cash"],
  },
  {
    channel: "百老匯 / 豐澤",
    icon: "🛒",
    paymentType: "本地簽賬",
    pros: ["經常有優惠", "可用積分", "有時有贈品"],
    cons: ["唔當網購", "無教育優惠", "無法訂製"],
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
    note: "Apple 官網當網購 5%，但上限低",
  },
  {
    card: "HSBC Red Card",
    id: "hsbc-red",
    rate: "4%",
    cap: "$10,000/月",
    channel: "Apple 官網",
    highlight: "高上限推薦",
    note: "買 MacBook 首選！上限高夠用",
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
    usage: "文書處理 / 上網 / 睇片",
    icon: "📝",
    recommended: "MacBook Air 13\" M3",
    price: "$8,499 起",
    reason: "輕薄夠用，性價比高",
  },
  {
    usage: "大屏幕工作 / 多任務處理",
    icon: "🖥️",
    recommended: "MacBook Air 15\" M3",
    price: "$10,499 起",
    reason: "大屏幕舒適，仍然輕薄",
  },
  {
    usage: "程式開發 / 設計工作",
    icon: "💻",
    recommended: "MacBook Pro 14\" M4",
    price: "$12,999 起",
    reason: "專業效能，更佳散熱",
  },
  {
    usage: "影片剪輯 / 3D 渲染",
    icon: "🎬",
    recommended: "MacBook Pro M4 Pro",
    price: "$16,499 起",
    reason: "強勁 GPU，長時間高負載",
  },
  {
    usage: "專業影視製作 / AI 開發",
    icon: "🚀",
    recommended: "MacBook Pro M4 Max",
    price: "$27,999 起",
    reason: "工作站級效能",
  },
];

// 省錢攻略
const savingTips = [
  {
    tip: "用教育優惠",
    icon: "🎓",
    description: "大學生可享學生價，平 $600-$1,200",
    savings: "最多慳 $1,200",
  },
  {
    tip: "食信用卡迎新",
    icon: "🎁",
    description: "MacBook 價格高，非常適合食迎新！",
    savings: "最多慳 $2,000",
  },
  {
    tip: "官網網購回贈",
    icon: "💳",
    description: "Apple 官網用 Red Card 4%",
    savings: "MacBook Pro $12,999 → $520 回贈",
  },
  {
    tip: "Apple Trade In",
    icon: "♻️",
    description: "舊 Mac 換購可抵扣",
    savings: "視乎機況",
  },
  {
    tip: "等返學季優惠",
    icon: "📅",
    description: "每年 7-9 月買 Mac 送 AirPods",
    savings: "免費 AirPods",
  },
  {
    tip: "翻新機 Refurbished",
    icon: "🔄",
    description: "Apple 官方翻新機，有保養",
    savings: "平 15-20%",
  },
];

export function MacbookGuide() {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      {/* 引言 */}
      <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-6">
        買 MacBook 用邊張信用卡最抵？MacBook Air 定 Pro？
        本文教你 <strong>{currentYear} MacBook 出機攻略</strong>，
        食迎新買 MacBook 慳 <strong>$2,000</strong>！連 M4/M5 MacBook Pro 價錢！
      </p>

      {/* 目錄 */}
      <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-10">
        <h2 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          📑 本文目錄
        </h2>
        <ul className="space-y-2 text-sm">
          <li><a href="#overview" className="text-blue-600 dark:text-blue-400 hover:underline">1. MacBook 信用卡回贈點計？</a></li>
          <li><a href="#prices" className="text-blue-600 dark:text-blue-400 hover:underline">2. MacBook 全系列價格</a></li>
          <li><a href="#usage" className="text-blue-600 dark:text-blue-400 hover:underline">3. 邊款 MacBook 適合你？</a></li>
          <li><a href="#channels" className="text-blue-600 dark:text-blue-400 hover:underline">4. 購買渠道比較</a></li>
          <li><a href="#card-comparison" className="text-blue-600 dark:text-blue-400 hover:underline">5. 信用卡回贈比較</a></li>
          <li><a href="#welcome-offer" className="text-blue-600 dark:text-blue-400 hover:underline">6. 食迎新攻略</a></li>
          <li><a href="#tips" className="text-blue-600 dark:text-blue-400 hover:underline">7. 慳錢攻略</a></li>
          <li><a href="#faq" className="text-blue-600 dark:text-blue-400 hover:underline">8. 常見問題 FAQ</a></li>
        </ul>
      </div>

      {/* Section 1: 總覽 */}
      <section id="overview" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Laptop className="h-6 w-6 text-gray-800 dark:text-gray-200" />
          1. MacBook 信用卡回贈點計？
        </h2>
        
        <p>
          MacBook 價格動輒 $10,000 - $30,000，識揀信用卡可以慳好多！
        </p>

        <div className="not-prose bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-900/50 dark:to-slate-900/50 rounded-2xl p-5 border border-gray-200 dark:border-gray-700 my-6">
          <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-3">💻 MacBook 回贈策略</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-100 dark:border-gray-700">
              <p className="text-sm text-blue-600 font-bold mb-1">🌐 Apple 官網</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">當「網上簽賬」</p>
              <p className="text-xs text-gray-500"><Link href="/cards/hsbc-red" className="underline">Red Card</Link> 4% 上限高！</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-100 dark:border-gray-700">
              <p className="text-sm text-green-600 font-bold mb-1">🏪 實體店 / 電器舖</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">當「本地簽賬」</p>
              <p className="text-xs text-gray-500"><Link href="/cards/earnmore" className="underline">EarnMORE</Link> 2% 無上限</p>
            </div>
          </div>
        </div>

        <div className="not-prose bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Star className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-amber-700 dark:text-amber-300 text-sm">
              <strong>最強策略：</strong>MacBook 價格高，超適合食迎新！
              用新卡食迎新 + 官網 4% 回贈，可賺 <strong>$1,500 - $2,500</strong>！
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: 價格 */}
      <section id="prices" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <DollarSign className="h-6 w-6 text-green-500" />
          2. MacBook 全系列價格
        </h2>

        <p>
          {currentYear} 年 MacBook 全系列價格一覽（配備 M3/M4 晶片）：
        </p>

        <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden my-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">型號</th>
                  <th className="px-4 py-3 text-center font-medium">容量</th>
                  <th className="px-4 py-3 text-center font-medium">RAM</th>
                  <th className="px-4 py-3 text-center font-medium">價格</th>
                  <th className="px-4 py-3 text-left font-medium">備註</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {macbookPrices.map((item, index) => (
                  <tr key={index} className={item.note ? "bg-blue-50/50 dark:bg-blue-900/10" : ""}>
                    <td className="px-4 py-3 font-medium">{item.model}</td>
                    <td className="px-4 py-3 text-center">{item.storage}</td>
                    <td className="px-4 py-3 text-center">{item.ram}</td>
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
              <strong>提示：</strong>MacBook 可喺官網訂製更高規格（RAM / SSD），
              但訂製版需要等待較長時間。
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: 用途推薦 */}
      <section id="usage" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Cpu className="h-6 w-6 text-purple-500" />
          3. 邊款 MacBook 適合你？
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

        <div className="not-prose bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
          <h4 className="font-bold text-blue-800 dark:text-blue-200 mb-2">💡 MacBook Air vs Pro</h4>
          <div className="grid md:grid-cols-2 gap-3 text-sm">
            <div>
              <p className="font-bold text-blue-700 dark:text-blue-300 mb-1">MacBook Air</p>
              <ul className="text-blue-600 dark:text-blue-400 text-xs space-y-0.5">
                <li>✅ 輕薄便攜（1.24kg）</li>
                <li>✅ 無風扇靜音</li>
                <li>✅ 價格實惠</li>
                <li>❌ 長時間高負載會降頻</li>
              </ul>
            </div>
            <div>
              <p className="font-bold text-indigo-700 dark:text-indigo-300 mb-1">MacBook Pro</p>
              <ul className="text-indigo-600 dark:text-indigo-400 text-xs space-y-0.5">
                <li>✅ 強勁效能</li>
                <li>✅ 更佳散熱系統</li>
                <li>✅ 更亮屏幕（ProMotion）</li>
                <li>❌ 較重（1.55-2.14kg）</li>
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
        title="📌 買 MacBook 推薦信用卡"
        subtitle="點擊查看詳細回贈條款及申請連結"
        cards={[
          { id: "hsbc-red", highlight: "網購 4%" },
          { id: "hangseng-mmpower", highlight: "網購 5%" },
          { id: "earnmore", highlight: "2% 無上限" },
          { id: "sc-simply-cash", highlight: "1.5% 無上限" },
        ]}
      />

      {/* Section 6: 食迎新 */}
      <section id="welcome-offer" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Gift className="h-6 w-6 text-pink-500" />
          6. 食迎新攻略
        </h2>

        <p>
          MacBook 價格高，超適合食信用卡迎新！以 MacBook Pro 14\" $12,999 為例：
        </p>

        <div className="not-prose bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 my-6">
          <h4 className="font-bold text-gray-900 dark:text-white mb-3">📊 MacBook Pro $12,999 回贈對比</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-3 py-2 text-left">策略</th>
                  <th className="px-3 py-2 text-center">回贈率</th>
                  <th className="px-3 py-2 text-center">金額</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                <tr>
                  <td className="px-3 py-2">🥇 新卡迎新 + Red Card 4%</td>
                  <td className="px-3 py-2 text-center">~12%</td>
                  <td className="px-3 py-2 text-center font-bold text-green-600">$1,500+</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">🥈 新卡迎新（單純食迎新）</td>
                  <td className="px-3 py-2 text-center">~8%</td>
                  <td className="px-3 py-2 text-center font-bold text-green-600">$1,000+</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">🥉 Apple 官網 + Red Card 4%</td>
                  <td className="px-3 py-2 text-center">4%</td>
                  <td className="px-3 py-2 text-center font-bold text-green-600">$520</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">實體店 + EarnMORE 2%</td>
                  <td className="px-3 py-2 text-center">2%</td>
                  <td className="px-3 py-2 text-center font-bold text-green-600">$260</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">普通卡 0.4%</td>
                  <td className="px-3 py-2 text-center">0.4%</td>
                  <td className="px-3 py-2 text-center text-gray-500">$52</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="not-prose bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
          <h4 className="font-bold text-green-800 dark:text-green-200 mb-2">💡 最強組合</h4>
          <p className="text-green-700 dark:text-green-300 text-sm">
            1. 申請高迎新信用卡（簽賬要求 $8,000-$15,000）<br/>
            2. 用新卡喺 Apple 官網買 MacBook<br/>
            3. 同時賺迎新 + 網購 4% 回贈！<br/>
            <strong>總回贈可達 $1,500 - $2,500！</strong>
          </p>
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
          {macbookFaqData.map((faq, index) => (
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
        <h3 className="text-xl font-bold mb-2">💻 想知邊張信用卡買 MacBook 最抵？</h3>
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
          <Link href="/discover/ipad-guide" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
            <Laptop className="h-5 w-5 text-emerald-600" />
            <span>iPad 出機攻略</span>
            <ChevronRight className="h-4 w-4 ml-auto text-gray-400" />
          </Link>
          <Link href="/discover/iphone-guide" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
            <Laptop className="h-5 w-5 text-emerald-600" />
            <span>iPhone 出機攻略</span>
            <ChevronRight className="h-4 w-4 ml-auto text-gray-400" />
          </Link>
          <Link href="/discover/large-purchase-guide" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
            <ShoppingBag className="h-5 w-5 text-emerald-600" />
            <span>大額簽賬攻略</span>
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

