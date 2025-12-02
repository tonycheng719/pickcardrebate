"use client";

import { WalletProvider } from "@/lib/store/wallet-context";
import { ReviewsProvider } from "@/lib/store/reviews-context";
import { DataStoreProvider } from "@/lib/admin/data-store";
import { ThemeProvider } from "@/components/theme-provider";
import { SettingsProvider } from "@/lib/store/settings-context";
import { AnalyticsUserTracker } from "@/components/analytics";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
      <SettingsProvider>
        <DataStoreProvider>
          <WalletProvider>
            <ReviewsProvider>
              <AnalyticsUserTracker />
              {children}
            </ReviewsProvider>
          </WalletProvider>
        </DataStoreProvider>
      </SettingsProvider>
    </ThemeProvider>
  );
}
