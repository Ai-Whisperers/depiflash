import Link from "next/link"

interface NavItem {
  label: string
  href: string
}

export function Header({ logo }: { logo?: string }) {
  const navItems: NavItem[] = [
    { label: "Inicio", href: "/" },
    { label: "Tienda", href: "/tienda" },
    { label: "Nosotros", href: "/nosotros" },
    { label: "Tiendas", href: "/tiendas" },
    { label: "Guías", href: "/guias" },
    { label: "FAQ", href: "/faq" },
    { label: "Contacto", href: "/contacto" },
  ]

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2" aria-label="Superspuma — Ir al inicio">
          <img src="/superspuma/images/icons/logo.svg" alt="Superspuma" className="h-10" />
          <span className="hidden text-lg font-bold text-[#0F1624] sm:inline">Superspuma</span>
        </Link>
        <nav className="flex items-center gap-1" aria-label="Navegación principal">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100">
              {item.label}
            </Link>
          ))}
          <a href="https://wa.me/595974202025" target="_blank" rel="noopener noreferrer" aria-label="Contactar por WhatsApp"
            className="ml-3 rounded-md bg-[#0F1624] px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-[#3A4A5D]">
            WhatsApp
          </a>
        </nav>
      </div>
    </header>
  )
}
