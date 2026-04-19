# Motion Principles — Kinetic Luxe

Premium motion is the opposite of "animations everywhere." It's deliberate, slow, and always tied to user action.

---

## The golden rules

1. **Never animate for decoration.** Every motion must amplify content or reveal structure.
2. **Scroll-driven > load-driven.** Tie motion to `useScroll`, `useInView`, or user interaction — not `whileInView={{opacity:1}}` on load.
3. **Longer than you think.** If your instinct is 400ms, try 1200ms. Premium feels unhurried.
4. **One signature motion per section.** A hero with one reveal beats a hero with five animations fighting for attention.
5. **Respect reduced motion.** Wrap motion in `useReducedMotion()` checks. Degrade to static states gracefully.

---

## Easing library

**Never use** default CSS `ease-out`, `ease-in-out`, or framer's `easeOut`. They read generic.

Use these instead:

```ts
// Define once in a shared file, import everywhere
export const easing = {
  // The workhorse — 95% of reveals should use this
  outExpo: [0.16, 1, 0.3, 1] as const,

  // Sharp, confident — for quick state changes, CTAs
  outQuint: [0.22, 1, 0.36, 1] as const,

  // Slow-start-fast-end — dramatic entrances
  outQuart: [0.25, 1, 0.5, 1] as const,

  // Gentle, weighted — for large element moves (hero images)
  outCirc: [0, 0.55, 0.45, 1] as const,

  // For exits — fast-fast-slow
  inOutExpo: [0.87, 0, 0.13, 1] as const,
};
```

Usage:

```tsx
<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 1.2, ease: easing.outExpo }}
  viewport={{ once: true, margin: "-10% 0px" }}
/>
```

---

## Duration scale

| Use case | Duration |
|---|---|
| Micro — hover color shift, underline | 200–300ms |
| Small — hover scale, icon rotation | 400–600ms |
| Standard — card reveal, text fade-in | 800–1200ms |
| Large — hero headline mask, big image reveal | 1200–1800ms |
| Signature — once-per-page showcase moment | 1800–2500ms |

**Default duration**: 1000ms. Scale up, not down.

---

## Stagger

For sequential reveals (a list, a grid), use stagger — but slower than you'd expect:

```tsx
<motion.div
  initial="hidden"
  whileInView="visible"
  variants={{
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } }
  }}
>
  {items.map(item => (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 32 },
        visible: { opacity: 1, y: 0, transition: { duration: 1, ease: easing.outExpo } }
      }}
    />
  ))}
</motion.div>
```

**Stagger guideline**: 120–180ms between items. Less than 100ms feels frantic. More than 250ms feels like the page is broken.

---

## Scroll-driven motion

The signature of premium sites is motion tied to scroll progress. Use `useScroll` + `useTransform`:

```tsx
const { scrollYProgress } = useScroll({
  target: containerRef,
  offset: ["start end", "end start"]
});

const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);    // parallax
const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);
```

**Every section should have at least one scroll-driven transform** unless the section is intentionally static (e.g., a CTA).

---

## Text reveal patterns

### Mask reveal (signature pattern)

Lines of text reveal from bottom, clipped by a mask. Looks expensive; easy to build.

```tsx
<span className="block overflow-hidden">
  <motion.span
    className="block"
    initial={{ y: "110%" }}
    whileInView={{ y: "0%" }}
    transition={{ duration: 1.4, ease: easing.outExpo }}
    viewport={{ once: true }}
  >
    Your headline here
  </motion.span>
</span>
```

For multi-line reveals, wrap each line in its own `overflow-hidden` container and stagger.

### Character-by-character reveal

For emphasis on ONE word or phrase. Don't overuse.

```tsx
{"Headline".split("").map((char, i) => (
  <motion.span
    key={i}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: i * 0.04, ease: easing.outExpo }}
    viewport={{ once: true }}
  >
    {char === " " ? "\u00A0" : char}
  </motion.span>
))}
```

---

## Hover interactions

Premium hover states are SUBTLE. No scale-up-110%. Instead:

- **Text links**: animate an underline (height: 0 → 1px), or color shift over 300ms
- **Cards**: shift 2–4px, not 10px. `y: -4`, not `y: -20`
- **Buttons**: slight background darken + arrow slide right 2px

```tsx
<motion.a
  className="relative inline-block"
  whileHover="hovered"
>
  Read more
  <motion.span
    className="absolute left-0 right-0 bottom-0 h-px bg-current origin-left"
    variants={{
      rest: { scaleX: 0 },
      hovered: { scaleX: 1 }
    }}
    transition={{ duration: 0.5, ease: easing.outExpo }}
  />
</motion.a>
```

---

## What premium motion is NOT

- ❌ Whileinview fade-ups on every element (generic)
- ❌ Bouncy springs on hero text (looks cheap)
- ❌ Multiple overlapping animations at once (chaotic)
- ❌ Default Framer presets (`spring`, `tween` with no easing override)
- ❌ Fast hover scale (`scale: 1.1` in 200ms)
- ❌ Rotating icons on scroll (dated)
- ❌ Every section having a different animation style (inconsistent)

---

## Reduced motion

Always respect user preference:

```tsx
import { useReducedMotion } from "framer-motion";

const prefersReduced = useReducedMotion();
const duration = prefersReduced ? 0 : 1.2;
```

Or disable entire scroll-driven effects when reduced motion is on.
