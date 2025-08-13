"use client";

import * as React from "react";
import Switch from "@/components/ui/switch";
import { cn } from "@/lib/utils";

type Billing = "monthly" | "yearly";

export default function PricingToggle({
  value,
  onChange,
  className,
}: {
  value: Billing;
  onChange: (v: Billing) => void;
  className?: string;
}) {
  const yearly = value === "yearly";
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span className={cn("text-sm", !yearly && "font-medium")}>Bulanan</span>
      <Switch
        checked={yearly}
        onCheckedChange={(v: any) => onChange(v ? "yearly" : "monthly")}
        aria-label="Toggle billing"
      />
      <span className={cn("text-sm", yearly && "font-medium")}>
        Tahunan <span className="ml-1 rounded bg-black text-white px-1.5 py-0.5 text-[11px]">hemat 20%</span>
      </span>
    </div>
  );
}
