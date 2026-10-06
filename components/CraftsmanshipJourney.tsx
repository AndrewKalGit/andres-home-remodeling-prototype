// === CRO_DECISION_START: CraftsmanshipJourney - The dirty work, told in order ===
// High-ticket remodeling is a trust sale. Walking from raw timber through the
// bill of materials to the install lets a homeowner picture the crew in the
// house, which is the moment they decide the shop is careful enough to hire.
import { ScrollStory } from "@/components/ScrollStory";
import { journeySteps } from "@/lib/stories";

export function CraftsmanshipJourney() {
  return (
    <section id="our-standards" className="bg-paper">
      <div className="mx-auto max-w-[1120px] px-5 py-20 md:px-8 md:py-28">
        <p className="text-xs uppercase tracking-[0.18em] text-mute">Our Standards</p>
        <h2 className="mt-4 max-w-3xl font-serif text-4xl leading-[1.05] tracking-tight text-balance md:text-6xl">
          The craftsmanship journey, from raw timber to the last screw.
        </h2>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mute">
          This is the shop sequence: measure the house, acclimate the wood, write the bill of materials, cut from a full-size rod, finish off site, then scribe the piece into the room you already live in.
        </p>
        <ScrollStory steps={journeySteps} asideLabel="Shop sequence" />
      </div>
    </section>
  );
}
// === CRO_DECISION_END: CraftsmanshipJourney ===
