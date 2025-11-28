"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ImageUpload } from "@/components/ui/image-upload";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAdminDataStore } from "@/lib/admin/data-store";
import type { CreditCard, RewardRule } from "@/lib/types";
import { Check, Code } from "lucide-react";

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
  rawRules: string; // New field for JSON rules
  rawRewardConfig: string; // New field for Miles Config JSON
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
  rawRules: "[]",
  rawRewardConfig: "",
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
  const [imageError, setImageError] = useState(false);
  const [jsonError, setJsonError] = useState<string | null>(null);

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
      rawRules: JSON.stringify(editingCard.rules, null, 2),
      rawRewardConfig: editingCard.rewardConfig ? JSON.stringify(editingCard.rewardConfig, null, 2) : "",
    });
  }, [editingCard]);

  useEffect(() => {
      setImageError(false);
  }, [form.imageUrl]);

  const handleChange = (field: keyof NewCardForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (field === "rawRules" || field === "rawRewardConfig") {
        try {
            if (value) JSON.parse(value);
            setJsonError(null);
        } catch (e: any) {
            setJsonError(e.message);
        }
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    if (jsonError) {
        alert("請先修正 JSON 格式錯誤");
        setIsSubmitting(false);
        return;
    }

    const tags = form.tags.split(",").map((tag) => tag.trim()).filter(Boolean);
    const sellingPoints = form.sellingPoints
      .split("\n")
      .map((point) => point.trim())
      .filter(Boolean);
    const percentageValue = parseFloat(form.basePercentage) || 0;

    let rules: RewardRule[] = [];
    try {
        rules = JSON.parse(form.rawRules);
    } catch (e) {
        console.error("Invalid rules JSON, falling back to base rule");
        // Fallback if JSON is empty or invalid (though check above should catch it)
        rules = [{
            description: form.description || "基本回贈",
            matchType: "base" as const,
            percentage: percentageValue > 0 ? percentageValue : 0.5,
        }];
    }

    let rewardConfig = undefined;
    if (form.rawRewardConfig) {
        try {
            rewardConfig = JSON.parse(form.rawRewardConfig);
        } catch (e) {
            console.error("Invalid reward config JSON");
        }
    }
    
    // Ensure base rule syncs if user edited simple field but didn't touch JSON
    // Or prioritize JSON? Let's prioritize JSON if it has content.
    // Actually, to avoid confusion, if JSON is modified, use it.
    // If JSON is default/empty, construct from form.
    // But for "See calculation method", JSON is the source of truth.
    // Let's assume JSON is the master for Rules.

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
      rules: rules,
      tags,
      welcomeOfferText: form.welcomeOffer,
      welcomeOfferReward: form.welcomeOfferReward || undefined,
      welcomeOfferDeadline: form.welcomeOfferDeadline || undefined,
      applyUrl: form.applyUrl,
      sellingPoints,
      imageUrl: form.imageUrl, // Ensure this gets the latest form value
      rewardConfig,
    };

    // Remove undefined values to avoid overwriting with nulls if not intended? 
    // Actually mapCardToDB handles the payload structure.
    
    console.log("Submitting card:", nextCard); // Debug
    await addOrUpdateCard(nextCard); // Await to ensure completion before redirect
    setIsSubmitting(false);
    router.push("/admin/cards");
  };

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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">新增/編輯信用卡</h1>
          <p className="text-gray-500 dark:text-gray-400">填寫以下資料以建立或修改卡片。</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <form className="lg:col-span-2 space-y-5 bg-white dark:bg-gray-800 p-6 rounded-xl border dark:border-gray-700 shadow-sm" onSubmit={handleSubmit}>
          {/* Basic Info */}
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
              <label className="text-xs font-medium text-gray-500 dark:text-gray-400">基本回贈 % (顯示用)</label>
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
            <ImageUpload
              label="卡面圖片"
              value={form.imageUrl}
              onChange={(url) => handleChange("imageUrl", url)}
              onRemove={() => handleChange("imageUrl", "")}
              bucket="images"
              folder="cards"
              recommendedSize="300x190px (比例約 1.6:1)"
            />
            {/* URL Fallback (Hidden or secondary) - keeping it for manual entry if needed, but maybe not */}
            <div className="mt-2">
                <label className="text-xs font-medium text-gray-500 dark:text-gray-400">或直接輸入圖片連結 (URL)</label>
                <Input
                type="url"
                value={form.imageUrl}
                onChange={(e) => handleChange("imageUrl", e.target.value)}
                className="mt-1 dark:bg-gray-700 dark:border-gray-600"
                placeholder="https://..."
                />
            </div>
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

          {/* Advanced Rules JSON Editor */}
          <div className="pt-4 border-t dark:border-gray-700">
            <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <Code className="h-4 w-4" /> 進階設定：回贈規則 (JSON)
                </label>
                <span className="text-xs text-gray-500">小心編輯</span>
            </div>
            <div className="relative">
                <textarea
                    value={form.rawRules}
                    onChange={(e) => handleChange("rawRules", e.target.value)}
                    className={`font-mono text-xs mt-1 w-full rounded-md border ${jsonError ? "border-red-500 focus:ring-red-500" : "border-gray-300 dark:border-gray-600"} dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-gray-300 h-64`}
                    spellCheck={false}
                />
            </div>
            <p className="text-xs text-gray-500 mt-1 mb-4">
                在此直接編輯回贈邏輯。這是計算機的核心依據。請確保格式正確。
            </p>

            <div className="flex items-center justify-between mb-2 mt-4 border-t dark:border-gray-700 pt-4">
                <label className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <Code className="h-4 w-4" /> 進階設定：里數設定 (JSON 檢視/編輯)
                </label>
            </div>
            <div className="relative">
                <textarea
                    value={form.rawRewardConfig}
                    onChange={(e) => handleChange("rawRewardConfig", e.target.value)}
                    className={`font-mono text-xs mt-1 w-full rounded-md border ${jsonError ? "border-red-500 focus:ring-red-500" : "border-gray-300 dark:border-gray-600"} dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-gray-300 h-32`}
                    placeholder='例如：{"source": "RC", "ratio": 10}'
                    spellCheck={false}
                />
                 {jsonError && (
                    <div className="absolute bottom-2 right-2 text-xs text-red-500 bg-white dark:bg-gray-800 px-2 py-1 rounded border border-red-200">
                        JSON 格式錯誤: {jsonError}
                    </div>
                )}
            </div>
            <p className="text-xs text-gray-500 mt-1">
                顯示目前的里數兌換設定 (由 SQL 控制)。如需緊急修改可直接編輯此處 JSON，格式如：<code>{`{"source": "RC", "ratio": 10}`}</code>。
            </p>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              取消
            </Button>
            <Button type="submit" disabled={isSubmitting || !!jsonError}>
              {isSubmitting ? "儲存中..." : "儲存信用卡"}
            </Button>
          </div>
        </form>

        <Card className="dark:bg-gray-800 dark:border-gray-700 h-fit sticky top-6">
          <CardHeader>
            <CardTitle className="text-lg dark:text-white">即時預覽</CardTitle>
          </CardHeader>
          {/* Preview Logic */}
          <div className={`relative overflow-hidden ${(!form.imageUrl || imageError) ? (editingCard?.style?.bgColor || "bg-gradient-to-r from-slate-500 to-slate-700") + ' h-32 p-4' : 'bg-white dark:bg-gray-900 h-48 p-4 flex items-center justify-center'}`}>
                {form.imageUrl && !imageError ? (
                    <div className="relative w-full h-full">
                        <img 
                            src={form.imageUrl} 
                            alt={form.name} 
                            className="w-full h-full object-contain" 
                            onError={() => setImageError(true)}
                        />
                    </div>
                ) : (
                    <>
                        <div className="text-xs uppercase opacity-80 text-white">{form.bank || "銀行名稱"}</div>
                        <div className="text-xl font-bold mt-1 text-white">{form.name || "信用卡名稱"}</div>
                        <div className="absolute bottom-3 right-3 w-8 h-6 bg-yellow-200/20 rounded border border-yellow-200/40 backdrop-blur-sm"></div>
                    </>
                )}
            </div>

          <CardContent className="space-y-4 pt-4 px-6 pb-6">
            <div className="mb-2">
                <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">{form.bank || "銀行名稱"}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight">{form.name || "信用卡名稱"}</h3>
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
                      <Check className="h-4 w-4 text-emerald-500 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-gray-400">尚未設定賣點</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
