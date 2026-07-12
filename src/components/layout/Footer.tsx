"use client";

import { useState } from "react";
import Link from "next/link";
import { CLINIC, FOOTER, NAV_LINKS } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";

export function Footer() {
  return (
    <footer className="grain relative overflow-hidden bg-espresso px-6 pt-24 pb-10 text-ivory md:px-10">
      <div className="mx-auto w-full max-w-[1440px]">
        <div className="grid gap-16 border-b border-ivory/10 pb-16 lg:grid-cols-[1.4fr_1fr_1.2fr]">
          <Reveal>
            <Link
              href="#top"
              className="font-[family-name:var(--font-display)] text-2xl font-light tracking-[0.02em]"
            >
              {CLINIC.shortName}
              <span className="text-gold">.</span>
              <span className="ml-2 align-middle text-[0.6rem] tracking-[0.3em] text-ivory/50 uppercase">
                Aesthetics
              </span>
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-ivory/55">
              {CLINIC.description}
            </p>
            <address className="mt-8 space-y-1 text-sm text-ivory/55 not-italic">
              <p>{CLINIC.address}</p>
              <p>{CLINIC.phone}</p>
              <p>{CLINIC.email}</p>
            </address>
          </Reveal>

          <Reveal delay={0.1}>
            <h3 className="text-eyebrow text-gold">Explore</h3>
            <ul className="mt-7 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm text-ivory/65 transition-colors duration-500 hover:text-ivory"
                  >
                    <span className="h-px w-0 bg-gold transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-4" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="text-eyebrow mt-10 text-gold">Follow</h3>
            <ul className="mt-6 space-y-3">
              {CLINIC.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    className="group inline-flex items-center gap-2 text-sm text-ivory/65 transition-colors duration-500 hover:text-ivory"
                  >
                    <span className="h-px w-0 bg-gold transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-4" />
                    {social.label}
                    <span className="text-ivory/30">{social.handle}</span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.2}>
            <Newsletter />

            <div className="mt-10">
              <h3 className="text-eyebrow text-gold">Hours</h3>
              <ul className="mt-6 space-y-2">
                {CLINIC.hours.map((entry) => (
                  <li
                    key={entry.days}
                    className="flex justify-between gap-6 border-b border-ivory/8 pb-2 text-sm"
                  >
                    <span className="text-ivory/55">{entry.days}</span>
                    <span className="text-ivory/80">{entry.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <div className="flex flex-col gap-4 pt-8 text-xs text-ivory/35 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {CLINIC.name}. All rights reserved.
          </p>
          <p className="max-w-md md:text-right">{FOOTER.disclaimer}</p>
        </div>
      </div>
    </footer>
  );
}

/**
 * Frontend only — there is no backend to post to, so this just acknowledges the
 * address locally. Wire it to a provider when one exists.
 */
function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div>
      <h3 className="text-eyebrow text-gold">Newsletter</h3>
      <p className="mt-6 font-[family-name:var(--font-display)] text-xl font-light">
        {FOOTER.newsletter.title}
      </p>
      <p className="mt-2 text-sm text-ivory/50">{FOOTER.newsletter.body}</p>

      {submitted ? (
        <p className="mt-6 text-sm text-gold">
          Thank you — you&rsquo;re on the list.
        </p>
      ) : (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setSubmitted(true);
          }}
          className="group mt-6 flex items-center gap-3 border-b border-ivory/20 pb-3 transition-colors duration-500 focus-within:border-gold"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder={FOOTER.newsletter.placeholder}
            aria-label={FOOTER.newsletter.placeholder}
            className="w-full bg-transparent text-sm text-ivory placeholder:text-ivory/30 focus:outline-none"
          />
          <button
            type="submit"
            className="font-[family-name:var(--font-display)] text-[0.7rem] tracking-[0.2em] text-gold uppercase transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:translate-x-1"
          >
            {FOOTER.newsletter.cta}
          </button>
        </form>
      )}
    </div>
  );
}
