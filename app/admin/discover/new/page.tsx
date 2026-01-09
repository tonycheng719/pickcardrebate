"use client";

import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  ArrowLeft, BookOpen, Gift, Save, Loader2, Upload, X, Eye,
  Image as ImageIcon, Calendar, Tag, Link as LinkIcon
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function NewArticlePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [tagInput, setTagInput] = useState("");
  
  const [article, setArticle] = useState({
    id: '',
    title: '',
    description: '',
    merchant: '',
    imageUrl: '',
    tags: [] as string[],
    contentType: 'promo' as 'guide' | 'promo',
    expiryDate: '',
    url: '',
    content: '',
    isPinned: false,
  });

  const generateId = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s\u4e00-\u9fff-]/g, '')
      .replace(/\s+/g, '-')
      .slice(0, 50)
      + '-' + Date.now().toString(36);
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !article.tags.includes(tagInput.trim())) {
      setArticle(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setArticle(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tagToRemove)
    }));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', 'promo-cover');

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Upload failed');

      const data = await res.json();
      setArticle(prev => ({ ...prev, imageUrl: data.url }));
      toast.success('圖片已上傳');
    } catch (err) {
      toast.error('上傳失敗');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async () => {
    if (!article.title.trim()) {
      toast.error('請輸入文章標題');
      return;
    }
    if (!article.description.trim()) {
      toast.error('請輸入文章描述');
      return;
    }
    if (!article.merchant.trim()) {
      toast.error('請輸入商戶/分類名稱');
      return;
    }

    setIsSaving(true);

    try {
      const articleId = article.id || generateId(article.title);
      
      const payload = {
        id: articleId,
        title: article.title,
        description: article.description,
        merchant: article.merchant,
        image_url: article.imageUrl || null,
        tags: article.tags,
        content_type: article.contentType,
        expiry_date: article.expiryDate || (article.contentType === 'guide' ? '長期有效' : null),
        url: article.url || null,
        content: article.content || null,
        is_pinned: article.isPinned,
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
        throw new Error(data.error || 'Failed to save');
      }

      toast.success('文章已創建！');
      router.push('/admin/discover');
    } catch (err: any) {
      toast.error(`儲存失敗：${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin/discover">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                新增文章
              </h1>
              <p className="text-gray-500 text-sm">
                創建新的攻略或優惠文章
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Link href={`/discover/${article.id || 'preview'}`} target="_blank">
              <Button variant="outline" className="gap-2" disabled={!article.id}>
                <Eye className="h-4 w-4" />
                預覽
              </Button>
            </Link>
            <Button onClick={handleSave} disabled={isSaving} className="gap-2">
              {isSaving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              儲存文章
            </Button>
          </div>
        </div>

        {/* Main Form */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">基本資訊</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>文章 ID（可選，留空自動生成）</Label>
                  <Input
                    placeholder="例如：hsbc-dining-2026"
                    value={article.id}
                    onChange={(e) => setArticle(prev => ({ ...prev, id: e.target.value }))}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    用於網址：/discover/{article.id || '(自動生成)'}
                  </p>
                </div>

                <div>
                  <Label>標題 *</Label>
                  <Input
                    placeholder="例如：滙豐餐飲優惠｜高達 6% 回贈"
                    value={article.title}
                    onChange={(e) => setArticle(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>

                <div>
                  <Label>描述 *</Label>
                  <Textarea
                    placeholder="簡短描述文章內容..."
                    value={article.description}
                    onChange={(e) => setArticle(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                  />
                </div>

                <div>
                  <Label>商戶/分類名稱 *</Label>
                  <Input
                    placeholder="例如：滙豐、餐飲、攻略"
                    value={article.merchant}
                    onChange={(e) => setArticle(prev => ({ ...prev, merchant: e.target.value }))}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Content */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">文章內容（Markdown）</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder={`## 標題

內容...

### 優惠詳情

| 項目 | 詳情 |
|:---|:---|
| 回贈率 | 6% |
| 上限 | $200/月 |

---

### 注意事項

- ⚠️ 需要登記
- ⚠️ 名額有限`}
                  value={article.content}
                  onChange={(e) => setArticle(prev => ({ ...prev, content: e.target.value }))}
                  rows={20}
                  className="font-mono text-sm"
                />
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Settings */}
          <div className="space-y-6">
            {/* Type */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">文章類型</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant={article.contentType === "promo" ? "default" : "outline"}
                    onClick={() => setArticle(prev => ({ ...prev, contentType: 'promo' }))}
                    className="flex-1 gap-2"
                  >
                    <Gift className="h-4 w-4" />
                    優惠
                  </Button>
                  <Button
                    type="button"
                    variant={article.contentType === "guide" ? "default" : "outline"}
                    onClick={() => setArticle(prev => ({ ...prev, contentType: 'guide' }))}
                    className="flex-1 gap-2"
                  >
                    <BookOpen className="h-4 w-4" />
                    攻略
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Cover Image */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <ImageIcon className="h-4 w-4" />
                  封面圖片
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {article.imageUrl ? (
                  <div className="relative">
                    <img
                      src={article.imageUrl}
                      alt="Cover"
                      className="w-full h-40 object-cover rounded-lg"
                    />
                    <Button
                      size="icon"
                      variant="destructive"
                      className="absolute top-2 right-2 h-8 w-8"
                      onClick={() => setArticle(prev => ({ ...prev, imageUrl: '' }))}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="w-full h-40 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-400">
                      <ImageIcon className="h-8 w-8 mx-auto mb-2" />
                      <p className="text-sm">無封面圖片</p>
                    </div>
                  </div>
                )}
                
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
                  className="w-full gap-2"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Upload className="h-4 w-4" />
                  )}
                  上傳圖片
                </Button>
                
                <Input
                  placeholder="或輸入圖片網址..."
                  value={article.imageUrl}
                  onChange={(e) => setArticle(prev => ({ ...prev, imageUrl: e.target.value }))}
                />
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  標籤
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="輸入標籤..."
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTag();
                      }
                    }}
                  />
                  <Button type="button" onClick={handleAddTag} disabled={!tagInput.trim()}>
                    新增
                  </Button>
                </div>
                
                {article.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map(tag => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="hover:text-red-500"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Expiry & URL */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  其他設定
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>到期日期</Label>
                  <Input
                    type="date"
                    value={article.expiryDate}
                    onChange={(e) => setArticle(prev => ({ ...prev, expiryDate: e.target.value }))}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    攻略類型可留空（顯示「長期有效」）
                  </p>
                </div>

                <div>
                  <Label className="flex items-center gap-1">
                    <LinkIcon className="h-3 w-3" />
                    官方連結
                  </Label>
                  <Input
                    placeholder="https://..."
                    value={article.url}
                    onChange={(e) => setArticle(prev => ({ ...prev, url: e.target.value }))}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isPinned"
                    checked={article.isPinned}
                    onChange={(e) => setArticle(prev => ({ ...prev, isPinned: e.target.checked }))}
                    className="rounded"
                  />
                  <Label htmlFor="isPinned" className="cursor-pointer">
                    置頂顯示
                  </Label>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

