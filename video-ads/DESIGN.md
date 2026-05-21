# DepiFlash Ads — Design System

## Style Prompt
Warm, modern, feminine (women 25-45 target), professional. Clean typography-driven motion graphics. Think Glossier meets a premium spa — soft, pink, elegant, but with energy (⚡).

## Colors
| Role | Hex | Usage |
|------|-----|-------|
| Primary | `#E8A0BF` | Headings, backgrounds, accent elements |
| Accent | `#C4A4D4` | Secondary backgrounds, decorative shapes |
| Surface | `#FFF0F5` | Light card backgrounds |
| Dark | `#1A1A2E` | Body text on light backgrounds, hook frames |
| White | `#FFFFFF` | Text on dark/primary backgrounds |
| Success | `#4CAF50` | Checkmarks, "sí" indicators |

## Typography
| Font | Weight | Usage | Size range |
|------|--------|-------|------------|
| Playfair Display | 700 (Bold) | Headings, hooks | 48-96px |
| Playfair Display | 400 (Regular) | Subheadings | 32-48px |
| Inter | 500 (Medium) | Body, prices | 20-36px |
| Inter | 700 (Bold) | Prices, CTAs | 24-48px |

## Motion Character
- Smooth, fluid, confident
- Entrances: fade + slight scale or y-slide
- Exits: fade out, sometimes scale-down
- Stagger: 0.08-0.12s between elements in group
- Ease: `power2.out` for entrances, `power1.in` for exits
- CTA button: elastic/bounce entrance on final scene
- Transitions between scenes: flash-through-white 0.3s

## What NOT to Do
- No aggressive jerk motions
- No more than 4 text elements visible at once
- Never put key text in bottom 15% (IG button overlay zone)
- No autoplay audio (all ads are silent animations)
- No gradients with more than 2 stops
- No thin/light font weights (unreadable on mobile)
