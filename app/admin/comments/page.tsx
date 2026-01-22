"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Trash2, Loader2, Star, MessageSquare, CreditCard, User, Calendar, AlertTriangle, Gift } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { HK_CARDS } from "@/lib/data/cards";
import { PROMOS } from "@/lib/data/promos";

interface Comment {
  id: string;
  content_type: string; // 'card' or 'article'
  content_id: string;
  user_id: string;
  user_name: string;
  user_avatar?: string;
  content: string;
  is_hidden: boolean;
  is_pinned: boolean;
  likes_count: number;
  created_at: string;
  reportCount?: number;
  rating?: number;
  source?: 'new' | 'legacy_article' | 'legacy_card' | 'legacy_promo'; // 區分來源
  user?: {
    id: string;
    name: string;
    email: string;
    avatar_url?: string;
  };
}

type CommentType = "card" | "article" | "promo";

export default function AdminCommentsPage() {
  const [cardComments, setCardComments] = useState<Comment[]>([]);
  const [articleComments, setArticleComments] = useState<Comment[]>([]);
  const [promoComments, setPromoComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [activeTab, setActiveTab] = useState<"visible" | "hidden">("visible");
  const [commentType, setCommentType] = useState<CommentType>("card");
  const [selectedItemId, setSelectedItemId] = useState<string>("");

  const fetchComments = async () => {
    setLoading(true);
    try {
      // Fetch all comments via API
      const res = await fetch("/api/admin/comments");
      
      if (res.ok) {
        const data = await res.json();
        const comments = data.comments || [];
        
        // Separate comments by content_type
        setCardComments(comments.filter((c: Comment) => c.content_type === 'card'));
        setArticleComments(comments.filter((c: Comment) => c.content_type === 'article'));
        setPromoComments(comments.filter((c: Comment) => c.content_type === 'promo'));
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
      toast.error("載入評論失敗");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleDelete = async (id: string, source?: string) => {
    if (!confirm("確定要刪除此評論嗎？")) return;

    try {
      const params = new URLSearchParams({ id });
      if (source) params.append('source', source);
      
      const response = await fetch(`/api/admin/comments?${params.toString()}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Delete failed");

      // Remove from local state
      if (commentType === "card") {
        setCardComments(prev => prev.filter(c => c.id !== id));
      } else if (commentType === "article") {
        setArticleComments(prev => prev.filter(c => c.id !== id));
      } else {
        setPromoComments(prev => prev.filter(c => c.id !== id));
      }
      toast.success("評論已刪除");
    } catch (error) {
      toast.error("刪除失敗");
    }
  };

  const handleToggleHidden = async (id: string, currentHidden: boolean, source?: string) => {
    try {
      const response = await fetch(`/api/admin/comments`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, is_hidden: !currentHidden, source }),
      });

      if (!response.ok) throw new Error("Update failed");

      // Update local state
      const updateFn = (prev: Comment[]) => 
        prev.map(c => c.id === id ? { ...c, is_hidden: !currentHidden } : c);
      
      if (commentType === "card") {
        setCardComments(updateFn);
      } else if (commentType === "article") {
        setArticleComments(updateFn);
      } else {
        setPromoComments(updateFn);
      }
      toast.success(currentHidden ? "評論已顯示" : "評論已隱藏");
    } catch (error) {
      toast.error("操作失敗");
    }
  };

  const getCardName = (cardId: string) => {
    const card = HK_CARDS.find(c => c.id === cardId);
    return card?.name || cardId;
  };

  const getArticleTitle = (slug: string) => {
    // For articles, we'll just show the slug for now
    return slug.replace(/-/g, ' ').slice(0, 30) + '...';
  };

  const getPromoTitle = (promoId: string) => {
    const promo = PROMOS.find(p => p.id === promoId);
    return promo?.title || promoId.slice(0, 30) + '...';
  };

  // Current comments based on type
  const currentComments = commentType === "card" 
    ? cardComments 
    : commentType === "article" 
    ? articleComments 
    : promoComments;

  // Get unique IDs for filter
  const uniqueIds = Array.from(new Set(
    currentComments.map(c => c.content_id).filter(Boolean)
  )) as string[];

  const filteredComments = currentComments.filter(c => {
    // Tab filter
    if (activeTab === "hidden" && !c.is_hidden) return false;
    if (activeTab === "visible" && c.is_hidden) return false;

    // Item filter
    if (selectedItemId && c.content_id !== selectedItemId) return false;

    // Keyword filter
    if (keyword) {
      const lowerKeyword = keyword.toLowerCase();
      const itemName = commentType === "card" 
        ? getCardName(c.content_id) 
        : getArticleTitle(c.content_id);
      const userName = c.user?.name || c.user_name || '';
      return (
        c.content.toLowerCase().includes(lowerKeyword) ||
        userName.toLowerCase().includes(lowerKeyword) ||
        itemName.toLowerCase().includes(lowerKeyword)
      );
    }

    return true;
  });

  // Stats
  const totalCardComments = cardComments.filter(c => !c.is_hidden).length;
  const totalArticleComments = articleComments.filter(c => !c.is_hidden).length;
  const totalPromoComments = promoComments.filter(c => !c.is_hidden).length;
  const totalComments = commentType === "card" 
    ? totalCardComments 
    : commentType === "article" 
    ? totalArticleComments 
    : totalPromoComments;
  const hiddenComments = currentComments.filter(c => c.is_hidden).length;
  const totalLikes = currentComments.reduce((sum, c) => sum + (c.likes_count || 0), 0);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <MessageSquare className="w-8 h-8" /> 評論管理
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            管理用戶對信用卡和優惠的評論和評分
          </p>
        </div>
        <Button variant="outline" onClick={fetchComments}>
          重新整理
        </Button>
      </div>

      {/* Type Switcher */}
      <div className="bg-white dark:bg-gray-800 p-2 rounded-xl border dark:border-gray-700 inline-flex gap-2">
        <Button
          variant={commentType === "card" ? "default" : "ghost"}
          onClick={() => { setCommentType("card"); setSelectedItemId(""); }}
          className="gap-2"
        >
          <CreditCard className="h-4 w-4" />
          信用卡評論
          <span className="ml-1 px-2 py-0.5 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs rounded-full">
            {totalCardComments}
          </span>
        </Button>
        <Button
          variant={commentType === "article" ? "default" : "ghost"}
          onClick={() => { setCommentType("article"); setSelectedItemId(""); }}
          className="gap-2"
        >
          <Gift className="h-4 w-4" />
          文章評論
          <span className="ml-1 px-2 py-0.5 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 text-xs rounded-full">
            {totalArticleComments}
          </span>
        </Button>
        <Button
          variant={commentType === "promo" ? "default" : "ghost"}
          onClick={() => { setCommentType("promo"); setSelectedItemId(""); }}
          className="gap-2"
        >
          <Gift className="h-4 w-4" />
          優惠活動評論
          <span className="ml-1 px-2 py-0.5 bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300 text-xs rounded-full">
            {totalPromoComments}
          </span>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="p-4 flex items-center gap-4">
            <div className={`p-3 rounded-lg ${commentType === "card" ? "bg-blue-100 dark:bg-blue-900/30" : "bg-purple-100 dark:bg-purple-900/30"}`}>
              {commentType === "card" ? (
                <CreditCard className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              ) : (
                <Gift className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              )}
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalComments}</p>
              <p className="text-sm text-gray-500">{commentType === "card" ? "信用卡" : "優惠"}評論數</p>
            </div>
          </CardContent>
        </Card>
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
              <Star className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalLikes}</p>
              <p className="text-sm text-gray-500">總讚數</p>
            </div>
          </CardContent>
        </Card>
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
              <Trash2 className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{hiddenComments}</p>
              <p className="text-sm text-gray-500">已隱藏</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border dark:border-gray-700 flex flex-wrap gap-4 items-center">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="搜尋評論內容、用戶名稱..."
            className="pl-9 dark:bg-gray-700 dark:border-gray-600"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>

        <select
          className="px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm"
          value={selectedItemId}
          onChange={(e) => setSelectedItemId(e.target.value)}
        >
          <option value="">
            {commentType === "card" ? "所有信用卡" : commentType === "article" ? "所有文章" : "所有優惠活動"}
          </option>
          {uniqueIds.map(id => (
            <option key={id} value={id}>
              {commentType === "card" 
                ? getCardName(id) 
                : commentType === "article" 
                ? getArticleTitle(id) 
                : getPromoTitle(id)}
            </option>
          ))}
        </select>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
          <TabsList>
            <TabsTrigger value="visible">顯示中</TabsTrigger>
            <TabsTrigger value="hidden">已隱藏</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
          </div>
        ) : filteredComments.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-dashed">
            <MessageSquare className="h-12 w-12 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">
              暫無{commentType === "card" ? "信用卡" : commentType === "article" ? "文章" : "優惠活動"}評論
            </p>
          </div>
        ) : (
          filteredComments.map((comment) => {
            const itemName = commentType === "card" 
              ? getCardName(comment.content_id) 
              : commentType === "article"
              ? getArticleTitle(comment.content_id)
              : getPromoTitle(comment.content_id);
            const itemLink = commentType === "card"
              ? `/cards/${comment.content_id}`
              : commentType === "article"
              ? `/discover/${comment.content_id}`
              : `/promos/${comment.content_id}`;
            const userName = comment.user?.name || comment.user_name || '匿名';
            const userAvatar = comment.user?.avatar_url || comment.user_avatar;
            
            return (
              <Card 
                key={comment.id} 
                className={`dark:bg-gray-800 dark:border-gray-700 ${comment.is_hidden ? 'opacity-60' : ''}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      {/* Avatar */}
                      <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden shrink-0">
                        {userAvatar ? (
                          <img src={userAvatar} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <User className="h-5 w-5 text-gray-400" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        {/* Header */}
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="font-medium text-gray-900 dark:text-white">
                            {userName}
                          </span>
                          <span className="text-xs text-gray-400">•</span>
                          <Link 
                            href={itemLink}
                            className={`text-sm hover:underline flex items-center gap-1 ${
                              commentType === "card" 
                                ? "text-blue-600 dark:text-blue-400" 
                                : commentType === "article"
                                ? "text-purple-600 dark:text-purple-400"
                                : "text-orange-600 dark:text-orange-400"
                            }`}
                            target="_blank"
                          >
                            {commentType === "card" ? (
                              <CreditCard className="h-3 w-3" />
                            ) : (
                              <Gift className="h-3 w-3" />
                            )}
                            {itemName}
                          </Link>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(comment.created_at).toLocaleString('zh-HK')}
                          </span>
                          {comment.likes_count > 0 && (
                            <>
                              <span className="text-xs text-gray-400">•</span>
                              <span className="text-xs text-gray-500">❤️ {comment.likes_count}</span>
                            </>
                          )}
                          {(comment.reportCount || 0) > 0 && (
                            <>
                              <span className="text-xs text-gray-400">•</span>
                              <span className="text-xs text-red-500">⚠️ {comment.reportCount} 舉報</span>
                            </>
                          )}
                        </div>

                        {/* Rating */}
                        {comment.rating && comment.rating > 0 && (
                          <div className="flex items-center gap-1 mb-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-3 w-3 ${
                                  star <= comment.rating!
                                    ? 'text-yellow-400 fill-yellow-400'
                                    : 'text-gray-300 dark:text-gray-600'
                                }`}
                              />
                            ))}
                          </div>
                        )}

                        {/* Content */}
                        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                          {comment.content}
                        </p>

                        {/* Hidden Badge */}
                        {comment.is_hidden && (
                          <div className="mt-2 flex items-center gap-1 text-xs text-orange-500">
                            <AlertTriangle className="h-3 w-3" />
                            已隱藏
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      {comment.source && (
                        <span className={`text-xs px-2 py-0.5 rounded ${
                          comment.source === 'legacy_article' 
                            ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300'
                            : comment.source === 'legacy_card'
                            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                            : comment.source === 'legacy_promo'
                            ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300'
                            : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                        }`}>
                          {comment.source === 'legacy_article' ? '舊文章' : 
                           comment.source === 'legacy_card' ? '舊信用卡' : 
                           comment.source === 'legacy_promo' ? '舊優惠' : '新系統'}
                        </span>
                      )}
                      <Link href={`/admin/users/${comment.user_id}`}>
                        <Button variant="ghost" size="sm">
                          查看用戶
                        </Button>
                      </Link>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleToggleHidden(comment.id, comment.is_hidden, comment.source)}
                      >
                        {comment.is_hidden ? '顯示' : '隱藏'}
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                        onClick={() => handleDelete(comment.id, comment.source)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}

