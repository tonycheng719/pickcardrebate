"use server";

import { createClient } from "@/lib/supabase/server";
import { headers } from "next/headers";

export async function logUserIp() {
  try {
    // Try to create client, but catch initialization errors (like role "" error)
    let supabase;
    try {
        supabase = await createClient();
    } catch (initError) {
        // If client creation fails (e.g. bad cookie), just abort silently
        return { error: "Client initialization failed" };
    }

    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user || !user.id) {
      return { error: "Unauthorized" };
    }

    const headersList = await headers();
    const forwardedFor = headersList.get("x-forwarded-for");
    const realIp = headersList.get("x-real-ip");
    
    let ip = forwardedFor ? forwardedFor.split(',')[0].trim() : realIp;

    if (!ip) {
        ip = "unknown";
    }

    // Update profile
    // Note: This might still fail if RLS blocks UPDATE and we don't have Service Role
    // But we catch errors below.
    const { error } = await supabase
      .from("profiles")
      .update({ last_ip: ip })
      .eq("id", user.id);

    if (error) {
      // Don't log verbose errors for known auth issues to keep logs clean
      if (error.code !== '22023') {
          console.error("Failed to log IP:", error);
      }
      return { error: error.message };
    }

    return { success: true, ip };
  } catch (e) {
    // Catch-all for any other errors
    return { error: "Internal Server Error" };
  }
}
