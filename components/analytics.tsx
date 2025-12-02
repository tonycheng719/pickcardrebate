"use client";

import { useEffect } from "react";
import { useWallet } from "@/lib/store/wallet-context";

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export function AnalyticsUserTracker() {
  const { user } = useWallet();

  useEffect(() => {
    if (typeof window !== "undefined" && window.gtag && user?.id) {
      // Set User ID for GA4
      window.gtag("config", "G-E0ST5J83F7", {
        user_id: user.id,
      });

      // Also set user properties
      window.gtag("set", "user_properties", {
        user_id: user.id,
        user_email_domain: user.email?.split("@")[1] || "unknown",
      });

      console.log("[GA4] User ID set:", user.id);
    }
  }, [user?.id, user?.email]);

  // Track page views with user context
  useEffect(() => {
    if (typeof window !== "undefined" && window.gtag) {
      const handleRouteChange = () => {
        window.gtag("event", "page_view", {
          page_path: window.location.pathname,
          page_title: document.title,
          user_id: user?.id || undefined,
        });
      };

      // Listen for route changes (for SPA navigation)
      window.addEventListener("popstate", handleRouteChange);
      
      return () => {
        window.removeEventListener("popstate", handleRouteChange);
      };
    }
  }, [user?.id]);

  return null; // This component doesn't render anything
}

