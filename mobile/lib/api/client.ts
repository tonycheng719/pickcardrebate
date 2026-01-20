/**
 * API 客戶端 - 連接 Web 後端
 */

// 統一使用生產環境 URL（避免模擬器連接 localhost 問題）
const API_BASE_URL = 'https://pickcardrebate.com/api';

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

async function request<T>(
  endpoint: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`;
  console.log(`[API] Requesting: ${url}`);
  
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    console.log(`[API] Response status: ${response.status}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[API] Error response: ${errorText}`);
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    console.error(`[API] Error [${endpoint}]:`, error);
    return { error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// ==================== 類型定義 ====================

export interface CardData {
  id: string;
  name: string;
  bank: string;
  imageUrl: string | null;
  style?: {
    bgColor?: string;
    textColor?: string;
  };
  tags: string[];
  annualFee?: number;
  feeWaiverCondition?: string;
  welcomeOfferText?: string;
  sellingPoints: string[];
  promoEndDate?: string;
  promoName?: string;
  topRate: number;
  topRateCategory: string | null;
}

export interface CardsResponse {
  cards: CardData[];
  count: number;
  lastUpdated: string;
}

export interface PromoData {
  id: string;
  title: string;
  description: string;
  merchant: string;
  imageUrl: string | null;
  expiryDate: string | null;
  tags: string[];
  isPinned: boolean;
  isNew: boolean;
  contentType: 'promo' | 'guide';
  updatedAt: string;
}

export interface PromosResponse {
  promos: PromoData[];
  count: number;
}

export interface RankingItem {
  id: string;
  name: string;
  bank: string;
  rate: number;
  ruleDescription: string | null;
  imageUrl: string | null;
  tags: string[];
}

export interface RankingsResponse {
  category: string;
  rankings: RankingItem[];
  count: number;
}

// ==================== 計算結果類型 ====================

export interface CalculateResult {
  rank: number;
  cardId: string;
  cardName: string;
  bank: string;
  imageUrl: string | null;
  percentage: number;
  rewardAmount: number;
  ruleDescription: string;
  isCapped: boolean;
  isForeignCurrency?: boolean;
  netRewardAmount?: number;
  netPercentage?: number;
  fxFee?: number;
  discountPercentage?: number;
  discountAmount?: number;
  spendingSuggestion?: {
    targetAmount: number;
    ruleDescription: string;
    newPercentage: number;
    newRewardAmount: number;
  } | null;
  dateSuggestion?: {
    validDays?: number[];
    validDates?: number[];
    description: string;
    newPercentage: number;
  } | null;
  suggestedPaymentMethod?: string | null;
  pointsAmount?: number;
  pointsCurrency?: string;
  overCapInfo?: {
    capAmount: number;
    overCapAmount: number;
    overCapPercentage: number;
    overCapReward: number;
    totalReward: number;
  };
}

export interface CalculateResponse {
  query: string;
  amount: number;
  paymentMethod?: string;
  results: CalculateResult[];
  count: number;
  totalFound: number;
}

// ==================== API 方法 ====================

export const api = {
  // 獲取所有信用卡
  getCards: () => request<CardsResponse>('/mobile/cards'),
  
  // 獲取單張信用卡詳情
  getCard: (id: string) => request<{ card: CardData }>(`/mobile/cards/${id}`),
  
  // 獲取優惠文章列表
  getPromos: (params?: { type?: 'promo' | 'guide'; limit?: number; pinned?: boolean }) => {
    const searchParams = new URLSearchParams();
    if (params?.type) searchParams.set('type', params.type);
    if (params?.limit) searchParams.set('limit', params.limit.toString());
    if (params?.pinned) searchParams.set('pinned', 'true');
    const query = searchParams.toString();
    return request<PromosResponse>(`/mobile/promos${query ? `?${query}` : ''}`);
  },
  
  // 獲取排行榜
  getRankings: (category: string, limit?: number) => {
    const searchParams = new URLSearchParams({ category });
    if (limit) searchParams.set('limit', limit.toString());
    return request<RankingsResponse>(`/mobile/rankings?${searchParams.toString()}`);
  },
  
  // 計算回贈 - 核心功能
  calculate: (params: {
    query: string;
    amount?: number;
    paymentMethod?: string;
    isForeignCurrency?: boolean;
    limit?: number;
  }) => {
    const searchParams = new URLSearchParams();
    searchParams.set('query', params.query);
    if (params.amount) searchParams.set('amount', params.amount.toString());
    if (params.paymentMethod) searchParams.set('paymentMethod', params.paymentMethod);
    if (params.isForeignCurrency) searchParams.set('isForeignCurrency', 'true');
    if (params.limit) searchParams.set('limit', params.limit.toString());
    return request<CalculateResponse>(`/mobile/calculate?${searchParams.toString()}`);
  },
};

export { API_BASE_URL };
