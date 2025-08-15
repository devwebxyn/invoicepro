// src/app/api/oauth/twitter/start/route.ts
import { NextResponse } from "next/server";
import { randomString, setOauthCookies, sha256 } from "@/lib/oauth";

export async function GET() {
  const state = randomString(32);
  const verifier = randomString(64);
  const challenge = sha256(verifier);

  setOauthCookies(state, verifier);

  const params = new URLSearchParams({
    response_type: "code",
    client_id: process.env.OAUTH_TWITTER_CLIENT_ID!,
    redirect_uri: process.env.OAUTH_TWITTER_REDIRECT!,
    scope: "tweet.read users.read offline.access", // tambah 'email' jika tersedia di app settings
    state,
    code_challenge: challenge,
    code_challenge_method: "S256",
  });

  return NextResponse.redirect(`https://twitter.com/i/oauth2/authorize?${params.toString()}`);
}
