# DepiFlash — Análisis Completo de Videos para Ads en Instagram

## Brand Kit (DESIGN.md)

| Atributo | Valor |
|----------|-------|
| **Colores** | `#E8A0BF` (coral/rosa primario), `#C4A4D4` (lavanda acento), `#FFF0F5` (fondo suave), `#1A1A2E` (texto oscuro), `#FFFFFF` (fondo) |
| **Headings** | Playfair Display (serif, elegante) |
| **Body** | Inter (sans-serif, moderno) |
| **Voz** | Cálida, profesional, en español paraguayo (vos) |
| **CTA principal** | Messaging — `wa.me/595974202025` |

---

## 1. Filosofía: Animaciones PURAS para Instagram Ads

Sin voz, sin TTS, sin ElevenLabs. Solo animaciones de texto + formas + íconos. Esto funciona mejor para ads en Instagram porque:

1. **Silencio = la gente no necesita auriculares** — la mayoría scrollea sin sonido
2. **Menos ancho de banda** — render más rápido, subida más rápida
3. **Sin dependencia de voz** — actualizar el texto es editar HTML, no regrabar audio
4. **Formato IG Ads nativo** — los ads de Meta funcionan mejor sin audio (autoplay mute)

Cada video = composición HyperFrames 9:16, 15-30s, HTML puro con GSAP.

---

## 2. Catálogo de Videos para DepiFlash

Priorizados por impacto en conversión:

### LOTE 1 — Día 1 (ALTA prioridad)

| # | Video | Duración | Concepto | Escenas | Timing optimizado |
|---|-------|----------|----------|---------|-------------------|
| 1 | **Hook: Sin Dolor** | 9s | Texto grande: "¿Duele?" aparece → se tacha → "No." + "Sensación de calor nomás 😊" | 3 | Loop-ready |
| 2 | **Precio Relámpago: Axilas** | 6s | "Axilas: Gs. 70.000" animado con descuento | 1 | Loop-ready |
| 3 | **Urgencia: 2 Horarios** | 5s | "HOY: 2 horarios libres ⚡ Primer mensaje, primer turno" | 1 | Loop-ready |
| 4 | **Domicilio** | 8s | "Sin moverte de tu casa 🏠" con mapa animado + "Asunción y Gran Asunción" | 2 | Loop-ready |

### LOTE 2 — Semana 1 (MEDIA prioridad)

| # | Video | Duración | Concepto | Escenas |
|---|-------|----------|----------|---------|
| 5 | **Precios Rápidos** | 12s | 3 cards animadas: Axilas Gs.70K / Bikini Gs.80K / Piernas Gs.180K → fade a "Consultame por Messaging" | 2 |
| 6 | **Resultados: 3 sesiones** | 9s | "En 3 sesiones ya notás la diferencia" con testimonio de Laura | 2 |
| 7 | **Vs Cera** | 10s | "Cera: duele, cada mes" → "IPL: sin dolor, permanente" split screen animado | 2 |
| 8 | **Duración: 15 min** | 7s | "Labio superior: 10 min. Axilas: 15 min. En tu hora de almuerzo 💨" | 1 |

### LOTE 3 — Semana 2 (BAJA prioridad)

| # | Video | Duración | Concepto | Escenas |
|---|-------|----------|----------|---------|
| 9 | **Estudiantes** | 8s | "🎓 15% OFF con carnet" + "Para estudiantes de la UNA, UniNorte, Americana" | 2 |
| 10 | **Programa Reafirmación** | 10s | Bandera trans animada + "Depilación facial 20% OFF 🏳️‍⚧️ Primera sesión gratis" | 2 |
| 11 | **Contraindicaciones** | 12s | 3 cards: "No si estás embarazada" / "No si tomás sol" / "Consultame" | 3 |
| 12 | **Regalo** | 7s | "🎁 Regalá sesiones de IPL. Gift cards disponibles." con animación de regalo | 1 |

---

## 3. Estructura Técnica de Cada Video

Cada composición HyperFrames sigue esta plantilla:

### Config global
- **Formato:** 9:16 vertical (1080×1920)
- **FPS:** 30
- **Sin audio**
- **Loop:** sí (el último frame se queda 2s estático antes de loop)

### Por escena
```
scene-1 (0s-3s)
  data-composition: "depiflash-ad"
  data-track: 1
  data-start: 0
  data-duration: 3

scene-2 (3s-6s)
  data-composition: "depiflash-ad"
  data-track: 2
  data-start: 3
  data-duration: 3
```

### Elementos por escena
- **Fondo:** gradiente suave primario → acento (#E8A0BF → #C4A4D4)
- **Headings:** Playfair Display, blanco, tamaño 48-72px, tracking +2
- **Body:** Inter, blanco/oscuro según fondo, 24-36px
- **CTA final:** botón estilizado "Escribime al Messaging 📲" con bounce
- **Logo DepiFlash:** esquina superior (texto "DepiFlash" en Playfair con rayo ⚡)

### Animaciones GSAP por elemento
| Elemento | Entrada | Salida | Ease |
|----------|---------|--------|------|
| Heading | scale(0.9→1) + fade | fade + y(-20) | power2.out |
| Body | fade + y(20→0) | fade | power1.out |
| Card | stagger(0.1) + scaleY | fade + scaleX(0) | back.out(1.7) |
| CTA botón | scale(0→1) + bounce | — | bounce.out |
| Decoración | scale(0→1) + rotate | — | elastic.out(1, 0.3) |

### Transiciones entre escenas
- Flash-through-white (0.3s)
- O push slide horizontal (0.4s)
- Nada más complejo — son ads cortos, la transición es parte del contenido

---

## 4. Técnicas Específicas para Ads en IG

### 4.1. Hook visual en los primeros 2 segundos
Los primeros 2s deciden si el usuario sigue viendo. Técnicas:

| Técnica | Cómo | Ejemplo DepiFlash |
|---------|------|-------------------|
| **"The Interrupt"** | Texto grande que ocupa toda la pantalla | "¿DUELE?" en 120px blanco sobre fondo negro, aparece de golpe |
| **"The Tease"** | Pregunta abierta con elipsis | "Pagás Gs. 300.000 por depilarte la cara... ¿cada mes?" |
| **"The Countdown"** | Números grandes animados | "10 min 🕐" girando y explotando |
| **"The Split"** | Mitad rojo/mitad verde | "Cera ❌ vs IPL ✅" |

### 4.2. Patrón de ad de 4 fases
Todo ad de IG sigue: **Hook → Problema → Solución → CTA**

```
FASE 1: HOOK (0s-2s)
  "¿Cansada de..."
  Animación: text explode desde centro

FASE 2: PROBLEMA (2s-5s)
  "...depilarte cada semana?"
  Animación: cards con signos de pregunta rotando

FASE 3: SOLUCIÓN (5s-8s)
  "DepiFlash: IPL a domicilio. Resultados desde la primera sesión."
  Animación: checkmarks apareciendo con stagger

FASE 4: CTA (8s-10s)
  "📲 Escribime ahora"
  Animación: botón pulsando + flecha hacia abajo
```

### 4.3. Pattern Interrupt
Cada 3-4 segundos cambiar algo drásticamente (color, tamaño, posición) para que el ojo no se acostumbre:

```
0s: Fondo negro, texto blanco grande
3s: Flash a blanco, texto coral
6s: Split screen, mitad coral mitad lavanda
9s: Full screen lavanda, texto + botón
```

### 4.4. Smart Safe Zones para IG
```
┌──────────────────────┐
│  TOP SAFE (15%)      │ ───— títulos y branding
│  ┌────────────────┐  │
│  │                │  │
│  │  CONTENT ZONE  │  │ ───— texto principal
│  │  (70%)         │  │
│  │                │  │
│  └────────────────┘  │
│  BOTTOM SAFE (15%)   │ ───— logo + CTA siempre visible
│                       │
│  ════════════════════ │ ───— IG caption + button overlay
└──────────────────────┘
```

El bottom 15% queda cubierto por el caption/button de Instagram. **NUNCA poner texto clave ahí.**

---

## 5. Priorización Final para Producción

### Día 1 (arrancar YA)
1. **Hook: Sin Dolor** (9s) — el que más clics va a generar
2. **Urgencia: 2 Horarios** (5s) — para usar en Messaging Status + IG Story
3. **Domicilio** (8s) — diferencial principal del negocio

### Día 2
4. **Precio Relámpago: Axilas** (6s) — el servicio más popular
5. **Precios Rápidos** (12s) — carrusel de precios, alto engagement

### Día 3
6. **Resultados** (9s) — prueba social
7. **Vs Cera** (10s) — desbanque de competencia indirecta

### Días 4-7
8-12: El resto según rendimiento de los primeros

---

## 6. Post-producción (después del render)

Después de renderizar con HyperFrames, para IG necesitamos:

### 6.1. Sin audio — OK así
Los videos se suben mudos. Instagram no penaliza los videos sin audio.

### 6.2. Subtítulos opcionales
Si Dan quiere subtítulos (para accesibilidad), se generan con:
```bash
ffmpeg -i video.mp4 -vf "subtitles=captions.srt:force_style='FontName=Inter,FontSize=16,PrimaryColour=&H00FFFFFF,BackColour=&H80000000,BorderStyle=1,Alignment=2'" -c:a copy final.mp4
```

Pero para IG Ads la recomendación es NO subtítulos — el texto animado es el contenido visual.

### 6.3. Formato de subida
- MP4 H.264, 1080×1920
- Bitrate: 5-8 Mbps (IG comprime a ~3.5 Mbps)
- Duración: 5-15s ideal para IG Stories/Reels

---

## 7. Referencia de estilos visuales para IG

Los ads de DepiFlash deben verse **cálidos, femeninos (target principal), modernos**:

```
PALETA PARA VIDEOS
─────────────────────
Fondo 1: Gradiente #E8A0BF → #C4A4D4 (coral → lavanda)
Fondo 2: #FFF0F5 sólido (fondo suave para texto oscuro)
Fondo 3: #1A1A2E sólido (oscuro para texto blanco — hook fuerte)

TEXTOS
─────────────────────
Heading grande: Playfair Display, bold, blanco, 72px
Heading medio: Playfair Display, regular, #1A1A2E sobre fondo claro
Body: Inter, medium, 28px
Precios: Inter, bold, 48px (que se vea el número grande)

DECORACIONES
─────────────────────
▸ Círculos decorativos semi-transparentes (#C4A4D4 al 20%)
▸ Líneas finas horizontales animadas
▸ ⚡ rayo como icono recurrente
▸ Borde redondeado en cards (border-radius: 24px)
▸ Sutil sombra: 0 4px 20px rgba(0,0,0,0.08)
```

---

## 8. Próximos Pasos

1. ✅ Análisis completo completado
2. ⬜ Arrancar primera composición: **Hook: Sin Dolor** (es la más simple y la de mayor impacto)
3. ⬜ Crear DESIGN.md del proyecto de videos
4. ⬜ Scaffold con `npx hyperframes init depiflash-ads`
5. ⬜ Escribir composición HTML, lint, render
6. ⬜ Subir a IG y medir métricas

---

*Documento: depiflash-ads-video-analysis.md*
*Generado con Hermes + HyperFrames*
*v1.0 — 2026-05-21*
