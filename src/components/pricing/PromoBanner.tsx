"use client";

import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

type Plans = "starter" | "pro" | "business";
type PromoStatus = {
  endsAt: string;
  updatedAt: string;
  plans: Record<Plans, { discountPercent: number; slotsTotal: number; slotsLeft: number }>;
};

function usePromoStatus(intervalMs = 20000) {
  const [data, setData] = useState<PromoStatus | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    try {
      const res = await fetch("/api/promo/status", { cache: "no-store" });
      if (!res.ok) throw new Error(await res.text());
      const json = (await res.json()) as PromoStatus;
      setData(json);
      setError(null);
      (window as any).__promoStatus = json;
    } catch (e: any) {
      setError(e?.message ?? "Failed load promo");
    }
  }

  useEffect(() => {
    load();
    const id = setInterval(load, intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);

  return { data, error };
}

function formatRemaining(targetISO: string) {
  const target = new Date(targetISO).getTime();
  const now = Date.now();
  const diff = Math.max(0, target - now);
  const d = Math.floor(diff / (24 * 3600_000));
  const h = Math.floor((diff % (24 * 3600_000)) / 3600_000);
  const m = Math.floor((diff % 3600_000) / 60_000);
  const s = Math.floor((diff % 60_000) / 1000);
  const pad = (n: number) => n.toString().padStart(2, "0");
  return { d, h, m, s, label: d > 0 ? `${d}h ${pad(h)}j ${pad(m)}m` : `${pad(h)}:${pad(m)}:${pad(s)}` };
}

export default function PromoBanner({
  className,
}: { className?: string }) {
  const { data, error } = usePromoStatus(20000);
  const remain = useMemo(() => data ? formatRemaining(data.endsAt) : null, [data]);

  if (error) {
    // gagal fetch → jangan tampilkan apa-apa biar bersih
    return null;
  }

  return (
    <div className={cn(
      "rounded-2xl px-4 py-3 text-sm md:text-base",
      "bg-gradient-to-r from-indigo-600 to-violet-600 text-white",
      "flex items-center justify-center gap-2 md:gap-3",
      className
    )}>
      <span className="hidden sm:inline">🎉 Promo Tahunan</span>
      {data ? (
        <>
          <span className="font-medium">Pro {data.plans.pro.discountPercent}% &nbsp;•&nbsp; Business {data.plans.business.discountPercent}%</span>
          <span className="opacity-80">berakhir dalam</span>
          <span className="inline-flex items-center font-semibold bg-white/15 rounded-full px-2 py-0.5">
            {remain?.label}
          </span>
          <span className="opacity-80 hidden md:inline">— update {new Date(data.updatedAt).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })} WIB</span>
        </>
      ) : (
        <span className="opacity-90">Memuat promo…</span>
      )}
    </div>
  );
}

// re-export type untuk dipakai di page
export type { PromoStatus };
