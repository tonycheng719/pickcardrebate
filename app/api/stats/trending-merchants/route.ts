import { NextResponse } from "next/server";
import { adminAuthClient } from "@/lib/supabase/admin-client";

export const dynamic = 'force-dynamic';
export const revalidate = 300; // Cache for 5 minutes

export async function GET() {
    try {
        // Check if admin client is available
        if (!process.env.SUPABASE_SERVICE_ROLE_KEY && !process.env.SERVICE_ROLE_KEY) {
            // Return empty array if no service role key
            return NextResponse.json({ merchants: [] });
        }

        const { data, error } = await adminAuthClient.rpc("get_trending_merchants");
        
        if (error) {
            // Silently return empty - trending is optional
            console.warn("Trending merchants RPC error:", error.message);
            return NextResponse.json({ merchants: [] });
        }

        return NextResponse.json({ merchants: data || [] });
    } catch (err: any) {
        console.warn("Trending merchants fetch error:", err.message);
        return NextResponse.json({ merchants: [] });
    }
}

