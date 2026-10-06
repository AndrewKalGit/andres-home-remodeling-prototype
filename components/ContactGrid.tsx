"use client";

// === CRO_DECISION_START: ContactGrid - A quiet question beside a loud phone ===
// Some visitors are not ready to price a room. A short message form catches
// them without forcing the estimate. Beside it, a full-panel Call Now is for
// the person who wants a voice on the line today.
import { useState } from "react";
import { Field, SolidButton, describedBy, fieldClass } from "@/components/ui";
import { submitInquiry } from "@/lib/leads";
import { site } from "@/lib/site";

export function ContactGrid() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "", companyWebsite: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function update(key: "name" | "email" | "phone" | "message" | "companyWebsite", value: string) {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: "" }));
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (form.companyWebsite) {
      setDone(true);
      return;
    }
    const nextErrors: Record<string, string> = {};
    if (form.name.trim().length < 2) nextErrors.name = "Enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) nextErrors.email = "Enter your email.";
    if (form.message.trim().length < 8) nextErrors.message = "Tell us a little about the question.";
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }
    setSubmitting(true);
    await submitInquiry({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      message: form.message.trim(),
      source: "general-inquiry",
    });
    setSubmitting(false);
    setDone(true);
  }

  return (
    <section id="contact" className="bg-cream">
      <div className="mx-auto grid max-w-[1120px] gap-6 px-5 pb-24 md:px-8 md:pb-28 lg:grid-cols-2">
        <div className="border border-line bg-card p-6 md:p-8">
          <p className="text-xs uppercase tracking-[0.18em] text-mute">General inquiry</p>
          <h2 className="mt-3 font-serif text-3xl tracking-tight">A question, before it is a project.</h2>
          {done ? (
            <p className="mt-6 leading-relaxed text-mute" role="status">
              Message received. If it is quicker, call the shop at {site.phoneDisplay}.
            </p>
          ) : (
            <form className="mt-6 grid gap-5" noValidate onSubmit={onSubmit}>
              <div className="sr-only" aria-hidden="true">
                <label>
                  Company website
                  <input tabIndex={-1} autoComplete="off" value={form.companyWebsite} onChange={(event) => update("companyWebsite", event.target.value)} />
                </label>
              </div>
              <Field label="Name" htmlFor="inquiry-name" error={errors.name}>
                <input id="inquiry-name" name="name" autoComplete="name" className={fieldClass} value={form.name} aria-invalid={errors.name ? true : undefined} aria-describedby={describedBy("inquiry-name", undefined, errors.name)} onChange={(event) => update("name", event.target.value)} />
              </Field>
              <Field label="Email" htmlFor="inquiry-email" error={errors.email}>
                <input id="inquiry-email" name="email" type="email" autoComplete="email" className={fieldClass} value={form.email} aria-invalid={errors.email ? true : undefined} aria-describedby={describedBy("inquiry-email", undefined, errors.email)} onChange={(event) => update("email", event.target.value)} />
              </Field>
              <Field label="Phone" htmlFor="inquiry-phone" hint="Optional.">
                <input id="inquiry-phone" name="phone" type="tel" autoComplete="tel" className={fieldClass} value={form.phone} aria-describedby={describedBy("inquiry-phone", "Optional.")} onChange={(event) => update("phone", event.target.value)} />
              </Field>
              <Field label="Message" htmlFor="inquiry-message" error={errors.message}>
                <textarea id="inquiry-message" name="message" rows={5} className={fieldClass} value={form.message} aria-invalid={errors.message ? true : undefined} aria-describedby={describedBy("inquiry-message", undefined, errors.message)} onChange={(event) => update("message", event.target.value)} />
              </Field>
              <SolidButton type="submit" disabled={submitting}>
                {submitting ? "Sending..." : "Send the message"}
              </SolidButton>
            </form>
          )}
        </div>
        <CallNowPanel />
      </div>
    </section>
  );
}

// === CRO_DECISION_START: CallNowPanel - The phone number at the size of a decision ===
// After a long form, the alternative should be obvious: a person, a number, and
// the hours they answer. Scale is the contrast. The button fills the panel so
// a thumb cannot miss it.
function CallNowPanel() {
  return (
    <div className="flex flex-col justify-between bg-ink p-6 text-cream md:p-10">
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-cream/70">Talk to the shop</p>
        <h2 className="mt-3 font-serif text-4xl tracking-tight">Call Now</h2>
        <p className="mt-4 max-w-sm leading-relaxed text-cream/75">The shop line is open {site.hours}.</p>
      </div>
      <div className="mt-10">
        <a href={`tel:${site.phoneTel}`} className="block font-serif text-4xl tracking-tight transition hover:text-brass-soft sm:text-5xl md:text-6xl">
          {site.phoneDisplay}
        </a>
        <a
          href={`tel:${site.phoneTel}`}
          className="mt-8 flex h-16 w-full items-center justify-center bg-cream text-lg font-medium tracking-wide text-ink transition duration-150 hover:bg-brass-soft"
        >
          Call Now
        </a>
      </div>
    </div>
  );
}
// === CRO_DECISION_END: CallNowPanel ===
// === CRO_DECISION_END: ContactGrid ===
