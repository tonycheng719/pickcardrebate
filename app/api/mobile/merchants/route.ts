import { NextRequest, NextResponse } from "next/server";
import { adminAuthClient } from "@/lib/supabase/admin-client";
import { POPULAR_MERCHANTS, MERCHANT_CATEGORIES } from "@/lib/data/merchants";

export const dynamic = 'force-dynamic';

// CORS headers for mobile app
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// Mobile 商戶 API - 獲取所有商戶（包含 logo）
export async function GET(request: NextRequest) {
  try {
    // 從資料庫獲取商戶數據
    const { data: dbMerchants, error } = await adminAuthClient
      .from('merchants')
      .select('*');

    if (error) {
      console.error("Error fetching merchants:", error);
    }

    // 創建 DB 商戶 Map
    const dbMerchantMap = new Map<string, any>(
      (dbMerchants || []).map((m: any) => [m.id, m])
    );

    // 合併本地數據和資料庫數據，優先使用資料庫的 logo
    const mergedMerchants = POPULAR_MERCHANTS.map(localMerchant => {
      const dbMerchant = dbMerchantMap.get(localMerchant.id);
      
      // 檢查 DB logo 是否為有效 URL
      const dbLogo = dbMerchant?.logo;
      const useDbLogo = dbLogo && 
        typeof dbLogo === 'string' && 
        (dbLogo.startsWith('http') || dbLogo.startsWith('/'));
      
      return {
        id: localMerchant.id,
        name: localMerchant.name,
        categoryIds: localMerchant.categoryIds,
        logo: useDbLogo ? dbLogo : localMerchant.logo,
        accentColor: dbMerchant?.accent_color || localMerchant.accentColor,
        isGeneral: localMerchant.isGeneral || false,
        aliases: localMerchant.aliases || [],
      };
    });

    // 返回商戶和分類數據
    return NextResponse.json({
      merchants: mergedMerchants,
      categories: MERCHANT_CATEGORIES.map(cat => ({
        id: cat.id,
        name: cat.name,
        icon: cat.icon,
        merchantIds: cat.merchants.map(m => m.id),
      })),
    }, { headers: corsHeaders });
  } catch (error) {
    console.error("Internal error fetching merchants:", error);
    return NextResponse.json(
      { error: "Internal Server Error", merchants: [], categories: [] },
      { status: 500, headers: corsHeaders }
    );
  }
}

