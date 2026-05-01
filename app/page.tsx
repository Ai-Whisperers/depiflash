"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { MobileCta } from "@/components/mobile-cta"
import raw from "@/content/es.json"
import { House, Zap, Clock, Shield, MessageCircle, Sparkles, Truck, ChevronRight, Star, Check } from "lucide-react"

const content = raw as any
const h = content.home

const iconMap: Record<string, React.ReactNode> = {
  Home: <House className="w-8 h-8" />,
  Zap: <Zap className="w-8 h-8" />,
  Clock: <Clock className="w-8 h-8" />,
  Shield: <Shield className="w-8 h-8" />,
  MessageCircle: <MessageCircle className="w-8 h-8" />,
  Sparkles: <Sparkles className="w-8 h-8" />,
  Truck: <Truck className="w-8 h-8" />,
  Razor: <Zap className="w-8 h-8" />,
}

export default function Home() {
  return (
    <>
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #FFF1EE 0%, #FDF2F8 50%, #ECFDF5 100%)" }}>
        <div className="relative max-w-5xl mx-auto px-4 py-20 md:py-32 text-center">
          <div className="inline-flex items-center gap-2 bg-white/80 rounded-full px-4 py-1.5 text-sm text-[#E8795B] font-medium mb-6 shadow-sm border border-gray-100">
            <Zap className="w-4 h-4" /> Depilación láser IPL a domicilio
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-[#1A1A2E] mb-6 leading-tight">{h.hero.headline}</h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10">{h.hero.subheadline}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={h.hero.ctaPrimaryHref} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#E8795B] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#d4684e] transition shadow-lg shadow-[#E8795B]/20">
              <MessageCircle className="w-5 h-5" /> {h.hero.ctaPrimaryText}
            </a>
            <a href={h.hero.ctaSecondaryHref}
              className="inline-flex items-center gap-2 border-2 border-[#E8795B] text-[#E8795B] px-8 py-4 rounded-xl font-semibold hover:bg-[#FFF1EE] transition">
              {h.hero.ctaSecondaryText}
            </a>
          </div>
          <p className="text-sm text-gray-500 mt-6">📍 {content.coverage}</p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{h.benefits.title}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {h.benefits.items.map((b: any, i: number) => (
              <div key={i} className="text-center p-6 bg-[#FFFBFA] rounded-xl border border-[#FFF1EE]">
                <div className="text-[#E8795B] mb-4 flex justify-center">{iconMap[b.icon]}</div>
                <h3 className="font-bold text-[#1A1A2E] mb-2">{b.text}</h3>
                <p className="text-sm text-gray-500">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-[#FFFBFA]">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-2">{h.howItWorks.title}</h2>
          <p className="text-center text-gray-500 mb-12">{h.howItWorks.subtitle}</p>
          <div className="grid gap-8 md:grid-cols-4">
            {h.howItWorks.steps.map((s: any, i: number) => (
              <div key={i} className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full text-xl font-bold text-white"
                  style={{ background: i === 1 ? "linear-gradient(135deg, #E8795B, #2DD4BF)" : "#E8795B" }}>
                  {s.number}
                </div>
                <h3 className="font-bold mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500">{s.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 bg-[#FFF1EE] rounded-xl p-6 border border-[#E8795B]/20">
            <div className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-[#E8795B] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-sm">⚠️ Preparación obligatoria:</p>
                <p className="text-sm text-gray-600 mt-1">Afeitá la zona <strong>24 horas antes</strong>. No uses cera, crema depilatoria ni pinzas. La piel debe estar limpia y sin cremas el día de la sesión.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-2">{h.pricing.title}</h2>
          <p className="text-center text-gray-500 mb-2">{h.pricing.subtitle}</p>
          <p className="text-center text-xs text-gray-400 mb-10">{h.pricing.note}</p>
          <div className="grid gap-3">
            {h.pricing.zones.map((z: any, i: number) => (
              <div key={i} className="flex items-center justify-between p-4 bg-[#FFFBFA] rounded-xl border border-gray-100 hover:border-[#E8795B]/30 transition">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${z.small ? 'bg-green-400' : z.medium ? 'bg-yellow-400' : 'bg-[#E8795B]'}`} />
                  <div>
                    <span className="font-medium">{z.name}</span>
                    <span className="text-xs text-gray-400 ml-2">~{z.time}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-bold text-[#1A1A2E]">{z.price}</span>
                  <span className="text-xs text-gray-400 ml-2">· {z.packagePrice}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <a href="https://wa.me/595974202025?text=Hola!%20Quiero%20consultar%20por%20paquetes%20de%20sesiones"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#E8795B] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#d4684e] transition">
              <MessageCircle className="w-5 h-5" /> Consultar paquetes
            </a>
          </div>
        </div>
      </section>

      {/* Gallery */}
      {h.gallery?.items?.length > 0 && (
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-2">{h.gallery.title}</h2>
            <p className="text-center text-gray-500 mb-10">{h.gallery.subtitle}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {h.gallery.items.map((g: any, i: number) => (
                <div key={i} className="bg-gradient-to-br from-[#FFF1EE] to-[#FDF2F8] rounded-xl p-8 text-center border border-[#E8795B]/10">
                  <div className="text-4xl mb-3">{g.emoji}</div>
                  <h3 className="font-bold text-sm">{g.title}</h3>
                  <p className="text-xs text-gray-500 mt-1">{g.description}</p>
                </div>
              ))}
            </div>
            {h.gallery.placeholder && (
              <p className="text-center text-xs text-gray-400 mt-4">📸 Próximamente: fotos reales de antes y después</p>
            )}
          </div>
        </section>
      )}

      {/* Testimonials */}
      {h.testimonials?.items?.length > 0 && (
        <section className="py-16 bg-[#FFFBFA]">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10">{h.testimonials.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {h.testimonials.items.map((t: any, i: number) => (
                <div key={i} className="bg-white rounded-xl p-6 border border-gray-100">
                  <div className="flex gap-1 mb-3">{Array.from({ length: t.rating }).map((_: any, j: number) => <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}</div>
                  <p className="text-gray-600 text-sm italic">"{t.quote}"</p>
                  <p className="font-semibold text-sm mt-4">— {t.author}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="py-16 bg-[#FFFBFA]">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">{h.faq.title}</h2>
          <div className="space-y-3">
            {h.faq.items.map((item: any, i: number) => (
              <details key={i} className="group border border-gray-200 rounded-xl overflow-hidden bg-white">
                <summary className="flex justify-between items-center p-4 cursor-pointer font-medium hover:bg-[#FFF1EE]">
                  <span className="text-sm">{item.question}</span>
                  <ChevronRight className="w-4 h-4 group-open:rotate-90 transition shrink-0" />
                </summary>
                <div className="px-4 pb-4 text-sm text-gray-600">{item.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="relative overflow-hidden py-16" style={{ background: "linear-gradient(135deg, #E8795B 0%, #2DD4BF 100%)" }}>
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white">Probá tu primera sesión</h2>
          <p className="mb-8 text-lg text-white/90">Escribime por WhatsApp, decime qué zona querés tratarte y elegimos día y horario.</p>
          <a href="https://wa.me/595974202025?text=Hola!%20Quiero%20reservar%20mi%20primera%20sesi%C3%B3n%20de%20depilaci%C3%B3n%20l%C3%A1ser%20IPL"
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-semibold text-[#E8795B] transition-all hover:scale-105">
            <MessageCircle className="w-5 h-5" /> Escribime ahora
          </a>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat phone={content.whatsapp} message="Hola! Quiero info sobre depilación láser IPL" />
      <MobileCta />
    </>
  )
}
