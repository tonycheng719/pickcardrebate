/**
 * 商戶資料 Hook - 支援 API 獲取與本地備援
 */

import { useState, useEffect, useCallback } from 'react';
import { api, MerchantCategoryData, MerchantData } from '../api/client';
import { MERCHANT_CATEGORIES, Merchant } from '../data/merchants';

interface UseMerchantsResult {
  categories: MerchantCategoryData[];
  merchants: MerchantData[];
  isLoading: boolean;
  error: string | null;
  isFromApi: boolean;
  refresh: () => Promise<void>;
  searchMerchants: (query: string) => MerchantData[];
}

// 將本地資料轉換為 API 格式
function convertLocalToApiFormat(): MerchantCategoryData[] {
  return MERCHANT_CATEGORIES.map(cat => ({
    id: cat.id,
    name: cat.name,
    icon: cat.icon,
    merchants: cat.merchants.map(m => ({
      id: m.id,
      name: m.name,
      category: cat.id,
      aliases: m.aliases || [],
    })),
  }));
}

// 搜尋本地商戶
function searchLocalMerchants(query: string): MerchantData[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  
  const results: MerchantData[] = [];
  
  for (const cat of MERCHANT_CATEGORIES) {
    for (const m of cat.merchants) {
      const matches = 
        m.name.toLowerCase().includes(q) ||
        m.id.includes(q) ||
        m.aliases?.some(a => a.toLowerCase().includes(q));
      
      if (matches) {
        results.push({
          id: m.id,
          name: m.name,
          category: cat.id,
          aliases: m.aliases || [],
        });
      }
    }
  }
  
  return results;
}

export function useMerchants(): UseMerchantsResult {
  const [categories, setCategories] = useState<MerchantCategoryData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFromApi, setIsFromApi] = useState(false);

  const fetchMerchants = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.getMerchants();
      
      if (response.data?.success && response.data.categories?.length > 0) {
        setCategories(response.data.categories);
        setIsFromApi(true);
        console.log('[Merchants] Loaded from API:', response.data.total);
      } else {
        // API 失敗或無資料，使用本地資料
        console.log('[Merchants] API failed or empty, using local data');
        setCategories(convertLocalToApiFormat());
        setIsFromApi(false);
      }
    } catch (e: any) {
      console.error('[Merchants] Error:', e);
      setError(e.message);
      // 使用本地資料作為備援
      setCategories(convertLocalToApiFormat());
      setIsFromApi(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMerchants();
  }, [fetchMerchants]);

  // 搜尋商戶（優先使用已載入的資料）
  const searchMerchants = useCallback((query: string): MerchantData[] => {
    const q = query.toLowerCase().trim();
    if (!q) return [];

    // 如果資料來自 API，從 categories 中搜尋
    if (isFromApi && categories.length > 0) {
      const results: MerchantData[] = [];
      for (const cat of categories) {
        for (const m of cat.merchants) {
          const matches =
            m.name.toLowerCase().includes(q) ||
            m.id.includes(q) ||
            m.aliases?.some(a => a.toLowerCase().includes(q));
          
          if (matches) {
            results.push(m);
          }
        }
      }
      return results;
    }

    // 否則搜尋本地資料
    return searchLocalMerchants(query);
  }, [categories, isFromApi]);

  // 扁平化商戶列表
  const merchants = categories.flatMap(cat => cat.merchants);

  return {
    categories,
    merchants,
    isLoading,
    error,
    isFromApi,
    refresh: fetchMerchants,
    searchMerchants,
  };
}

export default useMerchants;

