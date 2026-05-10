import { NextResponse } from "next/server"

import { getSiteSettingsData } from "@/lib/api/site-settings"
import { staticSiteSettings } from "@/lib/site-settings"

export async function GET() {
  try {
    return NextResponse.json(await getSiteSettingsData())
  } catch (error) {
    console.error("[site-settings]", error)
    return NextResponse.json(staticSiteSettings)
  }
}
