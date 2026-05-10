import { fetchStrapi, type StrapiResponse } from "@/lib/strapi"
import { normalizeSiteSettings, type SiteSettingsData, type StrapiSiteSettings } from "@/lib/site-settings"

export async function getSiteSettingsData(): Promise<SiteSettingsData> {
  const response = await fetchStrapi<StrapiResponse<StrapiSiteSettings>>("/api/site-setting", {
    cache: "no-store",
  })

  return normalizeSiteSettings(response.data)
}
