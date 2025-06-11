import { Client, Account, Databases, Users } from "node-appwrite";
import { cookies } from "next/headers";

const cookieName = `a_session_${process.env.NEXT_PUBLIC_APPWRITE_PROJECT!}`;

export function makePublicClient() {
  return new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);
}

export async function createSessionClient() {
  const session = cookies().get(cookieName);
  if (!session?.value) throw new Error("No session");

  const client = makePublicClient();
  (client as any).headers["X-Fallback-Cookies"] = `${cookieName}=${session.value}`;
  return { account: new Account(client) };
}

export async function createAdminClient() {
  const client = makePublicClient().setKey(process.env.NEXT_APPWRITE_KEY!);
  return {
    account: new Account(client),
    database: new Databases(client),
    user: new Users(client),
  };
}
