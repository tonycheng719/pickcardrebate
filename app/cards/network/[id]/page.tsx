import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Wallet, CreditCard, ArrowLeft } from "lucide-react";
import { HK_CARDS } from "@/lib/data/cards";
import { NETWORK_CATEGORIES, getNetworkCategory } from "@/lib/data/card-categories";
import { adminAuthClient } from "@/lib/supabase/admin-client";

interface PageProps {
  params: Promise<{ id: string }>;
}

// 生成靜態路徑
export function generateStaticParams() {
  return NETWORK_CATEGORIES.map((network) => ({
    id: network.id,
  }));
}

// 生成 metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const network = getNetworkCategory(id);
  
  if (!network) {
    return { title: "信用卡 | PickCardRebate" };
  }

  return {
    title: network.seoTitle,
    description: network.seoDescription,
    openGraph: {
      title: network.seoTitle,
      description: network.seoDescription,
    },
  };
}

// 根據卡組織過濾信用卡
async function getNetworkCards(networkId: string) {
  // 根據卡名或 ID 判斷卡組織
  const localCards = HK_CARDS.filter((card) => {
    if (card.hidden) return false;
    
    const cardName = card.name.toLowerCase();
    const cardId = card.id.toLowerCase();
    
    switch (networkId) {
      case "visa":
        return cardName.includes("visa") || cardId.includes("visa");
      case "mastercard":
        return cardName.includes("mastercard") || cardName.includes("master") || 
               cardId.includes("mastercard") || cardId.includes("master");
      case "unionpay":
        return cardName.includes("unionpay") || cardName.includes("銀聯") || 
               cardId.includes("unionpay");
      case "amex":
        return card.bank === "American Express" || cardName.includes("amex") || 
               cardName.includes("american express");
      case "jcb":
        return cardName.includes("jcb") || cardId.includes("jcb");
      default:
        return false;
    }
  });

  // 從資料庫獲取圖片
  const cardIds = localCards.map(c => c.id);
  const { data: dbCards } = await adminAuthClient
    .from('cards')
    .select('id, image_url')
    .in('id', cardIds);

  return localCards.map(card => ({
    ...card,
    imageUrl: dbCards?.find(db => db.id === card.id)?.image_url || card.imageUrl,
  }));
}

export default async function NetworkCategoryPage({ params }: PageProps) {
  const { id } = await params;
  const network = getNetworkCategory(id);

  if (!network) {
    notFound();
  }

  const cards = await getNetworkCards(id);

  // Schema.org 結構化資料
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": network.seoTitle,
    "description": network.seoDescription,
    "url": `https://pickcardrebate.com/cards/network/${id}`,
    "numberOfItems": cards.length,
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
            <li className="text-gray-900 dark:text-white font-medium">{network.name}</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
              <Wallet className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {network.name} 信用卡
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                共 {cards.length} 張信用卡
              </p>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
            {network.description}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map((card) => (
            <Link key={card.id} href={`/cards/${card.id}`}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
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
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors truncate">
                        {card.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{card.bank}</p>
                    </div>
                    
                    <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-purple-600 transition-colors flex-shrink-0" />
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
            <Link href="/cards">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                返回信用卡庫
              </Button>
            </Link>
          </div>
        )}

        {/* Other Networks */}
        <div className="mt-12">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            其他卡組織
          </h2>
          <div className="flex flex-wrap gap-2">
            {NETWORK_CATEGORIES.filter(n => n.id !== id).map((n) => (
              <Link key={n.id} href={`/cards/network/${n.id}`}>
                <Badge 
                  variant="outline" 
                  className="px-3 py-1.5 cursor-pointer hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:border-purple-300 transition-colors"
                >
                  {n.name}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

