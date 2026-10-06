// === CRO_DECISION_START: CityLanding - The same shop, speaking to one place ===
// A homeowner searching a city name should see that city in the headline, the
// offer, and the reviews. The route fills those slots from one location record
// so a new town is data, not a redesigned page.
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactGrid } from "@/components/ContactGrid";
import { Footer } from "@/components/Footer";
import { HeroLayout } from "@/components/Hero";
import { LeadForm } from "@/components/LeadForm";
import { LocalProject } from "@/components/LocalProject";
import { LocationReviews } from "@/components/LocationReviews";
import { QuoteGenerator } from "@/components/QuoteGenerator";
import { SiteHeader } from "@/components/SiteHeader";
import { StickyCall } from "@/components/StickyCall";
import { TrustBar } from "@/components/TrustBar";
import { MODIFIERS } from "@/lib/estimate-engine";
import { isValidSlug, listSeededLocations, resolveLocation } from "@/lib/locations";
import { site } from "@/lib/site";

type Props = { params: Promise<{ city: string }> };

export function generateStaticParams() {
  return listSeededLocations().map((location) => ({ city: location.slug }));
}

export const dynamicParams = true;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  const location = resolveLocation(city);
  if (!location) return { title: "Service area" };
  return {
    title: `Home Remodeling for ${location.demographic} Homeowners`,
    description: location.intro,
  };
}

export default async function LocationPage({ params }: Props) {
  const { city } = await params;
  if (!isValidSlug(city)) notFound();
  const location = resolveLocation(city);
  if (!location) notFound();

  return (
    <>
      <SiteHeader message={location.announcement} />
      <main id="main">
        <HeroLayout
          eyebrow={`${location.demographic}, ${location.region} · Established ${site.established}`}
          title={`Home Remodeling for ${location.demographic} Homeowners`}
          body={location.intro}
          primaryHref="#our-work"
          primaryLabel="Our Work"
          secondaryHref="#instant-estimate"
          secondaryLabel="Get Quote"
        >
          <QuoteGenerator modifierIds={[MODIFIERS.designCredit]} city={location.demographic} />
        </HeroLayout>
        <TrustBar id="our-standards" />
        <p className="bg-paper px-5 pb-8 text-sm md:px-8">
          <a
            href="/#our-standards"
            className="mx-auto block max-w-[1120px] underline decoration-brass decoration-2 underline-offset-4 hover:decoration-ink"
          >
            See how a project moves through the shop
          </a>
        </p>
        <LocationReviews
          city={location.demographic}
          reviews={location.reviews}
          googleUrl={location.googleUrl}
        />
        <LocalProject work={location.featured} />
        <LeadForm modifierIds={[MODIFIERS.designCredit]} city={location.demographic} />
        <ContactGrid />
      </main>
      <Footer />
      <StickyCall />
    </>
  );
}
// === CRO_DECISION_END: CityLanding ===
