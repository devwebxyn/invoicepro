"use client";

import Link from "next/link";
import { Sparkles, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur border-b border-zinc-100/50 dark:border-zinc-800/50">
      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Sparkles className="h-5 w-5" />
          <span>Invoice & Receipt Pro</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/features" className="hover:opacity-80">Fitur</Link>
          <Link href="/berlangganan" className="hover:opacity-80">Berlangganan</Link>
          <Link href="/infrastruktur" className="hover:opacity-80">Infrastruktur</Link>

          {/* About + submenu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="inline-flex items-center gap-1 hover:opacity-80">
                About <ChevronDown className="h-3.5 w-3.5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>About</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/about/developers">Developers</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/tentang-web-ini">Tentang Web Ini</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Link href="/masuk"><Button variant="ghost">Masuk</Button></Link>
          <Link href="/daftar"><Button>Mulai Gratis</Button></Link>
        </div>
      </div>
    </header>
  );
}
