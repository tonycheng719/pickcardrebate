"use client";

import { useState, useEffect } from "react";
import { CreditCard, PartnerOffer } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { useSettings } from "@/lib/store/settings-context";
import { trackPartnerApply } from "@/lib/analytics";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  Gift, ExternalLink, ChevronDown, ChevronUp, 
  AlertCircle, CheckCircle2, Clock, DollarSign,
  Sparkles, UserPlus, User
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ExistingCustomerOffer {
  bonusValue: number;
  bonusDescription: string;
  bonusItems?: string[];
  requirements?: string[];
}

interface PartnerOfferCardProps {
  card: CreditCard;
  bankWelcomeValue?: number; // 銀行迎新價值（港幣）
  isMilesCard?: boolean; // 是否為里數卡片（里數不應與港幣相加）
}

export function PartnerOfferCard({ card, bankWelcomeValue = 0, isMilesCard = false }: PartnerOfferCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [customerType, setCustomerType] = useState<"new" | "existing">("new");
  const [mounted, setMounted] = useState(false);
  const { getSetting } = useSettings();
  const offer = card.partnerOffer;
  const existingOffer = (offer as any)?.existingCustomerOffer as ExistingCustomerOffer | undefined;
  
  // Wait for client-side to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // 全局開關：partner_offers_enabled 必須為 "true" 才顯示
  const globalEnabled = getSetting("partner_offers_enabled") === "true";
  
  // 如果全局未啟用、或沒有 partnerOffer、或該卡未啟用，不顯示
  if (!globalEnabled || !offer || !offer.enabled) {
    return null;
  }
  
  // 檢查是否在有效期內 - only check on client side
  const validFrom = new Date(offer.validFrom);
  const validTo = new Date(offer.validTo);
  validTo.setHours(23, 59, 59, 999);
  
  // Only perform date check on client side to avoid hydration mismatch
  if (mounted) {
    const now = new Date();
    const isValid = now >= validFrom && now <= validTo;
    if (!isValid) {
      return null;
    }
  }
  
  // 計算總價值
  const hasExistingOffer = !!existingOffer;
  const currentBonusValue = customerType === "existing" && existingOffer 
    ? existingOffer.bonusValue 
    : offer.bonusValue;
  const currentBonusDescription = customerType === "existing" && existingOffer
    ? existingOffer.bonusDescription
    : offer.bonusDescription;
  const currentBonusItems = customerType === "existing" && existingOffer
    ? existingOffer.bonusItems
    : offer.bonusItems;
  const currentRequirements = customerType === "existing" && existingOffer
    ? existingOffer.requirements
    : offer.requirements;
  const totalValue = bankWelcomeValue + currentBonusValue;
  
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
            額外 +${currentBonusValue.toLocaleString()}
          </div>
        </div>
      </div>
      
      {/* Customer Type Tabs (only show if has different offers) */}
      {hasExistingOffer && (
        <div className="px-5 pt-4">
          <Tabs value={customerType} onValueChange={(v) => setCustomerType(v as any)} className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-amber-100 dark:bg-amber-900/30">
              <TabsTrigger 
                value="new" 
                className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 gap-2"
              >
                <UserPlus className="h-4 w-4" />
                全新客戶
              </TabsTrigger>
              <TabsTrigger 
                value="existing"
                className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 gap-2"
              >
                <User className="h-4 w-4" />
                現有客戶
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      )}
      
      {/* Main Content */}
      <div className="p-5">
        {/* Total Value Highlight */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4 border border-amber-200 dark:border-amber-700">
          <div className="text-center">
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
              {hasExistingOffer && (
                <span className="inline-flex items-center gap-1 mr-2 px-2 py-0.5 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-full text-xs">
                  {customerType === "new" ? <UserPlus className="h-3 w-3" /> : <User className="h-3 w-3" />}
                  {customerType === "new" ? "全新客戶" : "現有客戶"}
                </span>
              )}
              {isMilesCard ? (
                // 里數卡片：只顯示本網額外獎賞
                <>本網額外獎賞</>
              ) : bankWelcomeValue > 0 ? (
                // 現金回贈卡片且有銀行迎新：顯示合計
                <>銀行迎新 + 本網額外獎賞 最高可獲</>
              ) : (
                // 只有本網額外獎賞
                <>本網額外獎賞</>
              )}
            </div>
            <div className="text-3xl font-bold text-amber-600 dark:text-amber-400">
              <DollarSign className="inline h-7 w-7" />
              {isMilesCard ? currentBonusValue.toLocaleString() : totalValue.toLocaleString()}
            </div>
            {!isMilesCard && bankWelcomeValue > 0 && (
              <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                銀行迎新 ${bankWelcomeValue.toLocaleString()} + 額外獎賞 ${currentBonusValue.toLocaleString()}
              </div>
            )}
            {isMilesCard && (
              <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                💡 銀行迎新為里數，請參考上方卡片資訊
              </div>
            )}
          </div>
        </div>
        
        {/* Bonus Description */}
        <div className="mb-4">
          <h4 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
            <Gift className="h-5 w-5 text-amber-500" />
            額外獎賞內容
            {hasExistingOffer && (
              <span className="text-xs font-normal text-gray-500">
                ({customerType === "new" ? "全新客戶" : "現有客戶"})
              </span>
            )}
            {currentBonusItems && currentBonusItems.length > 1 && (
              <span className="text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30 px-2 py-0.5 rounded-full">
                {currentBonusItems.length}選1
              </span>
            )}
          </h4>
          
          {/* 如果有 bonusItems 就顯示 items，否則顯示 description */}
          {currentBonusItems && currentBonusItems.length > 0 ? (
            <ul className="space-y-2">
              {currentBonusItems.map((item, index) => (
                <li 
                  key={index}
                  className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"
                >
                  <span className="text-amber-500 mt-0.5">•</span>
                  <span>
                    {item}
                    {index < currentBonusItems.length - 1 && (
                      <span className="text-gray-400 dark:text-gray-500 ml-1">; or</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-700 dark:text-gray-300 font-medium">
              {currentBonusDescription}
            </p>
          )}
        </div>
        
        {/* Requirements */}
        {((offer.minSpend ?? 0) > 0 || (currentRequirements && currentRequirements.length > 0)) && (
          <div className="mb-4">
            <h4 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              申請要求
            </h4>
            <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
              {(offer.minSpend ?? 0) > 0 && customerType === "new" && (
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  批卡後 {offer.minSpendDays || 30} 日內簽賬滿 ${(offer.minSpend ?? 0).toLocaleString()}
                </li>
              )}
              {currentRequirements?.map((req, index) => (
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
          onClick={() => {
            // Track to GA4 & Meta Pixel
            trackPartnerApply({
              cardId: card.id,
              cardName: card.name,
              cardBank: card.bank,
              partnerUrl: offer.applyUrl,
              bonusValue: currentBonusValue,
            });
            
            // Track to backend for stats
            fetch('/api/stats/partner-click', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                cardId: card.id,
                cardName: card.name,
                customerType: hasExistingOffer ? customerType : 'new',
              }),
            }).catch(() => {}); // Silent fail
          }}
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

