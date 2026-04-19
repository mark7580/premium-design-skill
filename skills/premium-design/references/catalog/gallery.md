# Gallery / Work Index — Premium Catalog

---

## Variant 1: Editorial Work Index

**Best for:** Portfolio sites, studio showcases, photography/architecture practices — any site where the work is the hero.

**Key features:**
- **Asymmetric 12-col grid** with varied spans: featured (8×2, aspect-4/3), wide (8×1, aspect-16/9), tall (4×1, aspect-3/4), square (4×1, aspect-square)
- **Colored placeholders** (no images needed for development) — swap `placeholderColor` for an `<img>` tag in production
- **Number marker overlay** — top-left with italic serif number + discipline micro-label in `mix-blend-difference` (adapts to image)
- **Hover interactions** — image scales to 1.02 (subtle), title shifts 4px right, featured items reveal centered italic caption
- **Scroll stagger** — 80ms delay between items (modulo 3, so each row reveals together)
- **Caption below image** — name + client (uppercase micro) + year (italic serif right-aligned)

**Data shape:** `{ id, title, client, year, discipline, caption, span: "featured" | "wide" | "tall" | "square", placeholderColor }`

**Curation rule:** Mix spans to create rhythm. A typical 5-piece grid: 1 featured + 1 tall + 2 square + 1 wide. Never all-equal.

See: `components/gallery-variant-1.tsx`
