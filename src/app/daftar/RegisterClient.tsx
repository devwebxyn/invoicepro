"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function RegisterClient() {
  const r = useRouter();
  const [form, setForm] = useState({ name:"", email:"", password:"", confirm:"", agree:false });
  const [submitting, setSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  const pushLog = (s: string) => setLogs((p) => [...p, s].slice(-6));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.agree) return toast.info("Centang persetujuan terlebih dahulu.");
    if (form.password !== form.confirm) return toast.error("Konfirmasi password tidak sama.");
    setSubmitting(true); setProgress(0); setLogs([]);

    // progress anim 30 detik
    const started = Date.now();
    const timer = setInterval(() => {
      const pct = Math.min(99, Math.round(((Date.now() - started) / 30000) * 100));
      setProgress(pct);
    }, 300);

    try {
      pushLog("Membuat akun…");
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type":"application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
      });

      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.message || "Gagal membuat akun");
      }

      pushLog("Mengirim OTP via email…");
      pushLog("Menunggu verifikasi…");

      setProgress(100);
      toast.success("Akun dibuat. Cek email untuk OTP!");
      clearInterval(timer);

      // arahkan ke halaman OTP
      r.push(`/verifikasi-otp?uid=${data.userId}&email=${encodeURIComponent(form.email)}`);
    } catch (err: any) {
      clearInterval(timer);
      setProgress(0);
      toast.error(err.message || "Terjadi kesalahan.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input className="w-full rounded-xl border p-3" placeholder="Nama lengkap"
        value={form.name} onChange={e=>setForm({...form, name:e.target.value})} />
      <input className="w-full rounded-xl border p-3" placeholder="Email"
        type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} />
      <input className="w-full rounded-xl border p-3" placeholder="Kata sandi"
        type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} />
      <input className="w-full rounded-xl border p-3" placeholder="Ulangi kata sandi"
        type="password" value={form.confirm} onChange={e=>setForm({...form, confirm:e.target.value})} />
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={form.agree} onChange={e=>setForm({...form, agree: e.target.checked})} />
        Saya menyetujui Ketentuan & Kebijakan Privasi.
      </label>

      <Button disabled={submitting} className="w-full h-12">{submitting ? "Memproses…" : "Buat Akun"}</Button>

      {submitting && (
        <div className="rounded-xl border p-3 space-y-2">
          <div className="text-sm font-medium">Verifikasi akun (maks 30 detik)…</div>
          <div className="h-2 w-full rounded bg-zinc-100 overflow-hidden">
            <div className="h-2 bg-black dark:bg-white" style={{ width:`${progress}%`, transition:"width .2s" }} />
          </div>
          <ul className="text-xs text-zinc-500 list-disc pl-4">
            {logs.map((l,i)=><li key={i}>{l}</li>)}
          </ul>
        </div>
      )}
    </form>
  );
}
