// === CRO_DECISION_START: StickyCall - The thumb's only job on a phone ===
// On a small screen the nav call button is easy to lose under the story.
// A full-width Call Now fixed to the bottom keeps the highest-intent action
// under the thumb for the entire visit.
import { site } from "@/lib/site";

export function StickyCall() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-ink p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden">
      <a
        href={`tel:${site.phoneTel}`}
        className="flex h-14 items-center justify-center bg-cream text-base font-medium tracking-wide text-ink transition duration-150 hover:bg-brass-soft"
      >
        Call Now · {site.phoneDisplay}
      </a>
    </div>
  );
}
// === CRO_DECISION_END: StickyCall ===
