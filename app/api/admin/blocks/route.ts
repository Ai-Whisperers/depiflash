import { NextResponse } from "next/server"
import { createBlock, deleteBlock, isAdminRequest, readBookingData } from "@/lib/booking/store"

export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  if (!isAdminRequest(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const data = await readBookingData()
  return NextResponse.json({ blockedDates: data.blockedDates.sort((a, b) => a.date.localeCompare(b.date)) })
}

export async function POST(request: Request) {
  const debug: Record<string, unknown> = { step: "init", ts: new Date().toISOString() }
  if (!isAdminRequest(request)) return NextResponse.json({ error: "Unauthorized", debug }, { status: 401 })
  try {
    const body = await request.json()
    const blockType = body.block_type === "partial_day" ? "partial_day" : "full_day"
    if (!body.date) return NextResponse.json({ error: "Fecha requerida", debug }, { status: 400 })
    const block = await createBlock({
      date: String(body.date),
      start_time: blockType === "partial_day" ? String(body.start_time || "09:00") : null,
      end_time: blockType === "partial_day" ? String(body.end_time || "10:00") : null,
      reason: String(body.reason || "Bloqueado"),
      block_type: blockType,
    })
    debug.step = "saved"
    return NextResponse.json({ block, debug }, { status: 201 })
  } catch (error: any) {
    debug.step = "uncaught"
    debug.error = error?.message || String(error)
    return NextResponse.json({ error: "No se pudo bloquear el horario", debug }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  if (!isAdminRequest(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const url = new URL(request.url)
  const id = url.searchParams.get("id")
  if (!id) return NextResponse.json({ error: "ID requerido" }, { status: 400 })
  await deleteBlock(id)
  return NextResponse.json({ ok: true })
}
