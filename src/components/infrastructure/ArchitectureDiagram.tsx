"use client";

import { Card, CardContent } from "@/components/ui/card";

type Props = {
  /** path gambar dari Sora di /public, contoh: /infra/diagram-hero.webp */
  src?: string;
  alt?: string;
  caption?: string;
};

export default function ArchitectureDiagram({
  src = "/infra/diagram-hero.png",
  alt = "Diagram arsitektur sistem",
}: Props) {
  return (
    <Card className="card-2d">
      <CardContent className="p-4 md:p-6">
        <div className="text-sm text-zinc-500 mb-2">Diagram Arsitektur</div>

        <figure className="relative rounded-xl overflow-hidden gborder">
          <div className="aspect-video w-full bg-zinc-100 dark:bg-zinc-900">
            <img
              src={src}
              alt={alt}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        </figure>
      </CardContent>
    </Card>
  );
}
