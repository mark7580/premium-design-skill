// ============================================
// Component: Editorial Story / Manifesto
// Best for: Studio about page, founder letter, brand manifesto, atelier origin story.
//   Magazine-spread aesthetic — not a "Meet the team" grid.
// Key features: Two-column prose layout with editorial spacing, massive drop-cap
//   first letter, pulled-out italic quote mid-body, signed-off author block with
//   italic serif signature, decorative hairline + number chapter markers, scroll-
//   triggered mask reveal on paragraphs with stagger.
// Dependencies: framer-motion
// Fonts: Fraunces (display), Inter (body)
// ============================================

"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";

const easing = {
  outExpo: [0.16, 1, 0.3, 1] as const,
};

export function EditorialStory() {
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

      <div className="relative mx-auto max-w-[80rem] px-6 md:px-12 lg:px-20">
        {/* Chapter marker */}
        <div className="mb-16 flex items-baseline justify-between border-b border-[#1A1A1A]/15 pb-6 md:mb-24">
          <div className="flex items-center gap-4 text-[11px] font-medium uppercase tracking-[0.25em] text-[#5C5550]">
            <span
              className="font-display text-4xl text-[#1A1A1A]"
              style={{ fontWeight: 300, fontStyle: "italic", lineHeight: 1 }}
            >
              i.
            </span>
            <span>Chapter one · Origin</span>
          </div>
          <span className="hidden text-[11px] font-medium uppercase tracking-[0.25em] text-[#8A817A] sm:block">
            Maison · A letter from the studio
          </span>
        </div>

        {/* Title spread */}
        <div className="mb-20 grid grid-cols-1 gap-12 md:mb-32 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-7">
            <h2
              className="font-display text-[#1A1A1A]"
              style={{
                fontSize: "clamp(2.75rem, 7vw, 6.5rem)",
                lineHeight: 0.93,
                letterSpacing: "-0.03em",
                fontWeight: 300,
              }}
            >
              <MaskLine>A studio is,</MaskLine>
              <MaskLine delay={0.15}>
                <span className="italic" style={{ fontWeight: 400 }}>
                  before anything,
                </span>
              </MaskLine>
              <MaskLine delay={0.3}>a discipline.</MaskLine>
            </h2>
          </div>

          <div className="md:col-span-5 md:pt-10">
            <MaskLine delay={0.5}>
              <p className="max-w-md text-base font-light leading-[1.5] text-[#5C5550] md:text-lg">
                Maison began in a back room in Amsterdam, in a winter so long
                we forgot to track the year. The discipline — the one thing we
                still argue about, nine years later — is what we agreed upon
                in those months.
              </p>
            </MaskLine>
          </div>
        </div>

        {/* Two-column body with drop cap */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-12">
          {/* Left column with drop cap */}
          <div className="md:col-span-6">
            <RevealParagraph delay={0}>
              <p className="text-base font-light leading-[1.65] text-[#1A1A1A] md:text-lg">
                <span
                  className="float-left mr-3 mt-2 font-display text-[#1A1A1A]"
                  style={{
                    fontSize: "clamp(4.5rem, 8vw, 7rem)",
                    fontWeight: 300,
                    fontStyle: "italic",
                    lineHeight: 0.8,
                    letterSpacing: "-0.04em",
                  }}
                >
                  W
                </span>
                hat we decided, in that first winter, is that no work would
                leave the room unless we could explain, in a single sentence,
                why it existed. Not why it was interesting. Not why it was
                well-made. Why it existed at all.
              </p>
            </RevealParagraph>

            <RevealParagraph delay={0.1}>
              <p className="mt-6 text-base font-light leading-[1.65] text-[#1A1A1A] md:text-lg">
                That sentence — the one about existence — is still the
                slowest part of any engagement. Clients sometimes find this
                frustrating. We tell them, honestly, that frustration is
                often the right feeling. It means the work has not yet
                become obvious.
              </p>
            </RevealParagraph>

            <RevealParagraph delay={0.2}>
              <p className="mt-6 text-base font-light leading-[1.65] text-[#1A1A1A] md:text-lg">
                Obvious is the word we use when something should feel
                inevitable in hindsight. A good logo, a good interior, a
                good line of copy. None of them should feel invented. They
                should feel uncovered.
              </p>
            </RevealParagraph>
          </div>

          {/* Right column */}
          <div className="md:col-span-6">
            {/* Pull quote — mid-flow */}
            <RevealParagraph delay={0.05}>
              <div className="relative mb-10 border-l-2 border-[#C8522C] py-3 pl-8">
                <p
                  className="font-display italic text-[#1A1A1A]"
                  style={{
                    fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                    lineHeight: 1.2,
                    letterSpacing: "-0.015em",
                    fontWeight: 300,
                  }}
                >
                  The third version is the one that leaves the room.
                </p>
                <span className="mt-4 block text-[11px] font-medium uppercase tracking-[0.25em] text-[#5C5550]">
                  · Studio maxim
                </span>
              </div>
            </RevealParagraph>

            <RevealParagraph delay={0.15}>
              <p className="text-base font-light leading-[1.65] text-[#1A1A1A] md:text-lg">
                We work with three clients a season. That number is not
                aspirational — it is structural. We have tried four. The
                fourth engagement is always the one that carries the least
                of our attention, and that is not fair to anyone.
              </p>
            </RevealParagraph>

            <RevealParagraph delay={0.25}>
              <p className="mt-6 text-base font-light leading-[1.65] text-[#1A1A1A] md:text-lg">
                So the three figure — and the long lead times that follow
                from it — is a promise. Every piece of work we make is made
                by the studio, and the studio is small on purpose.
              </p>
            </RevealParagraph>

            {/* Signature */}
            <RevealParagraph delay={0.35}>
              <div className="mt-16 flex flex-col items-start gap-4 border-t border-[#1A1A1A]/15 pt-8 md:flex-row md:items-center md:gap-8">
                <div className="flex items-center gap-4">
                  <span className="block h-px w-8 bg-[#1A1A1A]/40" />
                  <span
                    className="font-display italic text-[#1A1A1A]"
                    style={{
                      fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                      fontWeight: 400,
                      lineHeight: 1,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    E. M. &amp; T. F.
                  </span>
                </div>
                <div className="flex flex-col gap-0.5 text-[11px] font-medium uppercase tracking-[0.25em] text-[#5C5550]">
                  <span>Founders</span>
                  <span>Amsterdam, MMXVII</span>
                </div>
              </div>
            </RevealParagraph>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// Helpers
// ============================================
function MaskLine({
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

function RevealParagraph({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  if (prefersReduced) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 1, delay, ease: easing.outExpo }}
    >
      {children}
    </motion.div>
  );
}
