// src/app/api/onboarding/check-username/route.ts
import { NextRequest, NextResponse } from "next/server";
import { appwriteServer } from "@/lib/appwrite";
import { Query } from "node-appwrite";

export async function GET(req: NextRequest) {
  const u = req.nextUrl.searchParams.get("u") || "";
  if (!u) return NextResponse.json({ available: false });
  const { db } = appwriteServer();
  const res = await db.listDocuments(
    process.env.APPWRITE_DATABASE_ID!,
    process.env.APPWRITE_USERS_COLLECTION_ID!,
    [Query.equal("username", u)]
  );
  return NextResponse.json({ available: res.total === 0 });
}
