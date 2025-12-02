"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Flame, TrendingUp, ArrowRight, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useDataset } from "@/lib/admin/data-store";

interface TrendingMerchant {
  merchant_name: string;
  search_count: number;
  merchant_id: string;
}

export function TrendingMerchants() {
  const [trending, setTrending] = useState<TrendingMerchant[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();
  const { merchants } = useDataset();

  useEffect(() => {
    async function fetchTrending() {
      try {
        const { data, error } = await supabase.rpc("get_trending_merchants");
        if (error) throw error;
        setTrending(data || []);
      } catch (err) {
        console.error("Failed to fetch trending merchants:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchTrending();
  }, []);

  // Helper to find merchant details by name or id
  const getMerchantDetails = (name: string, id: string) => {
    // Try to find by id first, then by name
    return merchants.find(m => m.id === id) || merchants.find(m => m.name === name || m.aliases?.some(a => a.toLowerCase() === name.toLowerCase()));
  };

  // Render merchant logo
  const renderMerchantLogo = (logo: string | undefined, name: string, accentColor: string | undefined) => {
    if (!logo) {
      // Fallback to first character
      return (
        <div 
          className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold text-white shadow-sm"
          style={{ backgroundColor: accentColor || '#6b7280' }}
        >
          {name.charAt(0)}
        </div>
      );
    }

    // Check if logo is an emoji (single character or emoji)
    if (logo.length <= 2 || /\p{Emoji}/u.test(logo)) {
      return (
        <div 
          className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-sm"
          style={{ backgroundColor: accentColor ? `${accentColor}20` : '#f3f4f6' }}
        >
          {logo}
        </div>
      );
    }

    // It's a URL - render as image
    return (
      <div className="w-10 h-10 rounded-xl bg-white dark:bg-gray-800 flex items-center justify-center shadow-sm overflow-hidden p-1">
        <img 
          src={logo} 
          alt={name} 
          className="w-full h-full object-contain"
          onError={(e) => {
            // Fallback to first character on error
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            target.parentElement!.innerHTML = `<span class="text-lg font-bold" style="color: ${accentColor || '#6b7280'}">${name.charAt(0)}</span>`;
          }}
        />
      </div>
    );
  };

  // Function to handle click - scroll to calculator and fill (simplified for now as calculator state is internal)
  // A better approach would be using URL params or a global store to trigger the calculator
  const handleTrendClick = (merchantId: string) => {
    // For now, we just scroll to top as a simple interaction, 
    // or we could implement a query param mechanism to pre-fill the calculator
    // e.g., router.push(`/?merchant=${merchantId}`)
    
    const calculatorElement = document.querySelector('main'); 
    if (calculatorElement) {
        calculatorElement.scrollIntoView({ behavior: 'smooth' });
        // Ideally, we would want to set the state in the sibling Calculator component.
        // This requires lifting state up or using URL params.
        // Let's assume user just wants to see what's hot for now.
    }
  };

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto mt-8 px-4">
        <div className="flex items-center gap-2 mb-4">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-6 w-32" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-16 rounded-xl" />
            ))}
        </div>
      </div>
    );
  }

  if (trending.length === 0) return null;

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 mb-12 px-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-orange-600 dark:text-orange-500">
            <div className="p-1.5 bg-orange-100 dark:bg-orange-900/30 rounded-full">
                <Flame className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-lg">大家都在搜</h3>
        </div>
        {/* <Button variant="ghost" size="sm" className="text-gray-400 text-xs h-8">
            查看更多 <ArrowRight className="w-3 h-3 ml-1" />
        </Button> */}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {trending.map((item, index) => {
            const details = getMerchantDetails(item.merchant_name, item.merchant_id);
            const rank = index + 1;
            
            // Rank styling - Stronger colors for better visibility
            let rankBadgeStyle = "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400";
            let rankTextStyle = "";
            
            if (rank === 1) {
                rankBadgeStyle = "bg-yellow-500 text-white border-yellow-600 shadow-sm"; // Gold
                rankTextStyle = "text-yellow-700 dark:text-yellow-500";
            } else if (rank === 2) {
                rankBadgeStyle = "bg-slate-400 text-white border-slate-500 shadow-sm"; // Silver
                rankTextStyle = "text-slate-600 dark:text-slate-400";
            } else if (rank === 3) {
                rankBadgeStyle = "bg-orange-400 text-white border-orange-500 shadow-sm"; // Bronze
                rankTextStyle = "text-orange-600 dark:text-orange-400";
            }

            return (
                <div 
                    key={item.merchant_name}
                    className="group relative flex flex-col items-start p-3 pl-4 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl hover:shadow-md hover:border-orange-200 dark:hover:border-orange-900/50 transition-all cursor-pointer overflow-hidden"
                    onClick={() => handleTrendClick(item.merchant_id)}
                >
                    {/* Rank Badge */}
                    <div className={`absolute top-0 left-0 px-2 py-1 text-xs font-bold rounded-br-lg border-r border-b ${rankBadgeStyle}`}>
                        #{rank}
                    </div>

                    {/* Merchant Logo */}
                    <div className="mt-6 mb-1">
                        {renderMerchantLogo(details?.logo, item.merchant_name, details?.accentColor)}
                    </div>
                    
                    <div className={`font-bold text-sm line-clamp-1 ${rankTextStyle || "text-gray-900 dark:text-gray-100"}`}>
                        {item.merchant_name}
                    </div>
                    <div className="flex items-center gap-1 mt-1 text-xs text-gray-400 font-medium">
                        <TrendingUp className="w-3 h-3" />
                        {item.search_count} 次查詢
                    </div>
                </div>
            );
        })}
      </div>
    </div>
  );
}

