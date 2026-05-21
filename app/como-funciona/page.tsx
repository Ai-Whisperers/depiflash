"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { MobileCta } from "@/components/mobile-cta"
import { CtaBanner } from "@/components/cta-banner"
import PageMeta from "@/components/page-meta"
import { useContent } from "@/lib/content-provider"
import { MessageCircle, Zap, Clock, CheckCircle, Sparkles } from "lucide-react"

export default function ComoFuncionaPage() {
  const { content } = useContent()
  const h = content.home
  const steps = [
    { icon: <MessageCircle className="w-6 h-6" />, title: "1. Reservá", desc: h.howItWorks.steps[0].description },
    { icon: <Zap className="w-6 h-6" />, title: "2. Preparación (24h antes)", desc: "Afeitá la zona 24 horas antes. Piel limpia, sin cremas. NO uses cera ni crema depilatoria." },
    { icon: <Clock className="w-6 h-6" />, title: "3. Sesión en tu casa", desc: "Llego con el equipo IPL. Duración: 15-45 min. Sensación de calor, no dolor." },
    { icon: <CheckCircle className="w-6 h-6" />, title: "4. Post-sesión", desc: "No tomar sol 48h. Usar protector solar si hay exposición. No usar cremas perfumadas 24h." },
    { icon: <Sparkles className="w-6 h-6" />, title: "5. Resultados", desc: "8-10 sesiones cada 4-6 semanas. Desde la primera nota diferencia. Piel suave permanente." },
  ]

  return (
    <>
      <PageMeta title={content.comoFunciona.seo.title} description={content.comoFunciona.seo.description} />
      <Header />
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-6">Cómo funciona</h1>
        <p className="text-lg text-gray-600 mb-10">Depilación láser IPL a domicilio en 5 pasos simples.</p>

        <div className="space-y-6">
          {steps.map((step, i) => (
            <div key={i} className="flex gap-4 p-5 bg-[#F8F0FF] rounded-xl border border-gray-100">
              <div className="w-10 h-10 rounded-full bg-[#E8A0BF]/10 flex items-center justify-center text-[#E8A0BF] shrink-0">
                {step.icon}
              </div>
              <div>
                <h3 className="font-bold text-[#1A1A2E] mb-1">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <CtaBanner title="¿Lista para empezar?" description="Reservá tu primera sesión por WhatsApp" ctaLabel="Reservar ahora" ctaHref="https://wa.me/595974202025?text=Hola!%20Quiero%20reservar%20mi%20primera%20sesi%C3%B3n%20de%20depilaci%C3%B3n%20l%C3%A1ser" />
      <Footer />
      <WhatsAppFloat phone={content.whatsapp} message="Hola! Quiero info sobre cómo funciona" />
      <MobileCta />
    </>
  )
}
