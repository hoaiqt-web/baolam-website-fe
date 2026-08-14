"use server";

import { compare } from "bcryptjs";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { z } from "zod";
import { getDb } from "@/db";
import { adminUsers } from "@/db/schema";
import { createSession } from "@/lib/auth/session";

export type LoginState = { error?: string };

const loginSchema = z.object({
  username: z.string().trim().min(1),
  password: z.string().min(1),
});

export async function loginAction(_: LoginState, formData: FormData): Promise<LoginState> {
  const parsed = loginSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  });
  if (!parsed.success) return { error: "Vui lòng nhập username và password." };

  const [user] = await getDb().select().from(adminUsers).where(eq(adminUsers.username, parsed.data.username)).limit(1);
  if (!user || !user.isActive || !(await compare(parsed.data.password, user.passwordHash))) {
    return { error: "Thông tin đăng nhập không đúng." };
  }

  await createSession({ userId: user.id, username: user.username });
  redirect("/admin");
}
