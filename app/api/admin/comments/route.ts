import { NextResponse } from 'next/server';
import { adminAuthClient } from '@/lib/supabase/admin-client';

export const dynamic = 'force-dynamic';

// GET: Fetch all comments for admin (including deleted)
export async function GET() {
  try {
    const { data, error } = await adminAuthClient
      .from('card_comments')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(500);

    if (error) {
      // If table doesn't exist, return empty array
      if (error.code === '42P01') {
        return NextResponse.json([]);
      }
      throw error;
    }

    return NextResponse.json(data || []);
  } catch (error: any) {
    console.error('Error fetching comments for admin:', error);
    return NextResponse.json([], { status: 200 });
  }
}

