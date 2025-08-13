import React, { useState } from "react";

export function TooltipProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function Tooltip({ children }: { children: React.ReactNode }) {
  return <span className="relative group">{children}</span>;
}

export function TooltipTrigger({ children }: { children: React.ReactNode }) {
  return <span className="cursor-help group-hover:underline">{children}</span>;
}

export function TooltipContent({ children }: { children: React.ReactNode }) {
  return (
    <span className="absolute left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-zinc-900 text-white text-xs rounded shadow-lg z-50 whitespace-nowrap">
      {children}
    </span>
  );
}
