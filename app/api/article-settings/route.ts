import { NextResponse } from 'next/server';
import { adminAuthClient } from '@/lib/supabase/admin';

// GET: 公開 API - 獲取所有文章自訂封面設定
export async function GET() {
  try {
    const { data, error } = await adminAuthClient
      .from('article_settings')
      .select('article_id, cover_image_url');

    if (error) {
      // 表不存在時返回空陣列
      if (error.code === '42P01') {
        return NextResponse.json({ settings: {} });
      }
      throw error;
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
    console.error('Error fetching article settings:', error);
    return NextResponse.json({ settings: {} });
  }
}

