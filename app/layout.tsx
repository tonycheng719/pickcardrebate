import type { Metadata, Viewport } from "next";
import { Providers } from "@/components/providers";
import { BottomNav } from "@/components/bottom-nav";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://pickcardrebate.com"),
  title: {
    default: "PickCardRebate | 香港信用卡回贈比較計算機 - 一鍵找出最高回贈",
    template: "%s | PickCardRebate",
  },
  description: "香港最強信用卡回贈計算機！即時比較全港信用卡優惠，輸入商戶金額即知邊張卡最抵。支援超市、餐飲、網購、旅遊等消費類別，助你每次消費都賺盡回贈。",
  keywords: [
    "信用卡回贈",
    "信用卡比較",
    "香港信用卡",
    "現金回贈",
    "飛行里數",
    "信用卡優惠",
    "超市回贈",
    "網購回贈",
    "HSBC信用卡",
    "渣打信用卡",
    "Citi信用卡",
    "恒生信用卡",
    "DBS信用卡",
    "信用卡計算機",
    "回贈計算",
  ],
  authors: [{ name: "PickCardRebate Team" }],
  creator: "PickCardRebate",
  publisher: "PickCardRebate",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "zh_HK",
    url: "https://pickcardrebate.com",
    siteName: "PickCardRebate",
    title: "PickCardRebate | 香港信用卡回贈比較計算機",
    description: "香港最強信用卡回贈計算機！即時比較全港信用卡優惠，一鍵找出最高回贈信用卡。",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PickCardRebate - 香港信用卡回贈計算機",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PickCardRebate | 香港信用卡回贈比較計算機",
    description: "香港最強信用卡回贈計算機！即時比較全港信用卡優惠。",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://pickcardrebate.com",
  },
  verification: {
    // Add your verification codes here when available
    // google: "your-google-verification-code",
  },
};

// WebSite Schema for site-wide SEO (including sitelinks search box)
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "PickCardRebate",
  "alternateName": "信用卡回贈計算機",
  "url": "https://pickcardrebate.com",
  "description": "香港最強信用卡回贈計算機！即時比較全港信用卡優惠，輸入商戶金額即知邊張卡最抵。",
  "inLanguage": "zh-HK",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://pickcardrebate.com/cards?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};

// Organization Schema
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "PickCardRebate",
  "url": "https://pickcardrebate.com",
  "logo": "https://pickcardrebate.com/logo.png",
  "description": "香港信用卡回贈比較平台，幫助消費者找出最高回贈的信用卡。",
  "sameAs": []
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-HK" suppressHydrationWarning>
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KF9V8CXN');`,
          }}
        />
        {/* End Google Tag Manager */}
        
        {/* WebSite Schema for Sitelinks Search Box */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-E0ST5J83F7"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-E0ST5J83F7');
            `,
          }}
        />
        {/* Meta Pixel Code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '944277972093865');
              fbq('track', 'PageView');
            `,
          }}
        />
        {/* End Meta Pixel Code */}
      </head>
      <body className="antialiased bg-gray-50 dark:bg-gray-950 min-h-screen text-gray-900 dark:text-gray-100 transition-colors duration-300 pb-20 md:pb-0 flex flex-col">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KF9V8CXN"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        
        {/* Meta Pixel (noscript) */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=944277972093865&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {/* End Meta Pixel (noscript) */}
        
        <Providers>
          <div className="flex-1">
            {children}
          </div>
          <SiteFooter />
          <div className="md:hidden">
            <BottomNav />
          </div>
        </Providers>
      </body>
    </html>
  );
}
