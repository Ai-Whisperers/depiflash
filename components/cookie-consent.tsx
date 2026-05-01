'use client'
import { useState, useEffect } from "react"

export function CookieConsent() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    setShow(!localStorage.getItem("cookie_consent"))
  }, [])

  const accept = () => {
    localStorage.setItem("cookie_consent", "true")
    setShow(false)
  }

  if (!show) return null

  return (
    <div style={{
      position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 99999,
      backgroundColor: "var(--surface, #1a1a2e)", color: "var(--text, white)",
      padding: "12px 24px", display: "flex", alignItems: "center",
      justifyContent: "space-between", gap: 16, flexWrap: "wrap",
      fontSize: "0.875rem", boxShadow: "0 -4px 12px rgba(0,0,0,0.15)"
    }}>
      <span>Este sitio usa cookies para mejorar tu experiencia.</span>
      <button onClick={accept} style={{
        backgroundColor: "var(--primary, #2563eb)", color: "white",
        border: "none", padding: "8px 20px", borderRadius: 8,
        cursor: "pointer", fontWeight: 600, fontSize: "0.875rem"
      }}>Aceptar</button>
    </div>
  )
}
