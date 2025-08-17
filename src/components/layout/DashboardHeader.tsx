// src/components/layout/DashboardHeader.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import DashboardSidebar from "@/components/layout/DashboardSidebar";

export default function DashboardHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-white/70 px-4 backdrop-blur dark:bg-zinc-950/70 sm:px-6">
      {/* Mobile menu */}
      <Sheet>
        <SheetTrigger asChild>
          <Button size="sm" variant="outline" className="md:hidden">
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
  <SheetContent className="p-0"> 
<SheetContent className="p-0 w-80 sm:w-96">
  <DashboardSidebar isMobile />
</SheetContent>

          <DashboardSidebar isMobile />
        </SheetContent>
      </Sheet>

      <div className="ml-auto">
        <form action="/api/auth/signout" method="post">
          <Button variant="outline">Keluar</Button>
        </form>
      </div>
    </header>
  );
}