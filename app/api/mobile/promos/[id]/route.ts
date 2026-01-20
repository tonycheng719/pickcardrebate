import { NextRequest, NextResponse } from "next/server";
import { adminAuthClient } from "@/lib/supabase/admin-client";

export const dynamic = 'force-dynamic';

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// 取得單篇文章詳情
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const { data, error } = await adminAuthClient
      .from('promos')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: "Article not found" }, { status: 404, headers: corsHeaders });
    }

    // Map to mobile-friendly format
    const promo = {
      id: data.id,
      title: data.title,
      description: data.description,
      content: data.content || '',
      merchant: data.merchant,
      imageUrl: data.image_url,
      expiryDate: data.expiry_date,
      tags: data.tags || [],
      isPinned: data.is_pinned || false,
      isNew: data.is_new || false,
      contentType: data.content_type || 'promo',
      url: data.url,
      faqs: data.faqs || [],
      seoTitle: data.seo_title,
      seoDescription: data.seo_description,
      relatedCardIds: data.related_card_ids || [],
      updatedAt: data.updated_at,
    };

    return NextResponse.json({ promo }, { headers: corsHeaders });
  } catch (error) {
    console.error("Error fetching promo:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500, headers: corsHeaders });
  }
}

