// === CRO_DECISION_START: CraftStories - Specific process beats a gallery of pretty rooms ===
// Buyers of custom work are trying to picture the mess, the sequence, and the
// judgment. A step-by-step account of timber, planning, and install lets them
// rehearse the job before they enquire, which is when a high-ticket lead feels safe.
import type { ImageVariant } from "@/lib/media";

export type StorySpec = { label: string; value: string };

export type StoryStep = {
  kicker: string;
  title: string;
  paragraphs: string[];
  specs: StorySpec[];
  image: { alt: string; caption: string; variant: ImageVariant };
};

export const journeySteps: StoryStep[] = [
  {
    kicker: "01  ·  The house",
    title: "We read the plaster before we talk about a finish.",
    paragraphs: [
      "The first visit is a field measure. Floors that run out, plaster proud of the lath, a header nobody wants to move. We record it with a story stick and a laser, and we photograph the constraints that a showroom never sees.",
      "That set of notes is what the shop builds to. A pretty drawing that ignores a crooked wall becomes a scribe fight on install day.",
    ],
    specs: [
      { label: "Tools", value: "Laser, story stick, moisture meter" },
      { label: "What we lock", value: "Levels, openings, and what cannot move" },
    ],
    image: {
      variant: "measure",
      caption: "Field measure · Tampa Bay",
      alt: "Story stick and laser measure held against an out-of-plumb plaster wall during a Tampa Bay custom remodeling field measure",
    },
  },
  {
    kicker: "02  ·  The timber",
    title: "Stock is stickered and left alone until it stops moving.",
    paragraphs: [
      "Rift white oak for treads, quartersawn blanks for a continuous rail, maple for drawer boxes, sheet goods only where a cabinet back will stay hidden. Boards are stickered in the shop with air on every face.",
      "We do not mill a finish face the week the lumber arrives. Wood that still wants to twist will do it on your stair, not on our bench.",
    ],
    specs: [
      { label: "On the rack", value: "White oak, maple, poplar, and brass" },
      { label: "Acclimation", value: "Stickered before the first finish cut" },
    ],
    image: {
      variant: "timber",
      caption: "Stickered white oak",
      alt: "White oak boards stickered with spacers on the shop floor at a Tampa custom remodeling workshop, acclimating before stair treads are cut",
    },
  },
  {
    kicker: "03  ·  The list",
    title: "A bill of materials, then the order of operations.",
    paragraphs: [
      "Every tread, easing, screw, and offcut goes on a bill of materials. Material requirements planning then sequences the buy: stone and glass show up when the wood is ready for them, not three weeks early and in the aisle.",
      "The list is also how the estimate stays honest. The price you downloaded is split into timber, hardware, finish, shop labor, install, and the planning itself.",
    ],
    specs: [
      { label: "BOM", value: "Quantities, species, and hardware counts" },
      { label: "MRP", value: "Buy order tied to the shop schedule" },
    ],
    image: {
      variant: "bom",
      caption: "Bill of materials",
      alt: "Printed bill of materials and cut list on a workshop bench with timber, hardware, and finish quantities marked for a custom Tampa home remodel",
    },
  },
  {
    kicker: "04  ·  The bench",
    title: "Stringers come off a full-size rod, not a guess.",
    paragraphs: [
      "We draw the stair, the winder, or the cabinet run at full size on the bench. Treads are housed into the stringers. Rails are shaped so the easing fits a hand, then joined as a continuous run.",
      "Cabinet boxes are built in the shop, fitted with the drawers, and only then finished. Site-built boxes inherit every wave in the floor.",
    ],
    specs: [
      { label: "Stairs", value: "Housed treads, hand-shaped easings" },
      { label: "Cabinets", value: "Shop-built boxes, fitted before finish" },
    ],
    image: {
      variant: "bench",
      caption: "Full-size rod on the bench",
      alt: "Full-size stair rod drawn on plywood across a woodworking bench, ready for hand cutting white oak stringers in a Tampa millwork shop",
    },
  },
  {
    kicker: "05  ·  The finish",
    title: "Finish happens in the shop whenever the piece allows it.",
    paragraphs: [
      "Hardwax oil on treads that should feel like wood. A sprayed conversion varnish where a kitchen will meet steam and citrus. Shower metal is fitted, pulled, and protected before it ever sees mortar dust.",
      "Site-finished work collects the house. Shop-finished work arrives ready, and the install stays a fitting job instead of a painting job.",
    ],
    specs: [
      { label: "Stairs and rails", value: "Hardwax oil, cured before delivery" },
      { label: "Kitchens", value: "Conversion varnish at the spray bench" },
    ],
    image: {
      variant: "finish",
      caption: "Oil curing off the floor",
      alt: "White oak stair treads laid out in a finishing room after hardwax oil, drying before delivery to a Tampa home",
    },
  },
  {
    kicker: "06  ·  The house, again",
    title: "Install day is scribing, setting, and leaving the place quiet.",
    paragraphs: [
      "Skirts are scribed to the plaster you already have. The rail goes up as a continuous piece. Floors are protected, and the BOM is how we know the last bracket was not left in the truck.",
      "We leave the house cleaner than we found it. The field measure at the start is what makes this day short.",
    ],
    specs: [
      { label: "Fit", value: "Scribed to existing plaster and floors" },
      { label: "Closeout", value: "Protection, punch list, and a clean floor" },
    ],
    image: {
      variant: "install",
      caption: "Scribing the skirt to plaster",
      alt: "Installer scribing a white oak skirt board to uneven plaster during a custom staircase installation in a Tampa residence",
    },
  },
];

export const stairCase: StoryStep[] = [
  {
    kicker: "Hyde Park  ·  The constraint",
    title: "A 1926 well, 42 inches wide, and plaster that had to stay.",
    paragraphs: [
      "The house sits in Hyde Park. Floor-to-floor is 9 feet 6 inches. The existing winder failed a comfortable gait, and the plaster on both sides was original. The clients wanted white oak and a continuous rail with no exposed fasteners on the walking line.",
      "We refused the easy version, which is to fur the walls out until a catalog stair fits. The stair had to accept the house.",
    ],
    specs: [
      { label: "Location", value: "Hyde Park, Tampa" },
      { label: "Well", value: "42 inches, plaster retained" },
      { label: "Rise / run", value: "8 1/4 inch rise, 10 1/4 inch run" },
    ],
    image: {
      variant: "stair",
      caption: "Hyde Park · existing well",
      alt: "Existing 1926 Hyde Park staircase in Tampa with a worn winder, a narrow well, and plaster walls that stayed in place for the rebuild",
    },
  },
  {
    kicker: "Hyde Park  ·  The geometry",
    title: "The landing could not move, so the walk had to.",
    paragraphs: [
      "A header at the top landing was buried in the plaster and carried more than the stair. We kept it. That fixed the top nosing. The bottom newel had to land clear of a doorway swing that was already tight.",
      "The rod on the bench shows the pitch, the three winders, and the easing into the landing. We walked that rod in the shop before a single stringer was cut, because a winder that looks fine on paper still catches a toe.",
    ],
    specs: [
      { label: "Fixed point", value: "Existing header and top nosing" },
      { label: "Winders", value: "Three, walked on the full-size rod" },
      { label: "Pitch", value: "Drawn full size before the first cut" },
    ],
    image: {
      variant: "bench",
      caption: "Hyde Park · full-size rod",
      alt: "Full-size shop drawing of a Hyde Park master staircase in Tampa showing an 8 1/4 inch rise, a 10 1/4 inch run, and a landing that could not move",
    },
  },
  {
    kicker: "Hyde Park  ·  The materials",
    title: "Rift oak, a continuous rail, and brass that was counted twice.",
    paragraphs: [
      "Treads are 5/4 rift-sawn white oak, housed into 8/4 stringers. The rail is a 2 inch continuous blank, eased by hand at the winder and again at the landing. Balusters are square brass, set so the spacing stays inside 4 inches even where the pitch changes.",
      "The bill of materials listed every baluster, every plug, and the finish screws for the skirts. Material requirements planning put the brass on order the day the rod was approved, because that lead time is longer than the milling.",
    ],
    specs: [
      { label: "Treads", value: "5/4 rift-sawn white oak" },
      { label: "Rail", value: "2 inch continuous, hand eased" },
      { label: "Balusters", value: "Square brass, counted on the BOM" },
    ],
    image: {
      variant: "rail",
      caption: "Hyde Park · rail blank and brass",
      alt: "Rift-sawn white oak tread stock, a continuous rail blank, and square brass balusters labeled on a bill of materials for a Hyde Park staircase in Tampa",
    },
  },
  {
    kicker: "Hyde Park  ·  The fit",
    title: "Skirts scribed to 1926 plaster, finish already cured.",
    paragraphs: [
      "The treads were oiled in the shop and cured before the truck was loaded. On site we cut the skirts to the plaster, which wanders by nearly seven eighths of an inch over the run. The rail went up as one piece and met the newel without a collar trying to hide a gap.",
      "The invoice matched the estimate range. The only field change was one extra scribe on the bottom skirt, and it was already inside the planning range.",
    ],
    specs: [
      { label: "Finish", value: "Hardwax oil, shop cured" },
      { label: "Scribe", value: "Up to 7/8 inch over the run" },
      { label: "Result", value: "Continuous rail, original plaster kept" },
    ],
    image: {
      variant: "install",
      caption: "Hyde Park · set and scribed",
      alt: "Finished white oak staircase in a 1926 Hyde Park bungalow in Tampa, with a hand-shaped continuous rail and a skirt scribed to the original plaster",
    },
  },
];

export const showerCase: StoryStep[] = [
  {
    kicker: "Carrollwood  ·  The floor",
    title: "A curbless shower on joists that ran the wrong way.",
    paragraphs: [
      "The bathroom is in Carrollwood, 5 feet by 7 feet of shower inside a room that had already been opened once. The clients wanted a curbless entry and a 36 inch linear drain. The joists ran parallel to the drain, which is the awkward direction for a slope.",
      "We sistered where the span needed it, then planned the mud bed at a true 2 percent to the drain. The entry stayed flush with the bathroom floor, so the slope had to start inside the shower, not in the hallway.",
    ],
    specs: [
      { label: "Location", value: "Carrollwood, Tampa" },
      { label: "Shower", value: "5 ft by 7 ft, curbless" },
      { label: "Drain", value: "36 inch linear, 2 percent mud bed" },
    ],
    image: {
      variant: "shower",
      caption: "Carrollwood · joists before the pan",
      alt: "Carrollwood Tampa bathroom stripped to the joists, showing floor framing that was sistered before a curbless shower was mud-set",
    },
  },
  {
    kicker: "Carrollwood  ·  The hull",
    title: "Waterproofing first, and a flood test before any stone.",
    paragraphs: [
      "The pan is a bonded sheet membrane, lapped and sealed like a hull, then flooded for 24 hours. We do not set stone on a promise. The test is the proof, and it is on the bill of materials as its own step so nobody schedules the marble early.",
      "Every backer screw is counted. A missed fastener after the flood test is how a wet room fails two years later, so the MRP sequence forbids finish work until the membrane is signed off.",
    ],
    specs: [
      { label: "Membrane", value: "Bonded sheet, flooded 24 hours" },
      { label: "Sequence", value: "No stone until the test passes" },
      { label: "Fasteners", value: "Counted so the membrane stays intact" },
    ],
    image: {
      variant: "membrane",
      caption: "Carrollwood · flood test",
      alt: "Bonded sheet membrane and a linear drain in a Carrollwood luxury shower in Tampa, flood-tested for 24 hours before the mortar bed",
    },
  },
  {
    kicker: "Carrollwood  ·  The metal and stone",
    title: "A niche, a curb, and a valve held to a sixteenth.",
    paragraphs: [
      "The niche is lined with the same marble as the curb so the vein continues instead of starting over. The valve is brass. The escutcheon is a plate milled in our shop, which means the rough-in has to land within a sixteenth or the plate tells on us.",
      "That tolerance is written on the BOM next to the valve, not left as a note in someone's head. The finished room is quiet because the sequence was strict.",
    ],
    specs: [
      { label: "Stone", value: "Vein-matched niche and curb" },
      { label: "Valve", value: "Brass, shop-made escutcheon" },
      { label: "Tolerance", value: "Rough-in held to 1/16 inch" },
    ],
    image: {
      variant: "niche",
      caption: "Carrollwood · niche and valve",
      alt: "Marble niche and brass valve with a shop-made escutcheon in a finished Carrollwood bathroom in Tampa, vein-matched to the shower curb",
    },
  },
];
// === CRO_DECISION_END: CraftStories ===
