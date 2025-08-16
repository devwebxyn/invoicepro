// src/app/dashboard/layout.tsx
import DashboardHeader from "../../components/layout/DashboardHeader";
import DashboardSidebar from "../../components/layout/DashboardSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <DashboardSidebar />
      <div className="flex-1">
        <DashboardHeader />
        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}