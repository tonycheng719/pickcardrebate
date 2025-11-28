import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        // Check if profile exists
        const { data: profile } = await supabase
            .from("profiles")
            .select("id")
            .eq("id", user.id)
            .single();

        if (!profile) {
            // Insert profile if missing
            const fullName = user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split("@")[0] || "Member";
            const avatarUrl = user.user_metadata?.avatar_url;

            // Using upsert just in case of race conditions
            await supabase.from("profiles").upsert({
                id: user.id,
                email: user.email,
                name: fullName,
                avatar_url: avatarUrl,
                updated_at: new Date().toISOString(),
            });
            console.log("Profile created for user (API):", user.id);
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("Error ensuring profile (API):", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

