import { MetadataRoute } from 'next';
import { HK_CARDS } from '@/lib/data/cards';
import { PROMOS } from '@/lib/data/promos';
import { RANKING_CATEGORIES } from '@/lib/logic/rankings';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://pickcardrebate.com';
  
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/cards`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/promos`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/rankings`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/wallet`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // Card detail pages (exclude hidden cards)
  const cardPages: MetadataRoute.Sitemap = HK_CARDS
    .filter(card => !card.hidden)
    .map((card) => ({
      url: `${baseUrl}/cards/${card.id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

  // Promo detail pages
  const promoPages: MetadataRoute.Sitemap = PROMOS.map((promo) => ({
    url: `${baseUrl}/promos/${promo.id}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }));

  // Blog/Rankings category pages
  const blogPages: MetadataRoute.Sitemap = RANKING_CATEGORIES.map((category) => ({
    url: `${baseUrl}/blog/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.85,
  }));

  return [...staticPages, ...cardPages, ...promoPages, ...blogPages];
}

