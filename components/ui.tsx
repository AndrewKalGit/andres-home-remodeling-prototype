// === CRO_DECISION_START: FieldChrome - Inputs that look ready to be touched ===
// Empty, low-contrast fields feel optional, so people skip them. A clear border,
// a hover darkening, and a 16px type size tell the visitor the question is
// serious and keep a phone from zooming the page out from under their thumb.
import type { ButtonHTMLAttributes, ReactNode } from "react";

export const fieldClass =
  "w-full border border-line bg-card px-3.5 py-3 text-base text-ink transition-colors duration-150 hover:border-ink";

type FieldProps = {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  children: ReactNode;
};

export function Field({ label, htmlFor, error, hint, children }: FieldProps) {
  const hintId = hint ? `${htmlFor}-hint` : undefined;
  const errorId = error ? `${htmlFor}-error` : undefined;
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 block text-xs uppercase tracking-[0.16em] text-mute">
        {label}
      </label>
      {children}
      {hint ? (
        <p id={hintId} className="mt-2 text-sm leading-relaxed text-mute">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} role="alert" className="mt-2 text-sm text-ember">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function describedBy(id: string, hint?: string, error?: string) {
  return [hint ? `${id}-hint` : "", error ? `${id}-error` : ""].filter(Boolean).join(" ") || undefined;
}

type SolidButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function SolidButton({ className = "", ...props }: SolidButtonProps) {
  return (
    <button
      className={`inline-flex h-12 items-center justify-center bg-ink px-6 text-sm font-medium tracking-wide text-cream transition duration-150 hover:bg-ember disabled:cursor-wait disabled:opacity-60 ${className}`}
      {...props}
    />
  );
}

export function TextButton({ className = "", ...props }: SolidButtonProps) {
  return (
    <button
      className={`text-sm underline decoration-brass decoration-2 underline-offset-4 transition hover:decoration-ink ${className}`}
      {...props}
    />
  );
}
// === CRO_DECISION_END: FieldChrome ===
