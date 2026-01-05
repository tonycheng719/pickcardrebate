import { CreditCard, RewardRule } from "../types";
import { HK_CARDS } from "../data/cards";

export type RankingCategory = 
  | "dining" 
  | "online"
  | "hkd_online"
  | "foreign_online" 
  | "supermarket" 
  | "travel" 
  | "overseas" 
  | "mobile_payment"
  | "miles"
  | "all_round";

export interface RankingResult {
  card: CreditCard;
  rule: RewardRule;
  percentage: number;
  netPercentage?: number; // After FX fee deduction
  foreignCurrencyFee?: number;
  cap?: number;
  capType?: string;
  capAsSpending?: number; // Cap converted to spending limit
  minSpend?: number;
  monthlyMinSpend?: number;
  conditions: string[];
  paymentMethod?: string;
  dollarsPerMile?: number; // For miles cards: HKD per mile
  milesProgram?: string; // Asia Miles, Avios, etc.
}

export interface CategoryConfig {
  id: RankingCategory;
  name: string;
  nameEn: string;
  icon: string;
  description: string;
  slug: string;
  discoverUrl?: string; // Link to discover article instead of blog
  matchCategories?: string[];
  matchType?: "category" | "base" | "paymentMethod" | "merchant" | "miles";
  isForeignCurrency?: boolean;
  paymentMethods?: string[];
  isMilesCard?: boolean; // For miles category
}

export const RANKING_CATEGORIES: CategoryConfig[] = [
  {
    id: "dining",
    name: "食飯",
    nameEn: "Dining",
    icon: "🍽️",
    description: "餐廳、食肆、外賣平台",
    slug: "best-dining-cards",
    discoverUrl: "/discover/dining-guide",
    matchCategories: ["dining"],
  },
  {
    id: "hkd_online",
    name: "港幣網購",
    nameEn: "HKD Online Shopping",
    icon: "🛒",
    description: "HKTVmall、百佳網店等港幣網購",
    slug: "best-hkd-online-cards",
    discoverUrl: "/discover/hkd-online-shopping-2026",
    matchCategories: ["online"],
  },
  {
    id: "foreign_online",
    name: "外幣網購",
    nameEn: "Foreign Online Shopping",
    icon: "💻",
    description: "Amazon、iHerb 等外幣網購",
    slug: "best-foreign-online-cards",
    discoverUrl: "/discover/foreign-currency-online-shopping-2026",
    matchCategories: ["online"],
    isForeignCurrency: true,
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
    icon: "✈️",
    description: "旅行實體店外幣簽賬",
    slug: "best-overseas-cards",
    discoverUrl: "/discover/overseas-spending-guide",
    isForeignCurrency: true,
  },
  {
    id: "mobile_payment",
    name: "流動支付",
    nameEn: "Mobile Payment",
    icon: "📱",
    description: "Apple Pay、Google Pay",
    slug: "best-mobile-payment-cards",
    discoverUrl: "/discover/payment-methods-guide",
    matchType: "paymentMethod",
    paymentMethods: ["mobile", "apple_pay", "google_pay"],
  },
  {
    id: "miles",
    name: "換里數",
    nameEn: "Miles",
    icon: "✈️",
    description: "Asia Miles、Avios 里數信用卡",
    slug: "best-miles-cards",
    matchType: "miles",
    isMilesCard: true,
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

// Check if a card is a miles card based on rewardConfig
function isMilesCard(card: CreditCard): boolean {
  if (!card.rewardConfig) return false;
  const currency = card.rewardConfig.currency;
  // AM = Asia Miles, Avios, Points (convertible to miles)
  return currency === 'AM' || currency === 'Avios' || currency === 'Points';
}

// Get miles program name from card
function getMilesProgram(card: CreditCard): string {
  if (!card.rewardConfig) return '里數';
  const currency = card.rewardConfig.currency;
  if (currency === 'AM') return 'Asia Miles';
  if (currency === 'Avios') return 'Avios';
  if (currency === 'Points') return '積分換里數';
  return '里數';
}

// Extract dollars per mile from rule description (e.g. "$4/里" -> 4)
function extractDollarsPerMile(description: string): number | null {
  const match = description.match(/\$(\d+(?:\.\d+)?)\s*\/\s*里/);
  if (match) {
    return parseFloat(match[1]);
  }
  return null;
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
  limit: number = 15,
  cardsData: CreditCard[] = HK_CARDS
): RankingResult[] {
  const category = RANKING_CATEGORIES.find(c => c.id === categoryId);
  if (!category) return [];
  
  const results: RankingResult[] = [];
  
  // Filter out hidden cards
  const visibleCards = cardsData.filter(card => !card.hidden);
  
  // Special handling for miles category
  if (category.isMilesCard) {
    for (const card of visibleCards) {
      if (!isMilesCard(card)) continue;
      
      // Find the best $/mile rule (lowest is better)
      let bestRule: RewardRule | null = null;
      let bestDollarsPerMile = Infinity;
      
      for (const rule of card.rules) {
        if (rule.isDiscount) continue;
        
        // Extract $/mile from description
        const dpm = extractDollarsPerMile(rule.description);
        if (dpm && dpm < bestDollarsPerMile) {
          bestDollarsPerMile = dpm;
          bestRule = rule;
        }
      }
      
      // If no explicit $/mile found, calculate from percentage (assuming 1 mile = $0.1)
      if (!bestRule) {
        const baseRule = card.rules.find(r => r.matchType === "base" && !r.isForeignCurrency);
        if (baseRule) {
          // percentage * 10 = miles value per $100, so $/mile = 100 / (percentage * 10) = 10 / percentage
          bestDollarsPerMile = 10 / baseRule.percentage;
          bestRule = baseRule;
        }
      }
      
      if (bestRule && bestDollarsPerMile < Infinity) {
        // Convert $/mile to percentage equivalent (assuming 1 mile = $0.1)
        const percentageEquiv = 10 / bestDollarsPerMile;
        
        results.push({
          card,
          rule: bestRule,
          percentage: percentageEquiv,
          dollarsPerMile: bestDollarsPerMile,
          milesProgram: getMilesProgram(card),
          cap: bestRule.cap,
          capType: bestRule.capType,
          capAsSpending: bestRule.cap && bestRule.capType === "spending" ? bestRule.cap : undefined,
          minSpend: bestRule.minSpend,
          monthlyMinSpend: bestRule.monthlyMinSpend,
          conditions: extractConditions(bestRule, card),
        });
      }
    }
    
    // Sort by dollars per mile (lowest first = best)
    results.sort((a, b) => {
      const aDpm = a.dollarsPerMile ?? Infinity;
      const bDpm = b.dollarsPerMile ?? Infinity;
      if (aDpm !== bDpm) return aDpm - bDpm;
      // Secondary: higher cap is better
      if (a.capAsSpending && b.capAsSpending) return b.capAsSpending - a.capAsSpending;
      return 0;
    });
    
    return results.slice(0, limit);
  }
  
  // Standard category handling
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
      // Calculate net percentage for overseas category
      const fxFee = category.isForeignCurrency ? (card.foreignCurrencyFee || 1.95) : undefined;
      const netPct = category.isForeignCurrency && fxFee !== undefined 
        ? Math.max(0, bestRule.percentage - fxFee) 
        : undefined;
      
      // Calculate cap as spending limit
      let capAsSpending: number | undefined;
      if (bestRule.cap) {
        if (bestRule.capType === "reward") {
          capAsSpending = Math.round((bestRule.cap / bestRule.percentage) * 100);
        } else if (bestRule.capType === "spending") {
          capAsSpending = bestRule.cap;
        }
      }
      
      results.push({
        card,
        rule: bestRule,
        percentage: bestRule.percentage,
        netPercentage: netPct,
        foreignCurrencyFee: fxFee,
        cap: bestRule.cap,
        capType: bestRule.capType,
        capAsSpending,
        minSpend: bestRule.minSpend,
        monthlyMinSpend: bestRule.monthlyMinSpend,
        conditions: extractConditions(bestRule, card),
      });
    }
  }
  
  // Sort by percentage (highest first)
  // For overseas category, sort by netPercentage
  results.sort((a, b) => {
    // Primary sort: use netPercentage if available (overseas), otherwise percentage
    const aPct = a.netPercentage ?? a.percentage;
    const bPct = b.netPercentage ?? b.percentage;
    
    if (bPct !== aPct) {
      return bPct - aPct;
    }
    // Secondary sort: higher cap is better (more room to earn)
    if (a.capAsSpending && b.capAsSpending) {
      return b.capAsSpending - a.capAsSpending;
    }
    // Cards without cap are better
    if (a.cap && !b.cap) return 1;
    if (!a.cap && b.cap) return -1;
    return 0;
  });
  
  return results.slice(0, limit);
}

export function getAllRankings(
  limit: number = 15,
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


