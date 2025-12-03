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
  
  // Discount vs Rebate
  isDiscount?: boolean; // If true, this is a direct discount (e.g. 92折), not a rebate
  
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
  validDays?: number[]; // New: 0=Sun...6=Sat (day of week)
  validDates?: number[]; // New: 1-31 (day of month, e.g. [20] for 20th of each month)
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
  note?: string; // New: Special notes for complex rules (e.g. tiered rewards)
  // New: Miles Configuration
  rewardConfig?: {
    method: 'conversion' | 'direct' | 'direct_rate';
    currency?: string; // 'RC', 'DBS$', 'Points', 'AM'
    ratio?: number; // e.g. 10 (1 RC = 10 Miles) or 0.0833 (12 Points = 1 Mile)
    baseRate?: number; // For direct_rate: e.g. 6 ($6/Mile)
  };
  hidden?: boolean; // Hide from frontend (but keep data for existing users)
}

export interface Merchant {
  id: string;
  name: string;
  categoryIds: string[];
  aliases: string[];
  logo?: string;
  accentColor?: string;
  isGeneral?: boolean;
  isOnlineOnly?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  bgColor: string;
  accentColor: string;
}

export interface PromoFAQ {
  question: string;
  answer: string;
}

export interface Promo {
  id: string;
  title: string;
  merchant: string;
  description: string;
  content?: string; // Markdown content for detail page
  imageUrl?: string;
  expiryDate: string;
  relatedCardIds: string[];
  tags: string[];
  url?: string;
  // SEO Fields
  faqs?: PromoFAQ[]; // FAQ for structured data
  seoTitle?: string; // Custom SEO title
  seoDescription?: string; // Custom meta description
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

export interface MerchantReview {
  id: string;
  user_id: string;
  merchant_id: string;
  merchant_name: string;
  card_id: string;
  payment_method: string;
  actual_rate: number;
  comment?: string;
  status: 'pending' | 'verified' | 'rejected';
  upvotes: number;
  downvotes: number;
  evidence_url?: string;
  created_at: string;
}

export interface MerchantTag {
  id: string;
  merchant_id: string;
  tag_name: string;
  count: number;
  last_updated_at: string;
}

export interface UserReputation {
  user_id: string;
  points: number;
  level: number;
  badges: string[];
}

// Welcome Offer Tracker
export interface WelcomeOfferProgress {
  cardId: string;
  targetAmount: number; // 迎新目標金額
  currentAmount: number; // 已簽金額
  deadline: string; // 截止日期
  startDate: string; // 開始日期
  transactions: {
    date: string;
    amount: number;
    merchant?: string;
  }[];
}

// Spending Reminder
export interface SpendingReminder {
  id: string;
  cardId: string;
  type: 'monthly_min' | 'promo_deadline' | 'welcome_offer';
  title: string;
  description: string;
  targetDate?: string;
  targetAmount?: number;
  currentAmount?: number;
  isEnabled: boolean;
}

// Card Priority for Admin
export interface CardPriority {
  cardId: string;
  priority: number; // Lower = higher priority
  featured: boolean;
  updatedAt: string;
}
