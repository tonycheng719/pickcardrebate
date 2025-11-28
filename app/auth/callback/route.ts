import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");

  // Determine redirect origin dynamically or fallback to production
  const isDev = origin.includes("localhost");
  
  let targetOrigin = origin;
  
  // Robust check for proxy environment
  if (isDev && process.env.NODE_ENV === 'production') {
      targetOrigin = "https://pickcardrebate.com";
  } else if (!isDev) {
      targetOrigin = origin;
  }

  console.log("Auth Callback Relay -> Target:", `${targetOrigin}/auth/success`, "Code present:", !!code);

  // Pass the code to the client-side /auth/success page
  // We skip server-side exchange to avoid cookie domain/proxy issues.
  // The WalletContext will handle the actual exchange using the client-side Supabase key.
  const redirectUrl = new URL(`${targetOrigin}/auth/success`);
  
  if (code) redirectUrl.searchParams.set("code", code);
  if (error) redirectUrl.searchParams.set("error", error);
  if (errorDescription) redirectUrl.searchParams.set("error_description", errorDescription);

  return NextResponse.redirect(redirectUrl);
}

