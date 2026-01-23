import { NextResponse } from "next/server";
import { adminAuthClient } from "@/lib/supabase/admin-client";
import { PROMOS } from "@/lib/data/promos";
import { GUIDES } from "@/lib/data/guides";

export const dynamic = 'force-dynamic';
export const maxDuration = 60; // 允許更長的執行時間

// POST: 同步本地 PROMOS 和 GUIDES 到資料庫
export async function POST() {
  try {
    const results = {
      promos: { success: 0, failed: 0, errors: [] as string[] },
      guides: { success: 0, failed: 0, errors: [] as string[] },
    };

    // 1. 同步 PROMOS
    for (const promo of PROMOS) {
      const record = {
        id: promo.id,
        title: promo.title,
        description: promo.description,
        merchant: promo.merchant,
        tags: promo.tags,
        image_url: promo.imageUrl || null,
        url: promo.url || null,
        expiry_date: promo.expiryDate || null,
        content: promo.content || null,
        related_card_ids: promo.relatedCardIds || null,
        is_pinned: promo.isPinned || false,
        is_new: false,
        content_type: 'promo',
        seo_title: promo.seoTitle || null,
        seo_description: promo.seoDescription || null,
        faqs: promo.faqs || null,
        updated_at: promo.updatedAt || new Date().toISOString(),
        sort_order: promo.sortOrder || 0, // 新增：排序欄位
      };

      const { error } = await adminAuthClient
        .from('promos')
        .upsert(record, { onConflict: 'id' });

      if (error) {
        results.promos.failed++;
        results.promos.errors.push(`${promo.id}: ${error.message}`);
      } else {
        results.promos.success++;
      }
    }

    // 2. 同步 GUIDES
    for (const guide of GUIDES) {
      const record = {
        id: guide.id,
        title: guide.title,
        description: guide.description,
        merchant: guide.merchant || '攻略',
        tags: guide.tags,
        image_url: guide.imageUrl || null,
        url: null,
        expiry_date: '長期有效',
        content: null,
        related_card_ids: null,
        is_pinned: false,
        is_new: guide.isNew || false,
        content_type: 'guide',
        seo_title: null,
        seo_description: null,
        faqs: null,
        updated_at: new Date().toISOString(),
      };

      const { error } = await adminAuthClient
        .from('promos')
        .upsert(record, { onConflict: 'id' });

      if (error) {
        results.guides.failed++;
        results.guides.errors.push(`${guide.id}: ${error.message}`);
      } else {
        results.guides.success++;
      }
    }

    // 統計結果
    const { count } = await adminAuthClient
      .from('promos')
      .select('*', { count: 'exact', head: true });

    return NextResponse.json({
      success: true,
      message: '同步完成',
      results,
      totalInDB: count,
    });
  } catch (error: any) {
    console.error("Sync error:", error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}

// GET: 檢查同步狀態
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const promoId = url.searchParams.get('id');
    
    // Debug: 檢查特定 promo 內容
    if (promoId) {
      const promo = PROMOS.find(p => p.id === promoId);
      if (promo) {
        return NextResponse.json({
          id: promo.id,
          title: promo.title,
          hasContent: !!promo.content,
          contentLength: promo.content?.length || 0,
          contentPreview: promo.content?.substring(0, 200) || null,
        });
      }
      return NextResponse.json({ error: 'Promo not found in local data' }, { status: 404 });
    }
    
    const { count: dbCount } = await adminAuthClient
      .from('promos')
      .select('*', { count: 'exact', head: true });

    const localCount = PROMOS.length + GUIDES.length;

    return NextResponse.json({
      localPromos: PROMOS.length,
      localGuides: GUIDES.length,
      localTotal: localCount,
      dbTotal: dbCount,
      needsSync: (dbCount || 0) < localCount,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

