import { Shield, Lock, KeyRound, GlobeLock } from "lucide-react";

const items = [
  { icon: Shield, t: "Best Practice", d: "HTTPS, HSTS, CSP ketat, sanitasi input." },
  { icon: Lock, t: "Enkripsi", d: "TLS 1.3 in transit; AES-256 at rest (storage penyedia)." },
  { icon: KeyRound, t: "Webhook Signature", d: "Validasi HMAC & replay protection." },
  { icon: GlobeLock, t: "Audit Log", d: "Jejak perubahan & status pembayaran." },
];

export default function SecurityCompliance() {
  return (
    <div className="grid md:grid-cols-4 gap-6">
      {items.map((x) => (
        <div key={x.t} className="card-2d p-6">
          <div className="h-10 w-10 rounded-xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center mb-3">
            <x.icon className="h-5 w-5" />
          </div>
          <div className="font-medium">{x.t}</div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">{x.d}</p>
        </div>
      ))}
    </div>
  );
}
