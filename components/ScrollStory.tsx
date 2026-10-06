"use client";

// === CRO_DECISION_START: ScrollStory - Progress the visitor can feel ===
// A long craft story loses people when it is one paragraph. A sticky index tied
// to scroll position shows how far the work has come and lets an impatient
// reader jump to the step they care about without losing the sequence.
import { useEffect, useRef, useState } from "react";
import { ImageBlock } from "@/components/ImageBlock";
import type { StoryStep } from "@/lib/stories";

export function ScrollStory({ steps, asideLabel }: { steps: StoryStep[]; asideLabel: string }) {
  const [active, setActive] = useState(0);
  const refs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const nodes = refs.current.filter((node): node is HTMLElement => Boolean(node));
    if (!nodes.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const index = nodes.indexOf(visible.target as HTMLElement);
        if (index >= 0) setActive(index);
      },
      { rootMargin: "-30% 0px -40% 0px", threshold: [0.2, 0.45, 0.7] },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [steps.length]);

  function showStep(index: number) {
    setActive(index);
    refs.current[index]?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  return (
    <div className="mt-12 grid gap-10 lg:grid-cols-12">
      <div className="lg:col-span-4">
        <div className="lg:sticky lg:top-32">
          <p className="text-xs uppercase tracking-[0.18em] text-mute">{asideLabel}</p>
          <p className="mt-3 font-serif text-3xl tracking-tight">
            {String(active + 1).padStart(2, "0")}
            <span className="text-mute"> / {String(steps.length).padStart(2, "0")}</span>
          </p>
          <ol className="mt-6 space-y-1">
            {steps.map((step, index) => (
              <li key={step.title}>
                <button
                  type="button"
                  onClick={() => showStep(index)}
                  aria-current={index === active ? "step" : undefined}
                  className={`w-full border-l-2 py-2 pl-4 text-left text-sm leading-snug transition duration-150 ${index === active ? "border-ink text-ink" : "border-line text-mute hover:border-ink hover:text-ink"}`}
                >
                  {step.title}
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
      <div className="lg:col-span-8">
        {steps.map((step, index) => (
          <article
            key={step.kicker}
            ref={(node) => {
              refs.current[index] = node;
            }}
            className="scroll-mt-36 border-t border-line py-12 first:border-t-0 first:pt-0 md:py-16"
          >
            <ImageBlock alt={step.image.alt} caption={step.image.caption} variant={step.image.variant} />
            <p className="mt-8 text-xs uppercase tracking-[0.18em] text-mute">{step.kicker}</p>
            <h3 className="mt-3 font-serif text-3xl leading-tight tracking-tight md:text-4xl">{step.title}</h3>
            {step.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-4 max-w-prose text-base leading-relaxed text-mute">
                {paragraph}
              </p>
            ))}
            <dl className="mt-6 grid gap-4 sm:grid-cols-3">
              {step.specs.map((spec) => (
                <div key={spec.label} className="border-t border-line pt-3">
                  <dt className="text-xs uppercase tracking-[0.14em] text-mute">{spec.label}</dt>
                  <dd className="mt-2 text-sm leading-snug">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </article>
        ))}
      </div>
    </div>
  );
}
// === CRO_DECISION_END: ScrollStory ===
