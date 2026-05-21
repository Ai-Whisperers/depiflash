import { describe, expect, it } from "vitest"
import { generateAvailableSlots } from "./availability"
import type { Appointment, BlockedDate, BusinessHour } from "./types"

const mondayHours: BusinessHour[] = [
  { weekday: 1, is_open: true, start_time: "09:00", end_time: "17:00", slot_minutes: 60, buffer_minutes: 30 },
]

describe("generateAvailableSlots", () => {
  it("generates slots inside business hours with travel buffer", () => {
    const slots = generateAvailableSlots({ date: "2026-06-01", serviceMinutes: 60, hours: mondayHours, appointments: [], blockedDates: [] })
    expect(slots.map((s) => s.start_time)).toEqual(["09:00", "10:30", "12:00", "13:30", "15:00"])
  })

  it("removes slots that overlap pending or confirmed appointments", () => {
    const appointments: Appointment[] = [
      { id: "a1", customer_name: "Ana", customer_phone: "+595", service_name: "Piernas", service_area: "San Lorenzo", appointment_date: "2026-06-01", start_time: "10:30", end_time: "11:30", status: "confirmed", notes: "", admin_notes: "", created_at: "", updated_at: "" },
    ]
    const slots = generateAvailableSlots({ date: "2026-06-01", serviceMinutes: 60, hours: mondayHours, appointments, blockedDates: [] })
    expect(slots.map((s) => s.start_time)).toEqual(["09:00", "12:00", "13:30", "15:00"])
  })

  it("returns no slots when a full-day block exists", () => {
    const blockedDates: BlockedDate[] = [
      { id: "b1", date: "2026-06-01", start_time: null, end_time: null, reason: "Feriado", block_type: "full_day", created_at: "" },
    ]
    const slots = generateAvailableSlots({ date: "2026-06-01", serviceMinutes: 60, hours: mondayHours, appointments: [], blockedDates })
    expect(slots).toEqual([])
  })

  it("removes slots inside partial-day blocks", () => {
    const blockedDates: BlockedDate[] = [
      { id: "b1", date: "2026-06-01", start_time: "12:00", end_time: "14:00", reason: "Almuerzo largo", block_type: "partial_day", created_at: "" },
    ]
    const slots = generateAvailableSlots({ date: "2026-06-01", serviceMinutes: 60, hours: mondayHours, appointments: [], blockedDates })
    expect(slots.map((s) => s.start_time)).toEqual(["09:00", "10:30", "15:00"])
  })
})
