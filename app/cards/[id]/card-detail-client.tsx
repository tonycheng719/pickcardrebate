"use client";

import { useState, useEffect } from "react";
import { CreditCard, Star, ArrowLeft, ExternalLink, Calendar, Shield, Percent, MessageSquare, Send, Loader2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import Link from "next/link";
import { useWallet } from "@/lib/store/wallet-context";
import type { CreditCard as CreditCardType } from "@/lib/types";

interface CardComment {
  id: string;
  user_name: string;
  user_avatar?: string;
  content: string;
  rating?: number;
  created_at: string;
}

interface CardDetailClientProps {
  card: CreditCardType;
}

export function CardDetailClient({ card }: CardDetailClientProps) {
  const { user, addCard, myCardIds } = useWallet();
  const isInWallet = myCardIds.includes(card.id);

  // Comments state
  const [comments, setComments] = useState<CardComment[]>([]);
  const [avgRating, setAvgRating] = useState(0);
  const [loadingComments, setLoadingComments] = useState(true);
  
  // New comment form
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  // Fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/cards/comments?cardId=${card.id}`);
        if (res.ok) {
          const data = await res.json();
          setComments(data.comments || []);
          setAvgRating(data.avgRating || 0);
        }
      } catch (e) {
        console.error("Failed to fetch comments:", e);
      } finally {
        setLoadingComments(false);
      }
    };
    fetchComments();
  }, [card.id]);

  const handleSubmitComment = async () => {
    if (!user) {
      toast.error("請先登入才能發表評論");
      return;
    }

    if (!newComment.trim()) {
      toast.error("請輸入評論內容");
      return;
    }

    if (newRating === 0) {
      toast.error("請選擇評分");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/cards/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cardId: card.id,
          userId: user.id,
          userName: user.name,
          userAvatar: user.avatar,
          content: newComment.trim(),
          rating: newRating,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "提交失敗");
      }

      // Add new comment to list
      setComments(prev => [data.comment, ...prev]);
      setNewComment("");
      setNewRating(0);
      toast.success("評論已發表！");

      // Recalculate average
      const allRatings = [newRating, ...comments.filter(c => c.rating).map(c => c.rating!)];
      setAvgRating(Math.round((allRatings.reduce((a, b) => a + b, 0) / allRatings.length) * 10) / 10);
    } catch (e: any) {
      toast.error(e.message || "提交評論失敗");
    } finally {
      setSubmitting(false);
    }
  };

  const handleAddToWallet = () => {
    if (!user) {
      toast.error("請先登入");
      return;
    }
    addCard(card.id);
    toast.success("已加入錢包！");
  };

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Breadcrumb */}
      <nav className="mb-6">
        <Link href="/cards" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
          <ArrowLeft className="h-4 w-4 mr-1" /> 返回信用卡列表
        </Link>
      </nav>

      {/* Card Header */}
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border dark:border-gray-800 overflow-hidden mb-8">
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Card Image */}
            <div className="w-full md:w-64 shrink-0">
              {card.imageUrl ? (
                <img 
                  src={card.imageUrl} 
                  alt={card.name}
                  className="w-full h-40 md:h-auto object-contain rounded-xl bg-gray-100 dark:bg-gray-800 p-4"
                />
              ) : (
                <div className={`w-full h-40 rounded-xl flex items-center justify-center ${card.style?.bgColor || 'bg-gray-200'}`}>
                  <CreditCard className={`h-16 w-16 ${card.style?.textColor || 'text-gray-500'}`} />
                </div>
              )}
            </div>

            {/* Card Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{card.bank}</p>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {card.name}
                  </h1>
                  
                  {/* Rating Display */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map(star => (
                        <Star 
                          key={star} 
                          className={`h-5 w-5 ${star <= Math.round(avgRating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-lg font-bold text-gray-900 dark:text-white">{avgRating || "-"}</span>
                    <span className="text-sm text-gray-500">({comments.length} 評論)</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2">
                  {isInWallet ? (
                    <Button variant="outline" disabled className="gap-2">
                      <Shield className="h-4 w-4" /> 已在錢包
                    </Button>
                  ) : (
                    <Button onClick={handleAddToWallet} className="gap-2">
                      <CreditCard className="h-4 w-4" /> 加入錢包
                    </Button>
                  )}
                  {card.applyUrl && (
                    <a href={card.applyUrl} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" className="w-full gap-2">
                        <ExternalLink className="h-4 w-4" /> 立即申請
                      </Button>
                    </a>
                  )}
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {card.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-sm rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Calendar className="h-4 w-4" />
                  <span>年費: {card.annualFee === 0 ? "永久免年費" : `$${card.annualFee}`}</span>
                </div>
                {card.foreignCurrencyFee !== undefined && (
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Percent className="h-4 w-4" />
                    <span>外幣手續費: {card.foreignCurrencyFee}%</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Selling Points */}
        {card.sellingPoints && card.sellingPoints.length > 0 && (
          <div className="border-t dark:border-gray-800 p-6 bg-gray-50 dark:bg-gray-800/50">
            <h3 className="font-bold text-gray-900 dark:text-white mb-3">主要賣點</h3>
            <ul className="space-y-2">
              {card.sellingPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-600 dark:text-gray-300">
                  <span className="text-green-500 mt-0.5">✓</span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Reward Rules */}
      <Card className="dark:bg-gray-900 dark:border-gray-800 mb-8">
        <CardHeader>
          <CardTitle className="text-lg dark:text-white">回贈規則</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {card.rules.map((rule, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    {rule.percentage}%
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{rule.description}</p>
                  {rule.cap && (
                    <p className="text-sm text-gray-500 mt-1">
                      上限: ${rule.cap} {rule.capType === 'reward' ? '回贈' : '簽賬'}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Comments Section */}
      <Card className="dark:bg-gray-900 dark:border-gray-800">
        <CardHeader>
          <CardTitle className="text-lg dark:text-white flex items-center gap-2">
            <MessageSquare className="h-5 w-5" /> 用戶評價 ({comments.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* New Comment Form */}
          {user ? (
            <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">發表你的評價</p>
              
              {/* Star Rating Input */}
              <div className="flex items-center gap-1 mb-3">
                <span className="text-sm text-gray-500 mr-2">評分:</span>
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setNewRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="focus:outline-none"
                  >
                    <Star 
                      className={`h-6 w-6 transition-colors ${
                        star <= (hoverRating || newRating) 
                          ? 'text-yellow-400 fill-yellow-400' 
                          : 'text-gray-300 dark:text-gray-600'
                      }`} 
                    />
                  </button>
                ))}
                {newRating > 0 && (
                  <span className="text-sm text-gray-500 ml-2">{newRating} 星</span>
                )}
              </div>

              <Textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="分享你對這張信用卡的使用心得..."
                rows={3}
                className="mb-3 dark:bg-gray-700 dark:border-gray-600"
              />
              <Button onClick={handleSubmitComment} disabled={submitting} className="gap-2">
                {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                發表評論
              </Button>
            </div>
          ) : (
            <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl text-center">
              <p className="text-gray-500 mb-3">登入後即可發表評論</p>
              <Link href="/login">
                <Button variant="outline">登入</Button>
              </Link>
            </div>
          )}

          {/* Comments List */}
          {loadingComments ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
            </div>
          ) : comments.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <MessageSquare className="h-12 w-12 mx-auto text-gray-300 mb-3" />
              <p>暫無評論，成為第一個評論者！</p>
            </div>
          ) : (
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden shrink-0">
                    {comment.user_avatar ? (
                      <img src={comment.user_avatar} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <User className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-gray-900 dark:text-white">{comment.user_name}</span>
                      <span className="text-xs text-gray-400">
                        {new Date(comment.created_at).toLocaleDateString('zh-HK')}
                      </span>
                    </div>
                    {comment.rating && (
                      <div className="flex items-center gap-0.5 mb-2">
                        {[1, 2, 3, 4, 5].map(star => (
                          <Star 
                            key={star} 
                            className={`h-3.5 w-3.5 ${star <= comment.rating! ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                    )}
                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{comment.content}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}

