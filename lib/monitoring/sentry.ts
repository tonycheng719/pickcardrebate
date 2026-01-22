// Sentry 錯誤追蹤配置
// 使用前需要：npm install @sentry/nextjs

// 注意：實際使用需要在 Sentry 控制台創建項目並獲取 DSN
// 然後運行：npx @sentry/wizard@latest -i nextjs

export const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN || '';

export const sentryConfig = {
  dsn: SENTRY_DSN,
  
  // 性能監控採樣率（0.0 到 1.0）
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  
  // Session Replay 採樣率
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  
  // 環境設定
  environment: process.env.NODE_ENV,
  
  // 忽略的錯誤
  ignoreErrors: [
    // 網絡錯誤
    'Network request failed',
    'Failed to fetch',
    'Load failed',
    'NetworkError',
    
    // 用戶取消
    'AbortError',
    'The operation was aborted',
    
    // 擴展程式錯誤
    'Extension context invalidated',
    
    // 已知的第三方錯誤
    'ResizeObserver loop',
    'Non-Error promise rejection',
  ],
  
  // 標籤
  initialScope: {
    tags: {
      app: 'pickcardrebate',
    },
  },
};

// 自定義錯誤捕獲函數（不依賴 Sentry SDK）
export function captureError(error: Error, context?: Record<string, any>) {
  console.error('[Error]', error.message, context);
  
  // 如果 Sentry 已配置，可以在這裡發送
  if (SENTRY_DSN && typeof window !== 'undefined') {
    // 使用 Sentry.captureException(error, { extra: context });
  }
  
  // 發送到我們自己的錯誤追蹤 API
  if (typeof window !== 'undefined') {
    fetch('/api/stats/error', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: error.message,
        stack: error.stack,
        context,
        url: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
      }),
    }).catch(() => {
      // 忽略發送錯誤
    });
  }
}

// 性能追蹤
export function trackPerformance(name: string, duration: number, metadata?: Record<string, any>) {
  if (typeof window !== 'undefined') {
    // 發送性能數據
    fetch('/api/stats/performance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        duration,
        metadata,
        url: window.location.href,
        timestamp: new Date().toISOString(),
      }),
    }).catch(() => {});
  }
}

// 用戶行為追蹤
export function trackAction(action: string, data?: Record<string, any>) {
  if (typeof window !== 'undefined') {
    // 發送行為數據
    fetch('/api/stats/action', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action,
        data,
        url: window.location.href,
        timestamp: new Date().toISOString(),
      }),
    }).catch(() => {});
  }
}

