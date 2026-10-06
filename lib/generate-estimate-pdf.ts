// === CRO_DECISION_START: EstimatePdf - A take-away that makes the number feel real ===
// A high-ticket visitor hesitates to call a stranger. A one-page shop estimate,
// with a letterhead and a bill of materials, turns the visit into a document
// they can forward to a partner. The file is built from the estimate object, so
// the PDF cannot invent a second price.
import type { Estimate } from "@/lib/estimate-engine";
import { formatMoney } from "@/lib/estimate-engine";
import { site } from "@/lib/site";

function pdfSafe(value: string) {
  return value
    .replace(/\u2013|\u2014/g, "-")
    .replace(/\u2212/g, "-")
    .replace(/[^\x20-\x7E]/g, "");
}

function pdfEscape(value: string) {
  return pdfSafe(value).replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function wrap(value: string, width: number) {
  const words = pdfSafe(value).split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > width && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function byteLength(value: string) {
  return new TextEncoder().encode(value).length;
}

function buildPdf(content: string) {
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> >>",
    `<< /Length ${byteLength(content)} >>\nstream\n${content}\nendstream`,
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>",
  ];

  let output = "%PDF-1.4\n";
  const offsets: number[] = [];
  objects.forEach((body, index) => {
    offsets.push(byteLength(output));
    output += `${index + 1} 0 obj\n${body}\nendobj\n`;
  });
  const xrefStart = byteLength(output);
  output += `xref\n0 ${objects.length + 1}\n`;
  output += "0000000000 65535 f \n";
  for (const offset of offsets) {
    output += `${String(offset).padStart(10, "0")} 00000 n \n`;
  }
  output += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;
  return new TextEncoder().encode(output);
}

function renderEstimate(estimate: Estimate) {
  const ops: string[] = [];
  const fill = (r: number, g: number, b: number) => ops.push(`${r} ${g} ${b} rg`);
  const text = (x: number, y: number, size: number, font: "F1" | "F2", value: string) => {
    ops.push(`BT /${font} ${size} Tf 1 0 0 1 ${x} ${y} Tm (${pdfEscape(value)}) Tj ET`);
  };

  fill(0.11, 0.09, 0.071);
  ops.push("0 748 612 44 re f");
  fill(0.965, 0.945, 0.906);
  text(48, 766, 13, "F2", site.name.toUpperCase());
  text(330, 766, 9, "F1", `${site.location.toUpperCase()}   EST. ${site.established}`);

  fill(0.965, 0.945, 0.906);
  ops.push("48 668 62 62 re f");
  ops.push("0.553 0.416 0.227 RG 1.25 w");
  ops.push("48 668 62 62 re S");
  fill(0.11, 0.09, 0.071);
  text(64, 693, 14, "F2", "H&T");
  fill(0.325, 0.286, 0.267);
  text(48, 652, 8, "F1", "PLACEHOLDER LOGO");

  fill(0.11, 0.09, 0.071);
  text(128, 706, 18, "F2", estimate.documentTitle);
  fill(0.325, 0.286, 0.267);
  text(128, 686, 11, "F1", `Prepared for ${estimate.input.name}`);
  text(128, 670, 11, "F1", estimate.input.email);

  const facts = [
    `Project: ${estimate.typeLabel}`,
    `Approximate area: ${estimate.input.squareFeet.toLocaleString("en-US")} sq ft`,
    estimate.input.city ? `Service area: ${estimate.input.city}, ${site.region}` : "",
    estimate.input.neighborhood ? `Neighborhood: ${estimate.input.neighborhood}` : "",
    estimate.input.phone ? `Phone: ${estimate.input.phone}` : "",
    estimate.input.timeline ? `Timing: ${estimate.input.timeline}` : "",
    estimate.input.budget ? `Budget note: ${estimate.input.budget}` : "",
    `Rate card: ${formatMoney(estimate.ratePerSqFt)} per sq ft`,
    estimate.minimumApplied
      ? `Shop minimum applied (${formatMoney(estimate.minimum)}; area price was ${formatMoney(estimate.areaExtended)})`
      : `Area price: ${formatMoney(estimate.areaExtended)}`,
  ].filter(Boolean);

  let y = 628;
  fill(0.11, 0.09, 0.071);
  for (const fact of facts) {
    text(48, y, 10, "F1", fact);
    y -= 16;
  }

  y -= 8;
  ops.push("0.11 0.09 0.071 RG 0.8 w");
  ops.push(`48 ${y} m 564 ${y} l S`);
  y -= 18;
  fill(0.325, 0.286, 0.267);
  text(48, y, 9, "F2", "CODE");
  text(100, y, 9, "F2", "BILL OF MATERIALS");
  text(470, y, 9, "F2", "AMOUNT");
  y -= 8;
  ops.push(`48 ${y} m 564 ${y} l S`);
  y -= 16;

  for (const line of estimate.bom) {
    fill(0.11, 0.09, 0.071);
    text(48, y, 10, "F1", line.code);
    text(100, y, 10, "F1", line.description);
    text(470, y, 10, "F1", formatMoney(line.amount));
    y -= 16;
  }

  y -= 6;
  ops.push(`48 ${y + 10} m 564 ${y + 10} l S`);
  text(100, y, 10, "F1", "Subtotal before offers");
  text(470, y, 10, "F1", formatMoney(estimate.subtotal));
  y -= 16;

  for (const modifier of estimate.modifiers) {
    text(100, y, 10, "F1", modifier.label);
    text(470, y, 10, "F1", formatMoney(modifier.amount));
    y -= 16;
  }

  y -= 4;
  fill(0.11, 0.09, 0.071);
  text(100, y, 12, "F2", "Estimated total");
  text(470, y, 12, "F2", formatMoney(estimate.total));
  y -= 20;
  text(100, y, 12, "F2", "Planning range");
  text(430, y, 12, "F2", `${formatMoney(estimate.rangeLow)} - ${formatMoney(estimate.rangeHigh)}`);
  y -= 28;

  if (estimate.input.notes && y > 150) {
    fill(0.325, 0.286, 0.267);
    text(48, y, 9, "F2", "PROJECT NOTES");
    y -= 14;
    const noteLines = wrap(estimate.input.notes, 92).slice(0, 5);
    fill(0.11, 0.09, 0.071);
    for (const line of noteLines) {
      if (y < 120) break;
      text(48, y, 10, "F1", line);
      y -= 14;
    }
  }

  const disclaimer = wrap(estimate.disclaimer, 96).slice(0, 3);
  let noteY = 78;
  fill(0.325, 0.286, 0.267);
  for (const line of disclaimer) {
    text(48, noteY, 8, "F1", line);
    noteY -= 11;
  }
  text(48, 40, 8, "F1", `${site.legalName}  ·  ${site.phoneDisplay}  ·  ${site.licenses.map((item) => item.id).join("  ·  ")}`);

  return ops.join("\n");
}

export function buildEstimatePdf(estimate: Estimate) {
  return buildPdf(renderEstimate(estimate));
}

function fileSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "client";
}

export function downloadEstimatePdf(estimate: Estimate) {
  const bytes = buildEstimatePdf(estimate);
  const blob = new Blob([bytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `hale-timber-${estimate.documentTitle.toLowerCase().replace(/\s+/g, "-")}-${fileSlug(estimate.input.name)}.pdf`;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}
// === CRO_DECISION_END: EstimatePdf ===
