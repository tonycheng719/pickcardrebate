import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Building2, CreditCard, ArrowLeft } from "lucide-react";
import { HK_CARDS } from "@/lib/data/cards";
import { BANK_CATEGORIES, getBankCategory } from "@/lib/data/card-categories";
import { adminAuthClient } from "@/lib/supabase/admin-client";

interface PageProps {
  params: Promise<{ id: string }>;
}

// 生成靜態路徑
export function generateStaticParams() {
  return BANK_CATEGORIES.map((bank) => ({
    id: bank.id,
  }));
}

// 生成 metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const bank = getBankCategory(id);
  
  if (!bank) {
    return { title: "銀行信用卡 | PickCardRebate" };
  }

  return {
    title: bank.seoTitle,
    description: bank.seoDescription,
    openGraph: {
      title: bank.seoTitle,
      description: bank.seoDescription,
    },
  };
}

// 獲取銀行的信用卡列表（含資料庫圖片）
async function getBankCards(bankNames: string[]) {
  // 從本地獲取基本卡片資料
  const localCards = HK_CARDS.filter(
    (card) => !card.hidden && bankNames.some(name => 
      card.bank.toLowerCase().includes(name.toLowerCase()) ||
      name.toLowerCase().includes(card.bank.toLowerCase())
    )
  );

  // 從資料庫獲取圖片
  const cardIds = localCards.map(c => c.id);
  const { data: dbCards } = await adminAuthClient
    .from('cards')
    .select('id, image_url')
    .in('id', cardIds);

  // 合併資料
  return localCards.map(card => ({
    ...card,
    imageUrl: dbCards?.find(db => db.id === card.id)?.image_url || card.imageUrl,
  }));
}

export default async function BankCategoryPage({ params }: PageProps) {
  const { id } = await params;
  const bank = getBankCategory(id);

  if (!bank) {
    notFound();
  }

  const cards = await getBankCards(bank.bankNames);

  // Schema.org 結構化資料
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": bank.seoTitle,
    "description": bank.seoDescription,
    "url": `https://pickcardrebate.com/cards/bank/${id}`,
    "numberOfItems": cards.length,
    "itemListElement": cards.map((card, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "name": card.name,
        "url": `https://pickcardrebate.com/cards/${card.id}`,
      }
    })),
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-24 md:pb-0">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <Navbar />

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Breadcrumb */}
        <nav className="mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center text-sm text-gray-500 dark:text-gray-400 gap-2">
            <li><Link href="/" className="hover:text-gray-900 dark:hover:text-white">首頁</Link></li>
            <li>/</li>
            <li><Link href="/cards" className="hover:text-gray-900 dark:hover:text-white">信用卡庫</Link></li>
            <li>/</li>
            <li className="text-gray-900 dark:text-white font-medium">{bank.name}</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
              <Building2 className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {bank.name}信用卡
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                共 {cards.length} 張信用卡
              </p>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
            {bank.description}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map((card) => (
            <Link key={card.id} href={`/cards/${card.id}`}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    {/* Card Image */}
                    <div className={`w-20 h-12 rounded-lg overflow-hidden flex-shrink-0 ${!card.imageUrl ? (card.style?.bgColor || 'bg-gray-600') : 'bg-white dark:bg-gray-800 border'}`}>
                      {card.imageUrl ? (
                        <img 
                          src={card.imageUrl} 
                          alt={card.name}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <div className={`w-full h-full flex items-center justify-center ${card.style?.textColor || 'text-white'}`}>
                          <CreditCard className="h-6 w-6" />
                        </div>
                      )}
                    </div>
                    
                    {/* Card Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                        {card.name}
                      </h3>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {card.tags?.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {cards.length === 0 && (
          <div className="text-center py-16">
            <CreditCard className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              暫無信用卡
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              此銀行暫時沒有信用卡資料
            </p>
            <Link href="/cards">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                返回信用卡庫
              </Button>
            </Link>
          </div>
        )}

        {/* Other Banks */}
        <div className="mt-12">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            其他銀行
          </h2>
          <div className="flex flex-wrap gap-2">
            {BANK_CATEGORIES.filter(b => b.id !== id).map((b) => (
              <Link key={b.id} href={`/cards/bank/${b.id}`}>
                <Badge 
                  variant="outline" 
                  className="px-3 py-1.5 cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 transition-colors"
                >
                  {b.name}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

