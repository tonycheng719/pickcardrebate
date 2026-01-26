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
  grossRate?: number;
  ruleDescription: string | null;
  imageUrl: string | null;
  tags: string[];
  // 額外信息
  cap?: number;
  capType?: string;
  capAsSpending?: number;
  minSpend?: number;
  monthlyMinSpend?: number;
  conditions?: string[];
  foreignCurrencyFee?: number;
  // 里數卡專用
  dollarsPerMile?: number;
  milesProgram?: string;
}

export interface RankingsResponse {
  category: string;
  categoryName?: string;
  categoryIcon?: string;
  categoryDescription?: string;
  isForeignCurrency?: boolean;
  isMilesCategory?: boolean;
  rankings: RankingItem[];
  count: number;
}

// ==================== 計算結果類型 ====================

// 回贈組成項目
export interface RewardBreakdownItem {
  label: string;
  percentage: number;
  description?: string;
}

export interface CalculateResult {
  rank: number;
  cardId: string;
  cardName: string;
  bank: string;
  imageUrl: string | null;
  isOwned?: boolean; // 是否為用戶持有的卡片
  applyUrl?: string | null; // 申請連結
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
  // 回贈組成（與網站一致）
  rewardBreakdown?: {
    baseRate: number;        // 基本回贈
    bonusRate: number;       // 額外回贈
    bonusDescription?: string; // 額外回贈說明
    totalRate: number;       // 總回贈
    capAmount?: number;      // 上限
  };
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
  // 申請鏈接
  applyUrl?: string;
}

export interface CalculateResponse {
  query: string;
  amount: number;
  paymentMethod?: string;
  results: CalculateResult[];
  count: number;
  totalFound: number;
}

// 商戶類型
export interface MerchantData {
  id: string;
  name: string;
  category: string;
  aliases?: string[];
  logo?: string;
  accentColor?: string;
}

export interface MerchantCategoryData {
  id: string;
  name: string;
  name_en?: string;
  icon: string;
  merchants: MerchantData[];
}

export interface MerchantsResponse {
  success: boolean;
  categories: MerchantCategoryData[];
  total: number;
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
  
  // 計算回贈 - 核心功能（使用 POST）
  calculate: (params: {
    query: string;
    amount?: number;
    paymentMethod?: string;
    isForeignCurrency?: boolean;
    limit?: number;
    rewardPreference?: 'cash' | 'miles';
    myCardIds?: string[]; // 用戶持有的卡片 IDs
  }) => {
    return request<CalculateResponse>('/mobile/calculate', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  },
  
  // 獲取商戶列表（從統一資料庫）
  getMerchants: (params?: { category?: string; search?: string }) => {
    const searchParams = new URLSearchParams({ format: 'grouped' });
    if (params?.category) searchParams.set('category', params.category);
    if (params?.search) searchParams.set('q', params.search);
    return request<MerchantsResponse>(`/merchants?${searchParams.toString()}`);
  },
  
  // 搜尋商戶
  searchMerchants: (query: string) => {
    const searchParams = new URLSearchParams({ 
      format: 'grouped',
      q: query 
    });
    return request<MerchantsResponse>(`/merchants?${searchParams.toString()}`);
  },
};

export { API_BASE_URL };
