/**
 * Database Card System Types
 * 對應 Supabase db_cards, db_card_rules, db_promos 等表
 */

// ============================================================================
// Card Types
// ============================================================================

export interface DbCard {
  id: string;
  name: string;
  bank: string;
  image_url: string | null;
  card_type: 'credit' | 'debit' | 'prepaid';
  network: 'visa' | 'mastercard' | 'unionpay' | 'amex' | 'jcb' | null;
  annual_fee: number;
  fee_waiver_condition: string | null;
  min_income: number | null;
  apply_url: string | null;
  partner_apply_url: string | null;
  style: {
    bgColor?: string;
    textColor?: string;
    gradientFrom?: string;
    gradientTo?: string;
  };
  reward_config: {
    method?: 'conversion' | 'direct' | 'miles';
    ratio?: number;
    currency?: string;
  };
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface DbCardInsert {
  id: string;
  name: string;
  bank: string;
  image_url?: string | null;
  card_type?: 'credit' | 'debit' | 'prepaid';
  network?: 'visa' | 'mastercard' | 'unionpay' | 'amex' | 'jcb' | null;
  annual_fee?: number;
  fee_waiver_condition?: string | null;
  min_income?: number | null;
  apply_url?: string | null;
  partner_apply_url?: string | null;
  style?: Record<string, unknown>;
  reward_config?: Record<string, unknown>;
  is_active?: boolean;
  sort_order?: number;
}

export interface DbCardUpdate {
  name?: string;
  bank?: string;
  image_url?: string | null;
  card_type?: 'credit' | 'debit' | 'prepaid';
  network?: 'visa' | 'mastercard' | 'unionpay' | 'amex' | 'jcb' | null;
  annual_fee?: number;
  fee_waiver_condition?: string | null;
  min_income?: number | null;
  apply_url?: string | null;
  partner_apply_url?: string | null;
  style?: Record<string, unknown>;
  reward_config?: Record<string, unknown>;
  is_active?: boolean;
  sort_order?: number;
}

// ============================================================================
// Card Rule Types
// ============================================================================

export interface DbCardRule {
  id: string;
  card_id: string;
  description: string;
  match_type: 'base' | 'category' | 'merchant' | 'payment';
  categories: string[];
  merchants: string[];
  payment_methods: string[];
  percentage: number;
  cap: number | null;
  cap_type: 'reward' | 'spending';
  cap_period: 'monthly' | 'quarterly' | 'annual' | 'transaction';
  min_spend: number | null;
  min_spend_period: string | null;
  exclude_categories: string[];
  valid_from: string | null;
  valid_until: string | null;
  priority: number;
  requires_registration: boolean;
  registration_url: string | null;
  notes: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface DbCardRuleInsert {
  card_id: string;
  description: string;
  match_type?: 'base' | 'category' | 'merchant' | 'payment';
  categories?: string[];
  merchants?: string[];
  payment_methods?: string[];
  percentage: number;
  cap?: number | null;
  cap_type?: 'reward' | 'spending';
  cap_period?: 'monthly' | 'quarterly' | 'annual' | 'transaction';
  min_spend?: number | null;
  min_spend_period?: string | null;
  exclude_categories?: string[];
  valid_from?: string | null;
  valid_until?: string | null;
  priority?: number;
  requires_registration?: boolean;
  registration_url?: string | null;
  notes?: string | null;
  is_active?: boolean;
}

export interface DbCardRuleUpdate {
  description?: string;
  match_type?: 'base' | 'category' | 'merchant' | 'payment';
  categories?: string[];
  merchants?: string[];
  payment_methods?: string[];
  percentage?: number;
  cap?: number | null;
  cap_type?: 'reward' | 'spending';
  cap_period?: 'monthly' | 'quarterly' | 'annual' | 'transaction';
  min_spend?: number | null;
  min_spend_period?: string | null;
  exclude_categories?: string[];
  valid_from?: string | null;
  valid_until?: string | null;
  priority?: number;
  requires_registration?: boolean;
  registration_url?: string | null;
  notes?: string | null;
  is_active?: boolean;
}

// ============================================================================
// Card Note Types
// ============================================================================

export interface DbCardNote {
  id: string;
  card_id: string;
  content: string;
  note_type: 'promo' | 'warning' | 'info';
  valid_from: string | null;
  valid_until: string | null;
  priority: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface DbCardNoteInsert {
  card_id: string;
  content: string;
  note_type?: 'promo' | 'warning' | 'info';
  valid_from?: string | null;
  valid_until?: string | null;
  priority?: number;
  is_active?: boolean;
}

// ============================================================================
// Promo Types
// ============================================================================

export interface DbPromo {
  id: string;
  slug: string | null;
  title: string;
  merchant: string | null;
  description: string | null;
  content: string | null;
  image_url: string | null;
  expiry_date: string | null;
  is_pinned: boolean;
  pinned_until: string | null;
  sort_order: number;
  tags: string[];
  url: string | null;
  seo_title: string | null;
  seo_description: string | null;
  view_count: number;
  is_active: boolean;
  is_guide: boolean;
  guide_component: string | null;
  created_at: string;
  updated_at: string;
}

export interface DbPromoInsert {
  id: string;
  slug?: string | null;
  title: string;
  merchant?: string | null;
  description?: string | null;
  content?: string | null;
  image_url?: string | null;
  expiry_date?: string | null;
  is_pinned?: boolean;
  pinned_until?: string | null;
  sort_order?: number;
  tags?: string[];
  url?: string | null;
  seo_title?: string | null;
  seo_description?: string | null;
  is_active?: boolean;
  is_guide?: boolean;
  guide_component?: string | null;
}

export interface DbPromoUpdate {
  slug?: string | null;
  title?: string;
  merchant?: string | null;
  description?: string | null;
  content?: string | null;
  image_url?: string | null;
  expiry_date?: string | null;
  is_pinned?: boolean;
  pinned_until?: string | null;
  sort_order?: number;
  tags?: string[];
  url?: string | null;
  seo_title?: string | null;
  seo_description?: string | null;
  is_active?: boolean;
  is_guide?: boolean;
  guide_component?: string | null;
}

// ============================================================================
// Promo FAQ Types
// ============================================================================

export interface DbPromoFaq {
  id: string;
  promo_id: string;
  question: string;
  answer: string;
  sort_order: number;
  created_at: string;
}

export interface DbPromoFaqInsert {
  promo_id: string;
  question: string;
  answer: string;
  sort_order?: number;
}

// ============================================================================
// View Types
// ============================================================================

export interface DbCardSummary extends DbCard {
  active_rule_count: number;
  active_note_count: number;
}

export interface DbExpiringRule extends DbCardRule {
  card_name: string;
  card_bank: string;
  days_until_expiry: number;
}

export interface DbExpiredRule extends DbCardRule {
  card_name: string;
  card_bank: string;
  days_expired: number;
}

export interface DbActivePromo extends DbPromo {
  related_card_ids: string[];
}

export interface DbExpiringPromo extends DbPromo {
  days_until_expiry: number;
}

// ============================================================================
// Utility Types
// ============================================================================

export interface DbCardWithRules extends DbCard {
  rules: DbCardRule[];
  notes: DbCardNote[];
}

export interface DbPromoWithFaqs extends DbPromo {
  faqs: DbPromoFaq[];
  related_cards: DbCard[];
}

