async function ensureBoolean(key, required = false, _default = undefined) {
  try {
    await databases.createBooleanAttribute(DB, COL, key, required, _default, false);
    console.log(`[ok] boolean ${key}`);
  } catch (e) {
    if (String(e.message||e).includes("already exists")) console.log(`[skip] boolean ${key} exists`);
    else throw e;
  }
}
// node scripts/migrate-plan.js
const sdk = require("node-appwrite");

const client = new sdk.Client()
  .setEndpoint(process.env.APPWRITE_ENDPOINT)
  .setProject(process.env.APPWRITE_PROJECT)
  .setKey(process.env.APPWRITE_API_KEY);

const databases = new sdk.Databases(client);

const DB = process.env.APPWRITE_DATABASE_ID;
const COL = process.env.APPWRITE_USERS_COLLECTION_ID;

async function ensureEnum(key, elements, required = false, _default = undefined) {
  try {
    await databases.createEnumAttribute(DB, COL, key, elements, required, _default, false);
    console.log(`[ok] enum ${key}`);
  } catch (e) {
    if (String(e.message || e).includes("already exists")) console.log(`[skip] enum ${key} exists`);
    else throw e;
  }
}

async function ensureString(key, size = 255, required = false, _default = undefined) {
  try {
    await databases.createStringAttribute(DB, COL, key, size, required, _default, false);
    console.log(`[ok] string ${key}`);
  } catch (e) {
    if (String(e.message || e).includes("already exists")) console.log(`[skip] string ${key} exists`);
    else throw e;
  }
}

async function ensureDatetime(key, required = false, _default = undefined) {
  try {
    await databases.createDatetimeAttribute(DB, COL, key, required, _default, false);
    console.log(`[ok] datetime ${key}`);
  } catch (e) {
    if (String(e.message || e).includes("already exists")) console.log(`[skip] datetime ${key} exists`);
    else throw e;
  }
}

(async () => {
  if (!DB || !COL) throw new Error("APPWRITE_DATABASE_ID/APPWRITE_USERS_COLLECTION_ID belum di-set");
  // plan & billing fields
  await ensureEnum("plan", ["free", "pro", "business"], true);
  await ensureString("plan_interval", 20, false); // "monthly"/"yearly" (boleh kosong)
  await ensureEnum("plan_status", ["inactive", "active", "past_due"], false, "inactive");
  await ensureDatetime("plan_active_until", false);
  await ensureString("last_invoice_id", 128, false);
  // Tambahan field pembatalan
  await ensureDatetime("plan_cancel_at", false);
  await ensureBoolean("plan_cancel_at_period_end", false, false);

  console.log("Selesai.");
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
