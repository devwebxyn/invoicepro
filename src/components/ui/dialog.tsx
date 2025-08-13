import React from "react";

export function Dialog({ children }: { children: React.ReactNode }) {
  return <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">{children}</div>;
}

export function DialogContent({ children }: { children: React.ReactNode }) {
  return <div className="bg-white rounded-xl shadow-xl p-6 min-w-[320px]">{children}</div>;
}

export function DialogHeader({ children }: { children: React.ReactNode }) {
  return <div className="mb-4">{children}</div>;
}

export function DialogTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="text-lg font-semibold">{children}</h3>;
}
