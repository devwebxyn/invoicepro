"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus, ShieldCheck, Eye, EyeOff, Mail, CheckCircle2, XCircle } from "lucide-react";
import { GoogleIcon, FacebookIcon, XIcon } from "@/components/icons/brand";

const inputCls =
  "block w-full h-11 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500";

function scorePassword(pwd: string) {
  let s = 0;
  if (pwd.length >= 8) s += 25;
  if (/[A-Z]/.test(pwd)) s += 20;
  if (/[a-z]/.test(pwd)) s += 20;
  if (/\d/.test(pwd)) s += 20;
  if (/[^A-Za-z0-9]/.test(pwd)) s += 15;
  return Math.min(100, s);
}

export default function RegisterPage() {
  const [showPwd, setShowPwd] = useState(false);
  const [showPwd2, setShowPwd2] = useState(false);
  const [pwd, setPwd] = useState("");
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  const s = useMemo(() => scorePassword(pwd), [pwd]);
  const level =
    s >= 80 ? { label: "Kuat", color: "bg-green-500" } :
    s >= 60 ? { label: "Sedang", color: "bg-yellow-500" } :
    { label: "Lemah", color: "bg-red-500" };

  // ...existing code...

  return (
    <>
      <Header />

      <main className="min-h-[80vh]">
        <section className="mx-auto max-w-6xl px-4 py-10 md:py-14">
          <div className="grid lg:grid-cols-2 gap-6 items-stretch">
            {/* Panel kiri (highlight) */}
            <Card className="card-2d hidden lg:block">
              <CardContent className="p-8">
                <div className="inline-flex items-center gap-2 text-xs px-2 py-1 rounded-full border mb-4">
                  <ShieldCheck className="h-4 w-4" />
                  Pendaftaran Aman
                </div>
                <h1 className="text-3xl font-semibold">Buat Akun</h1>
                <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                  Gratis untuk memulai—kirim invoice, terima pembayaran, dan generate PDF.
                </p>

                <div className="mt-6 space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
                  <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4" /> Email verifikasi</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4" /> Notifikasi otomatis</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4" /> Monitoring realtime</div>
                </div>
              </CardContent>
            </Card>

            {/* Form daftar */}
            <Card className="card-2d">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center gap-2">
                  <UserPlus className="h-5 w-5" />
                  <div className="font-medium">Daftar</div>
                </div>
                <p className="mt-1 text-sm text-zinc-500">
                  Sudah punya akun?{" "}
                  <Link href="/masuk" className="underline underline-offset-4">Masuk</Link>
                </p>

                <form onSubmit={async (e) => {
                  e.preventDefault();
                  const fd = new FormData(e.currentTarget);
                  const name = String(fd.get("name") || "");
                  const email = String(fd.get("email") || "");
                  const password = String(fd.get("password") || "");
                  const confirm = String(fd.get("confirm") || "");
                  const agree = fd.get("agree") === "on";

                  if (!name || !email || !password || !confirm) {
                    setMsg({ type: "err", text: "Lengkapi semua field terlebih dahulu." });
                    return;
                  }
                  if (password !== confirm) {
                    setMsg({ type: "err", text: "Konfirmasi kata sandi tidak sama." });
                    return;
                  }
                  if (!agree) {
                    setMsg({ type: "err", text: "Harap setujui Kebijakan & Ketentuan." });
                    return;
                  }

                  setMsg(null);
                  try {
                    const res = await fetch("/api/auth/register", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ name, email, password })
                    });
                    const data = await res.json();
                    if (!res.ok || !data.ok) {
                      throw new Error(data.message || "Gagal membuat akun");
                    }
                    setMsg({ type: "ok", text: "Akun berhasil dibuat. Cek email untuk OTP!" });
                    // Redirect ke halaman OTP
                    window.location.href = `/verifikasi-otp?uid=${data.userId}&email=${encodeURIComponent(email)}`;
                  } catch (err: any) {
                    setMsg({ type: "err", text: err.message || "Terjadi kesalahan." });
                  }
                }} className="mt-6 space-y-4">
                  <div className="grid md:grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm">Nama lengkap</label>
                      <input name="name" type="text" placeholder="Samuel Indra Bastian" className={`${inputCls} mt-1`} />
                    </div>
                    <div>
                      <label className="text-sm">Email</label>
                      <div className="relative mt-1">
                        <input name="email" type="email" placeholder="you@email.com" className={inputCls} />
                        <Mail className="h-4 w-4 absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm">Kata sandi</label>
                      <div className="relative mt-1">
                        <input
                          name="password"
                          type={showPwd ? "text" : "password"}
                          placeholder="Minimal 8 karakter"
                          className={inputCls}
                          onChange={(e) => setPwd(e.target.value)}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPwd((v) => !v)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-700"
                          aria-label="Tampilkan/sembunyikan kata sandi"
                        >
                          {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>

                      {/* Meter kekuatan password */}
                      <div className="mt-2">
                        <div className="h-2 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                          <div
                            className={`h-2 ${level.color}`}
                            style={{ width: `${s}%` }}
                          />
                        </div>
                        <div className="mt-1 text-xs text-zinc-500">
                          Kekuatan: <span className="font-medium">{level.label}</span>
                        </div>
                        <ul className="mt-1 text-xs text-zinc-500 list-disc pl-5 space-y-0.5">
                          <li>≥ 8 karakter</li>
                          <li>Gabungan huruf besar, kecil, angka, dan simbol</li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm">Konfirmasi kata sandi</label>
                      <div className="relative mt-1">
                        <input
                          name="confirm"
                          type={showPwd2 ? "text" : "password"}
                          placeholder="Ulangi kata sandi"
                          className={inputCls}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPwd2((v) => !v)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-700"
                          aria-label="Tampilkan/sembunyikan konfirmasi"
                        >
                          {showPwd2 ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <label className="flex items-center gap-2 text-sm">
                    <input name="agree" type="checkbox" className="h-4 w-4 rounded border-zinc-300 dark:border-zinc-700" />
                    <span>
                      Saya menyetujui <a className="underline underline-offset-4" href="/terms">Ketentuan</a> &
                      <a className="underline underline-offset-4 ml-1" href="/privacy"> Kebijakan Privasi</a>.
                    </span>
                  </label>

                  {msg && (
                    <div
                      className={`text-sm rounded-xl px-3 py-2 ${
                        msg.type === "ok"
                          ? "bg-green-50 text-green-700 border border-green-200"
                          : "bg-red-50 text-red-700 border border-red-200"
                      }`}
                    >
                      {msg.text}
                    </div>
                  )}

                  <Button className="w-full h-11" type="submit">Buat Akun</Button>

                  <div className="flex items-center gap-3 my-2">
                    <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
                    <span className="text-xs text-zinc-500">atau</span>
                    <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
  <Button type="button" variant="outline" className="h-11" onClick={() => (location.href = "/api/oauth/google/start")}> 
    <span className="inline-flex items-center gap-2 text-sm"><GoogleIcon /> Google</span>
  </Button>
  <Button type="button" variant="outline" className="h-11" onClick={() => (location.href = "/api/oauth/facebook/start")}> 
    <span className="inline-flex items-center gap-2 text-sm"><FacebookIcon /> Facebook</span>
  </Button>
  <Button type="button" variant="outline" className="h-11" onClick={() => (location.href = "/api/oauth/twitter/start")}> 
    <span className="inline-flex items-center gap-2 text-sm"><XIcon />Twitter</span>
  </Button>
</div>
                </form>

                {/* Validasi ringkas (live) */}
                <div className="mt-6 grid md:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    {s >= 60 ? <CheckCircle2 className="h-4 w-4 text-green-600" /> : <XCircle className="h-4 w-4 text-red-600" />}
                    <span>Password cukup kuat</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <span>Email verifikasi akan dikirim</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
