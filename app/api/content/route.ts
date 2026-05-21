// /api/content — public endpoint for content overrides
// Client-side components call this to merge Supabase overrides on top of es.json
import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null

const CONFIG_KEY = "content_overrides"

export async function GET() {
  if (!supabase) {
    return NextResponse.json({ overrides: {} })
  }

  const { data } = await supabase
    .from("ej_site_config")
    .select("value")
    .eq("key", CONFIG_KEY)
    .single()

  return NextResponse.json({ overrides: data?.value ?? {} })
}
