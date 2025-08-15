import { Card, CardContent } from "@/components/ui/card";
import { Code2, Rocket, CheckCircle2 } from "lucide-react";

const items = [
  { icon: Code2,    label: "Baris Kode (perkiraan)", value: "100k+" },
  { icon: Rocket,   label: "Deploy/Release",         value: "120+"  },
  { icon: CheckCircle2, label: "Fitur Selesai",     value: "80+"   },
];

export default function DevStats() {
  return (
    <section className="grid md:grid-cols-3 gap-4">
      {items.map((it) => (
        <Card key={it.label} className="card-2d">
          <CardContent className="p-5">
            <div className="flex items-center gap-2">
              <it.icon className="h-5 w-5" />
              <div className="text-sm text-zinc-500">{it.label}</div>
            </div>
            <div className="mt-2 text-2xl font-semibold">{it.value}</div>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
