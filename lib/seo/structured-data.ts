/**
 * Structured Data (JSON-LD) 生成器
 * 用於 SEO 優化，讓 Google 更好理解頁面內容
 */

const SITE_URL = 'https://pickcardrebate.com';
const SITE_NAME = 'PickCardRebate';

/**
 * 網站 Schema
 */
export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    alternateName: '香港信用卡回贈比較',
    url: SITE_URL,
    description: '香港信用卡回贈比較計算機，一鍵找出最高回贈信用卡',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * 組織 Schema
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    sameAs: [
      'https://www.facebook.com/pickcardrebate',
      'https://www.instagram.com/pickcardrebate',
    ],
  };
}

/**
 * 信用卡 Product Schema
 */
export function generateCardSchema(card: {
  id: string;
  name: string;
  bank: string;
  imageUrl?: string;
  sellingPoints?: string[];
  annualFee?: number;
  baseRebate?: number;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: card.name,
    brand: {
      '@type': 'Brand',
      name: card.bank,
    },
    description: card.sellingPoints?.join('。') || `${card.bank} ${card.name} 信用卡`,
    image: card.imageUrl || `${SITE_URL}/og-image.png`,
    url: `${SITE_URL}/cards/${card.id}`,
    category: '信用卡',
    offers: {
      '@type': 'Offer',
      price: card.annualFee || 0,
      priceCurrency: 'HKD',
      availability: 'https://schema.org/InStock',
    },
  };
}

/**
 * 文章 Article Schema
 */
export function generateArticleSchema(article: {
  slug: string;
  title: string;
  description: string;
  imageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
  author?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: article.imageUrl || `${SITE_URL}/og-image.png`,
    url: `${SITE_URL}/discover/${article.slug}`,
    datePublished: article.createdAt,
    dateModified: article.updatedAt || article.createdAt,
    author: {
      '@type': 'Organization',
      name: article.author || SITE_NAME,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/discover/${article.slug}`,
    },
  };
}

/**
 * FAQ Schema
 */
export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * 麵包屑 BreadcrumbList Schema
 */
export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

/**
 * 排行榜 ItemList Schema
 */
export function generateRankingSchema(
  cards: { id: string; name: string; bank: string; rank: number }[],
  category?: string
) {
  const categoryName = category || '信用卡回贈';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${categoryName}排行榜`,
    description: `香港${categoryName}信用卡回贈排行榜`,
    numberOfItems: cards.length,
    itemListElement: cards.map((card, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: card.name,
      url: `${SITE_URL}/cards/${card.id}`,
    })),
  };
}

/**
 * 生成 JSON-LD Script 標籤內容
 */
export function jsonLdScript(data: object): string {
  return JSON.stringify(data);
}

