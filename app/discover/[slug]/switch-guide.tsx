// Switch 2 出機攻略
// 用於 /discover/switch-guide 頁面

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  ChevronRight, ChevronDown, CreditCard, Gamepad2, Store,
  Calculator, Trophy, DollarSign, CheckCircle, AlertTriangle,
  Star, Info, Zap, Percent, Gift, Monitor, Sparkles
} from "lucide-react";
import { CardPreviewSection } from "@/app/discover/components/card-preview-section";

// FAQ 數據
export const switchFaqData = [
  {
    question: "買 Switch 2 用邊張信用卡最抵？",
    answer: "買 Switch 2 最抵策略：(1) Nintendo eShop / 官網用 Red Card 4% / MMPOWER 5%（當網購）；(2) 百老匯/豐澤用 EarnMORE 2%；(3) 食信用卡迎新。"
  },
  {
    question: "Switch 2 幾時出？價錢幾多？",
    answer: "Switch 2 預計 2025 年推出，預計售價約 HK$2,800 - $3,500。正式價格要等任天堂公佈。"
  },
  {
    question: "買 Switch 2 可以食迎新嗎？",
    answer: "可以！Switch 2 預計 $2,800-3,500，配合 Game 同配件（Pro 手掣、記憶卡）可以達到迎新要求。"
  },
  {
    question: "Switch 2 向下兼容嗎？",
    answer: "任天堂已確認 Switch 2 向下兼容 Switch 遊戲。你嘅 Switch Game 可以繼續喺 Switch 2 玩！"
  },
  {
    question: "依家買 Switch 定等 Switch 2？",
    answer: "如果你想玩薩爾達、動森等大作，依家買 Switch OLED 都唔錯（可能減價）。如果唔急，建議等 Switch 2。"
  },
  {
    question: "Nintendo eShop 用咩付款方式？",
    answer: "Nintendo eShop 支援信用卡、PayPal。建議用高網購回贈信用卡，定期有數位遊戲減價！"
  },
  {
    question: "Switch Online 值唔值得買？",
    answer: "Switch Online 個人版 $155/年（線上對戰 + 經典 Game），家庭版 $275/年（最多 8 人）。如果玩網上對戰就值得買。"
  },
  {
    question: "買 Switch 邊度最平？",
    answer: "價格排序：二手 < 淘寶（有風險）< 百老匯/豐澤（有優惠時）< 原價。建議等優惠或用信用卡回贈。"
  }
];

// Switch 價格（現有 + 預測）
const switchPrices = [
  { model: "Nintendo Switch OLED", storage: "64GB", price: 2680, note: "現有最強" },
  { model: "Nintendo Switch", storage: "32GB", price: 2340, note: "標準版" },
  { model: "Nintendo Switch Lite", storage: "32GB", price: 1580, note: "純掌機" },
  { model: "Nintendo Switch 2（預計）", storage: "未知", price: 3200, note: "2025 推出" },
];

// 配件價格
const accessoryPrices = [
  { name: "Pro 手掣", price: 549, note: "專業手掣" },
  { name: "Joy-Con 手掣（一對）", price: 619, note: "額外手掣" },
  { name: "Switch 底座", price: 399, note: "電視模式用" },
  { name: "SanDisk 256GB 記憶卡", price: 200, note: "擴充容量" },
  { name: "SanDisk 512GB 記憶卡", price: 400, note: "大容量" },
  { name: "保護套 + 貼", price: 100, note: "保護裝備" },
];

// 熱門遊戲
const popularGames = [
  { name: "薩爾達傳說：王國之淚", price: 469, note: "神作必玩" },
  { name: "超級瑪利歐兄弟 驚奇", price: 399, note: "全家歡樂" },
  { name: "動物森友會", price: 399, note: "治癒系" },
  { name: "寶可夢 朱/紫", price: 399, note: "系列最新" },
  { name: "瑪利歐賽車 8 豪華版", price: 399, note: "派對必備" },
  { name: "任天堂明星大亂鬥 特別版", price: 469, note: "格鬥派對" },
];

// 購買渠道比較
const purchaseChannels = [
  {
    channel: "Nintendo eShop",
    icon: "🎮",
    paymentType: "網上簽賬",
    pros: ["數位遊戲即買即玩", "經常有減價", "當網購 4-5% 回贈"],
    cons: ["只限數位遊戲"],
    bestCards: ["hsbc-red", "hangseng-mmpower"],
  },
  {
    channel: "百老匯 / 豐澤",
    icon: "🛒",
    paymentType: "本地簽賬",
    pros: ["有現貨", "可試機", "有積分", "買實體 Game"],
    cons: ["唔當網購"],
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
  {
    channel: "Mox Card",
    icon: "💳",
    paymentType: "特別優惠",
    pros: ["經常送 Switch 迎新"],
    cons: ["限時優惠"],
    bestCards: [],
  },
];

// 信用卡回贈比較
const cardComparison = [
  {
    card: "恒生 MMPOWER",
    id: "hangseng-mmpower",
    rate: "5%",
    cap: "$200/月",
    channel: "eShop / 網購",
    highlight: "網購最高",
    note: "網購 5%，但上限低",
  },
  {
    card: "HSBC Red Card",
    id: "hsbc-red",
    rate: "4%",
    cap: "$10,000/月",
    channel: "eShop / 網購",
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
    tip: "食信用卡迎新",
    icon: "🎁",
    description: "Switch + Game + 配件達成迎新要求",
    savings: "額外 $500-$1,000",
  },
  {
    tip: "eShop 減價",
    icon: "🏷️",
    description: "留意 eShop 定期減價，大作可以半價入手",
    savings: "每隻 Game 慳 $100-200",
  },
  {
    tip: "買二手實體 Game",
    icon: "💿",
    description: "玩完可以轉售，近乎零成本玩 Game",
    savings: "每隻 Game 慳 $200+",
  },
  {
    tip: "Mox 迎新送 Switch",
    icon: "📱",
    description: "留意 Mox Card 送 Switch 迎新優惠",
    savings: "可能免費！",
  },
  {
    tip: "家庭版 Switch Online",
    icon: "👨‍👩‍👧‍👦",
    description: "同朋友 Share 家庭版，人均更平",
    savings: "每人慳 $100+/年",
  },
  {
    tip: "等 Switch 2 推出後買 Switch",
    icon: "⏰",
    description: "Switch 2 出咗之後，舊款會減價",
    savings: "可能減 $300-500",
  },
];

export function SwitchGuide() {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      {/* 引言 */}
      <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-6">
        買 Switch 2 用邊張信用卡最抵？幾時出？價錢幾多？
        本文教你 <strong>{currentYear} Switch 2 出機攻略</strong>，
        食迎新買 Switch 最平 <strong>$1,850 起</strong>！
      </p>

      {/* 目錄 */}
      <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-10">
        <h2 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          📑 本文目錄
        </h2>
        <ul className="space-y-2 text-sm">
          <li><a href="#overview" className="text-blue-600 dark:text-blue-400 hover:underline">1. Switch 信用卡回贈點計？</a></li>
          <li><a href="#prices" className="text-blue-600 dark:text-blue-400 hover:underline">2. Switch 全系列價格</a></li>
          <li><a href="#switch2" className="text-blue-600 dark:text-blue-400 hover:underline">3. Switch 2 最新消息</a></li>
          <li><a href="#channels" className="text-blue-600 dark:text-blue-400 hover:underline">4. 購買渠道比較</a></li>
          <li><a href="#card-comparison" className="text-blue-600 dark:text-blue-400 hover:underline">5. 信用卡回贈比較</a></li>
          <li><a href="#games" className="text-blue-600 dark:text-blue-400 hover:underline">6. 熱門遊戲及配件</a></li>
          <li><a href="#tips" className="text-blue-600 dark:text-blue-400 hover:underline">7. 慳錢攻略</a></li>
          <li><a href="#faq" className="text-blue-600 dark:text-blue-400 hover:underline">8. 常見問題 FAQ</a></li>
        </ul>
      </div>

      {/* Section 1: 總覽 */}
      <section id="overview" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Gamepad2 className="h-6 w-6 text-red-600" />
          1. Switch 信用卡回贈點計？
        </h2>
        
        <p>
          買 Switch 識揀信用卡可以慳幾百蚊！Nintendo eShop 當網購，回贈更高！
        </p>

        <div className="not-prose bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-2xl p-5 border border-red-200 dark:border-red-700 my-6">
          <h4 className="font-bold text-red-800 dark:text-red-200 mb-3">🎮 Switch 回贈策略</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-red-100 dark:border-red-700">
              <p className="text-sm text-red-600 font-bold mb-1">🌐 Nintendo eShop</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">當「網上簽賬」</p>
              <p className="text-xs text-gray-500"><Link href="/cards/hsbc-red" className="underline">Red Card</Link> 4% / <Link href="/cards/hangseng-mmpower" className="underline">MMPOWER</Link> 5%</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-red-100 dark:border-red-700">
              <p className="text-sm text-pink-600 font-bold mb-1">🏪 百老匯 / 豐澤</p>
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
          2. Switch 全系列價格
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
                {switchPrices.map((item, index) => (
                  <tr key={index} className={item.note.includes("2025") ? "bg-red-50/50 dark:bg-red-900/10" : ""}>
                    <td className="px-4 py-3 font-medium">{item.model}</td>
                    <td className="px-4 py-3 text-center">{item.storage}</td>
                    <td className="px-4 py-3 text-center font-bold text-green-600">
                      {item.note.includes("預計") ? `~HK$${item.price.toLocaleString()}` : `HK$${item.price.toLocaleString()}`}
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-500">{item.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section 3: Switch 2 */}
      <section id="switch2" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-red-500" />
          3. Switch 2 最新消息
        </h2>

        <div className="not-prose bg-gradient-to-br from-red-100 to-pink-100 dark:from-red-900/30 dark:to-pink-900/30 rounded-xl p-5 border border-red-200 dark:border-red-800 my-6">
          <h4 className="font-bold text-red-800 dark:text-red-200 mb-3">🎮 Switch 2 預計規格</h4>
          <ul className="text-red-700 dark:text-red-300 text-sm space-y-2">
            <li>📅 <strong>推出日期：</strong>2025 年（任天堂已確認）</li>
            <li>💰 <strong>預計售價：</strong>約 HK$2,800 - $3,500</li>
            <li>📺 <strong>屏幕：</strong>預計更大 OLED 屏幕</li>
            <li>⚡ <strong>效能：</strong>大幅提升，支援更多 3A 大作</li>
            <li>🎮 <strong>向下兼容：</strong>已確認支援 Switch 遊戲</li>
            <li>🕹️ <strong>Joy-Con：</strong>預計有新設計</li>
          </ul>
        </div>

        <div className="not-prose bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-amber-700 dark:text-amber-300 text-sm">
              <strong>建議：</strong>如果唔急，可以等 Switch 2 推出後再決定。
              Switch 2 出咗之後，舊款 Switch 可能會減價！
            </p>
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
              <div className="grid md:grid-cols-2 gap-2">
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
              <p className="text-xs text-gray-500 mt-1">{card.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Card Preview Section */}
      <CardPreviewSection 
        title="📌 買 Switch 推薦信用卡"
        subtitle="點擊查看詳細回贈條款及申請連結"
        cards={[
          { id: "hsbc-red", highlight: "網購 4%" },
          { id: "hangseng-mmpower", highlight: "網購 5%" },
          { id: "earnmore", highlight: "2% 無上限" },
          { id: "sc-simply-cash", highlight: "1.5% 無上限" },
        ]}
      />

      {/* Section 6: 遊戲及配件 */}
      <section id="games" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Trophy className="h-6 w-6 text-yellow-500" />
          6. 熱門遊戲及配件
        </h2>

        <div className="not-prose grid md:grid-cols-2 gap-4 my-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className="bg-red-50 dark:bg-red-900/30 px-4 py-2 font-bold">🎮 熱門遊戲</div>
            <div className="p-4">
              <ul className="space-y-2 text-sm">
                {popularGames.map((item, index) => (
                  <li key={index} className="flex justify-between">
                    <span>{item.name} <span className="text-xs text-gray-500">({item.note})</span></span>
                    <span className="font-bold text-green-600">${item.price}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className="bg-gray-50 dark:bg-gray-900 px-4 py-2 font-bold">🎮 配件</div>
            <div className="p-4">
              <ul className="space-y-2 text-sm">
                {accessoryPrices.map((item, index) => (
                  <li key={index} className="flex justify-between">
                    <span>{item.name}</span>
                    <span className="font-bold text-green-600">${item.price}</span>
                  </li>
                ))}
              </ul>
            </div>
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
          {switchFaqData.map((faq, index) => (
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
      <div className="not-prose bg-gradient-to-r from-red-600 to-pink-600 rounded-2xl p-6 text-white mb-10">
        <h3 className="text-xl font-bold mb-2">🎮 想知邊張信用卡買 Switch 最抵？</h3>
        <p className="mb-4 opacity-90">用我哋嘅計算機，即刻搵到最適合你嘅信用卡！</p>
        <Link href="/">
          <Button className="bg-white text-red-600 hover:bg-gray-100">
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
          <Link href="/discover/xbox-guide" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
            <Gamepad2 className="h-5 w-5 text-emerald-600" />
            <span>Xbox 出機攻略</span>
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

