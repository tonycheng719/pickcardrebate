"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useWallet } from "@/lib/store/wallet-context";
import { Star, MessageSquare, User, Loader2 } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface ArticleReview {
  id: string;
  article_id: string;
  user_id: string;
  user_name: string;
  user_avatar?: string;
  rating: number;
  content: string;
  created_at: string;
}

interface ArticleReviewsProps {
  articleId: string;
  articleTitle: string;
}

export function ArticleReviews({ articleId, articleTitle }: ArticleReviewsProps) {
  const { user } = useWallet();
  const [reviews, setReviews] = useState<ArticleReview[]>([]);
  const [avgRating, setAvgRating] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newContent, setNewContent] = useState("");
  const [hoverRating, setHoverRating] = useState(0);

  // Fetch reviews
  const fetchReviews = useCallback(async () => {
    try {
      const res = await fetch(`/api/articles/comments?articleId=${articleId}`);
      if (res.ok) {
        const data = await res.json();
        setReviews(data.comments || []);
        setAvgRating(data.avgRating || 0);
      }
    } catch (e) {
      console.error("Failed to fetch article reviews:", e);
    } finally {
      setIsLoading(false);
    }
  }, [articleId]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  // Submit review
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("請先登入");
      return;
    }
    if (!newContent.trim()) {
      toast.error("請輸入評論內容");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/articles/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          articleId,
          userId: user.id,
          userName: user.name,
          userAvatar: user.avatar,
          content: newContent.trim(),
          rating: newRating,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "提交評論失敗");
        return;
      }

      toast.success("評論已發表！");
      setNewContent("");
      setNewRating(5);
      fetchReviews(); // Refresh reviews
    } catch (e) {
      console.error("Submit review error:", e);
      toast.error("提交評論失敗，請稍後再試");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("zh-HK", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="mt-12 border-t dark:border-gray-800 pt-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <MessageSquare className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            讀者評論
          </h2>
          {reviews.length > 0 && (
            <span className="text-sm text-gray-500 dark:text-gray-400">
              ({reviews.length} 則評論)
            </span>
          )}
        </div>
        {avgRating > 0 && (
          <div className="flex items-center gap-2 bg-yellow-50 dark:bg-yellow-900/20 px-3 py-1.5 rounded-full">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <span className="font-bold text-yellow-700 dark:text-yellow-400">
              {avgRating.toFixed(1)}
            </span>
            <span className="text-sm text-yellow-600 dark:text-yellow-500">/ 5</span>
          </div>
        )}
      </div>

      {/* Submit Form */}
      {user ? (
        <form onSubmit={handleSubmit} className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm text-gray-600 dark:text-gray-400">評分：</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setNewRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-0.5 transition-transform hover:scale-110"
                >
                  <Star
                    className={`h-5 w-5 transition-colors ${
                      star <= (hoverRating || newRating)
                        ? "text-yellow-500 fill-yellow-500"
                        : "text-gray-300 dark:text-gray-600"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <Input
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder="分享你對這篇攻略的想法..."
              className="bg-white dark:bg-gray-700 dark:border-gray-600"
              disabled={isSubmitting}
            />
            <Button type="submit" disabled={isSubmitting || !newContent.trim()}>
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "發表"
              )}
            </Button>
          </div>
        </form>
      ) : (
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 mb-6 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            登入後即可發表評論
          </p>
          <Link href="/login">
            <Button variant="outline" size="sm">
              登入 / 註冊
            </Button>
          </Link>
        </div>
      )}

      {/* Reviews List */}
      {isLoading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
        </div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <MessageSquare className="h-10 w-10 mx-auto mb-2 opacity-50" />
          <p>暫無評論，成為第一個發表評論的人吧！</p>
        </div>
      ) : (
        <AnimatePresence>
          <div className="space-y-4">
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-4 border dark:border-gray-700"
              >
                <div className="flex items-start gap-3">
                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center flex-shrink-0">
                    {review.user_avatar ? (
                      <img
                        src={review.user_avatar}
                        alt={review.user_name}
                        className="w-10 h-10 rounded-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <User className="h-5 w-5 text-white" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-gray-900 dark:text-white">
                        {review.user_name}
                      </span>
                      {review.rating && (
                        <div className="flex items-center gap-0.5">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-3.5 w-3.5 ${
                                star <= review.rating
                                  ? "text-yellow-500 fill-yellow-500"
                                  : "text-gray-300 dark:text-gray-600"
                              }`}
                            />
                          ))}
                        </div>
                      )}
                      <span className="text-xs text-gray-400">
                        {formatDate(review.created_at)}
                      </span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                      {review.content}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      )}
    </div>
  );
}

// Export for SEO schema
export function useArticleRatingData(articleId: string) {
  const [data, setData] = useState<{ avgRating: number; totalCount: number }>({
    avgRating: 0,
    totalCount: 0,
  });

  useEffect(() => {
    fetch(`/api/articles/comments?articleId=${articleId}`)
      .then((res) => res.json())
      .then((result) => {
        setData({
          avgRating: result.avgRating || 0,
          totalCount: result.totalCount || 0,
        });
      })
      .catch(console.error);
  }, [articleId]);

  return data;
}

