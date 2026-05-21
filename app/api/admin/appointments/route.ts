import { NextResponse } from "next/server"
import { isAdminRequest, readBookingData, updateAppointment } from "@/lib/booking/store"
import type { AppointmentStatus } from "@/lib/booking/types"

export const dynamic = "force-dynamic"

const statuses = new Set<AppointmentStatus>(["pending", "confirmed", "cancelled", "completed", "no_show"])

export async function GET(request: Request) {
  if (!isAdminRequest(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const url = new URL(request.url)
  const from = url.searchParams.get("from")
  const to = url.searchParams.get("to")
  const data = await readBookingData()
  const appointments = data.appointments
    .filter((apt) => (!from || apt.appointment_date >= from) && (!to || apt.appointment_date <= to))
    .sort((a, b) => `${a.appointment_date} ${a.start_time}`.localeCompare(`${b.appointment_date} ${b.start_time}`))
  return NextResponse.json({ appointments })
}

export async function PATCH(request: Request) {
  const debug: Record<string, unknown> = { step: "init", ts: new Date().toISOString() }
  if (!isAdminRequest(request)) return NextResponse.json({ error: "Unauthorized", debug }, { status: 401 })
  try {
    const body = await request.json()
    debug.step = "parsed"
    const data = await readBookingData()
    const existing = data.appointments.find((apt) => apt.id === body.id)
    if (!existing) return NextResponse.json({ error: "Cita no encontrada", debug }, { status: 404 })

    const next = await updateAppointment(existing.id, {
      ...(body.appointment_date ? { appointment_date: String(body.appointment_date) } : {}),
      ...(body.start_time ? { start_time: String(body.start_time) } : {}),
      ...(body.end_time ? { end_time: String(body.end_time) } : {}),
      ...(body.admin_notes !== undefined ? { admin_notes: String(body.admin_notes || "") } : {}),
      ...(body.status && statuses.has(body.status) ? { status: body.status as AppointmentStatus } : {}),
    })
    debug.step = "saved"
    return NextResponse.json({ appointment: next, debug })
  } catch (error: any) {
    debug.step = "uncaught"
    debug.error = error?.message || String(error)
    return NextResponse.json({ error: "No se pudo actualizar la cita", debug }, { status: 500 })
  }
}
