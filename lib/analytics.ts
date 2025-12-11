// Analytics utility for GA4 and Meta Pixel event tracking

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    fbq: (...args: unknown[]) => void;
  }
}

// Event types
export type AnalyticsEvent =
  | 'search'
  | 'calculate_rebate'
  | 'select_category'
  | 'view_card'
  | 'click_apply'
  | 'click_partner_apply'
  | 'compare_cards'
  | 'sign_up'
  | 'login'
  | 'add_to_wallet'
  | 'view_article'
  | 'share';

// Event parameters interface
export interface EventParams {
  // Search
  search_term?: string;
  // Category
  category_name?: string;
  // Card
  card_id?: string;
  card_name?: string;
  card_bank?: string;
  // Calculate
  amount?: number;
  payment_method?: string;
  merchant?: string;
  // Article
  article_slug?: string;
  article_title?: string;
  // Share
  content_type?: string;
  item_id?: string;
  // General
  value?: number;
  currency?: string;
  [key: string]: unknown;
}

// GA4 event mapping
const ga4EventMap: Record<AnalyticsEvent, string> = {
  search: 'search',
  calculate_rebate: 'calculate_rebate',
  select_category: 'select_content',
  view_card: 'view_item',
  click_apply: 'generate_lead',
  click_partner_apply: 'generate_lead',
  compare_cards: 'view_item_list',
  sign_up: 'sign_up',
  login: 'login',
  add_to_wallet: 'add_to_wishlist',
  view_article: 'view_item',
  share: 'share',
};

// Meta Pixel event mapping
const metaEventMap: Record<AnalyticsEvent, string> = {
  search: 'Search',
  calculate_rebate: 'CustomizeProduct',
  select_category: 'ViewContent',
  view_card: 'ViewContent',
  click_apply: 'Lead',
  click_partner_apply: 'Lead',
  compare_cards: 'ViewContent',
  sign_up: 'CompleteRegistration',
  login: 'Login',
  add_to_wallet: 'AddToWishlist',
  view_article: 'ViewContent',
  share: 'Share',
};

/**
 * Track an event to both GA4 and Meta Pixel
 */
export function trackEvent(event: AnalyticsEvent, params?: EventParams): void {
  // Track to GA4
  if (typeof window !== 'undefined' && window.gtag) {
    const ga4Event = ga4EventMap[event];
    window.gtag('event', ga4Event, {
      event_category: event,
      ...params,
    });
  }

  // Track to Meta Pixel
  if (typeof window !== 'undefined' && window.fbq) {
    const metaEvent = metaEventMap[event];
    window.fbq('track', metaEvent, params);
  }
}

/**
 * Track search event
 */
export function trackSearch(searchTerm: string): void {
  trackEvent('search', { search_term: searchTerm });
}

/**
 * Track calculate rebate event
 */
export function trackCalculateRebate(params: {
  amount: number;
  paymentMethod: string;
  merchant?: string;
  category?: string;
}): void {
  trackEvent('calculate_rebate', {
    amount: params.amount,
    payment_method: params.paymentMethod,
    merchant: params.merchant,
    category_name: params.category,
    value: params.amount,
    currency: 'HKD',
  });
}

/**
 * Track category selection event
 */
export function trackSelectCategory(categoryName: string): void {
  trackEvent('select_category', {
    category_name: categoryName,
    content_type: 'category',
  });
}

/**
 * Track view card event
 */
export function trackViewCard(params: {
  cardId: string;
  cardName: string;
  cardBank: string;
}): void {
  trackEvent('view_card', {
    card_id: params.cardId,
    card_name: params.cardName,
    card_bank: params.cardBank,
    content_type: 'credit_card',
    item_id: params.cardId,
  });
}

/**
 * Track click apply event (when user clicks to apply for a card)
 * @param isPartner - true for partner link (e.g. MoneyHero), false for official bank link
 */
export function trackClickApply(params: {
  cardId: string;
  cardName: string;
  cardBank: string;
  applyUrl?: string;
  isPartner?: boolean;
}): void {
  const eventName = params.isPartner ? 'click_apply_partner' : 'click_apply_official';
  trackEvent(eventName, {
    card_id: params.cardId,
    card_name: params.cardName,
    card_bank: params.cardBank,
    content_type: 'credit_card_application',
    apply_type: params.isPartner ? 'partner' : 'official',
  });
  
  // Also track generic click_apply for backward compatibility
  trackEvent('click_apply', {
    card_id: params.cardId,
    card_name: params.cardName,
    card_bank: params.cardBank,
    content_type: 'credit_card_application',
    apply_type: params.isPartner ? 'partner' : 'official',
  });
}

/**
 * Track compare cards event
 */
export function trackCompareCards(cardIds: string[]): void {
  trackEvent('compare_cards', {
    item_id: cardIds.join(','),
    content_type: 'card_comparison',
  });
}

/**
 * Track sign up event
 */
export function trackSignUp(method?: string): void {
  trackEvent('sign_up', {
    method: method || 'email',
  });
}

/**
 * Track login event
 */
export function trackLogin(method?: string): void {
  trackEvent('login', {
    method: method || 'email',
  });
}

/**
 * Track add to wallet event
 */
export function trackAddToWallet(params: {
  cardId: string;
  cardName: string;
}): void {
  trackEvent('add_to_wallet', {
    card_id: params.cardId,
    card_name: params.cardName,
    content_type: 'credit_card',
    item_id: params.cardId,
  });
}

/**
 * Track view article event
 */
export function trackViewArticle(params: {
  articleSlug: string;
  articleTitle: string;
}): void {
  trackEvent('view_article', {
    article_slug: params.articleSlug,
    article_title: params.articleTitle,
    content_type: 'article',
    item_id: params.articleSlug,
  });
}

/**
 * Track share event
 */
export function trackShare(params: {
  contentType: string;
  itemId: string;
  method?: string;
}): void {
  trackEvent('share', {
    content_type: params.contentType,
    item_id: params.itemId,
    method: params.method,
  });
}

/**
 * Track partner apply click (for partner offers)
 */
export function trackPartnerApply(params: {
  cardId: string;
  cardName: string;
  cardBank: string;
  partnerUrl?: string;
  bonusValue?: number;
}): void {
  trackEvent('click_partner_apply', {
    card_id: params.cardId,
    card_name: params.cardName,
    card_bank: params.cardBank,
    partner_url: params.partnerUrl,
    bonus_value: params.bonusValue,
    content_type: 'partner_application',
    value: params.bonusValue,
    currency: 'HKD',
  });
}

