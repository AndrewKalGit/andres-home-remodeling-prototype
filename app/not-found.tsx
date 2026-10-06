import { Footer } from "@/components/Footer";
import { SiteHeader } from "@/components/SiteHeader";
import { homeAnnouncement } from "@/lib/estimate-engine";

export default function NotFound() {
  return (
    <>
      <SiteHeader message={homeAnnouncement()} />
      <main id="main" className="mx-auto max-w-[1120px] px-5 py-24 md:px-8">
        <p className="text-xs uppercase tracking-[0.18em] text-mute">Missing page</p>
        <h1 className="mt-4 font-serif text-5xl tracking-tight">That page is not on the bench.</h1>
        <p className="mt-5 max-w-md leading-relaxed text-mute">
          The shop is still here. Start from the Tampa Bay page, or open a city we already build in.
        </p>
        <a href="/" className="mt-8 inline-block underline decoration-brass decoration-2 underline-offset-4">
          Back to Hale &amp; Timber
        </a>
      </main>
      <Footer />
    </>
  );
}
