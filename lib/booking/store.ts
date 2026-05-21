import { createClient } from "@supabase/supabase-js"
import type { Appointment, BlockedDate, BookingSettings, BusinessHour } from "./types"

export type BookingData = {
  appointments: Appointment[]
  blockedDates: BlockedDate[]
  businessHours: BusinessHour[]
  settings: BookingSettings
}

export const defaultBusinessHours: BusinessHour[] = [
  { weekday: 0, is_open: false, start_time: "09:00", end_time: "13:00", slot_minutes: 60, buffer_minutes: 30 },
  { weekday: 1, is_open: true, start_time: "09:00", end_time: "17:00", slot_minutes: 60, buffer_minutes: 30 },
  { weekday: 2, is_open: true, start_time: "09:00", end_time: "17:00", slot_minutes: 60, buffer_minutes: 30 },
  { weekday: 3, is_open: true, start_time: "09:00", end_time: "17:00", slot_minutes: 60, buffer_minutes: 30 },
  { weekday: 4, is_open: true, start_time: "09:00", end_time: "17:00", slot_minutes: 60, buffer_minutes: 30 },
  { weekday: 5, is_open: true, start_time: "09:00", end_time: "16:00", slot_minutes: 60, buffer_minutes: 30 },
  { weekday: 6, is_open: true, start_time: "09:00", end_time: "13:00", slot_minutes: 60, buffer_minutes: 30 },
]

export const defaultSettings: BookingSettings = {
  service_minutes: 60,
  default_buffer_minutes: 30,
  max_days_ahead: 45,
  min_hours_notice: 12,
}

function adminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) {
    throw new Error("Supabase is required for DepiFlash booking. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.")
  }
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } })
}

function asStringTime(value: unknown) {
  return String(value || "").slice(0, 5)
}

export async function readBookingData(): Promise<BookingData> {
  const supabase = adminClient()
  const [appointmentsResult, blocksResult, hoursResult, settingsResult] = await Promise.all([
    supabase.from("appointments").select("*").order("appointment_date", { ascending: true }).order("start_time", { ascending: true }),
    supabase.from("blocked_dates").select("*").order("date", { ascending: true }),
    supabase.from("business_hours").select("*").order("weekday", { ascending: true }),
    supabase.from("appointment_settings").select("value").eq("key", "booking").maybeSingle(),
  ])

  const firstError = appointmentsResult.error || blocksResult.error || hoursResult.error || settingsResult.error
  if (firstError) throw firstError

  const appointments = (appointmentsResult.data || []).map((apt: any) => ({
    ...apt,
    appointment_date: String(apt.appointment_date),
    start_time: asStringTime(apt.start_time),
    end_time: asStringTime(apt.end_time),
    notes: apt.notes || "",
    admin_notes: apt.admin_notes || "",
  })) as Appointment[]

  const blockedDates = (blocksResult.data || []).map((block: any) => ({
    ...block,
    date: String(block.date),
    start_time: block.start_time ? asStringTime(block.start_time) : null,
    end_time: block.end_time ? asStringTime(block.end_time) : null,
  })) as BlockedDate[]

  const businessHours = (hoursResult.data?.length ? hoursResult.data : defaultBusinessHours).map((hour: any) => ({
    weekday: Number(hour.weekday),
    is_open: Boolean(hour.is_open),
    start_time: asStringTime(hour.start_time),
    end_time: asStringTime(hour.end_time),
    slot_minutes: Number(hour.slot_minutes || 60),
    buffer_minutes: Number(hour.buffer_minutes || 30),
  })) as BusinessHour[]

  const settings = { ...defaultSettings, ...(settingsResult.data?.value || {}) }
  return { appointments, blockedDates, businessHours, settings }
}

export async function createAppointment(input: Omit<Appointment, "id" | "created_at" | "updated_at">) {
  const supabase = adminClient()
  const { data, error } = await supabase.from("appointments").insert(input).select().single()
  if (error) throw error
  return {
    ...data,
    appointment_date: String(data.appointment_date),
    start_time: asStringTime(data.start_time),
    end_time: asStringTime(data.end_time),
  } as Appointment
}

export async function updateAppointment(id: string, patch: Partial<Appointment>) {
  const supabase = adminClient()
  const { data, error } = await supabase.from("appointments").update({ ...patch, updated_at: new Date().toISOString() }).eq("id", id).select().single()
  if (error) throw error
  return {
    ...data,
    appointment_date: String(data.appointment_date),
    start_time: asStringTime(data.start_time),
    end_time: asStringTime(data.end_time),
  } as Appointment
}

export async function createBlock(input: Omit<BlockedDate, "id" | "created_at">) {
  const supabase = adminClient()
  const { data, error } = await supabase.from("blocked_dates").insert(input).select().single()
  if (error) throw error
  return data as BlockedDate
}

export async function deleteBlock(id: string) {
  const supabase = adminClient()
  const { error } = await supabase.from("blocked_dates").delete().eq("id", id)
  if (error) throw error
}

export async function writeBusinessHours(businessHours: BusinessHour[]) {
  const supabase = adminClient()
  const rows = businessHours.map((hour) => ({ ...hour, updated_at: new Date().toISOString() }))
  const { data, error } = await supabase.from("business_hours").upsert(rows, { onConflict: "weekday" }).select().order("weekday", { ascending: true })
  if (error) throw error
  return data as BusinessHour[]
}

export async function writeBookingSettings(settings: BookingSettings) {
  const supabase = adminClient()
  const { error } = await supabase.from("appointment_settings").upsert({ key: "booking", value: settings, updated_at: new Date().toISOString() }, { onConflict: "key" })
  if (error) throw error
}

export function isAdminRequest(request: Request) {
  const pin = process.env.DEPIFLASH_ADMIN_PIN || process.env.ADMIN_PIN || ""
  if (!pin) return true
  return request.headers.get("x-admin-pin") === pin || request.headers.get("authorization") === `Bearer ${pin}`
}
