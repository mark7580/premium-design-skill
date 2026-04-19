# CTA Sections — Premium Catalog

Call-to-action sections designed as a single "moment" rather than a generic band.

---

## Variant 1: Moment CTA

**Best for:** The closing conversion moment on a premium landing page. Creative agencies asking for the pitch. Luxury services asking for commitment. Anywhere the message is: "if this is for you, you already know."

**Aesthetic:** Full-viewport dark section (`#141210`). Oversized multi-line serif display headline takes centre stage. A huge decorative italic `&` character drifts at the bottom-right, clipped by the viewport. Warm terracotta + champagne accent gradients in opposite corners. One primary ask, one alternative path.

**Key features:**
- **Full-viewport height** — `min-h-[90vh]`. This is a destination, not a stripe.
- **Three-line display headline** — each line mask-reveals on scroll with 150ms stagger. Last line is italic (`"we ought to begin."`). Scale: `clamp(3rem, 9vw, 9rem)`.
- **Giant decorative character** — ampersand (`&`), italic, 30–70rem, positioned `-bottom-[20%] -right-[8%]` so it's clipped. Scroll-driven parallax: diagonal drift + opacity curve that fades in-out (0 → 0.08 → 0.08 → 0).
- **Two accent gradients** — terracotta top-left, warm champagne bottom-right. Neither is loud; both under 15% opacity.
- **Noise overlay** — 5% opacity on overlay blend mode (slightly more visible than on light backgrounds, because dark surfaces read flat without texture).
- **Primary CTA** — solid off-white button, large (`px-10 py-5`), hover inverts to outline-only with terracotta arrow. Arrow slides right on hover.
- **Secondary CTA** — text link with the same two-tone underline pattern used throughout the catalog (gray underline exits right, terracotta enters left, 250ms stagger).
- **Bottom-right signature** — uppercase availability line ("Availability · Spring 2026") + italic serif status ("two engagements remaining"). Gives the page a hand-crafted, almost-sold-out feel.

**Motion:**
- Mask reveals: 1.3s (slightly longer than hero — this moment should feel slow)
- Button/link hovers: 500ms
- Scroll parallax: continuous, driven by `useScroll` on section container

**What makes this different from a generic CTA band:**
- Full viewport, not a stripe — this is the page's destination
- Multi-line headline with italic emphasis — not "Ready to get started?"
- Giant decorative character — visual weight without product imagery
- Two-step ask: primary action + alternative path (not duplicated "Get Started" buttons)
- Availability/signature detail — makes the offer feel human-scaled, not mass-market

**When to customize:**
- Swap `&` for your brand initial, a `·`, or a numeral (an edition number, a year)
- Three-line headline is the architecture — keep it three lines, italicize the last one
- "two engagements remaining" can be replaced with any scarcity-authentic detail (a release batch, a cohort size, a working month)

See: `components/cta-variant-1.tsx`

---

## Selection Guide

| Variant | Use when |
|---|---|
| Moment CTA | Closing CTA on a premium landing page where the ask carries weight |
