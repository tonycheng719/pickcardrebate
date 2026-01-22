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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://pickcardrebate.com';
  const currentDate = new Date().toISOString();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/discover`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/cards`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/cards/compare`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/rankings`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/calculator`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/wallet`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: '2025-12-05',
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: '2025-12-05',
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: '2025-12-05',
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // Guide/Article pages
  const guidePages: MetadataRoute.Sitemap = GUIDE_SLUGS.map((slug) => ({
    url: `${baseUrl}/discover/${slug}`,
    lastModified: currentDate, // Will be updated when we have DB-stored lastUpdated
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Credit card detail pages
  const cardPages: MetadataRoute.Sitemap = HK_CARDS
    .filter((card) => !card.hidden)
    .map((card) => ({
      url: `${baseUrl}/cards/${card.id}`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));

  return [...staticPages, ...guidePages, ...cardPages];
}
