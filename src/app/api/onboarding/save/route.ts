import { NextRequest, NextResponse } from "next/server";
import { appwriteServer } from "@/lib/appwrite";
import { Query } from "node-appwrite";
import { getSession } from "@/lib/session";

export async function POST(req: NextRequest) {
  const sess = await getSession();
  if (!sess) return NextResponse.json({ ok: false }, { status: 401 });

  const form = await req.formData();
  const username = String(form.get("username") || "");
  const reason   = String(form.get("reason") || "");
  const rating   = Number(form.get("rating") || 5);
  const avatarUrl = String(form.get("avatarUrl") || ""); // <— baru

  const { db } = appwriteServer();
  const list = await db.listDocuments(
    process.env.APPWRITE_DATABASE_ID!,
    process.env.APPWRITE_USERS_COLLECTION_ID!,
    [Query.equal("user_id", sess.sub)]
  );

  if (!list.total) return NextResponse.json({ ok: false }, { status: 404 });

  await db.updateDocument(
    process.env.APPWRITE_DATABASE_ID!,
    process.env.APPWRITE_USERS_COLLECTION_ID!,
    list.documents[0].$id,
    { username, reason, rating, ...(avatarUrl ? { profile_image: avatarUrl } : {}) } // <— update avatar
  );

  return NextResponse.json({ ok: true });
}
