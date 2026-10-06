// === CRO_DECISION_START: RootLayout - Quiet type so the offer and the work can speak ===
// A soft serif for the promises and a plain sans for the forms keeps the page
// feeling like a workshop brochure rather than a software product. Fast font
// loading matters because the first screen is the estimate.
import type { Metadata, Viewport } from "next";
import { Fraunces, Outfit } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  style: ["normal", "italic"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} | Custom Home Remodeling in ${site.location}`,
    template: `%s | ${site.name}`,
  },
  description:
    "Hand-built staircases, cabinetry, and bathrooms in Tampa Bay. Download a shop estimate, then book a field measure. Established 1998.",
};

export const viewport: Viewport = {
  themeColor: "#1c1712",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: site.legalName,
    telephone: site.phoneTel,
    email: site.email,
    foundingDate: String(site.established),
    areaServed: site.location,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.city,
      addressRegion: "FL",
      addressCountry: "US",
    },
  };

  return (
    <html lang="en" className={`${fraunces.variable} ${outfit.variable}`}>
      <body className="font-sans antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  );
}
// === CRO_DECISION_END: RootLayout ===
