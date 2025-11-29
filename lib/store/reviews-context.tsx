"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useWallet } from "./wallet-context";
import { toast } from "sonner";

export interface Review {
  id: string;
  cardId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  content: string;
  date: string;
}

interface ReviewsContextType {
  reviews: Review[];
  isLoading: boolean;
  addReview: (cardId: string, rating: number, content: string) => Promise<boolean>;
  getReviewsByCardId: (cardId: string) => Review[];
  fetchReviewsForCard: (cardId: string) => Promise<void>;
}

const ReviewsContext = createContext<ReviewsContextType | undefined>(undefined);

export function ReviewsProvider({ children }: { children: React.ReactNode }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchedCards, setFetchedCards] = useState<Set<string>>(new Set());
  const { user } = useWallet();

  // Fetch reviews for a specific card from the API
  const fetchReviewsForCard = useCallback(async (cardId: string) => {
    // Skip if already fetched
    if (fetchedCards.has(cardId)) return;

    try {
      const res = await fetch(`/api/cards/comments?cardId=${cardId}`);
      if (res.ok) {
        const data = await res.json();
        const newReviews: Review[] = (data.comments || []).map((c: any) => ({
          id: c.id,
          cardId: c.card_id,
          userId: c.user_id,
          userName: c.user_name || 'Anonymous',
          userAvatar: c.user_avatar,
          rating: c.rating || 0,
          content: c.content,
          date: new Date(c.created_at).toISOString().split('T')[0],
        }));

        setReviews(prev => {
          // Remove old reviews for this card and add new ones
          const filtered = prev.filter(r => r.cardId !== cardId);
          return [...filtered, ...newReviews];
        });

        setFetchedCards(prev => new Set(prev).add(cardId));
      }
    } catch (e) {
      console.error("Failed to fetch reviews for card:", cardId, e);
    }
  }, [fetchedCards]);

  // Add a new review
  const addReview = async (cardId: string, rating: number, content: string): Promise<boolean> => {
    if (!user) {
      toast.error("請先登入");
      return false;
    }

    if (!content.trim()) {
      toast.error("請輸入評論內容");
      return false;
    }

    if (rating < 1 || rating > 5) {
      toast.error("請選擇評分 (1-5 星)");
      return false;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/cards/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cardId,
          userId: user.id,
          userName: user.name,
          userAvatar: user.avatar,
          content: content.trim(),
          rating,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "提交評論失敗");
        return false;
      }

      // Add to local state
      const newReview: Review = {
        id: data.comment?.id || Date.now().toString(),
        cardId,
        userId: user.id || '',
        userName: user.name,
        userAvatar: user.avatar,
        rating,
        content: content.trim(),
        date: new Date().toISOString().split('T')[0],
      };

      setReviews(prev => [newReview, ...prev]);
      toast.success("評論已發表！");
      return true;
    } catch (e: any) {
      console.error("Add review error:", e);
      toast.error("提交評論失敗，請稍後再試");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Get reviews for a specific card (from local state)
  const getReviewsByCardId = useCallback((cardId: string) => {
    return reviews.filter(r => r.cardId === cardId);
  }, [reviews]);

  return (
    <ReviewsContext.Provider value={{ 
      reviews, 
      isLoading, 
      addReview, 
      getReviewsByCardId,
      fetchReviewsForCard 
    }}>
      {children}
    </ReviewsContext.Provider>
  );
}

export function useReviews() {
  const context = useContext(ReviewsContext);
  if (context === undefined) {
    throw new Error("useReviews must be used within a ReviewsProvider");
  }
  return context;
}
