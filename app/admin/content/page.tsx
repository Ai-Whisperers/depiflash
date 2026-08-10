"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@supabase/supabase-js"
import defaultContent from "@/content/es.json"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null

const SECTIONS = [
  { key: "business", label: "Información del negocio" },
  { key: "pricing", label: "Precios" },
  { key: "hero", label: "Hero / Home" },
  { key: "faq", label: "FAQ" },
  { key: "seo", label: "SEO" },
] as const

function deepGet(obj: any, path: string): string {
  const parts = path.split(".")
  let cur = obj
  for (const p of parts) {
    if (cur?.[p] === undefined || cur?.[p] === null) return ""
    cur = cur[p]
  }
  return typeof cur === "string" ? cur : typeof cur === "number" ? String(cur) : ""
}

function deepSet(obj: any, path: string, value: any): any {
  const parts = path.split(".")
  const clone = JSON.parse(JSON.stringify(obj))
  let cur = clone
  for (let i = 0; i < parts.length - 1; i++) {
    if (!cur[parts[i]]) cur[parts[i]] = {}
    cur = cur[parts[i]]
  }
  cur[parts[parts.length - 1]] = value
  return clone
}

export default function AdminContentPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [checking, setChecking] = useState(true)
  const [section, setSection] = useState("business")
  const [overrides, setOverrides] = useState<any>({})
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!supabase) return
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.push("/login")
        return
      }
      setUser(data.session.user)
      setChecking(false)
      fetchOverrides()
    })
  }, [router])

  const fetchOverrides = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/content")
      if (res.ok) {
        const data = await res.json()
        if (data && typeof data === "object") setOverrides(data)
      }
    } catch { /* use empty overrides */ }
  }, [])

  const get = (path: string) => {
    const v = deepGet(overrides, path)
    return v || deepGet(defaultContent, path)
  }

  const set = (path: string, value: any) => {
    setOverrides((prev: any) => deepSet(prev, path, value))
  }

  const save = async () => {
    setSaving(true)
    setError("")
    try {
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: overrides }),
      })
      if (res.ok) {
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
      } else {
        const err = await res.json()
        setError(err.error || "Error al guardar")
      }
    } catch {
      setError("Error de conexión")
    }
    setSaving(false)
  }

  if (checking) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="text-zinc-400">Verificando sesión...</div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Header */}
      <div className="border-b border-zinc-800 bg-[#0F0F0F] px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-white">DepiFlash Admin</h1>
            <p className="text-xs text-zinc-500">{user?.email}</p>
          </div>
          <div className="flex items-center gap-3">
            {saved && <span className="text-xs text-emerald-400">✓ Guardado</span>}
            {error && <span className="text-xs text-red-400">{error}</span>}
            <button
              onClick={save}
              disabled={saving}
              className="rounded-lg bg-[#E8A0BF] px-4 py-2 text-sm font-semibold text-white hover:bg-[#D484A8] disabled:opacity-50 transition-all"
            >
              {saving ? "Guardando..." : "Guardar Cambios"}
            </button>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-6xl mx-auto px-6 py-8 flex gap-6">
        {/* Sidebar */}
        <div className="w-56 shrink-0">
          <div className="space-y-1">
            {SECTIONS.map((s) => (
              <button
                key={s.key}
                onClick={() => setSection(s.key)}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-all ${
                  section === s.key
                    ? "bg-zinc-800 text-white font-medium"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Editor */}
        <div className="flex-1">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
            {section === "business" && <BusinessSection get={get} set={set} />}
            {section === "pricing" && <PricingSection get={get} set={set} />}
            {section === "hero" && <HeroSection get={get} set={set} />}
            {section === "faq" && <FaqSection get={get} set={set} />}
            {section === "seo" && <SeoSection get={get} set={set} />}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Input Component ──
function Input({
  label,
  value,
  onChange,
  multiline,
  placeholder,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  multiline?: boolean
  placeholder?: string
}) {
  const id = label.replace(/\s+/g, "-").toLowerCase()
  return (
    <div className="mb-4">
      <label htmlFor={id} className="mb-1.5 block text-xs font-medium text-zinc-400">
        {label}
      </label>
      {multiline ? (
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-lg border border-zinc-700/60 bg-zinc-800 px-3 py-2 text-sm text-white outline-none focus:border-[#E8A0BF]/50 min-h-[80px]"
        />
      ) : (
        <input
          id={id}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-lg border border-zinc-700/60 bg-zinc-800 px-3 py-2 text-sm text-white outline-none focus:border-[#E8A0BF]/50"
        />
      )}
    </div>
  )
}

// ── Business Section ──
function BusinessSection({ get, set }: { get: (p: string) => string; set: (p: string, v: any) => void }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-white mb-4">Información del negocio</h2>
      <Input label="Nombre del sitio" value={get("siteName")} onChange={(v) => set("siteName", v)} placeholder="DepiFlash" />
      <Input label="Messaging número" value={get("messaging")} onChange={(v) => set("messaging", v)} placeholder="+595 974 202 025" />
      <Input label="Messaging link base" value={get("messagingLink")} onChange={(v) => set("messagingLink", v)} placeholder="tel:+595974202025..." />
      <Input label="Email" value={get("email")} onChange={(v) => set("email", v)} placeholder="info@depiflash.com.py" />
      <Input label="Instagram URL" value={get("instagram")} onChange={(v) => set("instagram", v)} placeholder="https://www.instagram.com/depiflash.py" />
      <Input label="Cobertura" value={get("coverage")} onChange={(v) => set("coverage", v)} placeholder="Asunción y Gran Asunción" multiline />
      <Input label="Teléfono (display)" value={get("phone")} onChange={(v) => set("phone", v)} placeholder="+595 974 202 025" />
      <Input label="Tagline" value={get("tagline")} onChange={(v) => set("tagline", v)} multiline placeholder="Depilación láser IPL a domicilio en Asunción" />
    </div>
  )
}

// ── Pricing Section ──
function PricingSection({ get, set }: { get: (p: string) => string; set: (p: string, v: any) => void }) {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold text-white mb-4">Precios por sesión</h2>
      <p className="text-xs text-zinc-500">Editá los precios de cada zona. Los cambios se ven al toque en el sitio.</p>
      <Input label="Título de sección" value={get("home.pricing.title")} onChange={(v) => set("home.pricing.title", v)} placeholder="Precios por sesión" />
      <Input label="Subtítulo" value={get("home.pricing.subtitle")} onChange={(v) => set("home.pricing.subtitle", v)} placeholder="También ofrezco paquetes..." multiline />
      <Input label="Nota" value={get("home.pricing.note")} onChange={(v) => set("home.pricing.note", v)} placeholder="Los precios incluyen desplazamiento..." multiline />
      <div className="border-t border-zinc-800 pt-6">
        <p className="text-sm font-semibold text-white mb-3">Zonas</p>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="mb-4 rounded-lg border border-zinc-700/60 bg-zinc-800/50 p-4">
            <p className="text-xs text-zinc-400 font-medium mb-2">Zona {i + 1}</p>
            <Input label="Nombre" value={get(`home.pricing.zones.${i}.name`)} onChange={(v) => set(`home.pricing.zones.${i}.name`, v)} />
            <Input label="Precio" value={get(`home.pricing.zones.${i}.price`)} onChange={(v) => set(`home.pricing.zones.${i}.price`, v)} />
            <Input label="Duración" value={get(`home.pricing.zones.${i}.time`)} onChange={(v) => set(`home.pricing.zones.${i}.time`, v)} />
            <Input label="Precio paquete" value={get(`home.pricing.zones.${i}.packagePrice`)} onChange={(v) => set(`home.pricing.zones.${i}.packagePrice`, v)} />
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Hero Section ──
function HeroSection({ get, set }: { get: (p: string) => string; set: (p: string, v: any) => void }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-white mb-4">Hero / Home</h2>
      <Input label="Título hero" value={get("home.hero.headline")} onChange={(v) => set("home.hero.headline", v)} placeholder="Depilación láser IPL en tu casa" />
      <Input label="Subtítulo hero" value={get("home.hero.subheadline")} onChange={(v) => set("home.hero.subheadline", v)} multiline placeholder="Sin moverte, sin esperas..." />
      <Input label="CTA primario texto" value={get("home.hero.ctaPrimaryText")} onChange={(v) => set("home.hero.ctaPrimaryText", v)} placeholder="Reservar sesión" />
      <Input label="CTA secundario texto" value={get("home.hero.ctaSecondaryText")} onChange={(v) => set("home.hero.ctaSecondaryText", v)} placeholder="Ver precios" />
      <Input label="CTA secundario link" value={get("home.hero.ctaSecondaryHref")} onChange={(v) => set("home.hero.ctaSecondaryHref", v)} placeholder="/servicios" />

      <div className="border-t border-zinc-800 pt-6">
        <h3 className="text-sm font-semibold text-white mb-3">Beneficios</h3>
        <Input label="Título beneficios" value={get("home.benefits.title")} onChange={(v) => set("home.benefits.title", v)} placeholder="Por qué DepiFlash" />
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="mb-4 rounded-lg border border-zinc-700/60 bg-zinc-800/50 p-4">
            <p className="text-xs text-zinc-400 font-medium mb-2">Beneficio {i + 1}</p>
            <Input label="Texto" value={get(`home.benefits.items.${i}.text`)} onChange={(v) => set(`home.benefits.items.${i}.text`, v)} />
            <Input label="Descripción" value={get(`home.benefits.items.${i}.description`)} onChange={(v) => set(`home.benefits.items.${i}.description`, v)} multiline />
          </div>
        ))}
      </div>

      <div className="border-t border-zinc-800 pt-6">
        <h3 className="text-sm font-semibold text-white mb-3">Testimonios</h3>
        {[0, 1, 2].map((i) => (
          <div key={i} className="mb-4 rounded-lg border border-zinc-700/60 bg-zinc-800/50 p-4">
            <p className="text-xs text-zinc-400 font-medium mb-2">Testimonio {i + 1}</p>
            <Input label="Cita" value={get(`home.testimonials.items.${i}.quote`)} onChange={(v) => set(`home.testimonials.items.${i}.quote`, v)} multiline />
            <Input label="Autor" value={get(`home.testimonials.items.${i}.author`)} onChange={(v) => set(`home.testimonials.items.${i}.author`, v)} />
          </div>
        ))}
      </div>

      <div className="border-t border-zinc-800 pt-6">
        <h3 className="text-sm font-semibold text-white mb-3">Dan (sobre mí)</h3>
        <Input label="Título" value={get("home.dan.title")} onChange={(v) => set("home.dan.title", v)} placeholder="Conocé a Dan" />
        <Input label="Descripción" value={get("home.dan.description")} onChange={(v) => set("home.dan.description", v)} multiline />
      </div>
    </div>
  )
}

// ── FAQ Section ──
function FaqSection({ get, set }: { get: (p: string) => string; set: (p: string, v: any) => void }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-white mb-4">Preguntas frecuentes</h2>
      <p className="text-xs text-zinc-500">Editá las preguntas y respuestas de la página FAQ.</p>
      <Input label="Título" value={get("faq.title")} onChange={(v) => set("faq.title", v)} placeholder="Preguntas frecuentes" />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <div key={i} className="mb-4 rounded-lg border border-zinc-700/60 bg-zinc-800/50 p-4">
          <p className="text-xs text-zinc-400 font-medium mb-2">Pregunta {i + 1}</p>
          <Input label="Pregunta" value={get(`faq.items.${i}.question`)} onChange={(v) => set(`faq.items.${i}.question`, v)} />
          <Input label="Respuesta" value={get(`faq.items.${i}.answer`)} onChange={(v) => set(`faq.items.${i}.answer`, v)} multiline />
        </div>
      ))}
    </div>
  )
}

// ── SEO Section ──
function SeoSection({ get, set }: { get: (p: string) => string; set: (p: string, v: any) => void }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-white mb-4">SEO por página</h2>
      <p className="text-xs text-zinc-500">Los title y meta description de cada página.</p>

      <div className="border-b border-zinc-800 pb-6">
        <h3 className="text-sm font-semibold text-white mb-3">Home</h3>
        <Input label="Title" value={get("home.seo.title")} onChange={(v) => set("home.seo.title", v)} />
        <Input label="Description" value={get("home.seo.description")} onChange={(v) => set("home.seo.description", v)} multiline />
      </div>

      <div className="border-b border-zinc-800 pb-6">
        <h3 className="text-sm font-semibold text-white mb-3">Servicios</h3>
        <Input label="Title" value={get("servicios.seo.title")} onChange={(v) => set("servicios.seo.title", v)} />
        <Input label="Description" value={get("servicios.seo.description")} onChange={(v) => set("servicios.seo.description", v)} multiline />
      </div>

      <div className="border-b border-zinc-800 pb-6">
        <h3 className="text-sm font-semibold text-white mb-3">Cómo funciona</h3>
        <Input label="Title" value={get("comoFunciona.seo.title")} onChange={(v) => set("comoFunciona.seo.title", v)} />
        <Input label="Description" value={get("comoFunciona.seo.description")} onChange={(v) => set("comoFunciona.seo.description", v)} multiline />
      </div>

      <div className="border-b border-zinc-800 pb-6">
        <h3 className="text-sm font-semibold text-white mb-3">FAQ</h3>
        <Input label="Title" value={get("faq.seo.title")} onChange={(v) => set("faq.seo.title", v)} />
        <Input label="Description" value={get("faq.seo.description")} onChange={(v) => set("faq.seo.description", v)} multiline />
      </div>

      <div>
        <h3 className="text-sm font-semibold text-white mb-3">Contacto</h3>
        <Input label="Title" value={get("contacto.seo.title")} onChange={(v) => set("contacto.seo.title", v)} />
        <Input label="Description" value={get("contacto.seo.description")} onChange={(v) => set("contacto.seo.description", v)} multiline />
      </div>
    </div>
  )
}
