import React from "react";

export function Progress({ value = 0, className = "" }: { value?: number; className?: string }) {
  return (
    <div className={`relative h-2 rounded bg-zinc-200 dark:bg-zinc-800 overflow-hidden ${className}`}>
      <div
        className="absolute left-0 top-0 h-full bg-indigo-500 transition-all"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}
export default Progress;
