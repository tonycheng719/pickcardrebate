import { NextRequest, NextResponse } from "next/server";
import { adminAuthClient } from "@/lib/supabase/admin-client";
import { logAdminAction } from "@/lib/admin/audit-log";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    // Check for Service Role Key
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY && !process.env.SERVICE_ROLE_KEY) {
        console.error("CRITICAL: Service Role Key missing in API Route");
        return NextResponse.json({ error: "Server Misconfiguration: Missing Service Role Key" }, { status: 500 });
    }

    const { data, error } = await adminAuthClient
      .from('cards')
      .select('*')
      .order('updated_at', { ascending: false });

    if (error) {
      console.error("Error fetching cards:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ cards: data });
  } catch (error) {
    console.error("Internal error fetching cards:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check for Service Role Key at runtime for API routes too
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY && !process.env.SERVICE_ROLE_KEY) {
        console.error("CRITICAL: Service Role Key missing in API Route");
        return NextResponse.json({ error: "Server Misconfiguration: Missing Service Role Key" }, { status: 500 });
    }

    const card = await request.json();
    
    if (!card.id) {
      return NextResponse.json({ error: "Missing card ID" }, { status: 400 });
    }

    // Check if card exists to determine if this is create or update
    const { data: existingCard } = await adminAuthClient
      .from('cards')
      .select('id, name')
      .eq('id', card.id)
      .single();

    const isUpdate = !!existingCard;

    // Use upsert to handle both create and update
    const { error } = await adminAuthClient
      .from('cards')
      .upsert(card);

    if (error) {
      console.error("Error saving card:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Log admin action
    await logAdminAction({
      adminEmail: 'admin', // TODO: Get from session
      action: isUpdate ? 'update' : 'create',
      targetType: 'card',
      targetId: card.id,
      targetName: card.name,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Internal error saving card:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY && !process.env.SERVICE_ROLE_KEY) {
        console.error("CRITICAL: Service Role Key missing in API Route");
        return NextResponse.json({ error: "Server Misconfiguration: Missing Service Role Key" }, { status: 500 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: "Missing card ID" }, { status: 400 });
    }

    // Get card name before deleting
    const { data: cardToDelete } = await adminAuthClient
      .from('cards')
      .select('name')
      .eq('id', id)
      .single();

    const { error } = await adminAuthClient
      .from('cards')
      .delete()
      .eq('id', id);

    if (error) {
      console.error("Error deleting card:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Log admin action
    await logAdminAction({
      adminEmail: 'admin',
      action: 'delete',
      targetType: 'card',
      targetId: id,
      targetName: cardToDelete?.name || id,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Internal error deleting card:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
