import { NextResponse } from "next/server"
import { fromMinutes, generateAvailableSlots, toMinutes } from "@/lib/booking/availability"
import { createAppointment, readBookingData } from "@/lib/booking/store"

export const dynamic = "force-dynamic"

function cleanPhone(phone: string) {
  return phone.replace(/[^+0-9]/g, "")
}

export async function POST(request: Request) {
  const debug: Record<string, unknown> = { step: "init", ts: new Date().toISOString() }
  try {
    const body = await request.json()
    debug.step = "parsed"
    const customerName = String(body.customer_name || "").trim()
    const customerPhone = cleanPhone(String(body.customer_phone || ""))
    const serviceName = String(body.service_name || "Sesión IPL").trim()
    const serviceArea = String(body.service_area || "").trim()
    const appointmentDate = String(body.appointment_date || "").trim()
    const startTime = String(body.start_time || "").trim()
    const notes = String(body.notes || "").trim()
    const serviceMinutes = Number(body.service_minutes || 60)

    if (!customerName || !customerPhone || !serviceArea || !appointmentDate || !startTime) {
      return NextResponse.json({ error: "Faltan datos para reservar", debug }, { status: 400 })
    }

    const data = await readBookingData()
    debug.step = "loaded-data"
    const slots = generateAvailableSlots({ date: appointmentDate, serviceMinutes, hours: data.businessHours, appointments: data.appointments, blockedDates: data.blockedDates })
    const selectedSlot = slots.find((slot) => slot.start_time === startTime)
    if (!selectedSlot) return NextResponse.json({ error: "Ese horario ya no está disponible", debug }, { status: 409 })

    const appointment = await createAppointment({
      customer_name: customerName,
      customer_phone: customerPhone,
      service_name: serviceName,
      service_area: serviceArea,
      appointment_date: appointmentDate,
      start_time: startTime,
      end_time: selectedSlot.end_time || fromMinutes(toMinutes(startTime) + serviceMinutes),
      status: "pending",
      notes,
      admin_notes: "",
    })

    debug.step = "saved"
    return NextResponse.json({ appointment, debug }, { status: 201 })
  } catch (error: any) {
    debug.step = "uncaught"
    debug.error = error?.message || String(error)
    return NextResponse.json({ error: "No se pudo crear la reserva", debug }, { status: 500 })
  }
}
