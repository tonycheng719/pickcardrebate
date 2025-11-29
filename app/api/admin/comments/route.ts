import { NextResponse } from 'next/server';
import { adminAuthClient } from '@/lib/supabase/admin-client';

export const dynamic = 'force-dynamic';

// GET: Fetch all comments for admin (including deleted)
export async function GET() {
  try {
    console.log('[Admin Comments API] Fetching all comments...');
    
    const { data, error } = await adminAuthClient
      .from('card_comments')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(500);

    if (error) {
      console.error('[Admin Comments API] Error:', error);
      // If table doesn't exist, return empty array
      if (error.code === '42P01') {
        console.log('[Admin Comments API] Table does not exist');
        return NextResponse.json([]);
      }
      throw error;
    }

    console.log('[Admin Comments API] Found', data?.length || 0, 'comments');
    return NextResponse.json(data || []);
  } catch (error: any) {
    console.error('[Admin Comments API] Error fetching comments:', error);
    return NextResponse.json([], { status: 200 });
  }
}

