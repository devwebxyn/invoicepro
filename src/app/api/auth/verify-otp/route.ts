import { NextResponse } from "next/server";
import { adminClient } from "@/lib/appwriteServer";
import bcrypt from "bcryptjs";
import { Query } from "node-appwrite";

const {
  APPWRITE_DATABASE_ID, APPWRITE_OTP_COLLECTION_ID
} = process.env;

export async function POST(req: Request) {
  try {
    const { uid, code } = await req.json();
    if (!uid || !code) return NextResponse.json({ ok: false, message: "Data tidak lengkap." }, { status: 400 });

    const { db, users } = adminClient();

    const docs = await db.listDocuments(
      APPWRITE_DATABASE_ID!, APPWRITE_OTP_COLLECTION_ID!,
      [Query.equal("user_id", uid)]
    );
    const doc = docs.documents[0];
    if (!doc) return NextResponse.json({ ok: false, message: "OTP tidak ditemukan." }, { status: 404 });

    if (doc.verified) return NextResponse.json({ ok: true, already: true });

    const now = new Date();
    if (now > new Date(doc.expires_at)) {
      return NextResponse.json({ ok: false, message: "OTP kedaluwarsa." }, { status: 400 });
    }

    const match = await bcrypt.compare(code, doc.otp_hash);
    if (!match) return NextResponse.json({ ok: false, message: "Kode OTP salah." }, { status: 400 });

    // tandai verified
    await db.updateDocument(APPWRITE_DATABASE_ID!, APPWRITE_OTP_COLLECTION_ID!, doc.$id, { verified: true });

    // set emailVerified di Appwrite
    await users.updateEmailVerification(uid, true);

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false, message: "Gagal verifikasi." }, { status: 500 });
  }
}
