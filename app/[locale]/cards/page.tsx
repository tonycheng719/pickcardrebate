import { Metadata } from 'next';
import { urlPaths, getLocaleFromUrlParam } from '@/lib/i18n/config';
import { getTranslation } from '@/lib/i18n/translations';
import CardsClient from './cards-client';

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
    title: t.seo.cardsTitle,
    description: t.seo.cardsDescription,
  };
}

export default async function CardsPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const locale = getLocaleFromUrlParam(localeParam);
  
  return <CardsClient locale={locale} />;
}


