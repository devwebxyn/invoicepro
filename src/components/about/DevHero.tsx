"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function DevHero() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = Object.fromEntries(fd.entries());

    try {
      setLoading(true);
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data?.error || "Gagal mengirim.");
      toast.success("Terkirim! Saya akan balas secepatnya.");
      form.reset();
      setOpen(false);
    } catch (err: any) {
      toast.error(err.message || "Gagal mengirim formulir.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="py-10 md:py-14">
      <div className="inline-flex items-center gap-2 text-xs px-2 py-1 rounded-full border mb-4">
        <Sparkles className="h-4 w-4" />
        <span>Developers</span>
      </div>

      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        {/* Avatar sederhana */}
        <div className="h-20 w-20 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-white flex items-center justify-center text-2xl font-bold shadow">
          SI
        </div>

        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl font-semibold">Samuel Indra Bastian</h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400 max-w-2xl">
            Kelas XI EIA (Semester 2), Jurusan <span className="font-medium">Teknik Elektronika Industri</span>.
            Saat ini seorang <span className="font-medium">Full-stack Developer (mandiri)</span> yang fokus pada
            aplikasi <em>invoice & pembayaran</em> dengan UI/UX yang elegan, performa cepat, dan arsitektur modern.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Badge className="rounded-full">Next.js</Badge>
            <Badge className="rounded-full">Tailwind</Badge>
            <Badge className="rounded-full">shadcn/ui</Badge>
            <Badge className="rounded-full">Appwrite</Badge>
            <Badge className="rounded-full">Xendit API</Badge>
          </div>

          <div className="mt-6 flex gap-3">
            <Button size="lg" asChild>
              <Link href="https://www.samuelindrabastian.me/">Lihat Portofolio</Link>
            </Button>

            {/* Trigger buka dialog */}
            <Button size="lg" variant="outline" onClick={() => setOpen(true)}>
              Hubungi
            </Button>
          </div>
        </div>
      </div>

      {/* Dialog Contact */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Hubungi Samuel</DialogTitle>
            <DialogDescription>Isi form di bawah, pesan akan dikirim ke email Samuel.</DialogDescription>
          </DialogHeader>

          <form className="space-y-4" onSubmit={onSubmit}>
            {/* Honeypot anti-bot */}
            <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <Label htmlFor="name">Nama *</Label>
                <Input id="name" name="name" placeholder="Nama lengkap" required />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input id="email" name="email" type="email" placeholder="you@example.com" required />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <Label htmlFor="phone">No. HP (opsional)</Label>
                <Input id="phone" name="phone" placeholder="08xxxxxxxxxx" />
              </div>
              <div>
                <Label>Subjek</Label>
                <Select name="subject" defaultValue="General">
                  <SelectTrigger><SelectValue placeholder="Pilih subjek" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="General">General Inquiry</SelectItem>
                    <SelectItem value="Kerjasama">Kerjasama</SelectItem>
                    <SelectItem value="Bug Report">Bug Report</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="message">Pesan *</Label>
              <Textarea id="message" name="message" placeholder="Tulis detail kebutuhan kamu…" rows={5} required />
            </div>

            <DialogFooter className="gap-2">
              <Button type="button" variant="ghost" onClick={() => setOpen(false)}>Batal</Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Mengirim…" : "Kirim"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
}
