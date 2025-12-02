"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ImageUpload } from "@/components/ui/image-upload";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HK_CARDS } from "@/lib/data/cards";
import { createClient } from "@/lib/supabase/client";
import { Check, Info, ExternalLink } from "lucide-react";
import { toast } from "sonner";

export default function AdminEditCardImagePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const cardId = searchParams.get("id");
  
  const [imageUrl, setImageUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageError, setImageError] = useState(false);

  // 從 cards.ts 取得卡片資料
  const card = HK_CARDS.find((c) => c.id === cardId);

  // 從數據庫取得現有圖片
  useEffect(() => {
    async function fetchCurrentImage() {
      if (!cardId) return;
      const supabase = createClient();
      const { data } = await supabase
        .from("cards")
        .select("image_url")
        .eq("id", cardId)
        .single();
      
      if (data?.image_url) {
        setImageUrl(data.image_url);
      } else if (card?.imageUrl) {
        setImageUrl(card.imageUrl);
      }
    }
    fetchCurrentImage();
  }, [cardId, card]);

  useEffect(() => {
    setImageError(false);
  }, [imageUrl]);

  if (!card) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-400">找不到此信用卡</p>
          <Button className="mt-4" onClick={() => router.push("/admin/cards")}>
            返回列表
          </Button>
        </div>
      </div>
    );
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      // Use API route to bypass RLS (server-side with service role)
      const response = await fetch('/api/admin/cards/update-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cardId,
          imageUrl,
          cardData: {
            name: card.name,
            bank: card.bank,
            tags: card.tags,
            sellingPoints: card.sellingPoints,
            welcomeOfferText: card.welcomeOfferText,
            feeWaiverCondition: card.feeWaiverCondition,
            applyUrl: card.applyUrl,
            foreignCurrencyFee: card.foreignCurrencyFee
          }
        })
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || '儲存失敗');
      }

      toast.success("圖片已更新！");
      router.push("/admin/cards");
    } catch (error: any) {
      console.error("Error saving image:", error);
      toast.error("儲存失敗：" + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <button 
            className="text-sm text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200" 
            onClick={() => router.back()}
          >
            ← 返回信用卡列表
          </button>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
            編輯卡片圖片
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            上傳或更新 {card.name} 的卡面圖片
          </p>
        </div>
      </div>

      {/* 提示訊息 */}
      <div className="flex items-start gap-3 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
        <Info className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5" />
        <div className="text-sm text-amber-800 dark:text-amber-200">
          <p className="font-medium">注意：卡片規則由 cards.ts 管理</p>
          <p className="mt-1 text-amber-700 dark:text-amber-300">
            此頁面只能編輯卡片圖片。如需修改回贈規則、標籤等資料，請編輯 <code className="bg-amber-100 dark:bg-amber-800 px-1 rounded">lib/data/cards.ts</code> 檔案。
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* 編輯表單 */}
        <form className="lg:col-span-2 space-y-5 bg-white dark:bg-gray-800 p-6 rounded-xl border dark:border-gray-700 shadow-sm" onSubmit={handleSubmit}>
          
          {/* 唯讀資料 */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-gray-500 dark:text-gray-400">信用卡名稱</label>
              <Input
                value={card.name}
                disabled
                className="mt-1 dark:bg-gray-700 dark:border-gray-600 bg-gray-50 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 dark:text-gray-400">發卡銀行</label>
              <Input
                value={card.bank}
                disabled
                className="mt-1 dark:bg-gray-700 dark:border-gray-600 bg-gray-50 cursor-not-allowed"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-gray-500 dark:text-gray-400">標籤</label>
            <div className="mt-1 flex flex-wrap gap-1">
              {card.tags.map(tag => (
                <span key={tag} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs text-gray-600 dark:text-gray-300">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* 可編輯的圖片 */}
          <div className="pt-4 border-t dark:border-gray-700">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4">📷 卡面圖片（可編輯）</h3>
            
            <ImageUpload
              label="卡面圖片"
              value={imageUrl}
              onChange={(url) => setImageUrl(url)}
              onRemove={() => setImageUrl("")}
              bucket="images"
              folder="cards"
              recommendedSize="300x190px (比例約 1.6:1)"
            />
            
            <div className="mt-3">
              <label className="text-xs font-medium text-gray-500 dark:text-gray-400">或直接輸入圖片連結 (URL)</label>
              <Input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="mt-1 dark:bg-gray-700 dark:border-gray-600"
                placeholder="https://..."
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              取消
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "儲存中..." : "儲存圖片"}
            </Button>
          </div>
        </form>

        {/* 預覽卡片 */}
        <Card className="dark:bg-gray-800 dark:border-gray-700 h-fit sticky top-6">
          <CardHeader>
            <CardTitle className="text-lg dark:text-white">即時預覽</CardTitle>
          </CardHeader>
          
          {/* 卡片圖片預覽 */}
          <div className={`relative overflow-hidden ${(!imageUrl || imageError) ? (card.style?.bgColor || "bg-gradient-to-r from-slate-500 to-slate-700") + ' h-32 p-4' : 'bg-white dark:bg-gray-900 h-48 p-4 flex items-center justify-center'}`}>
            {imageUrl && !imageError ? (
              <div className="relative w-full h-full">
                <img 
                  src={imageUrl} 
                  alt={card.name} 
                  className="w-full h-full object-contain" 
                  onError={() => setImageError(true)}
                />
              </div>
            ) : (
              <>
                <div className="text-xs uppercase opacity-80 text-white">{card.bank}</div>
                <div className="text-xl font-bold mt-1 text-white">{card.name}</div>
                <div className="absolute bottom-3 right-3 w-8 h-6 bg-yellow-200/20 rounded border border-yellow-200/40 backdrop-blur-sm"></div>
              </>
            )}
          </div>

          <CardContent className="space-y-4 pt-4 px-6 pb-6">
            <div className="mb-2">
              <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">{card.bank}</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight">{card.name}</h3>
            </div>

            {card.welcomeOfferText && (
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-100 dark:border-yellow-800 rounded-lg p-3 text-sm text-yellow-800 dark:text-yellow-200">
                <strong>迎新：</strong> {card.welcomeOfferText}
              </div>
            )}

            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">賣點亮點</p>
              {card.sellingPoints && card.sellingPoints.length > 0 ? (
                <ul className="space-y-1 text-sm text-gray-800 dark:text-gray-200">
                  {card.sellingPoints.slice(0, 3).map((point, idx) => (
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

            {card.applyUrl && (
              <a 
                href={card.applyUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
              >
                <ExternalLink className="h-4 w-4" />
                查看申請連結
              </a>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

