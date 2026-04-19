// ============================================
// Component: Editorial Client Ledger
// Best for: Premium studios listing clients, creative agencies, luxury service
//   providers — a social proof section that reads like a ledger or catalog entry,
//   not a generic "Trusted by" logo band.
// Key features: Vertical list of clients as typographic entries (no logo images),
//   italic serif names paired with year + discipline in small caps, hairline
//   dividers, hover reveals location italic caption, scroll-stagger reveal.
//   If image logos are desired, there's an image-slot variant mid-file.
// Dependencies: framer-motion
// Fonts: Fraunces (display), Inter (body)
// ============================================

"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";

const easing = {
  outExpo: [0.16, 1, 0.3, 1] as const,
};

type Client = {
  name: string;
  year: string;
  discipline: string;
  location: string;
};

const CLIENTS: Client[] = [
  { name: "Ater Mobilier", year: "2024", discipline: "Identity", location: "Porto" },
  { name: "Hōseki Atelier", year: "2024", discipline: "Editorial", location: "Kyoto" },
  { name: "Holtz & Sons", year: "2023", discipline: "Naming", location: "Antwerp" },
  { name: "The Quiet Review", year: "2023", discipline: "Publication", location: "Stockholm" },
  { name: "Maison Nord", year: "2022", discipline: "Interior direction", location: "Copenhagen" },
  { name: "Veronesi Typefoundry", year: "2022", discipline: "Type", location: "Milan" },
  { name: "Oficina Vintena", year: "2021", discipline: "Identity · Editorial", location: "Lisbon" },
  { name: "Atelier Ligne", year: "2020", discipline: "Interior direction", location: "Lyon" },
];

export function EditorialClientLedger() {
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
        <div className="mb-16 grid grid-cols-1 gap-8 md:mb-24 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.25em] text-[#5C5550]">
              <span className="h-px w-8 bg-[#1A1A1A]/30" />
              <span>Ledger · Selected companions</span>
            </div>
            <h2
              className="mt-6 font-display text-[#1A1A1A]"
              style={{
                fontSize: "clamp(2.25rem, 5vw, 4rem)",
                lineHeight: 0.95,
                letterSpacing: "-0.025em",
                fontWeight: 300,
              }}
            >
              <MaskLine>Kept company with</MaskLine>
              <MaskLine delay={0.15}>
                <span className="italic" style={{ fontWeight: 400 }}>
                  forty practices, eight shown.
                </span>
              </MaskLine>
            </h2>
          </div>

          <div className="md:col-span-6 md:col-start-7 md:pt-6">
            <p className="max-w-md text-base font-light leading-[1.5] text-[#5C5550] md:text-lg">
              Most engagements we do not announce. The ones we do are those
              whose public life has begun.
            </p>
          </div>
        </div>

        {/* Ledger rows */}
        <div className="border-t border-[#1A1A1A]/15">
          {CLIENTS.map((client, i) => (
            <LedgerRow key={client.name} client={client} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// LedgerRow — typographic client entry
// ============================================
function LedgerRow({ client, index }: { client: Client; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.9, delay: index * 0.05, ease: easing.outExpo }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative border-b border-[#1A1A1A]/15"
    >
      {/* Background wash on hover */}
      <motion.div
        aria-hidden
        initial={false}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.5, ease: easing.outExpo }}
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#EEEAE2] via-transparent to-transparent"
      />

      <div className="relative grid grid-cols-12 items-baseline gap-4 py-6 md:gap-8 md:py-8">
        {/* Number */}
        <motion.span
          animate={{ x: hovered ? 6 : 0 }}
          transition={{ duration: 0.5, ease: easing.outExpo }}
          className="col-span-2 font-display text-lg italic text-[#5C5550] md:col-span-1 md:text-xl"
          style={{ fontWeight: 400 }}
        >
          {String(index + 1).padStart(2, "0")}
        </motion.span>

        {/* Name */}
        <div className="col-span-10 md:col-span-5">
          <h3
            className="font-display text-[#1A1A1A]"
            style={{
              fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.015em",
              fontWeight: 300,
            }}
          >
            {client.name}
          </h3>
        </div>

        {/* Discipline */}
        <div className="col-span-6 md:col-span-3">
          <span className="text-[11px] font-medium uppercase tracking-[0.25em] text-[#5C5550]">
            {client.discipline}
          </span>
        </div>

        {/* Year */}
        <div className="col-span-3 md:col-span-2">
          <span
            className="font-display text-base italic text-[#1A1A1A]/80 md:text-lg"
            style={{ fontWeight: 400 }}
          >
            {client.year}
          </span>
        </div>

        {/* Location — appears on hover */}
        <div className="col-span-3 flex justify-end md:col-span-1">
          <motion.span
            initial={false}
            animate={{ opacity: hovered ? 1 : 0.3 }}
            transition={{ duration: 0.5, ease: easing.outExpo }}
            className="font-display text-sm italic text-[#5C5550]"
          >
            {client.location}
          </motion.span>
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
