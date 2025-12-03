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
      case 'wechat':
        // WeChat doesn't have a direct share URL, so we copy the link and show instructions
        await navigator.clipboard.writeText(shareUrl);
        toast.success('已複製連結！請打開微信貼上分享', { duration: 4000 });
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(title)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`, '_blank');
        break;
      case 'threads':
        // Threads uses Instagram's share mechanism, open web version
        window.open(`https://www.threads.net/intent/post?text=${encodeURIComponent(shareText)}`, '_blank');
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
                onClick={() => handleShare('wechat')} 
                className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-sm transition-colors"
              >
                <svg className="h-4 w-4 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178A1.17 1.17 0 014.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178 1.17 1.17 0 01-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 01.598.082l1.584.926a.272.272 0 00.139.045c.133 0 .241-.108.241-.245 0-.06-.024-.12-.04-.177l-.325-1.233a.493.493 0 01.177-.554c1.524-1.12 2.503-2.783 2.503-4.617 0-3.37-3.247-6.127-7.062-6.126zm-3.173 2.96c.535 0 .969.44.969.983a.976.976 0 01-.969.983.976.976 0 01-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.983a.976.976 0 01-.969.983.976.976 0 01-.969-.983c0-.542.434-.982.97-.982z"/>
                </svg>
                <span>微信 WeChat</span>
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
                onClick={() => handleShare('threads')} 
                className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-sm transition-colors"
              >
                <svg className="h-4 w-4 text-black dark:text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.96-.065-1.182.408-2.256 1.33-3.022.812-.675 1.89-1.058 3.108-1.14l.124-.005c1.783-.09 3.106.429 3.941 1.545.066-.71.09-1.46.07-2.243l2.105-.096c.03.986-.003 1.943-.1 2.857.596.326 1.132.715 1.596 1.167 1.032 1.005 1.705 2.405 1.943 4.048.258 1.784-.07 3.69-1.02 5.263-1.395 2.308-3.858 3.592-7.35 3.832l-.243.008zm-.09-7.544c-.878.048-1.574.282-2.07.697-.496.413-.725.927-.682 1.53.041.567.333 1.038.87 1.4.538.363 1.263.543 2.105.494 1.122-.061 1.968-.44 2.515-1.127.512-.644.828-1.548.946-2.698-.71-.273-1.58-.378-2.684-.296h-1z"/>
                </svg>
                <span>Threads</span>
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

