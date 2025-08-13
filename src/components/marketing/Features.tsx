import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, CreditCard, Shield, Clock, ReceiptText, Zap } from "lucide-react";

const data = [
  { icon: FileText, title: "Invoice & Receipt PDF", desc: "Template bergaya perusahaan, siap cetak & kirim." },
  { icon: CreditCard, title: "Bayar via Xendit", desc: "QRIS, VA, eWallet, kartu—tinggal klik." },
  { icon: ReceiptText, title: "Kwitansi Otomatis", desc: "Aktif setelah pembayaran, link publik & PDF." },
  { icon: Clock, title: "Reminder & Overdue", desc: "Ingatkan jatuh tempo via email/WA." },
  { icon: Shield, title: "Keamanan", desc: "Best practice web modern & compliance gateway." },
  { icon: Zap, title: "Cepat & Ringan", desc: "UI responsif, dark mode siap." },
];

export default function Features() {
  return (
    <section id="fitur" className="mx-auto max-w-6xl px-4 py-16 md:py-24">
      <div className="flex items-baseline justify-between">
        <h2 className="text-2xl md:text-3xl font-semibold">Fitur Utama</h2>
        <Badge variant="secondary">V1</Badge>
      </div>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">Semua yang kamu butuhkan untuk menagih & menerima pembayaran.</p>
      <div className="mt-8 grid md:grid-cols-3 gap-6">
        {data.map((f, i) => (
          <Card key={i} className="hover:shadow-lg transition">
            <CardContent className="p-6">
              <div className="h-10 w-10 rounded-xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center mb-4">
                <f.icon className="h-5 w-5" />
              </div>
              <div className="font-medium">{f.title}</div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">{f.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
