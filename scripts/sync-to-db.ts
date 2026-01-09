/**
 * 同步腳本：將本地 PROMOS 和 GUIDES 同步到資料庫
 * 
 * 使用方法：
 * 1. 先在 Supabase 執行 sql/migrate_to_db_only.sql
 * 2. 設置環境變數 NEXT_PUBLIC_SUPABASE_URL 和 SUPABASE_SERVICE_ROLE_KEY
 * 3. 運行：npx tsx scripts/sync-to-db.ts
 */

import { createClient } from '@supabase/supabase-js';
import { PROMOS } from '../lib/data/promos';
import { GUIDES } from '../lib/data/guides';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ 請設置環境變數 NEXT_PUBLIC_SUPABASE_URL 和 SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

interface DBPromo {
  id: string;
  title: string;
  description: string;
  merchant: string;
  tags: string[];
  image_url: string | null;
  url: string | null;
  expiry_date: string | null;
  content: string | null;
  related_card_ids: string[] | null;
  is_pinned: boolean;
  is_new: boolean;
  content_type: 'promo' | 'guide';
  seo_title: string | null;
  seo_description: string | null;
  faqs: { question: string; answer: string }[] | null;
  updated_at: string;
}

async function syncPromos() {
  console.log('\n📦 同步 PROMOS...');
  console.log(`   本地有 ${PROMOS.length} 篇優惠文章`);

  const promoRecords: DBPromo[] = PROMOS.map(promo => ({
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
  }));

  // Upsert 每一筆資料
  let success = 0;
  let failed = 0;

  for (const record of promoRecords) {
    const { error } = await supabase
      .from('promos')
      .upsert(record, { onConflict: 'id' });

    if (error) {
      console.error(`   ❌ ${record.id}: ${error.message}`);
      failed++;
    } else {
      success++;
    }
  }

  console.log(`   ✅ 成功: ${success}, ❌ 失敗: ${failed}`);
}

async function syncGuides() {
  console.log('\n📚 同步 GUIDES...');
  console.log(`   本地有 ${GUIDES.length} 篇攻略文章`);

  const guideRecords: DBPromo[] = GUIDES.map(guide => ({
    id: guide.id,
    title: guide.title,
    description: guide.description,
    merchant: guide.merchant || '攻略',
    tags: guide.tags,
    image_url: guide.imageUrl || null,
    url: null,
    expiry_date: '長期有效',
    content: null, // Guides 的內容在 /discover/[slug]/page.tsx 中硬編碼
    related_card_ids: null,
    is_pinned: false,
    is_new: guide.isNew || false,
    content_type: 'guide',
    seo_title: null,
    seo_description: null,
    faqs: null,
    updated_at: new Date().toISOString(),
  }));

  // Upsert 每一筆資料
  let success = 0;
  let failed = 0;

  for (const record of guideRecords) {
    const { error } = await supabase
      .from('promos')
      .upsert(record, { onConflict: 'id' });

    if (error) {
      console.error(`   ❌ ${record.id}: ${error.message}`);
      failed++;
    } else {
      success++;
    }
  }

  console.log(`   ✅ 成功: ${success}, ❌ 失敗: ${failed}`);
}

async function main() {
  console.log('🚀 開始同步本地數據到資料庫...');
  console.log(`   Supabase URL: ${supabaseUrl}`);

  try {
    // 測試連接
    const { data, error } = await supabase.from('promos').select('count').single();
    if (error && error.code !== 'PGRST116') {
      console.error('❌ 無法連接資料庫:', error.message);
      process.exit(1);
    }
    console.log('   ✅ 資料庫連接成功');

    await syncPromos();
    await syncGuides();

    // 統計結果
    const { count } = await supabase
      .from('promos')
      .select('*', { count: 'exact', head: true });

    console.log('\n📊 同步完成！');
    console.log(`   資料庫總共有 ${count} 篇文章`);

  } catch (err) {
    console.error('❌ 同步失敗:', err);
    process.exit(1);
  }
}

main();

