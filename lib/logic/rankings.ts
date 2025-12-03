import { CreditCard, RewardRule } from "../types";
import { HK_CARDS } from "../data/cards";

export type RankingCategory = 
  | "dining" 
  | "online" 
  | "supermarket" 
  | "travel" 
  | "overseas" 
  | "mobile_payment"
  | "all_round";

export interface RankingResult {
  card: CreditCard;
  rule: RewardRule;
  percentage: number;
  cap?: number;
  capType?: string;
  minSpend?: number;
  monthlyMinSpend?: number;
  conditions: string[];
  paymentMethod?: string;
}

export interface CategoryConfig {
  id: RankingCategory;
  name: string;
  nameEn: string;
  icon: string;
  description: string;
  slug: string;
  matchCategories?: string[];
  matchType?: "category" | "base" | "paymentMethod" | "merchant";
  isForeignCurrency?: boolean;
  paymentMethods?: string[];
}

export const RANKING_CATEGORIES: CategoryConfig[] = [
  {
    id: "dining",
    name: "食飯",
    nameEn: "Dining",
    icon: "🍽️",
    description: "餐廳、食肆、外賣平台",
    slug: "best-dining-cards",
    matchCategories: ["dining"],
  },
  {
    id: "online",
    name: "網購",
    nameEn: "Online Shopping",
    icon: "💻",
    description: "本地及海外網上購物",
    slug: "best-online-shopping-cards",
    matchCategories: ["online"],
  },
  {
    id: "supermarket",
    name: "超市",
    nameEn: "Supermarket",
    icon: "🛒",
    description: "百佳、惠康、HKTVmall 等",
    slug: "best-supermarket-cards",
    matchCategories: ["supermarket"],
  },
  {
    id: "travel",
    name: "旅遊",
    nameEn: "Travel",
    icon: "✈️",
    description: "機票、酒店、旅遊平台",
    slug: "best-travel-cards",
    matchCategories: ["travel"],
  },
  {
    id: "overseas",
    name: "海外簽賬",
    nameEn: "Overseas",
    icon: "🌍",
    description: "外幣簽賬、海外消費",
    slug: "best-overseas-cards",
    isForeignCurrency: true,
  },
  {
    id: "mobile_payment",
    name: "流動支付",
    nameEn: "Mobile Payment",
    icon: "📱",
    description: "Apple Pay、Google Pay",
    slug: "best-mobile-payment-cards",
    matchType: "paymentMethod",
    paymentMethods: ["mobile", "apple_pay", "google_pay"],
  },
  {
    id: "all_round",
    name: "全能補底",
    nameEn: "All Round",
    icon: "💳",
    description: "基本回贈、無腦刷",
    slug: "best-all-round-cards",
    matchType: "base",
  },
];

function extractConditions(rule: RewardRule, card: CreditCard): string[] {
  const conditions: string[] = [];
  
  if (rule.minSpend) {
    conditions.push(`單筆滿 $${rule.minSpend.toLocaleString()}`);
  }
  
  if (rule.monthlyMinSpend) {
    conditions.push(`需月簽 $${rule.monthlyMinSpend.toLocaleString()}`);
  }
  
  if (rule.cap && rule.capType === "reward") {
    conditions.push(`每月回贈上限 $${rule.cap.toLocaleString()}`);
  }
  
  if (rule.cap && rule.capType === "spending") {
    conditions.push(`每月簽賬上限 $${rule.cap.toLocaleString()}`);
  }
  
  if (rule.validDays && rule.validDays.length > 0) {
    const dayNames = ["日", "一", "二", "三", "四", "五", "六"];
    const days = rule.validDays.map(d => `星期${dayNames[d]}`).join("/");
    conditions.push(`只限 ${days}`);
  }
  
  if (rule.validDates && rule.validDates.length > 0) {
    conditions.push(`每月 ${rule.validDates.join("/")} 號`);
  }
  
  if (rule.description.includes("[需登記]")) {
    conditions.push("需登記");
  }
  
  if (card.foreignCurrencyFee === 0) {
    conditions.push("免外幣手續費");
  } else if (card.foreignCurrencyFee && card.foreignCurrencyFee > 0) {
    conditions.push(`手續費 ${card.foreignCurrencyFee}%`);
  }
  
  return conditions;
}

function getCapDescription(rule: RewardRule): string | undefined {
  if (!rule.cap) return undefined;
  
  if (rule.capType === "reward") {
    return `每月 $${rule.cap.toLocaleString()} 回贈`;
  } else if (rule.capType === "spending") {
    return `每月 $${rule.cap.toLocaleString()} 簽賬`;
  }
  
  return `上限 ${rule.cap.toLocaleString()}`;
}

function matchesCategory(rule: RewardRule, category: CategoryConfig): boolean {
  // For overseas/foreign currency
  if (category.isForeignCurrency) {
    return rule.isForeignCurrency === true;
  }
  
  // For mobile payment
  if (category.matchType === "paymentMethod" && category.paymentMethods) {
    if (rule.matchType === "paymentMethod" && rule.matchValue) {
      const ruleValues = Array.isArray(rule.matchValue) ? rule.matchValue : [rule.matchValue];
      return ruleValues.some(v => category.paymentMethods!.includes(v));
    }
    return false;
  }
  
  // For all round (base rewards)
  if (category.matchType === "base") {
    return rule.matchType === "base" && !rule.isForeignCurrency;
  }
  
  // For category-based matching (dining, online, supermarket, travel)
  if (category.matchCategories && category.matchCategories.length > 0) {
    if (rule.matchType === "category") {
      const ruleCategories = Array.isArray(rule.matchValue) ? rule.matchValue : [rule.matchValue];
      return ruleCategories.some(cat => category.matchCategories!.includes(cat as string));
    }
  }
  
  return false;
}

export function getRankingsByCategory(
  categoryId: RankingCategory,
  limit: number = 10,
  cardsData: CreditCard[] = HK_CARDS
): RankingResult[] {
  const category = RANKING_CATEGORIES.find(c => c.id === categoryId);
  if (!category) return [];
  
  const results: RankingResult[] = [];
  
  // Filter out hidden cards
  const visibleCards = cardsData.filter(card => !card.hidden);
  
  for (const card of visibleCards) {
    let bestRule: RewardRule | null = null;
    let bestPercentage = 0;
    
    for (const rule of card.rules) {
      // Skip discount rules (we want rebates)
      if (rule.isDiscount) continue;
      
      if (matchesCategory(rule, category)) {
        // Calculate effective percentage
        let effectivePercentage = rule.percentage;
        
        // For overseas, consider FX fee
        if (category.isForeignCurrency && card.foreignCurrencyFee) {
          effectivePercentage -= card.foreignCurrencyFee;
        }
        
        if (effectivePercentage > bestPercentage) {
          bestPercentage = effectivePercentage;
          bestRule = rule;
        }
      }
    }
    
    if (bestRule && bestPercentage > 0) {
      results.push({
        card,
        rule: bestRule,
        percentage: bestRule.percentage, // Original percentage before FX fee
        cap: bestRule.cap,
        capType: bestRule.capType,
        minSpend: bestRule.minSpend,
        monthlyMinSpend: bestRule.monthlyMinSpend,
        conditions: extractConditions(bestRule, card),
      });
    }
  }
  
  // Sort by percentage (highest first)
  results.sort((a, b) => {
    // Primary sort: percentage
    if (b.percentage !== a.percentage) {
      return b.percentage - a.percentage;
    }
    // Secondary sort: higher cap is better (more room to earn)
    if (a.cap && b.cap) {
      return b.cap - a.cap;
    }
    // Cards without cap are better
    if (a.cap && !b.cap) return 1;
    if (!a.cap && b.cap) return -1;
    return 0;
  });
  
  return results.slice(0, limit);
}

export function getAllRankings(
  limit: number = 10,
  cardsData: CreditCard[] = HK_CARDS
): Record<RankingCategory, RankingResult[]> {
  const result: Partial<Record<RankingCategory, RankingResult[]>> = {};
  
  for (const category of RANKING_CATEGORIES) {
    result[category.id] = getRankingsByCategory(category.id, limit, cardsData);
  }
  
  return result as Record<RankingCategory, RankingResult[]>;
}

export function getCategoryBySlug(slug: string): CategoryConfig | undefined {
  return RANKING_CATEGORIES.find(c => c.slug === slug);
}

export function generateSuitableFor(result: RankingResult): string[] {
  const suitable: string[] = [];
  
  if (!result.minSpend && !result.monthlyMinSpend) {
    suitable.push("所有消費金額");
  }
  
  if (result.minSpend && result.minSpend >= 300) {
    suitable.push("單筆消費較高");
  }
  
  if (result.monthlyMinSpend && result.monthlyMinSpend >= 5000) {
    suitable.push("高消費用戶");
  } else if (!result.monthlyMinSpend) {
    suitable.push("低消費用戶友好");
  }
  
  if (result.cap && result.capType === "reward" && result.cap >= 500) {
    suitable.push("高回贈上限");
  }
  
  if (result.card.foreignCurrencyFee === 0) {
    suitable.push("海外消費");
  }
  
  if (result.card.annualFee === 0) {
    suitable.push("永久免年費");
  }
  
  return suitable;
}

export function generateWarnings(result: RankingResult): string[] {
  const warnings: string[] = [];
  
  if (result.minSpend) {
    warnings.push(`單筆需滿 $${result.minSpend.toLocaleString()} 才有回贈`);
  }
  
  if (result.monthlyMinSpend) {
    warnings.push(`需每月簽滿 $${result.monthlyMinSpend.toLocaleString()}`);
  }
  
  if (result.rule.description.includes("[需登記]")) {
    warnings.push("需要預先登記才享優惠");
  }
  
  if (result.rule.validDays || result.rule.validDates) {
    warnings.push("只限指定日子");
  }
  
  if (result.rule.excludePaymentMethods && result.rule.excludePaymentMethods.length > 0) {
    if (result.rule.excludePaymentMethods.includes("alipay") || 
        result.rule.excludePaymentMethods.includes("wechat_pay")) {
      warnings.push("電子錢包不適用");
    }
  }
  
  if (result.card.foreignCurrencyFee && result.card.foreignCurrencyFee > 0) {
    warnings.push(`外幣簽賬需付 ${result.card.foreignCurrencyFee}% 手續費`);
  }
  
  return warnings;
}

// Helper function to format cap as spending limit
export function formatCapAsSpendingLimit(result: RankingResult): string | undefined {
  if (!result.cap) return "無上限";
  
  if (result.capType === "reward") {
    // Convert reward cap to spending limit
    const spendingLimit = (result.cap / result.percentage) * 100;
    return `每月 $${Math.round(spendingLimit).toLocaleString()}`;
  } else if (result.capType === "spending") {
    return `每月 $${result.cap.toLocaleString()}`;
  }
  
  return undefined;
}

