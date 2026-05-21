export type AppointmentStatus = "pending" | "confirmed" | "cancelled" | "completed" | "no_show"

export type Appointment = {
  id: string
  customer_name: string
  customer_phone: string
  service_name: string
  service_area: string
  appointment_date: string
  start_time: string
  end_time: string
  status: AppointmentStatus
  notes: string
  admin_notes: string
  created_at: string
  updated_at: string
}

export type BlockedDate = {
  id: string
  date: string
  start_time: string | null
  end_time: string | null
  reason: string
  block_type: "full_day" | "partial_day"
  created_at: string
}

export type BusinessHour = {
  weekday: number
  is_open: boolean
  start_time: string
  end_time: string
  slot_minutes: number
  buffer_minutes: number
}

export type BookingSettings = {
  service_minutes: number
  default_buffer_minutes: number
  max_days_ahead: number
  min_hours_notice: number
}

export type Slot = {
  date: string
  start_time: string
  end_time: string
}
