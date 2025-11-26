import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export interface MerchantCommunityData {
  verifiedCards: Record<string, { count: number; lastVerified: string }>;
  tags: string[];
  isLoading: boolean;
}

export function useMerchantCommunityData(merchantId: string | null) {
  const [data, setData] = useState<MerchantCommunityData>({
    verifiedCards: {},
    tags: [],
    isLoading: false,
  });
  const supabase = createClient();

  useEffect(() => {
    if (!merchantId) {
      setData({ verifiedCards: {}, tags: [], isLoading: false });
      return;
    }

    async function fetchData() {
      setData(prev => ({ ...prev, isLoading: true }));
      
      try {
        // 1. Fetch verified reviews for this merchant
        const { data: reviews, error: reviewsError } = await supabase
          .from("merchant_reviews")
          .select("card_id, created_at")
          .eq("merchant_id", merchantId)
          .eq("status", "verified");

        if (reviewsError) console.error("Error fetching reviews:", reviewsError);

        // 2. Fetch tags for this merchant
        const { data: tagsData, error: tagsError } = await supabase
          .from("merchant_tags")
          .select("tag_name, count")
          .eq("merchant_id", merchantId)
          .order("count", { ascending: false });

        if (tagsError) console.error("Error fetching tags:", tagsError);

        // Process reviews into a map keyed by card_id
        const verifiedCards: Record<string, { count: number; lastVerified: string }> = {};
        
        reviews?.forEach(r => {
          // Ensure we handle potentially null card_ids gracefully, though schema says not null
          if (!r.card_id) return;

          if (!verifiedCards[r.card_id]) {
            verifiedCards[r.card_id] = { count: 0, lastVerified: r.created_at };
          } else {
            verifiedCards[r.card_id].count++;
            // Keep the latest verification date
            if (new Date(r.created_at) > new Date(verifiedCards[r.card_id].lastVerified)) {
               verifiedCards[r.card_id].lastVerified = r.created_at;
            }
          }
        });

        const tags = tagsData?.map(t => t.tag_name) || [];

        setData({ verifiedCards, tags, isLoading: false });
      } catch (err) {
        console.error("Failed to fetch community data", err);
        setData(prev => ({ ...prev, isLoading: false }));
      }
    }

    fetchData();
  }, [merchantId]);

  return data;
}

