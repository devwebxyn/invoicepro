// src/components/layout/DashboardSidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Settings, Sparkles, CirclePlus, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

type Item = {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  aliases?: string[];
  match?: "exact" | "startsWith";
};

const NAV: Item[] = [
  { href: "/dashboard", label: "Beranda", icon: Home, match: "exact" },
  { href: "/dashboard/plan", label: "Your Plan", icon: Sparkles, match: "exact" },
  { href: "/dashboard/settings", label: "Pengaturan", icon: Settings, match: "startsWith", aliases: ["/settings"] },
];

const norm = (s: string) => (s.endsWith("/") && s !== "/" ? s.slice(0, -1) : s);
const isActive = (path: string, item: Item) => {
  const p = norm(path);
  const targets = [item.href, ...(item.aliases ?? [])].map(norm);
  const mode = item.match ?? "startsWith";
  return targets.some((t) => (mode === "exact" ? p === t : p === t || p.startsWith(`${t}/`)));
};

export default function DashboardSidebar({ isMobile = false }: { isMobile?: boolean }) {
  const pathname = usePathname();

  return (
    <aside
      aria-label="Sidebar"
      className={cn(
        "fixed left-0 top-0 z-40 hidden h-screen md:block",
        isMobile ? "w-full" : "w-[280px]" // SELALU expanded
      )}
    >
      <div
        className={cn(
          "relative m-3 flex h-[calc(100vh-24px)] flex-col overflow-hidden rounded-3xl p-3",
          "bg-gradient-to-b from-white/70 to-white/25 dark:from-zinc-900/70 dark:to-zinc-900/30",
          "backdrop-blur-2xl border border-white/20 dark:border-white/10",
          "shadow-[0_0_1px_rgba(255,255,255,.6),0_30px_90px_-30px_rgba(0,0,0,.45)]"
        )}
      >
        {/* dekor glow */}
        <div
          className="pointer-events-none absolute inset-0 -z-10 rounded-3xl
                     before:absolute before:inset-0 before:rounded-3xl before:content-['']
                     before:bg-[radial-gradient(160px_110px_at_15%_0%,rgba(124,58,237,.18),transparent),radial-gradient(200px_140px_at_90%_8%,rgba(6,182,212,.18),transparent)]"
        />

        {/* brand */}
        <div className="flex items-center gap-3 px-1">
          <div className="grid size-10 place-items-center rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-400 text-white shadow-lg">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <p className="bg-gradient-to-r from-zinc-900 to-zinc-700 bg-clip-text text-base font-extrabold text-transparent dark:from-white dark:to-white/80">
              Invoice Pro
            </p>
            <p className="text-[11px] -mt-0.5 text-zinc-500 dark:text-zinc-400">Dashboard</p>
          </div>
        </div>

        {/* quick action */}
        <Link
          href="/dashboard/invoices/new"
          className="mx-2 mt-3 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 px-3 py-2.5 text-sm font-semibold text-white shadow-lg hover:brightness-105 active:brightness-95"
        >
          <CirclePlus className="h-4 w-4" />
          <span>Buat Invoice Baru</span>
        </Link>

        {/* nav */}
        <nav className="mt-3 flex-1 space-y-1 overflow-y-auto">
          {/* Main nav items except Your Plan */}
          {NAV.filter((item) => item.label !== "Your Plan").map((item) => {
            const active = isActive(pathname, item);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "group relative mx-2 flex items-center gap-3 rounded-2xl px-3 py-2.5 transition",
                  "text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white",
                  "hover:bg-white/40 dark:hover:bg-white/5",
                  active && "bg-white/60 dark:bg-white/10 shadow-[0_2px_14px_-6px_rgba(99,102,241,.45)]"
                )}
              >
                {/* indikator aktif */}
                <span
                  className={cn(
                    "absolute left-0 top-1/2 -translate-y-1/2 h-6 w-[3px] rounded-r-full",
                    "bg-gradient-to-b from-violet-500 to-cyan-400",
                    active ? "opacity-100" : "opacity-0",
                    "transition-opacity"
                  )}
                />
                <Icon className="h-5 w-5 shrink-0" />
                <span className="truncate text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}

          {/* Dropdown for Your Plan with two links */}
          <div className="mx-2">
            <div
              className={cn(
                "group flex items-center gap-3 rounded-2xl px-3 py-2.5 transition cursor-pointer",
                "text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white",
                "hover:bg-white/40 dark:hover:bg-white/5",
                (pathname.startsWith("/dashboard/plan")) && "bg-white/60 dark:bg-white/10 shadow-[0_2px_14px_-6px_rgba(99,102,241,.45)]"
              )}
            >
              <Sparkles className="h-5 w-5 shrink-0" />
              <span className="truncate text-sm font-medium">Your Plan</span>
            </div>
            {/* Dropdown content */}
            <div className="ml-8 mt-1 space-y-1">
              <Link
                href="/dashboard/plan"
                aria-current={pathname === "/dashboard/plan" ? "page" : undefined}
                className={cn(
                  "group flex items-center gap-2 rounded-xl px-2 py-2 text-sm font-normal transition",
                  "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white",
                  "hover:bg-white/40 dark:hover:bg-white/5",
                  pathname === "/dashboard/plan" && "bg-white/60 dark:bg-white/10 shadow"
                )}
              >
                <span>Your Plan</span>
              </Link>
              <Link
                href="/dashboard/plan/manage"
                aria-current={pathname === "/dashboard/plan/manage" ? "page" : undefined}
                className={cn(
                  "group flex items-center gap-2 rounded-xl px-2 py-2 text-sm font-normal transition",
                  "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white",
                  "hover:bg-white/40 dark:hover:bg-white/5",
                  pathname === "/dashboard/plan/manage" && "bg-white/60 dark:bg-white/10 shadow"
                )}
              >
                <span>Manage Your Plan</span>
              </Link>
            </div>
          </div>

        </nav>

        {/* user area */}
        <div className="mt-auto rounded-2xl border border-white/20 bg-white/50 p-3 dark:border-white/10 dark:bg-white/5">
          <div className="flex items-center gap-3">
            <div className="grid size-9 place-items-center rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-600 text-white dark:from-zinc-200 dark:to-zinc-400 dark:text-zinc-900">
              <span className="text-sm font-bold">X</span>
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-zinc-800 dark:text-zinc-100">xynoos dev</p>
              <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">Premium</p>
            </div>
            <div className="ml-auto">
              <form action="/api/auth/signout" method="post">
                <button
                  className="inline-flex items-center justify-center rounded-xl border border-white/30 bg-white/60 p-2 text-zinc-700 shadow-sm transition hover:bg-white/80 dark:border-white/10 dark:bg-white/10 dark:text-zinc-200"
                  title="Keluar"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
