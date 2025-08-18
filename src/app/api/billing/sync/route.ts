import { NextRequest, NextResponse } from "next/server";
import { appwriteServer } from "@/lib/appwrite";
import { Query } from "node-appwrite";
import { computeActiveUntil } from "@/lib/plans";

const XENDIT_BASE = "https://api.xendit.co";

export async function GET(req: NextRequest) {
  const { getSession } = await import("@/lib/session");
  const sess = await getSession();
  if (!sess) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const ext = req.nextUrl.searchParams.get("ext");
  if (!ext) return NextResponse.json({ error: "Missing ext" }, { status: 400 });

  // Query invoice by external_id
  const auth = "Basic " + Buffer.from(`${process.env.XENDIT_SECRET_KEY}:`).toString("base64");
  const res = await fetch(`${XENDIT_BASE}/v2/invoices?external_id=${encodeURIComponent(ext)}`, {
    headers: { Authorization: auth },
    cache: "no-store",
  });
  const data = await res.json();

  const inv = Array.isArray(data?.data) ? data.data[0] : (Array.isArray(data) ? data[0] : null);
  if (!inv) return NextResponse.json({ error: "Invoice not found" }, { status: 404 });

  if (inv.status !== "PAID" && inv.status !== "SETTLED") {
    return NextResponse.json({ status: inv.status });
  }

  // ext: "<userId>:<plan>:<interval>:<ts>"
  const [userId, plan, interval] = String(ext).split(":");

  const { db } = appwriteServer();
  const list = await db.listDocuments(
    process.env.APPWRITE_DATABASE_ID!,
    process.env.APPWRITE_USERS_COLLECTION_ID!,
    [Query.equal("user_id", userId)]
  );
  if (!list.total) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const doc = list.documents[0] as any;
  await db.updateDocument(
    process.env.APPWRITE_DATABASE_ID!,
    process.env.APPWRITE_USERS_COLLECTION_ID!,
    doc.$id,
    {
      plan,
      plan_interval: interval,
      plan_status: "active",
      plan_active_until: computeActiveUntil(interval as any).toISOString(),
      last_invoice_id: inv.id ?? null,
    }
  );

  return NextResponse.json({ status: "PAID", invoice_id: inv.id });
}
