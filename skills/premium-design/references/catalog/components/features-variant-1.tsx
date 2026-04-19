// ============================================
// Component: Editorial Index Features
// Best for: Premium services, creative studios, luxury products — any brand that
//   wants features to feel like a curated index rather than a feature grid.
// Key features: Vertical list of numbered rows (magazine TOC aesthetic), serif
//   display numerals with scroll-reveal, hairline dividers, hover shifts number
//   horizontally + reveals italic caption, one highlighted "spotlight" row with
//   different treatment (photo slot + expanded description), mask-reveal per row
//   on scroll-into-view.
// Dependencies: framer-motion
// Fonts: Fraunces (display), Inter (body)
// ============================================

"use client";

import { motion, useReducedMotion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const easing = {
  outExpo: [0.16, 1, 0.3, 1] as const,
};

type Feature = {
  id: string;
  number: string;
  title: string;
  description: string;
  caption: string;
  spotlight?: boolean;
};

const FEATURES: Feature[] = [
  {
    id: "research",
    number: "01",
    title: "Research as practice",
    description:
      "Six weeks spent understanding the territory before a single stroke is drawn. Interviews, archives, walks through the brief.",
    caption: "Weeks 1–6",
  },
  {
    id: "direction",
    number: "02",
    title: "Direction, not decoration",
    description:
      "We establish a point of view on the work before the work begins. Not a mood, not a mockup — a thesis.",
    caption: "Weeks 6–8",
    spotlight: true,
  },
  {
    id: "craft",
    number: "03",
    title: "Craft, measured in iteration",
    description:
      "Every artefact passes through the studio three times. The third version is the one that leaves the room.",
    caption: "Weeks 8–18",
  },
  {
    id: "transfer",
    number: "04",
    title: "A handover, not a delivery",
    description:
      "Your team inherits not only the work but the thinking behind it. Systems, rationale, and the exceptions to both.",
    caption: "Weeks 18–20",
  },
];

export function EditorialIndexFeatures() {
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
        {/* Header — asymmetric: label left, heading right */}
        <div className="mb-20 grid grid-cols-1 gap-12 md:mb-28 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <div className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.25em] text-[#5C5550]">
              <span className="h-px w-8 bg-[#1A1A1A]/30" />
              <span>Method · Twenty weeks</span>
            </div>
            <p className="mt-8 max-w-sm text-sm font-light leading-[1.5] text-[#5C5550]">
              Four chapters that repeat across every engagement. They are slow
              on purpose — speed is where generic work begins.
            </p>
          </div>

          <div className="md:col-span-8">
            <h2
              className="font-display text-[#1A1A1A]"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                lineHeight: 0.95,
                letterSpacing: "-0.025em",
                fontWeight: 300,
              }}
            >
              <MaskLine>How the studio</MaskLine>
              <MaskLine delay={0.15}>
                <span className="italic" style={{ fontWeight: 400 }}>
                  arrives at the work.
                </span>
              </MaskLine>
            </h2>
          </div>
        </div>

        {/* Index rows */}
        <div className="border-t border-[#1A1A1A]/10">
          {FEATURES.map((feature, i) => (
            <FeatureRow key={feature.id} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// FeatureRow — horizontal magazine-style entry
// ============================================
function FeatureRow({ feature, index }: { feature: Feature; index: number }) {
  const [hovered, setHovered] = useState(false);
  const rowRef = useRef<HTMLDivElement>(null);

  if (feature.spotlight) {
    return <SpotlightRow feature={feature} index={index} />;
  }

  return (
    <motion.div
      ref={rowRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 1.1, delay: index * 0.06, ease: easing.outExpo }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative border-b border-[#1A1A1A]/10"
    >
      {/* Background wash on hover */}
      <motion.div
        aria-hidden
        initial={false}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.6, ease: easing.outExpo }}
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#EEEAE2] via-transparent to-transparent"
      />

      <a
        href={`#${feature.id}`}
        className="relative grid grid-cols-12 items-baseline gap-4 py-10 md:gap-8 md:py-14"
      >
        {/* Number */}
        <motion.div
          animate={{ x: hovered ? 8 : 0 }}
          transition={{ duration: 0.6, ease: easing.outExpo }}
          className="col-span-2 md:col-span-1"
        >
          <span
            className="font-display text-[#1A1A1A]"
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 300,
              letterSpacing: "-0.02em",
              lineHeight: 1,
            }}
          >
            {feature.number}
          </span>
        </motion.div>

        {/* Title */}
        <div className="col-span-10 md:col-span-5">
          <h3
            className="font-display text-[#1A1A1A]"
            style={{
              fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.015em",
              fontWeight: 300,
            }}
          >
            {feature.title}
          </h3>
        </div>

        {/* Description */}
        <div className="col-span-12 md:col-span-5">
          <p className="max-w-md text-sm font-light leading-[1.5] text-[#5C5550] md:text-base">
            {feature.description}
          </p>
        </div>

        {/* Caption — right-aligned */}
        <div className="col-span-12 flex items-center justify-end md:col-span-1">
          <motion.span
            initial={false}
            animate={{ opacity: hovered ? 1 : 0.4 }}
            transition={{ duration: 0.5, ease: easing.outExpo }}
            className="font-display text-sm italic tracking-normal text-[#5C5550]"
          >
            {feature.caption}
          </motion.span>
        </div>
      </a>
    </motion.div>
  );
}

// ============================================
// SpotlightRow — one elevated feature with different treatment
// ============================================
function SpotlightRow({ feature, index }: { feature: Feature; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 1.1, delay: index * 0.06, ease: easing.outExpo }}
      className="relative border-b border-[#1A1A1A]/10 bg-[#141210] text-[#F7F5F1]"
    >
      {/* Warm accent gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 80% at 85% 50%, rgba(200, 82, 44, 0.18) 0%, transparent 55%)",
        }}
      />

      <div className="relative grid grid-cols-12 items-start gap-4 py-16 md:gap-8 md:py-24">
        {/* Left: number + small label stack */}
        <div className="col-span-12 px-6 md:col-span-5 md:px-12 lg:px-20">
          <div className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.25em] text-[#C8522C]">
            <span className="h-px w-8 bg-[#C8522C]/60" />
            <span>· Spotlight</span>
          </div>

          <div className="mt-10 flex items-baseline gap-6">
            <span
              className="font-display text-[#F7F5F1]"
              style={{
                fontSize: "clamp(4rem, 10vw, 8rem)",
                fontWeight: 300,
                letterSpacing: "-0.04em",
                lineHeight: 0.9,
              }}
            >
              {feature.number}
            </span>
            <span className="font-display text-xl italic text-[#F7F5F1]/60">
              {feature.caption}
            </span>
          </div>
        </div>

        {/* Right: title + expanded description */}
        <div className="col-span-12 px-6 md:col-span-7 md:px-12 lg:pr-20">
          <h3
            className="font-display text-[#F7F5F1]"
            style={{
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              lineHeight: 1,
              letterSpacing: "-0.02em",
              fontWeight: 300,
            }}
          >
            <span className="block">{feature.title.split(",")[0]},</span>
            <span className="block italic" style={{ fontWeight: 400 }}>
              {feature.title.split(",")[1]?.trim() || ""}
            </span>
          </h3>

          <p className="mt-8 max-w-lg text-base font-light leading-[1.5] text-[#F7F5F1]/80">
            {feature.description}
          </p>

          <p className="mt-6 max-w-lg text-sm font-light leading-[1.5] text-[#F7F5F1]/60">
            Nothing leaves the studio without a point of view. If we cannot
            articulate why a decision was made in one sentence, the decision
            has not yet been made.
          </p>

          <a
            href={`#${feature.id}`}
            className="group/cta mt-10 inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.25em] text-[#F7F5F1]"
          >
            <span>Read the full method</span>
            <span className="relative block h-px w-10 overflow-hidden bg-[#F7F5F1]/20">
              <span className="absolute inset-y-0 left-0 w-full origin-left scale-x-0 bg-[#C8522C] transition-transform duration-500 group-hover/cta:scale-x-100" />
            </span>
          </a>
        </div>
      </div>
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
