import { Metadata } from 'next';
import { Locale, urlPaths, getLocaleFromUrlParam } from '@/lib/i18n/config';
import { HK_CARDS } from '@/lib/data/cards';
import CardDetailClient from './card-detail-client';

interface PageProps {
  params: Promise<{ locale: string; id: string }>;
}

export function generateStaticParams() {
  const params: { locale: string; id: string }[] = [];
  for (const urlPath of urlPaths) {
    for (const card of HK_CARDS) {
      params.push({ locale: urlPath, id: card.id });
    }
  }
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id, locale: localeParam } = await params;
  const locale = getLocaleFromUrlParam(localeParam);
  const card = HK_CARDS.find(c => c.id === id);
  
  if (!card) {
    return {
      title: 'Card Not Found',
    };
  }
  
  const titles: Record<Locale, string> = {
    'zh-HK': `${card.name} | ${card.bank} 信用卡詳情`,
    'zh-CN': `${card.name} | ${card.bank} 信用卡详情`,
    'en': `${card.name} | ${card.bank} Credit Card Details`,
  };
  
  const descriptions: Record<Locale, string> = {
    'zh-HK': card.sellingPoints?.join('。') || `${card.bank} ${card.name} 信用卡詳情、優惠及申請資格`,
    'zh-CN': card.sellingPoints?.join('。') || `${card.bank} ${card.name} 信用卡详情、优惠及申请资格`,
    'en': card.sellingPoints?.join('. ') || `${card.bank} ${card.name} credit card details, offers and eligibility`,
  };
  
  return {
    title: titles[locale] || titles['zh-HK'],
    description: descriptions[locale] || descriptions['zh-HK'],
    openGraph: {
      title: titles[locale] || titles['zh-HK'],
      description: descriptions[locale] || descriptions['zh-HK'],
      images: card.imageUrl ? [card.imageUrl] : undefined,
    },
  };
}

export default async function CardDetailPage({ params }: PageProps) {
  const { locale: localeParam, id } = await params;
  const locale = getLocaleFromUrlParam(localeParam);
  
  return <CardDetailClient locale={locale} cardId={id} />;
}


