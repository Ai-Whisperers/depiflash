import { NextResponse } from "next/server"
import { isAdminRequest, readBookingData, writeBookingSettings, writeBusinessHours } from "@/lib/booking/store"
import type { BusinessHour } from "@/lib/booking/types"

export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  if (!isAdminRequest(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const data = await readBookingData()
  return NextResponse.json({ businessHours: data.businessHours, settings: data.settings })
}

export async function PUT(request: Request) {
  const debug: Record<string, unknown> = { step: "init", ts: new Date().toISOString() }
  if (!isAdminRequest(request)) return NextResponse.json({ error: "Unauthorized", debug }, { status: 401 })
  try {
    const body = await request.json()
    let businessHours: BusinessHour[] | undefined
    if (Array.isArray(body.businessHours)) {
      businessHours = body.businessHours.map((hour: BusinessHour) => ({
        weekday: Number(hour.weekday),
        is_open: Boolean(hour.is_open),
        start_time: String(hour.start_time || "09:00"),
        end_time: String(hour.end_time || "17:00"),
        slot_minutes: Number(hour.slot_minutes || 60),
        buffer_minutes: Number(hour.buffer_minutes || 30),
      }))
      businessHours = await writeBusinessHours(businessHours)
    }

    const current = await readBookingData()
    const settings = body.settings ? { ...current.settings, ...body.settings } : current.settings
    if (body.settings) await writeBookingSettings(settings)

    debug.step = "saved"
    return NextResponse.json({ businessHours: businessHours || current.businessHours, settings, debug })
  } catch (error: any) {
    debug.step = "uncaught"
    debug.error = error?.message || String(error)
    return NextResponse.json({ error: "No se pudo guardar la configuración", debug }, { status: 500 })
  }
}
