import { NextResponse } from "next/server"
import { generateAvailableSlots } from "@/lib/booking/availability"
import { readBookingData } from "@/lib/booking/store"

export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  const url = new URL(request.url)
  const date = url.searchParams.get("date") || new Date().toISOString().slice(0, 10)
  const serviceMinutes = Number(url.searchParams.get("serviceMinutes") || "60")
  const data = await readBookingData()
  const slots = generateAvailableSlots({ date, serviceMinutes, hours: data.businessHours, appointments: data.appointments, blockedDates: data.blockedDates })
  return NextResponse.json({ date, slots, businessHours: data.businessHours, blockedDates: data.blockedDates.filter((block) => block.date === date) })
}
