import { NextRequest, NextResponse } from "next/server";
import { appwriteServer } from "@/lib/appwrite";
import { ID } from "node-appwrite";
// import { InputFile } from "appwrite";
import { getSession } from "@/lib/session";

export async function POST(req: NextRequest) {
  const sess = getSession();
  if (!sess) return NextResponse.json({ ok: false }, { status: 401 });

  const form = await req.formData();
  const file = form.get("file") as File | null;
  if (!file) return NextResponse.json({ ok: false, error: "No file" }, { status: 400 });

  const { storage } = appwriteServer();

  const fileId = ID.unique();
  const res = await storage.createFile(
    process.env.APPWRITE_AVATAR_BUCKET_ID!,
    fileId,
    file,
    [file.name]
  );

  // URL view publik (karena bucket read: role:all)
  const url = `${process.env.APPWRITE_ENDPOINT}/storage/buckets/${process.env.APPWRITE_AVATAR_BUCKET_ID}/files/${res.$id}/view?project=${process.env.APPWRITE_PROJECT}`;
  return NextResponse.json({ ok: true, fileId: res.$id, url });
}
