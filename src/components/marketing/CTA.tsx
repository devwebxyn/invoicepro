"use client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="rounded-2xl border p-8 text-center">
        <h3 className="text-xl md:text-2xl font-semibold">Siap mulai?</h3>
        <p className="text-zinc-600 dark:text-zinc-400 mt-2">Buat invoice pertama kamu sekarang.</p>
        <div className="mt-4 flex gap-3 justify-center">
          <Link href="/invoices/new"><Button size="lg">Mulai Gratis</Button></Link>
          <Button size="lg" variant="outline" onClick={() => toast.success("Demo diaktifkan!")}>Lihat Demo</Button>
        </div>
      </div>
    </section>
  );
}
