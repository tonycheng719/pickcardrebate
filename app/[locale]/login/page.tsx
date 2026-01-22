import { Metadata } from 'next';
import { urlPaths, getLocaleFromUrlParam } from '@/lib/i18n/config';
import { getTranslation } from '@/lib/i18n/translations';
import LoginClient from './login-client';

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
    title: t.auth.login,
    description: t.seo.homeDescription,
  };
}

export default async function LoginPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const locale = getLocaleFromUrlParam(localeParam);
  
  return <LoginClient locale={locale} />;
}


