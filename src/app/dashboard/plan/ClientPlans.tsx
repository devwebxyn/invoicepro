"use client";
import * as React from "react";
import { PRICES, type Plan, type Interval } from "@/lib/plans";
import { useRouter, useSearchParams } from "next/navigation";
function AfterPaySync({ currentPlan }: { currentPlan: "free" | "pro" | "business" }) {
  const params = useSearchParams();
  const router = useRouter();
  const status = params.get("status");
  const ext = params.get("ext");

  React.useEffect(() => {
    // Sinkron kalau baru selesai bayar dan plan SEKARANG belum business
    const needSync = status === "success" && !!ext && currentPlan !== "business";
    if (!needSync) return;

    (async () => {
      try {
        // debug
        console.log("[sync] start", { ext, currentPlan });
        const res = await fetch(`/api/billing/sync?ext=${encodeURIComponent(ext!)}`, { cache: "no-store" });
        const j = await res.json();
        console.log("[sync] result", j);
        if (j.status === "PAID" || j.status === "SETTLED") {
          router.refresh(); // ambil profil terbaru dari server
        }
      } catch (e) {
        console.error("[sync] error", e);
      }
    })();
  }, [status, ext, currentPlan, router]);

  return null;
}

function Price({ amount }: { amount: number }) {
  return <span>Rp {amount.toLocaleString("id-ID")}</span>;
}

function Card(props: {
  title: string;
  desc: string;
  price: React.ReactNode;
  cta: string;
  onClick?: () => void;
  disabled?: boolean;
}) {
  const { title, desc, price, cta, onClick, disabled } = props;
  return (
    <div className="rounded-2xl border p-6 shadow-sm">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-zinc-500">{desc}</p>
      <div className="mt-6 text-3xl font-bold">{price}</div>
      <button
        onClick={onClick}
        disabled={disabled}
        className="mt-6 w-full rounded-xl bg-black px-4 py-2.5 text-white disabled:opacity-50 dark:bg-white dark:text-black"
      >
        {cta}
      </button>
    </div>
  );
}

function go(url: string) { window.location.href = url; }

function useCreateInvoice() {
  const [loading, setLoading] = React.useState(false);
  const create = async (plan: "pro" | "business", interval: Interval) => {
    setLoading(true);
    try {
      const res = await fetch("/api/billing/create-invoice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, interval }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Gagal membuat invoice");
      go(json.invoice_url);
    } finally {
      setLoading(false);
    }
  };
  return { create, loading };
}

export default function ClientPlans({ currentPlan }: { currentPlan: Plan }) {
  const [interval, setInterval] = React.useState<Interval>("monthly");
  const { create, loading } = useCreateInvoice();

  const Toggle = (
    <>
      <AfterPaySync currentPlan={currentPlan} />
      <div className="flex items-center gap-3">
        <span className={interval === "monthly" ? "font-semibold" : ""}>Bulanan</span>
        <button
          onClick={() => setInterval(interval === "monthly" ? "yearly" : "monthly")}
          className="h-6 w-11 rounded-full bg-zinc-200 relative"
          aria-label="toggle interval"
        >
          <span
            className={"absolute top-0.5 h-5 w-5 rounded-full bg-white transition " + (interval === "monthly" ? "left-0.5" : "left-5.5")}
          />
        </button>
        <span className={interval === "yearly" ? "font-semibold" : ""}>
          Tahunan <span className="ml-1 rounded bg-zinc-900 px-1.5 py-0.5 text-xs text-white">hemat 20%</span>
        </span>
      </div>
    </>
  );

  return (
    <div className="space-y-4">
      {Toggle}
      <div className="grid gap-4 md:grid-cols-3">
        <Card
          title="Starter"
          desc="Cukup untuk memulai. Cocok freelancer/UMKM."
          price={<span>Gratis</span>}
          cta={currentPlan === "free" ? "Aktif" : "Turun ke Free (manual)"}
          disabled
        />
        <Card
          title="Pro"
          desc="Fitur lengkap & otomatisasi."
          price={<Price amount={PRICES.pro[interval]} />}
          cta={currentPlan === "pro" ? "Sudah Pro" : "Mulai Pro"}
          onClick={currentPlan === "pro" || currentPlan === "business" ? undefined : () => create("pro", interval)}
          disabled={loading || currentPlan === "pro" || currentPlan === "business"}
        />
        <Card
          title="Business"
          desc="Skala tim & kebutuhan perusahaan."
          price={<Price amount={PRICES.business[interval]} />}
          cta={currentPlan === "business" ? "Sudah Business" : "Mulai Business"}
          onClick={currentPlan === "business" ? undefined : () => create("business", interval)}
          disabled={loading || currentPlan === "business"}
        />
      </div>
      <p className="text-xs text-zinc-500">
        Setelah bayar, status plan aktif otomatis saat webhook dari Xendit diterima.
      </p>
    </div>
  );
}
