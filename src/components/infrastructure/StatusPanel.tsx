"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

type Summary = {
  updatedAt: string;
  uptime30d: number;
  p95: number;
  errorRate: number;
  regions: { id: string; name: string; status: "ok" | "warn" | "down"; rtt: number }[];
};

export default function StatusPanel() {
  const [data, setData] = useState<Summary | null>(null);

  useEffect(() => {
    let stop = false;
    const load = async () => {
      const res = await fetch("/api/status/summary", { cache: "no-store" });
      if (!res.ok) return;
      const json = (await res.json()) as Summary;
      if (!stop) setData(json);
    };
    load();
    const id = setInterval(load, 15000);
    return () => { stop = true; clearInterval(id); };
  }, []);

  return (
    <Card className="card-2d">
      <CardContent className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="font-medium">Status Layanan</div>
          <div className="text-xs text-zinc-500">
            Update {data ? new Date(data.updatedAt).toLocaleTimeString("id-ID") : "…"}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="gborder p-4 rounded-2xl">
            <div className="text-sm text-zinc-500">Uptime 30 hari</div>
            <div className="text-2xl font-semibold">{data?.uptime30d ?? 0}%</div>
            <Progress className="mt-3" value={data?.uptime30d ?? 0} />
          </div>
          <div className="gborder p-4 rounded-2xl">
            <div className="text-sm text-zinc-500">p95 Latency</div>
            <div className="text-2xl font-semibold">{data?.p95 ?? 0} ms</div>
          </div>
          <div className="gborder p-4 rounded-2xl">
            <div className="text-sm text-zinc-500">Error Rate</div>
            <div className="text-2xl font-semibold">{data?.errorRate ?? 0}%</div>
            <Progress className="mt-3" value={Math.max(0, 100 - (data?.errorRate ?? 0))} />
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-3">
          {(data?.regions ?? []).map(r => (
            <div key={r.id} className="card-2d p-4">
              <div className="flex items-center justify-between">
                <div className="font-medium text-sm">{r.name}</div>
                <Badge
                  className={
                    r.status === "ok" ? "bg-emerald-600" :
                    r.status === "warn" ? "bg-amber-600" : "bg-red-600"
                  }
                >
                  {r.status.toUpperCase()}
                </Badge>
              </div>
              <div className="text-xs text-zinc-500 mt-2">RTT ~ {r.rtt} ms</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
