"use client";

import { Navbar } from "@/components/navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/lib/store/wallet-context";
import { useReviews } from "@/lib/store/reviews-context";
import type { CreditCard } from "@/lib/types";
import { 
    Plus, Check, ExternalLink, MessageSquare, Star, Search, X, Info, Scale, ArrowLeft, AlertTriangle
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
import { useLocale } from "@/lib/i18n/useLocale";
import { useSearchParams } from "next/navigation";
import { HK_CARDS } from "@/lib/data/cards";
import { useDataset } from "@/lib/admin/data-store";
import { PARTNER_MODE_ENABLED } from "@/lib/config";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { LoginPromptDialog } from "@/components/login-prompt-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { trackViewCard, trackClickApply, trackAddToWallet } from "@/lib/analytics";
import { Locale, localePathMap } from "@/lib/i18n/config";
import { getTranslation } from "@/lib/i18n/translations";

interface CardsClientProps {
  locale: Locale;
}

function ReviewsDialog({ card, children, t }: { card: CreditCard; children: React.ReactNode; t: ReturnType<typeof getTranslation> }) {
    const { user } = useWallet();
    const { getReviewsByCardId, addReview, fetchReviewsForCard, isLoading } = useReviews();
    const { localePath } = useLocale();
    const [reviewContent, setReviewContent] = useState("");
    const [rating, setRating] = useState(5);
    const [isOpen, setIsOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    
    const reviews = getReviewsByCardId(card.id);
    
    const avgRating = reviews.length > 0 
        ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1) 
        : "0.0";

    useEffect(() => {
        if (isOpen) {
            fetchReviewsForCard(card.id);
        }
    }, [isOpen, card.id, fetchReviewsForCard]);

    const handleAddReview = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!reviewContent.trim()) return;
        
        setSubmitting(true);
        const success = await addReview(card.id, rating, reviewContent);
        setSubmitting(false);
        
        if (success) {
            setReviewContent("");
            setRating(5);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle className="text-xl flex items-center gap-2">
                        {card.name} <span className="text-gray-400 font-normal text-sm">{t.cards.reviews}</span>
                    </DialogTitle>
                    <DialogDescription className="flex items-center gap-2 pt-1">
                        <span className="flex text-yellow-400">
                            <Star className="h-4 w-4 fill-current" />
                        </span>
                        <span className="font-bold text-gray-900">{avgRating}</span>
                        <span className="text-gray-500">({reviews.length})</span>
                    </DialogDescription>
                </DialogHeader>
                
                <div className="flex-1 overflow-y-auto pr-2 py-4 space-y-4 border-y my-2">
                    {reviews.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">
                            <MessageSquare className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                            <p>{t.comments.noComments}</p>
                        </div>
                    ) : (
                        reviews.map(review => (
                            <div key={review.id} className="bg-gray-50 p-4 rounded-xl">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xs">
                                            {review.userName[0]}
                                        </div>
                                        <div>
                                            <div className="font-bold text-sm text-gray-900">{review.userName}</div>
                                            <div className="text-xs text-gray-500">{review.date}</div>
                                        </div>
                                    </div>
                                    <div className="flex text-yellow-400">
                                        {[...Array(review.rating)].map((_, i) => <Star key={i} className="h-3 w-3 fill-current" />)}
                                    </div>
                                </div>
                                <p className="text-gray-700 text-sm leading-relaxed pl-10">{review.content}</p>
                            </div>
                        ))
                    )}
                </div>

                <div className="pt-2">
                    {user ? (
                        <form onSubmit={handleAddReview} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl space-y-3">
                            <h4 className="font-bold text-sm text-gray-900 dark:text-white">{t.comments.writeComment}</h4>
                            <div className="flex items-center gap-1">
                                <span className="text-xs text-gray-500 dark:text-gray-400 mr-2">{t.cards.rating}:</span>
                                {[1, 2, 3, 4, 5].map(star => (
                                    <button 
                                        type="button"
                                        key={star}
                                        onClick={() => setRating(star)}
                                        className={`text-xl transition-transform hover:scale-110 ${rating >= star ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"}`}
                                    >
                                        ★
                                    </button>
                                ))}
                            </div>
                            <div className="flex gap-2">
                                <Input 
                                    value={reviewContent}
                                    onChange={(e) => setReviewContent(e.target.value)}
                                    placeholder={t.comments.placeholder}
                                    className="bg-white dark:bg-gray-700 dark:border-gray-600"
                                    disabled={submitting}
                                />
                                <Button type="submit" disabled={submitting || !reviewContent.trim()}>
                                    {t.comments.submit}
                                </Button>
                            </div>
                        </form>
                    ) : (
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl text-center text-sm text-gray-500 dark:text-gray-400">
                            <Link href={localePath("/login")} className="text-blue-600 dark:text-blue-400 font-medium hover:underline">{t.auth.login}</Link> {t.comments.loginToComment}
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}

function CardItem({ card, locale, t }: { card: CreditCard; locale: Locale; t: ReturnType<typeof getTranslation> }) {
    const { addCard, hasCard, user } = useWallet();
    const { getReviewsByCardId } = useReviews();
    const [imageError, setImageError] = useState(false);
    const [showLoginPrompt, setShowLoginPrompt] = useState(false);
    const isOwned = hasCard(card.id);
    const prefix = localePathMap[locale] ? `/${localePathMap[locale]}` : '';
    
    const reviews = getReviewsByCardId(card.id);
    const reviewCount = reviews.length;
    const avgRating = reviewCount > 0 
        ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1) 
        : null;

    const handleAddCard = () => {
        if (!user) {
            setShowLoginPrompt(true);
            return;
        }
        addCard(card.id);
        trackAddToWallet({ cardId: card.id, cardName: card.name });
        toast.success(`${t.cards.addToWallet}: ${card.name}`);
    };

    return (
        <>
        <LoginPromptDialog 
            open={showLoginPrompt} 
            onOpenChange={setShowLoginPrompt} 
            title={t.auth.loginRequired}
            description={t.auth.loginToComment}
        />
        <Card className="flex flex-col h-full hover:shadow-md transition-shadow group overflow-hidden border-0 ring-1 ring-gray-200 dark:ring-gray-700 dark:bg-gray-800">
            <div className={`relative overflow-hidden ${(!card.imageUrl || imageError) ? card.style.bgColor + ' h-32 p-4' : 'bg-white dark:bg-gray-900 h-48 p-4 flex items-center justify-center'}`}>
                {card.imageUrl && !imageError ? (
                    <div className="relative w-full h-full">
                        <img 
                            src={card.imageUrl} 
                            alt={card.name} 
                            className={`w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-300 ${imageError ? 'hidden' : ''}`} 
                            onError={() => setImageError(true)}
                            referrerPolicy="no-referrer"
                        />
                    </div>
                ) : (
                    <>
                        <div className={`font-bold text-lg ${card.style.textColor} opacity-90`}>{card.bank}</div>
                        <div className={`text-2xl font-bold mt-1 ${card.style.textColor}`}>{card.name}</div>
                    </>
                )}
            </div>

            <CardContent className="flex-1 flex flex-col pt-2 pb-6 px-6">
                <Link href={`${prefix}/cards/${card.id}`} className="mb-4 group/title block">
                    <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">{card.bank}</div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight group-hover/title:text-blue-600 dark:group-hover/title:text-blue-400 transition-colors flex items-center gap-1.5">
                        {card.name}
                        <span className="text-xs font-normal text-gray-400 group-hover/title:text-blue-500 transition-colors">→</span>
                    </h3>
                </Link>

                <div className="flex flex-wrap gap-2 mb-4">
                {card.tags.map(tag => (
                    <span key={tag} className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded text-xs font-medium">
                    {tag}
                    </span>
                ))}
                </div>
                
                <div className="space-y-3 mb-4 flex-1">
                    {card.rules.slice(0, 3).map((rule, i) => (
                        <div key={i} className="flex justify-between text-sm border-b border-dashed dark:border-gray-700 pb-2 last:border-0">
                            <span className="text-gray-600 dark:text-gray-400 truncate max-w-[70%]">{rule.description}</span>
                            <span className={`font-bold ${rule.isDiscount ? 'text-orange-600 dark:text-orange-400' : 'text-gray-900 dark:text-white'}`}>
                                {rule.isDiscount ? '折扣' : `${rule.percentage}%`}
                            </span>
                        </div>
                    ))}
                </div>

                <ReviewsDialog card={card} t={t}>
                    <div className="mb-4 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors border border-transparent hover:border-gray-200 dark:hover:border-gray-600 -mx-2">
                        <div className="flex items-center justify-between text-sm mb-1">
                            <div className="flex items-center gap-1 text-gray-700 dark:text-gray-300 font-medium">
                                <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                                {avgRating || "0.0"}
                            </div>
                            <div className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
                                {reviewCount} {t.cards.reviews}
                                <ExternalLink className="h-3 w-3" />
                            </div>
                        </div>
                    </div>
                </ReviewsDialog>

                <div className="flex gap-2 pt-2 border-t dark:border-gray-700 mt-auto">
                     {isOwned ? (
                        <Link href={`${prefix}/wallet`} className="flex-1">
                           <Button variant="outline" className="w-full dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">{t.wallet.myCards}</Button>
                        </Link>
                    ) : (
                        <Button onClick={handleAddCard} className="flex-1">
                            {t.cards.addToWallet}
                        </Button>
                    )}
                    
                    <Link href={`${prefix}/cards/${card.id}`}>
                        <Button variant="ghost" size="icon" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20" title={t.cards.details}>
                            <Info className="h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
        </>
    );
}

function CardSkeleton() {
    return (
        <div className="flex flex-col h-[500px] rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden shadow-sm">
            <div className="h-48 bg-gray-100 dark:bg-gray-900/50 p-4 flex items-center justify-center">
                <Skeleton className="h-32 w-48 rounded-lg" />
            </div>
            <div className="flex-1 p-6 space-y-4">
                <div className="space-y-2 mb-4">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-6 w-40" />
                </div>
                <div className="flex gap-2 mb-4">
                    <Skeleton className="h-6 w-16 rounded-md" />
                    <Skeleton className="h-6 w-20 rounded-md" />
                </div>
                <div className="space-y-3 mb-4">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="flex justify-between py-1">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-4 w-10" />
                        </div>
                    ))}
                </div>
                <div className="mt-auto pt-4 flex gap-2">
                    <Skeleton className="h-10 flex-1 rounded-md" />
                    <Skeleton className="h-10 w-10 rounded-md" />
                </div>
            </div>
        </div>
    );
}

function AllCardsContent({ locale, t }: { locale: Locale; t: ReturnType<typeof getTranslation> }) {
    const { cards, isLoading } = useDataset();
    const [searchQuery, setSearchQuery] = useState("");
    const searchParams = useSearchParams();
    const cardList = cards.length ? cards : HK_CARDS;
    const prefix = localePathMap[locale] ? `/${localePathMap[locale]}` : '';
    
    const idsParam = searchParams.get('ids');
    const filterIds = idsParam ? idsParam.split(',').filter(Boolean) : [];
    const isFiltered = filterIds.length > 0;
    
    const filteredCards = cardList.filter(card => {
        if (card.hidden) return false;
        if (isFiltered) {
            return filterIds.includes(card.id);
        }
        if (!searchQuery.trim()) return true;
        const query = searchQuery.toLowerCase();
        return (
            card.name.toLowerCase().includes(query) ||
            card.bank.toLowerCase().includes(query) ||
            card.tags?.some(tag => tag.toLowerCase().includes(query))
        );
    });

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col transition-colors">
          <Navbar />
          
          <main className="container mx-auto px-4 py-8 flex-1">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {t.cards.title}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {t.cards.subtitle}
              </p>
            </div>

            <div className="mb-6 flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder={t.common.search}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-10 h-11 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              <Link href={`${prefix}/cards/compare`}>
                <Button variant="outline" className="h-11 gap-2 whitespace-nowrap">
                  <Scale className="h-4 w-4" />
                  {t.cards.compare}
                </Button>
              </Link>
            </div>

            {isLoading ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}>
                            <CardSkeleton />
                        </motion.div>
                    ))}
                </div>
            ) : filteredCards.length === 0 ? (
                <div className="text-center py-16">
                    <Search className="h-12 w-12 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                    <h3 className="text-lg font-bold text-gray-700 dark:text-gray-300 mb-2">{t.calculator.noCards}</h3>
                    <Button variant="outline" className="mt-4" onClick={() => setSearchQuery("")}>
                        {t.common.close}
                    </Button>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCards.map((card, index) => (
                    <motion.div
                      key={card.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: Math.min(index * 0.05, 0.3), duration: 0.3 }}
                    >
                      <CardItem card={card} locale={locale} t={t} />
                    </motion.div>
                  ))}
                </div>
            )}
          </main>
        </div>
      );
}

export default function CardsClient({ locale }: CardsClientProps) {
    const t = getTranslation(locale);
    
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col transition-colors">
                <Navbar />
                <main className="container mx-auto px-4 py-8 flex-1">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map((i) => <CardSkeleton key={i} />)}
                    </div>
                </main>
            </div>
        }>
            <AllCardsContent locale={locale} t={t} />
        </Suspense>
    );
}


