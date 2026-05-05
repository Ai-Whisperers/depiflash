// Generic fetch-based CRUD for client sites
const BASE = process.env.NEXT_PUBLIC_API_URL || ""

async function req(path: string, options?: RequestInit) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...options?.headers },
    ...options,
  })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export const crud = {
  list: <T>(table: string, search?: string) =>
    req(`/api/db/${table}${search ? `?search=${encodeURIComponent(search)}` : ""}`) as Promise<{ data: T[]; count: number }>,
  get: <T>(table: string, id: string) =>
    req(`/api/db/${table}/${id}`) as Promise<T>,
  create: <T>(table: string, data: Partial<T>) =>
    req(`/api/db/${table}`, { method: "POST", body: JSON.stringify(data) }) as Promise<T>,
  update: <T>(table: string, id: string, data: Partial<T>) =>
    req(`/api/db/${table}`, { method: "PUT", body: JSON.stringify({ id, ...data }) }) as Promise<T>,
  remove: (table: string, id: string) =>
    req(`/api/db/${table}?id=${id}`, { method: "DELETE" }),
}

export function createCrudRoutes(table: string, searchFields: string[] = []) {
  // Returns handler functions for Next.js API routes
  return {
    GET: async (req: Request) => Response.json(await crud.list(table, new URL(req.url).searchParams.get("search") || "")),
    POST: async (req: Request) => Response.json(await crud.create(table, await req.json()), { status: 201 }),
    PUT: async (req: Request) => Response.json(await crud.update(table, (await req.json()).id, await req.json())),
    DELETE: async (req: Request) => Response.json(await crud.remove(table, new URL(req.url).searchParams.get("id") || "")),
  }
}
