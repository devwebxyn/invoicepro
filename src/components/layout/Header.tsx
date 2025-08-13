"use client";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur border-b border-zinc-100/50 dark:border-zinc-800/50">
      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Sparkles className="h-5 w-5" />
          <span>Invoice & Receipt Pro</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a href="/features" className="hover:opacity-80">Fitur</a>
          <a href="/berlangganan" className="hover:opacity-80">Berlangganan</a>
          <a href="/infrastruktur" className="hover:opacity-80">Infrastruktur</a>
          <a href="#Contact" className="hover:opacity-80">Contact</a>
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/dashboard"><Button variant="ghost">Masuk</Button></Link>
          <Link href="/dashboard"><Button>Mulai Gratis</Button></Link>
        </div>
      </div>
    </header>
  );
}
