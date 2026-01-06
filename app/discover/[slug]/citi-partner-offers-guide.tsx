// Citi 信用卡合作夥伴獎賞攻略文章內容組件
// 用於 /discover/citi-partner-offers 頁面
// SEO 優化：針對「Citi 信用卡迎新」「MoneyHero Citi」「Citi 信用卡優惠」等關鍵字

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  AlertTriangle, CheckCircle, XCircle, ChevronRight,
  CreditCard, Gift, Star, ExternalLink,
  Info, Zap, HelpCircle, Wallet, Plane, ShoppingCart,
  CircleDollarSign, TrendingUp, Shield, Sparkles
} from "lucide-react";
import { CardTableCell, CardLinkWithImage, CardBadgeWithImage } from "@/app/discover/components/card-link-with-image";
import { CardPreviewSection } from "@/app/discover/components/card-preview-section";

// FAQ 數據 - SEO 結構化資料
export const citiPartnerOffersFaqData = [
  {
    question: "經合作夥伴申請 Citi 信用卡有咩好處？",
    answer: "經 MoneyHero 等合作夥伴申請，可以獲得額外獎賞（如 Apple Store 禮品卡、現金回贈），加上銀行本身的迎新優惠，總獎賞可高達 $4,288+！比直接去銀行官網申請更著數。"
  },
  {
    question: "合作夥伴獎賞同銀行迎新可以同時享有嗎？",
    answer: "可以！合作夥伴獎賞（如 MoneyHero 獎賞）同銀行迎新優惠係獨立計算，兩者可以同時享有。只要經指定連結申請並完成要求，就可以疊加所有獎賞！"
  },
  {
    question: "申請 Citi 信用卡有咩要求？",
    answer: "大部分 Citi 信用卡最低入息要求為年薪 $120,000（即月薪 $10,000），Citi Prestige 則要求年薪 $600,000。首年年費通常可獲豁免。"
  },
  {
    question: "Citi 信用卡迎新獎賞點樣計？",
    answer: "視乎卡種，一般需要在首2-3個月內完成指定簽賬要求（通常 $5,000-$10,000）。合作夥伴獎賞另計，通常只需成功批核即可獲得。"
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
    question: "合作夥伴獎賞幾時會收到？",
    answer: "通常在信用卡批核後 2-4 個月內會收到 MoneyHero 發出的獎賞通知，需要按指示領取。建議申請後保留所有電郵通知。"
  },
  {
    question: "已持有 Citi 信用卡可以再申請嗎？",
    answer: "可以申請其他 Citi 卡種，但迎新獎賞通常只限新客戶（過去12個月未持有同系列 Citi 信用卡）。合作夥伴獎賞政策各有不同，建議查閱條款。"
  }
];

// Citi 合作夥伴卡資料
const citiPartnerCards = [
  {
    id: "citi-cashback",
    name: "Citi Cash Back Card",
    tagline: "食肆回贈之王",
    annualFee: "$1,800 (首年免)",
    minIncome: "$120,000/年",
    partnerReward: "高達 $4,288 獎賞 + $2,200 Apple Store 禮品卡",
    bankWelcome: "迎新簽賬回贈（視乎推廣期）",
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
    partnerReward: "高達 $4,288 獎賞 + $2,200 Apple Store 禮品卡",
    bankWelcome: "迎新簽賬回贈（視乎推廣期）",
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
    partnerReward: "高達 $4,288 獎賞 + $2,200 Apple Store 禮品卡",
    bankWelcome: "迎新簽賬回贈（視乎推廣期）",
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
    partnerReward: "高達 $4,288 獎賞 + $2,200 Apple Store 禮品卡",
    bankWelcome: "迎新簽賬里數（視乎推廣期）",
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
          想申請 Citi 信用卡？經合作夥伴申請可以獲得<strong className="text-emerald-600 dark:text-emerald-400">額外獎賞</strong>，
          加上銀行迎新優惠，總獎賞可高達 <strong className="text-amber-600 dark:text-amber-400">$4,288+</strong>！
        </p>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          本文為你整理所有有合作夥伴獎賞的 Citi 信用卡，包括銀行迎新、合作夥伴獎賞內容，以及申請連結。
        </p>

        {/* 重點提示框 */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
          <div className="flex items-start gap-3">
            <Sparkles className="h-6 w-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-blue-900 dark:text-blue-100 mb-2">💡 合作夥伴獎賞 vs 官網申請</h3>
              <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                <li>✅ 經 MoneyHero 申請：銀行迎新 <strong>+</strong> 合作夥伴獎賞（雙重獎賞）</li>
                <li>❌ 直接官網申請：只有銀行迎新</li>
                <li>📌 獎賞可疊加，經合作夥伴申請更著數！</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Citi 信用卡總覽表 */}
      <section>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <CreditCard className="h-6 w-6 text-blue-600" />
          Citi 合作夥伴獎賞信用卡一覽
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <thead className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold">信用卡</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">年費</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">合作夥伴獎賞</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">適合對象</th>
                <th className="px-4 py-3 text-center text-sm font-semibold">申請</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {citiPartnerCards.map((card) => (
                <tr key={card.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="px-4 py-3">
                    <CardTableCell cardId={card.id} cardName={card.name} />
                  </td>
                  <td className="px-4 py-3 text-sm">{card.annualFee}</td>
                  <td className="px-4 py-3 text-sm font-medium text-amber-600 dark:text-amber-400">{card.partnerReward}</td>
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
      </section>

      {/* 每張卡詳細介紹 */}
      <section>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Gift className="h-6 w-6 text-amber-600" />
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
                  <CardLinkWithImage cardId={card.id} showDetails={false} />
                </div>

                {/* 獎賞資訊 */}
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 border border-amber-200 dark:border-amber-800">
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="h-5 w-5 text-amber-600" />
                      <span className="font-bold text-amber-900 dark:text-amber-100">合作夥伴獎賞</span>
                    </div>
                    <p className="text-amber-800 dark:text-amber-200 font-medium">{card.partnerReward}</p>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center gap-2 mb-2">
                      <Gift className="h-5 w-5 text-blue-600" />
                      <span className="font-bold text-blue-900 dark:text-blue-100">銀行迎新</span>
                    </div>
                    <p className="text-blue-800 dark:text-blue-200">{card.bankWelcome}</p>
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
                  立即申請享合作夥伴獎賞
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 申請流程 */}
      <section>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Info className="h-6 w-6 text-blue-600" />
          申請流程
        </h2>

        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
          <ol className="space-y-4">
            <li className="flex items-start gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">1</span>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white">點擊合作夥伴申請連結</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">經本頁面的申請連結前往 MoneyHero，確保獎賞資格</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">2</span>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white">填寫申請資料</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">按指示填寫個人資料及入息證明</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">3</span>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white">等待批核</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">通常 3-7 個工作天內會收到批核結果</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-sm">4</span>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white">領取獎賞</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">批核後按 MoneyHero 指示領取合作夥伴獎賞，另完成迎新簽賬要求獲銀行迎新</p>
              </div>
            </li>
          </ol>
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
              <span>合作夥伴獎賞及銀行迎新優惠或會不時更改，請以申請時條款為準</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600">⚠️</span>
              <span>迎新獎賞通常只限新客戶（過去 12 個月未持有同系列 Citi 信用卡）</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600">⚠️</span>
              <span>需於指定時間內完成簽賬要求方可獲得銀行迎新獎賞</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600">⚠️</span>
              <span>合作夥伴獎賞領取方式及時間請留意 MoneyHero 電郵通知</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600">⚠️</span>
              <span>Citi Prestige 年費 $3,800 不獲豁免，但繳年費可獲 30,000 里數</span>
            </li>
          </ul>
        </div>
      </section>

      {/* 相關卡片推薦 */}
      <section>
        <h2 className="text-2xl font-bold mb-4">🏆 推薦信用卡</h2>
        <CardPreviewSection 
          cardIds={["citi-cashback", "citi-rewards", "citi-premiermiles", "citi-rewards-unionpay", "citi-prestige"]}
          title=""
        />
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-2">🎉 立即申請享雙重獎賞！</h2>
        <p className="text-blue-100 mb-6">經合作夥伴申請，同時享銀行迎新 + 合作夥伴獎賞</p>
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

