import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { rateLimit } from "@/lib/rate-limit"

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Only rate-limit API routes (not content API — that powers the site)
  if (pathname.startsWith("/api/admin/")) {
    const result = rateLimit(req)
    if (!result.allowed) return result.response
  }

  return NextResponse.next()
}

export const config = {
  matcher: "/api/:path*",
}
