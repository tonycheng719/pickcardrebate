/**
 * PickCardRebate 核心類型定義
 * 從 Web 版本同步
 */

export interface CreditCard {
  id: string;
  name: string;
  bank: string;
  style?: {
    bgColor?: string;
    textColor?: string;
  };
  imageUrl?: string;
  foreignCurrencyFee?: number;
  annualFee?: number;
  minIncome?: number;
  feeWaiverCondition?: string;
  rewardConfig?: {
    method: 'conversion' | 'direct';
    ratio?: number;
    currency?: string;
  };
  rules: CreditCardRule[];
  tags?: string[];
  welcomeOfferText?: string;
  officialApplyUrl?: string;
  applyUrl?: string;
  sellingPoints?: string[];
  note?: string;
  promoEndDate?: string;
  promoName?: string;
  featuredMerchants?: {
    name: string;
    rate: string;
    category: string;
  }[];
  exclusions?: string[];
}

export interface CreditCardRule {
  description: string;
  matchType: 'base' | 'category' | 'merchant' | 'paymentMethod';
  matchValue?: string[];
  percentage: number;
  cap?: number;
  capType?: 'reward' | 'spending';
  capPeriod?: 'monthly' | 'yearly' | 'promo';
  shareCapWith?: string;
  monthlyMinSpend?: number;
  isPhysicalStore?: boolean;
  isForeignCurrency?: boolean;
  excludeCategories?: string[];
  excludePaymentMethods?: string[];
}

export interface Merchant {
  id: string;
  name: string;
  category: string;
  aliases?: string[];
  icon?: string;
  paymentMethods?: string[];
}

export interface MerchantCategory {
  id: string;
  name: string;
  icon: string;
  merchants: Merchant[];
}

export interface CalculationResult {
  card: CreditCard;
  rate: number;
  reward: number;
  matchedRule?: CreditCardRule;
  notes?: string[];
}

export type PaymentMethod = 
  | 'physical'
  | 'online'
  | 'apple_pay'
  | 'google_pay'
  | 'alipay'
  | 'wechat_pay'
  | 'octopus'
  | 'boc_pay'
  | 'unionpay_qr';

export interface CalculatorInput {
  merchantId: string;
  category: string;
  amount: number;
  paymentMethod: PaymentMethod;
  isForeignCurrency?: boolean;
}

