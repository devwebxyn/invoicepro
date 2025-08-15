// src/lib/upsertUser.ts
import { appwriteServer } from "./appwrite";
import { ID, Query } from "node-appwrite";

type UpsertInput = {
  provider: "google" | "facebook" | "twitter";
  provider_uid: string;
  email?: string;
  name?: string;
  avatar?: string;
};

export async function upsertUser({ provider, provider_uid, email, name, avatar }: UpsertInput) {
  const { db, users, usersCollectionId } = appwriteServer();

  // 1) Cari user custom collection berdasarkan provider_uid
  const found = await db.listDocuments(
    process.env.APPWRITE_DATABASE_ID!, // tambahkan DB id bila belum
    usersCollectionId,
    [Query.equal("provider_uid", provider_uid)]
  );

  if (found.total > 0) {
    const doc = found.documents[0];
    // update profil basic
    await db.updateDocument(
      process.env.APPWRITE_DATABASE_ID!, usersCollectionId, doc.$id,
      { email, display_name: name, profile_image: avatar, auth_provider: provider }
    );
    return { userId: doc.user_id as string, docId: doc.$id as string, isNew: false };
  }

  // 2) Jika belum ada: buat Appwrite Auth user (server side)
  // NB: user dapat dibuat tanpa password, via create() dengan email dan nama
  const appwriteUser = await users.create(ID.unique(), email, undefined, undefined, name);

  // 3) Simpan ke collection custom
  const doc = await db.createDocument(
    process.env.APPWRITE_DATABASE_ID!,
    usersCollectionId,
    ID.unique(),
    {
      user_id: appwriteUser.$id,
      username: null,
      profile_image: avatar || null,
      reason: null,
      rating: null,
      auth_provider: provider,
      provider_uid,
      email,
      display_name: name,
    }
  );

  return { userId: appwriteUser.$id, docId: doc.$id, isNew: true };
}
