"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import PricingToggle from "@/components/pricing/PricingToggle";
import { usePromoLive } from "@/hooks/usePromoLive";
import PriceCard, { type Billing } from "@/components/pricing/PriceCard";
import PromoBanner, { type PromoStatus } from "@/components/pricing/PromoBanner";
import AddonsGrid from "@/components/pricing/AddonsGrid";
import Comparison from "@/components/pricing/Comparison";
import PricingFAQ from "@/components/pricing/PricingFAQ";

import { Button } from "@/components/ui/button";
import IntegrationsGrid from "@/components/feature/IntegrationsGrid";


  export default function BerlanggananPage() {
    const [billing, setBilling] = useState<Billing>("monthly");
  
    // Ambil data promo dari window jika sudah di-fetch oleh PromoBanner
    const promo: PromoStatus | null =
      typeof window !== "undefined" && (window as any).__promoStatus
        ? (window as any).__promoStatus as PromoStatus
        : null;
  
    const pro = promo?.plans.pro;
    const business = promo?.plans.business;
  const live = usePromoLive();
  const endsAt = live?.endsAt;
  
    return (
      <>
        <Header />

      <main className="mx-auto max-w-6xl px-4 py-12 space-y-16">
        {/* Banner promo countdown */}
        <PromoBanner />

        {/* Hero */}
        <section className="text-center">
          <div className="inline-flex items-center text-xs px-2 py-1 rounded-full border mb-4">💎 Paket Premium</div>
          <h1 className="text-3xl md:text-4xl font-semibold">Berlangganan yang Sederhana & Transparan.</h1>
          <p className="mt-3 text-zinc-600 dark:text-zinc-400">
            Mulai gratis, upgrade kapan saja. Bayar bulanan atau hemat dengan tahunan.
          </p>
          <div className="mt-6 flex items-center justify-center">
            <PricingToggle value={billing} onChange={setBilling} />
          </div>
        </section>

        {/* Cards */}
        <section className="grid md:grid-cols-3 gap-6 items-stretch">
          <PriceCard
            name="Starter"
            desc="Cukup untuk memulai. Cocok freelancer/UMKM."
            priceMonthly={0}
            priceYearly={0}
            features={[
              "Invoice & Kwitansi PDF",
              "Metode bayar populer",
              "Link publik invoicemu",
              "5 invoice/bulan",
            ]}
            ctaHref="/signup?plan=starter"
            billing={billing}
            endsAt={endsAt}
          />

          <PriceCard
            name="Pro"
            desc="Fitur lengkap & otomatisasi."
            priceMonthly={99000}
            priceYearly={950000}
            discountPercent={pro?.discountPercent ?? 20}
            features={[
              "Tak terbatas invoice",
              "Reminder otomatis",
              "Export PDF & CSV",
              "Branding sederhana",
            ]}
            ctaHref="/signup?plan=pro"
            popular
            billing={billing}
            className="ring-1 ring-indigo-500/20"
            slotsTotal={pro?.slotsTotal ?? 100}
            slotsLeft={pro?.slotsLeft ?? 18}
            endsAt={endsAt}
          />

          <PriceCard
            name="Business"
            desc="Skala tim & kebutuhan perusahaan."
            priceMonthly={249000}
            priceYearly={2390000}
            discountPercent={business?.discountPercent ?? 25}
            features={[
              "Custom domain",
              "Template PDF kustom",
              "SLA & dukungan prioritas",
              "Webhook & audit log",
            ]}
            ctaHref="/contact-sales"
            billing={billing}
            slotsTotal={business?.slotsTotal ?? 50}
            slotsLeft={business?.slotsLeft ?? 7}
            endsAt={endsAt}
          />
        </section>

        {/* Benefit Bar */}
        <section className="card-2d p-6 grid md:grid-cols-3 gap-6 text-sm">
          <div><span className="font-medium">Garansi 7 hari uang kembali</span> — tanpa pertanyaan.</div>
          <div><span className="font-medium">Tidak ada biaya tersembunyi</span> — transparan & jelas.</div>
          <div><span className="font-medium">Keamanan kelas enterprise</span> — enkripsi & praktik terbaik.</div>
        </section>

        {/* Integrations / Payment Logos */}
        <section>
          <h2 className="text-2xl md:text-3xl font-semibold text-center">Metode Pembayaran Didukung</h2>
          <p className="mt-2 text-center text-zinc-600 dark:text-zinc-400">QRIS, VA bank besar, eWallet & kartu.</p>
          <div className="mt-6">
            <IntegrationsGrid />
          </div>
        </section>

        {/* Add-ons */}
        <section>
          <h2 className="text-2xl md:text-3xl font-semibold">Add-ons</h2>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">Tambah kemampuan sesuai kebutuhan.</p>
          <div className="mt-6"><AddonsGrid /></div>
        </section>

        {/* Comparison */}
        <section>
          <h2 className="text-2xl md:text-3xl font-semibold">Perbandingan Paket</h2>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">Lihat perbedaan fitur tiap paket.</p>
          <div className="mt-6"><Comparison /></div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-2xl md:text-3xl font-semibold">Pertanyaan Umum</h2>
          <div className="mt-4"><PricingFAQ /></div>
        </section>

        {/* CTA akhir */}
        <section className="text-center">
          <div className="inline-flex items-center gap-3 card-2d px-6 py-4">
            <span className="text-sm text-zinc-500">Siap mulai?</span>
            <Button size="lg"><a href="/signup?plan=pro">Mulai Pro Sekarang</a></Button>
            <Button size="lg" variant="outline"><a href="/contact-sales">Hubungi Sales</a></Button>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
