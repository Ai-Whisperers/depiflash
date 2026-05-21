import Link from "next/link"

export function Header() {
  const navItems = [
    { label: "Inicio", href: "/" },
    { label: "Servicios", href: "/servicios" },
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
        <nav className="flex items-center gap-1">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-[#FFF0F5] hover:text-[#E8A0BF]">
              {item.label}
            </Link>
          ))}
          <a href="https://wa.me/595974202025" target="_blank" rel="noopener noreferrer"
            className="ml-2 rounded-lg bg-[#E8A0BF] px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-[#D484A8]">
            WhatsApp
          </a>
        </nav>
      </div>
    </header>
  )
}
