import { createClient } from '@supabase/supabase-js';

// Fallback for build time, but should be provided by env at runtime
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://pickcardrebate-supabase-kong.zeabur.app";
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

if (!SUPABASE_SERVICE_KEY) {
  console.warn("SUPABASE_SERVICE_ROLE_KEY is not set. Admin operations will fail.");
}

export const adminAuthClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
    detectSessionInUrl: false
  },
  db: {
    schema: 'public',
  },
  global: {
    headers: {
        'X-Client-Info': 'supabase-js-admin',
    }
  }
});
