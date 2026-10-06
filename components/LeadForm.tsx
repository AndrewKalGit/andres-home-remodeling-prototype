"use client";

// === CRO_DECISION_START: ProjectOverviewForm - The deeper ask, after the number exists ===
// The instant tool proves the shop can price the work. This form collects the
// rest of a real overview — phone, street, timing, and the constraints — once
// that proof is already in hand. Same rate card, fuller document.
import { useEffect, useState } from "react";
import { Field, SolidButton, describedBy, fieldClass } from "@/components/ui";
import { DRAFT_EVENT, readQuoteDraft } from "@/lib/draft";
import {
  calculateEstimate,
  ESTIMATE_CONTROLS,
  formatMoney,
  type Estimate,
  type EstimateInput,
  type RemodelTypeId,
} from "@/lib/estimate-engine";
import { downloadEstimatePdf } from "@/lib/generate-estimate-pdf";
import { budgetOptions, submitProjectLead, timelineOptions } from "@/lib/leads";

type FormState = {
  name: string;
  email: string;
  phone: string;
  neighborhood: string;
  remodelType: RemodelTypeId | "";
  squareFeet: string;
  timeline: string;
  budget: string;
  notes: string;
  companyWebsite: string;
};

const empty: FormState = {
  name: "",
  email: "",
  phone: "",
  neighborhood: "",
  remodelType: "",
  squareFeet: "",
  timeline: "",
  budget: "",
  notes: "",
  companyWebsite: "",
};

export function LeadForm({ modifierIds, city }: { modifierIds: string[]; city: string }) {
  const [form, setForm] = useState<FormState>(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [estimate, setEstimate] = useState<Estimate | null>(null);

  useEffect(() => {
    function applyDraft() {
      const draft = readQuoteDraft();
      if (!draft) return;
      setForm((current) => ({
        ...current,
        remodelType: draft.remodelType,
        squareFeet: String(draft.squareFeet),
        name: current.name || draft.name,
        email: current.email || draft.email,
      }));
    }
    applyDraft();
    window.addEventListener(DRAFT_EVENT, applyDraft);
    return () => window.removeEventListener(DRAFT_EVENT, applyDraft);
  }, []);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: "" }));
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");
    if (form.companyWebsite) {
      setEstimate(null);
      setFormError("");
      return;
    }

    const nextErrors: Record<string, string> = {};
    if (form.name.trim().length < 2) nextErrors.name = "Enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) nextErrors.email = "Enter your email.";
    if (form.phone.replace(/\D/g, "").length < 10) nextErrors.phone = "Enter a phone number.";
    if (form.neighborhood.trim().length < 2) nextErrors.neighborhood = "Enter the neighborhood or street.";
    if (!form.remodelType) nextErrors.remodelType = "Choose a remodel type.";
    const squareFeet = Number(form.squareFeet.replace(/,/g, "").trim());
    if (!Number.isFinite(squareFeet) || squareFeet < 10 || squareFeet > 8000) {
      nextErrors.squareFeet = "Enter an approximate area between 10 and 8,000 square feet.";
    }
    if (!form.timeline) nextErrors.timeline = "Choose a timing.";
    if (Object.keys(nextErrors).length || !form.remodelType) {
      setErrors(nextErrors);
      return;
    }

    const input: EstimateInput = {
      remodelType: form.remodelType,
      squareFeet: Math.round(squareFeet),
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      neighborhood: form.neighborhood.trim(),
      city,
      timeline: form.timeline,
      budget: form.budget,
      notes: form.notes.trim(),
      modifierIds,
      documentTitle: "Project Overview",
    };

    setSubmitting(true);
    try {
      const next = calculateEstimate(input);
      const saved = await submitProjectLead({ ...input, source: "project-overview" });
      if (!saved.ok) throw new Error("The overview could not be prepared.");
      setEstimate(next);
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "The overview could not be prepared.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="estimate" className="bg-cream">
      <div className="mx-auto grid max-w-[1120px] gap-12 px-5 py-20 md:px-8 md:pt-28 md:pb-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="text-xs uppercase tracking-[0.18em] text-mute">Full project overview</p>
          <h2 className="mt-4 font-serif text-4xl leading-tight tracking-tight text-balance md:text-5xl">
            Tell us about the room. We&apos;ll prepare a structured estimate.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-mute">
            Same rate card as the instant tool, plus the facts a bill of materials needs: where the house is, when you want to start, and what has to be made by hand.
          </p>
        </div>
        <div className="border border-line bg-card p-6 md:p-8 lg:col-span-8">
          {estimate ? (
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-mute">Ready</p>
              <h3 className="mt-3 font-serif text-3xl tracking-tight">Your project overview is ready.</h3>
              <p className="mt-4 max-w-prose leading-relaxed text-mute">
                {estimate.typeLabel} · {estimate.input.squareFeet.toLocaleString("en-US")} sq ft · planning range {formatMoney(estimate.rangeLow)}–{formatMoney(estimate.rangeHigh)}.
              </p>
              <div className="mt-6">
                <SolidButton type="button" onClick={() => downloadEstimatePdf(estimate)}>
                  Download project overview
                </SolidButton>
              </div>
            </div>
          ) : (
            <form className="grid gap-5 sm:grid-cols-2" noValidate onSubmit={onSubmit}>
              <div className="sr-only" aria-hidden="true">
                <label>
                  Company website
                  <input
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.companyWebsite}
                    onChange={(event) => update("companyWebsite", event.target.value)}
                  />
                </label>
              </div>
              <Field label="Name" htmlFor="lead-name" error={errors.name}>
                <input id="lead-name" name="name" autoComplete="name" className={fieldClass} value={form.name} aria-invalid={errors.name ? true : undefined} aria-describedby={describedBy("lead-name", undefined, errors.name)} onChange={(event) => update("name", event.target.value)} />
              </Field>
              <Field label="Email" htmlFor="lead-email" error={errors.email}>
                <input id="lead-email" name="email" type="email" autoComplete="email" className={fieldClass} value={form.email} aria-invalid={errors.email ? true : undefined} aria-describedby={describedBy("lead-email", undefined, errors.email)} onChange={(event) => update("email", event.target.value)} />
              </Field>
              <Field label="Phone" htmlFor="lead-phone" error={errors.phone}>
                <input id="lead-phone" name="phone" type="tel" autoComplete="tel" className={fieldClass} value={form.phone} aria-invalid={errors.phone ? true : undefined} aria-describedby={describedBy("lead-phone", undefined, errors.phone)} onChange={(event) => update("phone", event.target.value)} />
              </Field>
              <Field label="Neighborhood" htmlFor="lead-neighborhood" error={errors.neighborhood}>
                <input id="lead-neighborhood" name="neighborhood" autoComplete="address-level3" placeholder="Hyde Park, Davis Islands, Old Northeast" className={fieldClass} value={form.neighborhood} aria-invalid={errors.neighborhood ? true : undefined} aria-describedby={describedBy("lead-neighborhood", undefined, errors.neighborhood)} onChange={(event) => update("neighborhood", event.target.value)} />
              </Field>
              <Field label="Remodel type" htmlFor="lead-type" error={errors.remodelType}>
                <select id="lead-type" name="remodelType" className={fieldClass} value={form.remodelType} aria-invalid={errors.remodelType ? true : undefined} aria-describedby={describedBy("lead-type", undefined, errors.remodelType)} onChange={(event) => update("remodelType", event.target.value as RemodelTypeId | "")}>
                  <option value="">Choose one</option>
                  {ESTIMATE_CONTROLS.remodelTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Approximate square footage" htmlFor="lead-area" error={errors.squareFeet} hint="A rough area is enough. The field measure corrects it.">
                <input id="lead-area" name="squareFeet" inputMode="numeric" className={fieldClass} value={form.squareFeet} aria-invalid={errors.squareFeet ? true : undefined} aria-describedby={describedBy("lead-area", "A rough area is enough. The field measure corrects it.", errors.squareFeet)} onChange={(event) => update("squareFeet", event.target.value)} />
              </Field>
              <Field label="Timing" htmlFor="lead-timeline" error={errors.timeline}>
                <select id="lead-timeline" name="timeline" className={fieldClass} value={form.timeline} aria-invalid={errors.timeline ? true : undefined} aria-describedby={describedBy("lead-timeline", undefined, errors.timeline)} onChange={(event) => update("timeline", event.target.value)}>
                  <option value="">Choose one</option>
                  {timelineOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Budget note" htmlFor="lead-budget" hint="Optional. Useful when you already have a ceiling.">
                <select id="lead-budget" name="budget" className={fieldClass} value={form.budget} aria-describedby={describedBy("lead-budget", "Optional. Useful when you already have a ceiling.")} onChange={(event) => update("budget", event.target.value)}>
                  <option value="">Choose if you have one</option>
                  {budgetOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </Field>
              <div className="sm:col-span-2">
                <Field label="Materials and must-haves" htmlFor="lead-notes" hint="Species, hardware, what has to stay, what has to go.">
                  <textarea id="lead-notes" name="notes" rows={5} className={fieldClass} value={form.notes} aria-describedby={describedBy("lead-notes", "Species, hardware, what has to stay, what has to go.")} onChange={(event) => update("notes", event.target.value)} />
                </Field>
              </div>
              {formError ? (
                <p role="alert" className="text-sm text-ember sm:col-span-2">
                  {formError}
                </p>
              ) : null}
              <div className="sm:col-span-2">
                <SolidButton type="submit" disabled={submitting}>
                  {submitting ? "Preparing..." : "Prepare my project overview"}
                </SolidButton>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
// === CRO_DECISION_END: ProjectOverviewForm ===
