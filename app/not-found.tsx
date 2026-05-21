import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "linear-gradient(135deg, #FFF0F5, #FFF0F0, #FFF0F0)" }}>
      <div className="text-center p-8">
        <h1 className="text-6xl font-bold text-[#1A1A2E] mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Página no encontrada</p>
        <Link href="/" className="inline-flex items-center gap-2 bg-[#E8A0BF] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#D484A8] transition">
          <ArrowLeft className="w-4 h-4" /> Volver al inicio
        </Link>
      </div>
    </div>
  )
}
