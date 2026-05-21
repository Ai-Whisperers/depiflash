"use client"

import { useEffect, useMemo, useState } from "react"
import { Ban, CalendarDays, Check, Clock, Lock, Pencil, RefreshCw, Trash2, X } from "lucide-react"

type Appointment = {
  id: string
  customer_name: string
  customer_phone: string
  service_name: string
  service_area: string
  appointment_date: string
  start_time: string
  end_time: string
  status: "pending" | "confirmed" | "cancelled" | "completed" | "no_show"
  notes: string
  admin_notes: string
}

type BlockedDate = { id: string; date: string; start_time: string | null; end_time: string | null; reason: string; block_type: "full_day" | "partial_day" }
type BusinessHour = { weekday: number; is_open: boolean; start_time: string; end_time: string; slot_minutes: number; buffer_minutes: number }

const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]
const statusLabels: Record<Appointment["status"], string> = {
  pending: "Pendiente",
  confirmed: "Confirmada",
  cancelled: "Cancelada",
  completed: "Completada",
  no_show: "No show",
}

function today() { return new Date().toISOString().slice(0, 10) }
function addDays(date: string, days: number) {
  const next = new Date(`${date}T00:00:00`)
  next.setDate(next.getDate() + days)
  return next.toISOString().slice(0, 10)
}

export default function AdminAgendaPage() {
  const [pin, setPin] = useState("")
  const [from, setFrom] = useState(today())
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [blocks, setBlocks] = useState<BlockedDate[]>([])
  const [hours, setHours] = useState<BusinessHour[]>([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [blockForm, setBlockForm] = useState({ date: today(), block_type: "full_day", start_time: "09:00", end_time: "12:00", reason: "Feriado / descanso" })

  useEffect(() => { setPin(localStorage.getItem("depiflash_admin_pin") || "") }, [])
  useEffect(() => { if (pin) localStorage.setItem("depiflash_admin_pin", pin) }, [pin])

  const headers = useMemo(() => pin ? { "x-admin-pin": pin, "Content-Type": "application/json" } : { "Content-Type": "application/json" }, [pin])
  const to = addDays(from, 13)

  async function load() {
    setLoading(true)
    setMessage("")
    try {
      const [appointmentsRes, blocksRes, hoursRes] = await Promise.all([
        fetch(`/api/admin/appointments?from=${from}&to=${to}`, { headers }),
        fetch("/api/admin/blocks", { headers }),
        fetch("/api/admin/hours", { headers }),
      ])
      const [appointmentsJson, blocksJson, hoursJson] = await Promise.all([appointmentsRes.json(), blocksRes.json(), hoursRes.json()])
      if (!appointmentsRes.ok) throw new Error(appointmentsJson.error || "No autorizado")
      setAppointments(Array.isArray(appointmentsJson.appointments) ? appointmentsJson.appointments : [])
      setBlocks(Array.isArray(blocksJson.blockedDates) ? blocksJson.blockedDates : [])
      setHours(Array.isArray(hoursJson.businessHours) ? hoursJson.businessHours : [])
    } catch (err: any) {
      setMessage(err?.message || "No se pudo cargar la agenda")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [from, pin])

  async function updateAppointment(id: string, patch: Partial<Appointment>) {
    const res = await fetch("/api/admin/appointments", { method: "PATCH", headers, body: JSON.stringify({ id, ...patch }) })
    const json = await res.json()
    if (!res.ok) return setMessage(json.error || "No se pudo actualizar")
    setMessage("Cita actualizada")
    load()
  }

  async function createBlock(e: React.FormEvent) {
    e.preventDefault()
    const res = await fetch("/api/admin/blocks", { method: "POST", headers, body: JSON.stringify(blockForm) })
    const json = await res.json()
    if (!res.ok) return setMessage(json.error || "No se pudo bloquear")
    setMessage("Bloqueo creado")
    load()
  }

  async function deleteBlock(id: string) {
    const res = await fetch(`/api/admin/blocks?id=${id}`, { method: "DELETE", headers })
    if (!res.ok) return setMessage("No se pudo eliminar el bloqueo")
    setMessage("Bloqueo eliminado")
    load()
  }

  async function saveHours(nextHours: BusinessHour[]) {
    setHours(nextHours)
    const res = await fetch("/api/admin/hours", { method: "PUT", headers, body: JSON.stringify({ businessHours: nextHours }) })
    if (!res.ok) setMessage("No se pudieron guardar los horarios")
    else setMessage("Horarios guardados")
  }

  const appointmentsByDate = appointments.reduce<Record<string, Appointment[]>>((acc, apt) => {
    acc[apt.appointment_date] ||= []
    acc[apt.appointment_date].push(apt)
    return acc
  }, {})
  const visibleDays = Array.from({ length: 14 }, (_, i) => addDays(from, i))

  return (
    <main className="min-h-screen bg-[#F8FAFC] p-4 text-[#1A1A2E] md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="flex flex-col gap-4 rounded-3xl bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between">
          <div>
            <p className="flex items-center gap-2 text-sm font-semibold text-[#E8795B]"><CalendarDays className="h-4 w-4" /> DepiFlash Admin</p>
            <h1 className="text-3xl font-bold">Agenda y reservas</h1>
            <p className="text-gray-500">Mové citas, cancelá, confirmá y bloqueá feriados desde un solo lugar.</p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <label className="relative"><Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" /><input value={pin} onChange={(e) => setPin(e.target.value)} className="rounded-xl border border-gray-200 py-2 pl-9 pr-3 text-sm" placeholder="PIN admin si aplica" /></label>
            <button onClick={load} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#E8795B] px-4 py-2 text-sm font-semibold text-white"><RefreshCw className="h-4 w-4" /> Recargar</button>
          </div>
        </header>

        {message && <div className="rounded-2xl bg-white p-4 text-sm font-medium shadow-sm">{message}</div>}

        <section className="grid gap-6 lg:grid-cols-[1.7fr_1fr]">
          <div className="rounded-3xl bg-white p-4 shadow-sm md:p-6">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-bold">Vista de 14 días</h2>
                <p className="text-sm text-gray-500">Pendientes y confirmadas bloquean disponibilidad pública.</p>
              </div>
              <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className="rounded-xl border border-gray-200 px-3 py-2" />
            </div>
            {loading ? <p className="rounded-2xl bg-gray-50 p-6 text-center text-gray-500">Cargando agenda...</p> : (
              <div className="grid gap-3 md:grid-cols-2">
                {visibleDays.map((day) => {
                  const d = new Date(`${day}T00:00:00`)
                  return <div key={day} className="rounded-2xl border border-gray-100 bg-[#FFFBFA] p-3">
                    <div className="mb-3 flex items-center justify-between">
                      <div><p className="font-bold">{dayNames[d.getDay()]} {day.slice(5)}</p><p className="text-xs text-gray-500">{appointmentsByDate[day]?.length || 0} citas</p></div>
                    </div>
                    <div className="space-y-2">
                      {(appointmentsByDate[day] || []).map((apt) => <article key={apt.id} className="rounded-xl bg-white p-3 shadow-sm">
                        <div className="flex items-start justify-between gap-2">
                          <div><p className="font-semibold">{apt.start_time} · {apt.customer_name}</p><p className="text-xs text-gray-500">{apt.service_name} · {apt.service_area}</p><p className="text-xs text-gray-500">{apt.customer_phone}</p></div>
                          <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-semibold">{statusLabels[apt.status]}</span>
                        </div>
                        {apt.notes && <p className="mt-2 rounded-lg bg-gray-50 p-2 text-xs text-gray-600">{apt.notes}</p>}
                        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                          <button onClick={() => updateAppointment(apt.id, { status: "confirmed" })} className="rounded-lg bg-emerald-50 px-2 py-2 text-xs font-semibold text-emerald-700"><Check className="mx-auto h-4 w-4" /> Confirmar</button>
                          <button onClick={() => updateAppointment(apt.id, { status: "cancelled" })} className="rounded-lg bg-red-50 px-2 py-2 text-xs font-semibold text-red-700"><X className="mx-auto h-4 w-4" /> Cancelar</button>
                          <button onClick={() => updateAppointment(apt.id, { status: "completed" })} className="rounded-lg bg-blue-50 px-2 py-2 text-xs font-semibold text-blue-700">Completar</button>
                          <button onClick={() => {
                            const newDate = prompt("Nueva fecha YYYY-MM-DD", apt.appointment_date)
                            const newTime = prompt("Nueva hora HH:MM", apt.start_time)
                            if (newDate && newTime) updateAppointment(apt.id, { appointment_date: newDate, start_time: newTime })
                          }} className="rounded-lg bg-amber-50 px-2 py-2 text-xs font-semibold text-amber-700"><Pencil className="mx-auto h-4 w-4" /> Mover</button>
                        </div>
                      </article>)}
                      {!appointmentsByDate[day]?.length && <p className="rounded-xl border border-dashed border-gray-200 bg-white p-4 text-center text-xs text-gray-400">Sin citas</p>}
                    </div>
                  </div>
                })}
              </div>
            )}
          </div>

          <aside className="space-y-6">
            <form onSubmit={createBlock} className="rounded-3xl bg-white p-5 shadow-sm">
              <h2 className="mb-1 flex items-center gap-2 text-xl font-bold"><Ban className="h-5 w-5 text-[#E8795B]" /> Bloquear fecha</h2>
              <p className="mb-4 text-sm text-gray-500">Feriados, vacaciones o bloqueos parciales.</p>
              <div className="space-y-3">
                <input type="date" value={blockForm.date} onChange={(e) => setBlockForm({ ...blockForm, date: e.target.value })} className="w-full rounded-xl border border-gray-200 px-3 py-2" />
                <select value={blockForm.block_type} onChange={(e) => setBlockForm({ ...blockForm, block_type: e.target.value })} className="w-full rounded-xl border border-gray-200 px-3 py-2">
                  <option value="full_day">Día completo</option>
                  <option value="partial_day">Horario parcial</option>
                </select>
                {blockForm.block_type === "partial_day" && <div className="grid grid-cols-2 gap-2"><input type="time" value={blockForm.start_time} onChange={(e) => setBlockForm({ ...blockForm, start_time: e.target.value })} className="rounded-xl border border-gray-200 px-3 py-2" /><input type="time" value={blockForm.end_time} onChange={(e) => setBlockForm({ ...blockForm, end_time: e.target.value })} className="rounded-xl border border-gray-200 px-3 py-2" /></div>}
                <input value={blockForm.reason} onChange={(e) => setBlockForm({ ...blockForm, reason: e.target.value })} className="w-full rounded-xl border border-gray-200 px-3 py-2" placeholder="Motivo" />
                <button className="w-full rounded-xl bg-[#1A1A2E] px-4 py-3 font-semibold text-white">Crear bloqueo</button>
              </div>
            </form>

            <div className="rounded-3xl bg-white p-5 shadow-sm">
              <h2 className="mb-3 text-xl font-bold">Bloqueos activos</h2>
              <div className="space-y-2">
                {blocks.map((block) => <div key={block.id} className="flex items-center justify-between rounded-xl bg-gray-50 p-3 text-sm"><span>{block.date} · {block.block_type === "full_day" ? "Completo" : `${block.start_time}-${block.end_time}`}<br /><span className="text-xs text-gray-500">{block.reason}</span></span><button onClick={() => deleteBlock(block.id)} className="text-red-600"><Trash2 className="h-4 w-4" /></button></div>)}
                {!blocks.length && <p className="text-sm text-gray-400">Sin bloqueos.</p>}
              </div>
            </div>

            <div className="rounded-3xl bg-white p-5 shadow-sm">
              <h2 className="mb-3 flex items-center gap-2 text-xl font-bold"><Clock className="h-5 w-5 text-[#2DD4BF]" /> Horarios</h2>
              <div className="space-y-2">
                {hours.map((hour, index) => <div key={hour.weekday} className="grid grid-cols-[44px_1fr_1fr_42px] items-center gap-2 text-sm">
                  <span className="font-semibold">{dayNames[hour.weekday]}</span>
                  <input type="time" value={hour.start_time} disabled={!hour.is_open} onChange={(e) => { const next = [...hours]; next[index] = { ...hour, start_time: e.target.value }; saveHours(next) }} className="rounded-lg border border-gray-200 px-2 py-2 disabled:opacity-40" />
                  <input type="time" value={hour.end_time} disabled={!hour.is_open} onChange={(e) => { const next = [...hours]; next[index] = { ...hour, end_time: e.target.value }; saveHours(next) }} className="rounded-lg border border-gray-200 px-2 py-2 disabled:opacity-40" />
                  <input type="checkbox" checked={hour.is_open} onChange={(e) => { const next = [...hours]; next[index] = { ...hour, is_open: e.target.checked }; saveHours(next) }} className="h-5 w-5" />
                </div>)}
              </div>
            </div>
          </aside>
        </section>
      </div>
    </main>
  )
}
