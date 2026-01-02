"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save, Loader2, Image as ImageIcon, ExternalLink, Eye } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { PROMOS } from "@/lib/data/promos";
import { HK_CARDS } from "@/lib/data/cards";
import { use } from "react";

interface PromoFormData {
  id: string;
  title: string;
  merchant: string;
  description: string;
  content: string;
  imageUrl: string;
  expiryDate: string;
  relatedCardIds: string[];
  tags: string[];
  url: string;
  updatedAt: string;
  isPinned: boolean;
}

export default function AdminDiscoverEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const isNew = id === "new";
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<PromoFormData>({
    id: "",
    title: "",
    merchant: "",
    description: "",
    content: "",
    imageUrl: "",
    expiryDate: "",
    relatedCardIds: [],
    tags: [],
    url: "",
    updatedAt: new Date().toISOString().split('T')[0],
    isPinned: false,
  });
  
  const [tagsInput, setTagsInput] = useState("");
  const [cardIdsInput, setCardIdsInput] = useState("");
  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    const loadPromo = async () => {
      if (isNew) {
        setLoading(false);
        return;
      }
      
      // First try to load from database
      try {
        const res = await fetch("/api/admin/promos");
        const { promos } = await res.json();
        const dbPromo = promos?.find((p: any) => p.id === id);
        
        if (dbPromo) {
          setFormData({
            id: dbPromo.id || "",
            title: dbPromo.title || "",
            merchant: dbPromo.merchant || "",
            description: dbPromo.description || "",
            content: dbPromo.content || "",
            imageUrl: dbPromo.image_url || dbPromo.imageUrl || "",
            expiryDate: dbPromo.expiry_date || dbPromo.expiryDate || "",
            relatedCardIds: dbPromo.related_card_ids || dbPromo.relatedCardIds || [],
            tags: dbPromo.tags || [],
            url: dbPromo.url || "",
            updatedAt: dbPromo.updated_at || dbPromo.updatedAt || "",
            isPinned: dbPromo.is_pinned || dbPromo.isPinned || false,
          });
          setTagsInput((dbPromo.tags || []).join(", "));
          setCardIdsInput((dbPromo.related_card_ids || dbPromo.relatedCardIds || []).join(", "));
          setLoading(false);
          return;
        }
      } catch (e) {
        console.warn("Failed to fetch from DB, trying static data...", e);
      }
      
      // Fallback to static data
      const staticPromo = PROMOS.find(p => p.id === id);
      if (staticPromo) {
        setFormData({
          id: staticPromo.id,
          title: staticPromo.title,
          merchant: staticPromo.merchant,
          description: staticPromo.description,
          content: staticPromo.content || "",
          imageUrl: staticPromo.imageUrl || "",
          expiryDate: staticPromo.expiryDate,
          relatedCardIds: staticPromo.relatedCardIds || [],
          tags: staticPromo.tags || [],
          url: staticPromo.url || "",
          updatedAt: staticPromo.updatedAt || "",
          isPinned: staticPromo.isPinned || false,
        });
        setTagsInput((staticPromo.tags || []).join(", "));
        setCardIdsInput((staticPromo.relatedCardIds || []).join(", "));
      }
      
      setLoading(false);
    };
    
    loadPromo();
  }, [id, isNew]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.id) {
      toast.error("請輸入優惠 ID");
      return;
    }
    
    setSaving(true);
    
    try {
      // Parse tags and card IDs from comma-separated strings
      const tags = tagsInput.split(",").map(t => t.trim()).filter(Boolean);
      const relatedCardIds = cardIdsInput.split(",").map(t => t.trim()).filter(Boolean);
      
      const payload = {
        id: formData.id,
        title: formData.title,
        merchant: formData.merchant,
        description: formData.description,
        content: formData.content,
        image_url: formData.imageUrl,
        expiry_date: formData.expiryDate,
        related_card_ids: relatedCardIds,
        tags,
        url: formData.url,
        updated_at: new Date().toISOString(),
        is_pinned: formData.isPinned,
      };
      
      const res = await fetch("/api/admin/promos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      
      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error || "儲存失敗");
      }
      
      toast.success(isNew ? "優惠已建立！" : "優惠已更新！");
      router.push("/admin/discover");
    } catch (error: any) {
      toast.error(error.message || "儲存失敗");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <Link href="/admin/discover">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" /> 返回列表
          </Button>
        </Link>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setPreviewMode(!previewMode)}
            className="gap-2"
          >
            <Eye className="h-4 w-4" />
            {previewMode ? "編輯" : "預覽"}
          </Button>
          {formData.id && !isNew && (
            <Link href={`/discover/${formData.id}`} target="_blank">
              <Button variant="outline" className="gap-2">
                <ExternalLink className="h-4 w-4" /> 查看頁面
              </Button>
            </Link>
          )}
        </div>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        {isNew ? "新增優惠" : "編輯優惠"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle>基本資料</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="id">優惠 ID *</Label>
                <Input
                  id="id"
                  value={formData.id}
                  onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                  placeholder="例如: hsbc-red-mcdonalds-2026"
                  disabled={!isNew}
                  className="dark:bg-gray-900 dark:border-gray-600"
                />
                <p className="text-xs text-gray-500">用於 URL，建議用英文和連字號</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="merchant">商戶/銀行 *</Label>
                <Input
                  id="merchant"
                  value={formData.merchant}
                  onChange={(e) => setFormData({ ...formData, merchant: e.target.value })}
                  placeholder="例如: 麥當勞"
                  className="dark:bg-gray-900 dark:border-gray-600"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="title">標題 *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="例如: 🍔 滙豐 Red 卡 x 麥當勞印花獎賞 2026"
                className="dark:bg-gray-900 dark:border-gray-600"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">簡短描述</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="顯示在列表卡片上的簡短描述..."
                rows={2}
                className="dark:bg-gray-900 dark:border-gray-600"
              />
            </div>
          </CardContent>
        </Card>

        {/* Content */}
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>內容（Markdown）</span>
              <a
                href="https://www.markdownguide.org/basic-syntax/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-500 hover:underline font-normal"
              >
                Markdown 語法參考
              </a>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {previewMode ? (
              <div className="prose dark:prose-invert max-w-none p-4 bg-gray-50 dark:bg-gray-900 rounded-lg min-h-[300px]">
                <div dangerouslySetInnerHTML={{ __html: formData.content.replace(/\n/g, '<br/>') }} />
              </div>
            ) : (
              <>
                <Textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder={`## 📅 推廣期

**2026年1月2日 至 2026年12月31日**

---

## 🎫 優惠詳情

| 項目 | 詳情 |
|:---|:---|
| 最低消費 | 單一簽賬滿 **$30** |

---

## 💡 識玩攻略

1. 用麥當勞 App 落單
2. 每日食一餐

---

## ❓ 常見問題

**Q: 附屬卡可唔可以參加？**
A: 唔可以，只限主卡。`}
                  rows={20}
                  className="font-mono text-sm dark:bg-gray-900 dark:border-gray-600"
                />
                
                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                  <h4 className="font-medium text-amber-800 dark:text-amber-300 flex items-center gap-2">
                    <ImageIcon className="h-4 w-4" /> 插入圖片
                  </h4>
                  <p className="text-sm text-amber-700 dark:text-amber-400 mt-1">
                    使用 Markdown 語法插入圖片：
                  </p>
                  <code className="block bg-amber-100 dark:bg-amber-900/40 p-2 rounded mt-2 text-xs">
                    ![圖片描述](https://圖片URL)
                  </code>
                  <p className="text-xs text-amber-600 dark:text-amber-500 mt-2">
                    💡 圖片可以上傳到 Supabase Storage 或使用外部連結（如 Unsplash）
                  </p>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Media & Links */}
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle>媒體及連結</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="imageUrl">封面圖片 URL</Label>
              <Input
                id="imageUrl"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                placeholder="https://..."
                className="dark:bg-gray-900 dark:border-gray-600"
              />
              {formData.imageUrl && (
                <div className="mt-2">
                  <img
                    src={formData.imageUrl}
                    alt="Preview"
                    className="h-32 object-cover rounded-lg"
                    onError={(e) => (e.currentTarget.style.display = 'none')}
                  />
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="url">官方連結</Label>
              <Input
                id="url"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                placeholder="https://www.hsbc.com.hk/..."
                className="dark:bg-gray-900 dark:border-gray-600"
              />
            </div>
          </CardContent>
        </Card>

        {/* Metadata */}
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle>分類及設定</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiryDate">到期日</Label>
                <Input
                  id="expiryDate"
                  type="date"
                  value={formData.expiryDate}
                  onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                  className="dark:bg-gray-900 dark:border-gray-600"
                />
              </div>
              
              <div className="space-y-2 flex items-end gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isPinned}
                    onChange={(e) => setFormData({ ...formData, isPinned: e.target.checked })}
                    className="w-4 h-4 rounded"
                  />
                  <span>置頂顯示</span>
                </label>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="tags">標籤（逗號分隔）</Label>
              <Input
                id="tags"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="滙豐, 麥當勞, 印花獎賞, 需登記"
                className="dark:bg-gray-900 dark:border-gray-600"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cardIds">相關信用卡 ID（逗號分隔）</Label>
              <Input
                id="cardIds"
                value={cardIdsInput}
                onChange={(e) => setCardIdsInput(e.target.value)}
                placeholder="hsbc-red, hsbc-everymile"
                className="dark:bg-gray-900 dark:border-gray-600"
              />
              <p className="text-xs text-gray-500">
                可用卡 ID：{HK_CARDS.slice(0, 10).map(c => c.id).join(", ")}...
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Submit */}
        <div className="flex gap-4">
          <Button type="submit" disabled={saving} className="gap-2">
            {saving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            {saving ? "儲存中..." : "儲存"}
          </Button>
          
          <Link href="/admin/discover">
            <Button type="button" variant="outline">
              取消
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}

