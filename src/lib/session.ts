// src/lib/session.ts
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const COOKIE = "app_sess";
const SEC = process.env.APP_JWT_SECRET!;

export type Sess = { sub: string; email: string; name?: string; provider?: string; };

export async function setSession(s: Sess) {
  const token = jwt.sign(s, SEC, { expiresIn: "7d" });
  const cookieStore = await cookies();
  cookieStore.set(COOKIE, token, { httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 7 });
}
export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE);
}
export async function getSession(): Promise<Sess | null> {
  const cookieStore = await cookies();
  const t = cookieStore.get(COOKIE)?.value;
  if (!t) return null;
  try { return jwt.verify(t, SEC) as Sess; } catch { return null; }
}
