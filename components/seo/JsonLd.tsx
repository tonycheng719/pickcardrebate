'use client';

import Script from 'next/script';

interface JsonLdProps {
  data: object | object[];
}

/**
 * JSON-LD Structured Data 組件
 * 用於在頁面中嵌入 SEO 結構化數據
 */
export function JsonLd({ data }: JsonLdProps) {
  const jsonLdArray = Array.isArray(data) ? data : [data];
  
  return (
    <>
      {jsonLdArray.map((item, index) => (
        <Script
          key={index}
          id={`json-ld-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(item),
          }}
          strategy="afterInteractive"
        />
      ))}
    </>
  );
}

/**
 * 網站級別的 JSON-LD（用於 layout）
 */
export function GlobalJsonLd() {
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'PickCardRebate',
    alternateName: '香港信用卡回贈比較',
    url: 'https://pickcardrebate.com',
    description: '香港信用卡回贈比較計算機，一鍵找出最高回贈信用卡',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://pickcardrebate.com/?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'PickCardRebate',
    url: 'https://pickcardrebate.com',
    logo: 'https://pickcardrebate.com/logo.png',
  };

  return <JsonLd data={[websiteSchema, organizationSchema]} />;
}

