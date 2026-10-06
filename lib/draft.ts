// === CRO_DECISION_START: EstimateDraft - Carry the easy win into the deeper form ===
// Once someone has given a project type and an email, asking for those facts
// again feels like a toll. Saving the instant estimate on this device lets the
// full overview open already started, which is when a longer form gets finished.
import type { RemodelTypeId } from "@/lib/estimate-engine";

export const DRAFT_KEY = "hale-timber-draft";
export const DRAFT_EVENT = "hale-timber-draft";

export type QuoteDraft = {
  remodelType: RemodelTypeId;
  squareFeet: number;
  name: string;
  email: string;
};

export function saveQuoteDraft(draft: QuoteDraft) {
  sessionStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
  window.dispatchEvent(new Event(DRAFT_EVENT));
}

export function readQuoteDraft(): QuoteDraft | null {
  try {
    const raw = sessionStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as Partial<QuoteDraft>;
    if (!data.remodelType || typeof data.squareFeet !== "number") return null;
    if (typeof data.name !== "string" || typeof data.email !== "string") return null;
    return {
      remodelType: data.remodelType,
      squareFeet: data.squareFeet,
      name: data.name,
      email: data.email,
    };
  } catch {
    return null;
  }
}
// === CRO_DECISION_END: EstimateDraft ===
