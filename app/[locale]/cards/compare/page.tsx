import { Metadata } from 'next';
import { Locale, urlPaths, getLocaleFromUrlParam } from '@/lib/i18n/config';
import CompareClient from './compare-client';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return urlPaths.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = getLocaleFromUrlParam(localeParam);
  
  const titles: Record<Locale, string> = {
    'zh-HK': '信用卡比較 | PickCardRebate',
    'zh-CN': '信用卡比较 | PickCardRebate',
    'en': 'Compare Credit Cards | PickCardRebate',
  };
  
  const descriptions: Record<Locale, string> = {
    'zh-HK': '比較多張信用卡的年費、回贈率、迎新優惠，找出最適合你的信用卡！',
    'zh-CN': '比较多张信用卡的年费、回赠率、迎新优惠，找出最适合你的信用卡！',
    'en': 'Compare multiple credit cards side by side - annual fees, rebate rates, welcome offers and more!',
  };
  
  return {
    title: titles[locale] || titles['zh-HK'],
    description: descriptions[locale] || descriptions['zh-HK'],
  };
}

export default async function ComparePage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const locale = getLocaleFromUrlParam(localeParam);
  
  return <CompareClient locale={locale} />;
}


