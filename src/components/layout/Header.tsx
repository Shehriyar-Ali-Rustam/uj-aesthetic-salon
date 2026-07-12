"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { CLINIC, NAV_LINKS } from "@/lib/content";
import { cn } from "@/lib/utils";

/** Past this many pixels the header adopts its glass state. */
const GLASS_AT = 40;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > GLASS_AT);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The mobile sheet takes the whole screen; don't let the page scroll under it.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const onLight = scrolled || menuOpen;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,box-shadow,padding] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
          onLight
            ? "glass-light py-4 shadow-[0_1px_0_0_rgba(42,33,30,0.06)]"
            : "bg-transparent py-7",
        )}
      >
        <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-6 md:px-10">
          <Link
            href="#top"
            aria-label={`${CLINIC.name} — home`}
            className={cn(
              "font-[family-name:var(--font-display)] text-lg leading-none font-medium tracking-[0.02em] transition-colors duration-700",
              onLight ? "text-espresso" : "text-ivory",
            )}
          >
            {CLINIC.shortName}
            <span className="text-gold">.</span>
            <span
              className={cn(
                "ml-2 align-middle text-[0.6rem] font-normal tracking-[0.3em] uppercase transition-colors duration-700",
                onLight ? "text-mocha" : "text-ivory/60",
              )}
            >
              Aesthetics
            </span>
          </Link>

          <nav className="hidden items-center gap-9 lg:flex">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.href} href={link.href} onLight={onLight}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="#contact"
              className={cn(
                "hidden rounded-full border px-6 py-3 font-[family-name:var(--font-display)] text-[0.7rem] font-medium tracking-[0.18em] uppercase transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 sm:inline-flex",
                onLight
                  ? "border-espresso/15 text-espresso hover:border-gold hover:bg-gold hover:text-ivory"
                  : "border-ivory/35 text-ivory hover:border-gold hover:bg-gold",
              )}
            >
              Book Appointment
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className={cn(
                "flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-full border transition-colors duration-500 lg:hidden",
                onLight ? "border-espresso/15" : "border-ivory/30",
              )}
            >
              <span
                className={cn(
                  "block h-px w-4 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  onLight ? "bg-espresso" : "bg-ivory",
                  menuOpen && "translate-y-[3px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "block h-px w-4 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  onLight ? "bg-espresso" : "bg-ivory",
                  menuOpen && "-translate-y-[3px] -rotate-45",
                )}
              />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-cream px-6 pt-28 lg:hidden"
          >
            <nav className="flex flex-col">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.06 * i + 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-display block border-b border-espresso/8 py-5 text-4xl text-espresso"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function NavLink({
  href,
  children,
  onLight,
}: {
  href: string;
  children: React.ReactNode;
  onLight: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative py-1 font-[family-name:var(--font-display)] text-[0.72rem] font-medium tracking-[0.2em] uppercase transition-colors duration-700",
        onLight
          ? "text-mocha hover:text-espresso"
          : "text-ivory/75 hover:text-ivory",
      )}
    >
      {children}
      {/* Underline draws from the left on hover. */}
      <span
        aria-hidden
        className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
      />
    </Link>
  );
}
