"use client";
import Link from "next/link";

export default function FloatingCTA() {
  return (
    <div className="print:hidden fixed bottom-6 right-6 z-40">
      <Link href="/invoices/new" className="rounded-full shadow-lg bg-black text-white dark:bg-white dark:text-black px-5 h-12 inline-flex items-center">
        Buat Invoice Cepat →
      </Link>
    </div>
  );
}
