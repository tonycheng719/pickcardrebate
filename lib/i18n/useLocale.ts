"use client";

import { usePathname } from 'next/navigation';
import { Locale, getLocaleFromPath, localePathMap, defaultLocale } from './config';

/**
 * Hook to get current locale and locale-aware link helper
 */
export function useLocale() {
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname);
  
  /**
   * Get locale-prefixed path
   */
  const localePath = (path: string): string => {
    // If path already starts with a locale, return as-is
    if (path.startsWith('/en') || path.startsWith('/zh-cn')) {
      return path;
    }
    
    // For default locale (zh-HK), no prefix needed
    if (locale === defaultLocale) {
      return path;
    }
    
    // Add locale prefix
    const prefix = localePathMap[locale];
    return `/${prefix}${path === '/' ? '' : path}`;
  };
  
  return {
    locale,
    localePath,
    isDefaultLocale: locale === defaultLocale,
  };
}


