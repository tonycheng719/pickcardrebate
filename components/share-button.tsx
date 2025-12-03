"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Share2, Copy, MessageCircle, Check,
  Facebook, Twitter
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

interface ShareButtonProps {
  title: string;
  text: string;
  url?: string;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

export function ShareButton({ 
  title, 
  text, 
  url = typeof window !== 'undefined' ? window.location.href : '',
  variant = "outline",
  size = "default",
  className = ""
}: ShareButtonProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShare = async (platform: string) => {
    const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
    const shareText = `${title}\n\n${text}\n\n${shareUrl}`;

    switch (platform) {
      case 'copy':
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        toast.success('已複製連結！');
        setTimeout(() => setCopied(false), 2000);
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(title)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`, '_blank');
        break;
      case 'telegram':
        window.open(`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title + '\n' + text)}`, '_blank');
        break;
      case 'native':
        if (navigator.share) {
          try {
            await navigator.share({ title, text, url: shareUrl });
          } catch (err) {
            // User cancelled or error
          }
        }
        break;
    }
    setShowMenu(false);
  };

  return (
    <div className="relative">
      <Button
        variant={variant}
        size={size}
        onClick={() => setShowMenu(!showMenu)}
        className={className}
      >
        <Share2 className="h-4 w-4" />
        {size !== "icon" && <span className="ml-2">分享</span>}
      </Button>

      <AnimatePresence>
        {showMenu && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setShowMenu(false)}
            />
            
            {/* Menu */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-full mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-xl border dark:border-gray-700 p-2 z-50 min-w-[180px]"
            >
              <div className="text-xs font-medium text-gray-500 dark:text-gray-400 px-3 py-2">
                分享至
              </div>
              
              <button 
                onClick={() => handleShare('copy')} 
                className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-sm transition-colors"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-emerald-500" />
                ) : (
                  <Copy className="h-4 w-4 text-gray-500" />
                )}
                <span>{copied ? '已複製！' : '複製連結'}</span>
              </button>
              
              <button 
                onClick={() => handleShare('whatsapp')} 
                className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-sm transition-colors"
              >
                <MessageCircle className="h-4 w-4 text-green-500" />
                <span>WhatsApp</span>
              </button>
              
              <button 
                onClick={() => handleShare('telegram')} 
                className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-sm transition-colors"
              >
                <svg className="h-4 w-4 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                </svg>
                <span>Telegram</span>
              </button>
              
              <button 
                onClick={() => handleShare('facebook')} 
                className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-sm transition-colors"
              >
                <Facebook className="h-4 w-4 text-blue-600" />
                <span>Facebook</span>
              </button>
              
              <button 
                onClick={() => handleShare('twitter')} 
                className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-sm transition-colors"
              >
                <Twitter className="h-4 w-4 text-sky-500" />
                <span>Twitter / X</span>
              </button>

              {typeof navigator !== 'undefined' && navigator.share && (
                <button 
                  onClick={() => handleShare('native')} 
                  className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-sm transition-colors border-t dark:border-gray-700 mt-1 pt-2"
                >
                  <Share2 className="h-4 w-4 text-gray-500" />
                  <span>更多選項...</span>
                </button>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// Specialized share for calculation results
export function ShareCalculationResult({
  merchant,
  amount,
  bestCard,
  rewardAmount,
  percentage
}: {
  merchant: string;
  amount: number;
  bestCard: string;
  rewardAmount: number;
  percentage: number;
}) {
  const title = `PickCardRebate 計算結果`;
  const text = `💳 ${merchant} 消費 $${amount.toLocaleString()}\n🏆 最佳信用卡：${bestCard}\n💰 回贈：$${rewardAmount.toFixed(2)} (${percentage}%)`;
  
  return (
    <ShareButton 
      title={title}
      text={text}
      url="https://pickcardrebate.com"
      variant="outline"
      size="sm"
    />
  );
}

