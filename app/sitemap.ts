import { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://depiflash.paragu-ai.com"
  return ["", "/servicios", "/como-funciona", "/faq", "/contacto", "/privacidad"].map(p => ({
    url: `${base}${p}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: p === "" ? 1 : 0.8,
  }))
}
