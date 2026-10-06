// === CRO_DECISION_START: Footer - License, wayfinding, and the studio credit ===
// The close of the page is where a careful buyer looks for the license number
// and a way back to the proof. The studio credit stays a quiet text link so it
// does not compete with Call Now.
import { Logo } from "@/components/Logo";
import { listSeededLocations } from "@/lib/locations";
import { site } from "@/lib/site";

const anchors = [
  { href: "#our-work", label: "Our Work" },
  { href: "#our-standards", label: "Our Standards" },
  { href: "#estimate", label: "Estimate" },
  { href: "#contact", label: "Contact" },
];

export function Footer() {
  const areas = listSeededLocations();
  return (
    <footer className="bg-ink text-cream">
      <div className="mx-auto grid max-w-[1120px] gap-12 px-5 py-16 md:px-8 md:grid-cols-4">
        <div className="md:col-span-1">
          <Logo tone="cream" />
          <p className="mt-5 text-sm leading-relaxed text-cream/70">
            {site.location} · Established {site.established}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-cream/60">Licenses</p>
          <ul className="mt-4 space-y-3 text-sm">
            {site.licenses.map((license) => (
              <li key={license.id}>
                <span className="block text-cream/70">{license.name}</span>
                <span className="mt-1 block font-medium">{license.id}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-cream/60">On this page</p>
          <ul className="mt-4 space-y-2 text-sm">
            {anchors.map((anchor) => (
              <li key={anchor.href}>
                <a href={anchor.href} className="underline decoration-white/30 underline-offset-4 hover:decoration-cream">
                  {anchor.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-cream/60">Service areas</p>
          <ul className="mt-4 space-y-2 text-sm">
            {areas.map((area) => (
              <li key={area.slug}>
                <a href={`/locations/${area.slug}`} className="underline decoration-white/30 underline-offset-4 hover:decoration-cream">
                  {area.demographic}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-cream/70">
            <a href={`tel:${site.phoneTel}`} className="underline decoration-white/30 underline-offset-4 hover:decoration-cream">
              {site.phoneDisplay}
            </a>
          </p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1120px] flex-col gap-3 px-5 py-6 pb-28 text-sm text-cream/70 md:flex-row md:items-center md:justify-between md:px-8 md:pb-6">
          <p>© {new Date().getFullYear()} {site.legalName}</p>
          <a
            href="https://echowebagency.com"
            className="underline decoration-white/30 underline-offset-4 transition hover:text-cream hover:decoration-cream"
          >
            Web Design by Echo Web, LLC
          </a>
        </div>
      </div>
    </footer>
  );
}
// === CRO_DECISION_END: Footer ===
