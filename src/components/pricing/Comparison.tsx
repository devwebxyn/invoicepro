import { Check, Minus } from "lucide-react";

const rows = [
  { k: "Invoice & Kwitansi PDF", s: true, p: true, b: true },
  { k: "Metode bayar lengkap (QRIS/VA/eWallet/Kartu)", s: true, p: true, b: true },
  { k: "Branding & warna kustom", s: false, p: true, b: true },
  { k: "Reminder otomatis & jadwal", s: false, p: true, b: true },
  { k: "Export batch PDF & CSV", s: false, p: true, b: true },
  { k: "Custom domain", s: false, p: false, b: true },
  { k: "Dukungan prioritas & SLA", s: false, p: false, b: true },
];

function Cell({ v }: { v: boolean }) {
  return <div className="flex justify-center">{v ? <Check className="h-4 w-4" /> : <Minus className="h-4 w-4 text-zinc-400" />}</div>;
}

export default function Comparison() {
  return (
    <div className="overflow-hidden rounded-2xl border">
      <div className="grid grid-cols-4 text-sm bg-zinc-50 dark:bg-zinc-900">
        <div className="p-3 font-medium">Fitur</div>
        <div className="p-3 font-medium text-center">Starter</div>
        <div className="p-3 font-medium text-center">Pro</div>
        <div className="p-3 font-medium text-center">Business</div>
      </div>
      <div className="divide-y">
        {rows.map((r) => (
          <div key={r.k} className="grid grid-cols-4 items-center">
            <div className="p-3">{r.k}</div>
            <div className="p-3"><Cell v={r.s} /></div>
            <div className="p-3"><Cell v={r.p} /></div>
            <div className="p-3"><Cell v={r.b} /></div>
          </div>
        ))}
      </div>
    </div>
  );
}
