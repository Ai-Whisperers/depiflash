"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { MobileCta } from "@/components/mobile-cta"
import PageMeta from "@/components/page-meta"
import { useContent } from "@/lib/content-provider"

export default function PrivacidadPage() {
  const { content } = useContent()
  return (
    <>
      <PageMeta title={content.privacidad.seo.title} description={content.privacidad.seo.description} />
      <Header />
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-6">Política de privacidad</h1>
        <div className="space-y-4 text-gray-700">
          <p>En DepiFlash nos comprometemos a proteger tu privacidad. Esta política describe cómo manejamos tu información personal.</p>
          <h2 className="text-xl font-bold text-[#1A1A2E]">Información que recopilamos</h2>
          <p>Recopilamos la información que nos proporcionás voluntariamente: nombre, número de teléfono, dirección y zona del cuerpo a tratar. Esta información es necesaria para coordinar las sesiones.</p>
          <h2 className="text-xl font-bold text-[#1A1A2E]">Uso de la información</h2>
          <p>Usamos tu información exclusivamente para: coordinar sesiones, recordarte tus citas, y enviarte información sobre cuidados post-sesión. No compartimos tus datos con terceros.</p>
          <h2 className="text-xl font-bold text-[#1A1A2E]">Protección de datos</h2>
          <p>Tus datos se almacenan de forma segura y no se comparten con terceros sin tu consentimiento explícito.</p>
          <h2 className="text-xl font-bold text-[#1A1A2E]">Tus derechos</h2>
          <p>Podés solicitar la eliminación de tus datos en cualquier momento contactándonos por WhatsApp.</p>
          <p className="text-sm text-gray-500 mt-8">Última actualización: mayo 2026</p>
        </div>
      </div>
      <Footer />
      <WhatsAppFloat phone="+595974202025" message="Hola! Consulta sobre privacidad" />
      <MobileCta />
    </>
  )
}
