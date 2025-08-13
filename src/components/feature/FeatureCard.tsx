import { cn } from "@/lib/utils";
import { type ElementType, type ReactNode } from "react";

export default function FeatureCard({
  icon: Icon,
  title,
  desc,
  children,
  className,
}: {
  icon: ElementType;
  title: string;
  desc: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("card-2d p-6", className)}>
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center">
          <Icon className="h-5 w-5" />
        </div>
        <div className="font-medium">{title}</div>
      </div>
      <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">{desc}</p>
      {children ? <div className="mt-4 text-sm">{children}</div> : null}
    </div>
  );
}
