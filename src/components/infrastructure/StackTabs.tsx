"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "@/components/ui/badge";

export default function StackTabs() {
  return (
    <Tabs defaultValue="compute" className="w-full">
      <TabsList className="grid sm:grid-cols-3 md:grid-cols-6 gap-3 bg-transparent">
        {[
          ["compute","Compute"],
          ["data","Database/Storage"],
          ["queue","Queue/Webhook"],
          ["cdn","CDN & Cache"],
          ["obs","Observability"],
          ["security","Security"],
        ].map(([v,l]) => (
          <TabsTrigger key={v} value={v} className="rounded-full">{l}</TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value="compute" className="mt-6 card-2d p-6 text-sm">
        <ul className="list-disc pl-5 space-y-1">
          <li>Next.js App Router (SSR/ISR), edge runtime untuk API ringan.</li>
          <li>Server Actions untuk operasi aman (terproteksi).</li>
          <li>Worker ringan untuk render PDF & email.</li>
        </ul>
      </TabsContent>

      <TabsContent value="data" className="mt-6 card-2d p-6 text-sm">
        <ul className="list-disc pl-5 space-y-1">
          <li>Appwrite: koleksi <Badge>invoices</Badge>, <Badge>payments</Badge>, <Badge>receipts</Badge>.</li>
          <li>Storage Appwrite untuk arsip PDF.</li>
          <li>Index untuk pencarian invoice cepat.</li>
        </ul>
      </TabsContent>

      <TabsContent value="queue" className="mt-6 card-2d p-6 text-sm">
        <ul className="list-disc pl-5 space-y-1">
          <li>Event: invoice.created → generate PDF → kirim email.</li>
          <li>Webhook: Xendit callback → verifikasi signature → update status.</li>
          <li>Retry & dead-letter untuk kegagalan.</li>
        </ul>
      </TabsContent>

      <TabsContent value="cdn" className="mt-6 card-2d p-6 text-sm">
        <ul className="list-disc pl-5 space-y-1">
          <li>Edge cache untuk halaman publik invoice (tanpa data privat).</li>
          <li>Asset image/video lewat CDN global.</li>
          <li>Rate-limit & WAF rules dasar.</li>
        </ul>
      </TabsContent>

      <TabsContent value="obs" className="mt-6 card-2d p-6 text-sm">
        <ul className="list-disc pl-5 space-y-1">
          <li>Uptime monitor & alerting (HTTP health, latency, error rate).</li>
          <li>Log terstruktur (request id, user id scrubbing).</li>
          <li>Dashboard metrik: p95 latency, throughput, kegagalan webhook.</li>
        </ul>
      </TabsContent>

      <TabsContent value="security" className="mt-6 card-2d p-6 text-sm">
        <ul className="list-disc pl-5 space-y-1">
          <li>Auth via Appwrite; scopes per resource.</li>
          <li>Encryption in-transit (TLS 1.3), at-rest mengikuti provider.</li>
          <li>Header keamanan: HSTS, CSP ketat, COOP/COEP untuk PDF viewer.</li>
        </ul>
      </TabsContent>
    </Tabs>
  );
}
