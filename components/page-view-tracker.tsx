"use client";

import { useEffect, useRef } from "react";

interface PageViewTrackerProps {
  pageType: "card" | "article";
  pageId: string;
  pageName?: string;
}

export function PageViewTracker({ pageType, pageId, pageName }: PageViewTrackerProps) {
  const hasTracked = useRef(false);

  useEffect(() => {
    // Only track once per page load
    if (hasTracked.current) return;
    hasTracked.current = true;

    // Send view count request
    fetch("/api/stats/pageview", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        pageType,
        pageId,
        pageName,
      }),
    }).catch((e) => {
      // Silent fail - analytics shouldn't break the page
      console.error("Failed to track page view:", e);
    });
  }, [pageType, pageId, pageName]);

  return null; // This component doesn't render anything
}

