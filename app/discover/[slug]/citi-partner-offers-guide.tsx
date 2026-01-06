// Citi 信用卡合作夥伴獎賞攻略文章內容組件
// 用於 /discover/citi-partner-offers 頁面
// SEO 優化：針對「Citi 信用卡迎新」「MoneyHero Citi」「Citi 信用卡優惠」等關鍵字

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  AlertTriangle, CheckCircle, XCircle, ChevronRight,
  CreditCard, Gift, Star, ExternalLink, Calendar,
  Info, Zap, HelpCircle, Wallet, Plane, ShoppingCart,
  CircleDollarSign, TrendingUp, Shield, Sparkles, Clock
} from "lucide-react";
import { CardTableCell, CardLinkWithImage, CardBadgeWithImage } from "@/app/discover/components/card-link-with-image";
import { CardPreviewSection } from "@/app/discover/components/card-preview-section";

// FAQ 數據 - SEO 結構化資料
export const citiPartnerOffersFaqData = [
  {
    question: "經合作夥伴申請 Citi 信用卡有咩好處？",
    answer: "經 MoneyHero 申請，可以獲得額外獎賞（7 款禮品任揀，包括 $2,200 Apple Store 禮品卡、25,000 Max Miles、Dyson 風筒等），比直接去銀行官網申請更著數。注意：領取 MoneyHero 獨家優惠不能同時獲取花旗銀行迎新優惠。"
  },
  {
    question: "MoneyHero 獨家獎賞有咩選擇？",
    answer: "7 款禮品任揀：HK$2,200 Apple Store 禮品卡 / HK$2,200 惠康購物現金券 / 25,000 Max Miles 飛行里數 / PHILIPS 飛利浦 RO 純淨飲水機（價值HK$4,288）/ Dyson Supersonic Nural™ 風筒 HD16（價值HK$3,980）/ Dyson HT01 Airstrait™ 二合一吹風直髮器（價值HK$3,980）/ LOJEL Cubo 30吋行李箱（價值HK$3,700）"
  },
  {
    question: "申請 Citi 信用卡有咩要求？",
    answer: "大部分 Citi 信用卡最低入息要求為年薪 $120,000（即月薪 $10,000），Citi Prestige 則要求年薪 $600,000。首年年費通常可獲豁免。"
  },
  {
    question: "MoneyHero 獨家獎賞點樣拎？",
    answer: "需要在指定時間內：1) 經 MoneyHero 連結申請；2) 2026年2月28日前批核並啟動信用卡；3) 批卡後30日內累積簽賬滿 $4,000。完成後會收到 MoneyHero 電郵通知領取獎賞。"
  },
  {
    question: "Citi Rewards vs Citi Cash Back 邊張好？",
    answer: "Citi Rewards 適合購物娛樂消費（百貨、服裝、電影等）可享 3% 回贈；Citi Cash Back 適合食肆消費，週末食肆 3%、平日食肆 2%。視乎你主要消費類別選擇。"
  },
  {
    question: "Citi PremierMiles 定 Citi Prestige 邊張好？",
    answer: "PremierMiles 適合一般旅遊愛好者，年費 $1,800 可享 12 次機場貴賓室；Prestige 適合高端旅客，年費 $3,800 但享無限次貴賓室及任何酒店第4晚免費。視乎旅遊頻率及消費能力選擇。"
  },
  {
    question: "Max Miles 點樣用？",
    answer: "Max Miles 可以：1) 即時兌換電子禮券（如 Starbucks、HKTVMall）；2) 以 1:1 比例轉換里數至航空夥伴（如國泰航空，最低 1,000 里）；3) 累積里數兌換機票（20,000 里可換日本機票）。選擇 Max Miles 時，請確保登記 MoneyHero 獨家獎賞的電郵地址與 Hey Max 賬戶的電郵地址相同。"
  },
  {
    question: "已持有 Citi 信用卡可以再申請嗎？",
    answer: "MoneyHero 獨家獎賞只限全新 Citi 信用卡客戶（過去12個月內未曾持有 Citi 信用卡主卡）。學生卡不適用。"
  }
];

// MoneyHero 獨家獎賞選項
const partnerRewardOptions = [
  { name: "HK$2,200 Apple Store 禮品卡", value: "$2,200", icon: "🍎" },
  { name: "HK$2,200 惠康購物現金券", value: "$2,200", icon: "🛒" },
  { name: "25,000 Max Miles 飛行里數", value: "25,000里", icon: "✈️" },
  { name: "PHILIPS 飛利浦 RO 純淨飲水機", value: "$4,288", icon: "💧" },
  { name: "Dyson Supersonic Nural™ 風筒 HD16", value: "$3,980", icon: "💨" },
  { name: "Dyson HT01 Airstrait™ 二合一吹風直髮器", value: "$3,980", icon: "💇" },
  { name: "LOJEL Cubo 30吋 行李箱", value: "$3,700", icon: "🧳" },
];

// Citi 合作夥伴卡資料
const citiPartnerCards = [
  {
    id: "citi-cashback",
    name: "Citi Cash Back Card",
    tagline: "食肆回贈之王",
    annualFee: "$1,800 (首年免)",
    minIncome: "$120,000/年",
    partnerReward: "7 款禮品任揀（價值高達 $4,288）",
    bankWelcome: "⚠️ 領取 MoneyHero 獨家優惠不能同時獲取花旗銀行迎新優惠",
    highlights: [
      "週五六日食肆 3% 回贈",
      "全球食肆及酒店 2% 回贈",
      "外幣簽賬 2% 回贈",
      "八達通自動增值 1%",
      "基本簽賬 1% 無上限"
    ],
    bestFor: "經常外出用餐、週末食飯多",
    applyUrl: "https://apply.creatory.moneyhero.com.hk/click?o=168&a=228&sub_id1=pickcardrebate&sub_id2=web"
  },
  {
    id: "citi-rewards",
    name: "Citi Rewards Card",
    tagline: "購物娛樂 3% 回贈",
    annualFee: "$1,800 (首年免)",
    minIncome: "$120,000/年",
    partnerReward: "7 款禮品任揀（價值高達 $4,288）",
    bankWelcome: "⚠️ 領取 MoneyHero 獨家優惠不能同時獲取花旗銀行迎新優惠",
    highlights: [
      "購物和娛樂 3% 回贈 (8.1X積分)",
      "百貨公司、服裝店、化妝品店、電影院",
      "串流平台 (Netflix/Spotify) 3%",
      "本地流動支付 1% 回贈",
      "積分永不過期"
    ],
    bestFor: "愛購物、睇戲、訂閱串流平台",
    applyUrl: "https://apply.creatory.moneyhero.com.hk/click?o=169&a=228&sub_id1=pickcardrebate&sub_id2=web"
  },
  {
    id: "citi-rewards-unionpay",
    name: "Citi Rewards 銀聯信用卡",
    tagline: "一卡雙幣・內地消費必備",
    annualFee: "$1,800 (首年免)",
    minIncome: "$120,000/年",
    partnerReward: "7 款禮品任揀（價值高達 $4,288）",
    bankWelcome: "⚠️ 領取 MoneyHero 獨家優惠不能同時獲取花旗銀行迎新優惠",
    highlights: [
      "一卡雙幣 (港幣/人民幣)",
      "購物和娛樂 3% 回贈",
      "內地簽賬同享 3% 回贈",
      "免外幣手續費 (銀聯)",
      "積分永不過期"
    ],
    bestFor: "經常北上消費、內地網購",
    applyUrl: "https://apply.creatory.moneyhero.com.hk/click?o=170&a=228&sub_id1=pickcardrebate&sub_id2=web"
  },
  {
    id: "citi-premiermiles",
    name: "Citi PremierMiles",
    tagline: "旅遊里數卡",
    annualFee: "$1,800 (首年免)",
    minIncome: "$120,000/年",
    partnerReward: "7 款禮品任揀（價值高達 $4,288）",
    bankWelcome: "⚠️ 領取 MoneyHero 獨家優惠不能同時獲取花旗銀行迎新優惠",
    highlights: [
      "外幣簽賬低至 $4/里",
      "旅遊/酒店/航空 $4/里",
      "每年 12 次免費機場貴賓室",
      "積分永不過期",
      "免費旅遊保險"
    ],
    bestFor: "經常外遊、儲里數換機票",
    applyUrl: "https://apply.creatory.moneyhero.com.hk/click?o=172&a=228&sub_id1=pickcardrebate&sub_id2=web"
  },
  {
    id: "citi-octopus",
    name: "Citi 八達通白金卡",
    tagline: "交通回贈之王",
    annualFee: "$1,800 (首年免)",
    minIncome: "$120,000/年",
    partnerReward: "7 款禮品任揀（價值高達 $4,288）",
    bankWelcome: "⚠️ 領取 MoneyHero 獨家優惠不能同時獲取花旗銀行迎新優惠",
    highlights: [
      "🔥 交通 15% 回贈 (限時至2026/3/31)",
      "內置八達通功能",
      "隧道/泊車 5% (月簽$10,000)",
      "八達通自動增值 0.5%",
      "需登記：citibank.hk/transreg"
    ],
    bestFor: "每日搭車返工、經常泊車",
    applyUrl: "https://apply.creatory.moneyhero.com.hk/click?o=166&a=228&sub_id1=pickcardrebate&sub_id2=web"
  },
  {
    id: "citi-prestige",
    name: "Citi Prestige Card",
    tagline: "高端旅遊卡",
    annualFee: "$3,800",
    minIncome: "$600,000/年",
    partnerReward: "經 MoneyHero 申請享額外獎賞",
    bankWelcome: "繳年費送 360,000 積分 (30,000里)",
    highlights: [
      "任何酒店第 4 晚免費",
      "無限次 Priority Pass 機場貴賓室",
      "海外簽賬 $4/里",
      "本地簽賬 $6/里",
      "免費旅遊保險"
    ],
    bestFor: "高消費、經常住酒店旅遊",
    applyUrl: "https://apply.creatory.moneyhero.com.hk/click?o=171&a=228&sub_id1=pickcardrebate&sub_id2=web"
  }
];

export function CitiPartnerOffersGuide() {
  return (
    <div className="space-y-8">
      {/* 開場介紹 */}
      <section>
        <p className="text-lg leading-relaxed mb-4">
          想申請 Citi 信用卡？經 MoneyHero 申請可以獲得<strong className="text-emerald-600 dark:text-emerald-400">獨家禮品</strong>，
          <strong className="text-amber-600 dark:text-amber-400">7 款禮品任揀，價值高達 $4,288</strong>！
        </p>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          本文為你整理所有有 MoneyHero 獨家獎賞的 Citi 信用卡，包括獎賞選項、申請條件、重要日期，以及申請連結。
        </p>

        {/* 限時優惠框 */}
        <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/30 rounded-2xl p-6 border-2 border-red-300 dark:border-red-700 mb-6">
          <div className="flex items-start gap-3">
            <Clock className="h-6 w-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-red-900 dark:text-red-100 mb-2">⏰ 限時優惠！推廣期有限</h3>
              <div className="text-sm text-red-800 dark:text-red-200 space-y-1">
                <p><strong>申請日期：</strong>2026年1月5日中午12時 至 2026年1月12日下午6時</p>
                <p><strong>批核期限：</strong>2026年2月28日或之前</p>
                <p><strong>簽賬要求：</strong>批卡後30日內累積簽賬滿 $4,000</p>
              </div>
            </div>
          </div>
        </div>

        {/* 重點提示框 */}
        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30 rounded-2xl p-6 border border-amber-200 dark:border-amber-800">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-amber-900 dark:text-amber-100 mb-2">⚠️ 重要提示</h3>
              <ul className="text-sm text-amber-800 dark:text-amber-200 space-y-1">
                <li>• <strong>領取 MoneyHero 獨家優惠不能同時獲取花旗銀行迎新優惠</strong></li>
                <li>• 只限全新 Citi 信用卡客戶（過去12個月內未曾持有 Citi 信用卡主卡）</li>
                <li>• 不適用於學生卡</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* MoneyHero 獨家獎賞選項 */}
      <section>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Gift className="h-6 w-6 text-amber-600" />
          MoneyHero 獨家獎賞（7 款任揀 1）
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {partnerRewardOptions.map((option, index) => (
            <div key={index} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-4 flex items-center gap-3">
              <span className="text-2xl">{option.icon}</span>
              <div className="flex-1">
                <p className="font-medium text-gray-900 dark:text-white text-sm">{option.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">價值 {option.value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 重要日期 */}
      <section>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Calendar className="h-6 w-6 text-blue-600" />
          重要日期
        </h2>
        
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
          <ol className="space-y-4">
            <li className="flex items-start gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">1</span>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white">申請期限</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">2026年1月5日中午12時 至 2026年1月12日下午6時</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">2</span>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white">批核及啟動期限</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">2026年2月28日或之前必須成功獲批並啟動申請之信用卡</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-sm">3</span>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white">簽賬要求</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">批卡成功後30日內累積簽賬滿 $4,000</p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      {/* 適用信用卡 */}
      <section>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <CreditCard className="h-6 w-6 text-blue-600" />
          適用 Citi 信用卡
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <thead className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold">信用卡</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">年費</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">適合對象</th>
                <th className="px-4 py-3 text-center text-sm font-semibold">申請</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {citiPartnerCards.filter(c => c.id !== "citi-prestige").map((card) => (
                <tr key={card.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="px-4 py-3">
                    <CardTableCell id={card.id} />
                  </td>
                  <td className="px-4 py-3 text-sm">{card.annualFee}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{card.bestFor}</td>
                  <td className="px-4 py-3 text-center">
                    <a 
                      href={card.applyUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition-colors"
                    >
                      申請
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          ⚠️ 不適用於學生卡；Citi Prestige 獎賞有所不同
        </p>
      </section>

      {/* 每張卡詳細介紹 */}
      <section>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Star className="h-6 w-6 text-amber-600" />
          各卡詳細介紹
        </h2>

        <div className="space-y-8">
          {citiPartnerCards.map((card, index) => (
            <div key={card.id} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              {/* 卡片標題 */}
              <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-blue-100 text-sm">#{index + 1}</span>
                    <h3 className="text-xl font-bold text-white">{card.name}</h3>
                    <p className="text-blue-100 text-sm">{card.tagline}</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-white text-sm">
                      {card.annualFee}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {/* 信用卡封面 */}
                <div className="mb-6">
                  <CardLinkWithImage id={card.id} size="lg" showRate={false} />
                </div>

                {/* 獎賞資訊 */}
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 border border-amber-200 dark:border-amber-800">
                    <div className="flex items-center gap-2 mb-2">
                      <Gift className="h-5 w-5 text-amber-600" />
                      <span className="font-bold text-amber-900 dark:text-amber-100">MoneyHero 獨家獎賞</span>
                    </div>
                    <p className="text-amber-800 dark:text-amber-200 font-medium text-sm">{card.partnerReward}</p>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center gap-2 mb-2">
                      <Info className="h-5 w-5 text-blue-600" />
                      <span className="font-bold text-blue-900 dark:text-blue-100">注意事項</span>
                    </div>
                    <p className="text-blue-800 dark:text-blue-200 text-sm">{card.bankWelcome}</p>
                  </div>
                </div>

                {/* 卡片亮點 */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">📌 卡片亮點</h4>
                  <ul className="grid md:grid-cols-2 gap-2">
                    {card.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 申請要求 */}
                <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 rounded-xl p-4 mb-4">
                  <div className="text-sm">
                    <span className="text-gray-500 dark:text-gray-400">最低入息要求：</span>
                    <span className="font-medium text-gray-900 dark:text-white ml-1">{card.minIncome}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-500 dark:text-gray-400">適合：</span>
                    <span className="font-medium text-emerald-600 dark:text-emerald-400 ml-1">{card.bestFor}</span>
                  </div>
                </div>

                {/* 申請按鈕 */}
                <a 
                  href={card.applyUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold rounded-xl transition-all"
                >
                  <Sparkles className="h-5 w-5" />
                  立即申請享獨家獎賞
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Max Miles 使用說明 */}
      <section>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Plane className="h-6 w-6 text-blue-600" />
          Max Miles 使用說明
        </h2>

        <div className="bg-gradient-to-r from-sky-50 to-blue-50 dark:from-sky-950/30 dark:to-blue-950/30 rounded-2xl border border-sky-200 dark:border-sky-800 p-6">
          <p className="text-sm text-sky-800 dark:text-sky-200 mb-4">
            選擇 <strong>25,000 Max Miles</strong> 作為獨家獎賞時，請確保登記 MoneyHero 獨家獎賞的電郵地址需與 Hey Max 賬戶的電郵地址相同。
          </p>
          
          <ol className="space-y-3 text-sm text-sky-900 dark:text-sky-100">
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-sky-600 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
              <span>MoneyHero 將透過電子郵件寄送專屬 Max Miles 兌換連結</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-sky-600 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
              <span>點擊連結，將導向 HEYMAX 應用程式（若尚未安裝，系統將提示下載）</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-sky-600 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
              <span>登入或註冊 HEYMAX 帳戶</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-sky-600 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
              <span>完成後 Max Miles 將自動入賬</span>
            </li>
          </ol>

          <div className="mt-4 p-4 bg-white/50 dark:bg-gray-900/50 rounded-xl">
            <h4 className="font-bold text-sky-900 dark:text-sky-100 mb-2">Max Miles 用途：</h4>
            <ul className="text-sm text-sky-800 dark:text-sky-200 space-y-1">
              <li>✈️ 以 1:1 比例轉換里數至航空夥伴（如國泰航空，最低 1,000 里）</li>
              <li>🎁 即時兌換電子禮券（如 Starbucks、HKTVMall）</li>
              <li>🌏 累積里數兌換機票（20,000 里可換日本機票）</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 申請小貼士 */}
      <section>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Zap className="h-6 w-6 text-amber-600" />
          申請小貼士
        </h2>

        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700 dark:text-gray-300">申請前請關掉 <strong>AdBlocker</strong> 及 <strong>「私人模式」</strong></span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700 dark:text-gray-300">預備好手機及香港身份證，建議一次過交齊所需文件以加快批核</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700 dark:text-gray-300">記下申請參考編號（例如 ABC123456789），方便查詢進度及領取獎賞</span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700 dark:text-gray-300"><strong>領取 MoneyHero 獨家優惠不能同時獲取花旗銀行迎新優惠</strong></span>
            </li>
          </ul>
        </div>
      </section>

      {/* 注意事項 */}
      <section>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <AlertTriangle className="h-6 w-6 text-amber-600" />
          注意事項
        </h2>

        <div className="bg-amber-50 dark:bg-amber-900/20 rounded-2xl border border-amber-200 dark:border-amber-800 p-6">
          <ul className="space-y-3 text-amber-900 dark:text-amber-100">
            <li className="flex items-start gap-2">
              <span className="text-amber-600">⚠️</span>
              <span><strong>領取 MoneyHero 獨家優惠不能同時獲取花旗銀行迎新優惠</strong></span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600">⚠️</span>
              <span>只限全新 Citi 信用卡客戶（過去12個月內未曾持有 Citi 信用卡主卡）</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600">⚠️</span>
              <span>適用信用卡：Citi 八達通白金卡、Citi Cash Back、Citi Rewards、Citi Rewards 銀聯、Citi PremierMiles</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600">⚠️</span>
              <span>不適用於學生卡</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600">⚠️</span>
              <span>申請日期：2026年1月5日中午12時 至 2026年1月12日下午6時</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600">⚠️</span>
              <span>須於2026年2月28日前批核並啟動，批卡後30日內簽賬滿 $4,000</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600">⚠️</span>
              <span>選擇 Max Miles 時，電郵地址需與 Hey Max 賬戶相同</span>
            </li>
          </ul>
        </div>
      </section>

      {/* 相關卡片推薦 */}
      <section>
        <h2 className="text-2xl font-bold mb-4">🏆 推薦信用卡</h2>
        <CardPreviewSection 
          cards={[
            { id: "citi-cashback", highlight: "食肆回贈" },
            { id: "citi-rewards", highlight: "購物娛樂 3%" },
            { id: "citi-premiermiles", highlight: "儲里數" },
            { id: "citi-rewards-unionpay", highlight: "北上必備" },
            { id: "citi-octopus", highlight: "交通 15%" }
          ]}
          title=""
        />
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-2">🎁 立即申請享獨家獎賞！</h2>
        <p className="text-blue-100 mb-2">7 款禮品任揀，價值高達 $4,288</p>
        <p className="text-blue-200 text-sm mb-6">⏰ 推廣期：2026年1月5日 - 1月12日</p>
        <div className="flex flex-wrap justify-center gap-3">
          <a 
            href="https://apply.creatory.moneyhero.com.hk/click?o=168&a=228&sub_id1=pickcardrebate&sub_id2=web"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-colors"
          >
            申請 Citi Cash Back
            <ExternalLink className="h-4 w-4" />
          </a>
          <a 
            href="https://apply.creatory.moneyhero.com.hk/click?o=169&a=228&sub_id1=pickcardrebate&sub_id2=web"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 text-white font-bold rounded-xl hover:bg-white/30 transition-colors"
          >
            申請 Citi Rewards
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </section>
    </div>
  );
}
