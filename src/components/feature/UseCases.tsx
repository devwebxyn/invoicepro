const cases = [
  { t: "Freelancer", d: "Kirim invoice cepat, payment link instan, kwitansi otomatis." },
  { t: "Agensi/Studio", d: "Multi-invoice, export batch, branding & domain sendiri." },
  { t: "UMKM/Online Shop", d: "QRIS/VA/eWallet lengkap, status realtime, arsip rapi." },
  { t: "SaaS/Subscription", d: "Template berulang, reminder otomatis, webhook." },
];

export default function UseCases() {
  return (
    <div className="grid md:grid-cols-4 gap-6">
      {cases.map((c) => (
        <div key={c.t} className="card-2d p-6">
          <div className="font-medium">{c.t}</div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">{c.d}</p>
        </div>
      ))}
    </div>
  );
}
