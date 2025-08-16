"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function VerifyOtpPage() {
  const sp = useSearchParams();
  const r = useRouter();
  const uid = sp.get("uid")!;
  const email = sp.get("email") || "";

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  async function onVerify(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type":"application/json" },
        body: JSON.stringify({ uid, code }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.message || "Verifikasi gagal");

      toast.success("Verifikasi berhasil!");
      r.push(`/onboarding?uid=${uid}`);
    } catch (err:any) {
      toast.error(err.message || "Kode salah/kedaluwarsa.");
    } finally {
      setLoading(false);
    }
  }

    async function onResend() {
      setResending(true);
      try {
        const res = await fetch("/api/auth/resend-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ uid, email })
        });
        const data = await res.json();
        if (!res.ok || !data.ok) throw new Error("Gagal mengirim ulang OTP");
        toast.success("Kode OTP baru sudah dikirim ke email!");
      } catch (err: any) {
        toast.error(err.message || "Gagal mengirim ulang OTP.");
      } finally {
        setResending(false);
      }
    }

  return (
    <main className="mx-auto max-w-md px-4 py-12">
      <div className="card-2d p-6">
        <h1 className="text-2xl font-semibold">Verifikasi Email</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
          Kami mengirim kode OTP ke <b>{email}</b>. Masukkan 6 digit di bawah.
        </p>
        <form onSubmit={onVerify} className="mt-5 space-y-3">
          <input
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={6}
            placeholder="123456"
            className="w-full text-center tracking-[8px] text-2xl h-12 rounded-xl border"
            value={code}
            onChange={(e)=>setCode(e.target.value.replace(/\D/g,''))}
          />
          <Button disabled={loading} className="w-full h-11">{loading? "Memverifikasi…" : "Verifikasi"}</Button>
        </form>
        <div className="mt-3 text-xs text-zinc-500 flex items-center gap-2">
          <span>Tidak menerima kode?</span>
          <Button type="button" variant="outline" size="sm" disabled={resending} onClick={onResend}>
            {resending ? "Mengirim ulang…" : "Kirim Ulang"}
          </Button>
        </div>
      </div>
    </main>
  );
}
