import { NextResponse } from "next/server";
import { clearSession } from "@/lib/session";

export async function POST() {
  clearSession();
  return NextResponse.redirect(`${process.env.APP_URL}/masuk`);
}
