import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

function getServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false }
  });
}

interface ExpoPushMessage {
  to: string;
  sound?: 'default' | null;
  title?: string;
  body?: string;
  data?: Record<string, any>;
}

async function sendExpoPushNotifications(messages: ExpoPushMessage[]) {
  if (messages.length === 0) return { data: [] };
  
  const response = await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(messages),
  });

  return await response.json();
}

// Cron: 檢查新文章並發送通知
// 每小時運行一次，檢查過去 1 小時內發布的新文章
export async function GET() {
  try {
    const supabase = getServiceClient();
    if (!supabase) {
      return NextResponse.json({ error: 'Server config error' }, { status: 500 });
    }

    // 查找過去 1 小時內創建的新文章
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    
    const { data: newPromos, error: promosError } = await supabase
      .from('promos')
      .select('id, title, slug')
      .gte('created_at', oneHourAgo)
      .eq('is_deleted', false)
      .order('created_at', { ascending: false })
      .limit(5);

    if (promosError) throw promosError;

    if (!newPromos || newPromos.length === 0) {
      return NextResponse.json({ 
        success: true, 
        message: 'No new articles in the past hour',
        checked: true,
      });
    }

    // 獲取所有 push tokens
    const { data: tokens, error: tokensError } = await supabase
      .from('user_push_tokens')
      .select('token');

    if (tokensError) throw tokensError;

    if (!tokens || tokens.length === 0) {
      return NextResponse.json({ 
        success: true, 
        message: 'No push tokens registered',
        newArticles: newPromos.length,
      });
    }

    // 為每篇新文章發送通知
    let totalSent = 0;
    
    for (const promo of newPromos) {
      const messages: ExpoPushMessage[] = tokens
        .filter(t => t.token && t.token.startsWith('ExponentPushToken'))
        .map(t => ({
          to: t.token,
          sound: 'default',
          title: '📰 新文章發布',
          body: promo.title,
          data: { 
            type: 'new_article',
            articleId: promo.id,
            slug: promo.slug,
          },
        }));

      if (messages.length > 0) {
        // 分批發送
        const batchSize = 100;
        for (let i = 0; i < messages.length; i += batchSize) {
          const batch = messages.slice(i, i + batchSize);
          await sendExpoPushNotifications(batch);
        }
        totalSent += messages.length;
      }

      // 記錄發送歷史
      await supabase.from('notification_history').insert({
        title: '📰 新文章發布',
        body: promo.title,
        data: { type: 'new_article', articleId: promo.id },
        sent_count: messages.length,
        target_type: 'all',
        trigger_type: 'cron_new_article',
        created_at: new Date().toISOString(),
      });
    }

    return NextResponse.json({ 
      success: true, 
      newArticles: newPromos.length,
      notificationsSent: totalSent,
    });
  } catch (e: any) {
    console.error('New article notification cron error:', e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

