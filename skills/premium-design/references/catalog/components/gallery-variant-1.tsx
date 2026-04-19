// ============================================
// Component: Editorial Work Index
// Best for: Portfolio sites, studio showcases, photography agencies, architecture
//   practices — any site where the work is the hero.
// Key features: Asymmetric multi-row grid (not equal columns) with varied image
//   aspect ratios, staggered scroll reveal per row, hover shifts title + reveals
//   italic caption + subtle image scale 1.02, featured item with larger span
//   and dark treatment, year/client metadata in small caps, "View all" tail link.
// Dependencies: framer-motion
// Fonts: Fraunces (display), Inter (body)
// Image placeholder: replace background colors with actual image URLs in your project
// ============================================

"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";

const easing = {
  outExpo: [0.16, 1, 0.3, 1] as const,
};

type Work = {
  id: string;
  title: string;
  client: string;
  year: string;
  discipline: string;
  caption: string;
  span: "wide" | "tall" | "square" | "featured";
  placeholderColor: string; // fallback if no image
};

const WORKS: Work[] = [
  {
    id: "w1",
    title: "A house in Noto",
    client: "Private · Sicily",
    year: "2025",
    discipline: "Interior direction",
    caption: "Twenty-two weeks · three rooms",
    span: "featured",
    placeholderColor: "#D9C2A4",
  },
  {
    id: "w2",
    title: "Ater Mobilier",
    client: "Porto",
    year: "2024",
    discipline: "Identity · Type",
    caption: "A wordmark cut in four weights",
    span: "tall",
    placeholderColor: "#4C3F2F",
  },
  {
    id: "w3",
    title: "Hōseki",
    client: "Kyoto",
    year: "2024",
    discipline: "Editorial",
    caption: "A quarterly journal in five issues",
    span: "square",
    placeholderColor: "#B8A978",
  },
  {
    id: "w4",
    title: "The Quiet Review",
    client: "Stockholm",
    year: "2023",
    discipline: "Publication",
    caption: "First issue · winter",
    span: "wide",
    placeholderColor: "#1A1A1A",
  },
  {
    id: "w5",
    title: "Holtz & Sons",
    client: "Antwerp",
    year: "2023",
    discipline: "Naming · Identity",
    caption: "A third-generation atelier renamed",
    span: "square",
    placeholderColor: "#C8522C",
  },
];

export function EditorialWorkIndex() {
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
        {/* Header */}
        <div className="mb-16 flex flex-col items-start justify-between gap-8 md:mb-24 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.25em] text-[#5C5550]">
              <span className="h-px w-8 bg-[#1A1A1A]/30" />
              <span>Index · Selected work</span>
            </div>
            <h2
              className="mt-6 font-display text-[#1A1A1A]"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                lineHeight: 0.95,
                letterSpacing: "-0.025em",
                fontWeight: 300,
              }}
            >
              <MaskLine>Forty engagements,</MaskLine>
              <MaskLine delay={0.15}>
                <span className="italic" style={{ fontWeight: 400 }}>
                  five worth showing.
                </span>
              </MaskLine>
            </h2>
          </div>

          <MaskLine delay={0.35}>
            <a
              href="#archive"
              className="group relative inline-flex items-center gap-3 text-sm font-medium tracking-wide text-[#1A1A1A]"
            >
              <span className="relative">
                View the complete archive
                <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-100 bg-[#1A1A1A] transition-transform duration-500 group-hover:origin-right group-hover:scale-x-0" />
                <span className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-[#C8522C] transition-transform duration-500 delay-[250ms] group-hover:origin-left group-hover:scale-x-100" />
              </span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M1 7h12M7 1l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="square"
                />
              </svg>
            </a>
          </MaskLine>
        </div>

        {/* Grid — 12 col asymmetric */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8">
          {WORKS.map((work, i) => (
            <WorkCard key={work.id} work={work} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// WorkCard — varies span + aspect based on type
// ============================================
function WorkCard({ work, index }: { work: Work; index: number }) {
  const prefersReduced = useReducedMotion();

  const spanClasses = {
    featured: "md:col-span-8 md:row-span-2 aspect-[4/3]",
    wide: "md:col-span-8 aspect-[16/9]",
    tall: "md:col-span-4 aspect-[3/4]",
    square: "md:col-span-4 aspect-square",
  };

  const isFeatured = work.span === "featured";

  return (
    <motion.a
      href={`#${work.id}`}
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{
        duration: 1.1,
        delay: prefersReduced ? 0 : (index % 3) * 0.08,
        ease: easing.outExpo,
      }}
      className={`group relative block ${spanClasses[work.span]}`}
    >
      {/* Image / placeholder */}
      <div className="relative h-full w-full overflow-hidden">
        <motion.div
          initial={false}
          whileHover={prefersReduced ? undefined : { scale: 1.02 }}
          transition={{ duration: 0.9, ease: easing.outExpo }}
          className="absolute inset-0"
          style={{ backgroundColor: work.placeholderColor }}
        >
          {/* Optional: put an <img> here. Placeholder uses the color */}
          {/* Subtle inner gradient for depth */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.15) 100%)",
            }}
          />
        </motion.div>

        {/* Number marker — top-left */}
        <div className="absolute left-6 top-6 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.25em] text-[#F7F5F1]/90 mix-blend-difference">
          <span
            className="font-display text-xl italic"
            style={{ fontWeight: 400 }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="h-px w-6 bg-[#F7F5F1]/40" />
          <span>{work.discipline}</span>
        </div>

        {/* Caption slide-in on hover — only on featured */}
        {isFeatured && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easing.outExpo }}
            className="pointer-events-none absolute left-6 right-6 top-1/2 -translate-y-1/2 text-center"
          >
            <p
              className="font-display italic text-[#F7F5F1]"
              style={{
                fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                fontWeight: 300,
                textShadow: "0 2px 20px rgba(0,0,0,0.4)",
              }}
            >
              {work.caption}
            </p>
          </motion.div>
        )}
      </div>

      {/* Caption below */}
      <div className="mt-5 flex items-baseline justify-between gap-4">
        <div>
          <h3
            className="font-display text-[#1A1A1A] transition-transform duration-500 group-hover:translate-x-1"
            style={{
              fontSize: "clamp(1.125rem, 1.75vw, 1.5rem)",
              fontWeight: 300,
              letterSpacing: "-0.01em",
              lineHeight: 1.2,
            }}
          >
            {work.title}
          </h3>
          <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.25em] text-[#5C5550]">
            {work.client}
          </p>
        </div>
        <span
          className="font-display text-base italic text-[#5C5550] md:text-lg"
          style={{ fontWeight: 400 }}
        >
          {work.year}
        </span>
      </div>
    </motion.a>
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
