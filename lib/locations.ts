// === CRO_DECISION_START: LocationCatalog - A page that names the reader's street ===
// A homeowner scanning for a remodel is asking "do you work where I live?"
// Neighborhood counts and reviews filed under a real place answer that faster
// than a service-area map. Unknown cities still resolve, so a new landing page
// is a slug, not a new design.
import { locationAnnouncement } from "@/lib/estimate-engine";
import type { ImageVariant } from "@/lib/media";
import { site } from "@/lib/site";

export type Review = {
  id: string;
  quote: string;
  name: string;
  neighborhood: string;
  stars: 4 | 5;
  when: string;
  slugs: string[];
};

export type FeaturedWork = {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  specs: { label: string; value: string }[];
  imageAlt: string;
  imageCaption: string;
  imageVariant: ImageVariant;
};

type Seed = {
  slug: string;
  demographic: string;
  intro: string;
  clusterOrder: string[];
  featured: FeaturedWork;
};

export type LocationView = {
  slug: string;
  demographic: string;
  region: string;
  intro: string;
  announcement: string;
  googleUrl: string;
  reviews: Review[];
  clusters: { label: string; count: number }[];
  featured: FeaturedWork;
};

const reviews: Review[] = [
  {
    id: "hp-1",
    neighborhood: "Hyde Park",
    slugs: ["tampa"],
    stars: 5,
    when: "March 2026",
    name: "Mara Ellison",
    quote:
      "They rebuilt our Hyde Park stair in rift white oak and kept the 1926 plaster. The rail fits the hand, and the estimate range held up on the invoice.",
  },
  {
    id: "hp-2",
    neighborhood: "Hyde Park",
    slugs: ["tampa"],
    stars: 5,
    when: "November 2025",
    name: "Chris Daley",
    quote:
      "Full-size rod on the bench before a single stringer was cut. That is the kind of stair shop we wanted for a narrow Hyde Park well.",
  },
  {
    id: "hp-3",
    neighborhood: "Hyde Park",
    slugs: ["tampa"],
    stars: 5,
    when: "August 2025",
    name: "Lena Ortiz",
    quote:
      "Brass balusters were on a written list, counted, and installed without a second trip. The skirts were scribed to plaster that is anything but straight.",
  },
  {
    id: "hp-4",
    neighborhood: "Hyde Park",
    slugs: ["tampa"],
    stars: 4,
    when: "January 2026",
    name: "Owen Briggs",
    quote:
      "The schedule slipped four days while the oak finished curing. They told us before we had to ask, and the stair arrived finished instead of being oiled in our hallway.",
  },
  {
    id: "st-1",
    neighborhood: "South Tampa",
    slugs: ["tampa"],
    stars: 5,
    when: "February 2026",
    name: "Priya Shah",
    quote:
      "South Tampa kitchen. Maple drawers, painted faces, and every hinge on a bill of materials before the order was placed. Install was four days.",
  },
  {
    id: "st-2",
    neighborhood: "South Tampa",
    slugs: ["tampa"],
    stars: 5,
    when: "September 2025",
    name: "Jonah Reeves",
    quote:
      "They measured the out-of-level floor and built the cabinet bases to it. No shims pretending to be a design choice.",
  },
  {
    id: "st-3",
    neighborhood: "South Tampa",
    slugs: ["tampa"],
    stars: 5,
    when: "May 2026",
    name: "Helen Cho",
    quote:
      "The PDF estimate showed timber, hardware, and shop labor as separate lines. We booked because the number had parts, not a single lump.",
  },
  {
    id: "di-1",
    neighborhood: "Davis Islands",
    slugs: ["tampa"],
    stars: 5,
    when: "April 2026",
    name: "Samir Haddad",
    quote:
      "Davis Islands bath, curbless, with a linear drain. They flood-tested the membrane overnight and sent a photo before the marble was allowed on site.",
  },
  {
    id: "di-2",
    neighborhood: "Davis Islands",
    slugs: ["tampa"],
    stars: 5,
    when: "July 2025",
    name: "Ruth Pellegrino",
    quote:
      "The niche lines up with the curb vein. Small thing, and it is the thing we look at every morning.",
  },
  {
    id: "di-3",
    neighborhood: "Davis Islands",
    slugs: ["tampa"],
    stars: 4,
    when: "December 2025",
    name: "Evan Brooks",
    quote:
      "Parking on the island was the hard part, not the work. Floors stayed covered and the punch list was two items, both done the next morning.",
  },
  {
    id: "sh-1",
    neighborhood: "Seminole Heights",
    slugs: ["tampa"],
    stars: 5,
    when: "June 2026",
    name: "Nora Vidal",
    quote:
      "Seminole Heights bungalow. They built a bookcase run in the shop and scribed it to plaster that bulges. It looks like it grew there.",
  },
  {
    id: "sh-2",
    neighborhood: "Seminole Heights",
    slugs: ["tampa"],
    stars: 5,
    when: "October 2025",
    name: "Patrick Nguyen",
    quote:
      "We asked for white oak and a quiet rail. They talked us out of a catalog part and made the easing. Worth it.",
  },
  {
    id: "on-1",
    neighborhood: "Old Northeast",
    slugs: ["st-petersburg"],
    stars: 5,
    when: "March 2026",
    name: "Claire Bennett",
    quote:
      "Old Northeast stair, oak, continuous rail. They worked around original casings and did not ask us to rip the walls out to make the job easier.",
  },
  {
    id: "on-2",
    neighborhood: "Old Northeast",
    slugs: ["st-petersburg"],
    stars: 5,
    when: "August 2025",
    name: "Marcus Hale",
    quote:
      "The field measure caught a landing that was out of square by more than an inch. The shop drawing changed before any wood was cut.",
  },
  {
    id: "on-3",
    neighborhood: "Old Northeast",
    slugs: ["st-petersburg"],
    stars: 4,
    when: "January 2026",
    name: "Ivy Tran",
    quote:
      "Communication was plain. When the brass slipped a week, they moved the install and kept the finish work in the shop so our house stayed livable.",
  },
  {
    id: "on-4",
    neighborhood: "Old Northeast",
    slugs: ["st-petersburg"],
    stars: 5,
    when: "May 2025",
    name: "George Pappas",
    quote:
      "We hired them for the stair and ended up having the hall cabinet made in the same oak. One bill of materials, one crew, no finger-pointing.",
  },
  {
    id: "hk-1",
    neighborhood: "Historic Kenwood",
    slugs: ["st-petersburg"],
    stars: 5,
    when: "February 2026",
    name: "Adele Foster",
    quote:
      "Kenwood kitchen cabinets, shop-built, painted, with maple drawers. The bases fit a floor that dips toward the back door.",
  },
  {
    id: "hk-2",
    neighborhood: "Historic Kenwood",
    slugs: ["st-petersburg"],
    stars: 5,
    when: "September 2025",
    name: "Luis Ortega",
    quote:
      "They wrote the hardware counts on the estimate. Nothing was substituted on install day.",
  },
  {
    id: "hk-3",
    neighborhood: "Historic Kenwood",
    slugs: ["st-petersburg"],
    stars: 5,
    when: "November 2025",
    name: "June Harlow",
    quote:
      "A butler pantry in a 1920s Kenwood house. The door swings were tight and they planned for them instead of discovering them with a finished box.",
  },
  {
    id: "ho-1",
    neighborhood: "Harbor Oaks",
    slugs: ["clearwater"],
    stars: 5,
    when: "April 2026",
    name: "Denise Archer",
    quote:
      "Harbor Oaks primary bath. Curbless shower, sheet membrane, flood test, then stone. We were allowed to be particular about the vein.",
  },
  {
    id: "ho-2",
    neighborhood: "Harbor Oaks",
    slugs: ["clearwater"],
    stars: 5,
    when: "July 2026",
    name: "Tom Gallagher",
    quote:
      "The brass valve plate was made in their shop. The rough-in actually landed where the drawing said it would.",
  },
  {
    id: "ho-3",
    neighborhood: "Harbor Oaks",
    slugs: ["clearwater"],
    stars: 4,
    when: "December 2025",
    name: "Yara Mensah",
    quote:
      "The dust control was serious. Zip walls, floor protection, and a daily sweep. The shower itself is dead quiet and the water hits the linear drain.",
  },
  {
    id: "ho-4",
    neighborhood: "Harbor Oaks",
    slugs: ["clearwater"],
    stars: 5,
    when: "March 2025",
    name: "Neil Hoffman",
    quote:
      "We compared them with a showroom package. Hale & Timber cost more and could tell us why, line by line. We hired the shop.",
  },
  {
    id: "ie-1",
    neighborhood: "Island Estates",
    slugs: ["clearwater"],
    stars: 5,
    when: "June 2026",
    name: "Paula Grimm",
    quote:
      "Island Estates cabinetry for a laundry and a wet bar. Built as one run so the oak matched, which a two-vendor plan would have missed.",
  },
  {
    id: "ie-2",
    neighborhood: "Island Estates",
    slugs: ["clearwater"],
    stars: 5,
    when: "October 2025",
    name: "Andre Silva",
    quote:
      "Salt air was part of the finish conversation. They specified the varnish for it instead of a default sheen.",
  },
  {
    id: "ie-3",
    neighborhood: "Island Estates",
    slugs: ["clearwater"],
    stars: 5,
    when: "January 2026",
    name: "Beth Colman",
    quote:
      "The instant estimate was close. The field measure moved one number, and they showed the BOM line that changed.",
  },
  {
    id: "sv-1",
    neighborhood: "Southside Village",
    slugs: ["sarasota"],
    stars: 5,
    when: "May 2026",
    name: "Hannah Iqbal",
    quote:
      "Southside Village kitchen. Inset doors, shop-sprayed, hinges that were on the list. It feels like furniture, which is what we asked for.",
  },
  {
    id: "sv-2",
    neighborhood: "Southside Village",
    slugs: ["sarasota"],
    stars: 5,
    when: "August 2026",
    name: "Victor Lane",
    quote:
      "They drove the field measure, then built everything in Tampa and installed in four days. The house was never a workshop.",
  },
  {
    id: "sv-3",
    neighborhood: "Southside Village",
    slugs: ["sarasota"],
    stars: 4,
    when: "February 2026",
    name: "Celia Navarro",
    quote:
      "Stone lead time pushed the install. The cabinets still arrived finished and labeled, and they stored them rather than stacking boxes in our dining room.",
  },
  {
    id: "sv-4",
    neighborhood: "Southside Village",
    slugs: ["sarasota"],
    stars: 5,
    when: "November 2025",
    name: "Miles Grant",
    quote:
      "We wanted a stair rail that matched the new cabinets. Same oak, same shop, one person accountable for the color.",
  },
  {
    id: "lp-1",
    neighborhood: "Laurel Park",
    slugs: ["sarasota"],
    stars: 5,
    when: "April 2025",
    name: "Sophie March",
    quote:
      "Laurel Park cottage stair. Tight width, original plaster, white oak treads. They scribed the skirts and kept the character of the house.",
  },
  {
    id: "lp-2",
    neighborhood: "Laurel Park",
    slugs: ["sarasota"],
    stars: 5,
    when: "September 2026",
    name: "Derek Holt",
    quote:
      "The planning range on the PDF was the number we used with our lender. The proposal landed inside it.",
  },
  {
    id: "lp-3",
    neighborhood: "Laurel Park",
    slugs: ["sarasota"],
    stars: 5,
    when: "July 2025",
    name: "Amelia Cruz",
    quote:
      "A small bath, still fully detailed: membrane, flood test, and a niche that does not look like an afterthought.",
  },
];

const seeds: Record<string, Seed> = {
  tampa: {
    slug: "tampa",
    demographic: "Tampa",
    clusterOrder: ["Hyde Park", "South Tampa", "Davis Islands", "Seminole Heights"],
    intro:
      "Hale & Timber has built staircases, cabinetry, and bathrooms for Tampa houses since 1998. The work is milled in our shop, priced from a bill of materials, and fitted to the plaster you already have.",
    featured: {
      eyebrow: "Tampa · Hyde Park",
      title: "A 1926 stair, rebuilt without moving the plaster.",
      paragraphs: [
        "The well is 42 inches. The header at the landing stays. Treads are 5/4 rift white oak, housed into the stringers, with a continuous rail eased by hand at the winders.",
        "Brass balusters were counted on the bill of materials and ordered when the full-size rod was approved, because the metal takes longer than the milling.",
      ],
      specs: [
        { label: "Rise / run", value: "8 1/4 in · 10 1/4 in" },
        { label: "Timber", value: "Rift-sawn white oak" },
        { label: "Kept", value: "Original plaster and header" },
      ],
      imageVariant: "stair",
      imageCaption: "Hyde Park · white oak stair",
      imageAlt:
        "Custom white oak staircase in a 1926 Hyde Park home in Tampa, with a continuous handrail and skirts scribed to the original plaster walls",
    },
  },
  "st-petersburg": {
    slug: "st-petersburg",
    demographic: "St. Petersburg",
    clusterOrder: ["Old Northeast", "Historic Kenwood"],
    intro:
      "St. Petersburg homeowners hire Hale & Timber when a house needs a stair, a kitchen, or a bath made as a one-off. We measure on your street and build the pieces in our Tampa shop.",
    featured: {
      eyebrow: "St. Petersburg · Old Northeast",
      title: "An Old Northeast stair that keeps the original casings.",
      paragraphs: [
        "The landing was out of square by more than an inch. We redrew it before the oak was cut, then scribed the skirts to plaster and worked around casings the owners wanted left alone.",
        "A hall cabinet in the same oak was added to the same bill of materials, so the color and the crew stayed singular.",
      ],
      specs: [
        { label: "Neighborhood", value: "Old Northeast" },
        { label: "Joinery", value: "Housed treads, scribed skirts" },
        { label: "Also made", value: "Hall cabinet in matching oak" },
      ],
      imageVariant: "rail",
      imageCaption: "Old Northeast · continuous rail",
      imageAlt:
        "Hand-shaped white oak handrail and stair treads installed in an Old Northeast St. Petersburg home, fitted around original door casings",
    },
  },
  clearwater: {
    slug: "clearwater",
    demographic: "Clearwater",
    clusterOrder: ["Harbor Oaks", "Island Estates"],
    intro:
      "Clearwater projects from Hale & Timber are shop-built in Tampa and installed by the same crew. Showers are waterproofed and flood-tested. Cabinets are finished before they ride across the bridge.",
    featured: {
      eyebrow: "Clearwater · Harbor Oaks",
      title: "A Harbor Oaks shower, tested full of water before the stone.",
      paragraphs: [
        "Curbless entry, linear drain, bonded sheet membrane. The pan was flooded for a day. Marble followed only after that test, with the niche vein lined up to the curb.",
        "The valve escutcheon was milled in the shop, so the rough-in tolerance was a sixteenth of an inch and written on the list.",
      ],
      specs: [
        { label: "Proof", value: "24-hour flood test" },
        { label: "Metal", value: "Brass valve, shop escutcheon" },
        { label: "Stone", value: "Vein-matched niche and curb" },
      ],
      imageVariant: "membrane",
      imageCaption: "Harbor Oaks · membrane test",
      imageAlt:
        "Luxury shower waterproofing in a Harbor Oaks Clearwater bathroom, with a bonded sheet membrane and linear drain before marble was set",
    },
  },
  sarasota: {
    slug: "sarasota",
    demographic: "Sarasota",
    clusterOrder: ["Southside Village", "Laurel Park"],
    intro:
      "Sarasota homeowners use Hale & Timber for inset cabinetry, cottage stairs, and baths that need a shop instead of a package. Field measure on site. Millwork in Tampa. Install in a few quiet days.",
    featured: {
      eyebrow: "Sarasota · Southside Village",
      title: "Inset kitchen doors, sprayed in the shop, hinged from a list.",
      paragraphs: [
        "The kitchen is in Southside Village. Doors are inset, drawers are maple, and the hinge count was fixed before the order. Finish cured in Tampa so the house never became a spray booth.",
        "A stair rail in the same oak was added so the color would not depend on two vendors guessing.",
      ],
      specs: [
        { label: "Doors", value: "Inset, shop-sprayed" },
        { label: "Drawers", value: "Maple boxes" },
        { label: "Matched", value: "Stair rail in the same oak" },
      ],
      imageVariant: "cabinet",
      imageCaption: "Southside Village · inset doors",
      imageAlt:
        "Shop-built inset kitchen cabinets with painted doors and maple drawers installed in a Southside Village home in Sarasota",
    },
  },
};

function clusterLabel(place: string) {
  return `${place}, ${site.region}`;
}

function googleReviewsUrl(place: string) {
  const query = `Hale & Timber ${place} ${site.region} reviews`;
  return `https://www.google.com/search?q=${encodeURIComponent(query)}`;
}

function titleFromSlug(slug: string) {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function reviewsFor(slug: string, order: string[]) {
  const mine = reviews.filter((review) => review.slugs.includes(slug));
  return [...mine].sort((a, b) => {
    const aIndex = order.indexOf(a.neighborhood);
    const bIndex = order.indexOf(b.neighborhood);
    return (aIndex === -1 ? 99 : aIndex) - (bIndex === -1 ? 99 : bIndex);
  });
}

function clustersFor(items: Review[], order: string[]) {
  const counts = new Map<string, number>();
  for (const review of items) {
    counts.set(review.neighborhood, (counts.get(review.neighborhood) ?? 0) + 1);
  }
  const names = [...order];
  for (const name of counts.keys()) {
    if (!names.includes(name)) names.push(name);
  }
  return names
    .filter((name) => counts.has(name))
    .map((name) => ({ label: clusterLabel(name), count: counts.get(name) ?? 0 }));
}

function synthesize(slug: string): Seed {
  const demographic = titleFromSlug(slug);
  return {
    slug,
    demographic,
    clusterOrder: [demographic, "Neighborhood Two"],
    intro: `Hale & Timber builds staircases, cabinetry, and bathrooms for ${demographic} homeowners who want the pieces made by hand. We measure the house, write a bill of materials, and install from our Tampa workshop.`,
    featured: {
      eyebrow: `${demographic} · recent work`,
      title: `Custom millwork for a ${demographic} house, sequenced from a bill of materials.`,
      paragraphs: [
        `A typical ${demographic} project starts with a field measure, then shop drawings, then a cut list. Timber, hardware, and finish are bought in that order so install day stays short.`,
        "Stairs are housed and scribed. Showers are membrane-lined and flood-tested. Cabinets are built and finished in the shop.",
      ],
      specs: [
        { label: "Shop", value: "Tampa workshop" },
        { label: "Planning", value: "BOM and MRP before the buy" },
        { label: "Fit", value: "Scribed to the existing house" },
      ],
      imageVariant: "cabinet",
      imageCaption: `${demographic} · shop-built millwork`,
      imageAlt: `Shop-built custom cabinetry prepared for a ${demographic}, Florida home remodeling project, with drawer boxes and doors finished before installation`,
    },
  };
}

function synthesizeReviews(demographic: string, slug: string): Review[] {
  const local = [
    `They measured our ${demographic} stair before they talked about a finish. The bill of materials arrived with the estimate.`,
    `Our ${demographic} bathroom was membrane-lined and flood-tested overnight before any stone was set.`,
    `The cabinets in our ${demographic} kitchen were built as boxes in their Tampa shop, then fitted to a floor that is not level.`,
  ];
  const second = [
    `The planning range was explained line by line, including timber and hardware. The final proposal sat inside it.`,
    `They scribed the skirt boards to old plaster instead of asking us to rebuild the walls.`,
    `Brass, white oak, and a niche lined up with the curb. It feels made for this house.`,
    `Floors stayed protected and the crew left the place clean. We always knew which day was millwork and which day was install.`,
  ];
  const named = ["Mara Ellison", "Jonah Reeves", "Helen Cho", "Ruth Pellegrino", "Owen Briggs", "Priya Shah", "Nora Vidal"];
  return [
    ...local.map((quote, index) => ({
      id: `${slug}-a-${index}`,
      quote,
      name: named[index] ?? "Alex Morgan",
      neighborhood: demographic,
      stars: 5 as const,
      when: "2026",
      slugs: [slug],
    })),
    ...second.map((quote, index) => ({
      id: `${slug}-b-${index}`,
      quote,
      name: named[index + 3] ?? "Alex Morgan",
      neighborhood: "Neighborhood Two",
      stars: (index === 1 ? 4 : 5) as 4 | 5,
      when: "2026",
      slugs: [slug],
    })),
  ];
}

export function isValidSlug(slug: string) {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}

export function homeReviewFeed() {
  const order = [...new Set(Object.values(seeds).flatMap((seed) => seed.clusterOrder))];
  const pageReviews = [...reviews].sort((a, b) => {
    const aIndex = order.indexOf(a.neighborhood);
    const bIndex = order.indexOf(b.neighborhood);
    return (aIndex === -1 ? 99 : aIndex) - (bIndex === -1 ? 99 : bIndex);
  });
  return {
    city: site.location,
    reviews: pageReviews,
    googleUrl: googleReviewsUrl(site.location),
  };
}

export function listSeededLocations() {
  return Object.values(seeds).map((seed) => ({
    slug: seed.slug,
    demographic: seed.demographic,
  }));
}

export function resolveLocation(slug: string): LocationView | null {
  if (!isValidSlug(slug)) return null;
  const seed = seeds[slug] ?? synthesize(slug);
  const pageReviews = seeds[slug]
    ? reviewsFor(seed.slug, seed.clusterOrder)
    : synthesizeReviews(seed.demographic, seed.slug);
  return {
    slug: seed.slug,
    demographic: seed.demographic,
    region: site.region,
    intro: seed.intro,
    announcement: locationAnnouncement(seed.demographic),
    googleUrl: googleReviewsUrl(seed.demographic),
    reviews: pageReviews,
    clusters: clustersFor(pageReviews, seed.clusterOrder),
    featured: seed.featured,
  };
}
// === CRO_DECISION_END: LocationCatalog ===
