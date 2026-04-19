# Design Tokens — Kinetic Luxe

Copy these tokens into your `tailwind.config.ts` and `index.css` for any project using this skill.

---

## Typography

### Font families

Load these fonts. Recommended pairings:

**Pairing A — Editorial Magazine** (default for this library)
```html
<!-- index.html -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

```css
/* index.css */
@layer base {
  :root {
    --font-display: 'Fraunces', 'Georgia', serif;
    --font-body: 'Inter', system-ui, sans-serif;
  }
  body { font-family: var(--font-body); }
  .font-display { font-family: var(--font-display); font-optical-sizing: auto; }
}
```

**Pairing B — Luxury Contemporary**
```
Display: Canela (paid) or fallback: EB Garamond
Body: Geist (free) or fallback: Inter
```

**Pairing C — Sharp Editorial**
```
Display: Migra (paid) or fallback: Playfair Display
Body: Manrope (free)
```

### Type scale

Use fluid typography with `clamp()` for display, fixed scale for body:

| Token | Value | Usage |
|---|---|---|
| `text-display-xl` | `clamp(3.5rem, 10vw, 10rem)` | Hero headlines |
| `text-display-lg` | `clamp(2.5rem, 7vw, 6rem)` | Section headlines |
| `text-display-md` | `clamp(2rem, 5vw, 4rem)` | Subsection headlines |
| `text-display-sm` | `clamp(1.5rem, 3.5vw, 2.5rem)` | Card headlines |
| `text-body-lg` | `1.125rem` (18px) | Lead paragraphs |
| `text-body` | `1rem` (16px) | Standard body |
| `text-body-sm` | `0.875rem` (14px) | Captions, labels |
| `text-micro` | `0.75rem` (12px) | Uppercase labels |

### Type treatment rules

- **Display**: `tracking-tight` or `tracking-[-0.02em]`, `leading-[0.95]`, `font-light` (300) or `font-normal` (400) for serif; `font-medium` (500) for sans display
- **Body**: `tracking-normal`, `leading-[1.5]`, `font-normal` (400)
- **Labels**: `uppercase tracking-[0.2em] text-micro font-medium` — use sparingly for kickers, section markers
- **Never use**: `font-bold` (700+) on display serif — looks heavy and generic. Let the scale do the work.

---

## Color palette

### Warm Editorial (default — magazine/luxury feel)

```css
@layer base {
  :root {
    /* Backgrounds */
    --color-bg-primary: #F7F5F1;     /* warm off-white */
    --color-bg-secondary: #EEEAE2;   /* subtle warm tint */
    --color-bg-dark: #0A0908;        /* warm black */
    --color-bg-dark-2: #141210;      /* slightly lighter warm black */

    /* Text */
    --color-text-primary: #1A1A1A;   /* on light */
    --color-text-secondary: #5C5550; /* muted warm gray */
    --color-text-inverse: #F7F5F1;   /* on dark */
    --color-text-muted-dark: #8A817A;/* on dark, muted */

    /* Accent (pick ONE for the project) */
    --color-accent: #C8522C;         /* terracotta */
    /* alternatives: */
    /* --color-accent: #4C3F2F;      espresso brown */
    /* --color-accent: #B8A978;      brass */
    /* --color-accent: #D9C2A4;      champagne */

    /* Borders — barely visible */
    --color-border-light: rgba(26, 26, 26, 0.08);
    --color-border-dark: rgba(247, 245, 241, 0.1);
  }
}
```

### Cool Editorial (alternative — architectural/minimal feel)

```css
--color-bg-primary: #F4F4F2;
--color-bg-dark: #0F1117;
--color-accent: #3B5998;  /* deep blue */
/* or */
--color-accent: #4A5D4A;  /* moss */
```

### Rules

- **NEVER use**: pure `#000` or `#FFF`. Always use `#0A0908`/`#F7F5F1` (or the cool variants).
- **NEVER use**: Tailwind's default `blue-500`, `purple-600`, etc. for accents — they read SaaS-generic.
- **ONE accent per project**. If you find yourself wanting a second, you need more neutrals instead.

---

## Spacing

### Section rhythm

Premium sites use generous section padding. Tailwind defaults are too tight.

| Token | Value | Usage |
|---|---|---|
| `section-sm` | `py-16 md:py-24` | Minor sections |
| `section` | `py-24 md:py-40` | Standard sections |
| `section-lg` | `py-32 md:py-56` | Hero, major feature moments |

### Container widths

- **Narrow prose**: `max-w-2xl` (42rem) — for text-heavy sections
- **Standard content**: `max-w-6xl` (72rem) — default
- **Wide editorial**: `max-w-[90rem]` — for full-bleed layouts with gutters
- **Full-bleed**: no max-width, content uses its own internal grid

### Horizontal padding

Use `px-6 md:px-12 lg:px-20` as the default — more generous than typical `px-4 md:px-8`.

---

## Depth & surfaces

### Noise texture

Premium surfaces often have subtle grain. Add via CSS:

```css
.surface-noise::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url('/noise.svg');  /* or inline data URI */
  opacity: 0.04;
  pointer-events: none;
  mix-blend-mode: overlay;
}
```

Or generate with SVG `<filter id="noise"><feTurbulence baseFrequency="0.9"/></filter>`.

### Gradients

Premium gradients are SUBTLE:
```css
/* Warm glow — use in hero corners, behind display type */
background: radial-gradient(ellipse at 30% 20%,
  rgba(200, 82, 44, 0.08) 0%,
  transparent 60%);

/* Soft wash — section background variation */
background: linear-gradient(180deg,
  var(--color-bg-primary) 0%,
  var(--color-bg-secondary) 100%);
```

### Borders over shadows

Prefer `border-b border-border-light` for section separation over shadows. If shadow is needed:

```css
/* Subtle lifted surface */
box-shadow: 0 1px 0 rgba(255,255,255,0.04) inset,
            0 20px 40px -20px rgba(0,0,0,0.15);
```

NEVER use Tailwind's default `shadow-lg`/`shadow-xl` — they're generic.
