import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DevContact() {
  return (
    <section className="text-center">
      <div className="inline-flex items-center gap-3 card-2d px-6 py-4">
        <span className="text-sm text-zinc-500">Punya proyek atau kolaborasi?</span>
        <Link href="/contact">
          <Button size="lg">Hubungi Samuel</Button>
        </Link>
      </div>
    </section>
  );
}
