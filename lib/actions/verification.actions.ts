'use server';

import { ID, Query } from "node-appwrite";
import { createAdminClient } from "../appwrite";
import { cookies } from "next/headers";

const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
} = process.env;

/**
 * Called after the user finishes the Verification form.
 * Will *create* a document the first time and *update* thereafter.
 */
export async function upsertUserVerification(userData: SignUpParams & { userId: string }) {
  const { database } = await createAdminClient();

  // check if we already have the doc
  const existing = await database.listDocuments(
    DATABASE_ID!,
    USER_COLLECTION_ID!,
    [Query.equal('userId', [userData.userId])]
  );

  if (existing.total > 0) {
    // update in-place
    const docId = existing.documents[0].$id;
    await database.updateDocument(DATABASE_ID!, USER_COLLECTION_ID!, docId, {
      ...userData,
      isVerified: true
    });
    return existing.documents[0].$id;
  }

  // otherwise create fresh
  const result = await database.createDocument(
    DATABASE_ID!, USER_COLLECTION_ID!, ID.unique(), {
      ...userData,
      isVerified: true
    }
  );
  return result.$id;
}
updateDocument(DATABASE_ID!, USER_COLLECTION_ID!, docId, {
    ...data,
    isVerified: true,
  });

  return { ok: true };
}
