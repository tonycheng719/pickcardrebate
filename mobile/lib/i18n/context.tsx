import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Locale, translations, getTranslation } from './translations';
import * as Localization from 'expo-localization';

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: typeof translations['zh-HK'];
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const LOCALE_KEY = '@preferred_locale';
const VALID_LOCALES: Locale[] = ['zh-HK', 'zh-CN', 'en'];

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('zh-HK');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    loadLocale();
  }, []);

  const loadLocale = async () => {
    try {
      // 從 AsyncStorage 讀取語言設定
      const savedLocale = await AsyncStorage.getItem(LOCALE_KEY) as Locale;
      
      if (savedLocale && VALID_LOCALES.includes(savedLocale)) {
        setLocaleState(savedLocale);
      } else {
        // 自動檢測設備語言
        const deviceLocale = Localization.locale.toLowerCase();
        
        if (deviceLocale.startsWith('en')) {
          setLocaleState('en');
        } else if (deviceLocale === 'zh-cn' || deviceLocale === 'zh-hans' || deviceLocale.includes('hans')) {
          setLocaleState('zh-CN');
        }
        // 預設為 zh-HK
      }
    } catch (error) {
      console.error('Failed to load locale:', error);
    }
    setIsLoaded(true);
  };

  const setLocale = async (newLocale: Locale) => {
    setLocaleState(newLocale);
    try {
      await AsyncStorage.setItem(LOCALE_KEY, newLocale);
    } catch (error) {
      console.error('Failed to save locale:', error);
    }
  };

  const t = getTranslation(locale);

  // 等待加載完成
  if (!isLoaded) {
    return null;
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

// 便捷 hook
export function useTranslation() {
  const { t, locale, setLocale } = useI18n();
  return { t, locale, setLocale };
}

