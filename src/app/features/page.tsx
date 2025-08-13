import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import FeatureSubnav from "@/components/feature/FeatureSubnav";
import ModulesGrid from "@/components/feature/ModulesGrid";
import PreviewPane from "@/components/feature/PreviewPane";
import ComparisonMatrix from "@/components/feature/ComparisonMatrix";
import SecurityCompliance from "@/components/feature/SecurityCompliance";
import IntegrationsGrid from "@/components/feature/IntegrationsGrid";
import UseCases from "@/components/feature/UseCases";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Fitur • Invoice & Receipt Pro",
  description:
    "UI mewah, lengkap: Invoice & PDF, pembayaran, kwitansi, notifikasi, dashboard.",
};

export default function FeaturesPage() {
  return (
    <>
      <Header />

      <main className="pb-20">
        <FeatureSubnav />

        {/* Overview */}
        <section id="overview" className="mx-auto max-w-6xl px-4 py-12 scroll-mt-24">
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div>
              <div className="inline-flex items-center text-xs px-2 py-1 rounded-full border mb-3">
                ✨ Fitur Lengkap
              </div>
              <h1 className="text-3xl md:text-4xl font-semibold leading-tight">
                Semua yang kamu butuhkan untuk menagih & menerima pembayaran.
              </h1>
              <p className="mt-3 text-zinc-600 dark:text-zinc-400 max-w-prose">
                Buat invoice profesional, terima pembayaran QRIS/VA/eWallet/Kartu,
                kwitansi otomatis, notifikasi, dan PDF yang enak dilihat.
              </p>
              <div className="mt-6 flex gap-3">
                <Button size="lg">
                  <a href="/invoices/new">Coba Buat Invoice</a>
                </Button>
                <Button size="lg" variant="outline">
                  <a href="/">Kembali</a>
                </Button>
              </div>
            </div>
            <PreviewPane />
          </div>

          <div className="mt-12">
            <ModulesGrid />
          </div>
        </section>

        {/* Invoice & PDF */}
        <section id="invoice" className="mx-auto max-w-6xl px-4 py-12 scroll-mt-24">
          <h2 className="text-2xl md:text-3xl font-semibold">Invoice & PDF</h2>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Template rapi, watermark halus, stempel status, dan mode print presisi.
          </p>
          <div className="mt-6 card-2d p-6">
            <img src="/hero-invoice-poster.webp" alt="Preview Invoice" className="w-full rounded-xl" />
          </div>
        </section>

        {/* Payments */}
        <section id="payments" className="mx-auto max-w-6xl px-4 py-12 scroll-mt-24">
          <h2 className="text-2xl md:text-3xl font-semibold">Payments</h2>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            QRIS, VA bank besar, eWallet populer, dan kartu.
          </p>
          <div className="mt-6">
            <IntegrationsGrid />
          </div>
        </section>

        {/* Notifikasi */}
        <section id="notify" className="mx-auto max-w-6xl px-4 py-12 scroll-mt-24">
          <h2 className="text-2xl md:text-3xl font-semibold">Notifikasi Otomatis</h2>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Email untuk sent, reminder H-1/H+1, paid, overdue — dengan tautan langsung.
          </p>
          <div className="mt-6 card-2d p-6">
            <ul className="list-disc pl-6 text-sm space-y-1">
              <li>Template yang bisa disesuaikan.</li>
              <li>Per-invoice atau mass reminder.</li>
              <li>Log pengiriman & status deliverability.</li>
            </ul>
          </div>
        </section>

        {/* Dashboard */}
        <section id="dashboard" className="mx-auto max-w-6xl px-4 py-12 scroll-mt-24">
          <h2 className="text-2xl md:text-3xl font-semibold">Dashboard Ringkas</h2>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            KPI cepat, tren pemasukan, aktivitas terbaru, dan aksi kilat.
          </p>
          <div className="mt-6 card-2d p-6">
            <img src="https://picsum.photos/1200/640?grayscale" alt="Preview Dashboard" className="w-full rounded-xl" />
          </div>
        </section>

        {/* Security */}
        <section id="security" className="mx-auto max-w-6xl px-4 py-12 scroll-mt-24">
          <h2 className="text-2xl md:text-3xl font-semibold">Keamanan & Kepatuhan</h2>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">Dari jaringan hingga webhook signature.</p>
          <div className="mt-6">
            <SecurityCompliance />
          </div>
        </section>

        {/* Integrations */}
        <section id="integrations" className="mx-auto max-w-6xl px-4 py-12 scroll-mt-24">
          <h2 className="text-2xl md:text-3xl font-semibold">Integrasi</h2>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">Pembayaran populer & siap dipakai.</p>
          <div className="mt-6">
            <IntegrationsGrid />
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="mx-auto max-w-6xl px-4 py-12 scroll-mt-24">
          <h2 className="text-2xl md:text-3xl font-semibold">Paket & Perbandingan</h2>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Pilih sesuai kebutuhan — bisa mulai gratis.
          </p>
          <div className="mt-6">
            <ComparisonMatrix />
          </div>
        </section>

        {/* Use cases */}
        <section className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-2xl md:text-3xl font-semibold">Cocok untuk</h2>
          <div className="mt-6">
            <UseCases />
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <div className="inline-flex items-center gap-3 card-2d px-6 py-4">
            <span className="text-sm text-zinc-500">Siap mencoba?</span>
            <Button size="lg">
              <a href="/invoices/new">Buat Invoice Sekarang</a>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
