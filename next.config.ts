import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Remove hardcoded env to allow Zeabur environment variables to take precedence
  // env: {
  //   NEXT_PUBLIC_SUPABASE_URL: "...",
  //   NEXT_PUBLIC_SUPABASE_ANON_KEY: "...",
  // },
  output: "standalone", // Optimize for Docker/Zeabur
};

export default nextConfig;
