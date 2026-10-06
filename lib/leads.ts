// === CRO_DECISION_START: LeadSeam - Hold the payload until a real inbox exists ===
// The forms already collect a complete project overview. This function is the
// only place that should grow a network call, so the screens can stay stable
// when the CRM or mail service is attached later.
import type { EstimateInput } from "@/lib/estimate-engine";

export const timelineOptions = [
  "Ready to start",
  "1–3 months",
  "3–6 months",
  "Still planning",
] as const;

export const budgetOptions = [
  "Under $20,000",
  "$20,000–$40,000",
  "$40,000–$75,000",
  "$75,000–$120,000",
  "$120,000 and above",
  "Prefer to talk it through",
] as const;

export type ProjectLead = EstimateInput & {
  source: "instant-estimate" | "project-overview";
};

export type InquiryLead = {
  name: string;
  email: string;
  phone: string;
  message: string;
  source: "general-inquiry";
};

export async function submitProjectLead(payload: ProjectLead) {
  void payload;
  return { ok: true as const };
}

export async function submitInquiry(payload: InquiryLead) {
  void payload;
  return { ok: true as const };
}
// === CRO_DECISION_END: LeadSeam ===
