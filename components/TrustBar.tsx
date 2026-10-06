// === CRO_DECISION_START: TrustBar - Credentials before the next scroll ===
// Right after the estimate, the visitor is asking whether the shop is real.
// Three concrete claims — homeowners, hand-made parts, and a license — answer
// that question before the longer story begins.
import { site } from "@/lib/site";

const metrics = [
  `${site.homeownersLabel} Happy Homeowners`,
  "100% Custom Hand-Made Parts",
  "Fully Insured & Licensed",
];

export function TrustBar({ id }: { id?: string }) {
  return (
    <section id={id} aria-label="Shop credentials" className="border-y border-line bg-paper">
      <ul className="mx-auto grid max-w-[1120px] divide-y divide-line md:grid-cols-3 md:divide-x md:divide-y-0">
        {metrics.map((metric) => (
          <li key={metric} className="px-6 py-8 md:px-8 md:py-10">
            <p className="font-serif text-3xl leading-tight tracking-tight md:text-4xl">{metric}</p>
            {metric.startsWith("Fully") ? (
              <p className="mt-3 text-sm tracking-wide text-mute">{site.licenses.map((license) => license.id).join(" · ")}</p>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
}
// === CRO_DECISION_END: TrustBar ===
