import { cn } from "@/lib/utils";
type Props = React.HTMLAttributes<HTMLSpanElement> & { variant?: "default" | "secondary" };
export function Badge({ className, variant = "default", ...props }: Props) {
  const styles = variant === "secondary" ? "bg-zinc-100 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300" : "bg-black text-white dark:bg-white dark:text-black";
  return <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", styles, className)} {...props} />;
}
