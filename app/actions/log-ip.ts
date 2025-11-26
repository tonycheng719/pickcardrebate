"use server";

import { createClient } from "@/lib/supabase/server";
import { headers } from "next/headers";

export async function logUserIp() {
  try {
    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session || !session.user) {
      return { error: "Unauthorized" };
    }

    // Get IP from headers
    const headersList = await headers();
    // x-forwarded-for is standard for proxies (like Zeabur/Vercel)
    const forwardedFor = headersList.get("x-forwarded-for");
    const realIp = headersList.get("x-real-ip");
    
    let ip = forwardedFor ? forwardedFor.split(',')[0].trim() : realIp;

    // Fallback if no header (dev env)
    if (!ip) {
        ip = "unknown";
    }

    // Update profile
    const { error } = await supabase
      .from("profiles")
      .update({ last_ip: ip })
      .eq("id", session.user.id);

    if (error) {
      console.error("Failed to log IP:", error);
      return { error: error.message };
    }

    return { success: true, ip };
  } catch (e) {
    console.error("Error in logUserIp:", e);
    return { error: "Internal Server Error" };
  }
}

