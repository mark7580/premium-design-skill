// ============================================
// Component: Editorial Masthead Navigation
// Best for: Premium brands, creative studios, luxury products, editorial publications
// Key features: Serif italic wordmark, uppercase micro-label links, two-tone animated
//   underline on hover, scroll-aware bottom hairline reveal, full-screen mobile overlay
//   with large display links (not dropdown), reduced motion support.
// Dependencies: framer-motion
// Fonts: Fraunces (wordmark), Inter (nav labels)
// ============================================

"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const easing = {
  outExpo: [0.16, 1, 0.3, 1] as const,
};

type NavItem = { label: string; href: string };

const NAV_ITEMS: NavItem[] = [
  { label: "Collection", href: "#collection" },
  { label: "Practice", href: "#practice" },
  { label: "Journal", href: "#journal" },
  { label: "Contact", href: "#contact" },
];

export function EditorialMasthead() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="relative mx-auto flex max-w-[90rem] items-center justify-between px-6 py-6 md:px-12 md:py-8 lg:px-20">
          {/* Wordmark — serif italic display */}
          <a href="/" className="group relative flex items-center gap-3">
            <span
              className="font-display text-xl italic text-[#1A1A1A] md:text-2xl"
              style={{ fontWeight: 400, letterSpacing: "-0.01em" }}
            >
              Maison
            </span>
            <span className="hidden h-4 w-px bg-[#1A1A1A]/20 md:block" />
            <span className="hidden text-[11px] font-medium uppercase tracking-[0.25em] text-[#5C5550] md:inline">
              Studio · EST. MMXVII
            </span>
          </a>

          {/* Center nav — desktop */}
          <nav className="hidden items-center gap-10 md:flex">
            {NAV_ITEMS.map((item) => (
              <MastheadLink key={item.href} item={item} />
            ))}
          </nav>

          {/* Right CTA — desktop */}
          <div className="hidden items-center gap-6 md:flex">
            <a
              href="#book"
              className="group relative inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.25em] text-[#1A1A1A]"
            >
              <span>Book a consultation</span>
              <span className="relative block h-px w-8 overflow-hidden bg-[#1A1A1A]/20">
                <span className="absolute inset-y-0 left-0 w-full origin-left scale-x-0 bg-[#C8522C] transition-transform duration-500 group-hover:scale-x-100" />
              </span>
            </a>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-3 md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <span className="text-[11px] font-medium uppercase tracking-[0.25em] text-[#1A1A1A]">
              {open ? "Close" : "Menu"}
            </span>
            <span className="relative flex h-3 w-6 flex-col justify-between">
              <motion.span
                animate={{ rotate: open ? 45 : 0, y: open ? 5 : 0 }}
                transition={{ duration: 0.4, ease: easing.outExpo }}
                className="h-px w-full bg-[#1A1A1A]"
              />
              <motion.span
                animate={{ rotate: open ? -45 : 0, y: open ? -5 : 0 }}
                transition={{ duration: 0.4, ease: easing.outExpo }}
                className="h-px w-full bg-[#1A1A1A]"
              />
            </span>
          </button>
        </div>

        {/* Scroll-aware hairline */}
        <motion.div
          initial={false}
          animate={{ opacity: scrolled ? 1 : 0 }}
          transition={{ duration: 0.5, ease: easing.outExpo }}
          className="h-px w-full bg-[#1A1A1A]/15"
        />

        {/* Backdrop blur when scrolled */}
        <motion.div
          aria-hidden
          initial={false}
          animate={{ opacity: scrolled ? 1 : 0 }}
          transition={{ duration: 0.5, ease: easing.outExpo }}
          className="absolute inset-0 -z-10 bg-[#F7F5F1]/85 backdrop-blur-md"
        />
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && <MobileOverlay onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  );
}

// ============================================
// Masthead nav link — two-tone animated underline
// ============================================
function MastheadLink({ item }: { item: NavItem }) {
  return (
    <a
      href={item.href}
      className="group relative text-[11px] font-medium uppercase tracking-[0.25em] text-[#1A1A1A]"
    >
      <span className="relative inline-block py-1">
        {item.label}
        <span className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-[#1A1A1A]/30 transition-transform duration-500 group-hover:origin-left group-hover:scale-x-100" />
        <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-[#C8522C] transition-transform duration-500 delay-[250ms] group-hover:scale-x-100" />
      </span>
    </a>
  );
}

// ============================================
// Mobile overlay — full screen, large display links
// ============================================
function MobileOverlay({ onClose }: { onClose: () => void }) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: prefersReduced ? 1 : 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: easing.outExpo }}
      className="fixed inset-0 z-40 bg-[#F7F5F1] md:hidden"
    >
      <div className="flex h-full flex-col px-6 pb-10 pt-32">
        <nav className="flex flex-1 flex-col justify-center">
          <ul className="flex flex-col gap-2">
            {NAV_ITEMS.map((item, i) => (
              <li key={item.href} className="overflow-hidden">
                <motion.a
                  href={item.href}
                  onClick={onClose}
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  exit={{ y: "110%" }}
                  transition={{
                    duration: 0.9,
                    delay: 0.1 + i * 0.08,
                    ease: easing.outExpo,
                  }}
                  className="block font-display italic text-[#1A1A1A]"
                  style={{
                    fontSize: "clamp(3rem, 14vw, 6rem)",
                    lineHeight: 1,
                    fontWeight: 400,
                    letterSpacing: "-0.025em",
                  }}
                >
                  {item.label}
                </motion.a>
              </li>
            ))}
          </ul>
        </nav>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center justify-between border-t border-[#1A1A1A]/10 pt-6 text-[11px] font-medium uppercase tracking-[0.25em] text-[#5C5550]"
        >
          <span>Amsterdam · Paris</span>
          <a href="mailto:hello@maison.studio" className="text-[#1A1A1A]">
            hello@maison.studio
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
}
