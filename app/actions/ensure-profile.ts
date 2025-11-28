"use server";

import { createClient } from "@/lib/supabase/server";

export async function ensureProfile() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return;

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
      console.log("Profile created for user:", user.id);
    }
  } catch (error) {
    console.error("Error ensuring profile:", error);
  }
}



