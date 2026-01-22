"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Locale, translations, getTranslation } from './translations';

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: typeof translations['zh-HK'];
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const LOCALE_KEY = 'preferred_locale';

const VALID_LOCALES: Locale[] = ['zh-HK', 'zh-CN', 'en'];

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('zh-HK');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // 從 localStorage 讀取語言設定
    const savedLocale = localStorage.getItem(LOCALE_KEY) as Locale;
    if (savedLocale && VALID_LOCALES.includes(savedLocale)) {
      setLocaleState(savedLocale);
    } else {
      // 自動檢測瀏覽器語言
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith('en')) {
        setLocaleState('en');
      } else if (browserLang === 'zh-cn' || browserLang === 'zh-hans') {
        setLocaleState('zh-CN');
      }
      // 預設為 zh-HK
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem(LOCALE_KEY, newLocale);
    // 更新 HTML lang 屬性
    document.documentElement.lang = newLocale;
  };

  const t = getTranslation(locale);

  // 避免 hydration mismatch
  if (!mounted) {
    return (
      <I18nContext.Provider value={{ locale: 'zh-HK', setLocale, t: translations['zh-HK'] }}>
        {children}
      </I18nContext.Provider>
    );
  }

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
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
  const { t, locale, setLocale } = useI18n();
  return { t, locale, setLocale };
}

