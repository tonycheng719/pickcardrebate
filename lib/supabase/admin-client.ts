import { createClient } from '@supabase/supabase-js';

// Fallback for build time, but should be provided by env at runtime
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://pickcardrebate-supabase-kong.zeabur.app";

// Build-safe key handling
// During build time, env vars might not be available. We use a dummy key to prevent createClient from crashing.
// The actual operations will only happen at runtime when the real key is present.
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2VydmljZV9yb2xlIiwiaXNzIjoic3VwYWJhc2UiLCJpYXQiOjE2MTI3MzYwMDB9.build-time-placeholder-key";

if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.warn("SUPABASE_SERVICE_ROLE_KEY is not set in environment variables. Using placeholder key for build/init.");
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
