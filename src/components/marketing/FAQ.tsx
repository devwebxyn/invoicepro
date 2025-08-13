export default function FAQ() {
  const faqs = [
    { q: "Apakah saya bisa withdraw hanya dengan Xendit?", a: "Bisa. Gunakan auto-settlement Xendit ke rekeningmu, atau Disbursement untuk tarik manual." },
    { q: "Apakah ada PDF sebelum & sesudah pembayaran?", a: "Ya. Invoice (pre-payment) & Receipt (post-payment) dengan template berbeda." },
    { q: "Metode pembayaran apa yang didukung?", a: "QRIS, VA (BCA/BNI/BRI/Mandiri), eWallet (OVO/DANA/ShopeePay/LinkAja), kartu (opsional)." },
  ];
  return (
    <section id="faq" className="mx-auto max-w-6xl px-4 py-16 md:py-24">
      <h2 className="text-2xl md:text-3xl font-semibold">FAQ</h2>
      <div className="mt-6 grid md:grid-cols-3 gap-6">
        {faqs.map((f) => (
          <div key={f.q} className="rounded-2xl border p-6">
            <div className="font-medium">{f.q}</div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">{f.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
