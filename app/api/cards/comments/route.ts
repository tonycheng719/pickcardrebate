import { NextResponse } from 'next/server';
import { adminAuthClient } from '@/lib/supabase/admin-client';

export const dynamic = 'force-dynamic';

// GET: Fetch comments for a card
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const cardId = searchParams.get('cardId');
    const limit = parseInt(searchParams.get('limit') || '50');

    if (!cardId) {
      return NextResponse.json({ error: 'Missing cardId' }, { status: 400 });
    }

    const { data, error } = await adminAuthClient
      .from('card_comments')
      .select('*')
      .eq('card_id', cardId)
      .eq('is_deleted', false)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      // If table doesn't exist, return empty array
      if (error.code === '42P01') {
        return NextResponse.json({ comments: [], avgRating: 0, totalCount: 0 });
      }
      throw error;
    }

    // Calculate average rating
    const ratings = (data || []).filter(c => c.rating).map(c => c.rating);
    const avgRating = ratings.length > 0 
      ? Math.round((ratings.reduce((a, b) => a + b, 0) / ratings.length) * 10) / 10 
      : 0;

    return NextResponse.json({ 
      comments: data || [], 
      avgRating,
      totalCount: data?.length || 0
    });
  } catch (error: any) {
    console.error('Error fetching comments:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST: Create a new comment
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { cardId, userId, userName, userAvatar, content, rating } = body;

    if (!cardId || !userId || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Check if user is banned from commenting
    const { data: profile } = await adminAuthClient
      .from('profiles')
      .select('is_banned_comment')
      .eq('id', userId)
      .single();

    if (profile?.is_banned_comment) {
      return NextResponse.json({ 
        error: '您已被禁止發表評論，如有疑問請聯繫客服。' 
      }, { status: 403 });
    }

    // Check rate limit (24 hours between comments on same card)
    const { data: recentComment } = await adminAuthClient
      .from('card_comments')
      .select('created_at')
      .eq('user_id', userId)
      .eq('card_id', cardId)
      .eq('is_deleted', false)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (recentComment) {
      const lastCommentTime = new Date(recentComment.created_at);
      const hoursSinceLastComment = (Date.now() - lastCommentTime.getTime()) / (1000 * 60 * 60);
      
      if (hoursSinceLastComment < 24) {
        const hoursRemaining = Math.ceil(24 - hoursSinceLastComment);
        return NextResponse.json({ 
          error: `您已在 24 小時內評論過此信用卡，請 ${hoursRemaining} 小時後再試。` 
        }, { status: 429 });
      }
    }

    // Insert comment
    const { data, error } = await adminAuthClient
      .from('card_comments')
      .insert({
        card_id: cardId,
        user_id: userId,
        user_name: userName || 'Anonymous',
        user_avatar: userAvatar,
        content: content.trim(),
        rating: rating || null,
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, comment: data });
  } catch (error: any) {
    console.error('Error creating comment:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE: Soft delete a comment (user or admin)
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const commentId = searchParams.get('id');
    const userId = searchParams.get('userId');
    const isAdmin = searchParams.get('isAdmin') === 'true';

    if (!commentId) {
      return NextResponse.json({ error: 'Missing comment ID' }, { status: 400 });
    }

    // Verify ownership if not admin
    if (!isAdmin && userId) {
      const { data: comment } = await adminAuthClient
        .from('card_comments')
        .select('user_id')
        .eq('id', commentId)
        .single();

      if (comment?.user_id !== userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
      }
    }

    const { error } = await adminAuthClient
      .from('card_comments')
      .update({ 
        is_deleted: true, 
        deleted_by: isAdmin ? 'admin' : 'user',
        deleted_at: new Date().toISOString()
      })
      .eq('id', commentId);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting comment:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

