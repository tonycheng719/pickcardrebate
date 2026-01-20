import { NextRequest, NextResponse } from "next/server";
import { HK_CARDS } from "@/lib/data/cards";
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

// 類別定義
const CATEGORIES = {
  supermarket: ['supermarket'],
  dining: ['dining'],
  travel: ['travel'],
  online: ['online'],
  transport: ['transport'],
  mobile_pay: ['apple_pay', 'google_pay', 'samsung_pay'],
  foreign: ['foreign'],
  entertainment: ['entertainment'],
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

    // 根據類別計算排名
    const categoryValues = CATEGORIES[category as keyof typeof CATEGORIES] || ['supermarket'];
    
    const rankings = HK_CARDS
      .map(card => {
        // 找出該類別的最高回贈率
        let bestRate = 0;
        let bestRule: any = null;

        for (const rule of card.rules) {
          // 檢查規則是否匹配類別
          const isMatch = 
            rule.matchType === 'base' ||
            (rule.matchType === 'category' && 
              (Array.isArray(rule.matchValue) 
                ? rule.matchValue.some(v => categoryValues.includes(v))
                : categoryValues.includes(rule.matchValue as string))) ||
            (rule.matchType === 'paymentMethod' && 
              category === 'mobile_pay' &&
              (Array.isArray(rule.matchValue)
                ? rule.matchValue.some(v => categoryValues.includes(v))
                : categoryValues.includes(rule.matchValue as string)));

          if (isMatch && rule.percentage > bestRate) {
            // 排除不相關的規則
            if (rule.excludeCategories?.some((c: string) => categoryValues.includes(c))) continue;
            if (category === 'foreign' && !rule.isForeignCurrency) continue;
            
            bestRate = rule.percentage;
            bestRule = rule;
          }
        }

        const dbCard = dbCardMap.get(card.id);
        
        return {
          id: card.id,
          name: card.name,
          bank: card.bank,
          rate: bestRate,
          ruleDescription: bestRule?.description || null,
          imageUrl: dbCard?.image_url || card.imageUrl || null,
          tags: card.tags || [],
        };
      })
      .filter(c => c.rate > 0)
      .sort((a, b) => b.rate - a.rate)
      .slice(0, limit);

    return NextResponse.json({ 
      category,
      rankings,
      count: rankings.length,
    }, { headers: corsHeaders });
  } catch (error) {
    console.error("Error fetching rankings:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500, headers: corsHeaders });
  }
}

