// Helpers for giving the voice agent awareness of the page and the user's
// current scroll position.

const SECTION_LABELS = {
  hero: "Hero / intro",
  services: "Services",
  portfolio: "Portfolio",
  "industry-solutions": "Industry Solutions",
  process: "Our Process",
  team: "Team",
  testimonials: "Testimonials",
  contact: "Contact",
};

/** A trimmed text snapshot of the page, capped so it stays prompt-friendly. */
export function getPageText(max = 8000) {
  const main = document.querySelector("main") || document.body;
  const text = (main.innerText || "")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  return text.length > max ? `${text.slice(0, max)}…` : text;
}

/** The section currently filling most of the viewport, plus scroll progress. */
export function getCurrentView() {
  const vh = window.innerHeight || document.documentElement.clientHeight;
  let bestId = null;
  let bestArea = 0;
  for (const id of Object.keys(SECTION_LABELS)) {
    const el = document.getElementById(id);
    if (!el) continue;
    const r = el.getBoundingClientRect();
    const visible = Math.max(0, Math.min(r.bottom, vh) - Math.max(r.top, 0));
    if (visible > bestArea) {
      bestArea = visible;
      bestId = id;
    }
  }
  const doc = document.documentElement;
  const scrollPct = Math.round(
    (window.scrollY / Math.max(1, doc.scrollHeight - vh)) * 100
  );
  return {
    id: bestId,
    label: bestId ? SECTION_LABELS[bestId] : "the page",
    scrollPct: Math.min(100, Math.max(0, scrollPct)),
  };
}
