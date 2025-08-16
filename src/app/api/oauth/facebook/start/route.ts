// src/app/api/oauth/facebook/start/route.ts
import { NextResponse } from "next/server";
import { randomString, setOauthCookies } from "@/lib/oauth";

export async function GET() {
  const state = randomString(32);
  // Tunggu cookie tersimpan sebelum redirect
  await setOauthCookies(state); // FB tdk pakai PKCE

  const params = new URLSearchParams({
    client_id: process.env.OAUTH_FACEBOOK_CLIENT_ID!,
    redirect_uri: process.env.OAUTH_FACEBOOK_REDIRECT!,
    response_type: "code",
    state,
    scope: "email,public_profile",
  });

  // Gunakan NextResponse agar cookie tersimpan di browser
  const res = NextResponse.redirect(`https://www.facebook.com/v18.0/dialog/oauth?${params.toString()}`);
  // Tidak perlu set cookie manual, Next.js sudah handle dari setOauthCookies
  return res;
}
