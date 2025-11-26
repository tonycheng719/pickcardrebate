import type { Metadata } from "next";
import { Providers } from "@/components/providers";
import { BottomNav } from "@/components/bottom-nav";
import "./globals.css";

export const metadata: Metadata = {
  title: "信用卡回饋大師 | PickCardRebate",
  description: "一鍵找出最高回饋信用卡，聰明消費，解放腦力。",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0", // Prevent zoom on inputs
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-HK" suppressHydrationWarning>
      <body className="antialiased bg-gray-50 dark:bg-gray-950 min-h-screen text-gray-900 dark:text-gray-100 transition-colors duration-300 pb-20 md:pb-0">
        <Providers>
        {children}
          <div className="md:hidden">
            <BottomNav />
          </div>
        </Providers>
      </body>
    </html>
  );
}
