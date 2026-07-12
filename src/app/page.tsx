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
      {/* One continuous walk: every section rides over the same video stage, so
          the clinic never drops away underneath the visitor. The clips run
          deeper into the building and then back out — see SECTION_CLIPS. */}
      <CinematicJourney>
        <Hero />
        <About />
        <Philosophy />
        <Treatments />
        <Technology />
        <Experts />
        <Testimonials />
        <Contact />
      </CinematicJourney>
    </main>
  );
}
