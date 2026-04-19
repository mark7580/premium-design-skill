// ============================================
// Component: Editorial Contact Form
// Best for: Premium brands, studios, private practices — a contact section that
//   reads like correspondence, not a form.
// Key features: Asymmetric 12-col layout (story on left, form on right), underline
//   inputs with floating small-caps placeholders (no boxed fields), animated
//   underline color shift on focus (terracotta), textarea that grows with content,
//   submit button with arrow slide, "or send a letter" alternative path with two-
//   tone underline.
// Dependencies: framer-motion
// Fonts: Fraunces (display), Inter (body)
// ============================================

"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";

const easing = {
  outExpo: [0.16, 1, 0.3, 1] as const,
};

export function EditorialContact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    organisation: "",
    message: "",
  });

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
            "radial-gradient(ellipse 50% 60% at 15% 80%, rgba(200, 82, 44, 0.06) 0%, transparent 55%)",
        }}
      />

      <div className="relative mx-auto max-w-[90rem] px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-12 md:gap-20">
          {/* Left: copy + availability */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.25em] text-[#5C5550]">
              <span className="h-px w-8 bg-[#1A1A1A]/30" />
              <span>Correspondence · Studio line</span>
            </div>

            <h2
              className="mt-8 font-display text-[#1A1A1A]"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                lineHeight: 0.95,
                letterSpacing: "-0.025em",
                fontWeight: 300,
              }}
            >
              <MaskLine>Write to us</MaskLine>
              <MaskLine delay={0.15}>
                <span className="italic" style={{ fontWeight: 400 }}>
                  as you would to a friend.
                </span>
              </MaskLine>
            </h2>

            <p className="mt-10 max-w-md text-base font-light leading-[1.5] text-[#5C5550] md:text-lg">
              We read every message ourselves. There is no inbox triage here —
              only a small team of people who will recognise your name when
              you come in for coffee.
            </p>

            {/* Availability block */}
            <div className="mt-14 border-l border-[#1A1A1A]/15 pl-6">
              <span className="text-[11px] font-medium uppercase tracking-[0.25em] text-[#8A817A]">
                Current availability
              </span>
              <p
                className="mt-2 font-display italic text-[#1A1A1A]"
                style={{
                  fontSize: "clamp(1.25rem, 2vw, 1.75rem)",
                  fontWeight: 400,
                  lineHeight: 1.2,
                  letterSpacing: "-0.01em",
                }}
              >
                Two engagements · Spring 2026
              </p>
              <p className="mt-4 max-w-xs text-sm font-light leading-[1.4] text-[#5C5550]">
                Replies arrive within 48 hours. Calls, where appropriate,
                follow in the week after.
              </p>
            </div>

            {/* Alternative path */}
            <div className="mt-14 flex flex-col gap-3 text-sm font-light text-[#5C5550]">
              <span className="text-[11px] font-medium uppercase tracking-[0.25em] text-[#8A817A]">
                Or by post
              </span>
              <span className="font-display text-base italic text-[#1A1A1A] md:text-lg">
                Maison Studio, Prinsengracht 287<br />
                1016 GW Amsterdam
              </span>
            </div>
          </div>

          {/* Right: form */}
          <div className="md:col-span-7">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                // handle submit
              }}
              className="flex flex-col gap-10"
            >
              <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-10">
                <UnderlineField
                  label="Your name"
                  value={form.name}
                  onChange={(v) => setForm({ ...form, name: v })}
                />
                <UnderlineField
                  label="Email address"
                  type="email"
                  value={form.email}
                  onChange={(v) => setForm({ ...form, email: v })}
                />
              </div>

              <UnderlineField
                label="Organisation or practice"
                value={form.organisation}
                onChange={(v) => setForm({ ...form, organisation: v })}
              />

              <UnderlineField
                label="What you are hoping we might make together"
                value={form.message}
                onChange={(v) => setForm({ ...form, message: v })}
                multiline
              />

              {/* Submit + alternative */}
              <div className="mt-6 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  className="group relative inline-flex items-center gap-3 border border-[#1A1A1A] bg-[#1A1A1A] px-10 py-4 text-sm font-medium tracking-wide text-[#F7F5F1] transition-colors duration-500 hover:bg-transparent hover:text-[#1A1A1A]"
                >
                  <span>Send your letter</span>
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
                </button>

                <span className="text-xs font-light text-[#8A817A]">
                  By sending, you agree to our quiet correspondence policy.
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// UnderlineField — no boxes, small-caps label above, underline animates on focus
// ============================================
function UnderlineField({
  label,
  value,
  onChange,
  type = "text",
  multiline = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  multiline?: boolean;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative flex flex-col gap-2">
      <motion.label
        initial={false}
        animate={{
          color: focused ? "#1A1A1A" : "#8A817A",
        }}
        transition={{ duration: 0.5, ease: easing.outExpo }}
        className="text-[11px] font-medium uppercase tracking-[0.25em]"
      >
        {label}
      </motion.label>

      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          rows={4}
          className="resize-none bg-transparent py-2 text-base leading-[1.5] text-[#1A1A1A] outline-none placeholder-[#8A817A] md:text-lg"
          placeholder="Begin wherever feels natural…"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="bg-transparent py-2 text-base text-[#1A1A1A] outline-none placeholder-[#8A817A] md:text-lg"
        />
      )}

      {/* Underline with focus animation */}
      <div className="relative h-px w-full bg-[#1A1A1A]/20">
        <motion.div
          initial={false}
          animate={{ scaleX: focused ? 1 : 0 }}
          transition={{ duration: 0.6, ease: easing.outExpo }}
          className="absolute inset-0 origin-left bg-[#C8522C]"
        />
      </div>
    </div>
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
