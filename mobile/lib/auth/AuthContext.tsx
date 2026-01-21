import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { Platform, Alert } from 'react-native';
import { getSupabase } from '../supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Skip auth initialization on web during SSR
    if (typeof window === 'undefined') {
      setLoading(false);
      return;
    }

    const supabase = getSupabase();

    // 取得初始 session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // 監聽 auth 變化
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    const supabase = getSupabase();
    
    try {
      if (Platform.OS === 'web') {
        // Web: 使用標準 OAuth
        const { error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
        });
        if (error) throw error;
      } else {
        // Native: 使用 WebBrowser
        const WebBrowser = await import('expo-web-browser');
        const Linking = await import('expo-linking');
        const Constants = await import('expo-constants');
        
        // 使用網頁中間層處理 OAuth callback
        // 這樣可以避免 Supabase GOTRUE_URI_ALLOW_LIST 配置問題
        const redirectUrl = 'https://pickcardrebate.com/auth/mobile-callback';
        
        // App scheme 用於接收從網頁傳回的 tokens
        const appSchemeUrl = 'pickcardrebate://auth/callback';
        
        const expoConstants = Constants.default;
        const isExpoGo = expoConstants.appOwnership === 'expo';
        
        console.log('[Auth] Is Expo Go:', isExpoGo);
        
        console.log('[Auth] Is Expo Go:', isExpoGo);
        console.log('[Auth] Redirect URL:', redirectUrl);
        
        const { data, error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: redirectUrl,
            skipBrowserRedirect: true,
            queryParams: {
              // 強制使用 PKCE flow
              access_type: 'offline',
              prompt: 'consent',
            },
          },
        });

        if (error) throw error;
        
        if (data?.url) {
          console.log('[Auth] Opening auth URL:', data.url);
          
          // 完成 WebBrowser warm up
          await WebBrowser.warmUpAsync();
          
          // 監聽 app scheme URL（網頁會 redirect 到這個 URL）
          const result = await WebBrowser.openAuthSessionAsync(
            data.url, 
            appSchemeUrl,
            { 
              showInRecents: true,
              preferEphemeralSession: true, // 不保存 session，避免登入狀態混亂
            }
          );
          
          // 清理
          await WebBrowser.coolDownAsync();
          
          console.log('[Auth] Result:', result.type);
          
          if (result.type === 'success') {
            const url = result.url;
            console.log('[Auth] Callback URL:', url);
            
            // 嘗試從 hash 或 query string 獲取 token
            const hashParams = new URLSearchParams(url.split('#')[1] || '');
            const queryParams = new URLSearchParams(url.split('?')[1]?.split('#')[0] || '');
            
            const accessToken = hashParams.get('access_token') || queryParams.get('access_token');
            const refreshToken = hashParams.get('refresh_token') || queryParams.get('refresh_token');
            
            console.log('[Auth] Got tokens:', !!accessToken, !!refreshToken);
            
            if (accessToken && refreshToken) {
              await supabase.auth.setSession({
                access_token: accessToken,
                refresh_token: refreshToken,
              });
            } else {
              // 顯示診斷資訊
              console.warn('[Auth] No tokens found in callback URL');
              console.warn('[Auth] Full callback URL:', url);
              Alert.alert(
                '登入診斷',
                `收到的回調 URL:\n${url.substring(0, 150)}...\n\n` +
                `預期的 redirect URL:\n${redirectUrl}\n\n` +
                `請確認 Supabase GOTRUE_URI_ALLOW_LIST 包含上述 redirect URL`,
                [{ text: '了解' }]
              );
            }
          } else if (result.type === 'cancel') {
            console.log('[Auth] User cancelled login');
          } else if (result.type === 'dismiss') {
            console.log('[Auth] Browser was dismissed');
            // 檢查是否可能已經登入
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
              console.log('[Auth] Found existing session after dismiss');
            }
          }
        }
      }
    } catch (error) {
      console.error('Google sign in error:', error);
      throw error;
    }
  };

  const signInWithApple = async () => {
    const supabase = getSupabase();
    
    try {
      if (Platform.OS === 'web') {
        const { error } = await supabase.auth.signInWithOAuth({
          provider: 'apple',
        });
        if (error) throw error;
      } else {
        const WebBrowser = await import('expo-web-browser');
        const Linking = await import('expo-linking');
        const Constants = await import('expo-constants');
        
        // 使用網頁中間層處理 OAuth callback
        const redirectUrl = 'https://pickcardrebate.com/auth/mobile-callback';
        const appSchemeUrl = 'pickcardrebate://auth/callback';
        
        console.log('[Auth] Apple Redirect URL:', redirectUrl);
        
        const { data, error } = await supabase.auth.signInWithOAuth({
          provider: 'apple',
          options: {
            redirectTo: redirectUrl,
            skipBrowserRedirect: true,
          },
        });

        if (error) throw error;
        
        if (data?.url) {
          console.log('[Auth] Opening Apple auth URL:', data.url);
          
          await WebBrowser.warmUpAsync();
          
          const result = await WebBrowser.openAuthSessionAsync(
            data.url,
            appSchemeUrl,
            { 
              showInRecents: true,
              preferEphemeralSession: true,
            }
          );
          
          await WebBrowser.coolDownAsync();
          
          console.log('[Auth] Apple Result:', result.type);
          
          if (result.type === 'success') {
            const url = result.url;
            console.log('[Auth] Apple Callback URL:', url);
            
            const hashParams = new URLSearchParams(url.split('#')[1] || '');
            const queryParams = new URLSearchParams(url.split('?')[1]?.split('#')[0] || '');
            
            const accessToken = hashParams.get('access_token') || queryParams.get('access_token');
            const refreshToken = hashParams.get('refresh_token') || queryParams.get('refresh_token');
            
            console.log('[Auth] Apple Got tokens:', !!accessToken, !!refreshToken);
            
            if (accessToken && refreshToken) {
              await supabase.auth.setSession({
                access_token: accessToken,
                refresh_token: refreshToken,
              });
            }
          }
        }
      }
    } catch (error) {
      console.error('Apple sign in error:', error);
      throw error;
    }
  };

  const signOut = async () => {
    const supabase = getSupabase();
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signInWithGoogle, signInWithApple, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
