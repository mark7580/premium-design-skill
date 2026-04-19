# Premium Design Skill — Kinetic Luxe

A Claude Code skill + component library for building **premium, editorial-grade web interfaces** — for high-end brands, luxury products, design-forward SaaS, and creative portfolios.

Think: editorial magazine meets motion design. Serif display typography, intentional motion, restrained palettes, asymmetric composition. Not tech-SaaS sleek — editorial-luxe.

## What's inside

**13 genuinely original components**, all built from scratch around a cohesive design language:

| Section | Component |
|---|---|
| Navigation | Editorial Masthead (desktop hover + full-screen mobile overlay) |
| Hero | Kinetic Mask Hero (scroll-driven, no product mockup) |
| Features | Editorial Index (numbered rows + spotlight) |
| Stats | Editorial Numbers (serif counter animations) |
| Logos / Clients | Editorial Client Ledger (typographic, no logo images) |
| Gallery / Work | Editorial Work Index (asymmetric spans) |
| About | Editorial Story / Manifesto (drop-cap + pull quote) |
| Testimonials | Editorial Pull Quote (single large quote + navigator) |
| Pricing | Editorial Asymmetric (5-col, featured + stacked) |
| FAQ | Editorial Remarks (italic questions, expandable) |
| CTA | Moment CTA (full-viewport, giant `&` decorative) |
| Contact | Editorial Correspondence (underline form) |
| Footer | Editorial Manifesto Footer |

Plus design foundation docs:
- `design-tokens.md` — colors, typography scale, spacing
- `motion-principles.md` — easing library, duration scale, reveal patterns

## Install

Clone into your Claude Code skills directory:

```bash
git clone https://github.com/luukalleman/premium-design-skill.git ~/.claude/skills/premium-design-skill
```

Then symlink the skill into place:

```bash
ln -s ~/.claude/skills/premium-design-skill/skills/premium-design ~/.claude/skills/premium-design
```

Restart Claude Code. The skill triggers on: *"premium design"*, *"editorial"*, *"luxe"*, *"high end"*, *"atelier"*, *"make it premium"*, *"creative agency site"*, *"portfolio site"*.

## Use the components directly (without the skill)

Every component is standalone TSX. Copy what you need from `skills/premium-design/references/catalog/components/`:

```bash
cp skills/premium-design/references/catalog/components/hero-variant-1.tsx src/components/
```

Dependencies per component:
- `framer-motion` (all components)
- `react` (all)
- Tailwind CSS with the design tokens (see `skills/premium-design/references/design-tokens.md`)
- Fonts: **Fraunces** (display) + **Inter** (body) — load via Google Fonts

## Design language: Kinetic Luxe

**Five rules** (from `SKILL.md`):

1. **Typography is the protagonist** — Fraunces for display at huge `clamp()` sizes, Inter for body, strict tracking and leading.
2. **Motion is intentional** — no bouncy springs. Long `easeOutExpo` (1.2–1.8s) reveals tied to scroll.
3. **Depth through layers** — noise texture + warm radial gradients + hairline borders. No `shadow-lg`.
4. **Restraint in color** — warm off-white (`#F7F5F1`) / warm black (`#1A1A1A`) / one accent (terracotta `#C8522C`).
5. **Composition breaks the grid** — asymmetric spans, scale contrast, intentional whitespace.

## License

MIT — use this freely in commercial work, modify it, ship it. Attribution appreciated but not required.

## Contributing

This is a deliberately opinionated library. New variants welcome if they stay in the Kinetic Luxe design language. Generic SaaS-style variants should go in a different library.
