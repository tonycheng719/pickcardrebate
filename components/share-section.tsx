"use client";

import { useState } from "react";
import { 
  Copy, MessageCircle, Check, Facebook, Share2
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface ShareSectionProps {
  title: string;
  text: string;
  url?: string;
  className?: string;
}

export function ShareSection({ 
  title, 
  text, 
  url = typeof window !== 'undefined' ? window.location.href : '',
  className = ""
}: ShareSectionProps) {
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
        await navigator.clipboard.writeText(shareUrl);
        toast.success('已複製連結！請打開微信貼上分享', { duration: 4000 });
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(title)}`, '_blank');
        break;
      case 'telegram':
        window.open(`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title + '\n' + text)}`, '_blank');
        break;
      case 'native':
        if (navigator.share) {
          try {
            await navigator.share({ title, text, url: shareUrl });
          } catch (err) {
            // User cancelled
          }
        }
        break;
    }
  };

  const ShareIcon = ({ 
    onClick, 
    icon, 
    label, 
    bgColor 
  }: { 
    onClick: () => void; 
    icon: React.ReactNode; 
    label: string;
    bgColor: string;
  }) => (
    <motion.button 
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all cursor-pointer ${bgColor}`}
    >
      <div className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-md">
        {icon}
      </div>
      <span className="text-xs font-medium text-gray-600 dark:text-gray-300">{label}</span>
    </motion.button>
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className={`mt-8 mb-4 ${className}`}
    >
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 dark:from-emerald-900/20 dark:via-teal-900/20 dark:to-cyan-900/20 rounded-2xl border-2 border-emerald-200 dark:border-emerald-700/50 p-6">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-200/50 to-transparent dark:from-emerald-700/20 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-teal-200/50 to-transparent dark:from-teal-700/20 rounded-full translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative">
          {/* Header */}
          <div className="text-center mb-5">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-sm mb-3">
              <span className="text-2xl">💡</span>
              <span className="font-bold text-gray-800 dark:text-white">覺得有用？分享給朋友！</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              幫助更多人找到最適合的信用卡
            </p>
          </div>
          
          {/* Share Icons */}
          <div className="flex flex-wrap justify-center gap-3">
            <ShareIcon 
              onClick={() => handleShare('whatsapp')} 
              icon={<MessageCircle className="h-6 w-6 text-green-500" />}
              label="WhatsApp"
              bgColor="hover:bg-green-100 dark:hover:bg-green-900/30"
            />
            
            <ShareIcon 
              onClick={() => handleShare('wechat')} 
              icon={
                <svg className="h-6 w-6 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178A1.17 1.17 0 014.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178 1.17 1.17 0 01-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 01.598.082l1.584.926a.272.272 0 00.139.045c.133 0 .241-.108.241-.245 0-.06-.024-.12-.04-.177l-.325-1.233a.493.493 0 01.177-.554c1.524-1.12 2.503-2.783 2.503-4.617 0-3.37-3.247-6.127-7.062-6.126zm-3.173 2.96c.535 0 .969.44.969.983a.976.976 0 01-.969.983.976.976 0 01-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.983a.976.976 0 01-.969.983.976.976 0 01-.969-.983c0-.542.434-.982.97-.982z"/>
                </svg>
              }
              label="微信"
              bgColor="hover:bg-green-100 dark:hover:bg-green-900/30"
            />
            
            <ShareIcon 
              onClick={() => handleShare('telegram')} 
              icon={
                <svg className="h-6 w-6 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                </svg>
              }
              label="Telegram"
              bgColor="hover:bg-blue-100 dark:hover:bg-blue-900/30"
            />
            
            <ShareIcon 
              onClick={() => handleShare('facebook')} 
              icon={<Facebook className="h-6 w-6 text-blue-600" />}
              label="Facebook"
              bgColor="hover:bg-blue-100 dark:hover:bg-blue-900/30"
            />
            
            <ShareIcon 
              onClick={() => handleShare('copy')} 
              icon={copied ? <Check className="h-6 w-6 text-emerald-500" /> : <Copy className="h-6 w-6 text-gray-500" />}
              label={copied ? "已複製！" : "複製連結"}
              bgColor="hover:bg-gray-100 dark:hover:bg-gray-700"
            />
            
            {typeof navigator !== 'undefined' && 'share' in navigator && (
              <ShareIcon 
                onClick={() => handleShare('native')} 
                icon={<Share2 className="h-6 w-6 text-purple-500" />}
                label="更多"
                bgColor="hover:bg-purple-100 dark:hover:bg-purple-900/30"
              />
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

