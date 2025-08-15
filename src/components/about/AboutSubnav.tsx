"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const sections = [
  { id: "overview",  label: "Overview" },
  { id: "skills",    label: "Skills" },
  { id: "timeline",  label: "Timeline" },
  { id: "projects",  label: "Projects" },
  { id: "toolbox",   label: "Tech Toolbox" },
  { id: "contact",   label: "Contact" },
];

export default function AboutSubnav() {
  const [active, setActive] = useState("overview");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5] }
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <div className="sticky top-16 z-30 backdrop-blur bg-white/60 dark:bg-zinc-950/60 border-b">
      <nav className="mx-auto max-w-6xl px-4 h-12 flex items-center gap-3 overflow-x-auto">
        {sections.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            className={cn(
              "px-3 py-1.5 rounded-full text-sm border transition whitespace-nowrap",
              active === id
                ? "bg-black text-white border-black dark:bg-white dark:text-black"
                : "hover:bg-zinc-50 dark:hover:bg-zinc-900 border-zinc-200 dark:border-zinc-800"
            )}
          >
            {label}
          </a>
        ))}
      </nav>
    </div>
  );
}
