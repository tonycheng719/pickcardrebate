import { createClient, SupabaseClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const supabaseUrl = 'https://api.pickcardrebate.com';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpY2tjYXJkcmViYXRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ2MDI4MzYsImV4cCI6MjA1MDE3ODgzNn0.X-fXCLp_WyU_MbAv_s1iqDMV4qF6x7d4_M2vhJm7mYk';

let supabaseInstance: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (!supabaseInstance) {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        // Only use AsyncStorage on native platforms, not web
        storage: Platform.OS !== 'web' ? AsyncStorage : undefined,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: Platform.OS === 'web',
      },
    });
  }
  return supabaseInstance;
}

// Export a lazy-initialized client
export const supabase = {
  get auth() {
    return getSupabase().auth;
  },
  get from() {
    return getSupabase().from.bind(getSupabase());
  },
  get storage() {
    return getSupabase().storage;
  },
};
