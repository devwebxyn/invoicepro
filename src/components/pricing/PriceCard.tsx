import { Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export type Billing = "monthly" | "yearly";

import Progress from "@/components/ui/progress";

function rupiah(n: number) {
  if (n === 0) return "Gratis";
  return "Rp " + n.toLocaleString("id-ID");
}

export default function PriceCard({
  name,
  desc,
  priceMonthly,
  priceYearly,
  features,
  ctaHref,
  popular = false,
  billing,
  className,
  discountPercent = 0,
  slotsLeft,
  slotsTotal,
  endsAt,
}: {
  name: string;
  desc: string;
  priceMonthly: number;
  priceYearly: number;
  features: string[];
  ctaHref: string;
  popular?: boolean;
  billing: Billing;
  className?: string;
  discountPercent?: number;
  slotsLeft?: number;
  slotsTotal?: number;
  endsAt?: string;
}) {
  const isYearly = billing === "yearly";
  const base = isYearly ? priceYearly : priceMonthly;

  const discounted = isYearly && discountPercent > 0
    ? Math.max(0, Math.round(base * (1 - discountPercent / 100)))
    : base;

  const suffix = isYearly ? "/tahun" : "/bulan";

  const showProgress =
    typeof slotsLeft === "number" &&
    typeof slotsTotal === "number" &&
    slotsTotal > 0 &&
    slotsLeft >= 0;

  const progressValue = showProgress
    ? Math.max(0, Math.min(100, (slotsLeft / slotsTotal) * 100))
    : 0;

  return (
    <Card className={cn("relative overflow-hidden card-2d", className)}>
      {popular && (
        <div className="absolute right-4 top-4">
          <Badge className="rounded-full">Paling Populer</Badge>
        </div>
      )}

      <CardContent className="p-6">
        <div className="mb-2 text-lg font-semibold">{name}</div>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">{desc}</p>

        {/* Harga */}
        <div className="mt-5 flex items-baseline gap-2 flex-wrap">
          <div className="text-3xl font-semibold">
            {rupiah(discounted)}
          </div>
          <div className="text-sm text-zinc-500">{suffix}</div>

          {isYearly && discountPercent > 0 && base > 0 && (
            <>
              <div className="text-sm text-zinc-500 line-through">
                {rupiah(base)}
              </div>
              <Badge className="rounded-full bg-emerald-600 text-white">
                Hemat {discountPercent}%
              </Badge>
            </>
          )}
        </div>

        <Button size="lg" className="w-full mt-4">
          <Link href={ctaHref}>Mulai {name}</Link>
        </Button>

        <ul className="mt-5 space-y-2 text-sm">
          {features.map((f) => (
            <li key={f} className="flex items-start gap-2">
              <Check className="h-4 w-4 mt-0.5" />
              <span>{f}</span>
            </li>
          ))}
        </ul>

        {/* Progress promo (opsional) */}
        {showProgress && (
          <div className="mt-5 space-y-2">
            <div className="flex items-center justify-between text-xs text-zinc-500">
              <span>Promo tersisa</span>
              <span className="font-medium">
                {slotsLeft} / {slotsTotal}
              </span>
            </div>
            <Progress value={progressValue} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
