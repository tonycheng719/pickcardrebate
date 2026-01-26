"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Share2, Copy, Check, MessageCircle, 
  Instagram, Facebook, Download, Link2 
} from "lucide-react";
import { toast } from "sonner";

interface ShareResultsButtonProps {
  type: "compare" | "calculate";
  // For compare
  cardIds?: string[];
  // For calculate
  merchant?: string;
  amount?: number;
  cardName?: string;
  bank?: string;
  rate?: number;
  reward?: number;
}

export function ShareResultsButton({
  type,
  cardIds = [],
  merchant,
  amount,
  cardName,
  bank,
  rate,
  reward,
}: ShareResultsButtonProps) {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  // Generate share URL
  const getShareUrl = () => {
    const baseUrl = "https://pickcardrebate.com";
    if (type === "compare") {
      return `${baseUrl}/cards/compare?cards=${cardIds.join(",")}`;
    } else {
      const params = new URLSearchParams();
      if (merchant) params.set("merchant", merchant);
      if (amount) params.set("amount", amount.toString());
      return `${baseUrl}/?${params.toString()}`;
    }
  };

  // Generate OG image URL
  const getOgImageUrl = () => {
    const baseUrl = "https://pickcardrebate.com/api/og";
    if (type === "compare") {
      return `${baseUrl}/compare?cards=${cardIds.join(",")}`;
    } else {
      const params = new URLSearchParams();
      if (merchant) params.set("merchant", merchant);
      if (amount) params.set("amount", amount.toString());
      if (cardName) params.set("card", cardName);
      if (bank) params.set("bank", bank);
      if (rate) params.set("rate", rate.toString());
      if (reward) params.set("reward", reward.toString());
      return `${baseUrl}/calculate?${params.toString()}`;
    }
  };

  // Generate share text
  const getShareText = () => {
    if (type === "compare") {
      return `我正在用 PickCardRebate 比較信用卡！即刻睇下邊張最抵 👇`;
    } else {
      return `於 ${merchant} 消費 $${amount?.toLocaleString()}，用 ${cardName} 可賺 ${rate}% 回贈 ($${reward?.toFixed(0)})！即刻計算你的最佳信用卡 👇`;
    }
  };

  // Copy link to clipboard
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(getShareUrl());
      setCopied(true);
      toast.success("連結已複製！");
      setTimeout(() => setCopied(false), 2000);
      trackShare("copy_link");
    } catch (e) {
      toast.error("無法複製連結");
    }
  };

  // Download image
  const handleDownloadImage = async () => {
    setDownloading(true);
    try {
      const response = await fetch(getOgImageUrl());
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `pickcardrebate-${type}-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success("圖片已下載！");
      trackShare("download_image");
    } catch (e) {
      toast.error("無法下載圖片");
    } finally {
      setDownloading(false);
    }
  };

  // Share to WhatsApp
  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(`${getShareText()}\n\n${getShareUrl()}`);
    window.open(`https://wa.me/?text=${text}`, "_blank");
    trackShare("whatsapp");
  };

  // Share to Facebook
  const handleShareFacebook = () => {
    const url = encodeURIComponent(getShareUrl());
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank");
    trackShare("facebook");
  };

  // Native share (for mobile)
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: type === "compare" ? "信用卡比較" : "計算結果",
          text: getShareText(),
          url: getShareUrl(),
        });
        trackShare("native");
      } catch (e) {
        // User cancelled or error
      }
    }
  };

  // Track share event
  const trackShare = (platform: string) => {
    // Send to analytics
    fetch("/api/stats/share", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type,
        platform,
        cardIds: type === "compare" ? cardIds : undefined,
        merchant: type === "calculate" ? merchant : undefined,
      }),
    }).catch(() => {});
  };

  // Check if native share is available
  const hasNativeShare = typeof navigator !== "undefined" && !!navigator.share;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Share2 className="h-4 w-4" />
          分享
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {hasNativeShare && (
          <DropdownMenuItem onClick={handleNativeShare}>
            <Share2 className="h-4 w-4 mr-2" />
            分享...
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={handleShareWhatsApp}>
          <MessageCircle className="h-4 w-4 mr-2 text-green-500" />
          WhatsApp
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleShareFacebook}>
          <Facebook className="h-4 w-4 mr-2 text-blue-600" />
          Facebook
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleCopyLink}>
          {copied ? (
            <Check className="h-4 w-4 mr-2 text-green-500" />
          ) : (
            <Link2 className="h-4 w-4 mr-2" />
          )}
          複製連結
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDownloadImage} disabled={downloading}>
          <Download className="h-4 w-4 mr-2" />
          {downloading ? "下載中..." : "下載圖片"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

