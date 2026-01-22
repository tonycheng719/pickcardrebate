import { NextRequest, NextResponse } from 'next/server';
import { adminAuthClient } from '@/lib/supabase/admin-client';
import { HK_CARDS } from '@/lib/data/cards';

// POST: 發送選定卡片的到期提醒
export async function POST(request: NextRequest) {
  try {
    const { cardIds } = await request.json();

    if (!cardIds || !Array.isArray(cardIds) || cardIds.length === 0) {
      return NextResponse.json({ error: '請提供卡片 ID' }, { status: 400 });
    }

    let sent = 0;
    let totalRecipients = 0;

    for (const cardId of cardIds) {
      const card = HK_CARDS.find(c => c.id === cardId);
      if (!card || !card.promoEndDate) continue;

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const endDate = new Date(card.promoEndDate);
      endDate.setHours(0, 0, 0, 0);
      const daysUntilExpiry = Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

      // 確定提醒類型
      let reminderType: string;
      if (daysUntilExpiry <= 1) {
        reminderType = '1d';
      } else if (daysUntilExpiry <= 3) {
        reminderType = '3d';
      } else if (daysUntilExpiry <= 7) {
        reminderType = '7d';
      } else {
        continue; // 超過 7 天不發送
      }

      // 檢查是否已發送過
      const { data: existingLog } = await adminAuthClient
        .from('offer_notification_log')
        .select('id')
        .eq('source', 'card_promo')
        .eq('source_id', cardId)
        .eq('expiry_date', card.promoEndDate)
        .eq('reminder_type', reminderType)
        .single();

      if (existingLog) {
        console.log(`[Reminder] Already sent ${reminderType} reminder for ${cardId}`);
        continue;
      }

      // 獲取持有此卡的用戶 push token
      const { data: userCards } = await adminAuthClient
        .from('user_wallets')
        .select('user_id')
        .contains('card_ids', [cardId]);

      if (!userCards || userCards.length === 0) {
        console.log(`[Reminder] No users have card ${cardId}`);
        continue;
      }

      const userIds = userCards.map(uc => uc.user_id);

      // 獲取這些用戶的 push token
      const { data: tokens } = await adminAuthClient
        .from('user_push_tokens')
        .select('token')
        .in('user_id', userIds);

      if (!tokens || tokens.length === 0) {
        console.log(`[Reminder] No push tokens for card ${cardId} users`);
        continue;
      }

      // 發送推送通知
      const title = '💳 優惠即將到期';
      const body = daysUntilExpiry <= 1
        ? `${card.name} 的 ${card.promoName || '優惠'} 明天就到期了！`
        : `${card.name} 的 ${card.promoName || '優惠'} 將在 ${daysUntilExpiry} 天後到期`;

      const messages = tokens.map(t => ({
        to: t.token,
        sound: 'default',
        title,
        body,
        data: { type: 'offer_expiry', cardId },
      }));

      // 使用 Expo Push API 發送
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
          console.log(`[Reminder] Sent ${messages.length} notifications for ${cardId}`);
          totalRecipients += messages.length;
          sent++;

          // 記錄已發送
          await adminAuthClient
            .from('offer_notification_log')
            .insert({
              source: 'card_promo',
              source_id: cardId,
              expiry_date: card.promoEndDate,
              reminder_type: reminderType,
              recipients_count: messages.length,
            });
        }
      } catch (pushError) {
        console.error(`[Reminder] Push failed for ${cardId}:`, pushError);
      }
    }

    return NextResponse.json({
      success: true,
      sent,
      recipients: totalRecipients,
    });
  } catch (error: any) {
    console.error('Send expiry reminder error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

