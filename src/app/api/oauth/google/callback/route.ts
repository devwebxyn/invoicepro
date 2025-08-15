// src/app/api/oauth/google/callback/route.ts
import { NextRequest, NextResponse } from "next/server";
import { clearOauthCookies, readOauthCookies } from "@/lib/oauth";
import { setSession } from "@/lib/session";
import { upsertUser } from "@/lib/upsertUser";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const { state: savedState, verifier } = await readOauthCookies();

  if (!code || !state || state !== savedState || !verifier) {
    return NextResponse.redirect(`${process.env.APP_URL}/auth/error?m=invalid_state`);
  }

  // Exchange code -> tokens
  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.OAUTH_GOOGLE_CLIENT_ID!,
      client_secret: process.env.OAUTH_GOOGLE_CLIENT_SECRET!,
      code,
      grant_type: "authorization_code",
      redirect_uri: process.env.OAUTH_GOOGLE_REDIRECT!,
      code_verifier: verifier,
    }),
  }).then(r => r.json());

  // Verify & fetch profile
  const profile = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
    headers: { Authorization: `Bearer ${tokenRes.access_token}` },
  }).then(r => r.json());

  // Upsert to Appwrite
  const { userId, isNew } = await upsertUser({
    provider: "google",
    provider_uid: profile.sub,
    email: profile.email,
    name: profile.name,
    avatar: profile.picture,
  });

  // set our session cookie
  setSession({ sub: userId, email: profile.email, name: profile.name, provider: "google" });
  clearOauthCookies();

  const dest = isNew ? "/onboarding" : "/dashboard";
  return NextResponse.redirect(`${process.env.APP_URL}${dest}`);
}
