import Link from "next/link"

export function Footer({ businessName }: { businessName?: string }) {
  return (
    <footer className="bg-[#0F1624] py-12 text-white">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="mb-3 text-lg font-bold">{businessName || "Superspuma"}</h3>
            <p className="text-sm text-blue-200">Colchones y Sommiers desde 1976</p>
            <p className="text-sm text-blue-200">Villeta - Central, Paraguay</p>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-blue-300">Enlaces</h4>
            <div className="flex flex-col gap-2 text-sm">
              <Link href="/" className="text-white/80 hover:text-white">Inicio</Link>
              <Link href="/tienda" className="text-white/80 hover:text-white">Tienda</Link>
              <Link href="/nosotros" className="text-white/80 hover:text-white">Nosotros</Link>
              <Link href="/tiendas" className="text-white/80 hover:text-white">Tiendas</Link>
              <Link href="/guias" className="text-white/80 hover:text-white">Guías</Link>
              <Link href="/faq" className="text-white/80 hover:text-white">FAQ</Link>
              <Link href="/garantia" className="text-white/80 hover:text-white">Garantía</Link>
              <Link href="/privacidad" className="text-white/80 hover:text-white">Privacidad</Link>
              <Link href="/terminos" className="text-white/80 hover:text-white">Términos</Link>
            </div>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-blue-300">Contacto</h4>
            <div className="flex flex-col gap-2 text-sm">
              <a href="mailto:info@superspuma.com.py" className="text-white/80 hover:text-white">info@superspuma.com.py</a>
              <a href="https://wa.me/595974202025" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white">WhatsApp</a>
              <span className="text-white/60">+595 981 111 222</span>
            </div>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-blue-300">Seguinos</h4>
            <div className="flex flex-col gap-2 text-sm">
              <a href="https://instagram.com/superspumapy" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white">Instagram</a>
              <a href="https://facebook.com/superspuma" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white">Facebook</a>
              <a href="https://linkedin.com/company/superspuma-del-paraguay-saeca" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white">LinkedIn</a>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-white/20 pt-6 text-center text-xs text-white/50">
          &copy; {new Date().getFullYear()} {businessName || "Superspuma"}. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  )
}
