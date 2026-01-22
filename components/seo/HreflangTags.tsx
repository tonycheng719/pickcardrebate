"use client";

import { usePathname } from 'next/navigation';

const BASE_URL = 'https://pickcardrebate.com';

interface HreflangConfig {
  hreflang: string;
  prefix: string;
}

const LOCALES: HreflangConfig[] = [
  { hreflang: 'zh-Hant-HK', prefix: '' },
  { hreflang: 'zh-Hans-CN', prefix: '/zh-cn' },
  { hreflang: 'en', prefix: '/en' },
];

/**
 * 生成 hreflang 標籤用於多語言 SEO
 * 這些標籤告訴搜索引擎網頁的不同語言版本
 */
export function HreflangTags() {
  const pathname = usePathname();
  
  // 獲取不帶語言前綴的基礎路徑
  let basePath = pathname || '/';
  if (basePath.startsWith('/zh-cn')) {
    basePath = basePath.slice(6) || '/';
  } else if (basePath.startsWith('/en')) {
    basePath = basePath.slice(3) || '/';
  }

  return (
    <>
      {LOCALES.map((locale) => (
        <link
          key={locale.hreflang}
          rel="alternate"
          hrefLang={locale.hreflang}
          href={`${BASE_URL}${locale.prefix}${basePath}`}
        />
      ))}
      {/* x-default 指向預設語言版本 */}
      <link
        rel="alternate"
        hrefLang="x-default"
        href={`${BASE_URL}${basePath}`}
      />
    </>
  );
}

