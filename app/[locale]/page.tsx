import { Locale } from '@/lib/i18n/config';
import HomePage from './home-client';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function LocaleHomePage({ params }: PageProps) {
  const { locale } = await params;
  
  return <HomePage locale={locale as Locale} />;
}

