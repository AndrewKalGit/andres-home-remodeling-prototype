// === CRO_DECISION_START: ImageBlock - Descriptive alts on designed placeholders ===
// Local search and screen readers both need to know what a photo would have
// shown. Each block carries a long alt about place, material, and action, while
// the drawing gives sighted visitors a composed field note instead of a broken image.
import type { ImageVariant } from "@/lib/media";

const drawings: Record<ImageVariant, { wash: string; plate: string; marks: string }> = {
  timber: {
    wash: "#e7dfd2",
    plate: "STICKERED STOCK",
    marks: `
      <path d="M180 250h840v70H180zM180 360h840v70H180zM180 470h840v70H180z" fill="#efe6d8" stroke="#1c1712" stroke-width="4"/>
      <path d="M220 320v40M420 320v40M620 320v40M820 320v40M220 430v40M420 430v40M620 430v40M820 430v40" stroke="#8d6a3a" stroke-width="4"/>
    `,
  },
  measure: {
    wash: "#e4ddd2",
    plate: "FIELD MEASURE",
    marks: `
      <path d="M220 180h520v460H220z" fill="#f6f0e6" stroke="#1c1712" stroke-width="4"/>
      <path d="M220 180v460M740 180v460M220 180h80M220 640h80" stroke="#8d6a3a" stroke-width="3"/>
      <path d="M250 560h12M262 560v-280M274 280h-12" fill="none" stroke="#1c1712" stroke-width="3"/>
      <circle cx="860" cy="520" r="46" fill="none" stroke="#1c1712" stroke-width="4"/>
      <path d="M860 520l28-18" stroke="#1c1712" stroke-width="3"/>
    `,
  },
  bom: {
    wash: "#e8e0d4",
    plate: "BILL OF MATERIALS",
    marks: `
      <rect x="260" y="150" width="680" height="500" fill="#f7f1e7" stroke="#1c1712" stroke-width="4"/>
      <path d="M320 230h560M320 310h560M320 390h560M320 470h560M320 550h420" stroke="#1c1712" stroke-width="3"/>
      <path d="M320 250h180M320 330h260M320 410h140M320 490h220" stroke="#8d6a3a" stroke-width="8"/>
    `,
  },
  bench: {
    wash: "#e6ded1",
    plate: "FULL-SIZE ROD",
    marks: `
      <path d="M160 560h880v28H160z" fill="#1c1712"/>
      <path d="M220 560v70M980 560v70" stroke="#1c1712" stroke-width="8"/>
      <path d="M210 250h760v250H210z" fill="#f4eee4" stroke="#1c1712" stroke-width="4"/>
      <path d="M250 460h80v-40h80v-40h80v-40h80v-40h80v-40h180" fill="none" stroke="#8d6a3a" stroke-width="6"/>
    `,
  },
  finish: {
    wash: "#e5ddd0",
    plate: "SHOP FINISH",
    marks: `
      <path d="M180 470h180l40-180h120l40 180h180l40-210h140v210h80" fill="#f7f1e6" stroke="#1c1712" stroke-width="4"/>
      <path d="M240 470v-90M460 470v-90M700 470v-110" stroke="#8d6a3a" stroke-width="4"/>
    `,
  },
  install: {
    wash: "#e3dbcf",
    plate: "SCRIBE AND SET",
    marks: `
      <path d="M200 160h90v500h-90z" fill="#f6f0e6" stroke="#1c1712" stroke-width="4"/>
      <path d="M290 620h620" stroke="#1c1712" stroke-width="6"/>
      <path d="M340 620l70-70 70 70 70-80 70 80 70-60 90 60" fill="none" stroke="#8d6a3a" stroke-width="6"/>
      <path d="M860 250c40 40 40 120 0 180" fill="none" stroke="#1c1712" stroke-width="6"/>
    `,
  },
  stair: {
    wash: "#e7dfd2",
    plate: "STAIR ELEVATION",
    marks: `
      <path d="M180 640h120v-70h110v-70h110v-70h110v-70h110v-70h110v-70h160" fill="none" stroke="#1c1712" stroke-width="8"/>
      <path d="M210 560h90M320 490h90M430 420h90M540 350h90M650 280h90M760 210h90" stroke="#8d6a3a" stroke-width="4"/>
      <path d="M240 500c80-10 160-40 250-40 120 0 200 30 320 20" fill="none" stroke="#1c1712" stroke-width="5"/>
    `,
  },
  rail: {
    wash: "#e6ded2",
    plate: "CONTINUOUS RAIL",
    marks: `
      <path d="M160 520c120-20 180-140 300-150 140-12 180 80 300 70 80-8 140-40 220-20" fill="none" stroke="#1c1712" stroke-width="10" stroke-linecap="round"/>
      <path d="M280 500v90M460 390v90M680 450v90M860 420v90" stroke="#8d6a3a" stroke-width="4"/>
      <rect x="250" y="590" width="70" height="16" fill="#1c1712"/>
      <rect x="640" y="540" width="70" height="16" fill="#1c1712"/>
    `,
  },
  shower: {
    wash: "#e4dcd1",
    plate: "BEFORE THE PAN",
    marks: `
      <rect x="300" y="140" width="560" height="520" fill="#f6f0e6" stroke="#1c1712" stroke-width="4"/>
      <path d="M300 250h560M300 360h560M300 470h560" stroke="#8d6a3a" stroke-width="3"/>
      <path d="M420 140v520M560 140v520M700 140v520" stroke="#1c1712" stroke-width="4"/>
    `,
  },
  membrane: {
    wash: "#e5ddd2",
    plate: "FLOOD TEST",
    marks: `
      <path d="M240 260h720l-80 360H320z" fill="#f4eee4" stroke="#1c1712" stroke-width="4"/>
      <path d="M300 430h600" stroke="#8d6a3a" stroke-width="8"/>
      <rect x="560" y="400" width="120" height="28" fill="#1c1712"/>
      <path d="M360 500c40 20 80 20 120 0M520 500c40 20 80 20 120 0M680 500c30 16 60 16 90 0" fill="none" stroke="#8d6a3a" stroke-width="3"/>
    `,
  },
  niche: {
    wash: "#e7e0d4",
    plate: "NICHE AND VALVE",
    marks: `
      <rect x="220" y="160" width="760" height="480" fill="#f7f1e6" stroke="#1c1712" stroke-width="4"/>
      <rect x="300" y="240" width="280" height="200" fill="#efe4d2" stroke="#8d6a3a" stroke-width="6"/>
      <circle cx="760" cy="360" r="54" fill="none" stroke="#1c1712" stroke-width="6"/>
      <circle cx="760" cy="360" r="10" fill="#1c1712"/>
      <path d="M760 300v-50" stroke="#1c1712" stroke-width="6"/>
    `,
  },
  cabinet: {
    wash: "#e6ded1",
    plate: "CABINET ELEVATION",
    marks: `
      <rect x="180" y="180" width="840" height="420" fill="#f6f0e6" stroke="#1c1712" stroke-width="4"/>
      <path d="M180 300h840M390 180v420M600 180v420M810 180v420" stroke="#1c1712" stroke-width="4"/>
      <path d="M250 250h80M460 250h80M670 250h80M880 250h80" stroke="#8d6a3a" stroke-width="6"/>
      <rect x="230" y="360" width="120" height="160" fill="none" stroke="#8d6a3a" stroke-width="4"/>
    `,
  },
};

function svgMarkup(variant: ImageVariant) {
  const drawing = drawings[variant];
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" role="img">
    <rect width="1200" height="800" fill="${drawing.wash}"/>
    <rect x="48" y="48" width="1104" height="704" fill="#fbf7f1" stroke="#1c1712" stroke-width="3"/>
    ${drawing.marks}
    <text x="80" y="700" fill="#534b44" font-family="Georgia, serif" font-size="22" letter-spacing="2">${drawing.plate}</text>
  </svg>`;
}

export function ImageBlock({
  alt,
  caption,
  variant,
}: {
  alt: string;
  caption: string;
  variant: ImageVariant;
}) {
  const src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgMarkup(variant))}`;
  return (
    <figure>
      <img
        src={src}
        alt={alt}
        width={1200}
        height={800}
        loading="lazy"
        decoding="async"
        className="aspect-[3/2] w-full border border-line object-cover"
      />
      <figcaption className="mt-3 text-xs uppercase tracking-[0.16em] text-mute">{caption}</figcaption>
    </figure>
  );
}
// === CRO_DECISION_END: ImageBlock ===
