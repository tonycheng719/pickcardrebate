"use client";

import useSWR, { SWRConfiguration } from 'swr';

// Global fetch deduplication and rate limiting
const pendingRequests = new Map<string, Promise<any>>();
const lastFetchTime = new Map<string, number>();
const MIN_FETCH_INTERVAL = 5000; // 5 seconds minimum between fetches

// Fetcher with deduplication and error handling
async function fetcher(url: string) {
  // Check if we're fetching too frequently
  const lastFetch = lastFetchTime.get(url);
  const now = Date.now();
  
  if (lastFetch && now - lastFetch < MIN_FETCH_INTERVAL) {
    // Return cached promise if fetching too frequently
    const pending = pendingRequests.get(url);
    if (pending) return pending;
  }
  
  // Check if there's already a pending request
  const existingRequest = pendingRequests.get(url);
  if (existingRequest) {
    return existingRequest;
  }
  
  // Create new request with timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout
  
  const requestPromise = fetch(url, { signal: controller.signal })
    .then(async (res) => {
      clearTimeout(timeoutId);
      
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }
      
      return res.json();
    })
    .finally(() => {
      // Clean up after request completes
      pendingRequests.delete(url);
      lastFetchTime.set(url, Date.now());
    });
  
  pendingRequests.set(url, requestPromise);
  return requestPromise;
}

// SWR config with retry and error handling
const swrConfig: SWRConfiguration = {
  fetcher,
  revalidateOnFocus: false, // Don't refetch on window focus (reduces requests)
  revalidateOnReconnect: true,
  dedupingInterval: 10000, // Dedupe requests within 10 seconds
  errorRetryCount: 3, // Only retry 3 times
  errorRetryInterval: 5000, // Wait 5 seconds between retries
  shouldRetryOnError: (error) => {
    // Don't retry on 4xx errors (client errors)
    if (error?.message?.includes('HTTP 4')) return false;
    return true;
  },
  onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
    // Exponential backoff: 5s, 10s, 20s
    const delay = Math.min(5000 * Math.pow(2, retryCount), 30000);
    console.log(`[SWR] Retrying ${key} in ${delay}ms (attempt ${retryCount + 1})`);
    setTimeout(() => revalidate({ retryCount }), delay);
  },
};

// Hook for fetching cards
export function useCards() {
  const { data, error, isLoading, mutate } = useSWR(
    '/api/admin/cards',
    swrConfig
  );
  
  return {
    cards: data?.cards || [],
    isLoading,
    isError: !!error,
    error,
    refresh: mutate,
  };
}

// Hook for fetching merchants
export function useMerchants() {
  const { data, error, isLoading, mutate } = useSWR(
    '/api/admin/merchants',
    swrConfig
  );
  
  return {
    merchants: data?.merchants || [],
    isLoading,
    isError: !!error,
    error,
    refresh: mutate,
  };
}

// Hook for fetching promos
export function usePromos() {
  const { data, error, isLoading, mutate } = useSWR(
    '/api/admin/promos',
    swrConfig
  );
  
  return {
    promos: data?.promos || [],
    isLoading,
    isError: !!error,
    error,
    refresh: mutate,
  };
}

// Hook for fetching article comments
export function useArticleComments(articleId: string | null) {
  const { data, error, isLoading, mutate } = useSWR(
    articleId ? `/api/articles/comments?articleId=${articleId}` : null,
    {
      ...swrConfig,
      revalidateOnFocus: false,
      dedupingInterval: 30000, // 30 seconds for comments (less critical)
    }
  );
  
  return {
    comments: data?.comments || [],
    avgRating: data?.avgRating || 0,
    totalCount: data?.totalCount || 0,
    isLoading,
    isError: !!error,
    error,
    refresh: mutate,
  };
}

