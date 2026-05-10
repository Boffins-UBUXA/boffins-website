import { NextResponse } from "next/server"

import { getStrapiUrl } from "@/lib/strapi"

type ContactPayload = {
  to?: string
  subject?: string
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  company?: string
  service?: string
  serviceLabel?: string
  message?: string
}

function stringValue(value: unknown) {
  return typeof value === "string" ? value.trim() : ""
}

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for")
  if (forwardedFor) return forwardedFor.split(",")[0]?.trim() || ""

  return request.headers.get("x-real-ip") || ""
}

async function createContactSubmission(request: Request, payload: ContactPayload) {
  const apiToken = process.env.STRAPI_API_TOKEN
  const response = await fetch(getStrapiUrl("/api/contact-submissions"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(apiToken ? { Authorization: `Bearer ${apiToken}` } : {}),
    },
    cache: "no-store",
    body: JSON.stringify({
      data: {
        firstName: stringValue(payload.firstName),
        lastName: stringValue(payload.lastName),
        email: stringValue(payload.email),
        phone: stringValue(payload.phone),
        company: stringValue(payload.company),
        service: stringValue(payload.service),
        serviceLabel: stringValue(payload.serviceLabel),
        message: stringValue(payload.message),
        recipient: stringValue(payload.to),
        subject: stringValue(payload.subject),
        source: "website-contact-page",
        status: "new",
        metadata: {
          userAgent: request.headers.get("user-agent") || "",
          referer: request.headers.get("referer") || "",
          ip: getClientIp(request),
        },
      },
    }),
  })

  if (!response.ok) {
    throw new Error(`Failed to capture contact submission: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

export async function POST(request: Request) {
  const payload = (await request.json()) as ContactPayload
  const firstName = stringValue(payload.firstName)
  const lastName = stringValue(payload.lastName)
  const email = stringValue(payload.email)
  const message = stringValue(payload.message)

  if (!firstName || !lastName || !email || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  try {
    await createContactSubmission(request, payload)
  } catch (error) {
    console.error("[contact-form]", error)
    return NextResponse.json({ error: "Failed to capture contact submission" }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
