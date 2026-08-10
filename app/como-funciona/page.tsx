"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MessagingFloat } from "@/components/messaging-float"
import { MobileCta } from "@/components/mobile-cta"
import { CtaBanner } from "@/components/cta-banner"
import raw from "@/content/es.json"
import { MessageCircle, Zap, Clock, CheckCircle, Sparkles } from "lucide-react"

const content = raw as any
const h = content.home

export default function ComoFuncionaPage() {
  const steps = [
    { icon: <MessageCircle className="w-6 h-6" />, title: "1. Reservá", desc: h.howItWorks.steps[0].description },
    { icon: <Zap className="w-6 h-6" />, title: "2. Preparación (24h antes)", desc: "Afeitá la zona 24 horas antes. Piel limpia, sin cremas. NO uses cera ni crema depilatoria." },
    { icon: <Clock className="w-6 h-6" />, title: "3. Sesión en tu casa", desc: "Llego con el equipo IPL. Duración: 15-45 min. Sensación de calor, no dolor." },
    { icon: <CheckCircle className="w-6 h-6" />, title: "4. Post-sesión", desc: "No tomar sol 48h. Usar protector solar si hay exposición. No usar cremas perfumadas 24h." },
    { icon: <Sparkles className="w-6 h-6" />, title: "5. Resultados", desc: "8-10 sesiones cada 4-6 semanas. Desde la primera nota diferencia. Piel suave permanente." },
  ]

  return (
    <>
      <Header phone={content.phone} />
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-6">Cómo funciona</h1>
        <p className="text-lg text-gray-600 mb-10">Depilación láser IPL a domicilio en 5 pasos simples.</p>

        <div className="space-y-6">
          {steps.map((s, i) => (
            <div key={i} className="flex items-start gap-5 p-6 bg-[#F8F0FF] rounded-xl border border-gray-100">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#E8A0BF] to-[#FFB59B] flex items-center justify-center text-white shrink-0">{s.icon}</div>
              <div>
                <h3 className="font-bold text-lg">{s.title}</h3>
                <p className="text-gray-600 mt-1">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#FFF0F5] rounded-xl p-6 mt-8 border border-[#E8A0BF]/20">
          <h2 className="font-bold text-lg mb-3">⚡ Importante: preparación obligatoria</h2>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2"><Zap className="w-4 h-4 text-[#E8A0BF] shrink-0 mt-0.5" /> <strong>Afeitá la zona 24 horas antes</strong> — con máquina de afeitar (rastrillo).</li>
            <li className="flex items-start gap-2"><Zap className="w-4 h-4 text-[#E8A0BF] shrink-0 mt-0.5" /> No uses cera, crema depilatoria, pinzas ni máquina eléctrica 2 semanas antes.</li>
            <li className="flex items-start gap-2"><Zap className="w-4 h-4 text-[#E8A0BF] shrink-0 mt-0.5" /> No te expongas al sol 48 horas antes de la sesión.</li>
            <li className="flex items-start gap-2"><Zap className="w-4 h-4 text-[#E8A0BF] shrink-0 mt-0.5" /> El día de la sesión: piel limpia, sin cremas, sin desodorante, sin maquillaje en la zona.</li>
            <li className="flex items-start gap-2"><Zap className="w-4 h-4 text-[#E8A0BF] shrink-0 mt-0.5" /> No consumas alcohol ni cafeína 2 horas antes de la sesión.</li>
          </ul>
        </div>
      </div>
      <CtaBanner title="¿Lista para tu primera sesión?" description="Escribime por Messaging y coordinamos" ctaLabel="Reservar ahora" ctaHref={`tel:+${content.phone.replace(/[^0-9]/g, "")}?text=Hola!%20Quiero%20reservar%20mi%20primera%20sesi%C3%B3n`} />
      <Footer phone={content.phone} />
      <MessagingFloat phone={content.messaging} message="Hola! Cómo funciona el servicio?" />
      <MobileCta phone={content.phone} />
    </>
  )
}
