"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type NodeKey = "next" | "cdn" | "appwrite" | "xendit" | "storage" | "email";

const NODE_META: Record<NodeKey, { title: string; desc: string }> = {
  next: { title: "Next.js App Router", desc: "SSR/ISR, API edge ringan, halaman publik invoice/receipt." },
  cdn: { title: "Edge CDN/WAF", desc: "Cache halaman publik & asset. WAF/rate-limit untuk keamanan dasar." },
  appwrite: { title: "Appwrite (DB/Auth/Storage)", desc: "Koleksi invoices/payments/receipts. Auth & file storage." },
  xendit: { title: "Xendit (Payments)", desc: "QRIS/VA/eWallet/Kartu. Webhook → update status pembayaran." },
  storage: { title: "PDF Engine + Storage", desc: "Render HTML→PDF (Chromium/wk), arsip, hash cache idempotent." },
  email: { title: "Email/Notification", desc: "Kirim invoice/receipt/reminder. Template & log pengiriman." },
};

function Node({
  x, y, id, label, onClick, active,
}: { x: number; y: number; id: NodeKey; label: string; onClick: (id: NodeKey)=>void; active: boolean }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <g
            className={cn("cursor-pointer transition", active ? "opacity-100" : "opacity-90 hover:opacity-100")}
            onClick={() => onClick(id)}
          >
            <rect x={x} y={y} rx={14} ry={14} width={200} height={60}
              className="fill-white dark:fill-zinc-900"
              style={{ filter: "drop-shadow(0 6px 18px rgba(0,0,0,.12))" }}
            />
            <rect x={x} y={y} rx={14} ry={14} width={200} height={60}
              className="pointer-events-none" stroke="rgba(0,0,0,.08)" />
            <text x={x+100} y={y+35} textAnchor="middle" className="fill-current"
              style={{ fontSize: 13, fontWeight: 600 }}>{label}</text>
          </g>
        </TooltipTrigger>
        <TooltipContent>{NODE_META[id].title}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

function Arrow({ x1, y1, x2, y2 }: {x1:number;y1:number;x2:number;y2:number}) {
  const id = Math.random().toString(36).slice(2);
  return (
    <g>
      <defs>
        <marker id={id} markerWidth="10" markerHeight="10" refX="6" refY="3" orient="auto" markerUnits="strokeWidth">
          <path d="M0,0 L0,6 L9,3 z" className="fill-current" />
        </marker>
      </defs>
      <line x1={x1} y1={y1} x2={x2} y2={y2}
        className="stroke-current"
        strokeOpacity="0.5"
        strokeWidth={2}
        markerEnd={`url(#${id})`}
      />
    </g>
  );
}

export default function ArchitectureDiagram() {
  const [open, setOpen] = useState<NodeKey | null>(null);

  return (
    <>
      <Card className="card-2d">
        <CardContent className="p-4 md:p-6">
          <div className="text-sm text-zinc-500 mb-2">Diagram Arsitektur</div>
          <div className="w-full overflow-x-auto rounded-xl bg-zinc-50 dark:bg-zinc-900">
            <svg viewBox="0 0 980 420" className="min-w-[680px] w-full h-auto text-zinc-700 dark:text-zinc-300">
              {/* Row atas */}
              <Node x={60}  y={40}  id="next"    label="Next.js App Router" onClick={setOpen} active={open==="next"} />
              <Node x={380} y={40}  id="cdn"     label="Edge CDN/WAF"      onClick={setOpen} active={open==="cdn"} />
              <Arrow x1={260} y1={70} x2={380} y2={70} />

              {/* Row tengah */}
              <Node x={60}  y={190} id="appwrite" label="Appwrite (DB/Auth)" onClick={setOpen} active={open==="appwrite"} />
              <Node x={380} y={190} id="storage"  label="PDF Engine + Storage" onClick={setOpen} active={open==="storage"} />
              <Node x={700} y={190} id="email"    label="Email/Notification" onClick={setOpen} active={open==="email"} />

              {/* Row bawah */}
              <Node x={700} y={340} id="xendit"   label="Xendit Payments" onClick={setOpen} active={open==="xendit"} />

              {/* Arrows */}
              <Arrow x1={460} y1={100} x2={460} y2={190} />   {/* CDN -> PDF */}
              <Arrow x1={160} y1={100} x2={160} y2={190} />   {/* Next -> Appwrite */}
              <Arrow x1={560} y1={220} x2={700} y2={220} />   {/* PDF -> Email */}
              <Arrow x1={780} y1={340} x2={780} y2={250} />   {/* Xendit -> Email (webhook→notif) */}
              <Arrow x1={700} y1={370} x2={580} y2={250} />   {/* Xendit -> PDF/Receipt */}
              <Arrow x1={260} y1={220} x2={380} y2={220} />   {/* DB -> PDF */}
              <Arrow x1={380} y1={70}  x2={260} y2={220} />   {/* CDN -> DB */}
            </svg>
          </div>
        </CardContent>
      </Card>

      {open && (
        <Dialog>
          <DialogContent>
          {open && (
            <>
              <DialogHeader>
                <DialogTitle>{NODE_META[open].title}</DialogTitle>
              </DialogHeader>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">{NODE_META[open].desc}</p>
            </>
          )}
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
