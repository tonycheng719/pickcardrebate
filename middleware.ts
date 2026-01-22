import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 支援的語言
const SUPPORTED_LOCALES = ['zh-HK', 'zh-CN', 'en'] as const;
const DEFAULT_LOCALE = 'zh-HK';

// 語言路徑對應
const LOCALE_PATHS: Record<string, typeof SUPPORTED_LOCALES[number]> = {
  '/zh-cn': 'zh-CN',
  '/en': 'en',
};

// 需要排除的路徑
const EXCLUDED_PATHS = [
  '/api/',
  '/admin/',
  '/_next/',
  '/favicon',
  '/robots.txt',
  '/sitemap.xml',
  '/manifest.json',
  '/images/',
  '/icons/',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // 排除不需要處理的路徑
  if (EXCLUDED_PATHS.some(path => pathname.startsWith(path))) {
    const response = NextResponse.next();
    // 為 /admin 和 /api 路徑添加 noindex header
    if (pathname.startsWith('/admin') || pathname.startsWith('/api')) {
      response.headers.set('X-Robots-Tag', 'noindex, nofollow');
    }
    return response;
  }
  
  // 檢測 URL 中的語言前綴
  let detectedLocale: typeof SUPPORTED_LOCALES[number] = DEFAULT_LOCALE;
  let localePrefix = '';
  
  for (const [path, locale] of Object.entries(LOCALE_PATHS)) {
    if (pathname.startsWith(path)) {
      detectedLocale = locale;
      localePrefix = path;
      break;
    }
  }
  
  // 獲取實際路徑（移除語言前綴）
  const actualPath = localePrefix ? pathname.slice(localePrefix.length) || '/' : pathname;
  
  // 創建響應
  const response = NextResponse.next();
  
  // 設置語言 cookie（供客戶端使用）
  response.cookies.set('NEXT_LOCALE', detectedLocale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365, // 1 year
    sameSite: 'lax',
  });
  
  // 設置 Content-Language header
  response.headers.set('Content-Language', detectedLocale === 'zh-CN' ? 'zh-Hans-CN' : detectedLocale === 'en' ? 'en' : 'zh-Hant-HK');
  
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
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
