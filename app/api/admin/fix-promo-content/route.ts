import { NextRequest, NextResponse } from "next/server";
import { adminAuthClient } from "@/lib/supabase/admin-client";
import { PROMOS } from "@/lib/data/promos";

export const dynamic = 'force-dynamic';

// POST: 強制更新特定 promo 的 content
export async function POST(request: NextRequest) {
  try {
    const { id } = await request.json();
    
    if (!id) {
      return NextResponse.json({ error: 'id is required' }, { status: 400 });
    }
    
    // 從本地資料找到 promo
    const promo = PROMOS.find(p => p.id === id);
    if (!promo) {
      return NextResponse.json({ error: 'Promo not found in local data' }, { status: 404 });
    }
    
    if (!promo.content) {
      return NextResponse.json({ error: 'Promo has no content in local data' }, { status: 400 });
    }
    
    // 直接使用 UPDATE 而非 UPSERT
    const { data, error } = await adminAuthClient
      .from('promos')
      .update({ 
        content: promo.content,
        title: promo.title,
        description: promo.description,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select('id, content');
    
    if (error) {
      return NextResponse.json({ 
        error: error.message,
        details: error 
      }, { status: 500 });
    }
    
    return NextResponse.json({
      success: true,
      localContentLength: promo.content.length,
      savedContentLength: data?.[0]?.content?.length || 0,
      match: promo.content.length === (data?.[0]?.content?.length || 0)
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// GET: 檢查資料庫中的 promo 內容
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.searchParams.get('id');
  
  if (!id) {
    return NextResponse.json({ error: 'id is required' }, { status: 400 });
  }
  
  const { data, error } = await adminAuthClient
    .from('promos')
    .select('id, title, content')
    .eq('id', id)
    .single();
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  
  return NextResponse.json({
    id: data?.id,
    title: data?.title,
    hasContent: !!data?.content,
    contentLength: data?.content?.length || 0,
    contentPreview: data?.content?.substring(0, 200) || null
  });
}

