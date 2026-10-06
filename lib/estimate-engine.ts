// === CRO_DECISION_START: EstimateEngine - One rate card for every price on the site ===
// People trust a high-ticket number when the instant tool, the long form, and
// the PDF all describe the same math. Keeping every rate, minimum, modifier,
// and bill-of-materials share in this file means a future edit cannot quietly
// disagree with itself. The components only collect answers and display the result.

/* MANUAL PRICING CONTROLS
   Change dollars, shares, and multipliers here.
   Do not put prices in components.
   Modifiers run in the order listed, and only when a page requests their id.
   BOM shares should total 1. If they do not, the estimate prints an
   "Unassigned" line so the gap stays visible.
*/

export const MODIFIERS = {
  firstTime: "first-time-client",
  designCredit: "design-credit",
} as const;

export type RemodelTypeId = "stairs" | "bathroom" | "kitchen" | "cabinets";

export type RemodelTypeControl = {
  id: RemodelTypeId;
  label: "Stairs" | "Bathroom" | "Kitchen" | "Cabinets";
  detail: string;
  ratePerSqFt: number;
  minimum: number;
  areaGuide: string;
};

export type ModifierControl = {
  id: string;
  label?: string;
  multiplier: number;
  flatDeduction: number;
};

export type BomControl = {
  code: string;
  description: string;
  share: number;
};

export const ESTIMATE_CONTROLS = {
  range: {
    lowFactor: 0.92,
    highFactor: 1.1,
  },
  remodelTypes: [
    {
      id: "stairs",
      label: "Stairs",
      detail: "Treads, landings, and rails",
      ratePerSqFt: 225,
      minimum: 12400,
      areaGuide: "Approximate plan area of the treads and landings.",
    },
    {
      id: "bathroom",
      label: "Bathroom",
      detail: "Showers, baths, and wet rooms",
      ratePerSqFt: 485,
      minimum: 22000,
      areaGuide: "Approximate footprint of the whole bathroom.",
    },
    {
      id: "kitchen",
      label: "Kitchen",
      detail: "Millwork, boxes, and fit-out",
      ratePerSqFt: 420,
      minimum: 36000,
      areaGuide: "Approximate footprint of the kitchen.",
    },
    {
      id: "cabinets",
      label: "Cabinets",
      detail: "Stand-alone cabinet runs",
      ratePerSqFt: 280,
      minimum: 14500,
      areaGuide: "Approximate area of the cabinet run, not the whole room. A typical kitchen run is 40–80 sq ft.",
    },
  ] satisfies RemodelTypeControl[],
  modifiers: [
    {
      id: MODIFIERS.firstTime,
      multiplier: 0.9,
      flatDeduction: 0,
    },
    {
      id: MODIFIERS.designCredit,
      multiplier: 1,
      flatDeduction: 500,
    },
  ] satisfies ModifierControl[],
  bom: [
    { code: "TMB", description: "Raw timber and sheet goods", share: 0.22 },
    { code: "HDW", description: "Hardware, fasteners, and adhesives", share: 0.07 },
    { code: "FNS", description: "Finish, stone, glass, and oil", share: 0.14 },
    { code: "LAB", description: "Shop labor and millwork", share: 0.36 },
    { code: "INS", description: "Site install and protection", share: 0.15 },
    { code: "MRP", description: "Field measure, BOM, and MRP planning", share: 0.06 },
  ] satisfies BomControl[],
};

export type EstimateInput = {
  remodelType: RemodelTypeId;
  squareFeet: number;
  name: string;
  email: string;
  phone?: string;
  neighborhood?: string;
  city?: string;
  timeline?: string;
  budget?: string;
  notes?: string;
  modifierIds: string[];
  documentTitle?: string;
};

export type BomLine = {
  code: string;
  description: string;
  share: number;
  amount: number;
};

export type AppliedModifier = {
  id: string;
  label: string;
  amount: number;
};

export type Estimate = {
  input: EstimateInput;
  documentTitle: string;
  typeLabel: string;
  ratePerSqFt: number;
  areaExtended: number;
  minimum: number;
  minimumApplied: boolean;
  subtotal: number;
  modifiers: AppliedModifier[];
  bom: BomLine[];
  total: number;
  rangeLow: number;
  rangeHigh: number;
  disclaimer: string;
};

export function formatMoney(value: number) {
  const sign = value < 0 ? "-" : "";
  const amount = Math.abs(Math.round(value)).toLocaleString("en-US");
  return `${sign}$${amount}`;
}

export function getRemodelType(id: RemodelTypeId) {
  return ESTIMATE_CONTROLS.remodelTypes.find((type) => type.id === id);
}

export function modifierLabel(modifier: ModifierControl) {
  if (modifier.label) return modifier.label;
  if (modifier.id === MODIFIERS.firstTime) {
    const percent = Math.round((1 - modifier.multiplier) * 100);
    return `End-of-year first-time client rate: ${percent}% off the final price`;
  }
  if (modifier.id === MODIFIERS.designCredit) {
    return `Exclusive $${modifier.flatDeduction.toLocaleString("en-US")} design credit for local residents`;
  }
  return "Price adjustment";
}

export function homeAnnouncement() {
  const modifier = ESTIMATE_CONTROLS.modifiers.find((item) => item.id === MODIFIERS.firstTime);
  const percent = Math.round((1 - (modifier?.multiplier ?? 1)) * 100);
  return `*End of Year FIRST-TIME CLIENTS: ${percent}% OFF FINAL PRICE*`;
}

export function locationAnnouncement(city: string) {
  const modifier = ESTIMATE_CONTROLS.modifiers.find((item) => item.id === MODIFIERS.designCredit);
  const amount = modifier?.flatDeduction ?? 0;
  return `*Exclusive $${amount.toLocaleString("en-US")} Design Credit for ${city} Residents This Month Only*`;
}

export function activeModifierNotes(ids: string[]) {
  return ESTIMATE_CONTROLS.modifiers
    .filter((modifier) => ids.includes(modifier.id))
    .map((modifier) => modifierLabel(modifier));
}

function roundTo(value: number, step: number) {
  return Math.round(value / step) * step;
}

export function calculateEstimate(input: EstimateInput): Estimate {
  const type = getRemodelType(input.remodelType);
  if (!type) {
    throw new Error("Choose a remodel type.");
  }
  if (!Number.isFinite(input.squareFeet) || input.squareFeet <= 0) {
    throw new Error("Enter an approximate square footage.");
  }

  const areaExtended = Math.round(type.ratePerSqFt * input.squareFeet);
  const minimumApplied = areaExtended < type.minimum;
  const subtotal = minimumApplied ? type.minimum : areaExtended;

  const shareTotal = ESTIMATE_CONTROLS.bom.reduce((sum, line) => sum + line.share, 0);
  const sharesLookComplete = Math.abs(shareTotal - 1) < 0.001;
  let assigned = 0;
  const bom: BomLine[] = ESTIMATE_CONTROLS.bom.map((line, index) => {
    const isLast = index === ESTIMATE_CONTROLS.bom.length - 1;
    const amount =
      isLast && sharesLookComplete ? subtotal - assigned : Math.round(subtotal * line.share);
    assigned += amount;
    return { ...line, amount };
  });
  if (!sharesLookComplete) {
    bom.push({
      code: "BAL",
      description: "Unassigned balance (edit BOM shares)",
      share: Number((1 - shareTotal).toFixed(4)),
      amount: subtotal - assigned,
    });
  }

  let running = subtotal;
  const modifiers = ESTIMATE_CONTROLS.modifiers
    .filter((modifier) => input.modifierIds.includes(modifier.id))
    .map((modifier) => {
      const next = running * modifier.multiplier - modifier.flatDeduction;
      const amount = next - running;
      running = next;
      return { id: modifier.id, label: modifierLabel(modifier), amount };
    });

  const total = Math.max(0, Math.round(running));
  const rangeLow = roundTo(total * ESTIMATE_CONTROLS.range.lowFactor, 50);
  const rangeHigh = roundTo(total * ESTIMATE_CONTROLS.range.highFactor, 50);

  return {
    input,
    documentTitle: input.documentTitle ?? "Preliminary Estimate",
    typeLabel: type.label,
    ratePerSqFt: type.ratePerSqFt,
    areaExtended,
    minimum: type.minimum,
    minimumApplied,
    subtotal,
    modifiers,
    bom,
    total,
    rangeLow,
    rangeHigh,
    disclaimer:
      "This figure is a shop estimate from the published rate card and bill-of-materials splits. It becomes a contract only after a field measure and a written proposal.",
  };
}
// === CRO_DECISION_END: EstimateEngine ===
