import { Card, CardContent } from "@/components/ui/card";
import { FileText, CreditCard } from "lucide-react";

export default function PDFandPayment() {
  return (
    <section className="grid md:grid-cols-2 gap-4">
      <Card className="card-2d">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="h-5 w-5" /><div className="font-medium">PDF Rendering</div>
          </div>
          <ul className="text-sm list-disc pl-5 space-y-1 text-zinc-700 dark:text-zinc-300">
            <li>Server-side render template → HTML → PDF (wk/Chromium).</li>
            <li>Embed font, bleed & margin untuk print rapi.</li>
            <li>Cache hash konten agar idempotent & cepat.</li>
          </ul>
        </CardContent>
      </Card>
      <Card className="card-2d">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <CreditCard className="h-5 w-5" /><div className="font-medium">Payment Flow (Xendit)</div>
          </div>
          <ul className="text-sm list-disc pl-5 space-y-1 text-zinc-700 dark:text-zinc-300">
            <li>Invoice → link bayar (QRIS/VA/eWallet/Kartu).</li>
            <li>Webhook signature → verifikasi → update status → kwitansi otomatis.</li>
            <li>Payout/withdraw via dashboard (mengandalkan Xendit API).</li>
          </ul>
        </CardContent>
      </Card>
    </section>
  );
}
