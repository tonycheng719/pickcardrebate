import { Metadata } from 'next';
import { Locale, locales } from '@/lib/i18n/config';
import { getTranslation } from '@/lib/i18n/translations';
import RankingsClient from './rankings-client';

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
    title: t.seo.rankingsTitle,
    description: t.seo.rankingsDescription,
  };
}

export default async function RankingsPage({ params }: PageProps) {
  const { locale } = await params;
  
  return <RankingsClient locale={locale as Locale} />;
}


