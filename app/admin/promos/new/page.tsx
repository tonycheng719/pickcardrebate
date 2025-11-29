"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAdminDataStore } from "@/lib/admin/data-store";
import type { Promo, PromoFAQ } from "@/lib/types";
import { CalendarIcon, Image as ImageIcon, Plus, Trash2, HelpCircle, Search } from "lucide-react";

type NewPromoForm = {
  title: string;
  merchant: string;
  description: string;
  content: string;
  expiryDate: string;
  tags: string;
  url: string;
  imageUrl: string;
  seoTitle: string;
  seoDescription: string;
  faqs: PromoFAQ[];
};

const DEFAULT_FORM: NewPromoForm = {
  title: "",
  merchant: "",
  description: "",
  content: "",
  expiryDate: "",
  tags: "",
  url: "",
  imageUrl: "",
  seoTitle: "",
  seoDescription: "",
  faqs: [],
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "") || crypto.randomUUID();

export default function AdminNewPromoPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editingId = searchParams.get("id");
  const { promos, addOrUpdatePromo } = useAdminDataStore();
  const [form, setForm] = useState<NewPromoForm>(DEFAULT_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const editingPromo = useMemo(() => promos.find((p) => p.id === editingId), [promos, editingId]);

  useEffect(() => {
    if (!editingPromo) return;
    setForm({
      title: editingPromo.title,
      merchant: editingPromo.merchant,
      description: editingPromo.description,
      content: editingPromo.content || "",
      expiryDate: editingPromo.expiryDate,
      tags: editingPromo.tags.join(", "),
      url: editingPromo.url || "",
      imageUrl: editingPromo.imageUrl || "",
      seoTitle: editingPromo.seoTitle || "",
      seoDescription: editingPromo.seoDescription || "",
      faqs: editingPromo.faqs || [],
    });
  }, [editingPromo]);

  const handleChange = (field: keyof NewPromoForm, value: string | PromoFAQ[]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const addFAQ = () => {
    setForm((prev) => ({
      ...prev,
      faqs: [...prev.faqs, { question: "", answer: "" }],
    }));
  };

  const updateFAQ = (index: number, field: "question" | "answer", value: string) => {
    setForm((prev) => {
      const newFaqs = [...prev.faqs];
      newFaqs[index] = { ...newFaqs[index], [field]: value };
      return { ...prev, faqs: newFaqs };
    });
  };

  const removeFAQ = (index: number) => {
    setForm((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    const tags = form.tags.split(",").map((tag) => tag.trim()).filter(Boolean);
    const validFaqs = form.faqs.filter((faq) => faq.question.trim() && faq.answer.trim());

    const nextPromo: Promo = {
      id: editingPromo?.id || slugify(form.title),
      title: form.title,
      merchant: form.merchant,
      description: form.description,
      content: form.content,
      expiryDate: form.expiryDate,
      relatedCardIds: editingPromo?.relatedCardIds || [],
      tags,
      url: form.url,
      imageUrl: form.imageUrl,
      seoTitle: form.seoTitle || undefined,
      seoDescription: form.seoDescription || undefined,
      faqs: validFaqs.length > 0 ? validFaqs : undefined,
    };

    addOrUpdatePromo(nextPromo);
    setIsSubmitting(false);
    router.push("/admin/promos");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <button className="text-sm text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200" onClick={() => router.back()}>
            ← 返回優惠列表
          </button>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
            {editingId ? "編輯優惠" : "發佈新優惠"}
          </h1>
          <p className="text-gray-500 dark:text-gray-400">填寫以下資料以發佈新的優惠活動。</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <form className="lg:col-span-2 space-y-6" onSubmit={handleSubmit}>
          {/* Basic Info Card */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border dark:border-gray-700 shadow-sm space-y-5">
            <h2 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
              📝 基本資料
            </h2>
            
            <div>
              <label className="text-xs font-medium text-gray-500 dark:text-gray-400">優惠標題</label>
              <Input
                value={form.title}
                onChange={(e) => handleChange("title", e.target.value)}
                required
                className="mt-1 dark:bg-gray-700 dark:border-gray-600"
                placeholder="例如：Klook 旅遊預訂 8% 回贈"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-gray-500 dark:text-gray-400">商戶名稱</label>
                <Input
                  value={form.merchant}
                  onChange={(e) => handleChange("merchant", e.target.value)}
                  required
                  className="mt-1 dark:bg-gray-700 dark:border-gray-600"
                  placeholder="例如：Klook"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 dark:text-gray-400">到期日</label>
                <Input
                  type="date"
                  value={form.expiryDate}
                  onChange={(e) => handleChange("expiryDate", e.target.value)}
                  required
                  className="mt-1 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-gray-500 dark:text-gray-400">優惠描述 (簡短)</label>
              <textarea
                value={form.description}
                onChange={(e) => handleChange("description", e.target.value)}
                required
                className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white"
                rows={2}
                placeholder="輸入簡短描述 (用於列表顯示)..."
              />
            </div>

            <div>
              <label className="text-xs font-medium text-gray-500 dark:text-gray-400">詳細內容 (Markdown)</label>
              <textarea
                value={form.content}
                onChange={(e) => handleChange("content", e.target.value)}
                className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white font-mono"
                rows={8}
                placeholder="# 詳細條款與細則&#10;&#10;- 條款 1&#10;- 條款 2"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-gray-500 dark:text-gray-400">宣傳圖連結 (Image URL)</label>
              <Input
                type="url"
                value={form.imageUrl}
                onChange={(e) => handleChange("imageUrl", e.target.value)}
                className="mt-1 dark:bg-gray-700 dark:border-gray-600"
                placeholder="https://..."
              />
              <p className="text-xs text-gray-500 mt-1">建議尺寸：1200x630px 或 16:9 比例。</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-gray-500 dark:text-gray-400">標籤 (以逗號分隔)</label>
                <Input
                  value={form.tags}
                  onChange={(e) => handleChange("tags", e.target.value)}
                  className="mt-1 dark:bg-gray-700 dark:border-gray-600"
                  placeholder="旅遊, Klook, 8%"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 dark:text-gray-400">詳情連結</label>
                <Input
                  type="url"
                  value={form.url}
                  onChange={(e) => handleChange("url", e.target.value)}
                  className="mt-1 dark:bg-gray-700 dark:border-gray-600"
                  placeholder="https://..."
                />
              </div>
            </div>
          </div>

          {/* SEO Card */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border dark:border-gray-700 shadow-sm space-y-5">
            <h2 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Search className="h-4 w-4" /> SEO 設定
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 -mt-3">
              自訂搜尋引擎顯示的標題和描述，留空則使用預設值。
            </p>
            
            <div>
              <label className="text-xs font-medium text-gray-500 dark:text-gray-400">SEO 標題</label>
              <Input
                value={form.seoTitle}
                onChange={(e) => handleChange("seoTitle", e.target.value)}
                className="mt-1 dark:bg-gray-700 dark:border-gray-600"
                placeholder={`${form.title || "優惠標題"} - ${form.merchant || "商戶"}信用卡優惠`}
                maxLength={60}
              />
              <p className="text-xs text-gray-500 mt-1">{form.seoTitle.length}/60 字元</p>
            </div>

            <div>
              <label className="text-xs font-medium text-gray-500 dark:text-gray-400">SEO 描述</label>
              <textarea
                value={form.seoDescription}
                onChange={(e) => handleChange("seoDescription", e.target.value)}
                className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white"
                rows={2}
                placeholder={`${form.description || "優惠描述"} 有效期至 ${form.expiryDate || "YYYY-MM-DD"}。立即了解如何獲取最高回贈！`}
                maxLength={160}
              />
              <p className="text-xs text-gray-500 mt-1">{form.seoDescription.length}/160 字元</p>
            </div>
          </div>

          {/* FAQ Card */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border dark:border-gray-700 shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <HelpCircle className="h-4 w-4" /> 常見問題 (FAQ)
              </h2>
              <Button type="button" variant="outline" size="sm" onClick={addFAQ}>
                <Plus className="h-4 w-4 mr-1" /> 新增問題
              </Button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 -mt-3">
              FAQ 會顯示在優惠頁面並自動生成 Google 搜尋結構化資料，有助提升 SEO 排名。
            </p>

            {form.faqs.length === 0 ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                <HelpCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">尚未新增常見問題</p>
                <p className="text-xs mt-1">點擊「新增問題」開始添加</p>
              </div>
            ) : (
              <div className="space-y-4">
                {form.faqs.map((faq, index) => (
                  <div key={index} className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg border dark:border-gray-700 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-2 py-0.5 rounded">
                        Q{index + 1}
                      </span>
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => removeFAQ(index)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 h-6 w-6 p-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <Input
                      value={faq.question}
                      onChange={(e) => updateFAQ(index, "question", e.target.value)}
                      placeholder="輸入問題，例如：這個優惠適用於哪些信用卡？"
                      className="dark:bg-gray-700 dark:border-gray-600"
                    />
                    <textarea
                      value={faq.answer}
                      onChange={(e) => updateFAQ(index, "answer", e.target.value)}
                      placeholder="輸入答案..."
                      className="w-full rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white"
                      rows={3}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              取消
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "處理中..." : (editingId ? "更新優惠" : "發佈優惠")}
            </Button>
          </div>
        </form>

        {/* Preview Card */}
        <Card className="dark:bg-gray-800 dark:border-gray-700 h-fit sticky top-6">
          <CardHeader>
            <CardTitle className="text-lg dark:text-white">預覽</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-xl overflow-hidden border dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm">
              <div className="h-40 w-full bg-gray-100 dark:bg-gray-800 relative">
                {form.imageUrl ? (
                  <img src={form.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    <ImageIcon className="h-8 w-8" />
                  </div>
                )}
                <div className="absolute top-3 right-3 bg-white/90 dark:bg-black/60 backdrop-blur px-2 py-1 rounded text-xs font-bold text-gray-900 dark:text-white">
                    {form.merchant || "商戶"}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white line-clamp-2">{form.title || "優惠標題"}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 line-clamp-2">
                  {form.description || "優惠描述將顯示於此..."}
                </p>
                <div className="flex items-center gap-2 mt-4 text-xs text-gray-500">
                  <CalendarIcon className="h-3.5 w-3.5" />
                  <span>有效期至 {form.expiryDate || "YYYY-MM-DD"}</span>
                </div>
              </div>
            </div>

            {/* SEO Preview */}
            <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg border dark:border-gray-700">
              <p className="text-xs text-gray-500 mb-2">Google 搜尋預覽</p>
              <div className="text-blue-600 dark:text-blue-400 text-sm font-medium truncate">
                {form.seoTitle || `${form.title || "優惠標題"} - ${form.merchant || "商戶"}信用卡優惠`}
              </div>
              <div className="text-green-700 dark:text-green-500 text-xs truncate">
                pickcardrebate.com › promos › {slugify(form.title) || "promo-id"}
              </div>
              <div className="text-gray-600 dark:text-gray-400 text-xs mt-1 line-clamp-2">
                {form.seoDescription || form.description || "優惠描述將顯示於此..."}
              </div>
            </div>

            {/* FAQ Preview */}
            {form.faqs.length > 0 && (
              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-900/30">
                <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mb-2">
                  ✓ {form.faqs.filter(f => f.question && f.answer).length} 個 FAQ 將生成結構化資料
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
