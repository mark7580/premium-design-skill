# FAQ / Remarks — Premium Catalog

---

## Variant 1: Editorial FAQ / Remarks

**Best for:** Premium services answering thoughtful questions. Reads like an interview, not a help-center accordion.

**Key features:**
- **Asymmetric header** — kicker label left 5 cols, 2-line display heading right 7 cols
- **Large italic serif questions** (up to 2.5rem) — not the usual sans-serif card title
- **Numbered prefix** — italic "01", "02" in muted color next to each question
- **Custom plus/minus marker** — two crossing hairlines, rotates 45° on open (not a chevron)
- **Expand animation** — smooth height 0→auto (800ms easeOutExpo) + content opacity fade (500ms with 200ms delay)
- **Answer indented** — md:col-start-2 to md:col-span-8 for clear hierarchy
- **Staggered paragraph reveal** inside answer — 80ms between paragraphs
- **First entry pre-expanded** by default (for context)
- **Footnote CTA** — "Write to us directly" with two-tone underline pattern

**Data shape:** `{ id, question, answer: string[] }` — answers support multiple paragraphs

See: `components/faq-variant-1.tsx`
