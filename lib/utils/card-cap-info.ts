/**
 * 卡片上限資訊工具
 * 
 * 從卡片 rules 中提取簽賬上限、簽賬下限、回贈上限資訊
 * 當條款更新時會自動反映最新資訊
 */

import { CreditCard, RewardRule } from '@/lib/types';
import { getCardTerms, formatPeriod } from '@/lib/data/card-terms';

export interface CapInfo {
  // 回贈上限
  rewardCap?: {
    amount: number;
    period: string;  // "月" | "季" | "半年" | "年" | "推廣期"
    isShared?: boolean;  // 多個類別共用
    note?: string;
  };
  
  // 簽賬上限（最高回贈對應的簽賬金額）
  spendingCap?: {
    amount: number;
    period: string;
    perCategory?: {  // 每個類別的簽賬上限
      category: string;
      amount: number;
      rate: number;
    }[];
  };
  
  // 簽賬下限/門檻
  minSpend?: {
    amount: number;
    period: string;
    type?: string;  // "總簽賬" | "實體店" | "非網上" | "指定類別"
    note?: string;
  };
  
  // 是否有「門檻高過上限」問題
  hasMinSpendIssue?: boolean;
  minSpendIssueNote?: string;
  
  // 推廣期
  promoEndDate?: string;
  daysUntilExpiry?: number;
}

/**
 * 從卡片 rules 中提取上限資訊
 */
export function getCardCapInfo(card: CreditCard): CapInfo {
  const info: CapInfo = {};
  
  // 先嘗試從 card-terms.ts 獲取（最準確）
  const terms = getCardTerms(card.id);
  
  if (terms) {
    // 使用 terms 資料
    if (terms.rewardCap) {
      info.rewardCap = {
        amount: terms.rewardCap.amount,
        period: formatPeriod(terms.rewardCap.period),
        note: terms.rewardCap.note,
      };
    }
    
    if (terms.spendingCap) {
      info.spendingCap = {
        amount: terms.spendingCap.amount,
        period: formatPeriod(terms.spendingCap.period),
      };
    }
    
    if (terms.minSpend) {
      info.minSpend = {
        amount: terms.minSpend.amount,
        period: formatPeriod(terms.minSpend.period),
        type: terms.minSpend.type === "physical" ? "實體店" : 
              terms.minSpend.type === "category" ? "指定類別" : "總簽賬",
        note: terms.minSpend.note,
      };
    }
    
    // 檢查門檻高過上限問題
    if (terms.minSpend && terms.spendingCap) {
      if (terms.minSpend.amount > terms.spendingCap.amount) {
        info.hasMinSpendIssue = true;
        const diff = terms.minSpend.amount - terms.spendingCap.amount;
        info.minSpendIssueNote = `需簽滿 $${terms.minSpend.amount.toLocaleString()} 先有高回贈，但回贈上限喺 $${terms.spendingCap.amount.toLocaleString()} 已爆 Cap（差額 $${diff.toLocaleString()} 只有基本回贈）`;
      }
    }
    
    // 推廣期
    if (terms.promoEndDate) {
      info.promoEndDate = terms.promoEndDate;
      const endDate = new Date(terms.promoEndDate);
      const today = new Date();
      const diffTime = endDate.getTime() - today.getTime();
      info.daysUntilExpiry = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
    
    return info;
  }
  
  // Fallback: 從 rules 中提取（排除折扣規則）
  const rulesWithCap = card.rules.filter(r => r.cap !== undefined && !r.isDiscount);
  
  if (rulesWithCap.length > 0) {
    // 分開處理簽賬上限和回贈上限
    const rewardCapRules = rulesWithCap.filter(r => r.capType === 'reward');
    const spendingCapRules = rulesWithCap.filter(r => r.capType === 'spending');
    
    // 優先處理 spendingCapRules（簽賬上限）- 這是更常見的情況
    if (spendingCapRules.length > 0) {
      // 找出最高回贈率的規則（這是用戶最關心的）
      const highestRateRule = spendingCapRules.reduce((max, r) => 
        r.percentage > max.percentage ? r : max
      );
      
      const maxSpendingCap = highestRateRule.cap!;
      info.spendingCap = {
        amount: maxSpendingCap,
        period: "月",
      };
      
      // 計算回贈上限 = 簽賬上限 × 回贈率
      const calculatedRewardCap = Math.round(maxSpendingCap * (highestRateRule.percentage / 100));
      info.rewardCap = {
        amount: calculatedRewardCap,
        period: "月",
        isShared: spendingCapRules.some(r => r.shareCapWith),
      };
    } else if (rewardCapRules.length > 0) {
      // 如果只有回贈上限（capType: 'reward'）
      // 找出最高回贈率的規則
      const highestRateRule = rewardCapRules.reduce((max, r) => 
        r.percentage > max.percentage ? r : max
      );
      
      const maxRewardCap = highestRateRule.cap!;
      const sharedCap = rewardCapRules.some(r => r.shareCapWith);
      
      info.rewardCap = {
        amount: maxRewardCap,
        period: "月",
        isShared: sharedCap,
      };
      
      // 計算對應的簽賬上限（使用最高回贈率）
      const spendingCapAmount = Math.round(maxRewardCap / (highestRateRule.percentage / 100));
      
      info.spendingCap = {
        amount: spendingCapAmount,
        period: "月",
      };
    }
    
    // 簽賬門檻（排除折扣規則）
    const minSpendRules = card.rules.filter(r => r.monthlyMinSpend !== undefined && !r.isDiscount);
    if (minSpendRules.length > 0) {
      const maxMinSpend = Math.max(...minSpendRules.map(r => r.monthlyMinSpend!));
      const minSpendRule = minSpendRules.find(r => r.monthlyMinSpend === maxMinSpend);
      
      info.minSpend = {
        amount: maxMinSpend,
        period: "月",
        type: minSpendRule?.isPhysicalStore ? "實體店" : "總簽賬",
      };
      
      // 檢查門檻高過上限
      if (info.spendingCap && maxMinSpend > info.spendingCap.amount) {
        info.hasMinSpendIssue = true;
        const diff = maxMinSpend - info.spendingCap.amount;
        info.minSpendIssueNote = `需簽滿 $${maxMinSpend.toLocaleString()} 先有高回贈，但回贈上限喺 $${info.spendingCap.amount.toLocaleString()} 已爆 Cap（差額 $${diff.toLocaleString()} 只有基本回贈）`;
      }
    }
  }
  
  // 推廣期（從 card 或 rules）
  if (card.promoEndDate) {
    info.promoEndDate = card.promoEndDate;
    const endDate = new Date(card.promoEndDate);
    const today = new Date();
    const diffTime = endDate.getTime() - today.getTime();
    info.daysUntilExpiry = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
  
  return info;
}

/**
 * 格式化上限資訊為顯示文字
 */
export function formatCapInfo(info: CapInfo): {
  rewardCapText?: string;
  spendingCapText?: string;
  minSpendText?: string;
  promoText?: string;
  warningText?: string;
} {
  const result: {
    rewardCapText?: string;
    spendingCapText?: string;
    minSpendText?: string;
    promoText?: string;
    warningText?: string;
  } = {};
  
  if (info.rewardCap) {
    result.rewardCapText = `$${info.rewardCap.amount.toLocaleString()}/${info.rewardCap.period}`;
    if (info.rewardCap.isShared) {
      result.rewardCapText += "（共用）";
    }
  }
  
  if (info.spendingCap) {
    result.spendingCapText = `$${info.spendingCap.amount.toLocaleString()}/${info.spendingCap.period}`;
  }
  
  if (info.minSpend) {
    result.minSpendText = `$${info.minSpend.amount.toLocaleString()}/${info.minSpend.period}`;
    if (info.minSpend.type && info.minSpend.type !== "總簽賬") {
      result.minSpendText += `（${info.minSpend.type}）`;
    }
  }
  
  if (info.promoEndDate) {
    const endDate = new Date(info.promoEndDate);
    result.promoText = `至 ${endDate.getFullYear()}/${(endDate.getMonth() + 1).toString().padStart(2, '0')}/${endDate.getDate().toString().padStart(2, '0')}`;
    
    if (info.daysUntilExpiry !== undefined) {
      if (info.daysUntilExpiry <= 0) {
        result.promoText += "（已過期）";
      } else if (info.daysUntilExpiry <= 7) {
        result.promoText += `（剩餘 ${info.daysUntilExpiry} 天）`;
      } else if (info.daysUntilExpiry <= 30) {
        result.promoText += `（剩餘 ${info.daysUntilExpiry} 天）`;
      }
    }
  }
  
  if (info.hasMinSpendIssue && info.minSpendIssueNote) {
    result.warningText = info.minSpendIssueNote;
  }
  
  return result;
}

