import { NextRequest, NextResponse } from "next/server";
import { HK_CARDS } from "@/lib/data/cards";
import { 
  getRankingsByCategory, 
  RANKING_CATEGORIES,
  RankingCategory,
} from "@/lib/logic/rankings";
import { adminAuthClient } from "@/lib/supabase/admin-client";

export const dynamic = 'force-dynamic';

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// 類別映射：App 類別名 -> Web 類別 ID
const CATEGORY_MAP: Record<string, RankingCategory> = {
  'dining': 'dining',
  'hkd_online': 'hkd_online',
  'foreign_online': 'foreign_online',
  'online': 'hkd_online', // 兼容舊版
  'supermarket': 'supermarket',
  'travel': 'travel',
  'overseas': 'overseas',
  'foreign': 'overseas', // 兼容舊版
  'mobile_pay': 'mobile_payment',
  'mobile_payment': 'mobile_payment',
  'miles': 'miles',
  'all_round': 'all_round',
};

// 公開 API - 取得各類別排行榜
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || 'supermarket';
    const limit = parseInt(searchParams.get('limit') || '10');

    // 取得資料庫中的卡片圖片
    let dbCardMap = new Map<string, { image_url: string | null }>();
    try {
      const { data: dbCards } = await adminAuthClient
        .from('cards')
        .select('id, image_url');
      if (dbCards) {
        dbCardMap = new Map(dbCards.map((c: any) => [c.id, c]));
      }
    } catch (e) {
      console.warn("Could not fetch card images");
    }

    // 合併數據庫圖片 URL 到 HK_CARDS
    const cardsWithImages = HK_CARDS.map(card => {
      const dbCard = dbCardMap.get(card.id);
      return {
        ...card,
        imageUrl: dbCard?.image_url || card.imageUrl || null,
      };
    });

    // 映射類別
    const mappedCategory = CATEGORY_MAP[category] || 'supermarket';
    
    // 使用 Web 版的排名邏輯
    const webRankings = getRankingsByCategory(mappedCategory, limit, cardsWithImages);
    
    // 轉換格式給 App 使用
    const rankings = webRankings.map(result => {
      const isMilesCategory = mappedCategory === 'miles';
      
      return {
        id: result.card.id,
        name: result.card.name,
        bank: result.card.bank,
        rate: result.netPercentage ?? result.percentage,
        grossRate: result.percentage,
        ruleDescription: result.rule.description,
        imageUrl: result.card.imageUrl || null,
        tags: result.card.tags || [],
        // 額外信息
        cap: result.cap,
        capType: result.capType,
        capAsSpending: result.capAsSpending,
        minSpend: result.minSpend,
        monthlyMinSpend: result.monthlyMinSpend,
        conditions: result.conditions,
        foreignCurrencyFee: result.foreignCurrencyFee,
        // 里數卡專用
        dollarsPerMile: isMilesCategory ? result.dollarsPerMile : undefined,
        milesProgram: isMilesCategory ? result.milesProgram : undefined,
      };
    });

    // 取得類別配置
    const categoryConfig = RANKING_CATEGORIES.find(c => c.id === mappedCategory);

    return NextResponse.json({ 
      category: mappedCategory,
      categoryName: categoryConfig?.name || category,
      categoryIcon: categoryConfig?.icon || '💳',
      categoryDescription: categoryConfig?.description || '',
      isForeignCurrency: categoryConfig?.isForeignCurrency || false,
      isMilesCategory: categoryConfig?.isMilesCard || false,
      rankings,
      count: rankings.length,
    }, { headers: corsHeaders });
  } catch (error) {
    console.error("Error fetching rankings:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500, headers: corsHeaders });
  }
}

// 取得所有類別列表
export async function POST(request: NextRequest) {
  try {
    const categories = RANKING_CATEGORIES.map(cat => ({
      id: cat.id,
      name: cat.name,
      nameEn: cat.nameEn,
      icon: cat.icon,
      description: cat.description,
      isForeignCurrency: cat.isForeignCurrency || false,
      isMilesCard: cat.isMilesCard || false,
    }));

    return NextResponse.json({ 
      categories,
      count: categories.length,
    }, { headers: corsHeaders });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500, headers: corsHeaders });
  }
}
