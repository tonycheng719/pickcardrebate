"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HK_CARDS } from "@/lib/data/cards";
import { useWallet } from "@/lib/store/wallet-context";
import { useReviews } from "@/lib/store/reviews-context";
import { useDataset } from "@/lib/admin/data-store";
import { 
  ArrowLeft, Plus, Check, ExternalLink, Share2, 
  CreditCard as CardIcon, Percent, Calendar, AlertCircle,
  Copy, MessageCircle, ChevronRight, Trophy, Scale
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useState, useMemo, useEffect } from "react";
import Head from "next/head";
import Script from "next/script";
import { CreditCard } from "@/lib/types";
import { PartnerOfferCard } from "@/components/partner-offer-card";
import { BankPromoCard } from "@/components/bank-promo-card";
import { getPromosForBank } from "@/lib/data/bank-promos";
import { trackViewCard, trackClickApply, trackAddToWallet } from "@/lib/analytics";
import { PageViewTracker } from "@/components/page-view-tracker";
import { ShareSection } from "@/components/share-section";
import { ShareButton } from "@/components/share-button";
import { PARTNER_MODE_ENABLED } from "@/lib/config";

// Apply Button Component - switches between official and partner URLs based on config
function ApplyButton({ card }: { card: CreditCard }) {
  // Determine which URL to use based on partner mode
  const isPartnerMode = PARTNER_MODE_ENABLED && !!card.applyUrl;
  const applyUrl = isPartnerMode ? card.applyUrl : (card.officialApplyUrl || card.applyUrl);
  
  if (!applyUrl) {
    return (
      <Button className="w-full" disabled>
        暫無申請連結
      </Button>
    );
  }
  
  return (
    <a 
      href={applyUrl} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="block"
      onClick={() => trackClickApply({
        cardId: card.id,
        cardName: card.name,
        cardBank: card.bank,
        applyUrl: applyUrl,
        isPartner: isPartnerMode,
      })}
    >
      <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
        {isPartnerMode ? "🎁 經本網連結申請" : "立即申請"} <ExternalLink className="h-4 w-4 ml-2" />
      </Button>
    </a>
  );
}

// Helper to render note with Markdown links
function renderNoteWithLinks(note: string) {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const elements: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;
  let key = 0;

  while ((match = linkRegex.exec(note)) !== null) {
    // Add text before the link
    if (match.index > lastIndex) {
      elements.push(note.slice(lastIndex, match.index));
    }
    
    // Add the link
    const [, text, url] = match;
    elements.push(
      <Link 
        key={key++} 
        href={url} 
        className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
      >
        {text}
      </Link>
    );
    
    lastIndex = match.index + match[0].length;
  }
  
  // Add remaining text after last link
  if (lastIndex < note.length) {
    elements.push(note.slice(lastIndex));
  }
  
  return elements.length > 0 ? elements : note;
}

// Card Image component with error handling
function CardImage({ card, onError }: { card: CreditCard; onError?: () => void }) {
  const [imageError, setImageError] = useState(false);

  const handleError = () => {
    setImageError(true);
    onError?.();
  };

  if (imageError || !card.imageUrl) {
    return (
      <div className={`text-center ${card.style?.textColor || 'text-white'}`}>
        <p className="text-sm opacity-80 uppercase tracking-wider">{card.bank}</p>
        <p className="text-2xl font-bold mt-1">{card.name}</p>
      </div>
    );
  }

  return (
    <img 
      src={card.imageUrl} 
      alt={card.name}
      className="max-h-full max-w-full object-contain drop-shadow-lg"
      referrerPolicy="no-referrer"
      onError={handleError}
    />
  );
}

export default function CardDetailPage() {
  const params = useParams();
  const router = useRouter();
  const cardId = params.id as string;
  const { cards } = useDataset();
  const { addCard, hasCard, user } = useWallet();
  const { getReviewsByCardId, fetchReviewsForCard } = useReviews();
  const [cardImageError, setCardImageError] = useState(false);
  
  // Find card from dataset (includes DB images) or fallback to static data
  const card = useMemo(() => {
    return cards.find(c => c.id === cardId) || HK_CARDS.find(c => c.id === cardId);
  }, [cards, cardId]);
  
  // 當 card.imageUrl 改變時，重置圖片錯誤狀態（讓新圖片有機會載入）
  useEffect(() => {
    setCardImageError(false);
  }, [card?.imageUrl]);
  
  // Fetch reviews on page load for SEO Schema
  useEffect(() => {
    if (cardId) {
      fetchReviewsForCard(cardId);
    }
  }, [cardId, fetchReviewsForCard]);
  
  // Track view card event
  useEffect(() => {
    if (card) {
      trackViewCard({
        cardId: card.id,
        cardName: card.name,
        cardBank: card.bank,
      });
    }
  }, [card]);
  
  // Get reviews and calculate rating stats
  const reviews = getReviewsByCardId(cardId);
  const reviewCount = reviews.length;
  const avgRating = reviewCount > 0 
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviewCount)
    : 0;
  
  // Get related cards (same bank or same tags)
  const relatedCards = useMemo(() => {
    if (!card) return [];
    const cardList = cards.length ? cards : HK_CARDS;
    return cardList
      .filter(c => 
        c.id !== card.id && 
        !c.hidden &&
        (c.bank === card.bank || c.tags?.some(tag => card.tags?.includes(tag)))
      )
      .slice(0, 4);
  }, [card, cards]);

  if (!card) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
        <Navbar />
        <main className="container mx-auto px-4 py-16 text-center">
          <CardIcon className="h-16 w-16 mx-auto text-gray-300 mb-4" />
          <h1 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">找不到此信用卡</h1>
          <p className="text-gray-500 mb-6">該信用卡可能已被移除或 ID 不正確</p>
          <Button onClick={() => router.push('/cards')}>
            <ArrowLeft className="h-4 w-4 mr-2" /> 返回信用卡列表
          </Button>
        </main>
      </div>
    );
  }

  const isInWallet = hasCard(card.id);
  
  // FAQ Data for card
  const faqItems = [
    {
      question: `${card.name} 年費係幾多？`,
      answer: card.annualFee 
        ? `${card.name} 年費為 HK$${card.annualFee.toLocaleString()}。${card.feeWaiverCondition || ''}`
        : `${card.name} 永久免年費。`
    },
    {
      question: `${card.name} 最低年薪要求？`,
      answer: card.minIncome 
        ? `申請 ${card.name} 需要年薪達 HK$${card.minIncome.toLocaleString()} 或以上。`
        : `${card.name} 無特定年薪要求，詳情請參閱官方網站。`
    },
    {
      question: `${card.name} 有咩回贈優惠？`,
      answer: card.sellingPoints?.join('；') || `${card.name} 提供多項簽賬回贈優惠，詳情請參閱上方回贈詳情。`
    },
    {
      question: `${card.name} 外幣手續費係幾多？`,
      answer: card.foreignCurrencyFee !== undefined
        ? card.foreignCurrencyFee === 0 
          ? `${card.name} 豁免外幣交易手續費，海外簽賬更抵！`
          : `${card.name} 外幣交易手續費為 ${card.foreignCurrencyFee}%。`
        : `詳情請參閱 ${card.bank} 官方網站。`
    }
  ];
  
  // Use fixed date for SSR to avoid hydration mismatch
  // This will be the "last build" date, which is acceptable for SEO
  const currentDate = "2025-12-08";
  
  // Generate structured data for SEO - FinancialProduct Schema (適合信用卡)
  // 使用 FinancialProduct 而非 Product+Offer，避免 Google 要求 shippingDetails/hasMerchantReturnPolicy
  const productSchema: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    "name": card.name,
    "provider": {
      "@type": "FinancialService",
      "name": card.bank,
      "areaServed": {
        "@type": "Country",
        "name": "Hong Kong"
      }
    },
    "description": card.sellingPoints?.join("。") || `${card.bank} ${card.name} 信用卡`,
    "image": card.imageUrl,
    "url": `https://pickcardrebate.com/cards/${card.id}`,
    "feesAndCommissionsSpecification": card.annualFee 
      ? `年費 HKD ${card.annualFee}${card.feeWaiverCondition ? `（${card.feeWaiverCondition}）` : ''}`
      : "永久免年費",
    "interestRate": {
      "@type": "QuantitativeValue",
      "value": card.foreignCurrencyFee || 1.95,
      "unitText": "外幣手續費 %"
    },
    "category": "Credit Card"
  };
  
  // Add AggregateRating if there are reviews (SEO: Star ratings in search results)
  if (reviewCount > 0) {
    productSchema.aggregateRating = {
      "@type": "AggregateRating",
      "ratingValue": avgRating.toFixed(1),
      "bestRating": "5",
      "worstRating": "1",
      "ratingCount": reviewCount,
      "reviewCount": reviewCount
    };
  }
  
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
        "name": "信用卡",
        "item": "https://pickcardrebate.com/cards"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": card.name,
        "item": `https://pickcardrebate.com/cards/${card.id}`
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
  
  // WebPage Schema with dateModified
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": `${card.name} - ${card.bank} 信用卡詳情`,
    "description": card.sellingPoints?.join("。") || `${card.bank} ${card.name} 信用卡`,
    "url": `https://pickcardrebate.com/cards/${card.id}`,
    "dateModified": currentDate,
    "datePublished": "2025-01-01", // 初始發布日期
    "publisher": {
      "@type": "Organization",
      "name": "PickCardRebate",
      "url": "https://pickcardrebate.com"
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
      {/* Page View Tracker */}
      <PageViewTracker pageType="card" pageId={card.id} pageName={card.name} />
      
      <Navbar />
      
      {/* Structured Data for SEO */}
      <Script
        id="product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Script
        id="webpage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />

      <main className="container mx-auto px-4 py-8 flex-1">
        {/* Back Button */}
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>返回</span>
        </button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Card Image & Actions */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="sticky top-6 space-y-4"
            >
              {/* Card Image */}
              <Card className="overflow-hidden border-0 shadow-xl">
                <div className={`relative h-56 ${(card.imageUrl && !cardImageError) ? 'bg-white dark:bg-gray-900' : (card.style?.bgColor || 'bg-gradient-to-br from-gray-700 to-gray-900')} flex items-center justify-center p-6`}>
                  {card.imageUrl && !cardImageError ? (
                    <CardImage card={card} onError={() => setCardImageError(true)} />
                  ) : (
                    <div className={`text-center ${card.style?.textColor || 'text-white'}`}>
                      <p className="text-sm opacity-80 uppercase tracking-wider">{card.bank}</p>
                      <p className="text-2xl font-bold mt-1">{card.name}</p>
                    </div>
                  )}
                </div>
              </Card>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button
                  className="flex-1"
                  variant={isInWallet ? "outline" : "default"}
                  onClick={() => {
                    if (!user) {
                      toast.error('請先登入');
                      return;
                    }
                    addCard(card.id);
                    toast.success(isInWallet ? '已從錢包移除' : '已加入錢包');
                  }}
                >
                  {isInWallet ? (
                    <><Check className="h-4 w-4 mr-2" /> 已在錢包</>
                  ) : (
                    <><Plus className="h-4 w-4 mr-2" /> 加入錢包</>
                  )}
                </Button>
                
                <ShareButton
                  title={`${card.name} - ${card.bank}`}
                  text={card.sellingPoints?.slice(0, 2).join('。') || `${card.bank} ${card.name} 信用卡詳情`}
                  variant="prominent"
                  size="icon"
                  className="shrink-0"
                />
              </div>

              {/* Apply Button */}
              <ApplyButton card={card} />
            </motion.div>
          </div>

          {/* Right Column - Card Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">{card.bank}</p>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{card.name}</h1>
              
              {/* Tags */}
              {card.tags && card.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {card.tags.map((tag, idx) => (
                    <span key={idx} className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Welcome Offer */}
            {card.welcomeOfferText && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                <Card className="border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-amber-200 dark:bg-amber-800 rounded-lg">
                        <Calendar className="h-5 w-5 text-amber-700 dark:text-amber-200" />
                      </div>
                      <div>
                        <p className="font-semibold text-amber-900 dark:text-amber-100">銀行迎新優惠</p>
                        <p className="text-amber-800 dark:text-amber-200 mt-1">{card.welcomeOfferText}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Partner Offer - 經本網指定連結申請額外獎賞 */}
            {card.partnerOffer && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.17 }}
              >
                <PartnerOfferCard 
                  card={card} 
                  bankWelcomeValue={
                    // 嘗試從 welcomeOfferReward 或 welcomeOfferText 解析數值
                    card.welcomeOfferReward 
                      ? parseInt(card.welcomeOfferReward.replace(/[^0-9]/g, '')) || 0
                      : card.welcomeOfferText
                        ? (() => {
                            // 從文字中提取金額，如 "送 $1,200 現金回贈" -> 1200
                            const match = card.welcomeOfferText.match(/送\s*\$?([\d,]+)/);
                            return match ? parseInt(match[1].replace(/,/g, '')) || 0 : 0;
                          })()
                        : 0
                  }
                />
              </motion.div>
            )}

            {/* Bank Promo - 銀行簽賬推廣 */}
            {getPromosForBank(card.bank).map((promo) => (
              <motion.div
                key={promo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.19 }}
              >
                <BankPromoCard 
                  promo={promo}
                  cardBank={card.bank}
                  isVisaCard={card.name.toLowerCase().includes('visa') || card.id.includes('visa')}
                />
              </motion.div>
            ))}

            {/* Selling Points */}
            {card.sellingPoints && card.sellingPoints.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card>
                  <CardContent className="p-5">
                    <h2 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <Percent className="h-5 w-5 text-emerald-500" />
                      主要賣點
                    </h2>
                    <ul className="space-y-3">
                      {card.sellingPoints.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <Check className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Reward Rules */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <Card>
                <CardContent className="p-5">
                  <h2 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <CardIcon className="h-5 w-5 text-blue-500" />
                    回贈規則
                  </h2>
                  <div className="space-y-3">
                    {card.rules.map((rule, idx) => {
                      // Calculate base rate and extra rate
                      const baseRule = card.rules.find(
                        (r) => r.matchType === "base" && !r.isForeignCurrency && r.description.includes("基本")
                      );
                      const baseRate = baseRule?.percentage || 0.4;
                      const extraRate = rule.percentage - baseRate;
                      const hasExtraRate = extraRate > 0.01 && rule.matchType !== "base";
                      
                      return (
                        <div key={idx} className="py-2 border-b dark:border-gray-700 last:border-0">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <span className="text-gray-700 dark:text-gray-300">{rule.description}</span>
                              {rule.isDiscount && (
                                <span className="px-2 py-0.5 bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-300 text-xs rounded-full">
                                  折扣
                                </span>
                              )}
                              {rule.isForeignCurrency && (
                                <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 text-xs rounded-full">
                                  海外
                                </span>
                              )}
                            </div>
                            <span className="font-bold text-blue-600 dark:text-blue-400">
                              {rule.isDiscount ? `${(100 - rule.percentage) / 10}折` : `${rule.percentage}%`}
                            </span>
                          </div>
                          {/* 顯示回贈組成 */}
                          {!rule.isDiscount && hasExtraRate && (
                            <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                              {rule.isForeignCurrency && card.foreignCurrencyFee ? (
                                <span>
                                  {rule.percentage}% - {card.foreignCurrencyFee}% 手續費 = <span className="text-emerald-600 dark:text-emerald-400 font-medium">{(rule.percentage - card.foreignCurrencyFee).toFixed(2)}% 淨回贈</span>
                                </span>
                              ) : (
                                <span>
                                  {baseRate.toFixed(1)}% 基本 + <span className="text-blue-500">{extraRate.toFixed(1)}%</span> 額外 = <span className="text-emerald-600 dark:text-emerald-400 font-medium">{rule.percentage}% 總回贈</span>
                                </span>
                              )}
                            </div>
                          )}
                          {/* 海外回贈淨值（只有基本回贈時） */}
                          {!rule.isDiscount && rule.isForeignCurrency && !hasExtraRate && card.foreignCurrencyFee && (
                            <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                              {rule.percentage}% - {card.foreignCurrencyFee}% 手續費 = <span className="text-emerald-600 dark:text-emerald-400 font-medium">{(rule.percentage - card.foreignCurrencyFee).toFixed(2)}% 淨回贈</span>
                            </div>
                          )}
                          {/* 條件提示 */}
                          {(rule.cap || rule.monthlyMinSpend || rule.minSpend) && (
                            <div className="mt-1 text-[10px] text-amber-600 dark:text-amber-400 flex flex-wrap gap-2">
                              {rule.cap && (
                                <span>{rule.capType === "reward" ? `上限回贈 $${rule.cap.toLocaleString()}` : `上限簽賬 $${rule.cap.toLocaleString()}`}</span>
                              )}
                              {rule.monthlyMinSpend && (
                                <span>月簽 ${rule.monthlyMinSpend.toLocaleString()}</span>
                              )}
                              {rule.minSpend && (
                                <span>單筆滿 ${rule.minSpend.toLocaleString()}</span>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  
                  {/* 外幣手續費提示 */}
                  {card.foreignCurrencyFee !== undefined && (
                    <div className={`mt-4 p-3 rounded-lg ${card.foreignCurrencyFee === 0 ? 'bg-green-50 dark:bg-green-900/20' : 'bg-gray-50 dark:bg-gray-800'}`}>
                      <div className="flex items-center gap-2 text-sm">
                        {card.foreignCurrencyFee === 0 ? (
                          <>
                            <span className="text-green-600 dark:text-green-400">✓</span>
                            <span className="text-green-700 dark:text-green-300 font-medium">此卡免外幣手續費</span>
                          </>
                        ) : (
                          <>
                            <span className="text-gray-500">💡</span>
                            <span className="text-gray-600 dark:text-gray-400">
                              外幣手續費：<span className="font-medium text-orange-600 dark:text-orange-400">{card.foreignCurrencyFee}%</span>
                              <span className="text-xs ml-1">（海外簽賬已在上方扣除）</span>
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Important Notes */}
            {card.note && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-900/20">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-orange-900 dark:text-orange-100 mb-2">重要須知</p>
                        <p className="text-sm text-orange-800 dark:text-orange-200 whitespace-pre-wrap leading-relaxed">
                          {renderNoteWithLinks(card.note)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Card Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <Card>
                <CardContent className="p-5">
                  <h2 className="font-semibold text-gray-900 dark:text-white mb-4">卡片資訊</h2>
                  <div className="grid sm:grid-cols-2 gap-4 text-sm">
                    {(card.annualFee !== undefined || card.feeWaiverCondition) && (
                      <div>
                        <p className="text-gray-500 dark:text-gray-400">年費</p>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {card.annualFee !== undefined && card.annualFee > 0 ? (
                            <span className="text-lg font-bold text-orange-600 dark:text-orange-400">
                              HK${card.annualFee.toLocaleString()}
                            </span>
                          ) : card.annualFee === 0 ? (
                            <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                              永久免年費
                            </span>
                          ) : null}
                          {card.feeWaiverCondition && card.annualFee !== 0 && (
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              {card.feeWaiverCondition}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                    {card.foreignCurrencyFee !== undefined && (
                      <div>
                        <p className="text-gray-500 dark:text-gray-400">外幣手續費</p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {card.foreignCurrencyFee === 0 ? '豁免' : `${card.foreignCurrencyFee}%`}
                        </p>
                      </div>
                    )}
                    {card.minIncome && (
                      <div>
                        <p className="text-gray-500 dark:text-gray-400">最低年薪</p>
                        <div className="font-medium text-gray-900 dark:text-white">
                          HK${card.minIncome.toLocaleString()}
                          {card.incomeNote && (
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              {card.incomeNote}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                    {card.rewardTimeline && (
                      <div>
                        <p className="text-gray-500 dark:text-gray-400">回贈入賬</p>
                        <p className="font-medium text-gray-900 dark:text-white">{card.rewardTimeline}</p>
                      </div>
                    )}
                    {card.rewardConfig?.currency && (
                      <div>
                        <p className="text-gray-500 dark:text-gray-400">積分類型</p>
                        <p className="font-medium text-gray-900 dark:text-white">{card.rewardConfig.currency}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* FAQ Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card>
                <CardContent className="p-5">
                  <h2 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    ❓ 常見問題
                  </h2>
                  <div className="space-y-4">
                    {faqItems.map((item, index) => (
                      <div key={index} className="border-b border-gray-100 dark:border-gray-800 pb-4 last:border-0 last:pb-0">
                        <h3 className="font-medium text-gray-900 dark:text-white mb-2 text-sm">
                          Q: {item.question}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          A: {item.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Related Cards Section - Internal Link Optimization */}
            {relatedCards.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
              >
                <Card>
                  <CardContent className="p-5">
                    <h2 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <CardIcon className="h-5 w-5 text-purple-500" />
                      相關信用卡
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {relatedCards.map((relatedCard) => (
                        <Link 
                          key={relatedCard.id}
                          href={`/cards/${relatedCard.id}`}
                          className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
                        >
                          <div className={`w-12 h-8 rounded-lg flex items-center justify-center overflow-hidden ${!relatedCard.imageUrl ? (relatedCard.style?.bgColor || 'bg-gray-600') : 'bg-white dark:bg-gray-900'}`}>
                            {relatedCard.imageUrl ? (
                              <img 
                                src={relatedCard.imageUrl} 
                                alt={relatedCard.name}
                                className="w-full h-full object-contain"
                                referrerPolicy="no-referrer"
                              />
                            ) : (
                              <span className="text-white text-xs font-bold">{relatedCard.bank.slice(0, 2)}</span>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {relatedCard.name}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{relatedCard.bank}</p>
                          </div>
                          <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
            
            {/* Quick Links Section - Internal Link Optimization */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card>
                <CardContent className="p-5">
                  <h2 className="font-semibold text-gray-900 dark:text-white mb-4">🔗 快速導航</h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <Link href="/">
                      <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <CardIcon className="h-5 w-5 text-emerald-600" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">回贈計算機</span>
                        <ChevronRight className="h-4 w-4 ml-auto text-gray-400" />
                      </div>
                    </Link>
                    <Link href="/cards/compare">
                      <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <Scale className="h-5 w-5 text-emerald-600" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">信用卡比較</span>
                        <ChevronRight className="h-4 w-4 ml-auto text-gray-400" />
                      </div>
                    </Link>
                    <Link href="/cards">
                      <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <CardIcon className="h-5 w-5 text-emerald-600" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">所有信用卡</span>
                        <ChevronRight className="h-4 w-4 ml-auto text-gray-400" />
                      </div>
                    </Link>
                    <Link href="/rankings">
                      <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <Trophy className="h-5 w-5 text-emerald-600" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">回贈排行榜</span>
                        <ChevronRight className="h-4 w-4 ml-auto text-gray-400" />
                      </div>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Share Section */}
            <ShareSection 
              title={`${card.name} - ${card.bank}`}
              text={card.sellingPoints?.slice(0, 2).join('。') || `${card.bank} ${card.name} 信用卡詳情`}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

