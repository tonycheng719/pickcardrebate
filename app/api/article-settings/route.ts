import { NextResponse } from 'next/server';
import { adminAuthClient } from '@/lib/supabase/admin-client';

interface ArticleSetting {
  article_id: string;
  cover_image_url: string | null;
  content_type: 'guide' | 'promo' | null;
  custom_tags: string[] | null;
  is_pinned: boolean | null;
  updated_at: string | null;
}

// GET: 公開 API - 獲取所有文章設定（封面、分類、標籤、置頂）
export async function GET() {
  try {
    const { data, error } = await adminAuthClient
      .from('article_settings')
      .select('article_id, cover_image_url, content_type, custom_tags, is_pinned, updated_at');

    if (error) {
      // 表不存在或欄位不存在時返回空物件
      if (error.code === '42P01' || error.code === '42703') {
        return NextResponse.json({ settings: {}, categories: {}, tags: {}, pinned: {} });
      }
      console.warn('Article settings query error:', error.message);
      return NextResponse.json({ settings: {}, categories: {}, tags: {}, pinned: {} });
    }

    // 轉換為多個格式
    const settings: Record<string, string> = {};         // articleId -> coverUrl
    const categories: Record<string, string> = {};       // articleId -> contentType
    const tags: Record<string, string[]> = {};           // articleId -> customTags
    const pinned: Record<string, boolean> = {};          // articleId -> isPinned
    
    (data || []).forEach((item: ArticleSetting) => {
      if (item.cover_image_url) {
        settings[item.article_id] = item.cover_image_url;
      }
      if (item.content_type) {
        categories[item.article_id] = item.content_type;
      }
      if (item.custom_tags && item.custom_tags.length > 0) {
        tags[item.article_id] = item.custom_tags;
      }
      // 注意：is_pinned 可以是 true 或 false，都要記錄
      if (item.is_pinned !== null && item.is_pinned !== undefined) {
        pinned[item.article_id] = item.is_pinned;
      }
    });

    return NextResponse.json({ settings, categories, tags, pinned });
  } catch (error: any) {
    return NextResponse.json({ settings: {}, categories: {}, tags: {}, pinned: {} });
  }
}

