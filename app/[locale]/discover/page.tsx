import { Metadata } from 'next';
import { Suspense } from 'react';
import { Locale, locales } from '@/lib/i18n/config';
import { getTranslation } from '@/lib/i18n/translations';
import { Navbar } from '@/components/navbar';
import { DiscoverClient } from '@/app/discover/discover-client';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = getTranslation(locale as Locale);
  
  return {
    title: t.seo.discoverTitle,
    description: t.seo.discoverDescription,
  };
}

export default async function DiscoverPage({ params }: PageProps) {
  const { locale } = await params;
  const t = getTranslation(locale as Locale);
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors pb-24 md:pb-0">
      <Navbar />
      <Suspense fallback={<div className="container mx-auto px-4 py-8 text-center text-gray-500">{t.common.loading}</div>}>
        <DiscoverClient />
      </Suspense>
    </div>
  );
}


