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
  capPeriod?: 'monthly' | 'yearly' | 'semiannual' | 'promo'; // New: Cap period (default: monthly)
  shareCapWith?: string; // New: Group ID for shared cap (e.g. "mmpower_online_mobile")

  minSpend?: number;
  monthlyMinSpend?: number; // New: Monthly accumulation requirement

  isForeignCurrency?: boolean; // If true, only matches if transaction is foreign currency
  isPhysicalStore?: boolean; // If true, only matches physical store transactions (excludes online)
  excludeCategories?: string[]; // Categories to explicitly exclude
  excludePaymentMethods?: string[]; // Payment methods to explicitly exclude
  
  // Time Logic
  validDays?: number[]; // New: 0=Sun...6=Sat (day of week)
  validDates?: number[]; // New: 1-31 (day of month, e.g. [20] for 20th of each month)
  validDateRange?: { start: string; end: string }; // New: Promo period

  // Registration Logic
  requiresRegistration?: boolean; // If true, this rule requires user to register first (not auto-calculated)

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
  cardNetwork?: 'visa' | 'mastercard' | 'unionpay' | 'amex' | 'jcb'; // Card network for payment method filtering
  applyUrl?: string; // Partner apply URL (e.g. MoneyHero)
  officialApplyUrl?: string; // Official bank apply URL
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
  minIncome?: number; // Minimum annual income requirement (HKD)
  incomeNote?: string; // Special notes for income requirement
  
  // Promo Period Tracking
  promoEndDate?: string; // Overall promo end date (ISO date: "2025-12-31")
  promoName?: string; // Name of the promo for display
  
  // Partner Offer (經本網指定連結申請額外獎賞)
  partnerOffer?: PartnerOffer;
  
  // Bank Promo (銀行簽賬推廣)
  bankPromo?: BankPromo;
  
  // Featured Merchants (優惠商戶)
  featuredMerchants?: FeaturedMerchant[];
  
  // Exclusions (不計回贈項目) - 精簡版，只顯示警告
  exclusions?: string[];
}

// 優惠商戶
export interface FeaturedMerchant {
  name: string;
  rate: string; // e.g. "6%", "9折"
  logo?: string;
  category?: string; // e.g. "餐飲", "購物"
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
  isForeignCurrency?: boolean; // If true, this merchant uses foreign currency (e.g. Taobao = RMB)
  currency?: string; // Currency code (e.g. "CNY", "JPY", "USD")
  excludedCardNetworks?: string[]; // Card networks not accepted (e.g. ["unionpay"] for Apple Store)
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
  // Sorting & Display
  updatedAt?: string; // ISO date string for sorting by last update
  sortOrder?: number; // Manual sort order (higher = top), for pinning
  isPinned?: boolean; // If true, always show at top
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

// Partner Offer (經本網指定連結申請額外獎賞)
export interface PartnerOffer {
  enabled: boolean; // 是否啟用顯示
  applyUrl: string; // 申請連結
  bonusValue: number; // 額外獎賞現金價值（港幣）
  bonusDescription: string; // 獎賞描述 (e.g. "$500現金回贈")
  bonusItems?: string[]; // 可選獎賞列表 (e.g. ["$500現金回贈", "$500 Apple禮品卡", "$500惠康禮券"])
  validFrom: string; // 有效期開始 (ISO date)
  validTo: string; // 有效期結束 (ISO date)
  requirements?: string[]; // 額外申請要求
  minSpend?: number; // 最低簽賬要求
  minSpendDays?: number; // 簽賬期限（天）
  notes?: string; // 其他備註
}

// Bank Promotion (銀行簽賬推廣)
export interface BankPromoTier {
  minSpend: number; // 最低簽賬金額
  reward: string; // 獎賞描述
  rewardYuu?: string; // yuu積分版本（enJoy卡專用）
  rewardValue: number; // 獎賞價值
  extraReward?: string; // 額外獎賞（如Visa卡額外）
  extraRewardValue?: number;
}

export interface BankPromoPhase {
  name: string; // 階段名稱
  startDate: string; // 開始日期
  endDate: string; // 結束日期
  tiers: BankPromoTier[];
}

export interface BankPromo {
  id: string;
  name: string; // 推廣名稱
  description: string; // 簡短描述
  validFrom: string;
  validTo: string;
  phases?: BankPromoPhase[]; // 分階段推廣
  tiers?: BankPromoTier[]; // 單一階段推廣
  bonusTiers?: BankPromoTier[]; // 額外獎賞層級
  requirements?: string[]; // 參與要求
  exclusions?: string[]; // 不合資格簽賬
  registrationUrl?: string; // 登記網址
  termsUrl?: string; // 條款連結
  notes?: string; // 備註
  visaExtraReward?: boolean; // Visa卡有額外獎賞
  maxReward?: string; // 最高可獲獎賞
  maxRewardYuu?: string; // yuu積分版本最高獎賞（enJoy卡專用）
}
