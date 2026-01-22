"use client";

import { useState, useEffect } from "react";
import { Star, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useWallet } from "@/lib/store/wallet-context";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface CardRatingProps {
  cardId: string;
  cardName: string;
  compact?: boolean;
}

interface RatingStats {
  card_id: string;
  total_ratings: number;
  average_rating: number;
  five_star: number;
  four_star: number;
  three_star: number;
  two_star: number;
  one_star: number;
}

interface UserRating {
  id: string;
  rating: number;
  review: string | null;
}

export function CardRating({ cardId, cardName, compact = false }: CardRatingProps) {
  const { user } = useWallet();
  const [stats, setStats] = useState<RatingStats | null>(null);
  const [userRating, setUserRating] = useState<UserRating | null>(null);
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(0);
  const [review, setReview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchRating();
  }, [cardId]);

  const fetchRating = async () => {
    try {
      const res = await fetch(`/api/cards/${cardId}/rating`);
      if (res.ok) {
        const data = await res.json();
        setStats(data.stats);
        setUserRating(data.userRating);
        if (data.userRating) {
          setSelectedRating(data.userRating.rating);
          setReview(data.userRating.review || "");
        }
      }
    } catch (error) {
      console.error("Failed to fetch rating:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!selectedRating) {
      toast.error("請選擇評分");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/cards/${cardId}/rating`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating: selectedRating, review }),
      });

      if (res.ok) {
        toast.success(userRating ? "評分已更新" : "感謝您的評分！");
        fetchRating();
        setShowForm(false);
      } else {
        const data = await res.json();
        toast.error(data.error || "提交失敗");
      }
    } catch (error) {
      toast.error("發生錯誤");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("確定要刪除您的評分嗎？")) return;

    try {
      const res = await fetch(`/api/cards/${cardId}/rating`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("評分已刪除");
        setUserRating(null);
        setSelectedRating(0);
        setReview("");
        fetchRating();
      }
    } catch (error) {
      toast.error("刪除失敗");
    }
  };

  const renderStars = (rating: number, interactive = false, size = "h-5 w-5") => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={cn(
              size,
              "transition-colors cursor-pointer",
              (interactive ? (hoverRating || selectedRating) : rating) >= star
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300 dark:text-gray-600"
            )}
            onClick={interactive ? () => setSelectedRating(star) : undefined}
            onMouseEnter={interactive ? () => setHoverRating(star) : undefined}
            onMouseLeave={interactive ? () => setHoverRating(0) : undefined}
          />
        ))}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-gray-400">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span className="text-sm">載入中...</span>
      </div>
    );
  }

  // 緊湊模式：只顯示評分和星星
  if (compact) {
    return (
      <div className="flex items-center gap-2">
        {renderStars(stats?.average_rating || 0, false, "h-4 w-4")}
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {stats?.average_rating?.toFixed(1) || "0.0"}
          <span className="text-gray-400 ml-1">({stats?.total_ratings || 0})</span>
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* 評分統計 */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            {renderStars(stats?.average_rating || 0)}
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              {stats?.average_rating?.toFixed(1) || "0.0"}
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            {stats?.total_ratings || 0} 個評分
          </p>
        </div>

        {/* 評分分佈 */}
        {stats && stats.total_ratings > 0 && (
          <div className="hidden sm:block space-y-1 min-w-[200px]">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = stats[`${["one", "two", "three", "four", "five"][star - 1]}_star` as keyof RatingStats] as number;
              const percentage = (count / stats.total_ratings) * 100;
              return (
                <div key={star} className="flex items-center gap-2 text-sm">
                  <span className="w-3">{star}</span>
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-400 rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="w-8 text-gray-500 text-xs">{count}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 用戶評分表單 */}
      {user ? (
        <div className="border-t dark:border-gray-700 pt-4">
          {userRating && !showForm ? (
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">您的評分</p>
                  <div className="flex items-center gap-2">
                    {renderStars(userRating.rating, false, "h-4 w-4")}
                    <span className="font-medium">{userRating.rating} 星</span>
                  </div>
                  {userRating.review && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      {userRating.review}
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => setShowForm(true)}>
                    修改
                  </Button>
                  <Button variant="ghost" size="sm" onClick={handleDelete} className="text-red-500 hover:text-red-600">
                    刪除
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-2">
                  {userRating ? "修改您的評分" : `為 ${cardName} 評分`}
                </p>
                {renderStars(0, true, "h-8 w-8")}
              </div>

              <Textarea
                placeholder="分享您的使用心得（選填）"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                rows={3}
              />

              <div className="flex gap-2">
                <Button onClick={handleSubmit} disabled={isSubmitting || !selectedRating}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      提交中...
                    </>
                  ) : (
                    userRating ? "更新評分" : "提交評分"
                  )}
                </Button>
                {showForm && (
                  <Button variant="ghost" onClick={() => setShowForm(false)}>
                    取消
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="border-t dark:border-gray-700 pt-4">
          <p className="text-sm text-gray-500">
            <a href="/auth/login" className="text-blue-600 hover:underline">
              登入
            </a>
            {" "}後即可評分
          </p>
        </div>
      )}
    </div>
  );
}

// 只顯示星星的簡化版本
export function CardRatingStars({ cardId, size = "sm" }: { cardId: string; size?: "sm" | "md" }) {
  const [stats, setStats] = useState<{ average_rating: number; total_ratings: number } | null>(null);

  useEffect(() => {
    fetch(`/api/cards/${cardId}/rating`)
      .then((res) => res.json())
      .then((data) => setStats(data.stats))
      .catch(() => {});
  }, [cardId]);

  if (!stats) return null;

  const starSize = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";

  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={cn(
              starSize,
              stats.average_rating >= star
                ? "fill-yellow-400 text-yellow-400"
                : stats.average_rating >= star - 0.5
                ? "fill-yellow-400/50 text-yellow-400"
                : "text-gray-300 dark:text-gray-600"
            )}
          />
        ))}
      </div>
      <span className={cn(
        "text-gray-500",
        size === "sm" ? "text-xs" : "text-sm"
      )}>
        ({stats.total_ratings})
      </span>
    </div>
  );
}

