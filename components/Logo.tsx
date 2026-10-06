// === CRO_DECISION_START: Wordmark - A shop name, not a stock icon ===
// The first branded mark on the page has to feel like a workshop that will
// still exist next year. A monogram plus the full name gives a placeholder
// logo the client can swap without disturbing the header layout.
import { site } from "@/lib/site";

export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`grid h-11 w-11 place-items-center rounded-full border border-current text-[11px] tracking-[0.14em] ${className}`}
    >
      H&amp;T
    </span>
  );
}

export function Logo({ tone = "ink" }: { tone?: "ink" | "cream" }) {
  const color = tone === "cream" ? "text-cream" : "text-ink";
  return (
    <a href="/" className={`group flex items-center gap-3 ${color}`}>
      <LogoMark />
      <span className="leading-none">
        <span className="block font-serif text-[1.35rem] tracking-tight">{site.name}</span>
        <span className={`mt-1 block text-[10px] uppercase tracking-[0.22em] ${tone === "cream" ? "text-cream/70" : "text-mute"}`}>
          Custom Remodeling
        </span>
      </span>
    </a>
  );
}
// === CRO_DECISION_END: Wordmark ===
