import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { appwriteServer } from "@/lib/appwrite";
import { Query } from "node-appwrite";

export default async function Dashboard() {
  const sess = await getSession();
  if (!sess) redirect("/masuk");

  const { db } = appwriteServer();
  const list = await db.listDocuments(
    process.env.APPWRITE_DATABASE_ID!,
    process.env.APPWRITE_USERS_COLLECTION_ID!,
    [Query.equal("user_id", sess.sub)]
  );
  const profile = list.total ? list.documents[0] as any : null;

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 rounded-full bg-zinc-100 overflow-hidden">
          {profile?.profile_image ? (
            <img src={profile.profile_image} alt="avatar" className="h-full w-full object-cover" />
          ) : (
            <img src="/avatar-default.svg" alt="default avatar" className="h-full w-full object-cover" />
          )}
        </div>
        <div>
          <h1 className="text-2xl font-semibold">Halo, {profile?.display_name || sess.name || "User"} 👋</h1>
          <p className="text-sm text-zinc-600">
            @{profile?.username || "belum-set"} • {profile?.auth_provider || sess.provider}
          </p>
        </div>
        <form action="/api/auth/signout" method="post" className="ml-auto">
          <button className="h-10 px-4 rounded-xl border">Sign out</button>
        </form>
      </div>

      <section className="mt-8 grid md:grid-cols-3 gap-4">
        <div className="card-2d p-5">
          <div className="text-sm text-zinc-500">Alasan bergabung</div>
          <div className="mt-2 font-medium">{profile?.reason || "-"}</div>
        </div>
        <div className="card-2d p-5">
          <div className="text-sm text-zinc-500">Rating</div>
          <div className="mt-2 font-medium">{profile?.rating ?? "-"}/5</div>
        </div>
        <div className="card-2d p-5">
          <div className="text-sm text-zinc-500">Email</div>
          <div className="mt-2 font-medium">{profile?.email || sess.email}</div>
        </div>
      </section>

      <div className="mt-8">
        <a href="/onboarding" className="inline-flex items-center gap-2 h-10 px-4 rounded-xl border hover:bg-zinc-50">
          Edit Profil
        </a>
      </div>
    </main>
  );
}
