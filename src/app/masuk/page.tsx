"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock, Mail, Eye, EyeOff, ShieldCheck, Rocket, CreditCard } from "lucide-react";
import { GoogleIcon, FacebookIcon, XIcon } from "@/components/icons/brand";

const inputCls =
  "block w-full h-11 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500";

export default function LoginPage() {
  const [showPwd, setShowPwd] = useState(false);
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") || "");
    const password = String(fd.get("password") || "");

    if (!email || !password) {
      setMsg({ type: "err", text: "Email dan kata sandi wajib diisi." });
      return;
    }

    // TODO: ganti ke Appwrite / endpoint kamu
    // await signIn(email, password)
    await new Promise((r) => setTimeout(r, 700));
    setMsg({ type: "ok", text: "Login sukses. Mengarahkan ke dashboard..." });
    // Redirect to dashboard after successful login
    window.location.href = "/dashboard";
  }

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
                  Aman & Cepat
                </div>
                <h1 className="text-3xl font-semibold">Selamat datang kembali</h1>
                <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                  Masuk untuk melanjutkan mengelola invoice, menerima pembayaran, dan
                  mengunduh PDF/kwitansi otomatis.
                </p>

                <ul className="mt-6 space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
                  <li className="flex items-center gap-2"><Rocket className="h-4 w-4" /> UI 2D mewah & responsif</li>
                  <li className="flex items-center gap-2"><CreditCard className="h-4 w-4" /> Pembayaran multi-channel</li>
                  <li className="flex items-center gap-2"><Lock className="h-4 w-4" /> Webhook signature & audit log</li>
                </ul>
              </CardContent>
            </Card>

            {/* Form login */}
            <Card className="card-2d">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  <div className="font-medium">Masuk</div>
                </div>
                <p className="mt-1 text-sm text-zinc-500">
                  Belum punya akun?{" "}
                  <Link href="/daftar" className="underline underline-offset-4">Daftar</Link>
                </p>

                <form onSubmit={onSubmit} className="mt-6 space-y-4">
                  <div>
                    <label className="text-sm">Email</label>
                    <div className="relative mt-1">
                      <input name="email" type="email" placeholder="you@email.com" className={inputCls} />
                      <Mail className="h-4 w-4 absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm">Kata sandi</label>
                    <div className="relative mt-1">
                      <input
                        name="password"
                        type={showPwd ? "text" : "password"}
                        placeholder="••••••••"
                        className={inputCls}
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
                    <div className="mt-2 text-right">
                      <Link href="/lupa-password" className="text-xs text-indigo-600 hover:underline">
                        Lupa kata sandi?
                      </Link>
                    </div>
                  </div>

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

                  <Button className="w-full h-11" type="submit">Masuk</Button>

                  <div className="flex items-center gap-3 my-2">
                    <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
                    <span className="text-xs text-zinc-500">atau</span>
                    <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
  <Button
    type="button"
    variant="outline"
    className="h-11"
    onClick={() => (location.href = "/api/oauth/google/start")}
    aria-label="Masuk dengan Google"
  >
    <span className="inline-flex items-center gap-2 text-sm">
      <GoogleIcon /> Google
    </span>
  </Button>

  <Button
    type="button"
    variant="outline"
    className="h-11"
    onClick={() => (location.href = "/api/oauth/facebook/start")}
    aria-label="Masuk dengan Facebook"
  >
    <span className="inline-flex items-center gap-2 text-sm">
      <FacebookIcon /> Facebook
    </span>
  </Button>

  <Button
    type="button"
    variant="outline"
    className="h-11"
    onClick={() => (location.href = "/api/oauth/twitter/start")}
    aria-label="Masuk dengan X (Twitter)"
  >
    <span className="inline-flex items-center gap-2 text-sm">
      <XIcon /> Twitter
    </span>
  </Button>
</div>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
