// === CRO_DECISION_START: HeroLayout - Legitimacy on the left, the ask on the right ===
// Location and the year answer "are you real and local?" before a price appears.
// The estimate sits in the same view so the visitor can act while that trust is
// still fresh, instead of hunting for a form under the fold.
import type { ReactNode } from "react";

export function HeroLayout({
  eyebrow,
  title,
  body,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  children,
}: {
  eyebrow: string;
  title: string;
  body: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
  children: ReactNode;
}) {
  return (
    <section className="bg-cream">
      <div className="mx-auto grid max-w-[1120px] items-start gap-12 px-5 py-14 md:px-8 md:py-16 lg:grid-cols-2 lg:gap-16 lg:py-20">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-mute">{eyebrow}</p>
          <h1 className="mt-5 font-serif text-[clamp(2.6rem,5vw,4.5rem)] leading-[1.02] tracking-[-0.03em] text-balance">
            {title}
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-pretty text-mute">{body}</p>
          <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4 text-base">
            <a href={primaryHref} className="underline decoration-brass decoration-2 underline-offset-4 transition hover:decoration-ink">
              {primaryLabel}
            </a>
            <a href={secondaryHref} className="underline decoration-brass decoration-2 underline-offset-4 transition hover:decoration-ink">
              {secondaryLabel}
            </a>
          </div>
        </div>
        <div id="instant-estimate">{children}</div>
      </div>
    </section>
  );
}
// === CRO_DECISION_END: HeroLayout ===
