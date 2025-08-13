"use client";

import { useEffect, useState } from "react";

export default function CountdownWIB({ endsAt }: { endsAt: string }) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => { const id = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(id); }, []);

  const end = new Date(endsAt).getTime();
  const diff = Math.max(0, end - now);
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  const pad = (n: number) => n.toString().padStart(2, "0");

  const endLabelWIB = new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Jakarta",
  }).format(new Date(endsAt));

  return (
    <div className="mt-4 text-xs">
      <div className="text-zinc-500">Berakhir (WIB): <span className="font-medium">{endLabelWIB}</span></div>
      <div className="mt-1 font-semibold text-zinc-700 dark:text-zinc-100">
        {d > 0 ? `${d}h ${pad(h)}j ${pad(m)}m` : `${pad(h)}:${pad(m)}:${pad(s)}`}
      </div>
    </div>
  );
}
