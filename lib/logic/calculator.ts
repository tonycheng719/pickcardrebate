import { CreditCard, RewardRule, Merchant, Category } from "../types";
import { POPULAR_MERCHANTS } from "../data/merchants";
import { CATEGORIES } from "../data/categories";
import { HK_CARDS } from "../data/cards";

export interface CalculationResult {
  card: CreditCard;
  matchedRule: RewardRule;
  percentage: number;
  rewardAmount: number;
  matchType: "merchant" | "category" | "base" | "paymentMethod";
  suggestedPaymentMethod?: string | null;
  potentialRewardAmount?: number;
  potentialPercentage?: number;
  spendingSuggestion?: {
    targetAmount: number;
    ruleDescription: string;
    newPercentage: number;
    newRewardAmount: number;
  } | null;
  netRewardAmount?: number; // After FX fee deduction
  netPercentage?: number;
  isForeignCurrency?: boolean;
  fxFee?: number;
  isCapped?: boolean;
}

export interface SearchOptions {
  amount?: number;
  paymentMethod?: string;
  userCards?: string[];
  isForeignCurrency?: boolean;
}

function calculateCardReward(
    card: CreditCard, 
    matchedMerchant: Merchant | undefined, 
    matchedCategory: Category | undefined,
    paymentMethod: string | undefined,
    amount: number,
    isForeignCurrency: boolean
): { 
    rule: RewardRule | null, 
    percentage: number, 
    rewardAmount: number,
    missedRule: RewardRule | null,
    isCapped: boolean
} {
    let bestRule: RewardRule | null = null;
    let maxReward = -1;
    let bestPercentage = 0;
    let isCapped = false;

    let bestMissedRule: RewardRule | null = null;
    let maxMissedPercent = -1;

    // Helper to check exclusions
    const isExcluded = (rule: RewardRule): boolean => {
        // Check Category Exclusion
        if (rule.excludeCategories && matchedCategory) {
            if (rule.excludeCategories.includes(matchedCategory.id)) {
                return true;
            }
        }
        // Check Merchant Category Exclusion
        if (rule.excludeCategories && matchedMerchant && matchedMerchant.categoryIds) {
            if (matchedMerchant.categoryIds.some(catId => rule.excludeCategories?.includes(catId))) {
                return true;
            }
        }

        // Check Payment Method Exclusion
        if (rule.excludePaymentMethods && paymentMethod) {
            if (rule.excludePaymentMethods.includes(paymentMethod)) {
                return true;
            }
        }
        return false;
    };

    // Helper to check conditions (Updated Logic)
    const checkConditions = (rule: RewardRule): boolean => {
        // 1. Check validDays (0=Sun...6=Sat)
        if (rule.validDays && rule.validDays.length > 0) {
            const today = new Date().getDay();
            if (!rule.validDays.includes(today)) {
                return false;
            }
        }

        // 2. Check validDateRange
        if (rule.validDateRange) {
            const now = new Date();
            const start = new Date(rule.validDateRange.start);
            const end = new Date(rule.validDateRange.end);
            if (now < start || now > end) {
                return false;
            }
        }

        // 3. Legacy Condition check (keep for backward compatibility if needed)
        if (rule.condition) {
            if (rule.condition.dayOfWeek) {
                const today = new Date().getDay();
                if (!rule.condition.dayOfWeek.includes(today)) return false;
            }
            if (rule.condition.dateRange) {
                const now = new Date();
                const start = new Date(rule.condition.dateRange.start);
                const end = new Date(rule.condition.dateRange.end);
                if (now < start || now > end) return false;
            }
        }

        return true;
    };

    for (const rule of card.rules) {
      // 1. Check Foreign Currency Constraint
      if (rule.isForeignCurrency && !isForeignCurrency) {
          continue;
      }

      // 2. Check Exclusions
      if (isExcluded(rule)) {
          continue;
      }

      // 3. Check Conditions (New Logic)
      if (!checkConditions(rule)) {
          continue;
      }
      
      let isMatch = false;

      if (rule.matchType === "base") {
        isMatch = true;
      }
      else if (rule.matchType === "merchant" && matchedMerchant) {
        if (Array.isArray(rule.matchValue)) {
          isMatch = rule.matchValue.includes(matchedMerchant.id);
        } else {
          isMatch = rule.matchValue === matchedMerchant.id;
        }
      }
      else if (rule.matchType === "category") {
        if (matchedCategory) {
          isMatch = rule.matchValue === matchedCategory.id;
        } 
        else if (matchedMerchant) {
          if (Array.isArray(matchedMerchant.categoryIds)) {
            isMatch = matchedMerchant.categoryIds.includes(rule.matchValue as string);
          }
        }
      }
      else if (rule.matchType === "paymentMethod") {
        const pMethod = paymentMethod || "";
        if (Array.isArray(rule.matchValue)) {
            if (rule.matchValue.includes(pMethod)) {
                isMatch = true;
            }
            // Generic "mobile" check
            if (rule.matchValue.includes("mobile") && ["apple_pay", "google_pay", "samsung_pay", "boc_pay"].includes(pMethod)) {
                isMatch = true;
            }
        } else {
             if (rule.matchValue === pMethod) isMatch = true;
             if (rule.matchValue === "mobile" && ["apple_pay", "google_pay", "samsung_pay", "boc_pay"].includes(pMethod)) isMatch = true;
        }
      }

      if (isMatch) {
          const minSpend = rule.minSpend || 0;
          // Note: monthlyMinSpend is not checked here because we don't have user history yet.
          // It should ideally trigger a "Warning" or "Suggestion".
          
          if (amount >= minSpend) {
             let currentReward = 0;
             let currentCapped = false;
             
             // Determine effective cap
             let effectiveSpendingCap = Infinity;
             
             if (rule.cap) {
                 if (rule.capType === 'reward') {
                     // Convert reward cap to spending cap: Reward Cap / Percentage
                     effectiveSpendingCap = (rule.cap / rule.percentage) * 100;
                 } else {
                     // Default is 'spending' cap
                     effectiveSpendingCap = rule.cap;
                 }
             }

             if (amount > effectiveSpendingCap) {
                 // Reward is calculated up to the cap
                 currentReward = (effectiveSpendingCap * rule.percentage) / 100;
                 
                 // If there is a base rule, we might get base reward for the overflow?
                 // For simplicity, we just cap it here. 
                 // A more advanced logic would be: (cap * high%) + ((amount - cap) * base%)
                 // But finding the 'fallback' rule is complex.
                 
                 currentCapped = true;
             } else {
                 currentReward = (amount * rule.percentage) / 100;
             }

             if (currentReward > maxReward) {
                maxReward = currentReward;
                bestPercentage = rule.percentage;
                bestRule = rule;
                isCapped = currentCapped;
             }
          } else {
             if (rule.percentage > maxMissedPercent) {
                 maxMissedPercent = rule.percentage;
                 bestMissedRule = rule;
             }
          }
      }
    }

    return { 
        rule: bestRule, 
        percentage: bestPercentage,
        rewardAmount: maxReward > 0 ? maxReward : 0,
        missedRule: bestMissedRule,
        isCapped
    };
}

export function findBestCards(
  query: string,
  options: SearchOptions = {},
  cardsData: CreditCard[] = HK_CARDS,
  merchantsData: Merchant[] = POPULAR_MERCHANTS,
  categoriesData: Category[] = CATEGORIES
): CalculationResult[] {
  const normalizedQuery = query.toLowerCase().trim();
  const { amount = 0, paymentMethod, userCards, isForeignCurrency = false } = options;
  
  const matchedMerchant = merchantsData.find(
    m => m.name.toLowerCase().includes(normalizedQuery) || 
         (m.aliases && m.aliases.some(a => a.toLowerCase().includes(normalizedQuery) || normalizedQuery.includes(a.toLowerCase())))
  );
  
  const matchedCategory = categoriesData.find(
    c => c.name.includes(normalizedQuery) || normalizedQuery.includes(c.name)
  );

  const cardPool = userCards && userCards.length > 0
    ? cardsData.filter((c) => userCards.includes(c.id))
    : cardsData;

  const results: CalculationResult[] = cardPool.map(card => {
    const current = calculateCardReward(card, matchedMerchant, matchedCategory, paymentMethod, amount, isForeignCurrency);
    
    let suggestedMethod: string | null = null;
    let potentialBest = { rewardAmount: 0, percentage: 0 };

    // Payment Method Suggestion
    if (!paymentMethod || paymentMethod === "physical_card") {
        const methodsToCheck = ["apple_pay", "boc_pay", "alipay", "payme"];
        for (const m of methodsToCheck) {
            const res = calculateCardReward(card, matchedMerchant, matchedCategory, m, amount, isForeignCurrency);
            if (res.rewardAmount > current.rewardAmount && res.rewardAmount > potentialBest.rewardAmount) {
                potentialBest = res;
                suggestedMethod = m;
            }
        }
    }

    let spendingSuggestion = null;
    if (current.missedRule && current.missedRule.minSpend) {
        const potentialRewardAtThreshold = (current.missedRule.minSpend * current.missedRule.percentage) / 100;
        const currentRewardAtThreshold = (current.missedRule.minSpend * (current.rule?.percentage || 0)) / 100;

        if (potentialRewardAtThreshold > currentRewardAtThreshold) {
             spendingSuggestion = {
                targetAmount: current.missedRule.minSpend,
                ruleDescription: current.missedRule.description,
                newPercentage: current.missedRule.percentage,
                newRewardAmount: potentialRewardAtThreshold
            };
        }
    }

    const bestRule = current.rule || { description: "無適用回饋", percentage: 0, matchType: "base" as const };
    
    // Recalculate percentage based on actual reward vs amount (to reflect capping)
    const percentage = amount > 0 ? (current.rewardAmount / amount) * 100 : bestRule.percentage;

    let netRewardAmount = current.rewardAmount;
    let netPercentage = percentage;
    const fxFee = isForeignCurrency ? (card.foreignCurrencyFee || 0) : 0;

    if (isForeignCurrency) {
        const feeAmount = (amount * fxFee) / 100;
        netRewardAmount = Math.max(0, current.rewardAmount - feeAmount);
        netPercentage = amount > 0 ? (netRewardAmount / amount) * 100 : 0;
    }

    return {
      card,
      matchedRule: bestRule,
      percentage: parseFloat(percentage.toFixed(2)),
      rewardAmount: current.rewardAmount,
      matchType: bestRule.matchType,
      suggestedPaymentMethod: suggestedMethod,
      potentialPercentage: potentialBest.percentage,
      potentialRewardAmount: potentialBest.rewardAmount,
      spendingSuggestion,
      isForeignCurrency,
      netRewardAmount,
      netPercentage,
      fxFee,
      isCapped: current.isCapped
    };
  });

  if (isForeignCurrency) {
      return results.sort((a, b) => (b.netRewardAmount || 0) - (a.netRewardAmount || 0));
  }

  return results.sort((a, b) => b.rewardAmount - a.rewardAmount);
}

export function getMerchantOrCategoryName(
  query: string,
  merchantsData: Merchant[] = POPULAR_MERCHANTS,
  categoriesData: Category[] = CATEGORIES
): string {
  const normalizedQuery = query.toLowerCase().trim();
  const matchedMerchant = merchantsData.find(
    (m) =>
      m.name.toLowerCase().includes(normalizedQuery) ||
      (m.aliases && m.aliases.some((a) => a.toLowerCase().includes(normalizedQuery) || normalizedQuery.includes(a.toLowerCase())))
  );

  const matchedCategory = categoriesData.find(
    (c) => c.name.includes(normalizedQuery) || normalizedQuery.includes(c.name)
  );

  if (matchedMerchant) return matchedMerchant.name;
  if (matchedCategory) return matchedCategory.name;
  return query;
}
