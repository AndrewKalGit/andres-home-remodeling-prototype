// === CRO_DECISION_START: CaseStudies - One job, told with the decisions intact ===
// A gallery of finished rooms proves taste. A case study that names the well
// width, the species, and the thing that could not move proves judgment. That
// is the proof a custom buyer uses when the price is no longer the only question.
import { ScrollStory } from "@/components/ScrollStory";
import { showerCase, stairCase } from "@/lib/stories";

export function CaseStudies() {
  return (
    <section id="our-work" className="bg-cream">
      <div className="mx-auto max-w-[1120px] px-5 py-20 md:px-8 md:py-28">
        <p className="text-xs uppercase tracking-[0.18em] text-mute">See Our Work Live</p>
        <h2 className="mt-4 max-w-3xl font-serif text-4xl leading-[1.05] tracking-tight text-balance md:text-6xl">
          A Hyde Park stair, followed from the truck to the last screw.
        </h2>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mute">
          1926 bungalow. Forty-two inch well. Plaster that stayed. The geometry, the oak, and the brass were decided on a full-size rod before the first stringer was cut.
        </p>
        <ScrollStory steps={stairCase} asideLabel="Hyde Park staircase" />

        <div className="mt-20 border-t border-line pt-16 md:mt-28">
          <p className="text-xs uppercase tracking-[0.18em] text-mute">See Our Work Live</p>
          <h2 className="mt-4 max-w-3xl font-serif text-4xl leading-[1.05] tracking-tight text-balance md:text-5xl">
            A Carrollwood shower, waterproofed like a hull.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mute">
            Curbless entry, a linear drain, and joists that ran the wrong way. The stone waited until the membrane had held water for a day.
          </p>
          <ScrollStory steps={showerCase} asideLabel="Carrollwood bathroom" />
        </div>
      </div>
    </section>
  );
}
// === CRO_DECISION_END: CaseStudies ===
