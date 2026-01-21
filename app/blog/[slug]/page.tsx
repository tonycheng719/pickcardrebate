import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { 
  Trophy, ChevronRight, Info, AlertTriangle, CheckCircle,
  CreditCard, ExternalLink, Scale, ArrowLeft, Calendar,
  Lightbulb, Share2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  getRankingsByCategory, 
  RANKING_CATEGORIES, 
  getCategoryBySlug,
  RankingResult,
  formatCapAsSpendingLimit,
  generateSuitableFor,
  generateWarnings,
  CategoryConfig
} from "@/lib/logic/rankings";
import { Navbar } from "@/components/navbar";
import { BottomNav } from "@/components/bottom-nav";
import { ShareButton } from "@/components/share-button";
import { getCardsWithImages } from "@/lib/data/get-cards-with-images";
import { PARTNER_MODE_ENABLED } from "@/lib/config";

// Helper to get the correct apply URL based on partner mode
function getApplyUrl(card: { applyUrl?: string; officialApplyUrl?: string }): string | undefined {
  if (PARTNER_MODE_ENABLED && card.applyUrl) {
    return card.applyUrl;
  }
  return card.officialApplyUrl || card.applyUrl;
}

// Generate static params for all categories
export async function generateStaticParams() {
  return RANKING_CATEGORIES.map((category) => ({
    slug: category.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  
  if (!category) {
    return { title: "頁面不存在" };
  }
  
  const cards = await getCardsWithImages();
  const rankings = getRankingsByCategory(category.id, 15, cards);
  const topCard = rankings[0];
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  
  const title = `${currentYear} 最抵${category.name}信用卡 Top 15 | ${currentMonth}月更新`;
  const description = `${currentYear}年${currentMonth}月最新！${category.name}信用卡回贈排行榜。第一名：${topCard?.card.name} ${topCard?.percentage}% 回贈。比較香港各大銀行${category.name}信用卡優惠。`;
  
  return {
    title,
    description,
    keywords: [
      `${category.name}信用卡`,
      `最抵${category.name}信用卡`,
      `${currentYear}${category.name}信用卡`,
      "信用卡回贈",
      "信用卡比較",
      "香港信用卡",
    ],
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: new Date().toISOString(),
      modifiedTime: new Date().toISOString(),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

function RankBadge({ rank }: { rank: number }) {
  const colors = {
    1: "bg-gradient-to-br from-amber-400 to-amber-600 text-white shadow-amber-200",
    2: "bg-gradient-to-br from-gray-300 to-gray-500 text-white shadow-gray-200",
    3: "bg-gradient-to-br from-orange-400 to-orange-600 text-white shadow-orange-200",
  };
  const baseClass = "w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold shadow-lg";
  
  if (rank <= 3) {
    return <span className={`${baseClass} ${colors[rank as 1 | 2 | 3]}`}>{rank}</span>;
  }
  return <span className={`${baseClass} bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300`}>{rank}</span>;
}

function CardDetailSection({ result, rank, showFxInfo = false, showMiles = false }: { result: RankingResult; rank: number; showFxInfo?: boolean; showMiles?: boolean }) {
  const warnings = generateWarnings(result);
  
  return (
    <div className={`bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden ${rank <= 3 ? 'ring-2 ring-amber-200 dark:ring-amber-800' : ''}`}>
      <div className="p-4">
        {/* Header Row */}
        <div className="flex items-center gap-3 mb-3">
          <RankBadge rank={rank} />
          
          {/* Card Image */}
          <div className={`w-12 h-8 rounded flex items-center justify-center overflow-hidden flex-shrink-0 ${!result.card.imageUrl ? (result.card.style?.bgColor || 'bg-gray-600') : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'}`}>
            {result.card.imageUrl ? (
              <img src={result.card.imageUrl} alt={result.card.name} className="max-h-full max-w-full object-contain" />
            ) : (
              <span className={`text-[8px] font-bold ${result.card.style?.textColor || 'text-white'}`}>{result.card.bank.slice(0, 2)}</span>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-gray-900 dark:text-white truncate">{result.card.name}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {result.card.bank}
              {showMiles && result.milesProgram && (
                <span className="ml-2 text-purple-600 dark:text-purple-400">• {result.milesProgram}</span>
              )}
            </p>
          </div>
          
          {/* Main Stats */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="text-right">
              {showMiles && result.dollarsPerMile ? (
                <>
                  <div className="text-xl font-bold text-purple-600 dark:text-purple-400">${result.dollarsPerMile.toFixed(2)}/里</div>
                  <div className="text-xs text-gray-500">≈ {result.percentage.toFixed(1)}% 回贈</div>
                </>
              ) : (
                <>
                  <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400">{result.percentage}%</div>
                  {showFxInfo && result.netPercentage !== undefined && (
                    <div className="text-xs text-gray-500">淨{result.netPercentage.toFixed(1)}%</div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        
        {/* Description & Stats Row */}
        <div className="flex flex-wrap items-center gap-2 text-xs mb-3">
          <span className="text-gray-600 dark:text-gray-400">{result.rule.description}</span>
          <span className="text-gray-400">•</span>
          <span className="text-gray-500">
            上限 {result.capAsSpending ? `$${result.capAsSpending.toLocaleString()}` : '無'}
          </span>
          {(result.minSpend || result.monthlyMinSpend) && (
            <>
              <span className="text-gray-400">•</span>
              <span className="text-gray-500">
                {result.minSpend ? `單筆$${result.minSpend}` : `月簽$${result.monthlyMinSpend?.toLocaleString()}`}
              </span>
            </>
          )}
          {showFxInfo && result.foreignCurrencyFee !== undefined && (
            <>
              <span className="text-gray-400">•</span>
              <span className={result.foreignCurrencyFee === 0 ? 'text-green-600' : 'text-gray-500'}>
                手續費 {result.foreignCurrencyFee === 0 ? '豁免' : `${result.foreignCurrencyFee}%`}
              </span>
            </>
          )}
        </div>
        
        {/* Tags Row */}
        <div className="flex flex-wrap items-center gap-1.5 mb-3">
          {result.conditions.slice(0, 3).map((condition, i) => (
            <span key={i} className="px-2 py-0.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs rounded">
              {condition}
            </span>
          ))}
          {warnings.slice(0, 2).map((warning, i) => (
            <span key={`w-${i}`} className="px-2 py-0.5 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 text-xs rounded">
              ⚠️ {warning.length > 15 ? warning.slice(0, 15) + '...' : warning}
            </span>
          ))}
        </div>
        
        {/* Actions */}
        <div className="flex gap-2">
          <Link href={`/cards/${result.card.id}`} className="flex-1">
            <Button size="sm" className="w-full text-xs h-8">
              詳情 <ChevronRight className="h-3 w-3 ml-1" />
            </Button>
          </Link>
          {getApplyUrl(result.card) && (
            <a href={getApplyUrl(result.card)} target="_blank" rel="noopener noreferrer" className="flex-1">
              <Button variant="outline" size="sm" className="w-full text-xs h-8">
                申請 <ExternalLink className="h-3 w-3 ml-1" />
              </Button>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function QuickRankingTable({ rankings, category }: { rankings: RankingResult[]; category: CategoryConfig }) {
  const isOverseas = category.isForeignCurrency;
  const isMiles = category.isMilesCard;
  const currentYear = new Date().getFullYear();
  
  // Generate share text
  const shareText = rankings.slice(0, 5).map((r, i) => 
    isMiles && r.dollarsPerMile
      ? `${i + 1}. ${r.card.name} $${r.dollarsPerMile.toFixed(2)}/里`
      : `${i + 1}. ${r.card.name} ${r.netPercentage !== undefined ? r.netPercentage.toFixed(1) : r.percentage}%`
  ).join('\n');
  
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden mb-8">
      <div className="p-4 border-b border-gray-100 dark:border-gray-800 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-gray-900 dark:text-white">
            📊 {category.name} Top 15 快速一覽
          </h2>
          <ShareButton
            title={`${currentYear} 最抵${category.name}信用卡 Top 15`}
            text={`${category.icon} ${category.name}信用卡排行榜\n\n${shareText}\n\n👉 完整排名：`}
            size="sm"
            variant="ghost"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">#</th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">信用卡</th>
              {isMiles ? (
                <>
                  <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">$/里</th>
                  <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">里數計劃</th>
                </>
              ) : (
                <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">回贈</th>
              )}
              {isOverseas && (
                <>
                  <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">手續費</th>
                  <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">淨回贈</th>
                </>
              )}
              <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">簽賬上限</th>
              <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">最低消費</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {rankings.map((result, index) => (
              <tr key={result.card.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="px-3 py-3 whitespace-nowrap">
                  {index <= 2 ? (
                    <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold text-white ${
                      index === 0 ? 'bg-gradient-to-br from-amber-400 to-amber-600' :
                      index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-500' :
                      'bg-gradient-to-br from-orange-400 to-orange-600'
                    }`}>{index + 1}</span>
                  ) : (
                    <span className="text-gray-500">{index + 1}</span>
                  )}
                </td>
                <td className="px-3 py-3">
                  <Link href={`/cards/${result.card.id}`} className="hover:text-emerald-600 flex items-center gap-2">
                    {/* Card Image */}
                    <div className={`w-8 h-5 rounded flex items-center justify-center overflow-hidden flex-shrink-0 ${!result.card.imageUrl ? (result.card.style?.bgColor || 'bg-gray-600') : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'}`}>
                      {result.card.imageUrl ? (
                        <img 
                          src={result.card.imageUrl} 
                          alt={result.card.name}
                          className="max-h-full max-w-full object-contain"
                        />
                      ) : (
                        <span className={`text-[6px] font-bold ${result.card.style?.textColor || 'text-white'}`}>
                          {result.card.bank.slice(0, 2)}
                        </span>
                      )}
                    </div>
                    <div className="font-medium text-gray-900 dark:text-white">{result.card.name}</div>
                  </Link>
                </td>
                {isMiles ? (
                  <>
                    <td className="px-3 py-3 text-right whitespace-nowrap">
                      <span className="font-bold text-purple-600 dark:text-purple-400">${result.dollarsPerMile?.toFixed(2)}/里</span>
                    </td>
                    <td className="px-3 py-3 text-right whitespace-nowrap">
                      <span className="text-gray-600 dark:text-gray-400">{result.milesProgram}</span>
                    </td>
                  </>
                ) : (
                  <td className="px-3 py-3 text-right whitespace-nowrap">
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">{result.percentage}%</span>
                  </td>
                )}
                {isOverseas && (
                  <>
                    <td className="px-3 py-3 text-right whitespace-nowrap">
                      {result.foreignCurrencyFee === 0 ? (
                        <span className="text-green-600 dark:text-green-400 font-medium">豁免</span>
                      ) : (
                        <span className="text-gray-600 dark:text-gray-400">{result.foreignCurrencyFee}%</span>
                      )}
                    </td>
                    <td className="px-3 py-3 text-right whitespace-nowrap">
                      <span className={`font-bold ${(result.netPercentage ?? 0) >= 3 ? 'text-emerald-600 dark:text-emerald-400' : 'text-orange-600 dark:text-orange-400'}`}>
                        {result.netPercentage?.toFixed(2)}%
                      </span>
                    </td>
                  </>
                )}
                <td className="px-3 py-3 text-right text-gray-600 dark:text-gray-400 whitespace-nowrap">
                  {result.capAsSpending ? (
                    `$${result.capAsSpending.toLocaleString()}`
                  ) : (
                    <span className="text-green-600 dark:text-green-400">無上限</span>
                  )}
                </td>
                <td className="px-3 py-3 text-right text-gray-600 dark:text-gray-400 whitespace-nowrap">
                  {result.minSpend ? (
                    `單筆$${result.minSpend.toLocaleString()}`
                  ) : result.monthlyMinSpend ? (
                    `月簽$${result.monthlyMinSpend.toLocaleString()}`
                  ) : (
                    <span className="text-green-600 dark:text-green-400">無</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default async function BlogCategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  
  if (!category) {
    notFound();
  }
  
  const cards = await getCardsWithImages();
  const rankings = getRankingsByCategory(category.id, 15, cards);
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const lastUpdated = new Date().toLocaleDateString('zh-HK', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  // FAQ Data
  const faqItems = [
    {
      question: `${currentYear}年最抵${category.name}信用卡係邊張？`,
      answer: `根據最新數據，${rankings[0]?.card.name} 以 ${rankings[0]?.percentage}% 回贈率排名第一，${rankings[1]?.card.name} 以 ${rankings[1]?.percentage}% 排名第二。`
    },
    {
      question: `${category.name}信用卡有咩要注意？`,
      answer: `主要留意：1) 簽賬上限 - 部分卡有每月上限；2) 最低消費 - 部分卡需要月簽滿指定金額；3) 登記要求 - 部分優惠需要預先登記；4) 優惠期限 - 留意優惠到期日。`
    },
    {
      question: `點樣揀${category.name}信用卡？`,
      answer: `建議根據你嘅消費習慣揀卡：高消費用戶可選回贈率高但有上限嘅卡；低消費用戶適合無最低消費要求嘅卡；經常外遊嘅話要留意外幣手續費。`
    },
    {
      question: `${category.name}信用卡回贈幾時入賬？`,
      answer: `大部分信用卡回贈會喺下一期月結單入賬，部分銀行需要手動換領或透過 App 確認。詳情請參閱各卡詳情頁面。`
    }
  ];
  
  // Structured Data for SEO - Article
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": `${currentYear} 最抵${category.name}信用卡 Top 15`,
    "description": `${category.name}信用卡回贈排行榜，第一名：${rankings[0]?.card.name} ${rankings[0]?.percentage}% 回贈`,
    "datePublished": new Date().toISOString(),
    "dateModified": new Date().toISOString(),
    "author": {
      "@type": "Organization",
      "name": "PickCardRebate"
    },
    "publisher": {
      "@type": "Organization",
      "name": "PickCardRebate",
      "url": "https://pickcardrebate.com"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://pickcardrebate.com/blog/${slug}`
    }
  };
  
  // BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "首頁",
        "item": "https://pickcardrebate.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "排行榜",
        "item": "https://pickcardrebate.com/rankings"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": `${category.name}信用卡排行榜`,
        "item": `https://pickcardrebate.com/blog/${slug}`
      }
    ]
  };
  
  // FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };
  
  // ItemList Schema for Rankings
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `${currentYear} 最抵${category.name}信用卡排行榜`,
    "description": `${category.description}`,
    "numberOfItems": rankings.length,
    "itemListElement": rankings.slice(0, 10).map((result, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": result.card.name,
      "url": `https://pickcardrebate.com/cards/${result.card.id}`
    }))
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      
      <Navbar />
      
      <main className="container mx-auto px-4 py-6 pb-24 md:pb-8 max-w-4xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
          <Link href="/rankings" className="hover:text-emerald-600 flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            排行榜
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span>{category.name}</span>
        </div>
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
            <Calendar className="h-4 w-4" />
            最後更新：{lastUpdated}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            {category.icon} {currentYear} 最抵{category.name}信用卡 Top 15
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {category.description}。根據官方條款自動計算，助你搵到最高回贈！
          </p>
          
          {/* Share */}
          <div className="flex items-center gap-3 mt-4">
            <ShareButton
              title={`${currentYear} 最抵${category.name}信用卡 Top 15`}
              text={`${category.name}信用卡排行榜：第一名 ${rankings[0]?.card.name} ${rankings[0]?.percentage}% 回贈`}
              size="sm"
            />
          </div>
        </div>
        
        {/* Quick Summary */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-6 text-white mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="h-6 w-6" />
            <span className="font-bold text-lg">第一名</span>
          </div>
          <div className="text-3xl font-bold mb-1">{rankings[0]?.card.name}</div>
          <div className="flex items-center gap-4 text-white/90">
            <span className="text-2xl font-bold">{rankings[0]?.percentage}% 回贈</span>
            <span>|</span>
            <span>{formatCapAsSpendingLimit(rankings[0])}</span>
          </div>
        </div>
        
        {/* Quick Table */}
        <QuickRankingTable rankings={rankings} category={category} />
        
        {/* Detailed Analysis */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-amber-500" />
            詳細分析
          </h2>
          
          <div className="space-y-6">
            {rankings.map((result, index) => (
              <CardDetailSection key={result.card.id} result={result} rank={index + 1} showFxInfo={category.isForeignCurrency} showMiles={category.isMilesCard} />
            ))}
          </div>
        </div>
        
        {/* Tips Section */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            💡 小貼士
          </h2>
          <ul className="space-y-2 text-blue-800 dark:text-blue-200">
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <span>回贈率高唔代表一定最抵，要留意簽賬上限同最低消費要求</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <span>部分優惠需要預先登記，記得喺消費前完成登記</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <span>留意優惠期限，部分限時優惠可能隨時結束</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <span>使用我哋嘅<Link href="/" className="underline">回贈計算機</Link>計算實際回贈金額</span>
            </li>
          </ul>
        </div>
        
        {/* FAQ Section */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            ❓ 常見問題
          </h2>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div key={index} className="border-b border-gray-100 dark:border-gray-800 pb-4 last:border-0 last:pb-0">
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                  Q: {item.question}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  A: {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Disclaimer */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 text-sm text-gray-600 dark:text-gray-400 mb-8">
          <strong>免責聲明：</strong>本頁面資料僅供參考，以各發卡機構官方公佈為準。
          排名根據公開資料自動計算，不構成任何投資或申請建議。
        </div>
        
        {/* Related Categories - Internal Link Optimization */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">📊 其他熱門排行榜</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {RANKING_CATEGORIES
              .filter(cat => cat.slug !== slug)
              .slice(0, 6)
              .map(cat => (
                <Link key={cat.id} href={`/blog/${cat.slug}`}>
                  <div className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 dark:border-gray-800 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:border-emerald-200 dark:hover:border-emerald-800 transition-colors group">
                    <span className="text-2xl">{cat.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                        {cat.name}信用卡
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{cat.description.slice(0, 20)}...</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 flex-shrink-0" />
                  </div>
                </Link>
              ))}
          </div>
        </div>
        
        {/* Related Links */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">🔗 相關連結</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            <Link href="/">
              <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <CreditCard className="h-5 w-5 text-emerald-600" />
                <span>回贈計算機</span>
                <ChevronRight className="h-4 w-4 ml-auto text-gray-400" />
              </div>
            </Link>
            <Link href="/cards/compare">
              <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <Scale className="h-5 w-5 text-emerald-600" />
                <span>信用卡比較</span>
                <ChevronRight className="h-4 w-4 ml-auto text-gray-400" />
              </div>
            </Link>
            <Link href="/cards">
              <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <CreditCard className="h-5 w-5 text-emerald-600" />
                <span>所有信用卡</span>
                <ChevronRight className="h-4 w-4 ml-auto text-gray-400" />
              </div>
            </Link>
            <Link href="/rankings">
              <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <Trophy className="h-5 w-5 text-emerald-600" />
                <span>全部排行榜</span>
                <ChevronRight className="h-4 w-4 ml-auto text-gray-400" />
              </div>
            </Link>
          </div>
        </div>
      </main>
      
      <BottomNav />
    </div>
  );
}

