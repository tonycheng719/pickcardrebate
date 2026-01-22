"use client";

import { useState, useEffect, useMemo, useRef } from "react";
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
  TrendingUp, Sparkles, CalendarIcon, Gift, Plus, Pencil, RotateCcw, Loader2, Upload,
  Pin, PinOff, ArrowUp, ArrowDown, Clock, Settings, X, Edit
} from "lucide-react";
import { Label } from "@/components/ui/label";
import Link from "next/link";
// 注意：GUIDES 和 PROMOS 現在統一從資料庫載入，不再使用本地文件
import { useDataset } from "@/lib/admin/data-store";
import { toast } from "sonner";

// Guide 介面定義（原本在 lib/data/guides.ts）
interface Guide {
  id: string;
  type: "guide";
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  merchant: string;
  isNew: boolean;
  viewCount?: number;
}

interface ViewStat {
  page_id: string;
  view_count: number;
}

interface ArticleSetting {
  id: string;
  article_id: string;
  cover_image_url: string | null;
  content_type: 'guide' | 'promo' | null;
  custom_tags: string[] | null;
  is_pinned: boolean | null;
  pinned_until: string | null; // 置頂到期日期
}

export default function AdminDiscoverPage() {
  // 所有文章現在都從資料庫載入（不再合併本地數據）
  const { promos } = useDataset();
  
  // 從資料庫中分離出 guides 和 promos
  const guides = useMemo(() => {
    return promos
      .filter(p => (p as any).contentType === 'guide')
      .map(p => ({
        id: p.id,
        type: 'guide' as const,
        title: p.title,
        description: p.description,
        imageUrl: p.imageUrl || '',
        tags: p.tags,
        merchant: p.merchant,
        isNew: (p as any).isNew || false,
      }));
  }, [promos]);
  
  // 過濾出純優惠文章（不是 guide）
  const promoItems = useMemo(() => {
    return promos.filter(p => (p as any).contentType !== 'guide');
  }, [promos]);
  
  const [keyword, setKeyword] = useState("");
  const [viewStats, setViewStats] = useState<Record<string, number>>({});
  const [articleSettings, setArticleSettings] = useState<Record<string, string>>({});
  const [articleCategories, setArticleCategories] = useState<Record<string, string>>({});
  const [articleTags, setArticleTags] = useState<Record<string, string[]>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"guides" | "promos">("guides");
  
  // Edit dialog (cover + category + tags + pinned)
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<{ id: string; title: string; type: 'guide' | 'promo'; imageUrl?: string } | null>(null);
  const [newCoverUrl, setNewCoverUrl] = useState("");
  const [newContentType, setNewContentType] = useState<"guide" | "promo" | "">("");
  const [newTags, setNewTags] = useState<string[]>([]);
  const [newIsPinned, setNewIsPinned] = useState(false);
  const [newPinnedUntil, setNewPinnedUntil] = useState(""); // 置頂到期日期
  const [tagInput, setTagInput] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Pinned settings (from article_settings)
  const [articlePinned, setArticlePinned] = useState<Record<string, boolean>>({});
  const [articlePinnedUntil, setArticlePinnedUntil] = useState<Record<string, string>>({});
  
  // Sync local data state
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<{ localTotal: number; dbTotal: number } | null>(null);
  
  // Create new article dialog
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [newArticle, setNewArticle] = useState({
    id: '',
    title: '',
    description: '',
    merchant: '',
    imageUrl: '',
    tags: [] as string[],
    contentType: 'promo' as 'guide' | 'promo',
    expiryDate: '',
    content: '',
    isPinned: false,
  });
  const [createTagInput, setCreateTagInput] = useState("");
  const [isCreating, setIsCreating] = useState(false);

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

        // Fetch article settings (custom covers, categories, tags, pinned)
        const settingsRes = await fetch('/api/admin/article-settings');
        if (settingsRes.ok) {
          const data = await settingsRes.json();
          const settings: Record<string, string> = {};
          const categories: Record<string, string> = {};
          const tags: Record<string, string[]> = {};
          const pinned: Record<string, boolean> = {};
          const pinnedUntil: Record<string, string> = {};
          (data.settings || []).forEach((s: ArticleSetting) => {
            if (s.cover_image_url) {
              settings[s.article_id] = s.cover_image_url;
            }
            if (s.content_type) {
              categories[s.article_id] = s.content_type;
            }
            if (s.custom_tags && s.custom_tags.length > 0) {
              tags[s.article_id] = s.custom_tags;
            }
            // 注意：is_pinned 可以是 true 或 false，都要記錄
            if (s.is_pinned !== null && s.is_pinned !== undefined) {
              pinned[s.article_id] = s.is_pinned;
            }
            // 置頂到期日
            if (s.pinned_until) {
              pinnedUntil[s.article_id] = s.pinned_until;
            }
          });
          setArticleSettings(settings);
          setArticleCategories(categories);
          setArticleTags(tags);
          setArticlePinnedUntil(pinnedUntil);
          setArticlePinned(pinned);
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

  // 獲取項目的有效分類（自訂分類 > 原始類型）
  const getEffectiveCategory = (id: string, originalType: 'guide' | 'promo'): 'guide' | 'promo' => {
    const customCategory = articleCategories[id];
    if (customCategory === 'guide' || customCategory === 'promo') {
      return customCategory;
    }
    return originalType;
  };

  // 攻略 Tab：所有 contentType === 'guide' 的文章（考慮後台覆蓋）
  const sortedGuides = useMemo(() => {
    // 篩選出有效類型為 guide 的文章
    const filtered = promos.filter(item => {
      const dbType = (item as any).contentType || 'promo';
      const effectiveType = getEffectiveCategory(item.id, dbType);
      if (effectiveType !== 'guide') return false;
      
      // 關鍵字篩選
      const kw = keyword.toLowerCase();
      return item.title.toLowerCase().includes(kw) ||
        item.description.toLowerCase().includes(kw) ||
        item.tags.some(tag => tag.toLowerCase().includes(kw));
    });
    
    // 轉換為 Guide 格式並排序
    return filtered.map(item => ({
      id: item.id,
      type: 'guide' as const,
      title: item.title,
      description: item.description,
      imageUrl: item.imageUrl || '',
      tags: item.tags,
      merchant: item.merchant,
      isNew: (item as any).isNew || false,
      _originalType: ((item as any).contentType || 'promo') as 'guide' | 'promo',
    })).sort((a, b) => {
      const viewA = viewStats[a.id] || 0;
      const viewB = viewStats[b.id] || 0;
      return viewB - viewA;
    });
  }, [keyword, promos, articleCategories, viewStats]);

  // 優惠 Tab：所有 contentType !== 'guide' 的文章（考慮後台覆蓋）
  const filteredPromos = useMemo(() => {
    // 篩選出有效類型為 promo 的文章
    const filtered = promos.filter(item => {
      const dbType = (item as any).contentType || 'promo';
      const effectiveType = getEffectiveCategory(item.id, dbType);
      if (effectiveType !== 'promo') return false;
      
      // 關鍵字篩選
      const kw = keyword.toLowerCase();
      return item.title.toLowerCase().includes(kw) ||
        item.merchant.toLowerCase().includes(kw);
    });
    
    // 添加排序信息並排序
    return filtered.map(p => ({
      ...p,
      _originalType: ((p as any).contentType || 'promo') as 'guide' | 'promo',
    })).sort((a, b) => {
      // 1. Pinned first
      const aIsPinned = articlePinned[a.id] ?? a.isPinned;
      const bIsPinned = articlePinned[b.id] ?? b.isPinned;
      if (aIsPinned && !bIsPinned) return -1;
      if (!aIsPinned && bIsPinned) return 1;
      
      // 2. Sort by sortOrder (higher first)
      const aSortOrder = a.sortOrder || 0;
      const bSortOrder = b.sortOrder || 0;
      if (aSortOrder !== bSortOrder) return bSortOrder - aSortOrder;
      
      // 3. Sort by updatedAt (newest first)
      const aUpdated = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
      const bUpdated = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
      return bUpdated - aUpdated;
    });
  }, [keyword, promos, articleCategories, articlePinned]);

  // 計算攻略和優惠的瀏覽數
  const guideIds = new Set(sortedGuides.map(g => g.id));
  const promoIds = new Set(filteredPromos.map(p => p.id));
  
  const totalGuideViews = Object.entries(viewStats)
    .filter(([id]) => guideIds.has(id))
    .reduce((sum, [, count]) => sum + count, 0);
    
  const totalPromoViews = Object.entries(viewStats)
    .filter(([id]) => promoIds.has(id))
    .reduce((sum, [, count]) => sum + count, 0);

  // Open edit dialog for guide
  const handleEditGuide = (guide: Guide) => {
    setEditingItem({ id: guide.id, title: guide.title, type: 'guide', imageUrl: guide.imageUrl });
    setNewCoverUrl(articleSettings[guide.id] || guide.imageUrl);
    setNewContentType(articleCategories[guide.id] as "guide" | "promo" || "");
    setNewTags(articleTags[guide.id] || []);
    setNewIsPinned(articlePinned[guide.id] || false);
    setNewPinnedUntil(articlePinnedUntil[guide.id] || "");
    setTagInput("");
    setEditDialogOpen(true);
  };
  
  // Open edit dialog for promo
  const handleEditPromo = (promo: typeof promos[0]) => {
    setEditingItem({ id: promo.id, title: promo.title, type: 'promo', imageUrl: promo.imageUrl });
    setNewCoverUrl(articleSettings[promo.id] || promo.imageUrl || "");
    setNewContentType(articleCategories[promo.id] as "guide" | "promo" || "");
    setNewTags(articleTags[promo.id] || []);
    // 優惠的置頂：先檢查後台設定，再檢查原始數據
    setNewIsPinned(articlePinned[promo.id] ?? promo.isPinned ?? false);
    setNewPinnedUntil(articlePinnedUntil[promo.id] || (promo as any).pinnedUntil || "");
    setTagInput("");
    setEditDialogOpen(true);
  };
  
  // Add tag
  const handleAddTag = () => {
    const tag = tagInput.trim();
    if (tag && !newTags.includes(tag)) {
      setNewTags([...newTags, tag]);
      setTagInput("");
    }
  };
  
  // Remove tag
  const handleRemoveTag = (tagToRemove: string) => {
    setNewTags(newTags.filter(t => t !== tagToRemove));
  };

  // Create new article handlers
  const handleAddCreateTag = () => {
    if (createTagInput.trim() && !newArticle.tags.includes(createTagInput.trim())) {
      setNewArticle(prev => ({
        ...prev,
        tags: [...prev.tags, createTagInput.trim()]
      }));
      setCreateTagInput("");
    }
  };
  
  const handleRemoveCreateTag = (tagToRemove: string) => {
    setNewArticle(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tagToRemove)
    }));
  };
  
  const generateArticleId = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s\u4e00-\u9fff]/g, '')
      .replace(/\s+/g, '-')
      .slice(0, 50)
      + '-' + Date.now().toString(36);
  };
  
  const handleCreateArticle = async () => {
    if (!newArticle.title.trim()) {
      toast.error('請輸入文章標題');
      return;
    }
    if (!newArticle.description.trim()) {
      toast.error('請輸入文章描述');
      return;
    }
    if (!newArticle.merchant.trim()) {
      toast.error('請輸入商戶/分類名稱');
      return;
    }
    
    setIsCreating(true);
    
    try {
      const articleId = newArticle.id || generateArticleId(newArticle.title);
      
      const payload = {
        id: articleId,
        title: newArticle.title,
        description: newArticle.description,
        merchant: newArticle.merchant,
        image_url: newArticle.imageUrl || null,
        tags: newArticle.tags,
        content_type: newArticle.contentType,
        expiry_date: newArticle.expiryDate || (newArticle.contentType === 'guide' ? '長期有效' : null),
        content: newArticle.content || null,
        is_pinned: newArticle.isPinned,
        is_new: true,
        updated_at: new Date().toISOString(),
      };
      
      const res = await fetch('/api/admin/promos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to create article');
      }
      
      toast.success('文章已創建！');
      setCreateDialogOpen(false);
      
      // Reset form
      setNewArticle({
        id: '',
        title: '',
        description: '',
        merchant: '',
        imageUrl: '',
        tags: [],
        contentType: 'promo',
        expiryDate: '',
        content: '',
        isPinned: false,
      });
      
      // Refresh data
      window.location.reload();
    } catch (err: any) {
      toast.error(`創建失敗：${err.message}`);
    } finally {
      setIsCreating(false);
    }
  };

  // Save article settings
  const handleSaveSettings = async () => {
    if (!editingItem) {
      toast.error('無法儲存：請重新打開設定對話框');
      return;
    }
    
    setIsSaving(true);
    toast.info('正在儲存設定...');
    
    try {
      const payload = {
        articleId: editingItem.id,
        coverImageUrl: newCoverUrl || null,
        contentType: newContentType || null,
        customTags: newTags.length > 0 ? newTags : null,
        isPinned: newIsPinned,
        pinnedUntil: newIsPinned && newPinnedUntil ? newPinnedUntil : null, // 只有置頂時才設定到期日
      };
      
      const res = await fetch('/api/admin/article-settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      
      // 檢查 HTTP 錯誤
      if (!res.ok) {
        console.error('API error:', data);
        if (data.sqlRequired) {
          toast.error('請先在 Supabase SQL Editor 執行所需的 SQL：\n' + (data.error || ''));
        } else {
          toast.error('儲存失敗：' + (data.error || '未知錯誤'));
        }
        return;
      }
      
      if (data.sqlRequired) {
        toast.error('請先在 Supabase SQL Editor 執行 sql/article_settings.sql');
        return;
      }

      if (!res.ok) {
        throw new Error(data.error || 'Failed to save');
      }

      // Update local state - cover
      if (newCoverUrl) {
        setArticleSettings(prev => ({ ...prev, [editingItem.id]: newCoverUrl }));
      } else {
        setArticleSettings(prev => {
          const newSettings = { ...prev };
          delete newSettings[editingItem.id];
          return newSettings;
        });
      }
      
      // Update local state - category
      if (newContentType) {
        setArticleCategories(prev => ({ ...prev, [editingItem.id]: newContentType }));
      } else {
        setArticleCategories(prev => {
          const newCategories = { ...prev };
          delete newCategories[editingItem.id];
          return newCategories;
        });
      }
      
      // Update local state - tags
      if (newTags.length > 0) {
        setArticleTags(prev => ({ ...prev, [editingItem.id]: newTags }));
      } else {
        setArticleTags(prev => {
          const newTagsState = { ...prev };
          delete newTagsState[editingItem.id];
          return newTagsState;
        });
      }
      
      // Update local state - pinned (注意：false 也要記錄)
      setArticlePinned(prev => ({ ...prev, [editingItem.id]: newIsPinned }));

      toast.success('設定已更新');
      setEditDialogOpen(false);
    } catch (error: any) {
      toast.error('更新失敗：' + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  // Reset to default cover
  const handleResetCover = async () => {
    if (!editingItem) return;
    
    // Just clear the cover URL in the form, actual save happens on "Save"
    setNewCoverUrl(editingItem.imageUrl || "");
    toast.success('已恢復預設封面（記得按儲存）');
  };

  // Upload cover image
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('圖片大小不能超過 5MB');
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('bucket', 'images');
      formData.append('folder', 'articles');

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || '上傳失敗');
      }

      setNewCoverUrl(data.url);
      toast.success('圖片上傳成功');
    } catch (error: any) {
      toast.error('上傳失敗：' + error.message);
    } finally {
      setIsUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
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
          <Button 
            variant="outline" 
            className="gap-2"
            onClick={async () => {
              setIsSyncing(true);
              try {
                // 先檢查同步狀態
                const statusRes = await fetch('/api/admin/sync-local-data');
                const status = await statusRes.json();
                setSyncStatus({ localTotal: status.localTotal, dbTotal: status.dbTotal });
                
                if (status.needsSync) {
                  // 執行同步
                  const syncRes = await fetch('/api/admin/sync-local-data', { method: 'POST' });
                  const result = await syncRes.json();
                  if (result.success) {
                    toast.success(`同步完成！已同步 ${result.results.promos.success} 篇優惠 + ${result.results.guides.success} 篇攻略`);
                    // 重新載入頁面以獲取最新資料
                    window.location.reload();
                  } else {
                    toast.error(`同步失敗：${result.error}`);
                  }
                } else {
                  toast.info('資料庫已是最新，無需同步');
                }
              } catch (e) {
                toast.error('同步時發生錯誤');
              } finally {
                setIsSyncing(false);
              }
            }}
            disabled={isSyncing}
          >
            {isSyncing ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RotateCcw className="h-4 w-4" />
            )}
            同步本地資料
          </Button>
          <Link href="/discover" target="_blank">
            <Button variant="outline" className="gap-2">
              <ExternalLink className="h-4 w-4" />
              前往探索頁
            </Button>
          </Link>
          <Link href="/admin/discover/new">
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
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{sortedGuides.length}</p>
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
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{filteredPromos.length}</p>
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
              <TrendingUp className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalPromoViews.toLocaleString()}</p>
              <p className="text-sm text-gray-500">優惠總瀏覽</p>
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
              攻略文章 ({sortedGuides.length})
            </TabsTrigger>
            <TabsTrigger value="promos" className="gap-2">
              <Gift className="h-4 w-4" />
              優惠活動 ({filteredPromos.length})
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
                {sortedGuides.map((item, index) => {
                  const views = viewStats[item.id] || 0;
                  const isTop3 = index < 3 && views > 0;
                  const hasCustomCover = !!articleSettings[item.id];
                  const coverImage = articleSettings[item.id] || item.imageUrl;
                  const isFromPromo = item._originalType === 'promo';
                  
                  return (
                    <tr key={item.id} className={`hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${isFromPromo ? 'bg-purple-50/30 dark:bg-purple-900/10' : ''}`}>
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
                            onClick={() => {
                              setEditingItem({ id: item.id, title: item.title, type: 'guide', imageUrl: item.imageUrl });
                              setNewCoverUrl(articleSettings[item.id] || item.imageUrl || '');
                              setNewContentType(articleCategories[item.id] as "guide" | "promo" || "");
                              setNewTags(articleTags[item.id] || []);
                              setNewIsPinned(articlePinned[item.id] || false);
                              setNewPinnedUntil(articlePinnedUntil[item.id] || "");
                              setTagInput("");
                              setEditDialogOpen(true);
                            }}
                            className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded"
                          >
                            <Pencil className="h-4 w-4 text-white" />
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Link href={`/discover/${item.id}`} target="_blank" className="block group">
                          <p className="font-medium text-gray-900 dark:text-white line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {item.title}
                            <ExternalLink className="inline-block w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </p>
                        </Link>
                        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">{item.description}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-1 flex-wrap">
                          {item.tags.slice(0, 3).map(tag => (
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
                        <div className="flex items-center gap-1 flex-wrap">
                          {isFromPromo && (
                            <span className="px-2 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs font-medium">
                              原：優惠
                            </span>
                          )}
                          {articlePinned[item.id] && (
                            <span className="px-2 py-0.5 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-full text-xs font-medium flex items-center gap-0.5">
                              <Pin className="h-3 w-3" />
                              置頂
                            </span>
                          )}
                          {item.isNew && (
                            <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium">
                              NEW
                            </span>
                          )}
                          {hasCustomCover && (
                            <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-xs font-medium">
                              自訂封面
                            </span>
                          )}
                          {articleTags[item.id] && (
                            <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-xs font-medium">
                              +{articleTags[item.id].length} 標籤
                            </span>
                          )}
                          {!isFromPromo && !articlePinned[item.id] && !item.isNew && !hasCustomCover && !articleTags[item.id] && (
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
                            onClick={() => {
                              setEditingItem({ id: item.id, title: item.title, type: 'guide', imageUrl: item.imageUrl });
                              setNewCoverUrl(articleSettings[item.id] || item.imageUrl || '');
                              setNewContentType(articleCategories[item.id] as "guide" | "promo" || "");
                              setNewTags(articleTags[item.id] || []);
                              setNewIsPinned(articlePinned[item.id] || false);
                              setNewPinnedUntil(articlePinnedUntil[item.id] || "");
                              setTagInput("");
                              setEditDialogOpen(true);
                            }}
                          >
                            <Settings className="h-3 w-3" />
                            設定
                          </Button>
                          <Link href={`/discover/${item.id}`} target="_blank">
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
                  <th className="px-6 py-4 font-medium">封面</th>
                  <th className="px-6 py-4 font-medium">標題</th>
                  <th className="px-6 py-4 font-medium">標籤</th>
                  <th className="px-6 py-4 font-medium">
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      瀏覽
                    </div>
                  </th>
                  <th className="px-6 py-4 font-medium">
                    <div className="flex items-center gap-1">
                      <CalendarIcon className="h-4 w-4" />
                      到期日
                    </div>
                  </th>
                  <th className="px-6 py-4 font-medium">狀態</th>
                  <th className="px-6 py-4 font-medium">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y dark:divide-gray-700">
                {filteredPromos.map((item, index) => {
                  const isFromGuide = item._originalType === 'guide';
                  const isPinned = articlePinned[item.id] ?? ('isPinned' in item && item.isPinned);
                  
                  return (
                    <tr key={item.id} className={`hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${isPinned ? 'bg-amber-50/50 dark:bg-amber-900/10' : ''} ${isFromGuide ? 'bg-emerald-50/30 dark:bg-emerald-900/10' : ''}`}>
                      <td className="px-6 py-4">
                        <div className="relative group">
                          {item.imageUrl ? (
                            <div className="w-20 h-12 rounded overflow-hidden bg-gray-100">
                              <img src={item.imageUrl} alt="" className="w-full h-full object-cover" />
                            </div>
                          ) : (
                            <div className="w-20 h-12 rounded bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-400">
                              <ImageIcon className="h-4 w-4" />
                            </div>
                          )}
                          <button
                            onClick={() => {
                              setEditingItem({ id: item.id, title: item.title, type: 'promo', imageUrl: item.imageUrl });
                              setNewCoverUrl(articleSettings[item.id] || item.imageUrl || '');
                              setNewContentType(articleCategories[item.id] as "guide" | "promo" || "promo");
                              setNewTags(articleTags[item.id] || []);
                              setNewIsPinned(articlePinned[item.id] ?? isPinned ?? false);
                              setNewPinnedUntil(articlePinnedUntil[item.id] || (item as any).pinnedUntil || "");
                              setTagInput("");
                              setEditDialogOpen(true);
                            }}
                            className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded"
                          >
                            <Pencil className="h-4 w-4 text-white" />
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Link href={`/discover/${item.id}`} target="_blank" className="block group">
                          <p className="font-medium text-gray-900 dark:text-white line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {item.title}
                            <ExternalLink className="inline-block w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </p>
                        </Link>
                        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">{item.description}</p>
                        <p className="text-xs text-purple-600 dark:text-purple-400 mt-0.5">{item.merchant}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {('tags' in item && item.tags) && item.tags.slice(0, 3).map((tag, tagIdx) => (
                            <span key={tagIdx} className="px-2 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 rounded-full text-xs">
                              {tag}
                            </span>
                          ))}
                          {('tags' in item && item.tags) && item.tags.length > 3 && (
                            <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-500 rounded-full text-xs">
                              +{item.tags.length - 3}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {(() => {
                          const views = viewStats[item.id] || 0;
                          const isTop3 = index < 3 && views > 0;
                          return (
                            <div className="flex items-center gap-2">
                              {isTop3 && <TrendingUp className="h-4 w-4 text-green-500" />}
                              <span className={`font-medium ${isTop3 ? 'text-green-600 dark:text-green-400' : views > 0 ? 'text-gray-600 dark:text-gray-300' : 'text-gray-400'}`}>
                                {views > 0 ? views.toLocaleString() : '-'}
                              </span>
                            </div>
                          );
                        })()}
                      </td>
                      <td className="px-6 py-4 text-gray-500 dark:text-gray-300 text-sm">
                        {item.expiryDate || '-'}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1 flex-wrap">
                          {isFromGuide && (
                            <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full text-xs font-medium">
                              原：攻略
                            </span>
                          )}
                          {isPinned && (
                            <span className="px-2 py-0.5 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-full text-xs font-medium flex items-center gap-0.5">
                              <Pin className="h-3 w-3" />
                              置頂
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <Link href={`/admin/discover/${item.id}`}>
                            <Button variant="ghost" size="sm" className="gap-1">
                              <Edit className="h-3 w-3" />
                              編輯
                            </Button>
                          </Link>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="gap-1"
                            onClick={() => {
                              setEditingItem({ id: item.id, title: item.title, type: 'promo', imageUrl: item.imageUrl });
                              setNewCoverUrl(articleSettings[item.id] || item.imageUrl || '');
                              setNewContentType(articleCategories[item.id] as "guide" | "promo" || "");
                              setNewTags(articleTags[item.id] || []);
                              setNewIsPinned(articlePinned[item.id] ?? isPinned ?? false);
                              setNewPinnedUntil(articlePinnedUntil[item.id] || (item as any).pinnedUntil || "");
                              setTagInput("");
                              setEditDialogOpen(true);
                            }}
                          >
                            <Settings className="h-3 w-3" />
                            設定
                          </Button>
                          <Link href={`/discover/${item.id}`} target="_blank">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <ExternalLink className="h-3 w-3" />
                            </Button>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            
            {/* Info Box */}
            <div className="p-4 bg-gray-50 dark:bg-gray-900/50 border-t dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                💡 點擊「編輯」可修改優惠內容（包括插入圖片）。修改後會儲存到資料庫，覆蓋 <code className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">promos.ts</code> 的靜態資料。
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Edit Article Settings Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              編輯設定
            </DialogTitle>
            <DialogDescription className="line-clamp-2">
              {editingItem?.title}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {/* 置頂設定 */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">置頂狀態</Label>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={newIsPinned ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    console.log('Setting pinned to TRUE');
                    setNewIsPinned(true);
                  }}
                  className={`gap-1 ${newIsPinned ? 'bg-amber-500 hover:bg-amber-600 text-white' : ''}`}
                >
                  <Pin className="h-3 w-3" />
                  置頂
                </Button>
                <Button
                  type="button"
                  variant={!newIsPinned ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    console.log('Setting pinned to FALSE');
                    setNewIsPinned(false);
                  }}
                  className={`gap-1 ${!newIsPinned ? 'bg-gray-600 hover:bg-gray-700 text-white' : ''}`}
                >
                  <PinOff className="h-3 w-3" />
                  不置頂
                </Button>
              </div>
              <p className="text-xs text-gray-500">
                當前狀態：<span className={newIsPinned ? 'text-amber-600 font-bold' : 'text-gray-600 font-bold'}>{newIsPinned ? '✓ 已置頂' : '✗ 未置頂'}</span>
              </p>
              
              {/* 置頂到期日期 - 只有置頂時才顯示 */}
              {newIsPinned && (
                <div className="mt-3 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-700">
                  <Label className="text-sm font-medium text-amber-700 dark:text-amber-300">置頂到期日期</Label>
                  <Input
                    type="date"
                    value={newPinnedUntil}
                    onChange={(e) => setNewPinnedUntil(e.target.value)}
                    className="mt-2"
                    min={new Date().toISOString().split('T')[0]}
                  />
                  <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">
                    {newPinnedUntil 
                      ? `置頂至 ${new Date(newPinnedUntil).toLocaleDateString('zh-HK')} 結束`
                      : '留空 = 永久置頂（直到手動取消）'}
                  </p>
                </div>
              )}
            </div>
            
            {/* 分類設定 */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">分類</Label>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={newContentType === "" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setNewContentType("")}
                  className="gap-1"
                >
                  預設
                </Button>
                <Button
                  type="button"
                  variant={newContentType === "guide" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setNewContentType("guide")}
                  className="gap-1"
                >
                  <BookOpen className="h-3 w-3" />
                  攻略
                </Button>
                <Button
                  type="button"
                  variant={newContentType === "promo" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setNewContentType("promo")}
                  className="gap-1"
                >
                  <Gift className="h-3 w-3" />
                  優惠
                </Button>
              </div>
              <p className="text-xs text-gray-500">
                設定此文章顯示在「優惠」或「攻略」分類中
              </p>
            </div>
            
            {/* 標籤設定 */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">自訂標籤</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="輸入標籤後按 Enter 或點擊新增"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                  className="flex-1"
                />
                <Button type="button" variant="outline" onClick={handleAddTag} disabled={!tagInput.trim()}>
                  新增
                </Button>
              </div>
              {newTags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {newTags.map(tag => (
                    <span 
                      key={tag} 
                      className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="hover:text-red-500 transition-colors"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
              <p className="text-xs text-gray-500">
                自訂標籤會覆蓋預設標籤，用於前台篩選
              </p>
            </div>

            {/* 分隔線 */}
            <div className="border-t dark:border-gray-700" />
            
            {/* 封面圖片 */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">封面圖片</Label>
              {newCoverUrl ? (
                <div className="w-full h-32 rounded-lg overflow-hidden bg-gray-100">
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
                <div className="w-full h-32 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-400">
                  <div className="text-center">
                    <ImageIcon className="h-6 w-6 mx-auto mb-1" />
                    <p className="text-xs">無封面圖片</p>
                  </div>
                </div>
              )}
              
              <div className="flex gap-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*"
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="gap-1"
                >
                  {isUploading ? <Loader2 className="h-3 w-3 animate-spin" /> : <Upload className="h-3 w-3" />}
                  上傳
                </Button>
                {editingItem && articleSettings[editingItem.id] && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleResetCover}
                    disabled={isSaving}
                    className="gap-1"
                  >
                    <RotateCcw className="h-3 w-3" />
                    恢復預設
                  </Button>
                )}
              </div>
              
              <Input
                placeholder="或輸入圖片網址 https://..."
                value={newCoverUrl}
                onChange={(e) => setNewCoverUrl(e.target.value)}
                className="text-sm"
              />
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setEditDialogOpen(false)}
              disabled={isSaving}
            >
              取消
            </Button>
            <Button 
              type="button" 
              onClick={handleSaveSettings} 
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  儲存中...
                </>
              ) : (
                '儲存設定'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
