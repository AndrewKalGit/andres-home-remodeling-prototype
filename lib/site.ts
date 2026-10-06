// === CRO_DECISION_START: SiteFacts - One set of credentials everywhere ===
// Legitimacy collapses if the phone, the year, or the license drifts between
// the hero, the trust bar, the PDF, and the footer. A single fact sheet keeps
// the promise identical at every point of contact.
export const site = {
  name: "Hale & Timber",
  legalName: "Hale & Timber Custom Remodeling",
  established: 1998,
  location: "Tampa Bay",
  city: "Tampa",
  region: "Florida",
  phoneDisplay: "(813) 555-0198",
  phoneTel: "+18135550198",
  email: "estimating@haleandtimber.example",
  hours: "Monday to Friday, 7:30a to 5:00p",
  homeownersLabel: "240+",
  licenses: [
    { name: "Florida certified general contractor", id: "CGC1528491" },
    { name: "Hillsborough County contractor", id: "CCC1331048" },
  ],
} as const;
// === CRO_DECISION_END: SiteFacts ===
