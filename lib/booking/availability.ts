import type { Appointment, BlockedDate, BusinessHour, Slot } from "./types"

const ACTIVE_STATUSES = new Set(["pending", "confirmed"])

export function toMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number)
  return hours * 60 + minutes
}

export function fromMinutes(total: number): string {
  const hours = Math.floor(total / 60)
  const minutes = total % 60
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`
}

function overlaps(startA: number, endA: number, startB: number, endB: number) {
  return startA < endB && startB < endA
}

function weekdayUtc(date: string) {
  const [year, month, day] = date.split("-").map(Number)
  return new Date(Date.UTC(year, month - 1, day)).getUTCDay()
}

export function generateAvailableSlots({
  date,
  serviceMinutes,
  hours,
  appointments,
  blockedDates,
}: {
  date: string
  serviceMinutes: number
  hours: BusinessHour[]
  appointments: Appointment[]
  blockedDates: BlockedDate[]
}): Slot[] {
  const dayBlocks = blockedDates.filter((block) => block.date === date)
  if (dayBlocks.some((block) => block.block_type === "full_day")) return []

  const weekday = weekdayUtc(date)
  const businessHour = hours.find((hour) => hour.weekday === weekday && hour.is_open)
  if (!businessHour) return []

  const start = toMinutes(businessHour.start_time)
  const end = toMinutes(businessHour.end_time)
  const step = serviceMinutes + businessHour.buffer_minutes
  const activeAppointments = appointments.filter((appointment) => appointment.appointment_date === date && ACTIVE_STATUSES.has(appointment.status))
  const partialBlocks = dayBlocks.filter((block) => block.block_type === "partial_day" && block.start_time && block.end_time)

  const slots: Slot[] = []
  for (let slotStart = start; slotStart + serviceMinutes <= end; slotStart += step) {
    const slotEnd = slotStart + serviceMinutes
    const appointmentConflict = activeAppointments.some((appointment) => overlaps(slotStart, slotEnd, toMinutes(appointment.start_time), toMinutes(appointment.end_time)))
    const blockConflict = partialBlocks.some((block) => overlaps(slotStart, slotEnd, toMinutes(block.start_time!), toMinutes(block.end_time!)))
    if (!appointmentConflict && !blockConflict) {
      slots.push({ date, start_time: fromMinutes(slotStart), end_time: fromMinutes(slotEnd) })
    }
  }
  return slots
}
