"use client";

import { CreditCard, RewardRule } from "@/lib/types";
import { Info, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface RewardBreakdownProps {
  card: CreditCard;
  matchedRule: RewardRule;
  percentage: number;
  rewardAmount: number;
  isForeignCurrency?: boolean;
  fxFee?: number;
  netPercentage?: number;
  netRewardAmount?: number;
  compact?: boolean; // For tight spaces
  showToggle?: boolean; // Allow expand/collapse
}

// Helper to get base rate from card rules
function getBaseRate(card: CreditCard): number {
  // Find the basic rate rule (matchType: "base" without isForeignCurrency)
  const baseRule = card.rules.find(
    (r) => r.matchType === "base" && !r.isForeignCurrency && r.description.includes("基本")
  );
  return baseRule?.percentage || 0.4; // Default 0.4% if not found
}

// Helper to extract extra rate source from rule description
function getExtraSource(rule: RewardRule): string {
  // Extract meaningful part from description
  // e.g. "最紅自主獎賞 9X (3.6%) [需登記]" → "最紅自主獎賞 [需登記]"
  // e.g. "網上簽賬 4% (每月首$10,000)" → "網上簽賬"
  const desc = rule.description;
  
  // Remove percentage and brackets content for cleaner display
  let cleaned = desc
    .replace(/\s*\d+(\.\d+)?%/g, "") // Remove percentages
    .replace(/\s*\(\d+X\)/g, "") // Remove (9X) style
    .replace(/\s*\(每月首\$[\d,]+\)/g, "") // Remove cap info
    .replace(/\s*\(首\$[\d,]+\)/g, "")
    .trim();
  
  return cleaned || desc;
}

export function RewardBreakdown({
  card,
  matchedRule,
  percentage,
  rewardAmount,
  isForeignCurrency = false,
  fxFee,
  netPercentage,
  netRewardAmount,
  compact = false,
  showToggle = true,
}: RewardBreakdownProps) {
  const [isExpanded, setIsExpanded] = useState(!compact);
  
  const baseRate = getBaseRate(card);
  const extraRate = percentage - baseRate;
  const extraSource = getExtraSource(matchedRule);
  
  // Determine if we should show breakdown
  const hasExtraRate = extraRate > 0.01; // Avoid floating point issues
  const shouldShowFxBreakdown = isForeignCurrency && fxFee && netPercentage !== undefined;
  
  // Compact view - just show the result with a hint
  if (compact && !isExpanded) {
    return (
      <div 
        className="flex items-center gap-1 text-xs text-gray-500 cursor-pointer hover:text-gray-700"
        onClick={() => showToggle && setIsExpanded(true)}
      >
        <Info className="w-3 h-3" />
        <span>{shouldShowFxBreakdown ? "淨回贈計算" : "回贈組成"}</span>
        {showToggle && <ChevronDown className="w-3 h-3" />}
      </div>
    );
  }
  
  return (
    <div className="text-xs bg-gray-50 dark:bg-gray-800 rounded-lg p-2.5 space-y-1">
      {/* Toggle header for compact mode */}
      {compact && showToggle && (
        <div 
          className="flex items-center justify-between cursor-pointer text-gray-500 hover:text-gray-700 mb-1.5"
          onClick={() => setIsExpanded(false)}
        >
          <span className="font-medium">回贈明細</span>
          <ChevronUp className="w-3 h-3" />
        </div>
      )}
      
      {shouldShowFxBreakdown ? (
        /* === 海外/外幣簽賬：顯示淨回贈 === */
        <>
          <div className="flex justify-between items-center text-gray-600 dark:text-gray-400">
            <span>總回贈</span>
            <span>{percentage.toFixed(1)}%</span>
          </div>
          <div className="flex justify-between items-center text-red-500">
            <span>外幣手續費</span>
            <span>-{fxFee}%</span>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 pt-1 mt-1">
            <div className="flex justify-between items-center font-medium text-emerald-600 dark:text-emerald-400">
              <span>淨回贈</span>
              <span>{netPercentage?.toFixed(2)}%</span>
            </div>
            {netRewardAmount !== undefined && (
              <div className="flex justify-between items-center text-gray-500 mt-0.5">
                <span>淨回贈金額</span>
                <span>≈ ${netRewardAmount.toFixed(2)}</span>
              </div>
            )}
          </div>
          {fxFee === 0 && (
            <div className="text-green-600 dark:text-green-400 text-[10px] mt-1">
              ✓ 此卡免外幣手續費
            </div>
          )}
        </>
      ) : hasExtraRate ? (
        /* === 本地簽賬：顯示基本 + 額外 === */
        <>
          <div className="flex justify-between items-center text-gray-600 dark:text-gray-400">
            <span>基本回贈</span>
            <span>{baseRate.toFixed(1)}%</span>
          </div>
          <div className="flex justify-between items-start text-gray-600 dark:text-gray-400">
            <div className="flex-1 min-w-0 pr-2">
              <span>額外回贈</span>
              <div className="text-[10px] text-blue-500 mt-0.5 leading-tight">
                {extraSource}
              </div>
            </div>
            <span className="text-blue-600 shrink-0">+{extraRate.toFixed(1)}%</span>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 pt-1 mt-1">
            <div className="flex justify-between items-center font-medium text-emerald-600 dark:text-emerald-400">
              <span>總回贈</span>
              <span>{percentage.toFixed(1)}%</span>
            </div>
            <div className="flex justify-between items-center text-gray-500 mt-0.5">
              <span>回贈金額</span>
              <span>≈ ${rewardAmount.toFixed(2)}</span>
            </div>
          </div>
        </>
      ) : (
        /* === 只有基本回贈 === */
        <>
          <div className="flex justify-between items-center text-gray-600 dark:text-gray-400">
            <span>基本回贈</span>
            <span>{percentage.toFixed(1)}%</span>
          </div>
          <div className="flex justify-between items-center text-gray-500 mt-0.5">
            <span>回贈金額</span>
            <span>≈ ${rewardAmount.toFixed(2)}</span>
          </div>
        </>
      )}
      
      {/* Rule conditions hint */}
      {matchedRule.monthlyMinSpend && (
        <div className="text-[10px] text-amber-600 dark:text-amber-400 mt-1.5 flex items-center gap-1">
          <Info className="w-3 h-3" />
          需月簽 ${matchedRule.monthlyMinSpend.toLocaleString()}
        </div>
      )}
      {matchedRule.minSpend && (
        <div className="text-[10px] text-amber-600 dark:text-amber-400 mt-1 flex items-center gap-1">
          <Info className="w-3 h-3" />
          單筆滿 ${matchedRule.minSpend.toLocaleString()}
        </div>
      )}
      {matchedRule.cap && (
        <div className="text-[10px] text-gray-500 mt-1 flex items-center gap-1">
          <Info className="w-3 h-3" />
          {matchedRule.capType === "reward" 
            ? `上限回贈 $${matchedRule.cap.toLocaleString()}`
            : `上限簽賬 $${matchedRule.cap.toLocaleString()}`
          }
        </div>
      )}
    </div>
  );
}

// Inline version for tight spaces (e.g., card list items)
export function RewardBreakdownInline({
  card,
  matchedRule,
  percentage,
  isForeignCurrency = false,
  fxFee,
  netPercentage,
}: Omit<RewardBreakdownProps, 'rewardAmount' | 'compact' | 'showToggle'>) {
  const baseRate = getBaseRate(card);
  const extraRate = percentage - baseRate;
  const hasExtraRate = extraRate > 0.01;
  const shouldShowFxBreakdown = isForeignCurrency && fxFee !== undefined && netPercentage !== undefined;
  
  if (shouldShowFxBreakdown) {
    return (
      <span className="text-[10px] text-gray-500">
        {percentage.toFixed(1)}% - {fxFee}% 手續費 = <span className="text-emerald-600 font-medium">{netPercentage.toFixed(2)}%</span>
      </span>
    );
  }
  
  if (hasExtraRate) {
    return (
      <span className="text-[10px] text-gray-500">
        {baseRate.toFixed(1)}% 基本 + <span className="text-blue-600">{extraRate.toFixed(1)}%</span> 額外
      </span>
    );
  }
  
  return null; // No breakdown needed for base rate only
}

