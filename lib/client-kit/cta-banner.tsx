export function CtaBanner({
  title,
  description,
  ctaLabel,
  ctaHref,
}: {
  title: string
  description?: string
  ctaLabel?: string
  ctaHref?: string
}) {
  return (
    <section className="relative overflow-hidden py-16" style={{ background: "linear-gradient(135deg, #0F1624 0%, #3A4A5D 100%)" }}>
      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center">
        <h2 className="mb-4 text-3xl font-bold text-white">{title}</h2>
        {description && <p className="mx-auto mb-8 max-w-xl text-lg text-blue-200">{description}</p>}
        {ctaLabel && ctaHref && (
          <a
            href={ctaHref}
            target={ctaHref.startsWith("http") ? "_blank" : undefined}
            rel={ctaHref.startsWith("http") ? "noopener noreferrer" : undefined}
            className="inline-block rounded-lg bg-white px-8 py-4 font-semibold text-[#0F1624] transition-all hover:scale-105"
          >
            {ctaLabel}
          </a>
        )}
      </div>
    </section>
  )
}
