import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import "./globals.css"

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
  openGraph: {
    title: "DepiFlash — Depilación Láser IPL a Domicilio",
    description: "Depilación láser IPL en tu casa. Asunción y Gran Asunción. Resultados desde la primera sesión.",
    url: "https://depiflash.paragu-ai.com",
    siteName: "DepiFlash",
    locale: "es_PY",
    type: "website",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${playfair.variable} ${inter.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  )
}
