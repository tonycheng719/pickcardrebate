import { Metadata } from 'next';
import { Locale, locales } from '@/lib/i18n/config';
import { getTranslation } from '@/lib/i18n/translations';
import CardsClient from './cards-client';

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
    title: t.seo.cardsTitle,
    description: t.seo.cardsDescription,
  };
}

export default async function CardsPage({ params }: PageProps) {
  const { locale } = await params;
  
  return <CardsClient locale={locale as Locale} />;
}


