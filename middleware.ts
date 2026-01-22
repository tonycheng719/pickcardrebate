import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { 
  locales, 
  defaultLocale, 
  Locale, 
  localePathMap,
  getLocaleFromPath,
  shouldLocalizePath 
} from '@/lib/i18n/config';

const LOCALE_COOKIE = 'NEXT_LOCALE';

// 從 Accept-Language header 檢測首選語言
function getPreferredLocale(request: NextRequest): Locale {
  const acceptLanguage = request.headers.get('accept-language');
  if (!acceptLanguage) return defaultLocale;
  
  const languages = acceptLanguage.split(',').map(lang => {
    const [code, quality = '1'] = lang.trim().split(';q=');
    return { code: code.toLowerCase(), quality: parseFloat(quality) };
  }).sort((a, b) => b.quality - a.quality);
  
  for (const { code } of languages) {
    if (code.startsWith('en')) return 'en';
    if (code === 'zh-cn' || code === 'zh-hans') return 'zh-CN';
    if (code.startsWith('zh')) return 'zh-HK';
  }
  
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // 排除不需要處理的路徑
  if (!shouldLocalizePath(pathname)) {
    const response = NextResponse.next();
    // 為 /admin 和 /api 路徑添加 noindex header
    if (pathname.startsWith('/admin') || pathname.startsWith('/api')) {
      response.headers.set('X-Robots-Tag', 'noindex, nofollow');
    }
    return response;
  }
  
  // 檢查 URL 中是否已有語言前綴
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];
  const hasLocalePrefix = firstSegment === 'en' || firstSegment === 'zh-cn';
  
  // 確定當前語言
  let currentLocale: Locale;
  if (firstSegment === 'en') {
    currentLocale = 'en';
  } else if (firstSegment === 'zh-cn') {
    currentLocale = 'zh-CN';
  } else {
    currentLocale = 'zh-HK';
  }
  
  // 如果是預設語言且沒有前綴，這是正確的
  // 如果是非預設語言且有正確的前綴，這也是正確的
  // 無需重定向
  
  // 創建響應
  const response = NextResponse.next();
  
  // 設置語言 cookie
  response.cookies.set(LOCALE_COOKIE, currentLocale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365, // 1 year
    sameSite: 'lax',
  });
  
  // 設置 Content-Language header
  const contentLanguage = currentLocale === 'zh-CN' ? 'zh-Hans-CN' 
    : currentLocale === 'en' ? 'en' 
    : 'zh-Hant-HK';
  response.headers.set('Content-Language', contentLanguage);
  
  // 添加 Vary header 以正確處理快取
  response.headers.set('Vary', 'Accept-Language');
  
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\..*|api/).*)',
  ],
};
