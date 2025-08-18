import { NextRequest, NextResponse } from "next/server";
import { appwriteServer } from "@/lib/appwrite";
import { Query } from "node-appwrite";
import { PRICES, type Interval } from "@/lib/plans";

const XENDIT = "https://api.xendit.co";

export async function POST(req: NextRequest) {
  const { getSession } = await import("@/lib/session");
  const sess = await getSession();
  if (!sess) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { target }: { target: Interval } = await req.json();
  if (!["monthly","yearly"].includes(target)) {
    return NextResponse.json({ error: "Invalid target interval" }, { status: 400 });
  }

  // Ambil plan & pastikan paid plan
  const { db } = appwriteServer();
  const list = await db.listDocuments(
    process.env.APPWRITE_DATABASE_ID!, process.env.APPWRITE_USERS_COLLECTION_ID!,
    [Query.equal("user_id", (sess as any).sub)]
  );
  if (!list.total) return NextResponse.json({ error: "User not found" }, { status: 404 });
  const doc = list.documents[0] as any;
  const plan = doc.plan as "pro" | "business";

  if (plan !== "pro" && plan !== "business") {
    return NextResponse.json({ error: "Only for paid plans" }, { status: 400 });
  }

  // Buat invoice untuk interval baru (efektif segera – tanpa prorata)
  const amount = PRICES[plan][target];
  const external_id = `${(sess as any).sub}:${plan}:${target}:${Date.now()}`;
  const body = {
    external_id,
    amount,
    currency: "IDR",
    description: `Switch interval ${plan} → ${target}`,
    success_redirect_url: `${process.env.APP_URL}/dashboard/plan/manage?status=success&ext=${encodeURIComponent(external_id)}`,
    failure_redirect_url: `${process.env.APP_URL}/dashboard/plan/manage?status=failed`,
  };

  const auth = "Basic " + Buffer.from(`${process.env.XENDIT_SECRET_KEY}:`).toString("base64");
  const res = await fetch(`${XENDIT}/v2/invoices`, {
    method: "POST",
    headers: { Authorization: auth, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) return NextResponse.json({ error: data?.message || "xendit_error", detail: data }, { status: 400 });

  return NextResponse.json({ invoice_url: data.invoice_url });
}
