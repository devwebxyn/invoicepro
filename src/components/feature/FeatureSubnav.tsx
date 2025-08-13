"use client";

import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "invoice", label: "Invoice & PDF" },
  { id: "payments", label: "Payments" },
  { id: "notify", label: "Notifikasi" },
  { id: "dashboard", label: "Dashboard" },
  { id: "security", label: "Keamanan" },
  { id: "integrations", label: "Integrasi" },
  { id: "pricing", label: "Pricing" },
];

export default function FeatureSubnav() {
  const [active, setActive] = useState("overview");
  const [scrolled, setScrolled] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Scrollspy
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5] }
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  // Shadow saat halaman di-scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Smooth scroll dengan offset header+subnav (≈ 96px)
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const OFFSET = 96; // header h-16 + subnav ~h-12
    const y = el.getBoundingClientRect().top + window.scrollY - OFFSET;
    window.history.replaceState(null, "", `#${id}`);
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <div
      ref={wrapRef}
      className={cn(
        "sticky top-16 z-30 backdrop-blur bg-white/70 dark:bg-zinc-950/70 border-b transition-shadow",
        scrolled ? "shadow-[0_4px_12px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_12px_rgba(0,0,0,0.35)]" : ""
      )}
    >
      <div className="relative mx-auto max-w-6xl px-4">
        {/* edge fade kiri/kanan */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-white dark:from-zinc-950 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white dark:from-zinc-950 to-transparent" />

        <nav className="h-12 flex items-center gap-3 overflow-x-auto scroll-px-4">
          {sections.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => handleClick(e, id)}
              className={cn(
                "px-3 py-1.5 rounded-full text-sm border transition whitespace-nowrap",
                active === id
                  ? "bg-black text-white border-black dark:bg-white dark:text-black"
                  : "border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900"
              )}
              aria-current={active === id ? "page" : undefined}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
