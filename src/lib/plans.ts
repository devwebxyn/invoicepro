export type Plan = "free" | "pro" | "business";
export type Interval = "monthly" | "yearly";

export const PRICES: Record<Exclude<Plan, "free">, Record<Interval, number>> = {
  pro: { monthly: 99_000,  yearly:  950_400 },    // hemat 20%
  business: { monthly: 249_000, yearly: 2_390_400 }
};

export function computeActiveUntil(interval: Interval) {
  const d = new Date();
  if (interval === "monthly") d.setMonth(d.getMonth() + 1);
  else d.setFullYear(d.getFullYear() + 1);
  return d;
}

export function isUpgradeAllowed(current: Plan, target: Exclude<Plan, "free">) {
  if (current === "business") return false;
  if (current === "pro" && target === "pro") return false;
  return true;
}
