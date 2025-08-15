// src/app/api/oauth/facebook/callback/route.ts
import { NextRequest, NextResponse } from "next/server";
import { readOauthCookies, clearOauthCookies } from "@/lib/oauth";
import { upsertUser } from "@/lib/upsertUser";
import { setSession } from "@/lib/session";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const { state: savedState } = await readOauthCookies();

  if (!code || !state || state !== savedState) {
    return NextResponse.redirect(`${process.env.APP_URL}/auth/error?m=invalid_state`);
  }

  // Exchange code -> access_token
  const token = await fetch("https://graph.facebook.com/v18.0/oauth/access_token?" + new URLSearchParams({
    client_id: process.env.OAUTH_FACEBOOK_CLIENT_ID!,
    client_secret: process.env.OAUTH_FACEBOOK_CLIENT_SECRET!,
    redirect_uri: process.env.OAUTH_FACEBOOK_REDIRECT!,
    code: code!,
  })).then(r => r.json());

  // Verify & fetch profile
  const fields = "id,name,email,picture.width(256).height(256)";
  const me = await fetch(`https://graph.facebook.com/me?fields=${fields}`, {
    headers: { Authorization: `Bearer ${token.access_token}` },
  }).then(r => r.json());

  const email = me.email || `${me.id}@facebook.local`;

  const { userId, isNew } = await upsertUser({
    provider: "facebook",
    provider_uid: me.id,
    email,
    name: me.name,
    avatar: me.picture?.data?.url,
  });

  setSession({ sub: userId, email, name: me.name, provider: "facebook" });
  clearOauthCookies();

  return NextResponse.redirect(`${process.env.APP_URL}${isNew ? "/onboarding" : "/dashboard"}`);
}
