import { NextRequest, NextResponse } from 'next/server';
import { adminAuthClient } from '@/lib/supabase/admin-client';
import { PROMOS } from '@/lib/data/promos';
import { Locale } from '@/lib/i18n/config';
import { getLocalizedPromo } from '@/lib/i18n/content';
import type { Promo } from '@/lib/types';

export const dynamic = 'force-dynamic';

function mapPromoFromDB(data: any): Promo {
  return {
    id: data.id,
    title: data.title,
    merchant: data.merchant,
    description: data.description,
    content: data.content,
    imageUrl: data.image_url,
    expiryDate: data.expiry_date,
    relatedCardIds: data.related_card_ids || [],
    tags: data.tags || [],
    url: data.url,
    updatedAt: data.updated_at,
    sortOrder: data.sort_order,
    isPinned: data.is_pinned,
    faqs: data.faqs,
    seoTitle: data.seo_title,
    seoDescription: data.seo_description,
    // Multi-lang fields
    title_en: data.title_en,
    title_zh_cn: data.title_zh_cn,
    description_en: data.description_en,
    description_zh_cn: data.description_zh_cn,
    content_en: data.content_en,
    content_zh_cn: data.content_zh_cn,
    merchant_en: data.merchant_en,
    merchant_zh_cn: data.merchant_zh_cn,
    tags_en: data.tags_en,
    tags_zh_cn: data.tags_zh_cn,
    seoTitle_en: data.seo_title_en,
    seoTitle_zh_cn: data.seo_title_zh_cn,
    seoDescription_en: data.seo_description_en,
    seoDescription_zh_cn: data.seo_description_zh_cn,
    faqs_en: data.faqs_en,
    faqs_zh_cn: data.faqs_zh_cn,
    languagesCompleted: data.languages_completed,
  };
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const locale = (request.nextUrl.searchParams.get('locale') || 'zh-HK') as Locale;
  
  try {
    // Try database first
    const supabase = adminAuthClient;
    const { data, error } = await supabase
      .from("promos")
      .select("*")
      .eq("id", id)
      .single();

    if (data) {
      const promo = mapPromoFromDB(data);
      const localizedPromo = getLocalizedPromo(promo, locale);
      return NextResponse.json({ promo: localizedPromo });
    }
  } catch (e) {
    console.error("[Promo API] Error:", e);
  }

  // Fallback to static data
  const staticPromo = PROMOS.find(p => p.id === id);
  if (staticPromo) {
    return NextResponse.json({ promo: staticPromo });
  }

  return NextResponse.json({ error: 'Promo not found' }, { status: 404 });
}

