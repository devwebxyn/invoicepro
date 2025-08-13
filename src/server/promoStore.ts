export type PlanKey = "starter" | "pro" | "business";
export type PromoData = {
  endsAt: string;
  updatedAt: string;
  plans: Record<PlanKey, { discountPercent: number; slotsTotal: number; slotsLeft: number }>;
};

let _data: PromoData = {
  endsAt: "2025-08-31T16:59:59.000Z",
  updatedAt: new Date().toISOString(),
  plans: {
    starter:  { discountPercent: 0,  slotsTotal: 0,  slotsLeft: 0 },
    pro:      { discountPercent: 20, slotsTotal: 100, slotsLeft: 18 },
    business: { discountPercent: 25, slotsTotal: 50,  slotsLeft: 7  },
  },
};

export function getPromo(): PromoData {
  _data = { ..._data, updatedAt: new Date().toISOString() };
  return _data;
}

export function setPromo(partial: Partial<PromoData>) {
  _data = { ..._data, ...partial, updatedAt: new Date().toISOString() };
}
