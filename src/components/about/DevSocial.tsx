"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Share2, Clipboard, ClipboardCheck } from "lucide-react";

export default function DevSocial() {
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState<"idle" | "done">("idle");

  const email = "samuel.indra211@smk.belajar.id";

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // fallback element-select if needed, tapi biasanya clipboard sudah cukup
      alert("Gagal menyalin email. Silakan salin manual: " + email);
    }
  };

  const shareProfile = async () => {
    const url =
      typeof window !== "undefined"
        ? `${window.location.origin}/about/developers`
        : "/about/developers";

    try {
      if (navigator.share) {
        await navigator.share({
          title: "Profil Developer — Samuel Indra Bastian",
          text: "Cek profil developer & portofolio.",
          url,
        });
        setShared("done");
        setTimeout(() => setShared("idle"), 1600);
      } else {
        await navigator.clipboard.writeText(url);
        setShared("done");
        setTimeout(() => setShared("idle"), 1600);
        alert("Link profil disalin ke clipboard.");
      }
    } catch {
      // user cancel/no-op
    }
  };

  return (
    <section id="contact" className="text-center">
      <div className="inline-flex flex-wrap items-center gap-3 card-2d px-6 py-4">
        <span className="text-sm text-zinc-500">Terbuka untuk kolaborasi & proyek.</span>

        <Button asChild size="sm" variant="outline">
          <Link href={`mailto:${email}`}>Email</Link>
        </Button>
        <Button asChild size="sm" variant="outline">
          <Link href="https://github.com/devwebxyn" target="_blank">
            GitHub
          </Link>
        </Button>

        {/* Ganti tombol Hubungi -> Copy Email + Share Profil */}
        <Button size="sm" variant="outline" onClick={copyEmail}>
          {copied ? (
            <>
              <ClipboardCheck className="h-4 w-4 mr-1.5" />
              Disalin
            </>
          ) : (
            <>
              <Clipboard className="h-4 w-4 mr-1.5" />
              Copy Email
            </>
          )}
        </Button>
        <Button size="sm" onClick={shareProfile}>
          <Share2 className="h-4 w-4 mr-1.5" />
          {shared === "done" ? "Dibagikan!" : "Bagikan Profil"}
        </Button>
      </div>

      <p className="mt-2 text-xs text-zinc-500">
        * Email/GitHub/CV bisa kamu ganti kapan saja.
      </p>
    </section>
  );
}
