"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { MobileCta } from "@/components/mobile-cta"
import PageMeta from "@/components/page-meta"
import { useContent } from "@/lib/content-provider"
import { Instagram, MessageCircle, Mail, MapPin } from "lucide-react"

export default function ContactoPage() {
  const { content } = useContent()
  return (
    <>
      <PageMeta title={content.contacto.seo.title} description={content.contacto.seo.description} />
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-2">Contacto</h1>
        <p className="text-gray-500 mb-10">Escribime y coordinamos tu primera sesión.</p>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <MessageCircle className="w-6 h-6 text-[#E8795B] shrink-0 mt-1" />
              <div>
                <h3 className="font-bold">WhatsApp</h3>
                <a href="https://wa.me/595974202025" className="text-[#E8795B] hover:underline">+595 974 202 025</a>
                <p className="text-xs text-gray-500">Respuesta en el día</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Mail className="w-6 h-6 text-[#E8795B] shrink-0 mt-1" />
              <div>
                <h3 className="font-bold">Email</h3>
                <a href="mailto:info@depiflash.com.py" className="text-[#E8795B] hover:underline">info@depiflash.com.py</a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Instagram className="w-6 h-6 text-[#E8795B] shrink-0 mt-1" />
              <div>
                <h3 className="font-bold">Instagram</h3>
                <a href={content.instagram} target="_blank" rel="noopener noreferrer" className="text-[#E8795B] hover:underline">@depiflash.py</a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-[#E8795B] shrink-0 mt-1" />
              <div>
                <h3 className="font-bold">Cobertura</h3>
                <p className="text-gray-600">Asunción y Gran Asunción</p>
                <p className="text-sm text-gray-500">Fernando de la Mora, San Lorenzo, Luque, Lambaré, Mariano Roque Alonso, Ñemby</p>
              </div>
            </div>
          </div>
          <div className="bg-[#FFFBFA] rounded-xl p-8 border border-gray-100">
            <h3 className="font-bold text-lg mb-4">Reservá por WhatsApp</h3>
            <p className="text-gray-600 mb-6">Es la forma más rápida. Decime qué zona querés tratarte y coordinamos día y horario.</p>
            <a href="https://wa.me/595974202025?text=Hola!%20Quiero%20reservar%20una%20sesi%C3%B3n" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#E8795B] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#d4684e] transition">
              <MessageCircle className="w-5 h-5" /> Abrir WhatsApp
            </a>
          </div>
        </div>
      </div>
      <Footer />
      <WhatsAppFloat phone={content.whatsapp} message="Hola! Quiero contactarme" />
      <MobileCta />
    </>
  )
}
