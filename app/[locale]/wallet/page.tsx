import { Metadata } from 'next';
import { urlPaths, getLocaleFromUrlParam } from '@/lib/i18n/config';
import { getTranslation } from '@/lib/i18n/translations';
import WalletClient from './wallet-client';

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
    title: t.seo.walletTitle,
    description: t.seo.walletDescription,
  };
}

export default async function WalletPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const locale = getLocaleFromUrlParam(localeParam);
  
  return <WalletClient locale={locale} />;
}


