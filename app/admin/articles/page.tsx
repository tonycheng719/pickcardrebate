"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  BookOpen, Eye, EyeOff, Trash2, Image, Calendar, 
  MessageSquare, Star, RefreshCw, Search, ExternalLink,
  ChevronDown, ChevronUp, Save, Upload
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

// All guide data
const GUIDES = [
  { id: "overseas-fee", title: "海外簽賬手續費完全攻略", tags: ["海外消費", "網購"] },
  { id: "debit-card-guide", title: "Debit Card 扣賬卡完全攻略", tags: ["基礎知識", "銀行卡"] },
  { id: "miles-vs-cashback", title: "里數 vs 現金回贈", tags: ["里數", "現金回贈"] },
  { id: "best-cashback-cards", title: "2025 最高回贈信用卡比較", tags: ["現金回贈", "信用卡比較"] },
  { id: "utility-bill-guide", title: "信用卡繳費攻略", tags: ["繳費", "水電煤"] },
  { id: "rent-payment-guide", title: "信用卡交租攻略", tags: ["交租", "公屋"] },
  { id: "tax-payment-guide", title: "信用卡交稅攻略", tags: ["交稅", "AlipayHK"] },
  { id: "online-shopping-guide", title: "網購信用卡攻略", tags: ["網購", "HKTVmall"] },
  { id: "dining-guide", title: "餐飲信用卡攻略", tags: ["餐飲", "食肆"] },
  { id: "overseas-spending-guide", title: "海外簽賬信用卡攻略", tags: ["海外簽賬", "旅行"] },
  { id: "supermarket-guide", title: "超市信用卡攻略", tags: ["超市", "百佳"] },
  { id: "taobao-guide", title: "淘寶信用卡攻略", tags: ["淘寶", "天貓"] },
  { id: "no-annual-fee-guide", title: "永久免年費信用卡推薦", tags: ["免年費", "年費豁免"] },
  { id: "student-card-guide", title: "學生信用卡推薦", tags: ["學生卡", "入門"] },
  { id: "large-purchase-guide", title: "大額消費信用卡攻略", tags: ["大額消費", "迎新"] },
  { id: "octopus-guide", title: "八達通自動增值攻略", tags: ["八達通", "自動增值"] },
  { id: "mobile-payment-guide", title: "手機支付信用卡攻略", tags: ["Apple Pay", "Google Pay"] },
  { id: "low-income-guide", title: "低門檻信用卡推薦", tags: ["低門檻", "入門"] },
  { id: "food-delivery-guide", title: "外賣平台信用卡攻略", tags: ["外賣", "Foodpanda"] },
  { id: "streaming-guide", title: "串流平台信用卡攻略", tags: ["Netflix", "Spotify"] },
  { id: "driving-guide", title: "駕駛者信用卡攻略", tags: ["油站", "隧道費"] },
  { id: "insurance-guide", title: "保險信用卡攻略", tags: ["保險", "保費"] },
  { id: "pinduoduo-guide", title: "拼多多信用卡攻略", tags: ["拼多多", "Temu"] },
  { id: "uber-guide", title: "Uber 信用卡攻略", tags: ["Uber", "交通"] },
  { id: "iherb-guide", title: "iHerb 信用卡攻略", tags: ["iHerb", "保健品"] },
  { id: "iphone-guide", title: "iPhone 出機攻略", tags: ["iPhone", "Apple"] },
  { id: "ipad-guide", title: "iPad 出機攻略", tags: ["iPad", "Apple"] },
  { id: "macbook-guide", title: "MacBook 出機攻略", tags: ["MacBook", "Apple"] },
  { id: "apple-watch-guide", title: "Apple Watch 出機攻略", tags: ["Apple Watch", "Apple"] },
  { id: "ps5-guide", title: "PS5 出機攻略", tags: ["PS5", "遊戲"] },
  { id: "xbox-guide", title: "Xbox 出機攻略", tags: ["Xbox", "遊戲"] },
  { id: "switch-guide", title: "Switch 2 出機攻略", tags: ["Switch", "Nintendo"] },
];

interface ArticleSetting {
  article_id: string;
  cover_url: string | null;
  is_visible: boolean;
  display_order: number;
  last_updated: string;
}

interface ArticleComment {
  id: string;
  article_id: string;
  user_name: string;
  rating: number;
  content: string;
  created_at: string;
}

export default function AdminArticlesPage() {
  const [settings, setSettings] = useState<Record<string, ArticleSetting>>({});
  const [comments, setComments] = useState<ArticleComment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedArticle, setExpandedArticle] = useState<string | null>(null);
  const [savingArticle, setSavingArticle] = useState<string | null>(null);

  // Fetch settings and comments
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // Fetch settings
      const settingsRes = await fetch("/api/articles/settings");
      if (settingsRes.ok) {
        const data = await settingsRes.json();
        const settingsMap: Record<string, ArticleSetting> = {};
        (data.settings || []).forEach((s: ArticleSetting) => {
          settingsMap[s.article_id] = s;
        });
        setSettings(settingsMap);
      }

      // Fetch all comments
      const commentsRes = await fetch("/api/admin/comments?type=article");
      if (commentsRes.ok) {
        const data = await commentsRes.json();
        setComments(data.comments || []);
      }
    } catch (e) {
      console.error("Failed to fetch data:", e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleVisibility = async (articleId: string) => {
    const current = settings[articleId];
    const newVisible = !current?.is_visible;
    
    try {
      const res = await fetch("/api/articles/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          articleId,
          isVisible: newVisible,
        }),
      });

      if (res.ok) {
        setSettings((prev) => ({
          ...prev,
          [articleId]: {
            ...prev[articleId],
            article_id: articleId,
            is_visible: newVisible,
            cover_url: prev[articleId]?.cover_url || null,
            display_order: prev[articleId]?.display_order || 0,
            last_updated: prev[articleId]?.last_updated || new Date().toISOString().split('T')[0],
          },
        }));
        toast.success(newVisible ? "文章已顯示" : "文章已隱藏");
      }
    } catch (e) {
      toast.error("更新失敗");
    }
  };

  const handleUpdateLastUpdated = async (articleId: string) => {
    setSavingArticle(articleId);
    const today = new Date().toISOString().split('T')[0];
    
    try {
      const res = await fetch("/api/articles/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          articleId,
          lastUpdated: today,
        }),
      });

      if (res.ok) {
        setSettings((prev) => ({
          ...prev,
          [articleId]: {
            ...prev[articleId],
            article_id: articleId,
            last_updated: today,
            is_visible: prev[articleId]?.is_visible ?? true,
            cover_url: prev[articleId]?.cover_url || null,
            display_order: prev[articleId]?.display_order || 0,
          },
        }));
        toast.success("已更新日期為今天");
      }
    } catch (e) {
      toast.error("更新失敗");
    } finally {
      setSavingArticle(null);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!confirm("確定要刪除這條評論嗎？")) return;

    try {
      const res = await fetch(`/api/articles/comments?id=${commentId}&isAdmin=true`, {
        method: "DELETE",
      });

      if (res.ok) {
        setComments((prev) => prev.filter((c) => c.id !== commentId));
        toast.success("評論已刪除");
      }
    } catch (e) {
      toast.error("刪除失敗");
    }
  };

  const filteredGuides = GUIDES.filter(
    (g) =>
      g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getArticleComments = (articleId: string) => {
    return comments.filter((c) => c.article_id === articleId);
  };

  const getArticleRating = (articleId: string) => {
    const articleComments = getArticleComments(articleId);
    if (articleComments.length === 0) return null;
    const avg = articleComments.reduce((a, c) => a + (c.rating || 0), 0) / articleComments.length;
    return avg.toFixed(1);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <BookOpen className="h-6 w-6" />
            文章管理
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            管理攻略文章的封面、顯示狀態、更新日期及評論
          </p>
        </div>
        <Button onClick={fetchData} variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          刷新
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="搜尋文章..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold">{GUIDES.length}</div>
            <div className="text-sm text-gray-500">總文章數</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-green-600">
              {Object.values(settings).filter((s) => s.is_visible !== false).length || GUIDES.length}
            </div>
            <div className="text-sm text-gray-500">顯示中</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-blue-600">{comments.length}</div>
            <div className="text-sm text-gray-500">總評論數</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-yellow-600">
              {comments.length > 0 
                ? (comments.reduce((a, c) => a + (c.rating || 0), 0) / comments.length).toFixed(1)
                : "N/A"}
            </div>
            <div className="text-sm text-gray-500">平均評分</div>
          </CardContent>
        </Card>
      </div>

      {/* Articles List */}
      <Card>
        <CardHeader>
          <CardTitle>文章列表</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8 text-gray-500">載入中...</div>
          ) : (
            <div className="space-y-2">
              {filteredGuides.map((guide) => {
                const setting = settings[guide.id];
                const isVisible = setting?.is_visible !== false;
                const lastUpdated = setting?.last_updated || "未設定";
                const articleComments = getArticleComments(guide.id);
                const rating = getArticleRating(guide.id);
                const isExpanded = expandedArticle === guide.id;

                return (
                  <div
                    key={guide.id}
                    className={`border rounded-lg overflow-hidden ${
                      !isVisible ? "opacity-60 bg-gray-50 dark:bg-gray-800/50" : ""
                    }`}
                  >
                    {/* Main Row */}
                    <div className="p-4 flex items-center gap-4">
                      {/* Cover Preview */}
                      <div className="w-16 h-12 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center flex-shrink-0">
                        {setting?.cover_url ? (
                          <img
                            src={setting.cover_url}
                            alt=""
                            className="w-full h-full object-cover rounded"
                          />
                        ) : (
                          <Image className="h-5 w-5 text-gray-400" />
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900 dark:text-white truncate">
                          {guide.title}
                        </div>
                        <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {lastUpdated}
                          </span>
                          {rating && (
                            <span className="flex items-center gap-1">
                              <Star className="h-3 w-3 text-yellow-500" />
                              {rating} ({articleComments.length})
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <MessageSquare className="h-3 w-3" />
                            {articleComments.length} 評論
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleUpdateLastUpdated(guide.id)}
                          disabled={savingArticle === guide.id}
                          title="更新日期為今天"
                        >
                          <RefreshCw className={`h-4 w-4 ${savingArticle === guide.id ? 'animate-spin' : ''}`} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleToggleVisibility(guide.id)}
                          title={isVisible ? "隱藏文章" : "顯示文章"}
                        >
                          {isVisible ? (
                            <Eye className="h-4 w-4 text-green-600" />
                          ) : (
                            <EyeOff className="h-4 w-4 text-gray-400" />
                          )}
                        </Button>
                        <Link href={`/discover/${guide.id}`} target="_blank">
                          <Button variant="ghost" size="sm">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setExpandedArticle(isExpanded ? null : guide.id)}
                        >
                          {isExpanded ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>

                    {/* Expanded Section - Comments */}
                    {isExpanded && (
                      <div className="border-t bg-gray-50 dark:bg-gray-800/50 p-4">
                        <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
                          <MessageSquare className="h-4 w-4" />
                          評論管理 ({articleComments.length})
                        </h4>
                        {articleComments.length === 0 ? (
                          <p className="text-sm text-gray-500">暫無評論</p>
                        ) : (
                          <div className="space-y-2 max-h-60 overflow-y-auto">
                            {articleComments.map((comment) => (
                              <div
                                key={comment.id}
                                className="flex items-start gap-3 bg-white dark:bg-gray-800 p-3 rounded-lg"
                              >
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="font-medium text-sm">
                                      {comment.user_name}
                                    </span>
                                    {comment.rating && (
                                      <div className="flex items-center gap-0.5">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                          <Star
                                            key={star}
                                            className={`h-3 w-3 ${
                                              star <= comment.rating
                                                ? "text-yellow-500 fill-yellow-500"
                                                : "text-gray-300"
                                            }`}
                                          />
                                        ))}
                                      </div>
                                    )}
                                    <span className="text-xs text-gray-400">
                                      {new Date(comment.created_at).toLocaleDateString("zh-HK")}
                                    </span>
                                  </div>
                                  <p className="text-sm text-gray-600 dark:text-gray-300">
                                    {comment.content}
                                  </p>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDeleteComment(comment.id)}
                                  className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

