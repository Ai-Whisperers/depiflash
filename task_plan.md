# DepiFlash — Dan's Enhancement Batch Plan (May 2026)

## Overview

4 changes from Dan's Messaging messages on May 20-21, 2026:

1. **Synonym for "Inglés completo"** → change to standard term
2. **Electrolysis research** → add electrolysis as complementary service?  
3. **Sun exposure advice fix** → replace "no te expongas al sol 48 horas antes" with correct advice
4. **Color scheme** → pink pastel + feminine elegant palette

---

## Batch 1: Content & Terminology

### 1a. "Inglés completo" → "Zona íntima completa"

**Research findings:**
- "Inglés completo" is outdated slang in Paraguay
- Clinics use: "Zona íntima completa", "Bikini completo", "Depilación integral"
- Most common in LATAM: **"Zona íntima completa"** (cepilarte, Piel&Co)
- For the pricing zone: `{ name: "Zona íntima completa", small: false, medium: true, ... }`

**Files to change:**
- `content/es.json` — zone name line 72, FAQ answer lines 100, 119
- API route — no change needed (reads from content overrides)
- Admin editor — no change needed (reads from content)

### 1b. Sun exposure advice — CORRECT medical guideline

**Research findings (BMLA, Laesera, StatPearls):**

| Current text (WRONG) | Correct text |
|---------------------|--------------|
| "No te expongas al sol 48 horas antes" | "No te expongas la zona a tratar al sol DIRECTAMENTE los días previos a la sesión. Si estuviste al sol, esperá al menos 1-2 semanas antes de la sesión." |
| Missing post-care | "Después de la sesión: no te expongas la zona tratada al sol por 48 horas. Usá protector solar SPF 50+ si vas a estar al aire libre." |

**Files to change:**
- `content/es.json` — step 2 description line 54, FAQ items line 99
- `servicios/page.tsx` — prep section hardcoded text (line ~65-75)

### 1c. Add relevant FAQ about solar exposure before/after

Add a dedicated FAQ item that answers proactively.

---

## Batch 2: Electrolysis Research Integration

**Research findings:**
- **Electrolysis vs IPL**: electrolysis is slower (10-30 min per small area), more painful, more expensive (18-35€ per session), but works on ALL hair types (including blonde/white). IPL is faster, cheaper per session, less painful, but only works on dark hair.
- **Market in Paraguay**: No major electrolysis providers found in Paraguay search. Main players are IPL/laser (DepilArte, Piel&Co, Espaçolaser, Dermalaser). **Electrolysis is niche** — mostly used for small areas (facial, eyebrows) and for clients with light/blonde hair that IPL can't treat.
- **Recommendation**: Don't offer electrolysis as a service. Instead:
  1. Mention in FAQ that IPL works on dark hair; for very light/blonde we can discuss alternatives
  2. Position IPL as superior for most clients (larger areas, less pain, better value)

**Files to change:**
- No code changes needed — just note this for Dan's business strategy

---

## Batch 3: Color Scheme Overhaul

### Current scheme
- Primary: `#E8795B` (salmon/coral) — warm, somewhat feminine but neutral
- Secondary: `#2DD4BF` (teal/teal) — gradient partner
- Background: `#FFF1EE`, `#FFFBFA`, `#FDF2F8` (light pinks and peaches)

### New scheme — "Rose Elegance"
Based on Dan's requirements (pastel pink + feminine + elegant):

| Usage | Current | New | Hex |
|-------|---------|-----|-----|
| Primary button/CTA | `#E8795B` | Rose | `#E8A0BF` |
| Primary hover | `#d4684e` | Rose darker | `#D484A8` |
| Secondary gradient partner | `#2DD4BF` | Lavender | `#C4A4D4` |
| Hero/text accent | `#E8795B` | Dusty rose | `#D4A0A0` |
| Light bg 1 | `#FFF1EE` | Pink ice | `#FFF0F5` |
| Light bg 2 | `#FFFBFA` | Lavender mist | `#F8F0FF` |
| Light bg 3 | `#FDF2F8` | Rose water | `#FFF0F0` |
| Text headings | `#1A1A2E` | Charcoal | Keep `#1A1A2E` |
| Button text | `#FFFFFF` | White | Keep `#FFFFFF` |

### Files to change (color references):
1. `tailwind.config.js` — add new colors
2. `app/globals.css` — if custom CSS
3. `app/page.tsx` — inline styles (gradients, backgrounds)
4. `app/servicios/page.tsx` — inline styles
5. `app/como-funciona/page.tsx` — inline styles
6. `app/contacto/page.tsx` — inline styles
7. `app/faq/page.tsx` — inline styles
8. `components/header.tsx` — any custom colors
9. `components/footer.tsx` — custom colors
10. `components/messaging-float.tsx` — custom colors
11. `components/mobile-cta.tsx` — custom colors
12. `components/cta-banner.tsx` — custom colors

### Key color replacement table
```
#E8795B → #E8A0BF  (primary rose)
#d4684e → #D484A8  (primary hover)
#2DD4BF → #C4A4D4  (secondary accent)
#FFF1EE → #FFF0F5  (bg light pink)
#FFFBFA → #F8F0FF  (bg lavender mist)
#FDF2F8 → #FFF0F0  (bg rose water)
```

The hero gradient changes from:
```
linear-gradient(135deg, #FFF1EE 0%, #FDF2F8 50%, #ECFDF5 100%)
→
linear-gradient(135deg, #FFF0F5 0%, #FFF0F0 50%, #F8F0FF 100%)
```

The CTA banner changes from:
```
linear-gradient(135deg, #E8795B 0%, #2DD4BF 100%)
→
linear-gradient(135deg, #E8A0BF 0%, #C4A4D4 100%)
```

---

## Execution Order

```
Batch 1a (terminology) ──→ Batch 1b (sun advice) ──→ Batch 3 (colors)
```

Batch 2 (electrolysis research) is strategy-only, no code.

---

## Timing
- Content/terminology changes: ~10 min (JSON edits only)
- Sun exposure changes: ~20 min (content JSON + FAQ + component hardcoded text)
- Color scheme: ~30 min (find-replace across ~12 files)
- **Total: ~ 1 hour**
