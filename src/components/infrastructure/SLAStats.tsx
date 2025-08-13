export default function SLAStats() {
  const items = [
    { k: "Uptime target", v: "99.9%" },
    { k: "RTO (restore)", v: "< 30 mnt" },
    { k: "RPO (kehilangan data)", v: "< 15 mnt" },
  ];
  return (
    <section className="grid md:grid-cols-3 gap-4">
      {items.map(i => (
        <div key={i.k} className="gborder rounded-2xl p-6 text-center">
          <div className="text-3xl font-semibold">{i.v}</div>
          <div className="text-sm text-zinc-500 mt-1">{i.k}</div>
        </div>
      ))}
    </section>
  );
}
