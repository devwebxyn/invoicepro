import { NextResponse } from "next/server";
import { getPromo } from "@/server/promoStore";

export async function GET() {
  return NextResponse.json(getPromo(), { headers: { "Cache-Control": "no-store" } });
}
