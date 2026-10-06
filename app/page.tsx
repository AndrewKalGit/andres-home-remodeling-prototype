// === CRO_DECISION_START: HomeSequence - Legitimacy, proof, then the deeper ask ===
// The page earns the right to ask. Location and the year come first, the
// estimate sits in the same view, credentials follow immediately, the craft
// story proves the work, and only then does the long form ask for a phone number.
import { CaseStudies } from "@/components/CaseStudies";
import { ContactGrid } from "@/components/ContactGrid";
import { CraftsmanshipJourney } from "@/components/CraftsmanshipJourney";
import { Footer } from "@/components/Footer";
import { HeroLayout } from "@/components/Hero";
import { LeadForm } from "@/components/LeadForm";
import { LocationReviews } from "@/components/LocationReviews";
import { QuoteGenerator } from "@/components/QuoteGenerator";
import { SiteHeader } from "@/components/SiteHeader";
import { StickyCall } from "@/components/StickyCall";
import { TrustBar } from "@/components/TrustBar";
import { homeAnnouncement, MODIFIERS } from "@/lib/estimate-engine";
import { homeReviewFeed } from "@/lib/locations";
import { site } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      <SiteHeader message={homeAnnouncement()} />
      <main id="main">
        <HeroLayout
          eyebrow={`${site.location} · Established ${site.established}`}
          title="Stairs, cabinetry, and bathrooms. Built by hand."
          body="Hale & Timber has fitted Tampa Bay houses since 1998. We mill the pieces in our shop, price them from a bill of materials, and sequence every order so the install day is quiet and the number you saw is the number we meant."
          primaryHref="#our-work"
          primaryLabel="Our Work"
          secondaryHref="#instant-estimate"
          secondaryLabel="Get Quote"
        >
          <QuoteGenerator modifierIds={[MODIFIERS.firstTime]} city={site.location} />
        </HeroLayout>
        <TrustBar />
        <LocationReviews {...homeReviewFeed()} />
        <CraftsmanshipJourney />
        <CaseStudies />
        <LeadForm modifierIds={[MODIFIERS.firstTime]} city={site.location} />
        <ContactGrid />
      </main>
      <Footer />
      <StickyCall />
    </>
  );
}
// === CRO_DECISION_END: HomeSequence ===
