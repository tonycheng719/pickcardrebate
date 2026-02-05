import { NextRequest, NextResponse } from 'next/server';
import { adminAuthClient } from '@/lib/supabase/admin-client';

export const dynamic = 'force-dynamic';

/**
 * Cron Job: 清理過期超過 7 日的推廣活動
 * 
 * 功能：
 * 1. 清除信用卡的 promoEndDate（已過期 7 日）
 * 2. 刪除 Discover 文章（已過期 7 日）
 * 
 * 建議設定：每日凌晨 4:00 執行一次
 * Vercel Cron: 0 4 * * *
 */
export async function GET(request: NextRequest) {
  try {
    // 驗證 cron secret（防止未授權訪問）
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;
    
    // 如果設定了 CRON_SECRET，需要驗證
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = adminAuthClient;
    
    // 計算 7 日前的日期
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const cutoffDate = sevenDaysAgo.toISOString().split('T')[0]; // YYYY-MM-DD 格式

    console.log(`[Cleanup Promos] Starting cleanup for promos expired before ${cutoffDate}`);

    const results = {
      cards: { cleaned: 0, errors: [] as string[] },
      promos: { deleted: 0, errors: [] as string[] },
      cutoffDate
    };

    // 1. 清理信用卡的過期推廣日期（批量操作）
    try {
      // 直接使用 SQL 批量更新，比逐一更新高效得多
      const { error: cardUpdateError, count: cardCount } = await supabase
        .from('cards')
        .update({ 
          promo_end_date: null,
          promo_name: null,
          updated_at: new Date().toISOString()
        })
        .not('promo_end_date', 'is', null)
        .lt('promo_end_date', cutoffDate);

      if (cardUpdateError) {
        console.error('[Cleanup Promos] Error batch updating cards:', cardUpdateError);
        results.cards.errors.push(cardUpdateError.message);
      } else {
        results.cards.cleaned = cardCount || 0;
        console.log(`[Cleanup Promos] Batch cleared ${cardCount || 0} card promos`);
      }
    } catch (e: any) {
      results.cards.errors.push(e.message);
    }

    // 2. 刪除過期的 Discover 文章（批量操作）
    try {
      // 批量軟刪除過期文章（排除 evergreen）
      const { error: promoUpdateError, count: promoCount } = await supabase
        .from('promos')
        .update({ 
          is_deleted: true,
          deleted_at: new Date().toISOString()
        })
        .not('expiry_date', 'is', null)
        .neq('expiry_date', '長期有效')
        .neq('expiry_date', 'evergreen')
        .lt('expiry_date', cutoffDate)
        .eq('is_deleted', false); // 只處理未刪除的

      if (promoUpdateError) {
        console.error('[Cleanup Promos] Error batch deleting promos:', promoUpdateError);
        results.promos.errors.push(promoUpdateError.message);
      } else {
        results.promos.deleted = promoCount || 0;
        console.log(`[Cleanup Promos] Batch soft deleted ${promoCount || 0} promos`);
      }
    } catch (e: any) {
      results.promos.errors.push(e.message);
    }

    console.log('[Cleanup Promos] Cleanup completed:', results);

    return NextResponse.json({
      message: `Cleanup completed`,
      ...results
    });
  } catch (error: any) {
    console.error('[Cleanup Promos] Unexpected error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// 也支援 POST 方法（方便手動觸發）
export async function POST(request: NextRequest) {
  return GET(request);
}

