"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, X } from "lucide-react";
import Link from "next/link";

type Project = {
  name: string;
  desc: string;
  href: string;
  img: string; // path ke PNG lokal di /public
};

const projects: Project[] = [
  {
    name: "Portfolio — samuelindrabastian.me",
    desc: "Portofolio pribadi: proyek, eksperimen UI/UX, dan tulisan ringkas.",
    href: "https://www.samuelindrabastian.me/",
    img: "/projects/portfolio.png",
  },
  {
    name: "CloudNest — Google Drive",
    desc: "Web cloud storage berbasis Google Drive: upload, preview, dan share link.",
    href: "https://cloudnestweb.netlify.app/",
    img: "/projects/cloudnest.png",
  },
  {
    name: "Storage — Appwrite",
    desc: "Cloud storage dengan Appwrite (DB/Auth/Storage): folder, preview, dan share.",
    href: "https://storagewebsamuel.vercel.app/",
    img: "/projects/storage-appwrite.png",
  },
];

function ProjectCard({ p }: { p: Project }) {
  const [fallback, setFallback] = useState(false);

  return (
    <Card className="overflow-hidden card-2d">
      <CardContent className="p-0">
        {fallback ? (
          <div className="w-full h-40 bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900" />
        ) : (
          <img
            src={p.img}
            alt={p.name}
            className="w-full h-40 object-cover"
            loading="lazy"
            onError={() => setFallback(true)}
          />
        )}

        <div className="p-4">
          <div className="font-medium">{p.name}</div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">{p.desc}</p>
          <div className="mt-3">
            <Link
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-indigo-600 hover:underline"
            >
              Buka <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function DevProjects() {
  const [open, setOpen] = useState(false);

  // Esc to close + lock body scroll saat modal terbuka
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl md:text-3xl font-semibold">Proyek Unggulan</h2>

        {/* Tombol yang membuka modal */}
        <button
          onClick={() => setOpen(true)}
          className="text-sm text-indigo-600 hover:underline inline-flex items-center gap-1"
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls="all-projects-modal"
        >
          Lihat semua <ArrowUpRight className="h-4 w-4" />
        </button>
      </div>

      {/* Grid singkat di halaman */}
      <div className="grid md:grid-cols-3 gap-4">
        {projects.map((p) => (
          <ProjectCard key={p.name} p={p} />
        ))}
      </div>

      {/* ===== Modal / Popup ===== */}
      {open && (
        <div
          id="all-projects-modal"
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Dialog panel */}
          <div className="relative mx-auto mt-10 md:mt-16 max-w-5xl rounded-2xl bg-white dark:bg-zinc-950 shadow-2xl border border-zinc-200/60 dark:border-zinc-800/60 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-200/60 dark:border-zinc-800/60">
              <div className="font-semibold">Semua Proyek</div>
              <button
                onClick={() => setOpen(false)}
                className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900"
                aria-label="Tutup"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-5">
              <div className="grid md:grid-cols-3 gap-4">
                {projects.map((p) => (
                  <ProjectCard key={`modal-${p.name}`} p={p} />
                ))}
              </div>

              <div className="mt-6 text-center text-sm text-zinc-500">
                Proyek lain akan muncul di sini.
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
