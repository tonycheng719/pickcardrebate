import { NextResponse } from 'next/server';
import { adminAuthClient } from '@/lib/supabase/admin-client';

export const dynamic = 'force-dynamic';

// GET: Fetch all comments (for admin)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'all'; // 'card', 'article', 'all'
    const limit = parseInt(searchParams.get('limit') || '200');

    let comments: any[] = [];

    // Fetch card comments
    if (type === 'all' || type === 'card') {
      const { data: cardComments, error: cardError } = await adminAuthClient
        .from('card_comments')
        .select('*')
        .eq('is_deleted', false)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (!cardError && cardComments) {
        comments = comments.concat(
          cardComments.map((c) => ({
            ...c,
            type: 'card',
            target_id: c.card_id,
          }))
        );
      }
    }

    // Fetch article comments
    if (type === 'all' || type === 'article') {
      const { data: articleComments, error: articleError } = await adminAuthClient
        .from('article_comments')
        .select('*')
        .eq('is_deleted', false)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (!articleError && articleComments) {
        comments = comments.concat(
          articleComments.map((c) => ({
            ...c,
            type: 'article',
            target_id: c.article_id,
          }))
        );
      }
    }

    // Sort by date
    comments.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    return NextResponse.json({ 
      comments,
      totalCount: comments.length
    });
  } catch (error: any) {
    console.error('Error fetching admin comments:', error);
    return NextResponse.json({ comments: [], error: error.message }, { status: 500 });
  }
}
