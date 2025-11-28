import { createClient } from '@supabase/supabase-js';

// Fallback for build time, but should be provided by env at runtime
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://pickcardrebate-supabase-kong.zeabur.app";

// Support both variable names: SUPABASE_SERVICE_ROLE_KEY (Standard) or SERVICE_ROLE_KEY (Zeabur/Supabase auto-gen)
const SERVICE_KEY_VALUE = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SERVICE_ROLE_KEY;

// Build-safe key handling
// During build time, env vars might not be available. We use a dummy key to prevent createClient from crashing.
const SUPABASE_SERVICE_KEY = SERVICE_KEY_VALUE || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2VydmljZV9yb2xlIiwiaXNzIjoic3VwYWJhc2UiLCJpYXQiOjE2MTI3MzYwMDB9.build-time-placeholder-key";

if (!SERVICE_KEY_VALUE) {
  console.warn("Service Role Key is not set in environment variables (checked SUPABASE_SERVICE_ROLE_KEY and SERVICE_ROLE_KEY). Using placeholder.");
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
