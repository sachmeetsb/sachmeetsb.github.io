import React from "react";
import { HiArrowRight } from "react-icons/hi";
import HorizontalScroll from "./motion/HorizontalScroll";
import SpotlightCard from "./motion/SpotlightCard";

const caseStudies = [
  {
    title: "First-Contact Agentic Legal Document Generator",
    description:
      "An agentic system that researches jurisdiction-specific laws in real time, identifies relevant statutes and precedents, and drafts a first letter of conflict -ready for attorney review. What used to take a junior associate 4-6 hours now takes under 10 minutes.",
    agents:
      "Jurisdiction lookup, statute extraction, conflict analysis, letter drafting, citation formatting.",
  },
  {
    title: "Local Agentic AI-Based Data Analyst for SMEs",
    description:
      "A self-serve AI analyst built for small and mid-size businesses that don't have a data team. Connects to existing tools -Tally, spreadsheets, POS systems -and answers business questions in plain language. Revenue trends, inventory gaps, customer patterns -without hiring an analyst or learning a dashboard.",
    agents:
      "Data ingestion, natural language querying, trend analysis, automated reporting, anomaly alerts.",
  },
];

export default function CaseStudies() {
  return (
    <HorizontalScroll
      id="case-studies"
      className="bg-gradient-to-br from-[#0F0A1E] via-[#1E1535] to-[#0F0A1E]"
      trackClassName="items-stretch h-screen gap-8 px-8 lg:px-16 py-32"
    >
      {/* Intro panel */}
      <div className="flex flex-col justify-center w-[78vw] md:w-[34vw] flex-shrink-0 snap-start">
        <span className="inline-block self-start bg-saffron text-white rounded-pill px-6 py-2 font-display font-bold text-[22px] mb-6 shadow-glow-saffron">
          Case Studies
        </span>
        <h2 className="font-display font-extrabold text-white text-[clamp(30px,3.5vw,48px)] leading-tight mb-5">
          Projects we've built.{" "}
          <span className="autonomous-gradient">Problems we've solved.</span>
        </h2>
        <p className="text-white/50 text-[17px] leading-relaxed max-w-md">
          Scroll sideways through real agentic systems we shipped — each one
          replacing hours of manual work.
        </p>
      </div>

      {/* Case study panels */}
      {caseStudies.map((study, i) => (
        <SpotlightCard
          key={i}
          beam={i === 0}
          className="w-[85vw] md:w-[560px] flex-shrink-0 p-10 md:p-12 flex flex-col justify-between snap-start"
        >
          <div>
            <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-saffron mb-5 block">
              {String(i + 1).padStart(2, "0")} / {String(caseStudies.length).padStart(2, "0")}
            </span>
            <h3 className="font-display font-bold text-[26px] text-white mb-5 leading-tight">
              {study.title}
            </h3>
            <p className="text-white/60 text-[16px] leading-relaxed mb-7">
              {study.description}
            </p>
            <div className="mb-7">
              <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-saffron mb-2 block">
                Agents handle
              </span>
              <p className="text-white/45 text-[15px] leading-relaxed">
                {study.agents}
              </p>
            </div>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 font-display font-semibold text-[16px] text-saffron hover:text-saffron-light hover:gap-3 transition-all"
          >
            Read the full case study <HiArrowRight />
          </a>
        </SpotlightCard>
      ))}
    </HorizontalScroll>
  );
}
