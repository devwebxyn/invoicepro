export default function DevTimeline() {
  const rows = [
    {
      title: "Full-stack Developer (Mandiri)",
      period: "Sekarang",
      detail: "Membangun aplikasi Invoice & Receipt Pro: Next.js, Appwrite, integrasi pembayaran, PDF engine, dan monitoring realtime.",
    },
    {
      title: "Kelas XI EIA — Semester 2",
      period: "Pendidikan",
      detail: "Jurusan Teknik Elektronika Industri. Memperdalam dasar sistem, elektronika, dan otomasi yang menunjang software engineering.",
    },
  ];

  return (
    <section>
      <h2 className="text-2xl md:text-3xl font-semibold mb-4">Timeline</h2>
      <div className="relative ml-2">
        <div className="absolute left-2 top-0 bottom-0 w-[2px] bg-zinc-200 dark:bg-zinc-800" />
        <div className="space-y-6">
          {rows.map((r, i) => (
            <div key={i} className="relative pl-8">
              <div className="absolute left-0 top-1 h-4 w-4 rounded-full bg-indigo-500 ring-4 ring-indigo-500/20" />
              <div className="card-2d p-4">
                <div className="text-sm text-zinc-500">{r.period}</div>
                <div className="font-medium">{r.title}</div>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{r.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
