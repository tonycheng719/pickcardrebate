import { NextRequest, NextResponse } from "next/server";
import { adminAuthClient } from "@/lib/supabase/admin-client";

export const dynamic = 'force-dynamic';

// CORS headers for mobile app
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// 公開 API - 供 Mobile App 取得優惠文章
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type'); // 'promo' | 'guide' | null (all)
    const limit = parseInt(searchParams.get('limit') || '50');
    const isPinned = searchParams.get('pinned') === 'true';

    let query = adminAuthClient
      .from('promos')
      .select('id, title, description, merchant, image_url, expiry_date, tags, is_pinned, is_new, content_type, updated_at')
      .order('is_pinned', { ascending: false })
      .order('updated_at', { ascending: false })
      .limit(limit);

    if (type) {
      query = query.eq('content_type', type);
    }

    if (isPinned) {
      query = query.eq('is_pinned', true);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching promos:", error);
      return NextResponse.json({ error: error.message }, { status: 500, headers: corsHeaders });
    }

    // Map to mobile-friendly format
    const promos = (data || []).map(p => ({
      id: p.id,
      title: p.title,
      description: p.description,
      merchant: p.merchant,
      imageUrl: p.image_url,
      expiryDate: p.expiry_date,
      tags: p.tags || [],
      isPinned: p.is_pinned || false,
      isNew: p.is_new || false,
      contentType: p.content_type || 'promo',
      updatedAt: p.updated_at,
    }));

    return NextResponse.json({ 
      promos,
      count: promos.length,
    }, { headers: corsHeaders });
  } catch (error) {
    console.error("Error fetching promos for mobile:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500, headers: corsHeaders });
  }
}

