import { Client, Users, Databases } from "node-appwrite";

const {
  APPWRITE_ENDPOINT, APPWRITE_PROJECT, APPWRITE_API_KEY
} = process.env;

export function adminClient() {
  const client = new Client()
    .setEndpoint(APPWRITE_ENDPOINT!)
    .setProject(APPWRITE_PROJECT!)
    .setKey(APPWRITE_API_KEY!);
  return {
    client,
    users: new Users(client),
    db: new Databases(client),
  };
}
