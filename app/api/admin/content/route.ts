import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null

const CONFIG_KEY = "content_overrides"

// GET /api/content — public endpoint for overrides merge
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const path = searchParams.get("path")

  if (!supabase) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 500 })
  }

  const { data } = await supabase
    .from("ej_site_config")
    .select("value")
    .eq("key", CONFIG_KEY)
    .single()

  const overrides = data?.value ?? {}

  if (path) {
    const keys = path.split(".")
    let cur: any = overrides
    for (const k of keys) {
      if (cur && typeof cur === "object" && k in cur) cur = cur[k]
      else return NextResponse.json(null)
    }
    return NextResponse.json({ value: cur ?? null })
  }

  return NextResponse.json({ overrides, siteId: "depiflash" })
}

// PUT /api/admin/content — admin writes overrides
export async function PUT(request: Request) {
  const body = await request.json()
  if (!body || !body.content) {
    return NextResponse.json({ error: "Missing content body" }, { status: 400 })
  }
  if (!supabase) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 500 })
  }

  const { error } = await supabase
    .from("ej_site_config")
    .upsert({ key: CONFIG_KEY, value: body.content }, { onConflict: "key" })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
