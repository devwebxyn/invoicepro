import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Pricing() {
  return (
    <section id="harga" className="mx-auto max-w-6xl px-4 py-16 md:py-24">
      <h2 className="text-2xl md:text-3xl font-semibold">Harga Sederhana</h2>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">Bayar seperlunya. Cocok untuk mulai.</p>
      <div className="mt-8 grid md:grid-cols-3 gap-6">
        {[
          { name: "Starter", price: "Gratis", desc: "Buat & kirim invoice, PDF, 20 invoice/bulan." },
          { name: "Pro", price: "Rp 99.000/bln", desc: "Tak terbatas, branding, export batch, reminder." },
          { name: "Business", price: "Hubungi Kami", desc: "Custom, SLA, dukungan prioritas." },
        ].map((p) => (
          <Card key={p.name}>
            <CardContent className="p-6">
              <div className="text-sm text-zinc-500">{p.name}</div>
              <div className="text-3xl font-semibold mt-1">{p.price}</div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">{p.desc}</p>
              <Button className="mt-6 w-full">Pilih {p.name}</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
