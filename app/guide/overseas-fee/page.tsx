import { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { 
  AlertTriangle, CheckCircle, XCircle, ChevronRight, 
  CreditCard, Globe, Smartphone, ShoppingCart, Plane,
  Info, ArrowLeft, Calculator, Trophy
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShareButton } from "@/components/share-button";

// SEO Metadata with long-tail keywords
export const metadata: Metadata = {
  title: "海外簽賬手續費完全攻略｜DCC、CBF 陷阱拆解｜網購、App Store、Netflix 避雷指南",
  description: "2024最新！拆解信用卡海外簽賬DCC動態貨幣轉換、CBF跨境手續費陷阱。教你點樣喺網購、App Store、Netflix、Spotify、Airbnb 避開隱藏收費，揀啱信用卡慳到盡！",
  keywords: [
    "DCC 動態貨幣轉換",
    "CBF 跨境手續費",
    "海外簽賬手續費",
    "信用卡外幣手續費",
    "網購手續費",
    "App Store 手續費",
    "Netflix 信用卡收費",
    "Spotify 信用卡",
    "Airbnb 手續費",
    "海外簽賬邊張卡最抵",
    "外幣簽賬免手續費",
    "信用卡海外消費",
    "旅遊信用卡推薦",
    "網購信用卡邊張好",
  ],
  openGraph: {
    title: "海外簽賬手續費完全攻略｜DCC、CBF 陷阱拆解",
    description: "拆解信用卡海外簽賬 DCC、CBF 陷阱，教你點樣避開隱藏收費！",
    type: "article",
    url: "https://pickcardrebate.com/guide/overseas-fee",
  },
};

// Service data for the table
const serviceData = [
  { name: "App Store / Apple Music", country: "🇮🇪 愛爾蘭", region: "海外", risk: "high" },
  { name: "Google Play", country: "🇺🇸 美國", region: "海外", risk: "high" },
  { name: "Netflix", country: "🇳🇱 荷蘭", region: "海外", risk: "high" },
  { name: "Spotify", country: "🇸🇪 瑞典", region: "海外", risk: "high" },
  { name: "YouTube Premium", country: "🇺🇸 美國", region: "海外", risk: "high" },
  { name: "Disney+", country: "🇺🇸 美國", region: "海外", risk: "high" },
  { name: "Amazon Prime Video", country: "🇺🇸 美國", region: "海外", risk: "high" },
  { name: "PlayStation Store", country: "🇭🇰 香港", region: "本地", risk: "low" },
  { name: "Nintendo eShop", country: "🇯🇵 日本", region: "海外", risk: "high" },
  { name: "Steam", country: "🇩🇪 德國", region: "海外", risk: "high" },
  { name: "Airbnb", country: "🇮🇪 愛爾蘭", region: "海外", risk: "high" },
  { name: "Booking.com", country: "🇳🇱 荷蘭", region: "海外", risk: "high" },
  { name: "Agoda", country: "🇸🇬 新加坡", region: "海外", risk: "high" },
  { name: "Trip.com", country: "🇭🇰 香港", region: "本地", risk: "low" },
  { name: "Klook", country: "🇭🇰 香港", region: "本地", risk: "low" },
  { name: "Uber", country: "🇳🇱 荷蘭", region: "海外", risk: "high" },
  { name: "Deliveroo", country: "🇭🇰 香港", region: "本地", risk: "low" },
  { name: "foodpanda", country: "🇭🇰 香港", region: "本地", risk: "low" },
  { name: "OpenAI / ChatGPT Plus", country: "🇺🇸 美國", region: "海外", risk: "high" },
  { name: "Canva Pro", country: "🇦🇺 澳洲", region: "海外", risk: "high" },
];

// Banks data
const bankFeeData = [
  { bank: "HSBC", cbf: true, fee: "1%", note: "所有卡都收" },
  { bank: "恒生銀行", cbf: true, fee: "1%", note: "所有卡都收" },
  { bank: "渣打銀行", cbf: true, fee: "1%", note: "部分卡免（如 Smart Card）" },
  { bank: "Citi", cbf: true, fee: "1%", note: "所有卡都收" },
  { bank: "DBS", cbf: true, fee: "1%", note: "所有卡都收" },
  { bank: "中銀", cbf: false, fee: "0%", note: "不收 CBF" },
  { bank: "東亞銀行", cbf: false, fee: "0%", note: "不收 CBF" },
  { bank: "大新銀行", cbf: false, fee: "0%", note: "不收 CBF" },
  { bank: "富邦銀行", cbf: false, fee: "0%", note: "不收 CBF" },
  { bank: "安信", cbf: false, fee: "0%", note: "不收 CBF" },
  { bank: "WeWa / AEON", cbf: false, fee: "0%", note: "不收 CBF" },
];

// FAQ data for schema
const faqData = [
  {
    question: "什麼是 DCC 動態貨幣轉換？",
    answer: "DCC (Dynamic Currency Conversion) 是指在海外實體店消費時，商戶提供以港幣結算的選項。看似方便，但實際上商戶會收取 3-5% 的手續費，比直接用外幣結算貴得多。建議一定要選擇以當地貨幣結算。"
  },
  {
    question: "什麼是 CBF 跨境手續費？",
    answer: "CBF (Cross Border Fee) 是指當你在海外註冊的網站（如 Netflix、App Store）用港幣付款時，部分銀行會收取的 1% 手續費。即使網站顯示港幣價錢，只要商戶註冊地不在香港，就可能被收取 CBF。"
  },
  {
    question: "Netflix、Spotify 會被收取海外手續費嗎？",
    answer: "會！Netflix 註冊在荷蘭、Spotify 註冊在瑞典，即使你用港幣付款，HSBC、恒生、Citi、DBS 等銀行都會收取 1% CBF 跨境手續費。建議使用中銀、東亞、大新等不收 CBF 的銀行信用卡。"
  },
  {
    question: "App Store 用港幣付款有手續費嗎？",
    answer: "有！Apple 的收單機構在愛爾蘭，即使 App Store 顯示港幣價錢，部分銀行（如 HSBC、恒生）仍會收取 1% CBF。建議使用不收 CBF 的信用卡，或考慮用 Apple Gift Card 增值。"
  },
  {
    question: "如何避免海外簽賬手續費？",
    answer: "1) 實體店消費堅持用當地貨幣結算，拒絕 DCC；2) 網購選擇不收 CBF 的銀行信用卡（如中銀、東亞）；3) 使用免外幣手續費的信用卡（如 SC Smart Card、HSBC Pulse）；4) 常用訂閱服務可考慮用 Gift Card 或其他付款方式。"
  }
];

// Structured data
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "海外簽賬手續費完全攻略｜DCC、CBF 陷阱拆解｜網購避雷指南",
  "description": "拆解信用卡海外簽賬 DCC 動態貨幣轉換、CBF 跨境手續費陷阱，教你點樣避開隱藏收費",
  "author": { "@type": "Organization", "name": "PickCardRebate" },
  "publisher": { "@type": "Organization", "name": "PickCardRebate" },
  "datePublished": new Date().toISOString(),
  "dateModified": new Date().toISOString(),
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqData.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
  }))
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "首頁", "item": "https://pickcardrebate.com" },
    { "@type": "ListItem", "position": 2, "name": "攻略", "item": "https://pickcardrebate.com/guide" },
    { "@type": "ListItem", "position": 3, "name": "海外簽賬手續費攻略", "item": "https://pickcardrebate.com/guide/overseas-fee" }
  ]
};

export default function OverseasFeePage() {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      
      <Navbar />
      
      <main className="container mx-auto px-4 py-6 pb-24 md:pb-8 max-w-4xl">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
          <Link href="/" className="hover:text-emerald-600 flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" /> 首頁
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-900 dark:text-white">海外簽賬手續費攻略</span>
        </nav>
        
        {/* Hero Section */}
        <header className="mb-10">
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
            <span>📅 {currentYear}年最新</span>
            <span>•</span>
            <span>⏱️ 閱讀時間約 8 分鐘</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
            💳 海外簽賬手續費完全攻略
            <br />
            <span className="text-2xl md:text-3xl text-red-500">DCC、CBF 陷阱大拆解！</span>
          </h1>
          
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
            網購 Netflix、Spotify、App Store 都會中招？教你點樣避開隱藏收費，揀啱信用卡慳到盡！
          </p>
          
          <div className="flex items-center gap-3">
            <ShareButton
              title="海外簽賬手續費完全攻略"
              text="拆解 DCC、CBF 陷阱，教你點樣避開隱藏收費！"
              size="sm"
            />
          </div>
        </header>
        
        {/* Alert Box */}
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-6 mb-10">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />
            <div>
              <h2 className="font-bold text-red-800 dark:text-red-200 text-lg mb-2">⚠️ 你知道嗎？</h2>
              <p className="text-red-700 dark:text-red-300">
                好多人以為用港幣俾錢就無手續費，但其實<strong>商戶註冊地點</strong>先係關鍵！
                即使 Netflix 顯示 HK$63，只要商戶喺海外註冊，部分銀行都會收取 <strong>1% 跨境手續費 (CBF)</strong>。
                每月俾多幾蚊睇落唔多，但一年落嚟可能蝕咗成百蚊！
              </p>
            </div>
          </div>
        </div>
        
        {/* Table of Contents */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 mb-10">
          <h2 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            📑 本文目錄
          </h2>
          <ul className="space-y-2 text-sm">
            <li><a href="#what-is-dcc" className="text-blue-600 dark:text-blue-400 hover:underline">1. 什麼是 DCC 動態貨幣轉換？（實體店陷阱）</a></li>
            <li><a href="#what-is-cbf" className="text-blue-600 dark:text-blue-400 hover:underline">2. 什麼是 CBF 跨境手續費？（網購陷阱）</a></li>
            <li><a href="#high-risk-services" className="text-blue-600 dark:text-blue-400 hover:underline">3. 高危服務一覽：Netflix、Spotify、App Store...</a></li>
            <li><a href="#bank-comparison" className="text-blue-600 dark:text-blue-400 hover:underline">4. 銀行 CBF 收費比較表</a></li>
            <li><a href="#how-to-avoid" className="text-blue-600 dark:text-blue-400 hover:underline">5. 5 招避開手續費陷阱</a></li>
            <li><a href="#recommended-cards" className="text-blue-600 dark:text-blue-400 hover:underline">6. 推薦信用卡</a></li>
            <li><a href="#faq" className="text-blue-600 dark:text-blue-400 hover:underline">7. 常見問題 FAQ</a></li>
          </ul>
        </div>
        
        {/* Section 1: DCC */}
        <section id="what-is-dcc" className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Plane className="h-6 w-6 text-blue-500" />
            1. 什麼是 DCC 動態貨幣轉換？
          </h2>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p>
              <strong>DCC (Dynamic Currency Conversion)</strong> 係指你喺外地實體店碌卡時，商戶主動問你：
              「想用港幣定當地貨幣結算？」
            </p>
            
            <p>
              聽落好似好方便、好貼心，但其實係<strong className="text-red-500">超級陷阱</strong>！
              點解？因為揀咗港幣結算，商戶就會用佢哋自己嘅匯率幫你換錢，
              呢個匯率通常<strong>差過銀行匯率 3-5%</strong>！
            </p>
            
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 my-6">
              <h4 className="font-bold text-amber-800 dark:text-amber-200 mb-2">💡 真實例子</h4>
              <p className="text-amber-700 dark:text-amber-300 text-sm">
                喺日本買 ¥10,000 嘅嘢：<br />
                ❌ 揀 DCC 港幣結算：可能俾 HK$720<br />
                ✅ 揀日圓結算：實際只需 HK$580 左右（視乎匯率）<br />
                <strong>差價可以高達 HK$140！</strong>
              </p>
            </div>
            
            <h3 className="text-xl font-bold mt-6 mb-3">🛡️ 點樣避開 DCC？</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span><strong>永遠揀當地貨幣結算</strong>：俾錢時同店員講「Pay in local currency」或「Pay in Yen/USD/Euro」</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span><strong>睇清楚收據</strong>：如果見到有「HKD」或港幣金額，即係中咗 DCC</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span><strong>拒絕簽名</strong>：如果發現係 DCC，可以要求取消重新結算</span>
              </li>
            </ul>
          </div>
        </section>
        
        {/* Section 2: CBF */}
        <section id="what-is-cbf" className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Globe className="h-6 w-6 text-purple-500" />
            2. 什麼是 CBF 跨境手續費？
          </h2>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p>
              <strong>CBF (Cross Border Fee)</strong> 中文叫「跨境手續費」，係指當你喺
              <strong>海外註冊嘅網站</strong>用港幣簽賬時，部分銀行會收取嘅額外費用（通常 1%）。
            </p>
            
            <p>
              最陰險嘅地方係：<strong className="text-red-500">就算個網站顯示港幣價錢，你都可能中招！</strong>
            </p>
            
            <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-4 my-6">
              <h4 className="font-bold text-purple-800 dark:text-purple-200 mb-2">🤔 點解會咁？</h4>
              <p className="text-purple-700 dark:text-purple-300 text-sm">
                因為銀行係睇<strong>商戶註冊地點</strong>，唔係睇你用咩貨幣！<br /><br />
                例如 Netflix 雖然顯示 HK$63，但 Netflix 嘅收單機構係喺<strong>荷蘭</strong>，
                所以 HSBC、恒生等銀行就會當呢筆係「跨境交易」，收取 1% CBF。
              </p>
            </div>
            
            <h3 className="text-xl font-bold mt-6 mb-3">⚠️ CBF vs 外幣手續費</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-800">
                    <th className="border dark:border-gray-700 px-4 py-2 text-left">費用類型</th>
                    <th className="border dark:border-gray-700 px-4 py-2 text-left">觸發條件</th>
                    <th className="border dark:border-gray-700 px-4 py-2 text-left">收費</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border dark:border-gray-700 px-4 py-2 font-medium">外幣手續費 (FX Fee)</td>
                    <td className="border dark:border-gray-700 px-4 py-2">用非港幣貨幣結算</td>
                    <td className="border dark:border-gray-700 px-4 py-2">通常 1.95%</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-800/50">
                    <td className="border dark:border-gray-700 px-4 py-2 font-medium">跨境手續費 (CBF)</td>
                    <td className="border dark:border-gray-700 px-4 py-2">商戶喺海外註冊（即使用港幣）</td>
                    <td className="border dark:border-gray-700 px-4 py-2">通常 1%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
        
        {/* Section 3: High Risk Services */}
        <section id="high-risk-services" className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Smartphone className="h-6 w-6 text-red-500" />
            3. 高危服務一覽
          </h2>
          
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            以下係香港人常用嘅服務同佢哋嘅註冊地點。<strong className="text-red-500">紅色標記</strong>代表可能被收取 CBF：
          </p>
          
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden mb-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400">服務</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400">註冊地點</th>
                    <th className="px-4 py-3 text-center font-medium text-gray-500 dark:text-gray-400">風險</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {serviceData.map((service, index) => (
                    <tr key={index} className={service.risk === "high" ? "bg-red-50/50 dark:bg-red-900/10" : ""}>
                      <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{service.name}</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{service.country}</td>
                      <td className="px-4 py-3 text-center">
                        {service.risk === "high" ? (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
                            <XCircle className="h-3 w-3 mr-1" /> 可能收 CBF
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                            <CheckCircle className="h-3 w-3 mr-1" /> 本地商戶
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
            <div className="flex items-start gap-2">
              <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <p className="text-blue-700 dark:text-blue-300 text-sm">
                <strong>提示：</strong>以上資料僅供參考，商戶可能隨時更改註冊地點。
                建議留意信用卡月結單，如果見到有 "Cross Border Fee" 或類似字眼，就代表被收取咗 CBF。
              </p>
            </div>
          </div>
        </section>
        
        {/* Section 4: Bank Comparison */}
        <section id="bank-comparison" className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <CreditCard className="h-6 w-6 text-emerald-500" />
            4. 銀行 CBF 收費比較
          </h2>
          
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            唔同銀行對 CBF 嘅政策唔同。以下係主要銀行嘅收費情況：
          </p>
          
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden mb-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400">銀行</th>
                    <th className="px-4 py-3 text-center font-medium text-gray-500 dark:text-gray-400">CBF 收費</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400">備註</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {bankFeeData.map((bank, index) => (
                    <tr key={index} className={!bank.cbf ? "bg-green-50/50 dark:bg-green-900/10" : ""}>
                      <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{bank.bank}</td>
                      <td className="px-4 py-3 text-center">
                        {bank.cbf ? (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
                            {bank.fee}
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                            免收 ✓
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{bank.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-4">
            <h4 className="font-bold text-emerald-800 dark:text-emerald-200 mb-2">✅ 推薦策略</h4>
            <p className="text-emerald-700 dark:text-emerald-300 text-sm">
              如果你經常用 Netflix、Spotify、App Store 等海外服務，
              建議使用<strong>中銀、東亞、大新</strong>等不收 CBF 嘅銀行信用卡，
              可以每年慳返幾十到幾百蚊手續費！
            </p>
          </div>
        </section>
        
        {/* Section 5: How to Avoid */}
        <section id="how-to-avoid" className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            🛡️ 5. 五招避開手續費陷阱
          </h2>
          
          <div className="space-y-4">
            {[
              {
                title: "實體店：堅持用當地貨幣結算",
                desc: "無論店員點講，都要揀「Pay in local currency」。見到 HKD 就即刻 say no！",
                icon: "🏪"
              },
              {
                title: "網購：使用不收 CBF 的銀行卡",
                desc: "Netflix、Spotify、App Store 等海外服務，用中銀、東亞、大新等銀行嘅卡最穩陣。",
                icon: "💳"
              },
              {
                title: "考慮免外幣手續費的卡",
                desc: "如 SC Smart Card、HSBC Pulse 銀聯卡等，外幣簽賬免手續費，北上消費特別適合。",
                icon: "🌍"
              },
              {
                title: "用 Gift Card 增值",
                desc: "App Store、PlayStation Store 等可以買 Gift Card 增值，避開信用卡手續費。",
                icon: "🎁"
              },
              {
                title: "定期檢查月結單",
                desc: "留意有無 \"Cross Border Fee\"、\"FX Fee\" 等字眼，發現問題及早處理。",
                icon: "📋"
              }
            ].map((tip, index) => (
              <div key={index} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-4 flex items-start gap-4">
                <span className="text-3xl">{tip.icon}</span>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-1">{index + 1}. {tip.title}</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{tip.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* Section 6: Recommended Cards */}
        <section id="recommended-cards" className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Trophy className="h-6 w-6 text-amber-500" />
            6. 推薦信用卡
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-2xl p-5 border border-emerald-200 dark:border-emerald-800">
              <h4 className="font-bold text-emerald-800 dark:text-emerald-200 mb-2">🌐 海外網購首選</h4>
              <ul className="space-y-2 text-sm text-emerald-700 dark:text-emerald-300">
                <li>• <strong>中銀 i-card</strong>：不收 CBF，網購 10X 積分</li>
                <li>• <strong>東亞 Flyer World</strong>：不收 CBF，儲里數</li>
                <li>• <strong>大新 ONE+</strong>：不收 CBF，1% 回贈</li>
              </ul>
              <Link href="/blog/best-online-shopping-cards">
                <Button variant="outline" size="sm" className="mt-3 w-full border-emerald-300 text-emerald-700 hover:bg-emerald-100">
                  查看網購卡排行榜 <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-5 border border-blue-200 dark:border-blue-800">
              <h4 className="font-bold text-blue-800 dark:text-blue-200 mb-2">✈️ 海外實體消費首選</h4>
              <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
                <li>• <strong>SC Smart Card</strong>：免外幣手續費</li>
                <li>• <strong>HSBC Pulse</strong>：銀聯免手續費，北上必備</li>
                <li>• <strong>Hang Seng Travel+</strong>：旅遊 7% 回贈</li>
              </ul>
              <Link href="/blog/best-travel-cards">
                <Button variant="outline" size="sm" className="mt-3 w-full border-blue-300 text-blue-700 hover:bg-blue-100">
                  查看旅遊卡排行榜 <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Section 7: FAQ */}
        <section id="faq" className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            ❓ 7. 常見問題 FAQ
          </h2>
          
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div key={index} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                <details className="group">
                  <summary className="flex items-center justify-between p-4 cursor-pointer font-medium text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800">
                    <span>Q: {faq.question}</span>
                    <ChevronRight className="h-5 w-5 text-gray-400 group-open:rotate-90 transition-transform" />
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
        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-6 text-white mb-10">
          <h3 className="text-xl font-bold mb-2">💡 想知邊張卡最適合你？</h3>
          <p className="mb-4 opacity-90">使用我哋嘅回贈計算機，輸入你嘅消費習慣，即刻搵到最高回贈嘅信用卡！</p>
          <Link href="/">
            <Button className="bg-white text-emerald-600 hover:bg-gray-100">
              <Calculator className="h-4 w-4 mr-2" />
              立即計算回贈
            </Button>
          </Link>
        </div>
        
        {/* Related Links */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">🔗 相關文章</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            <Link href="/blog/best-travel-cards">
              <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <Plane className="h-5 w-5 text-emerald-600" />
                <span>旅遊信用卡排行榜</span>
                <ChevronRight className="h-4 w-4 ml-auto text-gray-400" />
              </div>
            </Link>
            <Link href="/blog/best-online-shopping-cards">
              <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <ShoppingCart className="h-5 w-5 text-emerald-600" />
                <span>網購信用卡排行榜</span>
                <ChevronRight className="h-4 w-4 ml-auto text-gray-400" />
              </div>
            </Link>
            <Link href="/">
              <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <Calculator className="h-5 w-5 text-emerald-600" />
                <span>回贈計算機</span>
                <ChevronRight className="h-4 w-4 ml-auto text-gray-400" />
              </div>
            </Link>
            <Link href="/rankings">
              <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <Trophy className="h-5 w-5 text-emerald-600" />
                <span>回贈排行榜</span>
                <ChevronRight className="h-4 w-4 ml-auto text-gray-400" />
              </div>
            </Link>
          </div>
        </div>
        
        {/* Disclaimer */}
        <div className="mt-8 bg-gray-100 dark:bg-gray-800 rounded-xl p-4 text-sm text-gray-600 dark:text-gray-400">
          <strong>免責聲明：</strong>本頁面資料僅供參考，以各發卡機構官方公佈為準。
          銀行政策可能隨時更改，建議直接向銀行查詢最新收費詳情。
        </div>
      </main>
    </div>
  );
}

