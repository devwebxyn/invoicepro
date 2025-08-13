import { Card, CardContent } from "@/components/ui/card";
import { GitPullRequestArrow, Boxes, Rocket } from "lucide-react";

const steps = [
  { i: GitPullRequestArrow, t: "Build", d: "Lint, typecheck, unit test." },
  { i: Boxes, t: "Preview", d: "Deploy pratinjau, QA otomatis." },
  { i: Rocket, t: "Deploy", d: "Promote ke produksi + migrations." },
];

export default function PipelineSteps() {
  return (
    <section className="grid md:grid-cols-3 gap-4">
      {steps.map(s => (
        <Card key={s.t} className="card-2d">
          <CardContent className="p-5">
            <div className="h-10 w-10 rounded-xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center mb-3">
              <s.i className="h-5 w-5" />
            </div>
            <div className="font-medium">{s.t}</div>
            <div className="text-sm text-zinc-500">{s.d}</div>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
