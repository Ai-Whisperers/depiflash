# DepiFlash — AI Agent Guide

## Quick Links
- **Live:** https://depiflash.paragu-ai.com
- **Repo:** github.com/Ai-Whisperers/depiflash
- **Docker service:** depiflash_web (2 replicas)
- **VPS:** 72.61.44.159
- **Traefik:** Host(`depiflash.paragu-ai.com`)

## Architecture
Cloudflare (DNS, SSL) → VPS → Traefik → depiflash_web:3000

## Pages
Home, Servicios, Cómo funciona, FAQ, Contacto, Privacidad

## Design System
Coral/peach + lavender + teal. Playfair Display (headings), Inter (body). Voice: warm, professional, Spanish.

## Content
All content in `content/es.json`. Pricing, FAQ, prep instructions — all there.

## Build & Deploy
```bash
npm run build
docker build -t depiflash:prod .
docker stack deploy -c docker-compose.yml depiflash
```

## Critical Patterns
- All content in content/es.json
- No database — fully static
- WhatsApp is the primary booking channel
- Coral/teal gradient theme
- Mobile laser service — no fixed location
