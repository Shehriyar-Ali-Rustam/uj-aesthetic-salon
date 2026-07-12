/**
 * Single source of truth for every word on the page.
 *
 * Anything wrapped in [square brackets] is a placeholder the clinic still has
 * to supply — search for "[" before going live.
 */

export const CLINIC = {
  name: "Uj's Aesthetics",
  shortName: "Uj's",
  tagline: "Skin & Aesthetics · Bahria Town",
  description:
    "A boutique skin & aesthetics clinic in Bahria Town — where science meets artistry.",
  /** Country code, no "+". Empty string renders the form in demo mode. */
  whatsapp: "",
  phone: "[Phone — edit]",
  email: "[Email — edit]",
  address: "[Plaza / street address], Bahria Town, [City]",
  hours: [
    { days: "Monday – Saturday", time: "[11:00 – 20:00]" },
    { days: "Friday break & Sunday", time: "[edit]" },
  ],
  socials: [
    { label: "Instagram", handle: "[@ujsaesthetics]", href: "#" },
    { label: "Facebook", handle: "[/ujsaesthetics]", href: "#" },
    { label: "WhatsApp", handle: "[Add number]", href: "#" },
  ],
} as const;

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Philosophy", href: "#philosophy" },
  { label: "Treatments", href: "#treatments" },
  { label: "Technology", href: "#technology" },
  { label: "Experts", href: "#experts" },
  { label: "Contact", href: "#contact" },
] as const;

export const HERO = {
  eyebrow: "Skin & Aesthetics · Bahria Town",
  /** Rendered one masked line at a time. */
  headline: ["Advanced", "aesthetic care."],
  subtitle:
    "Luxury treatments crafted with precision — where science meets artistry, and every plan is made for your skin alone.",
  cta: { label: "Book Consultation", href: "#contact" },
  secondaryCta: { label: "Explore Treatments", href: "#treatments" },
  scrollHint: "Scroll to walk through",
} as const;

export const ABOUT = {
  eyebrow: "The Clinic",
  headline: ["A calm space,", "built for skin."],
  body: "Step past the reception and the noise of Bahria Town falls away. Warm plaster, soft light and quiet rooms — an environment designed so that clinical precision never has to feel clinical.",
  stats: [
    { value: 1000, suffix: "+", label: "Clients cared for" },
    { value: 8, suffix: "", label: "Years of practice" },
    { value: 20, suffix: "+", label: "Treatments offered" },
  ],
  footnote: "Illustrative figures — replace with the clinic's real numbers.",
} as const;

export const PHILOSOPHY = {
  eyebrow: "Our Philosophy",
  /** Line breaks are authored, not computed — this is a pull quote. */
  quote: [
    "True beauty isn't changed —",
    "it's revealed. Our work is",
    "simply to bring yours to light.",
  ],
  attribution: "The Uj's Aesthetics philosophy",
  pillars: [
    {
      title: "Evidence first",
      body: "Every protocol is grounded in dermatological evidence, not trend cycles.",
    },
    {
      title: "An artist's eye",
      body: "Proportion, balance and restraint — enhancement you feel before you see.",
    },
    {
      title: "Your skin, your plan",
      body: "No copy-paste routines. Your skin sets the course, never a menu.",
    },
  ],
} as const;

export const TREATMENTS = {
  eyebrow: "Signature Treatments",
  headline: ["Made for", "your skin."],
  intro:
    "Every journey begins with a consultation — your specialist maps a plan across these pillars of care.",
  items: [
    {
      index: "01",
      title: "HydraFacial & Glow Facials",
      body: "Deep-cleanse, hydrate and illuminate in one relaxing session — instant dewy glow, zero downtime.",
    },
    {
      index: "02",
      title: "Laser Hair Removal",
      body: "Smooth, lasting results with medical-grade lasers, calibrated safely for South Asian skin tones.",
    },
    {
      index: "03",
      title: "Skin Brightening & Drips",
      body: "Glutathione and vitamin infusions that support a clearer, more even and radiant complexion.",
    },
    {
      index: "04",
      title: "Anti-Ageing — Botox & Fillers",
      body: "Subtle, precise enhancement that softens lines and restores volume — you, only rested.",
    },
    {
      index: "05",
      title: "Microneedling & PRP",
      body: "Collagen-boosting renewal for texture, scars and overall firmness — powered by your own biology.",
    },
    {
      index: "06",
      title: "Chemical Peels & Acne Care",
      body: "Clinically guided peels and regimens that calm breakouts and refine tone and texture.",
    },
    {
      index: "07",
      title: "Pigmentation & Melasma",
      body: "Targeted protocols for stubborn pigmentation — patient, safe, and built for lasting evenness.",
    },
    {
      index: "08",
      title: "Hair Restoration",
      body: "PRP and medical therapies to strengthen, thicken and restore confidence at the root.",
    },
  ],
} as const;

export const TECHNOLOGY = {
  eyebrow: "Technology",
  headline: ["Precision you", "can feel."],
  body: "Modern, calibrated devices — maintained, tested and operated only by trained hands. The equipment is quiet, exacting and safe; the results speak later.",
  points: [
    {
      title: "Clinical hygiene",
      body: "Hospital-grade sterilisation and single-use consumables, always.",
    },
    {
      title: "Latest equipment",
      body: "Calibrated devices chosen for precision, comfort and safety.",
    },
    {
      title: "Certified specialists",
      body: "Qualified, experienced hands guiding every treatment and plan.",
    },
  ],
} as const;

export const EXPERTS = {
  eyebrow: "Meet Our Experts",
  headline: ["In careful", "hands."],
  people: [
    {
      name: "[Doctor Name]",
      role: "Lead Aesthetic Physician",
      credentials: "[MBBS, Dip. Aesthetic Medicine — edit]",
      bio: "Leads every consultation personally — listening first, then designing a plan that respects both your skin and your time.",
      focus: "[Special interest, e.g. pigmentation in South Asian skin]",
    },
    {
      name: "[Specialist Name]",
      role: "Senior Aesthetician",
      credentials: "[Certification / diploma — edit]",
      bio: "Delivers the clinic's facial and laser programmes with a steady, unhurried hand and an eye for detail.",
      focus: "[Years of experience / affiliations — edit]",
    },
    {
      name: "[Specialist Name]",
      role: "Clinical Coordinator",
      credentials: "[Certification / diploma — edit]",
      bio: "Guides you from first message to final session — scheduling, aftercare and everything between.",
      focus: "[Special interest — edit]",
    },
  ],
} as const;

export const TESTIMONIALS = {
  eyebrow: "Kind Words",
  headline: ["Loved in", "Bahria Town."],
  items: [
    {
      quote:
        "The HydraFacial left my skin glowing for weeks. The clinic feels calm, spotless and genuinely caring.",
      author: "A. K.",
      location: "Bahria Town",
    },
    {
      quote:
        "Honest advice, no upselling. My pigmentation plan was explained step by step — and it worked.",
      author: "S. R.",
      location: "Rawalpindi",
    },
    {
      quote:
        "Professional, gentle and precise. The most comfortable laser sessions I've had anywhere.",
      author: "M. T.",
      location: "Islamabad",
    },
  ],
  footnote: "Sample testimonials — replace with real, consented client reviews.",
} as const;

export const CONTACT = {
  eyebrow: "Book a Consultation",
  headline: ["Ready to", "glow?"],
  body: "Tell us a little about you — we'll confirm your consultation on WhatsApp within working hours.",
  treatments: [
    "General consultation",
    "HydraFacial / Glow Facial",
    "Laser Hair Removal",
    "Skin Brightening / Drips",
    "Botox & Fillers",
    "Microneedling & PRP",
    "Chemical Peel / Acne Care",
    "Pigmentation & Melasma",
    "Hair Restoration",
  ],
  submitLabel: "Book on WhatsApp",
} as const;

export const FOOTER = {
  disclaimer:
    "Results vary by individual. Consultation required for all medical treatments.",
  newsletter: {
    title: "Quiet letters, rarely sent.",
    body: "Seasonal skin guidance and clinic news. No noise.",
    placeholder: "Email address",
    cta: "Subscribe",
  },
} as const;
