import { NextResponse } from "next/server";
import { getSiteSettings } from "@/features/site-settings/queries";

export const dynamic = "force-dynamic";

export async function GET() {
  const settings = await getSiteSettings();
  return NextResponse.json(settings, {
    headers: { "Cache-Control": "public, max-age=60, stale-while-revalidate=300" },
  });
}
