// src/components/layout/DashboardSidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Settings, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Beranda", icon: Home },
  { href: "/dashboard/settings", label: "Pengaturan", icon: Settings },
];

export default function DashboardSidebar({ isMobile = false }) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "flex-col border-r bg-white dark:bg-zinc-950",
        isMobile ? "flex w-full" : "hidden md:flex md:w-64"
      )}
    >
      <div className="flex h-14 items-center border-b px-4 lg:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Sparkles className="h-5 w-5" />
          <span>Invoice Pro</span>
        </Link>
      </div>
      <nav className="flex-1 space-y-1 p-2">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-zinc-600 transition-all hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50",
              pathname === item.href &&
                "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50"
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}