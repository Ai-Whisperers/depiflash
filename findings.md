# Findings

## Content Architecture Comparison

### El Viajero (reference implementation)
- `ej_site_config` table: `key` (text PK), `value` (JSONB)
- `content_overrides` key stores partial overrides
- ContentProvider fetches at runtime, deep-merges with defaults
- Pages use `get("home.hero.headline")` syntax
- Admin tree editor at `/admin/contenido`

### Nexa Paraguay
- `site_content` table: `tenant_slug`, `locale`, `key_path`, `content`
- Key-value per path, one row per field
- Simpler but more rows
- No content override merge — reads directly

### DepiFlash (current state)
- `ej_site_config` table with `content_overrides` — seeded with Instagram only
- ContentProvider exists but pages don't use it yet
- Pages use `import raw from "@/content/es.json"` directly

## Key Decisions

1. Use **El Viajero's pattern** (single JSONB overrides row) — simpler admin, easier to edit
2. Merge at **render time**, not build time — no rebuild needed after admin edit
3. Admin editor should be a **single page tree editor** — edit all sections, not one at a time

## Hardcoded Values to Extract

| Value | Found In | Replace With |
|-------|----------|-------------|
| +595974202025 | Multiple places (CTA, Messaging, header, footer) | content.messaging |
| Messaging links with prefilled messages | Many CTAs | Construct from content.messaging + content.messagingMessage |
| https://www.instagram.com/depiflash.py | footer, contacto | content.instagram ✅ DONE |
| info@depiflash.com.py | footer, contacto | content.email |
| Asunción y Gran Asunción | Multiple text blocks | content.coverage |
| Gs. 50.000 ~ Gs. 200.000 (9 zones) | servicios/page.tsx, home | content.home.pricing.zones |
| FAQ questions/answers (9 items) | faq/page.tsx | content.faq.items |
| Testimonials (3 quotes) | home page | content.home.testimonials.items |
