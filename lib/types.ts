export type MatchType = "merchant" | "category" | "paymentMethod" | "base";

export interface RewardRule {
  description: string;
  matchType: MatchType;
  matchValue?: string | string[]; // merchant name, category id, or payment method id
  percentage: number;
  cap?: number; // Spending cap for this rule
  minSpend?: number;
  isForeignCurrency?: boolean; // If true, only matches if transaction is foreign currency
  excludeCategories?: string[]; // New: Categories to explicitly exclude (e.g., utilities, tax)
  excludePaymentMethods?: string[]; // New: Payment methods to explicitly exclude (e.g., fps)
}

export interface CreditCard {
  id: string;
  name: string;
  bank: string;
  style: {
    bgColor: string; // e.g. "bg-red-600" or hex
    textColor: string; // e.g. "text-white"
  };
  imageUrl?: string; // New field for card image
  annualFee?: number;
  feeWaiverCondition?: string;
  rules: RewardRule[];
  tags: string[];
  applyUrl?: string;
  rewardTimeline?: string;
  waiverMethod?: string;
  foreignCurrencyFee?: number; // e.g. 1.95
  welcomeOfferText?: string;
  welcomeOfferReward?: string;
  welcomeOfferDeadline?: string;
  sellingPoints?: string[];
}

export interface Merchant {
  id: string;
  name: string;
  categoryIds: string[];
  aliases: string[]; // Added aliases
  logo?: string; // URL or emoji
  accentColor?: string; // Hex code
  isGeneral?: boolean; // Added for generic merchants
}

export interface Category {
  id: string;
  name: string;
  icon: string; // Lucide icon name
  bgColor: string;
  accentColor: string;
}

export interface Promo {
  id: string;
  title: string;
  merchant: string; // Changed from bank
  description: string;
  imageUrl?: string; // New field for promo banner
  expiryDate: string; // Changed from validUntil
  relatedCardIds: string[]; // Which cards have this promo
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
