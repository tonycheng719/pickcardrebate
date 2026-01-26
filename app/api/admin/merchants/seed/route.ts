import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { POPULAR_MERCHANTS } from '@/lib/data/merchants';

export const dynamic = 'force-dynamic';

function getServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false }
  });
}

export async function POST(request: Request) {
  try {
    const supabase = getServiceClient();
    if (!supabase) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
    }

    // 將本地商戶資料轉換為資料庫格式
    const merchantsToInsert = POPULAR_MERCHANTS.map((m, index) => ({
      id: m.id,
      name: m.name,
      category_ids: m.categoryIds || [],
      aliases: m.aliases || [],
      logo: m.logo || null,
      accent_color: m.accentColor || '#6b7280',
      is_online_only: m.isOnlineOnly || false,
      is_general: m.isGeneral || false,
      is_foreign_currency: m.isForeignCurrency || false,
      currency: m.currency || null,
      excluded_card_networks: m.excludedCardNetworks || [],
      sort_order: index,
      is_popular: !m.isGeneral, // 非通用商戶都是熱門
      is_active: true,
    }));

    // 批量 upsert
    const batchSize = 50;
    let successCount = 0;
    let errorCount = 0;
    const errors: string[] = [];

    for (let i = 0; i < merchantsToInsert.length; i += batchSize) {
      const batch = merchantsToInsert.slice(i, i + batchSize);
      
      const { error } = await supabase
        .from('merchants')
        .upsert(batch, { 
          onConflict: 'id',
          ignoreDuplicates: false 
        });

      if (error) {
        console.error('Batch insert error:', error);
        errorCount += batch.length;
        errors.push(`Batch ${i / batchSize + 1}: ${error.message}`);
      } else {
        successCount += batch.length;
      }
    }

    return NextResponse.json({
      success: true,
      message: '商戶同步完成',
      results: {
        total: merchantsToInsert.length,
        success: successCount,
        failed: errorCount,
        errors: errors.length > 0 ? errors : undefined,
      }
    });
  } catch (e: any) {
    console.error('Merchants seed error:', e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

// GET 方法：查看目前資料庫中的商戶數量
export async function GET() {
  try {
    const supabase = getServiceClient();
    if (!supabase) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
    }

    const { count: dbCount } = await supabase
      .from('merchants')
      .select('*', { count: 'exact', head: true });

    return NextResponse.json({
      success: true,
      localMerchantsCount: POPULAR_MERCHANTS.length,
      dbMerchantsCount: dbCount || 0,
      needsSync: (dbCount || 0) < POPULAR_MERCHANTS.length,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

