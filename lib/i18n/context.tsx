"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Locale, translations, getTranslation, localePaths } from './translations';

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: typeof translations['zh-HK'];
  getLocalizedPath: (path: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const LOCALE_KEY = 'preferred_locale';
const VALID_LOCALES: Locale[] = ['zh-HK', 'zh-CN', 'en'];

// 從 URL 路徑中檢測語言
function detectLocaleFromPath(pathname: string): Locale {
  if (pathname.startsWith('/zh-cn')) {
    return 'zh-CN';
  } else if (pathname.startsWith('/en')) {
    return 'en';
  }
  return 'zh-HK';
}

// 從 cookie 中讀取語言
function getLocaleFromCookie(): Locale | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(/NEXT_LOCALE=([^;]+)/);
  if (match && VALID_LOCALES.includes(match[1] as Locale)) {
    return match[1] as Locale;
  }
  return null;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  
  // 從 URL 路徑初始化語言
  const [locale, setLocaleState] = useState<Locale>(() => detectLocaleFromPath(pathname || ''));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // 優先從 URL 檢測語言
    const pathLocale = detectLocaleFromPath(pathname || '');
    
    // 如果 URL 沒有語言前綴，檢查 localStorage
    if (pathLocale === 'zh-HK') {
      const savedLocale = localStorage.getItem(LOCALE_KEY) as Locale;
      if (savedLocale && VALID_LOCALES.includes(savedLocale) && savedLocale !== 'zh-HK') {
        // 如果用戶之前選擇了其他語言，可以選擇重定向或保持當前
        // 這裡我們選擇保持 URL 優先
        setLocaleState('zh-HK');
      }
    } else {
      setLocaleState(pathLocale);
    }
  }, [pathname]);

  // 切換語言並更新 URL
  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem(LOCALE_KEY, newLocale);
    
    // 更新 HTML lang 屬性
    document.documentElement.lang = newLocale === 'zh-CN' ? 'zh-Hans' : newLocale === 'en' ? 'en' : 'zh-Hant';
    
    // 計算新的 URL
    const currentPath = pathname || '/';
    let basePath = currentPath;
    
    // 移除當前語言前綴
    if (currentPath.startsWith('/zh-cn')) {
      basePath = currentPath.slice(6) || '/';
    } else if (currentPath.startsWith('/en')) {
      basePath = currentPath.slice(3) || '/';
    }
    
    // 添加新語言前綴
    const newPath = localePaths[newLocale] + basePath;
    
    // 導航到新 URL
    router.push(newPath);
  }, [pathname, router]);

  // 獲取本地化路徑
  const getLocalizedPath = useCallback((path: string): string => {
    // 確保路徑以 / 開頭
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    return localePaths[locale] + normalizedPath;
  }, [locale]);

  const t = getTranslation(locale);

  // 避免 hydration mismatch
  if (!mounted) {
    return (
      <I18nContext.Provider value={{ 
        locale: 'zh-HK', 
        setLocale, 
        t: translations['zh-HK'],
        getLocalizedPath: (path) => path,
      }}>
        {children}
      </I18nContext.Provider>
    );
  }

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, getLocalizedPath }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
}

// 便捷 hook，直接獲取翻譯
export function useTranslation() {
  const { t, locale, setLocale, getLocalizedPath } = useI18n();
  return { t, locale, setLocale, getLocalizedPath };
}
