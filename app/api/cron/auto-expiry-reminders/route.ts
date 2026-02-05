import { NextRequest, NextResponse } from 'next/server';
import { adminAuthClient } from '@/lib/supabase/admin-client';
import { HK_CARDS } from '@/lib/data/cards';

// GET: 自動檢查並發送所有到期提醒
// 建議設定 Vercel Cron Job 每日執行一次
// 已優化：使用批量查詢減少資料庫連接
export async function GET() {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let processed = 0;
    let sent = 0;

    // 1. 預先篩選需要處理的卡片（在記憶體中處理，不需 DB）
    const cardsToProcess: { card: typeof HK_CARDS[0]; reminderType: string; daysUntilExpiry: number }[] = [];
    
    for (const card of HK_CARDS) {
      if (!card.promoEndDate) continue;

      const endDate = new Date(card.promoEndDate);
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

      if (reminderType) {
        cardsToProcess.push({ card, reminderType, daysUntilExpiry });
      }
    }

    // 如果沒有需要處理的卡片，直接返回
    if (cardsToProcess.length === 0) {
      console.log('[AutoReminder] No cards need reminders today');
    } else {
      // 2. 批量查詢已發送的通知記錄
      const cardIds = cardsToProcess.map(c => c.card.id);
      const { data: existingLogs } = await adminAuthClient
        .from('offer_notification_log')
        .select('source_id, reminder_type, expiry_date')
        .eq('source', 'card_promo')
        .in('source_id', cardIds);

      const sentSet = new Set(
        (existingLogs || []).map(log => `${log.source_id}:${log.reminder_type}:${log.expiry_date}`)
      );

      // 3. 篩選未發送過的卡片
      const cardsNeedingSend = cardsToProcess.filter(({ card, reminderType }) => 
        !sentSet.has(`${card.id}:${reminderType}:${card.promoEndDate}`)
      );

      if (cardsNeedingSend.length === 0) {
        console.log('[AutoReminder] All card reminders already sent');
      } else {
        // 4. 批量獲取所有 push tokens（一次查詢）
        const { data: allTokens } = await adminAuthClient
          .from('user_push_tokens')
          .select('user_id, token');

        const validTokens = (allTokens || []).filter(t => t.token?.startsWith('ExponentPushToken'));

        if (validTokens.length > 0) {
          // 5. 批量獲取用戶錢包資訊
          const { data: allWallets } = await adminAuthClient
            .from('user_wallets')
            .select('user_id, card_ids');

          const userCardMap = new Map<string, string[]>();
          for (const wallet of allWallets || []) {
            userCardMap.set(wallet.user_id, wallet.card_ids || []);
          }

          const tokenMap = new Map<string, string>();
          for (const t of validTokens) {
            tokenMap.set(t.user_id, t.token);
          }

          // 6. 處理每張卡片
          for (const { card, reminderType, daysUntilExpiry } of cardsNeedingSend) {
            processed++;

            // 找出持有此卡的用戶
            const usersWithCard: string[] = [];
            for (const [userId, cardIds] of userCardMap) {
              if (cardIds.includes(card.id)) {
                usersWithCard.push(userId);
              }
            }

            if (usersWithCard.length === 0) continue;

            // 獲取這些用戶的 tokens
            const tokensToSend = usersWithCard
              .map(uid => tokenMap.get(uid))
              .filter((t): t is string => !!t);

            if (tokensToSend.length === 0) continue;

            const title = '💳 優惠即將到期';
            const body = daysUntilExpiry === 1
              ? `${card.name} 的 ${card.promoName || '優惠'} 明天就到期了！`
              : `${card.name} 的 ${card.promoName || '優惠'} 將在 ${daysUntilExpiry} 天後到期`;

            const messages = tokensToSend.map(token => ({
              to: token,
              sound: 'default' as const,
              title,
              body,
              data: { type: 'offer_expiry', cardId: card.id },
            }));

            try {
              const response = await fetch('https://exp.host/--/api/v2/push/send', {
                method: 'POST',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify(messages),
              });

              if (response.ok) {
                sent += messages.length;
                await adminAuthClient.from('offer_notification_log').insert({
                  source: 'card_promo',
                  source_id: card.id,
                  expiry_date: card.promoEndDate,
                  reminder_type: reminderType,
                  recipients_count: messages.length,
                });
                console.log(`[AutoReminder] Sent ${reminderType} for ${card.id} to ${messages.length} users`);
              }
            } catch (pushError) {
              console.error(`[AutoReminder] Push failed for ${card.id}:`, pushError);
            }
          }
        }
      }
    }

    // 7. 檢查探索文章到期（優化：限制查詢範圍）
    const in7Days = new Date(today);
    in7Days.setDate(in7Days.getDate() + 7);
    
    const { data: articles } = await adminAuthClient
      .from('discover_articles')
      .select('id, slug, title, end_date')
      .not('end_date', 'is', null)
      .gte('end_date', today.toISOString().split('T')[0])
      .lte('end_date', in7Days.toISOString().split('T')[0])
      .limit(50);

    if (articles && articles.length > 0) {
      // 批量查詢已發送記錄
      const slugs = articles.map(a => a.slug);
      const { data: existingArticleLogs } = await adminAuthClient
        .from('offer_notification_log')
        .select('source_id, reminder_type, expiry_date')
        .eq('source', 'discover_article')
        .in('source_id', slugs);

      const articleSentSet = new Set(
        (existingArticleLogs || []).map(log => `${log.source_id}:${log.reminder_type}:${log.expiry_date}`)
      );

      // 批量獲取 tokens（一次查詢）
      const { data: tokens } = await adminAuthClient.from('user_push_tokens').select('token');
      const validArticleTokens = (tokens || []).filter(t => t.token?.startsWith('ExponentPushToken'));

      if (validArticleTokens.length > 0) {
        for (const article of articles) {
          if (!article.end_date) continue;

          const endDate = new Date(article.end_date);
          endDate.setHours(0, 0, 0, 0);
          const daysUntilExpiry = Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

          let reminderType: string | null = null;
          if (daysUntilExpiry === 1) reminderType = '1d';
          else if (daysUntilExpiry === 3) reminderType = '3d';
          else if (daysUntilExpiry === 7) reminderType = '7d';

          if (!reminderType) continue;
          if (articleSentSet.has(`${article.slug}:${reminderType}:${article.end_date}`)) continue;

          processed++;

          const messages = validArticleTokens.map(t => ({
            to: t.token,
            sound: 'default' as const,
            title: '📢 優惠即將結束',
            body: `${article.title} 將在 ${daysUntilExpiry} 天後結束，把握最後機會！`,
            data: { type: 'article_expiry', slug: article.slug },
          }));

          try {
            const response = await fetch('https://exp.host/--/api/v2/push/send', {
              method: 'POST',
              headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
              body: JSON.stringify(messages),
            });

            if (response.ok) {
              sent += messages.length;
              await adminAuthClient.from('offer_notification_log').insert({
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

