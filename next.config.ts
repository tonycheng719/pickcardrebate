import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Restore env vars to ensure they are available both at build time and runtime
  // This fixes the "Missing Supabase Config" error on the client side
  env: {
    // Use Zeabur's direct domain for better reliability (custom domain api.pickcardrebate.com has DNS issues)
    NEXT_PUBLIC_SUPABASE_URL: "https://pickcardrebate-supabase-kong.zeabur.app",
    NEXT_PUBLIC_SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyAgCiAgICAicm9sZSI6ICJhbm9uIiwKICAgICJpc3MiOiAic3VwYWJhc2UtZGVtbyIsCiAgICAiaWF0IjogMTY0MTc2OTIwMCwKICAgICJleHAiOiAxNzk5NTM1NjAwCn0.dc_X5iR_VP_qT0zsiyj_I_OZ2T9FtRU2BBNWN8Bu4GE",
  },
  
  // 301 Redirects for SEO (舊路徑永久重定向到新路徑)
  async redirects() {
    return [
      {
        source: '/promos',
        destination: '/discover',
        permanent: true, // 301 redirect
      },
      {
        source: '/promos/:slug',
        destination: '/discover/:slug',
        permanent: true,
      },
      {
        source: '/guide',
        destination: '/discover',
        permanent: true,
      },
      {
        source: '/guide/:slug',
        destination: '/discover/:slug',
        permanent: true,
      },
    ];
  },
  // output: "standalone", // Disabled to fix 404 asset errors
  
  // Image optimization for better performance
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },
  
  // Compiler optimizations
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error"] } : false,
  },
  
  // Experimental features for better performance
  experimental: {
    // Enable optimized package imports
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;
