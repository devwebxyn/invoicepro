import { NextResponse } from "next/server";

const WEBFORMS_ENDPOINT = "https://api.web3forms.com/submit";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const name = (body.name || "").toString().trim();
    const email = (body.email || "").toString().trim();
    const subject = (body.subject || "").toString().trim();
    const message = (body.message || "").toString().trim();
    const phone = (body.phone || "").toString().trim();
    const hp = (body.website || "").toString().trim(); // honeypot

    if (hp) {
      // bot submission
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, error: "Nama, email, dan pesan wajib diisi." },
        { status: 400 }
      );
    }

    const accessKey = process.env.WEBFORMS_ACCESS_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL || "samuel.indra211@smk.belajar.id";
    if (!accessKey) {
      return NextResponse.json(
        { ok: false, error: "WEBFORMS_ACCESS_KEY belum di-set di .env.local" },
        { status: 500 }
      );
    }

    // Payload ke Web3Forms (webforms)
    const payload = {
      access_key: accessKey,
      subject: subject ? `[Contact] ${subject}` : "[Contact] Invoice & Receipt Pro",
      from_name: name,
      from_email: email,
      to_email: toEmail,
      message: `${message}${phone ? `\n\nPhone: ${phone}` : ""}`,
      // optional fields agar gampang difilter di inbox
      botcheck: hp,
      replyto: email,
      // kamu bisa tambahkan redirect / cc / bcc sesuai dukungan Web3Forms
    };

    const res = await fetch(WEBFORMS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok || data.success === false) {
      return NextResponse.json(
        { ok: false, error: data?.message || "Gagal mengirim form." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: "Terjadi error tak terduga." },
      { status: 500 }
    );
  }
}
