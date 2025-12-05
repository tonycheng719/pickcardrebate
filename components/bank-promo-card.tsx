"use client";

import { useState } from "react";
import { BankPromo } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { 
  Gift, ExternalLink, ChevronDown, ChevronUp, 
  AlertCircle, Calendar, Target, Snowflake,
  CreditCard, Check
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface BankPromoCardProps {
  promo: BankPromo;
  cardBank?: string;
  isVisaCard?: boolean;
}

export function BankPromoCard({ promo, cardBank, isVisaCard = false }: BankPromoCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // 檢查是否在有效期內
  const now = new Date();
  const validFrom = new Date(promo.validFrom);
  const validTo = new Date(promo.validTo);
  const isValid = now >= validFrom && now <= validTo;
  
  if (!isValid) {
    return null;
  }
  
  // 計算剩餘天數
  const daysLeft = Math.ceil((validTo.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  
  return (
    <div className="bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 dark:from-sky-900/20 dark:via-blue-900/20 dark:to-indigo-900/20 rounded-2xl border-2 border-sky-200 dark:border-sky-700 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-sky-500 to-blue-600 text-white px-5 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Snowflake className="h-5 w-5" />
            <span className="font-bold">{promo.name}</span>
          </div>
          {isVisaCard && promo.visaExtraReward && (
            <div className="bg-white/20 backdrop-blur px-3 py-1 rounded-full text-sm font-bold">
              Visa 額外獎賞
            </div>
          )}
        </div>
      </div>
      
      {/* Main Content */}
      <div className="p-5">
        {/* Description & Period */}
        <div className="mb-4">
          <p className="text-gray-700 dark:text-gray-300">{promo.description}</p>
          <div className="flex items-center gap-2 mt-2 text-sm text-gray-500 dark:text-gray-400">
            <Calendar className="h-4 w-4" />
            <span>
              推廣期：{new Date(promo.validFrom).toLocaleDateString('zh-HK')} - {new Date(promo.validTo).toLocaleDateString('zh-HK')}
            </span>
            {daysLeft <= 30 && (
              <span className="ml-2 px-2 py-0.5 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full text-xs font-medium">
                剩餘 {daysLeft} 天
              </span>
            )}
          </div>
        </div>
        
        {/* Max Reward Highlight */}
        {promo.maxReward && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4 border border-sky-200 dark:border-sky-700">
            <div className="text-center">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                最高可獲獎賞
              </div>
              <div className="text-2xl font-bold text-sky-600 dark:text-sky-400">
                {promo.maxReward}
              </div>
              {isVisaCard && promo.visaExtraReward && (
                <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                  ✨ Visa 卡享額外獎賞
                </div>
              )}
            </div>
          </div>
        )}

        {/* Phases (分階段推廣) */}
        {promo.phases && promo.phases.length > 0 && (
          <div className="mb-4 space-y-3">
            <h4 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Target className="h-5 w-5 text-sky-500" />
              獎賞詳情
            </h4>
            {promo.phases.map((phase, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-800/50 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                <div className="text-sm font-medium text-sky-600 dark:text-sky-400 mb-2">
                  {phase.name}
                  <span className="text-gray-400 font-normal ml-2">
                    ({new Date(phase.startDate).toLocaleDateString('zh-HK')} - {new Date(phase.endDate).toLocaleDateString('zh-HK')})
                  </span>
                </div>
                <div className="space-y-2">
                  {phase.tiers.map((tier, tIdx) => (
                    <div key={tIdx} className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        簽賬滿 ${tier.minSpend.toLocaleString()}
                      </span>
                      <div className="text-right">
                        <span className="font-medium text-gray-900 dark:text-white">
                          {tier.reward}
                        </span>
                        {isVisaCard && tier.extraReward && (
                          <span className="ml-2 text-blue-600 dark:text-blue-400">
                            +{tier.extraReward}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Single Tier (單一階段) */}
        {promo.tiers && promo.tiers.length > 0 && !promo.phases && (
          <div className="mb-4">
            <h4 className="font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-2">
              <Target className="h-5 w-5 text-sky-500" />
              簽賬獎賞
            </h4>
            <div className="bg-white dark:bg-gray-800/50 rounded-lg p-3 border border-gray-200 dark:border-gray-700 space-y-2">
              {promo.tiers.map((tier, idx) => (
                <div key={idx} className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    簽賬滿 ${tier.minSpend.toLocaleString()}
                  </span>
                  <div className="text-right">
                    <span className="font-medium text-gray-900 dark:text-white">
                      {tier.reward}
                    </span>
                    {isVisaCard && tier.extraReward && (
                      <span className="ml-2 text-blue-600 dark:text-blue-400">
                        +{tier.extraReward}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bonus Tiers */}
        {promo.bonusTiers && promo.bonusTiers.length > 0 && (
          <div className="mb-4">
            <h4 className="font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-2">
              <Gift className="h-5 w-5 text-amber-500" />
              額外獎賞
            </h4>
            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-3 border border-amber-200 dark:border-amber-700 space-y-2">
              {promo.bonusTiers.map((tier, idx) => (
                <div key={idx} className="text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      {tier.minSpend > 0 ? `簽賬滿 $${tier.minSpend.toLocaleString()}` : '達成獎賞一'}
                    </span>
                    <div className="text-right">
                      <span className="font-medium text-amber-700 dark:text-amber-300">
                        {tier.reward}
                      </span>
                      {isVisaCard && tier.extraReward && (
                        <span className="ml-2 text-blue-600 dark:text-blue-400">
                          +{tier.extraReward}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Registration Button */}
        {promo.registrationUrl && (
          <a 
            href={promo.registrationUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="block mb-4"
          >
            <Button 
              className="w-full h-11 font-bold bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white rounded-xl"
              size="lg"
            >
              立即登記參加
              <ExternalLink className="h-4 w-4 ml-2" />
            </Button>
          </a>
        )}
        
        {/* Expandable Details */}
        <div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-between w-full text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          >
            <span className="flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              參與要求及條款
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
                  {/* Requirements */}
                  {promo.requirements && promo.requirements.length > 0 && (
                    <div>
                      <h5 className="font-bold text-gray-700 dark:text-gray-300 mb-2">✅ 參與要求</h5>
                      <ul className="space-y-1">
                        {promo.requirements.map((req, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <Check className="h-3 w-3 mt-0.5 text-green-500 flex-shrink-0" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {/* Exclusions */}
                  {promo.exclusions && promo.exclusions.length > 0 && (
                    <div>
                      <h5 className="font-bold text-gray-700 dark:text-gray-300 mb-2">❌ 不合資格簽賬</h5>
                      <ul className="space-y-1">
                        {promo.exclusions.map((exc, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-red-500">•</span>
                            {exc}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {/* Notes */}
                  {promo.notes && (
                    <div>
                      <h5 className="font-bold text-gray-700 dark:text-gray-300 mb-2">📝 備註</h5>
                      <p>{promo.notes}</p>
                    </div>
                  )}
                  
                  {/* Terms Link */}
                  {promo.termsUrl && (
                    <a 
                      href={promo.termsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sky-600 dark:text-sky-400 hover:underline"
                    >
                      查看完整條款及細則 <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

