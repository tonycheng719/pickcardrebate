import { adminAuthClient } from "@/lib/supabase/admin-client";
import { HK_CARDS } from "./cards";
import { CreditCard } from "../types";

/**
 * 服務器端函數：獲取合併後的卡片數據（包含資料庫中的圖片）
 * 用於 Server Components（如排行榜頁面）
 */
export async function getCardsWithImages(): Promise<CreditCard[]> {
  try {
    // 從資料庫獲取卡片數據（主要是圖片）
    const { data: dbCards, error } = await adminAuthClient
      .from('cards')
      .select('id, image_url, partner_offer');
    
    if (error) {
      console.error('Error fetching cards from DB:', error);
      return HK_CARDS;
    }

    if (!dbCards || dbCards.length === 0) {
      return HK_CARDS;
    }

    // 創建 DB 卡片 Map
    const dbCardMap = new Map<string, { image_url?: string; partner_offer?: any }>(
      dbCards.map((c: any) => [c.id, { image_url: c.image_url, partner_offer: c.partner_offer }])
    );

    // 合併：LOCAL 卡片 + DB 圖片
    const mergedCards = HK_CARDS.map(localCard => {
      const dbCard = dbCardMap.get(localCard.id);
      if (dbCard) {
        return {
          ...localCard,
          // DB 圖片優先
          imageUrl: dbCard.image_url || localCard.imageUrl,
          // DB partner_offer 優先
          partnerOffer: dbCard.partner_offer || localCard.partnerOffer,
        };
      }
      return localCard;
    });

    return mergedCards;
  } catch (e) {
    console.error('Error in getCardsWithImages:', e);
    return HK_CARDS;
  }
}

