import { NextResponse } from 'next/server';
import { adminAuthClient } from '@/lib/supabase/admin';

// GET: 獲取所有文章設定 (封面圖片覆蓋)
export async function GET() {
  try {
    const { data, error } = await adminAuthClient
      .from('article_settings')
      .select('*');

    if (error) {
      // 表不存在時返回空陣列
      if (error.code === '42P01') {
        return NextResponse.json({ settings: [] });
      }
      throw error;
    }

    return NextResponse.json({ settings: data || [] });
  } catch (error: any) {
    console.error('Error fetching article settings:', error);
    return NextResponse.json({ settings: [] });
  }
}

// POST: 更新文章封面圖片
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { articleId, coverImageUrl } = body;

    if (!articleId) {
      return NextResponse.json({ error: 'Missing articleId' }, { status: 400 });
    }

    // 先檢查是否已有設定
    const { data: existing } = await adminAuthClient
      .from('article_settings')
      .select('id')
      .eq('article_id', articleId)
      .single();

    if (existing) {
      // 更新現有設定
      const { error } = await adminAuthClient
        .from('article_settings')
        .update({
          cover_image_url: coverImageUrl || null,
          updated_at: new Date().toISOString()
        })
        .eq('id', existing.id);

      if (error) throw error;
    } else {
      // 新增設定
      const { error } = await adminAuthClient
        .from('article_settings')
        .insert({
          article_id: articleId,
          cover_image_url: coverImageUrl || null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });

      if (error) {
        if (error.code === '42P01') {
          return NextResponse.json({ 
            error: 'Table not created yet. Please run the SQL script first.',
            sqlRequired: true
          }, { status: 400 });
        }
        throw error;
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error updating article settings:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE: 刪除文章封面覆蓋 (恢復預設)
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const articleId = searchParams.get('articleId');

    if (!articleId) {
      return NextResponse.json({ error: 'Missing articleId' }, { status: 400 });
    }

    const { error } = await adminAuthClient
      .from('article_settings')
      .delete()
      .eq('article_id', articleId);

    if (error && error.code !== '42P01') throw error;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting article settings:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

