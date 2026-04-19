# Navigation — Premium Catalog

Editorial navigation systems for premium brand sites.

---

## Variant 1: Editorial Masthead

**Best for:** Premium brands, creative studios, luxury products, editorial publications, any site where a generic pill-nav would cheapen the feel.

**Aesthetic:** Top-aligned horizontal masthead. Serif italic wordmark left, uppercase micro-label links center, minimal CTA right. No pill backgrounds, no rounded corners, no shadows.

**Key features:**
- **Wordmark** — serif italic display at 20-24px, paired with a tiny uppercase meta ("Studio · EST. MMXVII") separated by a hairline divider
- **Nav links** — 11px Inter medium, uppercase, `tracking-[0.25em]`, warm black. Two-tone animated underline on hover: subtle gray underline slides out right-to-left, terracotta accent slides in left-to-right with 250ms stagger.
- **Right CTA** — text-only with animated line-progress indicator (hairline turns terracotta on hover)
- **Scroll-aware hairline** — bottom hairline separator fades in after `scrollY > 40`. Paired with `bg-[#F7F5F1]/85 backdrop-blur-md` backdrop for floating-over-content feel.
- **Mobile: full-screen overlay** (NOT dropdown). Hamburger morphs into X. Links are huge display-serif italic (`clamp(3rem, 14vw, 6rem)`) stacked vertically, masked-reveal from bottom with 80ms stagger. Bottom row with city meta + email.

**Motion:**
- All transitions 400–500ms `easeOutExpo`
- Mobile link reveal: 900ms per link, 80ms stagger
- Hamburger rotation: 400ms

**What makes this NOT look like a generic navbar:**
- Serif italic wordmark (not bold sans-serif)
- Uppercase micro-labels (not sentence-case)
- Two-tone underline transition on hover (not a background pill)
- No logo image — wordmark text only
- Full-screen mobile overlay with DISPLAY-SCALE links (not tiny menu items)
- Scroll-aware transparency (not sticky solid white)

See: `components/navigation-variant-1.tsx`

---

## Selection Guide

| Variant | Use when |
|---|---|
| Editorial Masthead | Premium brand, creative studio, luxury product, editorial site |
