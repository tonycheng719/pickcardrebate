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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-HK" suppressHydrationWarning>
      <body className="antialiased bg-gray-50 dark:bg-gray-950 min-h-screen text-gray-900 dark:text-gray-100 transition-colors duration-300 pb-20 md:pb-0 flex flex-col">
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
