import { Metadata } from 'next';
import { Locale, locales } from '@/lib/i18n/config';
import { getTranslation } from '@/lib/i18n/translations';
import WalletClient from './wallet-client';

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
    title: t.seo.walletTitle,
    description: t.seo.walletDescription,
  };
}

export default async function WalletPage({ params }: PageProps) {
  const { locale } = await params;
  
  return <WalletClient locale={locale as Locale} />;
}


