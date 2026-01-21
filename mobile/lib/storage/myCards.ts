import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateWidgetData } from '../widget';

const MY_CARDS_KEY = '@my_cards';
const WALLET_SYNC_KEY = '@wallet_last_sync';
const API_BASE = 'https://pickcardrebate.com';

export interface MyCard {
  id: string;
  name: string;
  bank: string;
  imageUrl?: string;
  addedAt: string;
}

// 獲取用戶的卡包（本地）
export async function getMyCards(): Promise<MyCard[]> {
  try {
    const data = await AsyncStorage.getItem(MY_CARDS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to get my cards:', error);
    return [];
  }
}

// 從雲端同步用戶的信用卡
export async function syncWalletFromCloud(userId: string): Promise<MyCard[]> {
  try {
    console.log('[Wallet] Syncing from cloud for user:', userId);
    
    // 1. 獲取用戶的卡片 ID 列表
    const walletRes = await fetch(`${API_BASE}/api/wallet/sync?userId=${userId}`);
    if (!walletRes.ok) {
      throw new Error('Failed to fetch wallet data');
    }
    const walletData = await walletRes.json();
    const cardIds: string[] = walletData.myCardIds || [];
    
    console.log('[Wallet] Cloud card IDs:', cardIds);
    
    if (cardIds.length === 0) {
      await AsyncStorage.setItem(MY_CARDS_KEY, JSON.stringify([]));
      return [];
    }
    
    // 2. 獲取所有信用卡的詳細資料
    const cardsRes = await fetch(`${API_BASE}/api/mobile/cards`);
    if (!cardsRes.ok) {
      throw new Error('Failed to fetch cards data');
    }
    const cardsData = await cardsRes.json();
    console.log('[Wallet] Cards API response type:', typeof cardsData);
    
    // API 返回 { cards: [...] } 格式
    let allCards: any[] = [];
    if (Array.isArray(cardsData)) {
      allCards = cardsData;
    } else if (cardsData && Array.isArray(cardsData.cards)) {
      allCards = cardsData.cards;
    }
    
    console.log('[Wallet] All cards count:', allCards.length);
    
    // 3. 過濾出用戶的卡片
    const myCards: MyCard[] = cardIds
      .map((id: string) => {
        const card = allCards.find((c: any) => c.id === id);
        if (card) {
          return {
            id: card.id,
            name: card.name,
            bank: card.bank,
            imageUrl: card.imageUrl,
            addedAt: new Date().toISOString(),
          };
        }
        return null;
      })
      .filter((c: MyCard | null): c is MyCard => c !== null);
    
    console.log('[Wallet] Synced cards:', myCards.length);
    
    // 4. 存儲到本地
    await AsyncStorage.setItem(MY_CARDS_KEY, JSON.stringify(myCards));
    await AsyncStorage.setItem(WALLET_SYNC_KEY, new Date().toISOString());
    
    // 5. 更新 Widget 數據
    try {
      await updateWidgetData(myCards.map(c => ({
        id: c.id,
        name: c.name,
        bank: c.bank,
        imageUrl: c.imageUrl,
      })));
    } catch (e) {
      console.log('[Wallet] Widget update failed (non-critical):', e);
    }
    
    return myCards;
  } catch (error) {
    console.error('[Wallet] Sync failed:', error);
    // 同步失敗時返回本地資料
    return getMyCards();
  }
}

// 添加卡片到雲端和本地
export async function addCardToCloud(userId: string, cardId: string): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/api/wallet/sync`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, action: 'add', cardId }),
    });
    return res.ok;
  } catch (error) {
    console.error('[Wallet] Add to cloud failed:', error);
    return false;
  }
}

// 從雲端移除卡片
export async function removeCardFromCloud(userId: string, cardId: string): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/api/wallet/sync`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, action: 'remove', cardId }),
    });
    return res.ok;
  } catch (error) {
    console.error('[Wallet] Remove from cloud failed:', error);
    return false;
  }
}

// 添加卡片到卡包
export async function addCardToWallet(card: Omit<MyCard, 'addedAt'>): Promise<boolean> {
  try {
    const cards = await getMyCards();
    
    // 檢查是否已存在
    if (cards.some(c => c.id === card.id)) {
      return false;
    }
    
    const newCard: MyCard = {
      ...card,
      addedAt: new Date().toISOString(),
    };
    
    await AsyncStorage.setItem(MY_CARDS_KEY, JSON.stringify([...cards, newCard]));
    return true;
  } catch (error) {
    console.error('Failed to add card:', error);
    return false;
  }
}

// 從卡包移除卡片
export async function removeCardFromWallet(cardId: string): Promise<boolean> {
  try {
    const cards = await getMyCards();
    const filtered = cards.filter(c => c.id !== cardId);
    await AsyncStorage.setItem(MY_CARDS_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Failed to remove card:', error);
    return false;
  }
}

// 檢查卡片是否在卡包中
export async function isCardInWallet(cardId: string): Promise<boolean> {
  try {
    const cards = await getMyCards();
    return cards.some(c => c.id === cardId);
  } catch (error) {
    return false;
  }
}

// 清空卡包
export async function clearWallet(): Promise<boolean> {
  try {
    await AsyncStorage.removeItem(MY_CARDS_KEY);
    return true;
  } catch (error) {
    console.error('Failed to clear wallet:', error);
    return false;
  }
}

