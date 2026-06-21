import React, { useState, useMemo } from "react";
import Section from "./motion/Section";
import Reveal, { Stagger, StaggerItem } from "./motion/Reveal";
import SpotlightCard from "./motion/SpotlightCard";

/**
 * Portfolio of products we've built, grouped by category and browsable via
 * filter pills. Cards reuse the site's SpotlightCard glass + glow language.
 */
const categories = [
  "Monetised Apps",
  "Agentic Commerce",
  "SME Solution",
  "Legal Assistance",
  "Social Network",
  "Fashion",
  "Architecture",
];

// accent rotates per category for visual rhythm
const categoryAccent = {
  "Monetised Apps": "saffron",
  "Agentic Commerce": "indigo",
  "SME Solution": "teal",
  "Legal Assistance": "indigo",
  "Social Network": "saffron",
  Fashion: "teal",
  Architecture: "indigo",
};

const products = [
  {
    name: "Vimarsha",
    tagline: "EPUB reader, reimagined",
    category: "Monetised Apps",
    description:
      "Turns any EPUB into a narrated audiobook — figures surface in sync as you listen, voice notes drop straight onto the page, and an AI companion discusses the book with you using its own content.",
  },
  {
    name: "Speko",
    tagline: "Voice-first spend tracker",
    category: "Monetised Apps",
    description:
      "Log expenses just by saying them. An AI spending coach reads your habits back to you and nudges sharper money decisions in the moment — not in a monthly report.",
  },
  {
    name: "Rezt",
    tagline: "Rest & recovery, scored",
    category: "Monetised Apps",
    description:
      "Syncs with your Apple Watch and turns recovery science into daily guidance — when to push, when to back off, and how to train smarter for real results.",
  },
  {
    name: "InstantConfig",
    tagline: "Vendor Agnostic",
    category: "Agentic Commerce",
    description:
      "An agent that assembles valid multi-SKU configurations in seconds, enforcing every compatibility rule along the way. For any industry where parts combine — no spec sheets, no costly mistakes.",
  },
  {
    name: "DataMind",
    tagline: "Local Data Analyst Agent for Excel",
    category: "SME Solution",
    description:
      "A data analyst that runs entirely on your machine. Ask your Excel files anything in plain language and get answers, charts and insight back — your data never leaves your laptop.",
  },
  {
    name: "LawyerBoss",
    tagline: "First-contact, in minutes",
    category: "Legal Assistance",
    description:
      "Built for lawyers: draft first-contact legal notices in minutes instead of hours — researched, jurisdiction-aware and ready to send after a quick review.",
  },
  {
    name: "Satya Social",
    tagline: "Human-first. Aadhaar-gated.",
    category: "Social Network",
    description:
      "A social network for modern India where every voice is a real, verified person. Aadhaar-gated and free of AI-generated content — authenticity by design, not by moderation.",
  },
  {
    name: "ProdVTON",
    tagline: "Virtual try-on for brands",
    category: "Fashion",
    description:
      "Let customers see your products worn on lifelike models before they buy. Built for fashion brands to lift conversion, cut returns and bring the fitting room online.",
  },
  {
    name: "VR Real Estate Tour",
    tagline: "Walk it before it's built",
    category: "Architecture",
    description:
      "Immersive VR walkthroughs that let buyers tour a property or design long before construction begins — so you sell the space before the first brick is laid.",
  },
];

const accentStyles = {
  saffron: {
    tag: "bg-saffron/[0.15] text-saffron-core",
    glow: "rgba(255,94,14,0.18)",
  },
  indigo: {
    tag: "bg-indigo-mid/[0.35] text-[#b9a8ff]",
    glow: "rgba(124,92,255,0.2)",
  },
  teal: {
    tag: "bg-teal/[0.15] text-teal",
    glow: "rgba(0,191,165,0.18)",
  },
};

export default function Portfolio() {
  const [filter, setFilter] = useState("All");

  const filtered = useMemo(
    () =>
      filter === "All"
        ? products
        : products.filter((p) => p.category === filter),
    [filter]
  );

  const pills = ["All", ...categories];

  return (
    <Section
      id="portfolio"
      className="pt-24 md:pt-32 pb-10 md:pb-14"
      glow={{
        className: "w-[40rem] h-[40rem] -left-40 top-40 opacity-25",
        style: { background: "rgba(255,94,14,0.4)" },
      }}
    >
      {/* Header */}
      <Reveal className="mb-10">
        <span className="inline-block bg-saffron text-white rounded-pill px-6 py-2 font-display font-bold text-[22px] mb-6 shadow-glow-saffron">
          Portfolio
        </span>
        <h2
          className="font-display font-extrabold text-[36px] md:text-[48px] text-white leading-tight max-w-2xl mb-5"
          style={{ letterSpacing: "-1px" }}
        >
          Products we've{" "}
          <span className="autonomous-gradient">actually shipped</span>
        </h2>
        <p className="text-white/50 text-[18px] max-w-2xl leading-relaxed">
          From monetised consumer apps to agentic commerce and vertical tools —
          a look at what we build when we build for ourselves.
        </p>
      </Reveal>

      {/* Filter pills */}
      <div className="flex flex-wrap gap-2.5 mb-10">
        {pills.map((p) => (
          <button
            key={p}
            onClick={() => setFilter(p)}
            className={`font-display text-[14px] font-semibold px-5 py-2 rounded-pill border transition-all ${
              filter === p
                ? "bg-saffron border-saffron text-white shadow-glow-saffron"
                : "bg-white/[0.04] border-white/10 text-white/60 hover:text-white hover:border-white/25"
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Cards */}
      <Stagger
        key={filter}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7"
      >
        {filtered.map((product) => {
          const style =
            accentStyles[categoryAccent[product.category]] ||
            accentStyles.saffron;
          return (
            <StaggerItem key={product.name} className="h-full">
              <SpotlightCard
                glowColor={style.glow}
                className="p-8 flex flex-col h-full min-h-[220px]"
              >
                <span
                  className={`self-start font-mono text-[10px] tracking-[0.12em] uppercase font-medium px-3 py-1.5 rounded-pill mb-6 ${style.tag}`}
                >
                  {product.category}
                </span>
                <h3 className="font-display font-bold text-[24px] text-white leading-tight mb-1">
                  {product.name}
                </h3>
                {product.tagline && (
                  <p className="font-display font-medium text-[13px] text-white/45 mb-4">
                    {product.tagline}
                  </p>
                )}
                <p className="text-white/60 text-[15px] leading-relaxed mt-auto">
                  {product.description}
                </p>
              </SpotlightCard>
            </StaggerItem>
          );
        })}
      </Stagger>
    </Section>
  );
}
