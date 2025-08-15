"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Activity, Gauge, ShieldCheck, Server, Database, HardDrive, Globe2,
  MailCheck, CreditCard, FileText
} from "lucide-react";

/* ========================= Live sources (WS → SSE → HTTP) ========================= */

type Summary = { updatedAt: string; uptime30d: number; p95: number; errorRate: number };

function useStatusLive() {
  const [data, setData] = useState<Summary | null>(null);
  useEffect(() => {
    let ws: WebSocket | null = null;
    let es: EventSource | null = null;
    let stop = false;

    const connectHTTP = async () => {
      try {
        const res = await fetch("/api/status/summary", { cache: "no-store" });
        if (res.ok) setData(await res.json());
      } finally {
        if (!stop) setTimeout(connectHTTP, 1000);
      }
    };

    const connectSSE = () => {
      es = new EventSource("/api/status/sse");
      es.onmessage = (e) => setData(JSON.parse(e.data));
      es.onerror = () => { es?.close(); if (!stop) setTimeout(connectHTTP, 2000); };
    };

    const connectWS = () => {
      try {
        const proto = location.protocol === "https:" ? "wss" : "ws";
        ws = new WebSocket(`${proto}://${location.host}/api/status/ws`);
        ws.onmessage = (e) => setData(JSON.parse(e.data));
        ws.onerror = () => { ws?.close(); !stop && connectSSE(); };
        ws.onclose  = () => { !stop && connectSSE(); };
      } catch {
        connectSSE();
      }
    };

    connectWS();
    return () => { stop = true; ws?.close(); es?.close(); };
  }, []);
  return data;
}

/* ========================= utils & hooks ========================= */

type Range = { min: number; max: number };
const clamp = (n: number, a: number, b: number) => Math.min(b, Math.max(a, n));
const lerp  = (a: number, b: number, t: number) => a + (b - a) * t;

function useRealtime(base: number, range: Range, noise = 0.35, tickMs = 1000) {
  const [v, setV] = useState(base);
  useEffect(() => {
    let x = base;
    const id = setInterval(() => {
      const drift = (base - x) * 0.08;
      const n = (Math.random() - 0.5) * noise;
      x = clamp(x + drift + n, range.min, range.max);
      setV(x);
    }, tickMs);
    return () => clearInterval(id);
  }, [base, range.min, range.max, noise, tickMs]);
  useEffect(() => setV((p) => lerp(p, clamp(base, range.min, range.max), 0.2)), [base, range.min, range.max]);
  return v;
}

/* ========================= Sparkline (canvas) ========================= */

function Sparkline({ points, range, tint, fill = 0.14 }: { points: number[]; range: Range; tint: string; fill?: number }) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const dpr = Math.max(1, window.devicePixelRatio || 1);
    const parent = el.parentElement!; const w = parent.clientWidth; const h = 120;
    el.width = Math.floor(w * dpr); el.height = Math.floor(h * dpr);
    el.style.width = w + "px"; el.style.height = h + "px";
    const ctx = el.getContext("2d")!; ctx.scale(dpr, dpr); ctx.clearRect(0,0,w,h);

    const mapY = (val: number) => {
      const t = (val - range.min) / (range.max - range.min || 1);
      return clamp(h - t * (h - 18) - 6, 6, h - 6);
    };
    const padL = 6, padR = 6, n = points.length;
    if (n < 2) return;
    const stepX = (w - padL - padR) / (n - 1);

    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, tint);
    grad.addColorStop(1, "transparent");

    ctx.lineWidth = 2; ctx.strokeStyle = tint; ctx.beginPath();
    ctx.moveTo(padL, mapY(points[0]));
    for (let i = 1; i < n; i++) ctx.lineTo(padL + i*stepX, mapY(points[i]));
    ctx.stroke();

    ctx.lineTo(padL + (n-1)*stepX, h); ctx.lineTo(padL, h); ctx.closePath();
    ctx.globalAlpha = fill; ctx.fillStyle = grad; ctx.fill(); ctx.globalAlpha = 1;

    ctx.strokeStyle = "rgba(0,0,0,.06)"; ctx.lineWidth = 1;
    for (let i=1;i<=3;i++){ const y = Math.round((h/4)*i)+0.5; ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(w,y); ctx.stroke(); }
  }, [points, range, tint, fill]);
  return <canvas ref={ref} />;
}

/* ========================= Ring Gauge (SVG) ========================= */

function RingGauge({ value, min, max, label, tint = "#6366f1" }:{
  value: number; min: number; max: number; label: string; tint?: string;
}) {
  const pct = clamp((value - min) / (max - min || 1), 0, 1);
  const size = 160, stroke = 12, r = (size - stroke) / 2, c = 2 * Math.PI * r;
  const dash = c * pct;
  return (
    <div className="flex items-center gap-4">
      <svg width={size} height={size} className="shrink-0">
        <circle cx={size/2} cy={size/2} r={r} stroke="rgba(0,0,0,.08)" strokeWidth={stroke} fill="none"/>
        <circle cx={size/2} cy={size/2} r={r} stroke={tint} strokeWidth={stroke} fill="none"
                strokeDasharray={`${dash} ${c-dash}`} strokeLinecap="round"
                transform={`rotate(-90 ${size/2} ${size/2})`} />
        <text x="50%" y="48%" dominantBaseline="middle" textAnchor="middle"
              style={{ fontSize: 22, fontWeight: 700 }}>{Math.round(pct*100)}%</text>
        <text x="50%" y="64%" dominantBaseline="middle" textAnchor="middle"
              style={{ fontSize: 11, fill: "rgba(0,0,0,.55)" }}>{label}</text>
      </svg>
      <div className="text-sm text-zinc-500">
        <div>Min: {min}</div>
        <div>Max: {max}</div>
        <div>Now: <span className="font-semibold text-zinc-900 dark:text-zinc-100">
          {value.toFixed(1)}
        </span></div>
      </div>
    </div>
  );
}

/* ========================= Level helpers ========================= */

type Level = "ok" | "warn" | "crit";
function metricLevel(kind: "uptime" | "p95" | "error", val: number): Level {
  if (kind === "uptime") return val < 99.6 ? "crit" : val < 99.8 ? "warn" : "ok";
  if (kind === "p95")   return val > 480   ? "crit" : val > 400   ? "warn" : "ok";
  return val > 1.5 ? "crit" : val > 1 ? "warn" : "ok";
}
const TINTS: Record<Level, string> = { ok: "#22c55e", warn: "#f59e0b", crit: "#ef4444" };

/* ========================= Metric tiles ========================= */

function SparkTile({
  title, icon: Icon, unit, range, base, kind, tintForced,
}: {
  title: string; icon: any; unit?: string; range: Range; base: number; kind: "uptime"|"p95"|"error"|"plain"; tintForced?: string;
}) {
  const noise = range.max - range.min > 10 ? 1.2 : 0.15;
  const live = useRealtime(base, range, noise);
  const [series, setSeries] = useState<number[]>(Array.from({ length: 60 }, () => live));
  useEffect(() => {
    const id = setInterval(() => setSeries((p) => p.slice(-59).concat(live)), 1000);
    return () => clearInterval(id);
  }, [live]);

  const lvl = kind === "plain" ? "ok" : metricLevel(kind, live);
  const tint = tintForced ?? (kind === "plain" ? "#6366f1" : TINTS[lvl as Level]);
  const label = unit ? `${live.toFixed(unit === "ms" ? 0 : 2)} ${unit}` : `${live.toFixed(2)}%`;

  return (
    <div className={["card-2d p-4 md:p-5 transition", (lvl==="crit" && kind!=="plain") ? "ring-1 ring-red-500/30 animate-[pulse_1.4s_ease-in-out_infinite]" : ""].join(" ")}>
      <div className="flex items-center gap-2">
        <Icon className="h-5 w-5" />
        <div className="font-medium">{title}</div>
        {kind!=="plain" && (
          <Badge className="ml-auto" style={{ backgroundColor: tint, color: "white" }}>
            {lvl.toUpperCase()}
          </Badge>
        )}
      </div>
      <div className="mt-2 text-2xl font-semibold">{label}</div>
      <div className="mt-3">
        <Sparkline points={series} range={range} tint={tint} />
      </div>
    </div>
  );
}

/* ========================= Region table ========================= */

function RegionTable() {
  const rows = [
    { id: "jak", name: "Jakarta",   rtt: useRealtime(18, {min:10,max:40}, 0.6),   status: "ok"   as Level },
    { id: "sgp", name: "Singapore", rtt: useRealtime(24, {min:12,max:50}, 0.6),  status: "ok"   as Level },
    { id: "tyo", name: "Tokyo",     rtt: useRealtime(92, {min:60,max:140}, 1.2), status: "warn" as Level },
    { id: "syd", name: "Sydney",    rtt: useRealtime(110,{min:80,max:180}, 1.2), status: "ok"   as Level },
  ];
  return (
    <div className="card-2d p-4 md:p-5">
      <div className="flex items-center gap-2 mb-2">
        <Globe2 className="h-5 w-5" />
        <div className="font-medium">Regions</div>
      </div>
      <div className="text-sm">
        {rows.map(r => (
          <div key={r.id} className="flex items-center justify-between py-2 gborder rounded-xl px-3 mb-2">
            <div className="font-medium">{r.name}</div>
            <div className="flex items-center gap-3">
              <div className="text-zinc-500">RTT ~ {r.rtt.toFixed(0)} ms</div>
              <Badge style={{ backgroundColor: TINTS[r.status], color: "white" }}>{r.status.toUpperCase()}</Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ========================= Main Matrix ========================= */

export default function MonitoringMatrix() {
  // Hindari new Date() di SSR, gunakan nilai tetap lalu update di client
  const [live, setLive] = useState<Summary>({ updatedAt: "2025-01-01T00:00:00.000Z", uptime30d: 99.92, p95: 280, errorRate: 0.12 });
  const liveData = useStatusLive();
  useEffect(() => {
    if (liveData) setLive(liveData);
  }, [liveData]);

  // derived sources/resources (randomized around sensible bases)
  const cpu   = useRealtime(58, {min: 15, max: 95}, 1.5);
  const memGB = useRealtime(6.2, {min: 2, max: 16}, 0.25);
  const dbCon = useRealtime(42, {min: 10, max: 120}, 1.5);
  const dbP95 = useRealtime(38, {min: 15, max: 120}, 1.0);          // ms
  const queue = useRealtime(120, {min: 0, max: 800}, 6);            // pending email
  const webOk = useRealtime(99.2, {min: 90, max: 100}, 0.2);        // %
  const payOk = useRealtime(98.5, {min: 90, max: 100}, 0.2);        // %
  const pdfpm = useRealtime(35, {min: 0, max: 120}, 1.5);           // pdf/min

  // overall health
  const lvlUptime = metricLevel("uptime", live.uptime30d);
  const lvlLatency = metricLevel("p95", live.p95);
  const lvlError = metricLevel("error", live.errorRate);
  const worst = [lvlUptime, lvlLatency, lvlError].includes("crit") ? "crit"
               : [lvlUptime, lvlLatency, lvlError].includes("warn") ? "warn" : "ok";
  const worstTint = TINTS[worst as Level];

  return (
    <section className="grid grid-cols-12 gap-5">
      {/* Overall health banner */}
      <Card className="col-span-12 card-2d p-4 md:p-5 flex items-center gap-3">
        <ShieldCheck className="h-5 w-5" />
        <div className="font-semibold">Overall Health</div>
        <Badge style={{ backgroundColor: worstTint, color: "white" }}>{(worst as string).toUpperCase()}</Badge>
        <div className="ml-auto text-sm text-zinc-500">
          {/* Hindari hydration mismatch: render waktu hanya setelah mounted di client */}
          {(() => {
            const [mounted, setMounted] = useState(false);
            useEffect(() => { setMounted(true); }, []);
            return mounted ? `Updated ${new Date(live.updatedAt).toLocaleTimeString("id-ID")}` : "";
          })()}
        </div>
      </Card>

      {/* Traffic & Regions */}
      <div className="col-span-12 md:col-span-8">
        <SparkTile
          title="Traffic p95 Latency"
          icon={Gauge}
          unit="ms"
          range={{min:150,max:600}}
          base={live.p95}
          kind="p95"
        />
      </div>
      <div className="col-span-12 md:col-span-4">
        <RegionTable />
      </div>

      {/* CPU / Mem gauges */}
      <div className="col-span-12 md:col-span-6 card-2d p-4 md:p-5">
        <div className="flex items-center gap-2 mb-2"><Server className="h-5 w-5" /><div className="font-medium">App Server</div></div>
        <RingGauge value={cpu} min={0} max={100} label="CPU Utilization" tint="#22c55e" />
      </div>
      <div className="col-span-12 md:col-span-6 card-2d p-4 md:p-5">
        <div className="flex items-center gap-2 mb-2"><HardDrive className="h-5 w-5" /><div className="font-medium">Memory</div></div>
        <RingGauge value={(memGB/16)*100} min={0} max={100} label={`${memGB.toFixed(1)} GB / 16 GB`} tint="#6366f1" />
      </div>

      {/* DB metrics */}
      <div className="col-span-12 md:col-span-6">
        <SparkTile
          title="DB Connections"
          icon={Database}
          unit=""
          range={{min:10,max:200}}
          base={dbCon}
          kind="plain"
          tintForced="#0ea5e9" // sky
        />
      </div>
      <div className="col-span-12 md:col-span-6">
        <SparkTile
          title="DB Query p95"
          icon={Activity}
          unit="ms"
          range={{min:10,max:200}}
          base={dbP95}
          kind="plain"
          tintForced="#14b8a6" // teal
        />
      </div>

      {/* Queue / Success rates */}
      <div className="col-span-12 md:col-span-6">
        <SparkTile
          title="Email Queue Depth"
          icon={MailCheck}
          unit=""
          range={{min:0,max:1000}}
          base={queue}
          kind="plain"
          tintForced="#f59e0b" // amber
        />
      </div>
      <div className="col-span-12 md:col-span-6">
        <SparkTile
          title="Webhook Success"
          icon={MailCheck}
          unit="%"
          range={{min:90,max:100}}
          base={webOk}
          kind="plain"
          tintForced="#22c55e" // emerald
        />
      </div>

      {/* Payment / PDF */}
      <div className="col-span-12 md:col-span-6">
        <SparkTile
          title="Payment Success"
          icon={CreditCard}
          unit="%"
          range={{min:90,max:100}}
          base={payOk}
          kind="plain"
          tintForced="#10b981" // emerald deeper
        />
      </div>
      <div className="col-span-12 md:col-span-6">
        <SparkTile
          title="PDF Render / min"
          icon={FileText}
          unit=""
          range={{min:0,max:150}}
          base={pdfpm}
          kind="plain"
          tintForced="#8b5cf6" // violet
        />
      </div>

      {/* Uptime + Error big tiles */}
      <div className="col-span-12 md:col-span-6">
        <SparkTile
          title="Uptime 30d"
          icon={ShieldCheck}
          unit="%"
          range={{min:99.6,max:100}}
          base={live.uptime30d}
          kind="uptime"
        />
      </div>
      <div className="col-span-12 md:col-span-6">
        <SparkTile
          title="Error Rate"
          icon={Activity}
          unit="%"
          range={{min:0,max:3}}
          base={live.errorRate}
          kind="error"
        />
      </div>
    </section>
  );
}
