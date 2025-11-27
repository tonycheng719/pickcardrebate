import { createClient } from '@supabase/supabase-js';

// 注意：在生產環境中，這應該是環境變量。為了快速修復，我們先硬編碼。
// 請確保不要將此文件洩露給客戶端。
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://pickcardrebate-supabase-kong.zeabur.app";
// 這通常是 service_role key，但我這裡先用 anon key 測試，如果 anon key 已經被賦予了所有權限 (Nuclear Fix)
// 如果您有 Service Role Key，請替換這裡。
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""; 

export const adminAuthClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

