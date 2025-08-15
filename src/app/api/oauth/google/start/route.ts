// src/app/api/oauth/google/start/route.ts
import { NextResponse } from "next/server";
import { randomString, sha256 } from "@/lib/oauth";

export async function GET() {
  const state = randomString(32);
  const verifier = randomString(48);
  const challenge = sha256(verifier);

  // Compose Set-Cookie header manually
  const opts = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 600,
  };
  const cookieParts = [
    `oauth_state=${state}`,
    `Path=${opts.path}`,
    `Max-Age=${opts.maxAge}`,
    `HttpOnly`,
    `SameSite=Lax`,
    opts.secure ? `Secure` : ""
  ].filter(Boolean);
  const verifierParts = [
    `oauth_verifier=${verifier}`,
    `Path=${opts.path}`,
    `Max-Age=${opts.maxAge}`,
    `HttpOnly`,
    `SameSite=Lax`,
    opts.secure ? `Secure` : ""
  ].filter(Boolean);

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

  const res = NextResponse.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`);
  res.headers.append('Set-Cookie', cookieParts.join('; '));
  res.headers.append('Set-Cookie', verifierParts.join('; '));
  return res;
}
