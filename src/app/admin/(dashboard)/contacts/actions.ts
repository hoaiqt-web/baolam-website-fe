"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getDb } from "@/db";
import { contactRequests } from "@/db/schema";
import { requireAdmin } from "@/lib/auth/session";

export async function updateContactRequestStatusAction(id: string, status: "new" | "contacted" | "closed") {
  await requireAdmin();
  await getDb().update(contactRequests).set({ status, updatedAt: new Date() }).where(eq(contactRequests.id, id));
  revalidatePath("/admin/contacts");
  revalidatePath(`/admin/contacts/${id}`);
}
