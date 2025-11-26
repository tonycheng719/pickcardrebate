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
        }
    } as any
  }

  return createBrowserClient(url, key)
}
