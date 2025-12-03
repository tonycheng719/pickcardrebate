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
  
  const rankings = getRankingsByCategory(category.id, 15);
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
  if (rank === 1) return <span className="text-4xl">🥇</span>;
  if (rank === 2) return <span className="text-4xl">🥈</span>;
  if (rank === 3) return <span className="text-4xl">🥉</span>;
  return (
    <span className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xl font-bold">
      {rank}
    </span>
  );
}

function CardDetailSection({ result, rank, showFxInfo = false }: { result: RankingResult; rank: number; showFxInfo?: boolean }) {
  const suitableFor = generateSuitableFor(result);
  const warnings = generateWarnings(result);
  
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
      <div className={`p-6 ${rank <= 3 ? 'bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20' : ''}`}>
        <div className="flex items-start gap-4">
          <RankBadge rank={rank} />
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {result.card.bank}
              </span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {result.card.name}
            </h3>
            
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <div className="bg-emerald-100 dark:bg-emerald-900/30 px-4 py-2 rounded-xl">
                <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                  {result.percentage}%
                </div>
                <div className="text-xs text-emerald-700 dark:text-emerald-300">回贈率</div>
              </div>
              
              {/* FX Fee & Net Percentage for overseas */}
              {showFxInfo && result.foreignCurrencyFee !== undefined && (
                <>
                  <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-xl">
                    <div className={`text-lg font-bold ${result.foreignCurrencyFee === 0 ? 'text-green-600 dark:text-green-400' : 'text-gray-700 dark:text-gray-300'}`}>
                      {result.foreignCurrencyFee === 0 ? '豁免' : `${result.foreignCurrencyFee}%`}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">手續費</div>
                  </div>
                  
                  <div className="bg-blue-100 dark:bg-blue-900/30 px-4 py-2 rounded-xl">
                    <div className={`text-2xl font-bold ${(result.netPercentage ?? 0) >= 3 ? 'text-blue-600 dark:text-blue-400' : 'text-orange-600 dark:text-orange-400'}`}>
                      {result.netPercentage?.toFixed(2)}%
                    </div>
                    <div className="text-xs text-blue-700 dark:text-blue-300">淨回贈</div>
                  </div>
                </>
              )}
              
              <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-xl">
                <div className="text-lg font-bold text-gray-700 dark:text-gray-300">
                  {result.capAsSpending ? `$${result.capAsSpending.toLocaleString()}` : '無上限'}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">簽賬上限</div>
              </div>
              
              {(result.minSpend || result.monthlyMinSpend) && (
                <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-xl">
                  <div className="text-lg font-bold text-gray-700 dark:text-gray-300">
                    {result.minSpend ? `$${result.minSpend}` : `$${result.monthlyMinSpend?.toLocaleString()}`}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {result.minSpend ? '單筆最低' : '月簽要求'}
                  </div>
                </div>
              )}
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {result.rule.description}
            </p>
            
            {/* Conditions */}
            {result.conditions.length > 0 && (
              <div className="mb-4">
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">條件：</div>
                <div className="flex flex-wrap gap-2">
                  {result.conditions.map((condition, i) => (
                    <span key={i} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-lg">
                      {condition}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {/* Suitable For */}
            {suitableFor.length > 0 && (
              <div className="mb-4">
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-1">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  適合人群：
                </div>
                <div className="flex flex-wrap gap-2">
                  {suitableFor.map((item, i) => (
                    <span key={i} className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded-lg">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {/* Warnings */}
            {warnings.length > 0 && (
              <div className="mb-4">
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-1">
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                  注意事項：
                </div>
                <div className="flex flex-wrap gap-2">
                  {warnings.map((warning, i) => (
                    <span key={i} className="px-2 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-xs rounded-lg">
                      {warning}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {/* Actions */}
            <div className="flex flex-wrap gap-2 mt-4">
              <Link href={`/cards/${result.card.id}`}>
                <Button size="sm">
                  查看詳情 <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
              {result.card.applyUrl && (
                <a href={result.card.applyUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm">
                    立即申請 <ExternalLink className="h-4 w-4 ml-1" />
                  </Button>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function QuickRankingTable({ rankings, category }: { rankings: RankingResult[]; category: CategoryConfig }) {
  const isOverseas = category.isForeignCurrency;
  const currentYear = new Date().getFullYear();
  
  // Generate share text
  const shareText = rankings.slice(0, 5).map((r, i) => 
    `${i + 1}. ${r.card.name} ${r.netPercentage !== undefined ? r.netPercentage.toFixed(1) : r.percentage}%`
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
              <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">回贈</th>
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
                  {index === 0 && "🥇"}
                  {index === 1 && "🥈"}
                  {index === 2 && "🥉"}
                  {index > 2 && <span className="text-gray-500">{index + 1}</span>}
                </td>
                <td className="px-3 py-3">
                  <Link href={`/cards/${result.card.id}`} className="hover:text-emerald-600">
                    <div className="font-medium text-gray-900 dark:text-white">{result.card.name}</div>
                  </Link>
                </td>
                <td className="px-3 py-3 text-right whitespace-nowrap">
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">{result.percentage}%</span>
                </td>
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
  
  const rankings = getRankingsByCategory(category.id, 15);
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const lastUpdated = new Date().toLocaleDateString('zh-HK', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  // Structured Data for SEO
  const structuredData = {
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
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
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
              <CardDetailSection key={result.card.id} result={result} rank={index + 1} showFxInfo={category.isForeignCurrency} />
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
        
        {/* Disclaimer */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 text-sm text-gray-600 dark:text-gray-400 mb-8">
          <strong>免責聲明：</strong>本頁面資料僅供參考，以各發卡機構官方公佈為準。
          排名根據公開資料自動計算，不構成任何投資或申請建議。
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
                <span>其他類別排行榜</span>
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

