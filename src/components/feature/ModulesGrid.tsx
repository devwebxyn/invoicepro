import { FileText, CreditCard, ReceiptText, BellRing, BarChart3, Download } from "lucide-react";

const items = [
  { icon: FileText, title: "Invoice", desc: "Template PDF kelas perusahaan dengan watermark halus." },
  { icon: ReceiptText, title: "Receipt", desc: "Kwitansi otomatis pasca pembayaran." },
  { icon: CreditCard, title: "Pembayaran", desc: "QRIS, VA (BCA/BNI/BRI/Mandiri), eWallet, kartu." },
  { icon: BellRing, title: "Notifikasi", desc: "Email otomatis: sent, reminder, paid, overdue." },
  { icon: BarChart3, title: "Dashboard", desc: "KPI, tren pemasukan, aktivitas terbaru." },
  { icon: Download, title: "Export", desc: "Unduh batch PDF & CSV, filter tanggal/status." },
];

export default function ModulesGrid() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {items.map((m) => (
        <div key={m.title} className="card-2d p-6 group">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center">
              <m.icon className="h-5 w-5" />
            </div>
            <div className="font-medium">{m.title}</div>
          </div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">{m.desc}</p>
          <div className="mt-4 text-xs text-zinc-500 opacity-0 group-hover:opacity-100 transition">
            Detail lengkap & demo di bawah.
          </div>
        </div>
      ))}
    </div>
  );
}
