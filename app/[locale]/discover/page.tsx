import { Metadata } from 'next';
import { Suspense } from 'react';
import { urlPaths, getLocaleFromUrlParam } from '@/lib/i18n/config';
import { getTranslation } from '@/lib/i18n/translations';
import { Navbar } from '@/components/navbar';
import { DiscoverClient } from '@/app/discover/discover-client';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return urlPaths.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = getLocaleFromUrlParam(localeParam);
  const t = getTranslation(locale);
  
  return {
    title: t.seo.discoverTitle,
    description: t.seo.discoverDescription,
  };
}

export default async function DiscoverPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const locale = getLocaleFromUrlParam(localeParam);
  const t = getTranslation(locale);
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors pb-24 md:pb-0">
      <Navbar />
      <Suspense fallback={<div className="container mx-auto px-4 py-8 text-center text-gray-500">{t.common.loading}</div>}>
        <DiscoverClient />
      </Suspense>
    </div>
  );
}


