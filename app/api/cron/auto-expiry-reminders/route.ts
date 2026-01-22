import { NextRequest, NextResponse } from 'next/server';
import { adminAuthClient } from '@/lib/supabase/admin-client';
import { HK_CARDS } from '@/lib/data/cards';

// GET: 自動檢查並發送所有到期提醒
// 建議設定 Vercel Cron Job 每日執行一次
export async function GET() {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let processed = 0;
    let sent = 0;

    // 1. 檢查信用卡優惠到期
    for (const card of HK_CARDS) {
      if (!card.promoEndDate) continue;

      const endDate = new Date(card.promoEndDate);
      endDate.setHours(0, 0, 0, 0);
      const daysUntilExpiry = Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

      // 只處理 1、3、7 天內到期的
      let reminderType: string | null = null;
      if (daysUntilExpiry === 1) {
        reminderType = '1d';
      } else if (daysUntilExpiry === 3) {
        reminderType = '3d';
      } else if (daysUntilExpiry === 7) {
        reminderType = '7d';
      }

      if (!reminderType) continue;

      processed++;

      // 檢查是否已發送過
      const { data: existingLog } = await adminAuthClient
        .from('offer_notification_log')
        .select('id')
        .eq('source', 'card_promo')
        .eq('source_id', card.id)
        .eq('expiry_date', card.promoEndDate)
        .eq('reminder_type', reminderType)
        .single();

      if (existingLog) {
        console.log(`[AutoReminder] Already sent ${reminderType} for ${card.id}`);
        continue;
      }

      // 獲取持有此卡的用戶
      const { data: userCards } = await adminAuthClient
        .from('user_wallets')
        .select('user_id')
        .contains('card_ids', [card.id]);

      if (!userCards || userCards.length === 0) continue;

      const userIds = userCards.map(uc => uc.user_id);

      // 獲取 push token
      const { data: tokens } = await adminAuthClient
        .from('user_push_tokens')
        .select('token')
        .in('user_id', userIds);

      if (!tokens || tokens.length === 0) continue;

      // 發送推送
      const title = '💳 優惠即將到期';
      const body = daysUntilExpiry === 1
        ? `${card.name} 的 ${card.promoName || '優惠'} 明天就到期了！`
        : `${card.name} 的 ${card.promoName || '優惠'} 將在 ${daysUntilExpiry} 天後到期`;

      const messages = tokens.map(t => ({
        to: t.token,
        sound: 'default',
        title,
        body,
        data: { type: 'offer_expiry', cardId: card.id },
      }));

      try {
        const response = await fetch('https://exp.host/--/api/v2/push/send', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(messages),
        });

        if (response.ok) {
          sent += messages.length;

          // 記錄已發送
          await adminAuthClient
            .from('offer_notification_log')
            .insert({
              source: 'card_promo',
              source_id: card.id,
              expiry_date: card.promoEndDate,
              reminder_type: reminderType,
              recipients_count: messages.length,
            });

          console.log(`[AutoReminder] Sent ${reminderType} reminder for ${card.id} to ${messages.length} users`);
        }
      } catch (pushError) {
        console.error(`[AutoReminder] Push failed for ${card.id}:`, pushError);
      }
    }

    // 2. 檢查探索文章到期（如有 end_date）
    const { data: articles } = await adminAuthClient
      .from('discover_articles')
      .select('id, slug, title, end_date')
      .not('end_date', 'is', null)
      .gte('end_date', today.toISOString().split('T')[0]);

    if (articles) {
      for (const article of articles) {
        if (!article.end_date) continue;

        const endDate = new Date(article.end_date);
        endDate.setHours(0, 0, 0, 0);
        const daysUntilExpiry = Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

        let reminderType: string | null = null;
        if (daysUntilExpiry === 1) {
          reminderType = '1d';
        } else if (daysUntilExpiry === 3) {
          reminderType = '3d';
        } else if (daysUntilExpiry === 7) {
          reminderType = '7d';
        }

        if (!reminderType) continue;

        processed++;

        // 檢查是否已發送過
        const { data: existingLog } = await adminAuthClient
          .from('offer_notification_log')
          .select('id')
          .eq('source', 'discover_article')
          .eq('source_id', article.slug)
          .eq('expiry_date', article.end_date)
          .eq('reminder_type', reminderType)
          .single();

        if (existingLog) continue;

        // 發送給所有啟用通知的用戶
        const { data: tokens } = await adminAuthClient
          .from('user_push_tokens')
          .select('token');

        if (!tokens || tokens.length === 0) continue;

        const messages = tokens.map(t => ({
          to: t.token,
          sound: 'default',
          title: '📢 優惠即將結束',
          body: `${article.title} 將在 ${daysUntilExpiry} 天後結束，把握最後機會！`,
          data: { type: 'article_expiry', slug: article.slug },
        }));

        try {
          const response = await fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(messages),
          });

          if (response.ok) {
            sent += messages.length;

            await adminAuthClient
              .from('offer_notification_log')
              .insert({
                source: 'discover_article',
                source_id: article.slug,
                expiry_date: article.end_date,
                reminder_type: reminderType,
                recipients_count: messages.length,
              });
          }
        } catch (pushError) {
          console.error(`[AutoReminder] Push failed for article ${article.slug}:`, pushError);
        }
      }
    }

    return NextResponse.json({
      success: true,
      processed,
      sent,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Auto expiry reminders error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

