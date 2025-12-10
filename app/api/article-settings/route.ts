import { NextResponse } from 'next/server';
import { adminAuthClient } from '@/lib/supabase/admin-client';

// GET: 公開 API - 獲取所有文章自訂封面設定
export async function GET() {
  try {
    const { data, error } = await adminAuthClient
      .from('article_settings')
      .select('article_id, cover_image_url');

    if (error) {
      // 表不存在或欄位不存在時返回空陣列
      // 42P01 = table doesn't exist, 42703 = column doesn't exist
      if (error.code === '42P01' || error.code === '42703') {
        // Silently return empty - this is expected if table/column doesn't exist
        return NextResponse.json({ settings: {} });
      }
      // Log other errors but still return empty to prevent breaking the app
      console.warn('Article settings query error:', error.message);
      return NextResponse.json({ settings: {} });
    }

    // 轉換為 { articleId: coverUrl } 格式
    const settings: Record<string, string> = {};
    (data || []).forEach((item: { article_id: string; cover_image_url: string | null }) => {
      if (item.cover_image_url) {
        settings[item.article_id] = item.cover_image_url;
      }
    });

    return NextResponse.json({ settings });
  } catch (error: any) {
    // Silently handle errors - article settings is optional feature
    return NextResponse.json({ settings: {} });
  }
}

