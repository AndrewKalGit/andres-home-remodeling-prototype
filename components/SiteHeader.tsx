// === CRO_DECISION_START: StickyHeader - Keep the offer and the phone in reach ===
// Once a visitor scrolls into the work, the reason to act and the way to act
// should still be on screen. A sticky stack holds the promotion and the call
// button without pushing the story down the page.
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Navigation } from "@/components/Navigation";

export function SiteHeader({ message }: { message: string }) {
  return (
    <header className="sticky top-0 z-40">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-card focus:px-4 focus:py-2"
      >
        Skip to content
      </a>
      <AnnouncementBar message={message} />
      <Navigation />
    </header>
  );
}
// === CRO_DECISION_END: StickyHeader ===
