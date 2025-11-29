import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { adminAuthClient } from '@/lib/supabase/admin-client';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    try {
        // Check for userId in query params (for cases where cookies aren't set yet)
        const { searchParams } = new URL(request.url);
        const userIdParam = searchParams.get('userId');
        
        let userId: string | undefined;
        let userEmail: string | undefined;
        let userMetadata: any = {};

        if (userIdParam) {
            // Trust the userId from params (called from auth/success with session data)
            userId = userIdParam;
            userEmail = searchParams.get('email') || undefined;
            userMetadata = {
                full_name: searchParams.get('name') || undefined,
                avatar_url: searchParams.get('avatar') || undefined,
            };
            console.log("[ensure-profile] Using userId from params:", userId);
        } else {
            // Fallback: Get User Identity using Standard Client (Cookies)
            const supabase = await createClient();
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
            }
            userId = user.id;
            userEmail = user.email;
            userMetadata = user.user_metadata || {};
            console.log("[ensure-profile] Using userId from cookies:", userId);
        }

        if (!userId) {
            return NextResponse.json({ error: "No user ID provided" }, { status: 400 });
        }

        const now = new Date().toISOString();

        // 2. Perform DB Operations using Admin Client (Service Role) to bypass RLS
        // Check if profile exists
        const { data: profile, error: fetchError } = await adminAuthClient
            .from("profiles")
            .select("id, created_at")
            .eq("id", userId)
            .single();

        if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 is "Row not found"
             console.error("Error fetching profile:", fetchError);
             // Don't fail, try upserting anyway
        }

        if (!profile) {
            // Insert new profile
            const fullName = userMetadata?.full_name || userMetadata?.name || userEmail?.split("@")[0] || "Member";
            const avatarUrl = userMetadata?.avatar_url;

            console.log("[ensure-profile] Creating new profile for:", userId);
            const { error: upsertError } = await adminAuthClient.from("profiles").upsert({
                id: userId,
                email: userEmail,
                name: fullName,
                avatar_url: avatarUrl,
                created_at: now,
                last_login: now,
                updated_at: now,
            });
            
            if (upsertError) {
                console.error("[ensure-profile] Error creating profile:", upsertError);
                throw upsertError;
            }
            console.log("[ensure-profile] Profile created for user:", userId, "last_login:", now);
        } else {
            // Update last_login for existing profile
            console.log("[ensure-profile] Updating last_login for:", userId);
            const { data: updateData, error: updateError } = await adminAuthClient
                .from("profiles")
                .update({ last_login: now, updated_at: now })
                .eq("id", userId)
                .select("last_login");
            
            if (updateError) {
                console.error("[ensure-profile] Error updating last_login:", updateError);
                return NextResponse.json({ success: false, error: updateError.message }, { status: 500 });
            }
            console.log("[ensure-profile] last_login updated for:", userId, "to:", updateData);
        }

        return NextResponse.json({ success: true, last_login: now });
    } catch (error: any) {
        console.error("Error ensuring profile (API):", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
