"use client";

import { useState, useEffect, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  Search, BookOpen, Eye, ExternalLink, Tag, Image as ImageIcon,
  TrendingUp, Sparkles, CalendarIcon, Gift, Plus, Pencil, RotateCcw, Loader2
} from "lucide-react";
import Link from "next/link";
import { GUIDES, Guide } from "@/lib/data/guides";
import { useDataset } from "@/lib/admin/data-store";
import { toast } from "sonner";

interface ViewStat {
  page_id: string;
  view_count: number;
}

interface ArticleSetting {
  id: string;
  article_id: string;
  cover_image_url: string | null;
}

export default function AdminDiscoverPage() {
  const { promos } = useDataset();
  const [keyword, setKeyword] = useState("");
  const [viewStats, setViewStats] = useState<Record<string, number>>({});
  const [articleSettings, setArticleSettings] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"guides" | "promos">("guides");
  
  // Edit cover dialog
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingGuide, setEditingGuide] = useState<Guide | null>(null);
  const [newCoverUrl, setNewCoverUrl] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // Fetch view stats and article settings
  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch view stats
        const viewRes = await fetch('/api/stats/pageview?pageType=article');
        if (viewRes.ok) {
          const data = await viewRes.json();
          const stats: Record<string, number> = {};
          (data.stats || []).forEach((s: ViewStat) => {
            stats[s.page_id] = s.view_count;
          });
          setViewStats(stats);
        }

        // Fetch article settings (custom covers)
        const settingsRes = await fetch('/api/admin/article-settings');
        if (settingsRes.ok) {
          const data = await settingsRes.json();
          const settings: Record<string, string> = {};
          (data.settings || []).forEach((s: ArticleSetting) => {
            if (s.cover_image_url) {
              settings[s.article_id] = s.cover_image_url;
            }
          });
          setArticleSettings(settings);
        }
      } catch (e) {
        console.error("Failed to fetch data:", e);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  // Get effective cover image (custom or default)
  const getCoverImage = (guide: Guide) => {
    return articleSettings[guide.id] || guide.imageUrl;
  };

  // Filter guides
  const filteredGuides = useMemo(() => {
    return GUIDES.filter(guide => 
      guide.title.toLowerCase().includes(keyword.toLowerCase()) ||
      guide.description.toLowerCase().includes(keyword.toLowerCase()) ||
      guide.tags.some(tag => tag.toLowerCase().includes(keyword.toLowerCase()))
    );
  }, [keyword]);

  // Sort guides by view count
  const sortedGuides = useMemo(() => {
    return [...filteredGuides].sort((a, b) => {
      const viewA = viewStats[a.id] || 0;
      const viewB = viewStats[b.id] || 0;
      return viewB - viewA;
    });
  }, [filteredGuides, viewStats]);

  // Filter promos
  const filteredPromos = useMemo(() => {
    return promos.filter(promo =>
      promo.title.toLowerCase().includes(keyword.toLowerCase()) ||
      promo.merchant.toLowerCase().includes(keyword.toLowerCase())
    );
  }, [keyword, promos]);

  const totalGuideViews = Object.values(viewStats).reduce((a, b) => a + b, 0);

  // Open edit dialog
  const handleEditCover = (guide: Guide) => {
    setEditingGuide(guide);
    setNewCoverUrl(articleSettings[guide.id] || guide.imageUrl);
    setEditDialogOpen(true);
  };

  // Save new cover
  const handleSaveCover = async () => {
    if (!editingGuide) return;
    
    setIsSaving(true);
    try {
      const res = await fetch('/api/admin/article-settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          articleId: editingGuide.id,
          coverImageUrl: newCoverUrl || null,
        }),
      });

      const data = await res.json();
      
      if (data.sqlRequired) {
        toast.error('請先在 Supabase SQL Editor 執行 sql/article_settings.sql');
        return;
      }

      if (!res.ok) {
        throw new Error(data.error || 'Failed to save');
      }

      // Update local state
      if (newCoverUrl) {
        setArticleSettings(prev => ({ ...prev, [editingGuide.id]: newCoverUrl }));
      } else {
        setArticleSettings(prev => {
          const newSettings = { ...prev };
          delete newSettings[editingGuide.id];
          return newSettings;
        });
      }

      toast.success('封面圖片已更新');
      setEditDialogOpen(false);
    } catch (error: any) {
      toast.error('更新失敗：' + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  // Reset to default cover
  const handleResetCover = async () => {
    if (!editingGuide) return;
    
    setIsSaving(true);
    try {
      const res = await fetch(`/api/admin/article-settings?articleId=${editingGuide.id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to reset');
      }

      // Update local state
      setArticleSettings(prev => {
        const newSettings = { ...prev };
        delete newSettings[editingGuide.id];
        return newSettings;
      });

      toast.success('已恢復預設封面');
      setEditDialogOpen(false);
    } catch (error: any) {
      toast.error('重設失敗：' + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <BookOpen className="h-8 w-8" /> 探索內容管理
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            管理 /discover 頁面的攻略文章和優惠活動
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/discover" target="_blank">
            <Button variant="outline" className="gap-2">
              <ExternalLink className="h-4 w-4" />
              前往探索頁
            </Button>
          </Link>
          <Link href="/admin/promos/new">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              新增優惠
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{GUIDES.length}</p>
              <p className="text-sm text-gray-500">攻略文章</p>
            </div>
          </CardContent>
        </Card>
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <Gift className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{promos.length}</p>
              <p className="text-sm text-gray-500">優惠活動</p>
            </div>
          </CardContent>
        </Card>
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <Eye className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalGuideViews.toLocaleString()}</p>
              <p className="text-sm text-gray-500">攻略總瀏覽</p>
            </div>
          </CardContent>
        </Card>
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
              <Sparkles className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{GUIDES.filter(g => g.isNew).length}</p>
              <p className="text-sm text-gray-500">新文章</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
        <div className="flex items-center justify-between gap-4 bg-white dark:bg-gray-800 p-4 rounded-xl border dark:border-gray-700">
          <TabsList>
            <TabsTrigger value="guides" className="gap-2">
              <BookOpen className="h-4 w-4" />
              攻略文章 ({GUIDES.length})
            </TabsTrigger>
            <TabsTrigger value="promos" className="gap-2">
              <Gift className="h-4 w-4" />
              優惠活動 ({promos.length})
            </TabsTrigger>
          </TabsList>
          
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder={activeTab === "guides" ? "搜尋攻略標題或標籤..." : "搜尋優惠標題或商戶..."}
              className="pl-9 dark:bg-gray-700 dark:border-gray-600"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
        </div>

        {/* Guides Tab */}
        <TabsContent value="guides" className="mt-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700 overflow-hidden">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 dark:bg-gray-900/50 text-gray-500 dark:text-gray-400 border-b dark:border-gray-700">
                <tr>
                  <th className="px-6 py-4 font-medium">封面</th>
                  <th className="px-6 py-4 font-medium">標題</th>
                  <th className="px-6 py-4 font-medium">標籤</th>
                  <th className="px-6 py-4 font-medium">
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      瀏覽
                    </div>
                  </th>
                  <th className="px-6 py-4 font-medium">狀態</th>
                  <th className="px-6 py-4 font-medium">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y dark:divide-gray-700">
                {sortedGuides.map((guide, index) => {
                  const views = viewStats[guide.id] || 0;
                  const isTop3 = index < 3 && views > 0;
                  const hasCustomCover = !!articleSettings[guide.id];
                  const coverImage = getCoverImage(guide);
                  
                  return (
                    <tr key={guide.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="relative group">
                          {coverImage ? (
                            <div className="w-20 h-12 rounded overflow-hidden bg-gray-100">
                              <img src={coverImage} alt="" className="w-full h-full object-cover" />
                            </div>
                          ) : (
                            <div className="w-20 h-12 rounded bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-400">
                              <ImageIcon className="h-4 w-4" />
                            </div>
                          )}
                          {hasCustomCover && (
                            <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800" title="已自訂封面" />
                          )}
                          <button
                            onClick={() => handleEditCover(guide)}
                            className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded"
                          >
                            <Pencil className="h-4 w-4 text-white" />
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-medium text-gray-900 dark:text-white line-clamp-1">{guide.title}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">{guide.description}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-1 flex-wrap">
                          {guide.tags.slice(0, 3).map(tag => (
                            <span key={tag} className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded-full text-xs text-gray-600 dark:text-gray-300">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {isTop3 && <TrendingUp className="h-4 w-4 text-green-500" />}
                          <span className={`font-medium ${isTop3 ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-300'}`}>
                            {views.toLocaleString()}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {guide.isNew && (
                            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium">
                              NEW
                            </span>
                          )}
                          {hasCustomCover && (
                            <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-xs font-medium">
                              自訂封面
                            </span>
                          )}
                          {!guide.isNew && !hasCustomCover && (
                            <span className="text-gray-400 text-xs">-</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="gap-1"
                            onClick={() => handleEditCover(guide)}
                          >
                            <Pencil className="h-3 w-3" />
                            封面
                          </Button>
                          <Link href={`/discover/${guide.id}`} target="_blank">
                            <Button variant="ghost" size="sm" className="gap-1">
                              <ExternalLink className="h-3 w-3" />
                              查看
                            </Button>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </TabsContent>

        {/* Promos Tab */}
        <TabsContent value="promos" className="mt-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700 overflow-hidden">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 dark:bg-gray-900/50 text-gray-500 dark:text-gray-400 border-b dark:border-gray-700">
                <tr>
                  <th className="px-6 py-4 font-medium">圖片</th>
                  <th className="px-6 py-4 font-medium">標題</th>
                  <th className="px-6 py-4 font-medium">商戶</th>
                  <th className="px-6 py-4 font-medium">標籤</th>
                  <th className="px-6 py-4 font-medium">到期日</th>
                </tr>
              </thead>
              <tbody className="divide-y dark:divide-gray-700">
                {filteredPromos.map((promo) => (
                  <tr key={promo.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="px-6 py-4">
                      {promo.imageUrl ? (
                        <div className="w-12 h-8 rounded overflow-hidden bg-gray-100">
                          <img src={promo.imageUrl} alt="" className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="w-12 h-8 rounded bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-400">
                          <ImageIcon className="h-4 w-4" />
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900 dark:text-white">{promo.title}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">{promo.description}</p>
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{promo.merchant}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2 flex-wrap">
                        {promo.tags.map((tag) => (
                          <span key={tag} className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded-full text-xs text-gray-600 dark:text-gray-300">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500 dark:text-gray-300 flex items-center gap-1">
                      <CalendarIcon className="h-4 w-4" />
                      {promo.expiryDate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>

      {/* Edit Cover Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5" />
              編輯文章封面
            </DialogTitle>
            <DialogDescription>
              {editingGuide?.title}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {/* Preview */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">預覽</p>
              {newCoverUrl ? (
                <div className="w-full h-40 rounded-lg overflow-hidden bg-gray-100">
                  <img 
                    src={newCoverUrl} 
                    alt="Preview" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '';
                      (e.target as HTMLImageElement).classList.add('hidden');
                    }}
                  />
                </div>
              ) : (
                <div className="w-full h-40 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-400">
                  <div className="text-center">
                    <ImageIcon className="h-8 w-8 mx-auto mb-2" />
                    <p className="text-sm">無封面圖片</p>
                  </div>
                </div>
              )}
            </div>

            {/* URL Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                圖片網址 (URL)
              </label>
              <Input
                placeholder="https://example.com/image.jpg"
                value={newCoverUrl}
                onChange={(e) => setNewCoverUrl(e.target.value)}
              />
              <p className="text-xs text-gray-500">
                建議使用 Unsplash、Imgur 或其他圖床的圖片連結
              </p>
            </div>

            {/* Default image info */}
            {editingGuide && articleSettings[editingGuide.id] && (
              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
                <p className="text-sm text-amber-800 dark:text-amber-200">
                  目前使用自訂封面。點擊「恢復預設」可使用原始封面圖片。
                </p>
              </div>
            )}
          </div>

          <DialogFooter className="gap-2">
            {editingGuide && articleSettings[editingGuide.id] && (
              <Button
                variant="outline"
                onClick={handleResetCover}
                disabled={isSaving}
                className="gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                恢復預設
              </Button>
            )}
            <Button
              variant="outline"
              onClick={() => setEditDialogOpen(false)}
              disabled={isSaving}
            >
              取消
            </Button>
            <Button onClick={handleSaveCover} disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  儲存中...
                </>
              ) : (
                '儲存'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
