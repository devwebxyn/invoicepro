"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const RULES = `# Edge rules (pseudo)
# Cache halaman publik invoice & receipt (tanpa cookie)
/i/:id  -> Cache-Control: public, s-maxage=300, stale-while-revalidate=60
/r/:id  -> Cache-Control: public, s-maxage=300, stale-while-revalidate=60

# Bypass cache untuk API & dashboard
/api/*  -> Cache-Control: no-store
/app/*  -> Cache-Control: private, no-store

# Proteksi dasar
- WAF: block SQLi/XSS patterns, rate-limit POST /api/payments/webhook
- CORS ketat: hanya origin produksi
- TLS 1.3, HSTS, CSP ketat
`;

export default function EdgeRules() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(RULES);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <Card className="card-2d">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="font-medium">Aturan Edge/CDN</div>
          <Button variant="outline" size="sm" onClick={copy}>{copied ? "Tersalin ✓" : "Salin"}</Button>
        </div>
        <pre className="mt-3 text-xs bg-zinc-950 text-zinc-100 p-4 rounded-xl overflow-x-auto">
{RULES}
        </pre>
      </CardContent>
    </Card>
  );
}
