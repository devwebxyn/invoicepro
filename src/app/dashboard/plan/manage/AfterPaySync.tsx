"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AfterPaySync() {
  const params = useSearchParams();
  const router = useRouter();
  const status = params.get("status");
  const ext = params.get("ext");

  React.useEffect(() => {
    if (status !== "success" || !ext) return;

    (async () => {
      try {
        const res = await fetch(`/api/billing/sync?ext=${encodeURIComponent(ext)}`, { cache: "no-store" });
        const j = await res.json();
        if (j.status === "PAID" || j.status === "SETTLED") {
          router.replace("/dashboard/plan/manage"); // buang query params
          router.refresh();                           // ambil profil terbaru
        }
      } catch {}
    })();
  }, [status, ext, router]);

  return null;
}
