export type MatchType = "merchant" | "category" | "paymentMethod" | "base";

export interface RewardRuleCondition {
  dayOfWeek?: number[]; // 0=Sun, 1=Mon, ..., 6=Sat
  dateRange?: { start: string; end: string }; // ISO date strings
  userSelection?: string; // e.g., "dining_category_selected" - requires user setting match
}

export interface RewardRule {
  description: string;
  matchType: MatchType;
  matchValue?: string | string[]; // merchant name, category id, or payment method id
  percentage: number;
  
  // Cap Logic
  cap?: number; // Default is 'spending cap' unless capType is specified
  capType?: 'spending' | 'reward'; // New: Distinguish between spending limit and reward limit
  shareCapWith?: string; // New: Group ID for shared cap (e.g. "mmpower_online_mobile")

  minSpend?: number;
  monthlyMinSpend?: number; // New: Monthly accumulation requirement

  isForeignCurrency?: boolean; // If true, only matches if transaction is foreign currency
  excludeCategories?: string[]; // Categories to explicitly exclude
  excludePaymentMethods?: string[]; // Payment methods to explicitly exclude
  
  // Time Logic
  validDays?: number[]; // New: 0=Sun...6=Sat
  validDateRange?: { start: string; end: string }; // New: Promo period

  condition?: RewardRuleCondition; // Legacy/Advanced conditions
}

export interface CreditCard {
  id: string;
  name: string;
  bank: string;
  style: {
    bgColor: string; // e.g. "bg-red-600" or hex
    textColor: string; // e.g. "text-white"
  };
  imageUrl?: string;
  annualFee?: number;
  feeWaiverCondition?: string;
  rules: RewardRule[];
  tags: string[];
  applyUrl?: string;
  rewardTimeline?: string;
  waiverMethod?: string;
  foreignCurrencyFee?: number;
  welcomeOfferText?: string;
  welcomeOfferReward?: string;
  welcomeOfferDeadline?: string;
  sellingPoints?: string[];
}

export interface Merchant {
  id: string;
  name: string;
  categoryIds: string[];
  aliases: string[];
  logo?: string;
  accentColor?: string;
  isGeneral?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  bgColor: string;
  accentColor: string;
}

export interface Promo {
  id: string;
  title: string;
  merchant: string;
  description: string;
  imageUrl?: string;
  expiryDate: string;
  relatedCardIds: string[];
  tags: string[];
  url?: string;
}

export interface Transaction {
  id: string;
  date: string;
  merchant: string;
  amount: number;
  cardId: string;
  rewardAmount: number;
  category?: string;
}

export interface ComboStrategy {
  id: string;
  title: string;
  description: string;
  steps: {
    order: number;
    action: string;
    description: string;
  }[];
  totalReward: string;
  tags: string[];
}
