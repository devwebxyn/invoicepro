export default function Logos() {
  const logos = ["Xendit", "QRIS", "BCA", "BNI", "BRI", "Mandiri"];
  return (
    <section className="mx-auto max-w-6xl px-4 py-10 opacity-80">
      <div className="grid grid-cols-3 md:grid-cols-6 gap-6 text-center text-sm text-zinc-500">
        {logos.map((l) => (
          <div key={l} className="py-3 rounded-xl border border-zinc-200/70 dark:border-zinc-800/70">{l}</div>
        ))}
      </div>
    </section>
  );
}
