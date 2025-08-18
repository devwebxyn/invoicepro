import { NextRequest, NextResponse } from "next/server";
import { appwriteServer } from "@/lib/appwrite";
import { Query } from "node-appwrite";

export async function POST(req: NextRequest) {
  const { getSession } = await import("@/lib/session");
  const sess = await getSession();
  if (!sess) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { db } = appwriteServer();
  const list = await db.listDocuments(
    process.env.APPWRITE_DATABASE_ID!,
    process.env.APPWRITE_USERS_COLLECTION_ID!,
    [Query.equal("user_id", (sess as any).sub)]
  );
  if (!list.total) return NextResponse.json({ error: "User not found" }, { status: 404 });
  const doc = list.documents[0] as any;

  // downgrade instan
  const nowISO = new Date().toISOString();
  await db.updateDocument(
    process.env.APPWRITE_DATABASE_ID!,
    process.env.APPWRITE_USERS_COLLECTION_ID!,
    doc.$id,
    {
      plan: "free",
      plan_interval: null,
      plan_status: "inactive",
      plan_active_until: null,
      plan_cancel_at: nowISO,                // catat kapan dibatalkan
      plan_cancel_at_period_end: false,
    }
  );

  return NextResponse.json({ ok: true, canceled_at: nowISO });
}
