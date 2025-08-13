import { Progress } from "@/components/ui/progress";
import { Activity, Gauge, ShieldCheck } from "lucide-react";

export default function MonitoringGrid() {
  const cards = [
    { t: "Uptime 30d", v: 99.92, icon: ShieldCheck },
    { t: "p95 Latency", v: 280, unit: "ms", icon: Gauge },
    { t: "Error Rate", v: 0.12, unit: "%", icon: Activity },
  ];
  return (
    <section className="grid md:grid-cols-3 gap-4">
      {cards.map(c => (
        <div key={c.t} className="card-2d p-5">
          <div className="flex items-center gap-2">
            <c.icon className="h-5 w-5" />
            <div className="font-medium">{c.t}</div>
          </div>
          <div className="mt-3 text-2xl font-semibold">
            {c.v}{c.unit ? ` ${c.unit}` : "%"}
          </div>
          <Progress className="mt-3" value={Math.min(100, c.t.includes("Error") ? 100 - c.v : c.v)} />
        </div>
      ))}
    </section>
  );
}
