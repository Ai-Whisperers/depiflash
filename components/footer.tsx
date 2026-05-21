import Link from "next/link"

export function Footer({ phone }: { phone: string }) {
  return (
    <footer className="bg-[#1A1A2E] py-12 text-white">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#E8795B] to-[#2DD4BF] flex items-center justify-center text-white font-bold text-xs">DF</div>
              <h3 className="text-lg font-bold">DepiFlash</h3>
            </div>
            <p className="text-sm text-gray-400">Depilación láser IPL a domicilio en Asunción y Gran Asunción.</p>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-400">Enlaces</h4>
            <div className="flex flex-col gap-2 text-sm">
              <Link href="/" className="text-gray-300 hover:text-white">Inicio</Link>
              <Link href="/servicios" className="text-gray-300 hover:text-white">Servicios y precios</Link>
              <Link href="/como-funciona" className="text-gray-300 hover:text-white">Cómo funciona</Link>
              <Link href="/faq" className="text-gray-300 hover:text-white">FAQ</Link>
              <Link href="/contacto" className="text-gray-300 hover:text-white">Contacto</Link>
              <Link href="/privacidad" className="text-gray-300 hover:text-white">Privacidad</Link>
            </div>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-400">Contacto</h4>
            <div className="flex flex-col gap-2 text-sm">
              <a href={`https://wa.me/${phone.replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">{phone}</a>
              <a href="mailto:info@depiflash.com.py" className="text-gray-300 hover:text-white">info@depiflash.com.py</a>
              <a href="https://www.instagram.com/depiflash.py" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">Instagram</a>
              <span className="text-gray-500">Asunción, Paraguay</span>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-gray-700 pt-6 text-center text-xs text-gray-600">
          &copy; {new Date().getFullYear()} DepiFlash. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  )
}
