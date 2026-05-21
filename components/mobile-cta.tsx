export function MobileCta() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-gray-100 bg-white p-3 shadow-lg md:hidden">
      <a href="https://wa.me/595974202025?text=Hola!%20Quiero%20informaci%C3%B3n" target="_blank" rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 rounded-lg bg-[#E8A0BF] px-6 py-3 font-semibold text-white transition-all hover:bg-[#D484A8] active:scale-[0.98]">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z"/><path d="M14 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z"/><path d="M9.5 13.5c.5 1 1.5 1.5 2.5 1.5s2-.5 2.5-1.5"/></svg>
        Reservar por WhatsApp
      </a>
    </div>
  )
}
