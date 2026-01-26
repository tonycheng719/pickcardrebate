import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';
export const revalidate = 300; // 5 minutes cache

function getClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const popular = searchParams.get('popular');
    const search = searchParams.get('q');
    const format = searchParams.get('format') || 'flat'; // 'flat' or 'grouped'

    const supabase = getClient();
    if (!supabase) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
    }

    // 獲取分類
    const { data: categories } = await supabase
      .from('merchant_categories')
      .select('*')
      .eq('is_active', true)
      .order('sort_order');

    // 構建商戶查詢
    let query = supabase
      .from('merchants')
      .select('*')
      .eq('is_active', true);

    if (category) {
      query = query.contains('category_ids', [category]);
    }

    if (popular === 'true') {
      query = query.eq('is_popular', true);
    }

    if (search) {
      // 搜尋名稱和別名
      query = query.or(`name.ilike.%${search}%,aliases.cs.{${search.toLowerCase()}}`);
    }

    query = query.order('sort_order').order('name');

    const { data: merchants, error } = await query;

    if (error) {
      console.error('Merchants fetch error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // 根據格式返回
    if (format === 'grouped') {
      // Mobile 格式：按分類分組
      const grouped = (categories || []).map(cat => ({
        id: cat.id,
        name: cat.name,
        name_en: cat.name_en,
        icon: cat.icon,
        merchants: (merchants || [])
          .filter(m => m.category_ids?.includes(cat.id))
          .map(m => ({
            id: m.id,
            name: m.name,
            category: cat.id,
            aliases: m.aliases || [],
            logo: m.logo,
            accentColor: m.accent_color,
          }))
      })).filter(cat => cat.merchants.length > 0);

      return NextResponse.json({
        success: true,
        categories: grouped,
        total: merchants?.length || 0,
      });
    }

    // Web 格式：扁平列表
    return NextResponse.json({
      success: true,
      merchants: merchants || [],
      categories: categories || [],
      total: merchants?.length || 0,
    });
  } catch (e: any) {
    console.error('Merchants API error:', e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

