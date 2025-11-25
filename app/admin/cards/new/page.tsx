"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAdminDataStore } from "@/lib/admin/data-store";
import type { CreditCard } from "@/lib/types";
import { Image as ImageIcon } from "lucide-react";

type NewCardForm = {
  name: string;
  bank: string;
  tags: string;
  basePercentage: string;
  welcomeOffer: string;
  welcomeOfferReward: string;
  welcomeOfferDeadline: string;
  applyUrl: string;
  description: string;
  sellingPoints: string;
  imageUrl: string;
};

const DEFAULT_FORM: NewCardForm = {
  name: "",
  bank: "",
  tags: "",
  basePercentage: "",
  welcomeOffer: "",
  welcomeOfferReward: "",
  welcomeOfferDeadline: "",
  applyUrl: "",
  description: "",
  sellingPoints: "",
  imageUrl: "",
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "") || crypto.randomUUID();

export default function AdminNewCardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editingId = searchParams.get("id");
  const { cards, addOrUpdateCard } = useAdminDataStore();
  const [form, setForm] = useState<NewCardForm>(DEFAULT_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const editingCard = useMemo(() => cards.find((card) => card.id === editingId), [cards, editingId]);

  useEffect(() => {
    if (!editingCard) return;
    const baseRule = editingCard.rules.find((rule) => rule.matchType === "base");
    setForm({
      name: editingCard.name,
      bank: editingCard.bank,
      tags: editingCard.tags.join(", "),
      basePercentage: baseRule ? String(baseRule.percentage) : "",
      welcomeOffer: editingCard.welcomeOfferText || "",
      welcomeOfferReward: editingCard.welcomeOfferReward || "",
      welcomeOfferDeadline: editingCard.welcomeOfferDeadline || "",
      applyUrl: editingCard.applyUrl || "",
      description: baseRule?.description || "",
      sellingPoints: editingCard.sellingPoints?.join("\n") || "",
      imageUrl: editingCard.imageUrl || "",
    });
  }, [editingCard]);

  const handleChange = (field: keyof NewCardForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    const tags = form.tags.split(",").map((tag) => tag.trim()).filter(Boolean);
    const sellingPoints = form.sellingPoints
      .split("\n")
      .map((point) => point.trim())
      .filter(Boolean);
    const percentageValue = parseFloat(form.basePercentage) || 0;

    const baseRule = {
      description: form.description || "基本回贈",
      matchType: "base" as const,
      percentage: percentageValue > 0 ? percentageValue : 0.5,
    };

    const existing = editingCard;
    const nextCard: CreditCard = {
      id: existing?.id || slugify(form.name),
      name: form.name,
      bank: form.bank,
      style: existing?.style || { bgColor: "bg-gradient-to-r from-slate-500 to-slate-700", textColor: "text-white" },
      rewardTimeline: existing?.rewardTimeline,
      foreignCurrencyFee: existing?.foreignCurrencyFee,
      feeWaiverCondition: existing?.feeWaiverCondition,
      waiverMethod: existing?.waiverMethod,
      rules: existing
        ? existing.rules.map((rule) => (rule.matchType === "base" ? baseRule : rule))
        : [baseRule],
      tags,
      welcomeOfferText: form.welcomeOffer,
      welcomeOfferReward: form.welcomeOfferReward || undefined,
      welcomeOfferDeadline: form.welcomeOfferDeadline || undefined,
      applyUrl: form.applyUrl,
      sellingPoints,
      imageUrl: form.imageUrl,
    };

    addOrUpdateCard(nextCard);
    setIsSubmitting(false);
    router.push("/admin/cards");
  };

  const parsedTags = form.tags.split(",").map((tag) => tag.trim()).filter(Boolean);
  const parsedSellingPoints = form.sellingPoints
    .split("\n")
    .map((point) => point.trim())
    .filter(Boolean);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <button className="text-sm text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200" onClick={() => router.back()}>
            ← 返回信用卡列表
          </button>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">新增信用卡</h1>
          <p className="text-gray-500 dark:text-gray-400">填寫以下資料以建立新卡片，提交後將待後端審核。</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <form className="lg:col-span-2 space-y-5 bg-white dark:bg-gray-800 p-6 rounded-xl border dark:border-gray-700 shadow-sm" onSubmit={handleSubmit}>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-gray-500 dark:text-gray-400">信用卡名稱</label>
              <Input
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                required
                className="mt-1 dark:bg-gray-700 dark:border-gray-600"
                placeholder="例如：Jetso 超筍卡"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 dark:text-gray-400">發卡銀行</label>
              <Input
                value={form.bank}
                onChange={(e) => handleChange("bank", e.target.value)}
                required
                className="mt-1 dark:bg-gray-700 dark:border-gray-600"
                placeholder="例如：HSBC"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-gray-500 dark:text-gray-400">標籤 (以逗號分隔)</label>
              <Input
                value={form.tags}
                onChange={(e) => handleChange("tags", e.target.value)}
                className="mt-1 dark:bg-gray-700 dark:border-gray-600"
                placeholder="超市, 手機支付"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 dark:text-gray-400">基本回贈 %</label>
              <Input
                type="number"
                step="0.1"
                value={form.basePercentage}
                onChange={(e) => handleChange("basePercentage", e.target.value)}
                className="mt-1 dark:bg-gray-700 dark:border-gray-600"
                placeholder="例如：2"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-gray-500 dark:text-gray-400">卡面圖片連結 (Image URL)</label>
            <Input
              type="url"
              value={form.imageUrl}
              onChange={(e) => handleChange("imageUrl", e.target.value)}
              className="mt-1 dark:bg-gray-700 dark:border-gray-600"
              placeholder="https://..."
            />
            <p className="text-xs text-gray-500 mt-1">建議使用 PNG 去背圖片或完整的橫向卡面圖。</p>
          </div>

          <div>
            <label className="text-xs font-medium text-gray-500 dark:text-gray-400">迎新優惠摘要</label>
            <textarea
              value={form.welcomeOffer}
              onChange={(e) => handleChange("welcomeOffer", e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white"
              rows={3}
              placeholder="例如：首 2 個月簽 $6,000 送 $800 現金回贈"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-gray-500 dark:text-gray-400">迎新獎賞 (顯示文字)</label>
              <Input
                value={form.welcomeOfferReward}
                onChange={(e) => handleChange("welcomeOfferReward", e.target.value)}
                className="mt-1 dark:bg-gray-700 dark:border-gray-600"
                placeholder="例如：$800 現金回贈 / 20,000 里數"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 dark:text-gray-400">迎新截止日期</label>
              <Input
                type="date"
                value={form.welcomeOfferDeadline}
                onChange={(e) => handleChange("welcomeOfferDeadline", e.target.value)}
                className="mt-1 dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-gray-500 dark:text-gray-400">賣點亮點（每行一項）</label>
            <textarea
              value={form.sellingPoints}
              onChange={(e) => handleChange("sellingPoints", e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white"
              rows={4}
              placeholder={"例：\n指定商戶 5% 現金回贈\n超市簽賬滿 $500 享 3%"}
            />
          </div>

          <div>
            <label className="text-xs font-medium text-gray-500 dark:text-gray-400">申請連結</label>
            <Input
              type="url"
              value={form.applyUrl}
              onChange={(e) => handleChange("applyUrl", e.target.value)}
              className="mt-1 dark:bg-gray-700 dark:border-gray-600"
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="text-xs font-medium text-gray-500 dark:text-gray-400">回饋描述</label>
            <textarea
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white"
              rows={4}
              placeholder="輸入回饋說明，例如：超市 5%，流動支付 3%..."
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              取消
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "儲存中..." : "儲存信用卡"}
            </Button>
          </div>
        </form>

        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg dark:text-white">即時預覽</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className={`h-32 relative overflow-hidden rounded-xl shadow-md ${!form.imageUrl ? "bg-gradient-to-r from-blue-500 to-indigo-600 p-4 text-white" : "bg-gray-100"}`}>
                {form.imageUrl ? (
                    <img src={form.imageUrl} alt="Card Preview" className="w-full h-full object-cover" />
                ) : (
                    <>
                        <div className="text-xs uppercase opacity-80">{form.bank || "銀行名稱"}</div>
                        <div className="text-xl font-bold mt-1">{form.name || "信用卡名稱"}</div>
                        <div className="absolute bottom-3 right-3 w-8 h-6 bg-yellow-200/20 rounded border border-yellow-200/40 backdrop-blur-sm"></div>
                    </>
                )}
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-100 dark:border-yellow-800 rounded-lg p-3 text-sm text-yellow-800 dark:text-yellow-200">
              <strong>迎新：</strong> {form.welcomeOffer || "輸入迎新內容後會顯示於此。"}
              {(form.welcomeOfferReward || form.welcomeOfferDeadline) && (
                <div className="mt-2 text-xs space-y-1">
                  {form.welcomeOfferReward && <p>獎賞：{form.welcomeOfferReward}</p>}
                  {form.welcomeOfferDeadline && <p>截止：{form.welcomeOfferDeadline}</p>}
                </div>
              )}
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">賣點亮點</p>
              {parsedSellingPoints.length > 0 ? (
                <ul className="space-y-1 text-sm text-gray-800 dark:text-gray-200">
                  {parsedSellingPoints.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-500 mt-0.5">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-gray-400">尚未設定賣點</p>
              )}
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">申請連結</p>
              <p className="text-sm text-blue-600 dark:text-blue-400 break-all">
                {form.applyUrl || "https://example.com"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
