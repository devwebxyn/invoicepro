// Sumber angka realtime sederhana (random-walk) — ganti dgn data asli jika ada.
export type StatusSummary = {
  updatedAt: string;
  uptime30d: number; // %
  p95: number;       // ms
  errorRate: number; // %
};

let state: StatusSummary = {
  updatedAt: new Date().toISOString(),
  uptime30d: 99.92,
  p95: 280,
  errorRate: 0.12,
};

function step(v: number, target: number, noise = 0.35) {
  const drift = (target - v) * 0.06;
  const shake = (Math.random() - 0.5) * noise;
  return v + drift + shake;
}

export function getStatus(): StatusSummary {
  // target bisa kamu jadikan nilai “nyata” dari DB/monitoring
  const target = { uptime: 99.91, p95: 290, err: 0.14 };
  state = {
    updatedAt: new Date().toISOString(),
    uptime30d: Math.max(99.6, Math.min(100, step(state.uptime30d, target.uptime, 0.1))),
    p95: Math.max(150, Math.min(600, step(state.p95, target.p95, 3))),
    errorRate: Math.max(0, Math.min(3, step(state.errorRate, target.err, 0.03))),
  };
  return state;
}
