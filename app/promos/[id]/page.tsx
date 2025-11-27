import { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, Calendar, Tag, Clock, ArrowLeft, Share2 } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { Promo } from "@/lib/types";
import { PROMOS } from "@/lib/data/promos";

// Revalidate every hour
export const revalidate = 3600;

interface PageProps {
  params: {
    id: string;
  };
}

async function getPromo(id: string): Promise<Promo | null> {
  const supabase = createClient();
  
  // Try to fetch from Supabase
  const { data, error } = await supabase
    .from("promos")
    .select("*")
    .eq("id", id)
    .single();

  if (data) return data as Promo;

  // Fallback to local data
  const localPromo = PROMOS.find(p => p.id === id);
  return localPromo || null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const promo = await getPromo(params.id);
  if (!promo) return { title: "優惠未找到 | PickCardRebate" };

  return {
    title: `${promo.title} | PickCardRebate`,
    description: promo.description,
    openGraph: {
      title: promo.title,
      description: promo.description,
      images: promo.imageUrl ? [promo.imageUrl] : [],
      type: 'article',
    },
  };
}

export default async function PromoDetailPage({ params }: PageProps) {
  const promo = await getPromo(params.id);

  if (!promo) {
    notFound();
  }

  const daysLeft = promo.expiryDate 
    ? Math.ceil((new Date(promo.expiryDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24)) 
    : 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors pb-24 md:pb-0">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Breadcrumb / Back */}
        <div className="mb-6">
            <Link href="/promos" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
                <ArrowLeft className="h-4 w-4 mr-1" /> 返回優惠列表
            </Link>
        </div>

        <article className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border dark:border-gray-800 overflow-hidden">
            {/* Hero Image */}
            <div className="relative h-64 md:h-96 w-full bg-gray-100 dark:bg-gray-800">
                {promo.imageUrl ? (
                    <img 
                        src={promo.imageUrl} 
                        alt={promo.title} 
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-300">
                        <span className="text-6xl">🎁</span>
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="bg-blue-600/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold">
                            {promo.merchant}
                        </span>
                        {daysLeft < 7 && daysLeft > 0 && (
                            <span className="bg-red-500/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold flex items-center">
                                <Clock className="h-3 w-3 mr-1" /> 剩 {daysLeft} 天
                            </span>
                        )}
                    </div>
                    <h1 className="text-2xl md:text-4xl font-bold leading-tight shadow-black/50 drop-shadow-lg">
                        {promo.title}
                    </h1>
                </div>
            </div>

            <div className="p-6 md:p-10">
                {/* Meta Info */}
                <div className="flex flex-wrap gap-4 mb-8 text-sm text-gray-500 dark:text-gray-400 border-b dark:border-gray-800 pb-6">
                    <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        有效期至：{promo.expiryDate}
                    </div>
                    <div className="flex items-center">
                        <Tag className="h-4 w-4 mr-2" />
                        {promo.tags.join(" · ")}
                    </div>
                </div>

                {/* Content */}
                <div className="prose prose-lg dark:prose-invert max-w-none mb-10">
                    <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-6 font-medium">
                        {promo.description}
                    </p>
                    
                    {promo.content ? (
                        <ReactMarkdown>{promo.content}</ReactMarkdown>
                    ) : (
                        <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl text-center text-gray-500 dark:text-gray-400 italic">
                            此優惠暫無詳細內容，請點擊下方按鈕前往官網查看。
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 border-t dark:border-gray-800 pt-8">
                    {promo.url && (
                        <a href={promo.url} target="_blank" rel="noopener noreferrer" className="flex-1">
                            <Button className="w-full h-12 text-base rounded-xl" size="lg">
                                前往官網查看詳情 <ExternalLink className="h-4 w-4 ml-2" />
                            </Button>
                        </a>
                    )}
                    <Link href={`/cards?tags=${promo.tags[0]}`} className="flex-1">
                         <Button variant="outline" className="w-full h-12 text-base rounded-xl dark:border-gray-700 dark:text-white dark:hover:bg-gray-800">
                            查看相關信用卡
                        </Button>
                    </Link>
                </div>
            </div>
        </article>

        {/* JSON-LD for SEO */}
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
            __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "SaleEvent",
                "name": promo.title,
                "description": promo.description,
                "startDate": new Date().toISOString(),
                "endDate": promo.expiryDate,
                "image": promo.imageUrl,
                "url": `https://pickcardrebate.com/promos/${promo.id}`,
                "organizer": {
                    "@type": "Organization",
                    "name": promo.merchant
                }
            }),
            }}
        />
      </main>
    </div>
  );
}

