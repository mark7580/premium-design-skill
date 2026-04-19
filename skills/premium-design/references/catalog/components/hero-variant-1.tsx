// ============================================
// Component: Kinetic Mask Hero
// Best for: High-end brand launches, creative agencies, editorial product reveals
// Key features: Line-by-line mask reveal on display headline, scroll-driven parallax
//   on background decorative character, subtle accent gradient wash, animated underline
//   on text CTA, noise texture overlay. No product mockup — pure editorial composition.
// Dependencies: framer-motion
// Fonts required: Fraunces (display), Inter (body) — load via <link> in index.html
// ============================================

"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion, useInView } from "framer-motion";

const easing = {
  outExpo: [0.16, 1, 0.3, 1] as const,
  outQuint: [0.22, 1, 0.36, 1] as const,
};

export function KineticMaskHero() {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Decorative character drifts up and fades as you scroll
  const decoY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const decoOpacity = useTransform(scrollYProgress, [0, 0.6], [0.06, 0]);

  // Headline fades + lifts slightly as you scroll past
  const headlineY = useTransform(scrollYProgress, [0, 0.5], ["0%", "-8%"]);
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-[#F7F5F1] text-[#1A1A1A]"
    >
      {/* Noise texture overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.035] mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Warm accent gradient — top-left glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 15% 25%, rgba(200, 82, 44, 0.08) 0%, transparent 55%)",
        }}
      />

      {/* Huge faded display character — decorative */}
      <motion.div
        aria-hidden
        style={{ y: prefersReduced ? "0%" : decoY, opacity: prefersReduced ? 0.06 : decoOpacity }}
        className="pointer-events-none absolute right-[-4%] top-[10%] z-0 select-none"
      >
        <span
          className="font-display block text-[#1A1A1A]"
          style={{
            fontSize: "clamp(22rem, 42vw, 54rem)",
            fontWeight: 300,
            lineHeight: 1,
            letterSpacing: "-0.05em",
            fontStyle: "italic",
          }}
        >
          ·01
        </span>
      </motion.div>

      {/* Content grid */}
      <motion.div
        style={{ y: prefersReduced ? "0%" : headlineY, opacity: prefersReduced ? 1 : headlineOpacity }}
        className="relative z-10 mx-auto flex min-h-screen max-w-[90rem] flex-col justify-between px-6 pb-16 pt-32 md:px-12 md:pb-24 md:pt-40 lg:px-20"
      >
        {/* Top row: Kicker label */}
        <MaskReveal delay={0}>
          <div className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.25em] text-[#5C5550]">
            <span className="h-px w-8 bg-[#1A1A1A]/30" />
            <span>Collection · Autumn/Winter</span>
          </div>
        </MaskReveal>

        {/* Middle: Display headline */}
        <div className="mt-auto max-w-[60rem]">
          <h1
            className="font-display text-[#1A1A1A]"
            style={{
              fontSize: "clamp(3.5rem, 10vw, 10rem)",
              lineHeight: 0.92,
              letterSpacing: "-0.03em",
              fontWeight: 300,
            }}
          >
            <MaskReveal delay={0.2}>
              <span className="block">Objects of</span>
            </MaskReveal>
            <MaskReveal delay={0.35}>
              <span className="block italic" style={{ fontWeight: 400 }}>
                quiet intention.
              </span>
            </MaskReveal>
          </h1>

          <MaskReveal delay={0.55}>
            <p className="mt-8 max-w-xl text-base font-light leading-[1.5] text-[#5C5550] md:text-lg">
              A studio practice in slow design. Each piece made to outlast the
              category it belongs to — considered, then considered again.
            </p>
          </MaskReveal>
        </div>

        {/* Bottom row: CTAs + meta */}
        <div className="mt-16 flex flex-col items-start justify-between gap-8 md:mt-24 md:flex-row md:items-end">
          <MaskReveal delay={0.75}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
              <a
                href="#collection"
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-none border border-[#1A1A1A] bg-[#1A1A1A] px-8 py-4 text-sm font-medium tracking-wide text-[#F7F5F1] transition-colors duration-500"
              >
                <span className="relative z-10 flex items-center gap-3">
                  View the collection
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
                </span>
              </a>

              <a
                href="#story"
                className="group relative inline-block text-sm font-medium tracking-wide text-[#1A1A1A]"
              >
                <span>Read the story</span>
                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-100 bg-[#1A1A1A] transition-transform duration-500 group-hover:scale-x-0 group-hover:origin-right" />
                <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-[#C8522C] transition-transform duration-500 delay-[250ms] group-hover:scale-x-100 group-hover:origin-left" />
              </a>
            </div>
          </MaskReveal>

          {/* Right-side meta block */}
          <MaskReveal delay={0.9}>
            <div className="flex items-start gap-8 text-[11px] font-medium uppercase tracking-[0.2em] text-[#5C5550]">
              <div className="flex flex-col gap-1">
                <span className="text-[#8A817A]">Since</span>
                <span className="font-display text-base font-light italic tracking-normal text-[#1A1A1A]">
                  mmxvii
                </span>
              </div>
              <div className="h-10 w-px bg-[#1A1A1A]/15" />
              <div className="flex flex-col gap-1">
                <span className="text-[#8A817A]">Workshop</span>
                <span className="font-display text-base font-light italic tracking-normal text-[#1A1A1A]">
                  amsterdam
                </span>
              </div>
            </div>
          </MaskReveal>
        </div>
      </motion.div>

      {/* Bottom hairline border */}
      <div className="absolute bottom-0 left-0 right-0 z-10 h-px bg-[#1A1A1A]/10" />
    </section>
  );
}

// ============================================
// MaskReveal — signature motion pattern
// Wraps children in an overflow-hidden container; content slides up from 110%.
// Use for headlines, paragraphs, UI chrome. Stagger via `delay` prop.
// ============================================
function MaskReveal({
  children,
  delay = 0,
  duration = 1.2,
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
}) {
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });

  if (prefersReduced) return <>{children}</>;

  return (
    <span className="block overflow-hidden">
      <motion.span
        className="block"
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ duration, delay, ease: easing.outExpo }}
      >
        {children}
      </motion.span>
    </span>
  );
}
