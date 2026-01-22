import { NextRequest, NextResponse } from 'next/server';
import { adminAuthClient } from '@/lib/supabase/admin-client';

// 敏感詞列表（可擴展）
const SENSITIVE_WORDS = ['廣告', '騙子', '詐騙'];

function filterContent(content: string): string {
  let filtered = content;
  SENSITIVE_WORDS.forEach(word => {
    filtered = filtered.replace(new RegExp(word, 'gi'), '***');
  });
  return filtered;
}

// 獲取用戶資料的輔助函數
async function getUserProfiles(supabase: any, userIds: string[]) {
  if (!userIds.length) return new Map();
  
  const uniqueIds = [...new Set(userIds)];
  const { data: profiles } = await supabase
    .from('profiles')
    .select('id, name, avatar_url')
    .in('id', uniqueIds);
  
  const profileMap = new Map();
  if (profiles) {
    profiles.forEach((p: any) => profileMap.set(p.id, p));
  }
  return profileMap;
}

// GET: 獲取留言列表
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const contentType = searchParams.get('contentType'); // 'card' or 'article'
    const contentId = searchParams.get('contentId');
    const sort = searchParams.get('sort') || 'newest'; // newest, popular, likes
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const userId = searchParams.get('userId'); // 當前用戶，用於檢查是否已按讚

    if (!contentType || !contentId) {
      return NextResponse.json({ error: 'Missing contentType or contentId' }, { status: 400 });
    }

    const supabase = adminAuthClient;
    const offset = (page - 1) * limit;

    // 獲取留言（不使用 foreign key join）
    let query = supabase
      .from('comments')
      .select('*')
      .eq('content_type', contentType)
      .eq('content_id', contentId)
      .eq('is_hidden', false)
      .is('parent_id', null) // 只獲取一級留言
      .range(offset, offset + limit - 1);

    // 排序
    if (sort === 'popular') {
      query = query.order('likes_count', { ascending: false }).order('created_at', { ascending: false });
    } else if (sort === 'likes') {
      query = query.order('likes_count', { ascending: false });
    } else {
      query = query.order('created_at', { ascending: false });
    }

    const { data: comments, error } = await query;

    if (error) {
      console.error('Get comments error:', error);
      // 如果表不存在，返回空數組
      if (error.code === '42P01') {
        return NextResponse.json({ comments: [], total: 0, page, limit, hasMore: false });
      }
      throw error;
    }

    // 獲取回覆
    let replies: any[] = [];
    if (comments?.length) {
      const commentIds = comments.map(c => c.id);
      const { data: repliesData } = await supabase
        .from('comments')
        .select('*')
        .in('parent_id', commentIds)
        .eq('is_hidden', false)
        .order('created_at', { ascending: true });
      
      replies = repliesData || [];
    }

    // 獲取所有相關用戶的 profiles
    const allUserIds = [
      ...(comments?.map(c => c.user_id) || []),
      ...replies.map(r => r.user_id)
    ].filter(Boolean);
    
    const profileMap = await getUserProfiles(supabase, allUserIds);

    // 獲取總數
    const { count } = await supabase
      .from('comments')
      .select('*', { count: 'exact', head: true })
      .eq('content_type', contentType)
      .eq('content_id', contentId)
      .eq('is_hidden', false)
      .is('parent_id', null);

    // 如果有用戶ID，檢查哪些留言已按讚
    let userLikes: string[] = [];
    if (userId && comments?.length) {
      const allCommentIds = [
        ...(comments?.map(c => c.id) || []),
        ...replies.map(r => r.id)
      ];
      const { data: likes } = await supabase
        .from('comment_likes')
        .select('comment_id')
        .eq('user_id', userId)
        .in('comment_id', allCommentIds);
      
      userLikes = likes?.map(l => l.comment_id) || [];
    }

    // 組裝留言（添加用戶資料和回覆）
    const commentsWithData = comments?.map(comment => {
      const user = profileMap.get(comment.user_id);
      const commentReplies = replies
        .filter(r => r.parent_id === comment.id)
        .map(reply => ({
          ...reply,
          user: profileMap.get(reply.user_id) || { id: reply.user_id, name: '匿名用戶', avatar_url: null },
          isLiked: userLikes.includes(reply.id),
        }));

      return {
        ...comment,
        user: user || { id: comment.user_id, name: '匿名用戶', avatar_url: null },
        isLiked: userLikes.includes(comment.id),
        replies: commentReplies,
      };
    });

    return NextResponse.json({
      comments: commentsWithData || [],
      total: count || 0,
      page,
      limit,
      hasMore: (count || 0) > offset + limit,
    });
  } catch (error: any) {
    console.error('Get comments error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST: 發表留言
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, contentType, contentId, parentId, content } = body;

    if (!userId || !contentType || !contentId || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (content.length > 500) {
      return NextResponse.json({ error: '留言不能超過 500 字' }, { status: 400 });
    }

    const supabase = adminAuthClient;

    // 過濾敏感詞
    const filteredContent = filterContent(content.trim());

    // 如果是回覆，檢查父留言是否存在且層級
    if (parentId) {
      const { data: parentComment } = await supabase
        .from('comments')
        .select('id, parent_id')
        .eq('id', parentId)
        .single();

      if (!parentComment) {
        return NextResponse.json({ error: '回覆的留言不存在' }, { status: 400 });
      }

      // 限制只能回覆一級留言（不支援無限嵌套）
      if (parentComment.parent_id) {
        return NextResponse.json({ error: '不支援多層回覆' }, { status: 400 });
      }
    }

    // 先插入留言
    const { data: newComment, error: insertError } = await supabase
      .from('comments')
      .insert([{
        user_id: userId,
        content_type: contentType,
        content_id: contentId,
        parent_id: parentId || null,
        content: filteredContent,
      }])
      .select('*')
      .single();

    if (insertError) throw insertError;

    // 獲取用戶資料
    const { data: userProfile } = await supabase
      .from('profiles')
      .select('id, name, avatar_url')
      .eq('id', userId)
      .single();

    return NextResponse.json({
      ...newComment,
      user: userProfile || { id: userId, name: '匿名用戶', avatar_url: null },
    });
  } catch (error: any) {
    console.error('Create comment error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
