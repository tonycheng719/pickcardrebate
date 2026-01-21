'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

/**
 * Mobile OAuth Callback Handler
 * 
 * 這個頁面處理從 Supabase OAuth 回調的 tokens，
 * 然後通過 deep link 將 tokens 傳遞給 mobile app。
 */
export default function MobileCallbackPage() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('正在處理登入...');

  useEffect(() => {
    // 從 URL hash 或 query params 獲取 tokens
    const hash = typeof window !== 'undefined' ? window.location.hash : '';
    const hashParams = new URLSearchParams(hash.replace('#', ''));
    
    const accessToken = hashParams.get('access_token') || searchParams.get('access_token');
    const refreshToken = hashParams.get('refresh_token') || searchParams.get('refresh_token');
    const error = hashParams.get('error') || searchParams.get('error');
    const errorDescription = hashParams.get('error_description') || searchParams.get('error_description');

    if (error) {
      setStatus('error');
      setMessage(`登入失敗: ${errorDescription || error}`);
      return;
    }

    if (accessToken && refreshToken) {
      // 構建 deep link URL
      const deepLinkUrl = `pickcardrebate://auth/callback#access_token=${accessToken}&refresh_token=${refreshToken}`;
      
      setStatus('success');
      setMessage('登入成功！正在返回 App...');

      // 嘗試打開 app
      window.location.href = deepLinkUrl;

      // 如果 3 秒後還在這個頁面，顯示手動返回按鈕
      setTimeout(() => {
        setMessage('如果沒有自動返回 App，請點擊下方按鈕');
      }, 3000);
    } else {
      setStatus('error');
      setMessage('未收到登入資訊，請重試');
    }
  }, [searchParams]);

  const handleManualRedirect = () => {
    const hash = typeof window !== 'undefined' ? window.location.hash : '';
    const hashParams = new URLSearchParams(hash.replace('#', ''));
    
    const accessToken = hashParams.get('access_token') || searchParams.get('access_token');
    const refreshToken = hashParams.get('refresh_token') || searchParams.get('refresh_token');

    if (accessToken && refreshToken) {
      const deepLinkUrl = `pickcardrebate://auth/callback#access_token=${accessToken}&refresh_token=${refreshToken}`;
      window.location.href = deepLinkUrl;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
        {status === 'loading' && (
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto mb-4" />
        )}
        
        {status === 'success' && (
          <div className="text-green-500 text-5xl mb-4">✓</div>
        )}
        
        {status === 'error' && (
          <div className="text-red-500 text-5xl mb-4">✗</div>
        )}

        <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {status === 'loading' ? '處理中' : status === 'success' ? '登入成功' : '登入失敗'}
        </h1>
        
        <p className="text-gray-600 dark:text-gray-300 mb-6">{message}</p>

        {status === 'success' && (
          <button
            onClick={handleManualRedirect}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            返回 PickCardRebate App
          </button>
        )}

        {status === 'error' && (
          <button
            onClick={() => window.close()}
            className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            關閉
          </button>
        )}
      </div>
    </div>
  );
}

