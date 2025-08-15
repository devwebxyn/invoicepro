// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSession } from "./lib/session";

export function middleware(req: NextRequest) {
  const url = new URL(req.url);
  if (url.pathname.startsWith("/dashboard")) {
    // next/headers cookies tidak tersedia di middleware,
    // jadi cek manual cookie:
    const token = req.cookies.get("app_sess")?.value;
    if (!token) return NextResponse.redirect(new URL("/masuk", req.url));
  }
  return NextResponse.next();
}
export const config = { matcher: ["/dashboard/:path*"] };
