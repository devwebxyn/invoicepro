import { Card, CardContent } from "@/components/ui/card";

const regions = [
  { id: "jak", name: "Jakarta", rtt: 18 },
  { id: "sgp", name: "Singapore", rtt: 24 },
  { id: "tyo", name: "Tokyo", rtt: 90 },
  { id: "syd", name: "Sydney", rtt: 110 },
];

export default function RegionLatency() {
  return (
    <section className="grid md:grid-cols-4 gap-4">
      {regions.map(r => (
        <Card key={r.id} className="card-2d">
          <CardContent className="p-5">
            <div className="text-sm text-zinc-500">Region</div>
            <div className="font-semibold">{r.name}</div>
            <div className="mt-3 text-sm">
              Latensi rata-rata: <span className="font-medium">{r.rtt} ms</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
