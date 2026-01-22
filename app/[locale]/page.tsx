import { getLocaleFromUrlParam } from '@/lib/i18n/config';
import HomePage from './home-client';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function LocaleHomePage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const locale = getLocaleFromUrlParam(localeParam);
  
  return <HomePage locale={locale} />;
}

