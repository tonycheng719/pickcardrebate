/**
 * 卡片上限資訊工具
 * 
 * 從卡片 rules 中提取簽賬上限、簽賬下限、回贈上限資訊
 * 當條款更新時會自動反映最新資訊
 */

import { CreditCard, RewardRule } from '@/lib/types';
import { getCardTerms, formatPeriod } from '@/lib/data/card-terms';

/**
 * 分類上限（單個類別的上限資訊）
 */
export interface CategoryCap {
  category: string;      // 類別名稱（從 description 提取）
  rate: number;          // 回贈率
  rewardCap: number;     // 回贈上限
  spendingCap: number;   // 簽賬上限
  period: string;        // "月" | "推廣期"
  isPromo?: boolean;     // 是否推廣期優惠
  promoEndDate?: string; // 推廣期結束日期
  note?: string;         // 備註（如：累積$10,000、單筆≥$500）
}

export interface CapInfo {
  // 回贈上限（保留向後兼容）
  rewardCap?: {
    amount: number;
    period: string;  // "月" | "季" | "半年" | "年" | "推廣期"
    isShared?: boolean;  // 多個類別共用
    note?: string;
  };
  
  // 簽賬上限（保留向後兼容）
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
  
  // 新增：分類上限（分開顯示）
  regularCaps?: CategoryCap[];     // 常規優惠
  promoCaps?: CategoryCap[];       // 推廣期優惠
  totalRegularRewardCap?: number;  // 常規合計回贈上限
  totalPromoRewardCap?: number;    // 推廣期合計回贈上限
}

/**
 * 從 rule.description 提取簡短類別名稱
 */
function extractCategoryName(description: string): string {
  // 移除前綴符號
  let name = description.replace(/^[🔥⚡💥🎁✨]+\s*/, '');
  
  // 移除方括號內容但保留關鍵資訊
  const bracketMatch = name.match(/\[(.+?)\]/);
  const bracketInfo = bracketMatch ? bracketMatch[1] : '';
  name = name.replace(/\s*\[.+?\]/g, '');
  
  // 截取主要類別名稱（取第一個空格或百分比之前的部分）
  const mainName = name.split(/\s+\d+%|\s+\(|$/)[0].trim();
  
  return mainName || name;
}

/**
 * 從 rule 提取備註資訊
 */
function extractNoteFromRule(rule: RewardRule): string | undefined {
  const notes: string[] = [];
  
  // 單筆最低消費
  if (rule.minSpend) {
    notes.push(`單筆≥$${rule.minSpend.toLocaleString()}`);
  }
  
  // 月簽要求
  if (rule.monthlyMinSpend) {
    notes.push(`月簽$${rule.monthlyMinSpend.toLocaleString()}`);
  }
  
  // 需登記
  if (rule.requiresRegistration) {
    notes.push('需登記');
  }
  
  // 從 description 提取方括號內的資訊
  const bracketMatch = rule.description.match(/\[(.+?)\]/);
  if (bracketMatch) {
    const bracketContent = bracketMatch[1];
    // 排除已經處理過的資訊
    if (!bracketContent.includes('月簽') && 
        !bracketContent.includes('單筆') &&
        !bracketContent.includes('需登記')) {
      // 提取有用的資訊如 "累積$10,000"
      if (bracketContent.includes('累積')) {
        notes.push(bracketContent);
      }
    }
  }
  
  return notes.length > 0 ? notes.join(', ') : undefined;
}

/**
 * 從卡片 rules 中提取上限資訊
 */
export function getCardCapInfo(card: CreditCard): CapInfo {
  const info: CapInfo = {};
  const today = new Date();
  
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
      const diffTime = endDate.getTime() - today.getTime();
      info.daysUntilExpiry = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
  }
  
  // 從 rules 中提取分類上限（排除折扣規則）
  const rulesWithCap = card.rules.filter(r => r.cap !== undefined && !r.isDiscount);
  
  if (rulesWithCap.length > 0) {
    const regularCaps: CategoryCap[] = [];
    const promoCaps: CategoryCap[] = [];
    
    for (const rule of rulesWithCap) {
      // 判斷是否為推廣期優惠
      let isPromo = false;
      let promoEndDate: string | undefined;
      
      if (rule.validDateRange) {
        const endDate = new Date(rule.validDateRange.end);
        isPromo = true;
        promoEndDate = rule.validDateRange.end;
        
        // 如果已過期，跳過
        if (endDate < today) continue;
      }
      
      // 計算簽賬上限和回贈上限
      let rewardCap: number;
      let spendingCap: number;
      
      if (rule.capType === 'spending') {
        spendingCap = rule.cap!;
        rewardCap = Math.round(spendingCap * (rule.percentage / 100));
      } else {
        // capType === 'reward' 或未指定
        rewardCap = rule.cap!;
        spendingCap = Math.round(rewardCap / (rule.percentage / 100));
      }
      
      const cap: CategoryCap = {
        category: extractCategoryName(rule.description),
        rate: rule.percentage,
        rewardCap,
        spendingCap,
        period: isPromo ? '推廣期' : '月',
        isPromo,
        promoEndDate,
        note: extractNoteFromRule(rule),
      };
      
      if (isPromo) {
        promoCaps.push(cap);
      } else {
        regularCaps.push(cap);
      }
    }
    
    // 按回贈率排序（高到低）
    regularCaps.sort((a, b) => b.rate - a.rate);
    promoCaps.sort((a, b) => b.rate - a.rate);
    
    if (regularCaps.length > 0) {
      info.regularCaps = regularCaps;
      info.totalRegularRewardCap = regularCaps.reduce((sum, c) => sum + c.rewardCap, 0);
    }
    
    if (promoCaps.length > 0) {
      info.promoCaps = promoCaps;
      info.totalPromoRewardCap = promoCaps.reduce((sum, c) => sum + c.rewardCap, 0);
    }
    
    // 向後兼容：設置總上限（如果 terms 沒有提供）
    if (!info.rewardCap && (regularCaps.length > 0 || promoCaps.length > 0)) {
      const allCaps = [...regularCaps, ...promoCaps];
      const totalRewardCap = allCaps.reduce((sum, c) => sum + c.rewardCap, 0);
      
      // 找出最高回贈率的規則
      const highestRateCap = allCaps.reduce((max, c) => 
        c.rate > max.rate ? c : max
      );
      
      info.rewardCap = {
        amount: totalRewardCap,
        period: "月",
      };
      
      info.spendingCap = {
        amount: highestRateCap.spendingCap,
        period: highestRateCap.period,
      };
    }
    
    // 簽賬門檻（排除折扣規則）
    const minSpendRules = card.rules.filter(r => r.monthlyMinSpend !== undefined && !r.isDiscount);
    if (minSpendRules.length > 0 && !info.minSpend) {
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
  if (card.promoEndDate && !info.promoEndDate) {
    info.promoEndDate = card.promoEndDate;
    const endDate = new Date(card.promoEndDate);
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
