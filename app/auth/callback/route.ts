import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
        console.error("Auth exchange error:", error);
        // Redirect to login with error
        return NextResponse.redirect(`${origin}/login?error=auth_exchange_failed`);
    }
  }

  // Redirect to success page to handle profile creation and hard refresh
  const productionOrigin = "https://pickcardrebate-web.zeabur.app";
  // We ignore the original redirect param for now to ensure consistent flow through success page
  return NextResponse.redirect(`${productionOrigin}/auth/success`);
}

