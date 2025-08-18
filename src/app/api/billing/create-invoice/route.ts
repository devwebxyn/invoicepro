import { NextRequest, NextResponse } from "next/server";
import { appwriteServer } from "@/lib/appwrite";
import { Query } from "node-appwrite";
import { PRICES, type Interval, type Plan, isUpgradeAllowed } from "@/lib/plans";

const XENDIT_BASE = "https://api.xendit.co";

export async function POST(req: NextRequest) {
  const { getSession } = await import("@/lib/session");
  const sess = await getSession();
  if (!sess) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { plan, interval }: { plan: "pro" | "business"; interval: Interval } = await req.json();

  if (!["pro", "business"].includes(plan)) {
    return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
  }
  if (!["monthly", "yearly"].includes(interval)) {
    return NextResponse.json({ error: "Invalid interval" }, { status: 400 });
  }

  // Ambil plan user sekarang
  const { db } = appwriteServer();
  const list = await db.listDocuments(
    process.env.APPWRITE_DATABASE_ID!,
    process.env.APPWRITE_USERS_COLLECTION_ID!,
    [Query.equal("user_id", (sess as any).sub)]
  );
  const profile = list.total ? (list.documents[0] as any) : null;
  const currentPlan = (profile?.plan as Plan) ?? "free";

  if (!isUpgradeAllowed(currentPlan, plan)) {
    return NextResponse.json({ error: "Upgrade tidak diizinkan" }, { status: 400 });
  }

  const amount = PRICES[plan][interval];
  const external_id = `${(sess as any).sub}:${plan}:${interval}:${Date.now()}`;

  const successUrl = new URL(`${process.env.APP_URL}/dashboard/plan`);
  successUrl.searchParams.set("status", "success");
  successUrl.searchParams.set("plan", plan);
  successUrl.searchParams.set("ext", external_id);

  const failureUrl = new URL(`${process.env.APP_URL}/dashboard/plan`);
  failureUrl.searchParams.set("status", "failed");
  failureUrl.searchParams.set("plan", plan);
  failureUrl.searchParams.set("ext", external_id);

  const body = {
    external_id,
    amount,
    currency: "IDR",
    payer_email: (sess as any).email ?? undefined,
    description: `Upgrade ${plan} (${interval})`,
    success_redirect_url: successUrl.toString(),
    failure_redirect_url: failureUrl.toString(),
  };

  const auth = "Basic " + Buffer.from(`${process.env.XENDIT_SECRET_KEY}:`).toString("base64");

  const res = await fetch(`${XENDIT_BASE}/v2/invoices`, {
    method: "POST",
    headers: { Authorization: auth, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  if (!res.ok) {
    return NextResponse.json({ error: data?.message ?? "xendit_error", detail: data }, { status: 400 });
  }

  return NextResponse.json({ invoice_url: data.invoice_url, id: data.id, external_id: data.external_id });
}
