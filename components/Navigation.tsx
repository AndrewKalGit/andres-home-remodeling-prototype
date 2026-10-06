// === CRO_DECISION_START: Navigation - Proof links, and one unmistakable call ===
// "Our Work" and "Our Standards" ask the visitor to judge the shop before the
// sale. A single high-contrast Call Now button is the action for people who
// are already convinced and should not have to hunt for a phone number.
import { Logo } from "@/components/Logo";
import { site } from "@/lib/site";

const links = [
  { href: "#our-work", label: "Our Work" },
  { href: "#our-standards", label: "Our Standards" },
];

export function Navigation() {
  return (
    <nav aria-label="Primary" className="border-b border-line bg-paper/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1120px] items-center justify-between gap-4 px-5 md:px-8">
        <Logo />
        <div className="flex items-center gap-6 md:gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hidden text-sm tracking-wide underline decoration-transparent underline-offset-4 transition hover:decoration-ink sm:inline"
            >
              {link.label}
            </a>
          ))}
          <a
            href={`tel:${site.phoneTel}`}
            className="inline-flex h-11 items-center bg-ink px-4 text-sm font-medium tracking-wide text-cream transition duration-150 hover:bg-ember sm:px-5"
          >
            Call Now
          </a>
        </div>
      </div>
      <div className="mx-auto flex max-w-[1120px] gap-6 border-t border-line px-5 py-3 sm:hidden">
        {links.map((link) => (
          <a key={link.href} href={link.href} className="text-sm tracking-wide underline decoration-brass underline-offset-4">
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
// === CRO_DECISION_END: Navigation ===
