// scripts/migrate.ts
import { Client, Databases, Users, Storage } from "node-appwrite";

const {
  APPWRITE_ENDPOINT,
  APPWRITE_PROJECT,
  APPWRITE_API_KEY,
  APPWRITE_DATABASE_ID,
  APPWRITE_USERS_COLLECTION_ID,
  APPWRITE_AVATAR_BUCKET_ID,
} = process.env;

async function main() {
  if (!APPWRITE_ENDPOINT || !APPWRITE_PROJECT || !APPWRITE_API_KEY) {
    throw new Error("Appwrite env incomplete");
  }

  const client = new Client()
    .setEndpoint(APPWRITE_ENDPOINT)
    .setProject(APPWRITE_PROJECT)
    .setKey(APPWRITE_API_KEY);

  const db = new Databases(client);
  const storage = new Storage(client);

  // 1) Database
  try {
    await db.get(APPWRITE_DATABASE_ID!);
    console.log("✓ Database exists:", APPWRITE_DATABASE_ID);
  } catch {
    await db.create(APPWRITE_DATABASE_ID!, "App DB");
    console.log("✓ Database created:", APPWRITE_DATABASE_ID);
  }

  // 2) Collection users
  try {
    await db.getCollection(APPWRITE_DATABASE_ID!, APPWRITE_USERS_COLLECTION_ID!);
    console.log("✓ Collection exists:", APPWRITE_USERS_COLLECTION_ID);
  } catch {
    await db.createCollection(APPWRITE_DATABASE_ID!, APPWRITE_USERS_COLLECTION_ID!, "Users");
    console.log("✓ Collection created:", APPWRITE_USERS_COLLECTION_ID);
  }

  // 3) Attributes (idempotent: bungkus try/catch)
  const addStr = async (key: string, size = 256, required = false) => {
    try {
      // @ts-ignore - node-appwrite type allows it
      await db.createStringAttribute(APPWRITE_DATABASE_ID!, APPWRITE_USERS_COLLECTION_ID!, key, size, required);
      console.log("  +", key);
    } catch {}
  };
  const addInt = async (key: string, required = false) => {
    try {
      // @ts-ignore
      await db.createIntegerAttribute(APPWRITE_DATABASE_ID!, APPWRITE_USERS_COLLECTION_ID!, key, required);
      console.log("  +", key);
    } catch {}
  };

  await addStr("user_id", 64, true);
  await addStr("username", 32, false);
  await addStr("email", 256, false);
  await addStr("display_name", 256, false);
  await addStr("profile_image", 512, false);
  await addStr("reason", 256, false);
  await addInt("rating", false);
  await addStr("auth_provider", 32, false);
  await addStr("provider_uid", 128, false);

  // 4) Indexes (unique utk username, provider_uid, user_id)
  type IndexType = "key" | "fulltext" | "unique" | "hash" | "geo";
  const addIndex = async (key: string, fields: string[], unique = false) => {
    try {
      const indexType: IndexType = unique ? "unique" : "key";
      // @ts-ignore - node-appwrite types may not match actual API
      await db.createIndex(APPWRITE_DATABASE_ID!, APPWRITE_USERS_COLLECTION_ID!, key, indexType, fields);
      console.log("  # index", key);
    } catch {}
  };
  await addIndex("idx_user_id_unique", ["user_id"], true);
  await addIndex("idx_username_unique", ["username"], true);
  await addIndex("idx_provider_uid_unique", ["provider_uid"], true);

  // 5) Bucket (public read utk demo)
  try {
    await storage.getBucket(APPWRITE_AVATAR_BUCKET_ID!);
    console.log("✓ Bucket exists:", APPWRITE_AVATAR_BUCKET_ID);
  } catch {
    await storage.createBucket(
      APPWRITE_AVATAR_BUCKET_ID!,
      "Avatars",
      [
        "role:all"
      ], // read permission publik; ganti sesuai kebutuhan security-mu
      false, // fileSecurity
      undefined, // enabled
      10 * 1024 * 1024, // maximumFileSize: 10MB
      ["jpg", "jpeg", "png", "webp"], // allowedFileExtensions
      undefined, // encryption
      undefined // antivirus
    );
    console.log("✓ Bucket created:", APPWRITE_AVATAR_BUCKET_ID);
  }

  console.log("Migration done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
