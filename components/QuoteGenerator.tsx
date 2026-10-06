"use client";

// === CRO_DECISION_START: QuoteGenerator - A small ask that ends in a document ===
// Three short steps feel finishable. The visitor gets a priced bill of materials
// before anyone asks them to book a call, so the shop gives value first. The
// dollars come only from the rate card, which keeps the promise auditable.
import { useState } from "react";
import { LogoMark } from "@/components/Logo";
import { Field, SolidButton, TextButton, describedBy, fieldClass } from "@/components/ui";
import { saveQuoteDraft } from "@/lib/draft";
import {
  activeModifierNotes,
  calculateEstimate,
  ESTIMATE_CONTROLS,
  formatMoney,
  type Estimate,
  type EstimateInput,
  type RemodelTypeId,
} from "@/lib/estimate-engine";
import { downloadEstimatePdf } from "@/lib/generate-estimate-pdf";
import { submitProjectLead } from "@/lib/leads";

type Draft = {
  remodelType: RemodelTypeId | "";
  squareFeet: string;
  name: string;
  email: string;
};

const steps = ["Type", "Area", "Contact"];

function parseArea(value: string) {
  const amount = Number(value.replace(/,/g, "").trim());
  if (!Number.isFinite(amount) || amount < 10 || amount > 8000) return null;
  return Math.round(amount);
}

export function QuoteGenerator({ modifierIds, city }: { modifierIds: string[]; city?: string }) {
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<Draft>({ remodelType: "", squareFeet: "", name: "", email: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [estimate, setEstimate] = useState<Estimate | null>(null);
  const notes = activeModifierNotes(modifierIds);
  const selected = ESTIMATE_CONTROLS.remodelTypes.find((type) => type.id === draft.remodelType);

  function update<K extends keyof Draft>(key: K, value: Draft[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: "" }));
  }

  function goTo(index: number) {
    setEstimate(null);
    setFormError("");
    setStep(index);
  }

  async function goNext() {
    setFormError("");
    if (step === 0) {
      if (!draft.remodelType) {
        setErrors({ remodelType: "Choose a remodel type." });
        return;
      }
      setStep(1);
      return;
    }
    if (step === 1) {
      if (!parseArea(draft.squareFeet)) {
        setErrors({ squareFeet: "Enter an approximate area between 10 and 8,000 square feet." });
        return;
      }
      setStep(2);
      return;
    }

    const nextErrors: Record<string, string> = {};
    if (draft.name.trim().length < 2) nextErrors.name = "Enter the name for the estimate.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draft.email.trim())) {
      nextErrors.email = "Enter an email so the sheet has someone to address.";
    }
    if (Object.keys(nextErrors).length || !draft.remodelType) {
      setErrors(nextErrors);
      return;
    }
    const squareFeet = parseArea(draft.squareFeet);
    if (!squareFeet) return;

    const input: EstimateInput = {
      remodelType: draft.remodelType,
      squareFeet,
      name: draft.name.trim(),
      email: draft.email.trim(),
      city,
      modifierIds,
      documentTitle: "Preliminary Estimate",
    };

    setSubmitting(true);
    try {
      const next = calculateEstimate(input);
      const saved = await submitProjectLead({ ...input, source: "instant-estimate" });
      if (!saved.ok) throw new Error("The estimate could not be prepared.");
      saveQuoteDraft({
        remodelType: input.remodelType,
        squareFeet: input.squareFeet,
        name: input.name,
        email: input.email,
      });
      setEstimate(next);
      setStep(3);
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "The estimate could not be prepared.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="border border-line bg-card p-6 shadow-[0_30px_70px_-36px_rgba(28,23,18,0.55)] md:p-8">
      <p className="text-xs uppercase tracking-[0.18em] text-mute">Instant estimate</p>
      <h2 className="mt-2 font-serif text-3xl leading-tight tracking-tight">Three questions. A number you can keep.</h2>
      {notes.length ? <p className="mt-3 text-sm leading-relaxed text-mute">{notes.join(" ")}</p> : null}
      <p className="sr-only" aria-live="polite">
        {step < 3 ? `Step ${step + 1} of 3, ${steps[step]}` : "Your estimate is ready"}
      </p>
      <ol className="mt-6 flex gap-4 text-[11px] uppercase tracking-[0.14em]">
        {steps.map((label, index) => (
          <li key={label}>
            <button
              type="button"
              onClick={() => goTo(index)}
              disabled={index > step || (step < 3 && index === step)}
              className={index === step ? "text-ink" : "text-mute disabled:opacity-70"}
            >
              <span className="mr-1 font-serif text-sm normal-case tracking-normal">{index + 1}</span>
              {label}
            </button>
          </li>
        ))}
      </ol>

      {step === 3 && estimate ? (
        <EstimateResult estimate={estimate} onRestart={() => goTo(0)} />
      ) : (
        <form
          className="mt-6"
          noValidate
          onSubmit={(event) => {
            event.preventDefault();
            void goNext();
          }}
        >
          {step === 0 ? (
            <fieldset>
              <legend className="mb-3 text-xs uppercase tracking-[0.16em] text-mute">Remodel type</legend>
              <div id="remodel-type" className="grid grid-cols-2 gap-3">
                {ESTIMATE_CONTROLS.remodelTypes.map((type) => {
                  const selectedType = draft.remodelType === type.id;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      aria-pressed={selectedType}
                      onClick={() => update("remodelType", type.id)}
                      className={`border px-3 py-4 text-left transition duration-150 hover:border-ink ${selectedType ? "border-ink bg-cream" : "border-line bg-card"}`}
                    >
                      <span className="block text-base font-medium">{type.label}</span>
                      <span className="mt-1 block text-sm text-mute">{type.detail}</span>
                    </button>
                  );
                })}
              </div>
              {errors.remodelType ? (
                <p role="alert" className="mt-3 text-sm text-ember">
                  {errors.remodelType}
                </p>
              ) : null}
            </fieldset>
          ) : null}

          {step === 1 ? (
            <Field
              label="Approximate square footage"
              htmlFor="square-feet"
              hint={selected?.areaGuide}
              error={errors.squareFeet}
            >
              <input
                id="square-feet"
                name="squareFeet"
                inputMode="numeric"
                autoComplete="off"
                className={fieldClass}
                value={draft.squareFeet}
                aria-invalid={errors.squareFeet ? true : undefined}
                aria-describedby={describedBy("square-feet", selected?.areaGuide, errors.squareFeet)}
                onChange={(event) => update("squareFeet", event.target.value)}
              />
            </Field>
          ) : null}

          {step === 2 ? (
            <div className="grid gap-5">
              <Field label="Name" htmlFor="estimate-name" error={errors.name}>
                <input
                  id="estimate-name"
                  name="name"
                  autoComplete="name"
                  className={fieldClass}
                  value={draft.name}
                  aria-invalid={errors.name ? true : undefined}
                  aria-describedby={describedBy("estimate-name", undefined, errors.name)}
                  onChange={(event) => update("name", event.target.value)}
                />
              </Field>
              <Field label="Email" htmlFor="estimate-email" error={errors.email}>
                <input
                  id="estimate-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className={fieldClass}
                  value={draft.email}
                  aria-invalid={errors.email ? true : undefined}
                  aria-describedby={describedBy("estimate-email", undefined, errors.email)}
                  onChange={(event) => update("email", event.target.value)}
                />
              </Field>
            </div>
          ) : null}

          {formError ? (
            <p role="alert" className="mt-4 text-sm text-ember">
              {formError}
            </p>
          ) : null}

          <div className="mt-6 flex items-center justify-between gap-4">
            {step > 0 ? (
              <TextButton type="button" onClick={() => goTo(step - 1)}>
                Back
              </TextButton>
            ) : (
              <span />
            )}
            <SolidButton type="submit" disabled={submitting}>
              {submitting ? "Preparing..." : step === 2 ? "See my estimate" : "Continue"}
            </SolidButton>
          </div>
        </form>
      )}
    </div>
  );
}

// === CRO_DECISION_START: EstimateResult - Show the parts, then hand over the file ===
// A single lump sum is easy to distrust. Showing the bill-of-materials split
// and the offer as its own line makes the total feel earned, and the download
// gives the visitor something to send to the person who shares the decision.
function EstimateResult({ estimate, onRestart }: { estimate: Estimate; onRestart: () => void }) {
  return (
    <div className="mt-6">
      <div className="flex items-center gap-4 border-b border-line pb-5">
        <LogoMark />
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-mute">Placeholder logo</p>
          <p className="font-serif text-xl">{estimate.documentTitle}</p>
          <p className="text-sm text-mute">Prepared for {estimate.input.name}</p>
        </div>
      </div>
      <p className="mt-5 font-serif text-4xl tracking-tight">
        {formatMoney(estimate.rangeLow)}–{formatMoney(estimate.rangeHigh)}
      </p>
      <p className="mt-2 text-sm text-mute">
        Planning range around {formatMoney(estimate.total)}. Confirmed after a field measure.
      </p>
      <dl className="mt-6 space-y-2 text-sm">
        <div className="flex justify-between gap-4">
          <dt>{estimate.minimumApplied ? "Shop minimum" : "Area price"}</dt>
          <dd className="tabular-nums">{formatMoney(estimate.subtotal)}</dd>
        </div>
        {estimate.modifiers.map((modifier) => (
          <div key={modifier.id} className="flex justify-between gap-4">
            <dt className="text-mute">{modifier.label}</dt>
            <dd className="tabular-nums">{formatMoney(modifier.amount)}</dd>
          </div>
        ))}
      </dl>
      <ul className="mt-5 space-y-2 border-t border-line pt-4 text-sm">
        {estimate.bom.map((line) => (
          <li key={line.code} className="flex justify-between gap-4">
            <span>
              <span className="mr-2 text-mute">{line.code}</span>
              {line.description}
            </span>
            <span className="tabular-nums">{formatMoney(line.amount)}</span>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <SolidButton type="button" onClick={() => downloadEstimatePdf(estimate)}>
          Download PDF estimate
        </SolidButton>
        <a href="#estimate" className="text-sm underline decoration-brass decoration-2 underline-offset-4 hover:decoration-ink">
          Request a full project overview
        </a>
      </div>
      <div className="mt-4">
        <TextButton type="button" onClick={onRestart}>
          Start over
        </TextButton>
      </div>
    </div>
  );
}
// === CRO_DECISION_END: EstimateResult ===
// === CRO_DECISION_END: QuoteGenerator ===
