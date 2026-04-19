// ============================================
// Component: Editorial FAQ / Remarks
// Best for: Premium services answering thoughtful questions, luxury brands
//   addressing ownership/craft/provenance questions — a FAQ section that reads
//   like an interview, not a help-center.
// Key features: Large serif italic questions, reveal-on-click answers with
//   height + mask-line animations, hairline dividers between entries, one item
//   pre-expanded for context, custom plus/minus marker that rotates, scroll-
//   triggered reveal per row.
// Dependencies: framer-motion
// Fonts: Fraunces (display), Inter (body)
// ============================================

"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useInView } from "framer-motion";

const easing = {
  outExpo: [0.16, 1, 0.3, 1] as const,
};

type Entry = {
  id: string;
  question: string;
  answer: string[];
};

const ENTRIES: Entry[] = [
  {
    id: "engagements",
    question: "How many engagements do you take each year?",
    answer: [
      "Between nine and twelve. The number depends less on calendar than on the shape of the work — some projects need three weeks of silence before they can be moved forward, and we would rather that silence be real than pretend to keep a schedule.",
      "We announce open seasons four times a year. The first Monday of January, April, July, and October.",
    ],
  },
  {
    id: "scope",
    question: "What sort of work do you not do?",
    answer: [
      "Anything where the answer already exists. If you know you want a logo with a wordmark and a symbol, there are dozens of studios who will produce that very quickly and very well. We are not one of them.",
      "We also don't do work that requires speed — three weeks, two weeks — not because we cannot, but because we do not make our best work under those conditions, and it is more honest to decline than to disappoint.",
    ],
  },
  {
    id: "fees",
    question: "How do fees work?",
    answer: [
      "Fixed for the engagement, paid in thirds. The first third at commencement, the second at midpoint review, the last at handover.",
      "Unlike hourly billing, this aligns our incentive with yours: the work is done when the work is right, not when the clock says so.",
    ],
  },
  {
    id: "geography",
    question: "Do you work outside Europe?",
    answer: [
      "Yes — we have engagements in Kyoto, in Mexico City, in Los Angeles. About forty percent of our work sits outside the continent.",
      "We travel to the project twice: once at the outset, once near the handover. The middle portion is conducted from the studio in Amsterdam.",
    ],
  },
  {
    id: "nda",
    question: "Will you sign an NDA?",
    answer: [
      "Yes. Most of our work is under NDA — what we show publicly is a fraction of what we make. A standard mutual NDA takes about a week to put in place.",
      "If the engagement is particularly sensitive, we are comfortable operating entirely unnamed.",
    ],
  },
];

export function EditorialFAQ() {
  // Default: first entry expanded
  const [open, setOpen] = useState<string | null>(ENTRIES[0].id);

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
        {/* Header */}
        <div className="mb-16 grid grid-cols-1 gap-10 md:mb-24 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.25em] text-[#5C5550]">
              <span className="h-px w-8 bg-[#1A1A1A]/30" />
              <span>Remarks · Often asked</span>
            </div>
          </div>
          <div className="md:col-span-7">
            <h2
              className="font-display text-[#1A1A1A]"
              style={{
                fontSize: "clamp(2.25rem, 5vw, 4rem)",
                lineHeight: 0.95,
                letterSpacing: "-0.025em",
                fontWeight: 300,
              }}
            >
              <MaskLine>The answers we</MaskLine>
              <MaskLine delay={0.15}>
                <span className="italic" style={{ fontWeight: 400 }}>
                  find ourselves giving most.
                </span>
              </MaskLine>
            </h2>
          </div>
        </div>

        {/* Entries */}
        <div className="border-t border-[#1A1A1A]/15">
          {ENTRIES.map((entry, i) => (
            <FAQEntry
              key={entry.id}
              entry={entry}
              index={i}
              isOpen={open === entry.id}
              onToggle={() =>
                setOpen((curr) => (curr === entry.id ? null : entry.id))
              }
            />
          ))}
        </div>

        {/* Footnote */}
        <div className="mt-16 text-sm font-light text-[#5C5550]">
          <p>
            Something else on your mind?{" "}
            <a
              href="#contact"
              className="group relative inline-block text-[#1A1A1A]"
            >
              <span className="relative">
                Write to us directly
                <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-100 bg-[#1A1A1A] transition-transform duration-500 group-hover:origin-right group-hover:scale-x-0" />
                <span className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-[#C8522C] transition-transform duration-500 delay-[250ms] group-hover:origin-left group-hover:scale-x-100" />
              </span>
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}

// ============================================
// FAQEntry — large serif question + expandable answer
// ============================================
function FAQEntry({
  entry,
  index,
  isOpen,
  onToggle,
}: {
  entry: Entry;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.9, delay: index * 0.04, ease: easing.outExpo }}
      className="border-b border-[#1A1A1A]/15"
    >
      <button
        onClick={onToggle}
        className="flex w-full items-start justify-between gap-6 py-8 text-left md:py-10"
        aria-expanded={isOpen}
      >
        <div className="flex flex-1 items-start gap-6 md:gap-8">
          <span
            className="shrink-0 font-display italic text-[#5C5550]"
            style={{
              fontSize: "1.25rem",
              fontWeight: 400,
              lineHeight: 1.4,
              minWidth: "2ch",
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3
            className="font-display text-[#1A1A1A]"
            style={{
              fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
              lineHeight: 1.15,
              letterSpacing: "-0.01em",
              fontWeight: 300,
              fontStyle: "italic",
            }}
          >
            {entry.question}
          </h3>
        </div>

        {/* Plus/minus marker */}
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.6, ease: easing.outExpo }}
          className="relative mt-3 block h-4 w-4 shrink-0 md:mt-5"
        >
          <span className="absolute left-0 top-1/2 h-px w-4 -translate-y-1/2 bg-[#1A1A1A]" />
          <span className="absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 bg-[#1A1A1A]" />
        </motion.span>
      </button>

      {/* Answer */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.8, ease: easing.outExpo },
              opacity: { duration: 0.5, ease: easing.outExpo, delay: isOpen ? 0.2 : 0 },
            }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 gap-4 pb-10 pl-0 md:grid-cols-12 md:gap-8 md:pl-16">
              <div className="md:col-span-8 md:col-start-2 md:flex md:flex-col md:gap-5">
                {entry.answer.map((paragraph, pi) => (
                  <motion.p
                    key={pi}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.7,
                      delay: prefersReduced ? 0 : 0.15 + pi * 0.08,
                      ease: easing.outExpo,
                    }}
                    className="text-base font-light leading-[1.65] text-[#1A1A1A]/85 md:text-lg"
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ============================================
// MaskLine helper
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
