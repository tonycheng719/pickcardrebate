import { Metadata } from 'next';
import { urlPaths, getLocaleFromUrlParam } from '@/lib/i18n/config';
import { getTranslation } from '@/lib/i18n/translations';
import RankingsClient from './rankings-client';

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
    title: t.seo.rankingsTitle,
    description: t.seo.rankingsDescription,
  };
}

export default async function RankingsPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const locale = getLocaleFromUrlParam(localeParam);
  
  return <RankingsClient locale={locale} />;
}


