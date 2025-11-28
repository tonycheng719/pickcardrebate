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

  // Determine redirect origin dynamically or fallback to production
  // const isDev = origin.includes("localhost");
  // const targetOrigin = isDev ? origin : "https://pickcardrebate.com";
  
  // Temporary fallback: use origin directly to fix redirection loop/error until DNS stabilizes
  // We rely on WalletContext's manual code exchange as a safety net if this redirects to Zeabur
  const targetOrigin = origin;

  console.log("Auth Callback Redirecting to:", `${targetOrigin}/auth/success`, "Origin:", origin);

  return NextResponse.redirect(`${targetOrigin}/auth/success`);
}

