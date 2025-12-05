import { NextResponse } from 'next/server';
import { adminAuthClient } from '@/lib/supabase/admin-client';
import { logAdminAction } from '@/lib/admin/audit-log';

export const dynamic = 'force-dynamic';

// GET: Fetch all article settings or a specific one
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const articleId = searchParams.get('articleId');

    let query = adminAuthClient
      .from('article_settings')
      .select('*')
      .order('display_order', { ascending: true });

    if (articleId) {
      query = query.eq('article_id', articleId);
    }

    const { data, error } = await query;

    if (error) {
      // If table doesn't exist, return empty array
      if (error.code === '42P01') {
        return NextResponse.json({ settings: [] });
      }
      throw error;
    }

    return NextResponse.json({ settings: data || [] });
  } catch (error: any) {
    console.error('Error fetching article settings:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST: Create or update article settings
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { articleId, coverUrl, isVisible, displayOrder, lastUpdated } = body;

    if (!articleId) {
      return NextResponse.json({ error: 'Missing articleId' }, { status: 400 });
    }

    // Check if setting exists
    const { data: existing } = await adminAuthClient
      .from('article_settings')
      .select('id')
      .eq('article_id', articleId)
      .single();

    let result;
    if (existing) {
      // Update existing
      const updateData: Record<string, unknown> = { updated_at: new Date().toISOString() };
      if (coverUrl !== undefined) updateData.cover_url = coverUrl;
      if (isVisible !== undefined) updateData.is_visible = isVisible;
      if (displayOrder !== undefined) updateData.display_order = displayOrder;
      if (lastUpdated !== undefined) updateData.last_updated = lastUpdated;

      const { data, error } = await adminAuthClient
        .from('article_settings')
        .update(updateData)
        .eq('article_id', articleId)
        .select()
        .single();

      if (error) throw error;
      result = data;
    } else {
      // Insert new
      const { data, error } = await adminAuthClient
        .from('article_settings')
        .insert({
          article_id: articleId,
          cover_url: coverUrl || null,
          is_visible: isVisible !== false,
          display_order: displayOrder || 0,
          last_updated: lastUpdated || new Date().toISOString().split('T')[0],
          created_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;
      result = data;
    }

    // Log admin action
    await logAdminAction({
      adminEmail: 'admin',
      action: existing ? 'update_article_settings' : 'create_article_settings',
      targetType: 'article',
      targetId: articleId,
      targetName: articleId,
      details: { coverUrl, isVisible, displayOrder, lastUpdated }
    });

    return NextResponse.json({ success: true, setting: result });
  } catch (error: any) {
    console.error('Error saving article settings:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE: Remove article settings (soft delete / hide)
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const articleId = searchParams.get('articleId');

    if (!articleId) {
      return NextResponse.json({ error: 'Missing articleId' }, { status: 400 });
    }

    const { error } = await adminAuthClient
      .from('article_settings')
      .update({ 
        is_visible: false,
        is_deleted: true,
        deleted_at: new Date().toISOString()
      })
      .eq('article_id', articleId);

    if (error) throw error;

    await logAdminAction({
      adminEmail: 'admin',
      action: 'delete_article',
      targetType: 'article',
      targetId: articleId,
      targetName: articleId,
      details: {}
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting article:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

