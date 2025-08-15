// src/app/api/oauth/twitter/callback/route.ts
import { NextRequest, NextResponse } from "next/server";
import { readOauthCookies, clearOauthCookies } from "@/lib/oauth";
import { upsertUser } from "@/lib/upsertUser";
import { setSession } from "@/lib/session";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const { state: savedState, verifier } = await readOauthCookies();

  if (!code || !state || !verifier || state !== savedState) {
    return NextResponse.redirect(`${process.env.APP_URL}/auth/error?m=invalid_state`);
  }

  try {
    // Exchange code -> token
    const tokenRes = await fetch("https://api.twitter.com/2/oauth2/token", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded", Authorization: "Basic " + Buffer.from(
        `${process.env.OAUTH_TWITTER_CLIENT_ID}:${process.env.OAUTH_TWITTER_CLIENT_SECRET}`
      ).toString("base64") },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code: code!,
        redirect_uri: process.env.OAUTH_TWITTER_REDIRECT!,
        code_verifier: verifier!,
      }),
    });
    if (!tokenRes.ok) {
      console.error("Twitter token exchange failed:", await tokenRes.text());
      throw new Error("Failed to get token");
    }
    const token = await tokenRes.json();

    // Verify & fetch profile
    const profileRes = await fetch("https://api.twitter.com/2/users/me?user.fields=profile_image_url,name,username", {
      headers: { Authorization: `Bearer ${token.access_token}` },
    });
    if (!profileRes.ok) {
      console.error("Twitter profile fetch failed:", await profileRes.text());
      throw new Error("Failed to get profile");
    }
    const me = await profileRes.json();

    const u = me.data;
    const pseudoEmail = `${u.id}@twitter.local`; // Twitter sering tidak mengembalikan email

    const { userId, isNew } = await upsertUser({
      provider: "twitter",
      provider_uid: u.id,
      email: pseudoEmail,
      name: u.name,
      avatar: u.profile_image_url,
    });

    setSession({ sub: userId, email: pseudoEmail, name: u.name, provider: "twitter" });
    clearOauthCookies();

    return NextResponse.redirect(`${process.env.APP_URL}${isNew ? "/onboarding" : "/dashboard"}`);
  } catch (error) {
    console.error("OAuth Callback Error (Twitter):", error);
    return NextResponse.redirect(`${process.env.APP_URL}/auth/error?m=oauth_failed`);
  }
}
