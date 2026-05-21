import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import "./globals.css"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import raw from "@/content/es.json"

const content = raw as any

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
})

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://depiflash.paragu-ai.com"),
  title: "DepiFlash — Depilación Láser IPL a Domicilio en Asunción",
  description: "Depilación láser IPL a domicilio en Asunción y Gran Asunción. Sin moverte de tu casa. Resultados desde la primera sesión.",
  alternates: { canonical: "https://depiflash.paragu-ai.com" },
  icons: {
    icon: "/icon.svg",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "DepiFlash — Depilación Láser IPL a Domicilio",
    description: "Depilación láser IPL en tu casa. Asunción y Gran Asunción. Resultados desde la primera sesión.",
    url: "https://depiflash.paragu-ai.com",
    siteName: "DepiFlash",
    locale: "es_PY",
    type: "website",
    images: [{ url: "/og-image.svg", width: 1200, height: 630 }],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "DepiFlash",
    description: "Depilación láser IPL a domicilio en Asunción y Gran Asunción.",
    provider: { "@type": "Person", name: "DepiFlash" },
    areaServed: ["Asunción", "Fernando de la Mora", "San Lorenzo", "Luque", "Lambaré", "Mariano Roque Alonso", "Ñemby"],
    telephone: content.phone,
    url: "https://depiflash.paragu-ai.com",
    serviceType: "Depilación láser IPL",
  }

  return (
    <html lang="es" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-X2XQZR3J6K" />
        <script dangerouslySetInnerHTML={{
          __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-X2XQZR3J6K',{cookie_flags:'max-age=7200;secure;samesite=none'});`
        }} />
      </head>
      <body className="antialiased">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
