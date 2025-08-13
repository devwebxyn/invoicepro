
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import HeroMock from "@/components/marketing/HeroMock";

export default function Hero() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-6xl px-4 py-20 md:py-28 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <Badge variant="secondary" className="mb-4">Beta — Fokus Indonesia</Badge>
          <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
            Buat Invoice Kelas Perusahaan. <br /> Terima Pembayaran Lebih Cepat.
          </h1>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400">
            Kirim invoice profesional, bayar via Xendit (QRIS/VA/eWallet), kwitansi otomatis & PDF siap arsip.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/invoices/new"><Button size="lg">Buat Invoice Sekarang</Button></Link>
            <a href="/features"><Button variant="outline" size="lg">Lihat Fitur <ArrowRight className="ml-1 h-4 w-4" /></Button></a>
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          <HeroMock />
          <div className="absolute -bottom-8 -left-8 blur-2xl opacity-30 w-40 h-40 bg-gradient-to-tr from-indigo-500 to-violet-500 rounded-full" />
        </div>
      </div>
    </section>
  );
}
