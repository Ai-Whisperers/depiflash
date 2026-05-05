"use client"
import { useEffect } from "react"

declare global { interface Window { gtag?: any; dataLayer?: any[] } }

const GA_ID = "G-X2XQZR3J6K"

export function Analytics() {
  useEffect(() => {
    if (typeof window === "undefined" || document.getElementById("ga-script")) return
    const s = document.createElement("script")
    s.id = "ga-script"
    s.async = true
    s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
    document.head.appendChild(s)
    window.dataLayer = window.dataLayer || []
    window.gtag = function() { window.dataLayer!.push(arguments) }
    window.gtag("js", new Date())
    window.gtag("config", GA_ID)
  }, [])
  return null
}

export function trackEvent(action: string, params?: Record<string, any>) {
  try { if (typeof window !== "undefined" && (window as any).gtag) (window as any).gtag("event", action, params) } catch {}
}
