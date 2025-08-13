const list = [
  {
    name: "Raka – Studio Kreatif",
    quote: "Template PDF-nya rapih banget. Klien langsung percaya dari tampilan.",
  },
  {
    name: "Nadia – Freelancer",
    quote: "Sekarang kirim link, klien bayar QRIS. Kwitansi otomatis. Hemat waktu.",
  },
  {
    name: "Halim – UMKM",
    quote: "Dashboard sederhana tapi lengkap. Export batch PDF juga ada.",
  },
];

export default function Testimonials() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <h2 className="text-2xl md:text-3xl font-semibold">Kata Pengguna</h2>
      <div className="mt-8 grid md:grid-cols-3 gap-6">
        {list.map((t) => (
          <div key={t.name} className="rounded-2xl border p-6">
            <p className="text-sm">“{t.quote}”</p>
            <div className="mt-3 text-xs text-zinc-500">— {t.name}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
