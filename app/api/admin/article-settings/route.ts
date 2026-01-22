import { NextResponse } from 'next/server';
import { adminAuthClient } from '@/lib/supabase/admin-client';

// GET: 獲取所有文章設定 (封面圖片覆蓋)
export async function GET() {
  try {
    const { data, error } = await adminAuthClient
      .from('article_settings')
      .select('*');

    if (error) {
      // 表不存在或欄位不存在時返回空陣列
      // 42P01 = table doesn't exist, 42703 = column doesn't exist
      if (error.code === '42P01' || error.code === '42703') {
        return NextResponse.json({ settings: [] });
      }
      console.warn('Article settings query error:', error.message);
      return NextResponse.json({ settings: [] });
    }

    return NextResponse.json({ settings: data || [] });
  } catch (error: any) {
    // Silently handle errors - article settings is optional feature
    return NextResponse.json({ settings: [] });
  }
}

// POST: 更新文章設定（封面圖片、分類、標籤、置頂、置頂到期日）
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { articleId, coverImageUrl, contentType, customTags, isPinned, pinnedUntil } = body;

    console.log('POST /api/admin/article-settings:', { articleId, contentType, customTags, isPinned, pinnedUntil });

    if (!articleId) {
      return NextResponse.json({ error: 'Missing articleId' }, { status: 400 });
    }

    // 先檢查是否已有設定
    const { data: existing, error: selectError } = await adminAuthClient
      .from('article_settings')
      .select('id')
      .eq('article_id', articleId)
      .single();

    // 處理表不存在的情況
    if (selectError && selectError.code === '42P01') {
      return NextResponse.json({ 
        error: 'Table article_settings not found. Please run the SQL script first.',
        sqlRequired: true
      }, { status: 400 });
    }

    // 處理欄位不存在的情況
    if (selectError && selectError.code === '42703') {
      return NextResponse.json({ 
        error: 'Some columns are missing. Please run: ALTER TABLE article_settings ADD COLUMN IF NOT EXISTS content_type TEXT; ALTER TABLE article_settings ADD COLUMN IF NOT EXISTS custom_tags TEXT[]; ALTER TABLE article_settings ADD COLUMN IF NOT EXISTS is_pinned BOOLEAN DEFAULT FALSE;',
        sqlRequired: true
      }, { status: 400 });
    }

    if (existing) {
      // 更新現有設定
      const updateData: Record<string, any> = {
        updated_at: new Date().toISOString()
      };
      
      if (coverImageUrl !== undefined) {
        updateData.cover_image_url = coverImageUrl || null;
      }
      if (contentType !== undefined) {
        updateData.content_type = contentType || null;
      }
      if (customTags !== undefined) {
        updateData.custom_tags = customTags && customTags.length > 0 ? customTags : null;
      }
      if (isPinned !== undefined) {
        updateData.is_pinned = isPinned || false;
      }
      if (pinnedUntil !== undefined) {
        updateData.pinned_until = pinnedUntil || null;
      }

      const { error } = await adminAuthClient
        .from('article_settings')
        .update(updateData)
        .eq('id', existing.id);

      if (error) {
        console.error('Update error:', error);
        if (error.code === '42703') {
          return NextResponse.json({ 
            error: `Column missing: ${error.message}. Please run the ALTER TABLE statements.`,
            sqlRequired: true
          }, { status: 400 });
        }
        throw error;
      }
    } else {
      // 新增設定
      const { error } = await adminAuthClient
        .from('article_settings')
        .insert({
          article_id: articleId,
          cover_image_url: coverImageUrl || null,
          content_type: contentType || null,
          custom_tags: customTags && customTags.length > 0 ? customTags : null,
          is_pinned: isPinned || false,
          pinned_until: pinnedUntil || null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });

      if (error) {
        console.error('Insert error:', error);
        if (error.code === '42P01') {
          return NextResponse.json({ 
            error: 'Table not created yet. Please run the SQL script first.',
            sqlRequired: true
          }, { status: 400 });
        }
        if (error.code === '42703') {
          return NextResponse.json({ 
            error: `Column missing: ${error.message}. Please run the ALTER TABLE statements.`,
            sqlRequired: true
          }, { status: 400 });
        }
        throw error;
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error updating article settings:', error);
    return NextResponse.json({ 
      error: error.message || 'Unknown error',
      details: error.code || 'N/A'
    }, { status: 500 });
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

