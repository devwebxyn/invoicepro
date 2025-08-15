export default function AuthErrorPage() {
  return (
    <main className="min-h-[60vh] grid place-items-center text-center">
      <div>
        <h1 className="text-2xl font-semibold text-red-600">Error Otorisasi</h1>
        <p className="mt-2 text-zinc-600">
          Terjadi kesalahan saat mencoba masuk. State tidak valid atau sesi telah kedaluwarsa.
        </p>
        <a href="/masuk" className="mt-4 inline-block underline">
          Kembali ke halaman masuk
        </a>
      </div>
    </main>
  );
}
