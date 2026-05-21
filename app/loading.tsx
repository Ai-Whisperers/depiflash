export default function Loading() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: "linear-gradient(135deg, #FFF1EE, #FDF2F8, #ECFDF5)" }}
    >
      <div className="text-center">
        <div className="w-10 h-10 border-4 border-[#E8795B] border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-gray-500 text-sm mt-4">Cargando...</p>
      </div>
    </div>
  )
}
