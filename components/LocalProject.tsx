// === CRO_DECISION_START: LocalProject - One nearby job, told with the specs ===
// On a city page the reader is asking for evidence from their own map. A single
// project with materials, constraints, and a descriptive alt attribute is more
// convincing than a grid of unnamed rooms.
import { ImageBlock } from "@/components/ImageBlock";
import type { FeaturedWork } from "@/lib/locations";

export function LocalProject({ work }: { work: FeaturedWork }) {
  return (
    <section id="our-work" className="bg-paper">
      <div className="mx-auto grid max-w-[1120px] items-center gap-12 px-5 py-20 md:px-8 md:py-28 lg:grid-cols-2">
        <ImageBlock alt={work.imageAlt} caption={work.imageCaption} variant={work.imageVariant} />
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-mute">{work.eyebrow}</p>
          <h2 className="mt-4 font-serif text-4xl leading-tight tracking-tight text-balance">{work.title}</h2>
          {work.paragraphs.map((paragraph) => (
            <p key={paragraph} className="mt-4 leading-relaxed text-mute">
              {paragraph}
            </p>
          ))}
          <dl className="mt-8 grid gap-4 sm:grid-cols-3">
            {work.specs.map((spec) => (
              <div key={spec.label} className="border-t border-line pt-3">
                <dt className="text-xs uppercase tracking-[0.14em] text-mute">{spec.label}</dt>
                <dd className="mt-2 text-sm">{spec.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
// === CRO_DECISION_END: LocalProject ===
