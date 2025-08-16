import { NextResponse } from "next/server";
import { adminClient } from "@/lib/appwriteServer";
import { transporter } from "@/lib/mailer";
import { ID, Query } from "node-appwrite";
import bcrypt from "bcryptjs";

const { APPWRITE_DATABASE_ID, APPWRITE_OTP_COLLECTION_ID } = process.env;

export async function POST(req: Request) {
  const { uid, email, name } = await req.json();
  if (!uid || !email) return NextResponse.json({ ok:false }, { status:400 });

  const { db } = adminClient();

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const otpHash = await bcrypt.hash(code, 10);
  const expires = new Date(Date.now() + 5*60_000).toISOString();

  // hapus lama, simpan baru
  const existing = await db.listDocuments(
    APPWRITE_DATABASE_ID!, APPWRITE_OTP_COLLECTION_ID!, [Query.equal("user_id", uid)]
  );
  await Promise.all(existing.documents.map(d =>
    db.deleteDocument(APPWRITE_DATABASE_ID!, APPWRITE_OTP_COLLECTION_ID!, d.$id)
  ));
  await db.createDocument(APPWRITE_DATABASE_ID!, APPWRITE_OTP_COLLECTION_ID!, ID.unique(), {
    user_id: uid, otp_hash: otpHash, expires_at: expires, verified: false
  });

  await transporter.sendMail({
    from: `"Invoice & Receipt Pro" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Kode OTP Baru",
    html: `<p>Hai ${name || ""}, kode OTP barumu:</p><h2>${code}</h2>`,
  });

  return NextResponse.json({ ok:true });
}
