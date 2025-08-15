"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cpu, Cloud, Boxes, Database, Code2, Rocket, ShieldCheck, GitBranch } from "lucide-react";

type Item =
  | { name: string; desc: string; img: string }
  | { name: string; desc: string; icon: any };

const tools: Item[] = [
  { name: "Next.js", desc: "App Router, SSR/ISR", img: "/logos/next.svg" },
  { name: "React", desc: "UI deklaratif 19", img: "/logos/react.svg" },
  { name: "TypeScript", desc: "Typed DX", img: "/logos/typescript.svg" },
  { name: "Tailwind v4", desc: "Utility-first", img: "/logos/tailwind.svg" },
  { name: "shadcn/ui", desc: "Composable UI", img: "/logos/shadcn.svg" },
  { name: "Node.js", desc: "API & server actions", img: "/logos/node.svg" },
  { name: "Appwrite", desc: "DB/Auth/Storage", img: "/logos/appwrite.svg" },
  { name: "Xendit", desc: "Payments & webhook", img: "/logos/xendit.svg" },
  { name: "Cloudflare", desc: "DNS/CDN/WAF", img: "/logos/cloudflare.svg" },
  { name: "Vercel", desc: "Hosting & Edge", img: "/logos/vercel.svg" },
  { name: "Git", desc: "VCS workflow", img: "/logos/git.svg" },
  { name: "GitHub Actions", desc: "CI/CD", img: "/logos/github-actions.svg" },
];

function FallbackIcon({ name }: { name: string }) {
  const map = {
    Next: Code2, React: Code2, TypeScript: Code2, Tailwind: Code2, "shadcn/ui": Code2,
    "Node.js": Cpu, Appwrite: Database, Xendit: Boxes, Cloudflare: Cloud,
    Vercel: Rocket, Git: GitBranch, "GitHub Actions": ShieldCheck,
  } as Record<string, any>;
  const Icon = map[name] || Boxes;
  return <Icon className="h-5 w-5" />;
}

export default function TechToolbox() {
  return (
    <section id="toolbox">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-2xl md:text-3xl font-semibold">Tech Toolbox</h2>
        <Badge variant="secondary" className="rounded-full">Preferred Stack</Badge>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {tools.map((t) => (
          <Card key={t.name} className="card-2d p-4 transition hover:-translate-y-0.5">
            <div className="flex items-center gap-3">
              {"img" in t ? (
                <img
                  src={t.img}
                  alt={t.name}
                  className="h-5 w-auto"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    (e.currentTarget.nextSibling as HTMLElement)?.classList.remove("hidden");
                  }}
                />
              ) : null}
              <span className="hidden"><FallbackIcon name={t.name} /></span>
              <div className="font-medium">{t.name}</div>
            </div>
            <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{t.desc}</div>
          </Card>
        ))}
      </div>

      <p className="text-xs text-zinc-500 mt-3">
        * Jika logo tidak tersedia, ikon generik akan ditampilkan otomatis.
      </p>
    </section>
  );
}
