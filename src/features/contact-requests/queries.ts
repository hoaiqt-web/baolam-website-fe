import "server-only";

import { desc, eq } from "drizzle-orm";
import { getDb } from "@/db";
import { contactRequests } from "@/db/schema";

export async function listContactRequestsForAdmin() {
  return getDb().select().from(contactRequests).orderBy(desc(contactRequests.createdAt));
}

export async function getContactRequestForAdmin(id: string) {
  return getDb().query.contactRequests.findFirst({ where: eq(contactRequests.id, id) }) ?? null;
}
