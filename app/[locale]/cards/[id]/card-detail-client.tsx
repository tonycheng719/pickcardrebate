"use client";

// This component re-exports the existing card detail page with locale support
// The existing component is complex and works well, so we just wrap it

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HK_CARDS } from "@/lib/data/cards";
import { useWallet } from "@/lib/store/wallet-context";
import { useDataset } from "@/lib/admin/data-store";
import { ArrowLeft, Plus, Check, ExternalLink, CreditCard as CardIcon } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useState, useMemo, useEffect } from "react";
import { Locale, localePathMap } from "@/lib/i18n/config";
import { getTranslation } from "@/lib/i18n/translations";
import { trackViewCard, trackAddToWallet } from "@/lib/analytics";
import { PageViewTracker } from "@/components/page-view-tracker";
import { ShareButton } from "@/components/share-button";
import { CommentSection } from "@/components/comments/CommentSection";
import { CardRating } from "@/components/cards/CardRating";
import { PARTNER_MODE_ENABLED } from "@/lib/config";

interface CardDetailClientProps {
  locale: Locale;
  cardId: string;
}

export default function CardDetailClient({ locale, cardId }: CardDetailClientProps) {
  const t = getTranslation(locale);
  const prefix = localePathMap[locale] ? `/${localePathMap[locale]}` : '';
  const router = useRouter();
  const { cards } = useDataset();
  const { addCard, hasCard, user } = useWallet();
  const [cardImageError, setCardImageError] = useState(false);
  
  const card = useMemo(() => {
    return cards.find(c => c.id === cardId) || HK_CARDS.find(c => c.id === cardId);
  }, [cards, cardId]);
  
  useEffect(() => {
    setCardImageError(false);
  }, [card?.imageUrl]);
  
  useEffect(() => {
    if (card) {
      trackViewCard({ cardId: card.id, cardName: card.name, cardBank: card.bank });
    }
  }, [card]);

  if (!card) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
        <Navbar />
        <main className="container mx-auto px-4 py-16 text-center">
          <CardIcon className="h-16 w-16 mx-auto text-gray-300 mb-4" />
          <h1 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">
            {locale === 'en' ? 'Card Not Found' : locale === 'zh-CN' ? '找不到此信用卡' : '找不到此信用卡'}
          </h1>
          <Button onClick={() => router.push(`${prefix}/cards`)}>
            <ArrowLeft className="h-4 w-4 mr-2" /> {t.common.back}
          </Button>
        </main>
      </div>
    );
  }

  const isInWallet = hasCard(card.id);
  const applyUrl = PARTNER_MODE_ENABLED && card.applyUrl ? card.applyUrl : (card.officialApplyUrl || card.applyUrl);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
      <PageViewTracker pageType="card" pageId={card.id} pageName={card.name} />
      <Navbar />

      <main className="container mx-auto px-4 py-8 flex-1">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>{t.common.back}</span>
        </button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-1">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="sticky top-6 space-y-4">
              <Card className="overflow-hidden border-0 shadow-xl">
                <div className={`relative h-56 ${(card.imageUrl && !cardImageError) ? 'bg-white dark:bg-gray-900' : (card.style?.bgColor || 'bg-gradient-to-br from-gray-700 to-gray-900')} flex items-center justify-center p-6`}>
                  {card.imageUrl && !cardImageError ? (
                    <img src={card.imageUrl} alt={card.name} className="max-h-full max-w-full object-contain drop-shadow-lg" referrerPolicy="no-referrer" onError={() => setCardImageError(true)} />
                  ) : (
                    <div className={`text-center ${card.style?.textColor || 'text-white'}`}>
                      <p className="text-sm opacity-80 uppercase tracking-wider">{card.bank}</p>
                      <p className="text-2xl font-bold mt-1">{card.name}</p>
                    </div>
                  )}
                </div>
              </Card>

              <div className="flex gap-2">
                <Button
                  className="flex-1"
                  variant={isInWallet ? "outline" : "default"}
                  onClick={() => {
                    if (!user) {
                      toast.error(t.auth.loginRequired);
                      return;
                    }
                    addCard(card.id);
                    trackAddToWallet({ cardId: card.id, cardName: card.name });
                    toast.success(isInWallet ? t.cards.removeFromWallet : t.cards.addToWallet);
                  }}
                >
                  {isInWallet ? <><Check className="h-4 w-4 mr-2" /> {t.wallet.myCards}</> : <><Plus className="h-4 w-4 mr-2" /> {t.cards.addToWallet}</>}
                </Button>
                <ShareButton
                  title={`${card.name} - ${card.bank}`}
                  text={card.sellingPoints?.slice(0, 2).join('。') || `${card.bank} ${card.name}`}
                  variant="prominent"
                  size="icon"
                  className="shrink-0"
                />
              </div>

              {applyUrl && (
                <a href={applyUrl} target="_blank" rel="noopener noreferrer" className="block">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                    {t.cards.apply} <ExternalLink className="h-4 w-4 ml-2" />
                  </Button>
                </a>
              )}
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-6 min-w-0">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">{card.bank}</p>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{card.name}</h1>
              
              {card.tags && card.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4 max-w-full overflow-hidden">
                  {card.tags.map((tag, idx) => (
                    <span key={idx} className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium whitespace-nowrap">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Welcome Offer */}
            {card.welcomeOfferText && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                <Card className="border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20">
                  <CardContent className="p-5">
                    <p className="font-semibold text-amber-900 dark:text-amber-100">{t.cards.welcomeOffer}</p>
                    <p className="text-amber-800 dark:text-amber-200 mt-1">{card.welcomeOfferText}</p>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Selling Points */}
            {card.sellingPoints && card.sellingPoints.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Card>
                  <CardContent className="p-5">
                    <h2 className="font-semibold text-gray-900 dark:text-white mb-4">{t.cards.features}</h2>
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
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
              <Card>
                <CardContent className="p-5">
                  <h2 className="font-semibold text-gray-900 dark:text-white mb-4">{t.cards.rebateCategories}</h2>
                  <div className="space-y-3">
                    {card.rules.map((rule, idx) => (
                      <div key={idx} className="py-2 border-b dark:border-gray-700 last:border-0">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700 dark:text-gray-300">{rule.description}</span>
                          <span className="font-bold text-blue-600 dark:text-blue-400">
                            {rule.isDiscount ? `${(100 - rule.percentage) / 10}折` : `${rule.percentage}%`}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Card Info */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <Card>
                <CardContent className="p-5">
                  <h2 className="font-semibold text-gray-900 dark:text-white mb-4">📋 {locale === 'en' ? 'Card Info' : '卡片資訊'}</h2>
                  <div className="grid sm:grid-cols-2 gap-4 text-sm">
                    {card.annualFee !== undefined && (
                      <div>
                        <p className="text-gray-500 dark:text-gray-400 text-xs">{t.cards.annualFee}</p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {card.annualFee === 0 ? (locale === 'en' ? 'Free Forever' : '永久免年費') : `HK$${card.annualFee.toLocaleString()}`}
                        </p>
                      </div>
                    )}
                    {card.minIncome && (
                      <div>
                        <p className="text-gray-500 dark:text-gray-400 text-xs">{t.cards.minIncome}</p>
                        <p className="font-medium text-gray-900 dark:text-white">HK${card.minIncome.toLocaleString()}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Rating */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
              <Card>
                <CardContent className="p-5">
                  <h2 className="font-semibold text-gray-900 dark:text-white mb-4">⭐ {t.cards.rating}</h2>
                  <CardRating cardId={card.id} cardName={card.name} />
                </CardContent>
              </Card>
            </motion.div>

            {/* Comments */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <CommentSection contentType="card" contentId={cardId} contentName={card.name} />
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}


