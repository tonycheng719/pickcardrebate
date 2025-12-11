import { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { DiscoverClient } from "./discover-client";
import { PROMOS } from "@/lib/data/promos";

// SEO Metadata - 針對長尾關鍵字優化
export const metadata: Metadata = {
  title: "信用卡優惠攻略｜最新優惠、回贈教學、慳錢技巧｜PickCardRebate",
  description: "香港信用卡優惠資訊中心！最新銀行優惠、限時回贈、海外簽賬攻略、網購慳錢技巧，幫你揀啱信用卡慳到盡。每日更新 HSBC、Citi、渣打、恒生等銀行優惠！",
  keywords: [
    // 主要關鍵字
    "信用卡優惠",
    "信用卡回贈",
    "信用卡攻略",
    // 銀行相關
    "HSBC 信用卡優惠",
    "Citi 信用卡優惠",
    "渣打信用卡優惠",
    "恒生信用卡優惠",
    "中銀信用卡優惠",
    "DBS 信用卡優惠",
    // 場景相關
    "超市信用卡優惠",
    "餐飲信用卡優惠",
    "網購信用卡優惠",
    "旅遊信用卡優惠",
    "海外簽賬優惠",
    // 長尾關鍵字
    "信用卡邊張好",
    "信用卡回贈比較",
    "信用卡迎新優惠",
    "信用卡慳錢攻略",
    "2025 信用卡優惠",
  ],
  openGraph: {
    title: "信用卡優惠攻略｜最新優惠、回贈教學｜PickCardRebate",
    description: "香港信用卡優惠資訊中心！最新銀行優惠、海外簽賬攻略、網購慳錢技巧，幫你慳到盡！",
    type: "website",
    url: "https://pickcardrebate.com/discover",
    siteName: "PickCardRebate",
    locale: "zh_HK",
    images: [
      {
        url: "https://pickcardrebate.com/og-discover.png",
        width: 1200,
        height: 630,
        alt: "PickCardRebate 信用卡優惠攻略",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "信用卡優惠攻略｜最新優惠、回贈教學",
    description: "香港信用卡優惠資訊中心！最新銀行優惠、海外簽賬攻略、網購慳錢技巧！",
  },
  alternates: {
    canonical: "https://pickcardrebate.com/discover",
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
};

// Structured Data for SEO
function getStructuredData() {
  const currentYear = new Date().getFullYear();
  
  return {
    "@context": "https://schema.org",
    "@graph": [
      // CollectionPage Schema
      {
        "@type": "CollectionPage",
        "@id": "https://pickcardrebate.com/discover#webpage",
        "url": "https://pickcardrebate.com/discover",
        "name": "信用卡優惠攻略｜最新優惠、回贈教學｜PickCardRebate",
        "description": "香港信用卡優惠資訊中心！最新銀行優惠、限時回贈、海外簽賬攻略、網購慳錢技巧。",
        "isPartOf": {
          "@id": "https://pickcardrebate.com/#website"
        },
        "inLanguage": "zh-HK",
        "datePublished": `${currentYear}-01-01`,
        "dateModified": new Date().toISOString().split('T')[0],
      },
      // BreadcrumbList Schema
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "首頁",
            "item": "https://pickcardrebate.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "探索優惠攻略",
            "item": "https://pickcardrebate.com/discover"
          }
        ]
      },
      // ItemList Schema - 列出優惠（使用 Article 而非 Offer，避免 shippingDetails 警告）
      {
        "@type": "ItemList",
        "name": "最新信用卡優惠",
        "description": "香港最新信用卡優惠資訊",
        "itemListElement": PROMOS.slice(0, 10).map((promo, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": "Article",
            "headline": promo.title,
            "description": promo.description,
            "url": `https://pickcardrebate.com/discover/${promo.id}`,
            "datePublished": promo.expiryDate,
            "author": {
              "@type": "Organization",
              "name": "PickCardRebate"
            }
          }
        }))
      },
      // FAQPage Schema - 常見問題
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "如何找到最適合我的信用卡優惠？",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "使用 PickCardRebate 的篩選功能，可按優惠類型（餐飲、網購、旅遊等）或銀行（HSBC、Citi、渣打等）篩選。我們會每日更新最新優惠資訊，助你找到最適合的信用卡優惠。"
            }
          },
          {
            "@type": "Question",
            "name": "信用卡優惠與信用卡回贈有什麼分別？",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "信用卡優惠通常是限時活動，如商戶折扣、額外回贈等；信用卡回贈則是卡的基本特性，如簽賬回贈比率。兩者可以疊加使用，達到最高慳錢效果。"
            }
          },
          {
            "@type": "Question",
            "name": "怎樣知道信用卡優惠的有效期？",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "每個優惠卡片都會顯示「剩餘天數」，快將到期的優惠會以紅色標示。你也可以登入後「關注」優惠，我們會在優惠即將到期時提醒你。"
            }
          },
          {
            "@type": "Question",
            "name": "海外簽賬有什麼需要注意？",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "海外簽賬需注意：1) 避免 DCC 動態貨幣轉換（堅持用當地貨幣結算）；2) 留意 CBF 跨境手續費（部分銀行會收取 1%）；3) 選擇免外幣手續費的信用卡可慳更多。詳情可查看我們的「海外簽賬攻略」。"
            }
          }
        ]
      }
    ]
  };
}

export default function DiscoverPage() {
  const structuredData = getStructuredData();
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors pb-24 md:pb-0">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <Navbar />
      <DiscoverClient />
    </div>
  );
}
