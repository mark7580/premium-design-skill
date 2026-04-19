# Pricing Sections — Premium Catalog

Editorial pricing layouts for premium services and positioning-as-luxury SaaS.

**Adaptation notes:**
- `framer-motion` → `motion/react` if using Motion One
- Remove `"use client"` for Vite
- Load Fraunces + Inter via `<link>`

---

## Variant 1: Editorial Asymmetric Pricing

**Best for:** Premium creative services, boutique studios, design-forward SaaS positioning as a craft practice, high-end B2B agencies.

**Aesthetic:** Warm editorial. Featured plan is a dark (#141210) card with terracotta radial gradient — intentionally breaks the 3-column pattern by spanning 3 of 5 columns. Secondary plans stacked compactly on the right, in the neutral palette.

**Key features:**
- **Asymmetric 5-column grid** — featured plan spans 3 cols, two compact plans stack in remaining 2 cols. Explicitly breaks standard 3-equal-column pattern.
- **Minimal underline billing toggle** — NO pill background. Active option shown via animated underline using `layoutId` for smooth slide between options; inactive option at 45% opacity. Small "−20%" badge on annual.
- **Price transition animation** — when billing toggles, prices animate with blur + opacity + y-offset using `AnimatePresence mode="wait"`. Duration 700ms on featured, 500ms on compact. Feels tactile, not frantic.
- **Mask-line reveal** on heading — two-line serif display heading reveals line-by-line as user scrolls to section (`whileInView`).
- **Warm accent gradient** on featured card — radial in top-left corner (18% terracotta).
- **Dashed gradient divider** on featured card — `bg-gradient-to-r from-white/20 via-white/10 to-transparent`, fades out to the right (editorial touch).
- **Feature list markers** — tiny horizontal hairlines instead of checkmarks. Terracotta accent on featured card, neutral on compact.
- **CTA hover** on featured: background inverts (light to transparent), text color flips. On compact: animated underline on CTA text + arrow slides right.
- **Footer row** — 14-day conversation note + "Something else in mind?" link with two-tone underline transition (same pattern as hero CTA).

**Composition rules:**
- Section padding: `py-24 md:py-40` (generous)
- Max width: `90rem`
- Generous horizontal padding: `px-6 md:px-12 lg:px-20`
- Featured card padding: `p-8 md:p-12 lg:p-16` — significantly more than compact
- No shadows. Depth via 1px borders (`border-[#1A1A1A]/10`) + gradient overlays

**Typography:**
- Display price: Fraunces 300 weight, `clamp(5rem, 10vw, 9rem)` on featured
- Plan name: uppercase tracking-wide 11px micro label with hairline prefix
- Tagline: Fraunces italic, serif display at 20–24px
- Features: Inter 300 weight, 14px, 1.4 line-height

**What makes this NOT look like a generic SaaS pricing:**
- 3 plans but NOT 3 equal columns
- Serif display prices (not sans-serif)
- Italic taglines (editorial)
- Hairline feature markers (not checkmarks)
- Dark featured card with warm gradient (not "Most Popular" purple ribbon)
- Underline toggle (not pill with shadow)
- No "save X%" green text — badge is terracotta, refined

**When to customize:**
- Plan IDs, names, prices, features, CTAs obviously
- If you have 2 plans: featured + 1 compact below it (5 → 4 col grid, 1 compact card)
- If you have 4 plans: featured (3 col) + 3 compact stacked (2 col)
- Accent color swap: change `#C8522C` and `rgba(200, 82, 44, ...)` to your brand accent — see `design-tokens.md`

See: `components/pricing-variant-1.tsx`

---

## Selection Guide

| Variant | Use when |
|---|---|
| Editorial Asymmetric | 2–4 plans, premium positioning, want to avoid generic 3-column SaaS pricing |
