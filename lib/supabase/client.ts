import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    console.error("Supabase URL or Key is missing. Client creation failed.")
    // Return a dummy object to prevent crash, but DB calls will fail gracefully
    return {
        from: () => ({
            select: () => Promise.resolve({ data: null, error: new Error("Missing Supabase Config") }),
            upsert: () => Promise.resolve({ error: new Error("Missing Supabase Config") }),
            delete: () => Promise.resolve({ error: new Error("Missing Supabase Config") }),
        }),
        auth: {
            getUser: () => Promise.resolve({ data: { user: null }, error: null }),
            getSession: () => Promise.resolve({ data: { session: null }, error: null }),
            signInWithOAuth: () => Promise.resolve({ error: new Error("Missing Supabase Config") }),
            signOut: () => Promise.resolve({ error: null }),
        }
    } as any
  }

  return createBrowserClient(url, key)
}
