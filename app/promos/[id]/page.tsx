import { Metadata } from "next";
import { notFound } from "next/navigation";
import { adminAuthClient } from "@/lib/supabase/admin-client";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { ExternalLink, Calendar, Tag, Clock, ArrowLeft, MessageCircle, ChevronDown, Share2 } from "lucide-react";
import { SharePromoButton } from "./share-promo-button";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { Promo, PromoFAQ } from "@/lib/types";
import { PROMOS } from "@/lib/data/promos";
import { WHATSAPP_GROUP_URL } from "@/lib/constants";
import { getSystemSetting } from "@/lib/data/settings";
import { HK_CARDS } from "@/lib/data/cards";

// Revalidate every hour
export const revalidate = 3600;
// Allow dynamic params not generated at build time
export const dynamicParams = true;

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

// Generate static params for known promos at build time
export async function generateStaticParams() {
  const localIds = PROMOS.map(p => p.id);
  const allIds = Array.from(new Set([...localIds]));
  
  return allIds.map((id) => ({
    id: id,
  }));
}

async function getPromo(id: string): Promise<Promo | null> {
  try {
    const supabase = adminAuthClient;
    
    const { data, error } = await supabase
      .from("promos")
      .select("*")
      .eq("id", id)
      .single();

    if (data) return data as Promo;
  } catch (e) {
      console.error("getPromo exception:", e);
  }

  const localPromo = PROMOS.find(p => p.id === id);
  return localPromo || null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const promo = await getPromo(id);
  if (!promo) return { title: "優惠未找到" };

  const seoTitle = promo.seoTitle || `${promo.title} - ${promo.merchant}信用卡優惠`;
  const seoDescription = promo.seoDescription || `${promo.description} 有效期至 ${promo.expiryDate}。立即了解如何獲取最高回贈！`;

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: [
      promo.merchant,
      "信用卡優惠",
      "信用卡回贈",
      ...promo.tags,
      ...(promo.relatedCardIds?.map(id => {
        const card = HK_CARDS.find(c => c.id === id);
        return card ? card.name : '';
      }).filter(Boolean) || []),
    ],
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      images: promo.imageUrl ? [{ url: promo.imageUrl, width: 1200, height: 630, alt: promo.title }] : [],
      type: 'article',
      url: `https://pickcardrebate.com/promos/${promo.id}`,
      siteName: "PickCardRebate",
      locale: "zh_HK",
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDescription,
      images: promo.imageUrl ? [promo.imageUrl] : [],
    },
    alternates: {
      canonical: `https://pickcardrebate.com/promos/${promo.id}`,
    },
  };
}

// FAQ Accordion Component
function FAQSection({ faqs }: { faqs: PromoFAQ[] }) {
  if (!faqs || faqs.length === 0) return null;
  
  return (
    <section className="mt-10 border-t dark:border-gray-800 pt-8">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
        <span className="text-2xl">❓</span> 常見問題
      </h2>
      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <details 
            key={index} 
            className="group bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden"
          >
            <summary className="flex items-center justify-between p-4 cursor-pointer list-none font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <span>{faq.question}</span>
              <ChevronDown className="h-5 w-5 text-gray-500 group-open:rotate-180 transition-transform" />
            </summary>
            <div className="px-4 pb-4 text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              <ReactMarkdown>{faq.answer}</ReactMarkdown>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

export default async function PromoDetailPage({ params }: PageProps) {
  const { id } = await params;
  const promo = await getPromo(id);
  
  const whatsappUrl = await getSystemSetting("whatsapp_group_url") || WHATSAPP_GROUP_URL;

  if (!promo) {
    notFound();
  }

  const daysLeft = promo.expiryDate 
    ? Math.ceil((new Date(promo.expiryDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24)) 
    : 0;

  const isExpired = daysLeft <= 0;

  // Get related card names for display
  const relatedCards = promo.relatedCardIds?.map(cardId => {
    const card = HK_CARDS.find(c => c.id === cardId);
    return card ? { id: card.id, name: card.name, bank: card.bank } : null;
  }).filter(Boolean) || [];

  // Build structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      // Main Offer/Event
      {
        "@type": "Offer",
        "name": promo.title,
        "description": promo.description,
        "url": `https://pickcardrebate.com/promos/${promo.id}`,
        "image": promo.imageUrl,
        "validFrom": new Date().toISOString().split('T')[0],
        "validThrough": promo.expiryDate,
        "offeredBy": {
          "@type": "Organization",
          "name": promo.merchant
        },
        "seller": {
          "@type": "Organization",
          "name": promo.merchant
        }
      },
      // Breadcrumb
      {
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
            "name": "最新優惠",
            "item": "https://pickcardrebate.com/promos"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": promo.title,
            "item": `https://pickcardrebate.com/promos/${promo.id}`
          }
        ]
      },
      // FAQ Schema (if available)
      ...(promo.faqs && promo.faqs.length > 0 ? [{
        "@type": "FAQPage",
        "mainEntity": promo.faqs.map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      }] : [])
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors pb-24 md:pb-0">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Breadcrumb Navigation */}
        <nav className="mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center text-sm text-gray-500 dark:text-gray-400 gap-2">
            <li>
              <Link href="/" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                首頁
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/promos" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                最新優惠
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 dark:text-white font-medium truncate max-w-[200px]">
              {promo.title}
            </li>
          </ol>
        </nav>

        <article className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border dark:border-gray-800 overflow-hidden" itemScope itemType="https://schema.org/Offer">
          {/* Hero Image */}
          <div className="relative h-64 md:h-96 w-full bg-gray-100 dark:bg-gray-800">
            {promo.imageUrl ? (
              <img 
                src={promo.imageUrl} 
                alt={promo.title}
                className="w-full h-full object-cover"
                itemProp="image"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-300">
                <span className="text-6xl">🎁</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className="bg-blue-600/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold" itemProp="offeredBy">
                  {promo.merchant}
                </span>
                {isExpired ? (
                  <span className="bg-gray-500/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold">
                    已過期
                  </span>
                ) : daysLeft < 7 && daysLeft > 0 ? (
                  <span className="bg-red-500/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold flex items-center">
                    <Clock className="h-3 w-3 mr-1" /> 剩 {daysLeft} 天
                  </span>
                ) : null}
              </div>
              <h1 className="text-2xl md:text-4xl font-bold leading-tight drop-shadow-lg" itemProp="name">
                {promo.title}
              </h1>
            </div>
          </div>

          <div className="p-6 md:p-10">
            {/* Meta Info */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8 text-sm text-gray-500 dark:text-gray-400 border-b dark:border-gray-800 pb-6">
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>有效期至：</span>
                  <time itemProp="validThrough" dateTime={promo.expiryDate}>{promo.expiryDate}</time>
                </div>
                <div className="flex items-center">
                  <Tag className="h-4 w-4 mr-2" />
                  {promo.tags.join(" · ")}
                </div>
              </div>
              <SharePromoButton 
                title={promo.title}
                description={promo.description}
                promoId={promo.id}
              />
            </div>

            {/* Description */}
            <div className="prose prose-lg dark:prose-invert max-w-none mb-10">
              <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-6 font-medium" itemProp="description">
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

            {/* Related Cards Section */}
            {relatedCards.length > 0 && (
              <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-900/30">
                <h3 className="font-bold text-gray-900 dark:text-white mb-3">💳 適用信用卡</h3>
                <div className="flex flex-wrap gap-2">
                  {relatedCards.map((card: any) => (
                    <Link 
                      key={card.id} 
                      href={`/cards/${card.id}`}
                      className="px-3 py-1.5 bg-white dark:bg-gray-800 rounded-lg text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-gray-700 transition-colors border border-blue-200 dark:border-gray-600"
                    >
                      {card.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 border-t dark:border-gray-800 pt-8">
              {promo.url && (
                <a href={promo.url} target="_blank" rel="noopener noreferrer" className="flex-1" itemProp="url">
                  <Button className="w-full h-12 text-base rounded-xl" size="lg">
                    前往官網查看詳情 <ExternalLink className="h-4 w-4 ml-2" />
                  </Button>
                </a>
              )}
              <Link href={`/cards?tags=${encodeURIComponent(promo.tags[0])}`} className="flex-1">
                <Button variant="outline" className="w-full h-12 text-base rounded-xl dark:border-gray-700 dark:text-white dark:hover:bg-gray-800">
                  查看相關信用卡
                </Button>
              </Link>
            </div>

            {/* FAQ Section */}
            <FAQSection faqs={promo.faqs || []} />

            {/* WhatsApp CTA */}
            <div className="mt-8 bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/30 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full">
                  <MessageCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-gray-100">對這個優惠有疑問？</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">加入我們的 WhatsApp 討論群，與其他谷友即時交流心得！</p>
                </div>
              </div>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white border-none gap-2 rounded-lg">
                  <MessageCircle className="h-4 w-4" /> 加入討論群
                </Button>
              </a>
            </div>
          </div>
        </article>

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </main>
    </div>
  );
}
