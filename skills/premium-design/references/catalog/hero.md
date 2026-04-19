# Hero Sections — Premium Catalog

Editorial, motion-driven hero sections for premium brand sites.

**Vite/Next.js adaptation notes (apply to all):**
- Replace `framer-motion` → `motion/react` if using Motion One
- Remove `"use client"` for Vite projects
- Load display + body fonts via `<link>` in `index.html` — required for the premium feel
- Tailwind must include the warm palette (see `design-tokens.md`)

---

## Variant 1: Kinetic Mask Hero

**Best for:** High-end brand launches, creative agencies, editorial product reveals, luxury fashion/lifestyle brands, architecture firms.

**Aesthetic:** Warm editorial. Off-white background (#F7F5F1), warm black text (#1A1A1A), terracotta accent (#C8522C). Huge fluid serif display headline with italic accent word. No product mockup — pure composition and typography.

**Key features:**
- **Line-by-line mask reveal** on headline using `MaskReveal` helper component — each line slides up from 110% behind an `overflow-hidden` container
- **Scroll-driven parallax** on decorative background character (`·01`) — drifts up and fades as you scroll down
- **Scroll-driven opacity** on headline — fades + lifts slightly as you scroll past
- **Warm accent gradient** — radial gradient in top-left corner, very subtle (8% opacity terracotta)
- **Noise texture overlay** — SVG feTurbulence data URI, 3.5% opacity, multiply blend
- **Animated underline** on secondary CTA — underline slides out right-to-left, then accent underline slides in left-to-right (staggered 250ms)
- **Editorial meta block** — bottom-right corner with "Since" + "Workshop" in small caps + display italic year
- **Reduced motion support** via `useReducedMotion`

**Motion timing:**
- Mask reveals: 1.2s duration, `cubic-bezier(0.16, 1, 0.3, 1)` (outExpo)
- Staggered delays: 0, 0.2, 0.35, 0.55, 0.75, 0.9s
- Hover states: 500ms

**Composition:**
- Full viewport height (`min-h-screen`)
- Three-row vertical layout: kicker label (top), headline block (middle-bottom), CTAs + meta (bottom)
- Max content width: `90rem` with generous horizontal padding (`px-6 md:px-12 lg:px-20`)
- Bottom hairline border separator

**Fonts required:**
- Display: Fraunces (300–400 weight, optical-size: auto, supports italic)
- Body: Inter (300–600 weight)

Load via Google Fonts:
```html
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

**When to customize:**
- Swap `·01` for a brand initial, collection number, or iconic mark
- Change "Collection · Autumn/Winter" kicker to match your content type
- Replace terracotta `#C8522C` with your brand accent (see `design-tokens.md` for alternatives)
- The italic word in headline is the emotional anchor — pick it carefully

See: `components/hero-variant-1.tsx`

---

## Selection Guide

| Variant | Use when |
|---|---|
| Kinetic Mask Hero | Content-first brand moment, editorial aesthetic, no product screenshot needed |
