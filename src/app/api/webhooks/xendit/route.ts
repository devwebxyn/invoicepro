import { NextRequest, NextResponse } from "next/server";
import { appwriteServer } from "@/lib/appwrite";
import { Query } from "node-appwrite";
import { computeActiveUntil } from "@/lib/plans";

const ACCEPTED = new Set(["PAID", "SETTLED"]); // terima dua status

export async function POST(req: NextRequest) {
  // --- verifikasi pengirim ---
// Log headers and payload for debugging
console.log("[xendit-webhook] headers", Object.fromEntries(req.headers.entries()));
const payload = await req.json();
console.log("[xendit-webhook] payload", payload);

// --- verifikasi pengirim ---
const token = req.headers.get("x-callback-token");
if (!token || token !== process.env.XENDIT_CALLBACK_TOKEN) {
  return NextResponse.json({ message: "Invalid token" }, { status: 401 });
}

  const status = String(payload?.status || "").toUpperCase();
  console.log(`[xendit] status: ${status}, external_id: ${payload?.external_id}`);
  // Hanya proses jika paid/settled
  if (!ACCEPTED.has(status) || !payload?.external_id) {
    return NextResponse.json({ ok: true });
  }

  // ----- PARSING external_id yang aman -----
  // Format kirim saat create invoice: `${userId}:${plan}:${interval}:${ts}`
  // Tapi userId bisa saja mengandung ':' → ambil 3 segmen terakhir sebagai plan/interval/ts.
  const parts = String(payload.external_id).split(":");
  if (parts.length < 3) {
    return NextResponse.json({ message: "Malformed external_id" }, { status: 400 });
  }
  const ts = parts.pop();                // abaikan
  const interval = parts.pop();          // "monthly"|"yearly"
  const plan = parts.pop();              // "pro"|"business"
  const userId = parts.join(":");        // sisanya = userId utuh (aman walau ada ':')

  if (
    typeof plan !== "string" ||
    !["pro", "business"].includes(plan) ||
    typeof interval !== "string" ||
    !["monthly", "yearly"].includes(interval)
  ) {
    return NextResponse.json({ message: "Invalid plan/interval" }, { status: 400 });
  }

  // ----- Update Appwrite -----
  const { db } = appwriteServer();
  const list = await db.listDocuments(
    process.env.APPWRITE_DATABASE_ID!,
    process.env.APPWRITE_USERS_COLLECTION_ID!,
    [Query.equal("user_id", userId)]
  );
  if (!list.total) {
    console.warn("[xendit] user not found for", userId);
    return NextResponse.json({ ok: true }); // 200 supaya Xendit tidak retry terus
  }

  const doc = list.documents[0] as any;

  // Perpanjang dari akhir masa berjalan jika ada, tidak mengurangi sisa hari
  const base = doc.plan_active_until ? new Date(doc.plan_active_until) : new Date();
  const now = new Date();
  const start = base > now ? base : now; // mulai dari akhir masa berjalan kalau lebih besar
  const add = new Date(start);
  if (interval === "monthly") add.setMonth(add.getMonth() + 1);
  else add.setFullYear(add.getFullYear() + 1);

  const updates: any = {
    plan,
    plan_interval: interval,
    plan_status: "active",
    plan_active_until: add.toISOString(),
    last_invoice_id: payload.id ?? payload.invoice_id ?? null,
    plan_cancel_at: null,
    plan_cancel_at_period_end: false,
  };

  // Hanya update jika memang perlu (opsional)
  if (
    doc.plan !== plan ||
    doc.plan_status !== "active" ||
    doc.plan_active_until !== add.toISOString() ||
    doc.plan_interval !== interval
  ) {
    await db.updateDocument(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_USERS_COLLECTION_ID!,
      doc.$id,
      updates
    );
  }

  return NextResponse.json({ received: true });
}
