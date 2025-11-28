"use client";

import { Navbar } from "@/components/navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/lib/store/wallet-context";
import { useReviews } from "@/lib/store/reviews-context";
import type { CreditCard } from "@/lib/types";
import { 
    Plus, Check, ExternalLink, MessageSquare, Star
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription as DialogDesc,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import { HK_CARDS } from "@/lib/data/cards";
import { useDataset } from "@/lib/admin/data-store";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { LoginPromptDialog } from "@/components/login-prompt-dialog";
import { Skeleton } from "@/components/ui/skeleton";

function ReviewsDialog({ card, children }: { card: CreditCard; children: React.ReactNode }) {
    const { user } = useWallet();
    const { getReviewsByCardId, addReview } = useReviews();
    const [reviewContent, setReviewContent] = useState("");
    const [rating, setRating] = useState(5);
    
    const reviews = getReviewsByCardId(card.id);
    
    const avgRating = reviews.length > 0 
        ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1) 
        : "0.0";

    const handleAddReview = (e: React.FormEvent) => {
        e.preventDefault();
        if (reviewContent.trim()) {
            addReview(card.id, rating, reviewContent);
            setReviewContent("");
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle className="text-xl flex items-center gap-2">
                        {card.name} <span className="text-gray-400 font-normal text-sm">用戶評價</span>
                    </DialogTitle>
                    <DialogDescription className="flex items-center gap-2 pt-1">
                        <span className="flex text-yellow-400">
                            <Star className="h-4 w-4 fill-current" />
                        </span>
                        <span className="font-bold text-gray-900">{avgRating}</span>
                        <span className="text-gray-500">({reviews.length} 則評論)</span>
                    </DialogDescription>
                </DialogHeader>
                
                <div className="flex-1 overflow-y-auto pr-2 py-4 space-y-4 border-y my-2">
                    {reviews.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">
                            <MessageSquare className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                            <p>暫無評價，成為第一個評論的人吧！</p>
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
                        <form onSubmit={handleAddReview} className="bg-gray-50 p-4 rounded-xl space-y-3">
                            <h4 className="font-bold text-sm text-gray-900">撰寫評論</h4>
                            <div className="flex items-center gap-1">
                                <span className="text-xs text-gray-500 mr-2">評分:</span>
                                {[1, 2, 3, 4, 5].map(star => (
                                    <button 
                                        type="button"
                                        key={star}
                                        onClick={() => setRating(star)}
                                        className={`text-xl transition-transform hover:scale-110 ${rating >= star ? "text-yellow-400" : "text-gray-300"}`}
                                    >
                                        ★
                                    </button>
                                ))}
                            </div>
                            <div className="flex gap-2">
                                <Input 
                                    value={reviewContent}
                                    onChange={(e) => setReviewContent(e.target.value)}
                                    placeholder="分享您的用卡心得..."
                                    className="bg-white"
                                />
                                <Button type="submit">發布</Button>
                            </div>
                        </form>
                    ) : (
                        <div className="bg-gray-50 p-4 rounded-xl text-center text-sm text-gray-500">
                            <Link href="/login" className="text-blue-600 font-medium hover:underline">登入</Link> 後即可發表評論
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}

function CardItem({ card }: { card: CreditCard }) {
    const { addCard, hasCard, user } = useWallet();
    const { getReviewsByCardId } = useReviews();
    const [imageError, setImageError] = useState(false);
    const [showLoginPrompt, setShowLoginPrompt] = useState(false);
    const isOwned = hasCard(card.id);
    
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
        toast.success(`已加入 ${card.name}`, {
            description: "您現在可以在「我的錢包」中查看此卡片。",
            icon: <Check className="h-4 w-4 text-emerald-500" />,
        });
    };

    return (
        <>
        <LoginPromptDialog 
            open={showLoginPrompt} 
            onOpenChange={setShowLoginPrompt} 
            title="加入錢包需登入"
            description="登入後即可建立您的專屬錢包，並在不同裝置間同步資料。"
        />
        <Card className="flex flex-col h-full hover:shadow-md transition-shadow group overflow-hidden border-0 ring-1 ring-gray-200 dark:ring-gray-700 dark:bg-gray-800">
            {/* Card Visual Header - Improved Layout */}
            <div className={`relative overflow-hidden ${(!card.imageUrl || imageError) ? card.style.bgColor + ' h-32 p-4' : 'bg-white dark:bg-gray-900 h-48 p-4 flex items-center justify-center'}`}>
                {card.imageUrl && !imageError ? (
                    <div className="relative w-full h-full">
                         {/* Card Image - Contain mode to show full card, slightly scaled down to leave room */}
                        <img 
                            src={card.imageUrl} 
                            alt={card.name} 
                            className={`w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-300 ${imageError ? 'hidden' : ''}`} 
                            onError={() => setImageError(true)}
                            referrerPolicy="no-referrer"
                        />
                        {imageError && (
                            <div className={`absolute inset-0 w-full h-full flex flex-col justify-center items-start p-6 ${card.style?.bgColor || 'bg-gray-800'}`}>
                                <div className={`font-bold text-lg ${card.style?.textColor || 'text-white'} opacity-90`}>{card.bank}</div>
                                <div className={`text-xl font-bold mt-1 ${card.style?.textColor || 'text-white'} leading-tight`}>{card.name}</div>
                            </div>
                        )}
                    </div>
                ) : (
                    // Fallback Gradient Style
                    <>
                        <div className={`font-bold text-lg ${card.style.textColor} opacity-90`}>{card.bank}</div>
                        <div className={`text-2xl font-bold mt-1 ${card.style.textColor}`}>{card.name}</div>
                        <div className="absolute bottom-4 right-4 w-10 h-8 bg-yellow-200/20 rounded border border-yellow-200/40 backdrop-blur-sm"></div>
                    </>
                )}
            </div>

            <CardContent className="flex-1 flex flex-col pt-2 pb-6 px-6"> {/* Adjusted padding */}
                {/* Always show Card Name & Bank below visual */}
                <div className="mb-4">
                    <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">{card.bank}</div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight">{card.name}</h3>
                </div>

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
                            <span className="text-gray-600 dark:text-gray-400 truncate max-w-[75%]">{rule.description}</span>
                            <span className="font-bold text-gray-900 dark:text-white">{rule.percentage}%</span>
                        </div>
                    ))}
                </div>

                {card.sellingPoints && card.sellingPoints.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">賣點亮點</p>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                      {card.sellingPoints.map((point, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-emerald-500 mt-0.5" />
                          <span className="leading-relaxed">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {card.welcomeOfferText && (
                  <div className="mb-6 rounded-2xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-300 mb-1">
                      迎新優惠進行中
                    </p>
                    <p className="text-sm text-amber-900 dark:text-amber-100 leading-relaxed">
                      {card.welcomeOfferText}
                    </p>
                    {(card.welcomeOfferReward || card.welcomeOfferDeadline) && (
                      <div className="mt-3 text-xs text-amber-800/80 dark:text-amber-200/80 space-y-1">
                        {card.welcomeOfferReward && <p>獎賞：{card.welcomeOfferReward}</p>}
                        {card.welcomeOfferDeadline && <p>截止：{card.welcomeOfferDeadline}</p>}
                      </div>
                    )}
                    {card.applyUrl && (
                      <a
                        href={card.applyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex mt-3 text-xs font-semibold text-amber-700 dark:text-amber-200 hover:underline"
                      >
                        立即查看詳情 →
                      </a>
                    )}
                  </div>
                )}
                
                {/* Review Summary Preview */}
                <ReviewsDialog card={card}>
                    <div className="mb-4 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors border border-transparent hover:border-gray-200 dark:hover:border-gray-600 -mx-2">
                        <div className="flex items-center justify-between text-sm mb-1">
                            <div className="flex items-center gap-1 text-gray-700 dark:text-gray-300 font-medium">
                                <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                                {avgRating || "0.0"}
                            </div>
                            <div className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
                                {reviewCount} 則評論
                                <ExternalLink className="h-3 w-3" />
                            </div>
                        </div>
                        {reviews.length > 0 ? (
                             <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                "{reviews[0].content}"
                             </p>
                        ) : (
                            <p className="text-xs text-gray-400 dark:text-gray-500 italic">暫無評價</p>
                        )}
                    </div>
                </ReviewsDialog>

                <div className="flex gap-2 pt-2 border-t dark:border-gray-700 mt-auto">
                     {isOwned ? (
                        <Link href="/wallet" className="flex-1">
                           <Button variant="outline" className="w-full dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">管理錢包</Button>
                        </Link>
                    ) : (
                        <Button onClick={handleAddCard} className="flex-1">
                            加入錢包
                        </Button>
                    )}
                    
                    <ReviewsDialog card={card}>
                        <Button 
                            variant="ghost" 
                            size="icon"
                            className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                        >
                            <MessageSquare className="h-4 w-4" />
                        </Button>
                    </ReviewsDialog>
                    
                    {card.applyUrl && (
                        <a href={card.applyUrl} target="_blank" rel="noopener noreferrer">
                            <Button variant="ghost" size="icon" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20">
                                <ExternalLink className="h-4 w-4" />
                            </Button>
                        </a>
                    )}
                </div>
            </CardContent>
        </Card>
        </>
    );
}

function CardSkeleton() {
    return (
        <div className="flex flex-col h-[500px] rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden shadow-sm">
            {/* Image Placeholder */}
            <div className="h-48 bg-gray-100 dark:bg-gray-900/50 p-4 flex items-center justify-center">
                <Skeleton className="h-32 w-48 rounded-lg" />
            </div>
            
            {/* Content Placeholder */}
            <div className="flex-1 p-6 space-y-4">
                {/* Title & Bank */}
                <div className="space-y-2 mb-4">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-6 w-40" />
                </div>

                {/* Tags */}
                <div className="flex gap-2 mb-4">
                    <Skeleton className="h-6 w-16 rounded-md" />
                    <Skeleton className="h-6 w-20 rounded-md" />
                </div>

                {/* Rules */}
                <div className="space-y-3 mb-4">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="flex justify-between py-1">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-4 w-10" />
                        </div>
                    ))}
                </div>

                {/* Offer */}
                <Skeleton className="h-24 w-full rounded-xl" />
                
                {/* Buttons */}
                <div className="mt-auto pt-4 flex gap-2">
                    <Skeleton className="h-10 flex-1 rounded-md" />
                    <Skeleton className="h-10 w-10 rounded-md" />
                    <Skeleton className="h-10 w-10 rounded-md" />
                </div>
            </div>
        </div>
    );
}

export default function AllCardsPage() {
    const { cards, isLoading } = useDataset();
    const cardList = cards.length ? cards : HK_CARDS;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col transition-colors">
          <Navbar />
          
          <main className="container mx-auto px-4 py-8 flex-1">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">所有信用卡</h1>
              <p className="text-gray-600 dark:text-gray-400">收錄香港主流信用卡，查看優惠詳情並加入您的錢包。</p>
            </div>

            {isLoading ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: i * 0.05 }}
                        >
                            <CardSkeleton />
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {cardList.map((card, index) => (
                    <motion.div
                      key={card.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.4 }}
                    >
                      <CardItem card={card} />
                    </motion.div>
                  ))}
                </div>
            )}
          </main>
        </div>
      );
}
