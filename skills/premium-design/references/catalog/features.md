# Features — Premium Catalog

Feature sections that feel like a curated index, not a tech-SaaS feature grid.

---

## Variant 1: Editorial Index Features

**Best for:** Premium services, creative studios, luxury products, any brand wanting features to feel like a magazine TOC or a carefully-numbered process — not generic "Why choose us" cards.

**Aesthetic:** Vertical list of numbered rows with hairline dividers. Magazine contents-page feel. One row is "spotlight" with inverted dark treatment — intentionally breaks the pattern for visual rhythm.

**Key features:**
- **Asymmetric section header** — kicker + description on left 4 cols, heading on right 8 cols. Heading uses two-line mask reveal (non-italic first line, italic accent second line).
- **Vertical index rows** — 12-col grid per row: number (col 1) + title (col 5) + description (col 5) + caption (col 1). Hairline top border on first row, hairline bottom on each.
- **Row hover** — background gradient wash fades in from left (`from-[#EEEAE2] via-transparent`), number shifts 8px right, caption opacity jumps from 0.4 to 1. All 600ms easeOutExpo.
- **Row reveal on scroll** — opacity + y:40 → 0, 1.1s duration, 60ms stagger per index (not random — tied to i).
- **Spotlight row** — completely different treatment: dark `#141210` background, terracotta radial accent top-right, huge number (up to 8rem) paired with italic caption, title with two-line split (comma separates straight + italic), two-paragraph description, uppercase micro-CTA with animated hairline.
- **Numbers use serif display** — Fraunces 300 weight, 2–3rem standard rows, 4–8rem spotlight
- **No icons.** No skeletons. No illustrations. The typography IS the illustration.

**Data shape:**
```ts
type Feature = {
  id: string;
  number: string;      // "01", "02"
  title: string;       // "Research as practice"
  description: string;
  caption: string;     // "Weeks 1–6"
  spotlight?: boolean; // One feature gets elevated treatment
};
```

**Composition rules:**
- Section padding: `py-24 md:py-40`
- Max width: `90rem`
- Pick ONE feature (usually the 2nd) as `spotlight: true` for visual rhythm
- 3–6 features total works best. Fewer = looks sparse. More = loses weight.

**What makes this NOT a generic features section:**
- Vertical rows (not 3-col grid)
- Numbers as the visual hook (not icons)
- Hairline dividers (not card borders/shadows)
- Spotlight row with completely different treatment (not "featured" badge)
- Captions in italic serif (not metadata text)
- No "learn more →" per row (there's a single global CTA implied by the overall page flow)

See: `components/features-variant-1.tsx`

---

## Selection Guide

| Variant | Use when |
|---|---|
| Editorial Index | Process, method, capabilities — any time you want a curated list feel instead of a grid |
