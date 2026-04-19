// ============================================
// Component: Editorial Numbers
// Best for: Premium studios showing scale/tenure, luxury brands conveying
//   provenance, services communicating quiet scale with gravitas.
// Key features: Four oversized serif numerals in asymmetric grid with different
//   column widths, italic captions beneath, scroll-driven counter animation
//   (easeOutExpo curve from 0 to target), hairline dividers between cells,
//   minimal prefix/suffix styling (superscript serifs for units).
// Dependencies: framer-motion
// Fonts: Fraunces (display), Inter (body)
// ============================================

"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const easing = {
  outExpo: [0.16, 1, 0.3, 1] as const,
};

type Stat = {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  caption: string;
};

const STATS: Stat[] = [
  {
    label: "Engagements · lifetime",
    value: 42,
    caption: "each one chosen, not accepted",
  },
  {
    label: "Countries · reached",
    value: 17,
    caption: "from Porto to Kyoto",
  },
  {
    label: "Year · founded",
    value: 2017,
    caption: "a back room in Amsterdam",
  },
  {
    label: "Hours · considered",
    value: 14,
    suffix: "k",
    caption: "before a single line is drawn",
  },
];

export function EditorialStats() {
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

      <div className="relative mx-auto max-w-[90rem] px-6 md:px-12 lg:px-20">
        {/* Kicker */}
        <div className="mb-16 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.25em] text-[#5C5550] md:mb-24">
          <span className="h-px w-8 bg-[#1A1A1A]/30" />
          <span>The studio · In four figures</span>
        </div>

        {/* Asymmetric 12-col grid */}
        <div className="grid grid-cols-2 divide-x divide-y divide-[#1A1A1A]/15 border border-[#1A1A1A]/15 md:grid-cols-12 md:divide-y-0">
          {STATS.map((stat, i) => {
            const spans = ["md:col-span-4", "md:col-span-3", "md:col-span-3", "md:col-span-2"];
            return (
              <StatCell
                key={stat.label}
                stat={stat}
                index={i}
                colSpan={spans[i] || "md:col-span-3"}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ============================================
// StatCell — animated counter + caption
// ============================================
function StatCell({
  stat,
  index,
  colSpan,
}: {
  stat: Stat;
  index: number;
  colSpan: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const prefersReduced = useReducedMotion();
  const [display, setDisplay] = useState(prefersReduced ? stat.value : 0);

  useEffect(() => {
    if (!inView || prefersReduced) return;
    const duration = 1800;
    const start = performance.now();
    let raf = 0;

    const step = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      // easeOutExpo
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setDisplay(Math.floor(eased * stat.value));
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, stat.value, prefersReduced]);

  return (
    <div
      ref={ref}
      className={`relative flex flex-col justify-between p-8 md:p-12 ${colSpan}`}
    >
      {/* Top micro label */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: inView ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: easing.outExpo }}
        className="text-[11px] font-medium uppercase tracking-[0.25em] text-[#5C5550]"
      >
        {stat.label}
      </motion.span>

      {/* Number */}
      <div className="my-8 flex items-baseline gap-1">
        {stat.prefix && (
          <span
            className="font-display text-[#5C5550]"
            style={{
              fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
              fontWeight: 300,
              lineHeight: 1,
            }}
          >
            {stat.prefix}
          </span>
        )}
        <span
          className="font-display tabular-nums text-[#1A1A1A]"
          style={{
            fontSize: "clamp(3rem, 7vw, 6rem)",
            fontWeight: 300,
            lineHeight: 0.9,
            letterSpacing: "-0.035em",
          }}
        >
          {display.toLocaleString()}
        </span>
        {stat.suffix && (
          <span
            className="font-display text-[#1A1A1A]"
            style={{
              fontSize: "clamp(1.75rem, 3.5vw, 3rem)",
              fontWeight: 300,
              fontStyle: "italic",
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            {stat.suffix}
          </span>
        )}
      </div>

      {/* Italic caption */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: inView ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: easing.outExpo }}
        className="font-display text-sm italic text-[#5C5550] md:text-base"
      >
        — {stat.caption}
      </motion.span>
    </div>
  );
}
