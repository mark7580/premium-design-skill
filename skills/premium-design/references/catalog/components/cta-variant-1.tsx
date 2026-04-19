// ============================================
// Component: Moment CTA
// Best for: Premium brand conversion moments, creative agencies closing the pitch,
//   luxury services asking for commitment. One full section, one message, one ask.
// Key features: Full-viewport dark warm background (#141210), massive oversized
//   display headline with line-by-line mask reveal, scroll-driven parallax on
//   decorative giant italic character clipped at bottom, primary button with
//   inverted hover, secondary text link with two-tone underline transition.
// Dependencies: framer-motion
// Fonts: Fraunces (display), Inter (body)
// ============================================

"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion, useInView } from "framer-motion";

const easing = {
  outExpo: [0.16, 1, 0.3, 1] as const,
};

export function MomentCTA() {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Decorative character drifts diagonally as user scrolls
  const decoY = useTransform(scrollYProgress, [0, 1], ["15%", "-15%"]);
  const decoX = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const decoOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0, 0.08, 0.08, 0]
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-[90vh] w-full overflow-hidden bg-[#141210] text-[#F7F5F1]"
    >
      {/* Noise overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Warm accent vignette — terracotta, top-left */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 20% 20%, rgba(200, 82, 44, 0.14) 0%, transparent 60%)",
        }}
      />

      {/* Cool vignette — deep warmth, bottom-right */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 85% 90%, rgba(217, 194, 164, 0.08) 0%, transparent 55%)",
        }}
      />

      {/* Oversized decorative italic character — clipped at bottom */}
      <motion.div
        aria-hidden
        style={{
          y: prefersReduced ? "15%" : decoY,
          x: prefersReduced ? "0%" : decoX,
          opacity: prefersReduced ? 0.08 : decoOpacity,
        }}
        className="pointer-events-none absolute -bottom-[20%] -right-[8%] z-0 select-none"
      >
        <span
          className="font-display block italic text-[#F7F5F1]"
          style={{
            fontSize: "clamp(30rem, 55vw, 70rem)",
            fontWeight: 300,
            lineHeight: 0.85,
            letterSpacing: "-0.06em",
          }}
        >
          &amp;
        </span>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[90vh] max-w-[90rem] flex-col justify-between px-6 py-24 md:px-12 md:py-32 lg:px-20">
        {/* Top: kicker */}
        <MaskReveal>
          <div className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.25em] text-[#C8522C]">
            <span className="h-px w-8 bg-[#C8522C]/70" />
            <span>One invitation · Spring intake</span>
          </div>
        </MaskReveal>

        {/* Middle: huge headline block */}
        <div className="my-auto max-w-[70rem] py-16 md:py-24">
          <h2
            className="font-display text-[#F7F5F1]"
            style={{
              fontSize: "clamp(3rem, 9vw, 9rem)",
              lineHeight: 0.92,
              letterSpacing: "-0.035em",
              fontWeight: 300,
            }}
          >
            <MaskReveal delay={0.15}>
              <span className="block">If the work we make</span>
            </MaskReveal>
            <MaskReveal delay={0.3}>
              <span className="block">should live a decade,</span>
            </MaskReveal>
            <MaskReveal delay={0.45}>
              <span className="block italic" style={{ fontWeight: 400 }}>
                we ought to begin.
              </span>
            </MaskReveal>
          </h2>

          <MaskReveal delay={0.7}>
            <p className="mt-10 max-w-md text-base font-light leading-[1.5] text-[#F7F5F1]/70 md:text-lg">
              We take three engagements per season. Conversations open the
              first Monday of each month.
            </p>
          </MaskReveal>
        </div>

        {/* Bottom: CTAs + signature */}
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <MaskReveal delay={0.9}>
            <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8">
              <a
                href="#begin"
                className="group relative inline-flex items-center gap-3 overflow-hidden border border-[#F7F5F1] bg-[#F7F5F1] px-10 py-5 text-sm font-medium tracking-wide text-[#141210] transition-colors duration-500 hover:bg-transparent hover:text-[#F7F5F1]"
              >
                <span>Begin the conversation</span>
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
                href="#brief"
                className="group relative inline-block text-sm font-medium tracking-wide text-[#F7F5F1]"
              >
                <span>Or send a written brief</span>
                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-100 bg-[#F7F5F1]/50 transition-transform duration-500 group-hover:origin-right group-hover:scale-x-0" />
                <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-[#C8522C] transition-transform duration-500 delay-[250ms] group-hover:origin-left group-hover:scale-x-100" />
              </a>
            </div>
          </MaskReveal>

          {/* Right: signature / availability */}
          <MaskReveal delay={1.05}>
            <div className="flex flex-col items-start gap-2 md:items-end">
              <span className="text-[11px] font-medium uppercase tracking-[0.25em] text-[#8A817A]">
                Availability · Spring 2026
              </span>
              <span
                className="font-display italic text-[#F7F5F1]"
                style={{ fontSize: "clamp(1rem, 1.5vw, 1.25rem)", fontWeight: 400 }}
              >
                two engagements remaining
              </span>
            </div>
          </MaskReveal>
        </div>
      </div>

      {/* Bottom hairline */}
      <div className="absolute bottom-0 left-0 right-0 z-10 h-px bg-[#F7F5F1]/10" />
    </section>
  );
}

// ============================================
// MaskReveal helper
// ============================================
function MaskReveal({
  children,
  delay = 0,
  duration = 1.3,
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const prefersReduced = useReducedMotion();
  if (prefersReduced) return <>{children}</>;

  return (
    <span ref={ref} className="block overflow-hidden">
      <motion.span
        className="block"
        initial={{ y: "110%" }}
        animate={inView ? { y: "0%" } : { y: "110%" }}
        transition={{ duration, delay, ease: easing.outExpo }}
      >
        {children}
      </motion.span>
    </span>
  );
}
