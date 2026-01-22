import { MetadataRoute } from 'next';
import { HK_CARDS } from '@/lib/data/cards';

// All guide slugs
const GUIDE_SLUGS = [
  'overseas-fee',
  'debit-card-guide',
  'miles-vs-cashback',
  'best-cashback-cards',
  'utility-bill-guide',
  'rent-payment-guide',
  'tax-payment-guide',
  'online-shopping-guide',
  'dining-guide',
  'overseas-spending-guide',
  'supermarket-guide',
  'taobao-guide',
  'no-annual-fee-guide',
  'student-card-guide',
  'large-purchase-guide',
  'octopus-guide',
  'mobile-payment-guide',
  'low-income-guide',
  'food-delivery-guide',
  'streaming-guide',
  'driving-guide',
  'insurance-guide',
  'pinduoduo-guide',
  'uber-guide',
  'iherb-guide',
  'iphone-guide',
  'ipad-guide',
  'macbook-guide',
  'apple-watch-guide',
  'ps5-guide',
  'xbox-guide',
  'switch-guide',
];

// 語言配置
const LOCALES = ['', '/zh-cn', '/en'] as const;
const BASE_URL = 'https://pickcardrebate.com';

// 為每個 URL 生成多語言版本
function generateMultilingualUrls(path: string, lastModified: string, priority: number, changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'): MetadataRoute.Sitemap {
  return LOCALES.map(locale => ({
    url: `${BASE_URL}${locale}${path}`,
    lastModified,
    changeFrequency,
    priority: locale === '' ? priority : priority * 0.9, // 非預設語言優先級稍低
    alternates: {
      languages: {
        'zh-Hant-HK': `${BASE_URL}${path}`,
        'zh-Hans-CN': `${BASE_URL}/zh-cn${path}`,
        'en': `${BASE_URL}/en${path}`,
      },
    },
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date().toISOString();

  // Static pages with multilingual support
  const staticPaths = [
    { path: '', priority: 1, changeFrequency: 'daily' as const },
    { path: '/discover', priority: 0.9, changeFrequency: 'daily' as const },
    { path: '/cards', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/cards/compare', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/rankings', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/calculator', priority: 0.9, changeFrequency: 'weekly' as const },
  ];

  const staticPages = staticPaths.flatMap(({ path, priority, changeFrequency }) => 
    generateMultilingualUrls(path, currentDate, priority, changeFrequency)
  );

  // Non-multilingual pages (auth, legal, etc.)
  const utilityPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/wallet`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/login`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: '2025-12-05',
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: '2025-12-05',
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: '2025-12-05',
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // Guide/Article pages with multilingual support
  const guidePages = GUIDE_SLUGS.flatMap((slug) => 
    generateMultilingualUrls(`/discover/${slug}`, currentDate, 0.7, 'weekly')
  );

  // Credit card detail pages with multilingual support
  const cardPages = HK_CARDS
    .filter((card) => !card.hidden)
    .flatMap((card) => 
      generateMultilingualUrls(`/cards/${card.id}`, currentDate, 0.6, 'monthly')
    );

  return [...staticPages, ...utilityPages, ...guidePages, ...cardPages];
}
