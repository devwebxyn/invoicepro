// src/lib/appwrite.ts
import { Client, Databases, Users, Storage } from "node-appwrite";

export function appwriteServer() {
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT!)
    .setProject(process.env.APPWRITE_PROJECT!)
    .setKey(process.env.APPWRITE_API_KEY!);

  return {
    client,
    db: new Databases(client),
    users: new Users(client),
    storage: new Storage(client),
    usersCollectionId: process.env.APPWRITE_USERS_COLLECTION_ID!,
  };
}
