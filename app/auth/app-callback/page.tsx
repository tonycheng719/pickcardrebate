'use client';

import { useEffect, useState } from 'react';

// 禁用靜態預渲染
export const dynamic = 'force-dynamic';

export default function AppCallbackPage() {
  const [status, setStatus] = useState<'loading' | 'redirecting' | 'error'>('loading');
  const [message, setMessage] = useState('正在處理登入...');

  useEffect(() => {
    const handleCallback = () => {
      try {
        // 從 URL hash 獲取 tokens（Supabase OAuth 會將 tokens 放在 hash 中）
        const hash = window.location.hash;
        console.log('[AppCallback] Hash:', hash);
        
        if (!hash) {
          // 可能 tokens 在 query params 中
          const params = new URLSearchParams(window.location.search);
          const error = params.get('error');
          const errorDescription = params.get('error_description');
          
          if (error) {
            setStatus('error');
            setMessage(`登入失敗: ${errorDescription || error}`);
            return;
          }
          
          setStatus('error');
          setMessage('未收到登入資訊');
          return;
        }

        const hashParams = new URLSearchParams(hash.replace('#', ''));
        const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token');
        const error = hashParams.get('error');
        const errorDescription = hashParams.get('error_description');

        if (error) {
          setStatus('error');
          setMessage(`登入失敗: ${errorDescription || error}`);
          return;
        }

        if (accessToken && refreshToken) {
          setStatus('redirecting');
          setMessage('登入成功！正在返回 App...');
          
          // 構建 deep link URL，將 tokens 傳回 App
          const deepLinkUrl = `pickcardrebate://auth/callback#access_token=${accessToken}&refresh_token=${refreshToken}`;
          
          console.log('[AppCallback] Redirecting to app...');
          
          // 立即嘗試 redirect
          window.location.href = deepLinkUrl;
          
          // 如果 3 秒後還在這個頁面，顯示手動按鈕
          setTimeout(() => {
            setMessage('如果沒有自動返回 App，請點擊下方按鈕');
          }, 3000);
        } else {
          setStatus('error');
          setMessage('未收到登入憑證');
        }
      } catch (e) {
        console.error('[AppCallback] Error:', e);
        setStatus('error');
        setMessage('處理登入時發生錯誤');
      }
    };

    handleCallback();
  }, []);

  const handleManualRedirect = () => {
    const hash = window.location.hash;
    if (hash) {
      const hashParams = new URLSearchParams(hash.replace('#', ''));
      const accessToken = hashParams.get('access_token');
      const refreshToken = hashParams.get('refresh_token');
      
      if (accessToken && refreshToken) {
        window.location.href = `pickcardrebate://auth/callback#access_token=${accessToken}&refresh_token=${refreshToken}`;
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
        {status === 'loading' && (
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto mb-4" />
        )}
        
        {status === 'redirecting' && (
          <div className="text-green-500 text-5xl mb-4">✓</div>
        )}
        
        {status === 'error' && (
          <div className="text-red-500 text-5xl mb-4">✗</div>
        )}

        <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {status === 'loading' ? '處理中' : status === 'redirecting' ? '登入成功' : '登入失敗'}
        </h1>
        
        <p className="text-gray-600 dark:text-gray-300 mb-6">{message}</p>

        {status === 'redirecting' && (
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

