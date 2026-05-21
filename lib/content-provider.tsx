"use client"

import { createContext, useContext, useState, useEffect, useCallback, useRef, ReactNode } from "react"
import defaultContent from "@/content/es.json"

type ContentData = Record<string, any>

interface ContentContextType {
  content: ContentData
  get: (path: string) => any
  loading: boolean
}

function deepGet(obj: any, path: string): any {
  const parts = path.split(".")
  let cur = obj
  for (const p of parts) {
    if (cur?.[p] === undefined || cur?.[p] === null) return undefined
    cur = cur[p]
  }
  return cur
}

function deepMerge(defaults: any, overrides: any): any {
  if (typeof defaults !== "object" || defaults === null) return overrides ?? defaults
  if (typeof overrides !== "object" || overrides === null) return overrides ?? defaults
  if (Array.isArray(defaults) || Array.isArray(overrides)) return overrides ?? defaults
  
  const result: any = { ...defaults }
  for (const key of Object.keys(overrides)) {
    if (key in defaults) {
      result[key] = deepMerge(defaults[key], overrides[key])
    } else {
      result[key] = overrides[key]
    }
  }
  return result
}

const ContentContext = createContext<ContentContextType>({
  content: defaultContent as ContentData,
  get: () => undefined,
  loading: false,
})

export function ContentProvider({ children }: { children: ReactNode }) {
  const [overrides, setOverrides] = useState<ContentData>({})
  const [loading, setLoading] = useState(true)
  const fetchedRef = useRef(false)

  const content = deepMerge(defaultContent, overrides)

  const get = useCallback((path: string) => {
    const ov = deepGet(overrides, path)
    if (ov !== undefined && ov !== null && ov !== "") return ov
    return deepGet(defaultContent, path)
  }, [overrides])

  useEffect(() => {
    if (fetchedRef.current) return
    fetchedRef.current = true

    fetch("/api/content")
      .then((res) => res.ok ? res.json() : { overrides: {} })
      .then((data) => {
        if (data?.overrides && typeof data.overrides === "object") {
          setOverrides(data.overrides)
        }
      })
      .catch(() => { /* silent — use defaults */ })
      .finally(() => setLoading(false))
  }, [])

  return (
    <ContentContext.Provider value={{ content, get, loading }}>
      {children}
    </ContentContext.Provider>
  )
}

export function useContent() {
  return useContext(ContentContext)
}

export { defaultContent }
