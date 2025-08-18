export const revalidate = 0;
export const dynamic = "force-dynamic";

import { getSession } from "@/lib/session";
import { appwriteServer } from "@/lib/appwrite";
import { Query } from "node-appwrite";
import Link from "next/link";
import ClientActions from "./ClientActions";
import AfterPaySync from "./AfterPaySync";

/* Small helpers */
function daysLeftISO(end?: string | null) {
  if (!end) return null;
  const ms = new Date(end).getTime() - Date.now();
  return Math.max(0, Math.ceil(ms / (24 * 60 * 60 * 1000)));
}

function StatCard({ title, children, className = "" }: any) {
  return (
    <div className={"rounded-2xl border p-5 shadow-sm " + className}>
      <div className="text-sm font-semibold text-zinc-500">{title}</div>
      <div className="mt-2">{children}</div>
    </div>
  );
}

export default async function ManagePlanPage() {
  const sess = await getSession();
  if (!sess) return null;

  const { db } = appwriteServer();
  const list = await db.listDocuments(
    process.env.APPWRITE_DATABASE_ID!, process.env.APPWRITE_USERS_COLLECTION_ID!,
    [Query.equal("user_id", (sess as any).sub)]
  );
  const doc = list.total ? (list.documents[0] as any) : null;

  const plan = (doc?.plan ?? "free") as "free"|"pro"|"business";
  const interval = (doc?.plan_interval ?? "monthly") as "monthly"|"yearly";
  const status = doc?.plan_status ?? "inactive";
  const untilISO = doc?.plan_active_until ?? null;
  const dLeft = daysLeftISO(untilISO);

  return (
    <div className="space-y-6">
      <div className="flex items-baseline justify-between gap-4">
        <h1 className="text-2xl font-semibold">Manage Your Plan</h1>
        <Link href="/dashboard/plan" className="text-sm underline underline-offset-4">
          Kembali ke halaman plan
        </Link>
      </div>

      <AfterPaySync />

      {/* === 3 Cards summary === */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Your Plan */}
        <StatCard title="Your Plan">
          <div className="text-xl font-bold">{plan.toUpperCase()}</div>
          <div className="mt-1 text-sm text-zinc-500">Interval: <b>{interval}</b> • Status: <b>{status}</b></div>
        </StatCard>

        {/* Akhir periode */}
        <StatCard title="Akhir Periode">
          <div className="text-xl font-bold">
            {untilISO ? new Date(untilISO).toLocaleString("id-ID") : "-"}
          </div>
          <div className="mt-1 text-sm text-zinc-500">
            {untilISO ? <>Sisa waktu: <b>H-{dLeft}</b></> : "Tidak ada masa aktif"}
          </div>
        </StatCard>

        {/* Ucapan selamat */}
        {plan !== "free" ? (
          <div className="rounded-2xl p-5 shadow-sm border bg-gradient-to-r from-indigo-600 to-fuchsia-500 text-white">
            <div className="text-sm font-semibold opacity-90">Selamat 🎉</div>
            <div className="mt-2 text-xl font-bold">
              Kamu sekarang di {plan.toUpperCase()}!
            </div>
            <div className="mt-1 text-sm opacity-90">
              Nikmati fitur premium. Kelola tagihan & interval di bawah ini.
            </div>
          </div>
        ) : (
          <StatCard title="Informasi">
            <div className="text-sm text-zinc-600">Belum berlangganan. Upgrade untuk membuka fitur premium.</div>
          </StatCard>
        )}
      </div>

      {/* === Actions === */}
      <ClientActions
        currentPlan={plan}
        interval={interval}
        canSwitch={plan === "pro" || plan === "business"}
        canCancel={plan === "pro" || plan === "business"}
        scheduledCancel={false}
        activeUntil={untilISO}
        cancelAt={null}
      />

      <div className="rounded-2xl border p-4 text-xs text-zinc-500">
        <p><b>Catatan:</b> Pembatalan berlaku <b>seketika</b> dan <b>tidak ada pengembalian dana</b>. Kamu tetap bisa berlangganan kembali kapan pun.</p>
      </div>
    </div>
  );
}
