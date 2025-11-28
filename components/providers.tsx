"use client";

import { WalletProvider } from "@/lib/store/wallet-context";
import { ReviewsProvider } from "@/lib/store/reviews-context";
import { DataStoreProvider } from "@/lib/admin/data-store";
import { ThemeProvider } from "@/components/theme-provider";
import { SettingsProvider } from "@/lib/store/settings-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <SettingsProvider>
        <DataStoreProvider>
          <WalletProvider>
            <ReviewsProvider>
              {children}
            </ReviewsProvider>
          </WalletProvider>
        </DataStoreProvider>
      </SettingsProvider>
    </ThemeProvider>
  );
}
