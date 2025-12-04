// PS5 出機攻略
// 用於 /discover/ps5-guide 頁面

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  ChevronRight, ChevronDown, CreditCard, Gamepad2, Store,
  Calculator, Trophy, DollarSign, CheckCircle, AlertTriangle,
  Star, Info, Zap, Percent, Gift, Monitor, HardDrive
} from "lucide-react";
import { CardPreviewSection } from "@/app/discover/components/card-preview-section";

// FAQ 數據
export const ps5FaqData = [
  {
    question: "買 PS5 用邊張信用卡最抵？",
    answer: "買 PS5 最抵策略：(1) PlayStation Direct 官網用 Red Card 4% / MMPOWER 5%（當網購）；(2) 百老匯/豐澤用 EarnMORE 2%；(3) 食信用卡迎新。"
  },
  {
    question: "PS5 Slim 定 PS5 Pro？",
    answer: "PS5 Slim 適合一般玩家（夠用、性價比高）。PS5 Pro 適合硬核玩家（4K 120fps、光追效能更強）。如果無 4K 電視，買 Slim 已經夠用。"
  },
  {
    question: "PS5 數位版定光碟版？",
    answer: "數位版平 $800，但只能買數位遊戲（無法玩實體碟、無法二手轉售）。光碟版可以玩實體碟、買二手 Game。長遠計，光碟版可能更抵。"
  },
  {
    question: "買 PS5 可以食迎新嗎？",
    answer: "可以！PS5 Slim $3,180 起、PS5 Pro $5,780，配合 Game 同配件可以達到迎新要求（通常 $5,000-$8,000）。"
  },
  {
    question: "PlayStation Direct 香港有嗎？",
    answer: "有！PlayStation Direct 香港官網可以直接購買 PS5，當網購可享 4-5% 回贈。但有時會斷貨，要留意補貨時間。"
  },
  {
    question: "PS5 信用卡設定點搞？",
    answer: "PS5 可以喺 PlayStation Store 綁定信用卡，用嚟買數位遊戲、PS Plus 訂閱。記得用高網購回贈卡！"
  },
  {
    question: "PS Plus 訂閱值唔值得買？",
    answer: "PS Plus Essential $308/年（線上對戰必需）、Extra $628/年（送幾百隻 Game）、Premium $748/年（多經典 Game + 試玩）。建議至少買 Essential。"
  },
  {
    question: "買 PS5 邊度最平？",
    answer: "價格排序：二手 < 淘寶（有風險）< PlayStation Direct / 百老匯/豐澤（有優惠時）< 原價。建議等減價或用信用卡優惠。"
  }
];

// PS5 價格
const ps5Prices = [
  { model: "PS5 Slim 數位版", storage: "1TB", price: 3180, note: "入門首選" },
  { model: "PS5 Slim 光碟版", storage: "1TB", price: 3980, note: "推薦！可玩實體碟" },
  { model: "PS5 Pro", storage: "2TB", price: 5780, note: "最強效能（無光碟機）" },
  { model: "PS5 Pro 光碟機套裝", storage: "2TB", price: 6580, note: "Pro + 光碟機" },
];

// 配件價格
const accessoryPrices = [
  { name: "DualSense 手掣", price: 579, note: "標準手掣" },
  { name: "DualSense Edge 手掣", price: 1580, note: "專業手掣" },
  { name: "PS5 光碟機（Pro 專用）", price: 800, note: "Pro 加裝用" },
  { name: "PlayStation VR2", price: 4380, note: "VR 頭盔" },
  { name: "Pulse Elite 耳機", price: 1080, note: "無線耳機" },
  { name: "直立架（Slim）", price: 228, note: "企立用" },
];

// 熱門遊戲
const popularGames = [
  { name: "GTA 6", price: "未定", note: "2025 最期待" },
  { name: "Spider-Man 2", price: 498, note: "獨佔大作" },
  { name: "God of War Ragnarök", price: 498, note: "神作" },
  { name: "Final Fantasy VII Rebirth", price: 498, note: "限時獨佔" },
  { name: "Elden Ring", price: 468, note: "年度遊戲" },
  { name: "Horizon Forbidden West", price: 498, note: "獨佔大作" },
];

// 購買渠道比較
const purchaseChannels = [
  {
    channel: "PlayStation Direct",
    icon: "🎮",
    paymentType: "網上簽賬",
    pros: ["官方保證", "有時有優惠", "當網購 4-5% 回贈"],
    cons: ["經常斷貨", "無實體店"],
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
    cons: ["唔當網購", "選擇較少"],
    bestCards: ["earnmore", "sc-simply-cash"],
  },
  {
    channel: "淘寶 / 京東",
    icon: "📦",
    paymentType: "網上簽賬",
    pros: ["可能較平", "當網購"],
    cons: ["有假貨風險", "保養問題"],
    bestCards: ["hsbc-red", "hangseng-mmpower"],
  },
];

// 信用卡回贈比較
const cardComparison = [
  {
    card: "恒生 MMPOWER",
    id: "hangseng-mmpower",
    rate: "5%",
    cap: "$200/月",
    channel: "PS Direct / 淘寶",
    highlight: "網購最高",
    note: "網購 5%，但上限低",
  },
  {
    card: "HSBC Red Card",
    id: "hsbc-red",
    rate: "4%",
    cap: "$10,000/月",
    channel: "PS Direct / 淘寶",
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
    description: "PS5 + 配件 + Game 容易達成 $5,000+ 迎新要求",
    savings: "額外 $500-$1,000",
  },
  {
    tip: "PS Direct 網購回贈",
    icon: "💳",
    description: "PlayStation Direct 當網購，用 Red Card 4%",
    savings: "PS5 Pro $5,780 → $231 回贈",
  },
  {
    tip: "等 Black Friday / 聖誕",
    icon: "🎄",
    description: "大時大節通常有減價",
    savings: "可能減 $200-500",
  },
  {
    tip: "買二手 Game",
    icon: "💿",
    description: "光碟版可以買二手 Game，玩完再賣",
    savings: "每隻 Game 慳 $200+",
  },
  {
    tip: "PS Plus 訂閱優惠",
    icon: "➕",
    description: "等 PS Plus 減價（通常 25-33% off）",
    savings: "每年慳 $100-200",
  },
  {
    tip: "唔買 Pro（如果無 4K 電視）",
    icon: "📺",
    description: "無 4K 120Hz 電視，Slim 已經夠用",
    savings: "慳 $1,800-2,600",
  },
];

export function Ps5Guide() {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      {/* 引言 */}
      <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-6">
        買 PS5 用邊張信用卡最抵？PS5 Slim 定 Pro？數位版定光碟版？
        本文教你 <strong>{currentYear} PS5 出機攻略</strong>，
        食迎新買 PS5 最平 <strong>$1,400 起</strong>！
      </p>

      {/* 目錄 */}
      <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-10">
        <h2 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          📑 本文目錄
        </h2>
        <ul className="space-y-2 text-sm">
          <li><a href="#overview" className="text-blue-600 dark:text-blue-400 hover:underline">1. PS5 信用卡回贈點計？</a></li>
          <li><a href="#prices" className="text-blue-600 dark:text-blue-400 hover:underline">2. PS5 全系列價格</a></li>
          <li><a href="#comparison" className="text-blue-600 dark:text-blue-400 hover:underline">3. Slim vs Pro / 數位版 vs 光碟版</a></li>
          <li><a href="#channels" className="text-blue-600 dark:text-blue-400 hover:underline">4. 購買渠道比較</a></li>
          <li><a href="#card-comparison" className="text-blue-600 dark:text-blue-400 hover:underline">5. 信用卡回贈比較</a></li>
          <li><a href="#accessories" className="text-blue-600 dark:text-blue-400 hover:underline">6. 配件及遊戲價格</a></li>
          <li><a href="#tips" className="text-blue-600 dark:text-blue-400 hover:underline">7. 慳錢攻略</a></li>
          <li><a href="#faq" className="text-blue-600 dark:text-blue-400 hover:underline">8. 常見問題 FAQ</a></li>
        </ul>
      </div>

      {/* Section 1: 總覽 */}
      <section id="overview" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Gamepad2 className="h-6 w-6 text-blue-600" />
          1. PS5 信用卡回贈點計？
        </h2>
        
        <p>
          買 PS5 識揀信用卡可以慳幾百蚊！PlayStation Direct 官網當網購，回贈更高！
        </p>

        <div className="not-prose bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-5 border border-blue-200 dark:border-blue-700 my-6">
          <h4 className="font-bold text-blue-800 dark:text-blue-200 mb-3">🎮 PS5 回贈策略</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-blue-100 dark:border-blue-700">
              <p className="text-sm text-blue-600 font-bold mb-1">🌐 PS Direct / 淘寶</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">當「網上簽賬」</p>
              <p className="text-xs text-gray-500"><Link href="/cards/hsbc-red" className="underline">Red Card</Link> 4% / <Link href="/cards/hangseng-mmpower" className="underline">MMPOWER</Link> 5%</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-blue-100 dark:border-blue-700">
              <p className="text-sm text-green-600 font-bold mb-1">🏪 百老匯 / 豐澤</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">當「本地簽賬」</p>
              <p className="text-xs text-gray-500"><Link href="/cards/earnmore" className="underline">EarnMORE</Link> 2% / <Link href="/cards/sc-simply-cash" className="underline">Simply Cash</Link> 1.5%</p>
            </div>
          </div>
        </div>

        <div className="not-prose bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Star className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-amber-700 dark:text-amber-300 text-sm">
              <strong>最強策略：</strong>PS5 + 配件 + Game 一齊買，容易達到信用卡迎新要求，
              食迎新可以慳 <strong>$500 - $1,500</strong>！
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: 價格 */}
      <section id="prices" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <DollarSign className="h-6 w-6 text-green-500" />
          2. PS5 全系列價格
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
                {ps5Prices.map((item, index) => (
                  <tr key={index} className={item.note.includes("推薦") ? "bg-green-50/50 dark:bg-green-900/10" : ""}>
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
          3. Slim vs Pro / 數位版 vs 光碟版
        </h2>

        <div className="not-prose grid md:grid-cols-2 gap-4 my-6">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
            <h4 className="font-bold text-blue-800 dark:text-blue-200 mb-2">🎮 PS5 Slim vs Pro</h4>
            <div className="space-y-2 text-sm">
              <div>
                <p className="font-bold text-blue-700 dark:text-blue-300">PS5 Slim（$3,180-$3,980）</p>
                <ul className="text-blue-600 dark:text-blue-400 text-xs space-y-0.5">
                  <li>✅ 性價比高</li>
                  <li>✅ 大部分 Game 跑得順</li>
                  <li>✅ 較細部機身</li>
                  <li>❌ 4K 60fps 為主</li>
                </ul>
              </div>
              <div>
                <p className="font-bold text-indigo-700 dark:text-indigo-300">PS5 Pro（$5,780）</p>
                <ul className="text-indigo-600 dark:text-indigo-400 text-xs space-y-0.5">
                  <li>✅ 4K 120fps</li>
                  <li>✅ 更強光追效能</li>
                  <li>✅ 2TB 容量</li>
                  <li>❌ 無光碟機（需另購）</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4 border border-green-200 dark:border-green-800">
            <h4 className="font-bold text-green-800 dark:text-green-200 mb-2">💿 數位版 vs 光碟版</h4>
            <div className="space-y-2 text-sm">
              <div>
                <p className="font-bold text-green-700 dark:text-green-300">數位版（平 $800）</p>
                <ul className="text-green-600 dark:text-green-400 text-xs space-y-0.5">
                  <li>✅ 平 $800</li>
                  <li>✅ 機身較輕薄</li>
                  <li>❌ 只能買數位 Game</li>
                  <li>❌ 無法玩二手碟</li>
                </ul>
              </div>
              <div>
                <p className="font-bold text-emerald-700 dark:text-emerald-300">光碟版（推薦）</p>
                <ul className="text-emerald-600 dark:text-emerald-400 text-xs space-y-0.5">
                  <li>✅ 可玩實體碟</li>
                  <li>✅ 可買二手 Game</li>
                  <li>✅ 玩完可轉售</li>
                  <li>❌ 貴 $800</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="not-prose bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <p className="text-blue-700 dark:text-blue-300 text-sm">
              <strong>建議：</strong>如果無 4K 120Hz 電視，買 <strong>PS5 Slim 光碟版</strong> 最抵！
              可以玩二手 Game，長遠慳更多。
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
        title="📌 買 PS5 推薦信用卡"
        subtitle="點擊查看詳細回贈條款及申請連結"
        cards={[
          { id: "hsbc-red", highlight: "網購 4%" },
          { id: "hangseng-mmpower", highlight: "網購 5%" },
          { id: "earnmore", highlight: "2% 無上限" },
          { id: "sc-simply-cash", highlight: "1.5% 無上限" },
        ]}
      />

      {/* Section 6: 配件及遊戲 */}
      <section id="accessories" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <HardDrive className="h-6 w-6 text-orange-500" />
          6. 配件及遊戲價格
        </h2>

        <div className="not-prose grid md:grid-cols-2 gap-4 my-6">
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

          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className="bg-gray-50 dark:bg-gray-900 px-4 py-2 font-bold">🕹️ 熱門遊戲</div>
            <div className="p-4">
              <ul className="space-y-2 text-sm">
                {popularGames.map((item, index) => (
                  <li key={index} className="flex justify-between">
                    <span>{item.name} <span className="text-xs text-gray-500">({item.note})</span></span>
                    <span className="font-bold text-green-600">{typeof item.price === 'number' ? `$${item.price}` : item.price}</span>
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
          {ps5FaqData.map((faq, index) => (
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
      <div className="not-prose bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white mb-10">
        <h3 className="text-xl font-bold mb-2">🎮 想知邊張信用卡買 PS5 最抵？</h3>
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
          <Link href="/discover/online-shopping-guide" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
            <Gamepad2 className="h-5 w-5 text-emerald-600" />
            <span>網購信用卡攻略</span>
            <ChevronRight className="h-4 w-4 ml-auto text-gray-400" />
          </Link>
          <Link href="/discover/large-purchase-guide" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
            <Gift className="h-5 w-5 text-emerald-600" />
            <span>大額簽賬攻略</span>
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

