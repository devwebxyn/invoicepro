// src/app/dashboard/settings/page.tsx
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { appwriteServer } from "@/lib/appwrite";
import { Query } from "node-appwrite";
import { Card, CardContent } from "@/components/ui/card";
import SettingsForm from "./SettingsForm";

export default async function SettingsPage() {
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
      <div>
        <h1 className="text-2xl font-semibold">Pengaturan Profil</h1>
        <p className="text-sm text-zinc-500">
          Perbarui informasi profil dan preferensi Anda di sini.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Kolom kiri: Form Edit */}
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <h3 className="font-medium mb-4">Informasi Akun</h3>
            <SettingsForm profile={profile} />
          </CardContent>
        </Card>

        {/* Kolom kanan: Info Tambahan dari Onboarding */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-5">
              <p className="text-sm text-zinc-500">Alasan bergabung</p>
              <p className="mt-2 font-medium">{profile?.reason || "-"}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <p className="text-sm text-zinc-500">Rating</p>
              <p className="mt-2 font-medium">{profile?.rating ?? "-"}/5</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}