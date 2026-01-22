import { NextRequest, NextResponse } from 'next/server';
import { adminAuthClient } from '@/lib/supabase/admin-client';

export const dynamic = 'force-dynamic';

/**
 * Cron Job: 清理過期超過 7 日的 MoneyHero partner offers
 * 
 * 建議設定：每日凌晨 3:00 執行一次
 * Vercel Cron: 0 3 * * *
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

    console.log(`[Cleanup Cron] Starting cleanup for offers expired before ${cutoffDate}`);

    // 獲取所有有 partner_offer 的卡片
    const { data: cards, error: fetchError } = await supabase
      .from('cards')
      .select('id, name, partner_offer')
      .not('partner_offer', 'is', null);

    if (fetchError) {
      console.error('[Cleanup Cron] Error fetching cards:', fetchError);
      return NextResponse.json({ error: fetchError.message }, { status: 500 });
    }

    if (!cards || cards.length === 0) {
      return NextResponse.json({ 
        message: 'No cards with partner offers found',
        cleaned: 0 
      });
    }

    // 找出過期超過 7 日的 partner offers
    const expiredCards: { id: string; name: string; validTo: string }[] = [];
    
    for (const card of cards) {
      const offer = card.partner_offer;
      if (offer && offer.validTo) {
        const validTo = new Date(offer.validTo);
        const cutoff = new Date(cutoffDate);
        
        if (validTo < cutoff) {
          expiredCards.push({
            id: card.id,
            name: card.name,
            validTo: offer.validTo
          });
        }
      }
    }

    if (expiredCards.length === 0) {
      console.log('[Cleanup Cron] No expired offers to clean up');
      return NextResponse.json({ 
        message: 'No expired offers to clean up',
        cleaned: 0,
        cutoffDate
      });
    }

    // 清除過期的 partner_offer（設為 null）
    const cleanedIds: string[] = [];
    const errors: string[] = [];

    for (const card of expiredCards) {
      const { error: updateError } = await supabase
        .from('cards')
        .update({ 
          partner_offer: null,
          updated_at: new Date().toISOString()
        })
        .eq('id', card.id);

      if (updateError) {
        errors.push(`${card.id}: ${updateError.message}`);
        console.error(`[Cleanup Cron] Error cleaning ${card.id}:`, updateError);
      } else {
        cleanedIds.push(card.id);
        console.log(`[Cleanup Cron] Cleaned expired offer for ${card.name} (expired: ${card.validTo})`);
      }
    }

    const result = {
      message: `Cleaned ${cleanedIds.length} expired partner offers`,
      cleaned: cleanedIds.length,
      cleanedCards: cleanedIds,
      cutoffDate,
      errors: errors.length > 0 ? errors : undefined
    };

    console.log('[Cleanup Cron] Cleanup completed:', result);

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('[Cleanup Cron] Unexpected error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// 也支援 POST 方法（方便手動觸發）
export async function POST(request: NextRequest) {
  return GET(request);
}

