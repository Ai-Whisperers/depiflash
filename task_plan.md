# DepiFlash — Complete Upgrade Plan

**Goal:** Move DepiFlash from hardcoded JSON content + minimal admin to a full Supabase-backed content management system matching El Viajero's patterns, with an admin editor for all business content.

## Architecture

```
content/es.json (defaults)  ──┐
                               ├── ContentProvider (merge) ──→ pages
ej_site_config (overrides)   ──┘
     ↑
  /api/admin/content (PUT)
     ↑
  Admin Editor (tree view)
```

## Phase 1: Content System (Supabase Backend)

**Goal:** Every piece of business data is editable via Supabase, not code.

### 1a. Seed all content to Supabase
- Read every field from `content/es.json`
- Store as full `content_overrides` in `ej_site_config`
- Makes admin the source of truth; JSON becomes just a fallback

### 1b. Public content API
- `/api/content/overrides` — returns content_overrides JSONB
- `/api/content/path?key=home.hero.headline` — gets specific path
- Use service role key for reads too (trusted server)

### 1c. ContentProvider (client-side)
- Already created but pages DON'T use it yet
- Must refactor every page to use `useContent()` instead of raw JSON import
- Footer already wired

## Phase 2: Admin Content Editor

**Goal:** Dan can edit prices, FAQ, phone, WhatsApp link, Instagram, SEO from a web UI.

### 2a. Admin auth
- Supabase email/password login page (already exists at `/login`)
- AdminGuard component protecting `/admin/*`
- `/api/admin/auth` for session verification

### 2b. Content editor
- Tree editor component showing all sections
- Editable fields: pricing (9 zones), FAQ (9 items), testimonials, SEO fields
- Phone, WhatsApp link, Instagram, email, coverage area
- Save button → PUT to `/api/admin/content`
- Confirmation toast + optimistic UI

### 2c. Admin dashboard
- Google Analytics summary (sessions, page views, top pages)
- Content last-edited timestamp
- Quick links to WhatsApp

## Phase 3: Page Refactoring

**Goal:** All pages read from ContentProvider, not hardcoded JSON.

### 3a. Layout refactor
- Wrap `ContentProvider` in root layout
- Update `page-meta.tsx` to use content from context

### 3b. Inner pages
- `servicios/page.tsx` — prices editable via admin
- `como-funciona/page.tsx` — steps text editable
- `faq/page.tsx` — questions/answers editable
- `contacto/page.tsx` — phone, Instagram, email from content
- `home/page.tsx` — hero, benefits, testimonials, CTA text editable

### 3c. Remove hardcoded values
- Phone `+595974202025` → all references use `content.whatsapp`
- WhatsApp links with prefilled messages → construct from `content.whatsapp` + URL-encoded message
- Coverage area → `content.coverage`
- Business name, tagline → read from content

## Phase 4: Analytics & Rate Limiting

### 4a. Rate limit middleware
- Token-bucket rate limiter on `/api/contact` and `/api/subscribe`
- Memory-based, resets hourly

### 4b. Admin analytics
- Vercel Analytics data via their API
- Simple dashboard cards (today's sessions, this week, top referral)

## Phase 5: Deployment

### 5a. Docker Swarm
- Verify `.env` has all Supabase vars on VPS
- Deploy new version with `docker stack deploy`

### 5b. CI/CD
- GitHub Actions already builds
- On merge to main → auto-deploy via deploy-vps workflow

---

## Priority Order

```
Phase 1a ──→ Phase 1b ──→ Phase 1c ──→ Phase 3 ──→ Phase 2 ──→ Phase 4 ──→ Phase 5
             (API)       (Provider)   (Pages)    (Editor)   (Limiting)
```

**Actually: Phase 2 (admin editor) comes before Phase 3 (page refactoring).**
The page refactoring is only useful if the admin editor exists. Priority:

1. Phase 1a — Seed all content to Supabase ✅ (partially — Instagram only)
2. Phase 1b — API layer
3. Phase 2 — Admin content editor
4. Phase 3 — Refactor pages to use ContentProvider
5. Phase 4 — Rate limiting & analytics
6. Phase 5 — Deploy

## Errors to Watch

| Risk | Mitigation |
|------|------------|
| Supabase service role key exposed client-side | Use server-only `/api/` routes |
| ContentProvider flash of unmerged content | Show loading skeleton until merge complete |
| Admin edit breaks JSON structure | Validate JSONB before writing |
| Phone number formatting inconsistency | Single source: `content.whatsapp` everywhere |

## Completion Criteria

- [ ] All business data lives in Supabase `ej_site_config.content_overrides`
- [ ] Admin editor at `/admin/content` can edit prices, FAQ, SEO, contacts
- [ ] Every page reads from ContentProvider (not hardcoded JSON/strings)
- [ ] No hardcoded phone, WhatsApp links, Instagram, or email in any component
- [ ] Rate limiting on contact form
- [ ] Deployed and verified live
