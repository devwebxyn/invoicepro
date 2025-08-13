"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

type Tab = "invoice" | "receipt" | "payments";

export default function PreviewPane() {
  const [tab, setTab] = useState<Tab>("invoice");

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(["invoice","receipt","payments"] as Tab[]).map(t => (
          <button
            key={t}
            className="tab-btn"
            aria-selected={tab === t}
            onClick={() => setTab(t)}
          >
            {t === "invoice" ? "Preview Invoice" : t === "receipt" ? "Preview Receipt" : "Payments"}
          </button>
        ))}
      </div>

      <div className="preview-surface p-5">
        {tab === "invoice" && <InvoiceMock />}
        {tab === "receipt" && <ReceiptMock />}
        {tab === "payments" && <PaymentsMock />}
      </div>
    </div>
  );
}

function Row({label, value}:{label:string; value:string}) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-zinc-500">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

function InvoiceMock() {
  return (
    <div>
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs text-zinc-500">INVOICE</div>
          <div className="text-xl font-semibold">INV-20250811-0001</div>
        </div>
        <Badge>UNPAID</Badge>
      </div>
      <Separator className="my-4" />
      <Row label="Pelanggan" value="PT Pelanggan Jaya" />
      <Row label="Email" value="billing@pelanggan.co" />
      <Row label="Total" value="Rp 6.650.000" />
      <div className="mt-4 flex gap-2">
        <Button>Bayar Sekarang</Button>
        <Button variant="outline">Download PDF</Button>
      </div>
    </div>
  );
}

function ReceiptMock() {
  return (
    <div>
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs text-zinc-500">RECEIPT</div>
          <div className="text-xl font-semibold">INV-20250811-0001</div>
        </div>
        <Badge>PAID</Badge>
      </div>
      <Separator className="my-4" />
      <Row label="Metode" value="QRIS" />
      <Row label="Tanggal" value="11 Agu 2025 14:32" />
      <Row label="Total" value="Rp 6.650.000" />
      <div className="mt-4 flex gap-2">
        <Button variant="outline">Unduh Kwitansi</Button>
        <Button>Kirim via Email</Button>
      </div>
    </div>
  );
}

function PaymentsMock() {
  // Gunakan ovo.png agar logo OVO tampil
  const items = [
    "qris","bca","bni","bri","mandiri","ovo.png","dana","shopeepay","linkaja","gopay","visa","mastercard"
  ];
  // Mapping warna background kontras elegan per payment
  const bgMap: Record<string, string> = {
    qris: "bg-gradient-to-br from-[#f7b733] to-[#fc4a1a]",
    bca: "bg-[#0060af]",
    bni: "bg-[#f47b20]",
    bri: "bg-[#00529b]",
    mandiri: "bg-gradient-to-br from-[#ffe600] to-[#003399]",
    "ovo.png": "bg-gradient-to-br from-[#4e54c8] to-[#8f94fb]",
    dana: "bg-[#0096e0]",
    shopeepay: "bg-[#f53c2c]",
    linkaja: "bg-[#ee2737]",
    gopay: "bg-gradient-to-br from-[#00d2ff] to-[#3a7bd5]",
    visa: "bg-gradient-to-br from-[#1a1f71] to-[#ffffff]",
    mastercard: "bg-gradient-to-br from-[#ff512f] to-[#dd2476]",
  };
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
      {items.map((n) => {
        const isPng = n.endsWith('.png');
        const ext = isPng ? '' : '.svg';
        const src = n.includes('.') ? `/logos/${n}` : `/logos/${n}${ext}`;
        const bg = bgMap[n] || "bg-white dark:bg-zinc-900";
        return (
          <div key={n} className={`gborder p-3 flex items-center justify-center ${bg}`.trim()}>
            <img
              src={src}
              alt={n.replace('.png','')}
              className={`h-6 w-auto${isPng ? ' logo-png' : ''}`}
              style={{ filter: "none" }}
            />
          </div>
        );
      })}
    </div>
  );
}
