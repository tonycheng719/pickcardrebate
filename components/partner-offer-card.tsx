"use client";

import { useState } from "react";
import { CreditCard, PartnerOffer } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { useSettings } from "@/lib/store/settings-context";
import { 
  Gift, ExternalLink, ChevronDown, ChevronUp, 
  AlertCircle, CheckCircle2, Clock, DollarSign,
  Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PartnerOfferCardProps {
  card: CreditCard;
  bankWelcomeValue?: number; // 銀行迎新價值（港幣）
}

export function PartnerOfferCard({ card, bankWelcomeValue = 0 }: PartnerOfferCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { getSetting } = useSettings();
  const offer = card.partnerOffer;
  
  // 全局開關：partner_offers_enabled 必須為 "true" 才顯示
  const globalEnabled = getSetting("partner_offers_enabled") === "true";
  
  // 如果全局未啟用、或沒有 partnerOffer、或該卡未啟用，不顯示
  if (!globalEnabled || !offer || !offer.enabled) {
    return null;
  }
  
  // 檢查是否在有效期內
  const now = new Date();
  const validFrom = new Date(offer.validFrom);
  const validTo = new Date(offer.validTo);
  const isValid = now >= validFrom && now <= validTo;
  
  if (!isValid) {
    return null;
  }
  
  // 計算總價值
  const totalValue = bankWelcomeValue + offer.bonusValue;
  
  // 換領須知
  const redemptionNotes = [
    "必須透過本網指定連結申請。",
    "強烈建議使用 Chrome 瀏覽器申請，並確保沒有封鎖追蹤、Cookie，沒有使用無痕模式，並已關閉 AdBlock。",
    "申請後7日內必須填寫電郵內的換領表格。換領通知最快將於申請後的4個月內發出。",
  ];
  
  // 免責聲明
  const disclaimer = "額外迎新禮品由合作夥伴送出及安排換領，受條款及細則約束。所有經本網成功申請紀錄以有關金融機構提供資料為準。若有關金融機構未能成功確認客戶為經本網申請、或未符合相關要求，或申請人於獎賞換領表格（如適用）輸入錯誤資料，將不可獲得額外獎賞。";
  
  return (
    <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-amber-900/20 dark:via-orange-900/20 dark:to-yellow-900/20 rounded-2xl border-2 border-amber-200 dark:border-amber-700 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-5 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            <span className="font-bold">經本網指定連結申請額外獎賞</span>
          </div>
          <div className="bg-white/20 backdrop-blur px-3 py-1 rounded-full text-sm font-bold">
            額外 +${offer.bonusValue.toLocaleString()}
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="p-5">
        {/* Total Value Highlight */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4 border border-amber-200 dark:border-amber-700">
          <div className="text-center">
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
              銀行迎新 + 本網額外獎賞 總價值
            </div>
            <div className="text-3xl font-bold text-amber-600 dark:text-amber-400">
              <DollarSign className="inline h-7 w-7" />
              {totalValue.toLocaleString()}
            </div>
            <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
              銀行迎新 ${bankWelcomeValue.toLocaleString()} + 額外獎賞 ${offer.bonusValue.toLocaleString()}
            </div>
          </div>
        </div>
        
        {/* Bonus Description */}
        <div className="mb-4">
          <h4 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
            <Gift className="h-5 w-5 text-amber-500" />
            額外獎賞內容
          </h4>
          <p className="text-gray-700 dark:text-gray-300 font-medium">
            {offer.bonusDescription}
          </p>
          
          {/* Bonus Items if available */}
          {offer.bonusItems && offer.bonusItems.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {offer.bonusItems.map((item, index) => (
                <span 
                  key={index}
                  className="inline-flex items-center px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-full text-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          )}
        </div>
        
        {/* Requirements */}
        {(offer.minSpend || offer.requirements) && (
          <div className="mb-4">
            <h4 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              申請要求
            </h4>
            <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
              {offer.minSpend && (
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  批卡後 {offer.minSpendDays || 30} 日內簽賬滿 ${offer.minSpend.toLocaleString()}
                </li>
              )}
              {offer.requirements?.map((req, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  {req}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Valid Period */}
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
          <Clock className="h-4 w-4" />
          <span>
            優惠期：{new Date(offer.validFrom).toLocaleDateString('zh-HK')} - {new Date(offer.validTo).toLocaleDateString('zh-HK')}
          </span>
        </div>
        
        {/* Apply Button */}
        <a 
          href={offer.applyUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="block"
        >
          <Button 
            className="w-full h-12 text-base font-bold bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl shadow-lg shadow-amber-200 dark:shadow-amber-900/30"
            size="lg"
          >
            立即申請賺取額外獎賞
            <ExternalLink className="h-4 w-4 ml-2" />
          </Button>
        </a>
        
        {/* Expandable Notes Section */}
        <div className="mt-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-between w-full text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          >
            <span className="flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              換領須知及條款
            </span>
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
          
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="mt-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl text-xs text-gray-500 dark:text-gray-400 space-y-3">
                  {/* Redemption Notes */}
                  <div>
                    <h5 className="font-bold text-gray-700 dark:text-gray-300 mb-2">📋 換領須知</h5>
                    <ul className="space-y-1">
                      {redemptionNotes.map((note, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-amber-500">{index + 1}.</span>
                          {note}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Additional Notes */}
                  {offer.notes && (
                    <div>
                      <h5 className="font-bold text-gray-700 dark:text-gray-300 mb-2">📝 其他備註</h5>
                      <p>{offer.notes}</p>
                    </div>
                  )}
                  
                  {/* Disclaimer */}
                  <div className="border-t dark:border-gray-700 pt-3">
                    <p className="text-[10px] leading-relaxed text-gray-400 dark:text-gray-500">
                      *{disclaimer}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

