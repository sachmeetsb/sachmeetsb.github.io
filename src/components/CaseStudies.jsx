import React from "react";
import { HiArrowRight } from "react-icons/hi";

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
    <section
      id="case-studies"
      className="py-24 md:py-32"
      style={{
        background:
          "linear-gradient(135deg, #0F0A1E 0%, #1E1535 50%, #0F0A1E 100%)",
      }}
    >
      <div className="max-w-container mx-auto px-8 lg:px-16">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-center gap-5 md:gap-12 mb-14">
          <span className="inline-block self-start bg-saffron text-white rounded-pill px-6 py-2 font-display font-bold text-[22px] whitespace-nowrap">
            Case Studies
          </span>
          <p className="text-white/[0.5] text-[18px] max-w-2xl leading-relaxed">
            Projects we've built. Problems we've solved.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
          {caseStudies.map((study, i) => (
            <div
              key={i}
              className="bg-white/[0.05] border border-white/[0.08] rounded-card p-10 md:p-12 flex flex-col justify-between hover:bg-white/[0.08] transition-colors"
            >
              <div>
                <h3 className="font-display font-bold text-[26px] text-white mb-5 leading-tight">
                  {study.title}
                </h3>
                <p className="text-white/[0.6] text-[16px] leading-relaxed mb-7">
                  {study.description}
                </p>
                <div className="mb-7">
                  <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-saffron mb-2 block">
                    Agents handle
                  </span>
                  <p className="text-white/[0.45] text-[15px] leading-relaxed">
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
