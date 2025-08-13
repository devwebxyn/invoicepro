"use client";

import { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

export default function CostEstimator() {
  const [invoices, setInvoices] = useState(800);  // per bulan
  const [pdfPct, setPdfPct] = useState(70);       // % invoice yang diunduh PDF
  const [notif, setNotif] = useState(1200);       // email/bulan

  const result = useMemo(() => {
    // angka dummy: sesuaikan nanti
    const cdnPerGB = 8000; // Rp/GB
    const pdfPer100 = 3000; // Rp per 100 PDF render
    const emailPer1k = 10000; // Rp per 1000 email

    const pdfCount = Math.round(invoices * (pdfPct / 100));
    const pdfCost = Math.ceil(pdfCount / 100) * pdfPer100;

    const trafficGB = Math.max(1, Math.round((invoices * 0.2) / 100)); // perkiraan 200 KB/invoice
    const cdnCost = trafficGB * cdnPerGB;

    const emailCost = Math.ceil(notif / 1000) * emailPer1k;

    const total = pdfCost + cdnCost + emailCost;
    return { pdfCount, trafficGB, pdfCost, cdnCost, emailCost, total };
  }, [invoices, pdfPct, notif]);

  return (
    <Card className="card-2d">
      <CardContent className="p-6">
        <div className="font-medium mb-4">Estimasi Biaya Bulanan (perkiraan)</div>

        <div className="grid md:grid-cols-3 gap-6">
          <Control
            label={`Invoice / bulan: ${invoices.toLocaleString("id-ID")}`}
            value={invoices} min={100} max={10000} step={100}
            onChange={setInvoices}
          />
          <Control
            label={`% diunduh PDF: ${pdfPct}%`}
            value={pdfPct} min={0} max={100} step={5}
            onChange={setPdfPct}
          />
          <Control
            label={`Email notifikasi / bulan: ${notif.toLocaleString("id-ID")}`}
            value={notif} min={0} max={10000} step={100}
            onChange={setNotif}
          />
        </div>

        <div className="grid md:grid-cols-5 gap-4 text-sm mt-6">
          <Stat t="PDF render" v={`${result.pdfCount.toLocaleString("id-ID")}x`} s={`≈ Rp ${result.pdfCost.toLocaleString("id-ID")}`} />
          <Stat t="CDN traffic" v={`${result.trafficGB} GB`} s={`≈ Rp ${result.cdnCost.toLocaleString("id-ID")}`} />
          <Stat t="Email" v={`${notif.toLocaleString("id-ID")}x`} s={`≈ Rp ${result.emailCost.toLocaleString("id-ID")}`} />
          <Stat t="Lain-lain" v="—" s="tergantung provider" />
          <Stat t="Total Perkiraan" v={`Rp ${result.total.toLocaleString("id-ID")}`} s="*" />
        </div>

        <p className="text-xs text-zinc-500 mt-3">* Angka dummy untuk ilustrasi. Sesuaikan sesuai provider/kontrak.</p>
      </CardContent>
    </Card>
  );
}

function Control({
  label, value, min, max, step, onChange,
}: { label: string; value: number; min: number; max: number; step: number; onChange: (v:number)=>void }) {
  return (
    <div>
      <div className="text-sm mb-1">{label}</div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
      />
    </div>
  );
}

function Stat({ t, v, s }: { t: string; v: string; s?: string }) {
  return (
    <div className="gborder rounded-2xl p-4">
      <div className="text-xs text-zinc-500">{t}</div>
      <div className="text-lg font-semibold">{v}</div>
      {s && <div className="text-xs text-zinc-500 mt-0.5">{s}</div>}
    </div>
  );
}
