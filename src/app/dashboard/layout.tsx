// src/app/dashboard/layout.tsx
import DashboardHeader from "@/components/layout/DashboardHeader";
import DashboardSidebar from "@/components/layout/DashboardSidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DashboardSidebar />
      {/* Semua konten digeser 280px saat >= md */}
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 md:pl-[280px]">
        {/* Header ikut di dalam wrapper supaya tidak ketimpa sidebar */}
        <DashboardHeader />
        <main className="mx-auto max-w-7xl p-4 md:p-6">{children}</main>
      </div>
    </>
  );
}
