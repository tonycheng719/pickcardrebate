// 拼多多信用卡攻略
// 用於 /discover/pinduoduo-guide 頁面

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  ChevronRight, ChevronDown, CreditCard, ShoppingBag, Globe,
  Calculator, Trophy, DollarSign, CheckCircle, AlertTriangle,
  Star, Info, Zap, Percent, Gift, Truck, Smartphone
} from "lucide-react";
import { CardPreviewSection } from "@/app/discover/components/card-preview-section";

// FAQ 數據
export const pinduoduoFaqData = [
  {
    question: "拼多多用邊張信用卡最抵？",
    answer: "拼多多最抵信用卡：恒生 MMPOWER（網購 5%）、HSBC Red Card（網購 4%）。用 AlipayHK 付款再綁定信用卡，可以免手續費兼賺網購回贈。"
  },
  {
    question: "拼多多有信用卡手續費嗎？",
    answer: "直接用信用卡付款有約 3% 手續費（外幣交易費）。建議用 AlipayHK 付款，可以免手續費，再用高回贈信用卡增值 AlipayHK。"
  },
  {
    question: "拼多多用 AlipayHK 點付款？",
    answer: "拼多多支援 AlipayHK 付款，選擇「支付寶」付款方式，會自動跳轉到 AlipayHK App。AlipayHK 可綁定信用卡，賺取網購回贈。"
  },
  {
    question: "拼多多同淘寶邊個抵？",
    answer: "拼多多價格通常比淘寶更平，但質素參差。建議睇評價、選擇「百億補貼」商品。兩者都可用 AlipayHK 免手續費付款。"
  },
  {
    question: "拼多多運費貴嗎？",
    answer: "拼多多運費視乎商品重量及集運方式。部分商品有「免運費」標示。可選擇官方集運或第三方集運（如菜鳥、順豐）比較價格。"
  },
  {
    question: "拼多多退款點處理？",
    answer: "拼多多退款會退回原支付方式。用 AlipayHK 付款，退款會退回 AlipayHK 餘額。處理時間約 3-7 個工作天。"
  },
  {
    question: "拼多多「百億補貼」係咩？",
    answer: "「百億補貼」係拼多多嘅特價專區，商品經過官方審核，價格較低且保證正品。建議優先選購百億補貼商品。"
  },
  {
    question: "拼多多可以用港幣付款嗎？",
    answer: "拼多多商品以人民幣標價。用 AlipayHK 付款會自動兌換，匯率較銀行優惠。直接用信用卡付款會收取外幣交易費。"
  }
];

// 付款方式比較
const paymentMethods = [
  {
    method: "AlipayHK",
    icon: "💙",
    fee: "免手續費",
    feePercent: "0%",
    rebate: "信用卡增值回贈",
    highlight: "推薦",
    note: "免手續費 + 信用卡回贈",
    bestCards: ["hangseng-mmpower", "hsbc-red"],
  },
  {
    method: "信用卡直接付款",
    icon: "💳",
    fee: "外幣交易費",
    feePercent: "約 3%",
    rebate: "網購/海外回贈",
    highlight: "有手續費",
    note: "有 CBF，但可用免 CBF 卡",
    bestCards: ["sc-cathay", "sc-simply-cash"],
  },
  {
    method: "WeChat Pay HK",
    icon: "💚",
    fee: "免手續費",
    feePercent: "0%",
    rebate: "信用卡增值回贈",
    highlight: "可用",
    note: "部分商戶支援",
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
    method: "AlipayHK 增值",
    highlight: "最高回贈",
    note: "AlipayHK 增值當網購 5%",
  },
  {
    card: "HSBC Red Card",
    id: "hsbc-red",
    rate: "4%",
    cap: "$10,000/月",
    method: "AlipayHK 增值",
    highlight: "高上限",
    note: "AlipayHK 增值當網購 4%",
  },
  {
    card: "渣打國泰 Mastercard",
    id: "sc-cathay",
    rate: "$4/里",
    cap: "無上限",
    method: "直接付款",
    highlight: "免 CBF",
    note: "直接付款免 CBF + 儲里數",
  },
  {
    card: "渣打 Simply Cash",
    id: "sc-simply-cash",
    rate: "2%",
    cap: "無上限",
    method: "直接付款",
    highlight: "免 CBF",
    note: "直接付款免 CBF + 2%",
  },
  {
    card: "安信 EarnMORE",
    id: "earnmore",
    rate: "2%",
    cap: "無上限",
    method: "AlipayHK / 直接",
    highlight: "無上限",
    note: "所有消費 2% 無上限",
  },
];

// 回贈計算例子
const rebateExamples = [
  {
    amount: 500,
    methods: [
      { method: "AlipayHK + MMPOWER 5%", fee: 0, rebate: 25, net: 25 },
      { method: "AlipayHK + Red Card 4%", fee: 0, rebate: 20, net: 20 },
      { method: "直接付款 + SC Simply Cash", fee: 0, rebate: 10, net: 10 },
      { method: "直接付款 + 普通卡 1%", fee: 15, rebate: 5, net: -10 },
    ],
  },
];

// 省錢攻略
const savingTips = [
  {
    tip: "用 AlipayHK 付款",
    icon: "💙",
    description: "免手續費 + 信用卡增值回贈",
  },
  {
    tip: "選購「百億補貼」",
    icon: "🏷️",
    description: "官方認證正品 + 特價",
  },
  {
    tip: "留意優惠券",
    icon: "🎫",
    description: "首頁領取平台優惠券",
  },
  {
    tip: "比較集運價格",
    icon: "📦",
    description: "官方集運 vs 第三方集運",
  },
  {
    tip: "睇評價先買",
    icon: "⭐",
    description: "睇買家評價避免中伏",
  },
  {
    tip: "善用退款保障",
    icon: "🔄",
    description: "有問題可申請退款",
  },
];

// 拼多多 vs 淘寶
const platformComparison = [
  { feature: "價格", pinduoduo: "較平", taobao: "一般" },
  { feature: "質素", pinduoduo: "參差", taobao: "較穩定" },
  { feature: "商品種類", pinduoduo: "多", taobao: "更多" },
  { feature: "百億補貼", pinduoduo: "✅ 有", taobao: "❌ 無" },
  { feature: "AlipayHK", pinduoduo: "✅ 支援", taobao: "✅ 支援" },
  { feature: "集運", pinduoduo: "官方 + 第三方", taobao: "菜鳥 + 第三方" },
];

export function PinduoduoGuide() {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      {/* 引言 */}
      <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-6">
        拼多多購物用邊張信用卡最抵？有手續費嗎？
        本文教你 <strong>{currentYear} 拼多多信用卡攻略</strong>，
        免手續費兼賺高達 <strong>5% 回贈</strong>！
      </p>

      {/* 目錄 */}
      <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-10">
        <h2 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          📑 本文目錄
        </h2>
        <ul className="space-y-2 text-sm">
          <li><a href="#overview" className="text-blue-600 dark:text-blue-400 hover:underline">1. 拼多多信用卡回贈點計？</a></li>
          <li><a href="#payment-methods" className="text-blue-600 dark:text-blue-400 hover:underline">2. 付款方式比較</a></li>
          <li><a href="#card-comparison" className="text-blue-600 dark:text-blue-400 hover:underline">3. 信用卡回贈比較</a></li>
          <li><a href="#alipay-strategy" className="text-blue-600 dark:text-blue-400 hover:underline">4. AlipayHK 付款攻略</a></li>
          <li><a href="#rebate-calc" className="text-blue-600 dark:text-blue-400 hover:underline">5. 回贈計算例子</a></li>
          <li><a href="#vs-taobao" className="text-blue-600 dark:text-blue-400 hover:underline">6. 拼多多 vs 淘寶</a></li>
          <li><a href="#tips" className="text-blue-600 dark:text-blue-400 hover:underline">7. 拼多多慳錢攻略</a></li>
          <li><a href="#faq" className="text-blue-600 dark:text-blue-400 hover:underline">8. 常見問題 FAQ</a></li>
        </ul>
      </div>

      {/* Section 1: 總覽 */}
      <section id="overview" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <ShoppingBag className="h-6 w-6 text-orange-500" />
          1. 拼多多信用卡回贈點計？
        </h2>
        
        <p>
          拼多多以人民幣計價，直接用信用卡付款會有<strong>外幣交易費（約 3%）</strong>。
          但用 <strong>AlipayHK</strong> 付款可以免手續費！
        </p>

        <div className="not-prose bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl p-5 border border-orange-200 dark:border-orange-800 my-6">
          <h4 className="font-bold text-orange-800 dark:text-orange-200 mb-3">🛒 拼多多付款攻略</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
              <p className="text-sm text-red-600 font-bold mb-1">❌ 直接信用卡付款</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">有約 3% 外幣交易費</p>
              <p className="text-xs text-gray-500">（除非用免 CBF 卡）</p>
            </div>
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
              <p className="text-sm text-green-600 font-bold mb-1">✅ AlipayHK 付款</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">免手續費 + 信用卡回贈</p>
              <p className="text-xs text-gray-500">MMPOWER 5% / Red Card 4%</p>
            </div>
          </div>
        </div>

        <div className="not-prose bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
            <p className="text-green-700 dark:text-green-300 text-sm">
              <strong>最佳策略：</strong>用 <Link href="/cards/hangseng-mmpower" className="underline">MMPOWER</Link> 或 <Link href="/cards/hsbc-red" className="underline">Red Card</Link> 增值 AlipayHK，
              再用 AlipayHK 喺拼多多付款，免手續費兼賺網購 5% / 4% 回贈！
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: 付款方式比較 */}
      <section id="payment-methods" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Smartphone className="h-6 w-6 text-blue-500" />
          2. 付款方式比較
        </h2>

        <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden my-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-blue-50 dark:bg-blue-900/20">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-blue-600 dark:text-blue-400">付款方式</th>
                  <th className="px-4 py-3 text-center font-medium text-blue-600 dark:text-blue-400">手續費</th>
                  <th className="px-4 py-3 text-center font-medium text-blue-600 dark:text-blue-400">回贈來源</th>
                  <th className="px-4 py-3 text-left font-medium text-blue-600 dark:text-blue-400">推薦信用卡</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {paymentMethods.map((method, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{method.icon}</span>
                        <div>
                          <p className="font-medium">{method.method}</p>
                          <span className={`text-xs px-2 py-0.5 rounded ${
                            method.highlight === "推薦" 
                              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                          }`}>
                            {method.highlight}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`font-bold ${method.feePercent === "0%" ? "text-green-600" : "text-red-600"}`}>
                        {method.feePercent}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center text-xs text-gray-600 dark:text-gray-400">{method.rebate}</td>
                    <td className="px-4 py-3 text-xs">
                      {method.bestCards.map((cardId, i) => (
                        <span key={i}>
                          {i > 0 && "、"}
                          <Link href={`/cards/${cardId}`} className="text-blue-600 hover:underline">
                            {cardComparison.find(c => c.id === cardId)?.card.replace(" Mastercard", "").replace(" Visa", "") || cardId}
                          </Link>
                        </span>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section 3: 信用卡比較 */}
      <section id="card-comparison" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Percent className="h-6 w-6 text-green-500" />
          3. 信用卡回贈比較
        </h2>

        <div className="not-prose space-y-4 my-6">
          {cardComparison.map((card, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4">
              <div className="flex items-start justify-between">
                <div>
                  <Link href={`/cards/${card.id}`} className="font-bold text-blue-600 hover:underline dark:text-blue-400">{card.card}</Link>
                  <span className={`ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-bold ${
                    card.highlight === "最高回贈" || card.highlight === "免 CBF"
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
                  }`}>
                    {card.highlight}
                  </span>
                </div>
                <span className="font-bold text-green-600 dark:text-green-400">{card.rate}</span>
              </div>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                <span>付款方式：{card.method}</span>
                <span>上限：{card.cap}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">{card.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Card Preview Section */}
      <CardPreviewSection 
        title="📌 拼多多推薦信用卡"
        subtitle="點擊查看詳細回贈條款及申請連結"
        cards={[
          { id: "hangseng-mmpower", highlight: "網購 5%" },
          { id: "hsbc-red", highlight: "網購 4%" },
          { id: "sc-simply-cash", highlight: "免 CBF" },
          { id: "earnmore", highlight: "2% 無上限" },
        ]}
      />

      {/* Section 4: AlipayHK 攻略 */}
      <section id="alipay-strategy" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          💙 4. AlipayHK 付款攻略
        </h2>

        <p>
          用 AlipayHK 喺拼多多付款係最抵嘅方法，可以免手續費兼賺信用卡回贈：
        </p>

        <div className="not-prose bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-5 border border-blue-200 dark:border-blue-800 my-6">
          <h4 className="font-bold text-blue-800 dark:text-blue-200 mb-3">📱 AlipayHK 付款步驟</h4>
          <div className="space-y-3">
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 flex items-start gap-3">
              <span className="font-bold text-blue-600">1</span>
              <div>
                <p className="text-sm font-bold text-gray-900 dark:text-white">綁定高回贈信用卡</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">喺 AlipayHK 綁定 <Link href="/cards/hangseng-mmpower" className="text-blue-600 hover:underline">MMPOWER</Link> 或 <Link href="/cards/hsbc-red" className="text-blue-600 hover:underline">Red Card</Link></p>
              </div>
            </div>
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 flex items-start gap-3">
              <span className="font-bold text-blue-600">2</span>
              <div>
                <p className="text-sm font-bold text-gray-900 dark:text-white">拼多多選擇「支付寶」付款</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">結帳時選擇「支付寶」，會跳轉到 AlipayHK</p>
              </div>
            </div>
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 flex items-start gap-3">
              <span className="font-bold text-blue-600">3</span>
              <div>
                <p className="text-sm font-bold text-gray-900 dark:text-white">用信用卡付款</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">喺 AlipayHK 選擇已綁定嘅信用卡付款</p>
              </div>
            </div>
          </div>
        </div>

        <div className="not-prose bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-amber-700 dark:text-amber-300 text-sm">
              <strong>注意：</strong>AlipayHK 增值 / 付款通常當「網上簽賬」計算回贈，
              但每間銀行定義可能唔同，建議先用小額測試。
            </p>
          </div>
        </div>
      </section>

      {/* Section 5: 回贈計算 */}
      <section id="rebate-calc" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Calculator className="h-6 w-6 text-teal-500" />
          5. 回贈計算例子
        </h2>

        <div className="not-prose bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 my-6">
          <h4 className="font-bold text-gray-900 dark:text-white mb-3">📊 拼多多購物 HK$500 回贈對比</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-3 py-2 text-left">付款方式</th>
                  <th className="px-3 py-2 text-center">手續費</th>
                  <th className="px-3 py-2 text-center">回贈</th>
                  <th className="px-3 py-2 text-center">淨回贈</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {rebateExamples[0].methods.map((method, index) => (
                  <tr key={index}>
                    <td className="px-3 py-2">{method.method}</td>
                    <td className="px-3 py-2 text-center text-red-600">{method.fee > 0 ? `-$${method.fee}` : "-"}</td>
                    <td className="px-3 py-2 text-center text-green-600">+${method.rebate}</td>
                    <td className={`px-3 py-2 text-center font-bold ${method.net >= 0 ? "text-green-600" : "text-red-600"}`}>
                      {method.net >= 0 ? `+$${method.net}` : `-$${Math.abs(method.net)}`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            *用 <Link href="/cards/hangseng-mmpower" className="text-blue-600 hover:underline">MMPOWER</Link> + AlipayHK 比直接用普通卡每 $500 可多賺 <strong>$35</strong>！
          </p>
        </div>
      </section>

      {/* Section 6: 拼多多 vs 淘寶 */}
      <section id="vs-taobao" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Trophy className="h-6 w-6 text-amber-500" />
          6. 拼多多 vs 淘寶
        </h2>

        <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden my-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-amber-50 dark:bg-amber-900/20">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-amber-600 dark:text-amber-400">比較項目</th>
                  <th className="px-4 py-3 text-center font-medium text-orange-600 dark:text-orange-400">🟠 拼多多</th>
                  <th className="px-4 py-3 text-center font-medium text-red-600 dark:text-red-400">🔴 淘寶</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {platformComparison.map((item, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3 font-medium">{item.feature}</td>
                    <td className="px-4 py-3 text-center">{item.pinduoduo}</td>
                    <td className="px-4 py-3 text-center">{item.taobao}</td>
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
              <strong>建議：</strong>拼多多「百億補貼」商品通常較平且質素有保證。
              一般商品建議睇評價，或者去<Link href="/discover/taobao-guide" className="underline">淘寶</Link>購買。
            </p>
          </div>
        </div>
      </section>

      {/* Section 7: 慳錢攻略 */}
      <section id="tips" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Zap className="h-6 w-6 text-yellow-500" />
          7. 拼多多慳錢攻略
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

        <div className="not-prose bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl p-4 border border-orange-200 dark:border-orange-800">
          <h4 className="font-bold text-orange-800 dark:text-orange-200 mb-2">🏷️ 百億補貼必買推薦</h4>
          <p className="text-orange-700 dark:text-orange-300 text-sm">
            百億補貼商品經過官方審核，價格較低且保證正品。<br/>
            熱門類別：<strong>手機配件、電子產品、家居用品、服飾</strong>
          </p>
        </div>
      </section>

      {/* Section 8: FAQ */}
      <section id="faq" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          ❓ 8. 常見問題 FAQ
        </h2>
        
        <div className="not-prose space-y-4">
          {pinduoduoFaqData.map((faq, index) => (
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
        <h3 className="text-xl font-bold mb-2">🛒 想知邊張信用卡拼多多回贈最高？</h3>
        <p className="mb-4 opacity-90">用我哋嘅計算機，即刻搵到最適合你嘅信用卡！</p>
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
          <Link href="/discover/taobao-guide" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
            <ShoppingBag className="h-5 w-5 text-emerald-600" />
            <span>淘寶信用卡攻略</span>
            <ChevronRight className="h-4 w-4 ml-auto text-gray-400" />
          </Link>
          <Link href="/discover/online-shopping-guide" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
            <Globe className="h-5 w-5 text-emerald-600" />
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

