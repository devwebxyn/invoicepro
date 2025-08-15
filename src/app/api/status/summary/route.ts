import { NextResponse } from "next/server";
import { getStatus } from "@/server/statusSource";



export async function GET() {
  // mock ringkas: ganti dengan monitor asli kalau sudah ada
  const now = Date.now();
  const data = {
    updatedAt: new Date(now).toISOString(),
    uptime30d: 99.92,
    p95: 280,            // ms
    errorRate: 0.12,     // %
    regions: [
      { id: "jak", name: "Jakarta", status: "ok",    rtt: 18 },
      { id: "sgp", name: "Singapore", status: "ok",  rtt: 24 },
      { id: "tyo", name: "Tokyo",    status: "warn", rtt: 92 },
      { id: "syd", name: "Sydney",   status: "ok",   rtt: 110 },
    ],
  };
  return NextResponse.json(data, { headers: { "Cache-Control": "no-store" } });
}
