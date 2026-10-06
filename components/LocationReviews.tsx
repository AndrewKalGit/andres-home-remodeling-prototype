"use client";

// === CRO_DECISION_START: ReviewCarousel - Local proof that stops when you read ===
// Reviews tagged to a neighborhood collapse the distance between a stranger's
// praise and the reader's own street. The row moves slowly so the page feels
// alive, and it stops the instant a pointer rests on a card, because trust is
// formed while someone is actually reading.
import { useEffect, useRef, useState } from "react";
import type { Review } from "@/lib/locations";

function Stars({ value }: { value: number }) {
  return (
    <p aria-label={`${value} out of 5 stars`} className="tracking-wide text-brass">
      <span aria-hidden="true">{"★".repeat(value)}{"☆".repeat(5 - value)}</span>
    </p>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="w-[320px] shrink-0 border border-line bg-card p-6 sm:w-[360px]">
      <Stars value={review.stars} />
      <p className="mt-4 text-base leading-relaxed">{review.quote}</p>
      <p className="mt-6 text-sm font-medium">{review.name}</p>
      <p className="mt-1 text-xs uppercase tracking-[0.14em] text-mute">
        {review.neighborhood}, Florida · Google review · {review.when}
      </p>
    </article>
  );
}

export function ReviewCarousel({ reviews }: { reviews: Review[] }) {
  const neighborhoods = [...new Set(reviews.map((review) => review.neighborhood))];
  const [filter, setFilter] = useState("All");
  const [paused, setPaused] = useState(false);
  const [motionOk, setMotionOk] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const visible = filter === "All" ? reviews : reviews.filter((review) => review.neighborhood === filter);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setMotionOk(!media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!motionOk) return;
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    let offset = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const delta = Math.min(now - last, 48);
      last = now;
      const loopWidth = (track.firstElementChild as HTMLElement | null)?.offsetWidth ?? 0;
      if (!pausedRef.current && loopWidth > 0) {
        offset -= delta * 0.028;
        while (offset <= -loopWidth) offset += loopWidth;
        track.style.transform = `translate3d(${offset}px,0,0)`;
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [motionOk, filter, visible.length]);

  const copies = motionOk ? [0, 1] : [0];

  return (
    <div className="min-w-0">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter reviews by neighborhood">
        {["All", ...neighborhoods].map((name) => {
          const selected = filter === name;
          return (
            <button
              key={name}
              type="button"
              aria-pressed={selected}
              onClick={() => setFilter(name)}
              className={`border px-3 py-2 text-sm transition duration-150 hover:border-ink ${selected ? "border-ink bg-ink text-cream" : "border-line bg-card text-ink"}`}
            >
              {name}
            </button>
          );
        })}
      </div>
      <div
        className={`relative mt-6 min-w-0 ${motionOk ? "overflow-hidden" : "overflow-x-auto"}`}
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPaused(false);
        }}
      >
        <p className="sr-only" aria-live="polite">
          {paused ? "Reviews paused" : "Reviews scrolling"}
        </p>
        <div ref={trackRef} className="flex w-max will-change-transform">
          {copies.map((copy) => (
            <div key={copy} className="flex gap-4 pr-4" aria-hidden={copy === 1}>
              {visible.map((review) => (
                <ReviewCard key={`${copy}-${review.id}`} review={review} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
// === CRO_DECISION_END: ReviewCarousel ===

export function LocationReviews({
  city,
  reviews,
  googleUrl,
}: {
  city: string;
  reviews: Review[];
  googleUrl: string;
}) {
  return (
    <section aria-label={`${city} reviews`} className="bg-cream">
      <div className="mx-auto max-w-[1120px] px-5 py-20 md:px-8 md:py-28">
        <p className="text-xs uppercase tracking-[0.18em] text-mute">Local recommendations</p>
        <h2 className="mt-4 max-w-3xl font-serif text-4xl leading-tight tracking-tight text-balance md:text-5xl">
          What {city} homeowners say about the work.
        </h2>
        <div className="mt-12 min-w-0">
          <ReviewCarousel reviews={reviews} />
          <a
            href={googleUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-block text-base underline decoration-brass decoration-2 underline-offset-4 transition hover:decoration-ink"
          >
            Read all reviews or leave your own on Google
          </a>
        </div>
      </div>
    </section>
  );
}
