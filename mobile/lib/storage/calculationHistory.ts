import AsyncStorage from '@react-native-async-storage/async-storage';

const HISTORY_KEY = '@calculation_history';
const MAX_HISTORY = 50;

export interface CalculationRecord {
  id: string;
  merchantName: string;
  merchantCategory: string;
  amount: number;
  cardName: string;
  cardId: string;
  percentage: number;
  rewardAmount: number;
  paymentMethod: string;
  rewardPreference: 'cash' | 'miles';
  timestamp: string;
}

// 獲取計算歷史
export async function getCalculationHistory(): Promise<CalculationRecord[]> {
  try {
    const data = await AsyncStorage.getItem(HISTORY_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to get calculation history:', error);
    return [];
  }
}

// 添加計算記錄
export async function addCalculationRecord(record: Omit<CalculationRecord, 'id' | 'timestamp'>): Promise<void> {
  try {
    const history = await getCalculationHistory();
    
    const newRecord: CalculationRecord = {
      ...record,
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
    };
    
    // 添加到開頭，保持最大數量
    const updatedHistory = [newRecord, ...history].slice(0, MAX_HISTORY);
    
    await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
  } catch (error) {
    console.error('Failed to add calculation record:', error);
  }
}

// 刪除單條記錄
export async function deleteCalculationRecord(id: string): Promise<void> {
  try {
    const history = await getCalculationHistory();
    const filtered = history.filter(r => r.id !== id);
    await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Failed to delete calculation record:', error);
  }
}

// 清空歷史
export async function clearCalculationHistory(): Promise<void> {
  try {
    await AsyncStorage.removeItem(HISTORY_KEY);
  } catch (error) {
    console.error('Failed to clear calculation history:', error);
  }
}

// 獲取統計
export async function getCalculationStats(): Promise<{
  totalCalculations: number;
  totalAmount: number;
  totalReward: number;
  favoriteCard: string | null;
  favoriteMerchant: string | null;
}> {
  try {
    const history = await getCalculationHistory();
    
    if (history.length === 0) {
      return {
        totalCalculations: 0,
        totalAmount: 0,
        totalReward: 0,
        favoriteCard: null,
        favoriteMerchant: null,
      };
    }
    
    // 統計最常用的卡
    const cardCounts: Record<string, number> = {};
    const merchantCounts: Record<string, number> = {};
    
    let totalAmount = 0;
    let totalReward = 0;
    
    for (const record of history) {
      totalAmount += record.amount;
      totalReward += record.rewardAmount;
      
      cardCounts[record.cardName] = (cardCounts[record.cardName] || 0) + 1;
      merchantCounts[record.merchantName] = (merchantCounts[record.merchantName] || 0) + 1;
    }
    
    const favoriteCard = Object.entries(cardCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || null;
    const favoriteMerchant = Object.entries(merchantCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || null;
    
    return {
      totalCalculations: history.length,
      totalAmount,
      totalReward,
      favoriteCard,
      favoriteMerchant,
    };
  } catch (error) {
    console.error('Failed to get calculation stats:', error);
    return {
      totalCalculations: 0,
      totalAmount: 0,
      totalReward: 0,
      favoriteCard: null,
      favoriteMerchant: null,
    };
  }
}

