import { NextRequest, NextResponse } from "next/server";
import { adminAuthClient } from "@/lib/supabase/admin-client";

export const dynamic = 'force-dynamic';

// 舊的 Supabase URL
const OLD_URL_PREFIX = 'https://api.pickcardrebate.com/storage/v1';
// 新的 Zeabur Supabase URL
const NEW_URL_PREFIX = 'https://pickcardrebate-supabase-kong.zeabur.app/storage/v1';

// GET: 預覽需要修復的卡片
// POST: 執行修復
export async function GET() {
  try {
    const { data: cards, error } = await adminAuthClient
      .from('cards')
      .select('id, name, image_url');

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const needsFix = cards?.filter(c => 
      c.image_url && c.image_url.includes('api.pickcardrebate.com')
    ) || [];

    const alreadyFixed = cards?.filter(c => 
      c.image_url && c.image_url.includes('pickcardrebate-supabase-kong.zeabur.app')
    ) || [];

    const noImage = cards?.filter(c => !c.image_url) || [];

    return NextResponse.json({
      summary: {
        total: cards?.length || 0,
        needsFix: needsFix.length,
        alreadyFixed: alreadyFixed.length,
        noImage: noImage.length,
      },
      needsFix: needsFix.map(c => ({
        id: c.id,
        name: c.name,
        oldUrl: c.image_url,
        newUrl: c.image_url?.replace(OLD_URL_PREFIX, NEW_URL_PREFIX),
      })),
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST() {
  try {
    const { data: cards, error } = await adminAuthClient
      .from('cards')
      .select('id, image_url');

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const needsFix = cards?.filter(c => 
      c.image_url && c.image_url.includes('api.pickcardrebate.com')
    ) || [];

    if (needsFix.length === 0) {
      return NextResponse.json({ message: "沒有需要修復的卡片", fixed: 0 });
    }

    let fixedCount = 0;
    const errors: string[] = [];

    for (const card of needsFix) {
      const newUrl = card.image_url.replace(OLD_URL_PREFIX, NEW_URL_PREFIX);
      
      const { error: updateError } = await adminAuthClient
        .from('cards')
        .update({ image_url: newUrl })
        .eq('id', card.id);

      if (updateError) {
        errors.push(`${card.id}: ${updateError.message}`);
      } else {
        fixedCount++;
      }
    }

    return NextResponse.json({
      message: `已修復 ${fixedCount} 張卡片`,
      fixed: fixedCount,
      total: needsFix.length,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

