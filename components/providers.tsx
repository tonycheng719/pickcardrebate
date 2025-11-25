"use client";

import { WalletProvider } from "@/lib/store/wallet-context";
import { ReviewsProvider } from "@/lib/store/reviews-context";
import { DataStoreProvider } from "@/lib/admin/data-store";
import { ThemeProvider } from "@/components/theme-provider";
import { BottomNav } from "@/components/bottom-nav";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <DataStoreProvider>
        <WalletProvider>
          <ReviewsProvider>
            {children}
            <div className="md:hidden">
              <BottomNav />
            </div>
          </ReviewsProvider>
        </WalletProvider>
      </DataStoreProvider>
    </ThemeProvider>
  );
}
