"use client"

import Link from "next/link"
import { useState } from "react"

export function Header({ phone }: { phone: string }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const navItems = [
    { label: "Inicio", href: "/" },
    { label: "Servicios", href: "/servicios" },
    { label: "Reservar", href: "/reservar" },
    { label: "Cómo funciona", href: "/como-funciona" },
    { label: "FAQ", href: "/faq" },
    { label: "Contacto", href: "/contacto" },
  ]

  return (
    <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2" aria-label="DepiFlash — Inicio">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#E8A0BF] to-[#C4A4D4] flex items-center justify-center text-white font-bold text-sm">DF</div>
          <span className="hidden text-lg font-bold text-[#1A1A2E] sm:inline">DepiFlash</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-[#FFF0F5] hover:text-[#E8A0BF]">
              {item.label}
            </Link>
          ))}
          <a href={`https://wa.me/${phone.replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener noreferrer"
            className="ml-2 rounded-lg bg-[#E8A0BF] px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-[#D484A8]">
            WhatsApp
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 md:hidden"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}>
          {menuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          )}
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="border-t border-gray-100 bg-white shadow-lg">
          <nav className="mx-auto max-w-6xl px-4 py-2">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}
                onClick={() => setMenuOpen(false)}
                className="block rounded-lg px-3 py-3 text-base font-medium text-gray-700 transition-colors hover:bg-[#FFF0F5] hover:text-[#E8A0BF]">
                {item.label}
              </Link>
            ))}
            <a href={`https://wa.me/${phone.replace(/[^0-9]/g, "")}?text=Hola!%20Quiero%20informaci%C3%B3n`}
              target="_blank" rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="mt-2 block rounded-lg bg-[#E8A0BF] px-3 py-3 text-center text-base font-semibold text-white transition-all hover:bg-[#D484A8]">
              WhatsApp
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
