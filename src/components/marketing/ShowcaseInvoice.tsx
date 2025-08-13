
"use client";
import { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";

export default function ShowcaseInvoice() {
  const ref = useRef<HTMLVideoElement>(null);

  // Play saat terlihat, pause saat di luar viewport (hemat baterai/CPU)
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()),
      { threshold: 0.5 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <Card>
        <CardContent className="p-0">
          <div className="overflow-hidden rounded-2xl">
            <video
              ref={ref}
              className="w-full"
              style={{ aspectRatio: "16 / 9", backgroundColor: "black" }}
              src="/hero-landing-480p.mp4"
              poster="/hero-landing-poster.webp"
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              aria-label="Preview UI Invoice & Receipt Pro"
            >
              {/* Fallback source */}
              <source src="/hero-landing-480p.mp4" type="video/mp4" />
            </video>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
