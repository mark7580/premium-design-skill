// ============================================
// Component: Editorial Pull Quote Testimonials
// Best for: Premium services, creative studios, luxury brands showcasing word-of-mouth
//   with gravitas rather than generic 3-column testimonial cards.
// Key features: Single large italic serif pull quote takes center stage, numbered
//   navigator on the right with animated progress bar, AnimatePresence mask-reveal
//   transition between quotes, author block in small caps + italic serif, scroll-
//   into-view reveal for the whole section.
// Dependencies: framer-motion
// Fonts: Fraunces (display), Inter (body)
// ============================================

"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useInView } from "framer-motion";

const easing = {
  outExpo: [0.16, 1, 0.3, 1] as const,
};

type Testimonial = {
  id: string;
  quote: string;
  author: string;
  role: string;
  org: string;
  location: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    id: "q1",
    quote:
      "They spent six weeks before proposing a single image. By the time the work arrived it had already earned its place.",
    author: "Eva Van Der Merwe",
    role: "Creative Director",
    org: "Holtz & Sons",
    location: "Antwerp",
  },
  {
    id: "q2",
    quote:
      "We have worked with studios that move faster. We have never worked with one that arrives at better answers.",
    author: "Tomás Ferreira",
    role: "Founder",
    org: "Ater Mobilier",
    location: "Porto",
  },
  {
    id: "q3",
    quote:
      "The second version was better than the first. The third was so obviously correct we forgot there had been a decision to make.",
    author: "Minako Aoki",
    role: "Head of Brand",
    org: "Hōseki Atelier",
    location: "Kyoto",
  },
  {
    id: "q4",
    quote:
      "A rare thing — a studio that understands restraint is not the absence of a point of view but the clearest possible expression of one.",
    author: "Oliver Lindqvist",
    role: "Editor",
    org: "The Quiet Review",
    location: "Stockholm",
  },
];

export function EditorialPullQuote() {
  const [active, setActive] = useState(0);
  const current = TESTIMONIALS[active];

  return (
    <section className="relative overflow-hidden bg-[#F7F5F1] py-24 text-[#1A1A1A] md:py-40">
      {/* Noise overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
      {/* Warm radial accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 70% at 80% 20%, rgba(200, 82, 44, 0.06) 0%, transparent 55%)",
        }}
      />

      <div className="relative mx-auto max-w-[90rem] px-6 md:px-12 lg:px-20">
        {/* Kicker */}
        <div className="mb-16 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.25em] text-[#5C5550] md:mb-24">
          <span className="h-px w-8 bg-[#1A1A1A]/30" />
          <span>In their words · Selected remarks</span>
        </div>

        <div className="grid grid-cols-1 gap-16 md:grid-cols-12 md:gap-12">
          {/* Quote column — 8 cols */}
          <div className="md:col-span-8">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={current.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: easing.outExpo }}
                className="relative"
              >
                {/* Opening mark */}
                <span
                  aria-hidden
                  className="absolute -left-2 -top-8 font-display text-[#C8522C]/40 md:-left-6 md:-top-12"
                  style={{
                    fontSize: "clamp(4rem, 8vw, 8rem)",
                    fontWeight: 300,
                    lineHeight: 0.8,
                    fontStyle: "italic",
                  }}
                >
                  &ldquo;
                </span>

                {/* Quote body — split into "lines" for mask reveal */}
                <p
                  className="font-display text-[#1A1A1A]"
                  style={{
                    fontSize: "clamp(1.75rem, 3.5vw, 3rem)",
                    lineHeight: 1.15,
                    letterSpacing: "-0.01em",
                    fontWeight: 300,
                    fontStyle: "italic",
                  }}
                >
                  <MaskReveal>{current.quote}</MaskReveal>
                </p>

                {/* Author block */}
                <div className="mt-12 flex items-start gap-4 md:mt-16">
                  <span className="mt-3 block h-px w-12 bg-[#1A1A1A]/40" />
                  <div className="flex flex-col gap-1">
                    <MaskReveal delay={0.15}>
                      <span className="text-[11px] font-medium uppercase tracking-[0.25em] text-[#1A1A1A]">
                        {current.author}
                      </span>
                    </MaskReveal>
                    <MaskReveal delay={0.22}>
                      <span className="font-display text-base italic text-[#5C5550] md:text-lg">
                        {current.role}, {current.org}
                      </span>
                    </MaskReveal>
                    <MaskReveal delay={0.29}>
                      <span className="text-[11px] font-medium uppercase tracking-[0.25em] text-[#8A817A]">
                        · {current.location}
                      </span>
                    </MaskReveal>
                  </div>
                </div>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          {/* Navigator column — 4 cols */}
          <div className="flex flex-col gap-2 md:col-span-4 md:mt-4">
            {TESTIMONIALS.map((t, i) => (
              <NavButton
                key={t.id}
                testimonial={t}
                index={i}
                active={i === active}
                onClick={() => setActive(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// NavButton — numbered row with progress bar indicator
// ============================================
function NavButton({
  testimonial,
  index,
  active,
  onClick,
}: {
  testimonial: Testimonial;
  index: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="group relative flex items-center gap-5 border-b border-[#1A1A1A]/10 py-5 text-left transition-colors duration-500 hover:border-[#1A1A1A]/25"
    >
      {/* Number */}
      <span
        className="font-display transition-colors duration-500"
        style={{
          fontSize: "1.25rem",
          fontWeight: 300,
          letterSpacing: "-0.02em",
          color: active ? "#C8522C" : "rgba(26,26,26,0.5)",
          fontStyle: active ? "italic" : "normal",
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Meta */}
      <div className="flex flex-1 flex-col gap-0.5">
        <span
          className="text-[11px] font-medium uppercase tracking-[0.25em] transition-colors duration-500"
          style={{ color: active ? "#1A1A1A" : "#8A817A" }}
        >
          {testimonial.author}
        </span>
        <span
          className="font-display text-sm italic transition-colors duration-500"
          style={{ color: active ? "#5C5550" : "#A39C96" }}
        >
          {testimonial.org}
        </span>
      </div>

      {/* Progress indicator on active */}
      <span className="relative block h-px w-12 shrink-0 overflow-hidden bg-[#1A1A1A]/15">
        <motion.span
          initial={false}
          animate={{ scaleX: active ? 1 : 0 }}
          transition={{ duration: 0.6, ease: easing.outExpo }}
          className="absolute inset-y-0 left-0 block h-full w-full origin-left bg-[#C8522C]"
        />
      </span>
    </button>
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
    <span className="block overflow-hidden">
      <motion.span
        className="block"
        initial={{ y: "105%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1.1, delay, ease: easing.outExpo }}
      >
        {children}
      </motion.span>
    </span>
  );
}
