import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { adminAuthClient } from '@/lib/supabase/admin-client';

export async function GET(request: Request) {
    try {
        // 1. Get User Identity using Standard Client (Cookies)
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        // 2. Perform DB Operations using Admin Client (Service Role) to bypass RLS
        // Check if profile exists
        const { data: profile, error: fetchError } = await adminAuthClient
            .from("profiles")
            .select("id")
            .eq("id", user.id)
            .single();

        if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 is "Row not found"
             console.error("Error fetching profile:", fetchError);
             // Don't fail, try upserting anyway
        }

        if (!profile) {
            // Insert profile if missing
            const fullName = user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split("@")[0] || "Member";
            const avatarUrl = user.user_metadata?.avatar_url;

            // Using upsert with Admin Client
            const { error: upsertError } = await adminAuthClient.from("profiles").upsert({
                id: user.id,
                email: user.email,
                name: fullName,
                avatar_url: avatarUrl,
                updated_at: new Date().toISOString(),
            });
            
            if (upsertError) {
                console.error("Error creating profile:", upsertError);
                throw upsertError;
            }
            console.log("Profile created for user (API/Admin):", user.id);
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("Error ensuring profile (API):", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
