import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  FileText, CreditCard, ReceiptText, BarChart3, ShieldCheck, Plug,
  CheckCircle2, Rocket, CalendarClock
} from "lucide-react";

export const metadata = {
  title: "Tentang Web Ini • Invoice & Receipt Pro",
  description:
    "Platform untuk membuat invoice kelas perusahaan, terima pembayaran multi-channel, dan keluarkan PDF/kwitansi otomatis.",
};

function Stat({ k, v, s }: { k: string; v: string; s?: string }) {
  return (
    <div className="card-2d p-5">
      <div className="text-2xl font-semibold">{v}</div>
      <div className="text-sm text-zinc-500">{k}</div>
      {s ? <div className="mt-1 text-xs text-zinc-400">{s}</div> : null}
    </div>
  );
}

function Pillar({
  icon: Icon, title, children,
}: { icon: any; title: string; children: React.ReactNode }) {
  return (
    <Card className="card-2d h-full">
      <CardContent className="p-5">
        <div className="flex items-center gap-2">
          <Icon className="h-5 w-5" />
          <div className="font-medium">{title}</div>
        </div>
        <div className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">{children}</div>
      </CardContent>
    </Card>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs mr-2 mb-2">
      {children}
    </span>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl md:text-3xl font-semibold">{children}</h2>;
}

export default function About() {
  return (
    <>
      <Header />

      <main className="pb-20">
        {/* HERO */}
        <section className="relative">
          <div className="absolute inset-x-0 -top-4 h-56 bg-gradient-to-b from-indigo-500/10 to-transparent pointer-events-none" />
          <div className="mx-auto max-w-6xl px-4 py-12">
            <div className="inline-flex items-center gap-2 text-xs px-2 py-1 rounded-full border mb-4">
              Beta — Fokus Indonesia
            </div>
            <div className="grid md:grid-cols-2 gap-10 items-start">
              <div>
                <h1 className="text-3xl md:text-4xl font-semibold leading-tight">
                  Semua yang kamu butuhkan untuk menagih, menerima pembayaran, dan mengeluarkan PDF & kwitansi kelas perusahaan.
                </h1>
                <p className="mt-3 text-zinc-600 dark:text-zinc-400 max-w-prose">
                  Dibangun dengan Next.js + Appwrite + Xendit. Invoice elegan, pembayaran multi-channel,
                  kwitansi otomatis, notifikasi, dan dashboard ringkas—semua dalam satu web.
                </p>
                <div className="mt-6 flex gap-3">
                  <Button size="lg" asChild><a href="/invoices/new">Coba Buat Invoice</a></Button>
                  <Button size="lg" variant="outline" asChild><a href="/features">Lihat Fitur</a></Button>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <Stat k="Invoice terkirim" v="12.4K+" s="sejak awal pengujian" />
                <Stat k="Metode bayar" v="8+" s="QRIS · VA · eWallet · Kartu" />
                <Stat k="Uptime (30d)" v="99.9%" s="monitoring realtime" />
                <Stat k="Waktu buat invoice" v="< 30 dtk" s="isi & kirim" />
              </div>
            </div>
          </div>
        </section>

        {/* PILAR PRODUK */}
        <section className="mx-auto max-w-6xl px-4 py-12">
          <SectionTitle>Pilar Produk</SectionTitle>
          <div className="mt-6 grid md:grid-cols-3 gap-4">
            <Pillar icon={FileText} title="Invoice & PDF">
              Template PDF rapi, watermark halus, stempel status, mode print presisi, halaman publik
              invoice dengan QR ke pembayaran.
            </Pillar>
            <Pillar icon={CreditCard} title="Payments">
              Xendit: QRIS, VA bank besar, eWallet populer, & kartu. Tersedia URL bayar, deep link,
              dan status real-time.
            </Pillar>
            <Pillar icon={ReceiptText} title="Receipt & Notifikasi">
              Kwitansi otomatis pasca pembayaran. Email untuk sent / reminder / paid / overdue.
            </Pillar>
            <Pillar icon={BarChart3} title="Dashboard & Insight">
              KPI cepat, tren pemasukan, aktivitas terbaru, dan aksi kilat per-invoice.
            </Pillar>
            <Pillar icon={ShieldCheck} title="Security & Compliance">
              Webhook signature, WAF/CDN, audit log, dan izin yang minim (principle of least privilege).
            </Pillar>
            <Pillar icon={Plug} title="Integrasi">
              PDF engine, penyimpanan arsip, dan endpoint API ringan untuk otomatisasi internal.
            </Pillar>
          </div>
        </section>

        {/* HIGHLIGHTS */}
        <section className="mx-auto max-w-6xl px-4 py-12">
          <SectionTitle>Kenapa memilih kami?</SectionTitle>
          <div className="mt-6 grid md:grid-cols-3 gap-4">
            <Card className="card-2d">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 font-medium">
                  <CheckCircle2 className="h-5 w-5" /> UI 2D elegan & cepat
                </div>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                  Fokus keterbacaan, kontras, dan micro-interaction ringan yang tidak mengganggu alur kerja.
                </p>
              </CardContent>
            </Card>
            <Card className="card-2d">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 font-medium">
                  <ShieldCheck className="h-5 w-5" /> Aman secara default
                </div>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                  Validasi, signature webhook, dan pembatasan permintaan. Observability untuk audit.
                </p>
              </CardContent>
            </Card>
            <Card className="card-2d">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 font-medium">
                  <Rocket className="h-5 w-5" /> Siap skala bertahap
                </div>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                  Arsitektur modular—mulai kecil, tambah modul sesuai kebutuhan (invoice, receipt, notifikasi, dll).
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ROADMAP */}
        <section className="mx-auto max-w-6xl px-4 py-12">
          <SectionTitle>Roadmap Ringkas</SectionTitle>
          <div className="mt-6 grid md:grid-cols-2 gap-4">
            <Card className="card-2d">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 font-medium">
                  <CalendarClock className="h-5 w-5" /> Q3–Q4 2025
                </div>
                <ul className="mt-2 text-sm list-disc pl-5 space-y-1 text-zinc-600 dark:text-zinc-400">
                  <li>Template PDF kustom (brand/warna/logo) & versi multi-bahasa.</li>
                  <li>Multi user per akun & granular permission.</li>
                  <li>Export CSV/Excel & webhook event lebih kaya.</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="card-2d">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 font-medium">
                  <CalendarClock className="h-5 w-5" /> Q1 2026
                </div>
                <ul className="mt-2 text-sm list-disc pl-5 space-y-1 text-zinc-600 dark:text-zinc-400">
                  <li>Template builder visual untuk invoice/receipt.</li>
                  <li>Pengingat WhatsApp & SMS (opsional, berbasis integrasi lokal).</li>
                  <li>API publik untuk integrasi ERP/akuntansi.</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* STACK & INFRA */}
        <section className="mx-auto max-w-6xl px-4 py-12">
          <SectionTitle>Stack & Infrastruktur</SectionTitle>
          <div className="mt-4">
            <div className="text-sm text-zinc-500 mb-2">Teknologi utama:</div>
            <div className="flex flex-wrap">
              <Badge>Next.js</Badge>
              <Badge>React 19</Badge>
              <Badge>TypeScript</Badge>
              <Badge>Tailwind v4</Badge>
              <Badge>shadcn/ui</Badge>
              <Badge>Appwrite (DB/Auth/Storage)</Badge>
              <Badge>Xendit (QRIS/VA/eWallet/Kartu)</Badge>
              <Badge>Vercel</Badge>
              <Badge>Cloudflare (DNS/CDN/WAF)</Badge>
              <Badge>GitHub Actions</Badge>
            </div>
          </div>

          <div className="mt-6 grid md:grid-cols-2 gap-4">
            <Card className="card-2d">
              <CardContent className="p-5">
                <div className="font-medium">Arsitektur Singkat</div>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                  App Router untuk halaman publik & dashboard. Pembayaran via Xendit → webhook divalidasi
                  kemudian memperbarui status invoice & memicu pembuatan kwitansi PDF + notifikasi email.
                </p>
              </CardContent>
            </Card>
            <Card className="card-2d">
              <CardContent className="p-5">
                <div className="font-medium">Kepatuhan</div>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                  Separation of concerns, access minimal, audit trail, dan cache idempotent untuk rendering PDF.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto max-w-6xl px-4 py-12">
          <SectionTitle>FAQ Singkat</SectionTitle>
          <div className="mt-6 grid md:grid-cols-2 gap-4">
            <Card className="card-2d"><CardContent className="p-5">
              <div className="font-medium">Apakah bisa hanya user single (tanpa multi-role)?</div>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Bisa. Mode awal memang single user agar onboarding cepat.
              </p>
            </CardContent></Card>

            <Card className="card-2d"><CardContent className="p-5">
              <div className="font-medium">Withdraw dana langsung dari dashboard?</div>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Penarikan dilakukan melalui dashboard Xendit. Kita tampilkan saldo/settlement sebagai informasi.
              </p>
            </CardContent></Card>

            <Card className="card-2d"><CardContent className="p-5">
              <div className="font-medium">Support invoice sebelum & sesudah bayar?</div>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Ya, ada halaman publik invoice (pre-pay) dan receipt (post-pay) masing-masing dengan versi PDF.
              </p>
            </CardContent></Card>

            <Card className="card-2d"><CardContent className="p-5">
              <div className="font-medium">Bisa custom domain?</div>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Bisa. Gunakan CNAME ke deployment dan atur SSL otomatis.
              </p>
            </CardContent></Card>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-6xl px-4 py-12 text-center">
          <div className="inline-flex items-center gap-3 card-2d px-6 py-4">
            <span className="text-sm text-zinc-500">Siap mencoba?</span>
            <a href="/invoices/new"><Button size="lg">Buat Invoice Sekarang</Button></a>
          </div>
          <p className="text-xs text-zinc-500 mt-2">
            * Dukungan QRIS/VA/eWallet/Kartu melalui Xendit.
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
}
