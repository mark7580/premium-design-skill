# Stats / Numbers — Premium Catalog

---

## Variant 1: Editorial Numbers

**Best for:** Premium studios showing scale/tenure, luxury brands conveying provenance, quiet scale with gravitas.

**Key features:**
- **4 cells in asymmetric 12-col grid** — spans: 4/3/3/2 (not equal)
- **Hairline divider grid** — outer border + divides between cells (no shadows)
- **Scroll-triggered counter animation** — uses custom easeOutExpo curve, 1800ms duration, counts from 0 → target
- **tabular-nums** so digits don't jump widths during animation
- **Italic serif suffix** (e.g., "k" for 14k) — different weight/style from the number
- **Italic caption below** with em-dash prefix ("— each one chosen, not accepted")
- **Respects `prefers-reduced-motion`** — shows final value immediately

**Data shape:** `{ label, value: number, prefix?, suffix?, caption }`

See: `components/stats-variant-1.tsx`
