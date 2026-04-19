// ============================================
// Component: Editorial Manifesto Footer
// Best for: Premium brands, creative studios — a substantial footer that feels
//   like a final spread in a magazine rather than a generic sitemap band.
// Key features: Dark warm background (#141210), massive serif italic wordmark/
//   manifesto at top with scroll mask reveal, asymmetric 12-column sitemap with
//   italic serif category headings + uppercase micro-label links, inline newsletter
//   form with minimalist underline-style input, bottom row with refined legal +
//   availability detail in small caps, decorative hairline grid.
// Dependencies: framer-motion
// Fonts: Fraunces (display), Inter (body)
// ============================================

"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";

const easing = {
  outExpo: [0.16, 1, 0.3, 1] as const,
};

type ColumnLink = { label: string; href: string };
type Column = { heading: string; links: ColumnLink[] };

const COLUMNS: Column[] = [
  {
    heading: "the practice",
    links: [
      { label: "About the studio", href: "#about" },
      { label: "The method", href: "#method" },
      { label: "Selected work", href: "#work" },
      { label: "Journal", href: "#journal" },
    ],
  },
  {
    heading: "engagements",
    links: [
      { label: "Identity", href: "#identity" },
      { label: "Interiors", href: "#interiors" },
      { label: "Typography", href: "#type" },
      { label: "Editorial", href: "#editorial" },
    ],
  },
  {
    heading: "elsewhere",
    links: [
      { label: "Instagram", href: "https://instagram.com" },
      { label: "Are.na", href: "https://are.na" },
      { label: "LinkedIn", href: "https://linkedin.com" },
      { label: "RSS", href: "/rss" },
    ],
  },
];

export function EditorialFooter() {
  return (
    <footer className="relative overflow-hidden bg-[#141210] text-[#F7F5F1]">
      {/* Noise overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
      {/* Warm accent glow — bottom-left */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 20% 90%, rgba(200, 82, 44, 0.12) 0%, transparent 55%)",
        }}
      />

      <div className="relative mx-auto max-w-[90rem] px-6 md:px-12 lg:px-20">
        {/* Top: wordmark manifesto */}
        <div className="border-b border-[#F7F5F1]/10 py-20 md:py-28">
          <MaskReveal>
            <div className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.25em] text-[#C8522C]">
              <span className="h-px w-8 bg-[#C8522C]/60" />
              <span>Maison · Studio practice · Since MMXVII</span>
            </div>
          </MaskReveal>

          <h3
            className="mt-10 max-w-6xl font-display text-[#F7F5F1]"
            style={{
              fontSize: "clamp(2.5rem, 8vw, 8rem)",
              lineHeight: 0.92,
              letterSpacing: "-0.035em",
              fontWeight: 300,
            }}
          >
            <MaskReveal delay={0.1}>
              <span className="block">A small studio of few</span>
            </MaskReveal>
            <MaskReveal delay={0.22}>
              <span className="block italic" style={{ fontWeight: 400 }}>
                engagements. Chosen slowly.
              </span>
            </MaskReveal>
          </h3>

          {/* Inline CTA pair */}
          <MaskReveal delay={0.4}>
            <div className="mt-12 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-8">
              <a
                href="#begin"
                className="group relative inline-flex items-center gap-3 border border-[#F7F5F1] bg-[#F7F5F1] px-8 py-4 text-sm font-medium tracking-wide text-[#141210] transition-colors duration-500 hover:bg-transparent hover:text-[#F7F5F1]"
              >
                <span>Begin a conversation</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  className="transition-transform duration-500 group-hover:translate-x-1"
                >
                  <path
                    d="M1 7h12M7 1l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="square"
                  />
                </svg>
              </a>
              <a
                href="mailto:hello@maison.studio"
                className="group relative inline-block text-sm font-medium tracking-wide text-[#F7F5F1]"
              >
                <span>hello@maison.studio</span>
                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-100 bg-[#F7F5F1]/50 transition-transform duration-500 group-hover:origin-right group-hover:scale-x-0" />
                <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-[#C8522C] transition-transform duration-500 delay-[250ms] group-hover:origin-left group-hover:scale-x-100" />
              </a>
            </div>
          </MaskReveal>
        </div>

        {/* Mid: sitemap + newsletter */}
        <div className="grid grid-cols-1 gap-12 border-b border-[#F7F5F1]/10 py-16 md:grid-cols-12 md:gap-8">
          {COLUMNS.map((column) => (
            <FooterColumn key={column.heading} column={column} />
          ))}

          {/* Newsletter — spans 3 cols */}
          <div className="md:col-span-3">
            <h4
              className="mb-6 font-display text-xl italic text-[#F7F5F1]/90"
              style={{ fontWeight: 400 }}
            >
              Quarterly dispatch
            </h4>
            <p className="mb-8 max-w-xs text-sm font-light leading-[1.5] text-[#F7F5F1]/60">
              Four letters a year on the slow work of the studio. No other sends.
            </p>
            <NewsletterInput />
          </div>
        </div>

        {/* Bottom: legal + availability */}
        <div className="flex flex-col items-start justify-between gap-8 py-10 md:flex-row md:items-center">
          <div className="flex flex-col gap-2">
            <span
              className="font-display italic text-[#F7F5F1]"
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 400,
                letterSpacing: "-0.02em",
                lineHeight: 1,
              }}
            >
              Maison.
            </span>
            <span className="text-[11px] font-medium uppercase tracking-[0.25em] text-[#8A817A]">
              Amsterdam · Paris · MMXVII – MMXXVI
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-[11px] font-medium uppercase tracking-[0.25em] text-[#8A817A]">
            <a href="#imprint" className="transition-colors duration-500 hover:text-[#F7F5F1]">
              Imprint
            </a>
            <span className="h-3 w-px bg-[#F7F5F1]/15" />
            <a href="#privacy" className="transition-colors duration-500 hover:text-[#F7F5F1]">
              Privacy
            </a>
            <span className="h-3 w-px bg-[#F7F5F1]/15" />
            <span>Availability · Spring 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ============================================
// FooterColumn — italic serif heading + uppercase micro links
// ============================================
function FooterColumn({ column }: { column: Column }) {
  return (
    <div className="md:col-span-3">
      <h4
        className="mb-6 font-display text-xl italic text-[#F7F5F1]/90"
        style={{ fontWeight: 400 }}
      >
        {column.heading}
      </h4>
      <ul className="flex flex-col gap-3">
        {column.links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="group relative inline-block text-[11px] font-medium uppercase tracking-[0.25em] text-[#F7F5F1]/70 transition-colors duration-500 hover:text-[#F7F5F1]"
            >
              <span className="relative">
                {link.label}
                <span className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-[#C8522C] transition-transform duration-500 group-hover:origin-left group-hover:scale-x-100" />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ============================================
// NewsletterInput — minimalist underline input
// ============================================
function NewsletterInput() {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        // handle submit
      }}
      className="group relative"
    >
      <div className="flex items-center gap-3">
        <input
          type="email"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Your email"
          className="flex-1 bg-transparent py-3 text-sm text-[#F7F5F1] placeholder-[#8A817A] outline-none"
        />
        <button
          type="submit"
          aria-label="Subscribe"
          className="group/btn flex h-8 w-8 shrink-0 items-center justify-center text-[#F7F5F1]"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            className="transition-transform duration-500 group-hover/btn:translate-x-1"
          >
            <path
              d="M1 7h12M7 1l6 6-6 6"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="square"
            />
          </svg>
        </button>
      </div>
      {/* Underline with focus animation */}
      <div className="relative mt-1 h-px w-full bg-[#F7F5F1]/20">
        <motion.div
          initial={false}
          animate={{ scaleX: focused ? 1 : 0 }}
          transition={{ duration: 0.6, ease: easing.outExpo }}
          className="absolute inset-0 origin-left bg-[#C8522C]"
        />
      </div>
    </form>
  );
}

// ============================================
// MaskReveal helper
// ============================================
function MaskReveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  if (prefersReduced) return <span className="block">{children}</span>;

  return (
    <span ref={ref} className="block overflow-hidden">
      <motion.span
        className="block"
        initial={{ y: "110%" }}
        animate={inView ? { y: "0%" } : { y: "110%" }}
        transition={{ duration: 1.2, delay, ease: easing.outExpo }}
      >
        {children}
      </motion.span>
    </span>
  );
}
