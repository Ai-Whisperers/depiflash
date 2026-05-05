"use client"
import { useEffect, useState } from "react"
export function LoadingBar() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    let timer: NodeJS.Timeout
    const start = () => { timer = setTimeout(() => setVisible(true), 300) }
    const end = () => { clearTimeout(timer); setVisible(false) }
    window.addEventListener("beforeunload", start)
    window.addEventListener("load", end)
    return () => { window.removeEventListener("beforeunload", start); window.removeEventListener("load", end); clearTimeout(timer) }
  }, [])
  if (!visible) return null
  return <div className="fixed top-0 left-0 z-50 h-1 bg-blue-500 animate-pulse w-full" />
}
