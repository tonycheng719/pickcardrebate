// 里數 vs 現金回贈攻略文章內容組件
// 用於 /discover/miles-vs-cashback 頁面

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  AlertTriangle, CheckCircle, XCircle, ChevronRight, ChevronDown,
  CreditCard, Globe, Plane, Calculator, Trophy, DollarSign,
  TrendingUp, Users, Target, Zap, Clock, Star, Wallet, Scale
} from "lucide-react";

// FAQ 數據
export const milesVsCashbackFaqData = [
  {
    question: "里數 vs 現金回贈，邊個抵啲？",
    answer: "視乎你嘅消費習慣同旅遊頻率。如果你每年飛 2-3 次或以上，而且識得用里數換 Business Class，里數價值可高達 $0.15-0.20/里。但如果你唔常飛或只換經濟艙，現金回贈通常較實際，回贈率 1-2% 已經好穩陣。"
  },
  {
    question: "1 里數值幾錢？",
    answer: "Asia Miles 一般估值約 $0.08-0.12/里。但實際價值視乎你換咩機票：經濟艙約 $0.06-0.08、商務艙約 $0.12-0.15、頭等艙可達 $0.15-0.20。換越貴嘅艙位，里數價值越高。"
  },
  {
    question: "里數現金兌換率點計？",
    answer: "里數現金兌換率 = 機票現金價格 ÷ 所需里數。例如：一張日本經濟艙來回票賣 $4,000，換里數需要 40,000 里，兌換率就係 $4,000 ÷ 40,000 = $0.10/里。"
  },
  {
    question: "里數換機票有咩注意事項？",
    answer: "1) 提早 330 日前開放訂位，越早訂越多位；2) 避開旺季（聖誕、新年、暑假）；3) 善用 Stopover 同 Open Jaw；4) 留意里數過期日（Asia Miles 18個月無活動會過期）；5) 商務艙抵過經濟艙。"
  },
  {
    question: "買里數抵唔抵？",
    answer: "通常唔抵！Asia Miles 官方買里數約 US$0.028/里（約 HK$0.22/里），遠高於正常估值。但偶爾有促銷（買一送一等），如果啱啱差少少里數換到機票，可以考慮。一般建議透過信用卡簽賬儲里數更划算。"
  },
  {
    question: "里數加現金（Cash + Miles）抵唔抵？",
    answer: "通常唔抵！里數加現金嘅兌換率往往較差。例如 40,000 里換經濟艙 vs 20,000 里 + $2,000，計返 20,000 里只換到 $2,000，即 $0.10/里。如果你有足夠里數，建議全里數兌換更著數。"
  },
  {
    question: "里數信用卡邊張最抵？",
    answer: "香港熱門里數信用卡包括：渣打國泰 Mastercard（$4/里）、Citi PremierMiles（$3/里海外）、HSBC EveryMile（$5/里）、DBS Black Card（$6/里）等。選擇時要考慮年薪要求、年費、以及你嘅消費類別。"
  },
  {
    question: "現金回贈信用卡邊張最抵？",
    answer: "香港熱門現金回贈信用卡包括：渣打 Simply Cash（1.5% 無上限）、HSBC Red Card（網購 4%）、Citi Cash Back（本地餐飲 2%）、恒生 MMPOWER（網購 5%）等。揀卡要睇你最常消費嘅類別。"
  }
];

// 里數價值比較數據
export const milesValueData = [
  { route: "香港 ↔ 東京", class: "經濟艙", miles: 20000, cashPrice: 2500, valuePerMile: 0.125 },
  { route: "香港 ↔ 東京", class: "商務艙", miles: 40000, cashPrice: 12000, valuePerMile: 0.30 },
  { route: "香港 ↔ 台北", class: "經濟艙", miles: 15000, cashPrice: 1500, valuePerMile: 0.10 },
  { route: "香港 ↔ 曼谷", class: "經濟艙", miles: 20000, cashPrice: 2000, valuePerMile: 0.10 },
  { route: "香港 ↔ 曼谷", class: "商務艙", miles: 40000, cashPrice: 10000, valuePerMile: 0.25 },
  { route: "香港 ↔ 倫敦", class: "經濟艙", miles: 60000, cashPrice: 6000, valuePerMile: 0.10 },
  { route: "香港 ↔ 倫敦", class: "商務艙", miles: 100000, cashPrice: 40000, valuePerMile: 0.40 },
  { route: "香港 ↔ 紐約", class: "經濟艙", miles: 70000, cashPrice: 7000, valuePerMile: 0.10 },
  { route: "香港 ↔ 紐約", class: "商務艙", miles: 120000, cashPrice: 50000, valuePerMile: 0.42 },
];

// 信用卡比較數據
export const cardComparisonData = {
  miles: [
    { card: "渣打國泰 Mastercard", rate: "$4/里", annual: "$2,000", bonus: "60,000 里迎新" },
    { card: "Citi PremierMiles", rate: "$3/里(海外)", annual: "$1,800", bonus: "108,000 里迎新" },
    { card: "HSBC EveryMile", rate: "$5/里", annual: "$2,000", bonus: "40,000 里迎新" },
    { card: "DBS Black Card", rate: "$6/里", annual: "$2,000", bonus: "50,000 里迎新" },
    { card: "AE Explorer", rate: "$4/里", annual: "$1,800", bonus: "40,000 里迎新" },
  ],
  cashback: [
    { card: "渣打 Simply Cash", rate: "1.5% 無上限", annual: "永久免年費", bonus: "$2,000 迎新" },
    { card: "HSBC Red Card", rate: "網購 4%", annual: "免年費", bonus: "$800 迎新" },
    { card: "Citi Cash Back", rate: "餐飲 2%", annual: "$1,200", bonus: "$1,800 迎新" },
    { card: "恒生 MMPOWER", rate: "網購 5%", annual: "$300", bonus: "$700 迎新" },
    { card: "安信 EarnMORE", rate: "2% 無上限", annual: "永久免年費", bonus: "OTO 迎新" },
  ]
};

export function MilesVsCashbackGuide() {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      {/* 引言 */}
      <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-6">
        信用卡回贈有兩大陣營：<strong>儲里數</strong>定<strong>現金回贈</strong>？
        呢個問題困擾好多人！究竟 <strong>1 里數值幾錢</strong>？<strong>里數換機票</strong>抵唔抵？
        <strong>買里數</strong>又值唔值？本文用數據同例子，幫你分析<strong>里數 vs 現金回贈</strong>邊樣最啱你！
      </p>

      {/* 目錄 */}
      <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-10">
        <h2 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          📑 本文目錄
        </h2>
        <ul className="space-y-2 text-sm">
          <li><a href="#what-is-miles" className="text-blue-600 dark:text-blue-400 hover:underline">1. 什麼是里數？什麼是現金回贈？</a></li>
          <li><a href="#miles-value" className="text-blue-600 dark:text-blue-400 hover:underline">2. 1 里數值幾錢？里數價值計算</a></li>
          <li><a href="#exchange-rate" className="text-blue-600 dark:text-blue-400 hover:underline">3. 里數現金兌換率完全解析</a></li>
          <li><a href="#redeem-tickets" className="text-blue-600 dark:text-blue-400 hover:underline">4. 里數換機票攻略</a></li>
          <li><a href="#card-comparison" className="text-blue-600 dark:text-blue-400 hover:underline">5. 里數信用卡 vs 現金回贈信用卡</a></li>
          <li><a href="#buy-miles" className="text-blue-600 dark:text-blue-400 hover:underline">6. 買里數抵唔抵？</a></li>
          <li><a href="#cash-plus-miles" className="text-blue-600 dark:text-blue-400 hover:underline">7. 里數加現金抵唔抵？</a></li>
          <li><a href="#who-suits" className="text-blue-600 dark:text-blue-400 hover:underline">8. 邊種人適合儲里數？邊種人適合現金回贈？</a></li>
          <li><a href="#faq" className="text-blue-600 dark:text-blue-400 hover:underline">9. 常見問題 FAQ</a></li>
        </ul>
      </div>

      {/* Section 1: 什麼是里數 */}
      <section id="what-is-miles" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Plane className="h-6 w-6 text-blue-500" />
          1. 什麼是里數？什麼是現金回贈？
        </h2>
        
        <div className="not-prose grid md:grid-cols-2 gap-4 my-6">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-5 border border-blue-200 dark:border-blue-800">
            <h3 className="font-bold text-blue-800 dark:text-blue-200 mb-3 flex items-center gap-2">
              <Plane className="h-5 w-5" /> 飛行里數
            </h3>
            <p className="text-blue-700 dark:text-blue-300 text-sm mb-3">
              里數係航空公司嘅積分計劃，用信用卡簽賬可以儲里數，
              儲夠一定數量就可以<strong>換免費機票、升級艙位</strong>等。
            </p>
            <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
              <li>✈️ 香港最常見：Asia Miles（國泰）</li>
              <li>✈️ 其他：Avios、KrisFlyer、ANA</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-5 border border-green-200 dark:border-green-800">
            <h3 className="font-bold text-green-800 dark:text-green-200 mb-3 flex items-center gap-2">
              <DollarSign className="h-5 w-5" /> 現金回贈
            </h3>
            <p className="text-green-700 dark:text-green-300 text-sm mb-3">
              現金回贈係信用卡直接回贈嘅金額，
              可以用嚟<strong>扣減簽賬、存入戶口</strong>，簡單直接。
            </p>
            <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
              <li>💰 回贈率通常 0.4% - 4%</li>
              <li>💰 無需計算，即時知道回贈幾多</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 2: 里數價值 */}
      <section id="miles-value" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-purple-500" />
          2. 1 里數值幾錢？里數價值計算
        </h2>

        <p>
          好多人問：<strong>1 里數究竟值幾錢</strong>？答案係：<strong>視乎你點用！</strong>
        </p>

        <div className="not-prose bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-4 my-6">
          <h4 className="font-bold text-purple-800 dark:text-purple-200 mb-2">💡 里數價值公式</h4>
          <p className="text-purple-700 dark:text-purple-300 text-lg font-mono">
            <strong>里數價值 = 機票現金價格 ÷ 所需里數</strong>
          </p>
          <p className="text-purple-600 dark:text-purple-400 text-sm mt-2">
            例：$12,000 商務艙 ÷ 40,000 里 = <strong>$0.30/里</strong>
          </p>
        </div>

        <h3 className="text-xl font-bold mt-6 mb-3">📊 Asia Miles 里數價值參考表</h3>

        <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden my-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400">航線</th>
                  <th className="px-4 py-3 text-center font-medium text-gray-500 dark:text-gray-400">艙位</th>
                  <th className="px-4 py-3 text-center font-medium text-gray-500 dark:text-gray-400">所需里數</th>
                  <th className="px-4 py-3 text-center font-medium text-gray-500 dark:text-gray-400">現金價約</th>
                  <th className="px-4 py-3 text-center font-medium text-gray-500 dark:text-gray-400">里數價值</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {milesValueData.map((row, index) => (
                  <tr key={index} className={row.class === "商務艙" ? "bg-amber-50/50 dark:bg-amber-900/10" : ""}>
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{row.route}</td>
                    <td className="px-4 py-3 text-center">
                      {row.class === "商務艙" ? (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                          {row.class}
                        </span>
                      ) : (
                        <span className="text-gray-600 dark:text-gray-400">{row.class}</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center text-gray-900 dark:text-white">{row.miles.toLocaleString()}</td>
                    <td className="px-4 py-3 text-center text-gray-900 dark:text-white">${row.cashPrice.toLocaleString()}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`font-bold ${row.valuePerMile >= 0.20 ? 'text-green-600 dark:text-green-400' : row.valuePerMile >= 0.12 ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'}`}>
                        ${row.valuePerMile.toFixed(2)}/里
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="not-prose bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
          <h4 className="font-bold text-amber-800 dark:text-amber-200 mb-2">⭐ 重點發現</h4>
          <ul className="text-amber-700 dark:text-amber-300 text-sm space-y-1">
            <li>• <strong>商務艙</strong>里數價值通常比經濟艙<strong>高 2-4 倍</strong></li>
            <li>• <strong>長途航線</strong>（歐美）里數價值最高，可達 <strong>$0.40/里</strong></li>
            <li>• <strong>短途經濟艙</strong>（台北、東京）價值約 <strong>$0.08-0.12/里</strong></li>
          </ul>
        </div>
      </section>

      {/* Section 3: 里數現金兌換率 */}
      <section id="exchange-rate" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Scale className="h-6 w-6 text-teal-500" />
          3. 里數現金兌換率完全解析
        </h2>

        <p>
          了解<strong>里數現金兌換率</strong>，可以幫你決定儲里數抵唔抵。
          一般嚟講，如果你嘅「<strong>里數價值 × 信用卡里數回贈率</strong>」高過現金回贈，就值得儲里數。
        </p>

        <div className="not-prose bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800 rounded-xl p-4 my-6">
          <h4 className="font-bold text-teal-800 dark:text-teal-200 mb-3">🧮 計算例子</h4>
          <div className="text-teal-700 dark:text-teal-300 text-sm space-y-3">
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
              <p className="font-bold mb-1">情境：每月簽賬 $20,000</p>
              <p><strong>里數卡（$4/里）：</strong>$20,000 ÷ 4 = 5,000 里</p>
              <p>如果里數價值 $0.12/里，實際價值 = 5,000 × $0.12 = <strong>$600</strong></p>
            </div>
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
              <p><strong>現金回贈卡（1.5%）：</strong>$20,000 × 1.5% = <strong>$300</strong></p>
            </div>
            <p className="font-bold text-teal-800 dark:text-teal-200">
              結論：如果你識得用商務艙兌換（里數價值 $0.12+），儲里數更抵！
            </p>
          </div>
        </div>
      </section>

      {/* Section 4: 里數換機票 */}
      <section id="redeem-tickets" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Plane className="h-6 w-6 text-orange-500" />
          4. 里數換機票攻略
        </h2>

        <p>
          <strong>里數換機票</strong>係里數最高價值嘅用法！但要換到心水航班，需要掌握幾個技巧：
        </p>

        <div className="not-prose grid md:grid-cols-2 gap-4 my-6">
          {[
            { 
              icon: "🗓️", 
              title: "提早 330 日訂位", 
              desc: "航空公司通常提早 330 日開放兌換，越早訂越多位置，特別係商務艙。" 
            },
            { 
              icon: "📅", 
              title: "避開旺季", 
              desc: "聖誕、新年、暑假、復活節等旺季，里數機票極難換，建議淡季出發。" 
            },
            { 
              icon: "✈️", 
              title: "善用 Stopover", 
              desc: "Asia Miles 允許中途停留，例如去歐洲可以順道遊杜拜，一張票玩兩個地方。" 
            },
            { 
              icon: "💎", 
              title: "首選商務艙", 
              desc: "商務艙里數價值比經濟艙高 2-4 倍，而且飛長途時差好遠，絕對值得！" 
            },
            { 
              icon: "🔄", 
              title: "彈性日期", 
              desc: "前後調整幾日，往往可以找到里數機票，唔好死守特定日期。" 
            },
            { 
              icon: "⏰", 
              title: "留意里數過期", 
              desc: "Asia Miles 18 個月無活動會過期，記得定期儲或兌換保持活躍。" 
            },
          ].map((tip, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 flex items-start gap-3">
              <span className="text-2xl">{tip.icon}</span>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white text-sm">{tip.title}</h4>
                <p className="text-gray-600 dark:text-gray-400 text-xs">{tip.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 5: 信用卡比較 */}
      <section id="card-comparison" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <CreditCard className="h-6 w-6 text-indigo-500" />
          5. 里數信用卡 vs 現金回贈信用卡
        </h2>

        <h3 className="text-xl font-bold mt-6 mb-3">✈️ 熱門里數信用卡</h3>
        <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden my-4">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-blue-50 dark:bg-blue-900/20">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-blue-600 dark:text-blue-400">信用卡</th>
                  <th className="px-4 py-3 text-center font-medium text-blue-600 dark:text-blue-400">儲里數率</th>
                  <th className="px-4 py-3 text-center font-medium text-blue-600 dark:text-blue-400">年費</th>
                  <th className="px-4 py-3 text-center font-medium text-blue-600 dark:text-blue-400">迎新獎賞</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {cardComparisonData.miles.map((card, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{card.card}</td>
                    <td className="px-4 py-3 text-center font-bold text-blue-600 dark:text-blue-400">{card.rate}</td>
                    <td className="px-4 py-3 text-center text-gray-600 dark:text-gray-400">{card.annual}</td>
                    <td className="px-4 py-3 text-center text-gray-600 dark:text-gray-400">{card.bonus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <h3 className="text-xl font-bold mt-8 mb-3">💰 熱門現金回贈信用卡</h3>
        <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden my-4">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-green-50 dark:bg-green-900/20">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-green-600 dark:text-green-400">信用卡</th>
                  <th className="px-4 py-3 text-center font-medium text-green-600 dark:text-green-400">回贈率</th>
                  <th className="px-4 py-3 text-center font-medium text-green-600 dark:text-green-400">年費</th>
                  <th className="px-4 py-3 text-center font-medium text-green-600 dark:text-green-400">迎新獎賞</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {cardComparisonData.cashback.map((card, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{card.card}</td>
                    <td className="px-4 py-3 text-center font-bold text-green-600 dark:text-green-400">{card.rate}</td>
                    <td className="px-4 py-3 text-center text-gray-600 dark:text-gray-400">{card.annual}</td>
                    <td className="px-4 py-3 text-center text-gray-600 dark:text-gray-400">{card.bonus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section 6: 買里數 */}
      <section id="buy-miles" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Wallet className="h-6 w-6 text-red-500" />
          6. 買里數抵唔抵？
        </h2>

        <p>
          有時差少少里數就可以換到機票，好多人會考慮<strong>買里數</strong>。但通常...
        </p>

        <div className="not-prose bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 my-6">
          <div className="flex items-start gap-3">
            <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-red-800 dark:text-red-200 mb-1">❌ 一般情況唔建議買里數！</h4>
              <p className="text-red-700 dark:text-red-300 text-sm">
                Asia Miles 官方購買價約 <strong>US$0.028/里（約 HK$0.22/里）</strong>，
                遠高於正常估值 $0.08-0.12/里。除非有特別促銷（如買一送一），否則唔划算。
              </p>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-bold mt-6 mb-3">✅ 幾時可以考慮買里數？</h3>
        <ul className="not-prose space-y-2">
          <li className="flex items-start gap-2">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
            <span>有<strong>買一送一促銷</strong>時（成本降至 $0.11/里左右）</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
            <span>只差<strong>幾千里</strong>就可以換到高價值商務艙</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
            <span>里數<strong>快過期</strong>，需要補足換機票</span>
          </li>
        </ul>
      </section>

      {/* Section 7: 里數加現金 */}
      <section id="cash-plus-miles" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Zap className="h-6 w-6 text-amber-500" />
          7. 里數加現金抵唔抵？
        </h2>

        <p>
          航空公司提供「<strong>里數加現金</strong>」（Cash + Miles）選項，
          可以用較少里數 + 現金換機票。但數學上通常...
        </p>

        <div className="not-prose bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 my-6">
          <h4 className="font-bold text-amber-800 dark:text-amber-200 mb-2">⚠️ 例子分析</h4>
          <div className="text-amber-700 dark:text-amber-300 text-sm space-y-2">
            <p><strong>方案 A（全里數）：</strong>40,000 里換經濟艙</p>
            <p><strong>方案 B（里數+現金）：</strong>20,000 里 + HK$2,000 換同一經濟艙</p>
            <hr className="border-amber-300 dark:border-amber-700 my-2" />
            <p>方案 B 中，20,000 里只換到 $2,000 價值</p>
            <p>即 <strong>$2,000 ÷ 20,000 = $0.10/里</strong></p>
            <p className="font-bold">結論：如果你嘅里數價值高於 $0.10/里，方案 A 更抵！</p>
          </div>
        </div>

        <div className="not-prose bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
          <h4 className="font-bold text-green-800 dark:text-green-200 mb-2">💡 小編建議</h4>
          <p className="text-green-700 dark:text-green-300 text-sm">
            除非你里數唔夠、又趕住要出發，否則建議<strong>儲夠全額里數再兌換</strong>更划算。
            里數加現金嘅兌換率通常較差。
          </p>
        </div>
      </section>

      {/* Section 8: 邊種人適合 */}
      <section id="who-suits" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Users className="h-6 w-6 text-cyan-500" />
          8. 邊種人適合儲里數？邊種人適合現金回贈？
        </h2>

        <div className="not-prose grid md:grid-cols-2 gap-4 my-6">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-5 border border-blue-200 dark:border-blue-800">
            <h4 className="font-bold text-blue-800 dark:text-blue-200 mb-3 flex items-center gap-2">
              ✈️ 適合儲里數的人
            </h4>
            <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
              <li>✓ 每年飛 <strong>2-3 次或以上</strong></li>
              <li>✓ 識得用里數換<strong>商務艙/頭等艙</strong></li>
              <li>✓ <strong>彈性行程</strong>，可以提早規劃</li>
              <li>✓ 月簽賬額較高（<strong>$15,000+</strong>）</li>
              <li>✓ 享受<strong>豪華飛行體驗</strong></li>
              <li>✓ 願意<strong>研究里數玩法</strong></li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-5 border border-green-200 dark:border-green-800">
            <h4 className="font-bold text-green-800 dark:text-green-200 mb-3 flex items-center gap-2">
              💰 適合現金回贈的人
            </h4>
            <ul className="space-y-2 text-sm text-green-700 dark:text-green-300">
              <li>✓ 每年飛 <strong>1 次或以下</strong></li>
              <li>✓ 只坐<strong>經濟艙</strong></li>
              <li>✓ <strong>唔想煩</strong>，回贈即時到手</li>
              <li>✓ 月簽賬額較低（<strong>$10,000 以下</strong>）</li>
              <li>✓ 重視<strong>現金流動性</strong></li>
              <li>✓ <strong>唔想研究</strong>複雜玩法</li>
            </ul>
          </div>
        </div>

        <div className="not-prose bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-4">
          <h4 className="font-bold text-purple-800 dark:text-purple-200 mb-2">🎯 最強策略：兩者兼備！</h4>
          <p className="text-purple-700 dark:text-purple-300 text-sm">
            其實唔一定二選一！你可以用<strong>里數卡儲旅遊機票</strong>，
            同時用<strong>現金回贈卡處理日常消費</strong>。
            例如：出糧戶口綁渣打國泰儲里數，超市購物用 Simply Cash 賺 1.5%。
          </p>
        </div>
      </section>

      {/* Section 9: FAQ */}
      <section id="faq" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          ❓ 9. 常見問題 FAQ
        </h2>
        
        <div className="not-prose space-y-4">
          {milesVsCashbackFaqData.map((faq, index) => (
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

      {/* 總結 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Target className="h-6 w-6 text-emerald-500" />
          總結：里數 vs 現金回贈，邊個啱你？
        </h2>

        <div className="not-prose bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-6">
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-3xl mb-2">✈️</div>
              <h4 className="font-bold text-emerald-800 dark:text-emerald-200 mb-1">儲里數</h4>
              <p className="text-emerald-700 dark:text-emerald-300 text-sm">
                常飛、識換商務艙<br />
                里數價值可達 <strong>$0.15-0.40/里</strong>
              </p>
            </div>
            <div>
              <div className="text-3xl mb-2">💰</div>
              <h4 className="font-bold text-emerald-800 dark:text-emerald-200 mb-1">現金回贈</h4>
              <p className="text-emerald-700 dark:text-emerald-300 text-sm">
                唔常飛、要即時回贈<br />
                回贈率 <strong>1-4%</strong> 穩陣
              </p>
            </div>
            <div>
              <div className="text-3xl mb-2">🎯</div>
              <h4 className="font-bold text-emerald-800 dark:text-emerald-200 mb-1">最強組合</h4>
              <p className="text-emerald-700 dark:text-emerald-300 text-sm">
                兩者兼備<br />
                <strong>里數換機票 + 現金應付日常</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <div className="not-prose bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl p-6 text-white mb-10">
        <h3 className="text-xl font-bold mb-2">💳 想知你嘅消費最適合邊張信用卡？</h3>
        <p className="mb-4 opacity-90">用我哋嘅計算機，輸入你嘅消費金額同類別，即刻搵到最高回贈嘅信用卡！</p>
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
          <Link href="/discover/overseas-fee" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
            <Globe className="h-5 w-5 text-emerald-600" />
            <span>海外簽賬手續費攻略</span>
            <ChevronRight className="h-4 w-4 ml-auto text-gray-400" />
          </Link>
          <Link href="/blog/best-travel-cards" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
            <Plane className="h-5 w-5 text-emerald-600" />
            <span>旅遊信用卡排行榜</span>
            <ChevronRight className="h-4 w-4 ml-auto text-gray-400" />
          </Link>
          <Link href="/" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
            <Calculator className="h-5 w-5 text-emerald-600" />
            <span>回贈計算機</span>
            <ChevronRight className="h-4 w-4 ml-auto text-gray-400" />
          </Link>
          <Link href="/discover/debit-card-guide" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
            <CreditCard className="h-5 w-5 text-emerald-600" />
            <span>Debit Card 完全攻略</span>
            <ChevronRight className="h-4 w-4 ml-auto text-gray-400" />
          </Link>
        </div>
      </div>
    </div>
  );
}

