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
  card_id?: string;
  promo_id?: string;
  user_id: string;
  user_name: string;
  user_avatar?: string;
  content: string;
  rating?: number;
  is_deleted: boolean;
  deleted_by?: string;
  created_at: string;
}

type CommentType = "card" | "promo";

export default function AdminCommentsPage() {
  const [cardComments, setCardComments] = useState<Comment[]>([]);
  const [promoComments, setPromoComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "deleted">("all");
  const [commentType, setCommentType] = useState<CommentType>("card");
  const [selectedItemId, setSelectedItemId] = useState<string>("");

  const fetchComments = async () => {
    setLoading(true);
    try {
      // Fetch both types of comments
      const [cardRes, promoRes] = await Promise.all([
        fetch("/api/admin/comments?type=card"),
        fetch("/api/admin/comments?type=promo")
      ]);
      
      if (cardRes.ok) {
        const cardData = await cardRes.json();
        setCardComments(cardData);
      }
      
      if (promoRes.ok) {
        const promoData = await promoRes.json();
        setPromoComments(promoData);
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

  const handleDelete = async (id: string, type: CommentType) => {
    if (!confirm("確定要刪除此評論嗎？")) return;

    try {
      const response = await fetch(`/api/admin/comments?id=${id}&type=${type}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Delete failed");

      if (type === "card") {
        setCardComments(prev => prev.map(c => 
          c.id === id ? { ...c, is_deleted: true, deleted_by: 'admin' } : c
        ));
      } else {
        setPromoComments(prev => prev.map(c => 
          c.id === id ? { ...c, is_deleted: true, deleted_by: 'admin' } : c
        ));
      }
      toast.success("評論已刪除");
    } catch (error) {
      toast.error("刪除失敗");
    }
  };

  const getCardName = (cardId: string) => {
    const card = HK_CARDS.find(c => c.id === cardId);
    return card?.name || cardId;
  };

  const getPromoTitle = (promoId: string) => {
    const promo = PROMOS.find(p => p.id === promoId);
    return promo?.title || promoId;
  };

  // Current comments based on type
  const currentComments = commentType === "card" ? cardComments : promoComments;

  // Get unique IDs for filter
  const uniqueIds = Array.from(new Set(
    currentComments.map(c => commentType === "card" ? c.card_id : c.promo_id).filter(Boolean)
  )) as string[];

  const filteredComments = currentComments.filter(c => {
    // Tab filter
    if (activeTab === "deleted" && !c.is_deleted) return false;
    if (activeTab === "all" && c.is_deleted) return false;

    // Item filter
    const itemId = commentType === "card" ? c.card_id : c.promo_id;
    if (selectedItemId && itemId !== selectedItemId) return false;

    // Keyword filter
    if (keyword) {
      const lowerKeyword = keyword.toLowerCase();
      const itemName = commentType === "card" 
        ? getCardName(c.card_id || '') 
        : getPromoTitle(c.promo_id || '');
      return (
        c.content.toLowerCase().includes(lowerKeyword) ||
        c.user_name.toLowerCase().includes(lowerKeyword) ||
        itemName.toLowerCase().includes(lowerKeyword)
      );
    }

    return true;
  });

  // Stats
  const totalCardComments = cardComments.filter(c => !c.is_deleted).length;
  const totalPromoComments = promoComments.filter(c => !c.is_deleted).length;
  const totalComments = commentType === "card" ? totalCardComments : totalPromoComments;
  const deletedComments = currentComments.filter(c => c.is_deleted).length;
  const avgRating = (() => {
    const ratings = currentComments.filter(c => !c.is_deleted && c.rating).map(c => c.rating!);
    return ratings.length > 0 
      ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1) 
      : "N/A";
  })();

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
          variant={commentType === "promo" ? "default" : "ghost"}
          onClick={() => { setCommentType("promo"); setSelectedItemId(""); }}
          className="gap-2"
        >
          <Gift className="h-4 w-4" />
          優惠評論
          <span className="ml-1 px-2 py-0.5 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 text-xs rounded-full">
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
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{avgRating}</p>
              <p className="text-sm text-gray-500">平均評分</p>
            </div>
          </CardContent>
        </Card>
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
              <Trash2 className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{deletedComments}</p>
              <p className="text-sm text-gray-500">已刪除</p>
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
          <option value="">{commentType === "card" ? "所有信用卡" : "所有優惠"}</option>
          {uniqueIds.map(id => (
            <option key={id} value={id}>
              {commentType === "card" ? getCardName(id) : getPromoTitle(id)}
            </option>
          ))}
        </select>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
          <TabsList>
            <TabsTrigger value="all">有效評論</TabsTrigger>
            <TabsTrigger value="deleted">已刪除</TabsTrigger>
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
            <p className="text-gray-500">暫無{commentType === "card" ? "信用卡" : "優惠"}評論</p>
          </div>
        ) : (
          filteredComments.map((comment) => {
            const itemId = commentType === "card" ? comment.card_id : comment.promo_id;
            const itemName = commentType === "card" 
              ? getCardName(comment.card_id || '') 
              : getPromoTitle(comment.promo_id || '');
            const itemLink = commentType === "card"
              ? `/cards/${comment.card_id}`
              : `/promos/${comment.promo_id}`;
            
            return (
              <Card 
                key={comment.id} 
                className={`dark:bg-gray-800 dark:border-gray-700 ${comment.is_deleted ? 'opacity-60' : ''}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      {/* Avatar */}
                      <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden shrink-0">
                        {comment.user_avatar ? (
                          <img src={comment.user_avatar} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <User className="h-5 w-5 text-gray-400" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        {/* Header */}
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="font-medium text-gray-900 dark:text-white">
                            {comment.user_name}
                          </span>
                          <span className="text-xs text-gray-400">•</span>
                          <Link 
                            href={itemLink}
                            className={`text-sm hover:underline flex items-center gap-1 ${
                              commentType === "card" 
                                ? "text-blue-600 dark:text-blue-400" 
                                : "text-purple-600 dark:text-purple-400"
                            }`}
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
                        </div>

                        {/* Rating */}
                        {comment.rating && (
                          <div className="flex items-center gap-1 mb-2">
                            {[1, 2, 3, 4, 5].map(star => (
                              <Star 
                                key={star} 
                                className={`h-4 w-4 ${star <= comment.rating! ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                        )}

                        {/* Content */}
                        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                          {comment.content}
                        </p>

                        {/* Deleted Badge */}
                        {comment.is_deleted && (
                          <div className="mt-2 flex items-center gap-1 text-xs text-red-500">
                            <AlertTriangle className="h-3 w-3" />
                            已由{comment.deleted_by === 'admin' ? '管理員' : '用戶'}刪除
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    {!comment.is_deleted && (
                      <div className="flex items-center gap-2">
                        <Link href={`/admin/users/${comment.user_id}`}>
                          <Button variant="ghost" size="sm">
                            查看用戶
                          </Button>
                        </Link>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                          onClick={() => handleDelete(comment.id, commentType)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
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

