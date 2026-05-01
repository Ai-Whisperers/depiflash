# DepiFlash

Depilación láser IPL a domicilio en Asunción y Gran Asunción.

**Live:** https://depiflash.paragu-ai.com

## Pages
- Home — hero, benefits, how it works, pricing, FAQ, CTA
- Servicios — detailed pricing per body zone
- Cómo funciona — prep instructions, session steps
- FAQ
- Contacto
- Privacidad

## Design
Coral (#E8795B) + lavender (#F3E8FF) + teal (#2DD4BF). Playfair Display headings, Inter body.

## Build & Deploy
```bash
npm run build
docker build -t depiflash:prod .
docker stack deploy -c docker-compose.yml depiflash
```
