export default function AuthLoading() {
  return (
    <main className="min-h-[60vh] grid place-items-center">
      <div className="text-center">
        <div className="animate-spin h-8 w-8 rounded-full border-2 border-zinc-300 border-t-transparent mx-auto" />
        <p className="mt-3 text-sm text-zinc-600">Memverifikasi akun Anda, harap tunggu…</p>
      </div>
    </main>
  );
}
