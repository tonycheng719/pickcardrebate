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

        const now = new Date().toISOString();

        // 2. Perform DB Operations using Admin Client (Service Role) to bypass RLS
        // Check if profile exists
        const { data: profile, error: fetchError } = await adminAuthClient
            .from("profiles")
            .select("id, created_at")
            .eq("id", user.id)
            .single();

        if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 is "Row not found"
             console.error("Error fetching profile:", fetchError);
             // Don't fail, try upserting anyway
        }

        if (!profile) {
            // Insert new profile
            const fullName = user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split("@")[0] || "Member";
            const avatarUrl = user.user_metadata?.avatar_url;

            const { error: upsertError } = await adminAuthClient.from("profiles").upsert({
                id: user.id,
                email: user.email,
                name: fullName,
                avatar_url: avatarUrl,
                created_at: now,
                last_login: now,
                updated_at: now,
            });
            
            if (upsertError) {
                console.error("Error creating profile:", upsertError);
                throw upsertError;
            }
            console.log("Profile created for user (API/Admin):", user.id);
        } else {
            // Update last_login for existing profile
            const { error: updateError } = await adminAuthClient
                .from("profiles")
                .update({ last_login: now, updated_at: now })
                .eq("id", user.id);
            
            if (updateError) {
                console.error("Error updating last_login:", updateError);
                // Non-critical, don't throw
            }
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("Error ensuring profile (API):", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
