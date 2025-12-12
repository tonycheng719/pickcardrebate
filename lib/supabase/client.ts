import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    console.error("Supabase URL or Key is missing. Client creation failed.")
    
    // Create a chainable dummy object to prevent "is not a function" errors
    const createDummyBuilder = () => {
      const builder: any = Promise.resolve({ data: null, error: new Error("Missing Supabase Config") });
      
      // Proxy to handle any method call by returning the same promise-like builder
      // ensuring the chain doesn't break synchronously
      const proxy = new Proxy(builder, {
        get: (target, prop) => {
          if (typeof prop === 'string' && prop !== 'then' && prop !== 'catch' && prop !== 'finally') {
            return () => proxy; // Return self for chaining
          }
          return target[prop]; // Return promise methods
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

  // Check if user wants to be remembered (30 days) or use default session (1 hour)
  const rememberMe = typeof localStorage !== 'undefined' ? localStorage.getItem('rememberMe') === 'true' : false;
  // 30 days in seconds for "remember me", or 24 hours for default
  const sessionMaxAge = rememberMe ? 30 * 24 * 60 * 60 : 24 * 60 * 60;
  
  return createBrowserClient(url, key, {
    cookies: {
      // Use default cookie handling but ensure proper settings
      getAll() {
        if (typeof document === 'undefined') return [];
        return document.cookie.split('; ').map(cookie => {
          const [name, ...rest] = cookie.split('=');
          return { name, value: rest.join('=') };
        });
      },
      setAll(cookiesToSet) {
        if (typeof document === 'undefined') return;
        cookiesToSet.forEach(({ name, value, options }) => {
          // Build cookie string with proper settings
          let cookieString = `${name}=${value}`;
          
          // Set path
          cookieString += '; path=/';
          
          // Set secure flag for production
          if (window.location.protocol === 'https:') {
            cookieString += '; secure';
          }
          
          // Set SameSite to Lax for better compatibility
          cookieString += '; samesite=lax';
          
          // Use longer max-age for better session persistence
          // This helps prevent frequent logouts
          const maxAge = options?.maxAge || sessionMaxAge;
          cookieString += `; max-age=${maxAge}`;
          
          document.cookie = cookieString;
          console.log('[Supabase Client] Cookie set:', name, 'maxAge:', maxAge);
        });
      },
    },
    auth: {
      flowType: 'pkce',
      detectSessionInUrl: true,
      persistSession: true,
      autoRefreshToken: true,
    }
  })
}
