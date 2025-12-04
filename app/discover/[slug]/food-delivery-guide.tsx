// 外賣平台信用卡攻略
// 用於 /discover/food-delivery-guide 頁面

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  ChevronRight, ChevronDown, CreditCard, Bike, Smartphone,
  Calculator, Trophy, DollarSign, CheckCircle, AlertTriangle,
  Star, Info, Zap, Percent, Gift, Store, Clock
} from "lucide-react";
import { CardPreviewSection } from "@/app/discover/components/card-preview-section";

// FAQ 數據
export const foodDeliveryFaqData = [
  {
    question: "Foodpanda 用邊張信用卡最抵？",
    answer: "Foodpanda 最抵信用卡：恒生 MMPOWER（網購 5%）、HSBC Red Card（網購 4%）、安信 EarnMORE（2% 無上限）。Foodpanda 當網上簽賬，用網購高回贈卡最抵。"
  },
  {
    question: "Keeta 用邊張信用卡最抵？",
    answer: "Keeta 最抵信用卡：恒生 MMPOWER（網購 5%）、HSBC Red Card（網購 4%）。Keeta 當網上簽賬處理，網購卡有高回贈。另外 Keeta 經常有新用戶優惠碼。"
  },
  {
    question: "Deliveroo 用邊張信用卡最抵？",
    answer: "Deliveroo 最抵信用卡：恒生 MMPOWER（網購 5%）、HSBC Red Card（網購 4%）。Deliveroo 當網上簽賬，建議用網購高回贈信用卡。"
  },
  {
    question: "外賣 App 用信用卡定電子錢包？",
    answer: "建議用信用卡直接付款，回贈較高。部分外賣 App 支援 Apple Pay / Google Pay，可以用手機支付高回贈卡（如 EarnMORE 2%）付款。"
  },
  {
    question: "外賣平台點樣慳錢？",
    answer: "外賣慳錢方法：(1) 用高回贈信用卡；(2) 善用新用戶優惠碼；(3) 訂閱會員（如 pandapro）；(4) 比較唔同平台價格；(5) 用信用卡迎新優惠。"
  },
  {
    question: "外賣當網上簽賬定餐飲簽賬？",
    answer: "外賣 App（Foodpanda、Keeta、Deliveroo）通常當「網上簽賬」處理，唔係「餐飲簽賬」。所以用網購高回贈卡（如 Red Card 4%）會比餐飲卡更抵。"
  },
  {
    question: "Foodpanda Pro 值唔值得訂？",
    answer: "Foodpanda Pro 月費 $98，免運費 + 餐廳折扣。如果每月叫外賣 4 次以上，訂 Pro 通常更抵。配合高回贈信用卡可以慳更多。"
  },
  {
    question: "外賣平台有咩信用卡優惠？",
    answer: "各銀行經常推出外賣平台優惠，例如 HSBC 有 Foodpanda 折扣、Citi 有 Deliveroo 優惠等。建議留意銀行 App 嘅最新優惠。"
  }
];

// 外賣平台比較
const deliveryPlatforms = [
  {
    name: "Foodpanda",
    icon: "🐼",
    paymentType: "網上簽賬",
    supportedPayments: ["信用卡", "Apple Pay", "Google Pay", "PayMe", "AlipayHK"],
    features: ["餐廳選擇多", "pandapro 會員", "經常有優惠碼"],
    bestCards: ["hangseng-mmpower", "hsbc-red", "earnmore"],
  },
  {
    name: "Keeta",
    icon: "🛵",
    paymentType: "網上簽賬",
    supportedPayments: ["信用卡", "Apple Pay", "Google Pay", "AlipayHK"],
    features: ["美團旗下", "新用戶優惠多", "價格較平"],
    bestCards: ["hangseng-mmpower", "hsbc-red", "earnmore"],
  },
  {
    name: "Deliveroo",
    icon: "🦘",
    paymentType: "網上簽賬",
    supportedPayments: ["信用卡", "Apple Pay", "Google Pay"],
    features: ["高級餐廳選擇", "Deliveroo Plus 會員"],
    bestCards: ["hangseng-mmpower", "hsbc-red", "earnmore"],
  },
  {
    name: "OpenRice",
    icon: "🍽️",
    paymentType: "網上簽賬",
    supportedPayments: ["信用卡", "Apple Pay"],
    features: ["餐廳評價", "外賣 + 堂食訂位"],
    bestCards: ["hangseng-mmpower", "hsbc-red"],
  },
];

// 信用卡回贈比較
const cardComparison = [
  {
    card: "恒生 MMPOWER",
    id: "hangseng-mmpower",
    rate: "5%",
    cap: "$200/月",
    type: "網上簽賬",
    highlight: "最高回贈",
    note: "外賣當網購 5%（有上限）",
  },
  {
    card: "HSBC Red Card",
    id: "hsbc-red",
    rate: "4%",
    cap: "$10,000/月",
    type: "網上簽賬",
    highlight: "高上限",
    note: "外賣當網購 4%（上限高）",
  },
  {
    card: "安信 EarnMORE",
    id: "earnmore",
    rate: "2%",
    cap: "無上限",
    type: "Mobile Pay",
    highlight: "無上限",
    note: "用 Apple Pay 付款 2% 無上限",
  },
  {
    card: "渣打 Simply Cash",
    id: "sc-simply-cash",
    rate: "1.5%",
    cap: "無上限",
    type: "本地簽賬",
    highlight: "打底卡",
    note: "所有簽賬 1.5%",
  },
  {
    card: "Citi Cash Back",
    id: "citi-cashback",
    rate: "1%",
    cap: "無上限",
    type: "本地簽賬",
    highlight: "基本回贈",
    note: "外賣當本地 1%（唔係餐飲）",
  },
];

// 省錢攻略
const savingTips = [
  {
    tip: "用高回贈信用卡",
    icon: "💳",
    description: "MMPOWER 5% / Red Card 4% / EarnMORE 2%",
  },
  {
    tip: "善用新用戶優惠",
    icon: "🎁",
    description: "首單優惠、新用戶折扣碼",
  },
  {
    tip: "訂閱會員計劃",
    icon: "👑",
    description: "pandapro / Deliveroo Plus 免運費",
  },
  {
    tip: "比較唔同平台",
    icon: "🔍",
    description: "同一餐廳喺唔同平台價格可能唔同",
  },
  {
    tip: "留意銀行優惠",
    icon: "🏦",
    description: "各銀行定期推出外賣平台優惠",
  },
  {
    tip: "集運訂單",
    icon: "📦",
    description: "同朋友一齊叫可以慳運費",
  },
];

export function FoodDeliveryGuide() {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      {/* 引言 */}
      <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-6">
        Foodpanda、Keeta、Deliveroo 用邊張信用卡最抵？
        本文教你 <strong>{currentYear} 外賣平台信用卡攻略</strong>，
        外賣都可以賺高達 <strong>5% 回贈</strong>！
      </p>

      {/* 目錄 */}
      <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-10">
        <h2 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          📑 本文目錄
        </h2>
        <ul className="space-y-2 text-sm">
          <li><a href="#overview" className="text-blue-600 dark:text-blue-400 hover:underline">1. 外賣平台信用卡回贈點計？</a></li>
          <li><a href="#platforms" className="text-blue-600 dark:text-blue-400 hover:underline">2. 外賣平台比較</a></li>
          <li><a href="#card-comparison" className="text-blue-600 dark:text-blue-400 hover:underline">3. 外賣信用卡回贈比較</a></li>
          <li><a href="#foodpanda" className="text-blue-600 dark:text-blue-400 hover:underline">4. Foodpanda 攻略</a></li>
          <li><a href="#keeta" className="text-blue-600 dark:text-blue-400 hover:underline">5. Keeta 攻略</a></li>
          <li><a href="#deliveroo" className="text-blue-600 dark:text-blue-400 hover:underline">6. Deliveroo 攻略</a></li>
          <li><a href="#best-cards" className="text-blue-600 dark:text-blue-400 hover:underline">7. 外賣最佳信用卡排行榜</a></li>
          <li><a href="#saving-tips" className="text-blue-600 dark:text-blue-400 hover:underline">8. 外賣慳錢攻略</a></li>
          <li><a href="#bank-offers" className="text-blue-600 dark:text-blue-400 hover:underline">9. 銀行外賣優惠</a></li>
          <li><a href="#faq" className="text-blue-600 dark:text-blue-400 hover:underline">10. 常見問題 FAQ</a></li>
        </ul>
      </div>

      {/* Section 1: 總覽 */}
      <section id="overview" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Bike className="h-6 w-6 text-pink-500" />
          1. 外賣平台信用卡回贈點計？
        </h2>
        
        <p>
          外賣 App（Foodpanda、Keeta、Deliveroo）通常當<strong>「網上簽賬」</strong>處理，
          唔係「餐飲簽賬」！所以用網購高回贈卡最抵：
        </p>

        <div className="not-prose bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 rounded-2xl p-5 border border-pink-200 dark:border-pink-800 my-6">
          <h4 className="font-bold text-pink-800 dark:text-pink-200 mb-3">🍕 外賣回贈計算</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">❌ 餐飲卡回贈</p>
              <p className="font-bold text-gray-900 dark:text-white">外賣唔當餐飲！</p>
              <p className="text-xs text-gray-500">Citi Cash Back 餐飲 2% 唔適用</p>
            </div>
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">✅ 網購卡回贈</p>
              <p className="font-bold text-green-600 dark:text-green-400">外賣當網購！</p>
              <p className="text-xs text-gray-500">MMPOWER 5%、Red Card 4%</p>
            </div>
          </div>
        </div>

        <div className="not-prose bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-amber-700 dark:text-amber-300 text-sm">
              <strong>重要：</strong>外賣 App 付款通常當「網上簽賬」，
              唔係「餐飲簽賬」。用餐飲卡（如 <Link href="/cards/citi-cashback" className="underline">Citi Cash Back</Link> 餐飲 2%）叫外賣只有 1% 本地回贈！
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: 平台比較 */}
      <section id="platforms" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Store className="h-6 w-6 text-orange-500" />
          2. 外賣平台比較
        </h2>

        <div className="not-prose space-y-4 my-6">
          {deliveryPlatforms.map((platform, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">{platform.icon}</span>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">{platform.name}</h4>
                  <span className="text-xs bg-blue-100 dark:bg-blue-900/30 px-2 py-0.5 rounded text-blue-600 dark:text-blue-400">
                    {platform.paymentType}
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                <strong>支援付款：</strong>{platform.supportedPayments.join("、")}
              </p>
              <div className="flex flex-wrap gap-1 mb-2">
                {platform.features.map((feature, i) => (
                  <span key={i} className="inline-flex items-center px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs text-gray-600 dark:text-gray-400">
                    {feature}
                  </span>
                ))}
              </div>
              <p className="text-xs text-gray-500">
                <strong>推薦信用卡：</strong>
                {platform.bestCards.map((cardId, i) => (
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

      {/* Section 3: 信用卡比較 */}
      <section id="card-comparison" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Percent className="h-6 w-6 text-green-500" />
          3. 外賣信用卡回贈比較
        </h2>

        <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden my-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-green-50 dark:bg-green-900/20">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-green-600 dark:text-green-400">信用卡</th>
                  <th className="px-4 py-3 text-center font-medium text-green-600 dark:text-green-400">外賣回贈</th>
                  <th className="px-4 py-3 text-center font-medium text-green-600 dark:text-green-400">上限</th>
                  <th className="px-4 py-3 text-center font-medium text-green-600 dark:text-green-400">計算類別</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {cardComparison.map((card, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3">
                      <Link href={`/cards/${card.id}`} className="font-medium text-blue-600 hover:underline dark:text-blue-400">
                        {card.card}
                      </Link>
                      <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                        {card.highlight}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center font-bold text-green-600 dark:text-green-400">{card.rate}</td>
                    <td className="px-4 py-3 text-center text-gray-600 dark:text-gray-400">{card.cap}</td>
                    <td className="px-4 py-3 text-center text-xs text-gray-500">{card.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Card Preview Section */}
      <CardPreviewSection 
        title="📌 外賣推薦信用卡"
        subtitle="點擊查看詳細回贈條款及申請連結"
        cards={[
          { id: "hangseng-mmpower", highlight: "網購 5%" },
          { id: "hsbc-red", highlight: "網購 4%" },
          { id: "earnmore", highlight: "2% 無上限" },
          { id: "sc-simply-cash", highlight: "1.5% 無上限" },
        ]}
      />

      {/* Section 4: Foodpanda */}
      <section id="foodpanda" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          🐼 4. Foodpanda 攻略
        </h2>

        <div className="not-prose space-y-4 my-6">
          <div className="bg-pink-50 dark:bg-pink-900/20 rounded-xl p-4 border border-pink-200 dark:border-pink-800">
            <h4 className="font-bold text-pink-800 dark:text-pink-200 mb-2">🎯 Foodpanda 最佳信用卡</h4>
            <ul className="text-pink-700 dark:text-pink-300 text-sm space-y-1">
              <li>1️⃣ <Link href="/cards/hangseng-mmpower" className="underline">恒生 MMPOWER</Link> — 網購 5%（有上限）</li>
              <li>2️⃣ <Link href="/cards/hsbc-red" className="underline">HSBC Red Card</Link> — 網購 4%（高上限）</li>
              <li>3️⃣ <Link href="/cards/earnmore" className="underline">安信 EarnMORE</Link> — Apple Pay 2% 無上限</li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4">
            <h4 className="font-bold text-gray-900 dark:text-white mb-2">💡 Foodpanda 慳錢貼士</h4>
            <ul className="text-gray-600 dark:text-gray-400 text-sm space-y-1">
              <li>• <strong>pandapro：</strong>月費 $98，免運費 + 餐廳折扣</li>
              <li>• <strong>首單優惠：</strong>新用戶有大額折扣</li>
              <li>• <strong>留意優惠碼：</strong>經常有限時折扣碼</li>
              <li>• <strong>銀行優惠：</strong>HSBC 經常有 Foodpanda 優惠</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 5: Keeta */}
      <section id="keeta" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          🛵 5. Keeta 攻略
        </h2>

        <div className="not-prose space-y-4 my-6">
          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-4 border border-yellow-200 dark:border-yellow-800">
            <h4 className="font-bold text-yellow-800 dark:text-yellow-200 mb-2">🎯 Keeta 最佳信用卡</h4>
            <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1">
              <li>1️⃣ <Link href="/cards/hangseng-mmpower" className="underline">恒生 MMPOWER</Link> — 網購 5%（有上限）</li>
              <li>2️⃣ <Link href="/cards/hsbc-red" className="underline">HSBC Red Card</Link> — 網購 4%（高上限）</li>
              <li>3️⃣ <Link href="/cards/earnmore" className="underline">安信 EarnMORE</Link> — Apple Pay 2% 無上限</li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4">
            <h4 className="font-bold text-gray-900 dark:text-white mb-2">💡 Keeta 慳錢貼士</h4>
            <ul className="text-gray-600 dark:text-gray-400 text-sm space-y-1">
              <li>• <strong>新用戶優惠：</strong>Keeta 新用戶優惠碼非常吸引</li>
              <li>• <strong>價格較平：</strong>同一餐廳 Keeta 可能較 Foodpanda 平</li>
              <li>• <strong>美團旗下：</strong>經常有促銷活動</li>
              <li>• <strong>限時優惠：</strong>留意 App 內限時折扣</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 6: Deliveroo */}
      <section id="deliveroo" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          🦘 6. Deliveroo 攻略
        </h2>

        <div className="not-prose space-y-4 my-6">
          <div className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-4 border border-teal-200 dark:border-teal-800">
            <h4 className="font-bold text-teal-800 dark:text-teal-200 mb-2">🎯 Deliveroo 最佳信用卡</h4>
            <ul className="text-teal-700 dark:text-teal-300 text-sm space-y-1">
              <li>1️⃣ <Link href="/cards/hangseng-mmpower" className="underline">恒生 MMPOWER</Link> — 網購 5%（有上限）</li>
              <li>2️⃣ <Link href="/cards/hsbc-red" className="underline">HSBC Red Card</Link> — 網購 4%（高上限）</li>
              <li>3️⃣ <Link href="/cards/earnmore" className="underline">安信 EarnMORE</Link> — Apple Pay 2% 無上限</li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4">
            <h4 className="font-bold text-gray-900 dark:text-white mb-2">💡 Deliveroo 慳錢貼士</h4>
            <ul className="text-gray-600 dark:text-gray-400 text-sm space-y-1">
              <li>• <strong>Deliveroo Plus：</strong>月費免運費計劃</li>
              <li>• <strong>高級餐廳：</strong>有較多中高檔餐廳選擇</li>
              <li>• <strong>Citi 優惠：</strong>Citi 經常有 Deliveroo 優惠</li>
              <li>• <strong>首單優惠：</strong>新用戶有折扣</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 7: 最佳卡排行 */}
      <section id="best-cards" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Trophy className="h-6 w-6 text-amber-500" />
          7. 外賣最佳信用卡排行榜
        </h2>

        <div className="not-prose space-y-4 my-6">
          {[
            { rank: "🥇", card: "恒生 MMPOWER", id: "hangseng-mmpower", rate: "5%", reason: "網購 5% 最高回贈（有月上限）" },
            { rank: "🥈", card: "HSBC Red Card", id: "hsbc-red", rate: "4%", reason: "網購 4%，上限高，適合大量叫外賣" },
            { rank: "🥉", card: "安信 EarnMORE", id: "earnmore", rate: "2%", reason: "Apple Pay 2% 無上限" },
            { rank: "4️⃣", card: "渣打 Simply Cash", id: "sc-simply-cash", rate: "1.5%", reason: "所有簽賬 1.5% 無上限" },
          ].map((card, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 flex items-center gap-4">
              <span className="text-2xl">{card.rank}</span>
              <div className="flex-1">
                <Link href={`/cards/${card.id}`} className="font-bold text-blue-600 hover:underline dark:text-blue-400">{card.card}</Link>
                <p className="text-sm text-gray-600 dark:text-gray-400">{card.reason}</p>
              </div>
              <span className="font-bold text-green-600 dark:text-green-400 text-lg">{card.rate}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Section 8: 慳錢攻略 */}
      <section id="saving-tips" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Zap className="h-6 w-6 text-yellow-500" />
          8. 外賣慳錢攻略
        </h2>

        <div className="not-prose grid md:grid-cols-2 gap-3 my-6">
          {savingTips.map((tip, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 flex items-start gap-3">
              <span className="text-2xl">{tip.icon}</span>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-1">{tip.tip}</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{tip.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 9: 銀行優惠 */}
      <section id="bank-offers" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Gift className="h-6 w-6 text-purple-500" />
          9. 銀行外賣優惠
        </h2>

        <p>
          各銀行經常推出外賣平台優惠，建議留意：
        </p>

        <div className="not-prose space-y-3 my-6">
          {[
            { bank: "HSBC", offers: "Foodpanda 折扣、指定餐廳優惠" },
            { bank: "Citi", offers: "Deliveroo 折扣、外賣平台優惠碼" },
            { bank: "恒生", offers: "MMPOWER 網購高回贈" },
            { bank: "渣打", offers: "外賣平台優惠碼" },
          ].map((item, index) => (
            <div key={index} className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 flex items-center gap-4">
              <span className="font-bold text-purple-800 dark:text-purple-200 min-w-[60px]">{item.bank}</span>
              <p className="text-purple-700 dark:text-purple-300 text-sm">{item.offers}</p>
            </div>
          ))}
        </div>

        <div className="not-prose bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <p className="text-blue-700 dark:text-blue-300 text-sm">
              <strong>提示：</strong>定期查看銀行 App 或官網嘅最新優惠，
              各銀行外賣優惠經常更新！
            </p>
          </div>
        </div>
      </section>

      {/* Section 10: FAQ */}
      <section id="faq" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          ❓ 10. 常見問題 FAQ
        </h2>
        
        <div className="not-prose space-y-4">
          {foodDeliveryFaqData.map((faq, index) => (
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
      <div className="not-prose bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl p-6 text-white mb-10">
        <h3 className="text-xl font-bold mb-2">🍕 想知邊張信用卡外賣回贈最高？</h3>
        <p className="mb-4 opacity-90">用我哋嘅計算機，即刻搵到最適合你嘅信用卡！</p>
        <Link href="/">
          <Button className="bg-white text-pink-600 hover:bg-gray-100">
            <Calculator className="h-4 w-4 mr-2" />
            立即計算回贈
          </Button>
        </Link>
      </div>

      {/* Related Links */}
      <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">🔗 相關文章</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <Link href="/discover/dining-guide" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
            <Store className="h-5 w-5 text-emerald-600" />
            <span>餐飲信用卡攻略</span>
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

