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

    // 1. 清理信用卡的過期推廣日期
    try {
      // 獲取所有有 promo_end_date 的卡片
      const { data: cards, error: fetchCardsError } = await supabase
        .from('cards')
        .select('id, name, promo_end_date')
        .not('promo_end_date', 'is', null);

      if (fetchCardsError) {
        console.error('[Cleanup Promos] Error fetching cards:', fetchCardsError);
        results.cards.errors.push(fetchCardsError.message);
      } else if (cards && cards.length > 0) {
        for (const card of cards) {
          const endDate = new Date(card.promo_end_date);
          const cutoff = new Date(cutoffDate);
          
          if (endDate < cutoff) {
            const { error: updateError } = await supabase
              .from('cards')
              .update({ 
                promo_end_date: null,
                promo_name: null,
                updated_at: new Date().toISOString()
              })
              .eq('id', card.id);

            if (updateError) {
              results.cards.errors.push(`${card.id}: ${updateError.message}`);
            } else {
              results.cards.cleaned++;
              console.log(`[Cleanup Promos] Cleared promo for ${card.name} (expired: ${card.promo_end_date})`);
            }
          }
        }
      }
    } catch (e: any) {
      results.cards.errors.push(e.message);
    }

    // 2. 刪除過期的 Discover 文章
    try {
      const { data: promos, error: fetchPromosError } = await supabase
        .from('promos')
        .select('id, title, expiry_date')
        .not('expiry_date', 'is', null);

      if (fetchPromosError) {
        console.error('[Cleanup Promos] Error fetching promos:', fetchPromosError);
        results.promos.errors.push(fetchPromosError.message);
      } else if (promos && promos.length > 0) {
        for (const promo of promos) {
          // 跳過「長期有效」的文章
          if (promo.expiry_date === '長期有效' || promo.expiry_date === 'evergreen') {
            continue;
          }
          
          try {
            const endDate = new Date(promo.expiry_date);
            const cutoff = new Date(cutoffDate);
            
            if (endDate < cutoff) {
              // 軟刪除：標記為已刪除而非真正刪除
              const { error: deleteError } = await supabase
                .from('promos')
                .update({ 
                  is_deleted: true,
                  deleted_at: new Date().toISOString()
                })
                .eq('id', promo.id);

              if (deleteError) {
                results.promos.errors.push(`${promo.id}: ${deleteError.message}`);
              } else {
                results.promos.deleted++;
                console.log(`[Cleanup Promos] Soft deleted promo: ${promo.title} (expired: ${promo.expiry_date})`);
              }
            }
          } catch (dateError) {
            // 跳過無效日期格式
            continue;
          }
        }
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

