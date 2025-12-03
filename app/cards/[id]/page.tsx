"use client";

import { useParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HK_CARDS } from "@/lib/data/cards";
import { useWallet } from "@/lib/store/wallet-context";
import { useDataset } from "@/lib/admin/data-store";
import { 
  ArrowLeft, Plus, Check, ExternalLink, Share2, 
  CreditCard as CardIcon, Percent, Calendar, AlertCircle,
  Copy, MessageCircle
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useState, useMemo } from "react";
import Head from "next/head";
import Script from "next/script";
import { CreditCard } from "@/lib/types";

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
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [cardImageError, setCardImageError] = useState(false);
  
  // Find card from dataset (includes DB images) or fallback to static data
  const card = useMemo(() => {
    return cards.find(c => c.id === cardId) || HK_CARDS.find(c => c.id === cardId);
  }, [cards, cardId]);

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
  
  // Generate structured data for SEO - Product Schema
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": card.name,
    "brand": {
      "@type": "Brand",
      "name": card.bank
    },
    "description": card.sellingPoints?.join("。") || `${card.bank} ${card.name} 信用卡`,
    "image": card.imageUrl,
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "price": card.annualFee || 0,
      "priceCurrency": "HKD",
      "description": card.feeWaiverCondition || "年費詳情請參閱官網"
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

  const handleShare = async (platform: string) => {
    const url = `https://pickcardrebate.com/cards/${card.id}`;
    const title = `${card.name} - ${card.bank}`;
    const text = `${card.name}\n${card.sellingPoints?.slice(0, 2).join('\n')}\n\n立即查看: ${url}`;

    switch (platform) {
      case 'copy':
        await navigator.clipboard.writeText(url);
        toast.success('已複製連結！');
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
        break;
      case 'native':
        if (navigator.share) {
          await navigator.share({ title, text: card.sellingPoints?.join('\n'), url });
        }
        break;
    }
    setShowShareMenu(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
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
              <div className="flex gap-3">
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
                
                <div className="relative">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setShowShareMenu(!showShareMenu)}
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                  
                  {showShareMenu && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute right-0 top-12 bg-white dark:bg-gray-800 rounded-xl shadow-xl border dark:border-gray-700 p-2 z-50 min-w-[160px]"
                    >
                      <button onClick={() => handleShare('copy')} className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-sm">
                        <Copy className="h-4 w-4" /> 複製連結
                      </button>
                      <button onClick={() => handleShare('whatsapp')} className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-sm">
                        <MessageCircle className="h-4 w-4 text-green-500" /> WhatsApp
                      </button>
                      <button onClick={() => handleShare('facebook')} className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-sm">
                        <span className="text-blue-600 font-bold text-sm">f</span> Facebook
                      </button>
                      {typeof navigator !== 'undefined' && 'share' in navigator && (
                        <button onClick={() => handleShare('native')} className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-sm">
                          <Share2 className="h-4 w-4" /> 更多...
                        </button>
                      )}
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Apply Button */}
              {card.applyUrl && (
                <a href={card.applyUrl} target="_blank" rel="noopener noreferrer" className="block">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                    立即申請 <ExternalLink className="h-4 w-4 ml-2" />
                  </Button>
                </a>
              )}
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
                        <p className="font-semibold text-amber-900 dark:text-amber-100">迎新優惠</p>
                        <p className="text-amber-800 dark:text-amber-200 mt-1">{card.welcomeOfferText}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

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
                    {card.rules.map((rule, idx) => (
                      <div key={idx} className="flex justify-between items-center py-2 border-b dark:border-gray-700 last:border-0">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-700 dark:text-gray-300">{rule.description}</span>
                          {rule.isDiscount && (
                            <span className="px-2 py-0.5 bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-300 text-xs rounded-full">
                              折扣
                            </span>
                          )}
                        </div>
                        <span className="font-bold text-blue-600 dark:text-blue-400">
                          {rule.isDiscount ? `${100 - rule.percentage}折` : `${rule.percentage}%`}
                        </span>
                      </div>
                    ))}
                  </div>
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
                          {card.note}
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
          </div>
        </div>
      </main>
    </div>
  );
}

