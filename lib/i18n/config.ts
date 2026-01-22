export const locales = ['zh-HK', 'zh-CN', 'en'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'zh-HK';

// URL 路徑對應
export const localePathMap: Record<Locale, string> = {
  'zh-HK': '', // 預設語言不需要前綴
  'zh-CN': 'zh-cn',
  'en': 'en',
};

// 反向映射：路徑 -> locale
export const pathLocaleMap: Record<string, Locale> = {
  '': 'zh-HK',
  'zh-cn': 'zh-CN',
  'en': 'en',
};

// hreflang 代碼
export const hreflangMap: Record<Locale, string> = {
  'zh-HK': 'zh-Hant-HK',
  'zh-CN': 'zh-Hans-CN',
  'en': 'en',
};

// 語言顯示名稱
export const localeNames: Record<Locale, string> = {
  'zh-HK': '繁體中文',
  'zh-CN': '简体中文',
  'en': 'English',
};

// 語言旗幟 emoji
export const localeFlags: Record<Locale, string> = {
  'zh-HK': '🇭🇰',
  'zh-CN': '🇨🇳',
  'en': '🇬🇧',
};

/**
 * 從 URL 路徑中提取語言
 */
export function getLocaleFromPath(pathname: string): Locale {
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0] || '';
  
  if (firstSegment === 'en') return 'en';
  if (firstSegment === 'zh-cn') return 'zh-CN';
  return 'zh-HK';
}

/**
 * 從路徑中移除語言前綴
 */
export function removeLocaleFromPath(pathname: string): string {
  const locale = getLocaleFromPath(pathname);
  if (locale === 'zh-HK') return pathname;
  
  const prefix = `/${localePathMap[locale]}`;
  if (pathname.startsWith(prefix)) {
    return pathname.slice(prefix.length) || '/';
  }
  return pathname;
}

/**
 * 為路徑添加語言前綴
 */
export function addLocaleToPath(pathname: string, locale: Locale): string {
  const cleanPath = removeLocaleFromPath(pathname);
  const prefix = localePathMap[locale];
  
  if (!prefix) return cleanPath;
  return `/${prefix}${cleanPath === '/' ? '' : cleanPath}`;
}

/**
 * 檢查路徑是否需要國際化
 */
export function shouldLocalizePath(pathname: string): boolean {
  // 排除不需要國際化的路徑
  const excludedPaths = [
    '/api/',
    '/admin/',
    '/auth/',
    '/_next/',
    '/favicon',
    '/robots.txt',
    '/sitemap.xml',
    '/manifest.json',
    '/images/',
    '/icons/',
    '/logo',
  ];
  
  return !excludedPaths.some(path => pathname.startsWith(path));
}

