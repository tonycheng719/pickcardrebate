import { Metadata } from 'next';
import { Locale, locales } from '@/lib/i18n/config';
import { getTranslation } from '@/lib/i18n/translations';
import SettingsClient from './settings-client';

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
    title: t.settings.title,
  };
}

export default async function SettingsPage({ params }: PageProps) {
  const { locale } = await params;
  
  return <SettingsClient locale={locale as Locale} />;
}


