export function CtaBanner({ title, description, ctaLabel, ctaHref }: { title: string; description?: string; ctaLabel?: string; ctaHref?: string }) {
  return (
    <section className="relative overflow-hidden py-16" style={{ background: "linear-gradient(135deg, #E8A0BF 0%, #C4A4D4 100%)" }}>
      <div className="mx-auto max-w-3xl px-4 text-center">
        <h2 className="mb-4 text-3xl font-bold text-white">{title}</h2>
        {description && <p className="mx-auto mb-8 max-w-xl text-lg text-white/90">{description}</p>}
        {ctaLabel && ctaHref && (
          <a href={ctaHref} target={ctaHref.startsWith("http") ? "_blank" : undefined} rel={ctaHref.startsWith("http") ? "noopener noreferrer" : undefined}
            className="inline-block rounded-xl bg-white px-8 py-4 font-semibold text-[#E8A0BF] transition-all hover:scale-105">
            {ctaLabel}
          </a>
        )}
      </div>
    </section>
  )
}
