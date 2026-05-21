"use client"

import { useEffect } from "react"

interface Props {
  title: string
  description: string
  schema?: Record<string, unknown>
}

export default function PageMeta({ title, description, schema }: Props) {
  useEffect(() => {
    document.title = title
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]') || (() => {
      const el = document.createElement("meta") as HTMLMetaElement
      el.name = "description"
      document.head.appendChild(el)
      return el
    })()
    meta.content = description

    // Remove old schema script if any
    const old = document.getElementById("page-schema")
    if (old) old.remove()

    if (schema) {
      const script = document.createElement("script")
      script.id = "page-schema"
      script.type = "application/ld+json"
      script.textContent = JSON.stringify(schema)
      document.head.appendChild(script)
    }
  }, [title, description, schema])

  return null
}
