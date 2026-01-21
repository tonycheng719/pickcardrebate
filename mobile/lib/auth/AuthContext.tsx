import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { Platform, Alert, Linking } from 'react-native';
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

  // 處理 deep link 中的 tokens
  const handleDeepLink = useCallback(async (url: string) => {
    console.log('[Auth] Handling deep link:', url);
    
    if (!url.includes('auth/callback')) {
      return;
    }
    
    try {
      // 從 URL hash 提取 tokens
      const hashPart = url.split('#')[1];
      if (!hashPart) {
        console.log('[Auth] No hash in URL');
        return;
      }
      
      const hashParams = new URLSearchParams(hashPart);
      const accessToken = hashParams.get('access_token');
      const refreshToken = hashParams.get('refresh_token');
      
      console.log('[Auth] Tokens found:', { hasAccess: !!accessToken, hasRefresh: !!refreshToken });
      
      if (accessToken && refreshToken) {
        const supabase = getSupabase();
        console.log('[Auth] Setting session with tokens...');
        
        const { data, error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });
        
        if (error) {
          console.error('[Auth] setSession error:', error);
          Alert.alert('登入失敗', error.message);
        } else if (data.session) {
          console.log('[Auth] Session set successfully:', data.session.user.email);
          setSession(data.session);
          setUser(data.session.user);
          Alert.alert('登入成功', '歡迎使用 PickCardRebate！');
        }
      }
    } catch (error) {
      console.error('[Auth] Deep link handling error:', error);
    }
  }, []);

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
      console.log('[Auth] Auth state changed:', _event, session?.user?.email);
      setSession(session);
      setUser(session?.user ?? null);
    });

    // 監聽 deep link（僅限 native）
    if (Platform.OS !== 'web') {
      // 處理 App 已開啟時收到的 deep link
      const linkingSubscription = Linking.addEventListener('url', ({ url }) => {
        console.log('[Auth] Deep link received (foreground):', url);
        handleDeepLink(url);
      });
      
      // 處理 App 從 deep link 啟動的情況
      Linking.getInitialURL().then((url) => {
        if (url) {
          console.log('[Auth] Initial URL:', url);
          handleDeepLink(url);
        }
      });
      
      return () => {
        subscription.unsubscribe();
        linkingSubscription.remove();
      };
    }

    return () => subscription.unsubscribe();
  }, [handleDeepLink]);

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
        
        // 直接打開網站的登入頁面，使用特殊參數標記來自 App
        const appSchemeUrl = 'pickcardrebate://auth/callback';
        const loginUrl = 'https://pickcardrebate.com/login?from=app&callback=' + encodeURIComponent(appSchemeUrl);
        
        console.log('[Auth] Opening web login:', loginUrl);
        
        await WebBrowser.warmUpAsync();
        
        const result = await WebBrowser.openAuthSessionAsync(
          loginUrl,
          appSchemeUrl,
          { 
            showInRecents: true,
            preferEphemeralSession: false, // 保持 session 以便網頁可以訪問
          }
        );
        
        await WebBrowser.coolDownAsync();
        
        console.log('[Auth] Browser result:', result.type);
        
        if (result.type === 'success' && result.url) {
          const url = result.url;
          console.log('[Auth] Callback URL:', url);
          
          // 從 URL 獲取 tokens
          const hashParams = new URLSearchParams(url.split('#')[1] || '');
          const accessToken = hashParams.get('access_token');
          const refreshToken = hashParams.get('refresh_token');
          
          if (accessToken && refreshToken) {
            console.log('[Auth] Got tokens, setting session...');
            await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken,
            });
            Alert.alert('登入成功', '歡迎使用 PickCardRebate！');
            return;
          }
        }
        
        if (result.type !== 'cancel') {
          Alert.alert(
            '登入提示',
            '請在彈出的視窗中完成登入，登入成功後會自動返回 App。',
            [{ text: '了解' }]
          );
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
