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
  const isDev = origin.includes("localhost");
  // If we are in a proxy situation where origin is localhost (from internal network) but the actual request came from public
  // We need to be careful. The "origin" variable here comes from new URL(request.url).
  // If Zeabur/Nginx is stripping the host header, request.url might be http://localhost:8080/auth/callback...
  
  let targetOrigin = origin;
  
  // Robust check: if the internal origin is localhost but we are in production (based on env or common sense)
  // we should redirect to the public domain to ensure the user lands on the right site.
  if (isDev && process.env.NODE_ENV === 'production') {
      // We are likely behind a proxy in Zeabur
      targetOrigin = "https://pickcardrebate.com";
  } else if (!isDev) {
      // If origin is already public (e.g. zeabur.app or pickcardrebate.com), use it.
      targetOrigin = origin;
  }

  console.log("Auth Callback Redirecting to:", `${targetOrigin}/auth/success`, "Origin:", origin, "Target:", targetOrigin);

  return NextResponse.redirect(`${targetOrigin}/auth/success`);
}

