# DepiFlash — Auditoría Completa del Sitio Web
## Análisis de cada página, contenido y oportunidades de mejora

> Fecha: 2026-05-02
> URL: https://depiflash.paragu-ai.com
> Stack: Next.js 15 + Tailwind v4 + TypeScript
> Hosting: Docker Swarm (2 réplicas) + Traefik + Cloudflare

---

## 1. ESTRUCTURA ACTUAL DEL SITIO

```
depiflash.paragu-ai.com
├── /                          # Home (hero, beneficios, cómo funciona, precios, galería, testimonios, FAQ, CTA)
├── /servicios                 # Tabla de precios + preparación
├── /como-funciona             # 5 pasos del proceso
├── /faq                       # 8 preguntas frecuentes
├── /contacto                  # Messaging, email, cobertura
├── /privacidad                # Política de privacidad estática
├── /sitemap.xml               # Sitemap automático (Next.js)
├── /robots.txt                # Robots configurado
└── 404                        # Página no encontrada (personalizada)
```

### Mapa de componentes:
```
app/
├── layout.tsx          # Metadatos, fonts, GA4, JSON-LD schema
├── globals.css         # Variables CSS (coral/teal theme)
├── page.tsx            # Home (1 sección = 1 archivo, 'use client')
├── servicios/page.tsx
├── como-funciona/page.tsx
├── faq/page.tsx
├── contacto/page.tsx
├── privacidad/page.tsx
├── not-found.tsx
├── sitemap.ts
├── robots.ts

components/
├── header.tsx          # Nav fijo con gradient logo DF + Messaging button
├── footer.tsx          # 3 columnas: logo, enlaces, contacto
├── messaging-float.tsx   # Botón flotante verde (fijo)
├── mobile-cta.tsx       # Barra inferior en mobile
├── cta-banner.tsx       # Sección coral→teal gradient con CTA
├── process-section.tsx  # Paso a paso reutilizable
├── cookie-consent.tsx   # Banner de cookies (34 líneas, inline styles)

content/
├── es.json             # TODO el contenido (precios, FAQ, textos)

types/
├── content.ts           # Tipos TypeScript para content
```

---

## 2. DIAGNÓSTICO POR PÁGINA

### / (HOME) — ✅ Funciona pero tiene oportunidades

| Aspecto | Estado | Problema / Oportunidad |
|---------|--------|------------------------|
| Hero | ✅ | Buen titular, CTA claro, gradiente atractivo |
| Chip decorativo | ✅ | "Depilación láser IPL a domicilio" arriba del H1 |
| Benefits (4 cards) | ✅ | Íconos, textos claros |
| How it works (4 pasos) | ✅ | Numeración, gradiente en step 2 |
| Pricing | ✅ | 9 zonas con precios y paquetes |
| Gallery | ⚠️ | **Solo emojis + placeholder.** "Próximamente: fotos reales". Es la debilidad visual más grande. |
| Testimonials | ✅ | 3 testimonios con rating |
| FAQ (7 items) | ✅ | Acordeón funcional |
| CTA final | ✅ | Gradiente coral→teal, botón blanco |
| Messaging float | ✅ | Verde, fijo |
| Footer | ✅ | 3 columnas, links, contacto |

**Problemas:**
- Sin imágenes reales (antes/después, de la máquina, de Dan)
- Sin video
- Sin contador de clientas/sesiones (prueba social)
- Sin enlaces a Instagram real
- Los testimonios son genéricos (sin foto de perfil)

### /servicios — ⚠️ Problemas

| Aspecto | Estado | Problema |
|---------|--------|----------|
| Título | ✅ | "Servicios y precios" |
| Tabla precios | ✅ | 9 zonas con precio y paquete |
| Paquetes con descuento | ✅ | Bloque informativo |
| Preparación | ✅ | Checklist claro |
| **Sin sección de Programa de Reafirmación** | ❌ | **No hay mención del servicio trans. Hay que agregarla.** |
| Sin descripción de cada zona | ❌ | Solo lista de nombres, sin detalle de qué incluye cada zona |

### /como-funciona — ✅ Bien

| Aspecto | Estado | Nota |
|---------|--------|------|
| 5 pasos con íconos | ✅ | Claros, buen formato |
| Card de preparación importante | ✅ | Resaltada en coral |

**Oportunidad:** Agregar un paso 0: "Consultame por Messaging" al principio

### /faq — ⚠️ Contenido duplicado

| Aspecto | Estado | Problema |
|---------|--------|----------|
| FAQ funcionando | ✅ | Acordeón |
| **Contenido duplicado** | ❌ | es.json tiene `home.faq.items` (para home) Y `faq.items` (para la página). Son casi iguales pero no idénticos. Si actualizás uno, el otro queda desactualizado. |
| **Sin pregunta sobre descuento trans** | ❌ | Habría que agregar "¿Ofrecen descuentos especiales?" |

### /contacto — ✅ Bien, falta un detalle

| Aspecto | Estado | Problema |
|---------|--------|----------|
| Messaging | ✅ | Número + botón |
| Email | ✅ | info@depiflash.com.py |
| Cobertura | ✅ | Asunción + Gran Asunción |
| **Falta mapita** | ⚠️ | Sería bueno un mapa visual de la zona de cobertura |
| **Sin Instagram** | ❌ | No hay enlace a redes sociales |

### /privacidad — ✅ Básica pero ok

Estática, texto simple. Podría tener fecha de actualización más visible.

### 404 — ✅ Simple y funcional

Botón "Volver al inicio". Sin diseño especial ni enlaces útiles.

---

## 3. CONTENIDO DE ES.JSON — AUDITORÍA

### Problemas encontrados

| Línea | Problema | Severidad |
|-------|----------|-----------|
| Messaging | `"messaging": "+595****2025"` tiene **** (placeholder). `messagingLink` tiene el número real. | ⚠️ Medio |
| Gallery | `"placeholder": true` — no hay fotos reales | 🔴 Alto |
| Precios | No hay precio para barba/hombre ni servicio trans | 🔴 Alto |
| FAQ home | 7 preguntas | ✅ |
| FAQ página | 8 preguntas (casi iguales, una más) | ⚠️ Duplicación |
| Sin sección "reafirmacion" | No existe en el JSON | ❌ Falta |
| Sin sección "testimonials" con fotos | Solo texto, sin avatares ni imágenes | ⚠️ |
| Sin información de Dan/Daya | No hay "sobre mí" ni foto del dueño | ⚠️ |

### Lo que falta agregar a es.json:

```json
"reafirmacion": {
  "title": "Programa de Reafirmación",
  "description": "Consultá por nuestro programa de reafirmación de género. Depilación facial con precios especiales y ambiente de respeto.",
  "discount": "20",
  "messagingMessage": "Hola! Quiero info sobre el programa de reafirmación"
}
```

---

## 4. DISEÑO Y UX

### Puntos fuertes
| Aspecto | Notas |
|---------|-------|
| Paleta coral + teal | Atractiva, moderna, femenina |
| Playfair + Inter | Buena jerarquía tipográfica |
| Gradientes | Bien usados (hero, CTA, step 2) |
| Botones | Clara distinción primario/secundario |
| Responsive | Mobile-first |
| Nav sticky | Siempe visible |
| Messaging float | Accesible siempre |

### Puntos débiles
| Aspecto | Problema |
|---------|----------|
| **Sin fotos reales** | El sitio se ve genérico sin imágenes reales de Dan, la máquina, o resultados |
| **Sin video** | Un video de 30s de Dan explicando el servicio sería lo más efectivo |
| **Sin icono de Instagram** | No hay enlace a red social |
| **Demo visual de la máquina** | La gente quiere ver cómo es el equipo |
| **Sin foto de perfil de quien atiende** | Un servicio a domicilio necesita cara. La confianza se construye con rostro. |
| **Sin prueba social numérica** | "X clientas satisfechas" o "Y sesiones realizadas" |
| **Sin mapa de cobertura** | Visualizar las zonas ayudaría |
| **Sin blog / contenido** | Para SEO a largo plazo |

---

## 5. TÉCNICO / SEO

### ✅ Lo que está bien

| Item | Detalle |
|------|---------|
| Sitemap.xml | Generado automáticamente, 6 URLs |
| Robots.txt | Configurado, apunta a sitemap |
| JSON-LD Schema | Service schema en layout.tsx |
| GA4 | Instalado (G-X2XQZR3J6K) |
| Open Graph | Configurado (title, description, url, locale es_PY) |
| Canonical | Configurado |
| Cache headers | Configurado para assets estáticos |
| MetadataBase | Configurado |
| Sin errores JS en consola | ✅ |
| Sin dependencias | Solo Next.js, React, Tailwind, Lucide — minimalista y rápido |

### ❌ Lo que falta

| Item | Problema | Impacto |
|------|----------|---------|
| **Favicon/icon** | No hay favicon en /public. El head no tiene link rel="icon". Solo apple-touch-icon. | 🔴 Alto — el sitio aparece sin icono en pestañas |
| **Meta keywords** | Faltan keywords locales relevantes | 🟡 Medio |
| **Alt text en imágenes** | No hay imágenes todavía | 🟡 Medio (cuando se agreguen) |
| **Hreflang** | Solo español, pero no está declarado | 🟡 Bajo |
| **Page speed** | No testeado con Lighthouse, pero parece rápido (h3, 49KB, 640ms) | 🟢 Bueno probablemente |
| **Og:image** | No hay imagen para compartir en redes sociales | 🟡 Medio |
| **Imagen de la máquina** | Ayudaría en SEO local "IPL a domicilio Asunción" | 🟡 Medio |

---

## 6. MEJORAS PRIORIZADAS

### 🔴 PRIORIDAD CRÍTICA (hacer esta semana)

| # | Mejora | Esfuerzo | Impacto |
|---|--------|----------|---------|
| 1 | **Agregar favicon** (PNG/ICO en /public + link en layout) | 5 min | 🔴 Alto |
| 2 | **Corregir messaging placeholder** ("****" en es.json) | 1 min | 🔴 Alto |
| 3 | **Agregar sección "Programa de Reafirmación"** en /servicios y es.json | 30 min | 🔴 Alto |
| 4 | **Agregar pregunta en FAQ** sobre descuentos especiales | 10 min | 🔴 Alto |
| 5 | **Agregar link a Instagram** en contacto y footer | 15 min | 🔴 Alto |
| 6 | **Poner foto de Dan/Daya** en el home (about me básico) | 20 min | 🔴 Alto |

### 🟡 PRIORIDAD MEDIA (hacer este mes)

| # | Mejora | Esfuerzo | Impacto |
|---|--------|----------|---------|
| 7 | **Sacar fotos reales antes/después** (con permiso) y subir | 1-2 semanas | 🟡 Alto |
| 8 | **Foto real de la máquina JD TM016** en /servicios | 15 min | 🟡 Medio |
| 9 | **Agregar og:image** para compartir en redes | 15 min | 🟡 Medio |
| 10 | **Unificar FAQ** (eliminar duplicación entre home.faq y faq.items) | 20 min | 🟡 Medio |
| 11 | **Agregar Instagram en footer** | 5 min | 🟡 Medio |
| 12 | **Agregar contador de clientas/sesiones** en home (prueba social) | 30 min | 🟡 Medio |
| 13 | **Agregar sección "Sobre Dan"** con foto y breve bio | 30 min | 🟡 Medio |
| 14 | **Agregar texto alternativo** a todas las imágenes futuras | — | 🟡 Medio |

### 🟢 PRIORIDAD BAJA (mejorar cuando haya tiempo)

| # | Mejora | Esfuerzo |
|---|--------|----------|
| 15 | **Video de 30s** de Dan explicando el servicio | 1 hora |
| 16 | **Mapa de cobertura** (SVG de Asunción + Gran Asunción) | 1-2 horas |
| 17 | **Página /blog** con tips de depilación (SEO a largo plazo) | 2-3 horas |
| 18 | **Sistema de reseñas** integrado | 2 horas |
| 19 | **Esquema de colores modo oscuro** | 1 hora |
| 20 | **Testimonios con fotos** de perfil (con permiso) | — |
| 21 | **Animaciones sutiles** en scroll (fade-in) | 1 hora |
| 22 | **Agregar Messaging Business API** para chatbot básico | 3-4 horas |

---

## 7. OPORTUNIDADES DE CONTENIDO NUEVO

### Páginas nuevas que agregarían valor

| Página | Contenido | Prioridad |
|--------|-----------|-----------|
| **/blog/guia-depilacion-ipl** | Guía completa: qué es IPL, cómo prepararse, mitos | 🟡 SEO |
| **/blog/precios-depilacion-asuncion** | Comparativa de precios (para SEO "precios depilación Asunción") | 🟡 SEO |
| **/about** | "Sobre Dan / Daya" — foto, historia, por qué hace esto | 🟡 Confianza |
| **/galeria** | Galería de resultados reales | 🟡 Prueba social |
| **/testimonios** | Página dedicada a reseñas | 🟢 |

### Actualizaciones a contenido existente

| Página | Cambio |
|--------|--------|
| Home | Agregar sección "Sobre Dan" debajo de "Por qué DepiFlash" |
| Home | Reemplazar galería de emoji con fotos reales |
| Servicios | Agregar precios de barba + programa de reafirmación |
| Servicios | Agregar foto real de la máquina |
| FAQ | Unificar las dos FAQs + agregar pregunta trans |
| Contacto | Agregar Instagram + mapa de cobertura |
| Footer | Agregar Instagram |

---

## 8. PLAN DE TRABAJO RECOMENDADO

### Fase 1: Hoy (30 min)
- [ ] 1. Agregar favicon (icono 32x32 PNG)
- [ ] 2. Corregir messaging "****" en es.json
- [ ] 3. Agregar sección "Programa de Reafirmación" en servicios
- [ ] 4. Agregar FAQ sobre descuentos
- [ ] 5. Agregar link a Instagram
- [ ] 6. Commit + deploy

### Fase 2: Esta semana (2-3 horas)
- [ ] 7. Agregar foto de Dan en home + servicios
- [ ] 8. Agregar foto real de la máquina
- [ ] 9. Configurar og:image para redes sociales
- [ ] 10. Unificar las dos FAQs en es.json
- [ ] 11. Agregar Instagram en footer y contacto

### Fase 3: Este mes (4-6 horas)
- [ ] 12. Conseguir y subir primeras fotos reales antes/después
- [ ] 13. Agregar sección "Sobre Dan" con bio
- [ ] 14. Grabar y subir video de 30s
- [ ] 15. Crear página /guia-depilacion-ipl (SEO)
- [ ] 16. Agregar contador de clientas/sesiones

---

## 9. CAMBIOS ESPECÍFICOS EN CÓDIGO YA IDENTIFICADOS

### 1. Agregar favicon
**Archivos:** layout.tsx + public/

En el `<head>` de layout.tsx:
```tsx
<link rel="icon" href="/favicon.ico" sizes="any" />
<link rel="icon" href="/icon.svg" type="image/svg+xml" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
```

### 2. Messaging placeholder
**Archivo:** content/es.json, línea 5
```json
"messaging": "+595974202025"
```

### 3. Sección "Programa de Reafirmación"
**Archivo:** content/es.json — agregar:
```json
"reafirmacion": {
  "title": "Programa de Reafirmación",
  "description": "Consultá por nuestro programa de reafirmación de género — depilación facial con precios especiales.",
  "ctaLabel": "Consultar por Messaging",
  "ctaHref": "tel:+595974202025?text=Hola!%20Quiero%20info%20sobre%20el%20programa%20de%20reafirmación"
}
```

**Archivo:** app/servicios/page.tsx — agregar sección entre pricing y preparación.

### 4. FAQ
**Archivo:** content/es.json — agregar item en ambos arrays:
```json
{ "question": "¿Ofrecen descuentos especiales?", "answer": "Sí, tenemos un programa de reafirmación de género con precios especiales para depilación facial. Escribinos por Messaging y te contamos sin compromiso." }
```

### 5. Instagram
**Archivo:** content/es.json — agregar:
```json
"instagram": "https://instagram.com/depiflash.py"
```

**Archivo:** components/footer.tsx — agregar link a Instagram en columna Contacto.

### 6. Foto de Dan
**Archivo:** public/images/ — agregar foto
**Archivo:** app/page.tsx — agregar sección "Conocé a Dan" entre beneficios y cómo funciona

---

## 10. RESUMEN DEL DIAGNÓSTICO

| Categoría | Nota | Explicación |
|-----------|------|-------------|
| **Funcionalidad** | 8/10 | Todo funciona, nada roto |
| **Diseño** | 7/10 | Lindo pero sin fotos ni rostro humano |
| **Contenido** | 5/10 | Sin fotos reales, sin mención del servicio trans, placeholder en Messaging |
| **SEO** | 6/10 | Sitemap bien, falta favicon, og:image, contenido SEO (blog) |
| **Performance** | 9/10 | Rápido, h3, 49KB, sin JS pesado |
| **Accesibilidad** | 6/10 | Sin alt text, sin contraste auditivo |
| **UX Móvil** | 8/10 | Mobile-first, Messaging sticky, CTA inferior |
| **Prueba Social** | 3/10 | Sin fotos, sin contadores, testimonios genéricos |
| **Completitud negocio** | 5/10 | Falta toda la línea de servicio afirmativo en el sitio |

**Prioridad #1:** Subir la nota de Contenido y Prueba Social de 5 y 3 a 8 y 8 — eso implica: fotos reales, sección de reafirmación, FAQ actualizada, favicon, Instagram, foto de Dan.
