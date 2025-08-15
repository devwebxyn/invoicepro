"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export default function DevSkills() {
  return (
    <section>
      <h2 className="text-2xl md:text-3xl font-semibold mb-4">Keahlian</h2>
      <Tabs defaultValue="frontend" className="w-full">
        <TabsList className="bg-transparent grid grid-cols-2 md:grid-cols-4 gap-2">
          <TabsTrigger value="frontend" className="rounded-full">Frontend</TabsTrigger>
          <TabsTrigger value="backend" className="rounded-full">Backend</TabsTrigger>
          <TabsTrigger value="database" className="rounded-full">Database</TabsTrigger>
          <TabsTrigger value="ops" className="rounded-full">DevOps</TabsTrigger>
        </TabsList>

        <TabsContent value="frontend" className="mt-6 card-2d p-6">
          <Pills items={["Next.js (App Router)", "React 19", "Tailwind v4", "shadcn/ui", "Framer Motion"]} />
        </TabsContent>
        <TabsContent value="backend" className="mt-6 card-2d p-6">
          <Pills items={["Node.js", "Server Actions", "API REST/Edge", "Webhook Security", "PDF Engine (Chromium)"]} />
        </TabsContent>
        <TabsContent value="database" className="mt-6 card-2d p-6">
          <Pills items={["Appwrite (DB/Auth/Storage)", "Index & Query", "Idempotent Jobs", "Audit Log"]} />
        </TabsContent>
        <TabsContent value="ops" className="mt-6 card-2d p-6">
          <Pills items={["Vercel Deploy", "Cloudflare (DNS/CDN/WAF)", "Monitoring p95", "Status WS/SSE"]} />
        </TabsContent>
      </Tabs>
    </section>
  );
}

function Pills({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((t) => (<Badge key={t} variant="secondary" className="rounded-full">{t}</Badge>))}
    </div>
  );
}
