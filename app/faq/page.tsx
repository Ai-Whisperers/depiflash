"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MessagingFloat } from "@/components/messaging-float"
import { MobileCta } from "@/components/mobile-cta"
import { CtaBanner } from "@/components/cta-banner"
import raw from "@/content/es.json"
import { ChevronRight } from "lucide-react"

const content = raw as any
const faqItems = content.faq.items

export default function FaqPage() {
  return (
    <>
      <Header phone={content.phone} />
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-2">Preguntas frecuentes</h1>
        <p className="text-gray-500 mb-10">Todo lo que querés saber sobre depilación láser IPL a domicilio.</p>
        <div className="space-y-3">
          {faqItems.map((item: any, i: number) => (
            <details key={i} className="group border border-gray-200 rounded-xl overflow-hidden bg-white">
              <summary className="flex justify-between items-center p-4 cursor-pointer font-medium hover:bg-[#FFF0F5]">
                <span>{item.question}</span>
                <ChevronRight className="w-4 h-4 group-open:rotate-90 transition shrink-0" />
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-600">{item.answer}</div>
            </details>
          ))}
        </div>
      </div>
      <CtaBanner title="¿Otra pregunta?" description="Escribime por Messaging y te respondo al toque" ctaLabel="Consultar" ctaHref={`tel:+${content.phone.replace(/[^0-9]/g, "")}?text=Hola!%20Tengo%20una%20consulta%20sobre%20depilaci%C3%B3n%20l%C3%A1ser`} />
      <Footer phone={content.phone} />
      <MessagingFloat phone={content.messaging} message="Hola! Tengo una consulta" />
      <MobileCta phone={content.phone} />
    </>
  )
}
