"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Avoid hydration mismatch by returning children only, or null if you prefer
    // But next-themes needs to mount.
    // Actually, best practice for next-themes is usually just this, but if toggling is unresponsive initially,
    // it might be because the theme hasn't been hydrated.
    // However, NextThemesProvider handles mounting internally.
    // The issue might be in the toggle button's logic assuming a state that isn't ready.
    return <>{children}</>;
  }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

export { useTheme } from "next-themes";
