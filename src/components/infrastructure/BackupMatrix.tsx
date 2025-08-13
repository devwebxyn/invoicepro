export default function BackupMatrix() {
  const rows = [
    { k: "Database snapshot", freq: "15 menit", ret: "7 hari" },
    { k: "Storage PDF", freq: "harian", ret: "30 hari" },
    { k: "Konfigurasi", freq: "harian", ret: "14 hari" },
  ];
  return (
    <section className="overflow-hidden rounded-2xl border">
      <div className="grid grid-cols-3 text-sm bg-zinc-50 dark:bg-zinc-900">
        <div className="p-3 font-medium">Komponen</div>
        <div className="p-3 font-medium">Frekuensi</div>
        <div className="p-3 font-medium">Retensi</div>
      </div>
      <div className="divide-y">
        {rows.map(r => (
          <div key={r.k} className="grid grid-cols-3">
            <div className="p-3">{r.k}</div>
            <div className="p-3">{r.freq}</div>
            <div className="p-3">{r.ret}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
