import AsyncStorage from '@react-native-async-storage/async-storage';

const MY_CARDS_KEY = '@my_cards';

export interface MyCard {
  id: string;
  name: string;
  bank: string;
  imageUrl?: string;
  addedAt: string;
}

// 獲取用戶的卡包
export async function getMyCards(): Promise<MyCard[]> {
  try {
    const data = await AsyncStorage.getItem(MY_CARDS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to get my cards:', error);
    return [];
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

