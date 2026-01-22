import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

function getServiceClient() {
  return createClient(supabaseUrl, supabaseServiceKey);
}

// GET: 獲取所有留言（後台用）- 同時獲取新舊兩個留言系統的數據
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const contentType = searchParams.get('contentType'); // 'card', 'article', or null for all
    const status = searchParams.get('status'); // 'visible', 'hidden', 'all'
    const source = searchParams.get('source'); // 'new', 'legacy', or null for both

    const supabase = getServiceClient();
    let allComments: any[] = [];

    // 1. 獲取新系統的留言 (comments 表)
    if (source !== 'legacy') {
      try {
        let query = supabase
          .from('comments')
          .select(`
            *,
            user:profiles!comments_user_id_fkey(id, name, email, avatar_url)
          `)
          .order('created_at', { ascending: false })
          .limit(100);

        if (contentType) {
          query = query.eq('content_type', contentType);
        }

        if (status === 'visible') {
          query = query.eq('is_hidden', false);
        } else if (status === 'hidden') {
          query = query.eq('is_hidden', true);
        }

        const { data: newComments, error } = await query;

        if (!error && newComments) {
          // 標記來源
          allComments = newComments.map(c => ({
            ...c,
            source: 'new',
            is_hidden: c.is_hidden || false,
          }));
        }
      } catch (e) {
        console.warn('Failed to fetch from comments table:', e);
      }
    }

    // 2. 獲取舊系統的文章留言 (article_comments 表)
    if (source !== 'new' && (!contentType || contentType === 'article')) {
      try {
        let legacyQuery = supabase
          .from('article_comments')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(100);

        if (status === 'visible') {
          legacyQuery = legacyQuery.eq('is_deleted', false);
        } else if (status === 'hidden') {
          legacyQuery = legacyQuery.eq('is_deleted', true);
        }

        const { data: legacyArticleComments, error } = await legacyQuery;

        console.log('[Admin Comments] article_comments query result:', { 
          count: legacyArticleComments?.length || 0, 
          error: error?.message,
          status 
        });

        if (error) {
          console.error('[Admin Comments] article_comments error:', error);
        }

        if (!error && legacyArticleComments) {
          // 轉換為統一格式
          const convertedComments = legacyArticleComments.map(c => ({
            id: c.id,
            content_type: 'article',
            content_id: c.article_id,
            user_id: c.user_id,
            user_name: c.user_name,
            user_avatar: c.user_avatar,
            content: c.content,
            is_hidden: c.is_deleted || false,
            is_pinned: false,
            likes_count: 0,
            created_at: c.created_at,
            source: 'legacy_article',
            rating: c.rating,
          }));
          allComments = [...allComments, ...convertedComments];
        }
      } catch (e) {
        console.error('[Admin Comments] Failed to fetch from article_comments table:', e);
      }
    }

    // 3. 獲取舊系統的信用卡留言 (card_comments 表) - 如果存在
    if (source !== 'new' && (!contentType || contentType === 'card')) {
      try {
        let cardQuery = supabase
          .from('card_comments')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(100);

        if (status === 'visible') {
          cardQuery = cardQuery.eq('is_deleted', false);
        } else if (status === 'hidden') {
          cardQuery = cardQuery.eq('is_deleted', true);
        }

        const { data: legacyCardComments, error } = await cardQuery;

        if (!error && legacyCardComments) {
          const convertedCardComments = legacyCardComments.map(c => ({
            id: c.id,
            content_type: 'card',
            content_id: c.card_id,
            user_id: c.user_id,
            user_name: c.user_name,
            user_avatar: c.user_avatar,
            content: c.content,
            is_hidden: c.is_deleted || false,
            is_pinned: false,
            likes_count: 0,
            created_at: c.created_at,
            source: 'legacy_card',
            rating: c.rating,
          }));
          allComments = [...allComments, ...convertedCardComments];
        }
      } catch (e) {
        // card_comments 表可能不存在，忽略錯誤
      }
    }

    // 4. 獲取舊系統的優惠活動留言 (promo_comments 表) - 如果存在
    if (source !== 'new' && (!contentType || contentType === 'promo')) {
      try {
        let promoQuery = supabase
          .from('promo_comments')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(100);

        if (status === 'visible') {
          promoQuery = promoQuery.eq('is_deleted', false);
        } else if (status === 'hidden') {
          promoQuery = promoQuery.eq('is_deleted', true);
        }

        const { data: legacyPromoComments, error } = await promoQuery;

        if (!error && legacyPromoComments) {
          const convertedPromoComments = legacyPromoComments.map(c => ({
            id: c.id,
            content_type: 'promo',
            content_id: c.promo_id,
            user_id: c.user_id,
            user_name: c.user_name,
            user_avatar: c.user_avatar,
            content: c.content,
            is_hidden: c.is_deleted || false,
            is_pinned: false,
            likes_count: 0,
            created_at: c.created_at,
            source: 'legacy_promo',
            rating: c.rating,
          }));
          allComments = [...allComments, ...convertedPromoComments];
        }
      } catch (e) {
        // promo_comments 表可能不存在，忽略錯誤
      }
    }

    // 按時間排序
    allComments.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    return NextResponse.json({
      comments: allComments,
      total: allComments.length,
    });
  } catch (error: any) {
    console.error('Admin get comments error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PATCH: 更新留言（隱藏/置頂）- 支援新舊兩個系統
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, is_hidden, is_pinned, source } = body;

    if (!id) {
      return NextResponse.json({ error: 'Missing comment id' }, { status: 400 });
    }

    const supabase = getServiceClient();

    // 根據來源選擇表
    if (source === 'legacy_article') {
      // 舊系統文章留言用 is_deleted 欄位
      const { data, error } = await supabase
        .from('article_comments')
        .update({ 
          is_deleted: is_hidden,
          deleted_by: is_hidden ? 'admin' : null,
          deleted_at: is_hidden ? new Date().toISOString() : null
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return NextResponse.json(data);
    } else if (source === 'legacy_card') {
      // 舊系統信用卡留言
      const { data, error } = await supabase
        .from('card_comments')
        .update({ 
          is_deleted: is_hidden,
          deleted_by: is_hidden ? 'admin' : null,
          deleted_at: is_hidden ? new Date().toISOString() : null
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return NextResponse.json(data);
    } else if (source === 'legacy_promo') {
      // 舊系統優惠活動留言
      const { data, error } = await supabase
        .from('promo_comments')
        .update({ 
          is_deleted: is_hidden,
          deleted_by: is_hidden ? 'admin' : null,
          deleted_at: is_hidden ? new Date().toISOString() : null
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return NextResponse.json(data);
    } else {
      // 新系統
      const updateData: any = {};
      if (typeof is_hidden === 'boolean') updateData.is_hidden = is_hidden;
      if (typeof is_pinned === 'boolean') updateData.is_pinned = is_pinned;

      const { data, error } = await supabase
        .from('comments')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return NextResponse.json(data);
    }
  } catch (error: any) {
    console.error('Admin update comment error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE: 刪除留言 - 支援新舊兩個系統
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const source = searchParams.get('source'); // 'new', 'legacy_article', 'legacy_card'

    if (!id) {
      return NextResponse.json({ error: 'Missing comment id' }, { status: 400 });
    }

    const supabase = getServiceClient();

    if (source === 'legacy_article') {
      // 舊系統文章留言 - 軟刪除
      const { error } = await supabase
        .from('article_comments')
        .update({ 
          is_deleted: true, 
          deleted_by: 'admin',
          deleted_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;
    } else if (source === 'legacy_card') {
      // 舊系統信用卡留言 - 軟刪除
      const { error } = await supabase
        .from('card_comments')
        .update({ 
          is_deleted: true, 
          deleted_by: 'admin',
          deleted_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;
    } else if (source === 'legacy_promo') {
      // 舊系統優惠活動留言 - 軟刪除
      const { error } = await supabase
        .from('promo_comments')
        .update({ 
          is_deleted: true, 
          deleted_by: 'admin',
          deleted_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;
    } else {
      // 新系統 - 永久刪除
      const { error } = await supabase
        .from('comments')
        .delete()
        .eq('id', id);

      if (error) throw error;
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Admin delete comment error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
