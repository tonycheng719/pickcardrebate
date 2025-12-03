"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useWallet } from "@/lib/store/wallet-context";
import { Star, MessageSquare, Send, User } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import Script from "next/script";

interface Review {
  id: string;
  promo_id: string;
  user_id: string;
  user_name: string;
  user_avatar?: string;
  rating: number;
  content: string;
  created_at: string;
}

interface PromoReviewsProps {
  promoId: string;
  promoTitle: string;
}

export function PromoReviews({ promoId, promoTitle }: PromoReviewsProps) {
  const { user } = useWallet();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [reviewContent, setReviewContent] = useState("");
  const [rating, setRating] = useState(5);
  const [submitting, setSubmitting] = useState(false);
  const [avgRating, setAvgRating] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  // Fetch reviews
  const fetchReviews = useCallback(async () => {
    try {
      const res = await fetch(`/api/promos/comments?promoId=${promoId}`);
      if (res.ok) {
        const data = await res.json();
        setReviews(data.comments || []);
        setAvgRating(data.avgRating || 0);
        setTotalCount(data.totalCount || 0);
      }
    } catch (e) {
      console.error("Failed to fetch promo reviews:", e);
    } finally {
      setIsLoading(false);
    }
  }, [promoId]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  // Submit review
  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewContent.trim() || !user) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/promos/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          promoId,
          userId: user.id,
          userName: user.name,
          userAvatar: user.avatar,
          content: reviewContent.trim(),
          rating,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "提交評論失敗");
        return;
      }

      // Add to local state
      const newReview: Review = {
        id: data.comment?.id || Date.now().toString(),
        promo_id: promoId,
        user_id: user.id || '',
        user_name: user.name,
        user_avatar: user.avatar,
        rating,
        content: reviewContent.trim(),
        created_at: new Date().toISOString(),
      };

      setReviews(prev => [newReview, ...prev]);
      setTotalCount(prev => prev + 1);
      
      // Recalculate average
      const newTotal = totalCount + 1;
      const newAvg = ((avgRating * totalCount) + rating) / newTotal;
      setAvgRating(Math.round(newAvg * 10) / 10);
      
      setReviewContent("");
      setRating(5);
      toast.success("評論已發表！");
    } catch (e: any) {
      console.error("Add review error:", e);
      toast.error("提交評論失敗，請稍後再試");
    } finally {
      setSubmitting(false);
    }
  };

  // Generate AggregateRating Schema
  const aggregateRatingSchema = totalCount > 0 ? {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": promoTitle,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": avgRating.toFixed(1),
      "bestRating": "5",
      "worstRating": "1",
      "ratingCount": totalCount,
      "reviewCount": totalCount
    }
  } : null;

  return (
    <section className="mt-10 border-t dark:border-gray-800 pt-8">
      {/* AggregateRating Schema for SEO */}
      {aggregateRatingSchema && (
        <Script
          id="promo-aggregate-rating"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(aggregateRatingSchema) }}
        />
      )}
      
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          用戶評價
        </h2>
        
        {/* Rating Summary */}
        <div className="flex items-center gap-2 text-sm">
          <div className="flex text-yellow-400">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-4 w-4 ${star <= Math.round(avgRating) ? 'fill-current' : 'fill-none'}`}
              />
            ))}
          </div>
          <span className="font-bold text-gray-900 dark:text-white">{avgRating.toFixed(1)}</span>
          <span className="text-gray-500 dark:text-gray-400">({totalCount} 則評論)</span>
        </div>
      </div>

      {/* Review Form */}
      {user ? (
        <form onSubmit={handleSubmitReview} className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm text-gray-500 dark:text-gray-400">評分：</span>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={`text-xl transition-transform hover:scale-110 ${
                  rating >= star ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"
                }`}
              >
                ★
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              value={reviewContent}
              onChange={(e) => setReviewContent(e.target.value)}
              placeholder="分享你對這個優惠的看法..."
              className="bg-white dark:bg-gray-700 dark:border-gray-600"
              disabled={submitting}
            />
            <Button type="submit" disabled={submitting || !reviewContent.trim()}>
              <Send className="h-4 w-4 mr-1" />
              {submitting ? "發布中..." : "發布"}
            </Button>
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
            每個優惠每 24 小時只能評論一次
          </p>
        </form>
      ) : (
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 mb-6 text-center text-sm text-gray-500 dark:text-gray-400">
          <Link href="/login" className="text-blue-600 dark:text-blue-400 font-medium hover:underline">
            登入
          </Link>{" "}
          後即可發表評論
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            載入中...
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <MessageSquare className="h-12 w-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
            <p>暫無評價，成為第一個評論的人吧！</p>
          </div>
        ) : (
          reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 rounded-xl p-4"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {review.user_avatar ? (
                      <img
                        src={review.user_avatar}
                        alt={review.user_name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      review.user_name?.[0]?.toUpperCase() || <User className="h-4 w-4" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white text-sm">
                      {review.user_name}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(review.created_at).toLocaleDateString("zh-HK")}
                    </div>
                  </div>
                </div>
                <div className="flex text-yellow-400">
                  {[...Array(review.rating || 0)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed pl-12">
                {review.content}
              </p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

