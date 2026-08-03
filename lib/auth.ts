import "server-only";

import { stackServerApp } from "@/stack";

export async function getCurrentUserId(): Promise<string | undefined> {
  const user = await stackServerApp.getUser();
  return user?.id;
}

export async function requireUserId(): Promise<string> {
  const userId = await getCurrentUserId();
  if (!userId) {
    throw new Error("Unauthorized: you must be signed in to do this.");
  }
  return userId;
}
