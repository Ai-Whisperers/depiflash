"use client"

import { useEffect, useMemo, useState } from "react"
import { CalendarDays, CheckCircle2, Clock, MapPin, MessageCircle, Sparkles } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { MobileCta } from "@/components/mobile-cta"
import raw from "@/content/es.json"

const content = raw as any

const services = [
  "Sesión IPL — zona pequeña",
  "Sesión IPL — zona mediana",
  "Sesión IPL — zona grande",
  "Combo piernas + axilas",
  "Programa de reafirmación",
  "Evaluación personalizada",
]

const areas = ["Asunción", "Fernando de la Mora", "San Lorenzo", "Luque", "Lambaré", "Capiatá", "Mariano Roque Alonso", "Ñemby", "Otra zona"]

type Slot = { date: string; start_time: string; end_time: string }

function tomorrow() {
  const date = new Date()
  date.setDate(date.getDate() + 1)
  return date.toISOString().slice(0, 10)
}

export default function ReservarPage() {
  const [date, setDate] = useState(tomorrow())
  const [slots, setSlots] = useState<Slot[]>([])
  const [selectedSlot, setSelectedSlot] = useState("")
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState<any>(null)
  const [form, setForm] = useState({
    customer_name: "",
    customer_phone: "",
    service_name: services[0],
    service_area: areas[0],
    notes: "",
  })

  const minDate = useMemo(() => tomorrow(), [])

  useEffect(() => {
    let cancelled = false
    setLoadingSlots(true)
    setError("")
    fetch(`/api/availability?date=${date}&serviceMinutes=60`)
      .then((res) => res.json())
      .then((json) => {
        if (!cancelled) {
          const nextSlots = Array.isArray(json.slots) ? json.slots : []
          setSlots(nextSlots)
          setSelectedSlot(nextSlots[0]?.start_time || "")
        }
      })
      .catch(() => !cancelled && setError("No pudimos cargar horarios. Probá otra fecha."))
      .finally(() => !cancelled && setLoadingSlots(false))
    return () => { cancelled = true }
  }, [date])

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setSubmitting(true)
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, appointment_date: date, start_time: selectedSlot, service_minutes: 60 }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || "No se pudo reservar")
      setSuccess(json.appointment)
    } catch (err: any) {
      setError(err?.message || "No se pudo reservar")
    } finally {
      setSubmitting(false)
    }
  }

  const whatsappAfterBooking = success
    ? `https://wa.me/${content.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Hola! Reservé una cita en DepiFlash para el ${success.appointment_date} a las ${success.start_time}. Mi nombre es ${success.customer_name}.`)}`
    : content.whatsappLink

  return (
    <>
      <Header phone={content.phone} />
      <main className="bg-gradient-to-b from-[#FFF8F6] via-white to-[#F0FDFA]">
        <section className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-[0.9fr_1.1fr] md:py-16">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#E8795B] shadow-sm">
              <CalendarDays className="h-4 w-4" /> Agenda online
            </span>
            <div>
              <h1 className="text-4xl font-bold leading-tight text-[#1A1A2E] sm:text-5xl">Reservá tu sesión a domicilio</h1>
              <p className="mt-4 text-lg leading-relaxed text-gray-600">Elegí fecha y horario disponible. Te confirmamos por WhatsApp para coordinar dirección exacta y preparación previa.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                [Clock, "Horarios reales", "Sin ida y vuelta infinito"],
                [MapPin, "A domicilio", "Asunción y Gran Asunción"],
                [MessageCircle, "Confirmación", "Seguimiento por WhatsApp"],
              ].map(([Icon, title, desc]: any) => (
                <div key={title} className="rounded-2xl border border-white bg-white/80 p-4 shadow-sm">
                  <Icon className="mb-3 h-5 w-5 text-[#2DD4BF]" />
                  <p className="font-semibold text-[#1A1A2E]">{title}</p>
                  <p className="text-sm text-gray-500">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-gray-100 bg-white p-4 shadow-xl sm:p-6">
            {success ? (
              <div className="space-y-5 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#ECFDF5] text-[#10B981]"><CheckCircle2 className="h-8 w-8" /></div>
                <h2 className="text-2xl font-bold text-[#1A1A2E]">Reserva recibida</h2>
                <p className="text-gray-600">Tu cita quedó como pendiente para <strong>{success.appointment_date}</strong> a las <strong>{success.start_time}</strong>. Confirmamos por WhatsApp.</p>
                <a href={whatsappAfterBooking} target="_blank" rel="noopener noreferrer" className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#E8795B] px-5 py-4 font-semibold text-white shadow-lg transition hover:bg-[#d4684e] sm:w-auto">
                  <MessageCircle className="h-5 w-5" /> Escribir por WhatsApp
                </a>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="space-y-2 text-sm font-semibold text-gray-700">Nombre
                    <input required value={form.customer_name} onChange={(e) => setForm({ ...form, customer_name: e.target.value })} className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#E8795B]" placeholder="Tu nombre" />
                  </label>
                  <label className="space-y-2 text-sm font-semibold text-gray-700">WhatsApp
                    <input required value={form.customer_phone} onChange={(e) => setForm({ ...form, customer_phone: e.target.value })} className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#E8795B]" placeholder="Ej: 0972 780 800" />
                  </label>
                </div>
                <label className="space-y-2 text-sm font-semibold text-gray-700">Servicio
                  <select value={form.service_name} onChange={(e) => setForm({ ...form, service_name: e.target.value })} className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#E8795B]">
                    {services.map((service) => <option key={service}>{service}</option>)}
                  </select>
                </label>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="space-y-2 text-sm font-semibold text-gray-700">Zona
                    <select value={form.service_area} onChange={(e) => setForm({ ...form, service_area: e.target.value })} className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#E8795B]">
                      {areas.map((area) => <option key={area}>{area}</option>)}
                    </select>
                  </label>
                  <label className="space-y-2 text-sm font-semibold text-gray-700">Fecha
                    <input required type="date" min={minDate} value={date} onChange={(e) => setDate(e.target.value)} className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#E8795B]" />
                  </label>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-gray-700">Horarios disponibles</p>
                  {loadingSlots ? <p className="rounded-xl bg-gray-50 p-4 text-sm text-gray-500">Cargando horarios...</p> : slots.length ? (
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                      {slots.map((slot) => (
                        <button key={slot.start_time} type="button" onClick={() => setSelectedSlot(slot.start_time)} className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${selectedSlot === slot.start_time ? "border-[#E8795B] bg-[#E8795B] text-white" : "border-gray-200 bg-white text-gray-700 hover:border-[#E8795B]"}`}>{slot.start_time}</button>
                      ))}
                    </div>
                  ) : <p className="rounded-xl bg-[#FFF1EE] p-4 text-sm text-[#9A3412]">No hay horarios en esta fecha. Probá otro día.</p>}
                </div>
                <label className="space-y-2 text-sm font-semibold text-gray-700">Notas opcionales
                  <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={3} className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#E8795B]" placeholder="Zona del cuerpo, dirección aproximada, preferencia de horario..." />
                </label>
                {error && <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
                <button disabled={submitting || !selectedSlot} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#E8795B] px-5 py-4 font-semibold text-white shadow-lg transition hover:bg-[#d4684e] disabled:cursor-not-allowed disabled:opacity-60">
                  <Sparkles className="h-5 w-5" /> {submitting ? "Reservando..." : "Solicitar reserva"}
                </button>
              </form>
            )}
          </div>
        </section>
      </main>
      <Footer phone={content.phone} />
      <WhatsAppFloat phone={content.whatsapp} message="Hola! Quiero reservar una sesión" />
      <MobileCta phone={content.phone} />
    </>
  )
}
