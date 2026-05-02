import type { ProcessStep } from "@/types/content"

export function ProcessSection({
  title,
  subtitle,
  steps,
  accentColor = "primary",
}: {
  title: string
  subtitle?: string
  steps: ProcessStep[]
  accentColor?: "primary" | "accent"
}) {
  const bgClass = accentColor === "accent" ? "bg-accent text-accent-foreground" : "bg-primary text-primary-foreground"
  return (
    <section className="bg-surface py-16">
      <div className="mx-auto max-w-5xl px-4">
        {title && <h2 className="mb-2 text-center text-3xl font-bold text-foreground">{title}</h2>}
        {subtitle && <p className="mb-12 text-center text-muted-foreground">{subtitle}</p>}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <div key={i} className="relative text-center">
              <div className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full text-2xl font-bold ${bgClass}`}>
                {step.step}
              </div>
              <h3 className="mb-2 text-lg font-bold text-foreground">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
