import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabase = await createClient();
    await supabase.auth.exchangeCodeForSession(code);
  }

  // Force production URL for redirect to avoid localhost issues behind proxy
  const productionOrigin = "https://pickcardrebate-web.zeabur.app";
  return NextResponse.redirect(`${productionOrigin}${redirectTo}`);
}

