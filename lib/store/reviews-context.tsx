"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useWallet } from "./wallet-context";

export interface Review {
  id: string;
  cardId: string;
  userId: string;
  userName: string;
  rating: number;
  content: string;
  date: string;
}

interface ReviewsContextType {
  reviews: Review[];
  addReview: (cardId: string, rating: number, content: string) => void;
  getReviewsByCardId: (cardId: string) => Review[];
}

const ReviewsContext = createContext<ReviewsContextType | undefined>(undefined);

export function ReviewsProvider({ children }: { children: React.ReactNode }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const { user } = useWallet();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("pickcardrebate_reviews");
    if (saved) {
        setReviews(JSON.parse(saved));
    } else {
        setReviews([
            {
                id: "1",
                cardId: "hsbc-red",
                userId: "mock1",
                userName: "Chan Tai Man",
                rating: 5,
                content: "網購 4% 真的無敵，基本上每個月都刷爆 cap。",
                date: "2024-11-20"
            }
        ]);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
      if (isLoaded) {
          localStorage.setItem("pickcardrebate_reviews", JSON.stringify(reviews));
      }
  }, [reviews, isLoaded]);

  const addReview = (cardId: string, rating: number, content: string) => {
    if (!user) return;

    const newReview: Review = {
      id: Date.now().toString(),
      cardId,
      userId: user.email || "anonymous",
      userName: user.name,
      rating,
      content,
      date: new Date().toISOString().split('T')[0]
    };

    setReviews([newReview, ...reviews]);
  };

  const getReviewsByCardId = (cardId: string) => {
    return reviews.filter(r => r.cardId === cardId);
  };

  return (
    <ReviewsContext.Provider value={{ reviews, addReview, getReviewsByCardId }}>
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
