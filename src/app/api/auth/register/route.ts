import { NextResponse } from "next/server";
import { adminClient } from "@/lib/appwriteServer";
import { ID } from "node-appwrite";
import { transporter } from "@/lib/mailer";
import bcrypt from "bcryptjs";

const {
  APPWRITE_DATABASE_ID,
  APPWRITE_USERS_COLLECTION_ID,
  APPWRITE_OTP_COLLECTION_ID,
  APP_BASE_URL,
} = process.env;

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ ok: false, message: "Data tidak lengkap." }, { status: 400 });
    }

    const { users, db } = adminClient();

    // 1) Cek user sudah ada?
    try {
      // Appwrite tidak ada getByEmail langsung; kita pakai Users.list dengan queries
      const list = await users.list([
        `equal("email", "${email}")`
      ]);
      const exists = list.users.find(u => u.email?.toLowerCase() === email.toLowerCase());
      if (exists) {
        return NextResponse.json({ ok: false, message: "Email sudah terdaftar." }, { status: 409 });
      }
    } catch {}

    // 2) Create user (email/password)
    let user;
    try {
      user = await users.create(ID.unique(), email, undefined, password, name);
    } catch (err: any) {
      if (err?.type === "user_already_exists" || err?.code === 409 || (err?.message && err.message.includes("already exists"))) {
        return NextResponse.json({ ok: false, message: "Email sudah terdaftar." }, { status: 409 });
      }
      throw err;
    }

    // 3) Buat OTP 6 digit
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const otpHash = await bcrypt.hash(code, 10);
    const expires = new Date(Date.now() + 5 * 60_000); // 5 menit

    // Simpan ke collection OTP (1 user 1 dokumen, overwrite kalau ada)
    try {
      // delete existing OTP doc if any (by index unique user_id)
      const existing = await db.listDocuments(
        APPWRITE_DATABASE_ID!, APPWRITE_OTP_COLLECTION_ID!,
        [ `equal(\"user_id\",\"${user.$id}\")` ]
      );
      await Promise.all(existing.documents.map(d =>
        db.deleteDocument(APPWRITE_DATABASE_ID!, APPWRITE_OTP_COLLECTION_ID!, d.$id)
      ));
    } catch {}

    await db.createDocument(
      APPWRITE_DATABASE_ID!, APPWRITE_OTP_COLLECTION_ID!, ID.unique(),
      {
        user_id: user.$id,
        otp_hash: otpHash,
        expires_at: expires.toISOString(),
        verified: false,
      }
    );

    // 4) Kirim email OTP
    const mail = await transporter.sendMail({
      from: `"Invoice & Receipt Pro" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Kode Verifikasi (OTP)",
      html: `
        <div style=\"font-family:Inter,system-ui,Segoe UI,Arial\">
          <h2>Verifikasi Email</h2>
          <p>Hai ${name},</p>
          <p>Kode OTP kamu:</p>
          <div style=\"font-size:28px;font-weight:700;letter-spacing:6px\">${code}</div>
          <p>Kode berlaku 5 menit.</p>
          <p>Atau klik tautan cepat:</p>
          <p><a href=\"${APP_BASE_URL}/verifikasi-otp?uid=${user.$id}\" target=\"_blank\">Buka halaman verifikasi</a></p>
        </div>
      `,
    });

    return NextResponse.json({
      ok: true,
      userId: user.$id,
      message: "Akun dibuat. OTP terkirim.",
    });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ ok: false, message: "Gagal mendaftarkan user." }, { status: 500 });
  }
}
