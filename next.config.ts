import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Restore env vars to ensure they are available both at build time and runtime
  // This fixes the "Missing Supabase Config" error on the client side
  env: {
    NEXT_PUBLIC_SUPABASE_URL: "https://pickcardrebate-supabase-kong.zeabur.app",
    NEXT_PUBLIC_SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyAgCiAgICAicm9sZSI6ICJhbm9uIiwKICAgICJpc3MiOiAic3VwYWJhc2UtZGVtbyIsCiAgICAiaWF0IjogMTY0MTc2OTIwMCwKICAgICJleHAiOiAxNzk5NTM1NjAwCn0.dc_X5iR_VP_qT0zsiyj_I_OZ2T9FtRU2BBNWN8Bu4GE",
  },
  output: "standalone", // Optimize for Docker/Zeabur deployment
};

export default nextConfig;
