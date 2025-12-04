"use client";

import { useEffect } from "react";
import { trackViewArticle } from "@/lib/analytics";

interface ArticleTrackerProps {
  articleSlug: string;
  articleTitle: string;
}

export function ArticleTracker({ articleSlug, articleTitle }: ArticleTrackerProps) {
  useEffect(() => {
    trackViewArticle({
      articleSlug,
      articleTitle,
    });
  }, [articleSlug, articleTitle]);

  return null; // This component doesn't render anything
}

