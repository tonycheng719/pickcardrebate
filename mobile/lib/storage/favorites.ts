import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = '@favorites';

export interface FavoriteItem {
  id: string;
  type: 'article' | 'card';
  title: string;
  imageUrl?: string;
  addedAt: string;
}

// 獲取收藏列表
export async function getFavorites(): Promise<FavoriteItem[]> {
  try {
    const data = await AsyncStorage.getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to get favorites:', error);
    return [];
  }
}

// 添加收藏
export async function addFavorite(item: Omit<FavoriteItem, 'addedAt'>): Promise<boolean> {
  try {
    const favorites = await getFavorites();
    
    // 檢查是否已存在
    if (favorites.some(f => f.id === item.id && f.type === item.type)) {
      return false;
    }
    
    const newFavorite: FavoriteItem = {
      ...item,
      addedAt: new Date().toISOString(),
    };
    
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify([newFavorite, ...favorites]));
    return true;
  } catch (error) {
    console.error('Failed to add favorite:', error);
    return false;
  }
}

// 移除收藏
export async function removeFavorite(id: string, type: 'article' | 'card'): Promise<boolean> {
  try {
    const favorites = await getFavorites();
    const filtered = favorites.filter(f => !(f.id === id && f.type === type));
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Failed to remove favorite:', error);
    return false;
  }
}

// 檢查是否已收藏
export async function isFavorite(id: string, type: 'article' | 'card'): Promise<boolean> {
  try {
    const favorites = await getFavorites();
    return favorites.some(f => f.id === id && f.type === type);
  } catch (error) {
    return false;
  }
}

// 切換收藏狀態
export async function toggleFavorite(item: Omit<FavoriteItem, 'addedAt'>): Promise<boolean> {
  const isFav = await isFavorite(item.id, item.type);
  if (isFav) {
    await removeFavorite(item.id, item.type);
    return false;
  } else {
    await addFavorite(item);
    return true;
  }
}

