"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { MobileCta } from "@/components/mobile-cta"
import raw from "@/content/es.json"
import { MessageCircle, Zap } from "lucide-react"

const content = raw as any
const h = content.home

export default function ServiciosPage() {
  return (
    <>
      <Header phone={content.phone} />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-2">Servicios y precios</h1>
        <p className="text-gray-500 mb-2">Depilación láser IPL a domicilio. Precios por sesión individual.</p>
        <p className="text-xs text-gray-400 mb-10">Los precios incluyen desplazamiento dentro de Asunción y Gran Asunción.</p>

        <div className="grid gap-3 mb-8">
          {h.pricing.zones.map((z: any, i: number) => (
            <div key={i} className="flex items-center justify-between p-5 bg-[#F8F0FF] rounded-xl border border-gray-100">
              <div className="flex items-center gap-3">
                <div className={`w-2.5 h-2.5 rounded-full ${z.small ? 'bg-green-400' : z.medium ? 'bg-yellow-400' : 'bg-[#E8A0BF]'}`} />
                <div>
                  <span className="font-semibold">{z.name}</span>
                  <span className="text-sm text-gray-400 ml-2">~{z.time}</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xl font-bold text-[#1A1A2E]">{z.price}</span>
                <span className="text-xs text-gray-400 block">{z.packagePrice}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#FFF0F5] rounded-xl p-6">
          <h2 className="font-bold text-lg mb-3">💡 Paquetes con descuento</h2>
          <p className="text-gray-600 mb-4">Comprando un paquete de 6 sesiones, el precio por sesión baja entre 15% y 20%. Consultame por WhatsApp y te preparo un presupuesto personalizado.</p>
          <a href={`https://wa.me/${content.phone.replace(/[^0-9]/g, "")}?text=Hola!%20Quiero%20un%20presupuesto%20personalizado%20para%20depilaci%C3%B3n%20l%C3%A1ser%20IPL`}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#E8A0BF] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#D484A8] transition">
            <MessageCircle className="w-5 h-5" /> Pedir presupuesto
          </a>
        </div>

        {/* Programa de Reafirmación */}
        {raw.reafirmacion && (
          <div className="mt-10 bg-gradient-to-br from-[#FFF0F5] to-[#FFF0F0] rounded-xl p-8 border border-[#E8A0BF]/20">
            <h2 className="font-bold text-xl mb-3">🏳️‍⚧️ {raw.reafirmacion.title}</h2>
            <p className="text-gray-600 mb-4">{raw.reafirmacion.description}</p>
            <a href={raw.reafirmacion.ctaHref} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#E8A0BF] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#D484A8] transition">
              <MessageCircle className="w-5 h-5" /> {raw.reafirmacion.ctaLabel}
            </a>
          </div>
        )}

        <div className="mt-10 bg-[#F8F0FF] rounded-xl p-6 border border-gray-100">
          <h2 className="font-bold text-lg mb-3">📋 Preparación para la sesión</h2>
          <div className="flex items-start gap-3">
            <Zap className="w-5 h-5 text-[#E8A0BF] shrink-0 mt-0.5" />
            <div className="text-sm text-gray-600 space-y-2">
              <p>✅ <strong>Afeitá la zona 24 horas antes</strong> — es el paso más importante.</p>
              <p>✅ Lavá la zona con agua y jabón neutro el día de la sesión.</p>
              <p>❌ NO uses cera, crema depilatoria ni pinzas 2 semanas antes.</p>
              <p>❌ Si estuviste al sol los días previos, avisame — podemos reprogramar para otra fecha. Esperá al menos una semana entre exposición solar y sesión.</p>
              <p>✅ Después de cada sesión: no te expongas la zona tratada al sol por 48 horas. Usá protector solar SPF 50+.</p>
              <p>❌ No uses cremas, lociones, desodorante ni maquillaje en la zona el día de la sesión.</p>
            </div>
          </div>
        </div>
      </div>
      <Footer phone={content.phone} />
      <WhatsAppFloat phone={content.whatsapp} message="Hola! Quiero consultar precios de depilación" />
      <MobileCta phone={content.phone} />
    </>
  )
}
