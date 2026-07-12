import { CinematicJourney } from "@/components/cinematic/CinematicJourney";
import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Philosophy } from "@/sections/Philosophy";
import { Treatments } from "@/sections/Treatments";
import { Technology } from "@/sections/Technology";
import { Experts } from "@/sections/Experts";
import { Testimonials } from "@/sections/Testimonials";
import { Contact } from "@/sections/Contact";

export default function Home() {
  return (
    <main>
      {/* The walkthrough: five sections, five clips, one continuous shot. */}
      <CinematicJourney>
        <Hero />
        <About />
        <Philosophy />
        <Treatments />
        <Technology />
      </CinematicJourney>

      {/* Stepping out of the clinic, back into the light. */}
      <div aria-hidden className="h-40 bg-gradient-to-b from-espresso to-cream" />

      <Experts />
      <Testimonials />
      <Contact />
    </main>
  );
}
