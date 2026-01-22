import { Metadata } from 'next';

const SITE_NAME = 'PickCardRebate';
const SITE_URL = 'https://pickcardrebate.com';
const DEFAULT_OG_IMAGE = '/og-image.png';

export interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: 'website' | 'article' | 'product';
  canonical?: string;
  noIndex?: boolean;
}

/**
 * 生成頁面 Metadata
 */
export function generateMetadata({
  title,
  description,
  keywords = [],
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  canonical,
  noIndex = false,
}: SEOProps): Metadata {
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  
  const defaultKeywords = [
    '香港信用卡',
    '信用卡回贈',
    '信用卡比較',
    '現金回贈',
    '飛行里數',
    'credit card',
    'cashback',
  ];

  return {
    title: fullTitle,
    description,
    keywords: [...keywords, ...defaultKeywords].join(', '),
    authors: [{ name: SITE_NAME }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: canonical || undefined,
    },
    robots: noIndex ? 'noindex, nofollow' : 'index, follow',
    openGraph: {
      title: fullTitle,
      description,
      type: ogType,
      siteName: SITE_NAME,
      locale: 'zh_HK',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
    },
  };
}

/**
 * 信用卡頁面 Metadata
 */
export function generateCardMetadata(card: {
  id: string;
  name: string;
  bank: string;
  imageUrl?: string;
  sellingPoints?: string[];
}): Metadata {
  const title = `${card.name} 回贈分析 | ${card.bank} 信用卡`;
  const description = card.sellingPoints?.slice(0, 2).join('。') || 
    `${card.bank} ${card.name} 信用卡詳情、回贈率、迎新優惠、申請資格一覽`;
  
  return generateMetadata({
    title,
    description,
    keywords: [card.name, card.bank, `${card.bank}信用卡`, `${card.name}回贈`],
    ogImage: card.imageUrl || DEFAULT_OG_IMAGE,
    ogType: 'product',
    canonical: `${SITE_URL}/cards/${card.id}`,
  });
}

/**
 * 文章頁面 Metadata
 */
export function generateArticleMetadata(article: {
  slug: string;
  title: string;
  description: string;
  imageUrl?: string;
  tags?: string[];
}): Metadata {
  return generateMetadata({
    title: article.title,
    description: article.description,
    keywords: article.tags,
    ogImage: article.imageUrl || DEFAULT_OG_IMAGE,
    ogType: 'article',
    canonical: `${SITE_URL}/discover/${article.slug}`,
  });
}

/**
 * 排行榜頁面 Metadata
 */
export function generateRankingMetadata(category?: string): Metadata {
  const categoryName = category ? getCategoryName(category) : '全部';
  const title = `${categoryName}信用卡回贈排行榜 2024`;
  const description = `香港${categoryName}信用卡回贈排行榜，比較各銀行信用卡回贈率，找出最抵信用卡`;

  return generateMetadata({
    title,
    description,
    keywords: [`${categoryName}信用卡`, '信用卡排行榜', '最抵信用卡'],
    canonical: category ? `${SITE_URL}/rankings?category=${category}` : `${SITE_URL}/rankings`,
  });
}

function getCategoryName(category: string): string {
  const names: Record<string, string> = {
    supermarket: '超市',
    dining: '餐飲',
    online: '網購',
    travel: '旅遊',
    general: '一般消費',
  };
  return names[category] || category;
}

