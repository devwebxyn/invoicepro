// src/lib/oauth.ts
import crypto from "crypto";
import { cookies } from "next/headers";

export function randomString(len = 64) {
  return crypto.randomBytes(len).toString("base64url");
}
export function base64url(input: Buffer) {
  return input.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
export function sha256(verifier: string) {
  return base64url(crypto.createHash("sha256").update(verifier).digest());
}

const STATE_COOKIE = "oauth_state";
const VERIFIER_COOKIE = "oauth_verifier";

export async function setOauthCookies(state: string, verifier?: string) {
  const opts = { httpOnly: true, secure: true, sameSite: "lax" as const, path: "/", maxAge: 600 };
  const cookieStore = await cookies();
  cookieStore.set(STATE_COOKIE, state, opts);
  if (verifier) cookieStore.set(VERIFIER_COOKIE, verifier, opts);
}
export async function readOauthCookies() {
  const cookieStore = await cookies();
  const state = cookieStore.get(STATE_COOKIE)?.value;
  const verifier = cookieStore.get(VERIFIER_COOKIE)?.value;
  return { state, verifier };
}
export async function clearOauthCookies() {
  const cookieStore = await cookies();
  cookieStore.delete(STATE_COOKIE);
  cookieStore.delete(VERIFIER_COOKIE);
}
