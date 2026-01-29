import { createBrowserClient } from '@supabase/ssr'

// Track token refresh failures to prevent infinite retry loops
let refreshFailureCount = 0;
const MAX_REFRESH_FAILURES = 3;
let lastRefreshFailure = 0;
const REFRESH_FAILURE_RESET_MS = 60000; // Reset counter after 1 minute

// Clear auth cookies when refresh token is invalid
function clearAuthCookies() {
  if (typeof document === 'undefined') return;
  
  // Clear all Supabase auth cookies
  const cookiesToClear = ['sb-access-token', 'sb-refresh-token', 'supabase-auth-token'];
  const cookiePrefix = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace('https://', '').split('.')[0] || '';
  
  document.cookie.split(';').forEach(cookie => {
    const [name] = cookie.split('=');
    const trimmedName = name.trim();
    
    // Clear any auth-related cookies
    if (trimmedName.includes('auth') || 
        trimmedName.includes('token') || 
        trimmedName.includes(cookiePrefix) ||
        cookiesToClear.includes(trimmedName)) {
      document.cookie = `${trimmedName}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      console.log('[Supabase Client] Cleared cookie:', trimmedName);
    }
  });
  
  // Also clear localStorage auth data
  try {
    Object.keys(localStorage).forEach(key => {
      if (key.includes('supabase') || key.includes('sb-')) {
        localStorage.removeItem(key);
        console.log('[Supabase Client] Cleared localStorage:', key);
      }
    });
  } catch (e) {
    console.warn('[Supabase Client] Failed to clear localStorage:', e);
  }
}

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    console.error("Supabase URL or Key is missing. Client creation failed.")
    
    // Create a chainable dummy object to prevent "is not a function" errors
    const createDummyBuilder = () => {
      const builder: any = Promise.resolve({ data: null, error: new Error("Missing Supabase Config") });
      
      // Proxy to handle any method call by returning the same promise-like builder
      const proxy = new Proxy(builder, {
        get: (target, prop) => {
          if (typeof prop === 'string' && prop !== 'then' && prop !== 'catch' && prop !== 'finally') {
            return () => proxy;
          }
          return target[prop];
        }
      });
      return proxy;
    };

    return {
        from: () => createDummyBuilder(),
        rpc: () => createDummyBuilder(),
        auth: {
            getUser: () => Promise.resolve({ data: { user: null }, error: null }),
            getSession: () => Promise.resolve({ data: { session: null }, error: null }),
            signInWithOAuth: () => Promise.resolve({ error: new Error("Missing Supabase Config") }),
            signOut: () => Promise.resolve({ error: null }),
            onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
            exchangeCodeForSession: () => Promise.resolve({ data: { session: null }, error: new Error("Missing Supabase Config") }),
        }
    } as any
  }

  // Check if user wants to be remembered (30 days) or use short session (12 hours)
  const rememberMe = typeof localStorage !== 'undefined' ? localStorage.getItem('rememberMe') === 'true' : false;
  const sessionMaxAge = rememberMe ? 30 * 24 * 60 * 60 : 12 * 60 * 60;
  
  const client = createBrowserClient(url, key, {
    cookies: {
      getAll() {
        if (typeof document === 'undefined') return [];
        return document.cookie.split('; ').filter(c => c).map(cookie => {
          const [name, ...rest] = cookie.split('=');
          return { name, value: rest.join('=') };
        });
      },
      setAll(cookiesToSet) {
        if (typeof document === 'undefined') return;
        cookiesToSet.forEach(({ name, value, options }) => {
          let cookieString = `${name}=${value}`;
          cookieString += '; path=/';
          
          if (window.location.protocol === 'https:') {
            cookieString += '; secure';
          }
          
          cookieString += '; samesite=lax';
          const maxAge = options?.maxAge || sessionMaxAge;
          cookieString += `; max-age=${maxAge}`;
          
          document.cookie = cookieString;
        });
      },
    },
    auth: {
      flowType: 'pkce',
      detectSessionInUrl: true,
      persistSession: true,
      autoRefreshToken: true,
    }
  });
  
  // Listen for auth state changes to detect refresh token failures
  if (typeof window !== 'undefined') {
    client.auth.onAuthStateChange((event, session) => {
      const now = Date.now();
      
      // Reset failure counter after cooldown period
      if (now - lastRefreshFailure > REFRESH_FAILURE_RESET_MS) {
        refreshFailureCount = 0;
      }
      
      if (event === 'TOKEN_REFRESHED') {
        // Successful refresh, reset counter
        refreshFailureCount = 0;
        console.log('[Supabase Client] Token refreshed successfully');
      }
      
      // Detect refresh failures by checking for SIGNED_OUT without explicit user action
      // This happens when refresh token is invalid
      if (event === 'SIGNED_OUT' && !session) {
        // Check if this was triggered by a failed refresh (no explicit signOut call)
        const wasRefreshFailure = document.visibilityState === 'visible';
        
        if (wasRefreshFailure) {
          refreshFailureCount++;
          lastRefreshFailure = now;
          
          console.warn(`[Supabase Client] Possible refresh token failure (${refreshFailureCount}/${MAX_REFRESH_FAILURES})`);
          
          if (refreshFailureCount >= MAX_REFRESH_FAILURES) {
            console.error('[Supabase Client] Too many refresh failures, clearing auth state');
            clearAuthCookies();
            refreshFailureCount = 0;
            
            // Redirect to login if user is on a protected page
            const protectedPaths = ['/admin', '/profile', '/wallet'];
            if (protectedPaths.some(p => window.location.pathname.startsWith(p))) {
              window.location.href = '/login?error=session_expired';
            }
          }
        }
      }
    });
  }
  
  return client;
}
