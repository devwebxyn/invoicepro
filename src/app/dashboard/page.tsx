// src/app/dashboard/page.tsx
import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/session";
import { appwriteServer } from "@/lib/appwrite";
import { Query } from "node-appwrite";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, DollarSign, FileText, PlusCircle } from "lucide-react";

export default async function DashboardPage() {
  const sess = await getSession();
  if (!sess) redirect("/masuk");

  const { db } = appwriteServer();
  const list = await db.listDocuments(
    process.env.APPWRITE_DATABASE_ID!,
    process.env.APPWRITE_USERS_COLLECTION_ID!,
    [Query.equal("user_id", sess.sub)]
  );
  const profile = list.total ? (list.documents[0] as any) : null;

  return (
    <div className="space-y-6">
      {/* Header Halaman */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">
            Halo, {profile?.display_name || sess.name || "User"} 👋
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Selamat datang kembali di dashboard Anda.
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/invoices/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Buat Invoice Baru
          </Link>
        </Button>
      </div>

      {/* Ringkasan Statistik */}
      <section className="grid md:grid-cols-3 gap-6">
        <Card className="card-2d">
          <CardContent className="p-5">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-zinc-500" />
              <p className="text-sm text-zinc-500">Pendapatan (Bulan Ini)</p>
            </div>
            <p className="mt-2 text-2xl font-semibold">Rp 0</p>
          </CardContent>
        </Card>
        <Card className="card-2d">
          <CardContent className="p-5">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-zinc-500" />
              <p className="text-sm text-zinc-500">Invoice Terbayar</p>
            </div>
            <p className="mt-2 text-2xl font-semibold">0 / 0</p>
          </CardContent>
        </Card>
        <Card className="card-2d">
          <CardContent className="p-5">
            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-zinc-500" />
              <p className="text-sm text-zinc-500">Akses Pengaturan</p>
            </div>
            <Button asChild variant="outline" className="mt-2 w-full">
              <Link href="/dashboard/settings">
                Buka Pengaturan Profil
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Aktivitas/Invoice Terbaru */}
      <Card>
        <CardContent className="p-6">
          <h3 className="font-medium">Invoice Terbaru</h3>
          <p className="text-sm text-zinc-500 mt-2 text-center py-8">
            Belum ada invoice. Buat yang pertama sekarang!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}