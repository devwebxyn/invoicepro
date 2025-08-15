// src/app/api/oauth/google/start/route.ts
import { NextResponse } from "next/server";
import { randomString, setOauthCookies, sha256 } from "@/lib/oauth";

export async function GET() {
  const state = randomString(32);
  const verifier = randomString(48);
  const challenge = sha256(verifier);

  setOauthCookies(state, verifier);

  const params = new URLSearchParams({
    client_id: process.env.OAUTH_GOOGLE_CLIENT_ID!,
    redirect_uri: process.env.OAUTH_GOOGLE_REDIRECT!,
    response_type: "code",
    scope: "openid email profile",
    state,
    code_challenge: challenge,
    code_challenge_method: "S256",
    access_type: "offline",
    prompt: "consent",
  });

  return NextResponse.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`);
}
