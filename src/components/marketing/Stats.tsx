const items = [
  { k: "Invoice terkirim", v: "12.4K+" },
  { k: "Metode bayar", v: "8+" },
  { k: "Uptime", v: "99.9%" },
  { k: "Waktu buat", v: "< 30 dtk" },
];

export default function Stats() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((i) => (
          <div key={i.k} className="rounded-2xl border p-5 text-center">
            <div className="text-2xl font-semibold">{i.v}</div>
            <div className="text-xs text-zinc-500 mt-1">{i.k}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
