"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Trash2, Loader2, Star, MessageSquare, CreditCard, User, Calendar, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { HK_CARDS } from "@/lib/data/cards";

interface CardComment {
  id: string;
  card_id: string;
  user_id: string;
  user_name: string;
  user_avatar?: string;
  content: string;
  rating?: number;
  is_deleted: boolean;
  deleted_by?: string;
  created_at: string;
}

export default function AdminCommentsPage() {
  const [comments, setComments] = useState<CardComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "deleted">("all");
  const [selectedCardId, setSelectedCardId] = useState<string>("");

  const fetchComments = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/comments");
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      setComments(data);
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

  const handleDelete = async (id: string) => {
    if (!confirm("確定要刪除此評論嗎？")) return;

    try {
      const response = await fetch(`/api/cards/comments?id=${id}&isAdmin=true`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Delete failed");

      setComments(prev => prev.map(c => 
        c.id === id ? { ...c, is_deleted: true, deleted_by: 'admin' } : c
      ));
      toast.success("評論已刪除");
    } catch (error) {
      toast.error("刪除失敗");
    }
  };

  const getCardName = (cardId: string) => {
    const card = HK_CARDS.find(c => c.id === cardId);
    return card?.name || cardId;
  };

  const getCardBank = (cardId: string) => {
    const card = HK_CARDS.find(c => c.id === cardId);
    return card?.bank || "";
  };

  // Get unique card IDs for filter
  const uniqueCardIds = Array.from(new Set(comments.map(c => c.card_id)));

  const filteredComments = comments.filter(c => {
    // Tab filter
    if (activeTab === "deleted" && !c.is_deleted) return false;
    if (activeTab === "all" && c.is_deleted) return false;

    // Card filter
    if (selectedCardId && c.card_id !== selectedCardId) return false;

    // Keyword filter
    if (keyword) {
      const lowerKeyword = keyword.toLowerCase();
      return (
        c.content.toLowerCase().includes(lowerKeyword) ||
        c.user_name.toLowerCase().includes(lowerKeyword) ||
        getCardName(c.card_id).toLowerCase().includes(lowerKeyword)
      );
    }

    return true;
  });

  // Stats
  const totalComments = comments.filter(c => !c.is_deleted).length;
  const deletedComments = comments.filter(c => c.is_deleted).length;
  const avgRating = (() => {
    const ratings = comments.filter(c => !c.is_deleted && c.rating).map(c => c.rating!);
    return ratings.length > 0 
      ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1) 
      : "N/A";
  })();

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <MessageSquare className="w-8 h-8" /> 信用卡評論管理
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            管理用戶對信用卡的評論和評分
          </p>
        </div>
        <Button variant="outline" onClick={fetchComments}>
          重新整理
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <MessageSquare className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalComments}</p>
              <p className="text-sm text-gray-500">總評論數</p>
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
          value={selectedCardId}
          onChange={(e) => setSelectedCardId(e.target.value)}
        >
          <option value="">所有信用卡</option>
          {uniqueCardIds.map(cardId => (
            <option key={cardId} value={cardId}>
              {getCardName(cardId)}
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
            <p className="text-gray-500">暫無評論</p>
          </div>
        ) : (
          filteredComments.map((comment) => (
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
                          href={`/admin/cards/new?id=${comment.card_id}`}
                          className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                        >
                          <CreditCard className="h-3 w-3" />
                          {getCardName(comment.card_id)}
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
                        onClick={() => handleDelete(comment.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

