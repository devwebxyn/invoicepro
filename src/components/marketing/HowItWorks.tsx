const steps = [
  { n: "01", t: "Buat Invoice", d: "Isi pelanggan, item, dan jatuh tempo." },
  { n: "02", t: "Kirim Link", d: "Share URL invoice publik ke customer." },
  { n: "03", t: "Customer Bayar", d: "QRIS/VA/eWallet → kwitansi otomatis & PDF." },
];

export default function HowItWorks() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
      <h2 className="text-2xl md:text-3xl font-semibold">Cara Kerja</h2>
      <div className="mt-8 grid md:grid-cols-3 gap-6">
        {steps.map(s => (
          <div key={s.n} className="rounded-2xl border p-6">
            <div className="text-zinc-400 text-sm">{s.n}</div>
            <div className="text-lg font-medium">{s.t}</div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">{s.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
