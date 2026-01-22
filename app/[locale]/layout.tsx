import { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { locales, Locale, hreflangMap, defaultLocale } from '@/lib/i18n/config';
import { Metadata } from 'next';

// 生成靜態參數
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// 驗證 locale 參數
function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

// 為每個語言生成 metadata
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}): Promise<Metadata> {
  const { locale } = await params;
  
  if (!isValidLocale(locale)) {
    return {};
  }
  
  const baseUrl = 'https://pickcardrebate.com';
  
  // 根據語言返回不同的 metadata
  const metadataByLocale: Record<Locale, Metadata> = {
    'zh-HK': {
      title: {
        default: 'PickCardRebate | 香港信用卡回贈比較計算機 - 一鍵找出最高回贈',
        template: '%s | PickCardRebate',
      },
      description: '香港最強信用卡回贈計算機！即時比較全港信用卡優惠，輸入商戶金額即知邊張卡最抵。',
      openGraph: {
        locale: 'zh_HK',
      },
    },
    'zh-CN': {
      title: {
        default: 'PickCardRebate | 香港信用卡回赠比较计算器 - 一键找出最高回赠',
        template: '%s | PickCardRebate',
      },
      description: '香港最强信用卡回赠计算器！即时比较全港信用卡优惠，输入商户金额即知哪张卡最划算。',
      openGraph: {
        locale: 'zh_CN',
      },
    },
    'en': {
      title: {
        default: 'PickCardRebate | Hong Kong Credit Card Rebate Calculator - Find the Best Cashback',
        template: '%s | PickCardRebate',
      },
      description: 'The ultimate Hong Kong credit card rebate calculator! Instantly compare credit card offers across all banks.',
      openGraph: {
        locale: 'en_US',
      },
    },
  };
  
  return {
    ...metadataByLocale[locale],
    alternates: {
      canonical: locale === defaultLocale ? baseUrl : `${baseUrl}/${locale === 'zh-CN' ? 'zh-cn' : locale}`,
      languages: {
        'zh-Hant-HK': baseUrl,
        'zh-Hans-CN': `${baseUrl}/zh-cn`,
        'en': `${baseUrl}/en`,
        'x-default': baseUrl,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // 驗證 locale
  if (!isValidLocale(locale)) {
    notFound();
  }
  
  return (
    <>
      {/* Hreflang 標籤 */}
      <head>
        <link rel="alternate" hrefLang="zh-Hant-HK" href="https://pickcardrebate.com" />
        <link rel="alternate" hrefLang="zh-Hans-CN" href="https://pickcardrebate.com/zh-cn" />
        <link rel="alternate" hrefLang="en" href="https://pickcardrebate.com/en" />
        <link rel="alternate" hrefLang="x-default" href="https://pickcardrebate.com" />
      </head>
      {children}
    </>
  );
}

