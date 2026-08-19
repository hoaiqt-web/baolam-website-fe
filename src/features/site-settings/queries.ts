import "server-only";

import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { siteSettings, type SiteSettings } from "@/db/schema";
import { DEFAULT_SITE_SETTINGS, type PublicSiteSettings } from "@/data/site-settings-defaults";

export const SITE_SETTINGS_ID = "default";

function mergeWithDefaults(row: SiteSettings | undefined | null): PublicSiteSettings {
  return {
    contactEmail: row?.contactEmail || DEFAULT_SITE_SETTINGS.contactEmail,
    contactPhone: row?.contactPhone || DEFAULT_SITE_SETTINGS.contactPhone,
    officeAddress: row?.officeAddress || DEFAULT_SITE_SETTINGS.officeAddress,
    workingHours: row?.workingHours || DEFAULT_SITE_SETTINGS.workingHours,
    googleMapsUrl: row?.googleMapsUrl || DEFAULT_SITE_SETTINGS.googleMapsUrl,
    facebookUrl: row?.facebookUrl || DEFAULT_SITE_SETTINGS.facebookUrl,
  };
}

/** Public read used by the site and the `/api/site-settings` route. Falls back to known defaults if the DB is unreachable. */
export async function getSiteSettings(): Promise<PublicSiteSettings> {
  try {
    const row = await getDb().query.siteSettings.findFirst({ where: eq(siteSettings.id, SITE_SETTINGS_ID) });
    return mergeWithDefaults(row);
  } catch {
    return DEFAULT_SITE_SETTINGS;
  }
}

/** Admin read — lets DB errors surface since the dashboard already requires a reachable DB to authenticate. */
export async function getSiteSettingsForAdmin(): Promise<PublicSiteSettings> {
  const row = await getDb().query.siteSettings.findFirst({ where: eq(siteSettings.id, SITE_SETTINGS_ID) });
  return mergeWithDefaults(row);
}
