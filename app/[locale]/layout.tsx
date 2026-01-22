import { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { locales, Locale, hreflangMap, defaultLocale, pathLocaleMap } from '@/lib/i18n/config';
import { Metadata } from 'next';

// URL 路徑列表
const urlPaths = ['zh-HK', 'zh-cn', 'en'] as const;
type UrlPath = (typeof urlPaths)[number];

// URL 路徑 -> Locale 映射
const urlPathToLocale: Record<UrlPath, Locale> = {
  'zh-HK': 'zh-HK',
  'zh-cn': 'zh-CN',
  'en': 'en',
};

// 生成靜態參數 - 使用 URL 路徑
export function generateStaticParams() {
  return urlPaths.map((path) => ({ locale: path }));
}

// 驗證並轉換 locale 參數
function getLocaleFromParam(param: string): Locale | null {
  if (param === 'zh-HK') return 'zh-HK';
  if (param === 'zh-cn') return 'zh-CN';
  if (param === 'en') return 'en';
  return null;
}

// 為每個語言生成 metadata
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = getLocaleFromParam(localeParam);
  
  if (!locale) {
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
  const { locale: localeParam } = await params;
  const locale = getLocaleFromParam(localeParam);
  
  // 驗證 locale
  if (!locale) {
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

