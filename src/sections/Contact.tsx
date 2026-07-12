"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MaskedHeading } from "@/components/ui/MaskedHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SubmitButton } from "@/components/ui/Button";
import { CLINIC, CONTACT } from "@/lib/content";

/**
 * Frontend only, by design: there is no server to post to. The form composes a
 * WhatsApp message and hands the visitor off to it. Until a number is set in
 * `CLINIC.whatsapp`, it shows a local confirmation instead so the flow is still
 * demonstrable.
 */
export function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const message = [
      `Hello ${CLINIC.name} — I'd like to book a consultation.`,
      ``,
      `Name: ${data.get("name")}`,
      `Phone: ${data.get("phone")}`,
      `Treatment: ${data.get("treatment")}`,
      `Preferred date: ${data.get("date") || "Flexible"}`,
      data.get("message") ? `Note: ${data.get("message")}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    if (CLINIC.whatsapp) {
      window.open(
        `https://wa.me/${CLINIC.whatsapp}?text=${encodeURIComponent(message)}`,
        "_blank",
        "noopener,noreferrer",
      );
    }

    setSent(true);
  };

  return (
    <section id="contact" className="grain relative bg-cream py-32 md:py-40">
      <Container>
        <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
          <div>
            <Reveal>
              <Eyebrow>{CONTACT.eyebrow}</Eyebrow>
            </Reveal>

            <MaskedHeading
              lines={CONTACT.headline}
              accentLast
              className="mt-7 text-[clamp(2.5rem,6vw,5rem)] text-espresso"
            />

            <Reveal variant="blur-in" delay={0.15}>
              <p className="mt-8 max-w-md text-base leading-relaxed text-mocha">
                {CONTACT.body}
              </p>
            </Reveal>

            <Reveal staggerChildren delay={0.2} className="mt-14 space-y-8">
              <ContactDetail label="Call / WhatsApp" value={CLINIC.phone} />
              <ContactDetail label="Visit us" value={CLINIC.address} />
              <ContactDetail
                label="Hours"
                value={CLINIC.hours
                  .map((entry) => `${entry.days} · ${entry.time}`)
                  .join("\n")}
              />
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="rounded-3xl border border-espresso/8 bg-ivory p-8 shadow-[0_40px_100px_-60px_rgba(42,33,30,0.45)] md:p-12">
              {sent ? (
                <Confirmation
                  handedOff={Boolean(CLINIC.whatsapp)}
                  onReset={() => setSent(false)}
                />
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid gap-8 sm:grid-cols-2">
                    <Field name="name" label="Name" required />
                    <Field
                      name="phone"
                      label="Phone / WhatsApp"
                      type="tel"
                      required
                    />
                  </div>

                  <div className="grid gap-8 sm:grid-cols-2">
                    <SelectField
                      name="treatment"
                      label="Treatment"
                      options={CONTACT.treatments}
                    />
                    <Field name="date" label="Preferred date" type="date" />
                  </div>

                  <Field name="message" label="Message (optional)" textarea />

                  <SubmitButton className="w-full sm:w-auto">
                    {CONTACT.submitLabel}
                  </SubmitButton>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function ContactDetail({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-espresso/8 pt-5">
      <p className="text-eyebrow text-gold-deep">{label}</p>
      <p className="mt-3 whitespace-pre-line text-base text-espresso">
        {value}
      </p>
    </div>
  );
}

/** Shared underline-style input, in the house type. */
const FIELD_CLASS =
  "peer w-full border-b border-espresso/15 bg-transparent pt-6 pb-3 text-base text-espresso transition-colors duration-500 placeholder-shown:pt-6 focus:border-gold focus:outline-none";

const LABEL_CLASS =
  "text-eyebrow absolute top-0 left-0 text-ash transition-colors duration-500 peer-focus:text-gold-deep";

function Field({
  name,
  label,
  type = "text",
  required = false,
  textarea = false,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
}) {
  return (
    <div className="relative">
      {textarea ? (
        <textarea
          id={name}
          name={name}
          rows={3}
          required={required}
          className={`${FIELD_CLASS} resize-none`}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          required={required}
          className={FIELD_CLASS}
        />
      )}
      <label htmlFor={name} className={LABEL_CLASS}>
        {label}
      </label>
    </div>
  );
}

function SelectField({
  name,
  label,
  options,
}: {
  name: string;
  label: string;
  options: readonly string[];
}) {
  return (
    <div className="relative">
      <select
        id={name}
        name={name}
        defaultValue={options[0]}
        className={`${FIELD_CLASS} cursor-pointer appearance-none`}
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
      <label htmlFor={name} className={LABEL_CLASS}>
        {label}
      </label>
      <span
        aria-hidden
        className="pointer-events-none absolute right-1 bottom-4 text-xs text-gold"
      >
        ▾
      </span>
    </div>
  );
}

function Confirmation({
  handedOff,
  onReset,
}: {
  handedOff: boolean;
  onReset: () => void;
}) {
  return (
    <div className="flex min-h-[380px] flex-col items-center justify-center text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 text-xl text-gold">
        ✓
      </span>
      <h3 className="mt-7 font-[family-name:var(--font-display)] text-2xl font-light text-espresso">
        {handedOff ? "Opening WhatsApp…" : "Request noted."}
      </h3>
      <p className="mt-4 max-w-xs text-sm leading-relaxed text-mocha">
        {handedOff
          ? "Send the pre-filled message and we'll confirm your consultation within working hours."
          : "Demo mode — add the clinic's WhatsApp number in lib/content.ts to hand this off for real."}
      </p>
      <button
        type="button"
        onClick={onReset}
        className="text-eyebrow mt-8 text-gold-deep transition-transform duration-500 hover:translate-x-1"
      >
        Send another →
      </button>
    </div>
  );
}
