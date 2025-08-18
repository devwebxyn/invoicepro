"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  CreditCard,
  CalendarClock,
  CheckCircle2,
  PauseCircle,
  RotateCcw,
  X,
  PartyPopper,
} from "lucide-react";

type Props = {
  currentPlan: "free" | "pro" | "business";
  interval: "monthly" | "yearly";
  canSwitch: boolean;
  canCancel: boolean;
  scheduledCancel: boolean; // true jika ada plan_cancel_at (jadwal berhenti di akhir periode)
  activeUntil: string | null; // ISO
  cancelAt: string | null; // ISO
};

/* ---------- UI primitives ---------- */
function Spinner() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 animate-spin">
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
        opacity="0.25"
      />
      <path
        d="M22 12a10 10 0 0 1-10 10"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}
function PrimaryButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean }
) {
  const { className = "", loading, children, ...rest } = props;
  return (
    <button
      {...rest}
      className={
        "h-12 px-6 rounded-2xl text-base font-semibold " +
        "bg-black text-white dark:bg-white dark:text-black " +
        "shadow-md ring-1 ring-black/5 hover:opacity-90 disabled:opacity-50 " +
        className
      }
    >
      <span className="inline-flex items-center gap-2">
        {loading && <Spinner />}
        {children}
      </span>
    </button>
  );
}
function DangerButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean }
) {
  const { className = "", loading, children, ...rest } = props;
  return (
    <button
      {...rest}
      className={
        "h-12 px-6 rounded-2xl text-base font-semibold " +
        "bg-red-600 text-white hover:bg-red-500 shadow-md disabled:opacity-50 " +
        className
      }
    >
      <span className="inline-flex items-center gap-2">
        {loading && <Spinner />}
        {children}
      </span>
    </button>
  );
}
function GhostButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { className = "", children, ...rest } = props;
  return (
    <button
      {...rest}
      className={
        "h-12 px-6 rounded-2xl text-base font-medium " +
        "bg-zinc-200 text-zinc-900 hover:bg-zinc-300 " +
        "dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700 " +
        "disabled:opacity-50 " +
        className
      }
    >
      {children}
    </button>
  );
}
function Modal({
  open,
  onClose,
  title,
  children,
  footer,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100]">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
        onClick={onClose}
      />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-2xl bg-white dark:bg-zinc-900 shadow-2xl ring-1 ring-black/5">
          <div className="flex items-center justify-between px-5 py-4">
            <h4 className="text-lg font-semibold">{title}</h4>
            <button
              onClick={onClose}
              className="rounded-lg p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="px-5 pb-2 text-sm text-zinc-600 dark:text-zinc-300">
            {children}
          </div>
          <div className="flex items-center justify-end gap-3 px-5 pb-5">
            {footer}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Component ---------- */
export default function ClientActions({
  currentPlan,
  interval,
  canSwitch,
  canCancel,
  scheduledCancel,
  activeUntil,
  cancelAt,
}: Props) {
  const router = useRouter();
  const [loading, setLoading] = React.useState<"switch" | "cancel" | "resume" | null>(null);
  const [openCancel, setOpenCancel] = React.useState(false);
  const [toast, setToast] = React.useState<string | null>(null);

  /* ===== Switch: Monthly -> Yearly only ===== */
  const isYearly = interval === "yearly";
  async function switchToYearly() {
    setLoading("switch");
    try {
      const res = await fetch("/api/billing/switch-interval", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ target: "yearly" }),
      });
      const j = await res.json();
      if (!res.ok) throw new Error(j.error || "Gagal membuat invoice");
      window.location.href = j.invoice_url;
    } finally {
      setLoading(null);
    }
  }

  /* ===== Cancel NOW (instan, semua paid plans) ===== */
  async function cancelNow() {
    setLoading("cancel");
    try {
      const res = await fetch("/api/billing/cancel-now", { method: "POST" });
      if (!res.ok) throw new Error("Gagal membatalkan");
      setToast("Langganan dibatalkan. Kamu kini pada plan Free.");
      router.refresh();
    } finally {
      setLoading(null);
      setOpenCancel(false);
      setTimeout(() => setToast(null), 2500);
    }
  }

  /* ===== Resume (only if previously scheduled cancel, monthly, H-3) ===== */
  const MS = 24 * 60 * 60 * 1000;
  const endAt = cancelAt || activeUntil; // tanggal akhir efektif
  const daysLeft =
    endAt != null ? Math.ceil((new Date(endAt).getTime() - Date.now()) / MS) : null;
  const canShowResume =
    interval === "monthly" &&
    scheduledCancel &&
    daysLeft !== null &&
    daysLeft <= 3 &&
    daysLeft >= 0;

  async function resume() {
    setLoading("resume");
    try {
      const res = await fetch("/api/billing/resume", { method: "POST" });
      if (!res.ok) throw new Error("Gagal resume");
      router.refresh();
    } finally {
      setLoading(null);
    }
  }

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2">
        {/* ===== Switch Billing Interval ===== */}
        <div className="rounded-2xl border p-6 shadow-sm">
          <div className="flex items-center gap-2">
            <CalendarClock className="h-5 w-5" />
            <h3 className="text-lg font-semibold">Switch Billing Interval</h3>
          </div>
          <p className="mt-1 text-sm text-zinc-500">
            {isYearly ? (
              <>
                Anda sudah pada <b>Tahunan</b>. Penurunan ke bulanan tidak
                tersedia.
              </>
            ) : (
              <>
                Ubah interval {currentPlan.toUpperCase()} dari <b>Bulanan</b> ke{" "}
                <b>Tahunan</b>.
              </>
            )}
          </p>

          <div className="mt-5 flex items-center gap-3">
            {isYearly ? (
              <GhostButton disabled>Interval saat ini: Tahunan</GhostButton>
            ) : (
              <PrimaryButton
                onClick={switchToYearly}
                disabled={!canSwitch || !!loading}
                loading={loading === "switch"}
              >
                <CreditCard className="h-5 w-5" />
                Apply &amp; Bayar (ke Tahunan)
              </PrimaryButton>
            )}
            <GhostButton disabled>Info: Tanpa prorata</GhostButton>
          </div>

          <p className="mt-3 text-xs text-zinc-500">
            Perubahan berlaku setelah pembayaran selesai (tanpa prorata).
          </p>
        </div>

        {/* ===== Cancel / Resume combined ===== */}
        <div className="rounded-2xl border p-6 shadow-sm">
          <div className="flex items-center gap-2">
            {scheduledCancel ? (
              <PauseCircle className="h-5 w-5 text-amber-600" />
            ) : (
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
            )}
            <h3 className="text-lg font-semibold">Cancel Subscription</h3>
          </div>

          {/* Info status jadwal (kalau ada) */}
          {scheduledCancel ? (
            <p className="mt-1 text-sm text-zinc-500">
              Pembatalan sudah dijadwalkan untuk akhir periode.
              {daysLeft !== null && daysLeft >= 0 && (
                <>
                  {" "}
                  Sisa waktu: <b>H-{daysLeft}</b>.
                </>
              )}
            </p>
          ) : (
            <p className="mt-1 text-sm text-zinc-500">
              Pembatalan <b>langsung</b> (instan) tanpa refund. Akses premium
              dihentikan saat ini juga.
            </p>
          )}

          {/* Aksi utama: Batalkan Sekarang (instan) */}
          <DangerButton
            className="mt-5"
            onClick={() => setOpenCancel(true)}
            disabled={!canCancel || !!loading}
          >
            Batalkan Sekarang
          </DangerButton>

          {/* Aksi tambahan: Resume (hanya kalau sebelumnya dijadwalkan + H-3) */}
          {scheduledCancel && (
            <>
              {canShowResume ? (
                <PrimaryButton
                  className="mt-3"
                  onClick={resume}
                  disabled={!!loading}
                  loading={loading === "resume"}
                >
                  <RotateCcw className="h-5 w-5" />
                  Resume Langganan
                </PrimaryButton>
              ) : (
                <GhostButton className="mt-3" disabled>
                  {interval === "monthly"
                    ? "Resume tersedia H-3 sebelum jatuh tempo"
                    : "Tidak ada Resume untuk tahunan"}
                </GhostButton>
              )}
            </>
          )}

          {activeUntil && (
            <p className="mt-3 text-xs text-zinc-500">
              Terakhir aktif: {new Date(activeUntil).toLocaleString("id-ID")}
            </p>
          )}
        </div>
      </div>

      {/* Modal konfirmasi cancel-now */}
      <Modal
        open={openCancel}
        onClose={() => setOpenCancel(false)}
        title="Konfirmasi Pembatalan"
        footer={
          <>
            <GhostButton onClick={() => setOpenCancel(false)}>Tutup</GhostButton>
            <DangerButton onClick={cancelNow} loading={loading === "cancel"}>
              Ya, Batalkan Sekarang
            </DangerButton>
          </>
        }
      >
        <div className="flex items-start gap-3">
          <PartyPopper className="mt-0.5 h-5 w-5 text-amber-500" />
          <div>
            <p>
              Anda akan turun ke <b>Free</b> seketika. <b>Tidak ada pengembalian dana</b>.
            </p>
            <p className="mt-2">Anda bisa berlangganan kembali kapan pun.</p>
          </div>
        </div>
      </Modal>

      {/* Toast sederhana */}
      {toast && (
        <div className="fixed bottom-4 left-1/2 z-[110] -translate-x-1/2 rounded-2xl bg-black px-4 py-2 text-white shadow-lg">
          {toast}
        </div>
      )}
    </>
  );
}
