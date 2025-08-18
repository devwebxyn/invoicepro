export const revalidate = 0;
export const dynamic = "force-dynamic";
import { getSession } from "@/lib/session";
import { appwriteServer } from "@/lib/appwrite";
import { Query } from "node-appwrite";
import { type Plan } from "@/lib/plans";
import ClientPlans from "./ClientPlans";

export default async function PlanPage() {
  const sess = await getSession();
  if (!sess) return null;

  const { db } = appwriteServer();
  const list = await db.listDocuments(
    process.env.APPWRITE_DATABASE_ID!,
    process.env.APPWRITE_USERS_COLLECTION_ID!,
    [Query.equal("user_id", (sess as any).sub)]
  );
  const profile = list.total ? (list.documents[0] as any) : null;
  const currentPlan: Plan = (profile?.plan ?? "free") as Plan;

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">Your Plan</h1>
        <p className="text-sm text-zinc-500">
          Status: <b>{currentPlan.toUpperCase()}</b>{" "}
          {profile?.plan_status === "active" && profile?.plan_active_until
            ? `(aktif s/d ${new Date(profile.plan_active_until).toLocaleDateString()})`
            : ""}
        </p>
      </header>

  <ClientPlans currentPlan={currentPlan} />
    </div>
  );
}

