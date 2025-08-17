// src/components/layout/AppShell.tsx
"use client";

import React from "react";
import DashboardSidebar from "@/components/layout/DashboardSidebar";


export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full md:flex bg-[radial-gradient(60rem_30rem_at_10%_-10%,rgba(124,58,237,.08),transparent),radial-gradient(60rem_30rem_at_110%_-10%,rgba(6,182,212,.08),transparent)]">
      {/* Sidebar: di dalam flow, hidden di mobile, min-w di desktop */}
      <aside className="hidden md:block min-w-[280px]">
        <DashboardSidebar />
      </aside>

      {/* Main content: otomatis geser di desktop */}
      <div className="flex-1">
        <main className="mx-auto max-w-7xl px-6 py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
