"use client"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "linear-gradient(135deg, #FFF0F5, #FFF0F0, #FFF0F0)" }}
    >
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-[#1A1A2E] mb-4">Oops</h1>
        <p className="text-xl text-gray-600 mb-2">Algo salió mal</p>
        <p className="text-sm text-gray-400 mb-8">No te preocupes, fue un error inesperado.</p>
        <button
          onClick={() => reset()}
          className="inline-flex items-center gap-2 bg-[#E8A0BF] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#D484A8] transition shadow-sm"
        >
          Intentar de nuevo
        </button>
      </div>
    </div>
  )
}
