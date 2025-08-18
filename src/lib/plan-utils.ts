export function isPaidPlan(p?: string) {
  return p === "pro" || p === "business";
}

export function isCurrentlyActive(doc: any) {
  if (!isPaidPlan(doc?.plan)) return false;
  const now = Date.now();
  const until = doc?.plan_active_until ? new Date(doc.plan_active_until).getTime() : 0;
  const canceledAt = doc?.plan_cancel_at ? new Date(doc.plan_cancel_at).getTime() : 0;
  // aktif jika masih dalam masa aktif, dan (jika cancel dijadwalkan) belum melewati cancel_at
  const alive = now < until && (!canceledAt || now < canceledAt);
  return alive && doc?.plan_status === "active";
}
