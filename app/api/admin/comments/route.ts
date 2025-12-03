import { NextResponse } from 'next/server';
import { adminAuthClient } from '@/lib/supabase/admin-client';

export const dynamic = 'force-dynamic';

// GET: Fetch all comments for admin (including deleted)
// Supports both card_comments and promo_comments
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'card'; // 'card' or 'promo'
    
    const tableName = type === 'promo' ? 'promo_comments' : 'card_comments';
    console.log(`[Admin Comments API] Fetching ${type} comments from ${tableName}...`);
    
    const { data, error } = await adminAuthClient
      .from(tableName)
      .select('*')
      .order('created_at', { ascending: false })
      .limit(500);

    if (error) {
      console.error('[Admin Comments API] Error:', error);
      // If table doesn't exist, return empty array
      if (error.code === '42P01') {
        console.log(`[Admin Comments API] Table ${tableName} does not exist`);
        return NextResponse.json([]);
      }
      throw error;
    }

    console.log(`[Admin Comments API] Found ${data?.length || 0} ${type} comments`);
    return NextResponse.json(data || []);
  } catch (error: any) {
    console.error('[Admin Comments API] Error fetching comments:', error);
    return NextResponse.json([], { status: 200 });
  }
}

// DELETE: Delete a promo comment (admin only)
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const commentId = searchParams.get('id');
    const type = searchParams.get('type') || 'card'; // 'card' or 'promo'

    if (!commentId) {
      return NextResponse.json({ error: 'Missing comment ID' }, { status: 400 });
    }

    const tableName = type === 'promo' ? 'promo_comments' : 'card_comments';

    const { error } = await adminAuthClient
      .from(tableName)
      .update({ 
        is_deleted: true, 
        deleted_by: 'admin',
        deleted_at: new Date().toISOString()
      })
      .eq('id', commentId);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('[Admin Comments API] Error deleting comment:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

