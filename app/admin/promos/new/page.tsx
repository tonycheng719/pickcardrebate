"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAdminDataStore } from "@/lib/admin/data-store";
import type { Promo } from "@/lib/types";
import { CalendarIcon, Image as ImageIcon } from "lucide-react";

type NewPromoForm = {
  title: string;
  merchant: string;
  description: string;
  expiryDate: string;
  tags: string;
  url: string;
  imageUrl: string;
};

const DEFAULT_FORM: NewPromoForm = {
  title: "",
  merchant: "",
  description: "",
  expiryDate: "",
  tags: "",
  url: "",
  imageUrl: "",
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
      expiryDate: editingPromo.expiryDate,
      tags: editingPromo.tags.join(", "),
      url: editingPromo.url || "",
      imageUrl: editingPromo.imageUrl || "",
    });
  }, [editingPromo]);

  const handleChange = (field: keyof NewPromoForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    const tags = form.tags.split(",").map((tag) => tag.trim()).filter(Boolean);

    const nextPromo: Promo = {
      id: editingPromo?.id || slugify(form.title),
      title: form.title,
      merchant: form.merchant,
      description: form.description,
      expiryDate: form.expiryDate,
      relatedCardIds: editingPromo?.relatedCardIds || [], // Keep existing related cards or empty for now
      tags,
      url: form.url,
      imageUrl: form.imageUrl,
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
        <form className="lg:col-span-2 space-y-5 bg-white dark:bg-gray-800 p-6 rounded-xl border dark:border-gray-700 shadow-sm" onSubmit={handleSubmit}>
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
            <label className="text-xs font-medium text-gray-500 dark:text-gray-400">優惠描述</label>
            <textarea
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              required
              className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white"
              rows={4}
              placeholder="輸入詳細優惠內容..."
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

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              取消
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "處理中..." : (editingId ? "更新優惠" : "發佈優惠")}
            </Button>
          </div>
        </form>

        <Card className="dark:bg-gray-800 dark:border-gray-700 h-fit">
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
