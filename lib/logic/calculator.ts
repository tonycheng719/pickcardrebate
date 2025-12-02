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
  dateSuggestion?: {
    validDays?: number[];
    validDates?: number[]; // Day of month (1-31)
    ruleDescription: string;
    newPercentage: number;
    newRewardAmount: number;
  } | null;
  netRewardAmount?: number; // After FX fee deduction
  netPercentage?: number;
  isForeignCurrency?: boolean;
  fxFee?: number;
  isCapped?: boolean;
  milesReturn?: number; // $/Mile
  // New: Points display
  pointsAmount?: number; // e.g. 1500 (yuu points)
  pointsCurrency?: string; // e.g. "yuu積分", "獎賞錢", "積分"
  pointsCashValue?: number; // e.g. 7.5 (cash equivalent)
}

export interface SearchOptions {
  amount?: number;
  paymentMethod?: string;
  userCards?: string[];
  isForeignCurrency?: boolean;
  isOnlineScenario?: boolean;
  rewardPreference?: "cash" | "miles"; // New Option
}

function calculateCardReward(
    card: CreditCard, 
    matchedMerchant: Merchant | undefined, 
    matchedCategory: Category | undefined,
    paymentMethod: string | undefined,
    amount: number,
    isForeignCurrency: boolean,
    isOnlineScenario: boolean = false,
    rewardPreference: "cash" | "miles" = "cash" // New Argument
): { 
    rule: RewardRule | null, 
    percentage: number, 
    rewardAmount: number,
    missedRule: RewardRule | null,
    missedDateRule: RewardRule | null,
    missedDateReward: number,
    isCapped: boolean,
    milesReturn?: number
} {
    let bestRule: RewardRule | null = null;
    let maxReward = -1;
    let bestPercentage = 0;
    let isCapped = false;

    let bestMissedRule: RewardRule | null = null;
    let maxMissedPercent = -1;

    // Track rule with date mismatch but high potential
    let bestMissedDateRule: RewardRule | null = null;
    let maxMissedDateReward = -1;
    let milesReturn: number | undefined = undefined;

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
        // 1. Check validDays (0=Sun...6=Sat - day of week)
        if (rule.validDays && rule.validDays.length > 0) {
            const today = new Date().getDay();
            if (!rule.validDays.includes(today)) {
                return false;
            }
        }

        // 2. Check validDates (1-31 - day of month)
        if (rule.validDates && rule.validDates.length > 0) {
            const todayDate = new Date().getDate();
            if (!rule.validDates.includes(todayDate)) {
                return false;
            }
        }

        // 3. Check validDateRange
        if (rule.validDateRange) {
            const now = new Date();
            const start = new Date(rule.validDateRange.start);
            const end = new Date(rule.validDateRange.end);
            if (now < start || now > end) {
                return false;
            }
        }

        // 4. Legacy Condition check
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

    // Helper to calculate reward for a rule regardless of conditions
    const calculatePotential = (rule: RewardRule): number => {
        const minSpend = rule.minSpend || 0;
        if (amount < minSpend) return 0;

        let potentialReward = 0;
        let effectiveSpendingCap = Infinity;
        if (rule.cap) {
            if (rule.capType === 'reward') {
                effectiveSpendingCap = (rule.cap / rule.percentage) * 100;
            } else {
                effectiveSpendingCap = rule.cap;
            }
        }
        if (amount > effectiveSpendingCap) {
            potentialReward = (effectiveSpendingCap * rule.percentage) / 100;
        } else {
            potentialReward = (amount * rule.percentage) / 100;
        }
        return potentialReward;
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
        // Handle matchValue as string or string[]
        const ruleCategories = Array.isArray(rule.matchValue) ? rule.matchValue : [rule.matchValue];
        
        if (matchedCategory) {
          isMatch = ruleCategories.includes(matchedCategory.id);
        } 
        else if (matchedMerchant) {
          if (Array.isArray(matchedMerchant.categoryIds)) {
            // Check if any merchant category matches any rule category
            isMatch = matchedMerchant.categoryIds.some(catId => ruleCategories.includes(catId));
          }
        }
        
        // SPECIAL LOGIC: If paymentMethod is 'online', also match category 'online'
        if (paymentMethod === 'online' && ruleCategories.includes('online')) {
            isMatch = true;
        }
        // NEW: If isOnlineScenario is true, treat as online category
        if (isOnlineScenario && ruleCategories.includes('online')) {
            isMatch = true;
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
            // NEW: If isOnlineScenario is true, this might also be 'online' payment method in some rule definitions?
            // Usually cards define 'online' as category, but sometimes as method.
            if (isOnlineScenario && rule.matchValue.includes('online')) {
                isMatch = true;
            }
        } else {
             if (rule.matchValue === pMethod) isMatch = true;
             if (rule.matchValue === "mobile" && ["apple_pay", "google_pay", "samsung_pay", "boc_pay"].includes(pMethod)) isMatch = true;
             if (isOnlineScenario && rule.matchValue === 'online') isMatch = true;
        }
      }

      if (isMatch) {
          // 3. Check Conditions (Date/Time)
          if (checkConditions(rule)) {
              // Valid Rule Logic
              const potentialReward = calculatePotential(rule);
              const minSpend = rule.minSpend || 0;

              if (amount >= minSpend) {
                 if (potentialReward > maxReward) {
                    maxReward = potentialReward;
                    bestPercentage = rule.percentage;
                    bestRule = rule;
                    
                    // Recalculate isCapped based on potential logic
                    let effectiveSpendingCap = Infinity;
                    if (rule.cap) {
                         if (rule.capType === 'reward') effectiveSpendingCap = (rule.cap / rule.percentage) * 100;
                         else effectiveSpendingCap = rule.cap;
                    }
                    isCapped = amount > effectiveSpendingCap;
                 }
              } else {
                 // Track missed rule (spending threshold)
                 if (rule.percentage > maxMissedPercent) {
                     maxMissedPercent = rule.percentage;
                     bestMissedRule = rule;
                 }
              }
          } else {
              // Condition Failed (Date Mismatch)
              // Calculate what *would* be the reward if date was correct
              const potentialReward = calculatePotential(rule);
              // Only consider it if amount meets minSpend, otherwise it's double missed
              const minSpend = rule.minSpend || 0;
              if (amount >= minSpend && potentialReward > maxMissedDateReward) {
                  maxMissedDateReward = potentialReward;
                  bestMissedDateRule = rule;
              }
          }
      }
    }

    // Calculate Miles Return
    if (rewardPreference === "miles" && card.rewardConfig && maxReward > 0) {
        const { method, ratio = 0, baseRate = 0 } = card.rewardConfig;
        
        // 1. Conversion Method: Reward Amount -> Points -> Miles
        if (method === "conversion" && ratio > 0) {
            // e.g., $100 spending * 4% = $4 Reward (RC/DBS$)
            // $4 RC * 10 (ratio) = 40 Miles
            // $/Mile = $100 / 40 = 2.5
            const totalMiles = maxReward * ratio;
            if (totalMiles > 0) {
                milesReturn = amount / totalMiles;
            }
        } 
        // 2. Direct Rate Method: $/Mile defined directly in rules? 
        // Usually cards have complex rules. If we use 'rewardAmount' as cash value,
        // we need to know how much cash value = 1 mile.
        // Actually, most 'miles cards' give points which convert.
        // For simplicity, we assume 'maxReward' is the CASH EQUIVALENT (or Points amount if percentage is points rate).
        // We need to be careful: data/cards.ts usually defines percentage as CASHBACK equivalent percentage.
        // If percentage is 4%, it means $4 value per $100.
        // If 1 RC = $1 = 10 Miles (HSBC VS), then $4 RC = 40 Miles.
        // ratio should be "Miles per $1 Reward Value".
    }

    return { 
        rule: bestRule, 
        percentage: bestPercentage,
        rewardAmount: maxReward > 0 ? maxReward : 0,
        missedRule: bestMissedRule,
        missedDateRule: bestMissedDateRule,
        missedDateReward: maxMissedDateReward,
        isCapped,
        milesReturn
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
  const { amount = 0, paymentMethod, userCards, isForeignCurrency = false, isOnlineScenario = false, rewardPreference = "cash" } = options;
  
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
    const current = calculateCardReward(card, matchedMerchant, matchedCategory, paymentMethod, amount, isForeignCurrency, isOnlineScenario, rewardPreference);
    
    let suggestedMethod: string | null = null;
    let potentialBest = { rewardAmount: 0, percentage: 0 };

    // Payment Method Suggestion
    // If user already selected "Online Scenario", we might not want to suggest other methods as aggressively, 
    // or we should suggest "non-online" if it's better? (rare).
    // Standard logic: check other methods.
    if (!paymentMethod || paymentMethod === "physical_card") {
        const methodsToCheck = ["apple_pay", "boc_pay", "alipay", "payme"];
        for (const m of methodsToCheck) {
            const res = calculateCardReward(card, matchedMerchant, matchedCategory, m, amount, isForeignCurrency, isOnlineScenario, rewardPreference);
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

    let dateSuggestion = null;
    if (current.missedDateRule && current.missedDateReward > current.rewardAmount) {
        dateSuggestion = {
            validDays: current.missedDateRule.validDays || (current.missedDateRule.condition?.dayOfWeek || undefined),
            validDates: current.missedDateRule.validDates, // Day of month (e.g. [3, 13, 23])
            ruleDescription: current.missedDateRule.description,
            newPercentage: current.missedDateRule.percentage,
            newRewardAmount: current.missedDateReward
        };
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

    // Calculate points display if card has rewardConfig
    let pointsAmount: number | undefined;
    let pointsCurrency: string | undefined;
    let pointsCashValue: number | undefined;
    
    if (card.rewardConfig && card.rewardConfig.currency) {
      pointsCurrency = card.rewardConfig.currency;
      
      if (card.rewardConfig.method === 'conversion' && card.rewardConfig.ratio) {
        // For yuu points: $500 * 1.5% = $7.5 cash, but as points = amount * percentage / 100 * pointsPerDollar
        // yuu: 1 yuu point = $0.005 (200 points = $1)
        // So points earned = amount * (percentage / 100) * (1 / 0.005) = amount * percentage * 2
        // Actually simpler: points = (amount * percentage / 100) * ratio
        // e.g. $500 * 1.5% * 200 = 1500 yuu points
        pointsAmount = Math.round(amount * (percentage / 100) * card.rewardConfig.ratio);
        pointsCashValue = current.rewardAmount; // Cash equivalent
      }
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
      dateSuggestion,
      isForeignCurrency,
      netRewardAmount,
      netPercentage,
      fxFee,
      isCapped: current.isCapped,
      milesReturn: current.milesReturn,
      pointsAmount,
      pointsCurrency,
      pointsCashValue
    };
  });

  // Sort Logic for Miles
  if (rewardPreference === "miles") {
      return results.sort((a, b) => {
          // Lower $/Mile is better
          // But undefined milesReturn (no miles option) should be last
          const aRate = a.milesReturn || Infinity;
          const bRate = b.milesReturn || Infinity;
          return aRate - bRate;
      });
  }

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
