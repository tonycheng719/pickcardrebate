// 里數信用卡攻略文章內容組件
// 用於 /discover/best-miles-credit-cards 頁面
// SEO 優化：針對「里數信用卡」、「Asia Miles 信用卡」、「儲里數」等關鍵字

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  AlertTriangle, CheckCircle, XCircle, ChevronRight, ChevronDown,
  CreditCard, Globe, Plane, Calculator, Trophy, DollarSign,
  TrendingUp, Users, Target, Zap, Clock, Star, Wallet, Scale,
  Info, Award, Sparkles
} from "lucide-react";
import { CardPreviewSection, RECOMMENDED_CARDS } from "@/app/discover/components/card-preview-section";

// FAQ 數據 - SEO 結構化資料
export const milesCreditCardFaqData = [
  {
    question: "2025年最抵儲里數信用卡係邊張？",
    answer: "2025年最抵儲里數信用卡包括：渣打國泰 Mastercard（$4/里，食肆/酒店/海外）、HSBC EveryMile（$2/里交通/網購）、Citi PremierMiles（$3/里海外）、DBS Black Card（$4/里旅遊）。選擇時要考慮你最常消費嘅類別。"
  },
  {
    question: "Asia Miles 信用卡點揀？",
    answer: "選擇 Asia Miles 信用卡要考慮：1) $/里比率（越低越好）；2) 適用類別（食肆、網購、海外等）；3) 年費及豁免條件；4) 迎新獎賞；5) 是否有額外優惠（如機場貴賓室）。建議配合消費習慣選擇，並可持有多張卡互補。"
  },
  {
    question: "信用卡儲里數抵唔抵？",
    answer: "視乎你嘅旅遊頻率和換機票習慣。如果每年飛 2-3 次或以上，識得用里數換商務艙（價值 $0.15-0.25/里），儲里數非常抵。以 $4/里計，等於 2.5% 回贈。但如果只換經濟艙（約 $0.08-0.10/里），回贈只有約 2%，可能唔及現金回贈卡。"
  },
  {
    question: "里數信用卡年費貴唔貴？",
    answer: "里數信用卡年費由 $0 至 $3,800 不等。常見選擇：渣打國泰 $2,000（首年免）、Citi PremierMiles $1,800（首年免）、HSBC EveryMile $2,000（首兩年免）、DBS Black $2,000（首年免）。多數銀行提供首年免年費或簽賬豁免。"
  },
  {
    question: "里數點換機票最抵？",
    answer: "換機票技巧：1) 換商務/頭等艙比經濟艙抵（價值高 2-3 倍）；2) 提早 330 日訂位；3) 避開旺季；4) 善用 Stopover（中途停留）和 Open Jaw（不同城市進出）；5) 留意里數促銷活動。"
  },
  {
    question: "Asia Miles 幾時會過期？",
    answer: "Asia Miles 有 18 個月有效期，由最後一次活動（儲入或使用）起計。只要期間有任何里數活動，所有里數重新計算 18 個月。建議定期用信用卡簽賬或小額消費保持帳戶活躍。"
  },
  {
    question: "Avios 同 Asia Miles 邊個好？",
    answer: "Asia Miles 適合飛國泰/亞洲航線，Avios 適合飛英航/歐洲航線。Asia Miles 優勢：香港人常用、國泰航班多；Avios 優勢：短途航線抵、可混合付款。建議以國泰為主，Avios 為輔。"
  },
  {
    question: "里數信用卡迎新有幾多里？",
    answer: "2025年里數信用卡迎新獎賞：渣打國泰最高 60,000 里、Citi PremierMiles 最高 108,000 里（需高額簽賬）、HSBC EveryMile 約 40,000 里、DBS Black 約 50,000 里。迎新里數通常需在指定時間內簽賬達標。"
  }
];

// 里數信用卡比較數據
export const milesCardData = [
  {
    id: "sc-cathay",
    name: "渣打國泰 Mastercard",
    bank: "渣打銀行",
    program: "Asia Miles",
    baseRate: "$6/里",
    bestRate: "$4/里",
    bestCategories: ["食肆", "酒店", "海外"],
    annualFee: "$2,000",
    feeWaiver: "首年免年費",
    pros: ["食肆/酒店/海外 $4/里", "八達通增值計里數", "免費機場貴賓室"],
    cons: ["年費較高", "非指定類別 $6/里"],
    highlight: "最全面里數卡"
  },
  {
    id: "hsbc-everymile",
    name: "HSBC EveryMile",
    bank: "滙豐銀行",
    program: "Asia Miles",
    baseRate: "$5/里",
    bestRate: "$2/里",
    bestCategories: ["交通", "網購", "餐飲"],
    annualFee: "$2,000",
    feeWaiver: "首兩年免年費",
    pros: ["指定類別 $2/里", "免費機場貴賓室", "配合最紅自主獎賞"],
    cons: ["需登記獎賞", "$2/里有上限"],
    highlight: "交通/網購最抵"
  },
  {
    id: "citi-premiermiles",
    name: "Citi PremierMiles",
    bank: "花旗銀行",
    program: "Asia Miles / Avios",
    baseRate: "$8/里",
    bestRate: "$3/里",
    bestCategories: ["海外", "旅遊"],
    annualFee: "$1,800",
    feeWaiver: "首年免年費",
    pros: ["海外簽賬 $3/里（需滿額）", "可換 Asia Miles 或 Avios", "免費機場貴賓室"],
    cons: ["本地簽賬較弱", "需滿月簽要求"],
    highlight: "海外簽賬最抵"
  },
  {
    id: "dbs-black",
    name: "DBS Black World Mastercard",
    bank: "星展銀行",
    program: "Asia Miles / Avios / KrisFlyer",
    baseRate: "$6/里",
    bestRate: "$4/里",
    bestCategories: ["旅遊", "酒店", "海外"],
    annualFee: "$2,000",
    feeWaiver: "首年免年費",
    pros: ["積分無限期", "可換多個里數計劃", "旅遊簽賬 $4/里"],
    cons: ["電子錢包有限額", "基本回贈較低"],
    highlight: "積分最靈活"
  },
  {
    id: "citi-prestige",
    name: "Citi Prestige Card",
    bank: "花旗銀行",
    program: "Asia Miles / Avios",
    baseRate: "$6/里",
    bestRate: "$4/里",
    bestCategories: ["旅遊", "酒店", "海外"],
    annualFee: "$3,800",
    feeWaiver: "無",
    pros: ["全球酒店第4晚免費", "機場貴賓室", "旅遊保險"],
    cons: ["年費最高", "需要高年薪"],
    highlight: "高端旅遊卡"
  }
];

// 里數計劃比較
export const milesProgramData = [
  {
    program: "Asia Miles",
    airline: "國泰航空",
    expiry: "18個月無活動",
    partners: "20+ 航空公司",
    bestFor: "香港人首選",
    transferRate: "1:1 直接",
    highlight: true
  },
  {
    program: "Avios",
    airline: "英國航空",
    expiry: "36個月無活動",
    partners: "寰宇一家聯盟",
    bestFor: "短途航線",
    transferRate: "15:1 (Citi)"
  },
  {
    program: "KrisFlyer",
    airline: "新加坡航空",
    expiry: "36個月無活動",
    partners: "星空聯盟",
    bestFor: "東南亞航線",
    transferRate: "依卡種"
  }
];

export function MilesCreditCardGuide() {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      {/* Hero Section */}
      <div className="not-prose mb-12">
        <div className="bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium backdrop-blur-sm">
                ✈️ {currentYear}年最新
              </span>
              <span className="px-3 py-1 bg-amber-400/20 rounded-full text-sm font-medium backdrop-blur-sm">
                🏆 里數攻略
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
              里數信用卡攻略<br />
              <span className="text-purple-200">Asia Miles 信用卡比較</span>
            </h1>
            <p className="text-lg md:text-xl text-purple-100 max-w-2xl mb-6">
              香港最全面里數信用卡比較！教你揀最抵儲里數卡，由 $2/里到 $6/里，邊張最適合你？
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/rankings">
                <Button size="lg" className="bg-white text-purple-700 hover:bg-purple-100">
                  <Trophy className="h-5 w-5 mr-2" />
                  睇里數卡排行榜
                </Button>
              </Link>
              <Link href="/blog/best-miles-cards">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  <Calculator className="h-5 w-5 mr-2" />
                  詳細排名分析
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Navigation */}
      <div className="not-prose mb-8">
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6">
          <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Zap className="h-5 w-5 text-amber-500" />
            快速導航
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <a href="#best-cards" className="flex items-center gap-2 p-3 bg-white dark:bg-gray-800 rounded-xl hover:shadow-md transition-shadow">
              <CreditCard className="h-5 w-5 text-purple-600" />
              <span className="font-medium">最佳里數卡</span>
            </a>
            <a href="#programs" className="flex items-center gap-2 p-3 bg-white dark:bg-gray-800 rounded-xl hover:shadow-md transition-shadow">
              <Plane className="h-5 w-5 text-blue-600" />
              <span className="font-medium">里數計劃</span>
            </a>
            <a href="#how-to-earn" className="flex items-center gap-2 p-3 bg-white dark:bg-gray-800 rounded-xl hover:shadow-md transition-shadow">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <span className="font-medium">儲里數技巧</span>
            </a>
            <a href="#faq" className="flex items-center gap-2 p-3 bg-white dark:bg-gray-800 rounded-xl hover:shadow-md transition-shadow">
              <Info className="h-5 w-5 text-amber-600" />
              <span className="font-medium">常見問題</span>
            </a>
          </div>
        </div>
      </div>

      {/* What are Miles */}
      <h2 className="flex items-center gap-2">
        <Plane className="h-6 w-6 text-purple-600" />
        咩係里數？點解要儲？
      </h2>
      
      <p>
        <strong>里數（Miles）</strong>係航空公司嘅獎勵積分，可以用嚟換免費機票、升艙、酒店住宿等。
        香港人最常用嘅係 <strong>Asia Miles</strong>（國泰航空）和 <strong>Avios</strong>（英國航空）。
      </p>

      <div className="not-prose my-8">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-purple-100 dark:border-purple-800">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                <Plane className="h-5 w-5 text-white" />
              </div>
              <h3 className="font-bold">免費機票</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              用里數換機票，商務艙來回日本只需 64,000 里！
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-6 border border-blue-100 dark:border-blue-800">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <Award className="h-5 w-5 text-white" />
              </div>
              <h3 className="font-bold">升級艙等</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              經濟艙升商務艙，享受頭等服務體驗！
            </p>
          </div>
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-6 border border-amber-100 dark:border-amber-800">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center">
                <Star className="h-5 w-5 text-white" />
              </div>
              <h3 className="font-bold">貴賓室</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              里數卡通常附送免費機場貴賓室！
            </p>
          </div>
        </div>
      </div>

      {/* Best Miles Cards */}
      <h2 id="best-cards" className="flex items-center gap-2 scroll-mt-20">
        <Trophy className="h-6 w-6 text-amber-500" />
        {currentYear}年最佳里數信用卡
      </h2>

      <p>
        以下係香港最抵嘅里數信用卡，按 <strong>$/里比率</strong> 排名（越低越好）：
      </p>

      <div className="not-prose my-8 space-y-4">
        {milesCardData.map((card, index) => (
          <div key={card.id} className={`bg-white dark:bg-gray-900 rounded-xl border ${index === 0 ? 'border-amber-300 dark:border-amber-700 ring-2 ring-amber-200 dark:ring-amber-800' : 'border-gray-200 dark:border-gray-700'} overflow-hidden`}>
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${
                  index === 0 ? 'bg-gradient-to-br from-amber-400 to-amber-600' :
                  index === 1 ? 'bg-gradient-to-br from-gray-400 to-gray-600' :
                  index === 2 ? 'bg-gradient-to-br from-orange-400 to-orange-600' :
                  'bg-gray-500'
                }`}>
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-lg">{card.name}</h3>
                    {index === 0 && (
                      <span className="px-2 py-0.5 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-xs font-medium rounded-full">
                        推薦
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                    {card.bank} • {card.program} • {card.highlight}
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">最佳比率</p>
                      <p className="font-bold text-purple-600 dark:text-purple-400 text-lg">{card.bestRate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">基本比率</p>
                      <p className="font-medium">{card.baseRate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">年費</p>
                      <p className="font-medium">{card.annualFee}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">豁免</p>
                      <p className="font-medium text-green-600 dark:text-green-400">{card.feeWaiver}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {card.bestCategories.map((cat, i) => (
                      <span key={i} className="px-2 py-1 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 text-xs rounded-lg">
                        {cat}
                      </span>
                    ))}
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-medium text-green-600 dark:text-green-400 mb-2">✓ 優點</p>
                      <ul className="space-y-1">
                        {card.pros.map((pro, i) => (
                          <li key={i} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-amber-600 dark:text-amber-400 mb-2">⚠️ 注意</p>
                      <ul className="space-y-1">
                        {card.cons.map((con, i) => (
                          <li key={i} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                            <AlertTriangle className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                {card.id && (
                  <Link href={`/cards/${card.id}`}>
                    <Button variant="outline" size="sm">
                      詳情 <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Miles Programs */}
      <h2 id="programs" className="flex items-center gap-2 scroll-mt-20">
        <Globe className="h-6 w-6 text-blue-600" />
        里數計劃比較
      </h2>

      <p>
        香港常見嘅里數計劃有三個，各有特色：
      </p>

      <div className="not-prose my-8">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800">
                <th className="px-4 py-3 text-left text-sm font-medium">計劃</th>
                <th className="px-4 py-3 text-left text-sm font-medium">航空公司</th>
                <th className="px-4 py-3 text-left text-sm font-medium">過期時間</th>
                <th className="px-4 py-3 text-left text-sm font-medium">最適合</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {milesProgramData.map((program, index) => (
                <tr key={index} className={program.highlight ? 'bg-purple-50 dark:bg-purple-900/10' : ''}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="font-bold">{program.program}</span>
                      {program.highlight && (
                        <span className="px-2 py-0.5 bg-purple-600 text-white text-xs rounded-full">推薦</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{program.airline}</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{program.expiry}</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{program.bestFor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* How to Earn Miles */}
      <h2 id="how-to-earn" className="flex items-center gap-2 scroll-mt-20">
        <TrendingUp className="h-6 w-6 text-green-600" />
        點樣儲里數最快？
      </h2>

      <div className="not-prose my-8 grid md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-green-600" />
            快速儲里數技巧
          </h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span><strong>善用迎新獎賞</strong> - 新卡迎新可獲 40,000-60,000 里</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span><strong>配合消費類別</strong> - 食飯用食飯卡、旅遊用旅遊卡</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span><strong>留意推廣優惠</strong> - 額外 2-5 倍里數</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span><strong>八達通自動增值</strong> - 渣打國泰計里數</span>
            </li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-6 border border-amber-200 dark:border-amber-800">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-600" />
            儲里數常見錯誤
          </h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
              <span><strong>唔睇類別</strong> - 用錯卡回贈率大減</span>
            </li>
            <li className="flex items-start gap-3">
              <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
              <span><strong>里數過期</strong> - Asia Miles 18個月無活動過期</span>
            </li>
            <li className="flex items-start gap-3">
              <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
              <span><strong>買里數</strong> - 官方買里數極貴，唔抵</span>
            </li>
            <li className="flex items-start gap-3">
              <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
              <span><strong>換經濟艙</strong> - 商務艙價值高 2-3 倍</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Value per Mile */}
      <h2 className="flex items-center gap-2">
        <Calculator className="h-6 w-6 text-indigo-600" />
        1 里數值幾錢？
      </h2>

      <p>
        里數價值視乎你換咩機票。<strong>商務艙嘅里數價值係經濟艙嘅 2-3 倍</strong>，
        所以識得換商務艙先係儲里數嘅精髓！
      </p>

      <div className="not-prose my-8">
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-indigo-200 dark:border-indigo-800">
          <h3 className="font-bold text-lg mb-4">里數價值參考（Asia Miles 來回）</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">🇯🇵 日本經濟艙</p>
              <p className="text-2xl font-bold text-indigo-600">$0.10/里</p>
              <p className="text-xs text-gray-400">26,000 里 ≈ $2,600</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">🇯🇵 日本商務艙</p>
              <p className="text-2xl font-bold text-purple-600">$0.22/里</p>
              <p className="text-xs text-gray-400">64,000 里 ≈ $14,000</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">🇬🇧 歐洲商務艙</p>
              <p className="text-2xl font-bold text-green-600">$0.32/里</p>
              <p className="text-xs text-gray-400">140,000 里 ≈ $45,000</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="not-prose my-12">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">想知邊張里數卡最啱你？</h2>
          <p className="text-purple-100 mb-6 max-w-xl mx-auto">
            用我哋嘅計算機，輸入你嘅消費習慣，即時計算最抵里數卡！
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/">
              <Button size="lg" className="bg-white text-purple-700 hover:bg-purple-100">
                <Calculator className="h-5 w-5 mr-2" />
                回贈計算機
              </Button>
            </Link>
            <Link href="/blog/best-miles-cards">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                <Trophy className="h-5 w-5 mr-2" />
                完整排行榜
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <h2 id="faq" className="flex items-center gap-2 scroll-mt-20">
        <Info className="h-6 w-6 text-blue-600" />
        常見問題 FAQ
      </h2>

      <div className="not-prose my-8 space-y-4">
        {milesCreditCardFaqData.map((faq, index) => (
          <div key={index} className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6">
            <h3 className="font-bold text-lg mb-2 flex items-start gap-2">
              <span className="text-purple-600 dark:text-purple-400">Q.</span>
              {faq.question}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 pl-6">
              <span className="text-green-600 dark:text-green-400 font-medium">A.</span> {faq.answer}
            </p>
          </div>
        ))}
      </div>

      {/* Related Content */}
      <h2 className="flex items-center gap-2">
        <Sparkles className="h-6 w-6 text-amber-500" />
        相關攻略
      </h2>

      <div className="not-prose my-8 grid md:grid-cols-2 gap-4">
        <Link href="/discover/miles-vs-cashback" className="block p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700 transition-colors">
          <h3 className="font-bold mb-2 flex items-center gap-2">
            <Scale className="h-5 w-5 text-purple-600" />
            里數 vs 現金回贈
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            唔知揀里數定現金回贈？睇完呢篇你就知！
          </p>
        </Link>
        <Link href="/blog/best-travel-cards" className="block p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
          <h3 className="font-bold mb-2 flex items-center gap-2">
            <Plane className="h-5 w-5 text-blue-600" />
            旅遊信用卡排行榜
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            機票、酒店、旅遊平台最抵信用卡推薦！
          </p>
        </Link>
      </div>
    </div>
  );
}

