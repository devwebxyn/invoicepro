import { Badge } from "@/components/ui/badge";

export default function InfraHero() {
  return (
    <section className="text-center py-10 md:py-14">
      <div className="inline-flex items-center gap-2 text-xs px-2 py-1 rounded-full border mb-4">
        <span>🛠️</span> <span>Desain Infrastruktur</span>
      </div>
      <h1 className="text-3xl md:text-4xl font-semibold">Arsitektur Modern. Aman. Skalabel.</h1>
      <p className="mt-3 text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
        Fokus performa & keamanan: edge cache, pembangkitan PDF yang presisi, pembayaran real-time, dan observability end-to-end.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
        <Badge className="rounded-full">Next.js App Router</Badge>
        <Badge className="rounded-full">Appwrite DB</Badge>
        <Badge className="rounded-full">Edge Cache/CDN</Badge>
        <Badge className="rounded-full">Xendit Payments</Badge>
        <Badge className="rounded-full">Queue + Webhook</Badge>
      </div>
    </section>
  );
}
