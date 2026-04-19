// ============================================
// Component: Editorial Asymmetric Pricing
// Best for: Premium creative services, boutique studios, high-end SaaS positioning
// Key features: 5-column asymmetric grid (featured plan 3-wide + two stacked plans 2-wide),
//   animated minimal underline billing toggle, mask-reveal display prices on scroll,
//   serif display typography, warm accent gradient on featured card, noise texture overlay.
// Dependencies: framer-motion
// Fonts required: Fraunces (display), Inter (body)
// ============================================

"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion, useInView } from "framer-motion";

const easing = {
  outExpo: [0.16, 1, 0.3, 1] as const,
};

type Billing = "monthly" | "annual";

type Plan = {
  id: string;
  name: string;
  tagline: string;
  price: { monthly: number; annual: number };
  features: string[];
  cta: string;
  featured?: boolean;
};

const PLANS: Plan[] = [
  {
    id: "studio",
    name: "Studio",
    tagline: "For practices getting started",
    price: { monthly: 49, annual: 39 },
    features: [
      "Up to 5 active projects",
      "Shared workspace + moodboards",
      "Standard asset library",
      "Email support",
    ],
    cta: "Begin with Studio",
  },
  {
    id: "atelier",
    name: "Atelier",
    tagline: "For practices that set the bar",
    price: { monthly: 149, annual: 119 },
    features: [
      "Unlimited projects and revisions",
      "Private workspace with guest access",
      "Full asset library and custom types",
      "Dedicated creative partner",
      "Priority response within 4 hours",
      "Quarterly practice review",
    ],
    cta: "Join the Atelier",
    featured: true,
  },
  {
    id: "maison",
    name: "Maison",
    tagline: "For multi-discipline houses",
    price: { monthly: 449, annual: 359 },
    features: [
      "Everything in Atelier",
      "Multi-workspace governance",
      "Bespoke onboarding",
      "Named creative director",
    ],
    cta: "Speak with us",
  },
];

export function EditorialPricing() {
  const [billing, setBilling] = useState<Billing>("annual");

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
        <div className="mb-20 flex flex-col items-start gap-12 md:mb-28 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="mb-6 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.25em] text-[#5C5550]">
              <span className="h-px w-8 bg-[#1A1A1A]/30" />
              <span>Ways to work · 2026</span>
            </div>
            <h2
              className="font-display text-[#1A1A1A]"
              style={{
                fontSize: "clamp(2.5rem, 6.5vw, 5.5rem)",
                lineHeight: 0.95,
                letterSpacing: "-0.025em",
                fontWeight: 300,
              }}
            >
              <MaskLine>Commitment,</MaskLine>
              <MaskLine delay={0.15}>
                <span className="italic" style={{ fontWeight: 400 }}>priced clearly.</span>
              </MaskLine>
            </h2>
            <p className="mt-8 max-w-lg text-base font-light leading-[1.5] text-[#5C5550] md:text-lg">
              Three ways of working together. Every engagement includes a direct
              line to the studio — no tiers on who you speak with.
            </p>
          </div>

          {/* Minimal billing toggle — underline-based, not pill */}
          <BillingToggle value={billing} onChange={setBilling} />
        </div>

        {/* Asymmetric 5-column grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-5 md:gap-8">
          {/* Featured — spans 3 columns */}
          <FeaturedCard plan={PLANS[1]} billing={billing} />

          {/* Stacked pair — spans 2 columns, two plans vertically */}
          <div className="flex flex-col gap-6 md:col-span-2 md:gap-8">
            <CompactCard plan={PLANS[0]} billing={billing} />
            <CompactCard plan={PLANS[2]} billing={billing} />
          </div>
        </div>

        {/* Footnote */}
        <div className="mt-16 flex flex-col items-start gap-4 border-t border-[#1A1A1A]/10 pt-8 text-sm font-light text-[#5C5550] md:mt-24 md:flex-row md:items-center md:justify-between">
          <span>All engagements include a 14-day conversation period — no invoice, no obligation.</span>
          <a href="#custom" className="group inline-flex items-center gap-2 text-[#1A1A1A]">
            <span className="relative">
              Something else in mind?
              <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-100 bg-[#1A1A1A] transition-transform duration-500 group-hover:scale-x-0 group-hover:origin-right" />
              <span className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-[#C8522C] transition-transform duration-500 delay-[250ms] group-hover:scale-x-100 group-hover:origin-left" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

// ============================================
// Featured card — large, rich, warm gradient
// ============================================
function FeaturedCard({ plan, billing }: { plan: Plan; billing: Billing }) {
  return (
    <div className="group relative overflow-hidden border border-[#1A1A1A]/10 bg-[#141210] text-[#F7F5F1] md:col-span-3">
      {/* Warm accent gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 70% at 20% 10%, rgba(200, 82, 44, 0.18) 0%, transparent 55%)",
        }}
      />
      {/* Inner content */}
      <div className="relative flex h-full flex-col p-8 md:p-12 lg:p-16">
        {/* Top label */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.25em] text-[#8A817A]">
            <span className="h-px w-6 bg-[#F7F5F1]/30" />
            <span>{plan.name}</span>
          </div>
          <span className="text-[11px] font-medium uppercase tracking-[0.25em] text-[#C8522C]">
            · Most chosen
          </span>
        </div>

        {/* Tagline */}
        <p className="mt-6 max-w-sm font-display text-xl font-light italic leading-[1.2] text-[#F7F5F1]/90 md:text-2xl">
          {plan.tagline}
        </p>

        {/* Price */}
        <div className="mt-16 flex items-baseline gap-3">
          <span className="text-sm font-medium tracking-wide text-[#8A817A]">$</span>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={billing}
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
              transition={{ duration: 0.7, ease: easing.outExpo }}
              className="font-display text-[#F7F5F1]"
              style={{
                fontSize: "clamp(5rem, 10vw, 9rem)",
                lineHeight: 0.9,
                letterSpacing: "-0.04em",
                fontWeight: 300,
              }}
            >
              {plan.price[billing]}
            </motion.span>
          </AnimatePresence>
          <span className="ml-2 text-sm font-light tracking-wide text-[#8A817A]">
            per month · {billing === "annual" ? "billed annually" : "billed monthly"}
          </span>
        </div>

        {/* Divider */}
        <div className="mt-12 h-px w-full bg-gradient-to-r from-[#F7F5F1]/20 via-[#F7F5F1]/10 to-transparent" />

        {/* Features */}
        <ul className="mt-8 grid grid-cols-1 gap-y-4 md:grid-cols-2 md:gap-x-12">
          {plan.features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-3 text-sm font-light leading-[1.4] text-[#F7F5F1]/90"
            >
              <span className="mt-[7px] block h-px w-3 shrink-0 bg-[#C8522C]" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        {/* Spacer */}
        <div className="mt-auto pt-16" />

        {/* CTA */}
        <a
          href={`#${plan.id}`}
          className="group/cta relative inline-flex w-fit items-center justify-center gap-3 border border-[#F7F5F1] bg-[#F7F5F1] px-8 py-4 text-sm font-medium tracking-wide text-[#1A1A1A] transition-colors duration-500 hover:bg-transparent hover:text-[#F7F5F1]"
        >
          {plan.cta}
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            className="transition-transform duration-500 group-hover/cta:translate-x-1"
          >
            <path
              d="M1 7h12M7 1l6 6-6 6"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="square"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}

// ============================================
// Compact card — restrained, for secondary plans
// ============================================
function CompactCard({ plan, billing }: { plan: Plan; billing: Billing }) {
  return (
    <div className="group relative flex flex-1 flex-col border border-[#1A1A1A]/10 bg-[#F7F5F1] p-8 transition-colors duration-500 hover:border-[#1A1A1A]/25 md:p-10">
      {/* Label */}
      <div className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.25em] text-[#5C5550]">
        <span className="h-px w-6 bg-[#1A1A1A]/30" />
        <span>{plan.name}</span>
      </div>

      {/* Tagline */}
      <p className="mt-4 max-w-xs font-display text-lg font-light italic leading-[1.3] text-[#1A1A1A]/80">
        {plan.tagline}
      </p>

      {/* Price */}
      <div className="mt-8 flex items-baseline gap-2">
        <span className="text-xs font-medium text-[#5C5550]">$</span>
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={billing}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5, ease: easing.outExpo }}
            className="font-display text-[#1A1A1A]"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              lineHeight: 0.9,
              letterSpacing: "-0.03em",
              fontWeight: 300,
            }}
          >
            {plan.price[billing]}
          </motion.span>
        </AnimatePresence>
        <span className="ml-1 text-xs font-light text-[#5C5550]">/mo</span>
      </div>

      {/* Divider */}
      <div className="mt-6 h-px w-full bg-[#1A1A1A]/10" />

      {/* Features */}
      <ul className="mt-6 flex flex-col gap-3">
        {plan.features.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-2.5 text-sm font-light leading-[1.4] text-[#1A1A1A]/80"
          >
            <span className="mt-[7px] block h-px w-2.5 shrink-0 bg-[#1A1A1A]/40" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href={`#${plan.id}`}
        className="group/cta mt-auto flex items-center gap-2 pt-8 text-sm font-medium text-[#1A1A1A]"
      >
        <span className="relative">
          {plan.cta}
          <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-[#1A1A1A] transition-transform duration-500 group-hover/cta:scale-x-100" />
        </span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 14 14"
          fill="none"
          className="transition-transform duration-500 group-hover/cta:translate-x-1"
        >
          <path
            d="M1 7h12M7 1l6 6-6 6"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="square"
          />
        </svg>
      </a>
    </div>
  );
}

// ============================================
// Billing toggle — minimal underline-style (not pill)
// ============================================
function BillingToggle({
  value,
  onChange,
}: {
  value: Billing;
  onChange: (v: Billing) => void;
}) {
  return (
    <div className="flex items-center gap-8 text-sm font-medium tracking-wide">
      {(["monthly", "annual"] as const).map((opt) => {
        const active = value === opt;
        return (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className="relative flex items-center gap-2 py-2 text-[#1A1A1A] transition-opacity duration-500"
            style={{ opacity: active ? 1 : 0.45 }}
          >
            <span className="capitalize">{opt}</span>
            {opt === "annual" && (
              <span className="rounded-full bg-[#C8522C]/15 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.15em] text-[#C8522C]">
                −20%
              </span>
            )}
            {active && (
              <motion.span
                layoutId="billing-underline"
                className="absolute inset-x-0 -bottom-0.5 h-px bg-[#1A1A1A]"
                transition={{ duration: 0.7, ease: easing.outExpo }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

// ============================================
// MaskLine — for line-by-line heading reveals
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
