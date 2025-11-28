import { NextRequest, NextResponse } from "next/server";
import { adminAuthClient } from "@/lib/supabase/admin-client";

export async function GET(request: NextRequest) {
  try {
    const { data, error } = await adminAuthClient
      .from("system_settings")
      .select("*")
      .order("key");

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Convert array to object for easier consumption
    const settingsMap = data.reduce((acc, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {} as Record<string, string>);

    return NextResponse.json({ settings: settingsMap });
  } catch (error) {
    console.error("Error fetching settings:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { key, value } = body;

    if (!key) {
      return NextResponse.json({ error: "Missing key" }, { status: 400 });
    }

    const { error } = await adminAuthClient
      .from("system_settings")
      .upsert({ 
        key, 
        value, 
        updated_at: new Date().toISOString() 
      });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating setting:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

