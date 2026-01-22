import { Locale } from './config';
import type { CreditCard, Merchant, Category, Promo } from '../types';

/**
 * Get localized credit card data
 */
export function getLocalizedCard(card: CreditCard, locale: Locale): CreditCard {
  if (locale === 'zh-HK') {
    return card;
  }
  
  if (locale === 'zh-CN') {
    return {
      ...card,
      name: card.name_zh_cn || card.name,
      bank: card.bank_zh_cn || card.bank,
      welcomeOfferText: card.welcomeOfferText_zh_cn || card.welcomeOfferText,
      sellingPoints: (card.sellingPoints_zh_cn && card.sellingPoints_zh_cn.length > 0) 
        ? card.sellingPoints_zh_cn : card.sellingPoints,
      feeWaiverCondition: card.feeWaiverCondition_zh_cn || card.feeWaiverCondition,
      rewardTimeline: card.rewardTimeline_zh_cn || card.rewardTimeline,
      note: card.note_zh_cn || card.note,
      tags: (card.tags_zh_cn && card.tags_zh_cn.length > 0) ? card.tags_zh_cn : card.tags,
    };
  }
  
  // English
  return {
    ...card,
    name: card.name_en || card.name,
    bank: card.bank_en || card.bank,
    welcomeOfferText: card.welcomeOfferText_en || card.welcomeOfferText,
    sellingPoints: (card.sellingPoints_en && card.sellingPoints_en.length > 0) 
      ? card.sellingPoints_en : card.sellingPoints,
    feeWaiverCondition: card.feeWaiverCondition_en || card.feeWaiverCondition,
    rewardTimeline: card.rewardTimeline_en || card.rewardTimeline,
    note: card.note_en || card.note,
    tags: (card.tags_en && card.tags_en.length > 0) ? card.tags_en : card.tags,
  };
}

/**
 * Get localized merchant data
 */
export function getLocalizedMerchant(merchant: Merchant, locale: Locale): Merchant {
  if (locale === 'zh-HK') {
    return merchant;
  }
  
  if (locale === 'zh-CN') {
    return {
      ...merchant,
      name: merchant.name_zh_cn || merchant.name,
      aliases: (merchant.aliases_zh_cn && merchant.aliases_zh_cn.length > 0) 
        ? merchant.aliases_zh_cn : merchant.aliases,
    };
  }
  
  return {
    ...merchant,
    name: merchant.name_en || merchant.name,
    aliases: (merchant.aliases_en && merchant.aliases_en.length > 0) 
      ? merchant.aliases_en : merchant.aliases,
  };
}

/**
 * Get localized category data
 */
export function getLocalizedCategory(category: Category, locale: Locale): Category {
  if (locale === 'zh-HK') {
    return category;
  }
  
  if (locale === 'zh-CN') {
    return {
      ...category,
      name: category.name_zh_cn || category.name,
    };
  }
  
  return {
    ...category,
    name: category.name_en || category.name,
  };
}

/**
 * Get localized promo/article data
 */
export function getLocalizedPromo(promo: Promo, locale: Locale): Promo {
  if (locale === 'zh-HK') {
    return promo;
  }
  
  if (locale === 'zh-CN') {
    return {
      ...promo,
      title: promo.title_zh_cn || promo.title,
      description: promo.description_zh_cn || promo.description,
      content: promo.content_zh_cn || promo.content,
      merchant: promo.merchant_zh_cn || promo.merchant,
      tags: (promo.tags_zh_cn && promo.tags_zh_cn.length > 0) ? promo.tags_zh_cn : promo.tags,
      seoTitle: promo.seoTitle_zh_cn || promo.seoTitle,
      seoDescription: promo.seoDescription_zh_cn || promo.seoDescription,
      faqs: promo.faqs_zh_cn || promo.faqs,
    };
  }
  
  return {
    ...promo,
    title: promo.title_en || promo.title,
    description: promo.description_en || promo.description,
    content: promo.content_en || promo.content,
    merchant: promo.merchant_en || promo.merchant,
    tags: (promo.tags_en && promo.tags_en.length > 0) ? promo.tags_en : promo.tags,
    seoTitle: promo.seoTitle_en || promo.seoTitle,
    seoDescription: promo.seoDescription_en || promo.seoDescription,
    faqs: promo.faqs_en || promo.faqs,
  };
}

/**
 * Check if content has translation for a given locale
 */
export function hasTranslation(
  item: { languagesCompleted?: string[] },
  locale: Locale
): boolean {
  if (locale === 'zh-HK') return true; // Default language always available
  return item.languagesCompleted?.includes(locale) ?? false;
}

/**
 * Get translation completion status
 */
export function getTranslationStatus(item: { languagesCompleted?: string[] }): {
  'zh-HK': boolean;
  'zh-CN': boolean;
  'en': boolean;
} {
  const completed = item.languagesCompleted || ['zh-HK'];
  return {
    'zh-HK': true, // Always true for default
    'zh-CN': completed.includes('zh-CN'),
    'en': completed.includes('en'),
  };
}

/**
 * Bank name translations (common banks)
 */
export const BANK_TRANSLATIONS: Record<string, { en: string; 'zh-CN': string }> = {
  'HSBC': { en: 'HSBC', 'zh-CN': 'HSBC 汇丰' },
  '匯豐': { en: 'HSBC', 'zh-CN': '汇丰' },
  '渣打': { en: 'Standard Chartered', 'zh-CN': '渣打' },
  'Standard Chartered': { en: 'Standard Chartered', 'zh-CN': '渣打' },
  '恒生': { en: 'Hang Seng', 'zh-CN': '恒生' },
  'Hang Seng': { en: 'Hang Seng', 'zh-CN': '恒生' },
  '中銀': { en: 'Bank of China', 'zh-CN': '中银' },
  'BOC': { en: 'Bank of China', 'zh-CN': '中银' },
  'DBS': { en: 'DBS', 'zh-CN': 'DBS 星展' },
  '星展': { en: 'DBS', 'zh-CN': '星展' },
  'Citi': { en: 'Citi', 'zh-CN': 'Citi 花旗' },
  '花旗': { en: 'Citi', 'zh-CN': '花旗' },
  'American Express': { en: 'American Express', 'zh-CN': '美国运通' },
  'Amex': { en: 'American Express', 'zh-CN': '美国运通' },
  '東亞': { en: 'BEA', 'zh-CN': '东亚' },
  'BEA': { en: 'BEA', 'zh-CN': '东亚' },
  '大新': { en: 'Dah Sing', 'zh-CN': '大新' },
  '富邦': { en: 'Fubon', 'zh-CN': '富邦' },
  '建行': { en: 'CCB', 'zh-CN': '建行' },
  'CCB': { en: 'CCB', 'zh-CN': '建行' },
  '工銀': { en: 'ICBC', 'zh-CN': '工银' },
  'ICBC': { en: 'ICBC', 'zh-CN': '工银' },
  '招商': { en: 'CMB', 'zh-CN': '招商' },
  '安信': { en: 'AEON', 'zh-CN': '安信' },
  'AEON': { en: 'AEON', 'zh-CN': 'AEON 安信' },
  'WeChat Pay HK': { en: 'WeChat Pay HK', 'zh-CN': '微信支付香港' },
  'Mox': { en: 'Mox', 'zh-CN': 'Mox' },
  'ZA Bank': { en: 'ZA Bank', 'zh-CN': 'ZA Bank 众安' },
  'livi': { en: 'livi bank', 'zh-CN': 'livi 理慧' },
};

/**
 * Get bank name in specified locale
 */
export function getLocalizedBankName(bank: string, locale: Locale): string {
  if (locale === 'zh-HK') return bank;
  
  const translation = BANK_TRANSLATIONS[bank];
  if (translation) {
    return locale === 'en' ? translation.en : translation['zh-CN'];
  }
  
  return bank;
}

/**
 * Category name translations
 */
export const CATEGORY_TRANSLATIONS: Record<string, { en: string; 'zh-CN': string }> = {
  '餐飲': { en: 'Dining', 'zh-CN': '餐饮' },
  '超市': { en: 'Supermarket', 'zh-CN': '超市' },
  '網購': { en: 'Online Shopping', 'zh-CN': '网购' },
  '旅遊': { en: 'Travel', 'zh-CN': '旅游' },
  '交通': { en: 'Transport', 'zh-CN': '交通' },
  '娛樂': { en: 'Entertainment', 'zh-CN': '娱乐' },
  '繳費': { en: 'Bill Payment', 'zh-CN': '缴费' },
  '海外': { en: 'Overseas', 'zh-CN': '海外' },
  '百貨': { en: 'Department Store', 'zh-CN': '百货' },
  '電子錢包': { en: 'E-Wallet', 'zh-CN': '电子钱包' },
  '其他': { en: 'Others', 'zh-CN': '其他' },
};

/**
 * Get category name in specified locale
 */
export function getLocalizedCategoryName(name: string, locale: Locale): string {
  if (locale === 'zh-HK') return name;
  
  const translation = CATEGORY_TRANSLATIONS[name];
  if (translation) {
    return locale === 'en' ? translation.en : translation['zh-CN'];
  }
  
  return name;
}

