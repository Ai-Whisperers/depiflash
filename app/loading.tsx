export default function Loading() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: "linear-gradient(135deg, #FFF0F5, #FFF0F0, #FFF0F0)" }}
    >
      <div className="text-center">
        <div className="w-10 h-10 border-4 border-[#E8A0BF] border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-gray-500 text-sm mt-4">Cargando...</p>
      </div>
    </div>
  )
}
