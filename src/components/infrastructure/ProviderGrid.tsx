import { Card, CardContent } from "@/components/ui/card";

const items = [
  { name: "Appwrite", role: "Database, Auth, Storage", logo: "/logos/appwrite.svg" },
  { name: "Vercel", role: "Hosting Next.js & Edge", logo: "/logos/vercel.svg" },
  { name: "Heroku", role: "Backend service providers", logo: "/logos/heroku.svg" },
  { name: "Cloudflare", role: "DNS, CDN, WAF", logo: "/logos/cloudflare.svg" },
  { name: "Xendit", role: "Payments (QRIS/VA/eWallet/Card)", logo: "/logos/xendit.svg" },
];

export default function ProviderGrid() {
  return (
    <section className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
      {items.map((p) => (
        <Card key={p.name} className="card-2d">
          <CardContent className="p-4 flex items-center gap-3">
            <img src={p.logo} alt={p.name} className="h-6 w-auto" />
            <div className="min-w-0">
              <div className="font-medium">{p.name}</div>
              <div className="text-xs text-zinc-500 truncate">{p.role}</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
