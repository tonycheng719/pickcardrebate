// Xbox 出機攻略
// 用於 /discover/xbox-guide 頁面

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  ChevronRight, ChevronDown, CreditCard, Gamepad2, Store,
  Calculator, Trophy, DollarSign, CheckCircle, AlertTriangle,
  Star, Info, Zap, Percent, Gift, Monitor, Sparkles
} from "lucide-react";
import { CardPreviewSection } from "@/app/discover/components/card-preview-section";

// FAQ 數據
export const xboxFaqData = [
  {
    question: "買 Xbox 用邊張信用卡最抵？",
    answer: "買 Xbox 最抵策略：(1) Microsoft Store 官網用 Red Card 4% / MMPOWER 5%（當網購）；(2) 百老匯/豐澤用 EarnMORE 2%；(3) 食信用卡迎新。"
  },
  {
    question: "Xbox Series X 定 Series S？",
    answer: "Series X 適合追求 4K 畫質（有光碟機）。Series S 適合入門玩家（平 $1,500+、只能數位遊戲）。如果無 4K 電視，Series S 已夠用。"
  },
  {
    question: "買 Xbox 可以食迎新嗎？",
    answer: "可以！Xbox Series X $3,980、Series S $2,280，配合 Game Pass 訂閱同配件可以達到迎新要求。"
  },
  {
    question: "Xbox Game Pass 值唔值得買？",
    answer: "非常值！Game Pass Ultimate $119/月（包 100+ 隻 Game、EA Play、線上對戰），係遊戲界最抵訂閱服務，Day 1 就有新 Game 玩！"
  },
  {
    question: "Xbox 付款方式點設定？",
    answer: "Xbox 可以喺 Microsoft Store 綁定信用卡，用嚟買數位遊戲、Game Pass 訂閱。記得用高網購回贈卡！"
  },
  {
    question: "Xbox 支援 AlipayHK 嗎？",
    answer: "Microsoft Store 暫時唔支援 AlipayHK。建議用信用卡直接付款，可以賺回贈。"
  },
  {
    question: "Xbox 同 PS5 邊個好？",
    answer: "Xbox 優勢：Game Pass 超值、向下兼容好。PS5 優勢：獨佔遊戲多（God of War、Spider-Man）。建議睇你想玩咩 Game 決定。"
  },
  {
    question: "買 Xbox 邊度最平？",
    answer: "價格排序：二手 < Microsoft Store / 百老匯（有優惠時）< 原價。建議等減價或用信用卡優惠。"
  }
];

// Xbox 價格
const xboxPrices = [
  { model: "Xbox Series S", storage: "512GB", price: 2280, note: "入門首選" },
  { model: "Xbox Series S", storage: "1TB（黑色）", price: 2780, note: "大容量" },
  { model: "Xbox Series X", storage: "1TB", price: 3980, note: "旗艦機" },
  { model: "Xbox Series X 數位版", storage: "1TB", price: 3480, note: "無光碟機" },
];

// 配件價格
const accessoryPrices = [
  { name: "Xbox 無線手掣", price: 499, note: "標準手掣" },
  { name: "Xbox Elite 手掣 Series 2", price: 1399, note: "專業手掣" },
  { name: "Xbox 無線耳機", price: 799, note: "官方耳機" },
  { name: "Seagate 擴充卡 1TB", price: 1799, note: "官方擴充" },
  { name: "Play & Charge Kit", price: 199, note: "充電套裝" },
];

// Game Pass 價格
const gamePassPrices = [
  { name: "Game Pass Core", price: 59, period: "月", note: "線上對戰" },
  { name: "Game Pass Standard", price: 95, period: "月", note: "主機 Game 庫" },
  { name: "Game Pass Ultimate", price: 119, period: "月", note: "全包（推薦）" },
  { name: "Game Pass Ultimate", price: 499, period: "3 個月", note: "買 3 個月較抵" },
];

// 購買渠道比較
const purchaseChannels = [
  {
    channel: "Microsoft Store 官網",
    icon: "🎮",
    paymentType: "網上簽賬",
    pros: ["官方保證", "當網購 4-5% 回贈", "有時有優惠"],
    cons: ["選擇較少"],
    bestCards: ["hsbc-red", "hangseng-mmpower"],
  },
  {
    channel: "百老匯 / 豐澤",
    icon: "🛒",
    paymentType: "本地簽賬",
    pros: ["有現貨", "可試機", "有積分"],
    cons: ["唔當網購", "價格較貴"],
    bestCards: ["earnmore", "sc-simply-cash"],
  },
  {
    channel: "Game 專門店",
    icon: "🕹️",
    paymentType: "本地簽賬",
    pros: ["有二手 Game", "專業建議"],
    cons: ["唔當網購"],
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
    channel: "Microsoft Store",
    highlight: "網購最高",
    note: "網購 5%，但上限低",
  },
  {
    card: "HSBC Red Card",
    id: "hsbc-red",
    rate: "4%",
    cap: "$10,000/月",
    channel: "Microsoft Store",
    highlight: "高上限推薦",
    note: "網購 4%，上限高夠用",
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

// 省錢攻略
const savingTips = [
  {
    tip: "訂閱 Game Pass Ultimate",
    icon: "🎮",
    description: "月費 $119 包 100+ 隻 Game，唔使逐隻買",
    savings: "每月慳 $500+",
  },
  {
    tip: "食信用卡迎新",
    icon: "🎁",
    description: "Xbox + Game Pass + 配件達成迎新要求",
    savings: "額外 $500-$1,000",
  },
  {
    tip: "Microsoft Store 網購回贈",
    icon: "💳",
    description: "官網當網購，用 Red Card 4%",
    savings: "Series X $3,980 → $159 回贈",
  },
  {
    tip: "買 Series S（如果夠用）",
    icon: "💰",
    description: "無 4K 電視，Series S 已經夠玩",
    savings: "慳 $1,200-1,700",
  },
  {
    tip: "等 Game Pass 優惠",
    icon: "🏷️",
    description: "Game Pass 經常有首月 $8 優惠",
    savings: "首月慳 $111",
  },
];

export function XboxGuide() {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      {/* 引言 */}
      <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-6">
        買 Xbox 用邊張信用卡最抵？Series X 定 Series S？
        本文教你 <strong>{currentYear} Xbox 出機攻略</strong>，
        食迎新買 Xbox 最平 <strong>$1,000 起</strong>！
      </p>

      {/* 目錄 */}
      <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-10">
        <h2 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          📑 本文目錄
        </h2>
        <ul className="space-y-2 text-sm">
          <li><a href="#overview" className="text-blue-600 dark:text-blue-400 hover:underline">1. Xbox 信用卡回贈點計？</a></li>
          <li><a href="#prices" className="text-blue-600 dark:text-blue-400 hover:underline">2. Xbox 全系列價格</a></li>
          <li><a href="#comparison" className="text-blue-600 dark:text-blue-400 hover:underline">3. Series X vs Series S</a></li>
          <li><a href="#gamepass" className="text-blue-600 dark:text-blue-400 hover:underline">4. Game Pass 訂閱攻略</a></li>
          <li><a href="#channels" className="text-blue-600 dark:text-blue-400 hover:underline">5. 購買渠道比較</a></li>
          <li><a href="#card-comparison" className="text-blue-600 dark:text-blue-400 hover:underline">6. 信用卡回贈比較</a></li>
          <li><a href="#tips" className="text-blue-600 dark:text-blue-400 hover:underline">7. 慳錢攻略</a></li>
          <li><a href="#faq" className="text-blue-600 dark:text-blue-400 hover:underline">8. 常見問題 FAQ</a></li>
        </ul>
      </div>

      {/* Section 1: 總覽 */}
      <section id="overview" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Gamepad2 className="h-6 w-6 text-green-600" />
          1. Xbox 信用卡回贈點計？
        </h2>
        
        <p>
          買 Xbox 識揀信用卡可以慳幾百蚊！Microsoft Store 官網當網購，回贈更高！
        </p>

        <div className="not-prose bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-5 border border-green-200 dark:border-green-700 my-6">
          <h4 className="font-bold text-green-800 dark:text-green-200 mb-3">🎮 Xbox 回贈策略</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-green-100 dark:border-green-700">
              <p className="text-sm text-green-600 font-bold mb-1">🌐 Microsoft Store</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">當「網上簽賬」</p>
              <p className="text-xs text-gray-500"><Link href="/cards/hsbc-red" className="underline">Red Card</Link> 4% / <Link href="/cards/hangseng-mmpower" className="underline">MMPOWER</Link> 5%</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-green-100 dark:border-green-700">
              <p className="text-sm text-emerald-600 font-bold mb-1">🏪 百老匯 / 豐澤</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">當「本地簽賬」</p>
              <p className="text-xs text-gray-500"><Link href="/cards/earnmore" className="underline">EarnMORE</Link> 2% / <Link href="/cards/sc-simply-cash" className="underline">Simply Cash</Link> 1.5%</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: 價格 */}
      <section id="prices" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <DollarSign className="h-6 w-6 text-green-500" />
          2. Xbox 全系列價格
        </h2>

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
                {xboxPrices.map((item, index) => (
                  <tr key={index} className={item.note === "入門首選" ? "bg-green-50/50 dark:bg-green-900/10" : ""}>
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

      {/* Section 3: 比較 */}
      <section id="comparison" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Monitor className="h-6 w-6 text-purple-500" />
          3. Series X vs Series S
        </h2>

        <div className="not-prose grid md:grid-cols-2 gap-4 my-6">
          <div className="bg-gradient-to-br from-gray-800 to-black text-white rounded-xl p-4">
            <h4 className="font-bold mb-2">🎮 Xbox Series X（$3,980）</h4>
            <ul className="text-sm space-y-1 text-gray-300">
              <li>✅ 4K 120fps</li>
              <li>✅ 有光碟機</li>
              <li>✅ 1TB 容量</li>
              <li>✅ 最強效能</li>
              <li>❌ 較貴</li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-white to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
            <h4 className="font-bold text-gray-900 dark:text-white mb-2">🎮 Xbox Series S（$2,280）</h4>
            <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-300">
              <li>✅ 性價比高</li>
              <li>✅ 細部輕便</li>
              <li>✅ 1440p 120fps</li>
              <li>❌ 無光碟機</li>
              <li>❌ 512GB 容量較少</li>
            </ul>
          </div>
        </div>

        <div className="not-prose bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <p className="text-blue-700 dark:text-blue-300 text-sm">
              <strong>建議：</strong>如果無 4K 電視，或者主要玩 Game Pass 數位遊戲，
              <strong>Series S</strong> 已經夠用！慳返 $1,700！
            </p>
          </div>
        </div>
      </section>

      {/* Section 4: Game Pass */}
      <section id="gamepass" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-green-500" />
          4. Game Pass 訂閱攻略
        </h2>

        <p>
          Xbox Game Pass 係遊戲界最抵訂閱服務！月費包 100+ 隻 Game，新 Game Day 1 就有得玩！
        </p>

        <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden my-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-green-50 dark:bg-green-900/30">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">方案</th>
                  <th className="px-4 py-3 text-center font-medium">價錢</th>
                  <th className="px-4 py-3 text-left font-medium">包含內容</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {gamePassPrices.map((item, index) => (
                  <tr key={index} className={item.note === "全包（推薦）" ? "bg-green-50/50 dark:bg-green-900/10" : ""}>
                    <td className="px-4 py-3 font-medium">{item.name}</td>
                    <td className="px-4 py-3 text-center font-bold text-green-600">${item.price}/{item.period}</td>
                    <td className="px-4 py-3 text-xs text-gray-500">{item.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="not-prose bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
          <h4 className="font-bold text-green-800 dark:text-green-200 mb-2">🎮 Game Pass Ultimate 包含：</h4>
          <ul className="text-green-700 dark:text-green-300 text-sm space-y-1">
            <li>✅ 100+ 隻主機 + PC Game</li>
            <li>✅ EA Play（FIFA、Battlefield 等）</li>
            <li>✅ Xbox Live Gold（線上對戰）</li>
            <li>✅ Day 1 新 Game（Starfield、Forza 等）</li>
            <li>✅ Cloud Gaming（手機都玩到）</li>
          </ul>
        </div>
      </section>

      {/* Section 5: 購買渠道 */}
      <section id="channels" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Store className="h-6 w-6 text-indigo-500" />
          5. 購買渠道比較
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
            </div>
          ))}
        </div>
      </section>

      {/* Section 6: 信用卡比較 */}
      <section id="card-comparison" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Percent className="h-6 w-6 text-green-500" />
          6. 信用卡回贈比較
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
              <p className="text-xs text-gray-500 mt-1">{card.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Card Preview Section */}
      <CardPreviewSection 
        title="📌 買 Xbox 推薦信用卡"
        subtitle="點擊查看詳細回贈條款及申請連結"
        cards={[
          { id: "hsbc-red", highlight: "網購 4%" },
          { id: "hangseng-mmpower", highlight: "網購 5%" },
          { id: "earnmore", highlight: "2% 無上限" },
          { id: "sc-simply-cash", highlight: "1.5% 無上限" },
        ]}
      />

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
          {xboxFaqData.map((faq, index) => (
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
      <div className="not-prose bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-6 text-white mb-10">
        <h3 className="text-xl font-bold mb-2">🎮 想知邊張信用卡買 Xbox 最抵？</h3>
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
          <Link href="/discover/ps5-guide" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
            <Gamepad2 className="h-5 w-5 text-emerald-600" />
            <span>PS5 出機攻略</span>
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

