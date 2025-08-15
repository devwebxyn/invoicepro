"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function Onboarding() {
  const [username, setUsername] = useState("");
  const [ok, setOk] = useState<boolean | null>(null);
  const [reason, setReason] = useState("Fitur unik");
  const [rating, setRating] = useState(5);
  const [avatarUrl, setAvatarUrl] = useState<string>("");

  // cek username
  useEffect(() => {
    const id = setTimeout(async () => {
      if (!username) return setOk(null);
      const r = await fetch(`/api/onboarding/check-username?u=${encodeURIComponent(username)}`);
      const j = await r.json();
      setOk(j.available);
    }, 300);
    return () => clearTimeout(id);
  }, [username]);

  async function onUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    const fd = new FormData();
    fd.set("file", f);
    const r = await fetch("/api/onboarding/upload-avatar", { method: "POST", body: fd });
    const j = await r.json();
    if (j.ok) setAvatarUrl(j.url);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const fd = new FormData();
    fd.set("username", username);
    fd.set("reason", reason);
    fd.set("rating", String(rating));
    if (avatarUrl) fd.set("avatarUrl", avatarUrl);
    const r = await fetch("/api/onboarding/save", { method: "POST", body: fd });
    if (r.ok) location.href = "/dashboard";
  }

  return (
    <main className="mx-auto max-w-xl px-4 py-12">
      <h1 className="text-2xl font-semibold">Lengkapi Akun</h1>
      <form className="mt-6 space-y-5" onSubmit={submit}>
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-zinc-100 overflow-hidden">
            {avatarUrl ? <img src={avatarUrl} alt="avatar" className="h-full w-full object-cover" /> : null}
          </div>
          <label className="inline-flex items-center gap-2 text-sm">
            <input type="file" accept="image/*" onChange={onUpload} />
          </label>
        </div>

        <div>
          <label className="text-sm">Username</label>
          <input className="mt-1 w-full h-11 rounded-xl border px-4" value={username} onChange={e=>setUsername(e.target.value)} />
          {ok === true && <p className="text-xs text-green-600 mt-1">Username tersedia</p>}
          {ok === false && <p className="text-xs text-red-600 mt-1">Username sudah dipakai</p>}
        </div>

        <div>
          <label className="text-sm">Mengapa memilih kami?</label>
          <select className="mt-1 w-full h-11 rounded-xl border px-4" value={reason} onChange={e=>setReason(e.target.value)}>
            <option>Rekomendasi teman</option>
            <option>Fitur unik</option>
            <option>Kualitas layanan</option>
            <option>Harga terjangkau</option>
          </select>
        </div>

        <div>
          <label className="text-sm">Rating</label>
          <input type="range" min={1} max={5} value={rating} onChange={e=>setRating(Number(e.target.value))} className="w-full" />
          <div className="text-sm mt-1">{rating} / 5</div>
        </div>
        <Button className="w-full h-11" disabled={ok !== true}>Simpan & Lanjut</Button>
      </form>
    </main>
  );
}
