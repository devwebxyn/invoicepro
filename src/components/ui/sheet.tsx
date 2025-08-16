// src/components/ui/sheet.tsx
"use client";

import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";

const Sheet = SheetPrimitive.Root;
const SheetTrigger = SheetPrimitive.Trigger;
const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Portal>
    <SheetPrimitive.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" />
    <SheetPrimitive.Content
      ref={ref}
      className={cn(
        "fixed z-50 h-full w-80 top-0 left-0 bg-white dark:bg-zinc-950 shadow-xl ring-1 ring-black/5 backdrop-blur",
        className
      )}
      {...props}
    />
  </SheetPrimitive.Portal>
));
SheetContent.displayName = "SheetContent";

export { Sheet, SheetTrigger, SheetContent };
