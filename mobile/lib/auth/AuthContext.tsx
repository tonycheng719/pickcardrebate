import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback, useRef } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { Platform, Alert, Linking } from 'react-native';
import { getSupabase } from '../supabase/client';
import { registerForPushNotifications } from '../notifications/push';

interface UserProfile {
  gender?: string;
  district?: string;
  birth_year?: number;
  birth_month?: number;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  profile: UserProfile | null;
  needsOnboarding: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [needsOnboarding, setNeedsOnboarding] = useState(false);

  // Fetch user profile from backend
  const fetchProfile = useCallback(async (userId: string) => {
    try {
      const response = await fetch(`https://pickcardrebate.com/api/user/profile?userId=${userId}`);
      if (response.ok) {
        const data = await response.json();
        const profileData = data.profile;
        setProfile(profileData);
        
        // Check if onboarding is needed
        const isProfileIncomplete = !profileData?.gender || !profileData?.district || !profileData?.birth_year;
        setNeedsOnboarding(isProfileIncomplete);
        console.log('[Auth] Profile loaded, needs onboarding:', isProfileIncomplete);
        return profileData;
      }
    } catch (e) {
      console.error('[Auth] Failed to fetch profile:', e);
    }
    return null;
  }, []);

  const refreshProfile = useCallback(async () => {
    if (user?.id) {
      await fetchProfile(user.id);
    }
  }, [user, fetchProfile]);

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
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      // Fetch profile if user is logged in
      if (session?.user?.id) {
        await fetchProfile(session.user.id);
      }
      
      setLoading(false);
    });

    // 監聯 auth 變化
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      console.log('[Auth] Auth state changed:', _event, session?.user?.email);
      setSession(session);
      setUser(session?.user ?? null);
      
      // Fetch profile on sign in
      if (session?.user?.id) {
        await fetchProfile(session.user.id);
      } else {
        setProfile(null);
        setNeedsOnboarding(false);
      }
      
      // 用戶登入後的處理
      if (_event === 'SIGNED_IN' && session?.user?.id && Platform.OS !== 'web') {
        // 記錄登入來源 (ios or android)
        const loginSource = Platform.OS === 'ios' ? 'ios' : 'android';
        const isNewUser = session.user.created_at === session.user.last_sign_in_at;
        
        try {
          await fetch('https://pickcardrebate.com/api/user/login-source', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              userId: session.user.id,
              source: loginSource,
              isSignup: isNewUser,
            }),
          });
          console.log('[Auth] Login source recorded:', loginSource, isNewUser ? '(new signup)' : '');
        } catch (e) {
          console.log('[Auth] Failed to record login source:', e);
        }
        
        // 註冊 Push Token
        try {
          await registerForPushNotifications(session.user.id);
          console.log('[Auth] Push token registered for user');
        } catch (e) {
          console.log('[Auth] Push token registration failed:', e);
        }
      }
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
        // Native: 使用網頁中間層處理 OAuth redirect
        const WebBrowser = await import('expo-web-browser');
        
        // OAuth redirect 到網頁，網頁再 redirect 到 App
        const webRedirectUrl = 'https://pickcardrebate.com/auth/app-callback';
        const appSchemeUrl = 'pickcardrebate://auth/callback';
        
        console.log('[Auth] Starting Google OAuth');
        console.log('[Auth] Web redirect:', webRedirectUrl);
        console.log('[Auth] App scheme:', appSchemeUrl);
        
        // 獲取 OAuth URL
        const { data, error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: webRedirectUrl,
            skipBrowserRedirect: true,
          },
        });
        
        if (error) {
          console.error('[Auth] OAuth error:', error);
          Alert.alert('登入失敗', error.message);
          return;
        }
        
        if (!data?.url) {
          console.error('[Auth] No OAuth URL returned');
          Alert.alert('登入失敗', '無法獲取登入連結');
          return;
        }
        
        console.log('[Auth] Opening OAuth URL:', data.url);
        
        await WebBrowser.warmUpAsync();
        
        // 監聽 App scheme，網頁會 redirect 到這裡
        const result = await WebBrowser.openAuthSessionAsync(
          data.url,
          appSchemeUrl,
          { 
            showInRecents: true,
            preferEphemeralSession: false,
          }
        );
        
        await WebBrowser.coolDownAsync();
        
        console.log('[Auth] Browser result:', result.type);
        
        if (result.type === 'success' && result.url) {
          const url = result.url;
          console.log('[Auth] Callback URL:', url);
          
          // 從 URL 獲取 tokens
          const hashParams = new URLSearchParams(url.split('#')[1] || '');
          const queryParams = new URLSearchParams(url.split('?')[1]?.split('#')[0] || '');
          
          const accessToken = hashParams.get('access_token') || queryParams.get('access_token');
          const refreshToken = hashParams.get('refresh_token') || queryParams.get('refresh_token');
          
          console.log('[Auth] Tokens found:', { hasAccess: !!accessToken, hasRefresh: !!refreshToken });
          
          if (accessToken && refreshToken) {
            console.log('[Auth] Got tokens, setting session...');
            try {
              const { data: sessionData, error: sessionError } = await supabase.auth.setSession({
                access_token: accessToken,
                refresh_token: refreshToken,
              });
              
              if (sessionError) {
                console.error('[Auth] setSession error:', sessionError);
                Alert.alert('登入失敗', sessionError.message);
                return;
              }
              
              if (sessionData.session) {
                console.log('[Auth] Session set successfully:', sessionData.session.user.email);
                setSession(sessionData.session);
                setUser(sessionData.session.user);
                Alert.alert('登入成功', '歡迎使用 PickCardRebate！');
              } else {
                console.warn('[Auth] No session in response');
                Alert.alert('登入失敗', '無法建立登入狀態');
              }
            } catch (e) {
              console.error('[Auth] setSession exception:', e);
              Alert.alert('登入失敗', String(e));
            }
            return;
          } else {
            console.warn('[Auth] No tokens in callback URL');
            Alert.alert('登入失敗', '未收到登入憑證，請重試');
          }
        } else if (result.type === 'cancel') {
          console.log('[Auth] User cancelled login');
        }
      }
    } catch (error) {
      console.error('Google sign in error:', error);
      Alert.alert('登入錯誤', String(error));
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
    <AuthContext.Provider value={{ user, session, loading, profile, needsOnboarding, signInWithGoogle, signInWithApple, signOut, refreshProfile }}>
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
